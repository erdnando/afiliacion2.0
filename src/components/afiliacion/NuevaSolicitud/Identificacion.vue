<template >
  <div class="Identificacion">




    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" >
      <v-card >
        <v-card-title>
          <span class="headline">Card ID</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>



               <div align="center">

               
                <div class="image-info" v-if="img">
                  <b>Before: </b>
                  <span>{{ original.size }}</span>
                  <span class="separator"> | </span>
                  <b>After: </b>
                  <span>{{ compressed.size }}</span>
                </div>

                <div class="text-center " v-ripple>
                  <img @click="upload" alt="" style="max-width:400px;border-radius: 3px;width:400px;height:300px;box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px !important;" width="400px" height="300px" :src="img">
                </div>

                <!-- <button class="upload-button button" type="button" @click="upload" >Upload</button> -->
                <compressor class="compressor" :done="getFiles" :scale="scale" :quality="quality" ref="compressor"></compressor>

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

               

              </div>
             

            </v-layout>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close(1)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save(1)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
     props:['open'],
     data(){
       return{
          objSolicitud:{
            avance:0,
            color:'orange'
          },
          img: "https://placehold.it/400x300",
          scale: 100,
          quality: 50,
          originalSize: true,
          original: {},
          compressed: {},
       }
     },
     computed:{
       fechaCreacion: function(){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = mm + '/' + dd + '/' + yyyy;
          return today;
       }
     },
    methods:{
      save(idWin){
        //this.objSolicitud.fechaSolicitud=this.fechaCreacion;
        var porcentaje=0;

        //if(this.objSolicitud.fechaSolicitud.toString().length>0)porcentaje+=25;
        //if(this.objSolicitud.origen.toString().length>0)porcentaje+=25;
        //if(this.objSolicitud.promotor.toString().length>0)porcentaje+=25;
        //if(this.objSolicitud.tienda.toString().length>0)porcentaje+=25;


        this.objSolicitud.avance=porcentaje;
        
        if(porcentaje>=100) this.objSolicitud.color='green';
        else this.objSolicitud.color='orange';

        bus.$emit('afiliacion.newSol.setForm',idWin,this.objSolicitud);
      },
      close(idWin){
        bus.$emit('afiliacion.newSol.closeForm',idWin,this.objSolicitud);
      },
       upload () {
         console.log("on upload");
         
        let compressor = this.$refs.compressor.$el
        console.log("click on compressor");
        compressor.click()
        
      },
      getFiles(obj){
        console.log("on get files:"+obj.compressed.width);
        
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


      }

    },
  
  }
</script>

<style scoped>
.v-dialog {
    position: absolute;
    top: 120px;
}

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