<template >
  <div class="UploadRow">
    <v-layout row  justify-center>
      <v-layout row>
            <v-flex  xs12 style="">
            <div v-ripple>
               
                <div class="text-center " style="cursor:pointer;">
                  <img  @click="upload" alt="" 
                        style="height: 40px;background-color: orange;box-shadow: rgba(10, 0, 0, 0.2) 10px 8px 10px -5px, rgba(0, 0, 0, 0.44) 10px 16px 18px 2px, rgba(0, 0, 0, 0.42) 0px 0px 30px 0px !important;border-radius: 20px;border-color: darkorange;border-width: 2px;border-style: solid;!important;" 
                        :src="imagenFondo">
                </div>
            </div>
            </v-flex>
        </v-layout>

        <file-uploader class="compressor" :done="getFiles" :scale="scale" :quality="quality"  ref="compressor"></file-uploader>

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
  import axios from "axios";
  import {bus} from '../../main.js'
  import FileUploader from '@/components/utils/FileUploader'

   export default {
       components: {
        FileUploader
    },
     props:['folio'],
     data(){
       return{
          originalSize: true,
          original: {},
          compressed: {},
          quality:60,
          scale:100
       }
     },
     mounted() {
        //this.img=this.imagenFondo;

       this.$store.commit('generaIdCategoria');
       this.categoria = this.$store.state.folioGeneradoCategoria;
         
    },
     computed:{
      imagenFondo () {
       return require('../../assets/addFile.png')
       }
       
     },
      created(){
       
    },
    updated(){
        // bus.$on('afiliacion.upload.reload',(categoria)=>{
        //     this.img=this.imagenFondo='https://placehold.it/400x300'
        // });
    },
    methods:{
       upload () {
       
        let compressor = this.$refs.compressor.$el
        console.log(compressor);
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
        //console.log("regreso del compresor...");
        console.log(obj);
      
        //TODO call ocr ws and show results
        console.log("Anexando archivo al CM :"+this.folio + "-"+this.categoria);
        
        var my_time1 = new Date(); // date object 
        my_time1=my_time1.getTime(); // first time variable

        //TODO emit when the image is loaded
        bus.$emit('afiliacion.upload.categoria',this.categoria);

         //this.cmProcess(obj.base64, my_time1, obj.file.name);
         this.cmProcess(obj.compressed.base64, my_time1, obj.compressed.name);
         this.$store.commit('adddigitalFile',"File added: "+this.folio + "-"+this.categoria + " ("+ obj.compressed.name+")" );
         this.categoria++;
         //console.log("el id de categoria ahora es:");
         //console.log(this.categoria);
         
       
      },
    async cmProcess(string64, my_time1, nombre){
          console.log("----------CM----------");
          //console.log(string64);
          console.log(this.folio);
          console.log(this.categoria);
          console.log(nombre);

          var arr64 = string64.split(',');
          //console.log("----------CM----------");
          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/loadBase64ToCM',
                timeout: 53500 * 1, // Wait for 13.5 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  pImgS64: arr64[1],
                  idTramite: this.folio,
                  categoria: this.categoria,
                  nombre: nombre
                }
              })
                .then(response => {
                  console.log("CM...."+response);
                })
                .catch(error => {
                  console.log("Enviado a CM....Timeout"+error);
                  //console.log(error);
              });
    }

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