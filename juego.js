class Juego {
    constructor() {
        this.rondas = 0; //2 si estamos en modo facil, 4 en modo dificil
        this.rondasJugadas = 0;
        this.derrotasMax = 2;
        this.derrotasNow = 0;
        this.oro = 4000; //Nos tocará elegir la cantidad incial
        this.intentosContratacion = 6;
        this.recuperacionDisponible = false;
        this.ejercitoJugador = [];
        this.ejercitoEnemigo = [];
    }

s    //Introduce el modo a traves de int
    elegirDificultad(modo) {
        do {
            if (modo === 1) {
                this.rondas = 2;
            } else if (modo === 2) {
                this.rondas = 4;
            } else {
                alert("Modo de dificultad no válido.");
            }
        } while (modo !== 1 && modo !== 2);
    }
    mostrarMenu() {
        const opciones = [
            "1. Contratar unidades",
            "2. Despedir unidades",
            "3. Atacar",
            "4. Recuperarse",
            "5.Ver estado de las unidades",
            "6. Salir del juego"
        ];
        //Lo que enseña nuestro menu principal
        let menuTexto = "***MENU***\n";
        menuTexto += `Rondas: ${this.rondasJugadas}/${this.rondas} | Derrotas: ${this.derrotasNow}/${this.derrotasMax}\n`;
        menuTexto += `Oro: ${this.oro} | Ejercito: ${this.ejercitoJugador.length}/5\n`;
        menuTexto += `Intentos de contratación: ${this.intentosContratacion}\n\n`;
        menuTexto += opciones.join("\n");

        const eleccion = prompt(menuTexto + "\n\nSeleccione una opcion (1-6):");

        //SWITCH para las opciones
        return parseInt(eleccion);
    }
    //Si devuelve true, el juego termina
    verificarFin() {
        if (this.rondasJugadas >= this.rondas) {
            return 'ganado';
        }else if (this.derrotasNow >= this.derrotasMax) {
            return 'perdido';
        }
    }
}
const juego = new Juego();
juego.mostrarMenu();