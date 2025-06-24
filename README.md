# Tetris_ADN
Juego desarrollado por Andrea, Deickar y Nico
# 🎮 Tetris JS

¡Bienvenido a Tetris JS! Este es un clon del clásico juego Tetris, desarrollado en JavaScript usando la librería p5.js. El objetivo es apilar las piezas (tetriminos) y eliminar líneas para obtener la mayor puntuación posible.

## 🚀 ¿Cómo jugar?

1. Abre el archivo `index.html` en tu navegador web.
2. Verás una pantalla de inicio. Presiona **ENTER** para comenzar a jugar.
3. Usa las teclas de flecha para mover y rotar las piezas.
4. El juego termina cuando las piezas llegan a la parte superior del tablero.

## 🎮 Controles

- **Flecha Izquierda (←):** Mover pieza a la izquierda
- **Flecha Derecha (→):** Mover pieza a la derecha
- **Flecha Abajo (↓):** Acelerar la caída
- **Flecha Arriba (↑):** Rotar la pieza
- **Espacio:** Caída instantánea
- **Botón 🔊:** Activar/desactivar efectos de sonido
- **Botón 🎵:** Activar/desactivar música de fondo

## 🗂️ Estructura de archivos

```
tetris_js/
├── index.html         # Interfaz principal, lógica de juego y audio
├── Tablero.js         # Lógica del tablero y almacenamiento de piezas
├── Tetrimino.js       # Lógica de las piezas (tetriminos)
├── music/
│   └── tetris_theme.mp3  # Música de fondo (opcional)
├── README.md          # Este archivo
├── README_MUSICA.md   # Guía para agregar música personalizada
```

## 🎵 Música de fondo

Puedes agregar tu propia música de Tetris:
- Coloca un archivo MP3 en la carpeta `music/` y nómbralo `tetris_theme.mp3`.
- La música se activa/desactiva con el botón 🎵 en la esquina superior derecha.
- Consulta `README_MUSICA.md` para más detalles y recomendaciones.

## ✨ Mejoras recientes

- Se corrigió un bug donde el tetrimino dejaba de caer al girar la pieza.
- Ahora el juego cuenta con una pantalla de inicio con instrucciones y controles.
- Mejoras visuales en la interfaz y experiencia de usuario.
- El código está más comentado y es más fácil de entender y modificar.

## 👨‍💻 Para principiantes

- El código está lleno de comentarios explicativos.
- Cada archivo tiene un bloque inicial que describe su propósito.
- Puedes modificar los colores, controles y música fácilmente.
- Si tienes dudas, revisa los comentarios o pregunta en la comunidad.

---

¡Diviértete jugando y aprendiendo a programar con Tetris JS! 🎉
