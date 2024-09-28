//Selección de elemntos del DOM
const eventForm = document.getElementById("event-form"),
  eventTitleInput = document.getElementById("event-title"),
  eventDateInput = document.getElementById("event-date"),
  eventsList = document.getElementById("events"),
  filterInput = document.getElementById("filter");


// Cargar eventos al inicio
document.addEventListener("DOMContentLoaded", loadEvents);

//Manejo de envío de datos a través del formulario
eventForm.addEventListener("submit", function(e){
  e.preventDefault(); //Evitar que la página se recargue

  //Obtenerr valores del formulario
  const eventTitle = eventTitleInput.value;
  const eventDate = eventDateInput.value;

  //Validar que los campos no estén vacíos
  if(eventTitle == "" || eventDate=== ""){
    alert("Por favor complete todos los campos!!");
    return;
  }
  //Crear el elemento en la lista
  const li = document.createElement('li');
  li.innerHTML = `<span> Evento: ${eventTitle} - Fecha: ${eventDate}</span> <button class="delete-btn">Eliminar</button>`
  
  //Agregar el evento a la lista
  eventsList.appendChild(li);

  //Limpiar el formulario
  eventForm.reset();

  //Eliminación de eventos de la lista
  li.querySelector(".delete-btn").addEventListener("click",function(){
    li.remove();
    saveEventsToLocalStorage(); // actualizamos el localStorage para reflejar la eliminación del evento
  })
  // Guardar eventos en localStorage
  saveEventsToLocalStorage();

});

// cargar eventos desde localStorage
function loadEvents() {
  //recorre todos los eventos actuales li, los guarda en un array y actualiza el localStorage de una sola vez
  // JSON.parse convierte esos eventos en una lista que podemos usar
  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.forEach(function(event) {
    const li = document.createElement('li');
    li.innerHTML = `${event} <button class="delete-btn">Eliminar</button>`;
    eventsList.appendChild(li);
    //Si se elimina un li, también se elimina del localStorage
    li.querySelector(".delete-btn").addEventListener("click", function() {
      li.remove();
      saveEventsToLocalStorage(); 
    });
  });
}

// Guardar todos los eventos en localStorage
function saveEventsToLocalStorage() {
  const events = [];
  document.querySelectorAll('#events li').forEach(function(li) {
    events.push(li.textContent.replace('Eliminar', '').trim()); //No guarga el texto eliminar
  });
  localStorage.setItem("events", JSON.stringify(events)); //convierte la lista en texto y la guarda.
}

//Función para filtrar búsqueda
filterInput.addEventListener("input",()=>{
  const filter = filterInput.value.toLowerCase(); //Convertir a minusculas
  const searchList = eventsList.getElementsByTagName("li");

  Array.from(searchList).forEach(function(item){
    const textSearched = item.textContent.toLowerCase().replace("Eliminar","").trim();

    if(textSearched.includes(filter)){
      item.style.display = ""; //Mostrar búsqueda
    }else{
      item.style.display = "none" //No mostrar 
    }
  })

})