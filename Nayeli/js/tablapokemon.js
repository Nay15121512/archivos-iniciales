const tablaPokemon = document.querySelector("#tablaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Crear tabla
const crearTabla = () => {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Tipos</th>
                <th>Altura</th>
                <th>Peso</th>
            </tr>
        </thead>
        <tbody id="cuerpoTabla"></tbody>
    `;
    tablaPokemon.appendChild(table);
}

// Llamar a la función de crear tabla
crearTabla();

const cuerpoTabla = document.querySelector("#cuerpoTabla");

// Mostrar Pokémon en la tabla
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemonEnTabla(data));
}

function mostrarPokemonEnTabla(poke) {
    let tipos = poke.types.map((type) => `<span class="${type.type.name} tipo">${type.type.name}</span>`);
    tipos = tipos.join(', ');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>#${pokeId}</td>
        <td><img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}" width="50"></td>
        <td>${poke.name}</td>
        <td>${tipos}</td>
        <td>${poke.height}m</td>
        <td>${poke.weight}kg</td>
    `;
    cuerpoTabla.appendChild(fila);
}

// Filtro de tipos
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    cuerpoTabla.innerHTML = ""; // Limpiar la tabla

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if(botonId === "ver-todos") {
                    mostrarPokemonEnTabla(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemonEnTabla(data);
                    }
                }
            });
    }
}));
