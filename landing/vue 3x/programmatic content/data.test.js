// ==>emisor<==

// object javascript
let object = {
	data: {
		curso: 'test',
		nombre: 'cristian',
		id: '2',
		correo: 'prueba@correo.com',
	},
	filter: ['correo'],
	value: ['prueba@correo.com'],
};
// stringify
let gify = JSON.stringify(object);
'{"data":{"curso":"test","nombre":"cristian","id":"2","correo":"prueba@correo.com"},"filter":["id"],"value":["2"]}';
// encodeBase64
let encoded = btoa(gify)
// J3siZGF0YSI6eyJjdXJzbyI6InRlc3QiLCJub21icmUiOiJjcmlzdGlhbiIsImlkIjoiMiIsImNvcnJlbyI6InBydWViYUBjb3JyZW8uY29tIn0sImZpbHRlciI6WyJpZCJdLCJ2YWx1ZSI6WyIyIl19Jw==;

// encodeURIComponent
encodeURIComponent(encoded);
let payload = 'J3siZGF0YSI6eyJjdXJzbyI6InRlc3QiLCJub21icmUiOiJjcmlzdGlhbiIsImlkIjoiMiIsImNvcnJlbyI6InBydWViYUBjb3JyZW8uY29tIn0sImZpbHRlciI6WyJpZCJdLCJ2YWx1ZSI6WyIyIl19Jw%3D%3D';
// FINAL
// https://seguros.comunicaciones.sura.com/cp-tcde-24012022-send?pl=eyJkYXRhIjp7ImN1cnNvIjoidGVzdCIsIm5vbWJyZSI6ImNyaXN0aWFuIiwiaWQiOiIyIiwiY29ycmVvIjoicHJ1ZWJhQGNvcnJlby5jb20ifSwiZmlsdGVyIjpbImNvcnJlbyJdLCJ2YWx1ZSI6WyJwcnVlYmFAY29ycmVvLmNvbSJdfQ%3D%3D&de=dataextensiontest&tp=add

// ==>receptor<==
// agregar
//  <script src="https://seguros.comunicaciones.sura.com/cp-tcde-24012022-send?pl=J3siZGF0YSI6eyJjdXJzbyI6InRlc3QiLCJub21icmUiOiJjcmlzdGlhbiIsImlkIjoiMiIsImNvcnJlbyI6InBydWViYUBjb3JyZW8uY29tIn0sImZpbHRlciI6WyJpZCJdLCJ2YWx1ZSI6WyIyIl19Jw%3D%3D&de=dataextensiontest&tp=add"></script>
// editar
// <script src="https://seguros.comunicaciones.sura.com/cp-tcde-24012022-send?pl=J3siZGF0YSI6eyJub21icmUiOiJ3aW5uZXIifSwiZmlsdGVyIjpbImlkIl0sInZhbHVlIjpbIjIiXX0n&de=dataextensiontest&tp=update"></script>

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

// data: {ip: "198.16.76.28"}

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
		Acompañamiento: false,
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
// https://seguros.comunicaciones.sura.com/cp-tcde-24012022-send?pl=eyJkYXRhIjp7ImZpcnN0TmFtZSI6InBydWViYSIsImxhc3ROYW1lIjoidGVzdCIsInR5cGVJZCI6ImNjIiwiaWQiOiIxIiwieWVhcnMiOiIyNyIsImdlbmVyIjoibSIsImVtYWlsIjoicHJ1ZWJhQGNvcnJlby5jb20iLCJjY3F0bjEiOiIiLCJjY3F0bjIiOiIiLCJjY3F0bjMiOiIiLCJhZnF0bjEiOiIiLCJhZnF0bjIiOiIiLCJoY3F0bjEiOiIiLCJoY3F0bjIiOiIiLCJoY3F0bjMiOiIiLCJzZnF0bjEiOiIiLCJzZnF0bjIiOiIiLCJzZnF0bjMiOiIiLCJzZnF0bjQiOiIiLCJzZnF0bjUiOiIiLCJzZnF0bjYiOiIiLCJhbnF0bjEiOiIiLCJhbnF0bjIiOiIiLCJhbnF0bjMiOiIiLCJhbnF0bjQiOiIiLCJhbnF0bjUiOiIiLCJhbnF0bjYiOiIiLCJhbnF0bjciOiIiLCJhbnF0bjgiOiIiLCJhbnF0bjkiOiIiLCJhbnF0bjEwIjoiIiwiZXNxdG4xIjoiIiwiZXNxdG4yIjoiIiwiZXNxdG4zIjoiIiwiZXNxdG40IjoiIiwiZXNxdG41IjoiIiwiZXNxdG42IjoiIiwiZXNxdG43IjoiIiwiZXNxdG44IjoiIiwiZXNxdG45IjoiIiwiZXNxdG4xMCI6IiIsImVzcXRuMTEiOiIiLCJlc3F0bjEyIjoiIiwiaXNUZXN0IjpmYWxzZSwiY2MiOiIiLCJhZiI6MCwic2YiOjAsImFuIjowLCJlcyI6MCwiaWIiOjAsIkF1dG9nZXN0aW9uIjpmYWxzZSwiSW50ZXJtZWRpbyI6ZmFsc2UsIkFjb21wYfFhbWllbnRvIjpmYWxzZX0sImZpbHRlciI6WyJlbWFpbCJdLCJ2YWx1ZSI6WyJwcnVlYmFAY29ycmVvLmNvbSJdfQ%3D%3D&de=DB%20SF-IndiceBienestar-incomplete%2007062022&tp=add