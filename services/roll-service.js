const Drop = require("../schemas/drop");
module.exports = {
    rarityChances: {
        unique: 1,
        legendary: 10,
        epic: 489,
        rare: 1000,
        uncommon: 3500,
        common: 5000,
    },
    rollForRarity: function() {
        let totalChance = 0;
        for (const key in this.rarityChances) {
            totalChance += this.rarityChances[key];
        }

        const result = Math.round(Math.random() * totalChance);
        for (const key in this.rarityChances) {
            if (this.rarityChances[key] > result) {
                return key;
            }
        }

        return 'common';
    },
    rollForDrop: async function() {
        const targetRarity = this.rollForRarity();
        const drops = await Drop.find({ rarity: targetRarity }).exec();

        const result = Math.round(Math.random() * (drops.length - 1));
        return drops[result];
    },
}