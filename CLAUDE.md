# Infraestructura de casa — contexto del proyecto

App de una sola página para las instalaciones de una casa sobre sus planos: cuadro eléctrico (copiado del
artefacto «Cuadro eléctrico de casa», que es la referencia de cómo debe comportarse esa parte) más
calefacción, agua, desagües, gas, red, clima y seguridad, con mantenimiento. Sin backend, sin build.

## Restricciones que NO se pueden romper

1. **Se usa desde Chrome en Android** sobre una carpeta de Google Drive, y desde escritorio.
2. **Todo el HTML, CSS y JS va en `index.html`**. Sin bundler, sin npm, sin frameworks, sin dependencias externas.
3. **Debe funcionar sin conexión** (`sw.js`, red primero y caché de respaldo).
4. **Los datos nunca se guardan en el repositorio** (es público). `.gitignore` bloquea `casa.json`, `planos/`,
   `fotos/`, `copias/` y `*.jpg`.
5. **La carpeta se abre con File System Access API** (`showDirectoryPicker`); el handle se recuerda en IndexedDB.
   No sustituir por almacenamiento del navegador.
6. **Español en toda la interfaz**, incluidos los errores.

## Datos

Todo en `casa.json` (formato en `FORMATO-casa.md`; si cambia, actualizarlo en el mismo commit). Planos en
`planos/`, fotos en `fotos/`, copias automáticas en `copias/`.

## Arquitectura de `index.html`

- **Catálogo** — `SISTEMAS` (sistemas, tipos con su icono, tipos de conexión). Añadir un sistema o tipo es solo
  tocar aquí.
- **Cuadro eléctrico** — `renderCuadro`, `renderPend`, `openCirc`, `openPunto`, `openBox`, `openCaja`,
  `openCond`, `condHTML`. Son el código del artefacto con `db.collection()` cambiado por arrays locales.
- **Plano** — `renderPlan`: una planta (`planta`), capas en `capas` (Set: `puntos`, `registros` y claves de
  sistema). `placing` es el modo «toca el plano»: `{kind:'punto'|'caja'|'el', new?, id?}`.
- **Elementos** — `openEl`, `openTramo`, `openNota`; revisiones con `proxima()` y `aviso()`.
- **Vistas** — `renderSistemas`, `renderMant`, `renderAjustes`. `go(vista, {planta, filt, sel})` navega.
- **Edición** — `sheet()`, `write(colección, id, datos, después)`, `wireDel()`. `coll()` resuelve la colección.
- **Carpeta** — `pickRoot`, `cargaCasa`, `leeArchivo`, `escribe`, `rememberRoot`/`recallRoot`.
- **Guardado** — `save()` (debounce) → `flush()`; `copia()` una vez por sesión; `compruebaExterno()` relee si
  otro dispositivo cambió el archivo.
- **Atrás de Android** — `marca()` y el `popstate`: cierra hoja, luego vuelve a Cuadro, luego sale.

## Al terminar cualquier cambio

1. Sube `VERSION` en `sw.js` (`casa-vN` → `vN+1`): es lo que enseña la insignia de la cabecera.
2. Comprueba que el JS sigue siendo válido y que un `casa.json` existente se sigue abriendo (`normaliza()`).
3. Escapa con `esc()` todo texto que entre en plantillas. Errores visibles con `setStatus(msg, true)`.
