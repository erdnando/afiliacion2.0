<template >
  <div class="solicitudes">
    <!-- <h1 class="subheading grey--text">Mis solicitudes</h1> -->
    <bandeja-searcher v-bind:solicitudesLength="solicitudes.length" v-bind:pageType="pageType" v-bind:solicitudes="solicitudes"></bandeja-searcher>
    <bandeja-list v-bind:solicitudes="solicitudes" v-bind:pageType="pageType"></bandeja-list>
  </div>
</template>

<script>
import {bus} from '../../main.js'
import BandejaList from '@/components/afiliacion/BandejaList'
import BandejaSearcher from '@/components/afiliacion/BandejaSearcher'


   export default {
    components: {
    BandejaList,BandejaSearcher
    },
    computed:{
      
    },
    data () {
    return {
          solicitudes: [
            {
                account:100001,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Erdnando Rodriguez Vargas',
                estatus:'Aprobado',
                expediente:'F0000432',
                collectionViewUrl:'url'
               },
               {
                account:100002,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Andrea Jimenez Mendez',
                estatus:'Aprobado',
                expediente:'F0000401',
                collectionViewUrl:'url'
               },
               {
                account:100003,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Israel Torres Fernandez',
                estatus:'Rechazado',
                expediente:'F0000411',
                collectionViewUrl:'url'
               },
               {
                account:100004,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Joaquin Jimenez Flores',
                estatus:'Aprobado',
                expediente:'F0000400',
                collectionViewUrl:'url'
               },
               {
                account:100005,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Javier Hernandez gomez',
                estatus:'Aprobado',
                expediente:'F0000226',
                collectionViewUrl:'url'
               },
               {
                account:100006,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Mirella Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000417',
                collectionViewUrl:'url'
               },
               {
                account:100007,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Laura Sanchez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000418',
                collectionViewUrl:'url'
               },
               {
                account:100008,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Isabel Rodriguez Hernandez',
                estatus:'Rechazado',
                expediente:'F0000419',
                collectionViewUrl:'url'
               },
               {
                account:100009,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Sandra Perez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000420',
                collectionViewUrl:'url'
               },
               {
                account:100010,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Jesus Lopez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000421',
                collectionViewUrl:'url'
               },
               {
                account:100011,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Daniel Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000422',
                collectionViewUrl:'url'
               },
               {
                account:100012,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Lourdes Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000123',
                collectionViewUrl:'url'
               }
        ],
        pageType:'CARD'
    }
  },
  methods:{
   
  },
  created(){
      bus.$on('changeMode',(modo)=>{
            this.pageType= modo
        }),
      bus.$on('search',(consulta)=>{
        console.log("consulta:"+consulta);
        
        if(consulta.trim()==''){
          //  start
         this.solicitudes = 
        [{
                account:100001,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Erdnando Rodriguez Vargas',
                estatus:'Aprobado',
                expediente:'F0000432',
                collectionViewUrl:'url'
               },
               {
                account:100002,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Andrea Jimenez Mendez',
                estatus:'Aprobado',
                expediente:'F0000401',
                collectionViewUrl:'url'
               },
               {
                account:100003,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Israel Torres Fernandez',
                estatus:'Rechazado',
                expediente:'F0000411',
                collectionViewUrl:'url'
               },
               {
                account:100004,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Joaquin Jimenez Flores',
                estatus:'Aprobado',
                expediente:'F0000400',
                collectionViewUrl:'url'
               },
               {
                account:100005,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Javier Hernandez gomez',
                estatus:'Aprobado',
                expediente:'F0000226',
                collectionViewUrl:'url'
               },
               {
                account:100006,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Mirella Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000417',
                collectionViewUrl:'url'
               },
               {
                account:100007,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Laura Sanchez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000418',
                collectionViewUrl:'url'
               },
               {
                account:100008,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Isabel Rodriguez Hernandez',
                estatus:'Rechazado',
                expediente:'F0000419',
                collectionViewUrl:'url'
               },
               {
                account:100009,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Sandra Perez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000420',
                collectionViewUrl:'url'
               },
               {
                account:100010,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Jesus Lopez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000421',
                collectionViewUrl:'url'
               },
               {
                account:100011,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Daniel Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000422',
                collectionViewUrl:'url'
               },
               {
                account:100012,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Lourdes Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000123',
                collectionViewUrl:'url'
               }
        ];
        //  end
        }
        else{
 //  start
         this.solicitudes = 
        [{
                account:100001,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Erdnando Rodriguez Vargas',
                estatus:'Aprobado',
                expediente:'F0000432',
                collectionViewUrl:'url'
               },
               {
                account:100002,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Andrea Jimenez Mendez',
                estatus:'Aprobado',
                expediente:'F0000401',
                collectionViewUrl:'url'
               },
               {
                account:100003,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Israel Torres Fernandez',
                estatus:'Rechazado',
                expediente:'F0000411',
                collectionViewUrl:'url'
               },
               {
                account:100004,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Joaquin Jimenez Flores',
                estatus:'Aprobado',
                expediente:'F0000400',
                collectionViewUrl:'url'
               },
               {
                account:100005,
                foto:'http://lorempixel.com/130/140/',
                nombre:'Javier Hernandez gomez',
                estatus:'Aprobado',
                expediente:'F0000226',
                collectionViewUrl:'url'
               },
               {
                account:100006,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Mirella Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000417',
                collectionViewUrl:'url'
               },
               {
                account:100007,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Laura Sanchez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000418',
                collectionViewUrl:'url'
               },
               {
                account:100008,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Isabel Rodriguez Hernandez',
                estatus:'Rechazado',
                expediente:'F0000419',
                collectionViewUrl:'url'
               },
               {
                account:100009,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Sandra Perez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000420',
                collectionViewUrl:'url'
               },
               {
                account:100010,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Jesus Lopez Hernandez',
                estatus:'Aprobado',
                expediente:'F0000421',
                collectionViewUrl:'url'
               },
               {
                account:100011,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Daniel Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000422',
                collectionViewUrl:'url'
               },
               {
                account:100012,
                foto:'http://lorempixel.com/130/130/',
                nombre:'Lourdes Sandoval Hernandez',
                estatus:'Aprobado',
                expediente:'F0000123',
                collectionViewUrl:'url'
               }
        ];
        //  end
          consulta=consulta.toUpperCase();
          this.solicitudes = this.solicitudes.filter(function (solicitud) {
            return solicitud.expediente.toUpperCase().includes(consulta) || solicitud.nombre.toUpperCase().includes(consulta) ||  solicitud.estatus.toUpperCase().includes(consulta) ||  solicitud.account.toString().includes(consulta)
          });
        }
        
      });
  }
    
  }
</script>

<style>

</style>