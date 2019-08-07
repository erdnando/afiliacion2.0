<template>
  <v-app class="grey lighten-4 ">
    <Navbar/>
    <v-content class="" style=" min-width: 480px;" >   <!-- "mx-4 mb-4 my-3" -->
  
      <router-view></router-view>
  
    </v-content>
  </v-app>
</template>

<script>


import Navbar from '@/components/start/Navbar'

export default {
  name: 'App',
  components:{Navbar},
  data () {
    return {
     
    }
  }
}
</script>

<style >

/* 
.v-dialog{
    position: absolute!important;
    top: 20px!important;
} */
</style>