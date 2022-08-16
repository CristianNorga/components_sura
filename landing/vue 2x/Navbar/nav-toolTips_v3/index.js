
Vue.component('get-combo', {
	props: ['value'],
	template: `<p class="tooltip-item-content"><b>{{value}}</b></p>`,
});

Vue.component('get-description', {
	props: ['value'],
	template: `<p class="tooltip-item-DescriCombo">{{value}}</p>`,
});

Vue.component('get-highlight-combo', {
	props: ['value'],
	template: `
    <div class="tooltip-item-infoHighlight">
			<p>
				{{value}}
			</p>
		</div>`,
});

Vue.component('get-cost', {
	props: ['value'],
	template: `
  <div class="tooltip-item-cost">
		<div>
			<P>
				{{'$'+value}}
			</P>
		</div>
	</div>`,
});

Vue.component('get-button', {
	props: ['value','link'],
	data() {
		return {
			x: this.value ? this.value : 'Agéndalo aquí',
			y: this.link ? this.link : '#',
		};
	},
	template: `
    <div class="tooltip-item-button">
			<a :href="y" target="_blank" style="text-decoration:none;">
			<button>
				{{x}}
			</button>
			</a>
		</div>`,
	});

Vue.component('getLegal', {
	template: `
		<p class="tooltip-item-legal">
			*Terminos y condiciones...
		</p>`,
});

Vue.component('tooltip-item-city', {
	props: [
		'xs',
		'sm',
		'md',
		'lg',
		'xl',
		'xxl',
		'isDisabled',
		'isFilling',
		'breakpointFilling',
	],
	data() {
		return {
			col: this.xs ? 'col-' + this.xs : 'col-12',
			colSm: this.sm ? 'col-sm' + this.sm : 'col-sm-6',
			colMd: this.md ? 'col-md-' + this.md : 'col-md-6',
			colLg: this.lg ? 'col-lg-' + this.lg : 'col-lg-4',
			colXl: this.xl ? 'col-xl-' + this.xl : 'col-xl-2',
			colXxl: this.xxl ? 'col-xxl-' + this.xxl : 'col-xxl-2',
			dBlock: this.breakpointFilling
				? 'd-' + this.breakpointFilling + '-block'
				: 'd-xl-block',
			styleDisabled: {
				background: '#e2e2e2',
			},
			styleFilling: {
				dispaly: 'none',
			},
		};
	},
	computed: {
		getStyle() {
			return {
				styleDisabled: this.isDisabled,
				styleFilling: this.isFilling,
			};
		},
	},
	template: `
    <div :class="[col, colSm, colMd, colLg, colXl, colXxl, { dBlock: isFilling }]" class="tooltip-item" :style="getStyle">
			<slot name="content"></slot>
		</div>`,
});

Vue.component('container-tooltips-city', {
	props: ['idCt', 'elActived', 'defuseTooltip'],
	data() {
		return {
			elCurrent: this.elActived,
		};
	},
	watch: {
		elActived: function (newVal, oldVal) {
			if (newVal) {
				this.elCurrent = newVal;
			}
		},
	},
	template: `
	<div @mouseleave="defuseTooltip(idCt)" :id="idCt+'-tooltip'" :idcity="idCt" :class="{'active-tooltip': idCt == elActived}" class="row rowCity el-animated-tooltip justify-content-end">
		<slot name="items">
		</slot>
		<div @click="defuseTooltip(idCt)" class="tooltip-item-close" :idcity="idCt">
			<svg fill="#0033a0 " :idcity="idCt" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.26 527.23"><path :idcity="idCt" d="M46.06,10.82A33.6,33.6,0,0,0,22.62,68.48L228.48,274.34,22.62,480.18a33.61,33.61,0,1,0,47.53,47.53L276,321.85,481.85,527.71a33.6,33.6,0,1,0,47.49-47.53L323.5,274.34,529.34,68.48A33.58,33.58,0,1,0,481.85,21L276,226.83,70.15,21A33.54,33.54,0,0,0,46.06,10.82Z" transform="translate(-12.43 -10.8)"/></svg>
		</div>
	</div>`,
});

Vue.component('component-nav', {
	props: ['labelCities', 'activeTooltip', 'elActived', 'mes'],
	data() {
		return {
			elCurrent: this.elActived,
		};
	},
	watch: {
		elActived: function (newVal, oldVal) {
			if (newVal) {
				this.elCurrent = newVal;
			}
		},
	},

	template: `
		<div style="background: #0033a0;color: #ffffff;font-family: 'Barlow', sans-serif;font-size: 16px;">
			<div class="container-fluid" style="position:relative;">
				<div class="row">
					<div class="col-lg-5" style="text-align: center;align-self: center;">
						<p class="tooltip-tittle">Promociones especiales de {{mes}}</p>
					</div>
	
					<div class="col-lg-7" style="position: relative;">
						<div class="row">
	
							<div v-for="city in labelCities" class="col" style="text-align: -webkit-center;">
								<div @click="activeTooltip" :id="city.id" class="tooltip-city">
									{{ city.name }}
									<div :id="city.id + '-arrow'" class="tooltip-arrow el-animated-tooltip"></div>
									<div style="position: absolute;max-width: 80vw;background: #ffffff;top: 81%;"></div>
								</div>
							</div>
	
						</div>
	
	
					</div>
	
				</div>
	
			</div>
		</div>`,
});

new Vue({
	el: '#nav-tooltips-v3',
	data: {
		QuantityCities: 4,
		labelCities: [
			{ id: 'bogota', name: 'Bogotá' },
			{ id: 'cali', name: 'Cali' },
			{ id: 'medellin', name: 'Medellín' },
			{ id: 'pereira', name: 'Pereira' },
		],
		sizeTooltips: {
			mainMb: 285,
			mainDt: 300
		},
		containerTooltips: null,
		elActived: null,
		tooltipCities: [],
	},
	methods: {
		activeTooltip: function (x) {

			let id = x.target.id;
			let arrow = id + '-arrow';
			let tooltip = id + '-tooltip';

			documentWidth = document.body.clientWidth;
			if (documentWidth >426) {
				let containerCity = document.getElementById(tooltip);
				let coords = x.target.getBoundingClientRect();
				let calCoords = coords.x + coords.width / 2;
				let sizeChilds =
					(documentWidth >= 768
						? this.sizeTooltips.mainDt
						: this.sizeTooltips.mainMb) * (containerCity.childElementCount - 1);

				let cal;
				cal = documentWidth - calCoords - sizeChilds / 2;

				if (cal < 0 || (cal+sizeChilds) > documentWidth) {
					this.containerTooltips.style.right = '0px';
				} else {
					this.containerTooltips.style.right = cal + 'px';
				}
			} else {
				this.containerTooltips.style.right = '6px';
			}

			let rowCityclass = document.getElementsByClassName('el-animated-tooltip');

			for (let i = 0; i < rowCityclass.length; i++) {
				// rowCityclass[i].classList.remove('active-tooltip');
				rowCityclass[i].classList.remove('active-arrow');
			}

			this.elActived = id;
			document.getElementById(arrow).classList.add('active-arrow');
		},
		defuseTooltip: function (x) {
			this.elActived = null;
			let id = x;
			let arrow = id + '-arrow';
			// let city = id + '-tooltip';
			document.getElementById(arrow).classList.remove('active-arrow');
			// document.getElementById(city).classList.remove('active-tooltip');
		},
	},
	mounted: function () {
		this.containerTooltips = document.getElementById('tooltip-container');
	},
});