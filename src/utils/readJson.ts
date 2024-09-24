import advantagesJson from './advantages.json';
import levelsJson from './levels.json';
import playersJson from './players.json';
import questsJson from './quests.json';

type Advantage = {
  id: string;
  description: string;
  levelId: string;
};

type Level = {
  id: string;
  level: number;
  requiredXp: number;
  xpToNextLevel: number;
};

type Player = {
  id: string;
  name: string;
  username: string;
  xp: number;
  karma: number;
  levelId: string;
};

type Quest = {
  id: string;
  description: string;
  xp: number;
  karma: number;
  isEditable: boolean;
};

type Data = {
  advantages: Array<Advantage>;
  levels: Array<Level>;
  players: Array<Player>;
  quests: Array<Quest>;
};

const readAdvantages = () => {
  return advantagesJson.map((advantage) => {
    return {
      id: advantage.id,
      description: advantage.description,
      levelId: advantage.levelId,
    } as Advantage;
  });
};

const readLevels = () => {
  return levelsJson.map((level) => {
    return {
      id: level.id,
      level: level.level,
      requiredXp: level.requiredXp,
      xpToNextLevel: level.xpToNextLevel,
    } as Level;
  });
};

const readPlayers = () => {
  return playersJson.map((player) => {
    return {
      id: player.id,
      name: player.name,
      username: player.username,
      xp: player.xp,
      karma: player.karma,
      levelId: player.levelId,
    } as Player;
  });
};

const readQuests = () => {
  return questsJson.map((quest) => {
    return {
      id: quest.id,
      description: quest.description,
      xp: quest.xp,
      karma: quest.karma,
      isEditable: quest.isEditable,
    } as Quest;
  });
};

const readJson = () => {
  const advantages: Array<Advantage> = readAdvantages();
  const levels: Array<Level> = readLevels();
  const players: Array<Player> = readPlayers();
  const quests: Array<Quest> = readQuests();
  return {
    advantages: advantages,
    levels: levels,
    players: players,
    quests: quests,
  } as Data;
};

export default readJson;
