//Función para cargar los componentes
async function loadComponent(placeholder){
    //Coge los que tiene el atributo data-include
    const path = placeholder.getAttribute('data-include');

    try{
        //Hace una peticion para coger los componentes
        const response = await fetch(path);
        //Si la respuesta da error
        if(!response.ok){
            throw new Error(`Respuesta ${response.status} al pedir ${path}`);
        }
        //Si no escoge el html
        const html = await response.text();
        //Y lo pinta
        placeholder.outerHTML = html
    } catch(error){
        console.error(`No se pudo cargar el componenete ${path}:`,  error);
        placeholder.innerHTML = '<p role="alert">No se pudo cargar esta seccion</p>'
    }
}

async function loadsComponents(){
    //Buscar todos los elementos que contiene data-include
    const placeholders = document.querySelectorAll('[data-include]');
    //Recorre todo y ejecuta la funcion loadComponent
    for (const placeholder of placeholders){
        await loadComponent(placeholder);
    }
    document.dispatchEvent(new CustomEvent('components:loaded'));
}

loadsComponents();