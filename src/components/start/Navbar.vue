<template>
    <nav>
        <v-toolbar  app >

          <v-toolbar-side-icon  v-if="isLogged"  class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="text-uppercase grey--text">
              <span class="font-weight-light">{{solucion}}</span>
              <span>{{version}}</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn @click="goHome"  flat color="grey">
             <span>Home</span>
             <v-icon right>home</v-icon>
          </v-btn>
        </v-toolbar>

       <!-- Left menu aka drawer   temporary-->
         <v-navigation-drawer :disable-resize-watcher=true  v-model="drawer"   app class="indigo">
            <br/>
             <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                    <!-- <img v-bind:src="promotor.foto"> -->
                    <v-icon color="white" style="margin-left:-1px;">how_to_reg</v-icon>
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



         <v-dialog v-model="loading"  persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Processing...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>


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
            modulos: [],
            loading: false,
            mostrarLoadingAun:true,
            solucion:'FINTECH',
            version:'2.0'
      }
    },
    methods:{
        validaExit(modulo){
        if(modulo=="Exit"){
            //TODO
            //add confirmation before exit
            this.drawer=false;
            this.isLogged=false;
            this.promotor={};
            this.modulos= [];
            this.solucion='FINTECH';
            this.version='2.0';
        }
        },
        goHome(){
        console.log("go home");
            this.drawer=false;
            this.isLogged=false;
            this.promotor={};
            this.modulos= [];
            this.solucion='FINTECH';
            this.version='2.0';
            console.log("before move");
        //bus.$emit('afiliacion.goTo','/fintech')
         this.$router.push('/fintech');
        }
    },
    created(){
    
        bus.$on('login',(userAccediendo)=>{

                this.isLogged= true;
                bus.$emit('afiliacion.notifica','Accesing to solution '+ userAccediendo.app,'indigo');
                bus.$emit('loadDrawer', userAccediendo)
                bus.$emit('showDrawer',userAccediendo.drawer);
                this.solucion=userAccediendo.solucion,
                this.version=userAccediendo.version;



                if(userAccediendo.drawer==false){
                    this.isLogged=false;
                    this.promotor={};
                    this.modulos= [];
                }
            //TODO add logic to authenticate
            // if(userAccediendo.user=="admin"){
            //     this.isLogged= true;
            //     bus.$emit('afiliacion.notifica','Accesing to solution '+ userAccediendo.app,'indigo');
            //     bus.$emit('loadDrawer', userAccediendo)
            //     bus.$emit('showDrawer',true);
            // }else{
            //     this.isLogged= false;
            //     bus.$emit('afiliacion.notifica','Login incorrecto. Verifique sus credenciales para '+ userAccediendo.app,'red');
            //     bus.$emit('showDrawer',false);
            //     setTimeout(function(){  bus.$emit('afiliacion.goTo','/fintech'); }, 2500);
            // }
                
            });

            bus.$on('loginApp',(userAccediendo)=>{
            //TODO add logic to authenticate
            if(userAccediendo.app=="HB"){
                //this.isLogged= true;  <--controla q se vea el menu de la izquierda
                this.solucion='HomeBanking',
                this.version='1.0';
                //this.drawer=false;
                bus.$emit('afiliacion.notifica','Accessing the solution '+ userAccediendo.app,'indigo');
            }
            else if(userAccediendo.app=="KRECE"){
                //this.isLogged= true;  <--controla q se vea el menu de la izquierda
                this.solucion='Krece B2B',
                this.version='1.0';
                //this.drawer=false;
                bus.$emit('afiliacion.notifica','Accessing the solution '+ userAccediendo.app,'indigo');
            }
            else if(userAccediendo.app=="Digital Docs"){
                //this.isLogged= true;  <--controla q se vea el menu de la izquierda
                this.solucion='Digital Docs',
                this.version='1.0';
                //this.drawer=false;
                bus.$emit('afiliacion.notifica','Accessing the solution '+ userAccediendo.app,'indigo');
            }
                
            });

        bus.$on('loadDrawer',(userAccediendo)=>{
        //TODO add logic to get modules based in user and app
        //console.log(userAccediendo);
        this.modulos= [
            { clave:'01' , allow:'rw' , modulo: 'Home', icon: 'dashboard',ruta:'/fintech/afiliacion' },
            { clave:'02' , allow:'rw' , modulo: 'My applications', icon: 'library_books',ruta:'/fintech/afiliacion/solicitudes' },
            { clave:'03' , allow:'rw' , modulo: 'New application', icon: 'library_add',ruta:'/fintech/afiliacion/nuevasolicitud' },
            { clave:'04' , allow:'rw' , modulo: 'Digital docs', icon: 'how_to_vote',ruta:'/fintech/afiliacion/documentos' },
            // { clave:'05' , allow:'rw' , modulo: 'Asistencia', icon: 'report_problem',ruta:'/fintech/asistencia' },
            // { clave:'06' , allow:'rw' , modulo: 'Configuración', icon: 'settings',ruta:'/fintech/configuracion' },
            { clave:'07' , allow:'rw' , modulo: 'Exit', icon: 'power_settings_new',ruta:'/fintech' }
            ];
            this.solucion='AFILIACION',
            this.version='2.0',
        this.promotor={
                id:10001,
                nombre:userAccediendo.user,
                foto:'https://randomuser.me/api/portraits/men/85.jpg',
                rol:1,
                tienda:'55'
            };
            this.drawer=true;
        });

        bus.$on('showDrawer',(valor)=>{
            this.drawer=valor; 
        });

        bus.$on('afiliacion.loading.ini',()=>{
          //console.log('loading......ini');
          //if(this.mostrarLoadingAun)
            this.loading=true;
        })
        bus.$on('afiliacion.loading.end',()=>{
          //console.log('loading......end');
            this.loading=false;
            //this.mostrarLoadingAun=false;
        })

        // bus.$on('afiliacion.loading.reset',()=>{
        //     this.mostrarLoadingAun=true;
        // })
    }
   }  
      
  

</script>
