<template >
  <div class="BandejaItemList"  >
    <!-- <v-layout wrap> -->
      <div  class="column card" v-for="solicitud in solicitudes" :key="solicitud.account" style="margin-top: 5px;">
        <!-- <v-flex xs12 sm12 md12 lg12 xl12 >height:55px; -->
            <v-card style=" -webkit-box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;">
           <div v-ripple>
            <v-layout >
                <v-card-media>
                    <v-img style="margin:5px;width:50px;" :src="solicitud.foto"></v-img>                  
                </v-card-media>
                <v-card-title primary-title style="padding:0px;width:100%">
                  
                  <v-flex xs12 sm3 md4 lg5  xl5 style="margin-left: 6px;">
                    <div class="subheading black--text font-weight-medium" style="">Step:{{solicitud.nombre}}</div>
                    <div style="color:darkslategrey">Application:{{solicitud.account}}</div> 
                  </v-flex>

                  <v-flex xs12 sm3 md3 lg2 xl2 style="margin-left: 6px;">
                     <div style="color:darkslategrey;font-size:10px!important;">{{solicitud.processInstanceId}}</div>
                     <div>Date: {{solicitud.fechaIni}}</div>
                  </v-flex>

                  <v-flex xs12 sm3 md3 lg2 xl2 style="margin-left: 6px;">
                      Promotor: <span class="font-weight-medium black--text"> {{solicitud.promotorId}}</span>
                  </v-flex>

                  <v-flex xs12 sm3 md2 lg2 xl2 style="margin-left: 6px;text-align: right;">
                      <v-btn icon>
                          <!-- <v-icon v-bind:color="getColor(solicitud.estatus)">{{setIcon(solicitud.estatus)}}</v-icon> -->
                        </v-btn>
                        <v-btn icon>
                          <v-icon>folder_shared</v-icon>
                        </v-btn>
                  </v-flex>

                </v-card-title>
                
            </v-layout> 
            </div>
            </v-card>
        <!-- </v-flex> -->
    </div>
    <!-- </v-layout> -->
  </div>
</template>

<script>



   export default {
    components: {
    
    },
    props:['solicitudes'],
    methods:{
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