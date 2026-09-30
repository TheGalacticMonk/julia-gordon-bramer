import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`decoding_page_credentials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text DEFAULT '',
  	\`title\` text DEFAULT '',
  	\`text\` text DEFAULT '',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`decoding_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`decoding_page_credentials_order_idx\` ON \`decoding_page_credentials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`decoding_page_credentials_parent_id_idx\` ON \`decoding_page_credentials\` (\`_parent_id\`);`)
  // Carry over whatever was already saved in the 3 fixed boxes as the first 3 rows of the new
  // list, so existing edits aren't lost when the old columns are dropped below.
  await db.run(sql`INSERT INTO \`decoding_page_credentials\` (\`_order\`, \`_parent_id\`, \`id\`, \`label\`, \`title\`, \`text\`)
  SELECT 1, \`id\`, lower(hex(randomblob(16))), \`credential1_label\`, \`credential1_title\`, \`credential1_text\` FROM \`decoding_page\`
  WHERE \`credential1_label\` IS NOT NULL OR \`credential1_title\` IS NOT NULL OR \`credential1_text\` IS NOT NULL;`)
  await db.run(sql`INSERT INTO \`decoding_page_credentials\` (\`_order\`, \`_parent_id\`, \`id\`, \`label\`, \`title\`, \`text\`)
  SELECT 2, \`id\`, lower(hex(randomblob(16))), \`credential2_label\`, \`credential2_title\`, \`credential2_text\` FROM \`decoding_page\`
  WHERE \`credential2_label\` IS NOT NULL OR \`credential2_title\` IS NOT NULL OR \`credential2_text\` IS NOT NULL;`)
  await db.run(sql`INSERT INTO \`decoding_page_credentials\` (\`_order\`, \`_parent_id\`, \`id\`, \`label\`, \`title\`, \`text\`)
  SELECT 3, \`id\`, lower(hex(randomblob(16))), \`credential3_label\`, \`credential3_title\`, \`credential3_text\` FROM \`decoding_page\`
  WHERE \`credential3_label\` IS NOT NULL OR \`credential3_title\` IS NOT NULL OR \`credential3_text\` IS NOT NULL;`)
  await db.run(sql`CREATE TABLE \`_decoding_page_v_version_credentials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text DEFAULT '',
  	\`title\` text DEFAULT '',
  	\`text\` text DEFAULT '',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_decoding_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_version_credentials_order_idx\` ON \`_decoding_page_v_version_credentials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_version_credentials_parent_id_idx\` ON \`_decoding_page_v_version_credentials\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential1_label\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential1_title\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential1_text\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential2_label\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential2_title\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential2_text\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential3_label\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential3_title\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` DROP COLUMN \`credential3_text\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential1_label\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential1_title\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential1_text\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential2_label\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential2_title\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential2_text\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential3_label\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential3_title\`;`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` DROP COLUMN \`version_credential3_text\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`decoding_page_credentials\`;`)
  await db.run(sql`DROP TABLE \`_decoding_page_v_version_credentials\`;`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential1_label\` text DEFAULT 'Teaching';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential1_title\` text DEFAULT 'Lindenwood University';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential1_text\` text DEFAULT 'Graduate-level creative writing, St. Louis, Missouri.';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential2_label\` text DEFAULT 'Journal';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential2_title\` text DEFAULT 'Plath Profiles';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential2_text\` text DEFAULT 'Contributor, volumes 2, 3, 4, 5, and 7.';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential3_label\` text DEFAULT 'Conference';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential3_title\` text DEFAULT 'UW–Milwaukee';`)
  await db.run(sql`ALTER TABLE \`decoding_page\` ADD \`credential3_text\` text DEFAULT 'Presenter, Racial Formation/Racial Awareness Graduate Conference, 2014.';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential1_label\` text DEFAULT 'Teaching';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential1_title\` text DEFAULT 'Lindenwood University';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential1_text\` text DEFAULT 'Graduate-level creative writing, St. Louis, Missouri.';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential2_label\` text DEFAULT 'Journal';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential2_title\` text DEFAULT 'Plath Profiles';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential2_text\` text DEFAULT 'Contributor, volumes 2, 3, 4, 5, and 7.';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential3_label\` text DEFAULT 'Conference';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential3_title\` text DEFAULT 'UW–Milwaukee';`)
  await db.run(sql`ALTER TABLE \`_decoding_page_v\` ADD \`version_credential3_text\` text DEFAULT 'Presenter, Racial Formation/Racial Awareness Graduate Conference, 2014.';`)
}
