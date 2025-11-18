class Juego {
    constructor() {
        this.rondas = 0; //2 si estamos en modo facil, 4 en modo dificil
        this.rondasJugadas = 0;
        this.derrotasMax = 2;
        this.derrotasNow = 0;
        this.oro = 0; //Nos tocará elegir la cantidad incial
        this.intentosContratacion = 6;
        this.recuperacionDisponible = false;
        this.ejercitoJugador = [];
        this.ejercitoEnemigo = [];
    }
    verificarFin() {
        if (this.rondasJugadas >= this.rondas) {
            return true; //El juego ha terminado
        }else if (this.derrotasNow >= this.derrotasMax) {
            return true; //El juego ha terminado
        }
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
    mostarMenu() {

    }
}
