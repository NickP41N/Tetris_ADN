/*
 * Tetrimino.js
 * Este archivo contiene la clase Tetrimino, que representa las piezas del juego Tetris.
 * Gestiona el movimiento, la rotación y el dibujo de las piezas.
 *
 * Si eres principiante, revisa los comentarios en cada función para entender cómo se mueven y rotan las piezas.
 */
class Tetrimino {
  /**
   * Constructor de la clase Tetrimino
   * Inicializa una nueva pieza con posición y forma aleatorias
   */
  constructor() {
    // Posición inicial en el centro superior del tablero
    this.posicion = createVector(int(tablero.columnas / 2), -1);

    // Selección aleatoria del tipo de tetrimino
    this.nombre = random(Object.keys(tetriminosBase));
    this.mapa = tetriminosBase[this.nombre].mapa;
    this.color = tetriminosBase[this.nombre].color;

    // Inicialización del espectro (sombra de la pieza)
    this.espectro = new Espectro(this);
  }

  /**
   * Mueve la pieza hacia la derecha
   * Verifica colisiones antes de realizar el movimiento
   */
  moverDerecha() {
    this.posicion.x++;
    if (this.colision()) {
      this.posicion.x--;
    }
    this.espectro.actualizar();
  }

  /**
   * Mueve la pieza hacia la izquierda
   * Verifica colisiones antes de realizar el movimiento
   */
  moverIzquierda() {
    this.posicion.x--;
    if (this.colision()) {
      this.posicion.x++;
    }
    this.espectro.actualizar();
  }

  /**
   * Mueve la pieza hacia abajo
   * Verifica colisiones y almacena la pieza si es necesario
   * @returns {boolean} true si la pieza se almacenó, false si solo se movió
   */
  moverAbajo() {
    this.posicion.y++;
    if (this.colision()) {
      this.posicion.y--;
      tablero.almacenarMinos(this);
      tetrimino = new Tetrimino();
      return true;
    }
    this.espectro.actualizar();
    return false;
  }

  /**
   * Mueve la pieza hacia arriba
   * Verifica colisiones antes de realizar el movimiento
   */
  moverArriba() {
    this.posicion.y--;
    if (this.colision()) {
      this.posicion.y++;
    }
    this.espectro.actualizar();
  }

  /**
   * Coloca la pieza en la posición más baja posible
   * Utiliza el espectro para determinar la posición final
   */
  ponerEnElFondo() {
    this.posicion = this.espectro.posicion;
    tablero.almacenarMinos(this);
    tetrimino = new Tetrimino();
  }

  /**
   * Rota la pieza 90 grados en sentido horario
   * Verifica colisiones antes de realizar la rotación
   */
  girar() {
    // Copia profunda del mapa actual para evitar referencias compartidas
    let mapaAnterior = this.mapa.map((p) => p.copy());
    this.mapa = this.mapa.map((pmino) => {
      return createVector(-pmino.y, pmino.x);
    });
    if (this.colision()) {
      this.mapa = mapaAnterior;
    } else {
      this.espectro.mapa = this.mapa;
    }
    this.espectro.actualizar();
  }

  /**
   * Verifica si la pieza colisiona con el tablero u otras piezas
   * @returns {boolean} true si hay colisión, false en caso contrario
   */
  colision() {
    for (const pmino of this.mapaTablero) {
      // Verificar límites del tablero
      if (
        pmino.x < 0 ||
        pmino.x >= tablero.columnas ||
        pmino.y >= tablero.filas
      ) {
        return true;
      }

      // Verificar colisión con otras piezas solo si estamos dentro del tablero
      if (pmino.y >= 0 && tablero.minosAlmacenados[pmino.y][pmino.x]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Dibuja la pieza en el canvas
   * Incluye la pieza principal y su espectro
   */
  dibujar() {
    push();
    fill(this.color);
    for (const pmino of this.mapaCanvas) {
      Tetrimino.dibujarMino(pmino);
    }
    pop();
    this.espectro.dibujar();
  }

  /**
   * Dibuja un mino individual en el canvas
   * @param {p5.Vector} pmino - Posición del mino en el canvas
   */
  static dibujarMino(pmino) {
    push();
    rect(pmino.x, pmino.y, tablero.lado_celda);
    pop();
  }

  /**
   * Obtiene las posiciones de los minos en el tablero
   * @returns {p5.Vector[]} Array de vectores con las posiciones en el tablero
   */
  get mapaTablero() {
    return this.mapa.map((pmino) => {
      let copy = pmino.copy().add(this.posicion);
      return copy;
    });
  }

  /**
   * Obtiene las posiciones de los minos en el canvas
   * @returns {p5.Vector[]} Array de vectores con las posiciones en el canvas
   */
  get mapaCanvas() {
    return this.mapaTablero.map((pmino) => {
      let copy = pmino.copy().mult(tablero.lado_celda).add(tablero.posicion);
      return copy;
    });
  }
}

/**
 * Clase Espectro
 * Representa la sombra de la pieza que muestra dónde caerá
 */
class Espectro {
  /**
   * Constructor de la clase Espectro
   * @param {Tetrimino} tetrimino - La pieza a la que pertenece el espectro
   */
  constructor(tetrimino) {
    this.tetrimino = tetrimino;
    this.mapa = tetrimino.mapa;
    this.color = tetrimino.color;
    this.posicion = tetrimino.posicion.copy();
    this.actualizar();
  }

  /**
   * Actualiza la posición del espectro
   * Lo mueve hacia abajo hasta encontrar una colisión
   */
  actualizar() {
    this.posicion = this.tetrimino.posicion.copy();
    while (!this.colision()) {
      this.posicion.y++;
    }
    this.posicion.y--;
  }

  /**
   * Verifica si el espectro colisiona con el tablero u otras piezas
   * @returns {boolean} true si hay colisión, false en caso contrario
   */
  colision() {
    for (const pmino of this.mapaTablero) {
      // Verificar límites del tablero
      if (
        pmino.x < 0 ||
        pmino.x >= tablero.columnas ||
        pmino.y >= tablero.filas
      ) {
        return true;
      }

      // Verificar colisión con otras piezas solo si estamos dentro del tablero
      if (pmino.y >= 0 && tablero.minosAlmacenados[pmino.y][pmino.x]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Dibuja el espectro en el canvas
   * Utiliza un color semitransparente
   */
  dibujar() {
    push();
    fill(red(this.color), green(this.color), blue(this.color), 50);
    for (const pmino of this.mapaCanvas) {
      Tetrimino.dibujarMino(pmino);
    }
    pop();
  }

  /**
   * Obtiene las posiciones de los minos en el tablero
   * @returns {p5.Vector[]} Array de vectores con las posiciones en el tablero
   */
  get mapaTablero() {
    return this.mapa.map((pmino) => {
      let copy = pmino.copy().add(this.posicion);
      return copy;
    });
  }

  /**
   * Obtiene las posiciones de los minos en el canvas
   * @returns {p5.Vector[]} Array de vectores con las posiciones en el canvas
   */
  get mapaCanvas() {
    return this.mapaTablero.map((pmino) => {
      let copy = pmino.copy().mult(tablero.lado_celda).add(tablero.posicion);
      return copy;
    });
  }
}
