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
            <v-text-field append-icon="search" class="mx-3" flat label="Search"  solo-inverted></v-text-field>
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
                  tab1
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
import {bus} from '../../../main.js'

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
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
       }
    }
    
    
  }
</script>

<style scoped>
html{
  overflow-y:hidden;
}
</style>