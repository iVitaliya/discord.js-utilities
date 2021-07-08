const { Client, User } = require('discord.js');
const { red, gray } = require('chalk');

module.exports = class UserFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /** 
     * Gets a {@link [User](https://discord.js.org/#/docs/main/stable/class/User)} by the specified parameters, query takes a mention, ID, username or tag
     * @public
     * @param {string} query - The query used to fetch the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)} by
     * @returns {User|null} Either the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)} or null
     */
    get(
        query
    ) {
        const user = this.client.users.cache.find(
            (user) => user.id === query.replace(/[\\<>@!]/g, '') ||
                user.tag.toLowerCase() === query.toLowerCase() ||
                user.username.toLowerCase() === query.toLowerCase()
        );

        if (!(user instanceof User)) return null;
        else return user;

    }

    /**
     * Gets a {@link [User](https://discord.js.org/#/docs/main/stable/class/User)} by the specified ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {string} ID - The ID to fetch the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)} by
     * @param {boolean} cache - If it should search in the cache for the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)}
     * @param {boolean} force - If it should force to fetch the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)}
     * @returns {Promise<User>|null} Either the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)} or null
     */
    async fetch(
        ID,
        cache,
        force
    ) {
        const user = await this.client.users.fetch(ID, cache, force);

        if (!(user instanceof User)) return null;
        else return user;
    }
}