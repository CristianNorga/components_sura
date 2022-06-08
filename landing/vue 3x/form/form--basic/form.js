// https://seguros.comunicaciones.sura.com/scripthttps-tcde-03022022
// Form@4.1.3 created and adapted for graphic solutions +573125802861

app.component('inputSura', {
	parent: 'formSura',
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
			type: Boolean,
			default: true,
		},
		icons: {
			type: Object,
			default: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
				miniLoader: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/basic/icons-animated/miniLoader--blue.svg`,
			},
		},
		pRestrict: {
			type: Boolean,
			default: false,
		},
		pIdiom: {
			type: String,
			default: 'es',
		},
		verifying: {
			type: Boolean,
			default: false,
		},
		controlStatus: {
			type: String,
			default: 'after',
		},
		sValue: '',
	},
	data() {
		return {
			type: 'text',
			typeField: 'text',
			value: '',
			valueRaw: '',
			placeholder: this.pPlaceholder,
			name: this.pName,
			required: this.pRequired,
			limit: {
				isLimited: false,
				length: 0,
			},
			mask: {
				isMasked: false,
				pattern: '',
			},
			state: {
				length: 0,
				isFocused: false,
				isEmpty: true,
				isWarn: false,
				isError: false,
				verifying: false,
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
					conditionMeasures: 'Sólo se permiten números y puntos',
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
					conditionMeasures: 'Only numbers and points are allowed',
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
	beforeMount() {
		switch (this.pType) {
			case 'text':
				this.condition.pattern =
					/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionText;
				break;
			// case 'phone':
			// 	this.mask.isMasked = true;
			// 	this.mask.pattern = '(___) ___-____';
			// 	this.limit.length = 10;
			case 'number':
				// regex only numbers and spaces
				this.condition.pattern = /^[0-9\s]+$/u;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionNumber;
				break;
			case 'measures':
				this.condition.pattern = /^[0-9.\s]+$/u;
				this.condition.conditionMesaage =
					this.idioms[this.pIdiom].conditionMeasures;
				break;
			case 'email':
				this.limit.length = 250;
				this.typeField = 'email';
				this.condition.pattern =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionEmail;
				break;
			case 'id':
				// regex DNI
				this.condition.pattern = /^[a-zA-Z0-9\s]+$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionId;
				break;
			case 'address':
				// regex address latam with #,- and spaces
				this.condition.pattern =
					/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð #,.'-]+$/u;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionAddress;
				break;
			case 'password':
				this.typeField = 'password';
				this.type = 'password';
				this.condition.pattern = /^[a-zA-Z0-9\s]+$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionText;
			default:
				// regex only letters, spaces AND NUMBERS
				this.condition.pattern = /^[a-zA-Z\s]+$/;
				this.condition.conditionMesaage = this.idioms[this.pIdiom].conditionText;
				break;
		}
		if (this.pLimit) {
			this.limit.isLimited = true;
			this.limit.length = this.limit.length || 50;
		}
	},
	methods: {
		doThis(val) {
			this.state.isWarn = false;
			this.validateLength(val, this.validateType);
		},
		validateLength(val, callback) {
			this.isWarn = false;
			this.state.length = val.toString().length - this.mask.pattern.length;

			if (this.state.length == 0) {
				this.state.isEmpty = true;
				this.state.isError = false;
				this.state.errorMessage = '';
				this.state.verifying = false;
				clearTimeout(this.condition.timeOut);
				this.controlStatus == 'after' ? '' : this.sendStatus(true);
				return;
			}
			this.state.isEmpty = false;
			if (this.limit.isLimited) {
				if (this.state.length > this.limit.length) {
					this.state.isError = true;
					this.state.errorMessage = this.idioms[this.pIdiom].errorLength;
					this.controlStatus == 'after' ? '' : this.sendStatus(true);
					return;
				} else {
					this.state.isError = false;
					this.state.errorMessage = '';
				}
			}
			callback(val);
		},
		validateType(value) {
			// validate regex pattern
			switch (this.pType) {
				case 'email':
					clearTimeout(this.condition.timeOut);
					this.state.verifying = true;
					this.condition.timeOut = setTimeout(() => {
						this.state.verifying = false;
						if (!value.toLowerCase().match(this.condition.pattern)) {
							this.state.isError = true;
							this.state.errorMessage = this.condition.conditionMesaage;
						} else {
							this.state.isError = false;
							this.state.errorMessage = '';
						}
						this.controlStatus == 'after' ? '' : this.sendStatus(true);
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
					this.controlStatus == 'after' ? '' : this.sendStatus(true);
					break;
			}
		},
		sendStatus(val) {
			let state = {
				type: this.typeField,
				isEmpty: this.state.isEmpty,
				isError: this.state.isError,
				isRequired: this.required,
				name: this.name,
				value: this.mask.isMasked ? this.valueRaw : this.value,
			};
			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
	},
	computed: {
		classInput() {
			return {
				'input-warn': this.state.isWarn && !this.state.isError,
				'input-error': this.state.isError,
			};
		},
	},
	watch: {
		// whenever question changes, this function will run
		value(newVal, oldVal) {
			this.doThis(newVal);

			if (this.pRestrict) {
				this.value = this.state.isError ? oldVal : newVal;
			}
		},
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
		sValue(newVal) {
			this.value = newVal;
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
    <transition-group name="slide-up">
		<div key="1" class="icon-svg--error" v-show="state.verifying">
      <img :src="icons.miniLoader" alt="icon of verifying">
     </div>
     <div key="2" class="icon-svg--error" v-show="state.isError">
      <img :src="icons.error" alt="icon of error">
     </div>
    </transition-group>
   </div>
    </div>
    <div class="form-input_auxiliary">
   <div class="row">
    <div class="col-10 position-relative">
     <transition-group name="slide-down">
      <span style="text-transform: capitalize;" class="position-absolute" :key="1" v-show="!state.isError && state.isEmpty">
       {{required ? idioms[pIdiom].auxRequired+'*' : idioms[pIdiom].descripOptional}}
      </span>
      <span :class="{'input_auxiliary--error': state.isError}" :key="3" v-show="!state.isEmpty">
       {{ state.isError ? state.errorMessage  : condition.conditionMesaage }}
      </span>
     </transition-group>
     
    </div>
    <div v-if="limit.isLimited" class="col-2 px-0 text-end">
     {{ state.length }}/{{ limit.length }}
    </div>
   </div>
    </div>
  </div>`,
});

app.component('checkboxSura', {
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
	data() {
		return {
			value: this.pValue,
			name: this.pName,
			required: this.pRequired,
			state: {
				isWarn: false,
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: 'radio',
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.state.isEmpty ? '' : this.value,
			};
			
			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis() {
			this.state.isWarn = false;
			this.state.isEmpty = !this.state.isEmpty;
		},
	},
	watch: {
		// whenever question changes, this function will run
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	computed: {
		classInput() {
			return {
				'radio-warn': this.state.isWarn,
			};
		},
	},
	template: `
  <div class="form-input_container--wlh">
   <label class="input_label_custom"><slot name="label"></slot>
    <input @click="doThis" type="checkbox" :name="name" class="form-checkbox--sura" required="required" :value="value">
    <span :class="classInput" class="checkmark--checkbox"></span>
   </label>
  </div>`,
});

app.component('radioGroupSura', {
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
			default: [
				{
					value: 'si',
					text: 'si',
				},
				{
					value: 'no',
					text: 'no',
				},
			],
		},
		pDx: {
			type: String,
			default: 'x',
		},
		controlStatus: {
			type: String,
			default: 'after',
		},
	},
	data() {
		return {
			name: this.pName,
			required: this.pRequired,
			directionGroup: this.pDx === 'x' ? 'contents' : 'flex',
			state: {
				isWarn: false,
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: 'radio',
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.state.isEmpty ? '' : this.value,
			};
			
			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis() {
			// this.value = val;
			this.state.isEmpty = false;
			this.state.isWarn = false;
			this.controlStatus == 'before' ? this.sendStatus() : null;
		},
	},
	watch: {
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	computed: {
		classInput() {
			return {
				'radio-warn': this.state.isWarn,
			};
		},
	},
	template: `
  <div class="form-input_container--wlh" :style="'display: '+directionGroup+';'">
   <label v-for="item in items" class="input_label_custom">
    <span>{{ item.text }}</span>
    <input :class="classInput" @click="doThis" type="radio" :name="name" class="form-checkbox--sura" :required="required" :value="item.value">
    <span class="checkmark--radio"></span>
   </label>
  </div>`,
});

app.component('radioSura', {
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
	data() {
		return {
			value: this.pValue,
			name: this.pName,
			required: this.pRequired,
			state: {
				isWarn: false,
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: 'radio',
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.state.isEmpty ? '' : this.value,
			};
			
			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis() {
			this.state.isEmpty = false;
			this.state.isWarn = false;
		},
	},
	watch: {
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	computed: {
		classInput() {
			return {
				'radio-warn': this.state.isWarn,
			};
		},
	},
	template: `
  <div class="form-input_container--wlh">
   <label class="input_label_custom"><slot name="label"></slot>
    <input :class="classInput" @click="doThis" type="radio" :name="name" class="form-checkbox--sura" required="required" :value="value">
    <span class="checkmark--radio"></span>
   </label>
  </div>`,
});

app.component('selectSura', {
	props: {
		extraField: {
			type: Object,
			default: {
				has: false,
				fieldRestrictedTo: 'text',
			},
		},
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
			type: Object,
			default: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
		},
		pSearch: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default() {
				return [
					{ value: 'item1', text: 'Item 1' },
					{ value: 'item2', text: 'Item 2' },
					{ value: 'item3', text: 'Item 3' },
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
		statusAfter: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			name: this.pName,
			required: this.pRequired,
			search: '',
			fieldSearch: this.pSearch,
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
				isWarn: false,
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
	beforeMount() {
		this.options.filter = this.options.origin;
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
		doThis() {
			this.state.isUnder = !this.state.isUnder;
			this.state.isWarn = false;
		},
		selectOption(event) {
			this.options.isOther = false;
			this.options.selected.value = event.target.attributes['data-value'].value;
			this.options.selected.text = event.target.innerText;
			this.state.isUnder = false;
			if (this.extraField.has) {
				this.options.other =
					this.extraField.fieldRestrictedTo != 'number'
						? this.idioms[this.pIdiom].optionOther
						: 0;
				switch (this.extraField.type) {
					case 'unique':
						if (this.extraField.boundValue == this.options.selected.value) {
							this.options.isOther = true;
							this.state.isSelected = false;
						} else {
							this.options.isOther = false;
							this.state.isSelected = true;
						}
						break;
					case 'anything-but':
						if (this.extraField.boundValue != this.options.selected.value) {
							this.options.isOther = true;
							this.state.isSelected = false;
						} else {
							this.options.isOther = false;
							this.state.isSelected = true;
						}
						break;
					default:
						this.options.isOther = true;
						this.state.isSelected = false;
						break;
				}
			} else {
				this.state.isSelected = true;
			}
			this.statusAfter ? null : this.sendStatus(true);
		},
		openOptionOther() {
			this.options.isOther = true;
			this.state.isUnder = false;
		},
		closeOptionOther() {
			this.options.isOther = false;
		},
		selectOptionOther() {
			if(!this.options.other) return;
			
			if (!this.extraField.has) {
				this.options.selected.value = this.options.other;
				this.options.selected.text = this.options.other;
			} else {
				this.extraField.value = this.options.other;
			}
			this.options.isOther = false;
			this.state.isSelected = true;
			this.options.other =
				this.extraField.fieldRestrictedTo != 'number'
					? this.idioms[this.pIdiom].optionOther
					: 0;
			this.statusAfter ? null : this.sendStatus(true);
		},
		loseFocus() {
			this.state.isUnder = false;
		},
		sendStatus(val) {
			let state = {
				type: 'select',
				isEmpty: !this.state.isSelected,
				isError: this.state.isError,
				isRequired: this.required,
				name: this.name,
				value: this.options.selected.value,
			};
			this.extraField.has ? (state.extraField = this.extraField) : null;

			this.state.isWarn = this.required ? !this.state.isSelected : false;
			this.$emit('status', state);
		},
	},
	computed: {
		classInput() {
			return {
				'input-warn':
					this.state.isWarn && !this.state.isError && !this.options.selected.value,
				'input-error': this.state.isError,
				'focus-select': this.state.isUnder,
				'option-default': !this.state.isSelected,
			};
		},
		classIconArrowSelect() {
			return {
				'arrow-actived-select': this.state.isUnder,
			};
		},
	},
	watch: {
		search() {
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
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
		selectedOption(newVal) {
			if (newVal) {
				this.options.selected.value = newVal;
				this.options.selected.text = this.items.find(
					(item) => item.value === newVal
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
      <li v-for="item in options.filter" :data-value="item.value" class="select-option" @click="selectOption">
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
	 	<div v-show="options.isOther" class="form-input_control--other">
			<div class="form-input_description">
				<span>
				{{ extraField.placeholder || options.other }}
				</span>
			</div>
			<div :class="{'input-warn': state.isWarn && !state.isError }" class="my-2 group-input--sura">
				<input :type="extraField.fieldRestrictedTo" class="form-input--sura" v-model="options.other" @click="openOptionOther">
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

app.component('selectMpleSura', {
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
			default() {
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
	data() {
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
				isWarn: false,
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
	beforeMount() {
		this.options.filter = this.options.origin || [];
		this.options.selected.text = this.idioms[this.pIdiom].placeholder;
		this.other = this.pOther || this.idioms[this.pIdiom].optionOther;
	},
	methods: {
		doThis() {
			this.state.isUnder = !this.state.isUnder;
			this.state.isWarn = false;
		},
		selectOption(event) {
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
		removeOption(event) {
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
		openOptionOther() {
			this.options.isOther = true;
		},
		selectOptionOther() {
			let option = {
				value: this.options.other,
				text: this.options.other,
			};
			this.options.selections.push(option);
			this.options.other = this.idioms[this.pIdiom].optionOther;
			this.options.isOther = false;
			this.state.isSelected = true;
		},
		loseFocus() {
			this.state.isUnder = false;
		},
		sendStatus(val) {
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
			
			this.state.isWarn = this.required ? !this.state.isSelected : false;

			this.$emit('status', state);
		},
	},
	computed: {
		classInput() {
			return {
				'input-warn': this.state.isWarn && !this.state.isError,
				'input-error': this.state.isError,
				'focus-select': this.state.isUnder,
				'option-default': !this.state.isSelected,
			};
		},
		classIconArrowSelect() {
			return {
				'arrow-actived-select': this.state.isUnder,
			};
		},
	},
	watch: {
		search() {
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
		verifying() {
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

app.component('selectMpleSura--v2', {
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
			default() {
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
	data() {
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
				isWarn: false,
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
	beforeMount() {
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
		doThis() {
			this.state.isUnder = !this.state.isUnder;
			this.state.isWarn = false;
		},
		selectOption(event) {
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
		removeOption(event) {
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
		openOptionOther() {
			this.options.isOther = true;
			this.state.isUnder = false;
		},
		closeOptionOther() {
			this.options.isOther = false;
		},
		selectOptionOther() {
			let option = {
				value: this.options.other,
				text: this.options.other,
			};
			this.options.selections.push(option);
			this.options.other = this.idioms[this.pIdiom].optionOther;
			this.options.isOther = false;
			this.state.isSelected = true;
		},
		loseFocus() {
			this.state.isUnder = false;
		},
		sendStatus(val) {
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
			
			this.state.isWarn = this.required ? !this.state.isSelected : false;

			this.$emit('status', state);
		},
	},
	computed: {
		classInput() {
			return {
				'input-warn': this.state.isWarn && !this.state.isError,
				'input-error': this.state.isError,
				'focus-select': this.state.isUnder,
				'option-default': !this.state.isSelected,
			};
		},
		classIconArrowSelect() {
			return {
				'arrow-actived-select': this.state.isUnder,
			};
		},
	},
	watch: {
		search() {
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
		verifying() {
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

app.component('rangeSura', {
	props: {
		pType: {
			type: String,
			default: 'text',
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
		items: {
			type: Array,
			default: [
				{
					value: 'si',
					text: 'si',
				},
				{
					value: 'no',
					text: 'no',
				},
				{
					value: 'no-sabe',
					text: 'no sabe',
				},
			],
		},
		isMobile: {
			type: Boolean,
			default: true,
		},
		controlStatus: {
			type: String,
			default: 'after',
		},
	},
	data() {
		return {
			name: this.pName,
			required: this.pRequired,
			selected: {
				value: '',
				text: '',
				rangeMin: '',
				rangeMax: '',
			},
			state: {
				isWarn: false,
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: this.pType,
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.value,
			};

			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			// rangeMin;
			// rangeMax;
			let value = el.target.value.toString();
			this.items.filter((item) => {
				if (value >= item.rangeMin && value <= item.rangeMax) {
					this.selected.value = item.value;
					this.selected.text = item.text;
					this.selected.rangeMin = item.rangeMin;
					this.selected.rangeMax = item.rangeMax;
				}
			});
			// this.value = el.target.attributes.value.value;
			// this.state.isEmpty = false;
			// this.state.isWarn = false;
			// this.controlStatus == 'before' ? this.sendStatus() : null;
		},
		isActived(val) {
			return this.value == val;
		},
	},
	created() {
		let pointBreak = (100 * 1) / this.items.length;
		let point = 0;
		let arrayLength = this.items.length;
		for (let i = 0; i < arrayLength; i++) {
			this.items[i].rangeMin = point;
			point += pointBreak;

			if (i == 0) {
				this.items[i].rangeMax = point;
				point += 1;
			} else if (i == arrayLength - 1) {
				this.items[i].rangeMax = point - 1;
			} else {
				point -= 1;
				this.items[i].rangeMax = point;
				point += 1;
			}
		}
	},
	watch: {
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	computed: {
		objectClass() {
			return {
				'radio-warn': this.state.isWarn,
				// 'flex-column': this.pDx === 'y',
			};
		},
		objectStyle() {
			return {
				width: (100 * 1) / this.items.length + '%',
			};
		},
		styleBar() {
			return {
				background: 'rgb(232, 232, 232)',
				background: `linear-gradient(90deg, rgba(232,232,232,1) ${this.selected.rangeMin}%, rgba(0,51,160,1) ${this.selected.rangeMin}%, rgba(0,51,160,1) ${this.selected.rangeMax}%, rgba(232,232,232,1) ${this.selected.rangeMax}%)`,
			};
		},
	},
	template: `
	 <div class="form-input_container">
			<label for="customRange2" class="form-label">{{selected.text || 'Seleccione un rango'}}</label>
			<div class="container-range--sura" style="width: 100%;position:relative;">
				<div :style="styleBar"></div>
				<input @change="doThis" @input="doThis" type="range" class="form-range--sura form-range" min="0" max="100" id="customRange2">
			</div>
			<div class="row">
				<div v-for="item in items" :style="objectStyle" class="text-center">
					{{ item.text }}
				</div>
			</div>
		</div>

	`,
});

app.component('scaleSura', {
	props: {
		pType: {
			type: String,
			default: 'text',
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
		items: {
			type: Array,
			default: [
				{
					value: '1',
					text: 'si',
				},
				{
					value: '2',
					text: 'no',
				},
				{
					value: '3',
					text: 'no sabe',
				},
			],
		},
		statusAfter: {
			type: Boolean,
			default: true,
		},
		selectedOption: {
			type: String,
			// default: '',
		},
	},
	data() {
		return {
			name: this.pName,
			required: this.pRequired,
			selected: {
				value: '',
				text: '',
			},
			state: {
				isWarn: false,
				isEmpty: true,
				isHover: false,
			},
		};
	},
	methods: {
		hoverOn() {
			this.state.isHover = true;
		},
		hoverOff() {
			this.state.isHover = false;
		},
		sendStatus(val) {
			let state = {
				type: this.pType,
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.selected.value,
			};

			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			let item = this.items.filter((item) => item.value == el.target.value);
			this.selected.value = item[0].value;
			this.selected.text = item[0].text;

			// this.value = el.target.attributes.value.value;
			this.state.isEmpty = false;
			this.state.isWarn = false;
			this.statusAfter ? null : this.sendStatus();
		},
		isActived(val) {
			return this.selected.value == val;
		},
	},
	watch: {
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
		selectedOption(newVal) {
			if (newVal) {
				this.selected.value = newVal;
				this.selected.text = this.items.find(
					(item) => item.value === newVal
				).text;
				this.state.isUnder = false;
				this.state.isEmpty = false;
			}
		},
	},
	computed: {
		objectClass() {
			return {
				'radio-warn': this.state.isWarn,
				// 'flex-column': this.pDx === 'y',
			};
		},
		objectStyle() {
			return {
				width: (100 * 1) / this.items.length + '%',
			};
		},
		displayHelper() {
			return {
				'd-flex': !this.state.isHover && this.state.isEmpty,
			};
		},
	},
	template: `
	 <div @mouseover="hoverOn" @mouseout="hoverOff" class="form-input_container" style="min-height: 0px;">
			<label for="customRange2" class="form-label">{{selected.text || 'Seleccione un escala'}}</label>
			<div :class="objectClass" class="d-flex scale-results">
				<button type="button" @click="doThis" v-for="item in items" :actived="isActived(item.value)" :value="item.value" :style="objectStyle" class="text-center btn btn-sura--basic rounded-1">
					{{ item.value }}
				</button>
			</div>
			<div v-show="!this.state.isHover && this.state.isEmpty" :class="displayHelper" class="scale-helpers">
				<div v-for="item in items" :style="objectStyle" class="text-center">
					{{ item.text }}
				</div>
			</div>
		</div>

	`,
});

app.component('btnsGroupSura', {
	props: {
		isRadio: {
			type: Boolean,
			default: true,
		},
		pType: {
			type: String,
			default: 'text',
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
		statusAfter: {
			type: Boolean,
			default: true,
		},
		items: {
			type: Array,
			default: [
				{
					value: 'si',
					text: 'si',
				},
				{
					value: 'no',
					text: 'no',
				},
				{
					value: 'Ninguno',
					text: 'Ninguno',
					none: true,
				},
			],
		},
		pDx: {
			type: String,
			default: 'x',
		},
		pAlign: {
			type: String,
			default: 'start',
		},
		selectedOption: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			name: this.pName,
			required: this.pRequired,
			value: '',
			values: [],
			fieldNone: '',
			// directionGroup: this.pDx === 'x' ? 'contents' : 'flex',
			state: {
				isWarn: false,
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: this.pType,
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
			};
			if (this.isRadio) {
				state.value = this.value;
			} else {
				state.value = this.values.toString();
			}

			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			// data-value
			let id = el.target.attributes['data-id'].value;
			this.value = this.items[id].value;

			if (this.isRadio) {
				this.state.isEmpty = false;
				this.state.isWarn = false;
			} else {
				let item = this.values.filter((item) => {
					return item == this.value;
				});
				if (item.length == 0) {
					if (this.fieldNone) {
						if (this.fieldNone == this.value) {
							this.values = [];
							this.values.push(this.value);
						} else {
							this.values.indexOf(this.fieldNone) != -1
								? this.values.splice(this.values.indexOf(this.fieldNone), 1)
								: null;
							this.values.push(this.value);
						}
						this.state.isEmpty = false;
						this.state.isWarn = false;
					} else {
						this.values.push(this.value);
					}
					this.state.isEmpty = false;
					this.state.isWarn = false;
				} else {
					this.values.splice(this.values.indexOf(item[0]), 1);
					if (this.values.length == 0) {
						this.state.isEmpty = true;
						this.state.isWarn = true;
					}
				}
			}

			this.statusAfter ? null : this.sendStatus();
		},
		isActived(val) {
			if (this.isRadio) {
				return this.value == val;
			} else {
				return this.values.indexOf(val) != -1;
			}
		},
	},
	created() {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].id = i;
			this.fieldNone = this.items[i].none ? this.items[i].value : '';
		}
	},
	watch: {
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
		selectedOption(newVal) {
			if (newVal) {
				if (this.isRadio) {
					this.value = newVal;
					this.state.isEmpty = false;
					this.state.isWarn = false;
				} else {
					this.values = newVal.split(',');
					this.state.isEmpty = false;
					this.state.isWarn = false;
				}
			}
		},
	},
	computed: {
		objectClass() {
			return {
				'radio-warn': this.state.isWarn,
				'flex-column': this.pDx === 'y',
			};
		},
	},
	template: `
  <div :class="[objectClass, 'justify-content-'+pAlign]" class="form-input_container--wlh">
		<button v-for="item in items" @click="doThis" type="button" :data-id="item.id" class="btn btn-sura--basic my-4" :actived="isActived(item.value)">
			{{ item.text }}
			<span :data-id="item.id"></span>
		</button>
  </div>`,
});

// no terminado
app.component('btnsGroupSura-list', {
	props: {
		isRadio: {
			type: Boolean,
			default: true,
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
		items: {
			type: Array,
			default: [
				{
					value: 'si',
					text: 'si',
				},
				{
					value: 'no',
					text: 'no',
				},
				{
					value: 'no-sabe',
					text: 'no sabe',
				},
			],
		},
		isMobile: {
			type: Boolean,
			default: true,
		},
		controlStatus: {
			type: String,
			default: 'after',
		},
	},
	data() {
		return {
			name: this.pName,
			required: this.pRequired,
			selected: {
				value: '',
				text: '',
				rangeMin: '',
				rangeMax: '',
			},
			state: {
				isWarn: false,
				isEmpty: true,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: 'text',
				isEmpty: this.state.isEmpty,
				isError: false,
				isRequired: this.required,
				name: this.name,
				value: this.value,
			};

			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			let value = el.target.value.toString();
			if (this.isRadio) {
				this.items.filter((item) => {
					if (value >= item.rangeMin && value <= item.rangeMax) {
						this.selected.value = item.value;
						this.selected.text = item.text;
						this.selected.rangeMin = item.rangeMin;
						this.selected.rangeMax = item.rangeMax;
					}
				});
			} else {
				this.items.filter((item) => {
					if (value >= item.rangeMin && value <= item.rangeMax) {
						this.selected.value = item.value;
						this.selected.text = item.text;
						this.selected.rangeMin = item.rangeMin;
						this.selected.rangeMax = item.rangeMax;
					}
				});
			}
		},
		isActived(val) {
			return this.value == val;
		},
	},
	created() {
		for (let i = 0; i < arrayLength; i++) {
			this.items[i].id = i;
		}
	},
	watch: {
		verifying() {
			if (this.verifying) this.sendStatus(this.verifying);
		},
	},
	computed: {
		objectClass() {
			return {
				'radio-warn': this.state.isWarn,
				// 'flex-column': this.pDx === 'y',
			};
		},
		objectStyle() {
			return {
				width: (100 * 1) / this.items.length + '%',
			};
		},
		styleBar() {
			return {
				background: 'rgb(232, 232, 232)',
				background: `linear-gradient(90deg, rgba(232,232,232,1) ${this.selected.rangeMin}%, rgba(0,51,160,1) ${this.selected.rangeMin}%, rgba(0,51,160,1) ${this.selected.rangeMax}%, rgba(232,232,232,1) ${this.selected.rangeMax}%)`,
			};
		},
	},
	template: `
	 <div class="form-input_container">
			<label for="customRange2" class="form-label">{{selected.text || 'Seleccione un rango'}}</label>
			<div class="container-range--sura" style="width: 100%;position:relative;">
				<div :style="styleBar"></div>
				<input @change="doThis" @input="doThis" type="range" class="form-range--sura form-range" min="0" max="100" id="customRange2">
			</div>
			<div class="row">
				<div v-for="item in items" :style="objectStyle" class="text-center">
					{{ item.text }}
				</div>
			</div>
		</div>

	`,
});

app.component('formSura', {
	props: {
		gearId: {
			type: String,
			default: '',
		},
		smartcaptureFormId: {
			type: Number,
			default: 0,
		},
		sourceKey: {
			type: String,
			default: '',
		},
		source: {
			type: String,
			default: 'dataExtension',
		},
		triggeredSend: {
			type: String,
			default: '',
		},
		onSubmitType: {
			type: String,
			default: '',
		},
		onSubmitGotoUrl: {
			type: String,
			default: '',
		},
		callback: {
			type: Function,
			default: () => {console.warn('callback not defined');},
		},
		language: {
			type: String,
			default: 'es',
		},
		isDataShared: {
			type: Boolean,
			default: false,
		},
		btnText: {
			type: Object,
			default: {
				es: '¡ESTOY INTERESADO!',
				en: 'I’M INTERESTED!',
			},
		},
		dni: {
			type: Object,
			default: { id: 'id', type: 'type', necessary: false },
		},
		loader: {
			stype: String,
		},
		txtSubmiting: {
			type: Object,
		},
	},
	data() {
		return {
			// ScForm: {
			// useJourneyBuilder: false,
			// },
			state: {
				verifying: false,
				counting: false,
				isError: false,
				submitted: false,
				porcentProgress: 0,
				inputs: [],
				timeOut: setTimeout,
				message: '',
			},
			basicIcons: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
			texts: {
				es: {
					VERIFYING: 'Verificando...',
					ERROR: 'error encontrado',
					ERRORS: 'errores encontrados',
					SUBMITING: 'Enviando...',
				},
				en: {
					VERIFYING: 'Verifying...',
					ERROR: 'error found',
					ERRORS: 'errors found',
					SUBMITING: 'Submitting...',
				},
			},
			persistence: {
				responseApi: null,
			},
			// lists: {
			// 	names: {
			// 		es: [
			// 			{ value: 'Juan Guillermo', text: 'Juan Guillermo' },
			// 			{ value: 'Mauricio Lopez', text: 'Mauricio Lopez' },
			// 			{ value: 'resolviendo problema resolve', text: 'Cristian Noreña' },
			// 		],
			// 	},
			// },
		};
	},
	mounted() {
		// if (!this.gearId) throw new Error('gearID is required');
		// if (!this.smartcaptureFormId)
		// 	throw new Error('smartCaptureFormID is required');
		// if (!this.sourceKey) throw new Error('sourceKey is required');
		// if (!window.contentDetail)
		// 	console.warn('contentDetail is required for the submit and tranking');
		if (!window.libUtils) console.warn('libUtils is required for get last upgrades.');

		if (this.txtSubmiting) {
			for (let key in this.txtSubmiting) {
				this.texts[key].SUBMITING = this.txtSubmiting[key];
			}
		}
	},
	methods: {
		submit() {
			if (!this.state.isError) this.startVerify();
		},
		startVerify() {
			this.state.inputs = [];
			this.state.verifying = true;
			this.state.message = this.texts[this.language].VERIFYING;
			this.state.porcentProgress = 15;
		},
		getStatus(status) {
			clearTimeout(this.state.timeOut);
			this.state.inputs.push(status);
			this.state.timeOut = setTimeout(() => {
				this.state.counting = true;
				this.state.porcentProgress = 30;
				this.readInputs();
			}, 2000);
		},
		readInputs() {
			this.state.porcentProgress = 50;
			let problems = this.state.inputs.filter((item) => {
				if (item.isError) return true;
				if (item.isRequired) return item.isEmpty;
			});
			if (problems.length > 0) {
				this.state.isError = true;
				this.state.porcentProgress = 100;
				if (problems.length === 1) {
					this.state.message = `${problems.length} ${
						this.texts[this.language].ERROR
					}`;
				} else {
					this.state.message = `${problems.length} ${
						this.texts[this.language].ERRORS
					}`;
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
			} else {
				this.state.porcentProgress = 75;
				this.state.message = this.texts[this.language].SUBMITING;
				this.state.timeOut = setTimeout(() => {
					if (!!this.loader)
						document.getElementById(this.loader).classList.add('show');

					if (this.dni.necessary) {
						typeID = this.filterInputs(this.dni.type, 'name');
						numberID = this.filterInputs(this.dni.id, 'name');

						this.state.inputs.push({
							name: 'DNI',
							value: typeID[0].value + numberID[0].value,
						});
					}
					console.log('axios desactivado');
					this.success();
					// window.libUtils.getScript(
					// 	'axios',
					// 	'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
					// 	this.post,
					// 	false
					// );
					clearTimeout(this.state.timeOut);
				}, 1000);
			}
		},
		filterInputs(filter, key) {
			return this.state.inputs.filter((item) => {
				if (item[key] == filter) return true;
				return false;
			});
		},
		addDataInLink() {
			let data = this.state.inputs.map((item) => {
				return `${item.name}=${encodeURIComponent(item.value)}`;
			});
			this.onSubmitGotoUrl = `${this.onSubmitGotoUrl}?${data.join('&')}`;
		},
		post() {
			let url = `${window.libUtils.getBaseUrl()}/smartcapture/post`;
			let attributes = [];
			var emailAddresses = [];
			let contentDetail = window.contentDetail || {};

			this.state.inputs.forEach((item) => {
				attributes.push(`"${item.name}":"${encodeURIComponent(item.value)}"`);
				if (item.type === 'email') {
					emailAddresses.push(`"${item.name}":"${item.value}"`);
				}
			});

			// this.gearId;

			const payload = new URLSearchParams();
			payload.append('emailAddress', `{ ${emailAddresses.join(',')} }`);
			payload.append('formID', this.smartcaptureFormId);
			payload.append('targetID', this.sourceKey);
			payload.append('targetType', this.source);
			payload.append('attributes', `{ ${attributes.join(',')} }`);
			payload.append('withTriggeredSend', this.triggeredSend);
			payload.append(
				'isJourneyBuilderIntegrated',
				!!contentDetail.triggerJourneyBuilderEvent
			);

			this.persistence.responseApi = null;

			this.persistence.responseApi = axios({
				method: 'post',
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: ['application/json', 'text/javascript', '*/*; q=0.01'],
					'X-Requested-With': 'XMLHttpRequest',
				},
				data: payload,
			}).then((response) => {
				if (response.data === true && response.status === 200) {
					// this.persistence.responseApi = response;
					this.success();
				}
			});
		},
		success() {
			this.state.porcentProgress = 100;
			this.state.message = '✓';

			switch (this.onSubmitType) {
				case 'redirect':
					if (this.isDataShared) addDataInLink();
					window.location.href = this.onSubmitGotoUrl;
					break;
				case 'redirect-blank':
					if (this.isDataShared) addDataInLink();
					window.open(this.onSubmitGotoUrl, '_blank');
					break;
				case 'executeAction':
					this.callback(this.state.inputs);
					break;
				default:
					if (!!this.loader)
						document.getElementById(this.loader).classList.remove('show');
					this.state.submitted = true;
					break;
			}
		},
		error() {
			// this.
		},
	},
	computed: {
		classProgress() {
			return {
				'success-verificaton': this.state.submitted,
				'error-verificaton': this.state.isError,
			};
		},
	},
	template: `
		<div class="formSura">
			<transition name="slide-up">
			<form v-if="!state.submitted"  :id="'smartcapture-block-' + gearId" class="smartcapture-content-wrapper container-fluid" novalidate="novalidate">
				<div class="row">

					<slot name="content" :verifying="state.verifying" :getStatus="getStatus">
					
					</slot>
					
					<div class="col-12">
						<div class="form-input_button">
							<button :submited="state.submitted" type="button" @click="submit" :disabled="state.submitted">
								<progress :class="classProgress" id="progresa-form" max="100" :value="state.porcentProgress" class="progressForm"></progress>
								<span v-show="!state.verifying">{{btnText[language]}}</span>
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
			<div v-else-if="state.submitted" class="container-fluid">
				<div class="row">
					<slot name="tkcomponent">
					</slot>
				</div>
			</div>
			</transition>
		</div>
		`,
});
