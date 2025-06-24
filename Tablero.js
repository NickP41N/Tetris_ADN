/*
 * Tablero.js
 * Este archivo contiene la clase Tablero, que representa el tablero del juego Tetris.
 * Gestiona la matriz de juego, almacena las piezas y maneja la lógica del tablero.
 *
 * Si eres principiante, revisa los comentarios en cada función para entender cómo funciona el almacenamiento y la verificación de líneas.
 */
class Tablero {
  /**
   * Constructor de la clase Tablero
   * Inicializa las dimensiones y propiedades del tablero de juego
   */
  constructor() {
    // Dimensiones del tablero
    this.columnas = 10;
    this.filas = 20;
    this.lado_celda = 25;
    this.ancho = this.columnas * this.lado_celda;
    this.alto = this.filas * this.lado_celda;

    // Posición inicial del tablero en el canvas
    this.posicion = createVector(
      MARGE_TABLERO,
      MARGE_TABLERO + this.lado_celda
    );

    // Inicialización de la matriz de juego
    this.minosAlmacenados = Array(this.filas)
      .fill()
      .map(() => Array(this.columnas).fill(""));
  }

  /**
   * Almacena los minos de un tetrimino en el tablero
   * @param {Tetrimino} tetrimino - El tetrimino que se va a almacenar
   */
  almacenarMinos(tetrimino) {
    // Verificar colisión con los límites
    for (const pmino of tetrimino.mapaTablero) {
      if (pmino.y < 0) {
        // Game Over si colisiona con la parte superior
        reproducirSonido("gameOver");
        alert("Game Over!\nEl juego se reiniciará.");
        tablero = new Tablero();
        tetrimino = new Tetrimino();
        lineas_hechas = 0;
        return;
      }
    }

    // Almacenar los minos en el tablero
    for (const pmino of tetrimino.mapaTablero) {
      if (
        pmino.y >= 0 &&
        pmino.y < this.filas &&
        pmino.x >= 0 &&
        pmino.x < this.columnas
      ) {
        this.minosAlmacenados[pmino.y][pmino.x] = tetrimino.nombre;
      }
    }

    // Verificar y eliminar líneas completas
    this.verificarLineasCompletas();
  }

  /**
   * Verifica si hay líneas completas y las elimina
   */
  verificarLineasCompletas() {
    let lineasAEliminar = [];

    // Revisar cada fila desde abajo hacia arriba
    for (let fila = this.filas - 1; fila >= 0; fila--) {
      let lineaCompleta = true;

      // Verificar si la fila está completa
      for (let columna = 0; columna < this.columnas; columna++) {
        if (this.minosAlmacenados[fila][columna] === "") {
          lineaCompleta = false;
          break;
        }
      }

      // Si la fila está completa, agregarla a la lista
      if (lineaCompleta) {
        lineasAEliminar.push(fila);
      }
    }

    // Si hay líneas para eliminar
    if (lineasAEliminar.length > 0) {
      console.log("Líneas completas encontradas:", lineasAEliminar);
      this.eliminarLineas(lineasAEliminar);
    }
  }

  /**
   * Elimina las líneas completas y desplaza las piezas superiores
   * @param {number[]} lineas - Array con los índices de las filas a eliminar
   */
  eliminarLineas(lineas) {
    console.log("Líneas a eliminar:", lineas);

    // Reproducir sonido según el número de líneas eliminadas
    if (lineas.length === 4) {
      reproducirSonido("tetris"); // Sonido especial para Tetris (4 líneas)
    } else if (lineas.length >= 1) {
      reproducirSonido("lineClear"); // Sonido para 1-3 líneas
    }

    // Actualizar el contador de líneas
    lineas_hechas += lineas.length;

    // Reconstruir el tablero solo con las filas no eliminadas
    let nuevasFilas = [];
    for (let fila = 0; fila < this.filas; fila++) {
      if (!lineas.includes(fila)) {
        nuevasFilas.push(this.minosAlmacenados[fila]);
      }
    }
    // Rellenar con filas vacías arriba
    while (nuevasFilas.length < this.filas) {
      nuevasFilas.unshift(Array(this.columnas).fill(""));
    }
    this.minosAlmacenados = nuevasFilas;

    // Verificar el estado final
    console.log(
      "Estado final después de eliminar líneas:",
      this.minosAlmacenados
    );
  }

  /**
   * Convierte coordenadas de la matriz del tablero a coordenadas del canvas
   * @param {number} x - Coordenada x en la matriz
   * @param {number} y - Coordenada y en la matriz
   * @returns {p5.Vector} Vector con las coordenadas transformadas
   */
  coordenada(x, y) {
    return createVector(x, y).mult(this.lado_celda).add(this.posicion);
  }

  /**
   * Dibuja el tablero y su contenido en el canvas
   * Incluye el patrón de fondo y los minos almacenados
   */
  dibujar() {
    push();
    noStroke();
    // Dibuja el patrón de fondo del tablero
    for (let fila = 0; fila < this.filas; fila++) {
      for (let columna = 0; columna < this.columnas; columna++) {
        if ((columna + fila) % 2 == 0) {
          fill("black");
        } else {
          fill("#003");
        }
        let c = this.coordenada(columna, fila);
        rect(c.x, c.y, this.lado_celda);
      }
    }
    pop();
    this.dibujarMinosAlmacenados();
  }

  /**
   * Dibuja los minos almacenados en el tablero
   * Utiliza los colores definidos en el objeto tetriminos
   */
  dibujarMinosAlmacenados() {
    push();
    for (let fila = 0; fila < this.filas; fila++) {
      for (let columna = 0; columna < this.columnas; columna++) {
        let nombreMino = this.minosAlmacenados[fila][columna];
        if (nombreMino) {
          fill(tetriminosBase[nombreMino].color);
          Tetrimino.dibujarMino(this.coordenada(columna, fila));
        }
      }
    }
    pop();
  }
}
