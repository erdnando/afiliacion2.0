import Api from '../src/api';

export default {
    moveBPM(params){
        try{
            return Api().post("moveBPM", {
                instanceId : params.instanceId,
                xml: params.xml
              });
        }
        catch(error){
            //debugger;
            console.log(error);
        } 
    },
    
}