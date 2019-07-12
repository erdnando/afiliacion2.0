<template >
  <div class="home">

    <v-container fluid class="my-2 containerHome">
      <carousel></carousel>
      
      <h2 class="headline text-xs-center my-4">Explora nuestras soluciones e impulsa tu negocio</h2>
      <carousel-cards v-bind:items="solucionesArr"></carousel-cards>
      <h2 class="headline text-xs-center my-4">Explora nuestras APIs y componentes</h2>
      <carousel-cards v-bind:items="apisComponentsArr"></carousel-cards>
      <landing-page></landing-page>
    </v-container>
  </div>
</template>

<script>
import CarouselCards from '@/components/start/CarouselCards'
import Carousel from '@/components/start/Carousel'
import LandingPage from '@/components/start/LandingPage'

   export default {
     components: {
    CarouselCards,Carousel,LandingPage
    },
    data(){
      return{
        publicPath: process.env.BASE_URL,
        solucionesArr: [
          {id:1 ,deshabilitado:false, logo:'/images/afiliacion.jpg',color:'green', name: 'Afiliación', tag: "Onboarding digital",ruta:'/fintech/afiliacion'},
          {id:2 ,deshabilitado:true, logo:'/images/selfservice.jpeg',color:'green', name: 'Self-service', tag: "Tramitalo tu mismo",ruta:'/fintech/self-service'},
          {id:3 ,deshabilitado:false, logo:'/images/krece1.jpg',color:'green', name: 'Krece B2B', tag: "Crowfounding",ruta:'/fintech/krece'},
          {id:4 ,deshabilitado:false, logo:'/images/homebanking.jpg',color:'warning', name: 'Home Banking', tag: "Tu Banca en internet",ruta:'/fintech/hb'},
          {id:5 ,deshabilitado:true, logo:'/images/mobileBanking.jpg',color:'warning', name: 'Mobile Banking', tag: "Télefono inteligente",ruta:'/fintech/mobile-banking'},
          {id:6 ,deshabilitado:true, logo:'/images/wallet2.jpg',color:'warning', name: 'Tu Wallet', tag: "Tus pagos, tus servicios",ruta:'/fintech/wallet'},
        ],
        apisComponentsArr: [
          {id:1,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'green', name: 'OCR', tag: "Data extraction customed",ruta:'/fintech/ocr'},
          {id:2,deshabilitado:false, logo:'/images/digital.jpg' ,color:'green', name: 'Digital Docs', tag: "Desing it & use it",ruta:'/fintech/digital-docs'},
          {id:3,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'warning', name: 'Soft token', tag: "Simple soft token",ruta:'/fintech/soft-token'},
          {id:4,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'error', name: 'One ring', tag: "Reference phone numbers",ruta:'/fintech/one-ring'},
          {id:5,deshabilitado:true, logo:'https://placehold.it/200x200' ,color:'success', name: 'Cognitive', tag: "Chat & phone",ruta:'/fintech/cognitive'}
        ],
      }
    },
    computed:{
         kreceimg () {
       return require('../assets/krece1.jpg')
       }
    }
  }

  // {id:4 ,logo:'img.png',color:'green', name: 'MaaS 360', tag: "Onboarding digital",ruta:'/fintech/maas'},
</script>

<style lang="stylus">
 .containerHome{
   padding:0px!important;margin-top: 0px!important;
 }
</style>
