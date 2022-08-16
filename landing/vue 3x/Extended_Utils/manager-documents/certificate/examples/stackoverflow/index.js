//Convierte el div a imagen y la descarga
// function converBlockToImg(){
// 	console.log('div to img');
// 	html2canvas(document.getElementById('contenedorC')).then((canvas) => {
// 		return Canvas2Image.saveAsImage(canvas, 500, 500, 'png', 'img');
// 	});
// }

// (function (/* root, doc */) {
//   document.getElementById('btnPdf').addEventListener('click',function(){
//     console.log("hello")
//     html2canvas(document.getElementById('contenedorC'), {
//       allowTaint: true,
//       onrendered: function (canvas) {
//         theCanvas = canvas;
//         document.body.appendChild(canvas);

//         var imgData = canvas.toDataURL('image/PNG').replace('image/PNG', 'image/octet-stream');
//         var pdf = new jsPDF('l', 'mm', 'letter');

//         pdf.addImage(imgData, 'PNG', 0, 0);
//         pdf.save('download.pdf');
//       },
//     });
//   });
// })(window, document);
function saveAs(uri, filename) {
	var link = document.createElement('a');
	console.log(link.download);
	if (typeof link.download === 'string') {
		link.href = uri;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		window.open(uri);
	}
}



document.getElementById('figuras').contentEditable = 'true';
document.getElementById('figuras').designMode='on';
(function (/* root, doc */) {
  document.getElementById('btnSave2').addEventListener('click', function () {
    // console.log(document.getElementById('figuras'));
    html2canvas(document.querySelector('#figuras')).then((canvas) => {
      var imgData = canvas.toDataURL('image/PNG').replace('image/PNG', 'image/octet-stream');
      // var pdf = new jsPDF('l', 'mm', 'letter');
      var pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a5',
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('download.pdf');
      // saveAs(canvas.toDataURL(), 'canvas.png');
    });
	});
})(window, document);
