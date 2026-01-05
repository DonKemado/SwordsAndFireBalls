export default class Juego {
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
        this.dificultad = '';
        this.continuarJuego = true;
    }

    iniciarJuego() {

        alert('¡Bienvenido a Swords and FireBalls!');

        do {
            this.dificultad = prompt('Elige la dificultad: fácil o difícil').toLowerCase();
        } while (this.dificultad !== 'facil' && this.dificultad !== 'dificil');
        if (this.dificultad === 'facil') {
            this.rondas = 2;
        } else {
            this.rondas = 4;
        }
        this.menuPrincipal();
    }
    /**
     * Este metodo muestra el menu principal y gestiona a traves de un switch las diferentes opciones
     * @returns 
     */
    menuPrincipal() {
        //Menu visual que vera nuestro jugador
        let menuPrincipal = '***MENU***\n\n';
        //Estadísticas del juego
        menuPrincipal += `Rondas jugadas: ${this.rondasJugadas}/${this.rondas}`;
        menuPrincipal += ` | Derrotas: ${this.derrotasNow}/${this.derrotasMax}\n`;
        menuPrincipal += `Oro disponible: ${this.oro}`;
        menuPrincipal += ` | Ejercutio Jugador: ${this.ejercitoJugador.length} unidades\n`;
        menuPrincipal += `Intentos Contratación: ${this.intentosContratacion}\n\n`;
        //Opciones del juego
        menuPrincipal += '1. Contratar Unidades\n';
        menuPrincipal += '2. Despedir Unidades\n';
        menuPrincipal += '3. Combatir\n';
        menuPrincipal += '4. Recuperar Unidades\n';
        menuPrincipal += '5. Ver Estado de unidades\n';
        menuPrincipal += '6. Guardar Partida\n';
        menuPrincipal += '7. Salir';

        //Ahora el jugador tomará una decisión
        let eleccion = parseInt(prompt(menuPrincipal));

        switch (eleccion) {
            case 1:
                this.contratarUnidades();
                break;
            case 2:
                if (this.ejercitoJugador.length === 0) {
                    alert('No tienes unidades para despedir.');
                } else {
                    this.despedirUnidades();
                }
                break;
            case 3:
                if (this.ejercitoJugador.length === 0) {
                    alert('No tienes unidades para combatir.');
                } else {
                    this.combatir();
                }
                break;
            case 4:
                if (this.recuperacionDisponible && this.ejercitoJugador.length > 0) {
                    this.recuperarUnidades();
                } else if (!this.recuperacionDisponible) {
                    alert('No tienes la recuperacion disponible.');
                } else {
                    alert('No tienes unidades para recuperar.');
                }
                break;
            case 5:
                if (this.ejercitoJugador.length === 0) {
                    alert('No tienes unidades en tu ejercito.');
                } else {
                    this.verEstadoUnidades();
                }
                break;
            case 6:
                this.guardarPartida();
                break;
            case 7:
                let confirmarSalir = confirm('Estas seguro de que queires salir?');
                if (confirmarSalir) {
                    return this.continuarJuego = false;
                }
                break;
            default:
                alert('Opción no válida. Por favor, elige una opción del 1 al 7.');
                break;
        }
    }
    /**
     * 
     * @returns 
     */
    contratarUnidades() {
    //Verificaciones
    if (this.ejercitoJugador.length >= 5) {
        alert("Tu ejército ya está completo.");
        return;
    }

    if (this.intentosContratacion <= 0) {
        alert("No te quedan intentos de contratación.");
        return;
    }

    if (this.oro < 1000) {
        alert("No tienes el oro mínimo para contratar (1000).");
        return;
    }
    //Cada llamada consume intentos hasta que el jugador decida salir o se agoten
    let salir = false;
    while (!salir && this.intentosContratacion > 0 && this.ejercitoJugador.length < 5) {

        this.intentosContratacion--;

        //Generar 3 mercenarios
        const mercenarios = [];
        for (let i = 0; i < 3; i++) {
            const rand = Math.random();
            if (rand < 0.5) {
                mercenarios.push({
                    tipo: "Guerrero",
                    coste: 1000,
                    unidad: new Guerrero()
                });
            } else if (rand < 0.8) {
                mercenarios.push({
                    tipo: "Ladron",
                    coste: 1500,
                    unidad: new Ladron()
                });
            } else {
                mercenarios.push({
                    tipo: "Mago",
                    coste: 2000,
                    unidad: new Mago()
                });
            }
        }

        //Mostrar mercenarios
        let texto = "*** MERCENARIOS DISPONIBLES ***\n";
        mercenarios.forEach((m, index) => {
            const estado = this.oro >= m.coste ? "Contratable" : "No contratable";
            texto += `${index + 1}. ${m.tipo} - Coste: ${m.coste} oro (${estado})\n`;
        });

        texto += "\n0. No contratar a nadie";

        const eleccion = parseInt(
            prompt(
                texto +
                `\n\nIntentos restantes: ${this.intentosContratacion}` +
                `\nOro actual: ${this.oro}`
            )
        );

        if (eleccion === 0 || isNaN(eleccion)) {
            alert("No has contratado a nadie.");
            
        } else if (eleccion >= 1 && eleccion <= 3) {
            const elegido = mercenarios[eleccion - 1];
            if (this.oro < elegido.coste) {
                alert("No tienes oro suficiente para contratar esta unidad.");
            } else {
                this.oro -= elegido.coste;
                this.ejercitoJugador.push(elegido.unidad);
                alert(`${elegido.tipo} contratado con éxito.`);
            }
        } else {
            alert("Selección no válida.");
        }

        // Preguntar si quiere seguir intentando
        if (this.intentosContratacion > 0) {
            salir = !confirm("¿Quieres seguir intentando contratar?");
        }
    }
}

}