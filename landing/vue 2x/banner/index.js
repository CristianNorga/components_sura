Vue.component('banner', {
	template: `
    <div class="content-banner">
      <a href="#">
        <img class="content-banner_img" src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit_banner_02.jpg" alt="baner sura, personas viendo plano">
      </a>
      <div class="content-banner_paragraph">
        <p>
          <em>
            Con nuestro
          </em>
        </p>
        <p>
          <em>
            Plan Vive
          </em>
        </p>
        <p>
          te acompañamos y te respaldamos siempre que nos necesites, para que puedas seguir manteniendo tu calidad de vida y la de los que más quieres.
        </p>
      </div>
    </div>
  `,
});

new Vue({
	el: '#app',
});
