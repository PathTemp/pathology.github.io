var writtenNumbers = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE']

assignListeners()

function assignListeners() {
	var menuToggle = 0;
  document.getElementById('Template1').style.display = 'block'
  document.getElementById('Template').style.backgroundColor = "#008080";
  
  var tabList = document.getElementsByClassName('tablink');
  for (let i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function() {
      openPage(this.id + 1, this)
    }
  }

  document.getElementById('Menu').onclick = function() {
    if (menuToggle == 0) {
      openNav();
      menuToggle = 1;
    } else {
      closeNav();
      menuToggle = 0;
    }
  }

  var heartInput = document.querySelectorAll('.heart.frags');
  for (let i = 0; i < heartInput.length; i++) {
    heartInput[i].oninput = function() {
      heartTemp();
    }
  }

  var heartInput = document.querySelectorAll('.heart');
  for (let i = 0; i < heartInput.length; i++) {
    heartInput[i].onchange = function() {
      heartTemp();
    }
  }

  document.getElementById('copyHeartText').onclick = function() {
    copyText('heartText')
  }
  
  document.getElementById('clearHeartTemplate').onclick = function() {
    clearTemplate()
  }
  
  window.addEventListener("resize", function() {
    var tdisp = document.getElementById("Template1").style.display;
    var adisp = document.getElementById("About1").style.display;
    if (window.innerWidth > 940 && (tdisp == 'none' || adisp == 'none' || tdisp == '' || adisp == '')) {
      document.getElementById("Template1").style.display = 'block'
      document.getElementById("About1").style.display = 'block'
    } else if (window.innerWidth <= 940 && ((tdisp == 'block' && adisp == 'block') || (tdisp == '' || adisp == ''))) {
      if (document.getElementById('Template').style.backgroundColor == '') {
        document.getElementById("Template1").style.display = 'none';
        document.getElementById("About1").style.display = 'block';
      } else {
        document.getElementById("Template1").style.display = 'block';
        document.getElementById("About1").style.display = 'none';
      }
    }

  });
  heartTemp();
}

function openPage(pageName, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(".tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = "#008080";
}

function heartTemp() {
  var numFragments = document.getElementById("frags").value;
  var toggle = 0;
  for (var i = 0; i < writtenNumbers.length; i++) {
    if (numFragments.toUpperCase() == writtenNumbers[i]) {
      numFragments = i;
      break
    }
  }
  var header = "";
  var heartFinal = "";
  header = "HEART, RIGHT VENTRICLE; ENDOMYOCARDIAL BIOPSY:"
  heartFinal += header + "\n"
  if (numFragments == "") {
    heartFinal = "Error: Need number of fragments";
    document.getElementById("heartText").value = heartFinal
    return;
  } else if (numFragments < 0) {
    heartFinal = "Error: Negative number of fragments";
    document.getElementById("heartText").value = heartFinal
    return;
  } else if (numFragments == 0) {
    heartFinal += "- " + writtenNumbers[numFragments] + " FRAGMENTS OF ENDOMYOCARDIAL TISSUE, INSUFFICIENT FOR EVALUATION";
    document.getElementById("heartText").value = heartFinal
    return;
  } else if (numFragments == 1) {
    heartFinal += "- " + writtenNumbers[numFragments] + " FRAGMENT OF ENDOMYOCARDIAL TISSUE, SUBOPTIMAL FOR EVALUATION"
    document.getElementById("heartText").value = heartFinal
    return;
  } else if (numFragments >= 0 && numFragments <= 12) {
    heartFinal += "- " + writtenNumbers[numFragments] + " FRAGMENTS OF ENDOMYOCARDIAL TISSUE";
  } else {
    heartFinal += "- " + numFragments.toUpperCase() + " FRAGMENTS OF ENDOMYOCARDIAL TISSUE"
  }
  if (document.querySelector('.heart.zero').checked == true) {
    heartFinal += ", NEGATIVE FOR ACUTE CELLULAR REJECTION, GRADE 0/GRADE 0R"
  } else if (document.querySelector('.heart.oneA').checked == true) {
    heartFinal += " WITH FOCAL MINIMAL ACUTE CELLULAR REJECTION, GRADE 1A/GRADE 1R"
  } else if (document.querySelector('.heart.oneB').checked == true) {
    heartFinal += " WITH FOCAL MILD ACUTE CELLULAR REJECTION, GRADE 1B/GRADE 1R"
  } else if (document.querySelector('.heart.two').checked == true) {
    heartFinal += " WITH FOCAL MODERATE ACUTE CELLULAR REJECTION, GRADE 2/GRADE 1R"
  } else if (document.querySelector('.heart.threeA').checked == true) {
    heartFinal += " WITH MULTIFOCAL MODERATE ACUTE CELLULAR REJECTION, GRADE 3A/GRADE 2R"
  } else if (document.querySelector('.heart.threeB').checked == true) {
    heartFinal += " WITH DIFFUSE MODERATE ACUTE CELLULAR REJECTION, GRADE 3B/GRADE 2R"
  } else if (document.querySelector('.heart.four').checked == true) {
    heartFinal += " WITH DIFFUSE SEVERE ACUTE CELLULAR REJECTION, GRADE 4/GRADE 3R"
  }
  var others = document.getElementsByName('other');
  for (var i = 0; i < others.length; i++) {
    if (others[i].checked == true) {
      heartFinal += "\n" + "- " + others[i].value.toUpperCase()
    }
  }
  document.getElementById("heartText").value = heartFinal;
}

function subChar(cname) {
  var newChar = document.querySelectorAll(cname);
  var charFinal = [];
  var add = "";
  for (var i = 0; i < newChar.length; i++) {
    if (newChar[i].checked == true && newChar[i].name.indexOf('Add') != -1) {
      add = newChar[i].value.toUpperCase();
      var addChar = document.querySelectorAll(".placenta." + newChar[i].name);
      for (var j = 0; j < addChar.length; j++) {
        if (addChar[j].checked == true) {
          add = addChar[j].value.toUpperCase() + " " + newChar[i].value.toUpperCase();
        }
      }
      charFinal.push(add);
      document.getElementById(newChar[i].name).style.display = 'block';
    } else if (newChar[i].checked == true) {
      charFinal.push(newChar[i].value.toUpperCase())
    } else if (newChar[i].checked == false && newChar[i].name.indexOf('Add') != -1) {
      document.getElementById(newChar[i].name).style.display = 'none';
      var delChar = document.querySelectorAll(".placenta." + newChar[i].name);
      for (var j = 0; j < delChar.length; j++) {
        delChar[j].checked = false;
      }
    }
  }
  return charFinal
}

function copyText(textId) {
  var copyText = document.getElementById(textId);
  copyText.select();
  document.execCommand("copy");
}

function clearTemplate() {
  if (confirm("Are you sure you would like to clear the template?") == true) {
    var inputs = document.getElementsByName('score')
    for (i = 0; i < inputs.length; i++) {
      inputs[i].checked = false
    }
  }
  var inputs = document.getElementsByName('frags')
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = ""
  }
  heartTemp()
}

function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
  document.getElementById("mySidenav").style.border = "3px solid #111";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.border = "none";
}
