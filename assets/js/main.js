const limitePokemonPorPagina = 48;
const qtdeMaxPokemon = 151;
let deslocamentoPorPagina = 0;

carregarListaParcialPokemon(deslocamentoPorPagina, limitePokemonPorPagina);

function carregarListaParcialPokemon(offset, limit) {
    pokeApi.getTodosPokemon(offset, limit).then((listaTodosPokemon = []) => {
        document.getElementById("todosPokemon").innerHTML += listaTodosPokemon
            .map(
                (pokemon) =>
                    `
            <li class="pokemon ${pokemon.tipoPrincipal}">
                            <span class="numero">#${pokemon.numero}</span>
                            <span class="nome">${pokemon.nome}</span>
                            <div class="detalhes">
                                <ol class="tipos">
                                    ${pokemon.todosTipos
                                        .map(
                                            (tipo) =>
                                                `<li class="tipo ${tipo}">${tipo}</li>`
                                        )
                                        .join("")}
                                </ol>
        
                                <img
                                    src="${pokemon.imagem}"
                                    alt="${pokemon.nome}"
                                />
                            </div>
                        </li>
            `
            )
            .join("");
    });
}

const botaoCarregarMais = document.getElementById("carregarMais");
botaoCarregarMais.addEventListener("click", () => {
    deslocamentoPorPagina += limitePokemonPorPagina;

    if (deslocamentoPorPagina + limitePokemonPorPagina < qtdeMaxPokemon) {
        carregarListaParcialPokemon(
            deslocamentoPorPagina,
            limitePokemonPorPagina
        );
    } else {
        carregarListaParcialPokemon(
            deslocamentoPorPagina,
            qtdeMaxPokemon - deslocamentoPorPagina
        );

        botaoCarregarMais.parentElement.removeChild(botaoCarregarMais);
    }
});
