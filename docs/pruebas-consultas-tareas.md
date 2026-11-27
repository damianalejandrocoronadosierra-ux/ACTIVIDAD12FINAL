# Pruebas de consultas de tareas

## Entorno
- Rama: feature/consultas-paginadas
- Base: task_api
- Colección: tasks
- Resultado de pnpm check: Sin errores
- Resultado de pnpm build: Sin errores

## Datos preparados
- Total de tareas: 5
- Tareas pending: 3
- Tareas completed: 2

## Casos ejecutados
| Tipo | Método y ruta | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|
| Positiva | GET /api/tasks?page=1&limit=2 | 200 | 200 | [Generado] | Éxito |
| Positiva | GET /api/tasks?status=completed | 200 | 200 | [Generado] | Éxito |
| Positiva | GET /api/tasks?search=api | 200 | 200 | [Generado] | Éxito |
| Negativa | GET /api/tasks?page=0 | 422 | 422 | [Generado] | Éxito |
| Negativa | GET /api/tasks?sortBy=priority | 422 | 422 | [Generado] | Éxito |
| Negativa | GET /api/tasks?owner=ana | 422 | 422 | [Generado] | Éxito |
| Regresión | PATCH /api/tasks/:id/complete | 200 | 200 | [Generado] | Éxito |

## Evidencias
1. Compilación estática correcta (`pnpm check` y `pnpm build`).
2. Separación de páginas en subconjuntos sin duplicar tareas.
3. Combinación exitosa de filtro por estado y búsqueda por título.
4. Respuesta de ordenamiento dinámico ascendente y descendente.
5. Manejo de error 422 `QUERY_VALIDATION_ERROR` con lista de `details` y `requestId`.
6. Funcionamiento inalterado del CRUD heredado de A7.
7. Persistencia verificada tras reinicio del servidor.