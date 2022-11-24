let dataurlpdf =
	'';

// const { createApp } = Vue;

// const app = createApp({
// 	data() {
// 		return {
// 			recursos64: {
// 				fondo: '',
// 			},
// 		};
// 	},
// });

// app.component('generateCertificate', {
// 	data() {
// 		return {};
// 	},
// });

	// let ctpdf = document.getElementById('example');
	// ctpdf.setAttribute('src', string);
  var test, pdfDoc, person, positionYText, hoursOfCourse;

	person = document.getElementById('nameOfPerson');
	positionYText = document.getElementById('positionYText');
	hoursOfCourse = document.getElementById('hoursOfCourse');

  async function modifyPdf() {
		let namePerson = person.value.toUpperCase();
		let sizeName = 0;
		if (namePerson.length < 30) {
			sizeName = 30;
		} else if (namePerson >= 30 && namePerson < 40) {
			sizeName = 28;
		} else {
			sizeName = 26;
		}

		console.log('generating');

		pdfDoc = await PDFLib.PDFDocument.load(pdfData64.pdf1);
		pdfDoc.setTitle('Congreso SURA 2022');
		pdfDoc.setAuthor('SURA');
		// pdfDoc.setSubject('📘 An Epic Tale of Woe 📖');
		// pdfDoc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men']);
		// pdfDoc.setProducer('PDF App 9000 🤖');
		pdfDoc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)');
		pdfDoc.setCreationDate((new Date()));
		// pdfDoc.setModificationDate(new Date('2019-12-21T07:00:11.000Z'));

		pdfDoc.registerFontkit(window.fontkit);
		const fontNameDynamic = await pdfDoc.embedFont(fontData.barlow_extraBold);
		// const fontNameDynamic = await pdfDoc.embedFont(fontData.fsJoy);

		let textWidth = fontNameDynamic.widthOfTextAtSize(namePerson, sizeName);

		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();
		// textWidth/2
		console.log('width of page', width); //792
		

		firstPage.drawText(namePerson, {
			// x: width - textWidth - 86,
			x: width / 2 - textWidth / 2,
			y: 347,
			// maxWidth: 20,
			size: sizeName,
			font: fontNameDynamic,
			color: PDFLib.rgb(0, 0.2, 0.627),
		});

		let size2 = 20;
		let textHours = fontNameDynamic.widthOfTextAtSize(hoursOfCourse.value, size2);
		console.log('textHours', textHours);

		if(textHours > 36.24){
			size2 = 18;
			textHours = fontNameDynamic.widthOfTextAtSize(hoursOfCourse.value, size2);
		}

		firstPage.drawText(hoursOfCourse.value, {
			x: 423.72 + 36.24 / 2 - textHours / 2,
			y: Number(positionYText.value),
			// maxWidth: 20,
			size: size2,
			font: fontNameDynamic,
			color: PDFLib.rgb(0, 0.2, 0.627),
		});


		const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });

		var link = document.createElement('a');
		link.href = pdfBase64;
		link.download = 'certificado congreso sura 2022.pdf';
		link.dispatchEvent(new MouseEvent('click'));
		link.remove();

		// console.log(pdfBase64);
		let ctpdf = document.getElementById('example');
		ctpdf.setAttribute('src', pdfBase64);
	}

  // document.getElementById('btnSave2').addEventListener('click', modifyPdf);
  document.getElementById('btnShow').addEventListener('click', modifyPdf);

