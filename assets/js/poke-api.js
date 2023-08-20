const pokeApi = {};

function converterParaModeloPokemon(detalhesPokemon) {
    const pokemon = new Pokemon();
    pokemon.numero = detalhesPokemon.id;
    pokemon.nome = detalhesPokemon.name;
    pokemon.todosTipos = detalhesPokemon.types.map((tipo) => tipo.type.name);
    pokemon.tipoPrincipal = pokemon.todosTipos[0];
    pokemon.imagem = detalhesPokemon.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getTodosPokemon = (offset = 0, limit = 151) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((resposta) => resposta.json())
        .then((jsonResposta) => jsonResposta.results)
        .then((listaTodosPokemon) => listaTodosPokemon.map(pokeApi.getPokemon))
        .then((detalhesTodosPokemon) => Promise.all(detalhesTodosPokemon))
        .then((detalhesTodosPokemon) => {
            console.log(detalhesTodosPokemon);
            return detalhesTodosPokemon;
        });
};

pokeApi.getPokemon = (pokemon) =>
    fetch(pokemon.url)
        .then((resposta) => resposta.json())
        .then(converterParaModeloPokemon);
