Vue.component('nav-sura', {
	template: `
	<nav class="content-header">
		<div class="brand-sura container-fluidclass">
      <img src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/corporacion_amigos_de_eafit.svg" alt=""
          style="max-width: 113px;">
      <div class="separator--brand"></div>
			<img src="https://www.sura.com//content/themes/sura-home-regional/dist/img/global/logo.svg" alt=""
				style="max-width: 113px;">
		</div>
		<div class="descriptor-negocio">
			<span>SEGUROS</span>
		</div>
	</nav>
`,
});

new Vue({
  el: '#app',
});