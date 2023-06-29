const Games = require('../Models/gameModel');

const getGames = async (req, res) => {
    try{
        const games = await Games.find({})
        res.status(200).json(games)
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = {
    getGames
}