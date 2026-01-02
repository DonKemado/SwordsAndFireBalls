class Unidad {

    constructor(nombre, puntosVidaMax, puntosAtaque, tipo) {
        this.nombre = nombre;
        this.puntosVidaMax = puntosVidaMax;
        this.puntosVida = puntosVidaMax;
        this.puntosAtaque = puntosAtaque;
        this.tipo = tipo; //Sera Guerrero, Ladron, Mago
        this.estaKO = false;
    }

    /**
     * 
     * @param {*} objetivo 
     * @returns 
     * Comprueba que la unidad no este KO, y si tiene ventaja de tipo sobre el objetivo
     */
    atacar(objetivo) {
        if (!this.estaVida()) {
            console.log(`${this.nombre} no puede atacar porque está KO.`);
            return;
        }

        let danyo = this.puntosAtaque;

        if (this.tieneVentajaSobre(objetivo)) {
            danyo = Math.floor(danyo * 1.5); //Para la ventaja de tipo
            console.log('¡Ventaja de tipo! Daño aumentado.');
        }

        console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${danyo} puntos de daño.`);
        objetivo.recibirDanyo(danyo);
    }

    /**
     * 
     * @param {*} danyo 
     * @returns 
     * Resta los puntos de vida y comprueba si la unidad queda KO
     */
    recibirDanyo(danyo) {
        if (this.estaKO) return;
        this.puntosVida -= danyo;
        if (this.puntosVida <= 0) {
            this.puntosAtaque = 0;
            this.estaKO = true;
            console.log(`${this.nombre} ha sido derrotado y está KO.`);
        }
    }

    estaVida() {
        return !this.estaKO;
    }

    /**
     * Recura la unidad un 70% de su vida maxima
     */
    recuperar() {
        const vidaRecuperada = Math.floor(this.puntosVidaMax * 0.7);
        this.puntosVida = Math.min(this.puntosVida + vidaRecuperada, this.puntosVidaMax);
        this.estaKO = false;

        console.log(`${this.nombre} se ha recuperado y ahora tiene ${this.puntosVida} puntos de vida.`);
    }

    /**
     * 
     * @returns Devuelve un string con info de la Unidad
     */
    getEstado() {
        return `${this.nombre} (${this.tipo})
            Vida: ${this.puntosVida}/${this.puntosVidaMax}
            Ataque: ${this.puntosAtaque}
            Estado: ${this.estaKO ? "KO" : "Activo"}
        `;
    }

    /**
     * 
     * @param {*} objetivo 
     * @returns Devuelve booleano si hay ventaja
     */
    tieneVentajaSobre(objetivo) {
        return (
                (this.tipo === 'Guerrero' && objetivo.tipo === 'Ladron') ||
                (this.tipo === 'Ladron' && objetivo.tipo === 'Mago') ||
                (this.tipo === 'Mago' && objetivo.tipo === 'Guerrero')
            );
    }
}