const Drop = require('../../../schemas/drop');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
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
  run: async function(client, interaction, config, db) {
    const targetRarity = this.rollForRarity();
    const drops = await Drop.find({ rarity: targetRarity }).exec();
    const drop = this.rollForDrop(drops);

    const playerdrop = new Playerdrop();
    playerdrop.player = interaction.user.id;
    playerdrop.drop = drop;
    playerdrop.save().then(async _ => {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Rolling`)
            .setAuthor({ name: 'rolling' })
        ],
      });
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Rolling`)
            .setAuthor({ name: 'rolling' })
            .setImage('https://cdn.discordapp.com/attachments/1033218973896028300/1036062877448163398/drop-animation-square.gif'),
        ],
      });

      setTimeout(async _ => {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`You got ${drop.name}`)
              .setColor(this.getColorForRarity(drop.rarity))
              .setAuthor({ name: drop.rarity })
              .setImage(drop.image),
          ],
        });
      }, 3700)
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