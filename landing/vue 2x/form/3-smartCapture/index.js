Vue.component('form-sura', {
	props: [
		'pGearId',
		'pOnSubmitType',
		'pOnSubmitGotoUrl',
		'pSmartcaptureFormId',
		'pDataextensiontest',
	],
	data: function () {
		return {
			ScForm: {
				gearID: this.pGearId || null,
				smartCaptureFormID: this.pSmartcaptureFormId || null,
				sourceKey: this.pDataextensiontest || null,
				source: 'dataExtension',
				triggeredSend: '',
				onSubmitType: this.pOnSubmitType || 'redirect',
				onSubmitGotoUrl: this.pOnSubmitGotoUrl || 'https://www.segurossura.com.co',
				appDomain: '',
				contentDetail: '',
				channelOverrides: '',
				useJourneyBuilder: false,
				smartCapture: '',
				loadCore: undefined,
				DB: undefined,
			},
			state: {
				verifying: false,
				counting: false,
				isError: false,
				porcentProgress: 0,
				inputs: [],
				timeOut: setTimeout,
				message: '',
			},
			basicIcons: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
			lists: {
				names: [
					{ value: 'Juan Guillermo', text: 'Juan Guillermo' },
					{ value: 'Mauricio Lopez', text: 'Mauricio Lopez' },
					{ value: 'resolviendo problema resolve', text: 'Cristian Noreña' },
				],
			},
		};
	},
	methods: {
		submit: function () {
			if (!this.state.isError) this.startVerify();
		},
		startVerify: function () {
			this.state.inputs = [];
			this.state.verifying = true;
			this.state.message = 'Verificando ...';
			this.state.porcentProgress = 20;
		},
		getStatus: function (status) {
			clearTimeout(this.state.timeOut);
			this.state.inputs.push(status);
			this.state.timeOut = setTimeout(() => {
				this.state.counting = true;
				this.state.porcentProgress = 50;
				this.readInputs();
			}, 2000);
		},
		readInputs: function () {
			this.state.porcentProgress = 75;
			let problems = this.state.inputs.filter((item) => {
				if (item.isError) return true;
				if (item.isRequired) return item.isEmpty;
				return false;
			});
			if (problems.length > 0) {
				this.error(problems.length);
			} else {
				this.state.porcentProgress = 100;
				this.state.message = 'Ok';
				this.state.timeOut = setTimeout(() => {
					this.success();
					clearTimeout(this.state.timeOut);
				}, 1000);
			}
		},
		success: async function () {
			document.getElementById('send').click();
		},
		error: function (problems) {
			this.state.isError = true;
			this.state.porcentProgress = 100;
			if (problems === 1) {
				this.state.message = `${problems} error encontrado`;
			} else {
				this.state.message = `${problems} errores encontrados`;
			}
			this.state.timeOut = setTimeout(() => {
				this.state.porcentProgress = 0;
				this.state.verifying = false;
				this.state.counting = false;
				this.state.isError = false;
				this.state.message = '';
				this.state.inputs = [];
				clearTimeout(this.state.timeOut);
			}, 3000);
		},
		adapterSubmit: function () {
			window.ScFormOnSubmit = {};
			switch (this.ScForm.onSubmitType) {
				case 'redirect':
					window.ScFormOnSubmit = {
						shouldGotoUrl: true,
						gotoUrlType: 2,
						gotoUrl: this.ScForm.onSubmitGotoUrl,
					};
					break;
				case 'redirect-blank':
					window.ScFormOnSubmit = {
						shouldGotoUrl: true,
						gotoUrlType: 1,
						gotoUrl: this.ScForm.onSubmitGotoUrl,
					};
					break;
				case 'ShowComponent':
					window.ScFormOnSubmit = {
						shouldGotoUrl: false,
					};
					this.ScForm.onSubmitComponent = true;
					break;
				default:
					console.log('default switch success');
					break;

			}
		},
		scFormLoaded: function () {
			let objeto = {
				gearID: this.ScForm.gearID,
				smartCaptureFormID: parseInt(this.ScForm.smartCaptureFormID),
				sourceKey: this.ScForm.sourceKey,
				source: 'dataExtension',
				triggeredSend: '',
				confirmationMessage: 'Gracias por su interés',
				buttonText: 'Enviar',
				formStyling: {
					'background-color': 'transparent',
					'margin-top': '0px',
					'margin-right': '0px',
					'margin-bottom': '0px',
					'margin-left': '0px',
					'padding-top': '0px',
					'padding-right': '0px',
					'padding-bottom': '0px',
					'padding-left': '0px',
					'text-align': 'left',
				},
				fieldStyling: { width: '200px' },
				buttonStyling: {
					'background-color': '#009DDC',
					'border-color': '#009DDC',
					'border-radius': '3px',
					'border-style': 'solid',
					'-webkit-border-radius': '3px',
					'-moz-border-radius': '3px',
					color: '#FFFFFF',
					'font-family': 'Arial, Helvetica, sans-serif',
					'font-size': '16px',
					'line-height': 'normal',
					padding: '10px',
				},
			};
			if (window.ScFormOnSubmit.shouldGotoUrl) {
				objeto.onSubmitShouldGotoUrl = window.ScFormOnSubmit.shouldGotoUrl;
				objeto.onSubmitGotoUrlType = window.ScFormOnSubmit.gotoUrlType;
				objeto.onSubmitGotoUrl = window.ScFormOnSubmit.gotoUrl;
			}
			window.ScForm.init(objeto);
		},
	},
	computed: {
		classProgress: function () {
			return {
				'success-verificaton': this.state.message === 'Ok',
				'error-verificaton': this.state.isError,
			};
		},
	},
	mounted: function () {
		if (!this.ScForm.gearID) throw new Error('gearID is required');
		if (!this.ScForm.smartCaptureFormID) throw new Error('smartCaptureFormID is required');
		if (!this.ScForm.sourceKey) throw new Error('sourceKey is required');

		// this.adapterSubmit();

		// window.appDomain =
		// 	window.appDomain ||
		// 	'' ||
		// 	'<ctrl:eval>Platform.Variable.GetValue("@appDomain")||""</ctrl:eval>';
		// window.contentDetail = window.contentDetail || (
		// 	<ctrl:eval>Platform.Variable.GetValue('@contentDetail')||{}</ctrl:eval>
		// );
		// if (!window.ScForm || !window.ScForm.init) {
		// 	var head = document.getElementsByTagName('head')[0];
		// 	var id = 'smartcapture-formjs-script';
		// 	var script = document.getElementById(id);
		// 	var domain = window.appDomain;
		// 	var el;
		// 	if (!script) {
		// 		if (domain) {
		// 			domain = '//' + domain;
		// 		}
		// 		el = document.createElement('script');
		// 		el.async = true;
		// 		el.id = id;
		// 		el.src = domain + '/CloudPages/lib/smartcapture-formjs.js';
		// 		el.onload = this.scFormLoaded;
		// 		head.appendChild(el);
		// 	} else {
		// 		if (script.addEventListener) {
		// 			script.addEventListener('load', this.scFormLoaded);
		// 		} else if (script.attachEvent) {
		// 			script.attachEvent('onload', this.scFormLoaded);
		// 		}
		// 	}
		// } else {
		// 	this.scFormLoaded();
		// }
	},
	template: `
		<form  :id="'smartcapture-block-' + ScForm.gearID" class="smartcapture-content-wrapper container-fluid" novalidate="novalidate">

			<div class="row">

				<div class="col-12 col-lg-6">
					<input-sura_written p-placeholder="Curso" p-name="curso" :p-required="true" p-limit="50" :icons="basicIcons" :verifying="state.verifying" @status="getStatus"></input-sura_written>
				</div>

				<div class="col-12 col-lg-6">
					<input-sura_select :icons="basicIcons" :p-required="true" p-name="nombre" :items="lists.names" :verifying="state.verifying" @status="getStatus"></input-sura_select>
				</div>

				<div class="col-12">
					<input-sura_written p-type="email" p-placeholder="Correo" p-name="correo" :p-required="true" p-limit="250" :icons="basicIcons" :verifying="state.verifying" @status="getStatus"></input-sura_written>
				</div>

				<div class="col-12">
					<input-sura_radio p-value="11" p-name="id" :p-required="true" :verifying="state.verifying" @status="getStatus">
						<template #label>
							<span>Id Autorizo ek tratamiento de mis datos personales</span>
						</template>
					</input-sura_radio>
				</div>
				
				<div class="col-12">
					<div class="form-input_button">
						<button type="button" @click="submit">
							<progress :class="classProgress" id="progresa-form" max="100" :value="state.porcentProgress"></progress>
							<span v-show="!state.verifying">¡ESTOY INTERESADO!</span>
							<span v-show="state.verifying">{{ state.message }}</span>
						</button>
					</div>
				</div>
				<div class="col-12">
					<div class="form-input_button">
						<button id="send" type="submit" style="display:none;">
							...
						</button>
					</div>
				</div>

			</div>
		</form>

		`,
});

new Vue({
	el: '#app',
});