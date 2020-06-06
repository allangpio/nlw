function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs();


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())

        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


// items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// atualizar o campo escondido com os dados selecionados
const collectedItems = document.querySelector('input[name=items]')

// variável para guardar items selecionados
let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target
    //add or remove class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem item selecionados
    // se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })


    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems


        // se não estiver selecionado, adicionar à seleção
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems




}


