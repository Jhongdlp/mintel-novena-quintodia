# 🎄 Novena de Aguinaldos - Presentación Interactiva

Este proyecto es una presentación web animada e interactiva diseñada para la Novena de Aguinaldos. Está construida con **Next.js**, **React**, **Tailwind CSS** y **Framer Motion** para las animaciones.

---

## 📂 Estructura del Proyecto

### Archivos Principales

- **`src/app/page.tsx`**: Es el **cerebro** de la aplicación. Aquí se define el orden de las diapositivas. Si quieres cambiar el orden en que aparecen las pantallas, este es el archivo que debes editar. Dentro encontrarás el componente `<Slideshow>`, que envuelve a todas las diapositivas.
- **`src/app/layout.tsx`**: Es el **marco** de la aplicación. Define la estructura base HTML, las fuentes tipográficas globales y los metadatos (título de la pestaña, descripción). Todo lo que pongas aquí aparecerá en _todas_ las páginas (aunque en este proyecto solo usamos una página principal).
- **`src/app/globals.css`**: Aquí están los estilos globales. Si quieres cambiar los colores base del tema navideño, fuentes por defecto o utilidades CSS personalizadas, este es el lugar.

---

## 🖼️ Diapositivas (Slides)

Todas las diapositivas se encuentran en la carpeta `src/components/slides/`. Cada archivo representa una pantalla de la presentación.

| Archivo                      | Descripción                                                                                                                          |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **`IntroSlide.tsx`**         | Pantalla de inicio "Novena de Aguinaldos". Título animado y elegante.                                                                |
| **`TraditionSlide.tsx`**     | "Nuestras Tradiciones". Tarjetas informativas sobre qué compone la novena.                                                           |
| **`Day5WelcomeSlide.tsx`**   | Bienvenida específica al Día 5. Incluye texto introductorio y botón de inicio.                                                       |
| **`CarolSlide.tsx`**         | **Villancico 1 (Tutaina)**. Letra estilo karaoke con fondo animado verde/rojo.                                                       |
| **`InitialPrayerSlide.tsx`** | "Signo" y "Oración Inicial". Incluye preguntas para reflexionar.                                                                     |
| **`WordOfGodSlide.tsx`**     | **Palabra de Dios (Magnificat)**. Título gigante y texto bíblico desplegable.                                                        |
| **`ReflectionSlide.tsx`**    | "Reflexión". Tarjetas interactivas apiladas que se deslizan al leerlas.                                                              |
| **`SecondCarolSlide.tsx`**   | **Villancico 2 (Campana sobre Campana)**. Fondo dorado y animaciones de campanas.                                                    |
| **`TeachingsSlide.tsx`**     | "Enseñanza" (Sínodo). Fondo rojo completo que cambia el tema de los controles.                                                       |
| **`DialogueSlide.tsx`**      | "Dialoguemos". Preguntas interactivas en una cuadrícula moderna.                                                                     |
| **`CommitmentSlide.tsx`**    | "Compromiso". Título estilo sello y tarjetas de oraciones desplegables.                                                              |
| **`PrayersSlide.tsx`**       | **Gozos / Oraciones Finales**. Lista animada sobre fondo celestial estrellado.                                                       |
| **`FinalCarolSlide.tsx`**    | **Villancico Final (Burrito Sabanero)**. Animación festiva estilo fiesta.                                                            |
| **`FinalSlide.tsx`**         | Pantalla de despedida "Feliz Navidad". Mensaje final y cierre.                                                                       |
| **`Slideshow.tsx`**          | **El Contenedor**. No es una diapositiva visual, sino el componente que maneja la lógica de navegación (flechas, teclado, progreso). |

---

## 🚀 Guía para Principiantes

### 1. ¿Cómo descargar el proyecto?

Si tienes acceso al repositorio (GitHub/GitLab), abre tu terminal y ejecuta:

```bash
git clone <URL_DEL_REPOSITORIO>
cd NOVENA
```

### 2. ¿Cómo instalarlo?

Necesitas tener **Node.js** instalado. Una vez dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Esto descargará todas las librerías necesarias (Next.js, React, animaciones, etc.).

### 3. ¿Cómo ver la presentación en tu PC?

Para iniciar el servidor de desarrollo y ver los cambios en tiempo real:

```bash
npm run dev
```

Abre tu navegador (Chrome/Edge) y entra a: `http://localhost:3000`

### 4. ¿Cómo hacer cambios?

1.  **Editar Texto:** Entra al archivo de la diapositiva (ej: `IntroSlide.tsx`). Busca el texto que quieres cambiar (estará entre comillas o etiquetas HTML) y edítalo. Guarda el archivo y el navegador se actualizará solo.
2.  **Cambiar Orden:** Ve a `src/app/page.tsx` y mueve las líneas de los componentes `<NombredelSlide />` arriba o abajo según el orden que desees.

### 5. ¿Cómo guardar y subir tus cambios?

Cuando hayas terminado de editar, sube tus cambios a la nube para que otros los vean o para desplegar:

1.  **Añadir cambios:**
    ```bash
    git add .
    ```
2.  **Guardar localmente (Commit):**
    ```bash
    git commit -m "Descripción de lo que cambiaste (ej: corregí un texto en el día 5)"
    ```
3.  **Subir a la nube (Push):**
    ```bash
    git push origin main
    ```

---

## 🛠️ Tecnologías Usadas

- **Next.js 15+**: Framework moderno de React.
- **Tailwind CSS v4**: Estilos rápidos y responsivos.
- **Framer Motion**: Librería potente para todas las animaciones fluidas.
- **Lucide React**: Iconos vectoriales modernos.

---

¡Disfruta creando y compartiendo la Novena! 🎄
