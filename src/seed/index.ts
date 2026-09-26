/**
 * Seeds the data we can populate without inventing facts or fabricating assets:
 *
 * - The "Scholarship" category, so `/decoding-sylvia-plath` has something to filter posts by
 *   once essays are migrated (see agency/open-questions.md, "Content migration").
 * - Redirects for the 5 confirmed top-level `.html` URLs from the live site (agency/audit.md,
 *   agency/ia.md "URL migration"). These are the only redirects backed by a fully confirmed
 *   source URL and destination — the 46 essay slugs and 33 blog post slugs are NOT seeded
 *   here because the full list was never captured (see agency/audit.md's note on the
 *   interrupted raw-content-dump), and seeding partial/guessed slugs would risk silently
 *   wrong redirects.
 * - The 3 confirmed press credentials (verbatim from agency/audit.md) as featured Press Quotes.
 * - Homepage hero + modules copy, grounded only in agency/brief.md / agency/audit.md facts —
 *   see the comments below for exactly which source backs each line.
 * - The hero portrait, uploaded from `assets/julia-gordon-bramer-profile.png` if present on
 *   disk (that folder isn't committed — this is a no-op on a machine without it).
 * - Julia's confirmed Instagram and X profiles in the Site global when no social links exist.
 * - The 5 published books, pulled from the live juliagordonbramer.com/books.html (bibliographic
 *   detail cross-checked against agency/audit.md's earlier capture of the same page). Cover
 *   images are downloaded from that same page's own uploads into `assets/books/` (committed —
 *   these are published book covers, not a client asset under NDA). The unpublished "Night
 *   Times" memoir is deliberately excluded per open-questions.md's "Books" section, which found
 *   it publicly listed as still seeking a publisher. The two books the live homepage itself
 *   calls out (Tarot Life Lessons, The Occult Sylvia Plath) are marked `featured`, which is all
 *   the homepage Book Shelf module needs to start rendering them — see the note below.
 *
 * Deliberately NOT seeded: the BioSplit module (still needs a portrait sized/cropped for that
 * layout specifically — see open-questions.md "Brand"), Events content (current tour dates
 * don't exist in this repo), Press Quotes per-book attribution (the live site doesn't tie any
 * quote to a specific title — see audit.md), and Pages like /about, /press, /writing (real copy
 * for those hasn't been drafted — `copy/` is still empty). The homepage's Event List module is
 * still seeded with no selected items on purpose — it'll "just work" once real events exist.
 *
 * Idempotent: collections are checked before creating, and the Home global is only touched if
 * its hero is still at the untouched default, so this never clobbers real edits made in the
 * admin UI.
 */
import 'dotenv/config'

import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'

import config from '@payload-config'
import { remainingScholarshipEssays } from '@/app/(frontend)/decoding-sylvia-plath/remaining-essay-data'

// Dropped in at the repo root by the user — a real studio portrait, not a placeholder.
const heroPortraitPath = path.resolve(process.cwd(), 'assets/julia-gordon-bramer-profile.png')

// agency/audit.md, "Books (`/books.html`)" — full bibliographic detail confirmed against a
// direct fetch of the live page. Descriptions are paraphrased from that page's own blurbs.
const books: Array<{
  title: string
  slug: string
  subtitle?: string
  publisher?: string
  publishYear?: number
  isbn?: string
  description: string
  coverFile: string
  retailers: Array<{ retailer: 'publisher' | 'amazon'; url: string }>
  featured?: boolean
}> = [
  {
    title: 'Tarot Life Lessons',
    slug: 'tarot-life-lessons',
    subtitle: 'Living Wisdom from the Major Arcana',
    publisher: 'Destiny Books / Inner Traditions',
    publishYear: 2023,
    isbn: '978-1-64411-817-7',
    description:
      "Real-life narratives from a professional tarot reader's journals, exploring the 22 " +
      'major arcana cards through stories drawn from more than 45 years of practice — and how ' +
      'each card can be read for guidance through difficulty and change.',
    coverFile: 'tarot-life-lessons.jpg',
    retailers: [
      { retailer: 'publisher', url: 'https://www.innertraditions.com/author/julia-gordon-bramer' },
    ],
  },
  {
    title: 'The Occult Sylvia Plath',
    slug: 'the-occult-sylvia-plath',
    subtitle: 'The Hidden Spiritual Life of the Visionary Poet',
    publisher: 'Destiny Books / Inner Traditions',
    publishYear: 2024,
    isbn: '978-1-64411-862-7',
    description:
      "A fifteen-year research project into Sylvia Plath's mysticism and occult involvement " +
      'from childhood through 1963, decoding the alchemical, Qabalistic, Hermetic, and tarot ' +
      "references in her poems against unpublished writings held in Indiana University's " +
      'archives, and the supernatural explorations Plath shared with Ted Hughes.',
    coverFile: 'occult-sylvia-plath.jpg',
    retailers: [
      { retailer: 'publisher', url: 'https://www.innertraditions.com/author/julia-gordon-bramer' },
    ],
  },
  {
    title: 'Decoding Sylvia Plath’s "Lady Lazarus"',
    slug: 'decoding-sylvia-plaths-lady-lazarus',
    subtitle: "Freedom's Feminine Fire",
    publisher: 'Magi Press',
    publishYear: 2017,
    isbn: '978-0-9991860-0-8',
    description:
      'The first installment in the Decoding Sylvia Plath series, using the Fixed Stars Govern ' +
      'a Life system to trace parallel themes through the poem — the Statue of Liberty, ' +
      "abolitionism, feminism, Emma Lazarus's poetry, Sojourner Truth's activism, and the " +
      'Egyptian Book of the Dead — for readers who want more than a surface reading.',
    coverFile: 'decoding-lady-lazarus.jpg',
    retailers: [
      {
        retailer: 'amazon',
        url: 'https://www.amazon.com/Decoding-Sylvia-Plaths-Lady-Lazarus/dp/0999186035',
      },
    ],
  },
  {
    title: 'Decoding Sylvia Plath’s "Daddy"',
    slug: 'decoding-sylvia-plaths-daddy',
    subtitle: 'Discover the Layers of Meaning Beyond the Brute',
    publisher: 'Magi Press',
    publishYear: 2017,
    isbn: '978-0-9991860-0-8',
    description:
      'The second entry in the Decoding Sylvia Plath series, applying the Fixed Stars ' +
      "methodology to uncover the poem's connections to Sigmund Freud, King Brutus, the London " +
      "Stone, Conrad's Heart of Darkness, and Joyce's Finnegans Wake — for readers who want to " +
      "understand the poem's deeper, more mystical construction.",
    coverFile: 'decoding-daddy.jpg',
    retailers: [
      {
        retailer: 'amazon',
        url: 'https://www.amazon.com/Decoding-Sylvia-Plaths-Daddy-Discover/dp/0999186000',
      },
    ],
  },
  {
    title: 'Fixed Stars Govern a Life',
    slug: 'fixed-stars-govern-a-life',
    subtitle: 'Decoding Sylvia Plath',
    publisher: 'Stephen F. Austin State University Press',
    publishYear: 2014,
    isbn: '978-1-62288-064-5',
    description:
      "The foundational text of Julia's Plath scholarship, reading Ariel through tarot and " +
      'Qabalah: Jewish imagery as Qabalah, color and chemical imagery as Jungian alchemy, and ' +
      "Plath's own concerns about civil rights and Cold War anxiety, set against the " +
      'historical, scientific, and artistic correspondences that explain her enduring appeal.',
    coverFile: 'fixed-stars-govern-a-life.jpg',
    retailers: [{ retailer: 'amazon', url: 'https://www.amazon.com/gp/product/1622880641' }],
  },
]

// Decoding Sylvia Plath essays, migrated one at a time from the live archive at
// juliagordonbramer.com/decoding-sylvia-plath — full text (paragraphs + closing attribution
// note, where present) and the tag list, both verbatim. `imageFile` names a file already sitting
// in `public/assets/scholarship/` (downloaded when the essay index on /decoding-sylvia-plath was
// built) — read from disk here rather than re-fetched, since it's the same asset. `slug` matches
// the corresponding entry in `src/app/(frontend)/decoding-sylvia-plath/essays.ts` exactly, so the
// essay index can detect once a given essay is migrated and link its card to the real post.
const essays: Array<{
  title: string
  slug: string
  imageFile: string
  imageAlt: string
  publishedAt: string
  paragraphs: Array<{ text: string; italic?: boolean }>
  tags: string[]
}> = [
  {
    title:
      '“Dialogue Between Ghost and Priest,” “Monologue at 3 a.m.,” “The Glutton,” and “November Graveyard”: The Emotional Weight of National Guilt',
    slug: 'dialogue-between-ghost-and-priest-monologue-at-3-a-m-the-glutton-and-november-gr',
    imageFile:
      'dialogue-between-ghost-and-priest-monologue-at-3-a-m-the-glutton-and-november-gr.png',
    imageAlt: 'The New Yorker’s celebrated editor, William Shawn',
    publishedAt: '2022-01-20',
    paragraphs: [
      {
        text: 'Plath’s poem, “Dialogue Between Ghost and Priest” talks of the “black November” in the year of 1956 which severely escalated the Cold War. The character of “Father Shawn” may well be the editor of The New Yorker at the time, William Shawn. As an editor, Shawn seemed to be one of the few journalists with a conscience. He insisted, for example, that an entire issue of the magazine be dedicated to the bombings of Hiroshima and Nagasaki. Writers loved William Shawn, and J.D. Salinger even dedicated his novel, Franny and Zooey, to Shawn, who had first serialized Salinger’s work in two separate stories.[1]',
      },
      {
        text: 'In her poem, “Dialogue Between Ghost and Priest,” Plath places Shawn in the position of a holy man (“Father Shawn”) speaking to a spirit who walks the earth. Shawn asks the newspaper-man’s question: “How now” and he directs him to “simply tell.” The news of the day of course was the Cold War and the related Hungarian Revolution. Meanwhile, British and French troops had moved in on the Suez Canal (“Gnaws me through” and “this sorry pass”) with Israel, against Egypt. Nikita Khrushchev threatened to rain his rockets down on London (“The day of doom”). America’s president Eisenhower believed that British imperialism was finished, that Arab nationalism was going to be lasting, and that the Suez Canal was irretrievably lost. Eisenhower was angry at Britain for occupying the canal and not informing him.',
      },
      {
        text: 'In “Dialogue Between Ghost and Priest,” Plath saw the love of territory to be “too great love / Of flawed earth-flesh,” with governments forgetting about the nearly unseen who live there. The Hungarian Revolution had temporarily paralyzed the Kremlin, “Some damned condition,” and “shriveling in torment,” until the Russian tanks came and crushed the Hungarian student protesters. Plath’s last stanza of her “Dialogue Between Ghost and Priest” reflects the national guilt of watching and doing nothing.',
      },
      {
        text: 'Plath’s poem, “November Graveyard” began on September 9, 1956 per her calendar, with the worst of this horror yet to come. At the time of her writing the poem, anti-Communist protesting had escalated and journalists exposed the Soviet’s oppression. By late October and through mid-November, thousands of freedom fighters had been massacred and many more were forced to flee, setting the scene of Plath’s poem. Plath wrote to her mother in early November that she had been depressed and almost physically sickened by the news of both Britain bombing Egypt in the Suez Crisis, and the Hungarian Revolution. America watched in shame. Eisenhower had pledged to keep out of it, for fear of starting a full-scale war with the Soviets.',
      },
      {
        text: 'Plath’s personal guilt about doing nothing during this conflict may lie in the un-restful “Monologue at 3 a.m.” written on October 3, 1956. The poem has been compared in mood and format to Louis Simpson’s “Summer Storm” (Peel, 147). Outwardly, of course, it is a poem of Plath missing Hughes. But since the end of July that year, martial law had been imposed upon Poland following an anti-Communist revolt. The poem inside the poem appears to be that Plath grieves over that almanac which displays the land of Eastern Europe in its fury and drenching blood, while she does nothing but sit mute and twitch in discomfort.',
      },
      {
        text: 'Unsurprisingly then, Plath’s poem, “The Glutton,” written on April 27, 1956, is a portrait of British Foreign Minister Anthony Eden. Eden had made a remark summarizing the Western position, to which it seems Plath and the world thought he should have “Cupped quick to mouth.” Eden said: “We do not wish to move a finger” for the Hungarians. On this same date, doubts about Eden’s future as prime minister were being expressed in the papers as his personal ratings plummeted. Plath played on the nation of Hungary’s name with “hunger-stung”; Eden’s Englishness shows in the drink of “wassail” as he enjoys his “prime parts” and rich meals. Known to be quite stylish, Eden was “So fitted” in his suits. In her pocket calendar, Plath referred to “The Glutton” as a “good, small, hard, packed poem.” Also on the day Plath wrote “The Glutton,” Nikita Khrushchev departed London with Soviet Premier Nikolai Bulganin. It had only been months before, back in February 1956, when Khrushchev had publicly made a bitter attack on his predecessor Stalin, and the world had held hope that the Soviets might ease their pressure on Hungary. In an April 26, 1956 letter to her mother, Plath wrote that she had attended the reception of the Soviet leaders and shook Bulganin’s hand. She had called him a “dear, white-bearded little man with clear blue eyes,” and “rubbed elbows” with Anthony Eden. In those times of American McCarthyism, jokes had been made that Plath would not be allowed back into the States for her Communist sympathies. Yet all that was changing as the Soviets showed their fiercer side.',
      },
      {
        text: '[1] Franny and Zooey would later be a great influence on Plath’s 1961 poem, “Tulips.” See my book, Fixed Stars Govern a Life: Decoding Sylvia Plath, volume one (2014, Stephen F. Austin State University Press) for more.',
        italic: true,
      },
    ],
    tags: [
      'Anthony Eden',
      'Anti-Communist',
      'Arab Nationalism',
      'British Foreign Minister',
      'British Foreign Minister Anthony Eden',
      'British Imperialism',
      'Cold War',
      'Communism',
      'Dialogue Between Ghost and Priest',
      'Early Poem',
      'Eastern Europe',
      'Egypt',
      'Eisenhower',
      'England',
      'Great Britain',
      'Hungarian Revolution',
      'Hungarian Student Protesters',
      'Hungary',
      'Israel',
      'Khrushchev',
      'Louis Simpson',
      'McCarthyism',
      'Monologue at 3 a.m.',
      'National Guilt',
      'New Yorker Editor William Shawn',
      'November 1956',
      'November Graveyard',
      'Plath Poem',
      'Revolt',
      'Soviet Premier Nikolai Bulganin',
      'Soviet Union',
      'Soviets',
      'Stalin',
      'Suez Canal',
      'Suez Crisis',
      'Summer Storm',
      'Sylvia Plath',
      'Ted Hughes',
      'The Glutton',
      'The Kremlin',
      'The New Yorker',
      'UK',
      'United Kingdom',
      'William Shawn',
      'WM Shawn',
    ],
  },
  {
    title: '“Spider”: Caught in Willie’s Winning Web',
    slug: 'spider-caught-in-willies-winning-web',
    imageFile: 'spider-caught-in-willies-winning-web.png',
    imageAlt: 'Willie Mays',
    publishedAt: '2022-01-20',
    paragraphs: [
      {
        text: 'Ted Hughes positioned “Spider” as a 1956 poem, but the evidence suggests it may have been written in 1958. In the poem, Plath references the African folklore tale of Anansi, the trickster spider. Hughes noted in The Collected Poems that by the end of the year 1956 she had become greatly interested in African folklore, and he cited in his book Winter Pollen the “explosive transformation that author Paul Radin’s African collection worked on the poetry of Sylvia Plath” (WP, 78).',
      },
      {
        text: 'In January 4, 1958, Plath herself wrote of reading “myths & folktales & poetry & anthropology” (UJ, 306). From this point, folklore shows up creating another level of understanding to much of her work.',
      },
      {
        text: 'While undated, the “Spider” poem’s line, “Last summer I came upon your Spanish cousin” sets the poem after Plath and Hughes’ honeymoon in Benidorm, which happened in July 1956. Plath had not been to Spain before then. In her journal on June 26, 1958, Plath wrote about “the black spider in Spain knotting ants around its rock,” and if one believes that her diary entry inspired the poem, then she wrote this poem in late June 1958 (UJ, 398), almost two years after her honeymoon.',
      },
      {
        text: 'This seems to be in conflict with a statement Plath made a month later in her journals on July 27, 1958, when she wrote about having just composed two new Benidorm poems, a subject that had been “closed” to her until then. Plath also wrote in January of 1959 of wanting to do a series of Cambridge and Benidorm poems, but this did not seem to happen (UJ, 466).',
      },
      {
        text: 'She called her new poems “deeper, more sobre, sombre (yet well colored) than any” she had done before (UJ, 410). These comments make “Spider” and her other poem, “The Goring,” likely candidates to have been written in 1958, not in 1956 where they are placed by Hughes in The Collected Poems. However, with the “Last summer” reference, it is also possible that Plath wrote “Spider” toward the end of 1956 and had simply forgotten that she wrote the poem.',
      },
      {
        text: 'The year makes no difference. Plath’s “Spider” celebrates the great baseball player Willie Mays, who in 1956 hit 36 home runs and stole 40 bases. Whether looking at 1956, 1957, or 1958, Willie Mays remained an MVP in baseball. Mays was, in Plath-speak, a “black busybody of the folktales,” right behind Jackie Robinson. Why would Plath know or care about baseball? In 1953, she had been romantically involved with a professional ballplayer for the Detroit Tigers, Myron “Mike” Lotz. Plath’s hometown of Boston is known to take baseball very seriously, and Mays played for the neighboring New York Giants, and later, the New York Mets.[1]',
      },
      {
        text: 'Plath’s “Spider” is loaded with baseball words and metaphor: Willie Mays could field (“squint from center field”), hit “As a sledge hammer,” and run the bases (“nimble filament” and “each time round”) better than almost anyone. The summer season of baseball is named in the second stanza, and Mays had first become a star playing with the Black Barons in the Negro League (Plath’s “baron”). Plath notes the “Spanish cousin” of the prior summer, and that summer of 1955 was when Joe DiMaggio, called “Dago” by teammates, was accepted into the Baseball Hall of Fame. “Dago” is a colloquialism for an Italian, Spanish, or Portuguese-speaking person. By the time of this poem, DiMaggio had already had a short marriage to Hollywood legend, Marilyn Monroe, another celebrity Plath admired.[2]',
      },
      {
        text: 'The MacGregor baseball glove Mays used in the New York Giants was called a “spider web glove,” appropriate to the poem’s name, and Plath’s “gray spool of stone” is home base. Mays outhit, outfielded, and outran everyone to the point it was nearly “Appalling to witness” […]“His next martyr to the gross cause.”',
      },
      {
        text: 'The baseball stadium is Plath’s “altar tiered” and the ants are the small players and fans, when viewed from a distance or on television. They are “a file of comers, a file of goers.” Plath sees the team players and bases as a “small stonehenge.” As the players touch base, Plath’s “caught ants waved legs in.” Mays is a “spry black deus” (god) in the machine (“Ex machine”) of baseball. In mid-1950s American professional baseball, race began to mean nothing in the face of great talent, “Nor did they seem deterred by this.”',
      },
      {
        text: '“Spider” may have first been inspired by a line of ants and a spider that Plath and Hughes observed in Benidorm, but once one is aware of Plath’s layering of meanings, this is an extremely limited interpretation (UJ, 255-256).',
      },
      {
        text: '[1] Willie Howard Mays, Jr., born 1931, is a retired American professional baseball player who spent the majority of his Major League Baseball career as a center fielder with the New York and San Francisco Giants before finishing with the New York Mets. He was elected to the Baseball Hall of Fame in 1979, his first year of eligibility.',
        italic: true,
      },
      {
        text: '[2] Sylvia Plath’s letters and journals have several references to Marilyn Monroe. See Carl Rollyson’s book, American Isis: the life and art of Sylvia Plath (2013, St. Martin’s Press) for more.',
        italic: true,
      },
    ],
    tags: [
      'African Folklore',
      'African-American',
      'American Baseball',
      'Anansi',
      'Ballplayer',
      'Baseball',
      'Baseball Hall of Fame',
      'Benidorm',
      'Black Barons',
      'Early Poems',
      'Joe DiMaggio',
      'MacGregor Baseball Glove',
      'Marilyn Monroe',
      'Mike Lotz',
      'Myron Lotz',
      'Negro League',
      'Paul Radin',
      'Plath Poems',
      'Spain',
      'Spider',
      'Spider Web Glove',
      'Sylvia Plath',
      'Ted Hughes',
      'Trickster Spider',
      'Willie Mays',
      'Winter Pollen',
    ],
  },
  {
    title: '“The Shrike”: Relentless Ambition',
    slug: 'the-shrike-relentless-ambition',
    imageFile: 'the-shrike-relentless-ambition.png',
    imageAlt: 'A scene with Mrs. Shrike from Shopping for Death by Ray Bradbury',
    publishedAt: '2022-01-20',
    paragraphs: [
      {
        text: 'The Shrike bird might have metaphorically flown to the height of its popularity in 1956. President Dwight D. Eisenhower’s Air Force One was a Shrike U4-B (“The singular air”). That same year, the television program Alfred Hitchcock Presents aired a show called, “Shopping for Death,” written by Ray Bradbury. It featured two salesman trying to console an aggressive, hostile woman named Mrs. Shrike. Plath at least occasionally watched Hitchcock, as she alluded to him in some 1955 letters.',
      },
      {
        text: 'In her poem, “The Shrike,” written on July 3, 1956, Plath seems to compare herself to this aggressive predatory bird of Africa and Eurasia. There were other influences at work in the layers of meaning for this poem, however. In the news, the Imperialist British and French troops (“Such royal dreams”) had withdrawn their troops from the Suez (“her flown mate / Escaped”).',
      },
      {
        text: 'Plath addresses the hunger in Africa “With her blank brown eyes starved wide” and the emaciated bodies “With taloned fingers, / Shaking in her skull’s cage” and “so hungered.”',
      },
      {
        text: 'There was also a popular play running at that time called “The Shrike,” by Joseph Kramm. It was set in a mental ward and featured a man who had unsuccessfully tried to commit suicide in the same way that Plath had attempted to when she was twenty, by swallowing a bottle of pills. His bitter and manipulative wife drove him insane with her relentless ambition for him, and Plath may have seen a connection between his attitude and the British over Northern Africa and the Suez especially.',
      },
      {
        text: 'Because the fictional Mrs. Shrike had won over the doctors, the man comes to be under his wife’s control completely. Did Plath contemplate that her ambition for her husband (“Such royal dreams beckon this man”) and jealousies (“While she, envious bride”) may have been too great?',
      },
    ],
    tags: [
      'Africa',
      'Alfred Hitchcock',
      'Alfred Hitchcock Presents',
      'British Imperialism',
      'Early Poem',
      'French Imperialism',
      'Joseph Kramm',
      'Plath Poem',
      'Shopping for Death',
      'Suez',
      'Suez Canal',
      'Suez Crisis',
      'Sylvia Plath',
      'The Shrike',
      'The Shrike Play',
    ],
  },
  {
    title: '“Street Song”: Double Jeopardy',
    slug: 'street-song-double-jeopardy',
    imageFile: 'street-song-double-jeopardy.png',
    imageAlt: 'Emmett Till in the 1956 newspaper headlines',
    publishedAt: '2022-01-20',
    paragraphs: [
      {
        text:
          'Judging from poems such as "Street Song," Plath seemed to view herself as very ' +
          'blessed, coming from madness intact and in love, but never forgetting her past. ' +
          'This is the most obvious interpretation of "Street Song." A closer look at the ' +
          'poem, written on October 4, 1956, shows that something is seriously wrong with ' +
          'the world and that this person should not be let out free. The miracle of ' +
          'freedom is a "mad" one, and this freed person walks among the "common rout," ' +
          '"rout" meaning a disorderly mob or assembly intent on committing an illegal act. ' +
          'The poem’s subject "reeks of the butcher’s cleaver," and has no "heart ' +
          'and guts" any longer, "bloodied" and suggesting that the person is a killer.',
      },
      {
        text:
          'When Plath wrote "Street Song," the trial had recently finished over the murder ' +
          'of the 14-year-old African-American boy, Emmett Till. Till allegedly flirted ' +
          'with a married 21-year-old woman. The woman told her husband, and he and his ' +
          'brother kidnapped Till, beat him and gouged out one of his eyes, and then shot ' +
          'him in the head. They dumped the boy’s body in the Tallahatchie River, ' +
          'weighed down with a 70-pound cotton gin fan and barbed wire. Law enforcement and ' +
          'media initially decried the violence against Till, but when the state of ' +
          'Mississippi was nationally criticized, the Mississippians eventually began to ' +
          'defend the killers and their state’s reputation. Plath’s ' +
          '"white-jacketed assassins" detail suggests the Ku Klux Klan.',
      },
      {
        text:
          'The September 1955 trial attracted worldwide press attention. After five days, ' +
          'the killers were acquitted of kidnapping and murder, and the world was appalled ' +
          'with headlines of shock as far away as France and Portugal. On January 24, 1956, ' +
          'in a LOOK magazine interview, the killers Bryant and Milam admitted to killing ' +
          'him but were protected against conviction by double jeopardy.',
      },
      {
        text:
          'In the literary world, Langston Hughes dedicated a poem known as ' +
          '"Mississippi—1955" to Emmett Till in October of 1955 which was reprinted ' +
          'across the country. William Faulkner wrote two essays on Till, one published in ' +
          'Harper’s in June 1956 challenging segregation. The event would inspire many ' +
          'other artistic works and became a pivotal moment in the African-American Civil ' +
          'Rights Movement. Later in 1958, Plath expressed sympathy toward the ' +
          'African-American’s plight, and disgust toward bigotry after the news story ' +
          'that a Black man named Jimmy Wilson got the death sentence for stealing $1.95 ' +
          '(UJ, 419).',
      },
      {
        text:
          'Some of the interpretation of "Street Song" has been excerpted from a ' +
          'presentation given in February 2014 at the University of Wisconsin-Milwaukee, ' +
          'for the Racial Formation/Racial Awareness Graduate Conference.',
        italic: true,
      },
    ],
    tags: [
      'Acquittal',
      'African-American',
      'African-American Civil Rights Movement',
      'Assassins',
      'Black',
      'Double Jeopardy',
      'Early Poem',
      'Emmett Till',
      'Emmett Till Trial',
      'Injustice',
      'Jimmy Wilson',
      'Ku Klux Klan',
      'Langston Hughes',
      'Mississippi',
      'Plath Poem',
      'Racism',
      'Segregation',
      'State of Mississippi',
      'Street Song',
      'Sylvia Plath',
      'William Faulkner',
    ],
  },
]

const topLevelRedirects: Array<{ from: string; to: string }> = [
  { from: '/tarot.html', to: '/tarot' },
  { from: '/books.html', to: '/books' },
  { from: '/blog.html', to: '/blog' },
  { from: '/decoding-sylvia-plath.html', to: '/decoding-sylvia-plath' },
  // The route lived at /scholarship during development before settling on this URL.
  { from: '/scholarship', to: '/decoding-sylvia-plath' },
]

// agency/audit.md, "Homepage (`/`)" — press credentials, quoted verbatim from the live site.
const pressQuotes: Array<{ quote: string; source: string; context?: string }> = [
  { quote: "St. Louis' Top Ten Psychics", source: 'Psychic St. Louis' },
  { quote: "St. Louis' Number One Fortune-Teller", source: 'CBS Radio' },
  { quote: "St. Louis' Best Local Poet", source: 'Riverfront Times', context: '2013' },
]

const socialLinks = [
  { platform: 'instagram' as const, url: 'https://www.instagram.com/jgordonbramer/' },
  { platform: 'x' as const, url: 'https://x.com/JGordonBramer' },
]

// format is lexical's text-node bitmask: bold=1, italic=2 — used for the closing
// attribution/source notes on essays, which run italic in the original posts.
const lexicalParagraph = (text: string, options: { italic?: boolean } = {}) => ({
  type: 'paragraph',
  children: [
    {
      type: 'text',
      detail: 0,
      format: options.italic ? 2 : 0,
      mode: 'normal',
      style: '',
      text,
      version: 1,
    },
  ],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const lexicalHeading = (tag: 'h2' | 'h3', text: string) => ({
  type: 'heading',
  tag,
  children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const lexicalState = (
  children: Array<{ type: string; version: number; [k: string]: unknown }>,
) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding "Scholarship" category…')
  const existingCategory = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: 'scholarship' } },
  })

  if (existingCategory.docs.length === 0) {
    await payload.create({
      collection: 'categories',
      data: { title: 'Scholarship', slug: 'scholarship' },
    })
    payload.logger.info('Created "Scholarship" category.')
  } else {
    payload.logger.info('"Scholarship" category already exists, skipping.')
  }

  payload.logger.info('Seeding top-level redirects…')
  for (const redirect of topLevelRedirects) {
    const existing = await payload.find({
      collection: 'redirects',
      limit: 1,
      where: { from: { equals: redirect.from } },
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Redirect ${redirect.from} already exists, skipping.`)
      continue
    }

    await payload.create({
      collection: 'redirects',
      context: { disableRevalidate: true },
      data: {
        from: redirect.from,
        to: { type: 'custom', url: redirect.to },
      },
    })
    payload.logger.info(`Created redirect ${redirect.from} -> ${redirect.to}`)
  }

  payload.logger.info('Seeding press quotes…')
  for (const pq of pressQuotes) {
    const existing = await payload.find({
      collection: 'press-quotes',
      limit: 1,
      where: { and: [{ quote: { equals: pq.quote } }, { source: { equals: pq.source } }] },
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Press quote "${pq.quote}" already exists, skipping.`)
      continue
    }

    await payload.create({
      collection: 'press-quotes',
      data: {
        quote: pq.quote,
        source: pq.source,
        context: pq.context,
        featured: true,
      },
    })
    payload.logger.info(`Created press quote "${pq.quote}" — ${pq.source}`)
  }

  payload.logger.info('Seeding books…')
  const booksDir = path.resolve(process.cwd(), 'assets/books')
  for (const book of books) {
    const existing = await payload.find({
      collection: 'books',
      limit: 1,
      where: { title: { equals: book.title } },
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Book "${book.title}" already exists, skipping.`)
      continue
    }

    const coverPath = path.join(booksDir, book.coverFile)
    if (!fs.existsSync(coverPath)) {
      payload.logger.info(`No cover at ${coverPath} — skipping "${book.title}".`)
      continue
    }

    const fileBuffer = fs.readFileSync(coverPath)
    const cover = await payload.create({
      collection: 'media',
      data: { alt: `Cover of "${book.title}"` },
      file: {
        data: fileBuffer,
        mimetype: 'image/jpeg',
        name: book.coverFile,
        size: fileBuffer.length,
      },
    })

    await payload.create({
      collection: 'books',
      context: { disableRevalidate: true },
      draft: false,
      data: {
        _status: 'published',
        title: book.title,
        slug: book.slug,
        subtitle: book.subtitle,
        coverImage: cover.id,
        publisher: book.publisher,
        publishYear: book.publishYear,
        isbn: book.isbn,
        description: lexicalState([lexicalParagraph(book.description)]),
        retailers: book.retailers,
        featured: book.featured || false,
        publishedAt: new Date().toISOString(),
      },
    })
    payload.logger.info(`Created book "${book.title}".`)
  }

  payload.logger.info('Seeding Decoding Sylvia Plath essays…')
  const scholarshipCategoryForEssays = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: 'scholarship' } },
  })
  const scholarshipCategoryId = scholarshipCategoryForEssays.docs[0]?.id
  const essayImagesDir = path.resolve(process.cwd(), 'public/assets/scholarship')

  if (!scholarshipCategoryId) {
    payload.logger.info('No "Scholarship" category found — skipping essay seed.')
  } else {
    const allEssays = [
      ...essays,
      ...remainingScholarshipEssays.map(({ imageFile, imageAlt, publishedAt, ...essay }) => ({
        ...essay,
        imageFile,
        imageAlt,
        publishedAt,
        paragraphs: essay.paragraphs || [],
        tags: essay.tags || [],
      })),
    ]

    for (const essay of allEssays) {
      const existingEssay = await payload.find({
        collection: 'posts',
        limit: 1,
        where: { slug: { equals: essay.slug } },
      })

      if (existingEssay.docs.length > 0) {
        payload.logger.info(`Essay "${essay.title}" already exists, skipping.`)
        continue
      }

      const imagePath = path.join(essayImagesDir, essay.imageFile)
      if (!fs.existsSync(imagePath)) {
        payload.logger.info(`No image at ${imagePath} — skipping "${essay.title}".`)
        continue
      }

      const fileBuffer = fs.readFileSync(imagePath)
      const image = await payload.create({
        collection: 'media',
        data: { alt: essay.imageAlt },
        file: {
          data: fileBuffer,
          mimetype: essay.imageFile.endsWith('.jpg') ? 'image/jpeg' : 'image/png',
          name: essay.imageFile,
          size: fileBuffer.length,
        },
      })

      const tagsParagraph = lexicalParagraph(`Topics: ${essay.tags.join(', ')}`, {
        italic: true,
      })

      await payload.create({
        collection: 'posts',
        context: { disableRevalidate: true },
        draft: false,
        data: {
          _status: 'published',
          title: essay.title,
          slug: essay.slug,
          heroImage: image.id,
          categories: [scholarshipCategoryId],
          content: lexicalState([
            ...essay.paragraphs.map((p) => lexicalParagraph(p.text, { italic: p.italic })),
            tagsParagraph,
          ]),
          meta: { image: image.id },
          publishedAt: new Date(essay.publishedAt).toISOString(),
        },
      })
      payload.logger.info(`Created essay "${essay.title}".`)
    }
  }

  payload.logger.info('Seeding homepage content…')
  const home = await payload.findGlobal({ slug: 'home' })

  if (home.heroSubheading) {
    payload.logger.info('Home global already has a hero subheading — leaving it as-is.')
  } else {
    await payload.updateGlobal({
      slug: 'home',
      context: { disableRevalidate: true },
      data: {
        heroSubheading: 'Professional tarot card reader and author',
        // agency/brief.md: 45+ years of tarot practice (per her own book description),
        // the 2013 Riverfront Times "Best Local Poet" award, and the tarot-and-Qabalah
        // reading of Plath's Ariel cross-referenced against Plath's own calendars,
        // letters, and journals. No claim here that isn't in the brief.
        heroRichText: lexicalState([
          lexicalParagraph(
            "A tarot reader for over 45 years, an award-winning poet, and the scholar behind a tarot-and-Qabalah reading of Sylvia Plath's Ariel — cross-referenced against Plath's own calendars, letters, and journals.",
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Book a Reading',
              appearance: 'default',
            },
          },
        ],
        modules: [
          {
            blockType: 'bookShelf',
            heading: 'Featured Books',
          },
          {
            blockType: 'pressStrip',
            heading: 'In the Press',
          },
          {
            blockType: 'eventList',
            heading: 'Upcoming Events',
            mode: 'upcoming',
            limit: 4,
          },
          {
            blockType: 'pullQuote',
            // agency/audit.md: quoted verbatim from the live Decoding Sylvia Plath page.
            quote: 'A belief in the occult is not necessary to understand these interpretations.',
            attribution: 'Julia Gordon-Bramer, on her interpretive method',
          },
          {
            blockType: 'cta',
            richText: lexicalState([lexicalHeading('h3', 'Read the Sylvia Plath scholarship')]),
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/decoding-sylvia-plath',
                  label: 'Explore Decoding Sylvia Plath',
                  appearance: 'default',
                },
              },
            ],
          },
          {
            blockType: 'cta',
            richText: lexicalState([
              lexicalHeading('h3', 'Book a reading, or invite Julia to speak'),
            ]),
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/contact',
                  label: 'Book a Reading',
                  appearance: 'default',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/contact',
                  label: 'Invite Julia to Speak',
                  appearance: 'outline',
                },
              },
            ],
          },
        ],
      },
    })
    payload.logger.info('Updated homepage hero and modules.')
  }

  payload.logger.info('Seeding hero portrait…')
  const homeForImage = await payload.findGlobal({ slug: 'home' })

  if (homeForImage.heroImage) {
    payload.logger.info('Home global already has a hero image — leaving it as-is.')
  } else if (!fs.existsSync(heroPortraitPath)) {
    payload.logger.info(`No file at ${heroPortraitPath} — skipping hero portrait seed.`)
  } else {
    const fileBuffer = fs.readFileSync(heroPortraitPath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: 'Portrait of Julia Gordon-Bramer' },
      file: {
        data: fileBuffer,
        mimetype: 'image/png',
        name: 'julia-gordon-bramer-profile.png',
        size: fileBuffer.length,
      },
    })

    await payload.updateGlobal({
      slug: 'home',
      context: { disableRevalidate: true },
      data: { heroImage: media.id },
    })
    payload.logger.info('Uploaded hero portrait and set it on the homepage.')
  }

  payload.logger.info('Seeding site nav…')
  const site = await payload.findGlobal({ slug: 'site' })

  const siteData: Record<string, unknown> = {}

  if (!site.navItems || site.navItems.length === 0) {
    // Not currently read by the header — HeaderClient renders its own hardcoded
    // `headerNavItems` array (see src/globals/Site/Header/Component.client.tsx) rather than
    // this field. Kept in sync anyway so it's not misleading if the header is ever wired back
    // up to read from here.
    siteData.navItems = [
      { link: { type: 'custom', url: '/', label: 'HOME' } },
      { link: { type: 'custom', url: '/tarot', label: 'TAROT' } },
      { link: { type: 'custom', url: '/books', label: 'BOOKS' } },
      {
        link: {
          type: 'custom',
          url: '/decoding-sylvia-plath',
          label: 'DECODING SYLVIA PLATH',
        },
      },
      { link: { type: 'custom', url: '/contact', label: 'CONTACT' } },
    ]
    siteData.bookingUrl = site.bookingUrl || '/contact'
    payload.logger.info('Prepared main nav.')
  } else {
    payload.logger.info('Site global already has nav items — leaving them as-is.')
  }

  if (!site.socials || site.socials.length === 0) {
    siteData.socials = socialLinks
    payload.logger.info('Prepared social links.')
  } else {
    payload.logger.info('Site global already has social links — leaving them as-is.')
  }

  if (Object.keys(siteData).length > 0) {
    await payload.updateGlobal({
      slug: 'site',
      context: { disableRevalidate: true },
      data: siteData,
    })
    payload.logger.info('Updated site settings.')
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
