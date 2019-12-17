<template >
  <div class="mesacontrol">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="900" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title  class="indigo lighten">
          <span class="headline white--text">Control</span>
           <span class="subtitle "  style="color:floralwhite;margin-top: 5px;">&nbsp;&nbsp; Validate the documents and data</span>
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md style="height:90px;margin-left:-24px;width:105.5%">
            <v-layout wrap>

                <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green"  prepend-inner-icon="offline_pin" box  color="white" label="Buro*" 
                hint="Congratulations, your query to buro was successful!" 
                 ref="variablesBPM.Buro"  :rules="[() => !!variablesBPM.Buro || 'This field is required']"
                :error-messages="errorMessages" required 
                v-model="variablesBPM.Buro"></v-text-field>
              </v-flex>

              <v-flex xs12 sm3 md3>
                <v-text-field readonly :background-color="variablesBPM.Score>59?'green':'red'" prepend-inner-icon="playlist_add_check"  box  color="white" label="Scoring*" hint="It's a great scoring"
                ref="variablesBPM.Score"  :rules="[() => !!variablesBPM.Score || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="variablesBPM.Score"></v-text-field>
              </v-flex>

               <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green" prepend-inner-icon="playlist_add_check"  box  color="white" label="Black list MX03*" hint="It's a great scoring"
                ref="blackList"  :rules="[() => !!blackList || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="blackList"></v-text-field>
              </v-flex>

               <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green" prepend-inner-icon="playlist_add_check"  box  color="white" label="Black list PLD*" hint="It's a great scoring"
                ref="blackList"  :rules="[() => !!blackList || 'This field is required']"
                :error-messages="errorMessages" required  
                v-model="blackList"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>

        <template >
            <div >
                <template >
                <v-tabs v-model="tabs" centered color="indigo" dark tabs slider-color="white" >
                    <v-tab >Documents</v-tab>
                    <v-tab>Data</v-tab>
                </v-tabs>
                </template>
         
            <v-tabs-items v-model="tabs">
                <v-tab-item >
                <v-card>
                            <v-card-text >
                            <template>
                                <v-card>
                                    <v-layout justify-space-between pa-3>
                                    <v-flex xs5 style="max-width:30%;height: 300px;overflow-y: scroll;">
                                    <span v-if="hayDatos" id ="contador">{{countDatos}}</span>
                                        <v-treeview :active.sync="active" :items="items" expand-icon="image_search" 
                                        activatable 
                                        :open.sync="openx"
                                        active-class="green--text font-weight-bold"
                                        class="grey lighten-5"  transition>
                                        <template  v-slot:prepend="{ item, active }">
                                            <v-icon style="cursor:pointer" v-if="!item.children" :color="active ? 'green' : 'green'">folder</v-icon>
                                            <span  style="cursor:pointer">{{clean(item.id)}}</span>
                                        </template>
                                        </v-treeview>

                                    </v-flex>
                                    <v-flex d-flex text-xs-center style="margin: -16px;max-width: 70%;">
                                        <v-scroll-y-transition mode="out-in">
                                        <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center;">
                                            <!-- Select a file -->
                                        <v-card style="margin-left: 20px;">
                                            <v-img
                                                class="white--text"
                                                height="200px"
                                                src="https://5wbts45dnuj11q6172p5dkzf-wpengine.netdna-ssl.com/wp-content/uploads/Sensitive-Data-780x405.jpg">
                                                <v-container fill-height fluid>
                                                <v-layout fill-height>
                                                    <v-flex xs12 align-end flexbox>
                                                    <span class="headline">Digital docs</span>
                                                    </v-flex>
                                                </v-layout>
                                                </v-container>
                                            </v-img>
                                            <v-card-title>
                                                <div>
                                                <span >Validate the documents and data in this file to allow progress or rejection if it does not meet the criteria <SPAN class="font-weight-bold"> {{variablesBPM.FolioExpediente}} </SPAN>   </span><br>
                                                <span></span><br>
                                                <span class="grey--text">To validate data go to file tab</span>
                                                </div>
                                            </v-card-title>
                                            <v-card-actions>
                                                
                                            </v-card-actions>
                                            </v-card>
                                        </div>
                                        <v-card v-else :key="selected.id"  flat >
                                            <v-card-text>
                                            <iframe  style="border-style: hidden;height:300px;width:100%;" v-bind:src= "getUrl(selected.id)"  class="framePDF" :onload="docLoaded('link')" ></iframe>
                                            </v-card-text>

                                            <v-divider></v-divider>

                                        </v-card>
                                        </v-scroll-y-transition>
                                    </v-flex>
                                    </v-layout>
                                </v-card>
                                </template>
                            </v-card-text>
                        </v-card>
                </v-tab-item>

                <v-tab-item >
                    <template>
                    <v-data-table
                        :headers="headers"
                        :items="variablesBPMList"
                        class="elevation-3">
                        <template v-slot:items="props">
                            <td>{{ props.item.variable }}</td>
                            <td class="text-xs-right">{{ props.item.valor }}</td>
                        </template>
                    </v-data-table>
                    </template>
                </v-tab-item>

            </v-tabs-items>
            </div>
      </template>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close()">Close</v-btn>
           <v-btn flat color="red darken-1"  @click="reject()">Reject</v-btn>
          <v-btn flat color="green darken-1"  @click="approve()">Approve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 
  </div>
</template>

<script>
import {bus} from '../../../main.js';
import axios from "axios";

   export default {
     props:['open','variablesBPM','resultadosSOLR','variablesBPMList'],
     data(){
       return{
           errorMessages: '',
           active:[],
           lblResultados:'Results',
           instruccion1:'Validate the documents and data in this file to allow progress or rejection if it does not meet the criteria <SPAN class="font-weight-bold">'+this.folio+'</SPAN>)',
           openx: [],
           pdfviewermine:'https://sminet.com.mx/fintech.viewer/viewer.html?file=https://sminet.com.mx/docs/',
           pdfviewer:'https://drive.google.com/viewerng/viewer?embedded=true&hl=es&url=https://sminet.com.mx/docs/',
           tabs: 0,
           blackList:'PASSED',
            headers: [
          {
            text: 'Registros',
            align: 'left',
            sortable: false,
            value: 'variable'
          },
          { text: 'Valor', align: 'right', sortable: false, value: 'valor' },
        ],
       }
     },
     updated(){
     },
     beforeUpdate(){
     },
     created(){

     },
     mounted(){ 
     },
     computed:{
       items () {
        return [
          {
            name: this.lblResultados,
            children: this.resultadosSOLR
          }
        ]
      },
      countDatos(){
           return this.resultadosSOLR.length;
      },
      hayDatos(){

          if(this.resultadosSOLR == undefined)return false;
         if(this.resultadosSOLR.length > 0) return true;
         else return false;
      },
       selected () {
        if (!this.active.length) return undefined;

        bus.$emit('afiliacion.loading.ini','');
        
        const id = this.active[0]

       var seleccionado =this.resultadosSOLR.find(file => file.id === id);

       if(seleccionado == undefined){
         bus.$emit('afiliacion.loading.end','');
         return undefined;
       }
        return seleccionado;//this.resultados.find(file => file.id === id)
      }
     },
     watch: {
   
    },
    methods:{
        docLoaded(arg){
            //console.log("archivo cargado...");
            if(arg == 'link'){
                setTimeout(function(){ bus.$emit('afiliacion.loading.end',''); }, 2000);
            }
        },
        markWord(contenido){
            console.log("mark word...");
            console.log(this.chips);
            var word="";

            if(contenido == undefined)return;

            if(this.chips != undefined){
            if(this.chips.length>1){
                word = this.chips[this.chips.length-1];
                if(contenido  != undefined || word  != undefined)
                contenido=contenido.toUpperCase().replace(word.toUpperCase(),"<strong>"+word.toUpperCase()+"</strong>");
            }else{
                word = this.chips[0];
                if(contenido  != undefined && word  != undefined)
                    contenido=contenido.toUpperCase().replace(word.toUpperCase(),"<strong>"+word.toUpperCase()+"</strong>");
            }
            }

            return contenido;
        },
        getUrl(param){
            console.log("url a mostrar..."+param);

            if(param.toUpperCase().endsWith("PDF")){
                var word="";

                if(this.chips != undefined){
                if(this.chips.length>1){
                    word = this.chips[this.chips.length-1];
                }else{
                    word = this.chips[0];
                }
                }
                console.log("aqui....");
                console.log(word);
                if(word != '' && word != undefined)
                return this.pdfviewermine+this.clean(param)+"&word="+word.trim();
                else
                return this.pdfviewermine+this.clean(param);
            }else{
            return this.pdfviewer+this.clean(param);
            }
        },
        clean(fileSolr){
            if(fileSolr == undefined)return;

            var arrFileFull = fileSolr.split('\\');
            var file = arrFileFull[arrFileFull.length-1];
            //var arrFile = file.split('.');
            return file;//arrFile[0];
        },
        generaHomoclave(){
            return Math.random().toString(36).substring(9).toUpperCase();
        },
        approve(){
             bus.$emit('afiliacion.loading.ini','');


          var variablesXML="{'variables': { 'IsApproved': {'value': true,'type':'boolean'}  } }";
           
           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/moveBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {"Content-Type": "application/json"},
                data: {
                      instanceId : this.variablesBPM.processInstanceId.replace('BPM: ',''),
                      xml: variablesXML
                }
              })
                .then(response => {

                  var bpmResp = response.data;//4 arra
                  console.log('bpm mesa control');
                  
                  console.log(bpmResp);
                  
                  //reset
                  this.$store.state.bMesaControl = false;
                 
                  

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });

    
        },
        reject(){
            
           bus.$emit('afiliacion.loading.ini','');


          var variablesXML="{'variables': { 'IsApproved': {'value': false,'type':'boolean'}  } }";
           
           axios({
                method: "post",
                url: 'https://sminet.com.mx/Digital.Docs.Service/Service1.svc/moveBPM',
                timeout: 1000 * 12, // Wait for 45 seconds
                headers: {"Content-Type": "application/json"},
                data: {
                      instanceId : this.variablesBPM.processInstanceId.replace('BPM: ',''),
                      xml: variablesXML
                }
              })
                .then(response => {

                  var bpmResp = response.data;//4 arra
                  console.log('bpm mesa control');
                  
                  console.log(bpmResp);
                  
                  //reset
                  this.$store.state.bMesaControl = false;
                 
                  

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
    
        },
        close(){
            this.$store.state.bMesaControl = false;
        },
    },
  }
</script>

<style>
.v-dialog {
    position: absolute;
    top: 120px;
}

#contador {
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    font-size: 14px;
    top: 4px;
    /* right: -22px; */
    left: 33px;
    border-radius: 50%;
    height: 22px;
    width: 22px;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    background-color: #f44336 !important;
    border-color: #f44336 !important;
}
</style>