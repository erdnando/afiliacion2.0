<template >
  <div class="BandejaItemCard"  >
     <v-layout justify-center>
    <v-flex xs12 sm12>
      <!-- <v-card> -->
        <!-- <v-container fluid > -->
           <v-layout row wrap> 
            <v-flex v-for="solicitud in solicitudes" :key="solicitud.account" xs6 md4 lg3 xl2 class="card" style="padding-left: 3px;padding-bottom: 3px;">
               <v-card>  
               <v-container fluid grid-list-md style="padding:8px">
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md4>
                     <v-img  :src="solicitud.foto" height="80px" width="auto"></v-img>
                  </v-flex>

                  <v-flex d-flex xs12 sm6 md8>
                    <v-layout row wrap>
                      <v-flex d-flex >
                        <span class="body-1 black--text font-weight-medium" v-text="solicitud.nombre"></span>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text" v-text="solicitud.account"></span>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text font-weight-medium" v-text="solicitud.expediente"></span>
                      </v-flex>
                      <v-flex d-flex>
                         <span class="caption black--text" v-text="solicitud.estatus"></span>
                      </v-flex>

                    </v-layout>
                  </v-flex>
                 
                </v-layout>
                
              </v-container>           
              <v-divider  ></v-divider>
               <!-- <v-card>   -->
                
                <v-card-actions class="pa-1 white lighten grey--text" style="height:28px;background-color: silver !important;">
                  <v-spacer></v-spacer>
                  
                  <v-btn icon>
                    <v-icon>how_to_reg</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>folder_shared</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
           </v-layout> 
        <!-- </v-container> -->
      <!-- </v-card> -->
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
             cards: [
                { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
                { title: 'Pre-fab homesb', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
                { title: 'Favorite road tripsx', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
                { title: 'Favorite road tripsy', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
                { title: 'Favorite road tripsz', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 }
            ]
        }
    },
    props:['solicitudes'],
    methods:{
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