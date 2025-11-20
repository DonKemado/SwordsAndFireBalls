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
    //Depesdir unidad
    despedirUnidades() {
        //Verificamos que haya unidades que despeddir
        if (this.ejercitoJugador.length === 0) {
            alert("No tienes unidades que despedir");
            return;
        }
        //Mostrar unidades para pdoer despedirlas
        let listaUnidades = "***DESEPDIR UNIDADES***\n";
        listaUnidades += "Selecciona la unidad a despedir: \n\n";
        for (let i = 0; i < this.ejercitoJugador.length; i++) {
            const unidad = this.ejercitoJugador[i];
            listaUnidades += `${i + 1}. ${unidad.tipo} | Vida: ${unidad.puntosVida} | Ataque: ${unidad.poderAtaque}`;

            //Mostrar oro a recuperar
            if (unidad.tipo === 'Guerrero') {
                listaUnidades += ` | Oro recuperado: 500`;
            } else if (unidad.tipo === 'Ladron') {
                listaUnidades += ` | Oro recuperado: 750`;
            }else if (unidad.tipo === 'Mago') {
                listaUnidades += ` | Oro recuperado: 1000`;
            }
            listaUnidades += `\n`;
        }
        listaUnidades += `\n0.Cancelar`;

        //Usuario seleccione usted que unidad no va a daºr de comer a sus hijos este mes
        const seleccion = parseInt(prompt(listaUnidades));
        if (seleccion === 0) {
            alert("CANCELADISIMO");
            return;
        }
        //Por si el usuario es bobonsio
        if (isNaN(seleccion || seleccion < 1 || seleccion > this.ejercitoJugador.length)) {
            alert("Venga no me jodas :O");
            return;
        }
        //Unidad seleccionada
        //Como se me vuelva a olvidar un -1, me corto un brazo
        const unidadDespedida = this.ejercitoJugador[seleccion - 1];
        let oroRecuperado = 0;
        if (unidadDespedida.tipo === 'Guerrero')oroRecuperado = 500;
        else if (unidadDespedida.tipo === 'Ladron')oroRecuperado = 750;
        else if (unidadDespedida.tipo === 'Mago')oroRecuperado = 1000;
        //Eliminar unidad ejercito
        this.ejercitoJugador.splice(seleccion - 1, 1);
        //Añadir oro
        this.oro += oroRecuperado;
        alert(`${unidadDespedida.tipo} despedido. Has recuperado ${oroRecuperado} de oro`);
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