const { createApp } = Vue;

let test;

const app = createApp({});

app.component('card1-item', {
	props: {
		actived: {
			type: Boolean,
			default: false,
		},
		maxHeight: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			isActived: true,
			isMounted: false,
			element: null,
		};
	},
	methods: {
		toggleActive() {
			// this.height = this.element.getBoundingClientRect().height;
			this.isActived = !this.isActived;
			// console.log(this.height);
		},
		captureSize(e) {
			this.element = e.el;
			if (this.maxHeight > 0) {
				e.el.style.height = this.maxHeight + 'px';
				e.el.style.overflowY = 'scroll';
			} else {
				e.el.style.height = e.el.getBoundingClientRect().height + 'px';
				e.el.style.overflowY = 'hidden';
			}
			this.isActived = this.actived ? true : false;
			e.el.style.removeProperty('position');
			e.el.style.removeProperty('opacity');
			// this.height = this.element.getBoundingClientRect().height;
			this.isMounted = true;
		},
	},
	computed: {
		styleObject() {
			return {
				position: this.isMounted ? 'relative' : 'absolute',
				opacity: this.isMounted ? 1 : 0,
			};
		},
	},
	template: `
		<div class="col-12 col-sm-6 col-md-6 col-lg-4 px-5">
			<div class="panelInfoSura">

				<div class="panalSura-containerIcon">
					<img class="panelSura-icon"
						src="https://comunicaciones.segurossura.com.co/MercadeoComunicacionesExternas/RECURSOS/LANDINGS/pes_2.svg"
						alt="icono de mano con celular">
				</div>

				<div class="panelSura-inner">
					<div class="row">


						<div class="col -12 panelSura-tittle">Cuando requieras una asistencia por diferentes eventos</div>

						<div class="col-12">

							<transition name="collapse">
							<div v-show="isActived"
							class="panelCollapsed"
							style="position: absolute;opacity: 0;"
							@vue:mounted="captureSize">
								<div class="card card-body panelSura-dialogue">
									<ul>
										<li>
											Servicio de plomería
										</li>
										<li>
											Servicio de cerrajería
										</li>
										<li>
											Servicio de electricidad
										</li>
										<li>
											Servicio de reemplazo de vidrios
										</li>
										<li>
											Asistencia jurídica telefónica
										</li>
										<li>
											Servicio de seguridad
										</li>
										<li>
											Gastos de traslado por interrupción de viaje
										</li>
									</ul>
								</div>
							</div>
							</transition>

						</div>

					</div>
				</div>

				<a class="panelSura-btnCollapse" @click="toggleActive"
					role="button">
					<svg class="btnCollapse-svg" :rotate="isActived ? 'up': 'down'" viewBox="0 0 448 512">
						<path fill="currentColor"
							d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
						</path>
					</svg>
				</a>
			</div>
		</div>
    `,
});

app.mount('#app');

// console.log(Vue);
