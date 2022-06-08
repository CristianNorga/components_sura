let CONSTANTES = {
	username: 'Evan',
	dialogue: {
		es: {
			HELLO: 'Hola',
			ACTIVE: 'Activar',
			DEACTIVATE: 'Desactivar',
		},
		en: {
			HELLO: 'Hello',
			ACTIVE: 'Active',
			DEACTIVATE: 'Deactivate',
		},
	},
	// chengeState: () => {
	// 	app._props.test = !app._props.test;
	// },
};

const { createApp } = Vue;
// import { createApp } from 'vue';

// create component vue version 3
// createApp({
//   data() {
//     return {
//       message: 'Hello Vue.js!'
//     };
//   },
//   template: `
//     <div>
//       <h1>{{ message }}</h1>
//     </div>`
// });

const app = createApp(
	{
		// props: ['dialogue'],
		data() {
			return {
				page: 'home',
				language: 'es',
				pages: {
					home: {
						states: {
							test: true,
						},
					},
				},
			};
		},
		updated() {
			console.log('updated');
		},
		methods: {
			setPage(page) {
				this.page = page;
			},
			setLanguage(language) {
				this.language = language;
				console.log('changing language to', language);
			},
			getAllControllers() {
				let ctrs = {
					setPage: this.setPage,
					setLanguage: this.setLanguage,
				};
				return ctrs;
			},
		},
		template: `
			<home v-if="this.page == 'home'" :lg="language" :ctrs="getAllControllers">

			</home>
		`,
	},
	CONSTANTES
);

app.component('home', {
	props: ['lg', 'ctrs'],
	// watch: {
	// 	lg(newLg) {
	// 		this.lenguage = newLg;
	// 		console.log('changing language to', newLg);
	// 	}
	// },
	template: `
		<test testp="paragraph" :ctrs="ctrs" :lg="lg"></test>
	`,
});

app.component('test', {
	props: ['username', 'testp', 'dialogue', 'lg', 'ctrs'],
	data() {
		return {
			test: true,
		};
	},
	methods: {
		changeState() {
			this.test = !this.test;
		},
	},
	// mounted() {
	// 	console.log('mounted');
	// 	console.log(this.dialogue);
	// },
	// watch: {
	// 	lg(newValue, oldValue) {
	// 		this.idiom = newValue;
	// 		console.log('old', oldValue);
	// 	},
	// },
	template: `
      <h1>{{ dialogue[lg].HELLO + ' ' + username + '!'}}</h1>
			<p>{{'test: ' + testp }}</p>
			<Transition name="test">
				<p class="test" v-show="test">{{'test bolean: ' + test }}</p>
			</Transition>
			<button @click="ctrs().setLanguage('en')">Cambiar a ingles</button>
			<button @click="ctrs().setLanguage('es')">Cambiar a epañol</button>
			<br>
			<button @click="changeState">{{
				test ? dialogue[lg].DEACTIVATE : dialogue[lg].ACTIVE
			}}</button>
    `,
});

app.mount('#app');

// console.log(Vue);
