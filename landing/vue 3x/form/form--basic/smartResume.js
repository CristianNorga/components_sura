// https://seguros.comunicaciones.sura.com/js-cdeta-18052022
console.log('smartResume.js @1.8.2');

var self = this;
let contentDetail = window.contentDetail || {};
// var channelOverrides = window.channelOverrides || {};

this._useJourneyBuilder = !!contentDetail.triggerJourneyBuilderEvent;
this._gearID = 'm5qe6tud0ei';
this._smartCaptureFormID = 439;
this._sourceKey = 'dataextensiontest';
this._source = 'dataExtension';
this._triggeredSend = '';
this._confirmationMessage = "Thank you for your submission.";
// this.$smartCapture = $('#smartcapture-block-' + this._gearID);
this.$smartCapture = document.getElementById('smartcapture-block-' + this._gearID);

var getBaseUrl = function () { //ok
	var location = window.location;
	var pathName = location.pathname.split('/')[1];
	return location.protocol + '//' + location.host + '/' + pathName;
};

function send() {
		console.log('sennding');

	// var attributes = [];
	// var _attributes = {};
	var postURL = getBaseUrl() + '/smartcapture/post'; //ok
	// var payload;
	// var emailAddresses = [];


	var attributes = []; //ok
	var _attributes = { //ok
		curso: 'test',
		nombre: 'nombre',
		id: 'id',
		correo: 'cristian.rraga95@hotmail.com',
	};

  Object.entries(_attributes).forEach(([key, value]) => { //ok
    attributes.push('"' + key + '":"' + encodeURIComponent(value) + '"');
  });

	// $.each(_attributes, function (key, value) {
	// 	attributes.push('"' + key + '":"' + encodeURIComponent(value) + '"');
	// });

	// payload = {
	// 	emailAddress: '{' + emailAddresses.join(',') + '}',
	// 	formID: self._smartCaptureFormID,
	// 	targetID: self._sourceKey,
	// 	targetType: self._source,
	// 	attributes: '{' + attributes.join(',') + '}',
	// 	withTriggeredSend: self._triggeredSend,
	// 	isJourneyBuilderIntegrated: self._useJourneyBuilder,
	// };

	// payload = {
	// 	emailAddress: '{cristian.rraga95@hotmail.com}',
	// 	formID: self._smartCaptureFormID,
	// 	targetID: self._sourceKey,
	// 	targetType: self._source,
	// 	attributes: '{' + attributes.join(',') + '}',
	// 	withTriggeredSend: self._triggeredSend,
	// 	isJourneyBuilderIntegrated: self._useJourneyBuilder,
	// };

	const payload = new URLSearchParams();
	payload.append(
		'emailAddress',
		'{' + '"correo":"' + _attributes.correo + '"' + '}'
	); //ok
	payload.append('formID', self._smartCaptureFormID);//ok
	payload.append('targetID', self._sourceKey);//ok
	payload.append('targetType', self._source);//ok
	payload.append('attributes', '{' + attributes.join(',') + '}');//ok
	payload.append('withTriggeredSend', self._triggeredSend);//ok
	payload.append('isJourneyBuilderIntegrated', self._useJourneyBuilder); //ok

	// if (channelOverrides.smartCapturePostURL) {
	// 	postURL = channelOverrides.smartCapturePostURL;
	// }

	// $.ajax({
	// 	url: postURL,
	// 	type: 'post',
	// 	dataType: 'json',
	// 	data: payload,
	// 	success: getCheckResponse(success, error),
	// 	error: error,
	// });

  axios({
			method: 'post',
			url: postURL,
			// dataType: 'json',
			headers: {
				// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: ['application/json', 'text/javascript', '*/*; q=0.01'],
				'X-Requested-With': 'XMLHttpRequest',
			},
			validateStatus: function (status) {
				console.log(status);
				if (status == 200) {
					success();
				} else {
					error();
				}
			},
			data: payload,
		});

	// sendTrackingData();

	function success() {
		console.log('success');

		sendComplete();
	}

	function error() {
		console.log('error');

		sendComplete();
	}

	function sendComplete() {
		console.log('sendComplete');
	}

	// function sendTrackingData() {
	// 	var Fuel = window.Fuel;
	// 	var scT = new Fuel.Tracking(
	// 		new Fuel.TrackingContext(contentDetail.mid, contentDetail.eid),
	// 		contentDetail.isSite
	// 			? {
	// 					siteid: String(contentDetail.siteID),
	// 					pageid: String(contentDetail.pageID),
	// 					isMobile: String(contentDetail.isMobile),
	// 			  }
	// 			: {
	// 					isFan: String(contentDetail.liked),
	// 					tabid: String(contentDetail.fbTabID),
	// 					pageid: String(contentDetail.fbPageID),
	// 					tabcontentid: String(contentDetail.fbTabContentID),
	// 					contentid: String(contentDetail.contentID),
	// 					appid: String(contentDetail.facebookAppID),
	// 					triggerJourneyBuilderEvent: String(
	// 						contentDetail.triggerJourneyBuilderEvent
	// 					),
	// 					isMobile: String(contentDetail.isMobile),
	// 			  }
	// 	);

	// 	scT.addRawEvent('CLOUDPAGESGEARINTERACTION', {
	// 		gearid: self._gearID,
	// 		gearType: '2157FF01-C76C-499F-A44F-E1F33825DD5C',
	// 	});
	// 	scT.send();
	// }
}
