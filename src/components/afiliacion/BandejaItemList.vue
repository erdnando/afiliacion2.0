<template >
  <div class="BandejaItemList"  >
      <div  class="column card" v-for="solicitud in solicitudes" :key="solicitud.account" style="margin-top: 5px;">
        <v-flex xs12>
            <v-card  class=" "  style="-webkit-box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important;">
            <v-layout class="white lighten-4 grey--text">
                <v-flex xs1>
                <v-img :src="solicitud.foto" height="40px" contain style="margin-top:5px"></v-img>
                </v-flex>
                <v-flex xs11 >
                <v-card-title primary-title style="padding:3px">
                    <div style="width:350px;"  >
                        <div class="subheading black--text font-weight-medium" style="">Nombre:{{solicitud.nombre}}</div>
                        <div>Cuenta:{{solicitud.account}}</div> 
                    </div>
                        <div style="width:150px" >
                        <div>Estatus:{{solicitud.estatus}}</div>
                        <div>.</div>
                    </div>
                        <div style="width:120px" >
                        <div>Fecha: (2019)</div>
                        <div>.</div>
                    </div>
                </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions  class="pa-1 white lighten grey--text" style="height:24px;background-color: silver !important;">
                Expediente : &nbsp; <span class="font-weight-medium black--text"> {{solicitud.expediente}}</span>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon v-bind:color="getColor(solicitud.estatus)">{{setIcon(solicitud.estatus)}}</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>folder_shared</v-icon>
                  </v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
    </div>
  </div>
</template>

<script>



   export default {
    components: {
    
    },
    props:['solicitudes'],
    methods:{
    },
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