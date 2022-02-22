var cpntContentVideo = Vue.component('content-video-1', {
	name: 'containerForVideo',
	data: function () {
		return {
			player: '',
			play: false,
			mute: false,
		};
	},
	methods: {
		toogleVideo: function () {
			if (this.player.getPlayerState() === 1) {
				this.player.pauseVideo();
				// this.video.muted = true;
				this.play = false;
			} else {
				this.player.playVideo();
				// this.video.muted = false;
				this.play = true;
			}
		},
		toogleMute: function () {
			if (this.player.isMuted()) {
				this.player.unMute();
				this.mute = false;
			} else {
				this.player.mute();
				this.mute = true;
			}
		},
		onPlayerReady: function () {
			// this.player.setVolume();
			// this.player.mute();
			// this.mute = true;
			// this.player.playVideo();
			// this.play = true;
		},
		initYoutube: function () {
			console.log('playerReady');
			this.player = new YT.Player('easyid', {
				height: '393',
				width: '700',
				videoId: 'fP9aaswDthY',
				playerVars: {
					autoplay: 1,
					controls: 0,
					loop: 1,
					showinfo: 0,
					rel: 0,
					modestbranding: 1,
					iv_load_policy: 3,
					playsinline: 1,
					playlist: 'fP9aaswDthY',
				},
				events: {
					onReady: this.onPlayerReady,
					// onStateChange: onPlayerStateChange,
				},
			});
		},
	},
	mounted() {
		// this.video = document.getElementById('af91b0ec-29da-4dee-8653-4b8e81c95f59');
		window.onYouTubeIframeAPIReady = () => {
			console.log('onYouTubeIframeAPIReady');
			this.initYoutube();
			// cpntContentVideo.extendOptions.methods.initYoutube();
		};
	},
	destroyed() {
		this.player.destroy();
	},
	template: `
    <div class="content-video--1">
      <!-- video -->
      <div class="videos" style="max-width: 100%;">
				<div id="easyid" style="border-radius:0 0 68px 0"></div>
      </div>
      <div class="content-video--1-border-decoration">
        <img class="content-video-tool" v-show="!this.play" @click="toogleVideo" src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit--buttons_03.png" alt="play">
        <img class="content-video-tool" v-show="this.play" @click="toogleVideo" src="https://comunicaciones.segurossura.com.co/MercadeoPersonas/recursos/Landing-plan-vive---corporaci%C3%B3n-amigos-eafit--buttons_05.png" alt="paused">
				<!-- ⏮⏭ -->
				<span v-show="!mute" @click="toogleMute" class="content-video-tool--sound">🔊</span>
				<span v-show="mute" @click="toogleMute" class="content-video-tool--sound">🔈</span>
      </div>
    </div>`,
});

var app = new Vue({
	el: '#app',
});
