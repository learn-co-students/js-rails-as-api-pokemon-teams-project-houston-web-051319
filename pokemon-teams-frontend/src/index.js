const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let allTrainers = null
document.addEventListener('DOMContentLoaded',function(e){

    // e.preventDefault()

    // gets trainer json info
    fetch(TRAINERS_URL).then(function(response){
        return response.json()
    }).then(function(result){
        allTrainers = result
        result.forEach(divCreator)
    }).then(function(){
        return fetch(POKEMONS_URL)
    }).then(function(response){
        return response.json()
    }).then(function(result){
        result.forEach(pokemons);
    })

    // function to create div for each trainer
    function divCreator(trainer){
        let div = document.createElement('div');
        div.className = "card";
        
        // create p tag with trainer name
        let p = document.createElement('p');
        p.innerText = trainer.name;

        // create button to add pokemon (doesn't actually add pokemon yet)
        let button = document.createElement('button');
        button.id = trainer.id;
        button.className = "poke-button"
        button.innerText = "Add Pokemon";

        //add listener to add pokemon with this button
        button.addEventListener('click',function(){
            if(trainer.pokemons.length < 6){
                fetch(POKEMONS_URL,{
                    method: "POST",
                    headers: {"content-type":"application/json"},
                    body: JSON.stringify({
                        trainer_id: trainer.id
                    })
                }).then(function(response){
                    return response.json()
                }).then(function(newPokemon){
                    trainer.pokemons.push(newPokemon)
                    pokemons(newPokemon)
                })
            }
            
        })

        //create ul for pokemon to go
        let ul = document.createElement('ul');
        ul.setAttribute('data-id', trainer.id)

        //append all items in div
        div.append(p);
        div.append(button);
        div.append(ul);

        //append div in main of HTML
        let main = document.querySelector('main');
        main.append(div);
    }

    // adds pokemon to correct trainers
    function pokemons(pokemon){
        ul = document.querySelector(`ul[data-id="${pokemon.trainer_id}"`) 

      
        // create list item for each pokemon
        let li = document.createElement('li');
        li.innerText = `${pokemon.nickname}(${pokemon.species})`;

        // create button
        button = document.createElement('button');
        button.setAttribute("data-pokemon-id", `${pokemon.id}`);
        button.className = "release";
        button.innerText = "Release";

        // add event listener to delete pokemon with button
        button.addEventListener('click',function(){
            let current_trainer = null
            allTrainers.forEach(function(each_trainer){
                if(each_trainer.id == pokemon.trainer_id){
                    current_trainer = each_trainer
                }
            })
            fetch(POKEMONS_URL+`/${pokemon.id}`,{
                method: 'DELETE'
            })
            let indexOfPokemon;
            current_trainer.pokemons.forEach(function(eachPokemon, index){
                if(eachPokemon.id === pokemon.id){
                    indexOfPokemon = index
                }
            })
            current_trainer.pokemons.splice(indexOfPokemon, 1)
            li.remove()

        })

        //append items to list
        li.append(button);
        ul.append(li);
      

    }

})