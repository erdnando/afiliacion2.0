<template >
  <div class="BandejaItemCard"  >
     <v-layout justify-center>
    <v-flex xs12 sm12>
           <v-layout row wrap> 
            <v-flex  v-for="solicitud in solicitudes" :key="solicitud.account" xs6 md4 lg3 xl2 class="card" style="">
               <v-card  style="margin:4px;  -webkit-box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;">  
               <div v-ripple>
               <v-container fluid grid-list-md style="padding:8px">
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md4>
                     <v-img  :src="solicitud.foto" height="80px" width="auto"></v-img>
                  </v-flex>

                  <v-flex d-flex xs12 sm6 md8>
                    <v-layout row wrap>
                      <v-flex d-flex >
                         <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                  <span  v-on="on" class="body-1 black--text font-weight-medium" v-text="cutName(solicitud.nombre)"></span>
                          </template>
                            <span>{{solicitud.nombre}}</span>
                        </v-tooltip>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text" v-text="solicitud.account"></span>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text font-weight-medium" v-text="solicitud.promotorId"></span>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text" v-text="solicitud.fechaIni"></span>
                      </v-flex>

                    </v-layout>
                  </v-flex>
                 
                </v-layout>
                
              </v-container>  
              </div>
              <v-divider  ></v-divider>
                
                <v-card-actions class="pa-1 white lighten grey--text" style="height:28px;background-color: silver !important;">
                  <v-spacer></v-spacer>
                    <span style="font-size:10px!important;margin-left: 10px;position: absolute;" class="caption black--text" v-text="solicitud.processInstanceId"></span>
                  <!-- <v-btn icon>
                    <v-icon v-bind:color="getColor(solicitud.estatus)">{{setIcon(solicitud.estatus)}}</v-icon>
                  </v-btn> -->
                  <v-btn icon>
                    <v-icon>folder_shared</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
           </v-layout> 
    </v-flex>
  </v-layout>
  
  </div>
</template>

<script>



   export default {
    components: {
    
    },
    data(){
        return{
            
        }
    },
    props:['solicitudes'],
    methods:{
      cutName(nombre){
        nombre = nombre.replace('Task.','Step ');
        if(nombre.trim().length>18)
         return nombre.substring(0,16)+"...";
         else return nombre;
      },
      setIcon(estatus){
        if(estatus=='Aprobado'){
          return 'thumb_up_alt';
        }else{
          return 'thumb_down_alt';
        }
      },
       getColor(estatus){
        if(estatus=='Aprobado'){
          return 'green lighten-1';
        }else{
          return 'red lighten-1';
        }
      }
    }
    
  }
</script>

<style>
.card:hover, article.media-wrap:hover {
  box-shadow: 0 0 20px rgba(33, 33, 33, 0.5);
  border-radius: 5px;
  
}

.cardIcon:hover {
  box-shadow: 0 0 20px rgba(23, 180, 9, 1);
  border-radius: 5px;
  cursor: pointer;
}

.cardIconEstatus:hover {
  border-radius: 5px;
  cursor: none;
}
</style>