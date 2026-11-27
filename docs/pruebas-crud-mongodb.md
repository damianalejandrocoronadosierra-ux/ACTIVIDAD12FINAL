# Pruebas del CRUD persistente

## Entorno
- Rama: feature/crud-persistente-completo
- Base: task_api
- Colección: tasks
- Resultado de pnpm check: Sin errores
- Resultado de pnpm build: Sin errores

## Recurso de prueba
- id devuelto por POST: [Insertar ID de Postman]
- title inicial: Preparar evidencia del CRUD
- title final: Revisar evidencias actualizadas
- status final: completed
- Persistencia después de reiniciar: Confirmada

## Casos ejecutados
| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Positiva | POST /api/tasks | {"title":"Tarea"} | 201 | 201 | [Generado] | Éxito |
| Positiva | PATCH /api/tasks/:id | {"status":"completed"} | 200 | 200 | [Generado] | Éxito |
| Negativa | PATCH /api/tasks/:id | cuerpo vacío | 422 | 422 | [Generado] | Éxito |
| Negativa | PATCH /api/tasks/:id | JSON mal formado | 400 | 400 | [Generado] | Éxito |
| Negativa | PATCH /api/tasks/:id | sin application/json | 415 | 415 | [Generado] | Éxito |
| Negativa | GET /api/tasks | Atlas no disponible | 503 | 503 | [Generado] | Éxito |
| Regresión | PATCH /api/tasks/:id/complete | sin cuerpo | 200 | 200 | [Generado] | Éxito |

## Evidencias
1. Compilación correcta (`pnpm check` y `pnpm build`).
2. Verificación del documento antes y después del `PATCH` en MongoDB Atlas.
3. Respuesta `204 No Content` sin cuerpo al eliminar la tarea.
4. Manejo correcto de errores de validación incluyendo el `requestId`.
5. Consulta exitosa del recurso posterior al reinicio del servidor.
```[cite: 1]

---

## 2. Preguntas de cierre y reflexión (`docs/reflexion-crud-mongodb.md`)

Crea un archivo nuevo en tu proyecto con la ruta exacta **`docs/reflexion-crud-mongodb.md`** y pega el siguiente contenido con las respuestas basadas en tu proyecto[cite: 1]:

```markdown
# Reflexión del CRUD persistente con MongoDB

1. **¿Qué operación de Mongoose corresponde a cada letra de CRUD?**
   - **C (Create):** `TaskModel.create()`
   - **R (Read):** `TaskModel.find()` y `TaskModel.findById()`
   - **Update):** `TaskModel.findByIdAndUpdate()`
   - **D (Delete):** `TaskModel.findByIdAndDelete()`

2. **¿Por qué se usa PATCH y not un reemplazo completo del documento?**
   Porque `PATCH` permite modificar únicamente los campos enviados en la solicitud (como solo el título o solo el estado), sin afectar ni eliminar los demás atributos existentes en el documento[cite: 1].

3. **¿Qué problema evita `$set`?**
   Evita que Mongoose reemplace o sobrescriba todo el documento en la base de datos, lo cual borraría los campos que no se incluyeron en el objeto de la petición parcial[cite: 1].

4. **¿Qué efecto tienen `new: true` y `runValidators: true`?**
   `new: true` hace que el método devuelva el documento actualizado en lugar del estado anterior. `runValidators: true` fuerza a que Mongoose aplique las reglas de validación del esquema también durante las operaciones de actualización[cite: 1].

5. **¿Por qué un cuerpo vacío debe rechazarse?**
   Para evitar procesar operaciones de actualización inválidas o sin datos que modifiquen el recurso, respondiendo adecuadamente con un código de error `422`[cite: 1].

6. **¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?**
   `INVALID_ID` indica que el formato sintáctico del identificador no cumple con las reglas de un ObjectId de MongoDB (error `400`). `TASK_NOT_FOUND` significa que el ID tiene un formato correcto, pero no existe ningún registro asociado a él en la base de datos (error `404`)[cite: 1].

7. **¿Qué responsabilidad cumple `validateTaskUpdate` y cuál cumple `TaskModel`?**
   `validateTaskUpdate` valida la entrada HTTP a nivel de middleware (estructura JSON, campos permitidos, tipos). `TaskModel` define la persistencia y aplica las reglas de validación definitivas a nivel de base de datos mediante Mongoose[cite: 1].

8. **¿Cómo llega un error de `updateTask` al `errorHandler` de Express 5?**
   Express 5 captura automáticamente los errores lanzados en funciones asíncronas y rechazos de promesas dentro de las rutas, propagándolos directamente al middleware global de manejo de errores[cite: 1].

9. **¿Por qué `DELETE` responde `204` sin cuerpo?**
   Porque el estándar HTTP establece que el código `204 No Content` significa que la operación se procesó con éxito, pero no requiere retornar ningún contenido o información adicional al cliente[cite: 1].

10. **¿Qué prueba demuestra que el CRUD es persistente y no solo funcional en memoria?**
    La prueba de reiniciar el servidor y verificar que el documento sigue almacenado consultándolo nuevamente mediante la API o directamente en MongoDB Atlas[cite: 1].
```[cite: 1]

---

## 3. Desafío opcional: Campo `priority` (Opcional)

Si deseas realizar el **desafío opcional** de la actividad (agregar un campo `priority` con valores `low`, `medium`, `high`, siendo `medium` el predeterminado)[cite: 1], los cambios breves que debes hacer son:

1. **En el Modelo (`src/models/task.ts`)**:
   - Agrega `priority: 'low' | 'medium' | 'high'` al tipo de persistencia y de la entidad.
   - En el esquema de Mongoose, define el campo con `type: String, enum: ['low', 'medium', 'high'], default: 'medium'`[cite: 1].
   - En `TaskUpdate`, agrega `priority?: 'low' | 'medium' | 'high'`[cite: 1].

2. **En el Middleware de validación (`src/middlewares/validate-task-update.middleware.ts`)**:
   - Permite que `"priority"` esté dentro de los campos permitidos[cite: 1].
   - Valida que si viene el campo `priority`, su valor sea estrictamente `'low'`, `'medium'` o `'high'`; de lo contrario, recházalo con código `422`[cite: 1].

¿Deseas que implementemos también este desafío de la prioridad o con los documentos de evidencias y reflexión ya queda completa tu entrega?