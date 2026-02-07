##  💘 Cita San Valentín - Web Interactiva

Una aplicación web divertida y romántica diseñada para pedir una cita de una forma original e imposible de rechazar. Inspirada en el trend viral de TikTok de los gatitos "Mochi Peach Cat".

(Puedes reemplazar este link con una captura de pantalla de tu propia web)
## ✨ Características

Botón "No" Escurridizo: El botón se mueve aleatoriamente cada vez que intentan pulsarlo o pasar el mouse por encima. ¡Es inatrapable!

Gatitos Emocionales: Los GIFs cambian de estado (feliz, duda, tristeza, llanto) cuantos más intentos fallidos haya.

Botón "Sí" Creciente: Cada vez que se intenta decir que "No", el botón de "Sí" crece un poco más hasta ocupar toda la pantalla.

Fondo Animado: Lluvia suave de corazones flotantes y fondo con degradado estético.

Efecto de Celebración: Explosión de confeti al aceptar la cita.

Totalmente Responsivo: Funciona perfecto en celulares y computadoras.

##  🛠️ Tecnologías Usadas

Next.js - El framework de React para producción.

Tailwind CSS - Para el estilizado rápido y bonito.

Framer Motion - Para las animaciones suaves y físicas.

Canvas Confetti - Para el efecto de celebración.

TypeScript - Para un código más robusto y seguro.

##  🚀 Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu computadora:

1. Clona el repositorio:
```
git clone [https://github.com/moisesdevweb/CitasJHT](https://github.com/moisesdevweb/CitasJHT)
cd cita-web
```
2. Instala las dependencias:
```
npm install
# o
yarn install
# o
pnpm install
```

3. Inicia el servidor de desarrollo:
```
    npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.


⚙️ Personalización

¿Quieres cambiar las frases o poner fotos de otros personajes? ¡Es muy fácil!

Abre el archivo app/components/AskOut.tsx.

Busca la sección comentada como // --- ZONA DE CONFIGURACIÓN ---.

Ahí podrás modificar:

- gifs: Array con los enlaces de las imágenes/GIFs que salen según el nivel de "rechazo".

- phrases: Las frases que aparecen en el botón rojo (ej: "¿Estás segura?", "¡No me hagas esto!").

- successGif: El GIF que sale al final cuando dicen que SÍ.
