const { createApp } = Vue;

const app = createApp({});

app.component('cpse-1', {
	props: {
		widthScreen: {
			type: Number,
			default: 360,
		},
	},
	data: function () {
		return {
			elActived: null,
			setTimeout: null,
			vimeoVideo: null,
			withVideo: this.widthScreen || 0,
		};
	},
	methods: {
		showDropInfo: function (el) {
			let value = el.target.getAttribute('tied');
			value = value == this.elActived ? null : value;

			this.elActived = value;

			// clearTimeout(this.setTimeout);
			// if (this.elActived != null && value != null) {
			// 	this.elActived = null;
			// 	// scroll(0, 0);
			// 	setTimeout(() => {
			// 		this.elActived = value;
			// 	}, 450);
			// } else {
			// 	this.elActived = value;
			// }
		},
		mounteVideo() {
			var options = {
				id: '695005101',
				// url: 'https://player.vimeo.com/video/695005101',
				width: this.withVideo > 576 ? 420 : this.withVideo - 30,
			};

			this.vimeoVideo = new Vimeo.Player('myVideo', options);
		},
	},
	mounted() {
		window.libUtils.getScript(
			'vimeo',
			'https://player.vimeo.com/api/player.js',
			this.mounteVideo,
			true
		);
	},
	watch: {
		widthScreen(newVal) {
			console.log('resizing csp1');
			if (this.vimeoVideo) {
				this.vimeoVideo.width = newVal > 576 ? 420 : newVal - 30;
			}
		},
	},
	template: `
    <div class="container-xl mt-3 cpse1-component">

      <div v-show="elActived" class="row text-primary fs-4 mb-4 text-center fw-bold">
        <slot name="linksaux" :showDropInfo="showDropInfo" :elActived="elActived"></slot>
      </div>

      <div class="row">
        <div class="col align-self-center">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <slot name="transmitters" :showDropInfo="showDropInfo" :elActived="elActived"></slot>
            </div>
          </div>
        </div>

        <div v-show="elActived" class="col-12 col-lg-9">
          <div class="container-fluid">
            <slot name="receiver" :elActived="elActived"></slot>
          </div>
        </div>
      </div>

    </div>
  `,
});

app.mount('#app');