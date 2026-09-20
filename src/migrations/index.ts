import * as migration_20260919_091344_initial from './20260919_091344_initial';

export const migrations = [
  {
    up: migration_20260919_091344_initial.up,
    down: migration_20260919_091344_initial.down,
    name: '20260919_091344_initial'
  },
];
