const { Client, User, GuildMember, Guild } = require('discord.js');

module.exports = class GuildMemberFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /** 
     * Gets a {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} by the specified parameters, query takes a mention, ID, username, tag or nickname
     * @public
     * @param {string} query - The query used to fetch the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} by
     * @param {Guild} guild - The {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} to fetch the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} from
     * @returns {GuildMember|null} Either a {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} or null
     */
    get(
        query,
        guild
    ) {
        const guildMember = guild.members.cache.find(
            (member) => member.id === query.replace(/[\\<>@!]/g, '') ||
                member.displayName.toLowerCase() === query.toLowerCase() ||
                member.user.tag.toLowerCase() === query.toLowerCase() ||
                member.user.username.toLowerCase() === query.toLowerCase()
        );

        if (!(guildMember instanceof GuildMember)) return null;
        else return guildMember;
    }

    /**
     * Gets a {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} by the specified ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {Guild} guild - The {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} to fetch the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} from
     * @param {string} ID - The ID to fetch the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} by
     * @param {boolean} cache - If it should search in the cache for the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)}
     * @param {boolean} force - If it should force to fetch the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)}
     * @returns {Promise<GuildMember>|null} Either the {@link [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)} or null
     */
    async fetch(
        guild,
        ID,
        cache,
        force
    ) {
        const guildMember = await guild.members.fetch({
            user: ID,
            cache: cache,
            force: force
        });

        if (!(guildMember instanceof GuildMember)) return null;
        else return guildMember;
    }
}