<template>
    <nav>
        <v-toolbar  app >

          <v-toolbar-side-icon  v-if="isLogged"  class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="text-uppercase grey--text">
              <span class="font-weight-light">Fintech</span>
              <span>2.0</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn  flat color="grey">
             <span>Admin</span>
             <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar>

       <!-- Left menu aka drawer   temporary-->
         <v-navigation-drawer :disable-resize-watcher=true  v-model="drawer"   app class="indigo">
            <br/>
             <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                    <img v-bind:src="promotor.foto">
                    </v-list-tile-avatar>
        
                    <v-list-tile-content>
                    <v-list-tile-title class="darken white--text subheading font-weight-thin text-uppercase">{{promotor.nombre}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
               
                <v-list-tile @click="validaExit(item.modulo)" v-for="item in modulos" :key="item.clave"  router :to="item.ruta">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
        
                    <v-list-tile-content>
                         <v-list-tile-title class="darken white--text caption ">{{ item.modulo }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>




    </nav>
</template>

<script>
import {bus} from '../../main.js'

export default {
    data(){
        return{
            drawer:false,
            isLogged:false,
            promotor:{},
            modulos: []
      }
    },
    methods:{
        validaExit(modulo){
        if(modulo=="Salir"){
            //TODO
            //add confirmation before exit
            this.drawer=false;
            this.isLogged=false;
            this.promotor={};
            this.modulos= [];
        }
        }
    },
    created(){
      bus.$on('login',(userAccediendo)=>{
          //console.log("autenicando user:"+userAccediendo.user + "- pwd:"+userAccediendo.pwd+"...."+ "- app:"+userAccediendo.app+"....");
           //TODO add logic to authenticate
          if(userAccediendo.user=="admin"){
                 this.isLogged= true;
                 //console.log("autenicación...Ok!...accediendo a la solución "+userAccediendo.app);
                 bus.$emit('loginOk', userAccediendo);
          }else{
              this.isLogged= false;
              //console.log("autenicación...denegada a la solución "+ userAccediendo.app);
              bus.$emit('loginFail', userAccediendo); 
          }
            
        });


         bus.$on('loadDrawer',(userAccediendo)=>{
          console.log("cargando modulos para user:"+userAccediendo.user + "- pwd:"+userAccediendo.pwd+"...."+ "- app:"+userAccediendo.app+"....");
           //TODO add logic to get modules based in user and app
          this.modulos= [
                { clave:'01' , allow:'rw' , modulo: 'Home', icon: 'dashboard',ruta:'/fintech/afiliacion' },
                { clave:'02' , allow:'rw' , modulo: 'Mis solicitudes', icon: 'library_books',ruta:'/fintech/afiliacion/solicitudes' },
                { clave:'03' , allow:'rw' , modulo: 'Nueva solicitud', icon: 'library_add',ruta:'/fintech/afiliacion/nuevasolicitud' },
                { clave:'04' , allow:'rw' , modulo: 'Documentos digitales', icon: 'how_to_vote',ruta:'/fintech/afiliacion/documentos' },
                { clave:'05' , allow:'rw' , modulo: 'Asistencia', icon: 'report_problem',ruta:'/fintech/asistencia' },
                { clave:'06' , allow:'rw' , modulo: 'Configuración', icon: 'settings',ruta:'/fintech/configuracion' },
                { clave:'07' , allow:'rw' , modulo: 'Salir', icon: 'power_settings_new',ruta:'/fintech' }
                ];
            this.promotor={
                    id:10001,
                    nombre:'Admin Arriaga Jimenez',
                    foto:'https://randomuser.me/api/portraits/men/85.jpg',
                    rol:1,
                    tienda:'55'
                };
                this.drawer=true;
            
        });

         bus.$on('showDrawer',(valor)=>{
         
                this.drawer=valor;
            
        });


    }
   }  
      
  

</script>
