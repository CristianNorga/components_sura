const { createApp } = Vue;

const app = createApp({
	data() {
		return {
			screen: {
				height: 0,
				width: 0,
			},
		};
	},
	methods: {
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

app.component('tab-1', {
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
			id: null,
			trasnmiterItemWidth: null,
			toolTip: false,
			ctnWidth: 0,
			arrows: false,
			isMoving: false,
			setInterval: null,
			start: {
				x: null,
			},
		};
	},
	methods: {
		showDropInfo: function (el) {
			this.toolTip = false;

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
		resizeComponent(val) {
			let children = this.el.children.length - 1;
			this.ctnWidth = this.el.clientWidth;

			let widthEl = val > 768 ? 205 : 125;

			if (widthEl * children < this.ctnWidth) {
				this.toolTip = false;
				this.arrows = false;
				this.trasnmiterItemWidth = this.ctnWidth / children;
			} else {
				this.trasnmiterItemWidth = null;
				if (widthEl == 205) {
					this.toolTip = false;
					this.arrows = true;
				} else {
					this.arrows = false;
					this.toolTip = true;
				}
			}
		},
		startMove(e) {
			// e = e.changedTouches[0];
			// this.isMoving = true;
			this.toolTip = false;
			// this.start.x = e.pageX + this.start.x;

			// console.log('e.changedTouches', e.changedTouches);
			// console.log('e', e);
			// console.log('start.x', this.start.x);
		},
		// onMove(e) {
			// e = e.changedTouches[0];
			// if (this.isMoving) {
				// this.el.scrollLeft = this.start.x - e.pageX;
			// }
			// @mousedown="startMove"
			// @mousemove="onMove"
			// @mouseup="stopMove"
			// @mouseleave="stopMove"
		// },
		moveLeft() {
			this.setInterval = setInterval(() => {
				this.el.scrollLeft -= 15;
			}, 50);
		},
		moveRight() {
			// console.log('this.ctnWidth', this.ctnWidth);
			// console.log('this.arrows.cordR', this.arrows.cordR);
			this.setInterval = setInterval(() => {
				this.el.scrollLeft += 15;
			}, 50);
		},
		stopMove() {
			clearInterval(this.setInterval);
		},
	},
	created() {
		this.id = new Date().getTime();
	},
	mounted() {
		this.el = document.getElementById(this.id);
		this.resizeComponent(this.widthScreen);
	},
	watch: {
		widthScreen(newVal) {
			this.resizeComponent(newVal);
		},
	},
	computed: {
		classObject() {
			return {
				'px-md-4': this.arrows,
			};
		},
	},
	template: `
		<div class="mx-auto" style="width: 100%;">

      <div class="tab1">

			<div class="position-relative">

				<div @mouseenter="moveLeft" @mouseleave="stopMove" v-show="arrows" class="tab1-transmitters_arrow position-absolute h-100 align-items-center px-1" orientation="left" >
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#53565A" style="width: 25px; height: auto;"><path d="M16,0A16,16,0,1,0,27.31,4.69,16,16,0,0,0,16,0Zm4.59,17.48-6.36,6.36A2,2,0,1,1,11.41,21l5-5-5-5a2,2,0,0,1,2.82-2.82l6.36,6.37A2,2,0,0,1,21.17,16v.06a2,2,0,0,1-.58,1.42Z"/></svg>
					</span>
				</div>
				
				<div :id="id" class="tab1-transmitters_ctn position-relative d-flex" :class="classObject" @touchstart="startMove">

					<slot name="transmitters" :showDropInfo="showDropInfo" :elActived="elActived" :trasnmiterItemWidth="trasnmiterItemWidth"></slot>

					<div v-show="toolTip" class="tab1-transmitters_tooltip position-absolute text-white h-100 align-items-center px-2 ps-5">
						<span v-show="widthScreen <= 768">
							<b>
								Mantén pulsado 
								<br>
								y arrastra
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#ffffff" style="height: 25px; width: auto;"><path d="M25.82.26a4.12,4.12,0,0,1,1.93.89,3.62,3.62,0,1,1-5.91,3.5c0-.08,0-.17-.07-.26H4.94L6.32,5.77l.41.41a.55.55,0,0,1,0,.82A.56.56,0,0,1,6,7L3.82,4.84,3.2,4.25a.55.55,0,0,1,.12-.92,2,2,0,0,0,.37-.27L5.9.85A.6.6,0,0,1,6.58.66a.56.56,0,0,1,.13,1c-.49.5-1,1-1.48,1.48l-.14.15H21.8A3.46,3.46,0,0,1,23.38.88,10.2,10.2,0,0,1,24.91.26Zm-.45,1.11a2.52,2.52,0,0,0,0,5A2.54,2.54,0,0,0,27.9,3.88,2.53,2.53,0,0,0,25.37,1.37Z"/><path d="M15.74,11.76c1.74-.71,2.58-.5,3.67.93a2.43,2.43,0,0,1,2.26-.59,2.54,2.54,0,0,1,1.74,1.56,2.45,2.45,0,0,1,2.23-.5,2.6,2.6,0,0,1,1.86,2.21,3.91,3.91,0,0,1,0,.49q0,4.79,0,9.57A6.27,6.27,0,0,1,25,30.59a5.41,5.41,0,0,1-3.39,1.17H15.51a5.62,5.62,0,0,1-5.23-3.09c-1.59-2.9-3.07-5.86-4.6-8.79l-1-1.94c-.31-.6-.3-.72.22-1.13A7.59,7.59,0,0,1,6.09,16a3.3,3.3,0,0,1,3.93.78c.23.25.45.52.74.87V6.1a2.71,2.71,0,0,1,.91-2.19,2.45,2.45,0,0,1,4,1.45,4.1,4.1,0,0,1,.06.78C15.74,8,15.74,9.86,15.74,11.76Zm-10,5.82.15.31,2,3.85C9,23.8,10,25.86,11.11,27.91a4.72,4.72,0,0,0,4.5,2.74c2,0,4,0,6,0A4.28,4.28,0,0,0,24,30a5.22,5.22,0,0,0,2.39-4.6V15.91a3.1,3.1,0,0,0,0-.43,1.46,1.46,0,0,0-1.3-1.3,1.41,1.41,0,0,0-1.43,1.14,3.43,3.43,0,0,0,0,.56c0,.37,0,.74,0,1.11a.53.53,0,0,1-.58.53.52.52,0,0,1-.51-.56c0-.45,0-.89,0-1.34a9.29,9.29,0,0,0-.06-1.3,1.37,1.37,0,0,0-2.7-.12,2.29,2.29,0,0,0-.08.64c0,.75,0,1.51,0,2.26a.52.52,0,0,1-.51.56.54.54,0,0,1-.58-.54,1.69,1.69,0,0,1,0-.32c0-1,0-2,0-2.94a1.39,1.39,0,0,0-1.62-1.38A1.55,1.55,0,0,0,15.74,14c0,.61,0,1.22,0,1.83V17.4a.56.56,0,1,1-1.11,0V6.21c0-.14,0-.27,0-.4a1.44,1.44,0,0,0-1.28-1.38,1.4,1.4,0,0,0-1.46,1.43c0,.86,0,1.72,0,2.58,0,3.52,0,7,0,10.55,0,.3,0,.57-.38.68s-.51-.05-.7-.28L9.39,17.7A2.28,2.28,0,0,0,5.74,17.58Z"/></svg>
							</b>
						</span>
					</div>

				</div>

				<div @mouseenter="moveRight" @mouseleave="stopMove" v-show="arrows" class="tab1-transmitters_arrow position-absolute h-100 align-items-center px-1" orientation="right">
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#53565A" style="width: 25px; height: auto;"><path d="M16,0A16,16,0,1,0,27.31,4.69,16,16,0,0,0,16,0Zm4.59,17.48-6.36,6.36A2,2,0,1,1,11.41,21l5-5-5-5a2,2,0,0,1,2.82-2.82l6.36,6.37A2,2,0,0,1,21.17,16v.06a2,2,0,0,1-.58,1.42Z"/></svg>
					</span>
				</div>
			</div>
			

        <div class="tab1-receiver_ctn">
					<slot name="receiver" :elActived="elActived"></slot>
        </div>

      </div>

    </div>
  `,
});

app.mount('#app')
