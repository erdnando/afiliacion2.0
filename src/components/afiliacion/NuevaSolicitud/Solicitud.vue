<template >
  <div class="Solicitud">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="margin-top:-150px">
      <v-card  >
        <v-card-title>
          <span class="headline">Solicitud</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Creation date*" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Origin" hint="example of helper text only on focus"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Promotor*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>

             

             <v-flex xs12 sm6 md4>
                <v-text-field label="Store" hint="example of helper text only on focus"></v-text-field>
              </v-flex>

              

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeWindow(0)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="closeWindow(0)">Save</v-btn>
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
          porcentaje:90
       }
     },
    methods:{
      closeWindow(idWin){
        bus.$emit('afiliacion.newSol.closeWindow',idWin,this.porcentaje);
      }
    },
    computed: {
    
  },
  }
</script>

<style>

</style>