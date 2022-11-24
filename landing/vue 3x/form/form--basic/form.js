// https://seguros.comunicaciones.sura.com/js-form@4.2.2-rounded

// Form@4.2.2 created and adapted for graphic solutions +573125802861
//pInternalization example(BTN)
//ESPAÑOL {TEXT: PRUEBA} - ENGLISH {TEXT: TEST}
//family-receive="[{from: 'typeId', change: 'type'}]"

app.component('inputSura', {
	props: {
		pFamilyReceive: {
			type: Array,
			default: function () {
				return [];
			},
		},
		pFamilyData: {
			type: Object,
		},
		pFamilyListener: {
			type: Boolean,
		},
		pEmitFamilyData: {
			type: Boolean,
			default: false,
		},
		pInternalization: {
			type: Object,
			default: {
				conditionText: 'Sólo se permiten letras',
				conditionNumber: 'Sólo se permiten números',
				conditionMeasures: 'Sólo se permiten números y puntos',
				conditionEmail:
					'Por favor escriba un correo electrónico válido sin espacios',
				errorLength: 'con una longitud minima de',
				errorLengthMax: 'y máximo',
				descripOptional: 'opcional',
				auxRequired: 'requerido',
				conditionId: 'Sólo se permiten letras y números',
				conditionAddress: 'Digite una dirección válida',
			},
		},
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
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsLimit: {
			type: Boolean,
			default: true,
		},
		pLength: {
			type: Object,
			default: {
				min: 0,
				max: 50,
			},
		},
		pIcons: {
			type: Object,
			default: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
				miniLoader: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/basic/icons-animated/miniLoader--blue.svg`,
			},
		},
		pIsRestrict: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
		pValue: null,
	},
	emits: ['status', 'changeFamilyData', 'blur'],
	data() {
		return {
			show: false,
			type: 'text',
			typeField: 'text',
			value: this.pValue || '',
			tied: null,
			required: false,
			valueRaw: '',
			placeholder: this.pPlaceholder,
			limit: {
				isLimited: false,
				max: 0,
				min: 0,
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
				isValid: false,
				verifying: false,
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
	beforeMount() {
		this.changeType(this.pType);
		if (this.pValue) {
			this.value = this.pValue;
		}
		if (this.pFamilyReceive.length > 0) {
			this.pFamilyReceive.forEach((item) => {
				if (item.change == 'visible') {
					this.show = false;
					this.required = false;
					return;
				} else {
					this.show = true;
					this.required = this.pIsRequired;
				}
			});
		} else {
			this.show = true;
			this.required = this.pIsRequired;
		}
	},
	methods: {
		changeType(type) {
			this.limit.max = this.pLength.max;
			this.limit.min = this.pLength.min;
			switch (type) {
				case 'text':
					this.condition.pattern =
						/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionText;
					break;
				case 'phone':
					//  this.mask.isMasked = true;
					//  this.mask.pattern = '(___) ___-____';
					this.limit.min = 7;
					this.limit.max = 10;
					this.typeField = 'number';

				case 'number':
					// regex only numbers and spaces
					this.condition.pattern = /^[0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionNumber;
					this.typeField = 'number';

					break;
				case 'measures':
					this.condition.pattern = /^[0-9.\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionMeasures;
					this.typeField = 'number';

					break;
				case 'email':
					this.limit.min = 7;
					this.limit.max = 250;
					this.typeField = 'email';
					this.condition.pattern =
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					this.condition.conditionMesaage = this.pInternalization.conditionEmail;
					break;
				case 'A': //NIT
					this.limit.min = 10;
					this.limit.max = 10;
					this.condition.pattern = /^[0-9.\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionNumber;
					break;
				case 'C': //CEDULA
					this.limit.min = 3;
					this.limit.max = 10;
					this.condition.pattern = /^[0-9.\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionNumber;
					break;
				case 'E': //CEDULA EXTRANJERIA
					this.limit.min = 1;
					this.limit.max = 11;
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionId;
					break;
				case 'P': //PASAPORTE
					this.limit.min = 1;
					this.limit.max = 11;
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionId;
					break;
				case 'R': //REGISTRO CIVIL
					this.limit.min = 8;
					this.limit.max = 16;
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionId;
					break;
				case 'T': //TARJ.IDENTIDAD
					this.limit.min = 10;
					this.limit.max = 14;
					this.condition.pattern = /^[0-9.\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionNumber;
					break;
				case 'D': //DIPLOMATICO
					this.limit.min = 1;
					this.limit.max = 11;
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionId;
					break;
				case 'N': //NUIP
					this.limit.min = 10;
					this.limit.max = 11;
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionId;
					break;
				case 'TE': //PERMISO ESPECIAL PERMANENCIA
					this.limit.min = 15;
					this.limit.max = 15;
					this.condition.pattern = /^[0-9.\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionNumber;
					break;
				case 'address':
					// regex address latam with #,- and spaces
					this.condition.pattern =
						/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð #,.'-]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionAddress;
					break;
				case 'password':
					this.typeField = 'password';
					this.type = 'password';
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/;
					this.condition.conditionMesaage = this.pInternalization.conditionText;
				default:
					// regex only letters, spaces AND NUMBERS
					this.condition.pattern = /^[a-zA-Z0-9\s]+$/u;
					this.condition.conditionMesaage = this.pInternalization.conditionId;
					break;
			}
		},
		doThis(val) {
			this.state.isWarn = false;
			this.state.isValid = false;
			this.validateLength(val, this.validateType);
		},
		validateLength(val, callback) {
			// this.state.length = val.toString().length - this.mask.pattern.length;
			this.state.length = val.toString().length;

			if (this.state.length == 0) {
				this.state.isEmpty = true;
				this.state.isError = false;
				this.isWarn = false;
				this.state.errorMessage = '';
				this.state.verifying = false;
				clearTimeout(this.condition.timeOut);
				this.pIsStatusAfter ? '' : this.sendStatus(true);
				return;
			}
			this.state.isEmpty = false;
			if (this.pIsLimit) {
				if (
					this.state.length > this.limit.length ||
					this.state.length < this.limit.min
				) {
					this.state.isWarn = true;
					this.state.errorMessage = `${this.condition.conditionMesaage} ${this.pInternalization.errorLength} ${this.limit.min} ${this.pInternalization.errorLengthMax} (${this.limit.max})`;
					this.pIsStatusAfter ? '' : this.sendStatus(true);
					return;
				} else {
					this.state.isWarn = false;
					this.state.errorMessage = '';
				}
				callback(val);
			}
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
							this.state.isValid = true;
							if (this.pEmitFamilyData) this.sendMsgToFamily();
						}
						this.pIsStatusAfter ? '' : this.sendStatus(true);
					}, 1400);
					break;
				default:
					if (!this.condition.pattern.test(value)) {
						this.state.isError = true;
						this.state.errorMessage = this.condition.conditionMesaage;
					} else {
						this.state.isError = false;
						this.state.errorMessage = '';
						if (this.pEmitFamilyData) this.sendMsgToFamily();
					}
					this.pIsStatusAfter ? '' : this.sendStatus(true);
					break;
			}
		},
		sendStatus(val) {
			let state = {
				type: this.typeField,
				isEmpty: this.state.isEmpty,
				isError: this.state.isError,
				isRequired: this.required,
				name: this.pName,
				value: this.mask.isMasked ? this.valueRaw : this.value,
			};
			this.typeField == 'email' ? (state.isValid = this.state.isValid) : null;
			this.state.isWarn = this.required ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		sendMsgToFamily() {
			this.$emit('changeFamilyData', {
				componentName: this.pName,
				data: this.value,
				condition: this.tied,
			});
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

			if (this.pIsRestrict) {
				this.value = this.state.isError ? oldVal : newVal;
			}
		},
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue(newVal) {
			this.value = newVal;
		},
		pFamilyListener() {
			if (this.pFamilyReceive.length > 0) {
				this.pFamilyReceive.forEach((item) => {
					// pFamilyData.components or lastComponent
					if (item.from == this.pFamilyData.lastComponent) {
						let value = this.pFamilyData.components.find(
							(comp) => comp.componentName == item.from
						);
						switch (item.change) {
							case 'type':
								// this.pType = this.pFamilyData.data;
								this.changeType(value.data);
								this.doThis(this.value);
								break;
							case 'visible':
								// this.pType = this.pFamilyData.data;
								if (value.condition == item.parameter) {
									this.state.isEmpty = false;
									this.show = true;
									this.required = this.pIsRequired;
								} else {
									this.show = false;
									this.required = false;
								}
								break;
							default:
								break;
						}
					}
				});
			}
		},
	},
	template: `
 <div v-show="show" class="form-input_container">
  <transition name="slide-fade">
   <div v-show="!state.isEmpty" class="form-input_description">
     <span>
      {{ placeholder }}
      <span v-if="required">*</span>
      <span v-else> ({{pInternalization.descripOptional}})</span>
     </span>
   </div>
  </transition>
    <div class="form-input_control">
      <input @blur="$emit('blur')" v-model="value" v-bind:class="classInput" :type="type" :name="pName" class="form-input--sura" :required="required" :placeholder="placeholder">
   <div class="input-container-icon--md">
    <transition-group name="slide-up">
  <div key="1" class="icon-svg--error" v-show="state.verifying">
      <img :src="pIcons.miniLoader" alt="icon of verifying">
     </div>
     <div key="2" class="icon-svg--error" v-show="state.isError && !state.verifying">
      <img :src="pIcons.error" alt="icon of error">
     </div>
    </transition-group>
   </div>
    </div>
    <div class="form-input_auxiliary">
   <div class="row">
    <div class="col-10 position-relative">
     <transition-group name="slide-down">
      <span style="text-transform: capitalize;" class="position-absolute" :key="1" v-show="!state.isError && state.isEmpty">
       {{required ? pInternalization.auxRequired+'*' : pInternalization.descripOptional}}
      </span>
      <span :class="{'input_auxiliary--error': state.isError}" :key="2" v-show="!state.isEmpty">
       {{ state.isError || state.isWarn ? state.errorMessage  : condition.conditionMesaage }}
      </span>
     </transition-group>
     
    </div>
    <div v-if="pIsLimit" class="col-2 px-0 text-end">
     {{ state.length }}/{{ limit.max }}
    </div>
   </div>
    </div>
  </div>`,
});

// realizar un componente de email por aparte

app.component('checkboxSura', {
	props: {
		pValue: {
			type: String,
			default: 'Si',
		},
		pName: {
			type: String,
			default: '',
		},
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pIsCheck: {
			type: Boolean,
			default: false,
		},
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['status'],
	data() {
		return {
			value: this.pValue,
			state: {
				isWarn: false,
				isCheck: this.pIsCheck,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: 'radio',
				isEmpty: !this.state.isCheck,
				isError: false,
				isRequired: this.pIsRequired,
				name: this.pName,
				value: !this.state.isCheck ? '' : this.value,
			};

			this.state.isWarn = this.pIsRequired ? !this.state.isCheck : false;
			this.$emit('status', state);
		},
		doThis() {
			this.state.isWarn = false;
			this.state.isCheck = !this.state.isCheck;
			this.pIsStatusAfter ? '' : this.sendStatus(true);
		},
	},
	watch: {
		// whenever question changes, this function will run
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue(newVal) {
			this.value = newVal;
		},
		pIsCheck(newVal) {
			this.state.isCheck = newVal;
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
    <input @click="doThis" type="checkbox" :name="pName" class="form-checkbox--sura" required="pIsRequired" :value="value" v-model="state.isCheck">
    <span :class="classInput" class="checkmark--checkbox"></span>
   </label>
  </div>`,
});

app.component('radioGroupSura', {
	props: {
		pFamilyReceive: {
			type: Array,
			default: function () {
				return [];
			},
		},
		pFamilyData: {
			type: Object,
		},
		pFamilyListener: {
			type: Boolean,
		},
		pEmitFamilyData: {
			type: Boolean,
			default: false,
		},
		pName: {
			type: String,
			default: '',
		},
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pItems: {
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
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
		pValue: {
			type: String,
			default: '',
		},
	},
	emits: ['status', 'changeFamilyData'],
	data() {
		return {
			show: false,
			required: false,
			directionGroup: this.pDx === 'x' ? 'contents' : 'flex',
			value: '',
			state: {
				isWarn: false,
				isSelected: false,
			},
		};
	},
	methods: {
		sendStatus(val) {
			let state = {
				type: 'radio',
				isEmpty: !this.state.isSelected,
				isError: false,
				isRequired: this.required,
				name: this.pName,
				value: this.value,
			};

			this.state.isWarn = this.pIsRequired ? !this.state.isSelected : false;
			this.$emit('status', state);
		},
		doThis(value) {
			this.value = value;
			this.state.isSelected = true;
			this.state.isWarn = false;
			this.pIsStatusAfter ? null : this.sendStatus();
			if (this.pEmitFamilyData) this.sendMsgToFamily();
		},
		takeValueParent(val) {
			this.value = val;
			this.state.isUnder = false;
			this.state.isSelected = true;
		},
		sendMsgToFamily() {
			console.log(this.value);
			let item = this.pItems.find((comp) => comp.value == this.value);
			this.$emit('changeFamilyData', {
				componentName: this.pName,
				data: this.value,
				condition: item.condition || '',
			});
		},
	},
	beforeMount() {
		if (this.pValue) {
			this.takeValueParent(this.pValue);
		}
		if (this.pFamilyReceive.length > 0) {
			this.pFamilyReceive.forEach((item) => {
				if (item.change == 'visible') {
					this.show = false;
					this.required = false;
					return;
				} else {
					this.show = true;
					this.required = this.pIsRequired;
				}
			});
		} else {
			this.show = true;
			this.required = this.pIsRequired;
		}
	},
	watch: {
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue(newVal) {
			this.takeValueParent(newVal);
		},
		pFamilyListener() {
			console.log('pFamilyListener');
			if (this.pFamilyReceive.length > 0) {
				this.pFamilyReceive.forEach((item) => {
					// pFamilyData.components or lastComponent
					if (item.from == this.pFamilyData.lastComponent) {
						let value = this.pFamilyData.components.find(
							(comp) => comp.componentName == item.from
						);
						switch (item.change) {
							case 'visible':
								// this.pType = this.pFamilyData.data;
								if (value.condition == item.parameter) {
									this.show = true;
									this.required = this.pIsRequired;
								} else {
									this.show = false;
									this.value = '';
									this.state.isSelected = false;
									this.state.isWarn = false;
									this.required = false;
								}
								break;
							default:
								break;
						}
					}
				});
			}
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
	<div v-show="show">
		<slot name="default">
		</slot>
		<div class="form-input_container--wlh" :style="'display: '+directionGroup+';'">
		<label v-for="item in pItems" class="input_label_custom">
			<span>{{ item.text }}</span>
			<input @click="doThis(item.value)" type="radio" :name="pName" v-model="value" class="form-checkbox--sura" :required="required" :value="item.value">
			<span :class="classInput" class="checkmark--radio"></span>
		</label>
		</div>
	</div>`,
});

//falta revisar el componente (baja prioridad)
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
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['status'],
	data() {
		return {
			value: this.pValue,
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
				isRequired: this.pIsRequired,
				name: this.pName,
				value: this.state.isEmpty ? '' : this.value,
			};

			this.state.isWarn = this.pIsRequired ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis() {
			this.state.isEmpty = false;
			this.state.isWarn = false;
		},
	},
	watch: {
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
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
    <input :class="classInput" @click="doThis" type="radio" :name="pName" class="form-checkbox--sura" required="pIsRequired" :value="value">
    <span class="checkmark--radio"></span>
   </label>
  </div>`,
});

app.component('selectSura', {
	props: {
		pFamilyReceive: {
			type: Array,
			default: function () {
				return [];
			},
		},
		pFamilyData: {
			type: Object,
		},
		pFamilyListener: {
			type: Boolean,
		},
		pEmitFamilyData: {
			type: Boolean,
			default: false,
		},
		pInternalization: {
			type: Object,
			default: {
				descripOptional: 'opcional',
				auxRequired: 'requerido',
				placeholder: 'Seleccione una opción',
				optionOther: '¿Otro? (Especifique)',
			},
		},
		pConfigOther: {
			//pendiente, esta propeidad debe ser eliminada junto a participación
			type: Object,
			default: {
				has: false,
				condition: null,
			},
		},
		pIsMarginInSelection: {
			type: Boolean,
			default: false,
		},
		pPlaceholder: {
			type: String,
			default: '',
		},
		pIsOptionOther: {
			type: Boolean,
			default: false,
		},
		pName: {
			type: String,
			default: 'seleccionMultiple',
		},
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIcons: {
			type: Object,
			default: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
		},
		pIsSearch: {
			type: Boolean,
			default: false,
		},
		pItems: {
			type: Array,
			default() {
				return [
					{ value: 'item1', text: 'Item 1' },
					{ value: 'item2', text: 'Item 2' },
					{ value: 'item3', text: 'Item 3' },
				];
			},
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pZIndex: {
			type: Number,
			default: 3,
		},
		pValue: null,
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
		pType: {
			type: String,
			default: 'text',
		},
	},
	emits: ['status', 'changeFamilyData'],
	data() {
		return {
			show: false,
			search: '',
			options: {
				origin: this.pItems,
				filter: [],
				isOther: false,
				other: this.pInternalization.optionOther,
				selected: {
					value: '',
					text: '',
					tied: null,
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
		};
	},
	beforeMount() {
		this.options.filter = this.options.origin;
		this.options.selected.text =
			this.pPlaceholder || this.pInternalization.placeholder;

		if (this.pFamilyReceive.length > 0) {
			this.pFamilyReceive.forEach((item) => {
				if (item.change == 'visible') {
					this.show = false;
					this.required = false;
					return;
				} else {
					this.show = true;
					this.required = this.pIsRequired;
				}
			});
		} else {
			this.show = true;
			this.required = this.pIsRequired;
		}
		if (this.pValue) {
			this.options.selected.value = this.pValue;
			this.options.selected.text = this.pItems.find(
				(item) => item.value == this.pValue
			);
			this.options.selected.text = !this.options.selected.text
				? this.pValue
				: this.options.selected.text.text;

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
			this.options.selected.value = event.target.getAttribute('data-value');
			this.options.selected.text = event.target.innerText;
			this.options.selected.tied = event.target.getAttribute('data-tied') || null;
			this.state.isUnder = false;
			this.state.isSelected = true;

			if (this.pEmitFamilyData) this.sendMsgToFamily();

			this.pIsStatusAfter ? null : this.sendStatus(true);
		},
		openOptionOther() {
			this.options.isOther = true;
			this.state.isUnder = false;
		},
		closeOptionOther() {
			this.options.isOther = false;
		},
		selectOptionOther() {
			if (!this.options.other) return;

			this.options.selected.value = this.options.other;
			this.options.selected.text = this.options.other;
			this.options.selected.tied = this.pConfigOther.has
				? this.pConfigOther.condition
				: null;
			this.options.isOther = false;
			this.state.isSelected = true;
			this.options.other = this.pInternalization.optionOther;

			if (this.pEmitFamilyData) this.sendMsgToFamily();

			this.pIsStatusAfter ? null : this.sendStatus(true);
		},
		removePlaceholderOther() {
			if (this.options.other == this.pInternalization.optionOther) {
				this.options.other = '';
			}
		},
		loseFocus() {
			this.state.isUnder = false;
		},
		sendStatus(val) {
			let state = {
				type: this.pType,
				isEmpty: !this.state.isSelected,
				isError: this.state.isError,
				isRequired: this.pIsRequired,
				name: this.pName,
				value: this.options.selected.value,
			};

			this.state.isWarn = this.pIsRequired ? !this.state.isSelected : false;
			this.$emit('status', state);
		},
		sendMsgToFamily() {
			this.$emit('changeFamilyData', {
				componentName: this.pName,
				data: this.options.selected.value,
				condition: this.options.selected.tied,
			});
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
		isMargin() {
			return {
				marginBottom:
					this.state.isUnder && this.pIsMarginInSelection ? '165px' : '0px',
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
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue(newVal) {
			if (newVal) {
				this.options.selected.value = newVal;
				this.options.selected.text = this.pItems.find(
					(item) => item.value == newVal
				);
				if (!this.options.selected.text) {
					this.options.selected.text = newVal;
				}
				this.options.selected.text = !this.options.selected.text
					? newVal
					: this.options.selected.text.text;

				this.state.isUnder = false;
				this.state.isSelected = true;
			}
		},
		pFamilyListener() {
			if (this.pFamilyReceive.length > 0) {
				this.pFamilyReceive.forEach((item) => {
					// pFamilyData.components or lastComponent
					if (item.from == this.pFamilyData.lastComponent) {
						let value = this.pFamilyData.components.find(
							(comp) => comp.componentName == item.from
						);
						switch (item.change) {
							case 'type':
								// this.pType = this.pFamilyData.data;
								// this.changeType(value.data);
								// this.doThis(this.value);
								break;
							case 'visible':
								// this.pType = this.pFamilyData.data;
								if (value.condition == item.parameter) {
									// this.state.isSelected;
									// this.state.isEmpty = false;
									this.show = true;
									this.required = this.pIsRequired;
								} else {
									this.show = false;
									this.required = false;
								}
								break;
							default:
								break;
						}
					}
				});
			}
		},
	},
	template: `
 <div v-show="show" class="form-input_container" @mouseleave="loseFocus" :style="isMargin">
  <transition name="slide-fade">
   <div v-show="state.isUnder || state.isSelected" class="form-input_description">
    <span>
     {{ pPlaceholder || pInternalization.placeholder }}
     <span v-if="pIsRequired">*</span>
     <span v-else> ({{pInternalization.descripOptional}})</span>
    </span>
   </div>
  </transition> 
    <div class="form-input_control" :style="{'z-index': pZIndex}">
   <div @click="doThis" v-bind:class="classInput" class="form-select--sura">
     {{ options.selected.text }}
   </div>
   <div class="input-container-icon--xs">
    <transition name="slide-fade">
     <div class="icon-svg--arrow" v-bind:class="classIconArrowSelect">
      <img :src="this.pIcons.arrow" alt="icon arrow" @click="doThis" style="cursor: pointer;">
     </div>
    </transition>
   </div>
   <transition name="slide-fade-down">
    <div v-show="state.isUnder" class="input-container-items">
     <!-- input filter -->
     <div v-if="pIsSearch" class="input-container-filter">
      <input v-model="search" type="text" class="input-filter" placeholder="Buscar...">
     </div>
     <ul class="container-options">
      <li v-for="item in options.filter" :data-tied="item.condition" :data-value="item.value" class="select-option" @click="selectOption">
       {{ item.text }}
      </li>
   <li v-if="pIsOptionOther" @click="openOptionOther" :id="pName+'Other'" class="select-option option-other">
        {{ pInternalization.optionOther }}
       </li>
     </ul>
    </div>
   </transition>
   <input type="hidden" :name="pName" :value="options.selected.value">
    </div>
    <div class="form-input_auxiliary">
    <div class="row">
     <div class="col-10 position-relative" style="text-transform: capitalize;">
      <transition-group name="slide-fade">
       <span style="position:absolute;" :key="1" v-show="pIsRequired && !state.isError && !state.isUnder && !state.isSelected">
        {{ pInternalization.auxRequired }}*
       </span>
       <span style="position:absolute;" :key="2" v-show="!pIsRequired && !state.isError && !state.isUnder && !state.isSelected">
        {{ pInternalization.descripOptional }}
       </span>
       <span :key="4" class="input_auxiliary--error" v-show="state.isError">
        {{ state.errorMessage }}
       </span>
      </transition-group>
     </div>
    </div>
    </div>
   <div v-show="options.isOther" class="form-input_control--other">
   <div class="form-input_description mt-1">
    <span>
    {{ pInternalization.optionOther }}
    </span>
   </div>
   <div :class="{'input-warn': state.isWarn && !state.isError }" class="mb-2 group-input--sura">
    <input type="text" class="form-input--sura" v-model="options.other" @click="removePlaceholderOther">
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
		pInternalization: {
			type: Object,
			default: {
				descripOptional: 'opcional',
				auxRequired: 'requerido',
				placeholder: 'Seleccione una opción',
				optionOther: '¿Otro? (Especifique)',
			},
		},
		pPlaceholder: {
			type: String,
			default: '',
		},
		pName: {
			type: String,
			default: 'seleccionMultiple',
		},
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIcons: {
			type: Object,
			default: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
		},
		pIsSearch: {
			type: Boolean,
			default: false,
		},
		pItems: {
			type: Array,
			default() {
				return [
					{ value: '1', text: 'Item 1' },
					{ value: '2', text: 'Item 2' },
					{ value: '3', text: 'Item 3' },
				];
			},
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pZIndex: {
			type: Number,
			default: 3,
		},
		pValue: {
			type: String,
		},
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['status'],
	data() {
		return {
			search: '',
			options: {
				origin: this.pItems,
				selections: [],
				filter: [],
				isOther: false,
				other: this.pInternalization.optionOther,
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
		};
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
				if (this.options.selections.length === 0) {
					this.state.isSelected = false;
				}
			}
			this.pIsStatusAfter ? '' : this.sendStatus(true);
		},
		removeOption(event) {
			let value = event.target.getAttribute('value');
			let index = this.options.selections.findIndex(
				(item) => item.value === value
			);
			this.options.selections.splice(index, 1);
			document
				.getElementById(this.pName + value)
				.classList.remove('select-option--actived');
			if (this.options.selections.length === 0) {
				this.state.isSelected = false;
			}
			this.pIsStatusAfter ? '' : this.sendStatus(true);
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
			this.options.other = this.pInternalization.optionOther;
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
				isRequired: this.pIsRequired,
				name: this.pName,
				value: this.options.selected.value,
			};

			this.state.isWarn = this.pIsRequired ? !this.state.isSelected : false;

			this.$emit('status', state);
		},
		takeValuesParent() {
			let values = this.pValue.split(',');
			values.forEach((value) => {
				let option = {
					value: value,
					text: this.pItems.find((item) => item.value === value),
				};
				option.text = !option.text ? value : option.text.text;

				this.options.selections.push(option);
				document
					.getElementById(this.pName + value)
					.classList.add('select-option--actived');
			});
			this.state.isUnder = false;
			this.state.isSelected = true;
		},
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
		this.options.selected.text = this.pInternalization.placeholder;
	},
	mounted() {
		if (this.pValue) {
			this.takeValuesParent();
		}
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
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue() {
			this.takeValuesParent();
		},
	},
	template: `
  <div class="form-input_container" @mouseleave="loseFocus">
   <transition name="slide-fade">
    <div v-show="state.isUnder || state.isSelected" class="form-input_description">
     <span>
      {{ pPlaceholder || pInternalization.placeholder }}
      <span v-if="pIsRequired">*</span>
      <span v-else> ({{ pInternalization.descripOptional }})</span>
     </span>
    </div>
   </transition> 
   <div class="form-input_control" :style="{'z-index': pZIndex}">
    <div @click="doThis" v-bind:class="classInput" class="form-select--sura select-multiple--sura">
     <span v-show="options.selections.length == 0">{{ pPlaceholder || pInternalization.placeholder }}</span>
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
       <img :src="this.pIcons.arrow" alt="icon arrow" @click="doThis" style="cursor: pointer;">
      </div>
     </transition>
    </div>
    <transition name="slide-fade-down">
     <div v-show="state.isUnder" class="input-container-items">
      <!-- input filter -->
      <div v-if="pIsSearch" class="input-container-filter">
       <input v-model="search" type="text" class="input-filter" placeholder="Buscar...">
      </div>
      <ul class="container-options">
       <li v-for="item in options.filter" :value="item.value" :id="pName+item.value" class="select-option" @click="selectOption">
        {{ item.text }}
       </li>
       <li @click="openOptionOther" :id="pName+'Other'" class="select-option option-other">
        {{ pInternalization.optionOther }}
       </li>
      </ul>
     </div>
    </transition>
    <input type="hidden" :name="pName" :value="options.selected.value">
   </div>
   <div class="form-input_auxiliary">
    <div class="row">
     <div class="col-10 position-relative">

		 <transition-group name="slide-down">
      <span style="text-transform: capitalize;" class="position-absolute" :key="1" v-show="!state.isError && !state.isSelected">
       {{pIsRequired ? pInternalization.auxRequired+'*' : pInternalization.descripOptional}}
      </span>
      <span :class="{'input_auxiliary--error': state.isError}" :key="2" v-show="!state.isEmpty">
       {{ state.isError ? state.errorMessage : '' }}
      </span>
     </transition-group>
      
     </div>
    </div>
   </div>
   <div v-show="options.isOther" class="my-2 group-input--sura">
    <input class="form-input--sura" v-model="options.other" @click="openOptionOther">
    <span @click="closeOptionOther">
     <button type="button" class="cancel px-3">✖</button>
    </span>
    <span @click="selectOptionOther">
     <button type="button" class="confirm px-3">✔</button>
    </span>
   </div>
 </div>`,
});

//falta revisar el componente (baja prioridad)
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
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pItems: {
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
		pIsMobile: {
			type: Boolean,
			default: true,
		},
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['status'],
	data() {
		return {
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
				isRequired: this.pIsRequired,
				name: this.pName,
				value: this.value,
			};

			this.state.isWarn = this.pIsRequired ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			// rangeMin;
			// rangeMax;
			let value = el.target.value.toString();
			this.pItems.filter((item) => {
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
			// this.pIsStatusAfter ? this.sendStatus() : null;
		},
		isActived(val) {
			return this.value == val;
		},
	},
	created() {
		let pointBreak = (100 * 1) / this.pItems.length;
		let point = 0;
		let arrayLength = this.pItems.length;
		for (let i = 0; i < arrayLength; i++) {
			this.pItems[i].rangeMin = point;
			point += pointBreak;

			if (i == 0) {
				this.pItems[i].rangeMax = point;
				point += 1;
			} else if (i == arrayLength - 1) {
				this.pItems[i].rangeMax = point - 1;
			} else {
				point -= 1;
				this.pItems[i].rangeMax = point;
				point += 1;
			}
		}
	},
	watch: {
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
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
				width: (100 * 1) / this.pItems.length + '%',
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
    <div v-for="item in pItems" :style="objectStyle" class="text-center">
     {{ item.text }}
    </div>
   </div>
  </div>

 `,
});

app.component('scaleSura', {
	props: {
		pClassBtn: {
			type: String,
			default: 'btn-outline-primary',
		},
		pType: {
			type: String,
			default: 'text',
		},
		pName: {
			type: String,
			default: '',
		},
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pItems: {
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
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
		pValue: null,
	},
	emits: ['status'],
	data() {
		return {
			selected: {
				value: '',
				text: '',
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
				isRequired: this.pIsRequired,
				name: this.pName,
				value: this.selected.value,
			};

			this.state.isWarn = this.pIsRequired ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			let item = this.pItems.filter((item) => item.value == el.target.value);
			this.selected.value = item[0].value;
			this.selected.text = item[0].text;

			// this.value = el.target.attributes.value.value;
			this.state.isEmpty = false;
			this.state.isWarn = false;
			this.pIsStatusAfter ? null : this.sendStatus();
		},
		isActived(val) {
			return this.selected.value == val;
		},
	},
	beforeMount() {
		if (this.pValue) {
			this.selected.value = this.pValue;
			this.selected.text = this.pItems.find((item) => item.value == this.pValue);
			this.selected.text = !this.selected.text
				? this.pValue
				: this.selected.text.text;

			this.state.isUnder = false;
			this.state.isEmpty = false;
		}
	},
	watch: {
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue(newVal) {
			if (newVal) {
				this.selected.value = newVal;
				this.selected.text = this.pItems.find((item) => item.value == newVal);
				this.selected.text = !this.selected.text ? newVal : this.selected.text.text;

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
				width: (100 * 1) / this.pItems.length + '%',
			};
		},
		displayHelper() {
			return {
				'd-flex': this.state.isEmpty,
			};
		},
	},
	template: `
  <div class="form-input_container" style="min-height: 0px;">
   <label for="customRange2" class="form-label text-secondary">{{selected.text || 'Seleccione un número de la escala'}}</label>
   <div :class="objectClass" class="d-flex scale-results">
    <button type="button" @click="doThis" v-for="(item, index) in pItems" :actived="isActived(item.value)" :value="item.value" :style="objectStyle" :class="pClassBtn" class="text-center btn rounded-1">
     {{ index + 1 }}
    </button>
   </div>
   <div v-show="state.isEmpty" :class="displayHelper" class="scale-helpers">
    <div v-for="item in pItems" :style="objectStyle" class="text-secondary pb-2 pb-sm-0 d-flex align-items-center justify-content-end justify-content-sm-center text-center">
     {{ item.text }}
    </div>
   </div>
  </div>

 `,
});

app.component('btnsGroupSura', {
	props: {
		pIsRadio: {
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
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
		pItems: {
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
		pValue: {
			type: String,
			default: '',
		},
	},
	emits: ['status'],
	data() {
		return {
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
				isRequired: this.pIsRequired,
				name: this.pName,
			};
			if (this.pIsRadio) {
				state.value = this.value;
			} else {
				state.value = this.values.toString();
			}

			this.state.isWarn = this.pIsRequired ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			// data-value
			let id = el.target.attributes['data-id'].value;
			this.value = this.pItems[id].value;

			if (this.pIsRadio) {
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

			this.pIsStatusAfter ? null : this.sendStatus();
		},
		isActived(val) {
			if (this.pIsRadio) {
				return this.value == val;
			} else {
				return this.values.indexOf(val) != -1;
			}
		},
	},
	created() {
		for (let i = 0; i < this.pItems.length; i++) {
			this.pItems[i].id = i;
			this.fieldNone = this.pItems[i].none ? this.pItems[i].value : '';
		}
	},
	watch: {
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
		},
		pValue(newVal) {
			if (newVal) {
				if (this.pIsRadio) {
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
  <div :class="[objectClass, 'justify-content-'+pAlign]" class="form-input_container--wlh row justify-content-center">
  <button v-for="item in pItems" @click="doThis" type="button" :data-id="item.id" class="btn btn-sura--basic my-4 col-8 col-sm-6 col-md-4 col-lg-3" :actived="isActived(item.value)">
   {{ item.text }}
   <span :data-id="item.id"></span>
  </button>
  </div>`,
});

// no terminado //falta revisar el componente (baja prioridad)
app.component('btnsGroupSura-list', {
	props: {
		pIsRadio: {
			type: Boolean,
			default: true,
		},
		pName: {
			type: String,
			default: '',
		},
		pIsRequired: {
			type: Boolean,
			default: false,
		},
		pIsVerifying: {
			type: Boolean,
			default: false,
		},
		pItems: {
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
		pIsMobile: {
			type: Boolean,
			default: true,
		},
		pIsStatusAfter: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['status'],
	data() {
		return {
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
				isRequired: this.pIsRequired,
				name: this.pName,
				value: this.value,
			};

			this.state.isWarn = this.pIsRequired ? this.state.isEmpty : false;
			this.$emit('status', state);
		},
		doThis(el) {
			let value = el.target.value.toString();
			if (this.pIsRadio) {
				this.pItems.filter((item) => {
					if (value >= item.rangeMin && value <= item.rangeMax) {
						this.selected.value = item.value;
						this.selected.text = item.text;
						this.selected.rangeMin = item.rangeMin;
						this.selected.rangeMax = item.rangeMax;
					}
				});
			} else {
				this.pItems.filter((item) => {
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
			this.pItems[i].id = i;
		}
	},
	watch: {
		pIsVerifying() {
			if (this.pIsVerifying) this.sendStatus(this.pIsVerifying);
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
				width: (100 * 1) / this.pItems.length + '%',
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
    <div v-for="item in pItems" :style="objectStyle" class="text-center">
     {{ item.text }}
    </div>
   </div>
  </div>

 `,
});

app.component('formSura', {
	props: {
		pInternalization: {
			type: Object,
			default: {
				VERIFYING: 'Verificando...',
				ERROR: 'error encontrado',
				ERRORS: 'errores encontrados',
				SUBMITING: 'Enviando...',
				TEXTBTN: '¡ESTOY INTERESADO!',
			},
		},
		pGearId: {
			type: String,
			default: '',
		},
		pSmartcaptureFormId: {
			type: Number,
			default: 0,
		},
		pSourceKey: {
			type: String,
			default: '',
		},
		pSource: {
			type: String,
			default: 'dataExtension',
		},
		pTriggeredSend: {
			type: String,
			default: '',
		},
		pOnSubmitType: {
			type: String,
			default: '',
		},
		pOnSubmitGotoUrl: {
			type: String,
			default: '',
		},
		pCallback: {
			type: Function,
			default: () => {
				console.warn('callback not defined');
			},
		},
		pIsDataShared: {
			type: Boolean,
			default: false,
		},
		pDni: {
			type: Object,
			default: { id: 'id', typeId: 'typeId', necessary: true },
		},
		pLoader: {
			stype: String,
		},
		pIsGetIp: {
			type: Boolean,
			default: false,
		},
		pIsPost: {
			type: Boolean,
			default: true,
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
				timeOut: null,
				message: '',
			},
			familyData: {
				listener: false,
				lastComponent: '',
				components: [
					{
						componentName: 'nameInput',
						data: { id: 'id', typeId: 'typeId', necessary: true },
					},
				],
			},
			basicIcons: {
				error: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-error-25012022.svg`,
				arrow: `https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/icon-arrow-26012022.svg`,
			},
			persistence: {
				isAxios: false,
				responseApi: null,
			},
		};
	},
	mounted() {
		if (!this.pGearId) throw new Error('gearID is required');
		if (!this.pSmartcaptureFormId)
			console.warn('smartCaptureFormID is required for journey');
		if (!this.pSourceKey) throw new Error('sourceKey is required');
		if (!window.contentDetail)
			console.warn('contentDetail is required for the submit and tranking');
		if (!window.libUtils)
			console.warn('libUtils is required for get last upgrades.');
	},
	methods: {
		changeFamilyData(data) {
			let componentIndex = this.familyData.components.findIndex((item) => {
				return item.componentName === data.componentName;
			});

			if (componentIndex > -1) {
				this.familyData.components.splice(componentIndex, 1, data);
			} else {
				this.familyData.components.push(data);
			}
			this.familyData.listener = !this.familyData.listener;
			this.familyData.lastComponent = data.componentName;
		},
		submit() {
			if (!this.state.isError) this.startVerify();
		},
		startVerify() {
			this.state.inputs = [];
			this.state.verifying = true;
			this.state.message = this.pInternalization.VERIFYING;
			this.state.porcentProgress = 15;
		},
		getStatus(status) {
			clearTimeout(this.state.timeOut);
			this.state.inputs.push(status);
			// aqui se puede mejorar, creo que podriamos contar los elementos del form en el montaje y despues cuando se llame esta funcion, hasta que no haya llegado el ultimo elmento, no prosigue
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
					this.state.message = `${problems.length} ${this.pInternalization.ERROR}`;
				} else {
					this.state.message = `${problems.length} ${this.pInternalization.ERRORS}`;
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
				this.state.message = this.pInternalization.SUBMITING;
				this.state.timeOut = setTimeout(() => {
					if (!!this.pLoader)
						document.getElementById(this.pLoader).classList.add('show');

					if (this.pDni.necessary) {
						this.state.inputs.push({
							name: 'DNI',
							value:
								this.findInputs(this.pDni.typeId, 'name').value +
								this.findInputs(this.pDni.id, 'name').value,
						});
					}

					if (this.pIsGetIp) {
						this.getIpClient();
					} else {
						if (this.pIsPost) {
							this.post();
						} else {
							this.success();
						}
					}

					clearTimeout(this.state.timeOut);
				}, 1000);
			}
		},
		async getIpClient() {
			if (this.persistence.isAxios) {
				try {
					const response = await axios.get('https://api.ipify.org?format=json');
					if (response.data.ip) {
						this.state.inputs.push({
							name: 'IP',
							value: response.data.ip,
						});
						if (this.pIsPost) {
							this.post();
						} else {
							this.success();
						}
					}
				} catch (error) {
					this.error();
				}
			} else {
				this.persistence.isAxios = true;
				await window.libUtils.getScript(
					'axios',
					'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
					{ async: false }
				);
				this.getIpClient();
			}
		},
		findInputs(value, key) {
			return this.state.inputs.find((item) => item[key] == value);
		},
		addDataInLink() {
			let data = this.state.inputs.map((item) => {
				return `${item.name}=${encodeURIComponent(item.value)}`;
			});
			this.pOnSubmitGotoUrl = `${this.pOnSubmitGotoUrl}?${data.join('&')}`;
		},
		async post() {
			await window.libUtils.getScript(
				'axios',
				'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
				{ async: false }
			);

			let url = `${window.libUtils.getBaseUrl()}/smartcapture/post`;
			let attributes = [];
			var emailAddresses = [];
			let contentDetail = window.contentDetail || {};

			test = this.state.inputs;

			this.state.inputs.forEach((item) => {
				attributes.push(`"${item.name}":"${encodeURIComponent(item.value)}"`);
				if (item.type === 'email') {
					emailAddresses.push(`"${item.name}":"${item.value}"`);
				}
			});

			// this.pGearId;

			const payload = new URLSearchParams();
			payload.append('emailAddress', `{${emailAddresses.join(',')}}`);
			payload.append('formID', this.pSmartcaptureFormId);
			payload.append('targetID', this.pSourceKey);
			payload.append('targetType', this.pSource);
			payload.append('attributes', `{${attributes.join(',')}}`);
			payload.append('withTriggeredSend', this.pTriggeredSend);
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
				} else {
					this.error(response);
				}
			});
		},
		success() {
			this.state.porcentProgress = 100;
			this.state.message = '✓';

			switch (this.pOnSubmitType) {
				case 'redirect':
					if (this.pIsDataShared) addDataInLink();
					window.location.href = this.pOnSubmitGotoUrl;
					break;
				case 'redirect-blank':
					if (this.pIsDataShared) addDataInLink();
					window.open(this.pOnSubmitGotoUrl, '_blank');
					break;
				case 'executeAction':
					this.pCallback(this.state.inputs);
					break;
				default:
					if (!!this.pLoader)
						document.getElementById(this.pLoader).classList.remove('show');
					this.state.submitted = true;
					break;
			}
		},
		error(x) {
			window.alert(
				'Hubo un error al tratar de enviar los datos, por favor verifique todos los campos e intente nuevamente. Si el error persiste, por favor contacte al administrador del sitio. +57 312 5802861'
			);
			console.log(x);
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
   <form v-if="!state.submitted"  :id="'smartcapture-block-' + pGearId" class="smartcapture-content-wrapper container-fluid" novalidate="novalidate">
    <div class="row">

     <slot name="content" :verifying="state.verifying" :getStatus="getStatus" :changeFamilyData="changeFamilyData" :familyData="familyData" :familyListener="familyData.listener">
     
     </slot>
     
     <div class="col-12">
      <div class="form-input_button">
       <button :submited="state.submitted" type="button" @click="submit" :disabled="state.submitted">
        <progress :class="classProgress" id="progresa-form" max="100" :value="state.porcentProgress" class="progressForm"></progress>
        <span v-show="!state.verifying">{{pInternalization.TEXTBTN}}</span>
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
