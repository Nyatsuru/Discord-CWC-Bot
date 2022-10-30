const { EmbedBuilder } = require('discord.js');
const Player = require('../../../schemas/player');

module.exports = {
  name: "addchar", // Name of command
  description: "Create a Player", // Command description
  type: 1, // Command type
  options: [
    {
      name: "class",
      description: "write anything you want!",
      type: 3,
      required: true
    },
    {
      name: "name",
      description: "name your character",
      type: 3,
      required: true
    },
    {
      name: "description",
      description: "describe your character",
      type: 3,
      required: false
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async (client, interaction, config, db) => {
    const playerClass = interaction.options.get('class').value;
    const playerName = interaction.options.get('name').value;
    const playerDesc = interaction.options.get('description').value;

    const newPlayer = new Player();
    newPlayer.class = playerClass;
    newPlayer.name = playerName;
    newPlayer.description = playerDesc;

    newPlayer.save().then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${playerName}`)
            .setAuthor({ name: playerClass })
            .setDescription(playerDesc)
        ],
      })
    }).catch((error) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Could not create mob, it already exists (name: ${playerName}, type ${playerClass})`)
            .setAuthor({ name: 'Error' })
            .setDescription(`Please use another name/type`)
        ],
      })
      console.log(error);
    });
  },
};