const { io } = require('../server')

io.on('connection', (client) => {
    console.log('Alguien se conecto');


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    client.on('enviarMensaje', (mensaje, callback) => {

        client.broadcast.emit('enviarMensaje', mensaje)


        /*if (mensaje.usuario) {
            callback({
                resp: 'Todo salio perfecto!'
            })
        } else {
            callback('todo salio malisimo bro')
        }*/

    })


})