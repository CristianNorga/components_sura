Vue.component('input-sura_written', {
	props: {
		pType: {
			type: String,
			default: 'text',
		},
		pPlaceholder: {
			type: String,
			default: '',
		},
		pName: {
			type: String,
			default: '',
		},
		pRequired: {
			type: Boolean,
			default: false,
		},
		pLimit: {
			type: Number,
			default: 0,
		},
		icons: {
			type: Object,
			default: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
		},
		verifying: {
			type: Boolean,
			default: false,
		},
		pRestrict: {
			type: Boolean,
			default: false,
		},
		pIdiom: {
			type: String,
			default: 'es',
		},
	},
	data: function () {
		return {
			type: this.pType,
			value: '',
			placeholder: this.pPlaceholder,
			name: this.pName,
			required: this.pRequired,
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
			idioms: {
				es: {
					conditionText: 'Sólo se permiten letras',
					conditionNumber: 'Sólo se permiten números',
					conditionEmail:
						'Por favor escriba un correo electrónico válido sin espacios',
					errorLength: '¡Demasiados caracteres!',
					descripOptional: 'opcional',
					auxRequired: 'requerido',
					conditionId: 'Sólo se permiten letras y números',
					conditionAddress: 'Digite una dirección válida',
				},
				en: {
					conditionText: 'Only letters are allowed',
					conditionNumber: 'Only numbers are allowed',
					conditionEmail: 'Please enter a valid email without spaces',
					errorLength: 'Too many characters!',
					descripOptional: 'optional',
					auxRequired: 'required',
					conditionId: 'Only letters and numbers are allowed',
					conditionAddress: 'Please enter a valid address',
				},
			},
		};
	},
	beforeMount: function () {
		if (this.pLimit) {
			this.limit.isLimited = true;
			this.limit.length = this.pLimit;
		}
		switch (this.pType) {
			case 'text':
				// regex only letters latam and spaces
				// this.condition.pattern = /^[a-zA-Z\s]+$/;
				this.condition.pattern =
					/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionText;
				break;
			case 'number':
				// regex only numbers and spaces
				this.condition.pattern = /^[0-9\s]+$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionNumber;
				break;
			case 'email':
				// regex email
				this.condition.pattern =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionEmail;
				break;
			case 'id':
				// regex DNI
				this.type = 'text';
				this.condition.pattern = /^[a-zA-Z0-9\s]+$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionId;
				break;
			case 'address':
				// regex address latam with #,- and spaces
				this.condition.pattern =
					/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð #,.'-]+$/u;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionAddress;
				break;
			default:
				this.type = 'text';
				// regex only letters, spaces AND NUMBERS
				this.condition.pattern = /^[a-zA-Z\s]+$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionText;
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
					this.state.errorMessage = this.idioms[this.pIdiom].errorLength;
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
					}, 1400);
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
		// whenever question changes, this function will run
		value: function (newVal, oldVal) {
			this.doThis(newVal);

			if (this.pRestrict) {
				this.value = this.state.isError ? oldVal : newVal;
			}
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
      <span v-else> ({{idioms[pIdiom].descripOptional}})</span>
     </span>
   </div>
  </transition>
    <div class="form-input_control">
      <input v-model="value" v-bind:class="classInput" :type="type" :name="name" class="form-input--sura" :required="required" :placeholder="placeholder">
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
    <div class="col-10 position-relative">
     <transition-group name="slide-fade">
      <span style="text-transform: capitalize;" class="position-absolute" :key="1" v-show="required && !state.isError && state.isEmpty">
       {{idioms[pIdiom].auxRequired}}*
      </span>
      <span style="text-transform: capitalize;" class="position-absolute" :key="2" v-show="!required && !state.isError && state.isEmpty">
       {{idioms[pIdiom].descripOptional}}
      </span>
      <span :class="{'input_auxiliary--error': state.isError}" :key="3" v-show="!state.isEmpty">
       {{ condition.conditionMesaage }}
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
	props: {
		pValue: {
			type: String,
			default: '',
		},
		pName: {
			type: String,
			default: '',
		},
		pRequired: {
			type: Boolean,
			default: false,
		},
		verifying: {
			type: Boolean,
			default: false,
		},
	},
	data: function () {
		return {
			value: this.pValue,
			name: this.pName,
			required: this.pRequired,
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
   <label class="input_label_custom"><slot name="label"></slot>
    <input @click="doThis" type="checkbox" :name="name" class="form-checkbox--sura" required="required" :value="value">
    <span class="checkmark--checkbox"></span>
   </label>
  </div>`,
});

Vue.component('input-sura_radio-group', {
	props: {
		pName: {
			type: String,
			default: '',
		},
		pRequired: {
			type: Boolean,
			default: false,
		},
		verifying: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default: [],
		},
		pDx: {
			type: String,
			default: 'x',
		},
	},
	data: function () {
		return {
			name: this.pName,
			required: this.pRequired,
			directionGroup: this.pDx === 'x' ? 'contents' : 'flex',
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
			// this.value = val;
			this.state.isEmpty = false;
		},
	},
	watch: {
		verifying: function () {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	template: `
  <div class="form-input_container--wlh" :style="'display: '+directionGroup+';'">
   <label v-for="item in items" class="input_label_custom">
    <span>{{ item.text }}</span>
    <input @click="doThis" type="radio" :name="name" class="form-checkbox--sura" :required="required" :value="item.value">
    <span class="checkmark--radio"></span>
   </label>
  </div>`,
});

Vue.component('input-sura_radio', {
	props: {
		pValue: {
			type: String,
			default: '',
		},
		pName: {
			type: String,
			default: '',
		},
		pRequired: {
			type: Boolean,
			default: false,
		},
		verifying: {
			type: Boolean,
			default: false,
		},
	},
	data: function () {
		return {
			value: this.pValue,
			name: this.pName,
			required: this.pRequired,
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
   <label class="input_label_custom"><slot name="label"></slot>
    <input @click="doThis" type="radio" :name="name" class="form-checkbox--sura" required="required" :value="value">
    <span class="checkmark--radio"></span>
   </label>
  </div>`,
});

Vue.component('input-sura_select', {
	props: {
		pPlaceholder: {
			type: String,
			default: '',
		},
		pOther: {
			type: String,
			default: '',
		},
		optionOther: {
			type: Boolean,
			default: false,
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
		zIndex: {
			type: String,
			default: '3',
		},
		selectedOption: {
			type: String,
			// default: '',
		},
		pIdiom: {
			type: String,
			default: 'es',
		},
		api: {
			type: String,
		},
	},
	data: function () {
		return {
			name: this.pName,
			required: this.pRequired,
			search: '',
			fieldSearch: this.pSearch,
			timeOutApi: null,
			options: {
				origin: this.items,
				filter: [],
				isOther: false,
				other: this.pOther,
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
			idioms: {
				es: {
					descripOptional: 'opcional',
					auxRequired: 'requerido',
					placeholder: 'Seleccione una opción',
					optionOther: '¿Otro? (Especifique)',
				},
				en: {
					descripOptional: 'optional',
					auxRequired: 'required',
					placeholder: 'Select an option',
					optionOther: 'Other? (Specify)',
				},
			},
		};
	},
	beforeMount: function () {
		this.options.filter = this.api ? [] : this.options.origin;
		this.options.selected.text =
			this.pPlaceholder || this.idioms[this.pIdiom].placeholder;

		if (this.selectedOption) {
			this.options.selected.value = this.selectedOption;
			this.options.selected.text = this.items.find(
				(item) => item.value === this.selectedOption
			).text;
			this.state.isUnder = false;
			this.state.isSelected = true;
		}
	},
	methods: {
		doThis: function () {
			this.state.isUnder = !this.state.isUnder;
		},
		selectOption: function (event) {
			this.options.isOther = false;
			this.options.selected.value = event.target.attributes.value.value;
			this.options.selected.text = event.target.innerText;
			this.state.isUnder = false;
			this.state.isSelected = true;
		},
		openOptionOther: function () {
			this.options.isOther = true;
			this.state.isUnder = false;
		},
		closeOptionOther: function () {
			this.options.isOther = false;
		},
		selectOptionOther: function () {
			this.options.selected.value = this.options.other;
			this.options.selected.text = this.options.other;

			this.options.other = this.idioms[this.pIdiom].optionOther;
			this.options.isOther = false;
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
		async getDataFromApi(name) {
			let result = await axios({
				method: 'get',
				url: `https://api.suraenlinea.com/sura/${this.api}/${name}`,
				dataType: 'script',
				async: false,
				global: false,
				throws: true,
				headers: {
					'Content-Type': 'application/json',
					Accept: ['application/json', 'text/javascript', '*/*; q=0.01'],
				},
			});

			let AdaptedData = result.data.asesores.map((item) => {
				return {
					value: item.codigo,
					text: item.nombreCodigo,
				};
			});

			this.options.filter = AdaptedData;
		},
	},
	computed: {
		classInput: function () {
			return {
				'input-error': this.state.isError,
				'focus-select': this.state.isUnder,
				'option-default': !this.state.isSelected,
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
			if (this.api) {
				this.timeOutApi = setTimeout(() => {
					clearTimeout(this.timeOutApi);
					this.getDataFromApi(this.search);
				},500);
			} else {
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
			}
		},
		verifying: function () {
			if (this.verifying) this.sendStatus(this.verifying);
		},
		selectedOption: function () {
			if (this.selectedOption) {
				this.options.selected.value = this.selectedOption;
				this.options.selected.text = this.items.find(
					(item) => item.value === this.selectedOption
				).text;
				this.state.isUnder = false;
				this.state.isSelected = true;
			}
		},
	},
	template: `
 <div class="form-input_container" @mouseleave="loseFocus">
  <transition name="slide-fade">
   <div v-show="state.isUnder || state.isSelected" class="form-input_description">
    <span>
     {{ pPlaceholder || idioms[pIdiom].placeholder }}
     <span v-if="required">*</span>
     <span v-else> ({{idioms[pIdiom].descripOptional}})</span>
    </span>
   </div>
  </transition> 
    <div :class="'zl-'+zIndex" class="form-input_control">
   <div @click="doThis" v-bind:class="classInput" class="form-select--sura">
     {{ options.selected.text }}
   </div>
   <div class="input-container-icon--xs">
    <transition name="slide-fade">
     <div class="icon-svg--arrow" v-bind:class="classIconArrowSelect">
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
      <li v-for="item in options.filter" :class="['option-'+pName]" :value="item.value" class="select-option" @click="selectOption">
       {{ item.text }}
      </li>
			<li v-if="optionOther" @click="openOptionOther" id="sltedMpleOther1" class="select-option option-other">
        {{ idioms[pIdiom].optionOther }}
       </li>
     </ul>
    </div>
   </transition>
   <input type="hidden" :name="name" :value="options.selected.value">
    </div>
    <div class="form-input_auxiliary">
   	<div class="row">
    	<div class="col-10 position-relative" style="text-transform: capitalize;">
     	<transition-group name="slide-fade">
      	<span style="position:absolute;" :key="1" v-show="required && !state.isError && !state.isUnder && !state.isSelected">
       	{{ idioms[pIdiom].auxRequired }}*
      	</span>
      	<span style="position:absolute;" :key="2" v-show="!required && !state.isError && !state.isUnder && !state.isSelected">
       	{{ idioms[pIdiom].descripOptional }}
      	</span>
      	<span :key="4" class="input_auxiliary--error" v-show="state.isError">
       	{{ state.errorMessage }}
      	</span>
     	</transition-group>
    	</div>
   	</div>
    </div>
	 	<div class="form-input_control--other">
			<div v-show="options.isOther" class="my-2 group-input--sura">
				<input class="form-input--sura" v-model="options.other" @click="openOptionOther">
				<span @click="closeOptionOther">
				<button type="button" class="cancel">✖</button>
				</span>
				<span @click="selectOptionOther">
				<button type="button" class="confirm">✔</button>
				</span>
			</div>
		</div>

	</div>`,
});

Vue.component('input-sura_select-mple', {
	props: {
		pPlaceholder: {
			type: String,
			default: '',
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
		zIndex: {
			type: String,
			default: '3',
		},
		pOther: {
			type: String,
			default: '',
		},
		pIdiom: {
			type: String,
			default: 'es',
		},
	},
	data: function () {
		return {
			name: this.pName,
			required: this.pRequired,
			search: '',
			fieldSearch: this.pSearch,
			options: {
				origin: this.items,
				selections: [],
				filter: [],
				other: '',
				isOther: false,
				otherFocus: false,
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
			idioms: {
				es: {
					descripOptional: 'opcional',
					auxRequired: 'requerido',
					placeholder: 'Seleccione una opción',
					optionOther: '¿Otro? (Especifique)',
				},
				en: {
					descripOptional: 'optional',
					auxRequired: 'required',
					placeholder: 'Select an option',
					optionOther: '¿Other? (Specify)',
				},
			},
		};
	},
	beforeMount: function () {
		this.options.filter = this.options.origin || [];
		this.options.selected.text = this.idioms[this.pIdiom].placeholder;
		this.other = this.pOther || this.idioms[this.pIdiom].optionOther;
	},
	methods: {
		doThis: function () {
			this.state.isUnder = !this.state.isUnder;
		},
		selectOption: function (event) {
			this.options.isOther = false;
			if (!event.target.classList.contains('select-option--actived')) {
				let option = {
					value: event.target.getAttribute('value'),
					text: event.target.innerText,
				};
				this.options.selections.push(option);
				// this.options.selected.value = event.target.attributes.value.value;
				// this.options.selected.text = event.target.innerText;
				this.state.isUnder = false;
				this.state.isSelected = true;

				event.target.classList.add('select-option--actived');
			} else {
				this.options.selections = this.options.selections.filter(
					(item) => item.value !== event.target.getAttribute('value')
				);
				event.target.classList.remove('select-option--actived');
			}
		},
		removeOption: function (event) {
			let value = event.target.getAttribute('value');
			let index = this.options.selections.findIndex(
				(item) => item.value === value
			);
			this.options.selections.splice(index, 1);
			document.getElementById(value).classList.remove('select-option--actived');
			if (this.options.selections.length === 0) {
				this.state.isSelected = false;
			}
		},
		openOptionOther: function () {
			this.options.isOther = true;
		},
		selectOptionOther: function () {
			let option = {
				value: this.options.other,
				text: this.options.other,
			};
			this.options.selections.push(option);
			this.options.other = this.idioms[this.pIdiom].optionOther;
			this.options.isOther = false;
			this.state.isSelected = true;
		},
		loseFocus: function () {
			this.state.isUnder = false;
		},
		sendStatus: function (val) {
			let values = [];
			this.options.selections.forEach((item) => {
				values.push(item.value);
			});
			this.options.selected.value = values.join(',');
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
				'option-default': !this.state.isSelected,
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
  <div class="form-input_container" @mouseleave="loseFocus">
   <transition name="slide-fade">
    <div v-show="state.isUnder || state.isSelected" class="form-input_description">
     <span>
      {{ pPlaceholder || idioms[pIdiom].placeholder }}
      <span v-if="required">*</span>
      <span v-else> ({{idioms[pIdiom].descripOptional}})</span>
     </span>
    </div>
   </transition> 
   <div :class="'zl-'+zIndex" class="form-input_control">
    <div @click="doThis" v-bind:class="classInput" class="form-select--sura select-multiple--sura">
     <span v-show="options.selections.length == 0">
      {{ pPlaceholder || idioms[pIdiom].placeholder }}
     </span>
     <span :class="{'position-absolute': options.selections.length == 0}" v-show="options.selections.length >= 0" class="select-multiple-container">
      <span>
       <span class="select-multiple-selection">
        <ul class="sct-mlple-selection_rendered">
         <li v-for="item in options.selections" :value="item.value" class="sct-mlple-selection__choice"><span @click="removeOption" :value="item.value">x</span>{{ item.text }}</li>
        </ul>
       </span>
      </span>
     </span>
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
       <li v-for="item in options.filter" :value="item.value" :id="item.value" class="select-option" @click="selectOption">
        {{ item.text }}
       </li>
       <li id="sltedMpleOther1" class="select-option option-other" @mouseleave="function(){options.otherFocus = false;}" @mouseenter="function(){options.otherFocus = true;}">
        <input v-model="options.other" @click="openOptionOther">
        <span @click="selectOptionOther" v-show="options.isOther && options.otherFocus">✔</span>
       </li>
      </ul>
     </div>
    </transition>
    <input type="hidden" :name="name" :value="options.selected.value">
   </div>
   <div class="form-input_auxiliary">
    <div class="row">
     <div class="col-10 position-relative" style="text-transform: capitalize;">

      <transition-group name="slide-fade">
       <span style="position:absolute;" :key="1" v-show="required && !state.isError && !state.isUnder && !state.isSelected">
        {{idioms[pIdiom].auxRequired}}*
       </span>
       <span style="position:absolute;" :key="2" v-show="!required && !state.isError && !state.isUnder && !state.isSelected">
        {{idioms[pIdiom].descripOptional}}
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

Vue.component('input-sura_select-mple--v2', {
	props: {
		pPlaceholder: {
			type: String,
			default: '',
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
		zIndex: {
			type: String,
			default: '3',
		},
		pOther: {
			type: String,
			default: '',
		},
		pIdiom: {
			type: String,
			default: 'es',
		},
	},
	data: function () {
		return {
			name: this.pName,
			required: this.pRequired,
			search: '',
			fieldSearch: this.pSearch,
			options: {
				origin: this.items,
				selections: [],
				filter: [],
				isOther: false,
				other: this.pOther,
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
			idioms: {
				es: {
					descripOptional: 'opcional',
					auxRequired: 'requerido',
					placeholder: 'Seleccione una opción',
					optionOther: '¿Otro? (Especifique)',
				},
				en: {
					descripOptional: 'optional',
					auxRequired: 'required',
					placeholder: 'Select an option',
					optionOther: 'Other? (Specify)',
				},
			},
		};
	},
	beforeMount: function () {
		this.options.filter =
			this.options.origin.sort(function (a, b) {
				if (a.text > b.text) {
					return 1;
				}
				if (a.text < b.text) {
					return -1;
				}
				return 0;
			}) || [];
		this.options.selected.text = this.idioms[this.pIdiom].placeholder;
	},
	methods: {
		doThis: function () {
			this.state.isUnder = !this.state.isUnder;
		},
		selectOption: function (event) {
			this.options.isOther = false;
			if (!event.target.classList.contains('select-option--actived')) {
				let option = {
					value: event.target.getAttribute('value'),
					text: event.target.innerText,
				};
				this.options.selections.push(option);
				// this.options.selected.value = event.target.attributes.value.value;
				// this.options.selected.text = event.target.innerText;
				this.state.isUnder = false;
				this.state.isSelected = true;

				event.target.classList.add('select-option--actived');
			} else {
				this.options.selections = this.options.selections.filter(
					(item) => item.value !== event.target.getAttribute('value')
				);
				event.target.classList.remove('select-option--actived');
			}
		},
		removeOption: function (event) {
			let value = event.target.getAttribute('value');
			let index = this.options.selections.findIndex(
				(item) => item.value === value
			);
			this.options.selections.splice(index, 1);
			document.getElementById(value).classList.remove('select-option--actived');
			if (this.options.selections.length === 0) {
				this.state.isSelected = false;
			}
		},
		openOptionOther: function () {
			this.options.isOther = true;
			this.state.isUnder = false;
		},
		closeOptionOther: function () {
			this.options.isOther = false;
		},
		selectOptionOther: function () {
			let option = {
				value: this.options.other,
				text: this.options.other,
			};
			this.options.selections.push(option);
			this.options.other = this.idioms[this.pIdiom].optionOther;
			this.options.isOther = false;
			this.state.isSelected = true;
		},
		loseFocus: function () {
			this.state.isUnder = false;
		},
		sendStatus: function (val) {
			let values = [];
			this.options.selections.forEach((item) => {
				values.push(item.value);
			});
			this.options.selected.value = values.join(',');
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
				'option-default': !this.state.isSelected,
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
  <div class="form-input_container" @mouseleave="loseFocus">
   <transition name="slide-fade">
    <div v-show="state.isUnder || state.isSelected" class="form-input_description">
     <span>
      {{ pPlaceholder || idioms[pIdiom].placeholder }}
      <span v-if="required">*</span>
      <span v-else> ({{ idioms[pIdiom].descripOptional }})</span>
     </span>
    </div>
   </transition> 
   <div :class="'zl-'+zIndex" class="form-input_control">
    <div @click="doThis" v-bind:class="classInput" class="form-select--sura select-multiple--sura">
     <span v-show="options.selections.length == 0">{{ pPlaceholder || idioms[pIdiom].placeholder }}</span>
     <span :class="{'position-absolute': options.selections.length == 0}" v-show="options.selections.length >= 0" class="select-multiple-container">
      <span>
       <span class="select-multiple-selection">
        <ul class="sct-mlple-selection_rendered">
         <li v-for="item in options.selections" :value="item.value" class="sct-mlple-selection__choice"><span @click="removeOption" :value="item.value">x</span>{{ item.text }}</li>
        </ul>
       </span>
      </span>
     </span>
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
       <li v-for="item in options.filter" :value="item.value" :id="item.value" class="select-option" @click="selectOption">
        {{ item.text }}
       </li>
       <li @click="openOptionOther" id="sltedMpleOther1" class="select-option option-other">
        {{ idioms[pIdiom].optionOther }}
       </li>
      </ul>
     </div>
    </transition>
    <input type="hidden" :name="name" :value="options.selected.value">
   </div>
   <div class="form-input_auxiliary">
    <div class="row">
     <div class="col-10 position-relative">

      <transition-group name="slide-fade" style="text-transform:capitalize:">
       <span style="position:absolute;" :key="1" v-show="required && !state.isError && !state.isUnder && !state.isSelected">
        {{ idioms[pIdiom].auxRequired }}*
       </span>
       <span style="position:absolute;" :key="2" v-show="!required && !state.isError && !state.isUnder && !state.isSelected">
        {{ idioms[pIdiom].descripOptional }}
       </span>
       <span :key="4" class="input_auxiliary--error" v-show="state.isError">
        {{ state.errorMessage }}
       </span>
      </transition-group>
      
     </div>
    </div>
   </div>
   <div v-show="options.isOther" class="my-2 group-input--sura">
    <input class="form-input--sura" v-model="options.other" @click="openOptionOther">
    <span @click="closeOptionOther">
     <button type="button" class="cancel">✖</button>
    </span>
    <span @click="selectOptionOther">
     <button type="button" class="confirm">✔</button>
    </span>
   </div>
	</div>`,
});
