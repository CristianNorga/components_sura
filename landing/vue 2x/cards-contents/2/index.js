Vue.component('drop-info', {
	// props: ['quotas-obtained', 'img-main'],
	props: ['quotas-obtained', 'imgmain', 'pTop'],
	name: 'dropInfo',
	data: function () {
		return {
			isActiveGuide: false,
			isActiveContent: false,
			isActiveContentMain: false,
			textButton: 'Ver más',
			quotas: 40,
		};
	},
	methods: {
		changeStateActive: function () {
			this.isActiveGuide = true;
			this.isActiveContentMain = !this.isActiveContentMain;
		},
		calculeQuotas: function () {
			this.quotasAvaible = this.quotas - parseInt(this.quotasObtained);
		},
	},
	created: function () {
		this.calculeQuotas();
	},
	computed: {
		stylesPAbsolute: function () {
			return {
				position: 'absolute',
				top: (this.pTop || 10) + 'px',
			};
		},
	},
	template: `<div class="container-main--drop-info" style="width:100%;">
              <div class="drop-info-img" style="height:156px;width:100%;position:relative;">
                <transition name="img-main-actived--center">
                  <img v-show="!isActiveContentMain" @click="changeStateActive" data-assetid="237837"
                    :src="this.imgmain"
                    alt="" height="156" width="150" class="img-main--center">
                </transition>
                <transition name="img-main-actived--left">
                  <img v-show="isActiveContentMain" @click="changeStateActive" data-assetid="237837"
                    :src="this.imgmain"
                    alt="" height="156" width="150" class="img-main--left">
                </transition>
                <div :class="[{'display-none': isActiveGuide }]" class="drop-info-toogle" style="position: absolute;left: 57%;top: 97px;">

                <transition name="rotateInUpLeft">
                  <button @click="changeStateActive" v-show="!isActiveContent" style="position: absolute;"> {{ textButton }} </button>
                </transition>
                  
                </div>
                <transition name="backInDown">
                  <p v-show="isActiveContentMain" :style="stylesPAbsolute">
                    <span style="color:#083c71;">
                      <span style="font-size:18px;">
                        <span style="font-family:Barlow,sans-serif;">
                          <b>
                            Aprende lo
                          necesario&nbsp;para
                          empezar&nbsp; a ejercitarte en casa
                          </b>
                        </span>
                      </span>
                    </span>
                  </p>
                </transition>
              </div>
              <transition name="fadeIn">
                <div v-show="!isActiveContentMain" class="drop-info-title" >
                  <p class="text-center">
                    <span style="color:#083c71;">
                      <span style="font-size:18px;">
                        <span style="font-family:Barlow,sans-serif;">
                          <b>
                            Aprende lo
                          necesario&nbsp;para
                          empezar&nbsp; a ejercitarte en casa
                          </b>
                        </span>
                      </span>
                    </span>
                  </p>
                </div>
              </transition>
              <div class="drop-info-content" :class="[{'drop-info-item-actived': isActiveContentMain}]">


                <div style="text-align: center;">
                  <span style="color:#083c71;">
                    <span style="font-size:17px;"><span style="font-family:Barlow,sans-serif;">Lorem
                        ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                        euismod tincidunt ut &nbsp;</span></span></span>
                </div>
                <img data-assetid="237841"
                  src="https://image.comunicaciones.sura.com/lib/fe9712737364067b74/m/25/6a19ab71-ead3-4677-8b02-9cc6741b5967.png"
                  alt="" height="58" width="320"
                  style="display: block; padding: 0px; text-align: center; height: 58px; width: 320px; border: 0px;">

                <div style="text-align: center;padding-top:10px;">
                  <a href="#form" style="text-decoration:none;">
                    <button style="color: #ffffff;font-size: 14px;font-family: Barlow, sans-serif;background: #00aec7;padding: 6px 5px;border-radius: 2px;font-style: italic;border:none;border-radius: 25px" >
                      Contacte acá
                    </button>
                  </a>
                </div>

                
                <div style="text-align: center;padding-top:10px;">
                  <a href="#form" style="text-decoration:none;">
                    <span style="color: rgb(8,60,113);font-size: 14px;font-family: Barlow, sans-serif;background: rgb(233,237,84);padding: 6px 5px;border-radius: 2px;font-style: italic;cursor:no-drop;"
                    v-if="quotasAvaible <= 0">
                      No hay cupos disponibles
                    </span>
                    <span style="color: rgb(255, 255, 255);font-size: 14px;font-family: Barlow, sans-serif;background: rgb(0, 51, 160);padding: 6px 5px;border-radius: 2px;font-style: italic;cursor:pointer;"
                    v-else-if="quotasAvaible == 1">
                      Solo queda 1 cupo disponible!
                    </span>
                    <span style="color: rgb(255, 255, 255);font-size: 14px;font-family: Barlow, sans-serif;background: rgb(0, 51, 160);padding: 6px 5px;border-radius: 2px;font-style: italic;cursor:pointer;"
                    v-else>
                      Hay {{ quotasAvaible }} cupos diponibles
                    </span>
                  </a>
                </div>
                

              </div>
            </div>`,
});

Vue.component('drop-info', {
	// props: ['quotas-obtained', 'img-main'],
	props: [
		'quotas-obtained',
		'imgmain',
		'imgdate',
		'title',
		'description',
		'pTop',
	],
	name: 'dropInfo',
	data: function () {
		return {
			isActiveGuide: false,
			isActiveContent: false,
			isActiveContentMain: false,
			textButton: 'Ver más',
			quotas: 5000,
		};
	},
	methods: {
		changeStateActive: function () {
			this.isActiveGuide = !this.isActiveGuide;
			this.isActiveContentMain = !this.isActiveContentMain;
		},
		calculeQuotas: function () {
			this.quotasAvaible = this.quotas - parseInt(this.quotasObtained);
		},
	},
	computed: {
		stylesPAbsolute: function () {
			return {
				position: 'absolute',
				top: (this.pTop || 10) + 'px',
			};
		},
	},
	created: function () {
		this.calculeQuotas();
	},
	template: `<div class="container-main--drop-info" style="width:100%;">
              <div class="drop-info-img" style="height:156px;width:100%;position:relative;overflow:hidden;">
                <transition name="img-main-actived--center">
                  <img v-show="!isActiveContentMain" @click="changeStateActive" data-assetid="237837"
                    :src="this.imgmain"
                    alt="" height="156" width="150" class="img-main--center">
                </transition>
                <transition name="img-main-actived--left">
                  <img v-show="isActiveContentMain" @click="changeStateActive" data-assetid="237837"
                    :src="this.imgmain"
                    alt="" height="156" width="150" class="img-main--left">
                </transition>
                <div :class="[{'display-none': isActiveGuide }]" class="drop-info-toogle" style="position: absolute;left: 57%;top: 97px;">

                <transition name="rotateInUpLeft">
                  <button @click="changeStateActive" v-show="!isActiveContent" style="position: absolute;"> {{ textButton }} </button>
                </transition>
                  
                </div>
                <transition name="backInDown">
                  <p v-show="isActiveContentMain" :style="stylesPAbsolute">
                    <span style="color:#083c71;">
                      <span style="font-size:18px;">
                        <span style="font-family:Barlow,sans-serif;">
                          <b>
                            {{ title }}
                          </b>
                        </span>
                      </span>
                    </span>
                  </p>
                </transition>
              </div>
              <transition name="fadeIn">
                <div v-show="!isActiveContentMain" class="drop-info-title" >
                  <p class="text-center">
                    <span style="color:#083c71;">
                      <span style="font-size:18px;">
                        <span style="font-family:Barlow,sans-serif;">
                          <b>
                            {{ title }}
                          </b>
                        </span>
                      </span>
                    </span>
                  </p>
                </div>
              </transition>
              <div class="drop-info-content" :class="[{'drop-info-item-actived': isActiveContentMain}]">


                <div style="text-align: center;">
                  <span style="color:#083c71;">
                    <span style="font-size:17px;"><span style="font-family:Barlow,sans-serif;">{{ description }}</span></span></span>
                </div>
                <img data-assetid="237841"
                  :src="this.imgdate"
                  alt="" height="58" width="320"
                  style="display: block; padding: 0px; text-align: center; height: 58px; width: 320px; border: 0px;">

                <!--<div style="text-align: center;padding-top:10px;">
                  <a href="#form" style="text-decoration:none;">
                    <span style="color: rgb(8,60,113);font-size: 14px;font-family: Barlow, sans-serif;background: rgb(233,237,84);padding: 6px 5px;border-radius: 2px;font-style: italic;cursor:no-drop;"
                    v-if="quotasAvaible <= 0">
                      No hay cupos disponibles
                    </span>
                    <span style="color: rgb(255, 255, 255);font-size: 14px;font-family: Barlow, sans-serif;background: rgb(0, 51, 160);padding: 6px 5px;border-radius: 2px;font-style: italic;cursor:pointer;"
                    v-else-if="quotasAvaible == 1">
                      Solo queda 1 cupo disponible!
                    </span>
                    <span style="color: rgb(255, 255, 255);font-size: 14px;font-family: Barlow, sans-serif;background: rgb(0, 51, 160);padding: 6px 5px;border-radius: 2px;font-style: italic;cursor:pointer;"
                    v-else>
                      Hay {{ quotasAvaible }} cupos diponibles
                    </span>
                  </a>
                </div>-->
                

              </div>
            </div>`,
});

var app = new Vue({
	el: '#content-vue',
});