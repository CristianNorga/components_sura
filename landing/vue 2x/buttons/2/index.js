Vue.component('agenda-item', {
	props: ['pImg', 'pTypeimg', 'pId'],
	data: function () {
		return {
			typeimg: this.pTypeimg || '.svg',
			actived: false,
		};
	},
	methods: {
		focus: function () {
			this.actived = true;
		},
		losefocus: function () {
			this.actived = false;
		},
	},
	template: `
   <div @mouseenter="focus" @mouseleave="losefocus" class="button-container">
      <div class="agenda-cita-col-bola">&#160;</div>
      <div class="agenda-cita-col-icon">
          <img v-show="!actived" style="width: 50px;" src="./calendar11120--blue.svg" alt="">
          <img :id="pId" v-show="actived" style="width: 50px;" src="./calendar11120--white.svg" alt="">
      </div>
      <!-- <p class="agenda-cita-col-button-text">
          <span>Click Aqui</span>
      </p> -->
    </div>
  `,
});

new Vue({
	el: '#app',
});