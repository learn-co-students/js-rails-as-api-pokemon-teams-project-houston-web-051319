class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        trainer_id = pokemon_params[:trainer_id]
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
        render json: pokemon
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end

    def pokemon_params
        params.permit(:trainer_id)
    end

end
