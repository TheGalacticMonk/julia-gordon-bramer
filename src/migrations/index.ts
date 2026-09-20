import * as migration_20260919_085644_initial from './20260919_085644_initial';

export const migrations = [
  {
    up: migration_20260919_085644_initial.up,
    down: migration_20260919_085644_initial.down,
    name: '20260919_085644_initial'
  },
];
