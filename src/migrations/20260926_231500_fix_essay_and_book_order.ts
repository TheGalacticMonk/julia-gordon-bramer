import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

// Data-only fix (no schema change).
//
// 1. Put the essays and books in the order they appear on the website: the essays in the order of
//    the Decoding Sylvia Plath page (decoding-sylvia-plath/essays.ts), the books in the order of
//    the Books page. The earlier backfill had ordered them by creation.
// 2. The CMS lists read each item's latest saved-draft copy, so its order value is copied there
//    too. With it empty, dragging an item made Payload answer "orderable ... first time you have
//    sorted documents" every time, without ever ordering anything.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000000' WHERE \`slug\` = 'dialogue-between-ghost-and-priest-monologue-at-3-a-m-the-glutton-and-november-gr';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000001' WHERE \`slug\` = 'street-song-double-jeopardy';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000002' WHERE \`slug\` = 'spider-caught-in-willies-winning-web';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000003' WHERE \`slug\` = 'the-shrike-relentless-ambition';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000004' WHERE \`slug\` = 'two-sisters-of-persephone-poetry-goddesses';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000005' WHERE \`slug\` = 'ella-mason-and-her-eleven-cats-cat-houses-in-the-news';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000006' WHERE \`slug\` = 'crystal-gazer-a-different-kind-of-globe';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000007' WHERE \`slug\` = 'history-and-a-case-for-prescience-introduction-on-short-studies-of-sylvia-plaths';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000008' WHERE \`slug\` = 'the-beggars-neighboring-countries-on-hard-times';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000009' WHERE \`slug\` = 'dream-with-clam-diggers-a-sinking-feeling';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000010' WHERE \`slug\` = 'recantation-an-incantation-of-political-disgust';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000011' WHERE \`slug\` = 'wreath-for-a-bridal-the-dysfunctional-marriage-of-nations';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000012' WHERE \`slug\` = 'maudlin-the-monthly-curse';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000013' WHERE \`slug\` = 'fiesta-melons-pin-up-pumpkins-and-hollywood-honeydew';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000014' WHERE \`slug\` = 'the-goring-nazi-gore-and-goering';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000015' WHERE \`slug\` = 'tinker-jack-and-the-tidy-wives-turkeyneck-travellers-and-miss-latrobe';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000016' WHERE \`slug\` = 'spinster-unlovable-imperialism';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000017' WHERE \`slug\` = 'black-rook-in-rainy-weather-crowing-over-hubris';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000018' WHERE \`slug\` = 'alicante-lullaby-holiday-at-holiday';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000019' WHERE \`slug\` = 'letter-to-a-purist-shaking-up-virginal-vernacular';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000020' WHERE \`slug\` = 'resolve-battling-the-invisible';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000021' WHERE \`slug\` = 'southern-sunrise-a-political-potboiler';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000022' WHERE \`slug\` = 'soliloquy-of-the-solipsist-tyranny-talking-to-itself';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000023' WHERE \`slug\` = 'miss-drake-proceeds-to-supper-discovery-in-the-insect-world';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000024' WHERE \`slug\` = 'vanity-fair-waging-war-against-the-idiot-box';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000025' WHERE \`slug\` = 'prospect-dr-death';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000026' WHERE \`slug\` = 'landowners-and-departure-there-goes-the-neighborhood';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000027' WHERE \`slug\` = 'strumpet-song-and-god-created-female-competition';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000028' WHERE \`slug\` = 'rhyme-breaking-the-golden-rule';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000029' WHERE \`slug\` = 'bucolics-the-pains-of-the-pastoral';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000030' WHERE \`slug\` = 'song-for-a-summers-day-sassoon-and-sawdust';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000031' WHERE \`slug\` = 'the-eye-mote-thats-racing';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000032' WHERE \`slug\` = 'conversation-among-the-ruins-the-furious-wreck-of-love-affairs-and-tunisia';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000033' WHERE \`slug\` = 'tale-of-a-tub-and-on-the-difficulty-of-conjuring-up-a-dryad-the-suez-in-hot-wate';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000034' WHERE \`slug\` = 'winter-landscape-with-rooks-and-firesong-tales-of-british-diver-lionel-buster-cr';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000035' WHERE \`slug\` = 'faun-hoo-are-you';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000036' WHERE \`slug\` = 'pursuit-the-black-marauder-of-imperialist-france';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000037' WHERE \`slug\` = 'ode-for-ted-a-devilish-disguise';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000038' WHERE \`slug\` = 'the-queens-complaint-check-mate';`)
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a000039' WHERE \`slug\` = 'channel-crossing-crossed-wires-or-the-first-documented-premonition';`)
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a000000' WHERE \`slug\` = 'tarot-life-lessons';`)
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a000001' WHERE \`slug\` = 'the-occult-sylvia-plath';`)
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a000002' WHERE \`slug\` = 'decoding-sylvia-plaths-lady-lazarus';`)
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a000003' WHERE \`slug\` = 'decoding-sylvia-plaths-daddy';`)
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a000004' WHERE \`slug\` = 'fixed-stars-govern-a-life';`)
  // Anything not listed above (an essay or book added in the CMS since) goes after the listed ones.
  await db.run(sql`UPDATE \`posts\` SET \`_order\` = 'a' || printf('%06d', 1000 + \`id\`) WHERE \`_order\` IS NULL OR \`slug\` NOT IN ('dialogue-between-ghost-and-priest-monologue-at-3-a-m-the-glutton-and-november-gr','street-song-double-jeopardy','spider-caught-in-willies-winning-web','the-shrike-relentless-ambition','two-sisters-of-persephone-poetry-goddesses','ella-mason-and-her-eleven-cats-cat-houses-in-the-news','crystal-gazer-a-different-kind-of-globe','history-and-a-case-for-prescience-introduction-on-short-studies-of-sylvia-plaths','the-beggars-neighboring-countries-on-hard-times','dream-with-clam-diggers-a-sinking-feeling','recantation-an-incantation-of-political-disgust','wreath-for-a-bridal-the-dysfunctional-marriage-of-nations','maudlin-the-monthly-curse','fiesta-melons-pin-up-pumpkins-and-hollywood-honeydew','the-goring-nazi-gore-and-goering','tinker-jack-and-the-tidy-wives-turkeyneck-travellers-and-miss-latrobe','spinster-unlovable-imperialism','black-rook-in-rainy-weather-crowing-over-hubris','alicante-lullaby-holiday-at-holiday','letter-to-a-purist-shaking-up-virginal-vernacular','resolve-battling-the-invisible','southern-sunrise-a-political-potboiler','soliloquy-of-the-solipsist-tyranny-talking-to-itself','miss-drake-proceeds-to-supper-discovery-in-the-insect-world','vanity-fair-waging-war-against-the-idiot-box','prospect-dr-death','landowners-and-departure-there-goes-the-neighborhood','strumpet-song-and-god-created-female-competition','rhyme-breaking-the-golden-rule','bucolics-the-pains-of-the-pastoral','song-for-a-summers-day-sassoon-and-sawdust','the-eye-mote-thats-racing','conversation-among-the-ruins-the-furious-wreck-of-love-affairs-and-tunisia','tale-of-a-tub-and-on-the-difficulty-of-conjuring-up-a-dryad-the-suez-in-hot-wate','winter-landscape-with-rooks-and-firesong-tales-of-british-diver-lionel-buster-cr','faun-hoo-are-you','pursuit-the-black-marauder-of-imperialist-france','ode-for-ted-a-devilish-disguise','the-queens-complaint-check-mate','channel-crossing-crossed-wires-or-the-first-documented-premonition');`)
  await db.run(sql`UPDATE \`books\` SET \`_order\` = 'a' || printf('%06d', 1000 + \`id\`) WHERE \`_order\` IS NULL OR \`slug\` NOT IN ('tarot-life-lessons','the-occult-sylvia-plath','decoding-sylvia-plaths-lady-lazarus','decoding-sylvia-plaths-daddy','fixed-stars-govern-a-life');`)
  await db.run(sql`UPDATE \`_posts_v\` SET \`version__order\` = (SELECT p.\`_order\` FROM \`posts\` p WHERE p.\`id\` = \`_posts_v\`.\`parent_id\`);`)
  await db.run(sql`UPDATE \`_books_v\` SET \`version__order\` = (SELECT b.\`_order\` FROM \`books\` b WHERE b.\`id\` = \`_books_v\`.\`parent_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Ordering data only; nothing to undo.
}
