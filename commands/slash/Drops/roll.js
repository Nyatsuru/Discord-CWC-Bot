const Drop = require('../../../schemas/drop');
const CommandOption = require('../../../api/command-option');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Mob = require("../../../schemas/mob");

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
  rollForRarity: function () {
    let totalChance = 0;
    for (const key in this.rarityChances) {
      totalChance += this.rarityChances[key];
    }

    const result = Math.random() * totalChance;
    for (const key in this.rarityChances) {
      if (this.rarityChances[key] < result) {
        return key;
      }
    }

    return 'common';
  },
  rollForDrop: function (drops) {
    const result = Math.random() * drops.length;
    return drops[result];
  },
  run: async (client, interaction, config, db) => {
    const targetRarity = this.rollForRarity();
    const drops = await Drop.find({rarity: targetRarity}).exec();
    const drop = this.rollForDrop(drops);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
            .setTitle(`You got ${drop.name}`)
            .setAuthor({ name: drop.name })
            .setDescription(drop.description)
            .setImage(drop.image)
      ],
    })
  },
};