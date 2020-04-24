const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// const RANDOM_POKEMON = `http://localhost:3000/pokemons/random`

fetch(TRAINERS_URL)
.then(res => res.json())
.then(trainers=> {
    trainers.forEach(trainer => addTrainers(trainer))
})

const addTrainers = (trainer) => {
    const main = document.getElementsByTagName('main')[0]
    const divCard = document.createElement('div')
    divCard.className = "card"
    divCard.setAttribute("data-id", trainer.id)
    const p = document.createElement('p')
    p.innerText = trainer.name

    const addBtn = document.createElement('button')
    addBtn.innerText = "Add Pokemon"
    addBtn.setAttribute("data-trainer-id", trainer.id)

    const ul = document.createElement("ul")
    divCard.append(p, addBtn, ul)
    main.append(divCard)

    trainer.pokemons.forEach( pokemon => {
        addPokemon(pokemon, ul)
    })

    addBtn.addEventListener('click', () => {
        if(ul.childNodes.length < 5){
            fetch(POKEMONS_URL,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "trainer_id": trainer.id
                })
            })
            .then(res => res.json())
            .then(pokemon => {
                addPokemon(pokemon, ul)
            })
        }
    })
}

const addPokemon = (pokemon, ul) => {
    const li = document.createElement('li')
    const releaseBtn = document.createElement('button')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    releaseBtn.className = "release"
    releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
    releaseBtn.innerText = "Release"

    releaseBtn.addEventListener('click', () => {
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
            method:"DELETE"
        })
        .then(li.remove())
    })

    li.append(releaseBtn)
    ul.append(li)
}