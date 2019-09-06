<template >
  <div class="bandejaSearcher container" >
        <v-layout row style="height:58px">
            <v-flex grow>
                    <v-text-field  
                      v-model="inputSearch"
                      required
                      ref="inputSearch"
                      name="inputSearch"
                      label="Buscar"
                      @keydown.enter="realizarConsulta" >
                      <template bottom slot="append">
                          <v-icon @click="realizarConsulta">search</v-icon>
                      </template>
                    </v-text-field>
            </v-flex>
            <v-flex shrink pa-4></v-flex>
            <v-flex shrink pa-2>
                <v-icon x-large v-if="pageType=='LIST'" class="black--text cardIcon" v-on:click="changeMode('CARD')">view_module</v-icon>
                <v-icon x-large v-else class="black--text cardIcon"  v-on:click="changeMode('CARD')">view_list</v-icon>

                 <v-icon x-large  class="black--text cardIcon"  v-on:click="newSolicitud()">add_box</v-icon>
            </v-flex>
        </v-layout>
        
  <span class=" green--text font-weight-thin" style="margin-left:2px;">{{solicitudesLength}} coincidencias encontradas.</span>       
  </div>
  
</template>

<script>
    import {bus} from '../../main.js';
    import axios from "axios";

    export default {
    props:['solicitudesLength','pageType','solicitudes'],
    data () {
        return {
           inputSearch:'',
           solicitudesAux:[],
           folioGenerado:''
        }
  },
   methods: {
       changeMode(modo){
          bus.$emit('changeMode', modo)
       },
       realizarConsulta(){
        bus.$emit('search', this.inputSearch);
       },
       newSolicitud(){
         this.$store.commit('generaFolio');
          // this.solicitudes = [];

           bus.$emit('afiliacion.loading.ini','');
            this.folioGenerado = this.$store.state.folioGenerado;
            console.log(this.folioGenerado);

           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/startBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                      proceso : 'afiliacion.process',
                      promotorId : 'P00001',
                      tiendaId : '99',
                      folioExpediente : this.folioGenerado
                }
              })
                .then(response => {

                  var bpmResp = response.data;//4 arra
                  // console.log("=========BPM Response===========");
                  // console.log(bpmResp);

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
              
       }
   }, 
   computed:{
     
   }
  }
</script>

<style>

.cardIcon:hover {
  box-shadow: 0 0 20px rgba(23, 180, 9, 1);
  border-radius: 5px;
  cursor: pointer;
}
</style>