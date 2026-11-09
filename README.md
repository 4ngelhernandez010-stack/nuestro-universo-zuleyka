# Nuestro pequeño universo

Una web hecha para Zuleyka: una carta interactiva, mil razones, una cápsula para recuerdos con fotos y un rincón para sus notitas. El 23 de junio aparece como el día en que Angel se declaró y el cumpleaños de Zuleyka.

## Versión estática

La interfaz funciona como sitio estático y no necesita un servidor Node.js para sus funciones. Las notas, recuerdos y fotos se guardan en el almacenamiento local del navegador que ella use. No se sincronizan entre dispositivos ni se comparten automáticamente con Angel. Si borra los datos del navegador, puede perderlos.

## Ejecutar en local

Requiere Node.js 20 o posterior y no necesita instalar paquetes:

```bash
npm start
```

Abra <http://localhost:3000>.

## Publicar con GitHub Pages

El flujo de trabajo `.github/workflows/pages.yml` prepara los datos iniciales y publica el contenido de `public/` al actualizar la rama `main`. En GitHub, vaya a **Settings → Pages** y seleccione **GitHub Actions** como origen de publicación. La web se publicará en:

<https://4ngelhernandez010-stack.github.io/nuestro-universo-zuleyka/>

Las Pages pueden ser visibles para cualquier persona en internet incluso cuando el repositorio fuente permanece privado, si el plan de GitHub lo permite. En cuentas GitHub Free, Pages requiere un repositorio público. Antes de hacerlo público, recuerde que el código y el texto de la carta también quedarán visibles.

## Backend opcional

El servidor Node.js y sus controladores siguen en el repositorio como referencia. La versión estática de GitHub Pages no los utiliza; la aplicación publicada guarda sus datos en el dispositivo de la visitante.
