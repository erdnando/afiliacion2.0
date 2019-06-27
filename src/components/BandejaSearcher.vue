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
                <v-icon x-large v-else class="black--text cardIcon"  v-on:click="changeMode('LIST')">view_list</v-icon>
            </v-flex>
        </v-layout>
        
  <span class=" green--text font-weight-thin" style="margin-left:2px;">{{solicitudesLength}} coincidencias encontradas.</span>       
  </div>
  
</template>

<script>
    import {bus} from '../main.js'
    export default {
    props:['solicitudesLength','pageType','solicitudes'],
    data () {
        return {
           inputSearch:'',
           solicitudesAux:[]
        }
  },
   methods: {
       changeMode(modo){
          bus.$emit('changeMode', modo)
       },
       realizarConsulta(){
        bus.$emit('search', this.inputSearch)
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