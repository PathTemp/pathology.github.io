$(document).ready(function () {
  $('#example').DataTable();
});

$(document).ready(function () {
  var t = $('#example').DataTable();
  var counter = 1;

  $('#submit1').on('click', function () {
    t.row.add([
      document.getElementById("DName").value,
			document.getElementById("DSubclass").value,
			document.getElementById("DOrgan").value,
			document.getElementById("DDescription").value,
			document.getElementById("DTags").value,
    ]).draw(false);

    counter++;
  });

  // Automatically add a first row of data
  $('#addRow').click();
});
