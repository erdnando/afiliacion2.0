<template >
  <div class="UploadRow">
    <v-layout row  justify-center>
      <v-layout row>
            <v-flex  xs12 style="">
            <div v-ripple>
                <div class="image-info" v-if="img" style="text-align: -webkit-center;">
                <b>Before: </b>
                <span>{{ original.size }}</span>
                <span class="separator"> | </span>
                <b>After: </b>
                <span>{{ compressed.size }}</span>
                </div>
                <div class="text-center " style="cursor:pointer;">
                <img  @click="upload" alt="" 
                      style="object-fit: contain;max-width:200px;border-radius: 6px;width:200px;height:150px;box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px !important;" 
                      width="200px" height="150px" :src="img">
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
     props:['categoria','folio','imagenFondo'],
     data(){
       return{
          originalSize: true,
          original: {},
          compressed: {},
          img:'',
          quality:60,
          scale:100,
       }
     },
     mounted() {
        this.img=this.imagenFondo;

         
    },
     computed:{
     
       
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
        console.log("regreso del compresor...");
      console.log(obj);

      //this.obj.base64;
      //this.obj.file.lastModifiedDate;
      //this.obj.file.name;
      //this.obj.file.size;
      //this.obj.file.type;
      //this.obj.size;
      //this.obj.name;

    
        //TODO call ocr ws and show results
        console.log("Anexando archivo al CM :"+this.folio + "-"+this.categoria);
        
        var my_time1 = new Date(); // date object 
        my_time1=my_time1.getTime(); // first time variable
        //TODO emit when the image is loaded
        bus.$emit('afiliacion.upload.categoria',this.categoria);
         this.cmProcess(obj.base64,my_time1,this.categoria,'');
       
      },
    async cmProcess(string64,my_time1,nombre,paterno){
          //console.log("----------CM----------");
          //console.log(this.folio);
          //console.log(this.categoria);
          //console.log("----------CM----------");
          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/loadImgStr64ToCM',
                timeout: 13500 * 1, // Wait for 13.5 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  pImgS64: string64.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", ""),
                  idTramite: this.folio,
                  categoria: this.categoria,
                  lang: 'eng',
                  contraste: '200',
                  ext: '',
                  nombre: nombre,
                  paterno: paterno
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