export type Advantage = {
  id: string;
  description: string;
  levelId: string;
};

export type Level = {
  id: string;
  level: number;
  requiredXp: number;
  xpToNextLevel: number;
};

export type Player = {
  id: string;
  name: string;
  username: string;
  xp: number;
  karma: number;
  levelId: string;
};

export type Quest = {
  id: string;
  description: string;
  xp: number;
  karma: number;
  isEditable: boolean;
  title: string;
};

export type Data = {
  advantages: Array<Advantage>;
  levels: Array<Level>;
  players: Array<Player>;
  quests: Array<Quest>;
};
