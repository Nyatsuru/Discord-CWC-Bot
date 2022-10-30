const { EmbedBuilder } = require('discord.js');
const baseMob = require('../../../schemas/baseMob');
const activeMob = require('../../../schemas/activeMob');

module.exports = {
  name: "spawnmob", // Name of command
  description: "Spawn interactive mob", // Command description
  type: 1, // Command type
  options: [
    {
      name: "key",
      description: "unique key for mob, maybe purpose or time",
      type: 3,
      required: true
    },
    {
      name: "type",
      description: "mob type from database",
      type: 3,
      required: true
    },
    {
      name: "name",
      description: "mob name from database",
      type: 3,
      required: true
    },
    {
      name: "level",
      description: "mob level",
      type: 4,
      required: true
    },
    {
      name: "moveset",
      description: "moveset name",
      type: 3,
      required: false
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },

  run: async (client, interaction, config, db) => {
    const aMobKey = interaction.options.get('key').value;
    const aMobType = interaction.options.get('type').value;
    const aMobName = interaction.options.get('name').value;
    const aMobLevel = interaction.options.get('level').value;
    //const aMobMoveset = interaction.options.get('moveset').value;

    const newActiveMob = new activeMob();
    let chosenBaseMob = await baseMob.findOne({ name: aMobName, type: aMobType }).exec();

    newActiveMob.key = aMobKey;
    newActiveMob.type = chosenBaseMob.type;
    newActiveMob.name = chosenBaseMob.name;
    newActiveMob.level = aMobLevel;
    newActiveMob.health = (chosenBaseMob.health + Math.ceil((chosenBaseMob.health) * ((aMobLevel * 0.1) * (aMobLevel * 0.1))));
    newActiveMob.description = chosenBaseMob.description;

    newActiveMob.save().then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${newActiveMob.name} [${newActiveMob.health} HP]`)
            .setAuthor({ name: `${newActiveMob.type} | Lvl. ${newActiveMob.level}` })
            .setDescription(newActiveMob.description)
            .setFooter({ text: `${newActiveMob.key}`, iconURL: 'https://www.pngmart.com/files/16/Vector-Silver-Key-Transparent-Background.png' })
        ],
      });
    });
  },
};