const { createApp } = Vue;
const app = createApp({});

app.component('headerSura', {
	emits: ['changeRoute'],
	props: {
		brandSura: {
			type: String,
			default:
				'https://www.sura.com//content/themes/sura-home-regional/dist/img/global/logo.svg',
		},
		brandAllies: {
			type: String,
		},
		namePerson: {
			type: String,
		},
		itemsSession: {
			type: Array,
			default: [
				{
					text: 'Sucursal virtual',
					bold: 'Personas',
					action: () => {
						console.log('action btn');
					},
				},
			],
		},
		routeActived: {
			type: String,
			default: '',
		},
		router: {
			type: Object,
			default: {
				actived: 'home',
				views: {
					home: {
						text: 'Inicio',
						transition: null,
						execute: () => {
							console.log('ejecutamos antes de realziar la transición?');
						},
					},
					test: {
						text: 'TEST',
						transition: null,
						execute: () => {
							console.log('ejecutamos antes de realziar la transición?');
						},
					},
				},
			},
		},
	},
	data() {
		return {
			stsBtn_session: 'closed',
			stsBtn_sessionMobile: 'closed',
			stsBtn_Hamburger: 'closed',
		};
	},
	methods: {
		changeStatusSession(status) {
			if (typeof status == 'object') {
				this.stsBtn_session = this.stsBtn_session == 'closed' ? 'open' : 'closed';
			} else {
				this.stsBtn_session = status;
			}
		},
		changeStatusHamburger(status) {
			if (typeof status == 'object') {
				this.stsBtn_Hamburger =
					this.stsBtn_Hamburger == 'closed' ? 'open' : 'closed';
			} else {
				this.stsBtn_Hamburger = status;
			}
		},
		changeStatusSessionMobile(status) {
			if (typeof status == 'object') {
				this.stsBtn_session = this.stsBtn_session == 'closed' ? 'open' : 'closed';
			} else {
				this.stsBtn_session = status;
			}
		},
	},
	computed: {
		firstName() {
			let nameSeparate = this.namePerson.split(' ');
			return nameSeparate[0].toUpperCase();
		},
	}, //is-session="true"
	template: `
    <header class="header-sura position-relative">
      <div position-brands="start" class="headerSura-Ctn_brands">
        <div class="container-lg d-flex align-items-center">
          <img v-if="brandAllies" class="brands-img" order="1" :src="brandAllies"
            alt="">
  
          <div v-if="brandAllies" class="brands-separator d-flex justify-content-center">
            <div class="vr"></div>
          </div>
  
          <img class="brands-img" order="2" :src="brandSura" alt="">

          <div class="brands-ctnMenu position-relative d-flex justify-content-center-align-items-center h-100 p-0 m-0 ms-auto">

            <button type="button" class="ctn-btnProfile bg-white rounded-pill position-relative d-none d-md-flex align-items-center justify-content-center w-auto h-auto m-0 p-0 ms-auto me-4">
              <i class="icon i-profile mx-3"></i>
              <span class="text-primary fs-6 text-center lh-base fw-bold me-3">{{firstName}}...</span>
            </button>

            <button @click="changeStatusSession" @blur="changeStatusSession('closed')" type="button" :status="stsBtn_session" class="ctn-menu_item ctn-btnDropdown position-relative w-auto h-auto m-0 p-0 me-4 border-0">
              <div class="btn-dropdown_content position-relative d-flex align-items-center justify-content-center p-0 m-0 rounded-pill border-0">
                <span class="text-primary fs-6 text-center lh-base fw-bold">PARTICIPA</span>
                <i class="icon i-arrow-solid"></i>
              </div>

              <div class="btn-CtnDropdown_options position-absolute m-0 p-0 w-100 h-auto start-0">
                <p v-for="item in itemsSession" @click="item.action" class="dropdown-option--session position-relative d-block m-0 p-2">
                  <span class="text-decoration-none d-block m-0 p-0 fs-6 text-start lh-base" type-travel="external" target="_blank">
                    {{item.text}} <b v-show="item.bold">{{item.bold}}</b>
                  </span>
                </p>
              </div>
            </button>


            <button @click="changeStatusHamburger" type="button" :status="stsBtn_Hamburger" title="bar" class="ctn-btnHamburguerMenu rounded-circle m-0 p-0 bg-white align-items-center justify-content-center ms-2">
              <i class="icon i-hamburger-menu bg-primary"></i>
              <i class="icon i-close bg-primary"></i>
            </button>
          </div>

        </div>
      </div>

      <div class="headerSura-Ctn_descriptor bg-primary">
        <div class="container-lg d-flex align-items-center justify-content-between">
          <span class="descriptor-business text-white fw-bold">SEGUROS</span>
          <div class="descriptor-items position-relative d-none d-md-flex justify-content-start align-items-stretch m-0 p-0 h-100">
            <p v-for="(value, name) in router.views" @click="$emit('changeRoute', name)" :active="value.name == routeActived" class="item position-relative m-0 p-0 d-flex align-items-center justify-content-center text-white fw-bold lh-base fs-6 me-3 me-lg-4">
              {{value.text.toUpperCase()}}
            </p>
          </div>
        </div>
      </div>

      <div :status="stsBtn_Hamburger" class="headerSura-Ctn_menu w-100 h-auto margin-0 p-0 bg-white start-0 top-100 position-absolute d-block d-md-none">

        <div class="ctn-menu_content position-relative w-100 m-0 py-0 px-3 h-auto mb-3">
          <div class="position-relative w-100 h-auto m-0 p-0 ">
            <button type="button"
              class="ctn-btnProfile bg-white rounded-pill position-relative d-flex align-items-center justify-content-center w-auto h-auto m-0 p-0 my-2">
              <i class="icon i-profile mx-3"></i>
              <span class="text-primary fs-6 text-center lh-base fw-bold me-3">{{firstName}}...</span>
            </button>
          </div>
        </div>

        <div class="ctn-menu_content position-relative w-100 m-0 py-0 px-3 h-auto mb-3">
          <div class="position-relative w-100 h-auto m-0 p-0 ">
            <span v-for="(value, name) in router.views" @click="$emit('changeRoute', name)" class="m-0 py-2 px-0 fw-bold fs-6 text-primary lh-base text-start d-block">{{value.text.toUpperCase()}}</span>
          </div>
        </div>

        <div class="ctn-menu_content position-relative w-100 m-0 p-0">
      
          <div @blur="changeStatusSession('closed')" :status="stsBtn_session" class="ctn-menu_item--session position-relative w-100 p-0 px-2 h-auto">

            <button @click="changeStatusSession" type="button"
              class="ctn-btnDropdown position-relative d-flex align-items-center justify-content-center m-0 p-0 mx-auto border-0 mx-auto my-4">
                <span class="text-primary fs-6 text-center lh-base fw-bold">PARTICIPA</span>
                <i class="icon i-arrow-solid"></i>
            </button>


            <div status="closed" class="btn-CtnDropdown_options posision-relative w-100 h-auto m-0 p-0">
              <p class="dropdown-option--session position-relative w-100 h-auto mx-auto my-0 py-2 px-0 fs-6 text-start">
                <span target="_blank">Sucursal virtual <b>Personas</b>
                </span>
              </p>
            </div>

          </div>

        </div>
      </div>
      
    </header>
  `,
});

// falta montarlo "mount"
