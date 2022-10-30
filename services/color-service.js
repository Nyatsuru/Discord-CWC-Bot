module.exports = {
    getColorForRarity: function(rarity) {
        const colors = {
            unique: 0xf43030,
            legendary: 0xFAC56D,
            epic: 0xC8A7D9,
            rare: 0x73B6E7,
            uncommon: 0x74e26c,
            common: 0x939393,
        }

        return colors[rarity];
    },
}