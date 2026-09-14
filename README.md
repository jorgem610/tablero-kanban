# FlowBoard — Tablero Kanban

Tablero de gestión de tareas tipo Trello/Kanban, desarrollado para una empresa de software ficticia. Permite organizar tareas en tres columnas (Por Hacer, En Proceso, Finalizado), con drag & drop, comentarios, y una interfaz responsive con estética "developer tool" en modo oscuro.

## 🚀 Demo

- **GitHub Pages:** [enlace aquí](#) *(solo interfaz — ver limitaciones más abajo)*
- **Repositorio:** [https://github.com/jorgem610/tablero-kanban](https://github.com/jorgem610/tablero-kanban)

> ⚠️ **Importante:** GitHub Pages solo sirve archivos estáticos y no puede ejecutar `json-server`. Para probar el CRUD completo (crear, editar, mover y eliminar tareas), es necesario clonar el repositorio y ejecutarlo en local siguiendo las instrucciones de abajo.

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, variables CSS, diseño responsive)
- JavaScript Vanilla (ES6+, módulos)
- [SortableJS](https://github.com/SortableJS/Sortable) para drag & drop
- [json-server](https://github.com/typicode/json-server) como API REST simulada

## 📦 Instalación y ejecución

Este proyecto no requiere instalación de dependencias de forma permanente — se ejecuta directamente con `npx`.

### 1. Clonar el repositorio

```bash
git clone https://github.com/jorgem610/tablero-kanban.git
cd tablero-kanban
```

### 2. Levantar el servidor de la API (json-server)

En una terminal:

```bash
npx json-server db.json --port 3001
```

> Se usa **json-server v1 (beta)**. La API quedará disponible en `http://localhost:3001`.

### 3. Levantar el servidor web

En **otra terminal distinta** (necesitas las dos a la vez):

```bash
npx serve
```

La aplicación quedará disponible en `http://localhost:3000` (o el puerto que indique la terminal).

### 4. Abrir en el navegador

Ve a la URL que indique `npx serve` (normalmente `http://localhost:3000`).

## 📁 Estructura del proyecto

```
tablero-kanban/
├── index.html              # Shell principal, carga los componentes
├── db.json                 # Base de datos simulada (tasks + comments)
├── components/              # Componentes HTML cargados dinámicamente
│   ├── header.html
│   ├── bottom-nav.html
│   ├── board.html
│   ├── new-task-modal.html
│   ├── edit-task-modal.html
│   └── comments-task-modal.html
├── css/                     # Estilos, un archivo por componente
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

## ⚠️ Nota sobre json-server

Este proyecto usa **json-server v1 (beta)**. Esta versión tiene un comportamiento distinto a las versiones clásicas: el filtro simple `?taskId=1` no funciona de forma fiable en todos los casos. Por eso, los comentarios se obtienen usando la ruta de relaciones embebidas:

```
GET /tasks/:id?_embed=comments
```

Si usas una versión distinta de json-server, revisa `js/api.js` (función `getComments`) por si hay que adaptar la consulta.

## 👤 Autor

Jorge