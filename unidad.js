class Unidad {
    constructor(tipo, puntosVida, poderAtaque, costo){
        this.tipo = tipo;
        this.puntosVida = puntosVida;
        this.puntosVidaMaximos = puntosVida;
        this.poderAtaque = poderAtaque;
        this.costo = costo;
        this.gananciaDespido = this.calcularGananciaDespido();
        this.usosHabilidad = this.calcularUsosIniciales();
        this.usosMaximos = this.usosHabilidad;
        this.bolaFuegoUsada = false;
    }

    calcularGananciaDespido() {
        if (this.tipo === 'Guerrero') return 500;
        if (this.tipo === 'Ladron') return 750;
        if (this.tipo === 'Mago') return 1000;
        return 0;
    }

    calcularUsosIniciales() {
        if (this.tipo === 'Guerrero') return 3;
        if (this.tipo === 'Ladron') return 2;
        if (this.tipo === 'Mago') return 1;
        return 0;
    }

    estaKO() {
        return this.puntosVida <= 0;
    }

    recuperar() {
        this.puntosVida = Math.floor(this.puntosVidaMaximos * 0.7);
        this.usosHabilidad = this.usosMaximos;
        this.bolaFuegoUsada = false;
    }
}