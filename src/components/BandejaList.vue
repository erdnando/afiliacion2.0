<template>
<div class="BandejaList">
    <section class="section">
      <div class="container" style="margin-top:0px;padding:9px">
         
        <!-- solicitudes List -->
                    <div v-if="pageType=='LIST'" >
                        <bandeja-item-list v-bind:solicitudes="solicitudes"></bandeja-item-list>  
                    </div>
                     <div v-else>
                        <bandeja-item-card  v-bind:solicitudes="solicitudes"></bandeja-item-card>
                     </div>
      </div>
    </section>
    </div>
</template>

<script>
//importar en todos los hijos q requieran comunicacion e interaccion con el bus
//import {bus} from '../main.js'
//en methods emitir el evento
//bus.$emit('actualizarAlgo', this.obj.property)

//y en otro hijo se puede escuchar por el emit
//on created
//created(){
 //     bus.$on('actualizarAlgo',(obj)=>{
 //         this obj= obj
 //     })
//}
import BandejaItemList from '@/components/BandejaItemList'
import BandejaItemCard from '@/components/BandejaItemCard'

export default {
  name: 'BandejaList',
   props:['solicitudes','pageType'],
    components: {
    BandejaItemList,
    BandejaItemCard
    },
  data () {
    return {
       

    }
  },
  methods: {
   
  }
}
</script>

<style>

</style>
