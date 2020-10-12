const fs = require('fs')


class Tickets {
    constructor(numero, escritorio) {

        this.numero = numero
        this.escritorio = escritorio
    }
}



class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.ticket = [];
        this.ultimos4 = [];

        let data = require('../data/data.json')


        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.ticket = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarDatos()
        }
    }




    siguienteNumero() {
        this.ultimo += 1
        let tickets = new Tickets(this.ultimo, null);
        //console.log(this.ticket)
        this.ticket.push(tickets)

        this.grabarDatos()


        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {

        if (this.ticket.length === 0) {
            return 'No hay nada que hacer'
        }

        let numeroTicket = this.ticket[0].numero
        this.ticket.shift()


        let atenderTicket = new Tickets(numeroTicket, escritorio)

        this.ultimos4.unshift(atenderTicket)

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1)
        }



        this.grabarDatos()
        return atenderTicket

    }
    recargar() {
        location.reload()
    }


    reiniciarDatos() {

        this.ultimo = 0;
        this.ticket = [];
        this.ultimos4 = []
        this.grabarDatos()
    }

    grabarDatos() {

        let info = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.ticket,
            ultimos4: this.ultimos4
        };

        let infotoJson = JSON.stringify(info)

        fs.writeFileSync('./server/data/data.json', infotoJson)
    }
}


module.exports = { TicketControl }