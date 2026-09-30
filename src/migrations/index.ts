import * as migration_20260919_085644_initial from './20260919_085644_initial';
import * as migration_20260926_203024_cms_pages_as_drafts from './20260926_203024_cms_pages_as_drafts';
import * as migration_20260926_204812_strip_unused_collections from './20260926_204812_strip_unused_collections';
import * as migration_20260926_215545_remove_pages_collection from './20260926_215545_remove_pages_collection';
import * as migration_20260926_220445_remove_cms_menu_items from './20260926_220445_remove_cms_menu_items';
import * as migration_20260926_231500_fix_essay_and_book_order from './20260926_231500_fix_essay_and_book_order';
import * as migration_20260927_005926_remove_contact_details_fields from './20260927_005926_remove_contact_details_fields';
import * as migration_20260930_213615 from './20260930_213615';

export const migrations = [
  {
    up: migration_20260919_085644_initial.up,
    down: migration_20260919_085644_initial.down,
    name: '20260919_085644_initial',
  },
  {
    up: migration_20260926_203024_cms_pages_as_drafts.up,
    down: migration_20260926_203024_cms_pages_as_drafts.down,
    name: '20260926_203024_cms_pages_as_drafts',
  },
  {
    up: migration_20260926_204812_strip_unused_collections.up,
    down: migration_20260926_204812_strip_unused_collections.down,
    name: '20260926_204812_strip_unused_collections',
  },
  {
    up: migration_20260926_215545_remove_pages_collection.up,
    down: migration_20260926_215545_remove_pages_collection.down,
    name: '20260926_215545_remove_pages_collection',
  },
  {
    up: migration_20260926_220445_remove_cms_menu_items.up,
    down: migration_20260926_220445_remove_cms_menu_items.down,
    name: '20260926_220445_remove_cms_menu_items',
  },
  {
    up: migration_20260926_231500_fix_essay_and_book_order.up,
    down: migration_20260926_231500_fix_essay_and_book_order.down,
    name: '20260926_231500_fix_essay_and_book_order',
  },
  {
    up: migration_20260927_005926_remove_contact_details_fields.up,
    down: migration_20260927_005926_remove_contact_details_fields.down,
    name: '20260927_005926_remove_contact_details_fields',
  },
  {
    up: migration_20260930_213615.up,
    down: migration_20260930_213615.down,
    name: '20260930_213615'
  },
];
