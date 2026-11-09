# Nuestro pequeño universo

Una web hecha para Zuleyka: una carta interactiva, 1.000 razones distintas para quererla, una cápsula de recuerdos con fotos y un rincón para guardar todas las notitas que quiera. El 23 de junio aparece como el día de la declaración y el cumpleaños, sin asumir el año.

## Ejecutarla

Requiere Node.js 20 o posterior. No necesita paquetes externos.

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000). Para desarrollo con reinicio automático: `npm run dev`.

El servidor crea `data/memories.json`, `data/reasons.json` y `data/notes.json` al arrancar. Esos archivos se quedan fuera de Git para no publicar contenido personal. Si quieres conservarlos, haz una copia de `data/` antes de borrar o reemplazar el servidor.

## Subir el código a GitHub

Desde esta carpeta, crea un repositorio en GitHub y ejecuta:

```bash
git init
git add .
git commit -m "Crea el universo de Zuleyka"
git branch -M main
git remote add origin https://github.com/4ngelherandez.010/nuestro-universo.git
git push -u origin main
```

Guarda el repositorio como **privado** si quieres mantener el código y el contenido de la carta solo entre ustedes. La aplicación no tiene cuentas ni inicio de sesión: recuerdos y notitas son datos públicos si despliegas el sitio en internet.

## Publicarla con backend

GitHub Pages solo aloja archivos estáticos; no ejecuta este servidor Node. El archivo `render.yaml` deja listo el despliegue en Render: conecta el repositorio, acepta la configuración detectada y Render construirá la web con su backend. Define `HER_NAME` y `SPECIAL_DATE` en las variables de entorno si quieres cambiarlos.

El almacenamiento actual usa archivos JSON locales. En un servicio gratuito, esos archivos pueden reiniciarse durante cambios o reinicios de la instancia. Para guardar recuerdos de manera duradera en internet, conecta una base de datos persistente antes de compartir el enlace ampliamente.
