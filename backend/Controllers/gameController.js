const Games = require('../Models/gameModel');

const getGames = async (req, res) => {
    try{
        const games = await Games
        //.find({title: /^dead/i})
        //.find({genre: 'Horror'})
        //.find({genre: {$in: ['Horror', 'Puzzle']}})
        .find({})
        //.sort({name: 1})
        //.limit(5)
        //.count()
        //.select({title: 1, platform: 1, genre: 1, score: 1})
        res.status(200).json(games)
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = {
    getGames
}

//mongoose operatiors
//eq, ne, gt, gte, lt, lte, in, nin(not in)
// .find(price: 10)
//.find({price: {$gte: 10}, $lte: 20})
//.find(category: {$in: ['xbox', 'pc'])
//.find().or({category: 'one'}, { price: 5})

//reg exp
//.find({title: /^Dead/i}) starts with
//.find(title: /endoftitle$/) ends with