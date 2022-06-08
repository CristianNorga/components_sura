const { createApp } = Vue;
const app = createApp({});

app.component('navBasic', {
	template: `
	<nav class="content-header">
		<div class="brand-sura container-lg">
      <img src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/corporacion_amigos_de_eafit.svg" alt=""
          style="max-width: 113px;padding-left: 14px;">
      <div class="separator_ct--brand">
				<div class="separator--brand">
					
				</div>
			</div>
			<img src="https://www.sura.com//content/themes/sura-home-regional/dist/img/global/logo.svg" alt=""
				style="max-width: 113px;">
		</div>
		<div class="descriptor_ct-negocio">
			<div class="descriptor-negocio container-lg">
				<span>SEGUROS</span>
			</div>
		</div>
	</nav>
`,
});
