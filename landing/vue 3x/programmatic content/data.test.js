// ==>emisor<==

// object javascript
let object = {
	data: {
		curso: 'test',
		nombre: 'cristian',
		dni: 'C1037640856',
		correo: 'prueba@correo.com',
	},
	filter: ['dni'],
	value: ['C1037640856'],
};
// stringify
let gify = JSON.stringify(object);
'{"data":{"curso":"test","nombre":"cristian","dni":"C1037640856","correo":"prueba@correo.com"},"filter":["dni"],"value":["C1037640856"]}';
// encodeBase64
let encoded = btoa(gify)
// eyJkYXRhIjp7ImN1cnNvIjoidGVzdCIsIm5vbWJyZSI6ImNyaXN0aWFuIiwiZG5pIjoiQzEwMzc2NDA4NTYiLCJjb3JyZW8iOiJwcnVlYmFAY29ycmVvLmNvbSJ9LCJmaWx0ZXIiOlsiZG5pIl0sInZhbHVlIjpbIkMxMDM3NjQwODU2Il19;

// encodeURIComponent
encodeURIComponent(encoded);
let payload =
	'eyJkYXRhIjp7ImN1cnNvIjoidGVzdCIsIm5vbWJyZSI6ImNyaXN0aWFuIiwiZG5pIjoiQzEwMzc2NDA4NTYiLCJjb3JyZW8iOiJwcnVlYmFAY29ycmVvLmNvbSJ9LCJmaWx0ZXIiOlsiZG5pIl0sInZhbHVlIjpbIkMxMDM3NjQwODU2Il19';
	
// FINAL
// ?pl=https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce-2?pl=eyJkYXRhIjp7ImN1cnNvIjoidGVzdCIsIm5vbWJyZSI6ImNyaXN0aWFuIiwiZG5pIjoiQzEwMzc2NDA4NTYiLCJjb3JyZW8iOiJwcnVlYmFAY29ycmVvLmNvbSJ9LCJmaWx0ZXIiOlsiZG5pIl0sInZhbHVlIjpbIkMxMDM3NjQwODU2Il19&de=extension%20test%202022&tp=add

// ==>receptor<==
// agregar
//  <script src="https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce-2?pl=https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce-2?pl=eyJkYXRhIjp7ImN1cnNvIjoidGVzdCIsIm5vbWJyZSI6ImNyaXN0aWFuIiwiZG5pIjoiQzEwMzc2NDA4NTYiLCJjb3JyZW8iOiJwcnVlYmFAY29ycmVvLmNvbSJ9LCJmaWx0ZXIiOlsiZG5pIl0sInZhbHVlIjpbIkMxMDM3NjQwODU2Il19&de=extension%20test%202022&tp=add"></script>
// editar

// <script src=" https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce-2?pl=J3siZGF0YSI6eyJub21icmUiOiJ3aW5uZXIifSwiZmlsdGVyIjpbImlkIl0sInZhbHVlIjpbIjIiXX0n&de=dataextensiontest&tp=update"></script>

// ==>response<==

// prueba%40correo.com

// add -> addrow = 1
// read -> addrow = 1 JSON.parse(window.suraResult.response)[0].<correo>
// delete -> addrow = 1
// update -> addrow = 1




// get ip
async function getIpClient() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getIpClient();

// data: {ip: "190.249.225.53"}

// https://salesforce.stackexchange.com/questions/137595/is-it-possible-to-retrieve-the-client-ip-address-on-a-landing-page
// %%=HTTPGet('https://api.ipify.org')=%%</p>

// TEST APP SALUD FINANCIERA##########################################################
// object javascript
let test = {
	data: {
		firstName: 'prueba',
		lastName: 'test',
		typeId: 'cc',
		id: '1',
		years: '27',
		gener: 'm',
		email: 'prueba@correo.com',
		ccqtn1: '',
		ccqtn2: '',
		ccqtn3: '',
		afqtn1: '',
		afqtn2: '',
		hcqtn1: '',
		hcqtn2: '',
		hcqtn3: '',
		sfqtn1: '',
		sfqtn2: '',
		sfqtn3: '',
		sfqtn4: '',
		sfqtn5: '',
		sfqtn6: '',
		anqtn1: '',
		anqtn2: '',
		anqtn3: '',
		anqtn4: '',
		anqtn5: '',
		anqtn6: '',
		anqtn7: '',
		anqtn8: '',
		anqtn9: '',
		anqtn10: '',
		esqtn1: '',
		esqtn2: '',
		esqtn3: '',
		esqtn4: '',
		esqtn5: '',
		esqtn6: '',
		esqtn7: '',
		esqtn8: '',
		esqtn9: '',
		esqtn10: '',
		esqtn11: '',
		esqtn12: '',
		isTest: false,
		cc: '',
		af: 0,
		sf: 0,
		an: 0,
		es: 0,
		ib: 0,
		Autogestion: false,
		Intermedio: false,
		Acompanamiento: false,
	},
	filter: ['email'],
	value: ['prueba@correo.com'],
};
// stringify
test = JSON.stringify(test);
'{"data":{"curso":"test","nombre":"cristian","id":"2","correo":"prueba@correo.com"},"filter":["id"],"value":["2"]}';
// encodeBase64
test = btoa(test);
// J3siZGF0YSI6eyJjdXJzbyI6InRlc3QiLCJub21icmUiOiJjcmlzdGlhbiIsImlkIjoiMiIsImNvcnJlbyI6InBydWViYUBjb3JyZW8uY29tIn0sImZpbHRlciI6WyJpZCJdLCJ2YWx1ZSI6WyIyIl19Jw==;

// encodeURIComponent
test = encodeURIComponent(test);
'J3siZGF0YSI6eyJjdXJzbyI6InRlc3QiLCJub21icmUiOiJjcmlzdGlhbiIsImlkIjoiMiIsImNvcnJlbyI6InBydWViYUBjb3JyZW8uY29tIn0sImZpbHRlciI6WyJpZCJdLCJ2YWx1ZSI6WyIyIl19Jw%3D%3D';
// FINAL
// https://seguros.comunicaciones.sura.com/ssjs-mdsf-2?pl=eyJkYXRhIjp7ImZpcnN0TmFtZSI6InBydWViYSIsImxhc3ROYW1lIjoidGVzdCIsInR5cGVJZCI6ImNjIiwiaWQiOiIxIiwieWVhcnMiOiIyNyIsImdlbmVyIjoibSIsImVtYWlsIjoicHJ1ZWJhQGNvcnJlby5jb20iLCJjY3F0bjEiOiIiLCJjY3F0bjIiOiIiLCJjY3F0bjMiOiIiLCJhZnF0bjEiOiIiLCJhZnF0bjIiOiIiLCJoY3F0bjEiOiIiLCJoY3F0bjIiOiIiLCJoY3F0bjMiOiIiLCJzZnF0bjEiOiIiLCJzZnF0bjIiOiIiLCJzZnF0bjMiOiIiLCJzZnF0bjQiOiIiLCJzZnF0bjUiOiIiLCJzZnF0bjYiOiIiLCJhbnF0bjEiOiIiLCJhbnF0bjIiOiIiLCJhbnF0bjMiOiIiLCJhbnF0bjQiOiIiLCJhbnF0bjUiOiIiLCJhbnF0bjYiOiIiLCJhbnF0bjciOiIiLCJhbnF0bjgiOiIiLCJhbnF0bjkiOiIiLCJhbnF0bjEwIjoiIiwiZXNxdG4xIjoiIiwiZXNxdG4yIjoiIiwiZXNxdG4zIjoiIiwiZXNxdG40IjoiIiwiZXNxdG41IjoiIiwiZXNxdG42IjoiIiwiZXNxdG43IjoiIiwiZXNxdG44IjoiIiwiZXNxdG45IjoiIiwiZXNxdG4xMCI6IiIsImVzcXRuMTEiOiIiLCJlc3F0bjEyIjoiIiwiaXNUZXN0IjpmYWxzZSwiY2MiOiIiLCJhZiI6MCwic2YiOjAsImFuIjowLCJlcyI6MCwiaWIiOjAsIkF1dG9nZXN0aW9uIjpmYWxzZSwiSW50ZXJtZWRpbyI6ZmFsc2UsIkFjb21wYW5hbWllbnRvIjpmYWxzZX0sImZpbHRlciI6WyJlbWFpbCJdLCJ2YWx1ZSI6WyJwcnVlYmFAY29ycmVvLmNvbSJdfQ%3D%3D&de=DB%20SF-IndiceBienestar-incomplete%2007062022&tp=add

// JSON.parse(atob(decodeURIComponent('<>')))

// prueba inicial eyJkYXRhIjp7ImZpcnN0TmFtZSI6InBydWViYSIsImxhc3ROYW1lIjoidGVzdCIsInR5cGVJZCI6ImNjIiwiaWQiOiIxIiwieWVhcnMiOiIyNyIsImdlbmVyIjoibSIsImVtYWlsIjoicHJ1ZWJhQGNvcnJlby5jb20iLCJjY3F0bjEiOiIiLCJjY3F0bjIiOiIiLCJjY3F0bjMiOiIiLCJhZnF0bjEiOiIiLCJhZnF0bjIiOiIiLCJoY3F0bjEiOiIiLCJoY3F0bjIiOiIiLCJoY3F0bjMiOiIiLCJzZnF0bjEiOiIiLCJzZnF0bjIiOiIiLCJzZnF0bjMiOiIiLCJzZnF0bjQiOiIiLCJzZnF0bjUiOiIiLCJzZnF0bjYiOiIiLCJhbnF0bjEiOiIiLCJhbnF0bjIiOiIiLCJhbnF0bjMiOiIiLCJhbnF0bjQiOiIiLCJhbnF0bjUiOiIiLCJhbnF0bjYiOiIiLCJhbnF0bjciOiIiLCJhbnF0bjgiOiIiLCJhbnF0bjkiOiIiLCJhbnF0bjEwIjoiIiwiZXNxdG4xIjoiIiwiZXNxdG4yIjoiIiwiZXNxdG4zIjoiIiwiZXNxdG40IjoiIiwiZXNxdG41IjoiIiwiZXNxdG42IjoiIiwiZXNxdG43IjoiIiwiZXNxdG44IjoiIiwiZXNxdG45IjoiIiwiZXNxdG4xMCI6IiIsImVzcXRuMTEiOiIiLCJlc3F0bjEyIjoiIiwiaXNUZXN0IjpmYWxzZSwiY2MiOiIiLCJhZiI6MCwic2YiOjAsImFuIjowLCJlcyI6MCwiaWIiOjAsIkF1dG9nZXN0aW9uIjpmYWxzZSwiSW50ZXJtZWRpbyI6ZmFsc2UsIkFjb21wYW5hbWllbnRvIjpmYWxzZX0sImZpbHRlciI6WyJlbWFpbCJdLCJ2YWx1ZSI6WyJwcnVlYmFAY29ycmVvLmNvbSJdfQ%3D%3D

// secundarias eyJkYXRhIjp7ImZpcnN0TmFtZSI6ImNyaXN0aWFuIGRhdmlkIiwibGFzdE5hbWUiOiJub3JlbmEgc2FsZGFycmlhZ2EiLCJ0eXBlSWQiOiJDQyIsImlkIjoiMTAzNzY0MDg1NiIsInllYXJzIjoiMjciLCJnZW5lciI6Ik0iLCJlbWFpbCI6ImNyaXN0aWFuLnJyYWdhOTVAaG90bWFpbC5jb20iLCJVc29fRGF0b3MiOiJT7SIsImNjcXRuMSI6IiIsImNjcXRuMiI6IiIsImNjcXRuMyI6IiIsImFmcXRuMSI6IiIsImFmcXRuMiI6IiIsImhjcXRuMSI6IiIsImhjcXRuMiI6IiIsImhjcXRuMyI6IiIsInNmcXRuMSI6IiIsInNmcXRuMiI6IiIsInNmcXRuMyI6IiIsInNmcXRuNCI6IiIsInNmcXRuNSI6IiIsInNmcXRuNiI6IiIsImFucXRuMSI6IiIsImFucXRuMiI6IiIsImFucXRuMyI6IiIsImFucXRuNCI6IiIsImFucXRuNSI6IiIsImFucXRuNiI6IiIsImFucXRuNyI6IiIsImFucXRuOCI6IiIsImFucXRuOSI6IiIsImFucXRuMTAiOiIiLCJlc3F0bjEiOiIiLCJlc3F0bjIiOiIiLCJlc3F0bjMiOiIiLCJlc3F0bjQiOiIiLCJlc3F0bjUiOiIiLCJlc3F0bjYiOiIiLCJlc3F0bjciOiIiLCJlc3F0bjgiOiIiLCJlc3F0bjkiOiIiLCJlc3F0bjEwIjoiIiwiZXNxdG4xMSI6IiIsImVzcXRuMTIiOiIiLCJpc1Rlc3QiOmZhbHNlLCJjYyI6IiIsImFmIjowLCJzZiI6MCwiYW4iOjAsImVzIjowLCJpYiI6MCwiQXV0b2dlc3Rpb24iOmZhbHNlLCJJbnRlcm1lZGlvIjpmYWxzZSwiQWNvbXBhbmFtaWVudG8iOmZhbHNlfSwiZmlsdGVyIjpbImVtYWlsIl0sInZhbHVlIjpbImNyaXN0aWFuLnJyYWdhOTVAaG90bWFpbC5jb20iXX0%3D

function verify() {
	let iscorrect = true;
	Object.keys(test.data).forEach((item) => {
		if (test2.data[item] === undefined) {
			iscorrect = false;
		}
	});
	return iscorrect;
}