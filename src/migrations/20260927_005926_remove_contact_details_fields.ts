import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site\` DROP COLUMN \`contact_email\`;`)
  await db.run(sql`ALTER TABLE \`site\` DROP COLUMN \`contact_phone\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site\` ADD \`contact_email\` text;`)
  await db.run(sql`ALTER TABLE \`site\` ADD \`contact_phone\` text;`)
}
