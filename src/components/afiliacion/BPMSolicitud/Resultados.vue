<template >
  <div class="resultados">

    <v-layout row  justify-center>
    <v-dialog v-model="open" persistent max-width="800" style="border-radius: 7px!important;">
      <v-card color="white" ref="form">
        <v-card-title  class="indigo lighten">
          <span class="headline white--text">We grant you the following great product</span>
           
            <v-spacer></v-spacer>
          <span class="body-2 white--text">{{variablesBPM.FolioExpediente}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md style="height:90px;margin-left:-24px;width:105.5%">
            <v-layout wrap>

                <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green"  prepend-inner-icon="offline_pin" box  color="white" label="Rate*" 
                 ref="variablesBPM.Buro" 
                v-model="rate"></v-text-field>
              </v-flex>

              <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green" prepend-inner-icon="playlist_add_check"  box  color="white" label="Product*" hint=""
                v-model="producto"></v-text-field>
              </v-flex>

               <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green" prepend-inner-icon="playlist_add_check"  box  color="white" label="Bonus*" hint=""
                v-model="bonus"></v-text-field>
              </v-flex>

               <v-flex xs12 sm3 md3>
                <v-text-field readonly background-color="green" prepend-inner-icon="playlist_add_check"  box  color="white" label="Priority code*" hint=""
                v-model="code"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>

        <template >
            <div >
               
          <span style="margin-left: 3px;font-size:18px;color:grey">Earn unlimited 1.5 points for every $1 you spend on all purchases everywhere, every time!</span>
            <!-- <v-tabs-items v-model="tabs">
                <v-tab-item > -->
                <v-card>
                            <v-card-text >
                            <template>
                                <v-card>
                                    <v-layout justify-space-between pa-3>
                                    <v-flex xs5 style="max-width:40%;height: 300px;overflow-y: scroll;">
                                    <span v-if="hayDatos" id ="contador">{{countDatos}}</span>
                                     
                                        
                                        <v-data-table
                                          :headers="headers"
                                          :items="beneficios"
                                          class="elevation-3">
                                          <template v-slot:items="props">
                                              <td>{{ props.item.variable }}</td>
                                              <td class="text-xs-right">{{ props.item.valor }}</td>
                                          </template>
                                      </v-data-table>
                                 

                                    </v-flex>
                                    <v-flex d-flex text-xs-center style="margin: -16px;max-width: 60%;">
                                        <v-scroll-y-transition mode="out-in">
                                       
                                           
                                        <v-card style="margin-left: 60px;">
                                            <!-- card -->
                                            <div class="payment-title">
                                                <h1>Your card!</h1>
                                            </div>
                                            <div class="containerCard preload">
                                                <div class="creditcard ">
                                                    <div class="front">
                                                        <div id="ccsingle"></div>
                                                        <svg version="1.1" id="cardfront" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            x="0px" y="0px" viewBox="0 0 750 471" style="enable-background:new 0 0 750 471;" xml:space="preserve">
                                                            <g id="Front">
                                                                <g id="CardBackground ">
                                                                    <g id="Page-1_1_">
                                                                        <g id="amex_1_">
                                                                            <path id="Rectangle-1_1_" class="lightcolor white" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                                                                    C0,17.9,17.9,0,40,0z" />
                                                                        </g>
                                                                    </g>
                                                                    <path class="darkcolor reddark" d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z" />
                                                                </g>
                                                                <text transform="matrix(1 0 0 1 60.106 295.0121)" id="svgnumber" class="st2 st3 st4">{{getCardNumber()}}</text>
                                                                <text transform="matrix(1 0 0 1 54.1064 428.1723)" id="svgname" class="st2 st5 st6">{{getName}}</text>
                                                                <text transform="matrix(1 0 0 1 54.1074 389.8793)" class="st7 st5 st8">cardholder name</text>
                                                                <text transform="matrix(1 0 0 1 479.7754 388.8793)" class="st7 st5 st8">expiration</text>
                                                                <text transform="matrix(1 0 0 1 65.1054 241.5)" class="st7 st5 st8">card number</text>
                                                                <g>
                                                                    <text transform="matrix(1 0 0 1 574.4219 433.8095)" id="svgexpire" class="st2 st5 st9">01/24</text>
                                                                    <text transform="matrix(1 0 0 1 479.3848 417.0097)" class="st2 st10 st11">VALID</text>
                                                                    <text transform="matrix(1 0 0 1 479.3848 435.6762)" class="st2 st10 st11">THRU</text>
                                                                    <polygon class="st2" points="554.5,421 540.4,414.2 540.4,427.9 		" />
                                                                </g>
                                                                <g id="cchip">
                                                                    <g>
                                                                        <path class="st2" d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                                                                c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z" />
                                                                    </g>
                                                                    <g>
                                                                        <g>
                                                                            <rect x="82" y="70" class="st12" width="1.5" height="60" />
                                                                        </g>
                                                                        <g>
                                                                            <rect x="167.4" y="70" class="st12" width="1.5" height="60" />
                                                                        </g>
                                                                        <g>
                                                                            <path class="st12" d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                                                                    c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                                                                    C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                                                                    c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                                                                    c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z" />
                                                                        </g>
                                                                        <g>
                                                                            <rect x="82.8" y="82.1" class="st12" width="25.8" height="1.5" />
                                                                        </g>
                                                                        <g>
                                                                            <rect x="82.8" y="117.9" class="st12" width="26.1" height="1.5" />
                                                                        </g>
                                                                        <g>
                                                                            <rect x="142.4" y="82.1" class="st12" width="25.8" height="1.5" />
                                                                        </g>
                                                                        <g>
                                                                            <rect x="142" y="117.9" class="st12" width="26.2" height="1.5" />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                            <g id="Back">
                                                            </g>
                                                        </svg>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                           <div style="font-size:16px;color:green">
                                             Go to your store to pick up your credit card!
                                           </div>
                                           <!-- card -->
                                        </v-card>
                                     
                                      
                                        </v-scroll-y-transition>
                                    </v-flex>
                                    </v-layout>
                                </v-card>
                                </template>
                            </v-card-text>
                        </v-card>
                <!-- </v-tab-item>

               

            </v-tabs-items> -->
            </div>
      </template>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1"  @click="close()">Close</v-btn>
           <v-btn flat color="red darken-1"  @click="reject()">Cancel</v-btn>
          <v-btn flat color="green darken-1"  @click="approve()">Accept</v-btn>
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
     props:['open','variablesBPM'],
     data(){
       return{
         rate:'17%',
         producto:'PEOPLE-2019',
         bonus:'150USD',
         code:'HC0093',
           errorMessages: '',
           active:[],
           beneficios:[
            {'variable':'INTERES RATE','valor':'17%'},
            {'variable':'ANNUAL FEE','valor':'NO'},
            {'variable':'MONTHS WITHOUT INTEREST','valor':'YES'},
            {'variable':'FIRST PURCHASE BONUS','valor':'YES'},
            {'variable':'CREDIT LIMIT','valor':'$5,000.00'},
           ],
           lblResultados:'Results',
           instruccion1:'Validate the documents and data in this file to allow progress or rejection if it does not meet the criteria <SPAN class="font-weight-bold">'+this.folio+'</SPAN>)',
           openx: [],
           pdfviewermine:'https://sminet.com.mx/fintech.viewer/viewer.html?file=https://sminet.com.mx/docs/',
           pdfviewer:'https://drive.google.com/viewerng/viewer?embedded=true&hl=es&url=https://sminet.com.mx/docs/',
           tabs: 0,
           blackList:'PASSED',
           headers: [
            {
              text: 'Benefits',
              align: 'left',
              sortable: false,
              value: 'variable',
              class: 'tituloTabla'
            },
          { text: '', align: 'right', sortable: false, value: '' },
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
      getName(){
        if(this.variablesBPM.Nombre==undefined)return "SN";
        else
         return this.variablesBPM.Nombre.toUpperCase() +' '+ this.variablesBPM.Paterno + ' '+ this.variablesBPM.Materno;
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
     
      getCardNumber(){

        var terminacion = Math.random(100).toString().substring(2,6);
         return '4152 3132 9791 '+ terminacion;
      },
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


               var variablesXML="{'variables': { "+
                                "'IdProducto': {'value': '01','type':'String'},"+
                                "'IdTipoProducto':{'value':'12','type':'String'},"+
                                "'CoreId':{'value':'20000001','type':'String'},"+
                                "'Cuenta':{'value':'32323333222','type':'String'},"+
                                "'Password':{'value':'000000','type':'String'},"+
                                "'isAccepted':{'value':true,'type':'boolean'}    } }";
           
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
                  console.log('bpm ACEPTO');
                  
                  console.log(bpmResp);
                  
                  //reset
                  this.$store.state.bResultados = false;
                 
                  

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


               var variablesXML="{'variables': { "+
                                "'IdProducto': {'value': '01','type':'String'},"+
                                "'IdTipoProducto':{'value':'12','type':'String'},"+
                                "'CoreId':{'value':'20000001','type':'String'},"+
                                "'Cuenta':{'value':'32323333222','type':'String'},"+
                                "'Password':{'value':'***********','type':'String'},"+
                                "'isAccepted':{'value':false,'type':'boolean'}    } }";
           
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
                  console.log('bpm ACEPTO');
                  
                  console.log(bpmResp);
                  
                  //reset
                  this.$store.state.bResultados = false;
                 
                  

                 //reload
                 bus.$emit('search', '');
                 bus.$emit('afiliacion.loading.end','');
                  
                }).catch(error => {
                  console.log(error);
                   bus.$emit('afiliacion.loading.end','');
              });
    
        },
        close(){
            this.$store.state.bResultados = false;
        },
    },
  }
</script>

<style>
.tituloTabla{
  font-size: 20px!important;
}
/* body {
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: center;
        align-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    min-height: 100vh;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    font-family: 'Raleway';
} */

/* .payment-title {
    width: 100%;
    text-align: center;
} */

/* .form-container .field-container:first-of-type {
    grid-area: name;
} */

/* .form-container .field-container:nth-of-type(2) {
    grid-area: number;
}

.form-container .field-container:nth-of-type(3) {
    grid-area: expiration;
} */

/* .form-container .field-container:nth-of-type(4) {
    grid-area: security;
} */

/* .field-container input {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
} */

/* .field-container {
    position: relative;
} */

/* .form-container {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: auto auto;
    grid-template-rows: 90px 90px 90px;
    grid-template-areas: "name name""number number""expiration security";
    max-width: 400px;
    padding: 20px;
    color: #707070;
} */

/* label {
    padding-bottom: 5px;
    font-size: 13px;
} */

/* input {
    margin-top: 3px;
    padding: 15px;
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #dcdcdc;
} */

/* .ccicon {
    height: 38px;
    position: absolute;
    right: 6px;
    top: calc(50% - 17px);
    width: 60px;
} */

/* CREDIT CARD IMAGE STYLING */
 .preload * {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
} 

 .containerCard {
    width: 100%;
    max-width: 400px;
    max-height: 251px;
    height: 54vw;
    padding: 20px;
} 

/* #ccsingle {
    position: absolute;
    right: 15px;
    top: 20px;
} */

/* #ccsingle svg {
    width: 100px;
    max-height: 60px;
} */

 .creditcard svg#cardfront,
.creditcard svg#cardback {
    width: 100%;
    -webkit-box-shadow: 1px 5px 6px 0px rgb(24, 41, 138);
    box-shadow: 1px 5px 6px 0px rgb(24, 41, 138);
    border-radius: 22px;
} 

 /* #generatecard{
    cursor: pointer;
    float: right;
    font-size: 12px;
    color: #fff;
    padding: 2px 4px;
    background-color: #909090;
    border-radius: 4px;
    cursor: pointer;
    float:right;
}  */

/* CHANGEABLE CARD ELEMENTS */
/* .creditcard .lightcolor,
.creditcard .darkcolor {
    -webkit-transition: fill .5s;
    transition: fill .5s;
} */

.creditcard .lightblue {
    fill: #03A9F4;
}

.creditcard .lightbluedark {
    fill: #0288D1;
}

.creditcard .red {
    fill: #ef5350;
}

.creditcard .reddark {
    fill: #d32f2f;
}

.creditcard .purple {
    fill: #ab47bc;
}

.creditcard .purpledark {
    fill: #7b1fa2;
}

.creditcard .cyan {
    fill: #26c6da;
}

.creditcard .cyandark {
    fill: #0097a7;
}

.creditcard .green {
    fill: #66bb6a;
}

.creditcard .greendark {
    fill: #388e3c;
}

.creditcard .lime {
    fill: #d4e157;
}

.creditcard .limedark {
    fill: #afb42b;
}

.creditcard .yellow {
    fill: #ffeb3b;
}

.creditcard .yellowdark {
    fill: #f9a825;
}

.creditcard .orange {
    fill: #ff9800;
}

.creditcard .orangedark {
    fill: #ef6c00;
}

.creditcard .grey {
    fill: #bdbdbd;
}

.creditcard .greydark {
    fill: #616161;
}

.creditcard .white {
    fill: #f5f5f5;
}

/* FRONT OF CARD */
/* #svgname {
    text-transform: uppercase;
} */

#cardfront .st2 {
    fill: #FFFFFF;
}

#cardfront .st3 {
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
}

#cardfront .st4 {
    font-size: 54.7817px;
}

#cardfront .st5 {
    font-family: 'Source Code Pro', monospace;
    font-weight: 400;
}

#cardfront .st6 {
    font-size: 33.1112px;
}

#cardfront .st7 {
    opacity: 0.6;
    fill: #FFFFFF;
}

#cardfront .st8 {
    font-size: 24px;
}

#cardfront .st9 {
    font-size: 36.5498px;
}

#cardfront .st10 {
    font-family: 'Source Code Pro', monospace;
    font-weight: 300;
}

#cardfront .st11 {
    font-size: 16.1716px;
}

#cardfront .st12 {
    fill: #4C4C4C;
}

/* BACK OF CARD */
#cardback .st0 {
    fill: none;
    stroke: #0F0F0F;
    stroke-miterlimit: 10;
}

#cardback .st2 {
    fill: #111111;
}

#cardback .st3 {
    fill: #F2F2F2;
}

#cardback .st4 {
    fill: #D8D2DB;
}

#cardback .st5 {
    fill: #C4C4C4;
}

#cardback .st6 {
    font-family: 'Source Code Pro', monospace;
    font-weight: 400;
}

#cardback .st7 {
    font-size: 27px;
}

#cardback .st8 {
    opacity: 0.6;
}

#cardback .st9 {
    fill: #FFFFFF;
}

#cardback .st10 {
    font-size: 24px;
}

#cardback .st11 {
    fill: #EAEAEA;
}

#cardback .st12 {
    font-family: 'Rock Salt', cursive;
}

#cardback .st13 {
    font-size: 37.769px;
}

/* FLIP ANIMATION */
.container {
    perspective: 1000px;
}

.creditcard {
    width: 100%;
    max-width: 400px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: -webkit-transform 0.6s;
    -webkit-transition: -webkit-transform 0.6s;
    transition: transform 0.6s;
    transition: transform 0.6s, -webkit-transform 0.6s;
    cursor: pointer;
}

.creditcard .front,
.creditcard .back {
    position: absolute;
    width: 100%;
    max-width: 400px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    color: #47525d;
}

.creditcard .back {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.creditcard.flipped {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}
</style>