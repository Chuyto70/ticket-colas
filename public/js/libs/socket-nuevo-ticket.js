var socket = io()




socket.on('connect', () => {
    console.log('cliente conectado al servidor');
})

socket.on('disconnect', () => {
    console.log('Cliente desconectado del servidor');
})
socket.on('enviarTicket', (data) => {
    $('#lblNuevoTicket').text(data.actual)
    console.log(data.actual);
})

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        $('#lblNuevoTicket').text(siguienteTicket)
    })

})