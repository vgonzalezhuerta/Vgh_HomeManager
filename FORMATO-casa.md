# Formato de `casa.json`

Un único JSON en la raíz de la carpeta elegida. La app lo reescribe entero en cada guardado (con 400 ms de
espera para agrupar cambios). Las coordenadas `x`/`y` son proporciones de 0 a 1 sobre la imagen del plano
(0,0 arriba a la izquierda); `null` significa «sin ubicar en el plano».

```jsonc
{
  "schemaVersion": 1,
  "actualizado": "2026-11-08T06:00:00.000Z",        // lo escribe la app
  "casa": { "nombre": "Mi casa", "notas": "" },
  "plantas": [                                      // en el orden de los botones del plano
    { "id": "sotano", "nombre": "Sótano", "plano": "planos/sotano.jpg", "nota": "texto bajo el plano" }
  ],
  "electrico": {
    "circuitos": [                                  // posiciones del cuadro
      { "id": "c15-16", "pos": "15-16", "tipo": "Automático|Diferencial|IGA|Libre",
        "desc": "Qué alimenta", "notas": "", "dudoso": false, "orden": 15 }
    ],
    "puntos": [                                     // puntos de luz / enchufes en el plano
      { "id": "b07", "planta": "planta-baja", "x": 0.256, "y": 0.283,
        "circuito": "21-22", "estancia": "Salón-comedor", "notas": "" }
    ],
    "cajas": [                                      // registros (cajas de empalme)
      { "id": "k-BO-C1", "codigo": "BO-C1", "planta": "sotano", "x": 0.684, "y": 0.889,
        "ubicacion": "", "aviso": "p. ej. sin tierra", "notas": "", "fotos": ["fotos/registro-xxx.jpg"] }
    ],
    "conductores": [                                // lo que hay dentro de cada registro
      { "id": "n002", "caja": "CLP", "orden": 2, "funcion": "Adónde va", "recorrido": "CLP-B2 → CLP-C1-T2",
        "estado": "conocido|dudoso|desconocido", "tipo": "Potencia|Luz|Enchufes|TV|Teléfono|Telefonillo|Mixto|Tubo vacío",
        "enlace": "CLP-C1", "circuito": "19-20", "notas": "" }
    ]
  },
  "elementos": [                                    // equipos de cualquier sistema
    { "id": "…", "sistema": "calefaccion", "tipo": "Caldera", "nombre": "Caldera gasoil",
      "planta": "sotano", "x": 0.3, "y": 0.25, "estancia": "Sala de calderas",
      "estado": "ok|revisar|averia", "marca": "", "instalado": "2019-05-01",
      "revisionMeses": 12, "ultimaRevision": "2026-11-08", "notas": "", "fotos": [] }
  ],
  "tramos": [                                       // conexiones entre elementos (líneas en el plano)
    { "id": "…", "sistema": "calefaccion", "desde": "<id elemento>", "hasta": "<id elemento>",
      "tipo": "Ida", "notas": "" }
  ],
  "historial": [                                    // mantenimiento e intervenciones
    { "id": "…", "fecha": "2026-11-08", "sistema": "calefaccion|…|cuadro|general",
      "elemento": "<id elemento o vacío>", "texto": "Revisión anual", "quien": "", "coste": "120",
      "revision": true }
  ]
}
```

## Sistemas y tipos

Las claves de `sistema` y sus tipos están en `SISTEMAS` al principio del `<script>` de `index.html`:
`electrico` (equipos que no son del cuadro: inversor, cargador, toma de tierra…), `calefaccion`, `agua`,
`saneamiento`, `gas`, `datos`, `clima`, `seguridad` y `otros`. El tipo de conexión (`tramos[].tipo`) sale de la
lista `tramos` de cada sistema; su posición en la lista decide el trazo (continuo, discontinuo, punteado).

## Reglas

- `planta` siempre es el `id` de una planta, no su nombre.
- Los `circuito` de puntos y conductores apuntan a `circuitos[].pos`; `caja` y `enlace` apuntan a `cajas[].codigo`.
  Al renombrar una posición o un código en la app, se actualizan las referencias.
- Borrar un elemento borra sus `tramos`. Borrar una planta deja sus marcas sin planta (no se pierden).
- Las rutas de `plano` y `fotos` son relativas a la carpeta raíz.
- Si se cambia el formato, actualizar este documento en el mismo commit y subir `schemaVersion` si deja de
  ser compatible.
