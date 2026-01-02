import Unidad from './unidad.js';

export default class Mago extends Unidad {

    constructor() {

        const puntosVidaMax = Math.floor(Math.random() * (60 - 40 + 1) + 40); //Entre 40 y 60
        const puntosAtaque = Math.floor(Math.random() * (20 - 10 + 1) + 10); //Entre 10 y 20

        super(puntosVidaMax, puntosAtaque, 'Mago');

        this.fireball = true; //Puede lanzar fireball una vez por combate
    }

    atacar(objetivo) {
        if (!this.estaViva()) {
            alert(`${this.tipo} no puede atacar porque está KO.`);
            return;
        }

        let danyo = this.puntosAtaque;

        //Anyadimos el fireball al primer ataque
        if (this.fireball) {
            danyo = 60; //Fireball hace 60 de daño
            this.fireball = false;
            alert(`${this.tipo} lanza Fireball, causando 60 puntos de daño.`);
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
        this.fireball = true;

        alert(`${this.tipo} se ha recuperado y ahora tiene ${this.puntosVida} puntos de vida y puede usar Fireball de nuevo.`);
    }
}