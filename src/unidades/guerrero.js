import Unidad from './unidad.js';

export default class Guerrero extends Unidad {

    constructor(tipo) {

        //Declaramos la vida y el ataque
        const puntosVidaMax = Math.floor(Math.random() * (100 - 60 + 1) + 60); //Entre 60 y 100
        const puntosAtaque = Math.floor(Math.random() * (20 - 10 + 1) + 10); //Entre 10 y 20

        super(puntosVidaMax, puntosAtaque, 'Guerrero');

        this.usosHabilidadEspecial = 3;
        this.usosMax = 3;
    }

    /**
     * 
     * @param {*} objetivo 
     * @returns 
     * Es como el metodo atacar de unidad pero utiliza si puede los ataques concentrados
     */
    atacar(objetivo) {
        if (!this.estaViva()) {
            alert(`${this.tipo} no puede atacar porque está KO.`);
            return;
        }
        let danyo = this.puntosAtaque;

        //Anyadimos los ataques concentrados si quedan
        if (this.usosHabilidadEspecial > 0) {
            const danyoExtra = Math.floor(Math.random() * (10 - 5 + 1) + 5); //Entre 5 y 10
            danyo += danyoExtra;
            this.usosHabilidadEspecial--;
            alert(`${this.tipo} usa Ataque Concentrado, causando ${danyoExtra} puntos de daño extra.`);
        }

        //Ventaja de tipo
        if (this.tieneVentajaSobre(objetivo)) {
            danyo = Math.floor(danyo * 1.5); //Para la ventaja de tipo
            alert('¡Ventaja de tipo! Daño aumentado.');
        }

        objetivo.recibirDanyo(danyo);
    }
    recuperar() {
        super.recuperar();
        this.usosHabilidadEspecial = this.usosMax;

        alert(`${this.tipo} se ha recuperado y ahora tiene ${this.puntosVida} puntos de vida y ${this.usosHabilidadEspecial} ataques concentrados.`);
    }
}