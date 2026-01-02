class Unidad {

    constructor(puntosVidaMax, puntosAtaque, tipo) {
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
        if (!this.estaViva()) {
            alert(`${this.tipo} no puede atacar porque está KO.`);
            return;
        }

        let danyo = this.puntosAtaque;

        if (this.tieneVentajaSobre(objetivo)) {
            danyo = Math.floor(danyo * 1.5); //Para la ventaja de tipo
            alert('¡Ventaja de tipo! Daño aumentado.');
        }

        alert(`${this.tipo} ataca a ${objetivo.tipo} causando ${danyo} puntos de daño.`);
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
            this.puntosVida = 0;
            this.estaKO = true;
            alert(`${this.tipo} ha sido derrotado y está KO.`);
        }
    }

    estaViva() {
        return !this.estaKO;
    }

    /**
     * Recura la unidad un 70% de su vida maxima
     */
    recuperar() {
        const vidaRecuperada = Math.floor(this.puntosVidaMax * 0.7);
        this.puntosVida = Math.min(this.puntosVida + vidaRecuperada, this.puntosVidaMax);
        this.estaKO = false;

        alert(`${this.tipo} se ha recuperado y ahora tiene ${this.puntosVida} puntos de vida.`);
    }

    /**
     * 
     * @returns Devuelve un string con info de la Unidad
     */
    getEstado() {
        return `${this.tipo}
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