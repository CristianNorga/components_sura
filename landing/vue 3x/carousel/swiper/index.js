const { createApp } = Vue;

const app = createApp({});

app.component('carouselSwiper', {
	props: {
		pIsNavigation: {
			type: Boolean,
			default: true,
		},
		pIsBulletsIn: {
			type: Boolean,
			default: true,
		},
	},
	mounted() {
		// Install Plugin To Swiper

		Swiper.use(myPlugin);

		let configSwiper = {
			// height: 200,
			// roundLengths: true,
			// setWrapperSize: true,
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			// Enable debugger
			debugger: true,
		};

		if (this.pIsNavigation) {
			configSwiper.navigation = {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			};
		}

		// Init Swiper
		new Swiper('.swiper-container', configSwiper);
	},
	template: `
    <div class="container-lg">
      <div class="swiper-container swiper swiper-container-horizontal mt-5 mt-sm-1" style="max-width: 100%;">
        <div class="swiper-wrapper" :style="{margin: pIsBulletsIn ? '0 0 2.400rem' : '0'}" style="transition-duration: 0ms">

          <slot name="slides">

            <!-- portada example -->
            <div class="swiper-slide">
              <div class="slide__logo " style="margin-top:1rem;margin: 0 auto 0 auto;"></div>
              <div class="slide__image" style="margin: 0px auto;">
                <img alt="slide-onboarding-1" style="display: block;margin: 1rem auto 0px;"
                  class="slide__image_background"
                  src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/SEGUROS/infogr%C3%A1fico-peritaje_Mesa%20de%20trabajo%201.jpg">
              </div>
            </div>
        
            <!-- img and content -->
            <div class="swiper-slide">
              <div class="slide__logo " style="margin-top:1rem;margin: 0 auto 0 auto;"></div>
              <div class="slide__image" style="margin: 0px auto;">
                <img alt="slide-onboarding-1" style="display: block;margin: 1rem auto 0 auto;"
                  class="slide__image_background"
                  src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/SEGUROS/infogr%C3%A1fico-peritaje_Mesa%20de%20trabajo%201%20copia.jpg">
              </div>
              <h2 class="slide__title text-center fs-4"
                style="color: #575756;font-weight: 700;font-family: 'Barlow', sans-serif;"> Trayectoria de
                alineación, frenado y suspensión delantera y trasera: </h2>
              <p class="slide__text text-center fs-5"
                style="margin: 0 auto 0 auto;color: #575756;font-weight: 400;font-family: 'Barlow', sans-serif;">
                Se inicia con una prueba de pista en la que el vehículo se pone en movimiento para evaluar características como
                trayectoria de alineación, frenado y suspensión delantera y trasera.</p>
            </div>

          </slot>
      
          
      
        </div>
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
        </div>
        <div v-show="pIsNavigation" class="swiper-button-prev swiper-container__nav swiper-container__prev" style="color: #0033a0;left: 0;"></div>
        <div v-show="pIsNavigation" class="swiper-button-next swiper-container__nav swiper-container__next swiper-button-disabled" style="color: #0033a0;right: 0;"></div>
      </div>
    </div>
  `,
});

app.mount('#app');