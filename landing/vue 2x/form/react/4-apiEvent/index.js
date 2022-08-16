Vue.component('input-sura_written', {
	props: [
		'pType',
		'pPlaceholder',
		'pName',
		'pRequired',
		'pLimit',
		'icons',
		'verifying',
	],
	data: function () {
		return {
			type: this.pType || 'text',
			value: '',
			placeholder: this.pPlaceholder || '',
			name: this.pName || '',
			required: this.pRequired || false,
			limit: {
				isLimited: false,
				length: 0,
			},
			state: {
				length: 0,
				isFocused: false,
				isEmpty: true,
				isError: false,
				errorMessage: '',
			},
			condition: {
				pattern: /^[a-zA-Z\s]+$/,
				isCondition: true,
				conditionMesaage: '',
				timeOut: setTimeout,
			},
		};
	},
	beforeMount: function () {
		if (this.pLimit) {
			this.limit.isLimited = true;
			this.limit.length = this.pLimit;
		}
		switch (this.type) {
			case 'text':
				// regex only letters latam and spaces
				// this.condition.pattern = /^[a-zA-Z\s]+$/;
				this.condition.pattern =
					/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
				this.condition.conditionMesaage = 'Solo se permiten letras';
				break;
			case 'number':
				// regex only numbers and spaces
				this.condition.pattern = /^[0-9\s]+$/;
				this.condition.conditionMesaage = 'Solo se permiten números';
				break;
			case 'email':
				// regex email
				this.condition.pattern =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				this.condition.conditionMesaage =
					'Por favor escriba un correo electrónico válido';
				break;
			case 'DNI':
				// regex DNI
				this.condition.pattern = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
				this.condition.conditionMesaage = 'Por favor escriba un DNI válido';
				break;
			default:
				// regex only letters and spaces
				this.condition.pattern = /^[a-zA-Z\s]+$/;
				this.condition.conditionMesaage = 'Solo se permiten letras';
				break;
		}
	},
	methods: {
		doThis: function (val) {
			this.validateLength(val, this.validateType);
		},
		validateLength: function (val, callback) {
			this.state.length = val.length;

			if (this.state.length == 0) {
				this.state.isEmpty = true;
				this.state.isError = false;
				this.state.errorMessage = '';
				clearTimeout(this.condition.timeOut);
				return;
			}
			this.state.isEmpty = false;
			if (this.limit.isLimited) {
				if (this.state.length > this.limit.length) {
					this.state.isError = true;
					this.state.errorMessage = '¡Demasiados caracteres!';
					return;
				} else {
					this.state.isError = false;
					this.state.errorMessage = '';
				}
			}
			callback(val);
		},
		validateType: function (value) {
			// validate regex pattern
			switch (this.type) {
				case 'email':
					clearTimeout(this.condition.timeOut);
					this.condition.timeOut = setTimeout(() => {
						if (!value.toLowerCase().match(this.condition.pattern)) {
							this.state.isError = true;
							this.state.errorMessage = this.condition.conditionMesaage;
						} else {
							this.state.isError = false;
							this.state.errorMessage = '';
						}
					}, 2000);
					break;
				default:
					if (!this.condition.pattern.test(value)) {
						this.state.isError = true;
						this.state.errorMessage = this.condition.conditionMesaage;
					} else {
						this.state.isError = false;
						this.state.errorMessage = '';
					}
					break;
			}
		},
		sendStatus: function (val) {
			let state = {
				type: 'input',
				isEmpty: this.state.isEmpty,
				isError: this.state.isError,
				isRequired: this.required,
				name: this.name,
				value: this.value,
			};
			this.$emit('status', state);
		},
	},
	computed: {
		classInput: function () {
			return {
				'input-error': this.state.isError,
			};
		},
	},
	watch: {
		value: function () {
			this.doThis(this.value);
		},
		verifying: function () {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	template: `
	<div class="form-input_container">
		<transition name="slide-fade">
			<div v-show="!state.isEmpty" class="form-input_description">
					<span>
						{{ placeholder }}
						<span v-if="required">*</span>
						<span v-else> (opcional)</span>
					</span>
			</div>
		</transition>
    <div class="form-input_control">
      <input v-model="value" v-bind:class="classInput" type="text" :name="name" class="form-input--sura" :required="required" :placeholder="placeholder">
			<div class="input-container-icon--md">
				<transition name="slide-fade">
					<div class="icon-svg--error" v-show="state.isError">
						<img :src="this.icons.error" alt="icon of error">
					</div>
				</transition>
			</div>
    </div>
    <div class="form-input_auxiliary">
			<div class="row">
				<div class="col-10">
					<transition-group name="slide-fade">
						<span style="position:absolute;" :key="1" v-show="required && !state.isError && state.isEmpty">
							Requerido*
						</span>
						<span style="position:absolute;" :key="2" v-show="!required && !state.isError && state.isEmpty">
							Opcional
						</span>
						<span style="position:absolute;" :key="3" v-show="!state.isEmpty && !state.isError">
							{{ condition.conditionMesaage }}
						</span>
						<span :key="4" class="input_auxiliary--error" v-show="state.isError">
							{{ state.errorMessage }}
						</span>
					</transition-group>
					
				</div>
				<div v-if="this.limit.isLimited" class="col-2 text-end">
					{{ this.state.length }}/{{ this.limit.length }}
				</div>
			</div>
    </div>
  </div>`,
});

Vue.component('input-sura_checkbox', {
	props: ['pValue', 'pName', 'pRequired', 'label', 'verifying'],
	data: function () {
		return {
			value: this.pValue || '',
			name: this.pName || '',
			required: this.pRequired || false,
			state: {
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus: function (val) {
			let state = {
				type: 'radio',
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.state.isEmpty ? '' : this.value,
			};
			this.$emit('status', state);
		},
		doThis: function () {
			this.state.isEmpty = !this.state.isEmpty;
		},
	},
	watch: {
		// whenever question changes, this function will run
		verifying: function () {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	template: `
		<div class="form-input_container--wlh">
			<label @click="doThis" class="input_label_custom"><slot name="label"></slot>
				<input type="checkbox" :name="name" class="form-checkbox--sura" required="required" :value="value">
				<span class="checkmark--checkbox"></span>
			</label>
		</div>`,
});

Vue.component('input-sura_radio', {
	props: ['pValue', 'pName', 'pRequired', 'label', 'verifying'],
	data: function () {
		return {
			value: this.pValue || '',
			name: this.pName || '',
			required: this.pRequired || false,
			state: {
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus: function (val) {
			let state = {
				type: 'radio',
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.state.isEmpty ? '' : this.value,
			};
			this.$emit('status', state);
		},
		doThis: function () {
			this.state.isEmpty = false;
		},
	},
	watch: {
		verifying: function () {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	template: `
		<div class="form-input_container--wlh">
			<label @click="doThis" class="input_label_custom"><slot name="label"></slot>
				<input type="radio" :name="name" class="form-checkbox--sura" required="required" :value="value">
				<span class="checkmark--radio"></span>
			</label>
		</div>`,
});

Vue.component('input-sura_select', {
	props: {
		pPlaceholder: {
			type: String,
			default: 'Seleccione una opción',
		},
		pName: {
			type: String,
			default: 'seleccionMultiple',
		},
		pRequired: {
			type: Boolean,
			default: false,
		},
		icons: {
			default: () => ({
				error: '',
				arrow: '',
			}),
		},
		pSearch: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default: function () {
				return [
					{ value: 1, text: 'Item 1' },
					{ value: 2, text: 'Item 2' },
					{ value: 3, text: 'Item 3' },
				];
			},
		},
		verifying: {
			type: Boolean,
			default: false,
		},
	},
	data: function () {
		return {
			placeholder: this.pPlaceholder,
			name: this.pName,
			required: this.pRequired,
			search: this.pSearch,
			fieldSearch: false,
			options: {
				origin: this.items,
				filter: [],
				selected: {
					value: '',
					text: '',
				},
			},
			state: {
				isSelected: false,
				isFocused: false,
				isUnder: false,
				isError: false,
				errorMessage: '',
			},
		};
	},
	beforeMount: function () {
		this.options.filter = this.options.origin || [];
		this.options.selected.text = this.placeholder;
	},
	methods: {
		doThis: function () {
			this.state.isUnder = !this.state.isUnder;
		},
		selectOption: function (event) {
			this.options.selected.value = event.target.attributes.value.value;
			this.options.selected.text = event.target.innerText;
			this.state.isUnder = false;
			this.state.isSelected = true;
		},
		loseFocus: function () {
			this.state.isUnder = false;
		},
		sendStatus: function (val) {
			let state = {
				type: 'select',
				isEmpty: !this.state.isSelected,
				isError: this.state.isError,
				isRequired: this.required,
				name: this.name,
				value: this.options.selected.value,
			};
			this.$emit('status', state);
		},
	},
	computed: {
		classInput: function () {
			return {
				'input-error': this.state.isError,
				'focus-select': this.state.isUnder,
			};
		},
		classIconArrowSelect: function () {
			return {
				'arrow-actived-select': this.state.isUnder,
			};
		},
	},
	watch: {
		search: function () {
			this.options.filter = this.options.origin
				.filter((item) => {
					const decomposed = item.text
						.toLowerCase()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '');
					return decomposed.indexOf(this.search.toLowerCase()) > -1;
				})
				.sort((a, b) => {
					return a.text.localeCompare(b.text);
				});
		},
		verifying: function () {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	template: `
	<div class="form-input_container">
		<transition name="slide-fade">
			<div v-show="state.isUnder || state.isSelected" class="form-input_description">
				<span>
					{{ placeholder }}
					<span v-if="required">*</span>
					<span v-else> (opcional)</span>
				</span>
			</div>
		</transition>
    <div class="form-input_control zl-3" v-on:mouseleave="loseFocus">
			<div @click="doThis" v-bind:class="classInput" class="form-select--sura">
			  {{ options.selected.text }}
			</div>
			<div class="input-container-icon--xs">
				<transition name="slide-fade">
					<div class="icon-svg--error" v-bind:class="classIconArrowSelect">
						<img :src="this.icons.arrow" alt="icon arrow" @click="doThis" style="cursor: pointer;">
					</div>
				</transition>
			</div>
			<transition name="slide-fade-down">
				<div v-show="state.isUnder" class="input-container-items">
					<!-- input filter -->
					<div v-if="fieldSearch" class="input-container-filter">
						<input v-model="search" type="text" class="input-filter" placeholder="Buscar...">
					</div>
					<ul class="container-options">
						<li v-for="item in options.filter" :value="item.value" class="select-option" @click="selectOption">
							{{ item.text }}
						</li>
					</ul>
				</div>
			</transition>
			<input type="hidden" :name="name" :value="options.selected.value">
    </div>
    <div class="form-input_auxiliary">
			<div class="row">
				<div class="col-10">
					<transition-group name="slide-fade">
						<span style="position:absolute;" :key="1" v-show="required && !state.isError && !state.isUnder && !state.isSelected">
							Requerido*
						</span>
						<span style="position:absolute;" :key="2" v-show="!required && !state.isError && !state.isUnder && !state.isSelected">
							Opcional
						</span>
						<span :key="4" class="input_auxiliary--error" v-show="state.isError">
							{{ state.errorMessage }}
						</span>
					</transition-group>
					
				</div>
			</div>
    </div>
  </div>`,
});

Vue.component('form-sura', {
	props: ['pGearId', 'pOnSubmitType', 'pOnSubmitGotoUrl'],
	data: function () {
		return {
			ScForm: {
				gearID: this.pGearId || null,
				smartCaptureFormID: 425,
				sourceKey: 'dataextensiontest',
				source: 'dataExtension',
				triggeredSend: '',
				onSubmitType: 'redirect',
				onSubmitGotoUrl: 'http://google.com',
				onSubmitComponent: false,
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
		createTag: function (tag, id, attributes) {
			let el;
			let prop;
			let document = window.document;
			let head = document.getElementsByTagName('head')[0];
			let tagEl = document.getElementById(id);

			if (!tagEl) {
				el = document.createElement(tag);
				el.id = id;

				for (prop in attributes) {
					el[prop] = attributes[prop];
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
		createScript: function (id, src, onload, async) {
			this.createTag('script', id, {
				src: src,
				onload: onload,
				async: !!async,
			});
		},
		success: async function () {
			let payload = {};
			this.state.inputs.forEach((item) => {
				payload[item.name] = item.value;
			});
			let base64 = window.btoa(
				unescape(encodeURIComponent(JSON.stringify(payload)))
			);

			let url = ` https://seguros.comunicaciones.sura.com/SSJS-tcde-08022022?isSending=true&d=${base64}&e=${this.ScForm.sourceKey}`;
			console.log(base64);
			
			this.createScript('ssjsutils', url, this.redirect, true);
		},
		redirect: function () {
			// example of promise in vue with then
			switch (this.ScForm.onSubmitType) {
				case 'redirect':
					window.location.href = this.ScForm.onSubmitGotoUrl;
					break;
				case 'redirect-blank':
					window.open(this.ScForm.onSubmitGotoUrl, '_blank');
					break;
				case 'ShowComponent':
					// this.ScForm.onSubmitMessage.show();
					this.ScForm.onSubmitComponent = true;
					break;
				default:
					console.log('default switch success');
					break;
			}
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
		// if (!this.ScForm.gearID) throw new Error('gearID is required');

		// this.ScForm.appDomain =
		// 	'<ctrl:eval>Platform.Variable.GetValue("@appDomain")||""</ctrl:eval>';
		// this.ScForm.contentDetail = (
		// 	<ctrl:eval>Platform.Variable.GetValue('@contentDetail')||{}</ctrl:eval>
		// );

		// this.ScForm.channelOverrides = window.channelOverrides || {};
		// this.ScForm._useJourneyBuilder =
		// 	!!this.ScForm.contentDetail.triggerJourneyBuilderEvent;
		// this.ScForm.smartCapture = document.getElementById(
		// 	'smartcapture-block-' + this.ScForm.gearID
		// );
	},
	template: `
		<form @submit.prevent="submit" :id="'smartcapture-block-' + ScForm.gearID" class="smartcapture-content-wrapper" novalidate="novalidate">

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
						<button type="submit">
							<progress :class="classProgress" id="progresa-form" max="100" :value="state.porcentProgress"></progress>
							<span v-show="!state.verifying">¡ESTOY INTERESADO!</span>
							<span v-show="state.verifying">{{ state.message }}</span>
						</button>
					</div>
				</div>
				<div class="col-12">
					<div class="form-input_button">
						<button type="submit">
							Enviar (1)
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