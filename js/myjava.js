function submitDisease()
{
var result = document.getElementById('result');
var input1 = document.getElementById("DName").value;
var input2 = document.getElementById("DSubclass").value;
var input3 = document.getElementById("DOrgan").value;
var input4 = document.getElementById("DDescription").value;
var input5 = document.getElementById("DTags").value;
}

var subButton = document.getElementById('Publish');
subButton.addEventListener('click', submitDisease, false);