Vue.component('drop-info', {
	name: 'dropInfo',
	data: function () {
		return {
			isActiveGuide: false,
			isActiveContent: false,
			isActiveTitle: false,
		};
	},
	methods: {
		changeStateActive: function () {
			this.isActiveGuide = true;
			this.isActiveTitle = !this.isActiveTitle;
		},
		readMore: function () {
			this.isActiveContent = !this.isActiveContent;
		},
	},
	template: `<div class="container-main--drop-info" style="width:100%;">
              <div class="drop-info-img" style="height:156px;width:100%;position:relative;">
                <img @click="changeStateActive" class="img-main" data-assetid="237837"
                  src="https://image.comunicaciones.sura.com/lib/fe9712737364067b74/m/25/e896f9b1-833b-40a4-be71-313db6b9de60.png"
                  alt="" height="156" width="150">
                <div :class="[{'display-none': isActiveGuide }]" class="drop-info-toogle" style="position: absolute;left: 57%;top: 97px;">
                  <img src="./icons8-cursor.svg">
                </div>
                <p v-show="isActiveTitle" style="position: absolute;">
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
                  <transition-group name="rotateInUpLeft" tag="span">
                    <button :key="1" v-show="!isActiveContent" @click="readMore" style="position: absolute;margin-left: -34px;"> Ver más </button>
                    <button :key="2" v-show="isActiveContent" @click="readMore" style="position: absolute;margin-left: -41px;"> Ver menos </button>
                  </transition-group>
                </p>
              </div>
              <div v-show="!isActiveTitle" class="drop-info-title" >
                <p>
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
              <div class="drop-info-content" :class="[{'drop-info-item-actived': isActiveContent}]">


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

              </div>
            </div>`,
});

var app = new Vue({
  el: '#app',
});