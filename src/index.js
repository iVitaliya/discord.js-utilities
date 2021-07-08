module.exports = {
    // User Fetchers
    UserFetcher: require('./Resolvers/User/User'),
    GuildMemberFetcher: require('./Resolvers/User/GuildMember'),

    // Chat
    GuildEmojiFetcher: require('./Resolvers/Chat/Emoji'),
    MessageFetcher: require('./Resolvers/Chat/Message'),

    // Guild
    RoleFetcher: require('./Resolvers/Guild/Role'),
    ChannelFetcher: require('./Resolvers/Guild/Channel'),
    AuditLogFetcher: require('./Resolvers/Guild/AuditLog'),
    BanFetcher: require('./Resolvers/Guild/Ban'),
    GuildFetcher: require('./Resolvers/Guild/Guild')
};