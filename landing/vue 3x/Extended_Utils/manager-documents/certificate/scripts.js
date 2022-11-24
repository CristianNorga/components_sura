//<script src="./resourcesForPDF.js"></script>

const {createApp} = Vue;

const app = createApp({
  data() {
    return {
      recursos64: {
        fondo: '',
					},
				};
  }
});

app.component('generateCertificate', {
  data(){
    return {
    }
  }
})

app.mount('#app');

var img, options, certificate, test;

// options = { //Canvas2Image
//   windowWidth: 1401,
//   width: 952.44,
//   height: 671.23,
  // canvas: document.getElementById('generateCertificate'),
// }
// html2canvas(document.querySelector('#origin'),options).then((canvas) => {
	// canvas.setAttribute('width', 952.44);
	// canvas.setAttribute('height', 671.23);
	// document.body.appendChild(canvas);

	// console.log(canvas);
	// img = Canvas2Image.convertToPNG(canvas, 794, 559, 'png', 'img');
	// document.getElementById('origin').remove();
	// img.classList.add('img-fluid');
	// document.getElementById('sample').appendChild(img);
// });
function ruleOf3(fMultiplier = 1, sMultiplier = 2, divider = 100) {
	return (fMultiplier * sMultiplier) / divider;
}

var pdf = new jsPDF({
	orientation: 'landscape',
	unit: 'mm',
	format: 'a4',
});
let nameIndividual = 'CRISTIAN DAVID NOREÑA SALDARRIAGA';
pdf.setProperties({
	title: 'Certificado',
	subject: nameIndividual,
	author: 'Sura',
	// keywords: 'generated, javascript, web 2.0, ajax',
	// creator: '',
});

const pageWidth = pdf.internal.pageSize.width;
const pageHeight = pdf.internal.pageSize.height;
const pxTomm = 0.26458333333333;
// @franjaH_p: porcent
// @logoH_px: pixel **Height
// @logoW_px: pixel **Width
// @logoS_p: porcent **Size"general"
// @logoPT_p: porcent **Position top
const cfg = {
	franjaH_p: 30,
	logoW_px: 113.44,
	logoH_px: 42,
	logoS_p: 20,
	logoPT_p: 8,
	nameIndividual: nameIndividual.toUpperCase(),
	selloW_px: 200,
	selloS_p: 13,
	selloPS_p: 31.2
}

const sp = {
	xs: 0.75,
	sm: 1,
	md: 1.25,
	lg: 2.5,
	xl: 5,
	xxl: 6,
}

pdf.addFileToVFS('Barlow-Regular-normal.ttf', fontData.barlow_regular);
pdf.addFont('Barlow-Regular-normal.ttf', 'Barlow-400', 'normal');
pdf.addFileToVFS('Barlow-SemiBold-normal.ttf', fontData.barlow_semiBold);
pdf.addFont('Barlow-SemiBold-normal.ttf', 'Barlow-600', 'normal');
pdf.addFileToVFS('Barlow-ExtraBold-normal.ttf', fontData.barlow_extraBold);
pdf.addFont('Barlow-ExtraBold-normal.ttf', 'Barlow-800', 'normal');

pdf.addImage(mediaData64.fondo, 'png', 0, 0, pageWidth, pageHeight, undefined, 'slow');

// franja
let franjaAltura = ruleOf3(cfg.franjaH_p, pageHeight)
pdf.setFillColor(0, 51, 160);
pdf.rect(0, pageHeight - franjaAltura, pageWidth, franjaAltura, 'F');

//logo
let logoAncho = ruleOf3(cfg.logoS_p,pageWidth);
let logoAlto = ruleOf3(logoAncho,cfg.logoH_px,cfg.logoW_px);
let logoPositionY = ruleOf3(pageHeight, cfg.logoPT_p);
pdf.addImage(
	mediaData64.logo,
	(pageWidth - logoAncho) / 2,
	logoPositionY,
	logoAncho,
	logoAlto
);

pdf.setTextColor(0, 0, 0);
//certifica
let text1_certPositionY = logoPositionY + logoAlto + ruleOf3(sp.xxl, pageHeight); 
pdf.setFont('Barlow-800', 'normal');
pdf.setFontSize(16);
pdf.text('Certifica a', pageWidth/2, text1_certPositionY, 'center');

//nombre de la persona
if(cfg.nameIndividual.length < 30){
	pdf.setFontSize(30);
} else if (cfg.nameIndividual.length >= 30 && cfg.nameIndividual.length < 40) {
	pdf.setFontSize(28);
} else {
	pdf.setFontSize(26);
}
let text2_namPositionY = text1_certPositionY + 8 + ruleOf3(sp.lg, pageHeight); 
pdf.setFont('Barlow-600', 'normal');
pdf.text(cfg.nameIndividual, pageWidth / 2, text2_namPositionY, 'center');

//por participar en
let text3_byPositionY = text2_namPositionY + 5 + ruleOf3(sp.lg, pageHeight); 
pdf.setFont('Barlow-600', 'normal');
pdf.setFontSize(16);
pdf.text('Por participar en', pageWidth / 2, text3_byPositionY, 'center');

//sección materia,curso,etc aprobado
let section1_byPositionY = text3_byPositionY + 5 + ruleOf3(sp.xl, pageHeight);
//sello
let selloAncho = ruleOf3(cfg.selloS_p, pageWidth);
let SelloPositionX = ruleOf3(pageWidth, cfg.selloPS_p);
pdf.addImage(
	mediaData64.sello,
	SelloPositionX,
	section1_byPositionY,
	selloAncho,
	selloAncho
);
// texto sello
let text4_byPositionY =
	section1_byPositionY + 5 + ruleOf3(sp.md, pageHeight) + ((selloAncho/2)/2)/1.2;
pdf.setFont('Barlow-800', 'normal');
pdf.setFontSize(36);
pdf.text(
	'CONGRESO',
	selloAncho + SelloPositionX + 5,
	text4_byPositionY,
	'left'
);
let text5_byPositionY = text4_byPositionY + 10 + ruleOf3(sp.md, pageHeight);
pdf.text(
	'MEDELLIN',
	selloAncho + SelloPositionX + 5,
	text5_byPositionY,
	'left'
);

var string = pdf.output('datauristring');
// ctpdf.setAttribute('src', string + '#view=fit&scrollbar=0&toolbar=0&statusbar=0');
let ctpdf = document.getElementById('example');
ctpdf.setAttribute(
	'src',
	string
);

// ctpdf.setAttribute('original-url', string);
// ctpdf.setAttribute('type', 'application/x-google-chrome-pdf');
// ctpdf.setAttribute(
// 	'src',
// 	'chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/d800e52f-c97b-4f87-9b59-b00895382fcd'
// );
// ctpdf.setAttribute('background-color', '0xFF333333');
// ctpdf.setAttribute('first-page-separator', '4');
// ctpdf.setAttribute('style', string);
// ctpdf.setAttribute(
// 	'original-url',
// 	'position: relative !important; top: 41px; min-height: calc(100% - 41px);'
// );
// ctpdf.setAttribute('javascript', 'allow');
// ctpdf.setAttribute('original-url', string);
// ctpdf.setAttribute('original-url', string);
// ctpdf.setAttribute('original-url', string);
// ctpdf.setAttribute('original-url', string);

// var bufferArray = pdf.output('arraybuffer');
// let src = new Buffer.from(bufferArray).toString("base64")
// src = 'data:image/png;base64,' + base64Img;
// document.getElementById('example2').setAttribute('src', src);


test = pdf;

document.getElementById('btnSave2').addEventListener('click', function () {
	// var imgData = canvas.toDataURL('image/PNG').replace('image/PNG', 'image/octet-stream');
	pdf.save('download.pdf');
});