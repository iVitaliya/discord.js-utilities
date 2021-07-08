const { Client, User, GuildMember, Guild, GuildEmoji, TextChannel, Message } = require('discord.js');

/**
 * @typedef {Object} IMessageFetchOptions
 * @property {number} limit - How many messages it may fetch
 * @property {string} before - Messages to fetch which were sent "before" specific date
 * @property {string} after - Messages to fetch which were sent "after" specific date
 * @property {string} around - Messages to fetch which were sent "around" specific date
 */

module.exports = class MessageFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /** 
     * Gets a {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} by the specified parameters, query takes a word it starts/ends with or ID
     * @public
     * @param {string} query - The query used to fetch the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} by
     * @param {TextChannel} channel - The {@link [TextChannel](https://discord.js.org/#/docs/main/stable/class/TextChannel)} to fetch the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} from
     * @returns {Message|null} Either a {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} or null
     */
    get(
        query,
        channel
    ) {
        const message = channel.messages.cache.find(
            (msg) => msg.content.startsWith(query) ||
                msg.content.endsWith(query) ||
                msg.id === query
        );

        if (!(message instanceof Message)) return null;
        else return message;
    }

    /**
     * Gets a {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} by the specified ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {TextChannel} channel - The {@link [TextChannel](https://discord.js.org/#/docs/main/stable/class/TextChannel)} to fetch the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} from
     * @param {IMessageFetchOptions} fetch_options - How many messages it may fetch
     * @param {string} ID - The ID to fetch the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} by
     * @param {boolean} cache - If it should search in the cache for the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)}
     * @param {boolean} force - If it should force to fetch the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)}
     * @returns {Promise<Message>|null} Either the {@link [Message](https://discord.js.org/#/docs/main/stable/class/Message)} or null
     */
    async fetch(
        channel,
        fetch_options,
        ID,
        cache,
        force
    ) {
        const message = await channel.messages.fetch(fetch_options, cache, force);

        if (!(message instanceof Message)) return null;
        else return message;
    }
}