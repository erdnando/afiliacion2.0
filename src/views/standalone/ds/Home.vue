<template >
  <div class="ds">
   
    
     <v-container fluid >
     
       <section>
        <v-parallax :src="section1" height="420">
          <v-layout column align-center justify-center>
            <div class="display-2 white--text mb-3 text-xs-center">Digital Docs</div>
            <em class="headline">Extract data from your documents and generate information</em>
            <v-btn v-if="botonDeshabilitado" class="blue lighten-2 mt-5" dark large @click="openModalDS">
              Getting started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

        <section>
        <v-layout column wrap class="my-1" align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">zoom_in</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Digital channels</div>
                    </v-card-title>
                    <v-card-text>
                      The vast majority of banks believe that by 2020 most of their sales operations will have shifted from their branches to digital channels, mostly web and mobile applications.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">domain</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">End-to-end digital origination</div>
                    </v-card-title>
                    <v-card-text>
                      Strong digital sales capabilities and streamlined, end-to-end digital origination processes must play an integral role in any strategy. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">scatter_plot</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">New digital entrants</div>
                    </v-card-title>
                    <v-card-text>
                      In the short-term high-turnover products such as credit cards, loans and payments will most likely undergo the most rapid digital transformation. In fact, these are the areas most under attack from new digital entrants. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

     </v-container>
     <!-- <v-layout row justify-center>
        <v-dialog :persistent=true v-model="dialog" width="500">
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
              Ingrese sus credenciales
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat  @click="login">
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-layout> -->
     <v-layout row justify-center>
        <v-dialog :persistent=true v-model="dialogFacePhi" width="460px" height="600px" >
          <v-card>
            <v-card-title  class="headline grey lighten-2" primary-title>
             Enter your credentials
            </v-card-title>
            <v-card-text>
              <!-- stepper-->
                 <v-stepper v-model="e1">
                        <v-stepper-header>
                          <v-stepper-step color="green" :complete="e1 > 1" step="1">Commercial</v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step color="green" :complete="e1 > 2" step="2">Face biometrics</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content step="1" style="width:440px;height:400px">
                            <v-card class="mb-5" color="white lighten-1"  style="height:304px;width:390px">
                              <!-- Paso 1 -->
                              <v-form @submit.prevent="validateStep1"
                                  ref="form" v-model="valid" lazy-validation>
                                  <p style="text-align: justify;margin-right: 5px;">
                                    You are about to enter a demo application.<br>
                                    <br>The presentations are for demonstrative use.
                                    <br>Information about your location and behavior in the application will be collected.
                                    <br>
                                    <br>Please enter your email registered in the biometric:
                                    </p>
                                  <v-text-field autofocus v-model="emailAuth" :rules="emailRules" style="width: 95%;"  label="E-mail"  required></v-text-field>
                                </v-form>
                                <!-- Paso 1 -->
                              </v-card>
                            <v-btn :disabled="!valid"  color="green" @click="validateStep1" style="position: absolute;right:14px;margin-top: -29px;">Continue</v-btn>
                            <v-btn  flat style="position: absolute;right: 123px;margin-top: -29px;" @click="gotoHome">Cancel</v-btn>
                          </v-stepper-content>

                          <v-stepper-content step="2" style="width: 470px;height:400px" >
                            <v-card class="mb-5" color="white lighten-1"  style="height:440px;width:423px;overflow: hidden;">
                              <!-- Paso 2 -->
                                    <iframe v-bind:src="urlFacePhiAuth" id="iframex" sandbox="allow-same-origin allow-scripts" style="height: 440px;width:579px;top:-70px;overflow: hidden;position:absolute;right:-60px;zoom: 0.89;-moz-transform: scale(0.89);-moz-transform-origin: 0 0;-o-transform: scale(0.89);-o-transform-origin: 0 0;-webkit-transform: scale(0.89);-webkit-transform-origin: 0 0;"></iframe>
                                <!-- Paso 2 -->
                              </v-card>
                              
                              <div id="divMsg" style="position: absolute;right:-144pxpx;margin-top: -153px;">{{emailAuth}}</div>
                               <v-btn  flat style="position: absolute;right:0px;margin-top: -160px;" @click="back">Back</v-btn>
                                <v-btn  flat style="position: absolute;right:88px;margin-top: -160px;" @click="login">Omit</v-btn>
                          </v-stepper-content>
 
                        
                        </v-stepper-items>
                      </v-stepper>
              <!-- stepper-->
            </v-card-text>
            <v-divider></v-divider>
           
          </v-card>
        </v-dialog>
    </v-layout>


    <v-layout row  justify-center >
    <v-dialog  v-model="buscador" persistent max-width="900" >
        <template >
        <div>
          <v-toolbar color="indigo" dark tabs>
            <template>
              <v-combobox @keyup.enter="busqueda" style="margin-top: 10px;color:black" autofocus background-color="#8C9EFF"  v-model="chips" :items="elementos" label="Search" chips clearable append-icon="search" solo multiple>
                <template v-slot:selection="data">
                  <v-chip color="green" :selected="data.selected" close @input="remove(data.item)">
                    <strong>{{ data.item }}</strong>&nbsp;
                  </v-chip>
                </template>
              </v-combobox>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn @click="close" color="orange" style="height: 46px;">Close</v-btn>
            </template>
            <template v-slot:extension>
              <v-tabs v-model="tabs" centered color="transparent" slider-color="white">
                <v-tab >
                Search panel
                </v-tab>

                <v-tab>
                  Upload new files
                </v-tab>

                <v-tab>
                  How it works!
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs">

            <v-tab-item >
              <v-card>
                <v-card-text >
                  <template>
                      <v-card>
                        <v-layout justify-space-between pa-3>
                          <v-flex xs5 style="max-width:30%;height: 380px;overflow-y: scroll;">
                           <span v-if="hayDatos" id ="contador">{{countDatos}}</span>
                            <v-treeview :active.sync="active" :items="items" expand-icon="image_search" 
                              activatable 
                              :open.sync="open"
                              active-class="green--text font-weight-bold"
                              class="grey lighten-5"  transition>
                              <template  v-slot:prepend="{ item, active }">
                                <v-icon style="cursor:pointer" v-if="!item.children" :color="active ? 'green' : ''">folder</v-icon>
                                <span  style="cursor:pointer">{{clean(item.id)}}</span>
                              </template>
                            </v-treeview>

                          </v-flex>
                          <v-flex d-flex text-xs-center style="margin: -16px;max-width: 70%;">
                            <v-scroll-y-transition mode="out-in">
                              <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center;">
                                <!-- Select a file -->
                               <v-card style="margin-left: 20px;">
                                  <v-img
                                    class="white--text"
                                    height="200px"
                                    src="https://5wbts45dnuj11q6172p5dkzf-wpengine.netdna-ssl.com/wp-content/uploads/Sensitive-Data-780x405.jpg"
                                  >
                                    <v-container fill-height fluid>
                                      <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                          <span class="headline">Digital docs</span>
                                        </v-flex>
                                      </v-layout>
                                    </v-container>
                                  </v-img>
                                  <v-card-title>
                                    <div>
                                      <span v-html="instruccion1"></span><br>
                                      <span></span><br>
                                      <span class="grey--text">To create a digital file go to the file upload tab</span>
                                    </div>
                                  </v-card-title>
                                  <v-card-actions>
                                    
                                  </v-card-actions>
                                </v-card>
                              </div>
                              <v-card v-else :key="selected.id"  flat >
                                <v-card-text>
                                 <iframe  style="border-style: hidden;height:380px;width:100%;" v-bind:src= "getUrl(selected.id)"  class="framePDF" :onload="docLoaded('link')" ></iframe>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-layout tag="v-card-text" text-xs-left wrap>
                                  <v-flex tag="strong" xs12 text-xs-center mr-3 mb-2>Metadata:</v-flex>
                                  <v-flex id="metadatax"  style="font-style: italic;max-width:100%;height: 80px;overflow-y: scroll;width: 400px;">
                                      <span v-html=markWord(selected.content[0])></span>
                                     </v-flex>
                                </v-layout>
                              </v-card>
                            </v-scroll-y-transition>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </template>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item >
              <v-card>
                <v-card-text>
                  <!-- tab2 -->
                 <v-card >
                    <v-card-title class="indigo lighten">
                      <!-- <span class="headline white--text">Documents</span> -->
                       <v-btn @click="generarFolio" color="green" >Generate digital file</v-btn>
                      <v-spacer></v-spacer>
                       <span class="headline orange--text" >&nbsp;&nbsp;{{folio}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <upload-row class="heart" v-show="vistaUploader" v-bind:folio="folio"  style="" ></upload-row>
                       
                    </v-card-title>
                    <v-card-text>
                      <v-container fluid style="margin-top: -40px;">

                        <!-- caerga de imagenes-->
                        <v-layout row inline v-show="vistaUploader">
                          <v-flex  md12 lg12 xl12 style="" >
                           <v-card style="margin-top:14px">
                                <v-card-title class="subheading font-weight-bold">Content (large files >6mb can take up to 5 minutes to index)</v-card-title>
                                <v-divider></v-divider>

                                <v-list dense v-for="item in filesAdded" :key="item">
                                  <v-list-tile>
                                    <v-list-tile-content class="align-start">{{ item }}</v-list-tile-content>
                                  </v-list-tile>

                                </v-list>
                              </v-card>
                          </v-flex>
                        </v-layout>
                       
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                     
                    </v-card-actions>
                  </v-card>
                  <!-- tab2 -->
                </v-card-text>
              </v-card>
            </v-tab-item>

             <v-tab-item >
              <v-card>
                <v-card-text >
                  <template>
                      <v-card style="margin-left: 20px;">
                                  <v-img
                                    contain :aspect-ratio="16/9"
                                    height="265px"
                                    :src="inverted"
                                  >
                                    <v-container fill-height fluid>
                                      <v-layout fill-height>
                                       
                                      </v-layout>
                                    </v-container>
                                  </v-img>
                                  <v-card-title>
                                    <div>
                                      <span>
                                        We use inverted index. Most of the search engines are using an inverted index data structure to achieve better search performance. In the inverted index, all the search terms will be having associated document ids. Once the user issues a query, it will search for the terms and the associated documents. It is the optimized way to get fast search results from the search engine.
                                        </span><br>
                                      <span></span><br>
                                      <span class="grey--text">We can to integrate to your content managment too!</span>
                                    </div>
                                  </v-card-title>
                                  <v-card-actions>
                                    
                                  </v-card-actions>
                                </v-card>
                    </template>
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs-items>
        </div>
      </template>


    </v-dialog>
  </v-layout>
 

     <v-card>
      <v-snackbar
        v-model="snackbar"
        :bottom=false
        :color="colorNotificacion"
        :left=false
        :multi-line=true
        :right=true
        :timeout=3000
        :top=false
        :vertical=false
      >
        {{ mensajeNotifica }}
        <v-btn
          flat
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </v-snackbar>
    </v-card>

    

     <v-btn id="btnLogin" color="primary" flat  @click="login" style="visibility: hidden;">Accept</v-btn>
     <input type="hidden" id="facephifield" v-model="facephiID" name="facephifield">
  </div>
</template>

<script>

import {bus} from '../../../main.js'
import axios from "axios";
import UploadRow from '@/components/utils/UploadRow'

   export default {
     components: {
    UploadRow
    },
    data(){
      return {
        dialogFacePhi: true,
        buscador: false,
        search:'',
        snackbar:false,
        mensajeNotifica:'',
        colorNotificacion:'',
        botonDeshabilitado:false,
        tabs: 0,
        active: [],
        avatar: null,
        open: [],
        users: [],
         chips: [],
        elementos: [],
        resultados: [],
        lblResultados:'Results',
        abierto:false,
        hayDatos:false,
        countDatos:0,
        pdfviewer:'https://drive.google.com/viewerng/viewer?embedded=true&hl=es&url=https://sminet.com.mx/docs/',
        pdfviewermine:'https://sminet.com.mx/fintech.viewer/viewer.html?file=https://sminet.com.mx/docs/',
        officeviewer:'https://view.officeapps.live.com/op/view.aspx?src=https://sminet.com.mx/docs/',
        urlPDF:'',
        subtitulo:'Load the images and then process them (jpg,png,bmp)',
        folio:'',
        categoria:1,
        vistaUploader:false,
        fondoAnverso:'https://placehold.it/200x150',
        fondoReverso:'https://placehold.it/200x150',
        instruccion1:'You can enter a query based on your digital file identifier or simply search for keywords within the indexed documents after an enter (try with the digital file <SPAN class="font-weight-bold">F080564859</SPAN>)',
        urlFacePhiBase:'',
        e1: 0,
        valid: true,
        emailAuth: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        facephiID:''
      }
    },
    methods:{
      openModalDS(){
        this.buscador=true;
      },
      close(){
        this.buscador=false;
      },
      login(){
        this.dialog = false;
        // implementacion en navbar
        //bus.$emit('loginApp', {"user":"admin","pwd":"12345","app":"Digital Docs"});
         this.dialogFacePhi = false;
        bus.$emit('login', {"user":this.emailAuth,"pwd":"************","app":"Digital Docs","drawer":false,"solucion":"Document Solutions","version":"1.0"});
         var iframe = document.getElementById('iframex');
       iframe.src="";
       this.botonDeshabilitado=true;
      },
      validateStep1 () {
        if (this.$refs.form.validate()) {
          this.validaMailInDB();
        }
      },
      validaMailInDB(){
         bus.$emit('afiliacion.loading.ini','');
         axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/logMailFace',
                timeout: 12000 * 1, // Wait for 2 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  mail: this.emailAuth
                }
              })
                .then(response => {
                  console.log(response.data);
                  if(response.data == 'OK'){
                       //this.snackbar = true
                    this.e1 = '2';
                    this.urlFacePhiBase='/facephi/auth/index.html?name=';

                    var divMsg = document.getElementById('divMsg');
                    divMsg.style.color='black';
                    divMsg.innerText=this.emailAuth;
                    bus.$emit('afiliacion.loading.end','');
                    var iframe = document.getElementById('iframex');
                    
                    iframe.contentWindow.location.reload();
                  }
                  else {
                    bus.$emit('afiliacion.loading.end','');
                    //bus.$emit('afiliacion.notifica','Email not found. Please register before using this application.');
                    this.snackbar = true;
                    this.colorNotificacion="red";
                    this.mensajeNotifica='Email not found. Please register before using this application.';
                    }
                })
                .catch(error => {
                  bus.$emit('afiliacion.loading.end','');
                  console.log(error);
              });
          
      },
      gotoHome(){
         this.dialogFacePhi=false
          bus.$emit('afiliacion.goTo','/fintech')

      },
      back(){
         this.e1 = '1';
      },
      omit(){
         this.login();
      },
       remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
      clean(fileSolr){
       if(fileSolr == undefined)return;

           var arrFileFull = fileSolr.split('\\');
           var file = arrFileFull[arrFileFull.length-1];
           //var arrFile = file.split('.');
          return file;//arrFile[0];
      },
      getExtension(fileSolr){
       if(fileSolr == undefined)return;

          try{
            var arrFileFull = fileSolr.split('\\');
            var file = arrFileFull[arrFileFull.length-1];
            var arrFile = file.split('.');
          return arrFile[1];
          }catch(error){
             console.log(error);
             return "pdf";
          }
          
      },
      markWord(contenido){
        console.log("mark word...");
        console.log(this.chips);
        var word="";

        if(contenido == undefined)return;


        if(this.chips != undefined){
          if(this.chips.length>1){
            word = this.chips[this.chips.length-1];
            if(contenido  != undefined || word  != undefined)
            contenido=contenido.toUpperCase().replace(word.toUpperCase(),"<strong>"+word.toUpperCase()+"</strong>");
          }else{
             word = this.chips[0];
              if(contenido  != undefined && word  != undefined)
                 contenido=contenido.toUpperCase().replace(word.toUpperCase(),"<strong>"+word.toUpperCase()+"</strong>");
          }
        }

       return contenido;
      },
      busqueda(){
        bus.$emit('afiliacion.loading.ini','');
          jsonObj =[];
          this.resultados = [];
          var jsonObj = [];
          //var item = {};
          this.hayDatos=false;
          this.countDatos=0;
          this.active= [];
          this.tabs=0;
  
          //arma request
          for(var i=0;i<this.chips.length;i++){
              jsonObj.push({'Q': this.chips[i]});
          }

          if(jsonObj.length==1)
            jsonObj.push({'Q':''});

          if(jsonObj.length==1){
            bus.$emit('afiliacion.loading.end','');
            return;
            }
          
          //cal ws solr
          console.log('solr::::::::');
          
          console.log(jsonObj);
          
          this.consultaSolr(jsonObj);
      },
      getUrl(param){
        console.log("url a mostrar..."+param);
        //D:\solr\example\exampledocs\F1000920-5.pdf
        //F0101701412-1.pdf&word=erdnando


        if(param.toUpperCase().endsWith("PDF")){
            var word="";

            if(this.chips != undefined){
              if(this.chips.length>1){
                word = this.chips[this.chips.length-1];
              }else{
                word = this.chips[0];
              }
            }
            //console.log("aqui....");
            //console.log(word);
            if(word != '' && word != undefined)
              return this.pdfviewermine+this.clean(param)+"&word="+word.trim();
            else
              return this.pdfviewermine+this.clean(param);
        }else{
          return this.pdfviewer+this.clean(param);
        }



      },
       docLoaded(arg){
            //console.log("archivo cargado...");
            if(arg == 'link'){
              setTimeout(function(){ bus.$emit('afiliacion.loading.end',''); }, 2000);
              
            }
          },
      crop(metadata){
       
        var metaaux = metadata.replace(/(?:\r\n|\r|\n)/g, '');
         if(metaaux.length > 400)
         return metaaux.substring(0,399)+"...";
         else return metaaux;
      },
      async consultaSolr(objConsulta){
        //console.log(objConsulta);
          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/selectm',
                timeout: 1000 * 20, // Wait for 10 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  querys: objConsulta
                }
              })
                .then(response => {
                  // console.log("call solr...");
                   //console.log(response.data.response.docs);
                   var arrR= response.data.response.docs;

                   //remove records without extension
                   for(var i = arrR.length - 1; i >= 0; i--) {
                      if( !this.tieneExtension(arrR[i].id)) {
                          arrR.splice(i, 1);
                      }
                  }

                  
                  this.resultados = arrR;

                  if(arrR.length>0){
                    //console.log("con datos");
                    this.countDatos=arrR.length;
                    this.hayDatos=true;
                    this.lblResultados= 'Results';
                  }
                  else{
                    //console.log("sin datos");
                    this.lblResultados= 'No Results or wait';
                   
                  }
                 
                  bus.$emit('afiliacion.loading.end','');

                })
                .catch(error => {
                  //console.log(error);
                  bus.$emit('afiliacion.loading.end','');
              });
    },
    tieneExtension(valor){
       var arrPath = valor.split('.');
      if(arrPath.length==1) return false;
      
      var ext=arrPath[arrPath.length-1].toUpperCase();
      //console.log(ext);
       if(ext =='DOCX' || ext =='XLSX'  || ext =='PDF'  || ext =='TXT'  || ext =='DOC' || ext =='XLS' || ext =='JPEG'){
          return true;
       }
       else{
          console.log("extension no soportada");
          return false;
       }
      
    },
      async fetchFiles (item) {
        // Remove in 6 months and say
        // you've made optimizations! :)
        await pause(800)

        return fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))
      },
      generarFolio(){
        this.$store.commit('generaFolio');
       this.folio = this.$store.state.folioGenerado;
       this.vistaUploader=true;
       this.$store.state.filesAdded= [];
       this.$store.state.folioGeneradoCategoria =0;
      }
    },
    created(){
      // bus.$on('afiliacion.notifica',(msg, color)=>{
      //       this.colorNotificacion=color;
      //       this.snackbar=true;
      //       this.mensajeNotifica=msg;

      //       if(color=='red') this.botonDeshabilitado=false;
      //       else this.botonDeshabilitado=true;
      //   })

        bus.$on('afiliacion.goTo',(ruta)=>{
           console.log("desde ds:" + ruta);
           this.$router.push(ruta);

        })
    },
    computed:{
        urlFacePhiAuth () {
          return this.urlFacePhiBase + this.emailAuth.trim()
          },
        section1 () {
        return require('../../../assets/digital.jpg')
       },
       inverted () {
        return require('../../../assets/inverted.png')
       },
       items () {
        return [
          {
            name: this.lblResultados,
            children: this.resultados
          }
        ]
      },
      selected () {
        if (!this.active.length) return undefined;

        bus.$emit('afiliacion.loading.ini','');
        
        const id = this.active[0]

       var seleccionado =this.resultados.find(file => file.id === id);

       if(seleccionado == undefined){
         bus.$emit('afiliacion.loading.end','');
         return undefined;
 
       }
        return seleccionado;//this.resultados.find(file => file.id === id)
      },
      filesAdded(){
        return this.$store.state.filesAdded;
      }
    }

   }


 window.facephiAuthOK = function() { 
     var iframe = document.getElementById('iframex');
     iframe.src="";
    document.getElementById('btnLogin').click();
    };


  window.facephiAuthKO = function () {
    console.log(".......invalid::::::::");
     var divMsg = document.getElementById('divMsg');
    var arrMsg = divMsg.innerText.split(' ');
          divMsg.innerText = arrMsg[0] +" :Failed authentication";
          divMsg.style.color='red'
           var iframe = document.getElementById('iframex');
          iframe.contentWindow.location.reload();
          //
         
  };


</script>

<style scoped>
html{
  overflow-y:hidden;
}
#contador {
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    font-size: 14px;
    top: 4px;
    /* right: -22px; */
    left: 33px;
    border-radius: 50%;
    height: 22px;
    width: 22px;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    background-color: #f44336 !important;
    border-color: #f44336 !important;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0,0,0,.5);
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
  box-shadow: 0 0 1px rgba(255,255,255,.5);
}
.uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .heart {
	font-size: 150px;
	color: #e00;
	animation: beat .75s infinite alternate;
	transform-origin: center;
}

/* Heart beat animation */
@keyframes beat{
	to { transform: scale(1.1); }
}

.v-dialog{
    position: absolute;
    top: 40px!important;
}




</style>