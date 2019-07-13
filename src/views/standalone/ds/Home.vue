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
                <v-card-text>
                  <template>
                      <v-card>
                        <v-card-title class="indigo white--text headline">
                          User Directory
                        </v-card-title>
                        <v-layout justify-space-between pa-3>
                          <v-flex xs5>
                            <v-treeview :active.sync="active" :items="items" expand-icon="image_search" 
                              activatable active-class="primary--text"
                              class="grey lighten-5"  transition>
                              <template v-slot:prepend="{ item, active }">
                                <v-icon v-if="!item.children" :color="active ? 'primary' : ''">folder</v-icon>
                                <span>{{clean(item.id)}}</span>
                              </template>
                            </v-treeview>
                          </v-flex>
                          <v-flex d-flex text-xs-center>
                            <v-scroll-y-transition mode="out-in">
                              <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center;">
                                Select a User
                              </div>
                              <v-card v-else :key="selected.id" class="pt-4 mx-auto" flat max-width="400">
                                <v-card-text>
                                  <v-avatar v-if="avatar" size="88">
                                    <v-img :src="`https://avataaars.io/${avatar}`" class="mb-4"></v-img>
                                  </v-avatar>
                                  <h3 class="headline mb-2">{{ selected.name }}</h3>
                                  <div class="blue--text mb-2">{{ selected.email }}</div>
                                  <div class="blue--text subheading font-weight-bold">{{ selected.username }}</div>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-layout tag="v-card-text" text-xs-left wrap>
                                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Company:</v-flex>
                                  <v-flex>{{ selected.company.name }}</v-flex>
                                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Website:</v-flex>
                                  <v-flex>
                                    <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>
                                  </v-flex>
                                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
                                  <v-flex>{{ selected.phone }}</v-flex>
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
        abierto:false
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
          return arrFile[0];
      },
      async consultaSolr(objConsulta){
          //console.log(objConsulta);
          axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/selectm',
                timeout: 1000 * 10, // Wait for 10 seconds
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
                  
                  // for(var i=0;i<arrR.length;i++){
                  //   console.log( arrR[i].id);
                  //      arrR[i].id = this.clean( arrR[i].id );
                  // }

                  this.resultados = arrR;


                })
                .catch(error => {
                  console.log(error);
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
      },
      busqueda(){
        jsonObj =[];
        this.resultados = [];
        var jsonObj = [];
         var item = {}
        for(var i=0;i<this.chips.length;i++){
            item ["Q"] = this.chips[i];
            jsonObj.push(item);
        }
        jsonObj.push({'Q':''});
         console.log("armando cadena...");
        console.log(jsonObj);

        if(jsonObj.length==1)return;

        this.consultaSolr(jsonObj);
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

        const id = this.active[0]

        return this.users.find(user => user.id === id)
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
</style>