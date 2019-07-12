<template >
  <div class="EtapaFin">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title class="indigo lighten">
          <span class="headline white--text">Your request has been approved</span>
           <span class="subtitle orange--text"  >&nbsp;&nbsp; Thanks for using our service </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <span v-html="mensajeFinal"></span>
              </v-flex>

            

            </v-layout>
          </v-container>
          <small>*An email has been sent with information about your process</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close">Close</v-btn>
        
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js'

   export default {
     props:['open'],
     data(){
       return{
          errorMessages: ''
       }
     },
     computed:{
       mensajeFinal:{
        get(){
          return this.$store.state.mensajeFinalAfiliacion;
         }
      }
     },
    methods:{
      close(){
         this.$store.commit('closeMessageFinal');
      }
    },
  }
</script>

<style>
.v-dialog {
    position: absolute;
    top: 120px;
}
</style>