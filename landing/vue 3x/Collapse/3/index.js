const { createApp } = Vue;

const app = createApp({});

app.component('cpse3-transmitter-item', {
	props: [
		'actionChangePlan',
		'textPrimary',
		'transmitterAction',
		'transmitterName',
		'elActived',
		'imgName',
		'route',
		'pLeftPosition',
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
		stylesImg: function () {
			return {
				left: this.pLeftPosition || '-31%',
			};
		},
	},
	template: `
  <div class="col mt-3">
    <div class="cpse3_transmitter-itemCt">
      <div @click="toDo" :class="classObject" class="cpse3_transmitter-itemImgCt">
				<img :style="stylesImg" :src="'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/canales/'+imgName+'landing-corresponsalesx03.jpg'" alt="imagen de representacion">
			</div>
      <div class="cpse3_transmitter-itemTxtP">
			{{textPrimary}}
			</div>
      <div @click="toDo" class="cpse3_transmitter-itemLk">
        {{
          elActived == transmitterName ? 'Ver menos' : 'Ver más'
        }}
      </div>
    </div>
  </div>`,
});

app.component('cpse3-content-item', {
	props: ['receiverAction', 'imgName', 'title', 'pPositionY'],
	data: function () {
		return {
			srcserver:
				'https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/canales/',
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
				backgroundImage:
					'url(' +
					this.srcserver +
					this.imgName +
					'landing-corresponsales.jpg' +
					')',
				backgroundRepeat: 'no-repeat',
				// backgroundAttachment: 'fixed',
				backgroundPositionY: this.pPositionY || '34%',
				backgroundPositionX: 'center',
				backgroundSize: 'cover',
			};
		},
	},
	// <img :src="'./https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Web_y-o_landing/vanti/img/'+imgName" alt="">
	template: `
  <div :id="'content-'+title" class="cpse3-content-item">
    <div class="row" style="width:100%;">
      <div class="col-xl-3 ps-0 pb-4">
        <div class="cpse3_content-itemImgCt" :style="stylesObject">
				</div>
      </div>
      <div class="col-xl-9 ps-5 ps-xl-2">
        <div class="cpse3_content-itemClseCt--x">
          <div @click="toDo" class="cpse3_content-itemClse--x">x</div>
        </div>
        <div class="cpse3_content-itemCt--title">
          <span class="cpse3_content-itemTxt--title fs-3">
            {{title}}
          </span>
        </div>
        <div>
					<slot name="content"></slot>
				</div>
        
  
      </div>
    </div>
    <div @click="toDo" class="cpse3_content-itemClse--btn">Ver menos</div>
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
			type: String,
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
				this.setTimeout = setTimeout(() => {
					this.elActived = el;
				}, 450);
			} else {
				this.elActived = el;
			}
		},
	},
	template: `
  <div class="container-xl px-0">
    <div class="container-fluid mt-3">
      <div class="row justify-content-center position-relative">

      <slot name="transmitters" :showDropInfo="showDropInfo" :actionRouter="pActionRouter" :actionForm="pActionForm" :elActived="elActived">
			</slot>

      </div>
    </div>
    <div id="cpse3-content-item" class="cpse3_content-itemCt">
		
      <transition-group duration="550" name="nested">

				<slot name="content" :actionRouter="pActionRouter" :actionForm="pActionForm" :elActived="elActived" :showDropInfo="showDropInfo">
				</slot>

      </transition-group>

    </div>
  </div>`,
});
app.mount('#app');
