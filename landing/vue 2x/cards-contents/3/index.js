Vue.component('cpse-transmitter-item', {
	props: ['textPrimary', 'transmitterAction', 'transmitterName', 'elActived'],
  // data: function () {
  //   return {
  //     isActive: false,
  //   };
  // },
	methods: {
		toDo: function () {
			if (this.elActived != this.transmitterName) {
				this.transmitterAction(this.transmitterName);
			} else {
				this.transmitterAction(null);
			}
		},
	},
  computed: {
    classObject: function () {
      return {
        'transmitter-itemImgCt--actived': this.elActived == this.transmitterName,
      };
    }
  },
	template: `
  <div class="col" style="max-width: 136px;">
    <div class="cpse_transmitter-itemCt">
      <div @click="toDo" :class="classObject" class="cpse_transmitter-itemImgCt"></div>
      <div class="cpse_transmitter-itemTxtP">{{textPrimary}}</div>
      <div @click="toDo" class="cpse_transmitter-itemLk">
        {{
          elActived == transmitterName ? 'Ver menos' : 'Ver más'
        }}
      </div>
    </div>
  </div>`,
});

Vue.component('cpse-content-item', {
	props: ['textTest', 'receiverAction'],
	methods: {
		toDo: function () {
			this.receiverAction(null);
		},
	},
	template: `
  <div class="cpse-content-item">
    <div class="row" style="width:100%;">
      <div class="col-sm-3 ps-0">
        <div class="cpse_content-itemImgCt"></div>
      </div>
      <div class="col-sm-9">
        <div class="cpse_content-itemClseCt--x">
          <div @click="toDo" class="cpse_content-itemClse--x">x</div>
        </div>
        <div>
          <span class="cpse_content-itemTxt--title"
          >
            SOAT {{ textTest }}
          </span>
        </div>
        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
          veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
          iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
          nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euis-</div>
        <div style="background: #44aa1c;margin: 15px 0px 0px 0px;width: 400px;height: 200px;"></div>
  
      </div>
    </div>
    <div @click="toDo" class="cpse_content-itemClse--btn">Ver menos</div>
  </div>`,
});

var app = new Vue({
	el: '#app',
	data: {
		elActived: null,
	},
	methods: {
		showDropInfo: function (el) {
			this.elActived = el;
		},
	},
	template: `
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <cpse-transmitter-item v-bind:el-actived="elActived" v-bind:transmitter-action="showDropInfo" text-primary="Seguros Lorem ipsum dolor." transmitter-name="soat"></cpse-transmitter-item>
        <cpse-transmitter-item v-bind:el-actived="elActived" v-bind:transmitter-action="showDropInfo" text-primary="Seguros Lorem ipsum dolor." transmitter-name="test"></cpse-transmitter-item>
      </div>
    </div>
    <div class="cpse_content-itemCt">
      <transition-group name="slide-fade">
        <cpse-content-item key="1" :class="{'position-absolute': elActived == 'soat'}" v-show="elActived == 'soat'" text-test="1" v-bind:receiver-action="showDropInfo"></cpse-content-item>
        <cpse-content-item key="2" :class="{'position-absolute': elActived == 'test'}" v-show="elActived == 'test'" text-test="2" v-bind:receiver-action="showDropInfo"></cpse-content-item>
      </transition-group>
    </div>
  </div>`,
});