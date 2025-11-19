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

    //Introduce el modo a traves de int
    elegirDificultad() {
        let modo;
        do {
            modo = parseInt(prompt("Elige dificultad:\n1. Fácil (2 rondas)\n2. Difícil (4 rondas)"));

            if (modo === 1) {
                this.rondas = 2;
            } else if (modo === 2) {
                this.rondas = 4;
            } else {
                alert("Modo no válido. Elige 1 o 2.");
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
        const opcionNumero = parseInt(eleccion);

        //Opciones
        switch (opcionNumero) {
            case 1:
                this.gestionarContratacion();
                break;
            case 2:
                this.despedirUnidad();
                break;
            case 3:
                this.combatir();
                break;
            case 4:
                this.recuperarUnidades();
                break;
            case 5:
                this.verEstado();
                break;
            case 6:
                //Creo que se hace más fácil con un confirm
                let salir = prompt("Estas seguro de que quieres salir?");
                if (salir === 'si') {
                    return 'salir';
                } else {
                    return 'continuar';
                }
                break;
            default:
                alert("Opcion no valida, elige entre el 1 - 6");
        }
        return 'continuar';
    }

    //Texto sencillito que junta caracteristicas de las unidades del jugador,
    //y las junta en estadoTexto para devolverlas por el swich del menu principal
    verEstado() {
        let estadoTexto = "***ESTADO***\n";
        estadoTexto += `Oro: ${this.oro} | Unidades: ${this.ejercitoJugador.length}/5\n\n`;
        if (this.ejercitoJugador.length === 0) {
            estadoTexto += "No tienes unidades en tu ejercito\n";
        } else {
            for (let i = 0; i < this.ejercitoJugador.length; i++) {
                const unidad = this.ejercitoJugador[i];
                estadoTexto += `${i + 1}. ${unidad.tipo} | Vida: ${unidad.puntosVida} | Ataque: ${unidad.poderAtaque}\n`;
            }
        }
        alert(estadoTexto);
    }

    recuperarUnidades() {
        //Comprobar si hay unidades de para recuperar
        if (this.ejercitoJugador.length === 0) {
            alert("No hay unidades en tu equipo");
            return;
        }
        //Comprobar si recuperacion disponible
        if (!this.recuperacionDisponible) {
            alert("Recuperacion no disponible");
            return;
        }
        //Ahora si, recuperar unidades:
        for (let i = 0; i < this.ejercitoJugador.length; i++) {
            const unidad = this.ejercitoJugador[i];
            //70% de la vida maxima añadida
            const vidaRecuperada = Math.floor(unidad.puntosVidaMaximos * 0.7);
            unidad.puntosVida += vidaRecuperada;
            //Por si acaso excede la vida máxima
            if (unidad.puntosVida > unidad.puntosVidaMaximos) {
                unidad.puntosVida = unidad.puntosVidaMaximos;
            }
            //Recargar habilidades
            unidad.usosHabilidad = unidad.usosMaximos;
            if (unidad.tipo === 'Mago') {
                unidad.bolaFuegoUsada = false;
            }
        }
        //Desactivamos la recuperacion
        this.recuperacionDisponible = false;

        alert("Unidades recuperadas!");
    }

    //Verificacion de que el juego termina
    verificarFin() {
        if (this.rondasJugadas >= this.rondas) {
            return 'ganado';
        } else if (this.derrotasNow >= this.derrotasMax) {
            return 'perdido';
        }
        return 'continuar';
    }
}