const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl()

io.on('connection', (client) => {
    console.log('Alguien se conecto');


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteNumero()
        console.log(siguiente)
        callback(siguiente)


    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio no valido desde el clienton atenderticket'
            })
        }


        let atenderTicket = ticketControl.atenderTicket(data.escritorio)
        callback(atenderTicket)

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })

    client.emit('enviarTicket', { actual: ticketControl.getUltimoTicket() })






})