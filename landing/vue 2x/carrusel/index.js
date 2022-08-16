Vue.component('csel-main-item', {
	props: ['rutaimg'],
	name: 'csel-main-item',
	template: `
        <div class="transitionComplete-item">
            <div class="row">
                <div class="col-sm-5 transitionComplete-content-img">
                <img :src="this.rutaimg" alt="Hombre leyendo un libro junto hija. nieta o hija"
                class="transitionComplete-img">
                </div>
                <div class="col-sm-7">
                    <p class="transitionComplete-title-main text-blue">
                        <slot name="mainTitle"></slot>
                    </p>
                    <div class="ps-md-4 pt-4">
                        <p class="transitionComplete-title-sub text-aqua">
                            <slot name="firtsTitle"></slot>
                        </p>
                        <p class="transitionComplete-title-paragraph text-gray">
                            <slot name="firtsParagraph"></slot>
                        </p>
                        <p class="transitionComplete-title-sub text-aqua">
                            <slot name="secondTitle"></slot>
                        </p>
                        <p class="transitionComplete-title-paragraph text-gray">
                            <slot name="secondParagraph"></slot>
                        </p>
                        <p class="transitionComplete-title-sub text-aqua">
                            <slot name="thirdTitle"></slot>
                        </p>
                        <p class="transitionComplete-title-paragraph text-gray">
                            <slot name="thirdParagraph"></slot>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,
});

Vue.component('csel-card-drop-item', {
	props: ['rutaimg', 'titlemain', 'paragraph'],
	name: 'csel-card-drop',
	data: function () {
		return {
			show: false,
		};
	},
	methods: {
		showDrop: function () {
			this.show = !this.show;
		},
	},
	computed: {
		titleObject: function () {
			return {
				// active: this.isActive && !this.error,
				'text-left': this.show,
				'text-center': !this.show,
			};
		},
		cardObject: function () {
			return {
				// active: this.isActive && !this.error,
				'size-on': this.show,
			};
		},
		btnDrop: function () {
			return {
				'btn-up': !this.show,
				'btn-down': this.show,
			};
		},
	},
	template: `
        <div
            :class="cardObject"
            class="card rounded-card-sura">
            <img :src="this.rutaimg" class="iconTop-middle" alt="...">
            <div class="card-body pt-5 px-xxl-5">
                <h5 
                :class="titleObject"
                class="card-title text-blue">{{this.titlemain}}</h5>
                <p v-if="show" class="card-text csel-card-drop-text">{{this.paragraph}}</p>
                <div @click="showDrop" :class="btnDrop" class="arrowDrop">
                    <img src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive-corporacion-amigos-eafit-arrow.svg" alt="">
                </div>
            </div>
        </div>
    `,
});

Vue.component('csel-card-drop', {
	name: 'csel-card-drop',
	data: function () {
		return {
			startindex: 1,
			endindex: 3,
			quantyElements: 4,
			items: {
				1: { show: true },
				2: { show: true },
				3: { show: true },
				4: { show: false },
			},
		};
	},
	methods: {
		// setTimeout
		delay: function (ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
		nextIndex: function () {
			if (this.endindex < this.quantyElements) {
				this.items[this.startindex].show = false;
				this.startindex++;
				this.endindex++;
				this.delay(100).then(() => {
					this.items[this.endindex].show = true;
				});
			}
		},
		prevIndex: function () {
			if (this.startindex > 1) {
				this.items[this.endindex].show = false;
				this.startindex--;
				this.endindex--;
				this.delay(100).then(() => {
					this.items[this.startindex].show = true;
				});
			}
		},
	},
	computed: {
		titleObject: function () {
			return {
				// active: this.isActive && !this.error,
				'text-left': this.show,
				'text-center': !this.show,
			};
		},
		cardObject: function () {
			return {
				// active: this.isActive && !this.error,
				'size-on': this.show,
			};
		},
		btnDrop: function () {
			return {
				'btn-up': !this.show,
				'btn-down': this.show,
			};
		},
	},
	template: `
        <div class="row">
          <div class="col-sm-12 ps-md-4">
            <p class="transitionComplete-title-main text-light pt-4">
              Programas de acompañamiento y prevención:
            </p>
          </div>
          <div class="col-sm-12 pt-4">
            <div class="carrusel-sura-items">
                <div class="transitionComplete-item px-lg-5">

                    <div class="arrow-carrusel-container-left">
                    
                        <div @click="prevIndex" class="background-arrow-left" v-bind:class="{'arrow-disabled' : this.startindex === 1}">

                            <div @click="prevIndex" class="arrow-carrusel--sub transitionComplete-arrow--left" v-bind:class="{'arrow-disabled' : this.startindex === 1}"></div>

                        </div>
                    </div>
                    
                    <div class="arrow-carrusel-container-right">

                        <div @click="nextIndex" class="background-arrow-right" v-bind:class="{'arrow-disabled' : this.quantyElements === this.endindex}">

                            <div @click="nextIndex" class="arrow-carrusel--sub transitionComplete-arrow--right" v-bind:class="{'arrow-disabled' : this.quantyElements === this.endindex}"></div>
                    
                        </div>

                    </div>

                        
                        

                    <transition-group name="groupcards" class="row" tag="div">
                    
                        <div :key="1" class="col-md-4 groupcards-item mb-5" v-show="items[1].show">
                            <csel-card-drop-item 
                            rutaimg="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Recurso5Landing-plan-vive-corporacion-amigos-eafit.png"
                            titlemain="Gestor médico"
                            paragraph="Si mueres, SURA reembolsará los gastos funerarios a quien
        demuestre haber incurrido en ellos, y si sobra dinero"></csel-card-drop-item>
                        </div>
                    
                        <div :key="2" class="col-md-4 mb-5" v-show="items[2].show">
                            <csel-card-drop-item
                            rutaimg="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Recurso5Landing-plan-vive-corporacion-amigos-eafit.png"
                            titlemain="Tu bienestar al día" paragraph="Si mueres, SURA reembolsará los gastos funerarios a quien
                            demuestre haber incurrido en ellos, y si sobra dinero"></csel-card-drop-item>
                        </div>

                        <div :key="3" class="col-md-4 mb-5" v-show="items[3].show">
                            <csel-card-drop-item
                            rutaimg="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Recurso5Landing-plan-vive-corporacion-amigos-eafit.png"
                            titlemain="Riesgo cardiovascular" paragraph="Si mueres, SURA reembolsará los gastos funerarios a quien
                                                demuestre haber incurrido en ellos, y si sobra dinero"></csel-card-drop-item>
                        </div>

                        <div :key="4" class="col-md-4 mb-5" v-show="items[4].show">
                            <csel-card-drop-item
                            rutaimg="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Recurso5Landing-plan-vive-corporacion-amigos-eafit.png"
                            titlemain="Testeo" paragraph="Si mueres, SURA reembolsará los gastos funerarios a quien
                                                demuestre haber incurrido en ellos, y si sobra dinero"></csel-card-drop-item>
                        </div>
                    </transition-group>
                </div>
            </div>
      
          </div>
        </div>
    `,
});

Vue.component('carrusel-main-transition', {
	name: 'carrusel-main-transition',
	data: function () {
		return {
			carruselSelect: 1,
			items: 2,
		};
	},
	methods: {
		next: function () {
			if (this.carruselSelect === this.items) {
				return;
			}
			this.carruselSelect++;
		},
		prev: function () {
			if (this.carruselSelect === 1) {
				return;
			}
			this.carruselSelect--;
		},
	},
	template: `
        <div class="carrusel-sura--transitionComplete
                    container 
                    mt-3
                    px-md-5">
            
            <div class="row">
                <div class="col-sm-12">
                    <p class="transitionComplete-title-main text-aqua">
                        Plan Vive está presente:
                    </p>
                </div>
                <div class="col-sm-12">

                    <div class="carrusel-sura-items">

                        <transition name="carrusel-main">

                            <csel-main-item v-show="carruselSelect === 1" 
                            v-bind:class="[carruselSelect == 1 ? '' : 'position--absolute']"
                            rutaimg="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit_03.png">
                                <template v-slot:mainTitle>
                                    Si necesitas respaldar o proteger a los tuyos en caso de que faltes
                                </template>
                                <template v-slot:firtsTitle>
                                    Vida:
                                </template>
                                <template v-slot:firtsParagraph>
                                    En caso de que mueras SURA pagará a tus beneficiarios el valor asegurado.
                                </template>
                                <template v-slot:secondTitle>
                                    Muerte en un accidente:
                                </template>
                                <template v-slot:secondParagraph>
                                    Si mueres en un accidente, SURA pagará a tus beneficiarios el valor asegurado.
                                </template>
                                <template v-slot:thirdTitle>
                                    Exequial:
                                </template>
                                <template v-slot:thirdParagraph>
                                    Si mueres, SURA reembolsará los gastos funerarios a quien demuestre haber incurrido en ellos, y si sobra dinero se le entregará a tus beneficiarios sin superar el valor asegurado.
                                </template>
                            </csel-main-item>
                        </transition>
                        
                        <transition name="carrusel-main">
                        
                            <csel-main-item v-show="carruselSelect === 2" 
                            v-bind:class="[carruselSelect == 2 ? '' : 'position--absolute']"
                            rutaimg="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit_05.png">
                                <template v-slot:mainTitle>
                                    Si pierdes la capacidad laboral
                                </template>
                                <template v-slot:firtsTitle>
                                    Enfermedades graves:
                                </template>
                                <template v-slot:firtsParagraph>
                                    Si te diagnostican alguna de las enfermedades graves o te realizan algún procedimiento quirúrgico definido en el seguro, SURA te pagará el valor asegurado de esta cobertura.
                                </template>
                                <template v-slot:secondTitle>
                                    Invalidez, pérdida o inutilización por accidente:
                                </template>
                                <template v-slot:secondParagraph>
                                    Si como consecuencia de un accidente pierdes de forma total y permanente la capacidad laboral igual o superior al 50 %, SURA te pagará el total del valor asegurado; o si tienes una de las pérdidas parciales mencionadas en el seguro, SURA te pagará el porcentaje definido en este.
                                </template>
                                <template v-slot:thirdTitle>
                                    Invalidez, pérdida o inutilización por enfermedad:
                                </template>
                                <template v-slot:thirdParagraph>
                                    Si como consecuencia de una enfermedad sufres una pérdida total y permanente de la capacidad laboral igual o superior al 50 %, SURA te pagará el valor asegurado.
                                </template>
                            </csel-main-item>
                            
                        </transition>

                    </div>

                </div>
            </div>
            <div @click="prev" class="arrow-carrusel transitionComplete-arrow--left" v-bind:class="{'arrow-disabled' : this.carruselSelect === 1}">
            </div>
            <div @click="next" class="arrow-carrusel transitionComplete-arrow--right" v-bind:class="{'arrow-disabled' : this.carruselSelect === 2}">

          </div>
        </div>`,
});

new Vue({
	el: '#app',
});
