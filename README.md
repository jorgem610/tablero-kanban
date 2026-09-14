# FlowBoard — Tablero Kanban

Tablero de gestión de tareas tipo Trello/Kanban, desarrollado para una empresa de software ficticia. Permite organizar tareas en tres columnas (Por Hacer, En Proceso, Finalizado), con drag & drop, comentarios, y una interfaz responsive con estética "developer tool" en modo oscuro.

## 🚀 Demo

- **GitHub Pages:** [enlace aquí](#) *(solo interfaz — ver limitaciones más abajo)*
- **Repositorio:** [https://github.com/jorgem610/tablero-kanban](https://github.com/jorgem610/tablero-kanban)


## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, variables CSS, diseño responsive)
- JavaScript Vanilla (ES6+, módulos)
- [SortableJS](https://github.com/SortableJS/Sortable) para drag & drop
- [json-server](https://github.com/typicode/json-server) como API REST simulada


## 📁 Estructura del proyecto

```
tablero-kanban/
├── index.html             
├── db.json                 # Base de datos simulada (tasks + comments)
├── components/              # Componentes HTML cargados dinámicamente
│   ├── header.html
│   ├── bottom-nav.html
│   ├── board.html
│   ├── new-task-modal.html
│   ├── edit-task-modal.html
│   └── comments-task-modal.html
├── css/              # Estilos
│   ├── base.css
│   ├── board.css
│   ├── bottom-nav.css
│   ├── header.css
│   ├── modal.css
│   └── reset.css      
    └── variables.css             
└── js/                      # Lógica, un archivo por responsabilidad
    ├── loadComponents.js     # Carga de componentes HTML
    ├── api.js                 # Todas las llamadas fetch a json-server
    ├── render.js               # Pintado dinámico de tarjetas
    ├── modal.js                 # Creación de tareas
    ├── taskEdit.js               # Edición de tareas
    ├── comments.js                # Sistema de comentarios
    ├── dragdrop.js                 # Drag & drop (SortableJS)
    ├── deleteTask.js                # Eliminación de tareas
    ├── search.js                     # Búsqueda en tiempo real
    ├── boardTabs.js                    # Pestañas de columna (móvil)
    └── moveTask.js                      # Mover tarjeta sin drag (móvil)
```

## ✅ Funcionalidades implementadas

- [x] Tablero con tres columnas fijas (Por Hacer / En Proceso / Finalizado)
- [x] Cabecera con estadísticas rápidas por columna
- [x] Visualización dinámica de tareas vía `fetch` (GET)
- [x] Creación de tareas mediante modal (POST)
- [x] Drag & drop entre columnas con SortableJS (PATCH) — y alternativa por menú en móvil
- [x] Edición de título y descripción (PATCH)
- [x] Sistema de comentarios: listar y añadir (GET / POST)
- [x] Eliminación de tareas, con confirmación (DELETE)
- [x] Buscador en tiempo real por título
- [x] Diseño responsive (desktop, tablet y móvil)


## 👤 Autor

Jorge