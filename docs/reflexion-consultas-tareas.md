# Reflexión de consultas de tareas

1. **¿Qué responsabilidad nueva cumple `task.repository.ts`?**
   Encapsula de forma exclusiva el acceso a la base de datos MongoDB mediante Mongoose (consultas, conteos, creación, actualizaciones y eliminaciones), aislando la infraestructura técnica del resto de la aplicación.

2. **¿Por qué el middleware debe validar `req.query` antes del controlador?**
   Porque los parámetros que provienen de la URL no son seguros. Validarlos previamente garantiza que solo lleguen datos correctos al servicio/repositorio y se devuelva un error 422 inmediato sin realizar consultas innecesarias a MongoDB.

3. **¿Cómo se calcula `skip` para una página determinada?**
   Se calcula con la fórmula `skip = (page - 1) * limit`. Representa la cantidad de documentos que la consulta debe saltarse antes de comenzar a devolver los registros de la página actual.

4. **¿Por qué `find` y `countDocuments` deben usar el mismo filtro?**
   Para asegurar que el conteo total (`total`) corresponda exactamente a la cantidad real de documentos que cumplen con las condiciones planteadas en la búsqueda y/o filtro.

5. **¿Qué problema evita `escapeRegex`?**
   Evita que el usuario inyecte metacaracteres de expresiones regulares (como `.*` o `+`) que cambien la lógica de la búsqueda y causen comportamientos inesperados en la base de datos.

6. **¿Por qué `sortBy` utiliza una lista permitida?**
   Para evitar que se intenten ordenar los registros por campos inexistentes o por atributos internos que pudieran comprometer el rendimiento o la seguridad de la consulta.

7. **¿Qué diferencia existe entre `data.length`, `meta.total` y `meta.totalPages`?**
   - `data.length`: Número de documentos devueltos en la página actual.
   - `meta.total`: Número total de documentos en la colección que cumplen con los criterios.
   - `meta.totalPages`: Número total de páginas disponibles (`Math.ceil(total / limit)`).

8. **¿Cómo llega un error asíncrono del repositorio al `errorHandler` de Express 5?**
   Express 5 captura automáticamente las promesas rechazadas dentro de los handlers y middlewares, canalizando el `AppError` directamente al middleware global de manejo de errores.

9. **¿Qué prueba demuestra que A8 no rompió el CRUD de A7?**
   La prueba de regresión ejecutando los endpoints `POST`, `GET /:id`, `PATCH`, `PATCH /complete` y `DELETE`, verificando que sus códigos de estado HTTP y respuestas permanezcan idénticos.

10. **¿Qué limitación tiene la paginación basada en `skip` cuando la colección crece mucho?**
    La paginación basada en `skip` obliga a la base de datos a recorrer e ignorar físicamente N documentos antes de retornar los solicitados, lo que degrada el rendimiento a gran escala a diferencia de la paginación basada en cursores.