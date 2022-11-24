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
			let divisePosition;
			if (screen.width >= 768) {
				divisePosition = 0.90;
			} {
				divisePosition = 0.74;
			}
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
          console.log((screen.width/divisePosition) * -1)
          return ((screen.width/divisePosition) * -1);
        },0],
        delay: 75,
      });

			anime({
				targets: '.transition1 .parts',
				// duration: 1200,
				// direction: 'normal',
				scale: [
					{ value: [1.7, 1.2], duration: 920, delay: anime.stagger(42, { start: 600 }), easing: 'easeOutElastic(1, .8)' },
				],
				fill: [
					{ value: 'rgb(0,174,199)', duration: 320, delay: 600 },
					{ value: 'rgb(45,211,235)', duration: 225, delay: anime.stagger(22, { start: 1120 }) },
					{ value: 'rgb(0,174,199)', duration: 75 },
				],
				transformOrigin: [
					{ value: 'top', duration: 600 },
					{ value: 'center', duration: 320, delay: 1120 },
				],
				// keyframes: [
				// 	{ scale: 1.7, fill: 'rgb(0,174,199)', transformOrigin: 'center' },
				// 	{ scale: 1.7, fill: 'rgb(45,211,235)' },
				// 	{ scale: 1.2, fill: 'rgb(0,174,199)' },
				// ],
				easing: 'easeInOutQuad',
				//
				// delay: anime.stagger(42, { start: 600 }),
			});

			anime({
				targets: '.property-keyframes-demo .el',
				translateX: [
					{ value: 250, duration: 1000, delay: 500 },//2
					{ value: 0, duration: 1000, delay: 500 },//4
				],
				translateY: [
					{ value: -40, duration: 500 },//1
					{ value: 40, duration: 500, delay: 1000 },//3
					{ value: 0, duration: 500, delay: 1000 },//5
				],
				scaleX: [
					{ value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },//2
					{ value: 1, duration: 900 },//2
					{ value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },//4
					{ value: 1, duration: 900 },//4
				],
				scaleY: [
					{ value: [1.75, 1], duration: 500 },//1
					{ value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },//3
					{ value: 1, duration: 450 },//3
					{ value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },//5
					{ value: 1, duration: 450 },//5
				],
				easing: 'easeOutElastic(1, .8)',
				loop: true,
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