<template >
  <div class="Uploader">
    <v-layout row  justify-center>
      <v-layout row>
            <v-flex  xs12 style="margin-left: -8px;margin-right: 35px;">
            <div v-ripple>
                <div class="image-info" v-if="img">
                <b>Before: </b>
                <span>{{ original.size }}</span>
                <span class="separator"> | </span>
                <b>After: </b>
                <span>{{ compressed.size }}</span>
                </div>
                <div class="text-center " >
                <img   @click="upload" alt="" style="max-width:400px;border-radius: 3px;width:400px;height:300px;box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px !important;" width="400px" height="300px" :src="img">
            </div>
            </div>
            </v-flex>
        </v-layout>

        <compressor class="compressor" :done="getFiles" :scale="scale" :quality="quality"  ref="compressor"></compressor>
        <div class="checkbox" style="visibility:hidden;position:absolute;height: 0px;margin: 0px;">
            <input type="checkbox" v-model="originalSize">
            <span>Responsive Image?</span>
        </div>
        <div class="input-group" style="visibility:hidden;position:absolute;height: 0px;margin: 0px;">
            <label>Image Scale</label>
            <input type="number" v-model="scale">
        </div>
        <div class="input-group" style="visibility:hidden;position:absolute;height: 0px;margin: 0px;">
            <label>Image Quality</label>
            <input type="number" v-model="quality">
        </div> 
    </v-layout>
  </div>
</template>

<script>
import {bus} from '../../../main.js'
 import Compressor from '@/components/afiliacion/NuevaSolicitud/Compressor'

   export default {
       components: {
        Compressor
    },
     props:['categoria','expediente','imagenFondo'],
     data(){
       return{
          scale: 100,
          quality: 50,
          originalSize: true,
          original: {},
          compressed: {},
          img:''
       }
     },
     mounted() {
        this.img=this.imagenFondo;
    },
     computed:{
      
       
     },
    methods:{
       upload () {
        let compressor = this.$refs.compressor.$el
        compressor.click()
        
      },
      getFiles(obj){
        if(obj.compressed.width==0){
            if(this.scale==100){
            this.scale=99;
          }else{
            this.scale=100;
          }
          return;
          }
        this.img = obj.compressed.blob
        this.original = obj.original
        this.compressed = obj.compressed
        //TODO call ocr ws and show results
        console.log("Anexando archivo al CM :"+this.expediente + "-"+this.categoria);
      },
     

    },
  
  }
</script>

<style scoped>


 body {
    font-family: Roboto;
  }
  p {
    margin-bottom: 25px;
  }
  .image-info {
    margin: 15px 0;
  }
  .separator {
    margin: 0 5px;
  }
  input {
    width: 75%;
    display: block;
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
    max-width: 250px;
    border: 2px solid #DDD;
  }
  input:focus {
    border: 2px solid blue;
  }
  .compressor {
    display: none;
  }
  .button {
    display: inline-block;
    border-radius: 3px;
    background: #1A237E;
    color: white;
    padding: 7px 15px;
    border: 0;
    box-shadow: 0px 2px 4px 1px rgba(0,0,0,.4);
    margin-bottom: 10px;
    cursor: pointer;
    outline: none;
    text-decoration: none;
  }
  label {
    margin-bottom: 10px;
    display: block;
  }
  .input-group {
    margin: 25px 0;
  }
  .checkbox {
    margin: 15px 0 20px;
    background: #EEE;
    padding: 10px 0;
  }
  .checkbox input {
    width: auto;
    display: inline-block;
  }
  img {
    margin: 0 auto;
    display: block;
  }
  a {
    margin: 25px 0 75px;
  }
</style>