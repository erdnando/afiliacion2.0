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
     <v-layout row justify-center>
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
    </v-layout>


    <v-layout row  justify-center>
    <v-dialog v-model="buscador" persistent max-width="900" style="border-radius: 7px!important;">
        <template>
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
            </template>
            <template v-slot:extension>
              <v-tabs v-model="tabs" centered color="transparent" slider-color="white">
                <v-tab >
                Search panel
                </v-tab>

                <v-tab >
                  Upload new files
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
                          <v-flex d-flex text-xs-center style="width:99%;margin: -16px;">
                            <v-scroll-y-transition mode="out-in">
                              <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center;">
                                Select a file
                              </div>
                              <v-card v-else :key="selected.id"  flat >
                                <v-card-text>
                                 <iframe  style="border-style: hidden;height:380px" v-bind:src= "getUrl(selected.id)"  class="framePDF" :onload="docLoaded('link')" ></iframe>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-layout tag="v-card-text" text-xs-left wrap>
                                  <v-flex tag="strong" xs12 text-xs-center mr-3 mb-2>Metadata:</v-flex>
                                  <v-flex  style="font-style: italic;max-width:100%;height: 80px;overflow-y: scroll;">
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
                  tab2
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

    
  </div>
</template>

<script>

 const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly'
  ]

  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

import {bus} from '../../../main.js'
import axios from "axios";


   export default {
    data(){
      return {
        dialog:true,
        buscador: false,
        search:'',
        snackbar:false,
        mensajeNotifica:'',
        colorNotificacion:'',
        botonDeshabilitado:false,
        tabs: null,
        text: 'Lorem ipseiusmod tempor incididunt ut labore et dolore magna aliis nisi ut aliquip ex ea commodo consequat.',
        active: [],
        avatar: null,
        open: [],
        users: [],
         chips: [],
        elementos: [],
        resultados: [],
        abierto:false,
        hayDatos:false,
        countDatos:0,
        pdfviewer:'https://drive.google.com/viewerng/viewer?embedded=true&hl=es&url=https://sminet.com.mx/docs/',
        officeviewer:'https://view.officeapps.live.com/op/view.aspx?src=https://sminet.com.mx/docs/',
        urlPDF:''
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
        bus.$emit('loginApp', {"user":"admin","pwd":"12345","app":"Digital Docs"});
      },
       remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
      clean(fileSolr){
       if(fileSolr == undefined)return;

           var arrFileFull = fileSolr.split('\\');
           var file = arrFileFull[arrFileFull.length-1];
           var arrFile = file.split('.');
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
        if(this.chips != undefined){
          if(this.chips.length>1){
            word = this.chips[this.chips.length-1];
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
          active: [];
          
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
          this.consultaSolr(jsonObj);
      },
      getUrl(param){
        console.log("url a mostrar...");
        //D:\solr\example\exampledocs\F1000920-5.pdf
        console.log(param);
          return this.pdfviewer+this.clean(param);
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
                   console.log("call solr...");
                   console.log(response.data.response.docs);
                   var arrR= response.data.response.docs;
                  
                  this.resultados = arrR;
                  if(arrR.length>0){
                    this.countDatos=arrR.length;
                    this.hayDatos=true;
                    }
                 
                  bus.$emit('afiliacion.loading.end','');

                })
                .catch(error => {
                  console.log(error);
                  bus.$emit('afiliacion.loading.end','');
              });
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
      randomAvatar () {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
      }
    },
    created(){
      bus.$on('afiliacion.notifica',(msg, color)=>{
            this.colorNotificacion=color;
            this.snackbar=true;
            this.mensajeNotifica=msg;

            if(color=='red') this.botonDeshabilitado=false;
            else this.botonDeshabilitado=true;
        })

        bus.$on('afiliacion.goTo',(ruta)=>{
           this.$router.push(ruta);

        })
    },
    computed:{
         section1 () {
       return require('../../../assets/digital.jpg')
       },
       items () {
        return [
          {
            name: 'Results',
            children: this.resultados
          }
        ]
      },
      selected () {
        if (!this.active.length) return undefined
        bus.$emit('afiliacion.loading.ini','');
        console.log("selected...");
        console.log(this.active);
        const id = this.active[0]

        return this.resultados.find(file => file.id === id)
      }
    },
     watch: {
      selected: 'randomAvatar'
    },
    
    
  }
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
}
</style>