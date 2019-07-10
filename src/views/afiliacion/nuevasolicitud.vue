<template >
  <div class="nuevasolicitud">
 <v-layout justify-center>
    <v-flex xs12 sm12>
           <v-layout row wrap style="-webkit-box-pack:center;justify-content:center;margin-top: 40px;"> 
            <v-flex  v-for="etapa in etapasSolicitud" :key="etapa.id" xs6 md3 lg2 xl1 class="card" style="margin-left: 8px;max-width: 160px;">

              <v-hover >
                <v-card slot-scope="{hover}" class="mx-auto" color="grey lighten-4"  max-width="160" >
                  <v-img :aspect-ratio="2/2" src="https://cdn.vuetifyjs.com/images/cards/kitchen.png">
                    <v-expand-transition>
                      <div v-if="hover" v-bind:style="{ background: etapa.form.color }" class="d-flex transition-fast-in-fast-out  darken-2 v-card--reveal headline white--text" 
                      style="height: 100%;">
                        {{etapa.nombre}}
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="pt-5" style="position: relative;">
                    <v-btn  @click="openForm(etapa.id)"  :disabled="etapa.disabled" absolute v-bind:color="etapa.form.color"  class="body-1 white--text" fab large right top>
                      {{etapa.iniciarContinuar}}
                    </v-btn>
                    <div class="subheading font-weight-medium black--text  mb-2" style="text-align: -webkit-center;margin-top: -13px;">{{etapa.nombre}}</div>
                    <h3 v-bind:style="{ color: etapa.form.color }" class="title font-weight-medium  mb-2 "  style="text-align: -webkit-center;">{{etapa.form.avance}}%</h3>
                    <div class="subheading font-weight-light  mb-2">
                        <v-progress-linear v-bind:background-color=etapa.barra color="green " v-model="etapa.form.avance" :active="etapa.show" 
                        :indeterminate="etapa.query" :query="true"></v-progress-linear>
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
              
            </v-flex>
           </v-layout> 
    </v-flex>
  </v-layout>
 
<solicitud v-bind:open="etapasSolicitud[0].visible" v-bind:folio="folio"></solicitud>
<identificacion v-bind:open="etapasSolicitud[1].visible" v-bind:folio="folio"></identificacion>
<personales v-bind:open="etapasSolicitud[2].visible" v-bind:etapasSolicitud="etapasSolicitud[1]" v-bind:folio="folio" ></personales>
<autorizo v-bind:open="etapasSolicitud[3].visible" v-bind:folio="folio"></autorizo>
<documentos v-bind:open="etapasSolicitud[4].visible" v-bind:folio="folio"></documentos>
<ref-telefonicas v-bind:open="etapasSolicitud[5].visible" v-bind:folio="folio"></ref-telefonicas>
<complementarios v-bind:open="etapasSolicitud[6].visible" v-bind:folio="folio"></complementarios>
    
  </div>
</template>

<script>
import {bus} from '../../main.js'
import Solicitud from '@/components/afiliacion/NuevaSolicitud/Solicitud'
import Identificacion from '@/components/afiliacion/NuevaSolicitud/Identificacion'
import Personales from '@/components/afiliacion/NuevaSolicitud/Personales'
import Autorizo from '@/components/afiliacion/NuevaSolicitud/Autorizo'
import Documentos from '@/components/afiliacion/NuevaSolicitud/Documentos'
import RefTelefonicas from '@/components/afiliacion/NuevaSolicitud/RefTelefonicas'
import Complementarios from '@/components/afiliacion/NuevaSolicitud/Complementarios'

   export default {
      components: {
    Solicitud,Identificacion,Personales,Autorizo,Documentos,RefTelefonicas,Complementarios
    },
    data () {
      return {
        currentOffset: 0,
        windowSize: 0,
        paginationFactor: 0,
        folio:'',
        solicitudes: [
            {
                account:100001,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Erdnando Rodriguez Vargas',
                estatus:'Aprobado',
                expediente:'F0000432',
                collectionViewUrl:'url'
               },
               {
                account:100002,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Andrea Jimenez Mendez',
                estatus:'Aprobado',
                expediente:'F0000401',
                collectionViewUrl:'url'
               },
               {
                account:100003,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Israel Torres Fernandez',
                estatus:'Rechazado',
                expediente:'F0000411',
                collectionViewUrl:'url'
               },
               {
                account:100004,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Joaquin Jimenez Flores',
                estatus:'Aprobado',
                expediente:'F0000400',
                collectionViewUrl:'url'
               },
               {
                account:100005,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Javier Hernandez gomez',
                estatus:'Aprobado',
                expediente:'F0000226',
                collectionViewUrl:'url'
               },
               {
                account:100006,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Mirella Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000417',
                collectionViewUrl:'url'
               },
               {
                account:100007,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Laura Sanchez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000418',
                collectionViewUrl:'url'
               }
        ],
        objFormAnterior:{}
      }
    },
    methods:{
     openForm(idForm){
       this.$store.commit('openForm',idForm);
     }
    },
    mounted: function () {
       this.$store.commit('generaFolio');
       this.folio = this.$store.state.folioGenerado;
    },
    computed:{
      etapasSolicitud:{
        get(){
          return this.$store.state.etapasSolicitud;
         }
      }
     },
    created(){
        
        
    }
    
  }
</script>

<style scoped>

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}


.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 80%;
}
.card-carousel--overflow-container {
  overflow: hidden;
}
.card-carousel--nav__left, .card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid #42b883;
  border-right: 2px solid #42b883;
  cursor: pointer;
  margin: 0 10px;
  transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  transform: rotate(-135deg);
}
.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}
.card-carousel--nav__right {
  transform: rotate(45deg);
}
.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
}
.card-carousel-cards .card-carousel--card {
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
}
.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}
.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}
.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
}
.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
}
.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  padding: 7px 15px;
}
.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-size: 19px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
  padding: 6px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: -0px -0px 0px #004977;
}

/* h1 {
  font-size: 3.6em;
  font-weight: 100;
  text-align: center;
  margin-bottom: 0;
  color: #42b883;
} */
.cardx:hover, article.media-wrap:hover {
  box-shadow: 0 0 20px rgba(33, 33, 33, 0.5)!important;
  border-radius: 5px;
  
}
</style>