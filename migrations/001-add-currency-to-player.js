const Player = require('../schemas/player');

module.exports = {
    run: async () => {
        const players = await Player.find().exec();
        players.map(player => {
            player.currency = 0
            return player;
        });

        for (const player of players) {
            await player.save();
        }
    },
};
