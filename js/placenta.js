var placentaWeights = [
  [99, 107, 130, 166, 206, 285, 499],
  [127, 168, 188, 208, 262],
  [128, 157, 192, 222, 252],
  [105, 128, 153, 184, 216, 299, 400],
  [107, 138, 179, 200, 259, 281, 570],
  [119, 130, 166, 242, 310, 332, 381],
  [103, 128, 140, 173, 214, 261, 321, 361, 371],
  [124, 135, 161, 214, 252, 309, 352, 496, 629],
  [185, 190, 208, 269, 316, 374, 433, 502, 570],
  [142, 152, 175, 246, 313, 360, 417, 479, 579],
  [161, 214, 241, 275, 318, 377, 436, 461, 465],
  [190, 224, 252, 286, 352, 413, 446, 475, 504],
  [221, 260, 283, 322, 382, 430, 479, 527, 558],
  [232, 250, 291, 344, 401, 471, 544, 600, 626],
  [270, 291, 320, 369, 440, 508, 580, 628, 679],
  [303, 324, 349, 390, 452, 531, 607, 660, 692],
  [320, 335, 365, 420, 484, 560, 629, 675, 706],
  [330, 350, 379, 426, 490, 564, 635, 683, 713],
  [340, 360, 390, 440, 501, 572, 643, 685, 715],
  [358, 379, 403, 452, 515, 583, 655, 705, 738],
  [370, 388, 412, 460, 525, 592, 658, 700, 771]
]
var percentiles = [3, 5, 10, 25, 50, 75, 90, 95, 97]


assignListeners()

function assignListeners() {
  document.getElementById('Template1').style.display = 'block'
  document.getElementById('Template').style.backgroundColor = "#008080";
  var menuToggle = 0;
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

  var placentaInput = document.querySelectorAll('.placenta');
  for (let i = 0; i < placentaInput.length; i++) {
    placentaInput[i].onclick = function() {
      placentaTemp()
    }
  }

  var placentaHead = document.querySelectorAll('.placentaHead');
  for (let i = 0; i < placentaHead.length; i++) {
    placentaHead[i].oninput = function() {
      placentaTemp()
    }
  }
  document.getElementById('copyPlacentaText').onclick = function() {
    validatePlacenta()
  }
  document.getElementById('clearPlacentaTemplate').onclick = function() {
    clearPlacentaTemplate()
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
  placentaTemp()
}

function openPage(pageName, elmnt) {
  var i, tabcontent, tablinks;
  if (pageName == "Placenta1") {
    placentaTemp()
  }
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

function placentaTemp() {
  var weeks = document.getElementById("weeks").value;
  var days = document.getElementById("days").value;
  var mass = document.getElementById("mass").value;
  var operation = document.getElementById("operation").value.toUpperCase()
  var header = "";
  var placentaFinal = "";
  var percentile = "";
  var placentaIndex = 0;
  var header = "ERROR"
  if (weeks == "" || days == "" || mass == "" || operation == "") {
    header += " - NEED MORE INFORMATION"
  } else if (weeks > 21 && weeks < 43 && days > -1 && days < 8 && mass > 0) {
    var placentaIndex = weeks - 22;
    var weekIndex = placentaWeights[placentaIndex];
    var fudge = (9 - weekIndex.length) / 2
    for (i = 0; i < weekIndex.length; i++) {
      if (i == 0 && mass < weekIndex[i] && fudge == 0) {
        percentile = "<3RD PERCENTILE"
        break
      } else if (i == 0 && mass < weekIndex[i]) {
        percentile = "<" + percentiles[fudge] + "TH PERCENTILE"
        break
      } else if (mass > weekIndex[i] && mass < weekIndex[i + 1]) {
        percentile = percentiles[i] + "-" + percentiles[i + 1] + "TH PERCENTILES"
        break
      } else if (i == weekIndex.length - 1 && mass > weekIndex[i]) {
        var lastWeight = weekIndex.length - 1 + fudge
        percentile = ">" + percentiles[lastWeight] + "TH PERCENTILE"
        break
      } else if (mass == weekIndex[i]) {
        fudge = i + fudge
        percentile = percentiles[fudge]
        if (percentiles[fudge] == 3) {
          percentile += "RD PERCENTILE"
        } else {
          percentile += "TH PERCENTILE"
        }
      }
    }
    header = "PLACENTA, " + weeks + "W" + days + "D, " + mass + " GRAMS (" + percentile + "); " + operation + ":"
  } else if (weeks <= 21 || weeks >= 43) {
    header = "PLACENTA, " + weeks + "W" + days + "D, " + mass + " GRAMS; " + operation + ":"
  } else {
    header += " - DATA OUTSIDE LIMITS"
  }

  placentaFinal += header + "\n"
  if (weeks > 27 || weeks == "") {
    placentaFinal += "-THIRD TRIMESTER PLACENTA WITH "
  } else if (weeks > 13) {
    placentaFinal += "-SECOND TRIMESTER PLACENTA WITH "
  } else {
    placentaFinal += "-FIRST TRIMESTER PLACENTA WITH "
  }
  var villiChar = subChar('.placenta.villi');
  if (villiChar.length > 1) {
    placentaFinal = "ERROR: INCOMPATIBLE VILLOUS CHARACTERISTICS"
    document.getElementById("placentaText").value = placentaFinal
    return
  } else if (villiChar.length == 0) {
    placentaFinal += "APPROPRIATE VILLOUS MATURATION"
  } else {
    placentaFinal += villiChar;
  }
  var pcharFinal = subChar('.placenta.pchar');
  if (pcharFinal.length == 1) {
    placentaFinal += " AND " + pcharFinal[0];
  } else {
    for (i = 0; i < pcharFinal.length; i++) {
      if (i == pcharFinal.length - 1) {
        placentaFinal += ", AND " + pcharFinal[i]
      } else {
        placentaFinal += ", " + pcharFinal[i]
      }
    }
  }
  placentaFinal += '\n' + "-FETAL MEMBRANES ";
  var mcharFinal = subChar('.placenta.mchar');

  if (mcharFinal.length == 0) {
    placentaFinal += "NEGATIVE FOR ACUTE INFLAMMATION"
  } else if (mcharFinal.length == 1) {
    placentaFinal += "WITH " + mcharFinal[0];
  } else if (mcharFinal.length == 2) {
    placentaFinal += "WITH " + mcharFinal[0] + " AND " + mcharFinal[1];
  } else {
    for (i = 0; i < mcharFinal.length; i++) {
      if (i == 0) {
        placentaFinal += "WITH " + mcharFinal[i]
      } else if (i == mcharFinal.length - 1) {
        placentaFinal += ", AND " + mcharFinal[i]
      } else {
        placentaFinal += ", " + mcharFinal[i]
      }
    }
  }
  placentaFinal += '\n'
  if (document.getElementById('cord1').checked == true) {
    placentaFinal += "-THREE VESSEL UMBILICAL CORD"
  } else {
    placentaFinal += "-TWO VESSEL UMBILICAL CORD"
  }
  if (document.getElementById('cord3').checked == true) {
    placentaFinal += " WITH ACUTE FUNISITIS"
  }
  document.getElementById("placentaText").value = placentaFinal
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

function validatePlacenta() {
  var mass = document.getElementById('mass').value
  if (weeks == "" || days == "" || mass == "" || operation == "") {
    if (confirm("The template is not complete. Would you like to continue?") == true) {
      copyText('placentaText')
    }
  } else if (mass > 1500 || mass < 100) {
    if (confirm("The placenta mass is " + mass + " g. Is this correct?") == true) {
      copyText('placentaText')
    }
  } else {
    copyText('placentaText')
  }
}

function copyText(textId) {
  var copyText = document.getElementById(textId);
  copyText.select();
  document.execCommand("copy");
  if (confirm("The text has been copied to clipboard. Would you like to clear the template?") == true) {
    var placInputs = document.getElementsByClassName('placenta')
    for (i = 0; i < placInputs.length; i++) {
      placInputs[i].checked = false
    }
    var placHeadInputs = document.getElementsByClassName('placentaHead')
    for (i = 0; i < placHeadInputs.length; i++) {
      placHeadInputs[i].value = ""
    }
    document.getElementById('cord1').checked = true;
    placentaTemp();
  }
}

function clearPlacentaTemplate() {
  if (confirm("Are you sure you would like to clear the template?") == true) {
    var placInputs = document.getElementsByClassName('placenta')
    for (i = 0; i < placInputs.length; i++) {
      placInputs[i].checked = false
    }
    var placHeadInputs = document.getElementsByClassName('placentaHead')
    for (i = 0; i < placHeadInputs.length; i++) {
      placHeadInputs[i].value = ""
    }
    document.getElementById('cord1').checked = true;
    placentaTemp();
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
  document.getElementById("mySidenav").style.borderRight = "3px solid #111";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.borderRight = "none";
}
