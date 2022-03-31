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

class InputSura_written extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.pType || 'text',
			value: '',
			placeholder: this.pPlaceholder || '',
			name: this.pName || '',
			required: this.pRequired || false,
			limit: {
				isLimited: false,
				length: 0,
			},
			status: {
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
		this.required = this.props.required || false;
		this.name = this.props.name || '';
		this.placeholder = this.props.placeholder || '';
		this.type = this.props.type || 'text';
		this.condition = this.props.condition || {};
		this.limit = this.props.limit || {};
		this.doThis = this.props.doThis || function () {};
		this.icons = this.props.icons || {};
		this.verifying = this.props.verifying || false;
		this.state.isEmpty = this.props.value == '' ? true : false;
		this.state.value = this.props.value || '';
	}
	componentWillUnmount() {
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
	}
	doThis(val) {
		this.validateLength(val, this.validateType);
	}
	validateLength(val, callback) {
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
	}
	validateType(value) {
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
	}
	sendStatus(val){
    let state = {
      type: 'input',
      isEmpty: this.state.isEmpty,
      isError: this.state.isError,
      isRequired: this.required,
      name: this.name,
      value: this.value,
    };
    this.$emit('status', state);
  };
	render() {
		this.doThis(this.value);
		if(this.verifying) this.sendStatus(this.verifying);
		return (
      <div className="form-input_container">
        <transition name="slide-fade">
					{!this.state.isEmpty ? <div class="form-input_description">
              <span>
                {{ placeholder }}
                <span v-if="required">*</span>
                <span v-else> (opcional)</span>
              </span>
          </div> : ''}
          <div v-show="!state.isEmpty" class="form-input_description">
              <span>
                {{ placeholder }}
                <span v-if="required">*</span>
                <span v-else> (opcional)</span>
              </span>
          </div>
        </transition>
        <div class="form-input_control">
          <input v-model="value" v-bind:class="classInput" type="text" name={name} class="form-input--sura" required={required} placeholder={placeholder}>
          <div class="input-container-icon--md">
            <transition name="slide-fade">
              <div class="icon-svg--error" v-show="state.isError">
                <img src={this.icons.error} alt="icon of error">
              </div>
            </transition>
          </div>
        </div>
        <div class="form-input_auxiliary">
          <div class="row">
            <div class="col-10">
              <transition-group name="slide-fade">
                <span style="position:absolute;" key="1" v-show="required && !state.isError && state.isEmpty">
                  Requerido*
                </span>
                <span style="position:absolute;" key="2" v-show="!required && !state.isError && state.isEmpty">
                  Opcional
                </span>
                <span style="position:absolute;" key="3" v-show="!state.isEmpty && !state.isError">
                  { condition.conditionMesaage }
                </span>
                <span key="4" class="input_auxiliary--error" v-show="state.isError">
                  { state.errorMessage }
                </span>
              </transition-group>
              
            </div>
            <div v-if="this.limit.isLimited" class="col-2 text-end">
              { this.state.length }/{ this.limit.length }
            </div>
          </div>
        </div>
      </div>
    );
	}
}