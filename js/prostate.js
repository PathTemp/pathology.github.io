var allParts = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
var leftApex = ['Left Apex', 'Left Mid', 'Left Base', 'Right Apex', 'Right Mid', 'Right Base', "", "", "", "", "", ""]
var leftBase = ['Left Base', 'Left Mid', 'Left Apex', 'Right Base', 'Right Mid', 'Right Apex', "", "", "", "", "", ""]
var rightApex = ['Right Apex', 'Right Mid', 'Right Base', 'Left Apex', 'Left Mid', 'Left Base', "", "", "", "", "", ""]
var rightBase = ['Right Base', 'Right Mid', 'Right Apex', 'Left Base', 'Left Mid', 'Left Apex', "", "", "", "", "", ""]
var adenoText = "-PROSTATIC ADENOCARCINOMA, ACINAR TYPE, GLEASON SCORE "
var hgpin = "-HIGH GRADE PROSTATIC INTRAEPITHELIAL NEOPLASIA (HGPIN)"
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

  var inputList = document.querySelectorAll('.click')
  for (let i = 0; i < inputList.length; i++) {
    inputList[i].onclick = function() {
      prostateTemp()
    }
  }
  var inputList = document.querySelectorAll('.input')
  for (let i = 0; i < inputList.length; i++) {
    inputList[i].oninput = function() {
      prostateTemp()
    }
  }

  document.getElementById('copy').onclick = function() {
    copyText()
  }
  document.getElementById('clear').onclick = function() {
    clearText()
  }

  prostateTemp()
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

function checkTemp() {
  var templateVar;
  if (document.getElementById("temp1").checked == true) {
    templateVar = leftApex
  } else if (document.getElementById("temp2").checked == true) {
    templateVar = leftBase
  } else if (document.getElementById("temp3").checked == true) {
    templateVar = rightApex
  } else {
    templateVar = rightBase
  }
  return templateVar
}

function isupGroup(prim, sec) {
  try {
    var group = 0;
    if (prim + sec == 6) {
      var group = 1
    } else if (prim == 3 && sec == 4) {
      var group = 2
    } else if (prim == 4 && sec == 3) {
      var group = 3
    } else if (prim + sec == 8) {
      var group = 4
    } else {
      group = 5
    }
    return group
  } catch (error) {
    log("Error caught: checkCancer", error);
    throw error;
  }
}


function checkCancer(prim, sec) {
  try {
    var cancer = "";
    if (prim > 2 && sec > 2) {
      cancer = "yes"
    } else if (prim > 2 || sec > 2) {
      cancer = "nei"
    } else {
      cancer = "no"
    }
    return cancer
  } catch (error) {
    log("Error caught: checkCancer", error);
    throw error;
  }
}


function prostateTemp() {
  try {
    var finalVar = "";
    var i;
    var tempVar = checkTemp();
    for (i = 0; i < allParts.length; i++) {
      var partVar = allParts[i];
      document.getElementById("loc" + partVar).placeholder = tempVar[i]
      if (document.getElementById('part' + partVar).checked == true) {
        var locVar = document.getElementById("loc" + partVar);
        if (locVar.value == "") {
          var locVar = locVar.placeholder.toUpperCase();
        } else {
          var locVar = locVar.value.toUpperCase();
        }
        var primVar = parseInt(document.getElementById("prim" + partVar).value);
        var secVar = parseInt(document.getElementById("sec" + partVar).value);
        var checkCancerVar = checkCancer(primVar, secVar)
        var groupVar = isupGroup(primVar, secVar);
        var percentVar = document.getElementById("percent" + partVar).value
        var headerVar = partVar + ". PROSTATE, " + locVar + "; BIOPSY:" + "\n"
        var adenoVar = headerVar + adenoText + (primVar + secVar) + " (" + primVar + "+" + secVar + "), ISUP GRADE GROUP " + groupVar + ", INVOLVING " + percentVar + "% OF THE TOTAL PROSTATIC TISSUE EXAMINED"
        if (document.getElementById("hgpin" + partVar).checked == true) {
          adenoVar += "\n" + hgpin
        }
        if (document.getElementById("pni" + partVar).checked == true && checkCancerVar == "yes") {
          adenoVar += "\n" + "-PERINEURAL INVASION IS IDENTIFIED"
        }
        if (checkCancerVar == "yes") {
          finalVar += adenoVar
        } else if (checkCancerVar == "nei") {
          finalVar += headerVar + "Not enough information!"
        } else if (document.getElementById("hgpin" + partVar).checked == true) {
          finalVar += headerVar + hgpin
        } else {
          finalVar += headerVar + "-BENIGN PROSTATIC GLANDS AND STROMA"
        }
        if (i != allParts.length - 1) {
          finalVar += "\n" + "\n"
        }
      }
    }

    document.getElementById("finalText").value = finalVar
  } catch (error) {
    log("Error caught: checkCancer", error);
    throw error;
  }
}

function copyText() {
  var copyText = document.getElementById('finalText');
  copyText.select();
  document.execCommand("copy");
}

function clearText() {
  if (confirm("Are you sure you would like to clear the template?") == true) {
    var tempVar = checkTemp();
    var clearChecked = document.querySelectorAll('.click')
    for (var i = 0; i < clearChecked.length; i++) {
      clearChecked[i].checked = false;
      }
    var clearInput = document.querySelectorAll('.input')  
    for (var i = 0; i < clearInput.length; i++) {
    	clearInput[i].value = "";
    }
    for (var i = 0; i < 6; i++) {
    document.getElementById('part' + allParts[i]).checked = true;
    }
    document.getElementById('temp1').checked = true;
    prostateTemp();
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
  document.getElementById("mySidenav").style.border = "3px solid #111";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.border = "none";
}
