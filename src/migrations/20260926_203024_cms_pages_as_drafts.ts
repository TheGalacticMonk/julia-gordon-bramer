import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tarot_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text DEFAULT 'Tarot with Julia',
  	\`hero_title\` text DEFAULT 'A reading is a conversation with the life you’re already living.',
  	\`hero_text\` text DEFAULT 'Get a phone or video reading from anywhere in the world. Julia brings more than 45 years of tarot practice to readings that are direct, thoughtful, and personal.',
  	\`hero_button\` text DEFAULT 'Book a Reading',
  	\`format_card_label\` text DEFAULT 'Format',
  	\`format_card_title\` text DEFAULT 'Phone or video',
  	\`format_card_text\` text DEFAULT 'Readings are available from anywhere in the world. Fill out the contact form, email, or call ahead to schedule.',
  	\`rate_card_label\` text DEFAULT 'Rate',
  	\`rate_card_title\` text DEFAULT '$3 per minute',
  	\`rate_card_text\` text DEFAULT 'The length of a reading can meet the question. Julia will help you find the right shape for the conversation.',
  	\`payment_card_label\` text DEFAULT 'Payment',
  	\`payment_card_title\` text DEFAULT 'Simple and flexible',
  	\`payment_card_text\` text DEFAULT 'Payment options include Zelle, Apple Pay, Venmo, Cash App, and PayPal.',
  	\`bring_label\` text DEFAULT 'What to bring',
  	\`bring_statement\` text DEFAULT 'A question, a crossroads, or simply some room to think.',
  	\`bring_text1\` text DEFAULT 'Julia’s approach is informed by tarot as a language of images and relationships. The cards can help you notice patterns, name what you already know, and find a next step that feels like your own.',
  	\`bring_text2\` text DEFAULT 'Regular weekday and weeknight appointments are available, along with custom gift certificates and readings for gatherings or holiday parties.',
  	\`bring_button\` text DEFAULT 'Schedule a reading',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`tarot_page__status_idx\` ON \`tarot_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_tarot_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_eyebrow\` text DEFAULT 'Tarot with Julia',
  	\`version_hero_title\` text DEFAULT 'A reading is a conversation with the life you’re already living.',
  	\`version_hero_text\` text DEFAULT 'Get a phone or video reading from anywhere in the world. Julia brings more than 45 years of tarot practice to readings that are direct, thoughtful, and personal.',
  	\`version_hero_button\` text DEFAULT 'Book a Reading',
  	\`version_format_card_label\` text DEFAULT 'Format',
  	\`version_format_card_title\` text DEFAULT 'Phone or video',
  	\`version_format_card_text\` text DEFAULT 'Readings are available from anywhere in the world. Fill out the contact form, email, or call ahead to schedule.',
  	\`version_rate_card_label\` text DEFAULT 'Rate',
  	\`version_rate_card_title\` text DEFAULT '$3 per minute',
  	\`version_rate_card_text\` text DEFAULT 'The length of a reading can meet the question. Julia will help you find the right shape for the conversation.',
  	\`version_payment_card_label\` text DEFAULT 'Payment',
  	\`version_payment_card_title\` text DEFAULT 'Simple and flexible',
  	\`version_payment_card_text\` text DEFAULT 'Payment options include Zelle, Apple Pay, Venmo, Cash App, and PayPal.',
  	\`version_bring_label\` text DEFAULT 'What to bring',
  	\`version_bring_statement\` text DEFAULT 'A question, a crossroads, or simply some room to think.',
  	\`version_bring_text1\` text DEFAULT 'Julia’s approach is informed by tarot as a language of images and relationships. The cards can help you notice patterns, name what you already know, and find a next step that feels like your own.',
  	\`version_bring_text2\` text DEFAULT 'Regular weekday and weeknight appointments are available, along with custom gift certificates and readings for gatherings or holiday parties.',
  	\`version_bring_button\` text DEFAULT 'Schedule a reading',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_tarot_page_v_version_version__status_idx\` ON \`_tarot_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_tarot_page_v_created_at_idx\` ON \`_tarot_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tarot_page_v_updated_at_idx\` ON \`_tarot_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_tarot_page_v_latest_idx\` ON \`_tarot_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_tarot_page_v_autosave_idx\` ON \`_tarot_page_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`decoding_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text DEFAULT 'An ongoing project',
  	\`hero_title\` text DEFAULT 'Decoding Sylvia Plath',
  	\`hero_intro\` text DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Welcome to Julia Gordon-Bramer’s page on Sylvia Plath’s early poems. She has done a lot of work over the past decade and a half on Plath’s poetry. Plath’s early poems are often ignored as her training ground in finding her voice — here, she shows how that early work has great value, and mystery. In her first book, ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"link","children":[{"type":"text","text":"Fixed Stars Govern a Life","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":3,"fields":{"linkType":"custom","url":"/books/fixed-stars-govern-a-life","newTab":false}},{"type":"text","text":" (2014), and subsequently ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"link","children":[{"type":"text","text":"“Lady Lazarus”","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":3,"fields":{"linkType":"custom","url":"/books/decoding-sylvia-plaths-lady-lazarus","newTab":false}},{"type":"text","text":" and ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"link","children":[{"type":"text","text":"“Daddy”","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":3,"fields":{"linkType":"custom","url":"/books/decoding-sylvia-plaths-daddy","newTab":false}},{"type":"text","text":" (both 2017), she reveals new interpretations and multi-layered dimensions of Plath’s poetry through the use of the tarot and Qabalah. It was only natural to go back and see whether Plath had done the same in her early work, especially the poems written before her mystical masterpiece, ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":"Ariel","format":2,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":". Below: how Sylvia Plath incorporated news stories, celebrity gossip, and art into her early works — and, maybe most exciting, how many of these poems are documents of her prescience.","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"version":1}}',
  	\`quote\` text DEFAULT 'I want to write at least ten good news poems….',
  	\`quote_source\` text DEFAULT 'Sylvia Plath, in a letter to her mother, Monday, 25 April 1955',
  	\`photo_caption\` text DEFAULT 'Working from Plath’s own calendars, letters, and journals.',
  	\`method_label\` text DEFAULT 'Method',
  	\`method_statement\` text DEFAULT 'Cast the poem against the news of the day.',
  	\`method_text\` text DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"“A belief in the occult is not necessary to understand these interpretations of Plath’s early work,” she writes. “A simple guideline is to cast the time of the poem’s writing against personal, academic, and news events of Plath’s day, often recorded in her calendar, letters, and journals.” Those calendars and journals are held in the Sylvia Plath archives at the Lilly Library, Indiana University–Bloomington.","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":1,"textFormat":0,"textStyle":""},{"type":"paragraph","children":[{"type":"text","text":"The essays currently cover Plath’s poems from 1956 — the year she and Ted Hughes met, married, and honeymooned in Benidorm, Spain — with 1957 planned next. “I will be working on this site for a while,” she writes, “uploading each year of my Early Poems work as I get to it.” Because of copyright restrictions she can’t reprint the poems themselves, so each essay is written to be read alongside your own copy of ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":"The Collected Poems of Sylvia Plath","format":2,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":".","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"version":1}}',
  	\`credentials_label\` text DEFAULT 'Academic credentials',
  	\`credential1_label\` text DEFAULT 'Teaching',
  	\`credential1_title\` text DEFAULT 'Lindenwood University',
  	\`credential1_text\` text DEFAULT 'Graduate-level creative writing, St. Louis, Missouri.',
  	\`credential2_label\` text DEFAULT 'Journal',
  	\`credential2_title\` text DEFAULT 'Plath Profiles',
  	\`credential2_text\` text DEFAULT 'Contributor, volumes 2, 3, 4, 5, and 7.',
  	\`credential3_label\` text DEFAULT 'Conference',
  	\`credential3_title\` text DEFAULT 'UW–Milwaukee',
  	\`credential3_text\` text DEFAULT 'Presenter, Racial Formation/Racial Awareness Graduate Conference, 2014.',
  	\`essays_label\` text DEFAULT 'The essays',
  	\`essays_heading\` text DEFAULT 'essays so far, one per 1956 poem.',
  	\`essays_note\` text DEFAULT 'Select any essay to read it in full.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`decoding_page__status_idx\` ON \`decoding_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_decoding_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_eyebrow\` text DEFAULT 'An ongoing project',
  	\`version_hero_title\` text DEFAULT 'Decoding Sylvia Plath',
  	\`version_hero_intro\` text DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Welcome to Julia Gordon-Bramer’s page on Sylvia Plath’s early poems. She has done a lot of work over the past decade and a half on Plath’s poetry. Plath’s early poems are often ignored as her training ground in finding her voice — here, she shows how that early work has great value, and mystery. In her first book, ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"link","children":[{"type":"text","text":"Fixed Stars Govern a Life","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":3,"fields":{"linkType":"custom","url":"/books/fixed-stars-govern-a-life","newTab":false}},{"type":"text","text":" (2014), and subsequently ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"link","children":[{"type":"text","text":"“Lady Lazarus”","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":3,"fields":{"linkType":"custom","url":"/books/decoding-sylvia-plaths-lady-lazarus","newTab":false}},{"type":"text","text":" and ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"link","children":[{"type":"text","text":"“Daddy”","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":3,"fields":{"linkType":"custom","url":"/books/decoding-sylvia-plaths-daddy","newTab":false}},{"type":"text","text":" (both 2017), she reveals new interpretations and multi-layered dimensions of Plath’s poetry through the use of the tarot and Qabalah. It was only natural to go back and see whether Plath had done the same in her early work, especially the poems written before her mystical masterpiece, ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":"Ariel","format":2,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":". Below: how Sylvia Plath incorporated news stories, celebrity gossip, and art into her early works — and, maybe most exciting, how many of these poems are documents of her prescience.","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"version":1}}',
  	\`version_quote\` text DEFAULT 'I want to write at least ten good news poems….',
  	\`version_quote_source\` text DEFAULT 'Sylvia Plath, in a letter to her mother, Monday, 25 April 1955',
  	\`version_photo_caption\` text DEFAULT 'Working from Plath’s own calendars, letters, and journals.',
  	\`version_method_label\` text DEFAULT 'Method',
  	\`version_method_statement\` text DEFAULT 'Cast the poem against the news of the day.',
  	\`version_method_text\` text DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"“A belief in the occult is not necessary to understand these interpretations of Plath’s early work,” she writes. “A simple guideline is to cast the time of the poem’s writing against personal, academic, and news events of Plath’s day, often recorded in her calendar, letters, and journals.” Those calendars and journals are held in the Sylvia Plath archives at the Lilly Library, Indiana University–Bloomington.","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":1,"textFormat":0,"textStyle":""},{"type":"paragraph","children":[{"type":"text","text":"The essays currently cover Plath’s poems from 1956 — the year she and Ted Hughes met, married, and honeymooned in Benidorm, Spain — with 1957 planned next. “I will be working on this site for a while,” she writes, “uploading each year of my Early Poems work as I get to it.” Because of copyright restrictions she can’t reprint the poems themselves, so each essay is written to be read alongside your own copy of ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":"The Collected Poems of Sylvia Plath","format":2,"detail":0,"mode":"normal","style":"","version":1},{"type":"text","text":".","format":0,"detail":0,"mode":"normal","style":"","version":1}],"direction":"ltr","format":"","indent":0,"version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"version":1}}',
  	\`version_credentials_label\` text DEFAULT 'Academic credentials',
  	\`version_credential1_label\` text DEFAULT 'Teaching',
  	\`version_credential1_title\` text DEFAULT 'Lindenwood University',
  	\`version_credential1_text\` text DEFAULT 'Graduate-level creative writing, St. Louis, Missouri.',
  	\`version_credential2_label\` text DEFAULT 'Journal',
  	\`version_credential2_title\` text DEFAULT 'Plath Profiles',
  	\`version_credential2_text\` text DEFAULT 'Contributor, volumes 2, 3, 4, 5, and 7.',
  	\`version_credential3_label\` text DEFAULT 'Conference',
  	\`version_credential3_title\` text DEFAULT 'UW–Milwaukee',
  	\`version_credential3_text\` text DEFAULT 'Presenter, Racial Formation/Racial Awareness Graduate Conference, 2014.',
  	\`version_essays_label\` text DEFAULT 'The essays',
  	\`version_essays_heading\` text DEFAULT 'essays so far, one per 1956 poem.',
  	\`version_essays_note\` text DEFAULT 'Select any essay to read it in full.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_version_version__status_idx\` ON \`_decoding_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_created_at_idx\` ON \`_decoding_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_updated_at_idx\` ON \`_decoding_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_latest_idx\` ON \`_decoding_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_decoding_page_v_autosave_idx\` ON \`_decoding_page_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`books_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Books',
  	\`intro\` text DEFAULT 'Five books across three publishers — a trade-press tarot guide and Plath biography, two chapbook-scale Plath essay collections, and the foundational academic study that started it all.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`books_page__status_idx\` ON \`books_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_books_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_heading\` text DEFAULT 'Books',
  	\`version_intro\` text DEFAULT 'Five books across three publishers — a trade-press tarot guide and Plath biography, two chapbook-scale Plath essay collections, and the foundational academic study that started it all.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_books_page_v_version_version__status_idx\` ON \`_books_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_books_page_v_created_at_idx\` ON \`_books_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_books_page_v_updated_at_idx\` ON \`_books_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_books_page_v_latest_idx\` ON \`_books_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_books_page_v_autosave_idx\` ON \`_books_page_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`events_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Events & Tour',
  	\`intro\` text DEFAULT 'Readings, signings, lectures, and workshops — in the US and, when the calendar allows, abroad.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`events_page__status_idx\` ON \`events_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_events_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_heading\` text DEFAULT 'Events & Tour',
  	\`version_intro\` text DEFAULT 'Readings, signings, lectures, and workshops — in the US and, when the calendar allows, abroad.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_page_v_version_version__status_idx\` ON \`_events_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_events_page_v_created_at_idx\` ON \`_events_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_page_v_updated_at_idx\` ON \`_events_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_page_v_latest_idx\` ON \`_events_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_events_page_v_autosave_idx\` ON \`_events_page_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Get in touch',
  	\`heading\` text DEFAULT 'Contact',
  	\`intro\` text DEFAULT 'Booking a reading, inviting Julia to speak, or writing as press — tell her which, and she’ll get back to you directly.',
  	\`success_message\` text DEFAULT 'Thank you — your message is on its way. Julia replies personally, so it may take a few days.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page__status_idx\` ON \`contact_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_contact_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_eyebrow\` text DEFAULT 'Get in touch',
  	\`version_heading\` text DEFAULT 'Contact',
  	\`version_intro\` text DEFAULT 'Booking a reading, inviting Julia to speak, or writing as press — tell her which, and she’ll get back to you directly.',
  	\`version_success_message\` text DEFAULT 'Thank you — your message is on its way. Julia replies personally, so it may take a few days.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_page_v_version_version__status_idx\` ON \`_contact_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_created_at_idx\` ON \`_contact_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_updated_at_idx\` ON \`_contact_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_latest_idx\` ON \`_contact_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_autosave_idx\` ON \`_contact_page_v\` (\`autosave\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_press_quotes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`source\` text NOT NULL,
  	\`source_url\` text,
  	\`context\` text,
  	\`featured\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_press_quotes\`("id", "quote", "source", "source_url", "context", "featured", "updated_at", "created_at") SELECT "id", "quote", "source", "source_url", "context", "featured", "updated_at", "created_at" FROM \`press_quotes\`;`)
  await db.run(sql`DROP TABLE \`press_quotes\`;`)
  await db.run(sql`ALTER TABLE \`__new_press_quotes\` RENAME TO \`press_quotes\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`press_quotes_updated_at_idx\` ON \`press_quotes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`press_quotes_created_at_idx\` ON \`press_quotes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_nav_items\` (
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
  await db.run(sql`INSERT INTO \`__new_site_nav_items\`("_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label") SELECT "_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label" FROM \`site_nav_items\`;`)
  await db.run(sql`DROP TABLE \`site_nav_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_nav_items\` RENAME TO \`site_nav_items\`;`)
  await db.run(sql`CREATE INDEX \`site_nav_items_order_idx\` ON \`site_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_nav_items_parent_id_idx\` ON \`site_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_footer_nav_items\` (
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
  await db.run(sql`INSERT INTO \`__new_site_footer_nav_items\`("_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label") SELECT "_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label" FROM \`site_footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`site_footer_nav_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_footer_nav_items\` RENAME TO \`site_footer_nav_items\`;`)
  await db.run(sql`CREATE INDEX \`site_footer_nav_items_order_idx\` ON \`site_footer_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_footer_nav_items_parent_id_idx\` ON \`site_footer_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_socials\`("_order", "_parent_id", "id", "platform", "url") SELECT "_order", "_parent_id", "id", "platform", "url" FROM \`site_socials\`;`)
  await db.run(sql`DROP TABLE \`site_socials\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_socials\` RENAME TO \`site_socials\`;`)
  await db.run(sql`CREATE INDEX \`site_socials_order_idx\` ON \`site_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_socials_parent_id_idx\` ON \`site_socials\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`_order\` text;`)
  await db.run(sql`CREATE INDEX \`posts__order_idx\` ON \`posts\` (\`_order\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version__order\` text;`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__order_idx\` ON \`_posts_v\` (\`version__order\`);`)
  await db.run(sql`ALTER TABLE \`books\` ADD \`_order\` text;`)
  await db.run(sql`CREATE INDEX \`books__order_idx\` ON \`books\` (\`_order\`);`)
  await db.run(sql`ALTER TABLE \`_books_v\` ADD \`version__order\` text;`)
  await db.run(sql`CREATE INDEX \`_books_v_version_version__order_idx\` ON \`_books_v\` (\`version__order\`);`)
  await db.run(sql`ALTER TABLE \`form_submissions\` ADD \`phone\` text;`)

  // Data steps (hand-written; the generator only emits schema):
  // 1. What the site shows for the home page today is, by definition, its published version.
  //    Mark it so the CMS shows "Published" instead of "Draft".
  await db.run(sql`UPDATE \`home\` SET \`_status\` = 'published';`)
  // 2. Books and essays gain a drag-to-reorder position. Give existing rows one, in the order they
  //    were created (same 'a' + 6 digits format the seed script uses).
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a' || printf('%06d', (SELECT COUNT(*) FROM \`books\` b2 WHERE b2.\`id\` < \`books\`.\`id\`)) WHERE \`_order\` IS NULL;`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a' || printf('%06d', (SELECT COUNT(*) FROM \`posts\` p2 WHERE p2.\`id\` < \`posts\`.\`id\`)) WHERE \`_order\` IS NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tarot_page\`;`)
  await db.run(sql`DROP TABLE \`_tarot_page_v\`;`)
  await db.run(sql`DROP TABLE \`decoding_page\`;`)
  await db.run(sql`DROP TABLE \`_decoding_page_v\`;`)
  await db.run(sql`DROP TABLE \`books_page\`;`)
  await db.run(sql`DROP TABLE \`_books_page_v\`;`)
  await db.run(sql`DROP TABLE \`events_page\`;`)
  await db.run(sql`DROP TABLE \`_events_page_v\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`_contact_page_v\`;`)
  await db.run(sql`DROP INDEX \`posts__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`_order\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_version_version__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version__order\`;`)
  await db.run(sql`DROP INDEX \`books__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`books\` DROP COLUMN \`_order\`;`)
  await db.run(sql`DROP INDEX \`_books_v_version_version__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`_books_v\` DROP COLUMN \`version__order\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_press_quotes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`source\` text NOT NULL,
  	\`source_url\` text,
  	\`context\` text,
  	\`related_book_id\` integer,
  	\`featured\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`related_book_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_press_quotes\`("id", "quote", "source", "source_url", "context", "related_book_id", "featured", "updated_at", "created_at") SELECT "id", "quote", "source", "source_url", "context", "related_book_id", "featured", "updated_at", "created_at" FROM \`press_quotes\`;`)
  await db.run(sql`DROP TABLE \`press_quotes\`;`)
  await db.run(sql`ALTER TABLE \`__new_press_quotes\` RENAME TO \`press_quotes\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`press_quotes_related_book_idx\` ON \`press_quotes\` (\`related_book_id\`);`)
  await db.run(sql`CREATE INDEX \`press_quotes_updated_at_idx\` ON \`press_quotes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`press_quotes_created_at_idx\` ON \`press_quotes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_nav_items\`("_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label") SELECT "_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label" FROM \`site_nav_items\`;`)
  await db.run(sql`DROP TABLE \`site_nav_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_nav_items\` RENAME TO \`site_nav_items\`;`)
  await db.run(sql`CREATE INDEX \`site_nav_items_order_idx\` ON \`site_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_nav_items_parent_id_idx\` ON \`site_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_footer_nav_items\`("_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label") SELECT "_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "link_label" FROM \`site_footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`site_footer_nav_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_footer_nav_items\` RENAME TO \`site_footer_nav_items\`;`)
  await db.run(sql`CREATE INDEX \`site_footer_nav_items_order_idx\` ON \`site_footer_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_footer_nav_items_parent_id_idx\` ON \`site_footer_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_socials\`("_order", "_parent_id", "id", "platform", "url") SELECT "_order", "_parent_id", "id", "platform", "url" FROM \`site_socials\`;`)
  await db.run(sql`DROP TABLE \`site_socials\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_socials\` RENAME TO \`site_socials\`;`)
  await db.run(sql`CREATE INDEX \`site_socials_order_idx\` ON \`site_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_socials_parent_id_idx\` ON \`site_socials\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`phone\`;`)
}
