const { EmbedBuilder } = require('discord.js');
const Mob = require('../../../schemas/activeMob');

module.exports = {
  name: "attack-mob", // Name of command
  description: "Enter the key to chose which mob to attack", // Command description
  type: 1, // Command type
  options: [
    {
      name: "key",
      description: "key of the mob",
      type: 3,
      required: true
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async (client, interaction, config, db) => {
    const mobKey = interaction.options.get('key').value;
    let currentActiveMob = await Mob.find({ key: mobKey }).exec();
    currentActiveMob = currentActiveMob.pop();

    const damage = (1 + Math.round(Math.random() * 10));
    currentActiveMob.health = currentActiveMob.health - damage;
    currentActiveMob.save();


    if (currentActiveMob.health >= 0) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${currentActiveMob.name} [${currentActiveMob.health} HP]`)
            .setAuthor({ name: `${currentActiveMob.type} | Lvl. ${currentActiveMob.level}` })
            .setDescription(`${interaction.user.tag} has done ${damage} damage!`)
            .setFooter({ text: `${currentActiveMob.key}`, iconURL: 'https://www.pngmart.com/files/16/Vector-Silver-Key-Transparent-Background.png' })
        ],
      });
    } else {
      currentActiveMob.deleteOne({ key: mobKey });
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${currentActiveMob.name} has been killed by ${interaction.user.tag}!`)
        ],
      });
    }
  },
};