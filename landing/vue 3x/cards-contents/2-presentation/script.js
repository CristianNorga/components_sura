let testLibs = [
	'axios',
	'jspdf',
	{
    id: 'cities',
		css: './style.css',
		js: 'https://seguros.comunicaciones.sura.com/js-resource-const-cities-17052022',
	},
];
function testeatUtils(){
  window.libUtils.getLibs(testLibs, () => {
			console.log('all libraries have been loaded');
		});
}