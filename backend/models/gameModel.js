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
        type: Number,
    },
    where_to_buy: {
        type: [Object]
    }

})

const Game = mongoose.model('Game', gameSchema);


const addGame = async () => {
    const game = new Game({
        title: `
        Deus Ex: Mankind Dividedz
        `,
        description: `
        Deus Ex: Mankind Divided is currently the last entry in the Deus Ex franchise. It was two years after the accident in Human Revolution, where augmented people started to act uncontrollable and aggressive. As it turns out, a rogue group called Illuminati made it look like a proof for their instability and now augmented people are living like outcasts. We follow Adam Jensen once again as he works as a double agent for Interpol and a hackers group called Juggernaut Collective to confront the Illuminati and reveal the truth. The core gameplay of Mankind
        `,
        platform: ['xbox', 'playstation', 'pc'],
        genre: ['Action/Adventure', 'RPG', 'Shooter'],
        age_rating: 'M',
        release_date: new Date('Aug 22, 2016'),
        developer: 'Square Enix, Eidos Interactive, Feral Interactive', 
        score: 83,
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
        if(!game) return
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
//updateGame('649deea71f4c904525473753')

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
//basic backend game api structure