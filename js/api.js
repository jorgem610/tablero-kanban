const API_URL = 'http://localhost:3001';

export async function getTasks(){
    try{
        const response = await fetch(`${API_URL}/tasks`);

        if(!response.ok){
        throw new Error(`Error ${response.status} al obtener las tareas`);
        }
        const tasks = await response.json();
        return tasks;

    }catch (error) {
        console.error('No se pudieron cargar las tareas:', error);
        return [];
    }
    
}

export async function createTask(taskData){
    try{
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if(!response.ok){
        throw new Error(`Error ${response.status} al crear la tarea`);
        }
        const task = await response.json();
        return task;

    }catch (error) {
        console.error('No se pudo crear la tarea:', error);
        return null;
    }
    
}

async function updateTask(taskId, updates) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} al actualizar la tarea`);
    }

    const task = await response.json();
    return task;

  } catch (error) {
    console.error('No se pudo actualizar la tarea:', error);
    return null;
  }
}

async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} al eliminar la tarea`);
    }

    return true;

  } catch (error) {
    console.error('No se pudo eliminar la tarea:', error);
    return false;
  }
}