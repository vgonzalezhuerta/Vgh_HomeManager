# Infraestructura de casa

App de una sola página para tener a mano las instalaciones de casa sobre sus planos: **cuadro eléctrico**
(posiciones, puntos de luz, registros y conductores), **calefacción**, **agua**, **desagües**, **gas**,
**red y TV**, **climatización** y **seguridad**, con su historial de mantenimiento.

**La app se publica aquí. Los datos viven en una carpeta tuya, nunca en este repositorio.**

## Publicar

1. Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)`.
2. En un par de minutos: `https://<usuario>.github.io/<repositorio>/`

Archivos de la app:

```
index.html                 la app entera (HTML, CSS y JS)
manifest.webmanifest       datos de instalación
sw.js                      caché para uso sin conexión y número de versión
icono-*.png, icono-fuente.svg
```

## Usar

Abre la URL en **Chrome o Edge** (escritorio o Android), pulsa **📁 Elegir carpeta** y selecciona la carpeta
de tu casa (por ejemplo, una carpeta de Google Drive). Si la carpeta no tiene `casa.json`, la app te ofrece
crear una casa nueva; luego, en **Ajustes**, añades las plantas con la imagen de su plano.

La app recuerda la carpeta entre sesiones. Al servirse por `https`, el navegador ofrece instalarla y funciona
sin conexión.

### Pestañas

- **Cuadro** — las posiciones del cuadro (IGA, diferenciales, automáticos, libres), con buscador y acceso a
  sus puntos en cada planta.
- **Planos** — una planta cada vez, con capas que se encienden y apagan: puntos de luz (coloreados por
  circuito), registros eléctricos (con sus conductores y enlaces entre registros) y una capa por cada sistema
  que tenga elementos. «+ Elemento» y luego un toque en el plano para colocar una caldera, un radiador, una
  llave de paso, un router… Los elementos se pueden **conectar** entre sí (ida/retorno, fría/caliente…) y la
  conexión se dibuja como una línea del color del sistema.
- **Sistemas** — todos los elementos por sistema, con buscador.
- **Mantenimiento** — averías, revisiones vencidas o próximas (cada elemento puede llevar «revisar cada N
  meses») e historial de intervenciones con fecha, quién y coste.
- **Sin resolver** — conductores sin identificar o dudosos y posiciones del cuadro por verificar.
- **Ajustes** — nombre de la casa, plantas y planos, carpeta y copia descargable.

## La carpeta de datos

```
Carpeta elegida
├─ casa.json      todo: plantas, cuadro, puntos, registros, conductores, elementos, conexiones, historial
├─ planos/        imágenes de los planos (una por planta)
├─ fotos/         fotos de elementos y registros (reducidas a 1600 px)
└─ copias/        copia automática de casa.json al empezar cada sesión de edición (se guardan 20)
```

El formato está descrito en [`FORMATO-casa.md`](FORMATO-casa.md).

Si la carpeta está sincronizada (Drive) y la editas desde otro dispositivo, la app relee `casa.json` al volver
a ella si ha cambiado y no tienes nada pendiente de guardar.

## Qué NO subir aquí

Ni `casa.json`, ni planos, ni fotos. El repositorio es público y git conserva el historial para siempre.
`.gitignore` los bloquea.
