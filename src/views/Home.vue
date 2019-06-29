<template >
  <div class="home">

    <v-container fluid class="my-2 containerHome">
    <carousel></carousel>
     <carousel-cards></carousel-cards>
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
       publicPath: process.env.BASE_URL
      }
    },
  }
</script>

<style lang="stylus">
 .containerHome{
   padding:0px!important;margin-top: 0px!important;
 }
</style>
