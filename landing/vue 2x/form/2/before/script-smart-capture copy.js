(this, function (window, $) {

	var getBaseUrl = function () { // inUsed transfer
		var location = window.location;
		var pathName = location.pathname.split('/')[ 1 ];
		return location.protocol + '//' + location.host + '/' + pathName;
	};
	var getCheckResponse = function (success, error) {// inUsed transfer
		return function (resp) {
			if (resp === true) {
				success && success();
			} else {
				error && error();
			}
		};
	};
	// var langs = ['de', 'en', 'es-xl', 'es', 'fr-ca', 'fr', 'it', 'ja', 'pt'];
	var LibUtils = {
		createTag: function (tag, id, attributes) {
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
		createLink: function (id, href, onload) {
			LibUtils.createTag('link', id, {
				rel: 'stylesheet',
				href: href,
				onload: onload,
			});
		},
		createScript: function (id, src, onload, async) {
			LibUtils.createTag('script', id, {
				src: src,
				onload: onload,
				async: !!async,
			});
		},
		getItem: function (itemCheck, id, src, onload, async) {
			if (itemCheck) {
				LibUtils.createScript(id, src, onload, async);
			} else {
				onload();
			}
		},
		getAsyncItem: function (itemCheck, id, src, async) {
			var defer = $.Deferred();

			LibUtils.getItem(
				itemCheck,
				id,
				src,
				function () {
					defer.resolve();
				},
				async
			);

			return defer.promise();
		},
	};

	var ScForm;

	ScForm = function (options) {
		var self = this; // inUsed
		var contentDetail = window.contentDetail || {}; // inUsed
		var channelOverrides = window.channelOverrides || {}; // inUsed

		// contentDetail provided by f.html on window scope
		this._useJourneyBuilder = !!contentDetail.triggerJourneyBuilderEvent; // inUsed
		this._gearID = options.gearID; // inUsed
		this._smartCaptureFormID = options.smartCaptureFormID; // inUsed
		this._sourceKey = options.sourceKey; // inUsed
		this._source = options.source; // inUsed
		this._triggeredSend = options.triggeredSend; // inUsed
		this.options = options; // inUsed
		this.$smartCapture = $('#smartcapture-block-' + this._gearID); // inUsed
		
		function getInputs() { // inUsed
			return $(self.$smartCapture.get(0).elements)
				.filter('[name]')
			;
		}

		function send() {
			var attributes = []; // ok
			var _attributes = {}; // ok
			var postURL = getBaseUrl() + '/smartcapture/post'; //ok
			var payload;
			var emailAddresses = [];

			// TODO: move to class such as '.smartcapture-submission-value' instead of tags (sww 20130719)
			getInputs().each(function (index, el) { //ok
					var $this = $(this);
					var name = el.name;
					var label = name;
					var value = el.value || '';
					var type = el.type;
					var checked = $this.prop('checked');
					var currentValue;

					// only include radio button if it is selected
					if (type === 'radio' && !checked) return;

					if ('FullName' === name) {
						label = 'Full Name';
					}

					// transform checkbox values into 1/0 or true/false based on fieldtype
					if (type === 'checkbox') {
						if ($this.attr('data-field-type') === 'Boolean') {
							value = checked;
						} else if (!$this.attr('value')) {
							value = checked ? '1' : '0';
						} else {
							currentValue = _attributes[ label ] || '';
							if (checked) {
								currentValue += (currentValue ? ',' : '') + value;
							}

							value = currentValue;
						}
					}

					// handle date picker
					if ($this.parent().is('.date')) {
						value = $this
							.parent()
							.data('datepicker')
							.getFormattedDate(
								// data extension prefers format mm/dd/yyyy so regardless of selected/displayed format save in this format
								{
									parts: [ 'mm', 'dd', 'yyyy' ],
									separators: [ '', '/', '/', '' ]
								}
							);
					}

					// handle confirmation input
					if ($this.data('confirmation-source')) return;

					_attributes[label] = String(value);

                if (type === "email") {
                        // using array since there can be more than one EmailAddress on a form
                        emailAddresses.push('"' + label + '":"' + value + '"');
					}
				})
			;

			$.each(_attributes, function (key, value) {
				attributes.push('"' + key + '":"' + encodeURIComponent(value) + '"');
			});

			payload = {
        emailAddress: '{' + emailAddresses.join(',') + '}',
				formID: self._smartCaptureFormID, // ok
				targetID: self._sourceKey, // ok
				targetType: self._source, // ok
				attributes: '{' + attributes.join(',') + '}', // ok
				withTriggeredSend: self._triggeredSend, // ok
				isJourneyBuilderIntegrated: self._useJourneyBuilder // ok
			};

			/**
			 * Allows a channel to override this URL when needed.
			 * @see /cp-channels/facebook-tab/data/default.html for an example.
			 *
			 * NOTE: by default, Landing Pages and Mobile Push channels use the default value for postURL.
			 */
			if (channelOverrides.smartCapturePostURL) { //ok
				postURL = channelOverrides.smartCapturePostURL; // ok
			}

			$.ajax({
				url: postURL, // ok
				type: 'post',
				dataType: 'json',
				data: payload, // ok
				success: getCheckResponse(success, error), // ok
				error: error // ok
			});

			sendTrackingData(); // ok

			function success() { // inUsed
				var _options = self.options; // ok
				var goToUrl;

				if (_options.onSubmitShouldGotoUrl) {
					goToUrl = _options.onSubmitGotoUrl;

					if (_options.onSubmitGotoUrlType === 2) {
						window.top.location.assign(goToUrl);
					} else {
						window.open(goToUrl);
					}
				}

				self.$smartCapture.removeClass('submitting');
				sendComplete(); // ok

			}

			function error() { // inUsed
				self.$smartCapture
					.removeClass('submitting')
					.addClass('alerting')
				;

				toggleButtonState(self.$smartCapture.find('.sc-button'), false); // ok

				sendComplete(); // ok
			}

			function sendComplete() { // inUsed
				// scroll to top of form and hard left
				window.scrollTo(0, self.$smartCapture.offset().top);
			}

			function sendTrackingData() { // inUsed
				var Fuel = window.Fuel;
				var scT = new Fuel.Tracking(
					new Fuel.TrackingContext(contentDetail.mid, contentDetail.eid),
					contentDetail.isSite ?
					{
						siteid: String(contentDetail.siteID),
						pageid: String(contentDetail.pageID),
						isMobile: String(contentDetail.isMobile)
					} :
					{
						isFan: String(contentDetail.liked),
						tabid: String(contentDetail.fbTabID),
						pageid: String(contentDetail.fbPageID),
						tabcontentid: String(contentDetail.fbTabContentID),
						contentid: String(contentDetail.contentID),
						appid: String(contentDetail.facebookAppID),
						triggerJourneyBuilderEvent: String(contentDetail.triggerJourneyBuilderEvent),
						isMobile: String(contentDetail.isMobile)
					}
				);

				scT.addRawEvent('CLOUDPAGESGEARINTERACTION', {
					'gearid': self._gearID,
					'gearType': '2157FF01-C76C-499F-A44F-E1F33825DD5C'
				});
				scT.send();
			}
		}
	};

});