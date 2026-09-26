import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_nav_items\`;`)
  await db.run(sql`DROP TABLE \`site_footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`site_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_nav_items_order_idx\` ON \`site_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_nav_items_parent_id_idx\` ON \`site_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_footer_nav_items_order_idx\` ON \`site_footer_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_footer_nav_items_parent_id_idx\` ON \`site_footer_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`books_id\` integer,
  	\`events_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`books_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_rels_order_idx\` ON \`site_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`site_rels_parent_idx\` ON \`site_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_rels_path_idx\` ON \`site_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`site_rels_posts_id_idx\` ON \`site_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`site_rels_books_id_idx\` ON \`site_rels\` (\`books_id\`);`)
  await db.run(sql`CREATE INDEX \`site_rels_events_id_idx\` ON \`site_rels\` (\`events_id\`);`)
}
