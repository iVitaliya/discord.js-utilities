const { Client, Guild } = require('discord.js');
const { red, gray } = require('chalk');

module.exports = class GuildFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /**
     * Gets a {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} by the specified parameters, query takes a name or ID
     * @public
     * @param {string} query - The query used to fetch the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} by
     * @returns {Guild|null} Either the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} or null
     */
    get(
        query
    ) {
        const guild = this.client.guilds.cache.find(
            (guild) => guild.name.toLowerCase() === query.toLowerCase() ||
                guild.id === query
        );

        if (!(guild instanceof Guild)) return null;
        else return guild;
    }

    /**
     * Gets a {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} by the specified ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {string} ID - The ID to fetch the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} by
     * @param {boolean} cache - If it should search in the cache for the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)}
     * @param {boolean} force - If it should force to search for the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)}
     * @returns {Promise<Guild>|null} Either the {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} or null
     */
    async fetch(
        ID,
        cache,
        force
    ) {
        const guild = await this.client.guilds.fetch(ID, cache, force);

        if (!(guild instanceof Guild)) return null;
        else return guild;
    }
}