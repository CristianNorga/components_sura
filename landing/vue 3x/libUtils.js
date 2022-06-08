// libUtils@1.1.0 created in base to smartCapture, adapted for graphic solutions +573125802861
// https://seguros.comunicaciones.sura.com/js-libUtils-1
window.libUtils = {
	createTag(tag, id, attributes) {
		var el;
		var prop;
		var document = window.document;
		var head = document.getElementsByTagName('head')[0];
		var tagEl = document.getElementById(id);

		if (!tagEl) {
			el = document.createElement(tag);
			el.id = id;

			for (prop in attributes) {
				if (attributes.hasOwnProperty(prop)) {
					el[prop] = attributes[prop];
				}
			}
			head.appendChild(el);
		} else if (attributes && attributes.onload) {
			if (tagEl.addEventListener) {
				// For all major browsers, except IE 8 and earlier
				tagEl.addEventListener('load', attributes.onload);
			} else if (tagEl.attachEvent) {
				// For IE 8 and earlier versions
				tagEl.attachEvent('onload', attributes.onload);
			}
		}
	},
	getLink(id, href, onload) {
		if (window.libUtils.searchResource) {
			onload();
		} else {
			window.libUtils.createTag('link', id, {
				rel: 'stylesheet',
				href: href,
				onload: onload,
			});
		}
	},
	getScript(id, src, onload, async) {
		if (window.libUtils.searchResource(id)) {
			onload();
		} else {
			window.libUtils.createTag('script', id, {
				src: src,
				onload: onload,
				async: !!async,
			});
		}
	},
	searchResource(id) {
		var resource = document.getElementById(id);
		return !!resource;
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
};
