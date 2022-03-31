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
			console.log('do this');
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
	props: ['pName', 'pRequired', 'verifying', 'items', 'pDx'],
	data: function () {
		return {
			name: this.pName || '',
			required: this.pRequired || false,
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
		zIndex: {
			type: String,
			default: '3',
		},
		selectedOption: {
			type: String,
			// default: '',
		},
	},
	data: function () {
		return {
			placeholder: this.pPlaceholder,
			name: this.pName,
			required: this.pRequired,
			search: '',
			fieldSearch: this.pSearch,
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
		selectedOption: function () {
			if (this.selectedOption) {
				this.options.selected.value = this.selectedOption;
				this.options.selected.text = this.items.find(
					(item) => item.value === this.selectedOption
				).text;
				this.state.isUnder = false;
				this.state.isSelected = true;
			}
		}
	},
	template: `
	<div class="form-input_container" @mouseleave="loseFocus">
		<transition name="slide-fade">
			<div v-show="state.isUnder || state.isSelected" class="form-input_description">
				<span>
					{{ placeholder }}
					<span v-if="required">*</span>
					<span v-else> (opcional)</span>
				</span>
			</div>
		</transition> 
    <div :class="'zl-'+zIndex" class="form-input_control">
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

Vue.component('input-sura_select-mple', {
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
		zIndex: {
			type: String,
			default: '3',
		},
	},
	data: function () {
		return {
			placeholder: this.pPlaceholder,
			name: this.pName,
			required: this.pRequired,
			search: '',
			fieldSearch: this.pSearch,
			options: {
				origin: this.items,
				selections: [],
				filter: [],
				isOther: false,
				otherFocus: false,
				other: 'Otro',
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
			this.options.other = 'Otro';
			this.options.isOther = false;
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
		<div class="form-input_container" @mouseleave="loseFocus">
			<transition name="slide-fade">
				<div v-show="state.isUnder || state.isSelected" class="form-input_description">
					<span>
						{{ placeholder }}
						<span v-if="required">*</span>
						<span v-else> (opcional)</span>
					</span>
				</div>
			</transition> 
			<div :class="'zl-'+zIndex" class="form-input_control">
				<div @click="doThis" v-bind:class="classInput" class="form-select--sura select-multiple--sura">
					<span class="col-12" v-show="options.selections.length == 0">{{ placeholder }}</span>
					<span v-show="options.selections.length >= 0" class="select-multiple-container">
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

