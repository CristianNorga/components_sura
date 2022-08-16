console.log('script index loaded')

const {createApp} = Vue;

const app = createApp({
	data() {
		return {
			screen: {
				height: 0,
				width: 0,
			},
			transition: false,
			transitionState: 'none',
		};
	},
	methods: {
		showTransition() {
			this.transition = true;
      // let brandPosition = document.getElementById('logoSura').getBoundingClientRect().x;
      // console.log(brandPosition);
      // let logoStarIn = (screen.width - brandPosition) * -1;
      // console.log(screen.width - brandPosition);
			// this.transitionState = 'init';
			anime({
				targets: '.transition1 .layers[group="1"]',
				duration: 1200,
				width: ['0', '100%'],
				easing: 'cubicBezier(.545,0,.3,1)',
				delay: anime.stagger(49, { start: 0 }),
			});
      // easeOutBounce;
      anime({
        targets: '.transition1 #logoSura',
        easing: 'cubicBezier(.545,0,.3,1)',
        duration: 1223,
        width: ['300%','100%'],
        translateX: [function (el) {
          console.log((screen.width - el.getBoundingClientRect().x - el.getBoundingClientRect().width) * -1)
          return (screen.width - el.getBoundingClientRect().x - el.getBoundingClientRect().width) * -1;
        },0],
        delay: 75,
      });

			anime({
				targets: '.transition1 .parts',
				duration: 1200,
        direction: 'normal',
				keyframes: [
					{ scale: 1.5, fill: 'rgb(0,174,199)',transformOrigin: 'center',opacity: 0 },
					{ scale: 1, fill: 'rgb(131,231,245)', opacity: 0.5 },
					{ fill: 'rgb(0,174,199)',opacity: 1 },
				],
				easing: 'easeInOutQuad',
				//
				delay: anime.stagger(42, { start: 600 }),
				// delay: 200,
			});
			anime({
				targets: '.transition1 .layers[layer="brandText"]',
				translateX: [100, 0],
				opacity: [0, 1],
				delay: 1400,
				// direction: 'alternate',
			});
			anime({
				targets: '.transition1 .layers[layer="separator"]',
				maxWidth: ['0rem', '.55rem', '.55rem', '100%'],
				maxHeight: ['0rem', '.55rem', '100%'],
				translatey: [100, 0],
				easing: 'easeInOutQuad',
				delay: 1100,
			});
			anime({
				targets: '.transition1 .layers[layer="text"]',
				translateY: [250, 0],
				opacity: [0, 1],
				delay: 1300,
				easing: 'cubicBezier(.545,0,.3,1)',
			});
			setTimeout(() => {
        let $ = this;
        anime({
          targets: '.layers',
          translateY: [0, screen.height*-1],
          easing: 'easeOutSine',
          complete: function(anim) {
            $.transition = false;
            anime.set('.transition1 .layers[group="1"]', { translateY: 0, width: 0 });
            anime.set('.transition1 .layers', { translateY: 0 });
          }
        });
			}, 3000);
		},
		resetTransition() {
			// this.transition = false;
			// this.transitionState = 'none';
		},
		resize() {
			this.screen.height = window.innerHeight;
			this.screen.width = window.innerWidth;
		},
	},
	created() {
		this.resize();

		window.onresize = this.resize;
	},
});

app.component('helloWorld', {
	template: `
  <div>
    <p class="fs-2">
      HOLA MUNDO! 😁
    </p>
  </div>
  `,
});