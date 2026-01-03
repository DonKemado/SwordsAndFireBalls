import Unidad from '../unidad.js';

export class Ladron extends Unidad {

    constructor() {

        const puntosVidaMax = Math.floor(Math.random() * (80 - 50 + 1)) + 50; //Vida entre 50 y 80
        const puntosAtaque = Math.floor(Math.random() * (20 - 10 + 1)) + 10; //Ataque entre 10 y 20

        super(puntosVidaMax, puntosAtaque, 'Ladron');

        this.usosHabilidadEspecial = 2; 
        this.usosMax = 2;
        this.probabilidadEsquivar = 0.35; //35% de probabilidad de esquivar
    }

    /**
     * 
     * @param {*} danyo 
     * @returns 
     * Es como el metodo recibir danyo de unidad pero comprueba si el ladron esquiva
     */
    recibirDanyo(danyo) {
        if (this.estaKO) return;

        //Comprobamos si esquiva
        if (this.usosHabilidadEspecial > 0 && Math.random() < this.probabilidadEsquivar) {
            this.usosHabilidadEspecial--;
            alert(`${this.tipo} ha esquivado el ataque.`);
            return;
        }

        super.recibirDanyo(danyo);
        
    }

    recuperar() {
        super.recuperar();
        this.usosHabilidadEspecial = this.usosMax;

        alert(`${this.tipo} se ha recuperado y ahora tiene ${this.puntosVida} puntos de vida y ${this.usosHabilidadEspecial} esquivas disponibles.`);
    }
}