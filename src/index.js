const SlackBot = require('slackbots');
const axios = require('axios');
const moment = require('moment');
moment.locale('es');
require('dotenv').config();
const dias = moment.weekdays(moment().day())
console.log(dias)

const bot = new SlackBot({
    token: process.env.TOKEN,
    name: 'loncheo-bot'
});

bot.on('open', () => console.log('Bot is Ready!'))

var channel = "almuerzo"

 bot.on("start", function() {
   



   bot.postMessageToChannel(channel, "!Hola, soy Loncheo Bot!\n Te daré información util sobre los platos del día.\n Estos son algunos comandos básicos:\n *@Loncheo bot platos balanceado*: te daré todos los platos balanceados del dia.\n *@Loncheo bot platos saludable*: te daré todos los platos saludables del dia.\n *@Loncheo bot platos ensalada*: te daré todas las ensaladas del dia.");

//    setTimeout(() => {
//    bot.postMessageToChannel(channel, 'Te daré información util sobre los platos del día.')}, 1000),
//    setTimeout(() => {
//    bot.postMessageToChannel(channel, 'Estos son algunos comandos básicos:')}, 2000),
//    setTimeout(() => {
//    bot.postMessageToChannel(channel, '*@Loncheo bot platos balanceado*: te daré todos los platos balanceados del dia.')}, 4000),
//    setTimeout(() => {
//    bot.postMessageToChannel(channel, '*@Loncheo bot platos saludable*: te daré todos los platos saludables del dia.')}, 5000),
//    setTimeout(() => {
//    bot.postMessageToChannel(channel, '*@Loncheo bot platos ensalada*: te daré todas las ensaladas del dia.')}, 6000)
 });


    

bot.on('message', async (data) => {

 
    if (data.type !== 'message' || data.subtype == 'bot_message' || !data.text) return;

    const args = data.text.split(' ');
    const command = args.splice(1, 1)[0];
    const user_id = args.splice(0, 1)[0];
    const params = args.join(' ');

  console.log(data)

      console.log({ command, user_id, params});

    var dia = 'miercoles'

// bot.postMessageToUser('US3D9M350',  'gola')
// bot.postMessageToUser('TS4NL1KMH',  'hola')
// bot.postMessageToChannel('DUH91509Z', 'gooool')
// bot.getChannel()

    if(params === 'ha unido al canal' && command === 'se'){
        return bot.postMessageToChannel(channel, 'Hola! bienvenido al canal :smile:, escribe *@Loncheo bot ayuda* para ver la lista de comandos y pedir tu almuerzo.');
    }


    if(command != 'platos'){
        
        if(command === 'ayuda'){
            bot.postMessageToChannel(channel, "!Hola, soy Loncheo Bot!\n Te daré información util sobre los platos del día.\n Estos son algunos comandos básicos:\n *@Loncheo bot platos balanceado*: te daré todos los platos balanceados del dia.\n *@Loncheo bot platos saludable*: te daré todos los platos saludables del dia.\n *@Loncheo bot platos ensalada*: te daré todas las ensaladas del dia.");
        }else{
             return bot.postMessageToChannel(channel, 'Comando desconocido escribe *@Loncheo bot ayuda* para ver la lista de comandos.');
        }
    }



    if(params === '' && command === 'ayuda'){

    }else{
        if(params != 'balanceado' && params != 'saludable' && params != 'ensalada' ){

            return bot.postMessageToChannel(channel, 'Parametro desconocido escribe *@Loncheo bot ayuda* para ver la lista de comandos.');
   }
    }





    if (command === 'platos' && params) {
        try {
            const res = await axios.get(`http://localhost:8080/api/platos/${dia}/${params}`);
            if(res.data.plato.length > 1){

                for (var i = 0; i < res.data.plato.length; i++) {
                 
                    bot.postMessageToChannel(channel, `Nombre del plato: ${res.data.plato[i].nombre}\n Descripción: ${res.data.plato[i].descripcion} \n ${res.data.plato[i].image[0].url}`)
           
                 }
            }else{
                  bot.postMessageToChannel(channel, `Nombre del plato: ${res.data.plato[0].nombre}\n Descripción: ${res.data.plato[0].descripcion} \n ${res.data.plato[0].image[0].url}`)
            // setTimeout(() => {bot.postMessageToChannel(channel, `Descripción: ${res.data.plato[0].descripcion}`)}, 1000)
            // setTimeout(() => {bot.postMessageToChannel(channel, `${res.data.plato[0].image[0].url}`)}, 2000)
            }
          

        } catch (e) {
            return bot.postMessageToChannel(channel, 'No hay platos disponibles :cry:, intentalo mas tarde.');
        }
    }
});


bot.on('error', (error) => console.log(error))
