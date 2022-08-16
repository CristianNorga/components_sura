const { createApp } = Vue;

const app = createApp({

})

app.component('footerExtended', {
	data() {
		return {
			iconsLoad: false,
		};
	},
	mounted() {
		window.libUtils.getLink(
			'css-isn-05072022',
			'https://seguros.comunicaciones.sura.com/css-isn-05072022',
			() => {
				this.iconsLoad = true;
			}
		);
	},
	template: `
 	<footer class="fs-6 bg-white mt-auto mb-0 pb-4">
    <div class="border-top pt-2">
      <div class="container-lg">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-auto">
            <p class="text-center policies">
              <a href="https://www.segurossura.com.co/Paginas/legal/politicas-uso-y-seguridad.aspx"
                target="_blank">Políticas
                de uso y privacidad</a>
            </p>
          </div>
          <div class="col-12">
            <p class="text-center policies">
              <a href="https://www.segurossura.com.co/Paginas/legal/politica-privacidad-datos.aspx"
                target="_blank">Políticas de
                privacidad y ley de datos personales</a>
            </p>
          </div>
        </div>
      </div>
      <!-- block copy and socialnetwork -->
      <div class="border-top w-100">
        <div class="container-lg">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 text-center pt-4 pb-2 py-sm-4">
              <img class="w-100" src="https://www.sura.com//content/themes/sura-home-regional/dist/img/global/logo.svg" alt="logo sura">
            </div>
            <!-- redes -->
            <div class="col-12 col-sm-8 col-md-7 col-lg-6 items-socialNetwork">
              <div class="row pt-2 pb-4 py-sm-4 justify-content-center justify-content-sm-evenly">
                <!-- blog -->
                <div class="col-3 col-sm-1 col d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a class="text-secondary" target="_blank"
                      href="https://www.segurossura.com.co/blog/?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        Blog
                      </span>
                      </a>
                  </p>
                </div>
                <!-- spotify -->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a target="_blank"
                      href="https://open.spotify.com/search/Seguros%20SURA%20Colombia%20/podcasts?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        <i class="icon i-sm i-spotify bg-secondary"></i>
                      </span></a>
                  </p>
                </div>
                <!-- instagram -->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a target="_blank"
                      href="https://www.instagram.com/segurossura/?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        <i class="icon i-sm i-instagram bg-secondary"></i>
                      </span></a>
                  </p>
                </div>
                <!-- facebook -->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a target="_blank"
                      href="https://web.facebook.com/SegurosSURAColombia?_rdc=1&_rdr&utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        <i class="icon i-sm i-facebook bg-secondary"></i>
                      </span>
                    </a>
                  </p>
                </div>
                <!-- twitter !!!-->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a target="_blank"
                      href="https://twitter.com/SegurosSURAcol?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        <i class="icon i-sm i-twitter bg-secondary"></i>
                      </span>
                    </a>
                  </p>
                </div>
                <!-- linkedin -->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a target="_blank"
                      href="https://www.linkedin.com/company/seguros-sura?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        <i class="icon i-sm i-linkedin bg-secondary"></i>
                      </span>
                    </a>
                  </p>
                </div>
                <!-- youtube -->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a target="_blank"
                      href="https://www.youtube.com/channel/UC_voqvWCPExU_khvJHFbW_g?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        <i class="icon i-sm i-youtube bg-secondary"></i>
                      </span>
                    </a>
                  </p>
                </div>
                <!-- APP -->
                <div class="col-3 col-sm-1 d-flex align-items-center justify-content-center">
                  <p class="my-2 text-center footer-icon-ctn placeholder-glow">
                    <a class="text-secondary" target="_blank" style="font-style: italic;"
                      href="https://www.segurossura.com.co/landings/app/index.html?utm_source=segurossura&utm_medium=menu&utm_campaign=footer-seguros&utm_content=footer-seguros">
                      <span :class="{ placeholder:  !iconsLoad}">
                        APP
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- block copy mobile -->
      <div class="border-top w-100">
        <div class="container-lg">
          <div class="row">
            <div class="col pt-4">
              <p class="text-center">© Copyright Seguros SURA 2022</p>
            </div>
          </div>
        </div>
      <div>
    </div>
  </footer>
 `,
});
