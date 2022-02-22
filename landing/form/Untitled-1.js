{/* <script id="smartcapture-script-k88skoo3wc"> */}

 var scFormLoaded = function () {
  window.ScForm.init({"gearID":"k88skoo3wc","smartCaptureFormID":0,"sourceKey":"dataextensiontest","source":"dataExtension","triggeredSend":"","onSubmitShouldGotoUrl":true,"onSubmitGotoUrlType":2,"onSubmitGotoUrl":"http://google.com"});
 };


 window.appDomain = window.appDomain || '' || '<ctrl:eval>Platform.Variable.GetValue("@appDomain")||""</ctrl:eval>';
 window.contentDetail = window.contentDetail || <ctrl:eval>Platform.Variable.GetValue('@contentDetail')||{}</ctrl:eval>;


  if (!window.ScForm || !window.ScForm.init) {
    var head = document.getElementsByTagName('head')[0];
    var id = 'smartcapture-formjs-script';
    var script = document.getElementById(id);
    var domain = window.appDomain;
    var el;
    if (!script) {
      if (domain) {
        domain = '//' + domain;
      }
      el = document.createElement('script');
      el.async = true;
      el.id = id;
      el.src = domain + '/CloudPages/lib/smartcapture-formjs.js';
      el.onload = scFormLoaded;
      head.appendChild(el);
    } else {
      if (script.addEventListener) {
        script.addEventListener('load', scFormLoaded);
      } else if (script.attachEvent) {
        script.attachEvent('onload', scFormLoaded);
      }
    }
  } else {
    scFormLoaded();
  }

  // con journey

   var scFormLoaded = function () {
				window.ScForm.init({
					gearID: 'k88skoo3wc',
					smartCaptureFormID: 0,
					sourceKey: 'dataextensiontest',
					source: 'dataExtension',
					triggeredSend: '',
					onSubmitShouldGotoUrl: true,
					onSubmitGotoUrlType: 2,
					onSubmitGotoUrl: 'http://google.com',
				});
			};

			window.appDomain =
				window.appDomain ||
				'' ||
				'<ctrl:eval>Platform.Variable.GetValue("@appDomain")||""</ctrl:eval>';
			window.contentDetail = window.contentDetail || (
				<ctrl:eval>Platform.Variable.GetValue('@contentDetail')||{}</ctrl:eval>
			);
			if (!window.ScForm || !window.ScForm.init) {
				var head = document.getElementsByTagName('head')[0];
				var id = 'smartcapture-formjs-script';
				var script = document.getElementById(id);
				var domain = window.appDomain;
				var el;
				if (!script) {
					if (domain) {
						domain = '//' + domain;
					}
					el = document.createElement('script');
					el.async = true;
					el.id = id;
					el.src = domain + '/CloudPages/lib/smartcapture-formjs.js';
					el.onload = scFormLoaded;
					head.appendChild(el);
				} else {
					if (script.addEventListener) {
						script.addEventListener('load', scFormLoaded);
					} else if (script.attachEvent) {
						script.attachEvent('onload', scFormLoaded);
					}
				}
			} else {
				scFormLoaded();
			}
