class Juego {
    constructor() {
        this.rondas = 0; //2 si estamos en modo facil, 4 en modo dificil
        this.rondasJugadas = 0;
        this.derrotasMax = 2;
        this.derrotasNow = 0;
        this.oro = 5000; //Nos tocará elegir la cantidad incial
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
            "6.Guardar el juego",
            "7. Salir del juego"
        ];
        //Lo que enseña nuestro menu principal
        let menuTexto = "***MENU***\n";
        menuTexto += `Rondas: ${this.rondasJugadas}/${this.rondas} | Derrotas: ${this.derrotasNow}/${this.derrotasMax}\n`;
        menuTexto += `Oro: ${this.oro} | Ejercito: ${this.ejercitoJugador.length}/5\n`;
        menuTexto += `Intentos de contratación: ${this.intentosContratacion}\n\n`;
        menuTexto += opciones.join("\n");

        const eleccion = prompt(menuTexto + "\n\nSeleccione una opcion (1-7):");
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
                if (confirm("Guardar partida?")) {
                    this.guardarPartida();
                    alert("Partida guardada correctamente");
                    return;
                }
                break;
            case 7:
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
    despedirUnidad() {
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
            } else if (unidad.tipo === 'Mago') {
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
        if (unidadDespedida.tipo === 'Guerrero') oroRecuperado = 500;
        else if (unidadDespedida.tipo === 'Ladron') oroRecuperado = 750;
        else if (unidadDespedida.tipo === 'Mago') oroRecuperado = 1000;
        //Eliminar unidad ejercito
        this.ejercitoJugador.splice(seleccion - 1, 1);
        //Añadir oro
        this.oro += oroRecuperado;
        alert(`${unidadDespedida.tipo} despedido. Has recuperado ${oroRecuperado} de oro`);
    }

    //Verificacion de que el juego termina
    verificarFin() {
        //Si pierde 2 combates
        if (this.derrotasNow >= this.derrotasMax) {
            return 'perdido';
        }
        //Si jugó todos los combates requeridos, gana
        else if (this.rondasJugadas >= this.rondas) {
            return 'ganado';
        }
        return 'continuar';
    }

    gestionarContratacion() {
        //Gestion de errores
        //Verificar intentos
        if (this.intentosContratacion < 0) {
            alert("No te quedan intentos");
            return;
        }
        //Espacio en ejercito
        if (this.ejercitoJugador.length >= 5) {
            alert("Tienes 5/5 unidades");
            return;
        }
        //Verificar oro mínimo
        if (this.oro < 1000) {
            alert("No tienes suficiente oro");
            return;
        }

        let volverAlMenu = false;

        while (!volverAlMenu && this.intentosContratacion > 0) {
            //Generar mercenarios
            const mercenarios = [];
            for (let i = 0; i < 3; i++) {
                const random = Math.random(); //Creamos un número random
                let tipo, costo, vidaMin, vidaMax;
                //Dependiendo del numero que salga se generara, uno u otro tipo
                if (random < 0.5) {
                    tipo = "Guerrero";
                    costo = 1000;
                    vidaMin = 60;
                    vidaMax = 100;
                } else if (random < 0.8) {
                    tipo = "Ladron";
                    costo = 1500;
                    vidaMin = 50;
                    vidaMax = 80;
                } else {
                    tipo = "Mago";
                    costo = 2000;
                    vidaMin = 40;
                    vidaMax = 60;
                }
                //Vida y ataque aleatorios dentro de los rangos
                const puntosVida = Math.floor(Math.random() * (vidaMax - vidaMin + 1)) + vidaMin;
                const poderAtaque = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

                //Verificar si el mercenario es contratable
                const contratable = this.oro >= costo && this.ejercitoJugador.length < 5;
                //Guardalo en la lista
                mercenarios.push({
                    tipo,
                    puntosVida,
                    poderAtaque,
                    costo,
                    contratable
                });
            }
            //Mostrar opciones(MENU)
            let menuContratacion = "***CONTRATAR MERCENARIOS***\n";
            menuContratacion += `Oro disponible: ${this.oro} | Espacio: ${this.ejercitoJugador.length}/5\n\n`;

            //Para cada mercenario muestra su info
            for (let i = 0; i < mercenarios.length; i++) {
                const merc = mercenarios[i];
                const numero = i + 1;
                const estado = merc.contratable ? "Es contratable" : "No es contratable";
                menuContratacion += `${numero}.${merc.tipo} | Vida: ${merc.puntosVida} | Ataque: ${merc.poderAtaque} | Costo: ${merc.costo} | ${estado}\n`;
            }

            //Opción para el RE-ROLL
            menuContratacion += `\n4. Ver más mercenarios (gasta 1 intento)`;
            //Opción para cancelar y volver al menu
            menuContratacion += `\n0. Volver al menu`;
            menuContratacion += `\n\nIntentos restantes ${this.intentosContratacion}/6`;

            //Si se elige un mercenario contratable, empieza el proceso para añadirlo a tu seleccion
            const seleccion = parseInt(prompt(menuContratacion));

            //Procesar eleccion
            if (seleccion === 0) {
                alert("Contratacion cancelada");
                this.intentosContratacion--;
                volverAlMenu = true;
            } else if (seleccion === 4) {
                //RE-ROLL
                this.intentosContratacion--;
                alert("Buscando nuevos mercenarios...");
                //El bucle continuará con nuevos mercenarios
            } else if (seleccion >= 1 && seleccion <= 3) {
                const mercenarioSeleccionado = mercenarios[seleccion - 1];

                if (!mercenarioSeleccionado.contratable) {
                    alert("Este mercenario no es contratable (falta oro o espacio)");
                } else {
                    //Ahora toca crear una y añadirla
                    //Primero restamos el oro
                    this.oro -= mercenarioSeleccionado.costo;

                    const nuevaUnidad = new Unidad(
                        mercenarioSeleccionado.tipo,
                        mercenarioSeleccionado.puntosVida,
                        mercenarioSeleccionado.poderAtaque,
                        mercenarioSeleccionado.costo
                    );

                    this.ejercitoJugador.push(nuevaUnidad);
                    alert(`Has contratado a un ${mercenarioSeleccionado.tipo} por ${mercenarioSeleccionado.costo} de oro`);
                    volverAlMenu = true; //VOLVER AL MENU PRINCPAL, me cago en la leche QUE ESTA FALLLAAANDO
                }
                this.intentosContratacion--;
            } else {
                alert("Seleccion no valida");
            }

            //Verificar si intentos es menor que 0
            if (this.intentosContratacion < 0) {
                alert("¡Se te acabaron los intentos de contratación!");
                volverAlMenu = true;
            }
        }
    }

    combatir() {
        //Verificar si existen unidades para combatir
        if (this.ejercitoJugador.length === 0) {
            alert("No tienes unidades");
            return;
        }

        //Verificar si no todo el mundo KO
        const unidadesActivas = this.ejercitoJugador.filter(unidad => unidad.puntosVida > 0);
        if (unidadesActivas.length === 0) {
            alert("Todas tus unidades estan KO");
            return;
        }

        //Generar ejercito enemigo (3-5 unidades)
        const cantidadEnemigos = Math.floor(Math.random() * 3) + 3;
        this.ejercitoEnemigo = [];

        for (let i = 0; i < cantidadEnemigos; i++) {
            const random = Math.random();
            let tipo, vidaMin, vidaMax;

            if (random < 0.5) {
                tipo = "Guerrero";
                vidaMin = 60;
                vidaMax = 100;
            } else if (random < 0.8) {
                tipo = "Ladron";
                vidaMin = 50;
                vidaMax = 80;
            } else {
                tipo = "Mago";
                vidaMin = 40;
                vidaMax = 60;
            }

            const puntosVida = Math.floor(Math.random() * (vidaMax - vidaMin + 1)) + vidaMin;
            const poderAtaque = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

            // CALCULAR COSTO SEGÚN TIPO
            let costo = 0;
            if (tipo === "Guerrero") costo = 1000;
            else if (tipo === "Ladron") costo = 1500;
            else if (tipo === "Mago") costo = 2000;

            this.ejercitoEnemigo.push(new Unidad(tipo, puntosVida, poderAtaque, costo));
        }

        alert(`COMIENZA EL COMBATE :D\nEnemigos: ${cantidadEnemigos} unidades`);

        //Combate 1vs1
        let rondasGanadas = 0;
        let rondasPerdidas = 0;
        let logCombate = "***REGISTRO COMBATE***\n";

        while (this.ejercitoJugador.length > 0 && this.ejercitoEnemigo.length > 0) {
            //Busca la primera unidad del jugador que no esta KO
            let unidadJugadorIndex = this.ejercitoJugador.findIndex(unidad => unidad.puntosVida > 0);
            if (unidadJugadorIndex === -1) break; //Si todos KO

            const unidadJugador = this.ejercitoJugador[unidadJugadorIndex];
            const unidadEnemiga = this.ejercitoEnemigo[0];

            logCombate += `\n***RONDA ${rondasGanadas + rondasPerdidas + 1} ***\n`;
            logCombate += `Tu ${unidadJugador.tipo} (Vida: ${unidadJugador.puntosVida}) vs Enemigo ${unidadEnemiga.tipo} (Vida: ${unidadEnemiga.puntosVida})\n`;

            //COMIENZAS LAS HOSTIAS
            //Turno siempre empieza por el jugador
            let dañoJugador = unidadJugador.poderAtaque;
            //Aplicar ventajas
            if ((unidadJugador.tipo === 'Mago' && unidadEnemiga.tipo === 'Guerrero')
                || (unidadJugador.tipo === 'Guerrero' && unidadEnemiga.tipo === 'Ladron')
                || (unidadJugador.tipo === 'Ladron' && unidadEnemiga.tipo === 'Mago')) {
                dañoJugador = Math.floor(dañoJugador * 1.5);
                logCombate += `AUMENTO\n Daño aumentado a ${dañoJugador}\n`;
            }
            //Habilidad Mago (FIREBALL)
            if (unidadJugador.tipo === 'Mago' && !unidadJugador.bolaFuegoUsada) {
                dañoJugador = 60;
                unidadJugador.bolaFuegoUsada = true;
                logCombate += `FIIIIIREBAAAAAL\n`;
            }

            //Habilidad especial de guerrero (ataques concentrados)
            if (unidadJugador.tipo === 'Guerrero' && unidadJugador.usosHabilidad > 0) {
                const dañoExtra = Math.floor(Math.random() * 6) + 5;
                dañoJugador += dañoExtra;
                unidadJugador.usosHabilidad--;
                logCombate += `ATAQUEEE +${dañoExtra} daño\n`;
            }
            //Habilidad ladron enemigo
            if (unidadEnemiga.tipo === 'Ladron' && unidadEnemiga.usosHabilidad > 0) {
                if (Math.random() < 0.35) {
                    logCombate += `Esquivo leo tus derechos, no tenes(ladrón enemigo no recibe daño)`;
                    unidadEnemiga.usosHabilidad--;
                    continue; //El ladron esquiva, por lo que no recibe daño
                }
            }
            //Aplicar daño AL enemigo
            unidadEnemiga.puntosVida -= dañoJugador;
            logCombate += `Tu ataque: ${dañoJugador} daño | Enemigo vida restante: ${Math.max(0, unidadEnemiga.puntosVida)}\n`;

            //Enemigo muerto?
            if (unidadEnemiga.puntosVida <= 0) {
                this.ejercitoEnemigo.shift();
                logCombate += `K.O.\n`;
                rondasGanadas++;
                continue; //Sigue a la siguietne ronda
            }

            //Turno del enemigo(Tiene que estar vivo)
            let dañoEnemigo = unidadEnemiga.poderAtaque;
            // Aplicar ventajas enemigas
            if ((unidadEnemiga.tipo === 'Mago' && unidadJugador.tipo === 'Guerrero')
                || (unidadEnemiga.tipo === 'Guerrero' && unidadJugador.tipo === 'Ladron')
                || (unidadEnemiga.tipo === 'Ladron' && unidadJugador.tipo === 'Mago')) {
                dañoEnemigo = Math.floor(dañoEnemigo * 1.5);
                logCombate += `AUMENTO\nDaño aumentado a ${dañoEnemigo}\n`;
            }
            //Habilidad especial ladron (JUGADOR)
            if (unidadJugador.tipo === 'Ladron' && unidadJugador.usosHabilidad > 0) {
                if (Math.random() < 0.35) {
                    logCombate += `Me desaparezco(ladrón no recibe daño)\n`;
                    unidadJugador.usosHabilidad--;
                    continue; //Siguiente ronda
                }
            }

            //Aplicar daño DEL enemigo
            unidadJugador.puntosVida -= dañoEnemigo;
            logCombate += `Ataque enemigo: ${dañoEnemigo} | Jugador vida restante: ${Math.max(0, unidadJugador.puntosVida)}\n`;

            //Verificar si tu unidad c murio
            // JUGADOR NO SE ELIMINA
            if (unidadJugador.puntosVida <= 0) {
                logCombate += `K.O.\n`;
                unidadJugador.puntosVida = 0;
                rondasPerdidas++;
            }
        }
        //Determinar resultado del combate
        let resultado = "";
        let oroGanado = 0;

        // Verificar si el jugador tiene unidades activas
        const jugadorTieneUnidadesActivas = this.ejercitoJugador.some(unidad => unidad.puntosVida > 0);

        if (this.ejercitoEnemigo.length === 0 && jugadorTieneUnidadesActivas) {
            resultado = "VICTORIAAA";
            oroGanado = cantidadEnemigos * 500; //CAMBIALO PUTO VAGO
            this.oro += oroGanado;
            this.intentosContratacion = 6;
        } else {
            resultado = "Derrota...";
            this.derrotasNow++;
            this.intentosContratacion = 6;
        }
        this.recuperacionDisponible = true;
        this.rondasJugadas++;
        //Mostrar resultado final
        logCombate += `\n*** RESULTADO FINAL ***\n`;
        logCombate += `${resultado}\n`;
        logCombate += `Rondas victioroso: ${rondasGanadas} | Rondas perdidas: ${rondasPerdidas}\n`;

        if (oroGanado > 0) {
            logCombate += `Oro ganado: +${oroGanado}\n`;
            logCombate += `Recuperacion disponible: Ci\n`;
        }

        alert(logCombate);
    }

    //METODO PARA GUARDAR LA PARTIDA
    guardarPartida() {
        //Objeto con todos los datos de la partida
        const datosPartida = {
            //Config
            rondas: this.rondas,
            derrotasMax: this.derrotasMax,
            //EstadoActual
            rondasJugadas: this.rondasJugadas,
            derrorasNow: this.derrotasNow,
            oro: this.oro,
            intentosContratacion: this.intentosContratacion,
            recuperacionDisponible: this.recuperacionDisponible,
            //Ejercito jugador y enemigo(Aunque se puede guardar mientras estas en combate?)
            ejercitoJugador: this.ejercitoJugador,
            ejercitoEnemigo: this.ejercitoEnemigo
        };

        //Convertir a JSON y guardar el localStorage
        localStorage.setItem('partidaGuardada', JSON.stringify(datosPartida));
    }
    cargarPartida() {
        const datosJSON = localStorage.getItem('partidaGuardada');

        if (!datosJSON) {
            alert("No hay partida guardada");
            return;
        }
        try {
            const datos = JSON.parse(datosJSON);
            //Restaurar todos los datos
            this.rondas = datos.rondas;
            this.derrotasMax = datos.derrotasMax;
            this.rondasJugadas = datos.rondasJugadas;
            this.oro = datos.oro;
            this.intentosContratacion = datos.intentosContratacion;
            this.recuperacionDisponible = datos.recuperacionDisponible;
            //Objetos planos a instancias para el ejercito
            this.ejercitoJugador = datos.ejercitoJugador.map(unidadData => new unidad(
                unidadData.tipo,
                unidadData.puntosVida,
                unidadData.poderAtaque,
                unidadData.costo
            ));
            // Restaurar propiedades adicionales de las unidades
            this.ejercitoJugador.forEach((unidad, index) => {
                const unidadData = datos.ejercitoJugador[index];
                unidad.puntosVidaMaximos = unidadData.puntosVidaMaximos;
                unidad.gananciaDespido = unidadData.gananciaDespido;
                unidad.usosHabilidad = unidadData.usosHabilidad;
                unidad.usosMaximos = unidadData.usosMaximos;
                unidad.bolaFuegoUsada = unidadData.bolaFuegoUsada;
            });
            // Hacer lo mismo para el ejército enemigo si existe
        this.ejercitoEnemigo = datos.ejercitoEnemigo ? 
            datos.ejercitoEnemigo.map(unidadData => 
                new Unidad(
                    unidadData.tipo,
                    unidadData.puntosVida,
                    unidadData.poderAtaque,
                    unidadData.costo
                )
            ) : [];
        
        alert("Partida cargada correctamente");
        }catch(error) {
            alert(`Error al cargar ${error.message}`);
        }
    }
}