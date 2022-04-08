let test;

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
	<div @mouseleave="defuseTooltip(idCt)" :id="idCt+'-tooltip'" :idcity="idCt" :class="{'active-tooltip': idCt == elActived}" class="row rowCity el-animated-tooltip justify-content-md-end">
		<slot name="items">
		</slot>
		<div @click="defuseTooltip(idCt)" class="tooltip-item-close" :idcity="idCt">
			<svg fill="#0033a0 " :idcity="idCt" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.26 527.23"><path :idcity="idCt" d="M46.06,10.82A33.6,33.6,0,0,0,22.62,68.48L228.48,274.34,22.62,480.18a33.61,33.61,0,1,0,47.53,47.53L276,321.85,481.85,527.71a33.6,33.6,0,1,0,47.49-47.53L323.5,274.34,529.34,68.48A33.58,33.58,0,1,0,481.85,21L276,226.83,70.15,21A33.54,33.54,0,0,0,46.06,10.82Z" transform="translate(-12.43 -10.8)"/></svg>
		</div>
	</div>`,
});

Vue.component('component-nav', {
	props: ['labelCities', 'activeTooltip', 'elActived'],
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
						<p class="tooltip-tittle">Promociones especiales de marzo</p>
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
	// el: '#nav-tooltips',
	data: {
		QuantityCities: 4,
		labelCities: [
			{ id: 'bogota', name: 'Bogotá' },
			{ id: 'cali', name: 'Cali' },
			{ id: 'medellin', name: 'Medellín' },
			{ id: 'pereira', name: 'Pereira' },
		],
		elActived: null,
		tooltipCities: [],
	},
	methods: {
		activeTooltip: function (x) {
			// console.log('activeTooltip', x.target.id);
			// console.log((x.target.clientWidth /2));
			let coords = x.target.getBoundingClientRect();
			let cal = (1400 - coords.x) - (640 / 2);
			console.log(cal);
			test = x;
			this.elActived = x.target.id;
			// let rowCityclass = document.getElementsByClassName('el-animated-tooltip');

			// for (let i = 0; i < rowCityclass.length; i++) {
			// 	rowCityclass[i].classList.remove('active-tooltip');
			// 	rowCityclass[i].classList.remove('active-arrow');
			// }

			// let id = x.target.id;
			// let arrow = id + '-arrow';
			// let city = id + '-tooltip';

			// document.getElementById(arrow).classList.add('active-arrow');
			// document.getElementById(city).classList.add('active-tooltip');
		},
		// defuseTooltip: function (x) {
		// 	console.log(x);
		// 	let id = x.target.attributes.idcity.value;
		// 	let arrow = id + '-arrow';
		// 	let city = id + '-tooltip';
		// 	document.getElementById(arrow).classList.remove('active-arrow');
		// 	document.getElementById(city).classList.remove('active-tooltip');
		// },
	},
	beforeMount: function () {
		// this.QuantityCities = cities.length;
		// let divCities = document.getElementById('cities');
		// cities.forEach((element) => {
		// 	this.labelCities.push({ name: element.name, id: element.id });
		// 	let el = document.createElement('div');
		// 	el.id = element.id + '-tooltip';
		// 	el.className += 'row rowCity el-animated-tooltip justify-content-md-end';
		// el.className += ' '; // no descomentar
		// el.idcity = element.id; // no descomentar
		// el.setAttribute('idcity', element.id);
		// el.onmouseleave = this.defuseTooltip;
		// let allTooltips = '';
		// element.items.forEach((item) => {
		// 	let content;
		// 	if (!item.isFilling) {
		// 		content = this.getCodeResumeCombo(item.resumeCombo);
		// 		content += this.getCodeDescriCombo(item.descriCombo);
		// 		if (item.cost) content += this.getCodeCost(item.cost);
		// 		if (item.infoHighlight) {
		// 			content += this.getCodeHighlightCombo(item.infoHighlight);
		// 		}
		// 		content += this.getCodeButton(item.button, item.urlBtn);
		// 		if (item.legal) {
		// 			content += this.getCodeLegal();
		// 		}
		// 		if (item.disabled) {
		// 			content += this.getCodeHighlightCombo('Actualmente no disponible');
		// 		}
		// 	}
		// 	item.xs = item.xs || '12';
		// 	item.sm = item.sm || '6';
		// 	item.md = item.md || '6';
		// 	item.lg = item.lg || '4';
		// 	item.xl = item.xl || '2';
		// 	item.xxl = item.xxl || '2';
		// 	item.breakpointFilling = item.breakpointFilling || 'md';
		// 	let itemTooltip = `<div class="tooltip-item col-${item.xs} col-sm-${
		// 		item.sm
		// 	} col-md-${item.md} col-lg-${item.lg} col-xl-${item.xl} col-xxl-${
		// 		item.xxl
		// 	} ${
		// 		item.isFilling ? 'd-' + item.breakpointFilling + '-block' : ''
		// 	}" style="${item.disabled ? 'background: #e2e2e2;' : ''} ${
		// 		item.isFilling ? 'display: none;' : ''
		// 	}">${content || ''}</div>`;
		// 	allTooltips += itemTooltip;
		// });
		// let close = document.createElement('div');
		// let svg = document.createElement('svg'); // no descomentar
		// close.className += 'tooltip-item-close';
		// close.setAttribute('idcity', element.id);
		// close.onclick = this.defuseTooltip;
		// close.innerHTML = `<svg fill="#0033a0 " idcity="${element.id}" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.26 527.23"><path idcity="${element.id}" d="M46.06,10.82A33.6,33.6,0,0,0,22.62,68.48L228.48,274.34,22.62,480.18a33.61,33.61,0,1,0,47.53,47.53L276,321.85,481.85,527.71a33.6,33.6,0,1,0,47.49-47.53L323.5,274.34,529.34,68.48A33.58,33.58,0,1,0,481.85,21L276,226.83,70.15,21A33.54,33.54,0,0,0,46.06,10.82Z" transform="translate(-12.43 -10.8)"/></svg>`;
		// el.innerHTML = allTooltips;
		// el.appendChild(close);
		// this.tooltipCities.push(el);
		// divCities.appendChild(el); // no descomentar
		// });
		// for (const key in object) { // no descomentar
		//   if (Object.hasOwnProperty.call(object, key)) {
		//     const element = object[key];
		//   }
		// }
	},
	mounted: function () {
		// let divCities = document.getElementById('cities');
		// this.tooltipCities.forEach((element) => {
		// 	divCities.appendChild(element);
		// });
	},
});

new Vue({
	el: '#nav-tooltips',
	data: {
		QuantityCities: 4,
		labelCities: [
			{ id: 'bogota', name: 'Bogotá' },
			{ id: 'cali', name: 'Cali' },
			{ id: 'medellin', name: 'Medellín' },
			{ id: 'pereira', name: 'Pereira' },
		],
		sizeTooltips: {
			main: 320
		},
		containerTooltips: null,
		elActived: null,
		tooltipCities: [],
	},
	methods: {
		activeTooltip: function (x) {
			console.log('activeTooltip', x.target.id);

			let id = x.target.id;
			let arrow = id + '-arrow';
			let tooltip = id + '-tooltip';

			documentWidth = document.body.clientWidth;
			if (documentWidth > 425) {
				let countchild = document.getElementById(tooltip).childElementCount - 1;
				let coords = x.target.getBoundingClientRect();
				let calCoords = coords.x + coords.width / 2;
				let sizeChilds = this.sizeTooltips.main * countchild;
				console.log('cal coords', calCoords);
				console.log('sizeChilds', sizeChilds);
				console.log('documentWidth', documentWidth);

				let cal;
				cal = documentWidth - calCoords - sizeChilds / 2;
				console.log('cal', cal);

				if (cal < 0 || (cal+sizeChilds) > documentWidth) {
					this.containerTooltips.style.right = '6px';
				} else {
					this.containerTooltips.style.right = cal + 'px';
				}
			} else {
				this.containerTooltips.style.right = '6px';
			}
			

			test = x;

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