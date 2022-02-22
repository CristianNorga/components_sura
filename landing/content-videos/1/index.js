// app vue component
Vue.component('content-video-1', {
	name: 'containerForVideo',
	data: function () {
		return {
			video: '',
			play: false,
		};
	},
	methods: {
		toogleVideo: function () {
			if (this.video.paused) {
				this.video.play();
				this.video.muted = false;
				this.play = true;
			} else {
				this.video.pause();
				this.video.muted = true;
				this.play = false;
			}
		},
	},
	mounted: function () {
		this.video = document.getElementById('af91b0ec-29da-4dee-8653-4b8e81c95f59');
	},
	template: `
    <div class="content-video--1">
      <!-- video -->
      <div class="videos" style="max-width: 100%;">
        <video src="https://image.comunicaciones.sura.com/lib/fe9712737364067b74/m/24/af91b0ec-29da-4dee-8653-4b8e81c95f59.mp4" id="af91b0ec-29da-4dee-8653-4b8e81c95f59" playsinline class="video" muted="muted" type="video/mp4">
        </video>
      </div>
      <div class="content-video--1-border-decoration">
        <img class="content-video-tool" v-show="!this.play" @click="toogleVideo" src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit--buttons_03.png" alt="play">
        <img class="content-video-tool" v-show="this.play" @click="toogleVideo" src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit--buttons_05.png" alt="play">
      </div>
    </div>`,
});

var app = new Vue({
	el: '#app',
});