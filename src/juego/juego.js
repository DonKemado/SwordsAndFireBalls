export default class Juego {
    constructor() {
        this.rondas = 0; //2 si estamos en modo facil, 4 en modo dificil
        this.rondasJugadas = 0;
        this.derrotasMax = 2;
        this.derrotasNow = 0;
        this.oro = 5000; //Nos tocará elegir la cantidad incial
        this.intentosContratacion = 6;
        this.recuperacionDisponible = false;
        this.ejercitoJugador = [];
        this.ejercitoEnemigo = [];
        this.dificultad = '';
    }
    iniciarJuego() {
        alert('¡Bienvenido a Swords and Fireballs!');

        while (this.dificultad !== 'facil' && this.dificultad !== 'dificil') {
            this.dificultad = prompt('Selecciona una dificultad: Facil o Dificil').toLowerCase();
        }

        this.rondas = this.dificultad === 'facil' ? 2 : 4;

        while (this.mostrarMenuPrincipal() !== 'salir') { }
    }

    mostrarMenuPrincipal() {
        const opciones = [
            "1. Contratar unidades",
            "2. Despedir unidades",
            "3. Atacar",
            "4. Recuperarse",
            "5.Ver estado de las unidades",
            "6.Guardar el juego",
            "7. Salir del juego"
        ];
        //Lo que enseña nuestro menu principal
        let menuTexto = "***MENU***\n";
        menuTexto += `Rondas: ${this.rondasJugadas}/${this.rondas} | Derrotas: ${this.derrotasNow}/${this.derrotasMax}\n`;
        menuTexto += `Oro: ${this.oro} | Ejercito: ${this.ejercitoJugador.length}/5\n`;
        menuTexto += `Intentos de contratación: ${this.intentosContratacion}\n\n`;
        menuTexto += opciones.join("\n");

        const eleccion = prompt(menuTexto + "\n\nSeleccione una opcion (1-7):");
        const opcionNumero = parseInt(eleccion);

        //Opciones
        switch (opcionNumero) {
            case 1:
                this.contratarUnidades();
                break;
            case 2:
                this.despedirUnidad();
                break;
            case 3:
                this.combatir();
                break;
            case 4:
            case 4:
                if (this.recuperacionDisponible) {
                    this.recuperarUnidades();
                } else {
                    alert("No puedes recuperarte ahora.");
                }
                break;
            case 5:
                this.verEstado();
                break;
            case 6:
                if (confirm("Guardar partida?")) {
                    this.guardarPartida();
                    alert("Partida guardada correctamente");
                    return;
                }
                break;
            case 7:
                let salir = prompt("Estas seguro de que quieres salir?");
                if (salir === 'si') {
                    return 'salir';
                } else {
                    return 'continuar';
                }
                break;
            default:
                alert("Opcion no valida, elige entre el 1 - 7");
        }
        return 'continuar';
    }

    contratarUnidades() {

    }

}