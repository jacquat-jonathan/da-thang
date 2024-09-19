import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Player: a.model({
    name: a.string().required(),
    username: a.string().required(),
    xp: a.integer().required().default(0),
    karma: a.integer().required().default(0),
    levelId: a.id(),
    level: a.belongsTo('Level', 'levelId'),
    titleId: a.id(),
    title: a.belongsTo('Title', 'titleId'),
  }),
  Level: a.model({
    level: a.integer().required(),
    neededForNextLevel: a.integer().required(),
    players: a.hasMany('Player', 'levelId'),
    advantage: a.hasOne('Advantage', 'levelId'),
  }),
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
  Quest: a.model({
    description: a.string().required(),
    xp: a.integer().required(),
    karma: a.integer().required(),
  }),
  Logs: a
    .model({
      description: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

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
