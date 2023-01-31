const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('ready', () => {
    console.log('Client is ready!');

    listenMessage();
});

const listenMessage = () => {
    client.on('message', (msg) => {
        const { from, to, body } = msg;
        
        console.log(from, to, body);
        
        switch(body.toUpperCase()) {
            case 'HOLA':
                sendMessage(from, 'Hola que tal');
            break;
            case 'DON DANY':
                sendMessage(from, 'Digame usted');
            break;
            case 'DANY':
                sendMessage(from, '*DON DANY POR FAVOR*');
            break;
            case 'DON DANI':
                sendMessage(from, 'Digame usted');
            break;
            case 'DANI':
                sendMessage(from, '*DON DANY POR FAVOR*');
            break;
        }
        let mensaje = body.toUpperCase();

        if(mensaje.includes("HOLA")){
            sendMessage(from, 'Hola mucho gusto!');
        }
        if(mensaje.includes("DON DAN")){
            sendMessage(from, 'DON DANIEL A SUS ORDENES QUE SE LE OFRECE!');
        }
    })
}

const sendMessage = (to, message) => {
    
    client.sendMessage(to, message)

}

// para buscar palabra en String utilizar .includes('_ palabra _');