<template>
  <div v-bind:class="flipped ? 'flip-container flipped': 'flip-container'">
    <div class="flipper">
      <div class="front">
        <slot name="front"></slot>
        <v-icon class="frontFlipBtn" v-on:click="giraTrue" >
            3d_rotation
        </v-icon>
      </div>
      <div class="back" :style="{'visibility':pdfVisivilidad}">
        <slot name="back" :style="{'visibility':pdfVisivilidad}"></slot>
        <v-icon class="backFlipBtn" v-on:click="giraFalse">
            3d_rotation
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>

import {bus} from '@/main.js'

export default {
  name: 'FlipCard',
  methods:{
    giraTrue(){
      console.log('visible');
       this.pdfVisivilidad = 'visible';
       this.flipped=true
      //bus.giraTarjetaBusqueda(true);
    },
     giraFalse(){
       console.log('invisible');
        this.pdfVisivilidad = 'collapse';
        this.flipped=false
      //bus.giraTarjetaBusqueda(false);
    }
  },
  data: function() {
    return {
        flipped: false,
        pdfVisivilidad:'collapse'
    };
  }
};
</script>

<style type='text/css' scoped>
i.frontFlipBtn,
i.backFlipBtn {
    position:absolute; 
    right: 20px; 
    top: 0px;
    color:rgb(17, 17, 17);
}
i.backFlipBtn {
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
}
.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flip-container {
  min-height: 120px;
}
.flipper {
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.front {
  z-index: 2;
}
</style>