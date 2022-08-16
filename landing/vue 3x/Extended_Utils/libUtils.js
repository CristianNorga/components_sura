// libUtils@2.0.0 created in base to smartCapture, adapted for graphic solutions +573125802861
// https://seguros.comunicaciones.sura.com/js-libUtils@2-02082022
window.libUtils = {
	data: {
		libs: {
			axios: {
				js: [
					{
						url: 'https://seguros.comunicaciones.sura.com/js-axios@0.27.2-30072022',
					},
				],
			},
			jspdf: {
				js: [
					{ url: 'https://seguros.comunicaciones.sura.com/jspdf@2.5.1-26072022' },
				],
			},
			cities: {
				js: [
					{
						url: 'https://seguros.comunicaciones.sura.com/js-resource-const-cities-17052022',
					},
				],
			},
			fontBarlow: {
				css: [
					{
						url: 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap',
						attrs: { rel: 'stylesheet' },
					},
				],
			},
			bootstrap: {
				css: [
					{
						url: 'https://seguros.comunicaciones.sura.com/css-btp@5.2-seguros-sura',
					},
				],
			},
			vue3: {
				js: [
					{
						url: 'https://seguros.comunicaciones.sura.com/js-v@3.2.36-07072022',
						attrs: { async: false },
					},
				],
			},
			animate3: {
				js: [
					{ url: 'https://seguros.comunicaciones.sura.com/js-animate@3-03082022' },
				],
			},
		},
	},
	createTag(tag, id, attributes) {
		return new Promise(function (resolve, reject) {
			let el, prop, r;
			r = false;
			let document = window.document;

			el = document.createElement(tag);
			el.id = id;

			for (prop in attributes) {
				if (attributes.hasOwnProperty(prop)) {
					el[prop] = attributes[prop];
				}
			}
			el.onerror = function (err) {
				reject(err, el);
			};

			if (!el.addEventListener) {
				//Old IE
				el.attachEvent('onload', function () {
					resolve();
				});
			} else {
				el.addEventListener('load', function () {
					resolve();
				});
			}

			if (tag == 'link') {
				let head = document.getElementsByTagName('head')[0];
				head.appendChild(el);
			} else {
				let body = document.getElementsByTagName('body')[0];
				body.appendChild(el);
			}
		});
	},
	async getLink(id = '', href = '', attrs = {}, $ = window.libUtils) {
		// if (!href) {
		// 	src = $.data.libs[id];
		// 	$.data.libs[id]
		// 		? (src = $.data.libs[id])
		// 		: console.error('src("argument") is empty or the librery does not exist');
		// }

		let tagEl = document.getElementById(id);
		attrs.rel = !!attrs['rel'] ? attrs.rel : 'stylesheet';
		attrs.href = href;

		if (!tagEl) {
			await $.createTag('link', id, attrs);
		}
	},
	async getScript(
		id = '',
		src = '',
		attrs = { async: false },
		$ = window.libUtils
	) {
		// if (!src) {
		// 	src = $.data.libs[id];
		// 	$.data.libs[id]
		// 		? (src = $.data.libs[id])
		// 		: console.error('src("argument") is empty or the librery does not exist');
		// }

		let tagEl = document.getElementById(id);

		attrs.src = src;
		attrs.async = attrs.async !== undefined ? attrs.async : false;
		attrs.type = attrs.type ? attrs.type : 'text/javascript';

		if (!tagEl) {
			await $.createTag('script', id, attrs);
		}
	},
	getBaseUrl() {
		var location = window.location;
		var pathName = location.pathname.split('/')[1];
		return location.protocol + '//' + location.host + '/' + pathName;
	},
	resetHref() {
		window.history.replaceState(
			null,
			document.title,
			window.location.origin + window.location.pathname
		);
	},
	deleteResource(id) {
		var resource = document.getElementById(id);
		if (resource) {
			resource.parentNode.removeChild(resource);
		}
	},
	b64EncodeUnicode(str) {
		// first we use encodeURIComponent to get percent-encoded UTF-8,
		// then we convert the percent encodings into raw bytes which
		// can be fed into btoa.
		return btoa(
			encodeURIComponent(str).replace(
				/%([0-9A-F]{2})/g,
				function toSolidBytes(match, p1) {
					return String.fromCharCode('0x' + p1);
				}
			)
		);
	},
	async getLibs(
		collectionParallel = [],
		collectionSequence = [],
		callback,
		$ = window.libUtils
	) {
		try {
			if (collectionParallel.length >= 1) {
				await Promise.all(
					collectionParallel.map(async (lib, index) => {
						let libString;
						switch (typeof lib) {
							case 'object':
								$.data.libs[lib.id] = {};
								lib.css ? ($.data.libs[lib.id].css = lib.css) : null;
								lib.js ? ($.data.libs[lib.id].js = lib.js) : null;
							case 'string':
								libString = lib.id ? lib.id : lib;
								console.log(libString, ' queued libString');
								if ($.data.libs[libString].css) {
									await Promise.all(
										$.data.libs[libString].css.map(async (el, i) => {
											await $.getLink(
												'link-' + libString + i,
												el.url,
												el.attrs ? el.attrs : {}
											);
											console.log('link' + libString + i, 'resuelto');
										})
									);
								}
								if ($.data.libs[libString].js) {
									await Promise.all(
										$.data.libs[libString].js.map(async (el, i) => {
											await $.getScript(
												'script-' + libString + i,
												el.url,
												el.attrs ? el.attrs : {}
											);
											console.log('script' + libString + i, 'resuelto');
										})
									);
								}
								break;
							default:
								new Error('invalid typeof argument');
								break;
						}
					})
				);
			}
			if (collectionSequence.length >= 1) {
				await Promise.all(
					collectionSequence.map(async (lib, index) => {
						let libString;
						switch (typeof lib) {
							case 'object':
								$.data.libs[lib.id] = {};
								lib.css ? ($.data.libs[lib.id].css = lib.css) : null;
								lib.js ? ($.data.libs[lib.id].js = lib.js) : null;
							case 'string':
								libString = lib.id ? lib.id : lib;
								console.log(libString, ' queued libString');
								if ($.data.libs[libString].css) {
									await Promise.all(
										$.data.libs[libString].css.map(async (el, i) => {
											await $.getLink(
												'link-' + libString + i,
												el.url,
												el.attrs ? el.attrs : {}
											);
											console.log('link' + libString + i, 'resuelto');
										})
									);
								}
								if ($.data.libs[libString].js) {
									for (let [i, lib] of $.data.libs[libString].js.entries()) {
										await $.getScript(
											'script-' + libString + i,
											lib.url,
											lib.attrs ? lib.attrs : {}
										);
										console.log('script' + libString + i, 'resuelto');
									}
								}
								break;
							default:
								new Error('invalid typeof argument');
								break;
						}
					})
				);
			}
			callback();
		} catch (error) {
			console.error('Error in "getLibs" ', error);
		}
	},
};
