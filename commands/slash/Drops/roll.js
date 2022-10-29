const Drop = require('../../../schemas/drop');
const { EmbedBuilder } = require('discord.js');
const Playerdrop = require('../../../schemas/playerdrop');

module.exports = {
  name: "roll", // Name of command
  description: "Roll for a drop",
  type: 1, // Command type
  options: [], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
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
  rollForDrop: function(drops) {
    const result = Math.round(Math.random() * (drops.length - 1));
    return drops[result];
  },
  run: async function(client, interaction, config, db) {
    const targetRarity = this.rollForRarity();
    const drops = await Drop.find({ rarity: targetRarity }).exec();
    const drop = this.rollForDrop(drops);

    const playerdrop = new Playerdrop();
    playerdrop.player = interaction.user.id;
    playerdrop.drop = drop;

    playerdrop.save().then(_ => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
              .setTitle(`You got ${drop.name}`)
              .setAuthor({ name: drop.rarity })
              .setImage(drop.image)
        ],
      });
    }).catch((error) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
              .setTitle(`Error Rolling`)
              .setAuthor({ name: 'Error' })
              .setDescription(error.message)
        ],
      });
    });
  },
};