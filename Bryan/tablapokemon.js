// Seleccionamos el elemento donde se agregarán los Pokémon (el cuerpo de la tabla)
const listaPokemon = document.querySelector("#listaPokemon");
// Seleccionamos todos los botones de la cabecera que sirven para filtrar los Pokémon por tipo
const botonesHeader = document.querySelectorAll(".btn-header");
// URL base de la PokéAPI para obtener los datos de los Pokémon
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Función que obtiene los primeros 151 Pokémon de la API
async function obtenerPokemons() {
    // Recorremos del 1 al 151 para obtener los Pokémon por su ID
    for (let i = 1; i <= 151; i++) {
        try {
            // Hacemos una solicitud a la API para obtener la información de cada Pokémon
            const response = await fetch(URL + i);
            // Convertimos la respuesta en un objeto JSON
            const data = await response.json();
            // Llamamos a la función para mostrar este Pokémon en la tabla
            mostrarPokemonEnTabla(data);
        } catch (error) {
            // En caso de error, lo mostramos en la consola
            console.log("Error fetching data:", error);
        }
    }
}

// Función que muestra un Pokémon en la tabla
function mostrarPokemonEnTabla(poke) {
    // Extraemos los tipos del Pokémon y creamos una lista de <span> con sus clases para aplicar estilo
    let tipos = poke.types.map((type) => `<span class="${type.type.name}">${type.type.name}</span>`);
    // Unimos los tipos en un solo string separados por comas
    tipos = tipos.join(', ');

    // Convertimos el ID del Pokémon en un string y le añadimos ceros al principio para que siempre tenga 3 dígitos
    let pokeId = poke.id.toString().padStart(3, '0');

    // Creamos una nueva fila para la tabla (elemento <tr>)
    const fila = document.createElement("tr");
    // Definimos el contenido HTML de la fila, mostrando el ID, nombre, imagen, tipos, altura y peso del Pokémon
    fila.innerHTML = `
        <td>#${pokeId}</td>
        <td>${poke.name}</td>
        <td><img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}" width="80px"></td>
        <td>${tipos}</td>
        <td>${poke.height / 10} m</td>
        <td>${poke.weight / 10} kg</td>
    `;

    // Añadimos la nueva fila al cuerpo de la tabla
    listaPokemon.appendChild(fila);
}

// Función para filtrar los Pokémon según el tipo seleccionado en el botón
async function filtrarPokemons(tipo) {
    // Limpiamos la tabla antes de mostrar los Pokémon filtrados
    listaPokemon.innerHTML = "";
    // Recorremos del 1 al 151 para obtener los Pokémon por su ID
    for (let i = 1; i <= 151; i++) {
        try {
            // Hacemos una solicitud a la API para obtener la información de cada Pokémon
            const response = await fetch(URL + i);
            // Convertimos la respuesta en un objeto JSON
            const data = await response.json();
            // Extraemos los tipos del Pokémon y los guardamos en un array
            const tipos = data.types.map(type => type.type.name);
            // Si el tipo es "ver-todos" o el Pokémon tiene el tipo seleccionado, lo mostramos en la tabla
            if (tipo === "ver-todos" || tipos.includes(tipo)) {
                mostrarPokemonEnTabla(data);
            }
        } catch (error) {
            // En caso de error, lo mostramos en la consola
            console.log("Error fetching data:", error);
        }
    }
}

// Asignamos un evento de clic a cada botón del header
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    // Obtenemos el ID del botón clickeado (que corresponde a un tipo de Pokémon)
    const tipo = event.currentTarget.id;
    // Llamamos a la función para filtrar los Pokémon según el tipo seleccionado
    filtrarPokemons(tipo);
}));

// Llamamos a la función inicial para obtener y mostrar los primeros 151 Pokémon
obtenerPokemons();