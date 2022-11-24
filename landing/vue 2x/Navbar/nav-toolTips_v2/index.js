Vue.component('tooltip-item-content', {
	template: `
  <p class="tooltip-item-content">Lorem ipsum dolor sit amet consectetur adipisicing elit Labore nulla pariatur laborum perspiciatis.</p>`,
});

Vue.component('tooltip-item-cost', {
	template: `
  <div class="tooltip-item-cost">
    <div>
      <p>
        POR SÓLO
      </p>
      <P>
        $120.000
      </P>
    </div>
  </div>`,
});

Vue.component('tooltip-item-infoHighlight', {
	template: `
    <div class="tooltip-item-infoHighlight">
      <p>
        Lorem ipsum <b>dolor.</b>
      </p>
    </div>`,
});

Vue.component('tooltip-item-button', {
	template: `
    <div class="tooltip-item-button">
      <button>
        Agendalo aquí
      </button>
    </div>`,
});

Vue.component('tooltip-item-legal', {
	template: `
    <p class="tooltip-item-legal">
      * Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem molestias possimus minus exercitationem
      laboriosam, ex quisquam fugit, ab deserunt!
    </p>`,
});

Vue.component('tooltip-item', {
	template: `
    <div class="tooltip-item">
      <slot name="content">
      </slot>     
    </div>`,
});

var app = new Vue({
	el: '#nav-tooltips',
	props: ['cities'],
	data: function () {
		return {
			QuantityCities: 0,
			labelCities: [],
			tooltipCities: [],
		};
	},
	methods: {
		getCodeResumeCombo: function (x) {
			let code = `<p class="tooltip-item-content">${x}</p>`;
			return code;
		},
		getCodeDescriCombo: function (x) {
			let code = `<p class="tooltip-item-DescriCombo">${x}</p>`;
			return code;
		},
		getCodeHighlightCombo: function (x) {
			let code = `<div class="tooltip-item-infoHighlight">
        <p>
          ${x}
        </p>
      </div>`;
			return code;
		},
		getCodeCost: function (x) {
			let code = `<div class="tooltip-item-cost">
        <div>
          <P>
            $${x}
          </P>
        </div>
      </div>`;
			return code;
		},
		getCodeButton: function (x, y) {
			x ? '' : (x = 'Agéndalo aquí');
			y ? '' : (y = '#');
			let code = `<div class="tooltip-item-button">
				<a href="${y}" target="_blank" style="text-decoration:none;">
        <button>
          ${x}
        </button>
				</a>
      </div>`;
			return code;
		},
		getCodeLegal: function () {
			let code = `<p class="tooltip-item-legal">
        *Terminos y condiciones...
      </p>`;
			return code;
		},
		activeTooltip: function (x) {
			let rowCityclass = document.getElementsByClassName('el-animated-tooltip');

			for (let i = 0; i < rowCityclass.length; i++) {
				rowCityclass[i].classList.remove('active-tooltip');
				rowCityclass[i].classList.remove('active-arrow');
			}
			let id = x.target.id;
			console.log(id);
			let arrow = id + '-arrow';
			let city = id + '-tooltip';
			console.log(1);
			document.getElementById(arrow).classList.add('active-arrow');
			console.log(2);
			document.getElementById(city).classList.add('active-tooltip');
			console.log(3);
		},
		defuseTooltip: function (x) {
			console.log(x);
			let id = x.target.attributes.idcity.value;
			let arrow = id + '-arrow';
			let city = id + '-tooltip';
			document.getElementById(arrow).classList.remove('active-arrow');
			document.getElementById(city).classList.remove('active-tooltip');
		},
	},
	beforeMount: function () {
		this.QuantityCities = cities.length;
		let divCities = document.getElementById('cities');

		cities.forEach((element) => {
			this.labelCities.push({ name: element.name, id: element.id });
			let el = document.createElement('div');
			el.id = element.id + '-tooltip';
			el.className += 'row rowCity el-animated-tooltip active-tooltip justify-content-end';
			// el.className += ' ';
			// el.idcity = element.id;
			el.setAttribute('idcity', element.id);

			el.onmouseleave = this.defuseTooltip;

			let allTooltips = '';
			element.items.forEach((item) => {
				let content;
				if (!item.isFilling) {
					content = this.getCodeResumeCombo(item.resumeCombo);
					content += this.getCodeDescriCombo(item.descriCombo);
					if (item.cost) content += this.getCodeCost(item.cost);
					if (item.infoHighlight) {
						content += this.getCodeHighlightCombo(item.infoHighlight);
					}
					content += this.getCodeButton(item.button, item.urlBtn);
					if (item.legal) {
						content += this.getCodeLegal();
					}

					if (item.disabled) {
						content += this.getCodeHighlightCombo('Actualmente no disponible');
					}
				}

				item.xs = item.xs || '12';
				item.sm = item.sm || '6';
				item.md = item.md || '6';
				item.lg = item.lg || '4';
				item.xl = item.xl || '2';
				item.xxl = item.xxl || '2';
				item.breakpointFilling = item.breakpointFilling || 'md';

				let itemTooltip = `<div class="tooltip-item col-${item.xs} col-sm-${
					item.sm
				} col-md-${item.md} col-lg-${item.lg} col-xl-${item.xl} col-xxl-${
					item.xxl
				} ${
					item.isFilling ? 'd-' + item.breakpointFilling + '-block' : ''
				}" style="${item.disabled ? 'background: #e2e2e2;' : ''} ${
					item.isFilling ? 'display: none;' : ''
				}">${content || ''}</div>`;
				allTooltips += itemTooltip;
			});

			let close = document.createElement('div');
			// let svg = document.createElement('svg');
			close.className += 'tooltip-item-close';
			close.setAttribute('idcity', element.id);
			close.onclick = this.defuseTooltip;
			close.innerHTML = `<svg fill="#0033a0 " idcity="${element.id}" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.26 527.23"><path idcity="${element.id}" d="M46.06,10.82A33.6,33.6,0,0,0,22.62,68.48L228.48,274.34,22.62,480.18a33.61,33.61,0,1,0,47.53,47.53L276,321.85,481.85,527.71a33.6,33.6,0,1,0,47.49-47.53L323.5,274.34,529.34,68.48A33.58,33.58,0,1,0,481.85,21L276,226.83,70.15,21A33.54,33.54,0,0,0,46.06,10.82Z" transform="translate(-12.43 -10.8)"/></svg>`;

			el.innerHTML = allTooltips;

			el.appendChild(close);
			this.tooltipCities.push(el);
			// divCities.appendChild(el);
		});
		// for (const key in object) {
		//   if (Object.hasOwnProperty.call(object, key)) {
		//     const element = object[key];

		//   }
		// }
	},
	mounted: function () {
		this.tooltipCities.forEach((element) => {
			let idcontainer = element.attributes.idcity.value + '-cities';
			let divCities = document.getElementById(idcontainer);
			divCities.appendChild(element);
		});
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

                <div v-for="city in labelCities" :key="city.id" class="col" style="text-align: -webkit-center;">
                  <div @click="activeTooltip" :id="city.id" class="tooltip-city">
                      {{ city.name }}
                    <div :id="city.id + '-arrow'" class="tooltip-arrow el-animated-tooltip"></div>
										<div class="tooltip-container">
											<div :id="city.id + '-cities'" class="container-fluid" style="color:#0033a0">

											</div>
										</div>
                    <div style="position: absolute;max-width: 80vw;background: #ffffff;top: 81%;"></div>
                  </div>
                </div>

              </div>
              
              
            </div>

          </div>

          <!-- container de tooltip -->
          <div class="tooltip-container">
            <div id="cities" class="container-fluid" style="color:#0033a0">

            </div>
          </div>

        </div>
      </div>`,
});