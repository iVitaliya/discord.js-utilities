const { Client, User, GuildMember, Guild, GuildEmoji } = require('discord.js');

module.exports = class EmojiFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [GuildEmoji](https://discord.js.org/#/docs/main/stable/class/GuildEmoji)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /** 
     * Gets a {@link [GuildEmoji](https://discord.js.org/#/docs/main/stable/class/GuildEmoji)} by the specified parameters, query takes a mention, ID, or name
     * @public
     * @param {string} query - The query used to fetch the {@link [GuildEmoji](https://discord.js.org/#/docs/main/stable/class/GuildEmoji)} by
     * @param {Guild} guild - The {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} to fetch the {@link [GuildEmoji](https://discord.js.org/#/docs/main/stable/class/GuildEmoji)} from
     * @returns {GuildEmoji|null} Either a {@link [GuildEmoji](https://discord.js.org/#/docs/main/stable/class/GuildEmoji)} or null
     */
    get(
        query,
        guild
    ) {
        const emoji = guild.emojis.cache.find(
            (emji) => emji.name.toLowerCase() === query.toLowerCase() ||
                emji.id === query ||
                `<:${emji.name}:${emji.id}>` === query ||
                `:${emji.name}:` === query
        );

        if (!(emoji instanceof GuildEmoji)) return null;
        else return emoji;
    }
}