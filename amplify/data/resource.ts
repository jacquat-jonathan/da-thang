import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a
  .schema({
    Player: a
      .model({
        name: a.string().required(),
        username: a.string().required(),
        xp: a.integer().required().default(0),
        karma: a.integer().required().default(0),
        levelId: a.id(),
        level: a.belongsTo('Level', 'levelId'),
        titleId: a.id(),
        title: a.belongsTo('Title', 'titleId'),
        quests: a.hasMany('PlayerQuest', 'playerId'),
        logs: a.hasMany('Logs', 'playerId'),
      })
      .secondaryIndexes((index) => [index('name')]),
    Level: a
      .model({
        level: a.integer().required(),
        requiredXp: a.integer().required(),
        xpToNextLevel: a.integer().required(),
        players: a.hasMany('Player', 'levelId'),
        advantage: a.hasOne('Advantage', 'levelId'),
      })
      .secondaryIndexes((index) => [index('level')]),
    Advantage: a.model({
      description: a.string().required(),
      levelId: a.id(),
      level: a.belongsTo('Level', 'levelId'),
    }),
    Title: a.model({
      titleXpId: a.id(),
      titleXp: a.belongsTo('TitleXp', 'titleXpId'),
      titleKarmaId: a.id(),
      titleKarma: a.belongsTo('TitleKarma', 'titleKarmaId'),
      players: a.hasMany('Player', 'titleId'),
    }),
    TitleXp: a.model({
      name: a.string().required(),
      needed: a.integer().required(),
      titles: a.hasMany('Title', 'titleXpId'),
    }),
    TitleKarma: a.model({
      name: a.string().required(),
      needed: a.integer().required(),
      titles: a.hasMany('Title', 'titleKarmaId'),
    }),
    Quest: a
      .model({
        title: a.string(),
        description: a.string().required(),
        xp: a.integer().default(0).required(),
        karma: a.integer().default(0).required(),
        isEditable: a.boolean().default(false).required(),
        players: a.hasMany('PlayerQuest', 'questId'),
      })
      .secondaryIndexes((index) => [index('xp').sortKeys(['description'])]),
    PlayerQuest: a.model({
      playerId: a.id(),
      questId: a.id(),
      player: a.belongsTo('Player', 'playerId'),
      quest: a.belongsTo('Quest', 'questId'),
    }),
    LogsType: a.enum([
      'PLAYER_DONE_QUEST',
      'PLAYER_LEVEL_UP',
      'PLAYER_NEW_TITLE',
      'PLAYER_ADDED_QUEST',
      'PLAYER_VOTED_FOR_QUEST',
      'PLAYER_ADDED_ADVANTAGE',
      'PLAYER_VOTED_FOR_ADVANTAGE',
      'ERROR',
      'OTHER',
    ]),
    Logs: a.model({
      description: a.string(),
      type: a.ref('LogsType'),
      playerId: a.id(),
      player: a.belongsTo('Player', 'playerId'),
    }),
  })
  .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
