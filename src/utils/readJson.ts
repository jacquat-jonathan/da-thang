import advantagesJson from './advantages.json';
import levelsJson from './levels.json';
import playersJson from './players.json';
import questsJson from './quests.json';
import { Advantage, Data, Level, Player, Quest } from './types';

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
      title: quest.title,
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
