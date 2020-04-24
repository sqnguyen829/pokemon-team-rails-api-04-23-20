class PokemonsController < ApplicationController

    def index 
        @pokemons = Pokemon.all
        render json: @pokemons
    end

    def show
        @pokemon = Pokemon.find(params[:id])
        render json: @pokemon
    end

    def create
        @pokemon = Pokemon.create({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: params[:pokemon][:trainer_id]
        })
        render json: @pokemon
    end

    def destroy
        @pokemon = Pokemon.find(params[:id])
        @pokemon.destroy
    end

    # def random
    #     @pokemon = {
    #         nickname: Faker::Name.first_name,
    #         species: Faker::Games::Pokemon.name
    #     }
    #     render json: @pokemon
    # end

    # private

    # def pokemon_params
    #     params.require(:pokemon).permit(:nickname,:species,:trainer_id)
    # end
end
