const { createApp } = Vue;

const app = createApp({});

app.component('cpse-transmitter-item', {
	props: [
		'actionChangePlan',
		'textPrimary',
		'transmitterAction',
		'transmitterName',
		'elActived',
		'imgName',
		'route',
	],
	data() {
		return {
			setTimeOut: null,
		};
	},
	methods: {
		toDo: function () {
			if (!this.route) {
				if (this.elActived != this.transmitterName) {
					clearTimeout(this.setTimeOut);
					this.transmitterAction(this.transmitterName);
					this.actionChangePlan(this.textPrimary);
					this.setTimeOut = setTimeout(() => {
						location.hash = 'content-' + this.textPrimary;
					}, 200);
				} else {
					this.transmitterAction(null);
				}
			} else {
				this.transmitterAction(this.route);
			}
		},
	},
	destroyed() {
		clearTimeout(this.setTimeOut);
	},
	computed: {
		classObject: function () {
			return {
				'transmitter-itemImgCt--actived': this.elActived == this.transmitterName,
			};
		},
	},
	template: `
  <div class="col mt-3" style="max-width: 136px;">
    <div class="cpse_transmitter-itemCt">
      <div @click="toDo" :class="classObject" class="cpse_transmitter-itemImgCt">
				<img v-show="elActived != transmitterName" :src="'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/'+imgName+'.svg'" alt="">
				<img v-show="elActived == transmitterName" :src="'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/'+imgName+'--actived.svg'" alt="">
			</div>
      <div class="cpse_transmitter-itemTxtP">{{textPrimary}}</div>
      <div @click="toDo" class="cpse_transmitter-itemLk">
        {{
          elActived == transmitterName ? 'Ver menos' : 'Ver más'
        }}
      </div>
    </div>
  </div>`,
});

app.component('cpse-gotourl-item', {
	props: [
		'actionChangePlan',
		'textPrimary',
		'transmitterAction',
		'transmitterName',
		'elActived',
		'imgName',
		'url',
	],
	methods: {
		toDo: function () {
			if (this.elActived != this.transmitterName) {
				this.transmitterAction(this.transmitterName);
				this.actionChangePlan(this.textPrimary);
				window.open(this.url, '_blank');
			} else {
				this.transmitterAction(null);
			}
		},
	},
	computed: {
		classObject: function () {
			return {
				'transmitter-itemImgCt--actived': this.elActived == this.transmitterName,
			};
		},
	},
	template: `
  <div class="col mt-3" style="max-width: 136px;">
    <div class="cpse_transmitter-itemCt">
      <div @click="toDo" :class="classObject" class="cpse_transmitter-itemImgCt">
				<img v-show="elActived != transmitterName" :src="'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/'+imgName+'.svg'" alt="">
				<img v-show="elActived == transmitterName" :src="'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/'+imgName+'--actived.svg'" alt="">
			</div>
      <div class="cpse_transmitter-itemTxtP">{{textPrimary}}</div>
      <div @click="toDo" class="cpse_transmitter-itemLk">
        {{
          elActived == transmitterName ? 'Ver menos' : 'Ver más'
        }}
      </div>
    </div>
  </div>`,
});

app.component('cpse-content-item', {
	props: ['receiverAction', 'imgName', 'title'],
	data: function () {
		return {
			srcserver:
				'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/',
		};
	},
	methods: {
		toDo: function () {
			this.receiverAction(null);
		},
	},
	computed: {
		stylesObject: function () {
			return {
				backgroundImage: 'url(' + this.srcserver + this.imgName + ')',
				backgroundRepeat: 'no-repeat',
				// backgroundAttachment: 'fixed',
				backgroundPosition: 'center 20%',
				backgroundSize: 'cover',
			};
		},
	},
	// <img :src="'./https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/'+imgName" alt="">
	template: `
  <div :id="'content-'+title" class="cpse-content-item">
    <div class="row" style="width:100%;">
      <div class="col-xl-3 ps-0 pb-4">
        <div class="cpse_content-itemImgCt" :style="stylesObject">
				</div>
      </div>
      <div class="col-xl-9 ps-5 ps-xl-2">
        <div class="cpse_content-itemClseCt--x">
          <div @click="toDo" class="cpse_content-itemClse--x">x</div>
        </div>
        <div class="cpse_content-itemCt--title">
          <span class="cpse_content-itemTxt--title">
            {{title}}
          </span>
        </div>
        <div>
					<slot name="content"></slot>
				</div>
        
  
      </div>
    </div>
    <div @click="toDo" class="cpse_content-itemClse--btn">Ver menos</div>
  </div>`,
});

app.component('cpse-3', {
	props: {
		pActionRouter: {
			type: Function,
			default: () => {
				console.warn('pActionRouter not define');
			},
		},
		pActionForm: {
			type: Function,
			default: () => {
				console.warn('pActionForm not define');
			},
		},
		pElActived: {
			type: String
		},
	},
	data: function () {
		return {
			elActived: this.pElActived || null,
			setTimeout: null,
		};
	},
	methods: {
		showDropInfo: function (el) {
			clearTimeout(this.setTimeout);
			if (this.elActived != null && el != null) {
				this.elActived = null;
				// scroll(0, 0);
				setTimeout(() => {
					this.elActived = el;
				}, 300);
			} else {
				this.elActived = el;
			}
		},
	},
	template: `
  <div class="container-xxl px-0">
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">

      <slot name="transmitters" :showDropInfo="showDropInfo" :actionRouter="pActionRouter" :actionForm="pActionForm">

				<cpse-gotourl-item 
				el-actived="any" transmitter-name="null" url="https://seguros.comunicaciones.sura.com/html-vpe-29032022"
				:action-change-plan="pActionForm" 
				:transmitter-action="showDropInfo"
				img-name="icon-plan-elige" text-primary="Plan Elige" ></cpse-gotourl-item>

				<cpse-transmitter-item 
				:action-change-plan="pActionForm"
				v-bind:el-actived="elActived" v-bind:transmitter-action="showDropInfo" transmitter-name="5"
				img-name="icon-plan-vida-mas" text-primary="Vida + Enfermedades Graves"></cpse-transmitter-item>

				<cpse-transmitter-item 
				:action-change-plan="pActionForm"
				v-bind:el-actived="elActived" v-bind:transmitter-action="showDropInfo" 
				img-name="icon-combo-vida" text-primary="Combo Vida" transmitter-name="6"></cpse-transmitter-item>

			</slot>

      </div>
    </div>
    <div id="cpse-content-item" class="cpse_content-itemCt">
		
      <transition-group duration="550" name="nested">
				<slot name="content" :actionRouter="pActionRouter" :actionForm="pActionForm">
					<cpse-content-item title="Vida + Enfermedades Graves" key="5" imgName="vida+enfermedades.jpg" :class="{'position-absolute': elActived != '5'}" v-show="elActived == '5'"  v-bind:receiver-action="showDropInfo">
						<template v-slot:content>
							<p style="margin-top:15px;">
								
								Cuidar de los que más quieres es tu prioridad. Por eso con la alianza Vanti y SURA te acompañamos en  momentos en los que tu estabilidad económica o la de tu familia pueden verse comprometidas. Te respaldamos en caso de fallecimiento o diagnóstico de una enfermedad grave.
							</p>
							<p>
								<span class="subtitle">Conoce más sobre las coberturas.</span>
							</p>
							<p class="muted">
								<span class="subtitle">Muerte por cualquier causa</span> <br/>
								Si llegas a fallecer, a quien hayas elegido como beneficiario contará con un respaldo económico. Además, si contrataste el anexo de auxilio de exequias, este respaldo cubrirá los gastos funerarios.

							</p>
							<p class="muted">
								<span class="subtitle">Enfermedades graves</span> <br/>
								Si te diagnostican una enfermedad de alto costo, te entregaremos un respaldo económico para que asumas esta situación y los gastos adicionales que se presenten.
							</p>
						</template>
					</cpse-content-item>

					<cpse-content-item title="Combo Vida" key="6" imgName="combovida400x400.jpg" :class="{'position-absolute': elActived != '6'}" v-show="elActived == '6'"  v-bind:receiver-action="showDropInfo">
						<template v-slot:content>
							<p style="margin-top:15px;">
										
									Asegurar el presente y futuro de tu familia es posible si cuentas con una solución que los respalde económicamente ante una situación inesperada. Con este plan, te damos una alternativa completa para que disfrutes con la tranquilidad de estar protegido.
								</p>
							<p>
								<span class="subtitle">Conoce nuestras coberturas</span> en caso de accidente, hospitalización o fallecimiento.
							</p>
							<p class="muted">
								<span class="subtitle">Vida</span> <br/>
								Si llegas a fallecer por cualquier causa, garantizas el bienestar de tus seres queridos con un respaldo económico.
							</p>
							<p class="muted">
								<span class="subtitle">Accidentes personales</span> <br/>
								Podrás contar con un apoyo financiero en caso de sufrir algún tipo de accidente y requerir atención de urgencias en algún servicio medico. Cubre 1 evento durante la vigencia.
							</p>
							<p class="muted">
								<span class="subtitle">Pagos por hospitalización</span> <br/>
								Recibirás un apoyo económico en caso de ser hospitalizado por más de 48 horas. Cubre 1 evento durante la vigencia.
							</p>
						</template>
					</cpse-content-item>
				</slot>

				

      </transition-group>

    </div>
  </div>`,
});

app.mount('#app');
