const listaPokemon = document.querySelector("#listaPokemon");
let URL="https://pokeapi.co/api/v2/pokemon"
for(let i =1; i<=151; i++){
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => mostrarPokemon (data))

}
function mostrarPokemon(poke){
    let tipos= poke.types.map((type) >= `<p class="$ {type.type.name} tipo " >$ {type.type.name} tipo</p> `);
    tipos = tipos.join()
}
