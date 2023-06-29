const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {
        type: String,
        minLength: 3,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    platform: {
        type: [String],
        enum: ['xbox', 'playstation', 'pc', 'nintendo'],
        required: true,
        validator: {
            validate: (v) => {
                return v && v.length > 0
            }
        },
        message: "Enter at least one platform"
    },
    genre: {
        type: [String],
        enum: ['Action/Adventure', 'Shooter', 'RPG', 'Flight', 'Fighting', 'Horror', 'Strategy', 'MMORPG', 'Puzzle'],
        validator: {
            validate: (v) => {
                return v && v.length > 0
            },
            message: 'Enter at least one genre'
        },
        required: true
    },
    age_rating: {
        type: String,
        enum: ['RP', 'E', 'T', 'M', 'A'],
        default: 'RP'
    },
    release_date: {
        type: Date,
        validator: {
            validate: (v) => {
                if(!v) return 'TBD'
            }
        }
        
    },
    developer: {
        type: String,
        required: true
    },
    score: {
        Type: Number,
    },
    where_to_buy: {
        type: [Object]
    }

})

const Game = mongoose.model('Game', gameSchema);


const addGame = async () => {
    const game = new Game({
        title: `
        Vampire: The Masquerade - Bloodlines 2
        `,
        description: `
        Sired in an act of vampire insurrection, your existence ignites the war for Seattle's blood trade. Enter uneasy alliances with the creatures who control the city and uncover the sprawling conspiracy which plunged Seattle into a bloody civil war between powerful vampire factions. ♞Become the Ultimate Vampire Immerse yourself in the World of Darkness and live out your vampire fantasy in a city filled with intriguing characters that react to your choices. You and your unique disciplines are a weapon in our forward-driving, fast-moving, melee-focussed combat
        `,
        platform: ['xbox', 'playstation', 'pc'],
        genre: ['Action/Adventure', 'RPG'],
        //age_rating: '',
        //release_date:'' ,
        developer: 'Hardsuit Labs',
        score: 75,
        where_to_buy: [
            {steam: 'https://store.steampowered.com/'},
            {google: 'https://google.com'}
        ]


    })
    try{
        const save = await game.save()
        console.log(save)
    }
    catch(err){
        console.log(err.message)
    }
}
//addGame()



const updateGame = async (id) => {
    try{
        const game = await Game.findOneAndUpdate(id)
        game.set({
            title: 'Vampire: The Masquerade - Bloodlines 2'
            
        })
        const save = await game.save()
        console.log(save)
    }
    catch(err){
        console.log(err.message)
    }
}
updateGame('649deea71f4c904525473753')

const deleteGame = async (id) => {
    try{
        const game = await Game.findOneAndDelete(id)
        console.log(`Game deleted ${game.title}`)
        
    }
    catch(err){
        console.log(err.message)
    }
}
//deleteGame('649dec8566f2de5ffd34c5b0')



module.exports = mongoose.model('Game', gameSchema)