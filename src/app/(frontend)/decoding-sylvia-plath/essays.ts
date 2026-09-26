import { remainingScholarshipEssays } from './remaining-essay-data'

// Migrated from juliagordonbramer.com/decoding-sylvia-plath — the archive page for her
// ongoing essay series decoding Sylvia Plath's early (pre-Ariel) poems, one per poem,
// cross-referencing each against the news and personal events of the day it was written.
// Titles, excerpts, and images are pulled verbatim/near-verbatim from the live site; full
// essay text (with footnotes) has not been migrated yet — this is the index for that.
export type ScholarshipEssay = {
  title: string
  slug: string
  excerpt: string
  image: string
  migrated?: boolean
  paragraphs?: Array<{ text: string; italic?: boolean }>
  tags?: string[]
}

export const scholarshipEssays: ScholarshipEssay[] = [
  {
    title:
      '“Dialogue Between Ghost and Priest,” “Monologue at 3 a.m.,” “The Glutton,” and “November Graveyard”: The Emotional Weight of National Guilt',
    slug: 'dialogue-between-ghost-and-priest-monologue-at-3-a-m-the-glutton-and-november-gr',
    excerpt:
      'Plath’s poem, “Dialogue Between Ghost and Priest” talks of the “black November” in the year of 1956 which severely escalated the Cold War. The character of “Father Shawn” may well be the editor of The New Yorker at the…',
    image:
      '/assets/scholarship/dialogue-between-ghost-and-priest-monologue-at-3-a-m-the-glutton-and-november-gr.png',
    migrated: true,
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
  },
  {
    title: '“Street Song”: Double Jeopardy',
    slug: 'street-song-double-jeopardy',
    excerpt:
      'Judging from poems such as “Street Song,” Plath seemed to view herself as very blessed, coming from madness intact and in love, but never forgetting her past. This is the most obvious interpretation of “Street Song.” A…',
    image: '/assets/scholarship/street-song-double-jeopardy.png',
  },
  {
    title: '“Spider”: Caught in Willie’s Winning Web',
    slug: 'spider-caught-in-willies-winning-web',
    excerpt:
      'Ted Hughes positioned “Spider” as a 1956 poem, but the evidence suggests it may have been written in 1958. In the poem, Plath references the African folklore tale of Anansi, the trickster spider. Hughes noted in The…',
    image: '/assets/scholarship/spider-caught-in-willies-winning-web.png',
    migrated: true,
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
    excerpt:
      'The Shrike bird might have metaphorically flown to the height of its popularity in 1956. President Dwight D. Eisenhower’s Air Force One was a Shrike U4-B (“The singular air”). That same year, the television program…',
    image: '/assets/scholarship/the-shrike-relentless-ambition.png',
    migrated: true,
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
    title: '“Two Sisters of Persephone”: Poetry Goddesses',
    slug: 'two-sisters-of-persephone-poetry-goddesses',
    excerpt:
      'Plath read a lot of Plato at Cambridge in 1956, and the country of Greece went through a great deal of political upheaval that year. The island of Cyprus had been under British rule but was seeking to reunite with…',
    image: '/assets/scholarship/two-sisters-of-persephone-poetry-goddesses.png',
  },
  {
    title: '“Ella Mason and Her Eleven Cats”: Cat Houses In The News',
    slug: 'ella-mason-and-her-eleven-cats-cat-houses-in-the-news',
    excerpt:
      'Plath wrote “Ella Mason and Her Eleven Cats” on June 2, 1956, per her pocket calendar. Plath spoke a bit of French, and the very near-homophone la maison translates to “the house.” This is less a poem about an animal…',
    image: '/assets/scholarship/ella-mason-and-her-eleven-cats-cat-houses-in-the-news.png',
  },
  {
    title: '“Crystal Gazer”: A Different Kind of Globe',
    slug: 'crystal-gazer-a-different-kind-of-globe',
    excerpt:
      'Revisions to Plath’s poem “Crystal Gazer” were discussed in Hughes’ October 1956 letters, but Plath’s calendar notes reveal that she wrote 24 lines (probably the first four stanzas) on June 3, 1956 and worked on it…',
    image: '/assets/scholarship/crystal-gazer-a-different-kind-of-globe.png',
  },
  {
    title:
      'History and a Case for Prescience: Introduction on Short Studies of Sylvia Plath’s 1956 Poems',
    slug: 'history-and-a-case-for-prescience-introduction-on-short-studies-of-sylvia-plaths',
    excerpt:
      '[An earlier version of this essay was first published in Plath Profiles , Volume 7, 2014 with analyses of the 1956 poems by Sylvia Plath] “[Y]ou are being sounded and unpicked, and charted and reduced to your parts.…',
    image:
      '/assets/scholarship/history-and-a-case-for-prescience-introduction-on-short-studies-of-sylvia-plaths.png',
  },
  {
    title: '“The Beggars”: Neighboring Countries on Hard Times',
    slug: 'the-beggars-neighboring-countries-on-hard-times',
    excerpt:
      '“The Beggars” is one of Plath’s poems seemingly set in Benidorm, Spain. If Plath had been reading the newspapers from home, which Aurelia might have sent, she would have seen that a new version of Faust opened at the…',
    image: '/assets/scholarship/the-beggars-neighboring-countries-on-hard-times.png',
  },
  {
    title: '“Dream with Clam-Diggers”: A Sinking Feeling',
    slug: 'dream-with-clam-diggers-a-sinking-feeling',
    excerpt:
      'Over those first six months of marriage with Hughes, Plath told her mother that she was writing new “happy” poems glorifying her love with Ted. The poems she listed were “Two Sisters of Persephone,” “Metamorphosis,”…',
    image: '/assets/scholarship/dream-with-clam-diggers-a-sinking-feeling.png',
  },
  {
    title: '“Recantation”: An Incantation of Political Disgust',
    slug: 'recantation-an-incantation-of-political-disgust',
    excerpt:
      '“Recantation” is an undated poem, but considering Britain’s stance regarding 1956’s crisis in the Suez, the French in Algeria, and the Hungarian Revolution, Sylvia Plath was angry at the United Kingdom too. In…',
    image: '/assets/scholarship/recantation-an-incantation-of-political-disgust.png',
  },
  {
    title: '“Wreath for a Bridal”: the Dysfunctional Marriage of Nations',
    slug: 'wreath-for-a-bridal-the-dysfunctional-marriage-of-nations',
    excerpt:
      'Plath’s poem “Wreath for a Bridal” was written on May 17, 1956 and is often read strictly discussing marriage and physical union. That is of course a small part of Plath’s meaning, but as with so many of her poems, it…',
    image: '/assets/scholarship/wreath-for-a-bridal-the-dysfunctional-marriage-of-nations.png',
  },
  {
    title: '“Maudlin”: The Monthly Curse',
    slug: 'maudlin-the-monthly-curse',
    excerpt:
      'Of all the work in the 1956 section of The Collected Poems , “Maudlin” may be the one closest to Plath’s autobiography. However, this poem was probably written in 195 9 . After all, Plath wrote in her journals on May…',
    image: '/assets/scholarship/maudlin-the-monthly-curse.png',
  },
  {
    title: '“Fiesta Melons”: Pin-up Pumpkins and Hollywood Honeydew',
    slug: 'fiesta-melons-pin-up-pumpkins-and-hollywood-honeydew',
    excerpt:
      'Plath loved Hollywood. Hollywood in 1956 was full of pin-up girls: Liz Taylor was the star of the moment with her movie, Giant . Marilyn Monroe starred in Bus Stop . Deborah Kerr was back with The King and I, and Jayne…',
    image: '/assets/scholarship/fiesta-melons-pin-up-pumpkins-and-hollywood-honeydew.jpg',
  },
  {
    title: '“The Goring”: Nazi Gore and Goering',
    slug: 'the-goring-nazi-gore-and-goering',
    excerpt:
      '​ Plath’s journals and calendars reveal that she attended a bullfight in Spain where she witnessed the picador gored by the bull. This of course was the first inspiration for the poem. But Plath had by now become adept…',
    image: '/assets/scholarship/the-goring-nazi-gore-and-goering.jpg',
  },
  {
    title: '“Tinker Jack and the Tidy Wives”: Turkeyneck, Travellers and Miss LaTrobe',
    slug: 'tinker-jack-and-the-tidy-wives-turkeyneck-travellers-and-miss-latrobe',
    excerpt:
      'The shallowness of plastic surgery, in Hollywood and otherwise, seems to have also bothered Plath, as we see in poems such as “Tinker Jack and the Tidy Wives,” written June 7, 1956, with the assumption that one “hag”…',
    image:
      '/assets/scholarship/tinker-jack-and-the-tidy-wives-turkeyneck-travellers-and-miss-latrobe.png',
  },
  {
    title: '“Spinster”: Unlovable Imperialism',
    slug: 'spinster-unlovable-imperialism',
    excerpt:
      'The image of the spinster was a popular one in the movies during the 1940s and ‘50s, and the character was often pictured pining over a dead soldier boyfriend whose picture was on the mantel. In 1942, Bette Davis had…',
    image: '/assets/scholarship/spinster-unlovable-imperialism.png',
  },
  {
    title: '“Black Rook in Rainy Weather”: Crowing Over Hubris',
    slug: 'black-rook-in-rainy-weather-crowing-over-hubris',
    excerpt:
      'Life Magazine photo of Britain’s Prime Minister, Anthony Eden In 1956, British Prime Minister Anthony Eden’s career had taken a dive over the Suez Crisis and his underestimation of opposition to attack by the United…',
    image: '/assets/scholarship/black-rook-in-rainy-weather-crowing-over-hubris.png',
  },
  {
    title: '“Alicante Lullaby”: Holiday at Holiday',
    slug: 'alicante-lullaby-holiday-at-holiday',
    excerpt:
      'Over her infamous Mademoiselle summer, in her single years, and later with Hughes, Plath made occasional trips to New York City night clubs, and certainly knew of, if not attended, the famous Copacabana night club.…',
    image: '/assets/scholarship/alicante-lullaby-holiday-at-holiday.png',
  },
  {
    title: '“Letter to a Purist”: Shaking Up Virginal Vernacular',
    slug: 'letter-to-a-purist-shaking-up-virginal-vernacular',
    excerpt:
      'Plath’s “Letter to a Purist” has been dated November 19, 1956 by scholar Nancy D. Hargrove. In the poem, Plath references the giant statue, Colossus of Rhodes, one of the seven wonders of the ancient world ( CP , 36).…',
    image: '/assets/scholarship/letter-to-a-purist-shaking-up-virginal-vernacular.png',
  },
  {
    title: '“Resolve”: Battling the Invisible',
    slug: 'resolve-battling-the-invisible',
    excerpt:
      'Scholar Nancy D. Hargrove dates Plath’s “Resolve” to be written in November or December of 1956. On December 19, 1956, a thick fog was the BBC News headline, causing death on the roads, railway, ship, air and postal…',
    image: '/assets/scholarship/resolve-battling-the-invisible.png',
  },
  {
    title: '“Southern Sunrise”: a Political Potboiler',
    slug: 'southern-sunrise-a-political-potboiler',
    excerpt:
      'Plath’s “Southern Sunrise,” is widely believed to be about Benidorm’s Bay in Spain. [1] However, the Benidorm region has no bay associated with an angel name. The poem “Southern Sunrise” is a better fit to “Angels’…',
    image: '/assets/scholarship/southern-sunrise-a-political-potboiler.jpg',
  },
  {
    title: '“Soliloquy of the Solipsist”: Tyranny Talking to Itself',
    slug: 'soliloquy-of-the-solipsist-tyranny-talking-to-itself',
    excerpt:
      'Given her interest in world events, Plath’s “Soliloquy of the Solipsist” appears to be her jab at Communism. This time, the military action was in Poland. In June of 1956, the Poznań Revolt had taken place in Plath’s…',
    image: '/assets/scholarship/soliloquy-of-the-solipsist-tyranny-talking-to-itself.png',
  },
  {
    title: '“Miss Drake Proceeds to Supper”: Discovery in the Insect World',
    slug: 'miss-drake-proceeds-to-supper-discovery-in-the-insect-world',
    excerpt:
      'According to her pocket calendar, Sylvia Plath wrote “Miss Drake Proceeds to Supper” on June 19, 1956, in the sun by the River Seine in Paris, France. This was three days after she and Ted Hughes were married. Just…',
    image: '/assets/scholarship/miss-drake-proceeds-to-supper-discovery-in-the-insect-world.png',
  },
  {
    title: '“Vanity Fair”: Waging War Against the Idiot Box',
    slug: 'vanity-fair-waging-war-against-the-idiot-box',
    excerpt:
      '“Vanity Fair” appears to have been written on October 28, 1956, judging from Plath’s pocket diary. “Vanity Fair” is Plath’s poke at the television sitcoms and soap operas such as The Grove Family in the UK, and As the…',
    image: '/assets/scholarship/vanity-fair-waging-war-against-the-idiot-box.png',
  },
  {
    title: '“Prospect”: Dr. Death',
    slug: 'prospect-dr-death',
    excerpt:
      '“Prospect” is an interesting short poem that seems to address the fraudster and suspected serial killer, Doctor John Bodkin Adams. Adams lived in Eastbourne, Sussex, a town of “orange-tile rooftops / and chimney pots”…',
    image: '/assets/scholarship/prospect-dr-death.png',
  },
  {
    title: '“Landowners” and “Departure”: There Goes The Neighborhood!',
    slug: 'landowners-and-departure-there-goes-the-neighborhood',
    excerpt:
      'Hughes placed Plath’s poem, “Landowners,” in the year 1956 in the Collected Poems . Plath referenced in her journals writing a poem on the subject of landowners two years later, on July 4, 1958, ( UJ , 399). It is of…',
    image: '/assets/scholarship/landowners-and-departure-there-goes-the-neighborhood.png',
  },
  {
    title: '“Strumpet Song”: …And God Created Female Competition',
    slug: 'strumpet-song-and-god-created-female-competition',
    excerpt:
      'Plath wrote in her journals that “Strumpet Song” was written shortly after meeting Hughes ( UJ, 410). It is a literary treatment of time in the metaphor of a whore ( CP , 33). Plath’s first encounter with Hughes, when…',
    image: '/assets/scholarship/strumpet-song-and-god-created-female-competition.png',
  },
  {
    title: '“Rhyme”: Breaking the Golden Rule',
    slug: 'rhyme-breaking-the-golden-rule',
    excerpt:
      'Plath’s poem “Rhyme” may be one of her least-analyzed works, and most readers interpret it as simply a commentary on the creative process. There is a good chance that Plath wrote her poem “Rhyme” around mid-May, when…',
    image: '/assets/scholarship/rhyme-breaking-the-golden-rule.png',
  },
  {
    title: '“Bucolics”: The Pains of the Pastoral',
    slug: 'bucolics-the-pains-of-the-pastoral',
    excerpt:
      'A victim of Minamata Disease. Origin of photo unknown. On the first of May 1956, “Mayday,” Plath’s beloved Grammy died, leaving her husband, “Grampy” Frank Schober, a widower. That day, BBC News announced that Japan was…',
    image: '/assets/scholarship/bucolics-the-pains-of-the-pastoral.jpg',
  },
  {
    title: '“Song for a Summer’s Day”: Sassoon and Sawdust',
    slug: 'song-for-a-summers-day-sassoon-and-sawdust',
    excerpt:
      'Plath finished “Song for a Summer’s Day” on April 20, 1956 per her pocket calendar, where it is referred to as “Through Fern & Farm and Walking.” It was first titled “Song” in an early, darker version published in…',
    image: '/assets/scholarship/song-for-a-summers-day-sassoon-and-sawdust.jpg',
  },
  {
    title: '“The Eye-mote”: “That’s racing!”',
    slug: 'the-eye-mote-thats-racing',
    excerpt:
      'Written in Paris on March 26, 1956, according to Plath’s pocket calendar, and not in 1959 where it is placed in The Collected Poems , “The Eye-mote” was written “through tears” over Richard Sassoon. Readers of Plath’s…',
    image: '/assets/scholarship/the-eye-mote-thats-racing.jpg',
  },
  {
    title: '“Conversation Among the Ruins”: The Furious Wreck of Love Affairs and Tunisia',
    slug: 'conversation-among-the-ruins-the-furious-wreck-of-love-affairs-and-tunisia',
    excerpt:
      'Plath’s “Conversation Among the Ruins,” positioned first in the Collected Poems for the year of 1956, is widely read to be a piece she wrote about the famous Georgio de Chirico painting of the same name ( CP , 21). The…',
    image:
      '/assets/scholarship/conversation-among-the-ruins-the-furious-wreck-of-love-affairs-and-tunisia.jpg',
  },
  {
    title: '“Tale of a Tub” and “On the Difficulty of Conjuring Up a Dryad”: The Suez in Hot Water',
    slug: 'tale-of-a-tub-and-on-the-difficulty-of-conjuring-up-a-dryad-the-suez-in-hot-wate',
    excerpt:
      'Photo above from Marine Insight “The Suez Canal Crisis: Events that Shaped Maritime History” http://www.marineinsight.com/marine/life-at-sea/maritime-history/the-suez-canal-crisis-events-that-shaped-maritime-history/ On…',
    image:
      '/assets/scholarship/tale-of-a-tub-and-on-the-difficulty-of-conjuring-up-a-dryad-the-suez-in-hot-wate.jpg',
  },
  {
    title:
      '“Winter Landscape, with Rooks” and “Firesong”: Tales of British Diver Lionel “Buster” Crabb',
    slug: 'winter-landscape-with-rooks-and-firesong-tales-of-british-diver-lionel-buster-cr',
    excerpt:
      '“Winter Landscape, with Rooks,” was written on February 20, 1956, per Plath’s pocket calendar. She had written it just after reading Eugene O’Neill’s plays, all full of despairing characters on the fringes of society.…',
    image:
      '/assets/scholarship/winter-landscape-with-rooks-and-firesong-tales-of-british-diver-lionel-buster-cr.jpg',
  },
  {
    title: '“Faun”: Hoo Are You?',
    slug: 'faun-hoo-are-you',
    excerpt:
      'Plath’s poem “Faun” was first called “Metamorphosis,” and is found under this title in Letters Home ( LH , 234). Her pocket calendar entry dated April 18, 1956 reads, “wrote poem re: Ted = Pan.” In her journals, Plath…',
    image: '/assets/scholarship/faun-hoo-are-you.jpg',
  },
  {
    title: '“Pursuit”: The Black Marauder of Imperialist France',
    slug: 'pursuit-the-black-marauder-of-imperialist-france',
    excerpt:
      'Political cartoon illustrating France’s imperial lust Most assume that Plath wrote the predatory poem “Pursuit” for Ted Hughes. In her journals, Plath privately acknowledged that this poem is about “the dark forces of…',
    image: '/assets/scholarship/pursuit-the-black-marauder-of-imperialist-france.jpg',
  },
  {
    title: '“Ode for Ted”: A Devilish Disguise',
    slug: 'ode-for-ted-a-devilish-disguise',
    excerpt:
      'Pan statue at the Musée du Louvre, Paris, France The poem “Ode for Ted” was originally entitled “Poem for Pan,” for the Ancient Greek god of nature and the wild mountains. According to her pocket calendar, Plath began…',
    image: '/assets/scholarship/ode-for-ted-a-devilish-disguise.jpg',
  },
  {
    title: '“The Queen’s Complaint”: Check-Mate',
    slug: 'the-queens-complaint-check-mate',
    excerpt:
      'A political cartoon mocking the British Empire. The caption read: “New Crowns for Old Ones!” By Benjamin Disraeli for Punch Magazine. Begun on April 18, 1956, and finished the next day per her pocket calendar, Plath’s…',
    image: '/assets/scholarship/the-queens-complaint-check-mate.png',
  },
  {
    title: '“Channel Crossing”: Crossed Wires, or the First Documented Premonition?',
    slug: 'channel-crossing-crossed-wires-or-the-first-documented-premonition',
    excerpt:
      'The January 7, 1957, Time Magazine’s Man of the Year was the Hungarian Freedom Fighter, a dead-ringer for Plath’s husband, Ted Hughes “Channel Crossing” was one of Plath’s first poems to turn away from the “small, coy…',
    image:
      '/assets/scholarship/channel-crossing-crossed-wires-or-the-first-documented-premonition.jpg',
  },
].map((essay) => {
  const migrated = remainingScholarshipEssays.find((candidate) => candidate.slug === essay.slug)
  return migrated ? { ...essay, ...migrated, migrated: true } : essay
})
