var socket = io()

let searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
}



let escritorio = searchParams.get('escritorio')



$('h1').text('Escritorio : ' + escritorio)

$('#boton').on('click', function() {



    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay nada que hacer') {
            alert('Ya no hay tickets por atender')
            $('small').text('No hay tickets')
            return
        }
        $('small').text('ticket numero ' + resp.numero)

    })

})