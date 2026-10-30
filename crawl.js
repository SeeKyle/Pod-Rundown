/* Crypt Crawl — side-scrolling auto-battler for Pod Rundown.
   Engine (pure logic, runs headless in node for balance sims) + renderer + UI.
   Content lives in the CFG tables so stages, biomes, enemies, bosses, items and abilities can be added as rows. */
(function(){
'use strict';
const DATA={"heroes":[{"key":"grim","deck":"The Grim Throne","icon":"🏴‍☠️","owner":"Kyle","cmdr":"Kenrith, the Returned King","name":"The Bone Monarch","cls":"melee","duo":false,"blurb":"A crowned grave-king who hauls a greatsword out of the tomb.","stats":{"mana":10,"cards":6,"consistency":10,"threats":10,"clock":6,"reach":10,"answers":7,"staying":9,"control":7},"spells":[{"card":"Ghalta and Mavren","arch":"summon","name":"Call Behemoths"},{"card":"Galactus, Devourer of Worlds","arch":"smite","name":"Grave Smite"},{"card":"Prime Speaker Zegana","arch":"pump","name":"Grave Fury"},{"card":"Zacama, Primal Calamity","arch":"bolt","name":"Grave Lance"},{"card":"Yidaro, Wandering Monster","arch":"insight","name":"Grave Insight"},{"card":"Indominus Rex, Alpha","arch":"regen","name":"Blessing of the Throne"},{"card":"The Coming of Galactus","arch":"drain","name":"Grave Siphon"},{"card":"Zetalpa, Primal Dawn","arch":"aegis","name":"Aegis of the Throne"}],"items":[{"card":"Throne of the Grim Captain // The Grim Captain","arch":"armor"},{"card":"Altar of the Wretched // Wretched Bonemass","arch":"blade"},{"card":"Sledge-Class Seedship","arch":"charm"},{"card":"Monster Manual // Zoological Study","arch":"charm"},{"card":"Maskwood Nexus","arch":"charm"}],"lands":36},{"key":"vile","deck":"A Vile Smashing","icon":"🧪","owner":"Kyle","cmdr":"Ishai, Ojutai Dragonspeaker + Vial Smasher the Fierce","name":"Hex & Smash","cls":"caster","duo":true,"blurb":"A hooded owl hexer and a goblin brute with a spiked maul.","stats":{"mana":8,"cards":11,"consistency":12,"threats":4,"clock":6,"reach":10,"answers":7,"staying":5,"control":7},"spells":[{"card":"Kefka, Dancing Mad","arch":"aegis","name":"Hex Ward"},{"card":"Naktamun Lorespinner // Wheel of Fortune","arch":"insight","name":"Hex Insight"},{"card":"Seizan, Perverter of Truth","arch":"drain","name":"Leech of Ruin"},{"card":"The Haunt of Hightower","arch":"regen","name":"Hex Mending"},{"card":"Nekusar, the Mindrazer","arch":"bolt","name":"Hex Bolt"},{"card":"Blood for the Blood God!","arch":"nova","name":"Hex Burst"},{"card":"Sami, Wildcat Captain","arch":"pump","name":"Hex Fury"},{"card":"Voracious Fell Beast","arch":"summon","name":"Call Imps"}],"items":[{"card":"Matzalantli, the Great Door // The Core","arch":"relic"},{"card":"Mask of Griselbrand","arch":"blade"},{"card":"World Map","arch":"charm"},{"card":"Entropic Battlecruiser","arch":"blade"},{"card":"Chromatic Lantern","arch":"relic"}],"lands":35},{"key":"felothar","deck":"Felothar","icon":"🧱","owner":"Kyle","cmdr":"Felothar the Steadfast","name":"The Bulwark","cls":"tank","duo":false,"blurb":"A walking stone rampart with a tower shield.","stats":{"mana":7,"cards":7,"consistency":6,"threats":7,"clock":2,"reach":7,"answers":9,"staying":15,"control":11},"spells":[{"card":"Betor, Kin to All","arch":"drain","name":"Drain Life"},{"card":"Baldin, Century Herdmaster","arch":"pump","name":"War Chant"},{"card":"Teyo, Geometric Tactician","arch":"summon","name":"Summon Wardens"},{"card":"Nethroi, Apex of Death","arch":"regen","name":"Blessing of the Wall"},{"card":"Canopy Gargantuan","arch":"aegis","name":"Stone Barrier"},{"card":"Ayli, Eternal Pilgrim","arch":"smite","name":"Judgment of the Wall"},{"card":"Flumph","arch":"insight","name":"Stone Insight"},{"card":"Overgrown Battlement","arch":"haste","name":"Quicken"}],"items":[{"card":"Captain America's Shield","arch":"armor"},{"card":"Sol Ring","arch":"relic"}],"lands":36},{"key":"thing","deck":"Truly Fantastic","icon":"🪨","owner":"Kyle","cmdr":"The Thing","name":"Geode Golem","cls":"caster","duo":false,"blurb":"A cracked crystal brute that flings spell shards.","stats":{"mana":11,"cards":8,"consistency":7,"threats":7,"clock":8,"reach":5,"answers":8,"staying":6,"control":7},"spells":[{"card":"Crystal, Inhuman Princess","arch":"nova","name":"Seismic Slam"},{"card":"Bruce Banner // The Incredible Hulk","arch":"pump","name":"Battle Cry"},{"card":"The Unagi of Kyoshi Island","arch":"aegis","name":"Aegis of the Rift"},{"card":"Recurring Insight","arch":"insight","name":"Scholar's Eye"},{"card":"Human Torch","arch":"bolt","name":"Arcane Missile"},{"card":"Invisible Woman","arch":"summon","name":"Rally the Elementals"},{"card":"Akroma's Will","arch":"regen","name":"Rejuvenate"},{"card":"Ultros, Obnoxious Octopus","arch":"freeze","name":"Deep Freeze"}],"items":[{"card":"Chromatic Lantern","arch":"relic"},{"card":"Sol Ring","arch":"relic"},{"card":"Arcane Signet","arch":"relic"},{"card":"Talisman of Creativity","arch":"relic"},{"card":"Izzet Signet","arch":"relic"}],"lands":36},{"key":"kykar","deck":"Kykar, Zada & Feather","icon":"🪶","owner":"Cheez","cmdr":"Kykar, Wind's Fury","name":"Gale Magus","cls":"caster","duo":false,"blurb":"A storm-feathered wizard trailed by spirit wisps.","stats":{"mana":6,"cards":6,"consistency":10,"threats":7,"clock":8,"reach":11,"answers":5,"staying":8,"control":6},"spells":[{"card":"Kitsa, Otterball Elite","arch":"pump","name":"Storm Fury"},{"card":"God-Eternal Kefnet","arch":"insight","name":"Storm Insight"},{"card":"Sorcerer Class","arch":"nova","name":"Storm Burst"},{"card":"Talrand, Sky Summoner","arch":"summon","name":"Rally the Spirits"},{"card":"Firemind's Research","arch":"bolt","name":"Storm Missile"},{"card":"Unbreakable Formation","arch":"aegis","name":"Aegis of the Gale"},{"card":"Essence Capture","arch":"counter","name":"Storm Rebuke"},{"card":"Balmor, Battlemage Captain","arch":"pump","name":"Battle Cry"}],"items":[{"card":"Sol Ring","arch":"relic"},{"card":"Swiftfoot Boots","arch":"armor"},{"card":"River Song's Diary","arch":"charm"},{"card":"Commander's Sphere","arch":"relic"},{"card":"Azorius Locket","arch":"relic"}],"lands":33},{"key":"depala","deck":"Tame Depala","icon":"⚒️","owner":"Kyle","cmdr":"Depala, Pilot Exemplar","name":"Goggles Ironbeard","cls":"melee","duo":false,"blurb":"A dwarf pilot with a rocket hammer and too much confidence.","stats":{"mana":4,"cards":3,"consistency":11,"threats":9,"clock":7,"reach":6,"answers":8,"staying":11,"control":8},"spells":[{"card":"Kíli the Resourceful","arch":"insight","name":"Forge Insight"},{"card":"Magda, Brazen Outlaw","arch":"summon","name":"Rally the Shieldbrothers"},{"card":"Bruenor Battlehammer","arch":"pump","name":"Forge Fury"},{"card":"Balin, Loremaster","arch":"nova","name":"Shockwave of the Anvil"},{"card":"Hammers of Moradin","arch":"freeze","name":"Glacial Grip"},{"card":"Gimli, Counter of Kills","arch":"bolt","name":"Forge Lance"},{"card":"Thorin Oakenshield","arch":"aegis","name":"Forge Barrier"},{"card":"Dáin's Company","arch":"regen","name":"Blessing of the Anvil"}],"items":[{"card":"Orcrist, Goblin-cleaver","arch":"blade"},{"card":"The Arkenstone // Seek the Heart","arch":"charm"},{"card":"Necron Monolith","arch":"armor"},{"card":"Colossal Plow","arch":"relic"},{"card":"Skysovereign, Consul Flagship","arch":"charm"}],"lands":35},{"key":"kotis","deck":"Armed Robbery","icon":"🐍","owner":"Cheez","cmdr":"Kotis, the Fangkeeper","name":"Fang Thief","cls":"melee","duo":false,"blurb":"A masked serpent rogue with twin stolen daggers.","stats":{"mana":7,"cards":5,"consistency":8,"threats":6,"clock":11,"reach":9,"answers":6,"staying":6,"control":7},"spells":[{"card":"Otrimi, the Ever-Playful","arch":"bolt","name":"Venom Missile"},{"card":"Tasha, the Witch Queen","arch":"summon","name":"Summon Serpents"},{"card":"Felix Five-Boots","arch":"aegis","name":"Venom Barrier"},{"card":"The Thirteenth Doctor","arch":"pump","name":"Venom Fury"},{"card":"Growth Spiral","arch":"insight","name":"Foresight"},{"card":"Dirge Bat","arch":"smite","name":"Venom Strike"},{"card":"Cultivate","arch":"haste","name":"Adrenaline"},{"card":"Counterspell","arch":"counter","name":"Venom Rebuke"}],"items":[{"card":"Sword of the Animist","arch":"blade"},{"card":"Security Bypass","arch":"charm"},{"card":"Commander's Sphere","arch":"relic"},{"card":"Blackblade Reforged","arch":"blade"},{"card":"Quietus Spike","arch":"blade"}],"lands":36},{"key":"dragons","deck":"Double Dragons","icon":"🐲","owner":"Cheez","cmdr":"Miirym, Sentinel Wyrm","name":"Twinscale","cls":"ranged","duo":false,"blurb":"A two-headed wyrmling; one head breathes fire, one breathes frost.","stats":{"mana":9,"cards":3,"consistency":8,"threats":13,"clock":7,"reach":11,"answers":7,"staying":2,"control":6},"spells":[{"card":"Dragonhawk, Fate's Tempest","arch":"nova","name":"Shockwave of Scales"},{"card":"Lathliss, Dragon Queen","arch":"summon","name":"Rally the Whelps"},{"card":"Intet, the Dreamer","arch":"bolt","name":"Dragon Missile"},{"card":"Atarka, World Render","arch":"pump","name":"Dragon Fury"},{"card":"Kairi, the Swirling Sky","arch":"aegis","name":"Aegis of Scales"},{"card":"Earthquake Dragon","arch":"devour","name":"Feast"},{"card":"Korlessa, Scale Singer","arch":"insight","name":"Foresight"},{"card":"Savage Ventmaw","arch":"haste","name":"Adrenaline"}],"items":[{"card":"Orb of Dragonkind","arch":"relic"},{"card":"Swiftfoot Boots","arch":"armor"},{"card":"Dragon's Hoard","arch":"relic"},{"card":"Chromatic Lantern","arch":"relic"},{"card":"Dragonstorm Globe","arch":"relic"}],"lands":35},{"key":"mathas","deck":"Life Swappin' Bounty Poppin'","icon":"💰","owner":"Kyle","cmdr":"Mathas, Fiend Seeker","name":"Bounty Fiend","cls":"ranged","duo":false,"blurb":"A horned bounty hunter with a soul crossbow.","stats":{"mana":7,"cards":11,"consistency":5,"threats":2,"clock":15,"reach":2,"answers":11,"staying":1,"control":13},"spells":[{"card":"Seizan, Perverter of Truth","arch":"drain","name":"Drain Life"},{"card":"Gix, Yawgmoth Praetor","arch":"bolt","name":"Infernal Missile"},{"card":"K'rrik, Son of Yawgmoth","arch":"regen","name":"Infernal Mending"},{"card":"Shay Cormac","arch":"aegis","name":"Aegis of the Bounty"},{"card":"Profane Transfusion","arch":"summon","name":"Call Imps"},{"card":"Peer into the Abyss","arch":"insight","name":"Infernal Insight"},{"card":"Bitter Triumph","arch":"smite","name":"Infernal Strike"},{"card":"Knight of Dusk's Shadow","arch":"pump","name":"War Chant"}],"items":[{"card":"Bounty Board","arch":"relic"},{"card":"Soul Conduit","arch":"charm"},{"card":"Cursed Recording","arch":"relic"},{"card":"Sol Ring","arch":"relic"},{"card":"Arcane Signet","arch":"relic"}],"lands":35},{"key":"turtle","deck":"Turtle Power","icon":"🐢","owner":"Cheez","cmdr":"Michelangelo, the Heart + Leonardo, the Balance","name":"Shell Brothers","cls":"melee","duo":true,"blurb":"Two tortoise knights: a shield-bearer and a spear-hand.","stats":{"mana":10,"cards":4,"consistency":4,"threats":11,"clock":4,"reach":5,"answers":8,"staying":10,"control":5},"spells":[{"card":"Jetmir, Nexus of Revels","arch":"pump","name":"War Chant"},{"card":"Hazel of the Rootbloom","arch":"summon","name":"Call Hatchlings"},{"card":"Roxanne, Starfall Savant","arch":"bolt","name":"Shell Lance"},{"card":"Jaheira, Friend of the Forest","arch":"haste","name":"Quicken"},{"card":"Kibo, Uktabi Prince","arch":"regen","name":"Blessing of the Brotherhood"},{"card":"White Sun's Twilight","arch":"nova","name":"Shell Nova"},{"card":"Junk Winder","arch":"freeze","name":"Deep Freeze"},{"card":"Lessons from Life","arch":"insight","name":"Scholar's Eye"}],"items":[{"card":"Foot Chopper","arch":"blade"},{"card":"Chromatic Lantern","arch":"relic"},{"card":"Level Up","arch":"charm"},{"card":"Skullclamp","arch":"blade"},{"card":"Coin of Mastery","arch":"relic"}],"lands":39},{"key":"marina","deck":"House on Haunted Hill","icon":"👻","owner":"Kyle","cmdr":"Marina Vendrell","name":"Lantern Witch","cls":"caster","duo":false,"blurb":"A witch whose lantern keeps a captive ghost.","stats":{"mana":11,"cards":8,"consistency":9,"threats":5,"clock":3,"reach":2,"answers":7,"staying":5,"control":11},"spells":[{"card":"Bello, Bard of the Brambles","arch":"bolt","name":"Spectral Lance"},{"card":"Unholy Annex // Ritual Chamber","arch":"drain","name":"Spectral Siphon"},{"card":"Lynde, Cheerful Tormentor","arch":"insight","name":"Spectral Insight"},{"card":"Smoky Lounge // Misty Salon","arch":"summon","name":"Summon Phantoms"},{"card":"Moldering Gym // Weight Room","arch":"pump","name":"Spectral Fury"},{"card":"Abuelo, Ancestral Echo","arch":"aegis","name":"Spectral Ward"},{"card":"Meat Locker // Drowned Diner","arch":"freeze","name":"Glacial Grip"},{"card":"Prismatic Undercurrents","arch":"haste","name":"Spectral Haste"}],"items":[{"card":"Chromatic Lantern","arch":"relic"},{"card":"Conjurer's Closet","arch":"charm"},{"card":"Haunted Screen","arch":"relic"},{"card":"Freed from the Real","arch":"relic"}],"lands":37},{"key":"korvold","deck":"Korvold Eats Everything","icon":"🐉","owner":"Cheez","cmdr":"Korvold, Fae-Cursed King","name":"Gorge King","cls":"melee","duo":false,"blurb":"A winged glutton-drake that eats what it kills.","stats":{"mana":10,"cards":3,"consistency":8,"threats":3,"clock":3,"reach":8,"answers":9,"staying":11,"control":4},"spells":[{"card":"Kingpin, Wilson Fisk","arch":"summon","name":"Rally the Fae"},{"card":"Garruk, Cursed Huntsman","arch":"smite","name":"Judgment of the Feast"},{"card":"Judith, the Scourge Diva","arch":"bolt","name":"Glutton Missile"},{"card":"Juri, Master of the Revue","arch":"pump","name":"War Chant"},{"card":"Priest of Forgotten Gods","arch":"drain","name":"Leech of the Feast"},{"card":"Primal Growth","arch":"devour","name":"Feast"},{"card":"Cultivate","arch":"haste","name":"Adrenaline"},{"card":"Moldervine Reclamation","arch":"regen","name":"Glutton Mending"}],"items":[{"card":"Commander's Sphere","arch":"relic"},{"card":"Swiftfoot Boots","arch":"armor"},{"card":"Spawning Pit","arch":"charm"},{"card":"Golden Egg","arch":"relic"},{"card":"Sol Ring","arch":"relic"}],"lands":35},{"key":"thranduil","deck":"Thranduil","icon":"🧝","owner":"Leon","cmdr":"Thranduil, the Elvenking","name":"Leafwarden","cls":"ranged","duo":false,"blurb":"An elf ranger-lord with a silverwood bow.","stats":{"mana":11,"cards":5,"consistency":10,"threats":8,"clock":5,"reach":1,"answers":6,"staying":4,"control":9},"spells":[{"card":"Thranduil, Sindarin Liege // Silvan Rally","arch":"summon","name":"Rally the Wardens"},{"card":"Círdan the Shipwright","arch":"insight","name":"Scholar's Eye"},{"card":"Lathril, Blade of the Elves","arch":"drain","name":"Leech of the Grove"},{"card":"Marwyn, the Nurturer","arch":"pump","name":"Battle Cry"},{"card":"Dwynen, Gilt-Leaf Daen","arch":"regen","name":"Rejuvenate"},{"card":"Shadowheart, Dark Justiciar","arch":"devour","name":"Gorge"},{"card":"Priest of Titania","arch":"haste","name":"Quicken"},{"card":"Paradise Druid","arch":"aegis","name":"Aegis of the Grove"}],"items":[{"card":"Sol Ring","arch":"relic"},{"card":"Altar of Dementia","arch":"charm"},{"card":"Dimir Signet","arch":"relic"}],"lands":32},{"key":"joel","deck":"The Last of Us","icon":"🍄","owner":"Kyle","cmdr":"Ellie, Vengeful Hunter + Joel, Resolute Survivor","name":"The Spore Runners","cls":"ranged","duo":true,"blurb":"A hooded scout with a bow and a bearded brawler with a pipe.","stats":{"mana":8,"cards":7,"consistency":6,"threats":4,"clock":2,"reach":10,"answers":6,"staying":7,"control":8},"spells":[{"card":"The Mycotyrant","arch":"summon","name":"Summon Sporelings"},{"card":"Grave Venerations","arch":"drain","name":"Spore Siphon"},{"card":"Jaheira, Friend of the Forest","arch":"haste","name":"Adrenaline"},{"card":"Slimefoot, the Stowaway","arch":"nova","name":"Spore Nova"},{"card":"Goblin Bombardment","arch":"bolt","name":"Spore Bolt"},{"card":"Overseer of the Damned","arch":"smite","name":"Spore Strike"},{"card":"Grim Haruspex","arch":"insight","name":"Foresight"},{"card":"Ignoble Hierarch","arch":"pump","name":"Battle Cry"}],"items":[{"card":"Cauldron of Essence","arch":"charm"},{"card":"Sol Ring","arch":"relic"},{"card":"Arcane Signet","arch":"relic"},{"card":"Eerie Gravestone","arch":"charm"}],"lands":38},{"key":"robots","deck":"Primary Directive","icon":"🤖","owner":"Leon","cmdr":"Optimus Prime, Hero // Optimus Prime, Autobot Leader","name":"Aegis Prime-X","cls":"tank","duo":false,"blurb":"A battle robot with an arm cannon and a reactor heart.","stats":{"mana":8,"cards":7,"consistency":6,"threats":10,"clock":2,"reach":8,"answers":5,"staying":6,"control":5},"spells":[{"card":"Iron Man, Master of Machines","arch":"pump","name":"Battle Cry"},{"card":"Tri-Sentinel, Act of Vengeance","arch":"bolt","name":"Plasma Bolt"},{"card":"Tameshi, Reality Architect","arch":"insight","name":"Foresight"},{"card":"H.E.R.B.I.E., Lovable Robot","arch":"haste","name":"Adrenaline"},{"card":"Urza, Prince of Kroog","arch":"summon","name":"Rally the Drones"},{"card":"Kappa Cannoneer","arch":"aegis","name":"Plasma Barrier"},{"card":"Bosh, Iron Golem","arch":"devour","name":"Feast"},{"card":"Swords to Plowshares","arch":"smite","name":"Plasma Smite"}],"items":[{"card":"Fabrication Foundry","arch":"relic"},{"card":"Uthros Research Craft","arch":"blade"},{"card":"Braided Net // Braided Quipu","arch":"charm"},{"card":"Dowsing Device // Geode Grotto","arch":"blade"},{"card":"Arc Reactor","arch":"relic"}],"lands":34},{"key":"blood","deck":"Blood Suckers","icon":"🦇","owner":"Cheez","cmdr":"Zoraline, Cosmos Caller","name":"Nightwing Cleric","cls":"caster","duo":false,"blurb":"A bat-winged priestess who heals on every bite.","stats":{"mana":3,"cards":3,"consistency":7,"threats":5,"clock":2,"reach":9,"answers":11,"staying":9,"control":8},"spells":[{"card":"Aclazotz, Deepest Betrayal // Temple of the Dead","arch":"summon","name":"Summon Bats"},{"card":"Momo, Friendly Flier","arch":"pump","name":"Blood Fury"},{"card":"Darkstar Augur","arch":"drain","name":"Drain Life"},{"card":"Vito, Thorn of the Dusk Rose","arch":"regen","name":"Blessing of the Night"},{"card":"Momo, Rambunctious Rascal","arch":"bolt","name":"Blood Bolt"},{"card":"Etchings of the Chosen","arch":"aegis","name":"Blood Barrier"},{"card":"Star Charter","arch":"insight","name":"Scholar's Eye"},{"card":"Dirge Bat","arch":"smite","name":"Blood Strike"}],"items":[{"card":"Sol Ring","arch":"relic"},{"card":"Desecrated Tomb","arch":"charm"},{"card":"Arcane Signet","arch":"relic"},{"card":"Commander's Sphere","arch":"relic"},{"card":"Pristine Talisman","arch":"relic"}],"lands":38},{"key":"mech","deck":"Mechanized Mayhem","icon":"🥚","owner":"Cheez","cmdr":"Dr. Eggman","name":"Gearbrain","cls":"ranged","duo":false,"blurb":"A goblin tinkerer piloting a spider-legged walker.","stats":{"mana":7,"cards":2,"consistency":8,"threats":9,"clock":3,"reach":10,"answers":5,"staying":5,"control":5},"spells":[{"card":"Tezzeret, Master of the Bridge","arch":"nova","name":"Shockwave of the Machine"},{"card":"Cyclonus, the Saboteur // Cyclonus, Cybertronian Fighter","arch":"bolt","name":"Gear Bolt"},{"card":"Traxos, Scourge of Kroog","arch":"freeze","name":"Deep Freeze"},{"card":"Davros, Dalek Creator","arch":"summon","name":"Summon Automatons"},{"card":"Ultron, Machine Overlord","arch":"pump","name":"Gear Fury"},{"card":"One with the Machine","arch":"insight","name":"Scholar's Eye"},{"card":"Walking Skyscraper","arch":"aegis","name":"Aegis of the Machine"},{"card":"The Antiquities War","arch":"devour","name":"Gorge"}],"items":[{"card":"The Belligerent","arch":"charm"},{"card":"Cultivator's Caravan","arch":"relic"},{"card":"Darksteel Ingot","arch":"armor"},{"card":"Rolling Hamsphere","arch":"blade"},{"card":"Skysovereign, Consul Flagship","arch":"charm"}],"lands":35},{"key":"weather","deck":"Ominous Weather","icon":"❄️","owner":"Kyle","cmdr":"Isu the Abominable","name":"Frostfang Yeti","cls":"melee","duo":false,"blurb":"A shaggy yeti shaman who calls blizzards.","stats":{"mana":6,"cards":5,"consistency":8,"threats":5,"clock":4,"reach":7,"answers":8,"staying":2,"control":6},"spells":[{"card":"Marit Lage's Slumber","arch":"freeze","name":"Glacial Grip"},{"card":"The Pride of Hull Clade","arch":"bolt","name":"Frost Bolt"},{"card":"Hylda of the Icy Crown","arch":"summon","name":"Call Snow Wraiths"},{"card":"Become the Avalanche","arch":"pump","name":"Battle Cry"},{"card":"Rishkar's Expertise","arch":"insight","name":"Scholar's Eye"},{"card":"Search for Tomorrow","arch":"haste","name":"Quicken"},{"card":"Ascendant Spirit","arch":"bolt","name":"Frost Lance"},{"card":"Cone of Cold","arch":"freeze","name":"Deep Freeze"}],"items":[{"card":"Replicating Ring","arch":"relic"},{"card":"Snow Devil","arch":"blade"},{"card":"Arcane Signet","arch":"relic"},{"card":"Coldsteel Heart","arch":"relic"},{"card":"Azorius Signet","arch":"relic"}],"lands":39}],"arch":{"bolt":{"label":"Bolt","titles":["Starfall","Hellfire Lance","the Pyre Eternal"]},"nova":{"label":"Nova","titles":["Cataclysm","the Last Sunrise","Worldbreaker"]},"smite":{"label":"Smite","titles":["Executioner","Final Verdict","the Godslayer"]},"drain":{"label":"Drain","titles":["Soul Harvest","the Bleeding Moon","Crimson Tithe"]},"summon":{"label":"Summon","titles":["Legion Eternal","the Endless Horde","Army of the Damned"]},"regen":{"label":"Regen","titles":["Undying Grace","the Phoenix Psalm","Everbloom"]},"aegis":{"label":"Aegis","titles":["Bastion Unbroken","the Last Wall","Adamant Dawn"]},"pump":{"label":"Pump","titles":["Titan Rising","the Warlord Ascendant","Giantblood"]},"devour":{"label":"Devour","titles":["the Gluttonous Abyss","Bone Feast","Maw of Ages"]},"haste":{"label":"Haste","titles":["Overdrive","the Thousand Hands","Quickening Storm"]},"insight":{"label":"Insight","titles":["the Open Eye","Omniscient","Library of Ash"]},"freeze":{"label":"Freeze","titles":["Absolute Zero","the Long Winter","Glacial Tomb"]},"counter":{"label":"Counter","titles":["Null Mirror","the Silent Ward","Spellbreaker"]},"blade":{"label":"Weapon","titles":["Kingsbane","the Red Edge","Doomforged"]},"armor":{"label":"Armor","titles":["Aegis of Ages","the Unbreakable","Ironsoul"]},"relic":{"label":"Relic","titles":["Clockwork Heart","the Ever-Turning","Infinity Engine"]},"charm":{"label":"Charm","titles":["Lucky Bones","Fate's Favorite","the Gilded Skull"]}}};      // heroes from the decks (built by battler_data.py)
const ATLAS={"sprites":{"h_grim":[0,0,128,128,12],"h_vile":[1536,0,160,128,12],"h_vile_a":[0,128,128,128,12],"h_vile_b":[1536,128,128,128,12],"h_felothar":[0,256,128,128,12],"h_thing":[1536,256,128,128,12],"h_kykar":[0,384,128,128,12],"h_depala":[1536,384,128,128,12],"h_kotis":[0,512,128,128,12],"h_dragons":[1536,512,128,128,12],"h_mathas":[0,640,128,128,12],"h_turtle":[1536,640,160,128,12],"h_turtle_a":[0,768,128,128,12],"h_turtle_b":[1536,768,128,128,12],"h_marina":[0,896,128,128,12],"h_korvold":[1536,896,128,128,12],"h_thranduil":[0,1024,128,128,12],"h_joel":[1536,1024,160,128,12],"h_joel_a":[0,1152,128,128,12],"h_joel_b":[1536,1152,128,128,12],"h_robots":[0,1280,128,128,12],"h_blood":[1536,1280,128,128,12],"h_mech":[0,1408,128,128,12],"h_weather":[1536,1408,128,128,12],"e_ghoul":[0,1536,128,128,12],"e_cultist":[1536,1536,128,128,12],"e_knight":[0,1664,128,128,12],"e_wolfman":[1536,1664,128,128,12],"e_hag":[0,1792,128,128,12],"e_zombie":[1536,1792,128,128,12],"e_drowned":[0,1920,128,128,12],"e_skeleton":[1536,1920,128,128,12],"e_archer":[0,2048,128,128,12],"e_thrall":[1536,2048,128,128,12],"e_wraith":[0,2176,128,128,12],"e_leech":[1536,2176,96,96,12],"e_bat":[2688,2176,96,96,12],"e_ghost":[0,2304,96,96,12],"e_gargoyle":[1152,2304,96,96,12],"e_hound":[2304,2304,96,96,12],"e_spawn":[0,2400,96,96,12],"e_eye":[1152,2400,96,96,12],"e_spider":[2304,2400,96,96,12],"b_gravelord":[0,2496,256,256,3],"b_countess":[768,2496,256,256,3],"b_maw":[1536,2496,256,256,3]},"bg":{"grave":{"fill":"#001b27","layers":[{"r":[776,0,48,160],"y":-17.0,"sp":0.04,"w":72.0,"h":240.0,"tile":72.0},{"r":[822,409,128,48],"y":-17.0,"sp":0.0,"w":192.0,"h":72.0,"once":{"x":220,"period":0}},{"r":[0,247,544,160],"y":-17.0,"sp":0.35,"w":816.0,"h":240.0,"tile":816.0},{"r":[0,571,272,48],"y":151.0,"sp":1.0,"w":408.0,"h":72.0,"tile":408.0}]},"manor":{"fill":"#123c48","layers":[{"r":[546,247,272,160],"y":-65.0,"sp":0.04,"w":408.0,"h":240.0,"tile":408.0},{"r":[820,247,272,160],"y":-65.0,"sp":0.12,"w":408.0,"h":240.0,"tile":408.0},{"r":[0,409,272,160],"y":-65.0,"sp":0.28,"w":408.0,"h":240.0,"tile":408.0},{"r":[274,409,272,81],"y":53.5,"sp":0.5,"w":408.0,"h":121.5,"tile":408.0},{"r":[548,409,272,49],"y":101.5,"sp":0.75,"w":408.0,"h":73.5,"tile":408.0},{"r":[274,571,272,44],"y":163.0,"sp":1.0,"w":408.0,"h":66.0,"tile":408.0}]},"bog":{"fill":"#7a2c38","layers":[{"r":[322,0,160,224],"y":-14.0,"sp":0.04,"w":160.0,"h":224.0,"tile":160.0},{"r":[484,0,160,224],"y":-14.0,"sp":0.12,"w":160.0,"h":224.0,"tile":160.0},{"r":[646,0,128,224],"y":-14.0,"sp":0.3,"w":128.0,"h":224.0,"once":{"x":130,"period":520}},{"r":[0,0,320,245],"y":-14.0,"sp":1.0,"w":320.0,"h":245.0,"tile":320.0}]}},"res":2,"units":{"zombie":{"walk":{"fw":32,"fh":48,"n":6,"ax":18,"ay":47,"x":0,"y":0},"atk":{"fw":64,"fh":57,"n":5,"ax":41,"ay":56,"x":192,"y":0}},"zombie_f":{"walk":{"fw":32,"fh":48,"n":6,"ax":18,"ay":47,"x":512,"y":0},"atk":{"fw":64,"fh":57,"n":5,"ax":41,"ay":56,"x":704,"y":0}},"zombie_b":{"walk":{"fw":32,"fh":48,"n":6,"ax":18,"ay":47,"x":1024,"y":0},"atk":{"fw":64,"fh":57,"n":5,"ax":41,"ay":56,"x":1216,"y":0}}}};    // sprite + backdrop atlas (built by make_crawl_art.py)
const OWNERS={Kyle:'🎩',Cheez:'🧀',Leon:'🪼'};

// ======================================================================= CONFIG TABLES
const CFG={
  W:384,H:216,GROUND:190,
  stagesPerBiome:5,
  strangerStage:10,                  // clearing this frees the mystery stranger (3rd party spot)
  maxStage:15,                      // add biomes below and raise this to extend the crawl
  slots:{spell:3,item:2},
  maxRank:10,
  walkSpeed:26,
  rarity:[
    {id:'C',name:'Common',pts:1,w:62,col:'#c9c9c9'},
    {id:'U',name:'Uncommon',pts:2,w:27,col:'#4fd46a'},
    {id:'R',name:'Rare',pts:3,w:11,col:'#4aa8ff'},
    {id:'L',name:'Legendary',pts:5,w:2.5,col:'#ffb020',minPrestige:2}   // locked early on purpose
  ],
  biomes:[
    {id:'grave',name:'Blackwater Lake',pool:{zombie:1},boss:'gravelord'},
    {id:'manor',name:'Hollowmere Cemetery',pool:{zombie:1},boss:'countess'},
    {id:'bog',name:'The Cathedral Corridor',pool:{zombie:1},boss:'maw'},
  ],
  enemies:{ // hp/dmg at stage 1; spd px/s; atk = seconds between hits; cost = spawn budget
    // rebuilt roster: only the zombie so far. animAtk = attack animation length (s), hitAt = when in it the blow lands (s)
    // Kyle's zombie: 50 HP, 1d6 per hit, swings every 1.25s, 12px reach, very slow, 3 armor (=6% less damage), small-medium knockback resistance,
    // 25% on hit to Bleed (20 dmg over 5s), item 4% / small gold 17.5%. Three looks (skins), identical stats.
    zombie:  {hp:50,dmgDie:6,spd:8,atk:1.25,reach:12,armorPts:3,kbRes:.35,bleed:{chance:.25,dmg:20,dur:5},
              itemChance:.04,goldChance:.175,goldAmt:[2,5],xp:2,pts:10,cost:1.2,animAtk:.6,hitAt:.38,skins:['zombie','zombie_f','zombie_b']},
  },
  bosses:{
    gravelord:{name:'The Gravelord',hp:950,dmg:20,spd:9, xp:60, pts:1500},
    countess: {name:'The Crimson Countess',hp:1350,dmg:20,spd:14,xp:90,pts:2500,fly:1},
    maw:      {name:'The Maw Below',hp:2000,dmg:28,spd:0, xp:130,pts:4000},
  },
  stage(n,prestige){
    const bi=Math.floor((n-1)/this.stagesPerBiome)%this.biomes.length, b=this.biomes[bi];
    const P=prestige||0;
    return {n,biome:b,bi,boss:n%this.stagesPerBiome===0?b.boss:null,
      len:1.5*(820+42*(n-1)),   // 5 stages per biome; each about 25% shorter than before
      rate:1.5*(0.62+0.061*(n-1))*(1+0.3*P),   // spawn budget per second
      hpMul:Math.pow(1.28,.555*(n-1))*Math.pow(2.2,P),   // difficulty climbs over 15 stages the way it used to over 9
      dmgMul:Math.pow(1.16,.555*(n-1))*Math.pow(1.8,P),
      xpMul:1+0.19*(n-1)+P*2.4};
  },
};
// hero fighting styles (basic attack + body), keyed by deck
const STYLE={
  grim:{atk:'melee',reach:30,hp:1.15,dmg:1.15},
  vile:{atk:'duo',a:'orb',b:'melee',reach:28,hp:.95,dmg:.85},
  felothar:{atk:'melee',reach:26,hp:1.7,dmg:.7,tank:1},
  thing:{atk:'caster',proj:'shard',hp:1.05,dmg:1},
  kykar:{atk:'caster',proj:'zap',hp:.85,dmg:1},
  depala:{atk:'melee',reach:26,hp:1.25,dmg:1.1},
  kotis:{atk:'melee',reach:24,hp:.95,dmg:.65,double:1,aspd:1.15},
  dragons:{atk:'ranged',proj:'fire',range:150,hp:.9,dmg:1.05,splash:14},
  mathas:{atk:'ranged',proj:'quarrel',range:210,hp:.8,dmg:1.25,aspd:.85},
  turtle:{atk:'duo',a:'melee',b:'melee',reach:36,hp:1.25,dmg:.75,tank:1},
  marina:{atk:'caster',proj:'wisp',hp:.85,dmg:1},
  korvold:{atk:'melee',reach:28,hp:1.35,dmg:1.05,devour:1},
  thranduil:{atk:'ranged',proj:'arrow',range:230,hp:.85,dmg:1.05,aspd:1.1},
  joel:{atk:'duo',a:'arrow',b:'melee',reach:28,range:210,hp:1.05,dmg:.9,companion:1},
  robots:{atk:'ranged',proj:'plasma',range:190,hp:1.35,dmg:1.0,tank:1},
  blood:{atk:'caster',proj:'blood',hp:.95,dmg:.9,leech:.25},
  mech:{atk:'ranged',proj:'shell',range:200,hp:1.05,dmg:1.1,splash:12},
  weather:{atk:'caster',proj:'frost',hp:1.1,dmg:.95,chill:1},
};
const ORDER={melee:0,duo:1,ranged:2,caster:3};
// walking pace per hero (px/s): heavy/armored/stone slow, light and quick ones faster
const MOVE={grim:24,vile:26,felothar:18,thing:20,kykar:26,depala:22,kotis:34,dragons:30,mathas:28,turtle:22,marina:26,korvold:26,thranduil:32,joel:28,robots:22,blood:30,mech:24,weather:24};
const MINION_SPEED=62;
// how each hero's Summon spell behaves when recast (easy to retune per hero)
const SUMMON_STYLE={grim:'empower',thing:'empower',korvold:'empower',felothar:'mend',depala:'mend',robots:'mend',mech:'mend',
  vile:'volatile',mathas:'volatile',joel:'volatile',kykar:'swarm',kotis:'swarm',dragons:'swarm',turtle:'swarm',thranduil:'swarm',blood:'swarm',marina:'linger',weather:'linger'};
const SUMMON_TXT={empower:'Recasting grows the one already out (+25% power, up to 3 stacks) instead of adding another.',mend:'Recasting fully repairs and refreshes the one already out.',
  volatile:'Recasting detonates the old one in a blast as the new one arrives.',swarm:'Calls two smaller ones each time.',linger:'Lasts 18s; recasting refreshes it.'};
const RANGED_SUMMONERS=new Set(['robots','mech','marina','kykar','thing','vile']);   // their summons shoot from mid-screen; everyone else's charge in
// ---- signature abilities: every hero comes with one, on its own cooldown (not a spell slot). fn(game, hero, atk)
const SIG={
  grim:{name:'Royal Cleave',cd:6,txt:'Sweeps every ground enemy in reach for 220% damage and shoves them back.',fn:(g,h,a)=>g.sigArea(h,46,a*2.2,{kb:1.4,ground:1,fx:'slash'})},
  vile:{name:'Hexburst',cd:5,txt:'A hex orb bursts on the nearest enemy for 160% and 80% around it.',fn:(g,h,a)=>g.sigShot(h,'orb',a*1.6,{splash:26})},
  felothar:{name:'Shield Wall',cd:9,txt:'Shields the whole team for 10% of his max HP.',fn:(g,h,a)=>{for(const o of g.alive()){o.shield+=h.max*.1;o.shieldT=6;}g.fx.push({k:'ring',x:h.x,y:g.G-24,r:30,t:0,c:'#ffd23f'});return true;}},
  thing:{name:'Shard Storm',cd:6,txt:'Hurls 2 big crystal shards at random enemies for 160% each.',fn:(g,h,a)=>g.sigMulti(h,'shard',a*1.6,2)},
  kykar:{name:'Chain Lightning',cd:6,txt:'Lightning arcs through 3 enemies for 120% each.',fn:(g,h,a)=>g.sigChain(h,a*1.2,3)},
  depala:{name:'Rocket Hammer',cd:6,txt:'Smashes the front enemy for 260%, stunning and knocking it back.',fn:(g,h,a)=>g.sigFront(h,a*2.6,{stun:.6,kb:1.6})},
  kotis:{name:'Venom Flurry',cd:5,txt:'Four quick stabs for 60% each; the target is poisoned.',fn:(g,h,a)=>g.sigFront(h,a*.6,{hits:4,burn:a*.4})},
  dragons:{name:'Twin Breath',cd:7,txt:'Fire and frost wash over everything within 90px: 110% damage and a chill.',fn:(g,h,a)=>g.sigArea(h,90,a*1.1,{slow:.35,fx:'ring',c:'#ff8a1f'})},
  mathas:{name:'Bounty Mark',cd:7,txt:'Marks the toughest enemy (takes +20% for 6s) and shoots it for 200%.',fn:(g,h,a)=>g.sigMark(h,a*2)},
  turtle:{name:'Shell Spin',cd:6,txt:'Spins through every ground enemy in reach for 140%, shoving them back.',fn:(g,h,a)=>g.sigArea(h,40,a*1.4,{kb:1.2,ground:1,fx:'ring',c:'#c8b890'})},
  marina:{name:'Lantern Haunt',cd:9,txt:'Lets the lantern ghost out to fight for 9s (one at a time).',fn:(g,h,a)=>{g.addMinion(h,h.max*.3,a*.6,9,'spirit','sig',1);return true;}},
  korvold:{name:'Gorge',cd:6,txt:'Bites the front enemy for 260% and heals for 30% of it.',fn:(g,h,a)=>g.sigFront(h,a*2.6,{heal:.3})},
  thranduil:{name:'Volley',cd:6,txt:'Looses 3 heavy arrows at random enemies for 115% each.',fn:(g,h,a)=>g.sigMulti(h,'arrow',a*1.15,3)},
  joel:{name:'Brick Toss',cd:7,txt:'The scout lobs a brick for 200% that stuns the target for 0.75s.',fn:(g,h,a)=>g.sigShot(h,'brick',a*2,{stun:.75})},
  robots:{name:'Overcharge',cd:7,txt:'A piercing plasma beam hits every enemy in a line for 160%.',fn:(g,h,a)=>g.sigArea(h,260,a*1.6,{fx:'beamline',c:'#3ff0ff'})},
  blood:{name:'Blood Rite',cd:7,txt:'Drains 3 enemies for 90% and heals the whole team for half of it.',fn:(g,h,a)=>g.sigDrain(h,a*.9,3)},
  mech:{name:'Mortar Barrage',cd:7,txt:'Two big shells crash down for 160% with splash.',fn:(g,h,a)=>g.sigMulti(h,'shell',a*1.6,2,{splash:20})},
  weather:{name:'Blizzard',cd:8,txt:'Chills every enemy (−50% speed, 2s) and deals 60%.',fn:(g,h,a)=>g.sigArea(h,999,a*.6,{slow:.5,fx:'frost'})},
};
// ---- damage pipeline: every hit goes through mitigate(). Today there is one type ('physical') and armor is a flat % reduction.
// To add types later: list them here, tag attacks with {type:'fire'} etc., and give enemies/heroes a resist map
// (e.g. CFG.enemies.zombie.resist={fire:-0.5, cold:0.3} = weak to fire, resists cold).
const DMG_TYPES={physical:{name:'Damage'}};
// Kyle's armor rule: points 1-20 = 2% less damage each, 21-40 = 1% each, 41+ = 0.5% each (capped at 90%)
function armorReduction(a){a=Math.max(0,a||0);return Math.min(.9,Math.min(a,20)*.02+Math.min(Math.max(a-20,0),20)*.01+Math.max(a-40,0)*.005);}
function mitigate(target,amt,type){
  type=type||'physical';
  const armor=target.armor!=null?target.armor:((target.E&&target.E.armor)||(target.B&&target.B.armor)||0);
  const res=(target.resist||(target.E&&target.E.resist)||(target.B&&target.B.resist)||{})[type]||0;
  const pts=(target.E&&target.E.armorPts)||(target.B&&target.B.armorPts)||target.armorPts||0;
  return Math.max(1,amt*(1-Math.min(.75,armor))*(1-armorReduction(pts))*(1-res));
}

// ======================================================================= ABILITIES (spells) + AUGMENTS
// a = attack power of the owner, r = rank (1..10). Each describes itself for the pick cards.
const AUG={
  burn:{name:'Burn',txt:'sets targets ablaze'}, stun:{name:'Stun',txt:'stuns targets briefly'},
  slow:{name:'Wither',txt:'slows targets'}, shred:{name:'Shred',txt:'targets take +20% damage'},
  leech:{name:'Lifesteal',txt:'heals the team for part of the damage'}, knock:{name:'Knockback',txt:'shoves targets back'},
  chain:{name:'Chain',txt:'jumps to one more enemy'}, pierce:{name:'Pierce',txt:'passes through enemies'},
  echo:{name:'Echo',txt:'recasts at half power'}, extra:{name:'Multiply',txt:'+1 projectile / target / minion'},
  shield:{name:'Ward',txt:'also shields the caster'}, execute:{name:'Execute',txt:'+100% damage to enemies under 30%'},
  explode:{name:'Volatile',txt:'minions explode when they fall'}, taunt:{name:'Taunt',txt:'minions draw enemy attacks'},
  all:{name:'Mass',txt:'affects the whole team'}, thorns:{name:'Thorns',txt:'reflects 30% of blocked damage'},
};
const SPELL={
  bolt:{label:'Bolt',cd:2.6,augs:['pierce','burn','chain','extra','echo'],
    txt:(r,a,S)=>`Fires ${1+Math.floor(r/4)+(S.aug.extra?1:0)} bolt${r>=4||S.aug.extra?'s':''} for ${Math.round(a*(.7+.12*r))} damage each.`},
  nova:{label:'Nova',cd:7,augs:['stun','leech','knock','echo','burn'],
    txt:(r,a)=>`Blasts every enemy within ${46+3*r}px of the front line for ${Math.round(a*(1.2+.22*r))}.`},
  smite:{label:'Smite',cd:5.5,augs:['execute','chain','stun','shred'],
    txt:(r,a)=>`Strikes the toughest enemy for ${Math.round(a*(2.4+.45*r))}.`},
  drain:{label:'Drain',cd:4.5,augs:['extra','slow','leech','shred'],
    txt:(r,a,S)=>`Drains ${2+Math.floor(r/3)+(S.aug.extra?2:0)} enemies for ${Math.round(a*(.6+.12*r))}; heals the weakest ally for 40% of it.`},
  summon:{label:'Summon',cd:9,augs:['explode','taunt','extra','leech'],
    txt:(r,a,S,o,hk)=>{const cap=(r>=10?3:r>=5?2:1)+(S.aug.extra?1:0);const st=SUMMON_STYLE[hk]||'replace';return `Calls a minion (${Math.round(o.max*(.18+.03*r))} HP, ${Math.round(a*(.35+.06*r))} dmg). Up to ${cap} out. ${SUMMON_TXT[st]||'Recasting replaces the oldest.'}`;}},
  regen:{label:'Regen',cd:6,augs:['all','shield','echo'],
    txt:(r,a,S)=>`Heals ${S.aug.all?'every ally':'the weakest ally'} for ${Math.round(8+1.4*r)}% of their max HP.`},
  aegis:{label:'Aegis',cd:10,augs:['thorns','echo','leech'],
    txt:(r,a,S,o)=>`Shields the team for ${Math.round(o.max*(.05+.013*r))} for 6s.`},
  freeze:{label:'Freeze',cd:8,augs:['stun','shred','burn','echo'],
    txt:(r,a)=>`Chills every enemy (−45% speed, ${(1.6+.15*r).toFixed(1)}s) and deals ${Math.round(a*(.3+.08*r))}.`},
  counter:{label:'Counter',cd:7,augs:['stun','shield','echo'],
    txt:(r,a)=>`Wipes enemy projectiles and stuns ranged foes for ${(0.6+0.1*r).toFixed(1)}s; deals ${Math.round(a*(.4+.1*r))} to each.`},
  pump:{label:'Pump',passive:1,augs:[],txt:(r)=>`Passive: team damage +${4*r}%.`},
  haste:{label:'Haste',passive:1,augs:[],txt:(r)=>`Passive: team attack speed +${(3.5*r).toFixed(1)}%, cooldowns −${(1.5*r).toFixed(1)}%.`},
  insight:{label:'Insight',passive:1,augs:[],txt:(r)=>`Passive: +${6*r}% run XP, +${r} luck.`},
  devour:{label:'Devour',passive:1,augs:[],txt:(r)=>`Passive: kills heal the owner ${(.6+.25*r).toFixed(1)}% and grow team damage (resets each stage).`},
};
const MAXNAME=DATA.arch;   // titles for rank-10 abilities
const PROCS={ // items: ~half carry one of these, chosen from the card name
  ignite:{t:'onhit',txt:(c)=>`${c}% chance on hit: ignite the target.`},
  spark:{t:'onhit',txt:(c)=>`${c}% chance on hit: loose a bonus bolt.`},
  stunhit:{t:'onhit',txt:(c)=>`${c}% chance on hit: stun the target.`},
  critnova:{t:'oncrit',txt:(c)=>`${c}% chance on crit: small blast around the target.`},
  killheal:{t:'onkill',txt:(c)=>`${c}% chance on kill: heal the team 4%.`},
  killraise:{t:'onkill',txt:(c)=>`${c}% chance on kill: raise a skeleton ally for 8s.`},
  hitshield:{t:'whenhit',txt:(c)=>`${c}% chance when hit: gain a shield.`},
  hitthorns:{t:'whenhit',txt:(c)=>`When hit: reflect ${Math.round(c*1.5)}% of the damage.`},
  nearfrost:{t:'near',txt:(c)=>`When an enemy gets close: frost burst (6s cooldown, ${Math.round(c*2)}% stronger per rank).`},
  allylow:{t:'allylow',txt:(c)=>`When an ally drops under 35%: heal them ${Math.round(10+c/2)}% (20s cooldown).`},
  castrush:{t:'oncast',txt:(c)=>`${c}% chance on ability cast: +30% attack speed for 3s.`},
};
const ITEM={
  blade:{label:'Weapon',txt:(r)=>`+${5*r}% damage, +${r}% crit`},
  armor:{label:'Armor',txt:(r)=>`+${6*r}% max HP, −${(1.5*r).toFixed(1)}% damage taken`},
  relic:{label:'Relic',txt:(r)=>`−${(2.5*r).toFixed(1)}% cooldowns, +${(2.5*r).toFixed(1)}% attack speed`},
  charm:{label:'Charm',txt:(r)=>`+${(1.5*r).toFixed(1)}% crit, +${r} luck, +${3*r}% score`},
};
function strHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function procFor(card){const h=strHash(card);if(h%100>=52)return null;const ks=Object.keys(PROCS);return ks[(h>>>8)%ks.length];}
const procChance=r=>Math.round(6+2.2*r);
function maxTitle(card,arch){const t=(MAXNAME[arch]||{titles:['Ascendant']}).titles;return t[strHash(card)%t.length];}
function shortCard(c){return c.split(' // ')[0];}
function sname(hk,card){const d=DATA.heroes.find(h=>h.key===hk);const s=d&&d.spells.find(x=>x.card===card);return s&&s.name?s.name:shortCard(card);}

// ======================================================================= HERO STATS
function heroDef(key){return DATA.heroes.find(h=>h.key===key);}
// Abilities (spells, passives, signatures, level-up picks) are switched off while Kyle rebuilds them from scratch.
const ABILITIES_OFF=true;
const ENEMY_BODY=18;   // px between a melee enemy's centre and the front hero's centre before reach is added
const HERO_FLAT_HP=0,HP_PER_STAMINA=5,HERO_DIE=6;
function heroBase(key,lvl,teamSize){
  const d=heroDef(key),s=d.stats,st=STYLE[key];
  // Kyle's rules: Max Health = Flat Health + Stamina bonus; Stamina = deck lands / 3 (rounded up); 5 HP per Stamina. Base damage = d6.
  const stamina=Math.ceil((d.lands||36)/3);
  const hp=HERO_FLAT_HP+stamina*HP_PER_STAMINA;
  // ability power (spells, signatures, summons) keeps its old formula; only the basic attack is a d6 for now
  let atk=(7+.7*s.threats+.4*s.clock)*st.dmg;const L=Math.max(1,lvl||1);atk*=1+.06*(L-1);atk*=1+.3*(3-teamSize);
  return {hp,atk,stamina,flatHp:HERO_FLAT_HP,die:HERO_DIE,aspd:(0.8+0.025*s.mana)*(st.aspd||1)*(st.atk==='caster'?.8:1)*(st.atk==='ranged'||st.atk==='caster'?.74:1),crit:.04+.006*s.consistency,dodge:.008*s.control,
    pow:1+.04*s.answers,reach:1+.02*s.reach,luck:Math.round((s.consistency+s.cards)/4),xpm:1+.03*s.cards,
    reflex:Math.round(4+.6*s.mana+.4*s.control+(MOVE[key]||26)/6-4)};   // chance + speed to step out of marked danger
}
function needHeroXp(L){return Math.round(70*Math.pow(L,1.6));}
function needRunXp(k){return 8+6*k;}

// ======================================================================= GAME (headless-capable)
class Game{
  constructor(opt){
    this.W=opt.W||CFG.W;this.H=CFG.H;this.G=CFG.GROUND;
    this.rng=opt.rng||Math.random;this.demo=!!opt.demo;this.run=opt.run;this.slot=opt.slot;
    this.st=CFG.stage(this.run.stage,this.run.prestige);
    this.dist=0;this.t=0;this.events=[];this.enemies=[];this.proj=[];this.fx=[];this.minions=[];this.texts=[];
    this.budget=2;this.bossSpawned=false;this.over=null;this.kills=0;this.shake=0;this.devourStacks=0;
    this.stageXp=0;this.stageScore=0;this.loot=[];this.stageGold=0;this.stageItems=[];
    this.heroes=this.run.team.map((k,i)=>this.makeHero(k));
    this.heroes.sort((a,b)=>(STYLE[a.key].tank?-1:0)-(STYLE[b.key].tank?-1:0)||ORDER[a.style.atk]-ORDER[b.style.atk]);
    this.recalc();
    this.heroes.forEach((h,i)=>{h.x=this.home(h);const saved=this.run.heroes[h.key];h.hp=saved.dead?h.max*.25:Math.max(1,h.max*(saved.hpf==null?1:saved.hpf));});
    this.spawnTimer=0;
  }
  makeHero(key){
    const sv=this.run.heroes[key];const lvl=(this.slot&&this.slot.heroes[key]||{lvl:1}).lvl;
    return {key,def:heroDef(key),style:STYLE[key],lvl,base:heroBase(key,lvl,this.run.team.length),spells:ABILITIES_OFF?[]:sv.spells.map(s=>Object.assign({cdT:Math.random()*1.5},s)),
      items:sv.items.slice(),alive:true,x:0,atkT:Math.random()*.5,anim:0,animT:0,walkT:Math.random(),shield:0,shieldT:0,buffT:0,lowT:0,nearT:0,hitFlash:0,alt:0};
  }
  isMeleeHero(h){return h.style.atk==='melee'||h.style.atk==='duo';}
  // where each hero stands: melee 4/10 of the screen, ranged/casters 2/10 (several of a kind spread out a little)
  home(h){const al=this.alive().length?this.alive():this.heroes;const grp=al.filter(o=>this.isMeleeHero(o)===this.isMeleeHero(h));const j=Math.max(0,grp.indexOf(h));
    return Math.round(this.W*(this.isMeleeHero(h)?.4:.2))-j*16+(this.isMeleeHero(h)?0:(grp.length>1?8:0));}
  slotX(i){return this.home(this.heroes[i]);}
  // team-wide passives + per-hero items
  recalc(){
    const T={dmg:1,aspd:1,cdr:0,xp:1,luck:0,dodge:0,devour:0};
    for(const h of this.heroes)for(const s of h.spells){const r=s.r;
      if(s.arch==='pump')T.dmg+=.04*r; if(s.arch==='haste'){T.aspd+=.035*r;T.cdr+=.015*r;}
      if(s.arch==='insight'){T.xp+=.06*r;T.luck+=r;} if(s.arch==='devour')T.devour+=r;}
    this.team=T;
    for(const h of this.heroes){const b=h.base;let hpM=1,atkM=1,crit=b.crit,dr=0,cdr=T.cdr,aspd=T.aspd,luck=b.luck+T.luck,score=0;
      for(const it of h.items){const r=it.r*(1+.04*((it.tier||1)-1));
        if(it.arch==='blade'){atkM+=.05*r;crit+=.01*r;} if(it.arch==='armor'){hpM+=.06*r;dr+=.015*r;}
        if(it.arch==='relic'){cdr+=.025*r;aspd+=.025*r;} if(it.arch==='charm'){crit+=.015*r;luck+=r;score+=.03*r;}}
      const pct=h.max?h.hp/h.max:1;
      h.max=b.hp*hpM;h.atk=b.atk*atkM*T.dmg;h.aspd=b.aspd*aspd;h.crit=Math.min(.6,crit);h.dr=Math.min(.45,dr);h.armor=h.dr;h.cdr=Math.min(.5,cdr);
      h.dodge=Math.min(.4,b.dodge+T.dodge);h.luck=luck;h.scoreM=1+score;h.pow=b.pow;h.reach=b.reach;
      if(h.hp!=null)h.hp=Math.min(h.max,pct*h.max);}
  }
  alive(){return this.heroes.filter(h=>h.alive);}
  front(){const a=this.alive();return a.length?a.reduce((m,h)=>h.x>m.x?h:m,a[0]):null;}
  ev(type,o){this.events.push(Object.assign({type},o||{}));}
  // ---------------------------------------------------------------- spawning
  spawnEnemy(type,opt){
    const E=CFG.enemies[type];const st=this.st;const elite=!opt&&this.rng()<.07+.01*st.n;
    const hp=E.hp*st.hpMul*(elite?2.6:1);
    const e={type,E,x:this.W+10+this.rng()*20,y:E.fly?this.G-70+this.rng()*36:this.G,hp,max:hp,dmg:(E.dmg||E.dmgDie/2+.5)*st.dmgMul*(elite?1.5:1),dmgMul:st.dmgMul*(elite?1.5:1),skin:E.skins?E.skins[Math.floor(this.rng()*E.skins.length)]:type,atkT:this.rng()*.5,
      walkT:this.rng(),anim:0,animT:0,slow:0,slowT:0,stun:0,burn:0,burnT:0,shred:0,elite,fly:!!E.fly,ranged:!!E.ranged,hitFlash:0,phase:this.rng()*6,target:null};
    if(opt)Object.assign(e,opt);
    this.enemies.push(e);return e;
  }
  spawnBoss(){
    const B=CFG.bosses[this.st.boss];const hp=B.hp*this.st.hpMul;
    const b={type:this.st.boss,B,boss:true,x:this.W+70,y:B.fly?this.G-40:this.G,hp,max:hp,dmg:B.dmg*this.st.dmgMul,atkT:0,t1:2,t2:5,t3:8,anim:0,animT:0,walkT:0,
      slow:0,slowT:0,stun:0,burn:0,burnT:0,shred:0,hitFlash:0,fly:!!B.fly,phase:0,w:44};
    this.enemies.push(b);this.boss=b;this.bossSpawned=true;this.ev('boss',{name:B.name});this.shake=.6;
  }
  pickType(){const pool=this.st.biome.pool;let tot=0;for(const k in pool)tot+=pool[k];let r=this.rng()*tot;for(const k in pool){r-=pool[k];if(r<=0)return k;}return Object.keys(pool)[0];}
  // ---------------------------------------------------------------- damage
  hitEnemy(e,amt,src,opt){
    if(e.dead||amt<=0)return 0;opt=opt||{};
    if(!opt.sure&&e.E&&e.E.dodge&&this.rng()<e.E.dodge){this.text(e.x,e.y-30,'miss','#9aa');return 0;}
    let crit=false;if(src&&!opt.nocrit&&this.rng()<src.crit){amt*=1.75;crit=true;}
    amt=mitigate(e,amt,opt.type); if(e.shred>0)amt*=1.2;
    if(opt.execute&&e.hp<e.max*.3)amt*=2;
    amt=Math.max(1,amt);e.hp-=amt;e.hitFlash=.12;this.lastHit=this.t;
    if(opt.kb>0){const ratio=Math.min(1,amt/Math.max(1,e.max));let kb=ratio<.08?ratio*12:ratio<.25?2+ratio*14:5+ratio*12;   // chip ~0, medium small, big decent
      if(crit)kb*=1.6;if(e.boss)kb*=.12;kb*=opt.kb;if(e.fly)kb*=.7;if(e.E&&e.E.kbRes)kb*=1-e.E.kbRes;e.kbv=Math.max(e.kbv||0,Math.min(18,kb)*7);}
    this.text(e.x+(this.rng()*8-4),e.y-(e.boss?100:e.fly?16:44),Math.round(amt),crit?'#ffd23f':'#ffffff',crit);
    if(!ABILITIES_OFF&&src&&src.style&&src.style.leech)this.healHero(this.weakest(),amt*src.style.leech*.5,true);
    if(src&&src.items&&src.items.length)this.procs(src,crit?'oncrit':'onhit',e);
    if(e.hp<=0)this.kill(e,src);
    return amt;
  }
  kill(e,src){
    e.dead=true;this.kills++;
    const xp=(e.boss?e.B.xp:e.E.xp*(e.elite?2.5:1)*.33)*this.st.xpMul;   // regular enemies give about half the XP they used to (stages are twice as long)
    const pts=Math.round((e.boss?e.B.pts:e.E.pts*(e.elite?3:1))*(1+.4*(this.st.n-1))*(1+this.run.prestige)*(src?src.scoreM:1));
    this.stageScore+=pts;this.gainXp(xp);
    this.fx.push({k:'poof',x:e.x,y:e.y-(e.fly?0:20),t:0,big:!!e.boss||e.elite});
    if(!e.boss)this.fx.push({k:'corpse',type:e.type,skin:e.skin,x:e.x,y:e.y,fly:e.fly,elite:e.elite,lane:e.lane||0,t:0,life:1.3});
    if(this.team.devour){this.devourStacks=Math.min(60,this.devourStacks+1);for(const h of this.alive())if(h.spells.some(s=>s.arch==='devour'))this.healHero(h,h.max*(.006+.0025*this.spellRank(h,'devour')),true);}
    if(src&&src.items)this.procs(src,'onkill',e);
    if(!this.demo){const st=this.st;const r=this.rng();
      const gChance=e.boss?1:e.elite?1:(e.E.goldChance!=null?e.E.goldChance:.12);if(r<gChance){const amt=!e.boss&&!e.elite&&e.E.goldAmt?e.E.goldAmt[0]+Math.floor(this.rng()*(e.E.goldAmt[1]-e.E.goldAmt[0]+1)):Math.max(1,Math.round((2+(e.boss?e.B.xp*.6:e.E.xp*2))*(1+.3*(st.n-1))*(1+this.run.prestige)*(e.elite?3:1)*(.7+this.rng()*.6)));
        this.loot.push({kind:'gold',x:e.x+(this.rng()*10-5),amt,t:0,big:e.boss||e.elite});}
      const iChance=e.boss?1:e.elite?.1+.01*st.n:(e.E.itemChance!=null?e.E.itemChance:.004+.0012*st.n);if(this.rng()<iChance){const it=rollItem(this.run,this.rng,e.boss?'U':null,e.boss?'boss':e.elite?'elite':'mob');if(it)this.loot.push({kind:'item',x:e.x+6,item:it,t:0});}}
    if(e.boss){this.ev('bossdown',{name:e.B.name});this.shake=1;for(const o of this.enemies)if(!o.dead){o.dead=true;this.fx.push({k:'poof',x:o.x,y:o.y-20,t:0});}}
  }
  spellRank(h,arch){const s=h.spells.find(s=>s.arch===arch);return s?s.r:0;}
  gainXp(xp){
    xp*=this.team.xp;this.stageXp+=xp;
    if(this.demo)return;
    this.run.xp=(this.run.xp||0)+xp;
    while(this.run.xp>=needRunXp(this.run.lv||0)){this.run.xp-=needRunXp(this.run.lv||0);this.run.lv=(this.run.lv||0)+1;this.run.pending=(this.run.pending||0)+1;this.ev('levelup');}
    // persistent hero XP with catch-up for heroes behind the team / the stage
    const al=this.alive();if(!al.length||!this.slot)return;
    const lv=this.heroes.map(h=>this.slot.heroes[h.key].lvl);const ref=Math.max(Math.max(...lv),1+(this.st.n-1)*1.3+this.run.prestige*12);
    for(const h of al){const H=this.slot.heroes[h.key];const cu=Math.min(5,1+.4*Math.max(0,ref-H.lvl));H.xp+=xp*1.5*h.base.xpm*cu/al.length;
      while(H.xp>=needHeroXp(H.lvl)){H.xp-=needHeroXp(H.lvl);H.lvl++;this.ev('herolevel',{key:h.key,lvl:H.lvl});this.text(h.x,this.G-70,'LV '+H.lvl,'#7dff9a',true);}}
  }
  healHero(h,amt,quiet){if(!h||!h.alive||amt<=0)return;const before=h.hp;h.hp=Math.min(h.max,h.hp+amt);if(!quiet&&h.hp-before>=1)this.text(h.x,this.G-56,'+'+Math.round(h.hp-before),'#7dff9a');}
  weakest(){const a=this.alive();return a.length?a.reduce((m,h)=>h.hp/h.max<m.hp/m.max?h:m,a[0]):null;}
  // Bleed: damage over time that ignores armor; reapplying refreshes it (doesn't stack)
  bleed(h,total,dur){const fresh=!(h.bleedT>0);h.bleedT=dur;h.bleedDps=total/dur;h.bleedTick=h.bleedTick||0;if(fresh)this.text(h.x,this.G-66,'BLEED','#ff3a4a');}
  hurtHero(h,amt,from){
    if(!h||!h.alive)return;
    if(this.rng()<h.dodge){this.text(h.x,this.G-52,'dodge','#9ae6ff');return false;}
    amt=mitigate(h,amt,'physical');
    if(h.shield>0){const s=Math.min(h.shield,amt);h.shield-=s;amt-=s;if(h.thorns&&from&&!from.dead)this.hitEnemy(from,s*.3,null,{nocrit:1,sure:1});}
    if(amt<=0)return false;
    h.hp-=amt;h.hitFlash=.12;this.text(h.x+4,this.G-52,Math.round(amt),'#ff5a5a');
    this.procs(h,'whenhit',from,amt);
    if(h.hp/h.max<.35)for(const o of this.alive())this.procs(o,'allylow',null,0,h);
    if(h.hp<=0)this.heroDown(h);
    return true;
  }
  heroDown(h){h.hp=0;h.alive=false;h.bleedT=0;this.ev('herodown',{key:h.key});this.fx.push({k:'poof',x:h.x,y:this.G-20,t:0,big:true});
    if(!this.alive().length){this.over='defeat';this.ev('defeat');}}
  procs(h,trig,e,amt,ally){
    if(ABILITIES_OFF)return;
    for(const it of h.items){if(!it.proc)continue;const P=PROCS[it.proc];if(P.t!==trig)continue;const ch=procChance(it.r)/100;const a=h.atk*h.pow;
      if(trig==='onhit'||trig==='oncrit'){if(this.rng()>ch||!e||e.dead)continue;
        if(it.proc==='ignite'){e.burn=Math.max(e.burn,a*.35);e.burnT=3;}
        if(it.proc==='spark')this.shoot(h,e,'bolt',a*.8,{});
        if(it.proc==='stunhit')e.stun=Math.max(e.stun,.6);
        if(it.proc==='critnova'){this.fx.push({k:'ring',x:e.x,y:e.y-16,r:22,t:0,c:'#ffb040'});for(const o of this.enemies)if(!o.dead&&Math.abs(o.x-e.x)<26)this.hitEnemy(o,a*.6,null,{nocrit:1});}}
      if(trig==='onkill'){if(this.rng()>ch)continue;
        if(it.proc==='killheal')for(const o of this.alive())this.healHero(o,o.max*.04);
        if(it.proc==='killraise')this.addMinion(h,h.max*.15,a*.4,8,'raise','item:'+it.card,1);}
      if(trig==='whenhit'){
        if(it.proc==='hitshield'&&this.rng()<ch){h.shield+=h.max*.08;h.shieldT=4;}
        if(it.proc==='hitthorns'&&e&&!e.dead)this.hitEnemy(e,amt*ch*1.5,null,{nocrit:1,sure:1});}
      if(trig==='allylow'&&ally&&ally.alive&&!(it.cd>0)){it.cd=20;this.healHero(ally,ally.max*(.1+ch/2));this.fx.push({k:'ring',x:ally.x,y:this.G-24,r:16,t:0,c:'#7dff9a'});}
      if(trig==='oncast'&&this.rng()<ch){h.buffT=3;}
      if(trig==='near'&&!(it.cd>0)){it.cd=6;this.fx.push({k:'ring',x:h.x+20,y:this.G-20,r:40,t:0,c:'#9ae6ff'});
        for(const o of this.enemies)if(!o.dead&&o.x-h.x<60){o.slow=Math.max(o.slow,.4+.02*it.r);o.slowT=2;this.hitEnemy(o,a*(.2+.05*it.r),null,{nocrit:1});}}
    }
  }
  // tag = which ability made it; cap = how many from that ability may be out (oldest gets replaced)
  addMinion(owner,hp,atk,life,kind,tag,cap){const f=this.front();const m={owner,hp,max:hp,atk,life,x:(f?f.x:120)+16+this.rng()*10,atkT:0,kind:kind||'spirit',taunt:false,explode:false,leech:false,
    ranged:RANGED_SUMMONERS.has(owner.key),tag:tag||kind,born:this.t};
    const same=this.minions.filter(o=>o.owner===owner&&o.tag===m.tag).sort((a,b)=>a.born-b.born);
    while(same.length>=(cap||1)){const o=same.shift();o.dead=true;this.fx.push({k:'poof',x:o.x,y:this.G-14,t:0});}
    this.minions=this.minions.filter(o=>!o.dead);this.minions.push(m);return m;}
  shoot(h,target,kind,dmg,opt){
    const mz=MUZZLE[h.key]||[10,30];const y0=this.G-mz[1];const p={kind,x:h.x+mz[0],y:y0,tx:target,dmg,src:h,spd:PSPD[kind]||160,pierce:opt.pierce||0,opt,t:0,vy:kind==='brick'?-70:0,hit:new Set()};
    this.proj.push(p);return p;
  }
  text(x,y,s,c,big){if(this.demo&&typeof s==='number'&&this.rng()<.6)return;this.texts.push({x,y,s:String(s),c,t:0,big:!!big});}
  // ---------------------------------------------------------------- spells
  cast(h,s){
    const S=SPELL[s.arch];if(S.passive)return;
    const r=Math.min(CFG.maxRank,s.r),a=h.atk*h.pow*(r>=10?1.25:1),aug={};for(const g of s.augs||[])aug[g]=1;
    const live=this.enemies.filter(e=>!e.dead&&e.x<this.W+4);
    const extra=aug.extra?1:0;let did=true;
    const onHit=(e,amt,kb)=>{const d=this.hitEnemy(e,amt,h,{execute:aug.execute,nocrit:false,kb:kb==null?1:kb});
      if(aug.burn){e.burn=Math.max(e.burn,a*.3);e.burnT=3;} if(aug.stun)e.stun=Math.max(e.stun,.6); if(aug.slow){e.slow=Math.max(e.slow,.3);e.slowT=2.5;}
      if(aug.shred)e.shred=5; if(aug.knock&&!e.boss)e.x+=18; if(aug.leech)this.healHero(this.weakest(),d*.12,true); return d;};
    const fx=(k,o)=>this.fx.push(Object.assign({k,t:0},o));
    switch(s.arch){
      case 'bolt':{if(!live.length){did=false;break;}const n=1+Math.floor(r/4)+extra;const tg=live.slice().sort((p,q)=>p.x-q.x);
        for(let i=0;i<n;i++)setTimeoutSafe(this,i*.22,()=>{if(!h.alive)return;const t=tg[i%tg.length];if(t.dead)return;this.shoot(h,t,'bolt',a*(.7+.12*r),{pierce:aug.pierce?3:0,onHit:(e,d)=>onHit(e,d,0),chain:aug.chain});});break;}
      case 'nova':{const f=this.front();if(!f||!live.length){did=false;break;}const R=(46+3*r)*h.reach;fx('ring',{x:f.x+R/2,y:this.G-22,r:R*.6,c:'#c050ff'});
        let any=false;for(const e of live)if(e.x-f.x<R){onHit(e,a*(1.2+.22*r));any=true;}this.shake=Math.max(this.shake,.2);if(!any)did=false;break;}
      case 'smite':{if(!live.length){did=false;break;}const tg=live.slice().sort((p,q)=>q.hp-p.hp);fx('beam',{x:tg[0].x,y:tg[0].y,c:'#fff4a0'});onHit(tg[0],a*(2.4+.45*r));
        if(aug.chain&&tg[1]){fx('beam',{x:tg[1].x,y:tg[1].y,c:'#fff4a0'});onHit(tg[1],a*(1.2+.22*r));}break;}
      case 'drain':{if(!live.length){did=false;break;}const n=2+Math.floor(r/3)+(aug.extra?2:0);let tot=0;const tg=live.slice().sort(()=>this.rng()-.5).slice(0,n);
        for(const e of tg){tot+=onHit(e,a*(.6+.12*r),0);fx('drain',{x:e.x,y:e.y-(e.fly?0:24),tx:h.x,c:'#ff3a5a'});}this.healHero(this.weakest(),tot*.4);break;}
      case 'summon':{const style=SUMMON_STYLE[h.key]||'replace';const tag='spell:'+s.card;const kind=h.key==='blood'?'bat':h.key==='joel'?'spore':h.key==='robots'||h.key==='mech'?'drone':h.key==='grim'||h.key==='korvold'?'raise':'spirit';
        const hp=h.max*(.18+.03*r),atk=a*(.35+.06*r);const mine=this.minions.filter(m=>m.owner===h&&m.tag===tag);const cap=(r>=10?3:r>=5?2:1)+extra;
        if((style==='empower'||style==='mend'||style==='linger')&&mine.length>=cap){
          const m=mine.sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
          if(style==='empower'&&(m.stacks||0)<3){m.stacks=(m.stacks||0)+1;m.max*=1.25;m.atk*=1.25;}
          m.hp=m.max;m.life=style==='linger'?18:10;this.fx.push({k:'ring',x:m.x,y:this.G-16,r:12,t:0,c:style==='empower'?'#ffd23f':'#7dff9a'});break;}
        if(style==='volatile')for(const o of mine.slice(0,Math.max(0,mine.length-cap+1))){o.dead=true;this.fx.push({k:'ring',x:o.x,y:this.G-16,r:26,t:0,c:'#ff8a1f'});
          for(const e of this.enemies)if(!e.dead&&Math.abs(e.x-o.x)<32)this.hitEnemy(e,o.atk*2.4,h,{nocrit:1,kb:.6});}
        this.minions=this.minions.filter(o=>!o.dead);
        const n=style==='swarm'?2:1,mult=style==='swarm'?.55:1;
        for(let i=0;i<n;i++){const m=this.addMinion(h,hp*mult,atk*mult,style==='linger'?18:10,kind,tag,style==='swarm'?cap*2:cap);
          m.taunt=!!aug.taunt||h.key==='felothar';m.explode=!!aug.explode;m.leech=!!aug.leech;m.small=style==='swarm';}break;}
      case 'regen':{const pct=.08+.014*r;if(aug.all){for(const o of this.alive())this.healHero(o,o.max*pct);}else{const w=this.weakest();if(!w||w.hp>=w.max){did=false;break;}this.healHero(w,w.max*pct);}
        if(aug.shield){h.shield+=h.max*.06;h.shieldT=5;}fx('ring',{x:h.x,y:this.G-24,r:14,c:'#7dff9a'});break;}
      case 'aegis':{for(const o of this.alive()){o.shield+=h.max*(.05+.013*r);o.shieldT=6;o.thorns=!!aug.thorns;}fx('ring',{x:h.x,y:this.G-24,r:26,c:'#9ae6ff'});break;}
      case 'freeze':{if(!live.length){did=false;break;}for(const e of live){e.slow=Math.max(e.slow,.45);e.slowT=1.6+.15*r;if(aug.stun)e.stun=Math.max(e.stun,.5);onHit(e,a*(.3+.08*r),0);}fx('frost',{});break;}
      case 'counter':{let any=false;for(const p of this.proj)if(p.enemy){p.dead=true;any=true;}for(const e of live)if(e.ranged||e.boss){e.stun=Math.max(e.stun,.6+.1*r);onHit(e,a*(.4+.1*r));any=true;}
        if(aug.shield){h.shield+=h.max*.06;h.shieldT=5;}if(!any)did=false;else fx('ring',{x:h.x+30,y:this.G-30,r:30,c:'#ffffff'});break;}
    }
    if(did){this.procs(h,'oncast');if(aug.echo&&!s._echo){const t=this;const s2=Object.assign({},s,{_echo:1,r:Math.max(1,Math.floor(r/2))});setTimeoutSafe(this,.9,()=>t.cast(h,s2));}}
    return did;
  }
  // ---------------------------------------------------------------- main step
  step(dt){
    if(this.over)return;this.t+=dt;
    const T=this;const al=this.alive();
    for(const t of this.timers||[])t.t-=dt;
    if(this.timers){for(const t of this.timers.filter(t=>t.t<=0))t.fn();this.timers=this.timers.filter(t=>t.t>0);}
    // formation
    // formation: everyone heads for their slot at their own pace; while marching, quicker heroes drift ahead and slow ones lag a little
    const avgMv=al.reduce((m,h)=>m+(MOVE[h.key]||26),0)/Math.max(1,al.length);
    al.forEach((h,i)=>{const mv=MOVE[h.key]||26;const drift=this.scroll?Math.max(-8,Math.min(10,(mv-avgMv)*.9)):0;const tx=this.home(h)+drift;
      const d=tx-h.x,st=mv*1.6*dt;h.x+=Math.abs(d)<=st?d:Math.sign(d)*st;});
    const f=this.front();if(!f)return;
    // blocking: walk unless something is close
    const near=this.enemies.filter(e=>!e.dead&&!e.fly).reduce((m,e)=>Math.min(m,e.x-(e.boss?e.w:0)-(e.ranged?40:0)),1e9);
    const blocked=(near<f.x+70||(this.boss&&!this.boss.dead))&&!(this.t-(this.lastHit||0)>3&&!(this.boss&&!this.boss.dead));
    const scroll=blocked?0:Math.max(18,Math.min(32,avgMv));this.scroll=scroll;
    if(!this.bossSpawned)this.dist+=scroll*dt;
    // spawning
    const stageDone=this.dist>=this.st.len;
    if(!stageDone){this.budget+=this.st.rate*dt*(scroll?1.15:.25);   // enemies come as you advance; only a trickle while you're held up
      const type=this.nextType||(this.nextType=this.pickType());const c=CFG.enemies[type].cost;
      if(this.budget>=c&&this.enemies.filter(e=>!e.dead).length<20){this.budget-=c;this.spawnEnemy(type);this.nextType=null;}}
    else if(this.st.boss&&!this.bossSpawned&&!this.enemies.some(e=>!e.dead))this.spawnBoss();
    else if(!this.st.boss&&!this.enemies.some(e=>!e.dead)&&!this.demo){this.over='clear';this.ev('clear');return;}
    if(this.demo&&stageDone){this.dist=0;}
    if(this.boss&&this.boss.dead&&!this.over&&!this.demo){this.over='clear';this.ev('clear');return;}
    // heroes
    for(const h of al){
      h.walkT+=dt*(scroll?(MOVE[h.key]||26)/26:0);if(h.animT>0)h.animT-=dt;if(h.hitFlash>0)h.hitFlash-=dt;if(h.buffT>0)h.buffT-=dt;
      if(h.shieldT>0){h.shieldT-=dt;if(h.shieldT<=0)h.shield=0;}
      if(h.bleedT>0){h.bleedT-=dt;h.bleedTick+=dt;if(h.bleedTick>=1||h.bleedT<=0){const d=h.bleedDps*Math.min(1,h.bleedTick);h.bleedTick=0;h.hp-=d;this.text(h.x+6,this.G-58,Math.round(d),'#c0102a');if(h.hp<=0){this.heroDown(h);continue;}}}
      for(const it of h.items)if(it.cd>0)it.cd-=dt;
      if(this.enemies.some(e=>!e.dead&&e.x-h.x<36))this.procs(h,'near');
      // signature ability
      const SG=ABILITIES_OFF?null:SIG[h.key];if(SG){h.sigT=(h.sigT==null?SG.cd*.5:h.sigT)-dt;if(h.sigT<=0){const ok=SG.fn(this,h,h.atk*h.pow);h.sigT=ok?SG.cd*(1-h.cdr):.6;if(ok){this.text(h.x,this.G-74,SG.name,'#ffd23f');this.procs(h,'oncast');}}}
      // spells
      for(const s of h.spells){if(SPELL[s.arch].passive)continue;s.cdT-=dt;if(s.cdT<=0){const ok=this.cast(h,s);s.cdT=ok?SPELL[s.arch].cd*(1-h.cdr):.5;}}
      // basic attack
      const rate=dt*h.aspd*(h.buffT>0?1.3:1);const st=h.style;
      const findT=(kind)=>{const melee=kind==='melee';const ox=melee?f.x:h.x;const range=melee?st.reach+6:(st.range||170);
        return this.enemies.filter(e=>!e.dead&&(melee?(e.x-(e.boss?e.w:0)-ox<=range&&e.x>h.x-range-8):(Math.abs(e.x-h.x)<=range))).sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0];};
      if(st.atk==='duo'){
        // partners fight independently: each has its own swing timer, target and animation
        if(h.animT2>0)h.animT2-=dt;
        h.atkT=Math.min(1,h.atkT+rate);h.atkT2=Math.min(1,(h.atkT2||0)+rate*.93);
        const ta=findT(st.a),tb=findT(st.b);
        if(ta&&h.atkT>=1){h.atkT=0;h.animT=.32;this.basic(h,ta,st.a,.6);}
        if(tb&&h.atkT2>=1){h.atkT2=0;h.animT2=.32;this.basic(h,tb,st.b,.6);}
        h.lunge=st.a==='melee'&&ta?f.x-h.x:0;h.lunge2=st.b==='melee'&&tb?f.x-h.x:0;
        if(st.companion)this.companion(h,dt,f);
      }else{
        h.atkT+=rate;const kind=st.atk==='melee'?'melee':'ranged';const tgt=findT(kind);
        h.lunge=kind==='melee'&&tgt?f.x-h.x:0;
        if(tgt&&h.atkT>=1){h.atkT=0;h.anim=1;h.animT=.32;this.basic(h,tgt);}
        if(h.atkT>1)h.atkT=1;}
    }
    this.stepZones(dt);
    for(const l of this.loot){l.t+=dt;l.x-=scroll*dt;if(l.x<=f.x+14||this.over){l.got=1;if(l.kind==='gold'){this.stageGold+=l.amt;this.text(l.x,this.G-30,'+'+l.amt,'#ffd23f');}else{this.stageItems.push(l.item);this.ev('itemdrop',{item:l.item});}}}
    this.loot=this.loot.filter(l=>!l.got);
    // minions
    for(const m of this.minions){m.life-=dt;m.atkT+=dt;if(m.animT>0)m.animT-=dt;if(m.hitFlash>0)m.hitFlash-=dt;const mi=this.minions.indexOf(m);
      // melee summons hang out ~3/4 across the screen and charge what's in front of them; ranged summons hold the middle and shoot
      const home=this.W*(m.ranged?.5:.7)+((mi%3)-1)*7;const src=m.owner.alive?{crit:m.owner.crit,scoreM:m.owner.scoreM,items:[]}:null;
      const foe=m.ranged?null:this.enemies.filter(e=>!e.dead&&!e.fly&&e.x>f.x+10).sort((p,q)=>Math.abs(p.x-home)-Math.abs(q.x-home))[0];
      const tx=foe&&Math.abs(foe.x-home)<this.W*.3?Math.max(f.x+10,foe.x-(foe.boss?foe.w:0)-14-mi*4):home;
      const md=tx-m.x,ms=MINION_SPEED*dt;m.x+=Math.abs(md)<=ms?md:Math.sign(md)*ms;m.moving=Math.abs(md)>1;
      if(m.ranged){const e=this.enemies.filter(e=>!e.dead&&e.x>m.x-20&&e.x-m.x<170).sort((p,q)=>p.x-q.x)[0];
        if(e&&m.atkT>=1.3){m.atkT=0;m.animT=.3;this.proj.push({kind:m.kind==='drone'?'plasma':'wisp',x:m.x+6,y:this.G-26,tx:e,dmg:m.atk*1.1,src,spd:PSPD[m.kind==='drone'?'plasma':'wisp'],pierce:0,opt:{},t:0,hit:new Set()});}}
      else{const e=this.enemies.filter(e=>!e.dead&&Math.abs(e.x-(e.boss?e.w:0)-m.x)<30)[0];
        if(e&&m.atkT>=1){m.atkT=0;m.animT=.3;this.fx.push({k:'slash',x:e.x-6,y:e.boss?e.y-50:e.fly?e.y:e.y-22,t:0});const d=this.hitEnemy(e,m.atk,src,{kb:.4});if(m.leech)this.healHero(this.weakest(),d*.2,true);}}
      if(m.hp<=0||m.life<=0){m.dead=true;this.fx.push({k:'poof',x:m.x,y:this.G-14,t:0});
        if(m.explode){this.fx.push({k:'ring',x:m.x,y:this.G-16,r:24,t:0,c:'#ff8a1f'});for(const e of this.enemies)if(!e.dead&&Math.abs(e.x-m.x)<30)this.hitEnemy(e,m.atk*2.2,null,{nocrit:1});}}}
    this.minions=this.minions.filter(m=>!m.dead);
    // enemies
    for(const e of this.enemies){if(e.dead)continue;
      e.walkT+=dt;if(e.hitFlash>0)e.hitFlash-=dt;if(e.animT>0)e.animT-=dt;if(e.shred>0)e.shred-=dt;
      if(e.burnT>0){e.burnT-=dt;e.hp-=e.burn*dt;if(e.hp<=0){this.kill(e,null);continue;}}
      if(e.slowT>0){e.slowT-=dt;if(e.slowT<=0)e.slow=0;}
      if(e.kbv>0){e.x+=e.kbv*dt;e.kbv=Math.max(0,e.kbv-e.kbv*8*dt-4*dt);}
      if(e.stun>0){e.stun-=dt;continue;}
      const sp=(1-e.slow);
      if(e.boss){this.bossAI(e,dt,sp,f);continue;}
      const tank=this.minions.find(m=>m.taunt)||(this.minions.length&&this.rng()<.5?this.minions[0]:null);
      const blockX=f.x+18;
      if(e.fly){
        if(!e.target||(e.target.alive===false)||e.target.dead){e.target=this.minions.length&&this.rng()<.3?this.minions[Math.floor(this.rng()*this.minions.length)]:al[Math.floor(this.rng()*al.length)];}
        const tx=e.ranged?Math.max(e.E.stop*this.W/CFG.W,f.x+90):(e.target.owner?e.target.x:this.heroX(e.target))+16,ty=this.G-40+Math.sin(this.t*3+e.phase)*8-(e.ranged?20:0);
        e.x-=scroll*dt;if(e.x>tx)e.x-=Math.min(e.x-tx,e.E.spd*sp*dt);e.y+=(ty-e.y)*Math.min(1,dt*2);
        e.atkT+=dt;if(e.atkT>=e.E.atk&&Math.abs(e.x-tx)<6){e.atkT=0;e.anim=1;e.animT=.3;
          if(e.target.owner){if(!e.ranged)this.hurtMinion(e.target,e.dmg,e);}else if(e.ranged)this.enemyShot(e,e.target);else this.hurtHero(e.target,e.dmg,e);}
      }else if(e.ranged){
        const stop=Math.max(e.E.stop*this.W/CFG.W,f.x+80);e.x-=scroll*dt;if(e.x>stop)e.x-=e.E.spd*sp*dt;e.x=Math.max(e.x,blockX);
        e.atkT+=dt;if(e.atkT>=e.E.atk&&e.x<this.W-10){e.atkT=0;e.anim=1;e.animT=.3;const t=al[Math.floor(this.rng()*al.length)];this.enemyShot(e,t);}
      }else{
        const back=al.filter(h=>!this.isMeleeHero(h));
        if(e.E.flank&&back.length&&!e.noFlank){
          // fast monsters try to slip past the front line and go for the ranged heroes
          if(!e.target||!e.target.alive||this.isMeleeHero(e.target))e.target=back[Math.floor(this.rng()*back.length)];
          const tx=this.heroX(e.target)+12;e.x-=scroll*dt;if(e.x>tx)e.x=Math.max(tx,e.x-e.E.spd*1.15*sp*dt);else if(e.x<tx-2)e.x+=e.E.spd*.5*sp*dt;
          if(Math.abs(e.x-tx)<4){e.atkT+=dt;if(e.atkT>=e.E.atk){e.atkT=0;e.anim=1;e.animT=e.E.animAtk||.3;this.hurtHero(e.target,e.dmg,e);if(e.E.leech)e.hp=Math.min(e.max,e.hp+e.dmg*e.E.leech);}}
        }else{
        const wall=this.minions.filter(m=>m.x<e.x+4&&m.x>f.x+10).reduce((b,m)=>!b||m.x>b.x?m:b,null);const bx=wall&&wall.x+12>blockX?wall.x+12:blockX;
        // reach: can hit from (body width + reach) away; it keeps shuffling in a little closer so small knockbacks don't push it out of range
        const R=e.E.reach!=null?ENEMY_BODY+e.E.reach:null;const useR=R!=null&&!(wall&&wall.x+12>blockX);
        const bx2=useR?f.x+ENEMY_BODY+e.E.reach*.6:bx;const inRange=useR?e.x<=f.x+R+.5:e.x<=bx+2;
        e.x-=scroll*dt;if(e.x>bx2)e.x=Math.max(bx2,e.x-e.E.spd*sp*dt);
        if(useR&&!inRange)e.atkT=Math.min(e.E.atk,e.atkT+dt);   // keeps its swing ready while stepping back in
        if(inRange){e.atkT+=dt;if(e.atkT>=e.E.atk){e.atkT=0;e.anim=1;e.animT=e.E.animAtk||.3;
          const heroClose=e.x-f.x<30;
          const blow=()=>{if(e.dead||e.stun>0)return;const F=this.front();if(wall&&!wall.dead&&(!heroClose||bx>blockX))this.hurtMinion(wall,e.dmg,e);else if(tank&&tank.taunt&&!tank.dead)this.hurtMinion(tank,e.dmg,e);else if(F){const d=e.E.dmgDie?(1+Math.floor(this.rng()*e.E.dmgDie))*e.dmgMul:e.dmg;const took=this.hurtHero(F,d,e);if(e.E.leech)e.hp=Math.min(e.max,e.hp+d*e.E.leech);
            const B=e.E.bleed;if(B&&took&&F.alive&&this.rng()<B.chance)this.bleed(F,B.dmg*e.dmgMul,B.dur);}};
          if(e.E.hitAt)setTimeoutSafe(this,e.E.hitAt,blow);else blow();}}
        }
      }
    }
    this.enemies=this.enemies.filter(e=>!e.dead||e.boss);
    if(this.t>180&&!this.boss){for(const e of this.enemies)if(!e.dead)e.dmg*=1+.01*dt;}   // stage dragging on: monsters grow fierce
    // projectiles
    for(const p of this.proj){p.t+=dt;
      if(p.enemy){const tx=p.tx.x,ty=this.G-30;const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);
        if(d<6||!p.tx.alive){p.dead=true;if(p.tx.alive)this.hurtHero(p.tx,p.dmg,p.src);continue;}
        p.x+=dx/d*p.spd*dt;p.y+=dy/d*p.spd*dt;continue;}
      let tg=p.tx;if(!tg||tg.dead){tg=this.enemies.filter(e=>!e.dead&&!p.hit.has(e)&&e.x>p.x-10).sort((a,b)=>a.x-b.x)[0];p.tx=tg;}
      if(!tg){p.x+=p.spd*dt;if(p.x>this.W+20)p.dead=true;continue;}
      const ty=tg.boss?tg.y-60:tg.fly?tg.y:tg.y-22;const tx=tg.x-(tg.boss?20:0);
      if(p.kind==='brick'){if(p.sx==null){p.sx=p.x;p.sy=p.y;p.T=Math.max(.35,Math.abs(tx-p.x)/p.spd);}const u=Math.min(1,p.t/p.T);
        p.x=p.sx+(tx-p.sx)*u;p.y=p.sy+(ty-p.sy)*u-34*4*u*(1-u);p.rot=(p.rot||0)+dt*14;if(u>=1){p.x=tx;p.y=ty;}}
      else{const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy)||1;p.x+=dx/d*p.spd*dt;p.y+=dy/d*p.spd*dt;}
      if(Math.abs(p.x-tx)<8&&Math.abs(p.y-ty)<(tg.boss?40:16)){
        p.hit.add(tg);const big=BIGP[p.kind]||0;const dmg=p.opt.onHit?p.opt.onHit(tg,p.dmg,0):this.hitEnemy(tg,p.dmg,p.src,{kb:big});
        if(p.splash)for(const o of this.enemies)if(o!==tg&&!o.dead&&Math.abs(o.x-tg.x)<p.splash)this.hitEnemy(o,p.dmg*.5,p.src,{nocrit:1});
        if(p.chill&&!tg.dead){tg.slow=Math.max(tg.slow,.25);tg.slowT=1.5;}
        this.fx.push({k:'spark',x:p.x,y:p.y,t:0,c:PCOL[p.kind]||'#fff'});
        if(p.opt.chain&&!p.chained){const n=this.enemies.filter(e=>!e.dead&&!p.hit.has(e)).sort((a,b)=>Math.abs(a.x-tg.x)-Math.abs(b.x-tg.x))[0];if(n){p.chained=1;p.tx=n;continue;}}
        if(p.pierce>0){p.pierce--;p.tx=null;}else p.dead=true;}
      if(p.t>4)p.dead=true;}
    this.proj=this.proj.filter(p=>!p.dead);
    // fx + text
    for(const x of this.fx)x.t+=dt;this.fx=this.fx.filter(x=>x.t<(x.life||.6));
    for(const x of this.texts){x.t+=dt;x.y-=dt*14;}this.texts=this.texts.filter(x=>x.t<.9);
    if(this.shake>0)this.shake-=dt;
  }
  basic(h,tgt,kind,mult){
    const st=h.style;kind=kind||st.atk;const die=h.base.die||6;const A=(1+Math.floor(this.rng()*die))*(h.atk/h.base.atk);   // basic attack: a fresh d6 every swing/shot (item/team damage bonuses still apply)
    if(kind==='melee'){const hits=st.double&&!ABILITIES_OFF?2:1;
      for(let i=0;i<hits;i++){this.hitEnemy(tgt,A*(i?0.8:1),h,{kb:1});}
      if(!ABILITIES_OFF)for(const o of this.enemies)if(o!==tgt&&!o.dead&&!o.fly&&Math.abs(o.x-tgt.x)<12)this.hitEnemy(o,A*.4,h,{nocrit:1});
      this.fx.push({k:'slash',x:tgt.x-6,y:tgt.boss?tgt.y-50:tgt.fly?tgt.y:tgt.y-24,t:0});return;}
    const pk=kind==='ranged'||kind==='caster'?st.proj:kind;
    setTimeoutSafe(this,.11,()=>{if(!h.alive)return;const tg=tgt.dead?this.liveE().sort((p,q)=>p.x-q.x)[0]:tgt;if(!tg)return;
    const p=this.shoot(h,tg,pk,A,{});if(st.atk==='duo')p.x=(st.companion?h.x+(h.compX||-12):h.x-9)+(MUZZLE[h.key]||[10])[0];if(!ABILITIES_OFF){p.splash=st.splash||(pk==='orb'?12:0);p.chill=st.chill;}});
  }
  // the scout roams around her partner (can't be targeted), and now and then pounces on the front enemy with a knife
  companion(h,dt,f){
    h.compT=(h.compT||0)+dt;h.pounceT=(h.pounceT==null?5:h.pounceT)-dt;
    if(h.pounce){const P=h.pounce;P.t+=dt;const u=Math.min(1,P.t/.35);
      if(P.t<.35){h.compX=P.x0+(P.tx-P.x0)*u;h.compY=Math.sin(u*Math.PI)*22;}
      else if(!P.hit){P.hit=1;if(!P.tgt.dead){this.hitEnemy(P.tgt,h.atk*1.5,h,{});this.fx.push({k:'slash',x:P.tgt.x-6,y:P.tgt.boss?P.tgt.y-50:P.tgt.fly?P.tgt.y:P.tgt.y-24,t:0});}}
      else if(P.t<.95){const v=(P.t-.6)/.35;if(v>0){h.compX=P.tx+(P.x0-P.tx)*Math.min(1,v);h.compY=Math.sin(Math.min(1,v)*Math.PI)*14;}}
      else{h.pounce=null;h.compY=0;}
      h.compV=0;return;}
    const want=-6+Math.sin(h.compT*1.3)*26+Math.sin(h.compT*3.1)*7;const prev=h.compX==null?want:h.compX;   // quick, wide patrol
    h.compX=prev+Math.max(-70*dt,Math.min(70*dt,(want-prev)*Math.min(1,dt*5)));h.compV=(h.compX-prev)/Math.max(dt,1e-3);h.compY=0;
    if(!ABILITIES_OFF&&h.pounceT<=0){const t=this.liveE().filter(e=>e.x-(e.boss?e.w:0)-f.x<50).sort((p,q)=>p.x-q.x)[0];
      if(t){h.pounce={t:0,x0:h.compX,tx:(t.x-(t.boss?t.w*.6:0))-h.x,tgt:t};h.pounceT=5;}else h.pounceT=1;}
  }
  liveE(){return this.enemies.filter(e=>!e.dead&&e.x<this.W+4);}
  sigArea(h,R,dmg,o){const f=this.front();let any=false;
    for(const e of this.liveE())if(e.x-(e.boss?e.w:0)-f.x<R&&!(o.ground&&e.fly)){this.hitEnemy(e,dmg,h,{kb:o.kb||0});if(o.slow){e.slow=Math.max(e.slow,o.slow);e.slowT=2;}any=true;}
    if(any){if(o.fx==='slash')this.fx.push({k:'slash',x:f.x+18,y:this.G-26,t:0});else if(o.fx==='frost')this.fx.push({k:'frost',t:0});else if(o.fx==='beamline')this.fx.push({k:'beamline',x:h.x,y:this.G-30,t:0,c:o.c});else this.fx.push({k:'ring',x:f.x+R/2,y:this.G-22,r:Math.min(R,80)*.7,t:0,c:o.c||'#fff'});}
    return any;}
  sigShot(h,kind,dmg,o){const t=this.liveE().sort((p,q)=>p.x-q.x)[0];if(!t)return false;const p=this.shoot(h,t,kind,dmg,{});p.splash=o.splash||0;
    p.opt.onHit=(e,d)=>{const r=this.hitEnemy(e,d,h,{kb:o.kb||0});if(o.stun)e.stun=Math.max(e.stun,o.stun);if(o.splash)for(const x of this.enemies)if(x!==e&&!x.dead&&Math.abs(x.x-e.x)<o.splash)this.hitEnemy(x,d*.5,h,{nocrit:1});return r;};
    if(h.style.atk==='duo'){p.x=(h.style.companion?h.x+(h.compX||-12):h.x-9)+(MUZZLE[h.key]||[10])[0];h.animT=.32;}return true;}
  sigMulti(h,kind,dmg,n,o){const L=this.liveE();if(!L.length)return false;for(let i=0;i<n;i++)setTimeoutSafe(this,i*.25,()=>{const M=this.liveE();if(!M.length||!h.alive)return;const p=this.shoot(h,M[Math.floor(this.rng()*M.length)],kind,dmg,{});p.splash=(o&&o.splash)||0;});return true;}
  sigChain(h,dmg,n){let L=this.liveE().sort((p,q)=>p.x-q.x);if(!L.length)return false;let prev={x:h.x,y:this.G-30};
    for(const e of L.slice(0,n)){this.fx.push({k:'zap',x:prev.x,y:prev.y,tx:e.x,ty:e.fly?e.y:e.y-24,t:0});this.hitEnemy(e,dmg,h,{});prev={x:e.x,y:e.fly?e.y:e.y-24};}return true;}
  sigFront(h,dmg,o){const f=this.front();const t=this.liveE().filter(e=>e.x-(e.boss?e.w:0)-f.x<40).sort((p,q)=>p.x-q.x)[0];if(!t)return false;
    let tot=0;for(let i=0;i<(o.hits||1);i++)tot+=this.hitEnemy(t,dmg,h,{kb:o.kb||0});if(o.stun)t.stun=Math.max(t.stun,o.stun);if(o.burn){t.burn=Math.max(t.burn,o.burn);t.burnT=3;}
    if(o.heal)this.healHero(h,tot*o.heal);this.fx.push({k:'slash',x:t.x-6,y:t.boss?t.y-50:t.y-24,t:0});h.animT=.32;return true;}
  sigMark(h,dmg){const t=this.liveE().sort((p,q)=>q.hp-p.hp)[0];if(!t)return false;t.shred=6;this.shoot(h,t,'quarrel',dmg,{});this.fx.push({k:'ring',x:t.x,y:t.boss?t.y-60:t.y-24,r:10,t:0,c:'#ffd23f'});return true;}
  sigDrain(h,dmg,n){const L=this.liveE().sort(()=>this.rng()-.5).slice(0,n);if(!L.length)return false;let tot=0;
    for(const e of L){tot+=this.hitEnemy(e,dmg,h,{});this.fx.push({k:'drain',x:e.x,y:e.y-(e.fly?0:24),tx:h.x,c:'#ff3a5a',t:0});}for(const o of this.alive())this.healHero(o,tot*.5/this.alive().length);return true;}
  enemyShot(e,t){if(!t)return;this.proj.push({enemy:true,kind:e.E?e.E.proj:'bat',x:e.x-8,y:e.fly?e.y:e.y-30,tx:t,dmg:e.dmg,src:e,spd:150,t:0});}
  bossAI(b,dt,sp,f){
    const al=this.alive();const k=b.type;b.walkT+=dt;b.age=(b.age||0)+dt;if(b.age>90&&!b.enraged){b.enraged=1;this.ev('enrage');}if(b.enraged)b.dmg*=1+.012*dt;   // enrage after 90s so fights always end
    const stop=k==='maw'?Math.max(f.x+b.w+30,this.W-96):f.x+b.w+(k==='countess'?14:18);
    if(b.x>stop)b.x-=Math.max(18,b.B.spd)*sp*dt*(k==='maw'?2.2:1.6);
    if(k==='countess')b.y=this.G-40+Math.sin(this.t*1.6)*10;
    b.t1-=dt;b.t2-=dt;b.t3-=dt;
    if(ABILITIES_OFF){b.t2=b.t3=b.t4=99;}   // bosses keep only their basic attack while abilities are rebuilt
    if(b.x>stop+4)return;
    if(k==='gravelord'){
      if(b.t1<=0){b.t1=2.2;b.anim=1;b.animT=.5;this.hurtHero(f,b.dmg,b);}
      if(b.t2<=0){b.t2=7;b.anim=1;b.animT=.6;this.zone(f.x-14,34,1.3,b.dmg*1.1,b,'slam','#a6ff2e');}
      if(b.t3<=0){b.t3=9;for(let i=0;i<3;i++)this.spawnEnemy('zombie',{x:b.x+10+i*12,hp:CFG.enemies.zombie.hp*this.st.hpMul*.8,max:CFG.enemies.zombie.hp*this.st.hpMul*.8});}
    }else if(k==='countess'){
      if(b.t1<=0){b.t1=1.3;b.anim=1;b.animT=.4;for(let i=0;i<2;i++){const t=al[Math.floor(this.rng()*al.length)];this.proj.push({enemy:true,kind:'batswarm',x:b.x-20,y:b.y-60,tx:t,dmg:b.dmg*.55,src:b,spd:130+i*30,t:0});}}
      if(b.t2<=0){b.t2=8;b.anim=1;b.animT=.6;let tot=0;for(const h of al){const d=b.dmg*.5;this.hurtHero(h,d,b);tot+=d;}b.hp=Math.min(b.max,b.hp+tot*.5);this.fx.push({k:'drainall',t:0,x:b.x,y:b.y-60});}
      b.t4=(b.t4==null?4:b.t4)-dt;if(b.t4<=0){b.t4=6;for(let i=0;i<2;i++){const t=al[Math.floor(this.rng()*al.length)];this.zone(t.x+(this.rng()*12-6),17,1.1,b.dmg*.9,b,'bloodrain','#ff2a3a');}}
      if(b.t3<=0){b.t3=10;for(let i=0;i<3;i++)this.spawnEnemy('zombie',{x:b.x+i*10});}
    }else{
      if(b.t1<=0){b.t1=2.6;b.anim=1;b.animT=.5;const t=al[Math.floor(this.rng()*al.length)];this.zone(t.x,15,1.0,b.dmg*1.25,b,'tentacle','#c050ff');}
      if(b.t2<=0){b.t2=7.5;b.anim=1;b.animT=.8;this.shake=.4;this.fx.push({k:'beamall',t:0,x:b.x,y:b.y-70});for(const h of al)this.hurtHero(h,b.dmg*.6,b);}
      if(b.t3<=0){b.t3=6.5;for(let i=0;i<2;i++)this.spawnEnemy('zombie',{x:b.x-30+i*10});}
    }
  }
  // ---- telegraphed danger zones: marked on the ground, then they hit whoever is still inside
  zone(cx,hw,T,dmg,src,kind,c){const z={cx,hw,T,t:0,dmg,src,kind,c};(this.zones=this.zones||[]).push(z);
    for(const h of this.alive()){const hx=this.heroX(h);if(Math.abs(hx-cx)>hw+4)continue;
      // Reflex helps, never guarantees: reaction chance has diminishing returns (tops out ~65%), reaction time jitters, and the step can come up short
      const R=h.base.reflex||8;if(this.rng()<.65*(1-Math.exp(-R/12))){const delay=Math.max(.15,.7-.025*R)+this.rng()*.45;
        const need=hx<cx?-(hw+8-(cx-hx)):(hw+8-(hx-cx));const out=need*(.7+this.rng()*.6);h.dodge={at:this.t+delay,dx:(h.dodgeX||0)+out,until:this.t+T+.5,spd:70+R*5};}}
    return z;}
  hurtMinion(m,amt,from){if(!m||m.dead)return;m.hp-=amt;m.hitFlash=.12;this.text(m.x,this.G-40,Math.round(amt),'#ffb0b0');}
  heroX(h){return h.x+(h.dodgeX||0)+(h.wanderX||0);}   // where a hero actually stands right now
  stepZones(dt){
    // beat-'em-up shuffle: everyone drifts a little on their own (bigger while standing and fighting) — can carry them clear of danger by luck
    for(const h of this.heroes){if(!h.alive)continue;const ph=(h.key.length*1.7)%6.3;const amp=this.scroll?3:7;
      h.wanderX=Math.sin(this.t*1.1+ph)*amp+Math.sin(this.t*2.7+ph*2)*amp*.45;}
    if(!this.zones)return;for(const h of this.heroes){if(!h.alive)continue;h.dodgeX=h.dodgeX||0;
      if(h.dodge&&this.t>=h.dodge.at){const tgt=this.t<h.dodge.until?h.dodge.dx:0;const d=tgt-h.dodgeX,st=h.dodge.spd*dt;h.dodgeX+=Math.abs(d)<=st?d:Math.sign(d)*st;h.dodging=Math.abs(d)>1;if(this.t>=h.dodge.until&&Math.abs(h.dodgeX)<.5){h.dodge=null;h.dodgeX=0;}}
      else if(!h.dodge&&h.dodgeX){h.dodgeX*=Math.max(0,1-dt*4);}}
    for(const z of this.zones){z.t+=dt;if(z.t>=z.T&&!z.done){z.done=1;this.shake=Math.max(this.shake,.3);
      this.fx.push(z.kind==='tentacle'?{k:'tentacle',x:z.cx,y:this.G,t:0}:{k:'ring',x:z.cx,y:this.G-4,r:z.hw*1.4,t:0,c:z.c});
      for(const h of this.alive()){const hx=this.heroX(h);if(Math.abs(hx-z.cx)<=z.hw)this.hurtHero(h,z.dmg,z.src);else if(Math.abs(hx-z.cx)<z.hw+12)this.text(hx,this.G-62,'dodged','#9ae6ff');}}}
    this.zones=this.zones.filter(z=>z.t<z.T+.25);}
  // snapshot what carries to the save point
  saveBack(){for(const h of this.heroes){const sv=this.run.heroes[h.key];sv.hpf=h.alive?h.hp/h.max:0;sv.dead=!h.alive;sv.spells=h.spells.map(s=>({card:s.card,arch:s.arch,r:s.r,augs:s.augs||[]}));}}
}
function setTimeoutSafe(g,t,fn){(g.timers=g.timers||[]).push({t,fn});}
const BIGP={};
// where shots leave each hero (px ahead of the hero's x, px above the ground), matched to the strike frame
const MUZZLE={vile:[3,30],thing:[14,30],kykar:[15,46],dragons:[18,38],mathas:[17,33],marina:[11,25],thranduil:[12,34],joel:[11,33],robots:[18,33],blood:[13,46],mech:[20,30],weather:[14,47]};
const PSPD={arrow:200,quarrel:215,bolt:150,orb:135,fire:150,shard:160,zap:170,wisp:120,plasma:180,blood:140,shell:160,frost:145,brick:190};   // px/s   // ranged shots don't shove, except the thrown brick (a little)
const PCOL={skull:'#7dff9a',hex:'#c050ff',bolt:'#ffb040',orb:'#c050ff',arrow:'#e8e0c8',quarrel:'#e8e0c8',fire:'#ff8a1f',shard:'#6ff0ff',zap:'#bfefff',wisp:'#7dff9a',plasma:'#3ff0ff',blood:'#ff2a3a',shell:'#ffd23f',frost:'#9ae6ff',brick:'#c0603a'};

// ======================================================================= RUN / PICKS (pure)
function newRun(team,slot){
  if(slot){slot.partySize=slot.strangerSaved&&!slot.forsook?3:2;team=team.slice(0,slot.partySize);}
  const run={team:team.slice(),stage:1,prestige:0,score:0,xp:0,lv:0,pending:0,rerolls:1,heroes:{},bag:[]};
  for(const k of team){const d=heroDef(k);run.heroes[k]={hpf:1,dead:false,spells:ABILITIES_OFF?[]:[{card:d.spells[0].card,arch:d.spells[0].arch,r:1,augs:[]}],items:[]};}
  return run;
}
function rollRarity(rng,luck,prestige,min){
  const R=CFG.rarity.filter(r=>!(r.minPrestige>prestige));let tot=0;const ws=R.map((r,i)=>{const w=r.w*(i?1+luck*.025:1);tot+=w;return w;});
  let x=rng()*tot;let pick=R[0];for(let i=0;i<R.length;i++){x-=ws[i];if(x<=0){pick=R[i];break;}}
  if(min&&CFG.rarity.indexOf(pick)<CFG.rarity.findIndex(r=>r.id===min))pick=CFG.rarity.find(r=>r.id===min);
  return pick;
}
// ---- loadout: per-hero slots grow with the hero's permanent level; a shared 6-space backpack holds the rest
function slotCaps(lvl){lvl=lvl||1;return {active:lvl>=12?4:lvl>=5?3:2,passive:lvl>=8?2:1,item:CFG.slots.item};}
const BAG_SIZE=6;
function typeOf(e){return e.kind==='item'||ITEM[e.arch]&&!SPELL[e.arch]?'item':SPELL[e.arch].passive?'passive':'active';}
function heroLvl(slot,k){return (slot&&slot.heroes[k]||{lvl:1}).lvl;}
function countType(hv,t){return t==='item'?hv.items.length:hv.spells.filter(s=>!!SPELL[s.arch].passive===(t==='passive')).length;}
function findEntry(run,o){   // equipped on its hero, then the bag
  const hv=run.heroes[o.hero];const list=o.slot==='spell'?hv.spells:hv.items;let e=list.find(x=>x.card===o.card);if(e)return {e,list};
  for(const k of run.team){const L=o.slot==='item'?run.heroes[k].items:[];e=L.find(x=>x.card===o.card&&x.from===o.hero);if(e)return {e,list:L};}
  run.bag=run.bag||[];e=run.bag.find(x=>x.card===o.card&&x.owner===o.hero&&(o.slot==='item')===(x.kind==='item'));return e?{e,list:run.bag,bag:1}:null;}
function owned(run,hk,card,slot){return !!findEntry(run,{hero:hk,card,slot});}
function offers(run,rng,n,opt){
  if(ABILITIES_OFF)return [];
  rng=rng||Math.random;opt=opt||{};const out=[];run.bag=run.bag||[];
  const luck=run.team.reduce((m,k)=>m+heroBase(k,1,3).luck,0)/run.team.length+Object.values(run.heroes).reduce((m,h)=>m+h.spells.filter(s=>s.arch==='insight').reduce((a,s)=>a+s.r,0)+h.items.filter(i=>i.arch==='charm').reduce((a,i)=>a+i.r,0),0);
  const pool=[];const room=run.bag.length<BAG_SIZE;
  for(const k of run.team){const d=heroDef(k),hv=run.heroes[k];
    for(const s of d.spells)if(!owned(run,k,s.card,'spell'))pool.push({kind:'new',slot:'spell',hero:k,card:s.card,arch:s.arch,w:1.1});
    const mine=[...hv.spells.map(e=>['spell',e]),...run.bag.filter(b=>b.owner===k&&b.kind!=='item').map(e=>['spell',e])];   // level-ups are skills only; items come from drops and the merchant
    for(const [sl,e] of mine){if(e.r<CFG.maxRank)pool.push({kind:'up',slot:sl,hero:k,card:e.card,arch:e.arch,w:sl==='spell'?1.5:1.2});
      if(sl==='spell'){const A=SPELL[e.arch].augs.filter(g=>!(e.augs||[]).includes(g));if(A.length&&(e.augs||[]).length<1+Math.floor(e.r/4))pool.push({kind:'aug',slot:'spell',hero:k,card:e.card,arch:e.arch,aug:A[Math.floor(rng()*A.length)],w:.8});}}}
  const used=new Set();
  while(out.length<(n||3)&&pool.length){let tot=pool.reduce((m,p)=>m+p.w,0),x=rng()*tot,i=0;for(;i<pool.length;i++){x-=pool[i].w;if(x<=0)break;}
    const p=pool.splice(Math.min(i,pool.length-1),1)[0];const key=p.hero+p.card+p.kind;if(used.has(key))continue;used.add(key);
    if(opt.blessed){const L=CFG.rarity.find(r=>r.id==='L');const roll=rng()*100;const canL=!(L.minPrestige>run.prestige);   // blessed: 55% Uncommon, 40% Rare, 5% Legendary once unlocked
      p.rar=CFG.rarity.find(r=>r.id===(canL&&roll>=95?'L':roll>=55?'R':'U'));p.blessed=1;}
    else p.rar=rollRarity(rng,luck+(opt.luck||0),run.prestige,opt.min||(p.kind==='aug'?'U':null));out.push(p);}
  return out;
}
// returns 'ok' (equipped or bagged) or 'full' (no slot and no bag room: caller asks what to drop)
function applyOffer(run,o,slot){
  run.bag=run.bag||[];const hv=run.heroes[o.hero];
  if(o.kind==='new'){const e={card:o.card,arch:o.arch,r:o.rar.pts,augs:[]};if(o.slot==='item'){e.proc=procFor(o.card);e.from=o.hero;}
    const t=o.slot==='item'?'item':SPELL[o.arch].passive?'passive':'active';const cap=slotCaps(heroLvl(slot,o.hero))[t];
    if(countType(hv,t)<cap)(o.slot==='spell'?hv.spells:hv.items).push(e);
    else if(run.bag.length<BAG_SIZE)run.bag.push(Object.assign(e,{owner:o.hero,kind:o.slot==='item'?'item':'spell'}));
    else return 'full';}
  else{const f=findEntry(run,o);if(!f)return 'ok';const e=f.e;if(o.kind==='up')e.r=Math.min(CFG.maxRank,e.r+o.rar.pts);else{(e.augs=e.augs||[]).push(o.aug);e.r=Math.min(CFG.maxRank,e.r+o.rar.pts-1);}}
  run.pending=Math.max(0,run.pending-1);return 'ok';
}
// ---- gold + items: items come from drops and the merchant (not level-ups)
function teamItemPool(run){const out=[];for(const k of run.team)for(const it of heroDef(k).items)if(!owned(run,k,it.card,'item'))out.push({hero:k,card:it.card,arch:it.arch});return out;}
// source caps keep the best gear off basic mobs: mob ≤ Uncommon, elite ≤ Rare, boss/merchant can reach Legendary (once unlocked)
const SRC_CAP={mob:'U',elite:'R',boss:'L',shop:'L'};
function itemTier(run){return Math.round(.6*run.stage)+9*(run.prestige||0);}
function rollItem(run,rng,min,src){const pool=teamItemPool(run);if(!pool.length)return null;const p=pool[Math.floor(rng()*pool.length)];
  // odds climb with depth (stage + 9 per prestige); each source has its own table and cap
  const depth=itemTier(run),x=rng(),Lok=!(RAR('L').minPrestige>run.prestige);let id;
  if(src==='shop'||src==='boss'){const pL=Lok?Math.min(.12,.03+.004*depth):0,pR=Math.min(.6,(src==='shop'?.28:.22)+.02*depth);id=x<pL?'L':x<pL+pR?'R':'U';}
  else if(src==='elite'){const pR=Math.min(.35,.06+.012*depth),pU=.45;id=x<pR?'R':x<pR+pU?'U':'C';}
  else{const pU=Math.min(.5,.2+.015*depth);id=x<pU?'U':'C';}
  if(min&&CFG.rarity.findIndex(r=>r.id===id)<CFG.rarity.findIndex(r=>r.id===min))id=min;
  const rar=RAR(id);
  return {hero:p.hero,card:p.card,arch:p.arch,rar:rar.id,tier:depth};}
// Gear Score: rank (rarity + honing) and how deep it was found
function gearScore(e){return Math.round(10*(e.r||1)+4*(e.tier||1));}
function heroGear(hv){return hv.items.reduce((m,e)=>m+gearScore(e),0);}
const RAR=id=>CFG.rarity.find(r=>r.id===id)||CFG.rarity[0];
function itemPrice(rarId,stage){return Math.round({C:45,U:110,R:260,L:700}[rarId]*(1+.108*((stage||1)-1)));}
function honePrice(r,stage){return Math.round(30*(r+1)*(1+.072*((stage||1)-1)));}
function sellValue(it){return Math.round(12*(it.r||1));}
// put an item on its hero / any hero with room, else the bag; returns false if nowhere fits
function giveItem(run,slot,it){run.bag=run.bag||[];const e={card:it.card,arch:it.arch,r:RAR(it.rar).pts,augs:[],proc:procFor(it.card),from:it.hero,tier:it.tier||run.stage,rar:it.rar};
  const order=[it.hero,...run.team.filter(k=>k!==it.hero)];
  for(const k of order){const hv=run.heroes[k];if(hv.items.length<slotCaps(heroLvl(slot,k)).item){hv.items.push(e);return k;}}
  if(run.bag.length<BAG_SIZE){run.bag.push(Object.assign(e,{owner:it.hero,kind:'item'}));return 'bag';}return false;}
function stockShop(run,rng,n){rng=rng||Math.random;const items=[];const used=new Set();for(let i=0;i<(n||4);i++){const it=rollItem(run,rng,'U','shop');if(!it||used.has(it.card))continue;used.add(it.card);items.push(it);}run.shop={stage:run.stage,items};return run.shop;}
// camp actions
function unequip(run,hk,slotName,idx){run.bag=run.bag||[];if(run.bag.length>=BAG_SIZE)return false;const hv=run.heroes[hk];const L=slotName==='item'?hv.items:hv.spells;if(slotName!=='item'&&L.length<=1)return false;
  const e=L.splice(idx,1)[0];run.bag.push(Object.assign(e,{owner:slotName==='item'?(e.from||hk):hk,kind:slotName==='item'?'item':'spell'}));return true;}
function equip(run,slot,bagIdx,hk){const e=run.bag[bagIdx];if(!e)return false;if(e.kind!=='item'&&e.owner!==hk)return false;const hv=run.heroes[hk];const t=typeOf(e);
  if(countType(hv,t)>=slotCaps(heroLvl(slot,hk))[t])return false;run.bag.splice(bagIdx,1);const c=Object.assign({},e);delete c.owner;delete c.kind;(t==='item'?hv.items:hv.spells).push(c);return true;}
function discard(run,where,hk,idx){if(where==='bag'){run.bag.splice(idx,1);return;}const hv=run.heroes[hk];(where==='item'?hv.items:hv.spells).splice(idx,1);}
function describe(o,run,slot){
  const f=findEntry(run,o);const cur=f&&f.e;
  const r0=cur?cur.r:0,r1=o.kind==='new'?o.rar.pts:Math.min(CFG.maxRank,r0+(o.kind==='aug'?o.rar.pts-1:o.rar.pts));
  const b=heroBase(o.hero,heroLvl(slot,o.hero),run.team.length);const a=b.atk*b.pow;const fake={max:b.hp};
  const augs={};for(const g of (cur&&cur.augs)||[])augs[g]=1;if(o.kind==='aug')augs[o.aug]=1;
  let txt;if(o.slot==='spell')txt=SPELL[o.arch].txt(r1,a,{aug:augs},fake,o.hero);else{txt=ITEM[o.arch].txt(r1);const pr=cur?cur.proc:procFor(o.card);if(pr)txt+='. '+PROCS[pr].txt(procChance(r1));}
  let where='';if(o.kind==='new'){const t=o.slot==='item'?'item':SPELL[o.arch].passive?'passive':'active';const hv=run.heroes[o.hero];where=countType(hv,t)<slotCaps(heroLvl(slot,o.hero))[t]?'Equips now':'Goes to the backpack';}
  return {r0,r1,txt,augs:Object.keys(augs),where};
}

// ======================================================================= SAVES
const SKEY='podrundown-crawl-v1';
const Save={
  load(){try{return JSON.parse(localStorage.getItem(SKEY))||{v:1,players:{}};}catch(e){return {v:1,players:{}};}},
  write(d){try{localStorage.setItem(SKEY,JSON.stringify(d));}catch(e){}},
  pinHash(p,pin){return String(strHash('crypt:'+p+':'+pin+':pod'));},
};
const SAVE_EPOCH=1;   // bump only for a change so big that runs in progress can't be carried over (hero levels still stay)
function migrateSlot(slot,player){
  for(const h of DATA.heroes)if(h.owner===player&&!slot.heroes[h.key])slot.heroes[h.key]={lvl:1,xp:0};
  for(const k of Object.keys(slot.heroes))if(!heroDef(k))delete slot.heroes[k];
  slot.best=slot.best||{score:0,stage:0,prestige:0};slot.gold=slot.gold||0;
  slot.partySize=slot.strangerSaved&&!slot.forsook?3:2;   // the third spot opens only by saving the stranger
  const run=slot.run;if(!run)return slot;
  if((slot.epoch||1)!==SAVE_EPOCH){slot.run=null;slot.epoch=SAVE_EPOCH;return slot;}
  run.team=run.team.filter(k=>heroDef(k));if(!run.team.length){slot.run=null;return slot;}
  if(run.team.length>(run.strangerJoined?3:2)){for(const k of run.team.slice(run.strangerJoined?3:2))delete run.heroes[k];run.team=run.team.slice(0,run.strangerJoined?3:2);}
  for(const k of run.team){const d=heroDef(k);const hv=run.heroes[k]=run.heroes[k]||{hpf:1,dead:false,spells:[],items:[]};
    const fix=(list,pool)=>{const out=[];for(const e of list){let m=pool.find(x=>x.card===e.card&&x.arch===e.arch)||pool.find(x=>x.card===e.card);
        if(!m)m=pool.find(x=>x.arch===e.arch&&!out.some(o=>o.card===x.card)&&!list.some(o=>o.card===x.card));
        if(!m)m=pool.find(x=>!out.some(o=>o.card===x.card)&&!list.some(o=>o.card===x.card));
        if(m)out.push(Object.assign({},e,{card:m.card,arch:m.arch,augs:(e.augs||[]).filter(g=>SPELL[m.arch]&&SPELL[m.arch].augs.includes(g)),r:Math.min(CFG.maxRank,e.r||1)}));}
      return out;};
    hv.spells=fix(hv.spells||[],d.spells);hv.items=fix(hv.items||[],d.items).slice(0,CFG.slots.item).map(it=>Object.assign(it,{proc:procFor(it.card),augs:[]}));
    if(!hv.spells.length)hv.spells=[{card:d.spells[0].card,arch:d.spells[0].arch,r:1,augs:[]}];}
  for(const k of Object.keys(run.heroes))if(!run.team.includes(k))delete run.heroes[k];
  run.bag=(run.bag||[]).filter(b=>heroDef(b.owner)&&(b.kind==='item'?heroDef(b.owner).items:heroDef(b.owner).spells).some(x=>x.card===b.card)).slice(0,BAG_SIZE);
  if(run.stage>CFG.maxStage)run.stage=CFG.maxStage;
  return slot;}
function newSlot(player){const heroes={};for(const h of DATA.heroes)if(h.owner===player)heroes[h.key]={lvl:1,xp:0};return {epoch:SAVE_EPOCH,partySize:2,gold:0,heroes,best:{score:0,stage:0,prestige:0},runs:0,run:null,created:Date.now()};}

// ======================================================================= exports for node sims
const API={ABILITIES_OFF,armorReduction,HP_PER_STAMINA,gearScore,heroGear,giveItem,rollItem,stockShop,itemPrice,honePrice,slotCaps,equip,unequip,discard,typeOf,BAG_SIZE,migrateSlot,CFG,STYLE,SIG,SPELL,ITEM,PROCS,Game,newRun,offers,applyOffer,describe,heroBase,heroDef,DATA,newSlot,needHeroXp};
if(typeof module!=='undefined'&&module.exports){module.exports=API;}
if(typeof document==='undefined')return;

// ======================================================================= UI (browser only)
const IMG=new Image();IMG.src='crawl.png?v=1793372409';const BGI=new Image();BGI.src='crawl_bg.png?v=1793372409';
const SP=ATLAS.sprites,BGA=ATLAS.bg,RES=ATLAS.res||1;const UNITS=ATLAS.units||{};const UIMG=new Image();UIMG.src='crawl_units.png?v=1793372409';
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>Math.round(n).toLocaleString('en-US');
// ---------------------------------------------------------------- sound (tiny WebAudio blips)
let AC=null,muted=false;try{muted=localStorage.getItem('podrundown-crawl-mute')==='1';}catch(e){}
function sfx(k){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;
  const tone=(f,d,type,v,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(v||.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d);};
  if(k==='hit')tone(180,.06,'square',.025,90);if(k==='crit')tone(520,.1,'square',.04,180);
  if(k==='level'){[523,659,784,1046].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='square';o.frequency.value=f;g.gain.setValueAtTime(.04,t+i*.07);g.gain.exponentialRampToValueAtTime(.0001,t+i*.07+.12);o.connect(g);g.connect(AC.destination);o.start(t+i*.07);o.stop(t+i*.07+.13);});}
  if(k==='boss')tone(70,1.2,'sawtooth',.08,40);if(k==='clear')tone(392,.5,'triangle',.07,784);if(k==='die')tone(220,.6,'sawtooth',.06,55);
}catch(e){}}
// ---------------------------------------------------------------- pixel font (3x5) for numbers + a few letters
const FONT={'0':'111101101101111','1':'010110010010111','2':'111001111100111','3':'111001111001111','4':'101101111001001','5':'111100111001111','6':'111100111101111','7':'111001010010010','8':'111101111101111','9':'111101111001111','+':'000010111010000',
  'm':'000111111101101','i':'010000010010010','s':'011100010001110','d':'001001111101111','o':'000111101101111','g':'111101111001110','e':'111101111100111','L':'100100100100111','V':'101101101101010',' ':'000000000000000','x':'000101010101000'};
function ptext(ctx,s,x,y,col,sc){sc=sc||1;
  if([...s].some(ch=>!FONT[ch])){ctx.save();ctx.font=`${8*sc}px "Press Start 2P",monospace`;ctx.textAlign='center';ctx.textBaseline='top';ctx.fillStyle='#0c0810';ctx.fillText(s.toUpperCase(),Math.round(x)+1,Math.round(y)+1);ctx.fillStyle=col;ctx.fillText(s.toUpperCase(),Math.round(x),Math.round(y));ctx.restore();return;}const w=s.length*4*sc;let cx=Math.round(x-w/2);y=Math.round(y);
  for(const ch of s){const g=FONT[ch];if(g){ctx.fillStyle='#0c0810';for(let i=0;i<15;i++)if(g[i]==='1')ctx.fillRect(cx+(i%3)*sc+sc,y+Math.floor(i/3)*sc+sc,sc,sc);
    ctx.fillStyle=col;for(let i=0;i<15;i++)if(g[i]==='1')ctx.fillRect(cx+(i%3)*sc,y+Math.floor(i/3)*sc,sc,sc);}cx+=4*sc;}}
// ---------------------------------------------------------------- renderer
function spr(ctx,name,fr,x,y,flip,alpha,flash){const a=SP[name];if(!a)return;const [sx,sy,w,h,n]=a;fr=Math.max(0,Math.min(n-1,fr|0));const dw=w/RES,dh=h/RES;
  const X=Math.round(x*RES)/RES,Y=Math.round(y*RES)/RES;
  ctx.save();if(alpha!=null)ctx.globalAlpha=alpha;
  if(flip){ctx.translate(X+dw,Y);ctx.scale(-1,1);ctx.drawImage(IMG,sx+fr*w,sy,w,h,0,0,dw,dh);}
  else ctx.drawImage(IMG,sx+fr*w,sy,w,h,X,Y,dw,dh);
  if(flash>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,flash*6)*.7;if(flip)ctx.drawImage(IMG,sx+fr*w,sy,w,h,0,0,dw,dh);else ctx.drawImage(IMG,sx+fr*w,sy,w,h,X,Y,dw,dh);}
  ctx.restore();}
const FW=a=>a[2]/RES,FH=a=>a[3]/RES;
// new hand-picked unit sprites: one image per frame strip, drawn with the feet on the ground line
function unitFrame(e,U){const A=e.animT>0&&U.atk?U.atk:U.walk;let fr;
  if(A===U.atk){const dur=e.E.animAtk||.3;fr=Math.min(A.n-1,Math.floor((1-e.animT/dur)*A.n));}else fr=Math.floor(e.walkT*7)%A.n;return [A,fr];}
function drawUnit(ctx,A,fr,x,gy,sc,alpha,flash,rot){if(!UIMG.complete)return;ctx.save();ctx.translate(Math.round(x*RES)/RES,Math.round(gy*RES)/RES);if(rot)ctx.rotate(rot);ctx.scale(sc,sc);if(alpha!=null)ctx.globalAlpha=alpha;
  const sx=A.x+fr*A.fw;ctx.drawImage(UIMG,sx,A.y,A.fw,A.fh,-A.ax,-A.ay-1,A.fw,A.fh);
  if(flash>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,flash*6)*.7;ctx.drawImage(UIMG,sx,A.y,A.fw,A.fh,-A.ax,-A.ay-1,A.fw,A.fh);}ctx.restore();}
function drawBG(ctx,g,W,oy){
  // layered parallax backdrops (Ansimuz packs): each layer scrolls at its own speed, the walking path at full speed
  const b=BGA[g.st.biome.id]||BGA.grave;const d=g.dist+(g.demo?g.t*8:0);
  ctx.fillStyle=b.fill;ctx.fillRect(0,0,W,CFG.H);
  for(const L of b.layers){const y=L.y-oy;const r=L.r;
    if(L.tile){const off=((d*L.sp)%L.tile+L.tile)%L.tile;for(let x=-off;x<W;x+=L.tile)ctx.drawImage(BGI,r[0],r[1],r[2],r[3],Math.round(x*RES)/RES,y,L.w,L.h);}
    else{const o=L.once;let x=o.x-d*L.sp;if(o.period){const P=o.period+L.w;x=((x%P)+P)%P-L.w;}if(x<W&&x+L.w>0)ctx.drawImage(BGI,r[0],r[1],r[2],r[3],Math.round(x*RES)/RES,y,L.w,L.h);}}
}
// projectiles: larger, readable shapes with a soft glow and a short trail
function glow(ctx,x,y,r,c,a){ctx.globalAlpha=a;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.globalAlpha=1;}
function drawProj(ctx,p,x,y,c,t){const k=p.kind;
  if(k==='shard'||k==='frost'){glow(ctx,x,y,6,c,.18);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x+5,y);ctx.lineTo(x,y-3);ctx.lineTo(x-6,y);ctx.lineTo(x,y+3);ctx.fill();ctx.fillStyle='#ffffff';ctx.fillRect(x,y-1,3,1);return;}
  if(k==='plasma'){glow(ctx,x,y,6,c,.2);ctx.fillStyle=c;ctx.fillRect(x-6,y-2,9,4);ctx.fillStyle='#e8ffff';ctx.fillRect(x-3,y-1,6,2);return;}
  if(k==='shell'){ctx.fillStyle='#2a2a30';ctx.beginPath();ctx.arc(x,y,3,0,7);ctx.fill();ctx.fillStyle=(Math.floor(t*20)%2)?'#ffd23f':'#ff7a1a';ctx.fillRect(x-4,y-3,2,2);return;}
  if(k==='fire'){for(let i=0;i<3;i++)glow(ctx,x-i*4,y+(i%2),4-i,i?'#ff5a1a':'#ffb040',.7-i*.2);ctx.fillStyle='#fff4b0';ctx.fillRect(x-1,y-1,2,2);return;}
  if(k==='wisp'){glow(ctx,x,y,5,c,.25);ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,3,0,7);ctx.fill();ctx.fillRect(x-7,y-1+Math.round(Math.sin(t*12)),5,2);ctx.fillStyle='#0c1a10';ctx.fillRect(x,y-1,1,1);ctx.fillRect(x+2,y-1,1,1);return;}
  if(k==='zap'){glow(ctx,x,y,6,c,.22);ctx.strokeStyle='#e8ffff';ctx.beginPath();ctx.moveTo(x-7,y);ctx.lineTo(x-4,y-2);ctx.lineTo(x-1,y+1);ctx.lineTo(x+3,y-1);ctx.stroke();ctx.fillStyle=c;ctx.fillRect(x+2,y-2,3,3);return;}
  // orbs: bolt, orb, blood, skull, hex and anything else
  glow(ctx,x,y,7,c,.16);glow(ctx,x-4,y,3,c,.35);ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,3.2,0,7);ctx.fill();ctx.fillStyle='#ffffff';ctx.fillRect(x-1,y-1,2,2);
}
function shadow(ctx,x,y,w){ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(Math.round(x),Math.round(y),w,2.5,0,0,7);ctx.fill();}
const MINI={bat:'e_bat',spirit:'e_ghost',raise:'e_skeleton',spore:'e_spawn',drone:'e_eye'};
function drawGame(ctx,g,W,oy){
  ctx.setTransform(RES,0,0,RES,0,0);ctx.imageSmoothingEnabled=false;ctx.save();
  if(g.shake>0)ctx.translate(Math.round((Math.random()-.5)*4*g.shake),Math.round((Math.random()-.5)*3*g.shake));
  drawBG(ctx,g,W,oy);ctx.translate(0,-oy);const G=g.G;
  for(const l of g.loot||[]){const x=Math.round(l.x),y=G-1;
    if(l.kind==='gold'){const n=l.big?7:4;ctx.fillStyle='#7a5a10';ctx.fillRect(x-n,y-2,n*2,2);ctx.fillStyle='#d9a836';for(let i=0;i<n;i++)ctx.fillRect(x-n+1+i*2,y-3-(i%2),2,2);ctx.fillStyle='#ffe27a';ctx.fillRect(x-1,y-5,2,2);
      if(Math.floor(g.t*4+l.x)%3===0){ctx.fillStyle='#ffffff';ctx.fillRect(x+2,y-7,1,1);}}
    else{const c=(CFG.rarity.find(r=>r.id===l.item.rar)||CFG.rarity[0]).col;const by=Math.round(Math.sin(g.t*4)*1.5);glow(ctx,x,y-6+by,7,c,.25);
      ctx.fillStyle='#5a3a1a';ctx.fillRect(x-4,y-8+by,8,6);ctx.fillStyle=c;ctx.fillRect(x-4,y-8+by,8,2);ctx.fillRect(x-1,y-6+by,2,2);ctx.fillStyle='#ffffff';ctx.fillRect(x+3,y-11+by,1,1);}}
  for(const z of g.zones||[]){const k=Math.min(1,z.t/z.T);const pulse=.25+.25*Math.sin(g.t*18);ctx.save();
    ctx.fillStyle=z.c;ctx.globalAlpha=z.t>=z.T?.6*(1-(z.t-z.T)/.25):(.12+.25*k+pulse*.3*k);ctx.beginPath();ctx.ellipse(z.cx,G+2,z.hw,6,0,0,7);ctx.fill();
    ctx.globalAlpha=.9;ctx.strokeStyle=z.c;ctx.beginPath();ctx.ellipse(z.cx,G+2,z.hw*k,6*k,0,0,7);ctx.stroke();ctx.restore();}
  // minions
  for(const m of g.minions){const n=MINI[m.kind]||'e_ghost';const a=SP[n];shadow(ctx,m.x,G,6);
    const sc=(m.small?.5:.62)*(1+.15*(m.stacks||0));ctx.save();ctx.translate(m.x,G-(n==='e_skeleton'?60:44)*sc);ctx.scale(sc,sc);spr(ctx,n,m.animT>0?6+Math.min(2,Math.floor((.3-m.animT)/.1)):Math.floor(g.t*(m.moving?16:6))%6,-FW(a)/2,0,true,.9,m.hitFlash);ctx.restore();
    const mw=12,mp=Math.max(0,m.hp/m.max);ctx.fillStyle='#120a14';ctx.fillRect(Math.round(m.x-mw/2)-1,Math.round(G-(n==='e_skeleton'?60:44)*sc)-3,mw+2,3);ctx.fillStyle='#7dff9a';ctx.fillRect(Math.round(m.x-mw/2),Math.round(G-(n==='e_skeleton'?60:44)*sc)-2,Math.round(mw*mp),1);}
  // heroes (back to front)
  const hs=g.heroes.slice().sort((a,b)=>a.x-b.x);
  for(const h of hs)if(!h.alive)spr(ctx,'h_'+h.key,10,h.x-32,G-60,false,.85);
  for(const f of g.fx)if(f.k==='corpse'&&UNITS[f.skin||f.type]){const U=UNITS[f.skin||f.type],k=f.t/f.life;const fall=Math.min(1,k*3.2);
    drawUnit(ctx,U.walk,0,f.x+fall*6,G+(f.lane||0),f.elite?1.1:1,Math.min(1,2.2*(1-k)),0,-fall*Math.PI/2*.96);}
  for(const f of g.fx)if(f.k==='corpse'){const n='e_'+f.type,a=SP[n];if(!a||UNITS[f.type])continue;const k=f.t/f.life;const big=FH(a)===64;
    const y=f.fly?Math.min(G-44,f.y-FH(a)/2+f.t*160):G-(big?60:44)+(f.lane||0);ctx.save();if(f.elite){ctx.translate(f.x,y+FH(a));ctx.scale(1.22,1.22);spr(ctx,n,10,-FW(a)/2,-FH(a),false,Math.min(1,2.2*(1-k)));}else spr(ctx,n,10,f.x-FW(a)/2,y,false,Math.min(1,2.2*(1-k)));ctx.restore();}
  for(const h of hs){if(!h.alive){continue;}
    if(h.bleedT>0){const p=.5+.5*Math.sin(g.t*10);ctx.save();ctx.globalCompositeOperation='lighter';
      for(let r=0;r<3;r++){const rr=((g.t*1.4+r/3)%1);ctx.strokeStyle=`rgba(220,20,40,${.55*(1-rr)})`;ctx.beginPath();ctx.ellipse(h.x,G-26,8+rr*14,(8+rr*14)*1.25,0,0,7);ctx.stroke();}
      glow(ctx,h.x,G-26,10+2*p,'#c0102a',.18);ctx.restore();
      for(let i=0;i<5;i++){const u2=((g.t*1.6+i*.21)%1);const dx=Math.round(h.x-7+((i*37)%15));const dy=Math.round(G-44+u2*42);ctx.fillStyle=u2<.15?'#ff3a4a':'#c0102a';ctx.fillRect(dx,dy,2,2);if(u2>.92){ctx.fillStyle='#7a0a16';ctx.fillRect(dx-1,G-1,3,1);}}}
    let fr=11;if(h.animT>0)fr=6+Math.min(2,Math.floor((.32-h.animT)/.107));else if(h.hitFlash>0)fr=9;else if(g.scroll)fr=Math.floor(h.walkT*9)%6;
    const ph=h.key.length*1.7;const wob=h.wanderX||0;const ly=Math.round(2+Math.sin(g.t*.7+ph)*2.5);
    const lx=(h.animT>0&&h.lunge?h.lunge*Math.sin(Math.PI*(1-h.animT/.32))*.9:0)+(h.dodgeX||0)+wob;if(h.dodging&&fr===11)fr=Math.floor(g.t*12)%6;
    ctx.save();ctx.translate(0,ly);
    if(SP['h_'+h.key+'_a']){   // partner pair: two fighters, each with its own animation
      const fa=h.animT>0?6+Math.min(2,Math.floor((.32-h.animT)/.107)):h.hitFlash>0?9:g.scroll?Math.floor(h.walkT*9)%6:11;
      const fb=h.animT2>0?6+Math.min(2,Math.floor((.32-h.animT2)/.107)):h.hitFlash>0?9:g.scroll?Math.floor(h.walkT*9+3)%6:11;
      const lb=h.animT2>0&&h.lunge2?h.lunge2*Math.sin(Math.PI*(1-h.animT2/.32))*.9:0;
      if(!h.style.companion){shadow(ctx,h.x-9+lx,G,8);spr(ctx,'h_'+h.key+'_a',fa,h.x-9+lx-32,G-60,false,null,h.hitFlash);}
      shadow(ctx,h.x+9+lb,G,8);spr(ctx,'h_'+h.key+'_b',fb,h.x+9+lb-32,G-60,false,null,h.hitFlash);
      if(h.style.companion){const cx=h.x+(h.compX||-12),cy=h.compY||0;const pf=h.pounce?7:(g.scroll||Math.abs(h.compV||0)>4?Math.floor(g.t*10)%6:fa);
        shadow(ctx,cx,G+4,7);spr(ctx,'h_'+h.key+'_a',h.animT>0?fa:pf,cx-32,G-60+4-cy,(h.compV||0)<-4&&!h.animT,null,0);}
    }else{shadow(ctx,h.x+lx,G,9);spr(ctx,'h_'+h.key,fr,h.x+lx-32,G-60,false,null,h.hitFlash);}
    ctx.restore();
    if(h.shield>0){ctx.strokeStyle='rgba(154,230,255,.7)';ctx.beginPath();ctx.ellipse(Math.round(h.x+lx),G-24,15,27,0,0,7);ctx.stroke();}
    const w=22,pct=Math.max(0,h.hp/h.max),bx=h.x+(h.dodgeX||0)+(h.wanderX||0);ctx.fillStyle='#120a14';ctx.fillRect(Math.round(bx-w/2)-1,G-63,w+2,4);ctx.fillStyle=pct>.5?'#4fd46a':pct>.25?'#ffb020':'#e8303a';ctx.fillRect(Math.round(bx-w/2),G-62,Math.round(w*pct),2);}
  // enemies
  // depth lanes: each enemy stands a few px nearer/farther; small creatures take the front lanes; back lanes draw first
  for(const e of g.enemies)if(e.lane==null){const a=SP['e_'+e.type];e.lane=e.boss||e.fly?0:UNITS[e.type]?Math.floor(Math.random()*6):(a&&FH(a)<64?5+Math.floor(Math.random()*4):Math.floor(Math.random()*5));}
  const es=g.enemies.filter(e=>!e.dead).sort((a,b)=>a.lane-b.lane||b.x-a.x);
  for(const e of es){let fr=e.animT>0?6+Math.min(2,Math.floor((.3-e.animT)/.1)):e.hitFlash>0&&!e.boss?9:Math.floor(e.walkT*8)%6;
    if(e.boss){const bf=e.animT>0?2:Math.floor(g.t*2)%2;const y=e.fly?e.y-90:G-124;shadow(ctx,e.x,G,26);spr(ctx,'b_'+e.type,bf,e.x-64,y,false,null,e.hitFlash);continue;}
    if(UNITS[e.skin||e.type]){const U=UNITS[e.skin||e.type];const [A,uf]=unitFrame(e,U);const gy=G+e.lane;const sc=e.elite?1.1:1;shadow(ctx,e.x,gy,8);
      drawUnit(ctx,A,uf,e.x,gy,sc,null,e.hitFlash);const y=gy-U.walk.ay*sc;
      if(e.slow>0){ctx.fillStyle='rgba(154,230,255,.8)';for(let i=0;i<3;i++)ctx.fillRect(Math.round(e.x-6+i*5),Math.round(y+8+((g.t*20+i*7)%20)),1,1);}
      if(e.burnT>0){ctx.fillStyle=Math.random()<.5?'#ffb040':'#ff5a1a';ctx.fillRect(Math.round(e.x-3+Math.random()*6),Math.round(y+10+Math.random()*12),1,2);}
      if(e.hp<e.max){const w=e.elite?20:14;ctx.fillStyle='#120a14';ctx.fillRect(Math.round(e.x-w/2)-1,Math.round(y)-2,w+2,3);ctx.fillStyle=e.elite?'#ffb020':'#e8303a';ctx.fillRect(Math.round(e.x-w/2),Math.round(y)-1,Math.round(w*Math.max(0,e.hp/e.max)),1);}
      continue;}
    const n='e_'+e.type,a=SP[n];const big=FH(a)===64;
    const y=e.fly?e.y-FH(a)/2:G-(big?60:44)+e.lane;if(!e.fly)shadow(ctx,e.x,G+e.lane,big?8:7);
    if(e.elite){ctx.save();ctx.translate(e.x,y+FH(a));ctx.scale(1.22,1.22);spr(ctx,n,fr,-FW(a)/2,-FH(a),false,null,e.hitFlash);ctx.restore();}
    else spr(ctx,n,fr,e.x-FW(a)/2,y,false,null,e.hitFlash);
    if(e.slow>0){ctx.fillStyle='rgba(154,230,255,.8)';for(let i=0;i<3;i++)ctx.fillRect(Math.round(e.x-6+i*5),Math.round(y+8+((g.t*20+i*7)%20)),1,1);}
    if(e.burnT>0){ctx.fillStyle=Math.random()<.5?'#ffb040':'#ff5a1a';ctx.fillRect(Math.round(e.x-3+Math.random()*6),Math.round(y+10+Math.random()*12),1,2);}
    if(e.hp<e.max){const w=e.elite?20:14;ctx.fillStyle='#120a14';ctx.fillRect(Math.round(e.x-w/2)-1,Math.round(y)-2,w+2,3);ctx.fillStyle=e.elite?'#ffb020':'#e8303a';ctx.fillRect(Math.round(e.x-w/2),Math.round(y)-1,Math.round(w*Math.max(0,e.hp/e.max)),1);}}
  // projectiles
  for(const p of g.proj){const x=Math.round(p.x),y=Math.round(p.y);const c=PCOL[p.kind]||'#ff3a3a';
    if(p.kind==='arrow'||p.kind==='quarrel'){const d=p.enemy?-1:1;ctx.fillStyle='#8a6a4a';ctx.fillRect(d>0?x-8:x-1,y,9,1);
      ctx.fillStyle='#d8d0c0';ctx.fillRect(x-d*9,y-1,2,1);ctx.fillRect(x-d*9,y+1,2,1);ctx.fillStyle='#c8ccd6';ctx.fillRect(x+(d>0?1:-3),y-1,2,3);ctx.fillRect(x+(d>0?3:-4),y,1,1);}
    else if(p.kind==='brick'){ctx.save();ctx.translate(x,y);ctx.rotate(p.rot||0);ctx.fillStyle='#9a3a24';ctx.fillRect(-3,-2,6,4);ctx.fillStyle='#c8603a';ctx.fillRect(-3,-2,6,1);ctx.restore();}
    else if(p.kind==='beam'){ctx.fillStyle='#ff2a3a';ctx.fillRect(x,y,8,1);}
    else if(p.kind==='batswarm'){ctx.fillStyle='#1a0a14';ctx.fillRect(x-3,y,7,2);ctx.fillRect(x-1,y-1,3,1);ctx.fillStyle='#ff2a2a';ctx.fillRect(x,y,1,1);}
    else drawProj(ctx,p,x,y,c,g.t);}
  // fx
  for(const f of g.fx){const k=f.t/.6;
    if(f.k==='poof'){ctx.fillStyle=`rgba(180,170,190,${1-k})`;for(let i=0;i<(f.big?10:6);i++){const a=i*1.1;const r=4+k*(f.big?22:12);ctx.fillRect(Math.round(f.x+Math.cos(a)*r),Math.round(f.y+Math.sin(a)*r*.6),2,2);}}
    if(f.k==='ring'){ctx.strokeStyle=f.c;ctx.globalAlpha=1-k;ctx.beginPath();ctx.ellipse(Math.round(f.x),Math.round(f.y),f.r*(.3+k),f.r*(.3+k)*.45,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
    if(f.k==='slash'){const al=Math.max(0,1-k*1.6);for(let i=0;i<14;i++){const a2=-1.2+i*.18;const r=13+k*3;ctx.fillStyle=`rgba(240,232,214,${al*(i<3||i>11?.5:1)})`;ctx.fillRect(Math.round(f.x-6+Math.cos(a2)*r),Math.round(f.y+Math.sin(a2)*r*.9),2,i>3&&i<10?2:1);}}
    if(f.k==='spark'){ctx.fillStyle=f.c;for(let i=0;i<4;i++){const a=i*1.57+.7;ctx.fillRect(Math.round(f.x+Math.cos(a)*k*8),Math.round(f.y+Math.sin(a)*k*8),1,1);}}
    if(f.k==='beam'){ctx.fillStyle=f.c;ctx.globalAlpha=1-k;ctx.fillRect(Math.round(f.x)-2,0,5,Math.round(f.y));ctx.fillStyle='#fff';ctx.fillRect(Math.round(f.x),0,1,Math.round(f.y));ctx.globalAlpha=1;}
    if(f.k==='drain'){ctx.fillStyle=f.c;for(let i=0;i<8;i++){const u=(i/8+k)%1;ctx.fillRect(Math.round(f.x+(f.tx-f.x)*u),Math.round(f.y+(G-30-f.y)*u-Math.sin(u*3.14)*10),2,2);}}
    if(f.k==='frost'){ctx.fillStyle=`rgba(200,240,255,${1-k})`;for(let i=0;i<40;i++)ctx.fillRect((i*37+Math.round(k*30))%W,(i*53+Math.round(k*80))%G,1,1);}
    if(f.k==='tentacle'){ctx.fillStyle='#4a2a52';const h=Math.sin(k*3.14)*60;ctx.fillRect(Math.round(f.x)-3,Math.round(G-h),6,Math.round(h));ctx.fillStyle='#c050a0';ctx.fillRect(Math.round(f.x)-1,Math.round(G-h),2,2);}
    if(f.k==='zap'){ctx.strokeStyle=`rgba(190,240,255,${1-k})`;ctx.beginPath();ctx.moveTo(f.x,f.y);for(let i=1;i<=5;i++){const u2=i/5;ctx.lineTo(f.x+(f.tx-f.x)*u2+(i<5?(Math.random()-.5)*6:0),f.y+(f.ty-f.y)*u2+(i<5?(Math.random()-.5)*6:0));}ctx.stroke();}
    if(f.k==='beamline'){ctx.fillStyle=f.c;ctx.globalAlpha=.8*(1-k);ctx.fillRect(Math.round(f.x),Math.round(f.y)-2,W,5);ctx.fillStyle='#fff';ctx.fillRect(Math.round(f.x),Math.round(f.y),W,1);ctx.globalAlpha=1;}
    if(f.k==='beamall'){ctx.fillStyle=`rgba(255,40,60,${.8*(1-k)})`;ctx.fillRect(0,G-34,f.x,6);ctx.fillStyle=`rgba(255,220,220,${1-k})`;ctx.fillRect(0,G-32,f.x,2);}
    if(f.k==='drainall'){ctx.strokeStyle=`rgba(255,40,60,${1-k})`;for(const h of g.alive()){ctx.beginPath();ctx.moveTo(h.x,G-30);ctx.lineTo(f.x-30,f.y);ctx.stroke();}}}
  for(const t of g.texts){const a=1-t.t/.9;ctx.globalAlpha=Math.max(0,a);ptext(ctx,t.s,t.x,t.y,t.c,t.big?2:1);ctx.globalAlpha=1;}
  ctx.restore();
  // boss bar / stage progress
  if(!g.demo){const p=g.boss&&!g.boss.dead?null:Math.min(1,g.dist/g.st.len);
    if(p!=null){ctx.fillStyle='#120a14';ctx.fillRect(6,4,W-12,4);ctx.fillStyle='#a6ff2e';ctx.fillRect(7,5,Math.round((W-14)*p),2);if(g.st.boss){ctx.fillStyle='#ff3a3a';ctx.fillRect(W-10,3,4,6);}}
    else{ctx.fillStyle='#120a14';ctx.fillRect(40,4,W-80,6);ctx.fillStyle='#c8102e';ctx.fillRect(41,5,Math.round((W-82)*Math.max(0,g.boss.hp/g.boss.max)),4);}}
}
// ---------------------------------------------------------------- portraits
function portrait(key,size){const c=document.createElement('canvas');const a=SP['h_'+key];c.width=a[2];c.height=a[3];c.className='cc-por';
  const go=()=>{const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.clearRect(0,0,c.width,c.height);x.drawImage(IMG,a[0],a[1],a[2],a[3],0,0,a[2],a[3]);};
  if(IMG.complete)go();else IMG.addEventListener('load',go,{once:true});if(size)c.style.width=size+'px';return c;}

// ---------------------------------------------------------------- styles
const CSS=`
#cc{position:fixed;inset:0;z-index:9000;background:#07040a;color:#e9e3f2;display:flex;flex-direction:column;font-size:14px;-webkit-tap-highlight-color:transparent;user-select:none}
#cc[hidden]{display:none}
#cc .px{font-family:var(--px,'Press Start 2P',monospace);letter-spacing:.5px}
#cc button{font:inherit;color:inherit;cursor:pointer}
.cc-top{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#120a18;border-bottom:2px solid #2a1838;flex:0 0 auto}
.cc-top .t{font-family:var(--px,monospace);font-size:11px;color:#a6ff2e;margin-right:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cc-ib{background:#1e1228;border:2px solid #3a2450;border-radius:6px;min-width:34px;height:32px;padding:0 8px;font-size:13px}
.cc-ib[aria-pressed=true]{border-color:#a6ff2e;color:#a6ff2e}
.cc-main{position:relative;flex:1;display:flex;flex-direction:column;min-height:0;align-items:center}
.cc-info{display:flex;gap:10px;align-items:center;width:100%;padding:4px 10px;font-size:12px;flex-wrap:wrap;box-sizing:border-box}
.cc-info b{color:#ffd23f;font-weight:600}.cc-xp{flex:1;min-width:90px;height:6px;background:#1e1228;border:1px solid #3a2450;border-radius:3px;overflow:hidden}.cc-xp i{display:block;height:100%;background:#a6ff2e}
#cc-cv{image-rendering:pixelated;image-rendering:crisp-edges;background:#000;display:block;flex:0 0 auto}
.cc-boss{position:absolute;left:0;right:0;text-align:center;font-family:var(--px,monospace);font-size:10px;color:#ff6a6a;text-shadow:0 1px 0 #000;pointer-events:none}
.cc-hud{display:grid;gap:6px;width:100%;padding:6px 8px;box-sizing:border-box;flex:0 0 auto}
.cc-hc{display:flex;gap:6px;align-items:center;background:#120a18;border:2px solid #2a1838;border-radius:8px;padding:3px 6px;min-width:0}
.cc-hc .cc-por{width:30px;height:30px;object-fit:cover;object-position:center top}
.cc-hc .n{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cc-hc .bar{height:6px;background:#2a1018;border-radius:3px;overflow:hidden;margin-top:2px}.cc-hc .bar i{display:block;height:100%;background:#4fd46a}
.cc-hc.dead{opacity:.4}
.cc-panel{position:absolute;inset:0;overflow:auto;background:rgba(7,4,10,.96);padding:14px 12px 40px;box-sizing:border-box;-webkit-overflow-scrolling:touch}
.cc-panel[hidden]{display:none}
.cc-wrap{max-width:760px;margin:0 auto}
.cc-h{font-family:var(--px,monospace);color:#a6ff2e;font-size:16px;margin:6px 0 4px;line-height:1.5}
.cc-h2{font-family:var(--gothic,serif);font-size:24px;color:#ff8a1f;margin:4px 0 8px}
.cc-sub{color:#b8aecb;font-size:13px;margin:0 0 12px}
.cc-row{display:flex;gap:8px;flex-wrap:wrap}
.cc-card{background:#120a18;border:2px solid #2a1838;border-radius:10px;padding:10px;box-sizing:border-box}
.cc-btn{background:#2a1430;border:2px solid #6a2a8a;border-radius:8px;padding:10px 14px;font-weight:600}
.cc-btn.go{background:#1f3a12;border-color:#a6ff2e;color:#d8ffb0;font-family:var(--px,monospace);font-size:12px;padding:14px 18px}
.cc-btn.warn{border-color:#c8102e;background:#2a0a10}
.cc-btn:disabled{opacity:.4}
.cc-who{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.cc-who button{background:#120a18;border:2px solid #3a2450;border-radius:12px;padding:14px;text-align:left}
.cc-who .e{font-size:28px}.cc-who .nm{font-family:var(--px,monospace);font-size:12px;margin:6px 0}
.cc-pin{display:grid;grid-template-columns:repeat(3,74px);gap:10px;justify-content:center;margin:12px 0}
.cc-pin button{height:58px;font-size:22px;background:#1e1228;border:2px solid #3a2450;border-radius:10px}
.cc-dots{display:flex;gap:12px;justify-content:center;margin:10px 0}.cc-dots i{width:16px;height:16px;border-radius:50%;border:2px solid #a6ff2e}.cc-dots i.on{background:#a6ff2e}
.cc-dots.bad{animation:ccshake .3s}@keyframes ccshake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.cc-heroes{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}
.cc-hero{background:#120a18;border:2px solid #2a1838;border-radius:10px;padding:8px;text-align:left;position:relative}
.cc-hero[aria-pressed=true]{border-color:#a6ff2e;box-shadow:0 0 0 2px #a6ff2e44}
.cc-hero .cc-por{width:64px;height:64px;float:left;margin-right:6px}
.cc-hero .nm{font-weight:700;font-size:13px}.cc-hero .dk{font-size:11px;color:#b8aecb}.cc-hero .lv{font-family:var(--px,monospace);font-size:9px;color:#ffd23f;margin-top:4px}
.cc-hero .ord{position:absolute;top:6px;right:8px;font-family:var(--px,monospace);font-size:12px;color:#a6ff2e}
.cc-stat{clear:both;display:grid;grid-template-columns:28px 1fr;gap:2px 6px;font-size:10px;padding-top:6px;color:#b8aecb}.cc-stat i{display:block;height:5px;margin-top:3px;background:#3a2450;border-radius:3px}.cc-stat i b{display:block;height:100%;border-radius:3px;background:#ff8a1f}
.cc-load{display:grid;gap:8px}
.cc-lh{display:flex;gap:8px;align-items:flex-start}
.cc-chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.cc-chip{font-size:11px;padding:3px 6px;border-radius:6px;background:#1e1228;border:1px solid #3a2450}
.cc-chip.it{border-style:dashed}
.cc-chipw{display:inline-flex;gap:2px;align-items:center}.cc-mini{font-size:11px;padding:3px 7px;border-radius:6px;background:#2a1430;border:1px solid #6a2a8a}.cc-slotrow{margin-top:5px}.cc-chip b{font-weight:600}
.cc-offers{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.cc-offer{background:#120a18;border:2px solid var(--rc);border-radius:12px;padding:10px;text-align:left;display:flex;flex-direction:column;gap:4px}
.cc-offer .rar{font-family:var(--px,monospace);font-size:9px;color:var(--rc)}
.cc-offer .kind{font-size:11px;color:#b8aecb;text-transform:uppercase;letter-spacing:.6px}
.cc-offer .cn{font-weight:700;font-size:14px}.cc-offer .tx{font-size:12px;color:#d8d0e6}
.cc-offer .who{display:flex;gap:6px;align-items:center;font-size:11px;color:#b8aecb}.cc-offer .who .cc-por{width:28px;height:28px;object-fit:cover;object-position:center top}
.cc-stars{color:#ffd23f;font-size:11px;letter-spacing:1px}
.cc-asc{color:#ffb020;font-family:var(--gothic,serif);font-size:16px}
.cc-lb{width:100%;border-collapse:collapse;font-size:12px}.cc-lb td,.cc-lb th{padding:5px 6px;border-bottom:1px solid #2a1838;text-align:left}.cc-lb th{color:#b8aecb;font-weight:500}
.cc-banner{position:absolute;left:0;right:0;top:38%;text-align:center;font-family:var(--px,monospace);font-size:18px;color:#ffd23f;text-shadow:0 2px 0 #000,0 0 12px #000;pointer-events:none;transition:opacity .4s}
.cc-hc .sp{display:none}
.cc-hud.tall{grid-template-columns:1fr!important}.cc-hud.tall .cc-hc .cc-por{width:44px;height:44px}.cc-hud.tall .n{font-size:13px}
.cc-hud.tall .sp{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}
.cc-sp{position:relative;font-size:11px;padding:3px 6px 5px;border-radius:6px;background:#1e1228;border:1px solid #3a2450;overflow:hidden}.cc-sp.it{border-style:dashed;color:#b8aecb}
.cc-sp i{position:absolute;left:0;bottom:0;height:2px;background:#a6ff2e;width:0}
#cc.land .cc-info{position:absolute;top:0;left:0;z-index:2;background:rgba(7,4,10,.6);padding:3px 8px}
#cc.land .cc-hud{position:absolute;bottom:0;left:0;z-index:2;background:rgba(7,4,10,.55);grid-auto-flow:column;padding:3px 6px}
#cc.land .cc-hc{padding:1px 4px;border-width:1px}
#crawl-strip{position:relative;margin:10px 0 0;border:2px solid #2a1838;border-radius:10px;overflow:hidden;height:clamp(70px,11vw,118px);background:#07040a;cursor:pointer}
#crawl-strip canvas{width:100%;height:100%;display:block;image-rendering:pixelated;image-rendering:crisp-edges}
#crawl-strip .cs-play{position:absolute;left:10px;top:8px;font-family:var(--px,monospace);font-size:11px;color:#a6ff2e;background:rgba(7,4,10,.78);border:2px solid #a6ff2e;border-radius:8px;padding:7px 10px;cursor:pointer}
#crawl-strip .cs-top{position:absolute;right:10px;top:10px;font-size:11px;color:#e9e3f2;background:rgba(7,4,10,.7);padding:3px 7px;border-radius:6px;max-width:55%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media (max-width:520px){#crawl-strip .cs-play{font-size:9px;padding:5px 7px}#crawl-strip .cs-top{font-size:10px;top:auto;bottom:6px}}
`;

// ---------------------------------------------------------------- state
const CC={data:Save.load(),player:null,unlocked:{},slotIdx:-1,game:null,speed:1,paused:false,raf:0};
const PL=()=>{const p=CC.data.players[CC.player]=CC.data.players[CC.player]||{pin:null,slots:[null,null,null]};return p;};
const SLOT=()=>PL().slots[CC.slotIdx];
function persist(){Save.write(CC.data);updateStripTop();}
function migrate(slot,player){migrateSlot(slot,player);}
function bestOf(player){const p=CC.data.players[player];let b={score:0,stage:0,prestige:0};if(!p)return b;
  for(const s of p.slots)if(s&&(s.best.prestige*100+s.best.stage>b.prestige*100+b.stage||(s.best.score>b.score&&s.best.stage>=b.stage)))b=Object.assign({},s.best);
  for(const s of p.slots)if(s)b.score=Math.max(b.score,s.best.score);return b;}

// ---------------------------------------------------------------- overlay shell
let root,cv,ctx,panel,hud,info,bossEl,banner;
function build(){
  if(root)return;if(!document.getElementById('cc-style')){const st=document.createElement('style');st.id='cc-style';st.textContent=CSS;document.head.appendChild(st);}
  root=document.createElement('div');root.id='cc';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-label','Crypt Crawl');
  root.innerHTML=`<div class="cc-top"><span class="t">⚰️ CRYPT CRAWL <span style="color:#6a5a7a;font-size:8px">v0.10.58</span></span>
    <button class="cc-ib" data-a="restart" title="Restart this stage from its save point" hidden>↺</button><button class="cc-ib" data-a="pause" title="Pause">⏸</button><button class="cc-ib" data-a="speed" title="Game speed">1×</button>
    <button class="cc-ib" data-a="mute" title="Sound">${muted?'🔇':'🔊'}</button><button class="cc-ib" data-a="side" title="Turn sideways (phones held upright)">⟳</button><button class="cc-ib" data-a="fs" title="Full screen">⛶</button><button class="cc-ib" data-a="close" title="Close">✕</button></div>
    <div class="cc-main"><div class="cc-info"></div><canvas id="cc-cv" width="${384*RES}" height="${216*RES}"></canvas><div class="cc-boss"></div><div class="cc-banner"></div><div class="cc-hud"></div><div class="cc-panel"></div></div>`;
  document.body.appendChild(root);
  cv=$('#cc-cv',root);ctx=cv.getContext('2d');panel=$('.cc-panel',root);hud=$('.cc-hud',root);info=$('.cc-info',root);bossEl=$('.cc-boss',root);banner=$('.cc-banner',root);
  root.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
    if(a==='close')closeCrawl();
    if(a==='restart'&&CC.game){if(!confirmInline(b,'↺?'))return;CC.game=null;cancelAnimationFrame(CC.raf);persist();beginStage();}
    if(a==='pause'){CC.paused=!CC.paused;b.textContent=CC.paused?'▶':'⏸';}
    if(a==='speed'){CC.speed=CC.speed%3+1;b.textContent=CC.speed+'×';}
    if(a==='mute'){muted=!muted;b.textContent=muted?'🔇':'🔊';try{localStorage.setItem('podrundown-crawl-mute',muted?'1':'0');}catch(_){}}
    if(a==='fs'){if(window.PodSideways)PodSideways.goBig(root);setTimeout(layout,120);}
    if(a==='side'){if(window.PodSideways){PodSideways.sidewaysPref(!root.classList.contains('rot-side'));PodSideways.fitSideways(root);}setTimeout(layout,60);}});
  document.addEventListener('keydown',e=>{if(root.hidden)return;if(e.key==='Escape'&&!document.fullscreenElement)closeCrawl();if(e.key===' '&&CC.game){e.preventDefault();CC.paused=!CC.paused;}});
  window.addEventListener('resize',()=>{if(window.PodSideways&&root&&!root.hidden)PodSideways.fitSideways(root);layout();});document.addEventListener('fullscreenchange',()=>setTimeout(layout,60));
}
function layout(){if(!root||root.hidden)return;const main=$('.cc-main',root);const W=main.clientWidth,H=main.clientHeight;
  const land=W>H*1.25&&H<620;root.classList.toggle('land',land);
  hud.classList.toggle('tall',!land&&H>W*1.2);
  const reserved=land?0:(info.offsetHeight+hud.offsetHeight+4);let w=Math.min(W,(H-reserved)*16/9);
  const k=Math.floor(w/384);if(k>=2&&k*384>=w*.82)w=k*384;cv.style.width=Math.floor(w)+'px';cv.style.height=Math.floor(w*9/16)+'px';
  bossEl.style.top=(cv.offsetTop+Math.floor(w*9/16)*.06)+'px';banner.style.top=(cv.offsetTop+Math.floor(w*9/16)*.38)+'px';}
function openCrawl(){build();root.hidden=false;document.body.style.overflow='hidden';stopStrip();if(window.PodSideways)PodSideways.fitSideways(root);CC.data=Save.load();for(const p in CC.data.players)for(const s of CC.data.players[p].slots||[])if(s)migrateSlot(s,p);Save.write(CC.data);showWho();layout();}
function closeCrawl(){if(CC.game&&!CC.game.over)quitToCamp(true);CC.game=null;cancelAnimationFrame(CC.raf);root.hidden=true;document.body.style.overflow='';try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}startStrip();}
function showPanel(html){panel.hidden=false;const rb=root.querySelector('[data-a=restart]');if(rb)rb.hidden=true;panel.innerHTML=`<div class="cc-wrap">${html}</div>`;panel.scrollTop=0;hud.innerHTML='';info.innerHTML='';bossEl.textContent='';drawIdle();return panel;}
function drawIdle(){const g=CC.idle||(CC.idle=demoGame(384));ctx.imageSmoothingEnabled=false;if(IMG.complete&&BGI.complete)drawGame(ctx,g,384,0);}
// ---------------------------------------------------------------- screens
function showWho(){
  const rows=Object.keys(OWNERS).map(p=>{const b=bestOf(p);return {p,b};}).sort((a,b)=>(b.b.prestige*100+b.b.stage)-(a.b.prestige*100+a.b.stage)||b.b.score-a.b.score);
  const P=showPanel(`<div class="cc-h">⚰️ CRYPT CRAWL</div><p class="cc-sub">Your deck heroes march through the crypt on their own. You pick the team, the upgrades and when to push on. Three biomes of five stages, a boss every fifth stage, and it's meant to take a lot of tries.</p>
  <div class="cc-who">${Object.keys(OWNERS).map(p=>{const b=bestOf(p);const has=CC.data.players[p]&&CC.data.players[p].pin;
    return `<button data-p="${p}"><div class="e">${OWNERS[p]}</div><div class="nm px">${p}</div><div class="cc-sub" style="margin:0">${has?'🔒 PIN':'New player · set a PIN'}${b.stage?` · best stage ${b.stage}${b.prestige?' ★'+b.prestige:''}`:''}</div></button>`;}).join('')}</div>
  <div class="cc-h" style="margin-top:18px;font-size:12px">🏆 LEADERBOARD</div>
  <table class="cc-lb"><tr><th>Player</th><th>Furthest</th><th>Best score</th></tr>${rows.map(r=>`<tr><td>${OWNERS[r.p]} ${r.p}</td><td>${r.b.stage?`Stage ${Math.min(r.b.stage,CFG.maxStage)}${r.b.prestige?' · Prestige '+r.b.prestige:''}`:'—'}</td><td>${r.b.score?fmt(r.b.score):'—'}</td></tr>`).join('')}</table>
  <details style="margin-top:14px"><summary class="cc-sub" style="cursor:pointer">How it works</summary><p class="cc-sub">Each player has 3 save slots behind a 4-digit PIN. Hero levels stay with the save; a run's spells and items are roguelike and are lost when the party falls. Lower-level heroes earn catch-up XP. Between stages you camp: spend level-ups, then press Begin. Beat stage ${CFG.maxStage} to Prestige and loop with tougher monsters.</p></details>`);
  P.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{CC.player=b.dataset.p;if(CC.unlocked[CC.player])showSlots();else showPin();});
}
function showPin(){
  const p=PL();const setting=!p.pin;let entry='',first=null;
  const draw=()=>{const P=showPanel(`<div class="cc-h">${OWNERS[CC.player]} ${CC.player.toUpperCase()}</div><p class="cc-sub">${setting?(first?'Type it again to confirm.':'Pick a 4-digit PIN. It keeps your saves yours.'):'Enter your PIN.'}</p>
    <div class="cc-dots">${[0,1,2,3].map(i=>`<i class="${i<entry.length?'on':''}"></i>`).join('')}</div>
    <div class="cc-pin">${[1,2,3,4,5,6,7,8,9,'⌫',0,'↩'].map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div>
    <p class="cc-sub" style="text-align:center">PINs are saved on this device only. Forgot yours? Kyle can reset it from his saves screen.</p>`);
    P.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>key(b.dataset.k));};
  const bad=()=>{const d=$('.cc-dots',panel);d.classList.remove('bad');void d.offsetWidth;d.classList.add('bad');};
  const key=k=>{if(k==='↩')return showWho();if(k==='⌫'){entry=entry.slice(0,-1);return draw();}if(entry.length<4)entry+=k;draw();
    if(entry.length===4)setTimeout(()=>{if(setting){if(!first){first=entry;entry='';draw();}else if(first===entry){p.pin=Save.pinHash(CC.player,entry);persist();CC.unlocked[CC.player]=1;showSlots();}else{first=null;entry='';draw();bad();}}
      else if(Save.pinHash(CC.player,entry)===p.pin){CC.unlocked[CC.player]=1;showSlots();}else{entry='';draw();bad();}},120);};
  draw();
}
function showSlots(){
  const p=PL();
  const P=showPanel(`<div class="cc-h">${OWNERS[CC.player]} ${CC.player.toUpperCase()} · SAVES</div><p class="cc-sub">Three separate games. Try different hero combos in each.</p>
  <div class="cc-load">${p.slots.map((s,i)=>{if(!s)return `<div class="cc-card"><b>Save ${i+1}</b> · empty<div class="cc-row" style="margin-top:8px"><button class="cc-btn go" data-new="${i}">NEW SAVE</button></div></div>`;
    migrate(s,CC.player);const top=Object.entries(s.heroes).sort((a,b)=>b[1].lvl-a[1].lvl).slice(0,4).map(([k,v])=>`${heroDef(k).icon} ${esc(heroDef(k).name)} <b>Lv ${v.lvl}</b>`).join(' · ');
    return `<div class="cc-card"><b>Save ${i+1}</b> · 💰 ${fmt(s.gold||0)} · best stage ${s.best.stage||0}${s.best.prestige?' ★'+s.best.prestige:''} · best score ${fmt(s.best.score)} · ${s.runs} runs<div class="cc-sub" style="margin:6px 0">${top}</div>
      ${s.run?`<div class="cc-sub" style="margin:0 0 6px">Run in progress: stage ${s.run.stage}${s.run.prestige?' ★'+s.run.prestige:''} with ${s.run.team.map(k=>esc(heroDef(k).name)).join(', ')}</div>`:''}
      <div class="cc-row">${s.run?`<button class="cc-btn go" data-cont="${i}">CONTINUE</button>`:''}<button class="cc-btn" data-team="${i}">${s.run?'Abandon & new run':'New run'}</button><button class="cc-btn warn" data-del="${i}">Delete</button></div></div>`;}).join('')}</div>
  ${CC.player==='Kyle'?`<div class="cc-card" style="margin-top:12px"><b>🔑 PIN reset</b><div class="cc-sub" style="margin:4px 0 8px">Clears a player's PIN on this device so they can pick a new one next time. Their saves stay.</div>
    <div class="cc-row">${Object.keys(OWNERS).map(p=>`<button class="cc-btn" data-reset="${p}" ${CC.data.players[p]&&CC.data.players[p].pin?'':'disabled'}>${OWNERS[p]} Reset ${p}</button>`).join('')}</div></div>`:''}
  <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-back>← Players</button></div>`);
  P.querySelector('[data-back]').onclick=showWho;
  P.querySelectorAll('[data-reset]').forEach(b=>b.onclick=()=>{const who=b.dataset.reset;if(!confirmInline(b,`Reset ${who}'s PIN?`))return;CC.data.players[who].pin=null;delete CC.unlocked[who];persist();
    if(who==='Kyle'){CC.unlocked.Kyle=0;return showPin();}showSlots();});
  P.querySelectorAll('[data-new]').forEach(b=>b.onclick=()=>{p.slots[+b.dataset.new]=newSlot(CC.player);persist();CC.slotIdx=+b.dataset.new;showTeam();});
  P.querySelectorAll('[data-cont]').forEach(b=>b.onclick=()=>{CC.slotIdx=+b.dataset.cont;showCamp();});
  P.querySelectorAll('[data-team]').forEach(b=>b.onclick=()=>{const i=+b.dataset.team;if(p.slots[i].run&&!confirmInline(b,'Abandon this run?'))return;CC.slotIdx=i;if(p.slots[i].run){endRun(p.slots[i],0);}showTeam();});
  P.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(!confirmInline(b,'Delete forever?'))return;p.slots[+b.dataset.del]=null;persist();showSlots();});
}
function confirmInline(b,msg){if(b.dataset.armed)return true;b.dataset.armed=1;const t=b.textContent;b.textContent=msg+' Tap again';setTimeout(()=>{if(b.isConnected){delete b.dataset.armed;b.textContent=t;}},2600);return false;}
function statBars(k,lvl){const b=heroBase(k,lvl,3);const mx={hp:80,atk:40,aspd:1.4};
  return `<div class="cc-stat"><span title="${b.stamina} Stamina × 5 = ${b.hp} HP">HP ${b.hp}</span><i><b style="width:${Math.min(100,b.hp/mx.hp*100)}%"></b></i><span title="Basic attack d${b.die}; bar = ability power">PWR</span><i><b style="width:${Math.min(100,b.atk/mx.atk*100)}%"></b></i><span>SPD</span><i><b style="width:${Math.min(100,b.aspd/mx.aspd*100)}%"></b></i><span title="Reflex: chance and speed to step out of marked boss attacks">REF</span><i><b style="width:${Math.min(100,b.reflex/18*100)}%;background:#9ae6ff"></b></i></div>`;}
const ROLE={melee:'Melee',ranged:'Ranged',caster:'Caster',duo:'Duo'};
function showTeam(){
  const s=SLOT();migrate(s,CC.player);s.partySize=s.strangerSaved&&!s.forsook?3:2;const pick=[];
  const mine=DATA.heroes.filter(h=>h.owner===CC.player);
  const P=showPanel(`<div class="cc-h">PICK YOUR PARTY</div><p class="cc-sub">${(s.partySize||2)>=3?'Up to 3 heroes from your decks.':s.forsook?'Up to 2 heroes: this save chose the blessing over the stranger.':'Up to 2 heroes for now. Clear stage 6 to free a mystery stranger and open a third spot.'} Fewer heroes = each one is stronger. Lower-level heroes earn catch-up XP.</p>
    <div class="cc-heroes">${mine.map(h=>{const st=STYLE[h.key];const L=s.heroes[h.key].lvl;
      return `<button class="cc-hero" data-k="${h.key}" aria-pressed="false"><span class="ord"></span><span class="por" data-por="${h.key}"></span><div class="nm">${h.icon} ${esc(h.name)}</div><div class="dk">Inspired by deck: <b>${esc(h.deck)}</b></div><div class="dk">${ROLE[st.atk]}${st.tank?' · Tank':''}${st.companion?' · with companion':''}</div>
      <div class="lv">LV ${L}</div>${statBars(h.key,L)}<div class="dk" style="margin-top:4px">⚡ ${esc(SIG[h.key].name)}: ${esc(SIG[h.key].txt)}</div><div class="dk" style="margin-top:2px">Starts with ${esc(h.spells[0].name||shortCard(h.spells[0].card))} (${SPELL[h.spells[0].arch].label})</div></button>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-go disabled>START RUN</button><button class="cc-btn" data-back>← Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  const upd=()=>{P.querySelectorAll('.cc-hero').forEach(b=>{const i=pick.indexOf(b.dataset.k);b.setAttribute('aria-pressed',i>=0);b.querySelector('.ord').textContent=i>=0?i+1:'';});
    const g=P.querySelector('[data-go]');g.disabled=!pick.length;g.textContent=`START RUN (${pick.length}/${s.partySize||2})`;};
  P.querySelectorAll('.cc-hero').forEach(b=>b.onclick=()=>{const k=b.dataset.k,i=pick.indexOf(k);if(i>=0)pick.splice(i,1);else if(pick.length<(s.partySize||2))pick.push(k);upd();});
  P.querySelector('[data-back]').onclick=showSlots;
  P.querySelector('[data-go]').onclick=()=>{s.run=newRun(pick,s);s.runs++;persist();showCamp();};upd();
}
function rankStars(r){return r>=CFG.maxRank?'<span class="cc-asc">✦ MAX ✦</span>':'<span class="cc-stars">'+'★'.repeat(Math.min(5,Math.ceil(r/2)))+'</span> <span class="cc-sub" style="font-size:11px">r'+r+'</span>';}
function chipFor(e,item,hk){const base=item?shortCard(e.card):sname(hk,e.card);const name=e.r>=CFG.maxRank?`✦ ${esc(maxTitle(e.card,e.arch))}`:esc(base);
  return `<span class="cc-chip ${item?'it':''}" title="${item?esc(e.card):'Inspired by '+esc(e.card)}"><b>${name}</b> · ${item?ITEM[e.arch].label:SPELL[e.arch].label} r${e.r}${(e.augs||[]).map(g=>' +'+AUG[g].name).join('')}${item?' · GS '+gearScore(e):''}${item&&e.proc?' · ✦ '+({onhit:'on hit',oncrit:'on crit',onkill:'on kill',whenhit:'when hit',near:'when close',allylow:'ally low',oncast:'on cast'}[PROCS[e.proc].t]||''):''}</span>`;}
function showCamp(){
  const s=SLOT();const run=s.run;migrate(s,CC.player);run.bag=run.bag||[];if(ABILITIES_OFF){run.pending=0;run.bag=run.bag.filter(e=>e.kind==='item');}const st=CFG.stage(run.stage,run.prestige);
  const btn=(attrs,label,title)=>`<button class="cc-mini" ${attrs} ${title?`title="${esc(title)}"`:''}>${label}</button>`;
  const P=showPanel(`<div class="cc-h">STAGE ${run.stage}${run.prestige?' · ★'+run.prestige:''}</div><div class="cc-h2">${esc(st.biome.name)}${st.boss?` — ${esc(CFG.bosses[st.boss].name)} awaits`:''}</div>
    <p class="cc-sub">Score ${fmt(run.score)} · save point. ${run.pending?`<b style="color:#a6ff2e">⬆ ${run.pending} upgrade${run.pending>1?'s':''} waiting</b>`:'No upgrades waiting.'}</p>
    <div class="cc-load">${run.team.map(k=>{const d=heroDef(k),hv=run.heroes[k],L=s.heroes[k],cap=slotCaps(L.lvl);
      const act=hv.spells.map((e,i)=>[e,i]).filter(([e])=>!SPELL[e.arch].passive),pas=hv.spells.map((e,i)=>[e,i]).filter(([e])=>SPELL[e.arch].passive);
      const row=(lbl,list,n,c,slotName)=>`<div class="cc-slotrow"><span class="cc-sub" style="font-size:11px;margin:0">${lbl} ${n}/${c}</span><div class="cc-chips">${list.map(([e,i])=>`<span class="cc-chipw">${chipFor(e,slotName==='item',k)}${btn(`data-un="${k}|${slotName}|${i}"`,'↓','Move to backpack')}</span>`).join('')}</div></div>`;
      return `<div class="cc-card cc-lh"><span data-por="${k}"></span><div style="flex:1;min-width:0"><b>${d.icon} ${esc(d.name)}</b> <span class="cc-sub" style="font-size:11px">LV ${L.lvl} · Gear ${heroGear(hv)} · ${hv.dead?'fallen (revives at 25%)':Math.round((hv.hpf==null?1:hv.hpf)*100)+'% HP'}</span>
        ${ABILITIES_OFF?'<div class="cc-sub" style="font-size:11px;margin:4px 0 0">Abilities are being rebuilt — basic attacks only for now.</div>':`<div class="cc-chips"><span class="cc-chip" title="${esc(SIG[k].txt)}" style="border-color:#ffd23f"><b>⚡ ${esc(SIG[k].name)}</b> · signature</span></div>`}
        ${ABILITIES_OFF?'':row('Abilities',act,act.length,cap.active,'spell')+row('Passives',pas,pas.length,cap.passive,'spell')}${row('Items',hv.items.map((e,i)=>[e,i]),hv.items.length,cap.item,'item')}</div></div>`;}).join('')}
      ${(()=>{const gold=s.gold||0;if(run.shopAt!==run.stage)return `<div class="cc-card"><b>🛒 Merchant</b> <span class="cc-sub" style="font-size:12px">💰 <b style="color:#ffd23f">${fmt(gold)}</b> gold · the merchant sets up shop after each boss you beat.</span></div>`;if(!run.shop||run.shop.stage!==run.stage)stockShop(run);
        const owned=[...run.team.flatMap(k=>run.heroes[k].items.map((e,i)=>({e,where:'hero',k,i}))),...run.bag.map((e,i)=>({e,where:'bag',i})).filter(o=>o.e.kind==='item')];
        return `<div class="cc-card"><b>🛒 Merchant</b> <span class="cc-sub" style="font-size:12px">here after your boss win · 💰 <b style="color:#ffd23f">${fmt(gold)}</b> gold (kept by this save)</span>
        <div class="cc-offers" style="margin-top:8px">${run.shop.items.map((it,i)=>{const R=CFG.rarity.find(r=>r.id===it.rar)||CFG.rarity[0];const pr=itemPrice(it.rar,run.stage);const pc=procFor(it.card);
          return `<div class="cc-offer" style="--rc:${R.col}"><span class="rar">${R.name.toUpperCase()}</span><span class="kind">${ITEM[it.arch].label} · for ${esc(heroDef(it.hero).name)} (fits anyone)</span><span class="cn">${esc(shortCard(it.card))} <span class="cc-sub" style="font-size:11px">GS ${gearScore({r:R.pts,tier:it.tier})}</span></span>
            <span class="tx">${esc(ITEM[it.arch].txt(R.pts))}${pc?'. '+esc(PROCS[pc].txt(procChance(R.pts))):''}</span>${it.sold?'<span class="cc-sub" style="margin:0">Sold</span>':`<button class="cc-btn" data-buy="${i}" ${gold<pr?'disabled':''}>Buy · ${fmt(pr)}g</button>`}</div>`;}).join('')||'<span class="cc-sub">Nothing left to sell from your decks.</span>'}</div>
        <div class="cc-row" style="margin-top:8px"><button class="cc-btn" data-restock ${gold<15*run.stage?'disabled':''}>Restock · ${15*run.stage}g</button></div>
        ${owned.length?`<div class="cc-sub" style="margin:10px 0 4px;font-size:12px">Hone an item (+1 rank):</div><div class="cc-chips">${owned.map((o,j)=>{const pr=honePrice(o.e.r,run.stage);return o.e.r>=CFG.maxRank?'':`<button class="cc-mini" data-hone="${j}" ${gold<pr?'disabled':''}>${esc(shortCard(o.e.card))} r${o.e.r}→${o.e.r+1} · ${fmt(pr)}g</button>`;}).join('')}</div>`:''}</div>`;})()}
      <div class="cc-card"><b>🎒 Backpack</b> <span class="cc-sub" style="font-size:11px">${run.bag.length}/${BAG_SIZE} · skills only fit the hero they came from; items fit anyone · more slots unlock at hero level 5, 8 and 12</span>
        <div class="cc-load" style="margin-top:6px">${run.bag.length?run.bag.map((e,bi)=>{const isItem=e.kind==='item';const who=isItem?run.team:[e.owner];
          return `<div class="cc-chips" style="align-items:center">${chipFor(e,isItem,e.owner)}<span class="cc-sub" style="font-size:11px;margin:0">${isItem?'':'('+esc(heroDef(e.owner).name)+')'}</span>
            ${who.filter(k=>run.team.includes(k)).map(k=>btn(`data-eq="${bi}|${k}"`,'↑ '+esc(heroDef(k).name.split(' ').slice(-1)[0]),'Equip on '+heroDef(k).name)).join('')}${isItem?btn(`data-dis="${bi}"`,'Sell +'+(12*(e.r||1))+'g','Sell'):btn(`data-dis="${bi}"`,'✕','Discard')}</div>`;}).join(''):'<span class="cc-sub" style="font-size:12px;margin:0">Empty. New picks that don\'t fit a slot land here.</span>'}</div></div></div>
    <div class="cc-row" style="margin-top:14px">${run.pending?`<button class="cc-btn go" data-pick>CHOOSE UPGRADES (${run.pending})</button>`:`<button class="cc-btn go" data-begin>BEGIN STAGE ${run.stage} ▶</button>`}
      <button class="cc-btn" data-quit>Save & exit</button></div><p class="cc-sub" id="cc-campmsg" style="margin-top:8px"></p>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por,56)));
  const msg=t=>{const m=P.querySelector('#cc-campmsg');if(m)m.textContent=t;};
  P.querySelectorAll('[data-un]').forEach(b=>b.onclick=()=>{const [k,sl,i]=b.dataset.un.split('|');if(unequip(run,k,sl,+i)){persist();showCamp();}else msg(run.bag.length>=BAG_SIZE?'Backpack is full.':'Each hero keeps at least one skill equipped.');});
  P.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>{const [bi,k]=b.dataset.eq.split('|');if(equip(run,s,+bi,k)){persist();showCamp();}else msg('No free slot of that kind on '+heroDef(k).name+'. Move something to the backpack first.');});
  P.querySelectorAll('[data-dis]').forEach(b=>b.onclick=()=>{if(!confirmInline(b,'Sure?'))return;const e=run.bag[+b.dataset.dis];if(e&&e.kind==='item')s.gold=(s.gold||0)+12*(e.r||1);discard(run,'bag',null,+b.dataset.dis);persist();showCamp();});
  P.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const it=run.shop.items[+b.dataset.buy];const pr=itemPrice(it.rar,run.stage);if((s.gold||0)<pr)return;
    const w=giveItem(run,s,it);if(!w){msg('No room on any hero or in the backpack.');return;}s.gold-=pr;it.sold=1;sfx('level');persist();showCamp();});
  const rs=P.querySelector('[data-restock]');if(rs)rs.onclick=()=>{const c=15*run.stage;if((s.gold||0)<c)return;s.gold-=c;stockShop(run);persist();showCamp();};
  const owned2=[...run.team.flatMap(k=>run.heroes[k].items),...run.bag.filter(e=>e.kind==='item')];
  P.querySelectorAll('[data-hone]').forEach(b=>b.onclick=()=>{const e=owned2[+b.dataset.hone];const pr=honePrice(e.r,run.stage);if((s.gold||0)<pr)return;s.gold-=pr;e.r=Math.min(CFG.maxRank,e.r+1);sfx('level');persist();showCamp();});
  const pk=P.querySelector('[data-pick]');if(pk)pk.onclick=showPick;
  const bg=P.querySelector('[data-begin]');if(bg)bg.onclick=beginStage;
  P.querySelector('[data-quit]').onclick=showSlots;
}
function showPick(){
  const s=SLOT(),run=s.run;if(ABILITIES_OFF)run.pending=0;if(!run.pending)return showCamp();
  const luckN=run.heroes&&Object.values(run.heroes).some(h=>h.spells.some(x=>x.arch==='insight'&&(x.augs||[]).length))?4:3;
  const isB=(run.blessed||0)>0;const os=CC.offersCache||(CC.offersCache=offers(run,Math.random,luckN,isB?{luck:60,min:'U',blessed:1}:null));
  const P=showPanel(`<div class="cc-h">${isB?'⭐ BLESSED PICK':'LEVEL UP!'}</div><p class="cc-sub">${isB?'Every option is Uncommon or better, with a 40% shot at Rare each. ':''}${run.pending} pick${run.pending>1?'s':''} left. Tap one.</p>
    <div class="cc-offers">${os.map((o,i)=>{const d=describe(o,run,s);const hd=heroDef(o.hero);
      const kind=o.kind==='new'?(o.slot==='spell'?'New spell':'New item'):o.kind==='aug'?'Augment':'Upgrade';
      const base=o.slot==='spell'?sname(o.hero,o.card):shortCard(o.card);const nm=d.r1>=CFG.maxRank?`✦ ${esc(maxTitle(o.card,o.arch))}`:esc(base);
      return `<button class="cc-offer" style="--rc:${o.rar.col}" data-i="${i}"><span class="rar">${o.rar.name.toUpperCase()}</span><span class="kind">${kind} · ${o.slot==='spell'?SPELL[o.arch].label:ITEM[o.arch].label}${o.kind==='aug'?' · '+AUG[o.aug].name:''}</span>
        <span class="cn">${nm}</span>${d.r1>=CFG.maxRank?`<span class="cc-sub" style="margin:0;font-size:11px">${esc(base)} at max rank</span>`:''}${o.slot==='spell'?`<span class="cc-sub" style="margin:0;font-size:10px">inspired by ${esc(shortCard(o.card))}</span>`:''}
        <span class="who"><span data-por="${o.hero}"></span>${esc(hd.name)}</span>
        <span>${o.kind==='new'?'':`r${d.r0} → `}${rankStars(d.r1)}${d.where?` <span class="cc-sub" style="font-size:10px">· ${d.where}</span>`:''}</span><span class="tx">${esc(d.txt)}${o.kind==='aug'?` <b>${AUG[o.aug].name}:</b> ${AUG[o.aug].txt}.`:''}</span></button>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-reroll ${run.rerolls>0?'':'disabled'}>🎲 Reroll (${run.rerolls})</button><button class="cc-btn" data-skip>Skip (+${fmt(60*run.stage)} score)</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  P.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const o=os[+b.dataset.i];const r=applyOffer(run,o,s);if(r==='full')return showReplace(o);if(o.blessed)run.blessed=Math.max(0,(run.blessed||0)-1);sfx('level');CC.offersCache=null;persist();run.pending?showPick():showCamp();});
  P.querySelector('[data-reroll]').onclick=()=>{if(run.rerolls>0){run.rerolls--;CC.offersCache=null;persist();showPick();}};
  P.querySelector('[data-skip]').onclick=()=>{run.pending--;if(isB)run.blessed=Math.max(0,(run.blessed||0)-1);run.score+=60*run.stage;CC.offersCache=null;persist();run.pending?showPick():showCamp();};
}
function showReplace(o){
  const s=SLOT(),run=s.run;const hv=run.heroes[o.hero];const t=o.slot==='item'?'item':SPELL[o.arch].passive?'passive':'active';
  const eq=(t==='item'?hv.items.map((e,i)=>['item',i,e]):hv.spells.map((e,i)=>['spell',i,e]).filter(([,,e])=>!!SPELL[e.arch].passive===(t==='passive')));
  const P=showPanel(`<div class="cc-h">NO ROOM</div><p class="cc-sub">${esc(heroDef(o.hero).name)}'s ${t==='item'?'item':t==='passive'?'passive':'ability'} slots and the backpack are full. Drop one to take <b>${esc(o.slot==='spell'?sname(o.hero,o.card):shortCard(o.card))}</b>:</p>
    <div class="cc-load">${eq.map(([sl,i,e])=>`<button class="cc-card" style="text-align:left" data-d="${sl}|${i}">Equipped: ${chipFor(e,sl==='item',o.hero)}</button>`).join('')}
      ${run.bag.map((e,i)=>`<button class="cc-card" style="text-align:left" data-d="bag|${i}">🎒 ${chipFor(e,e.kind==='item',e.owner)}</button>`).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-cancel>← Back to picks</button></div>`);
  P.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const [w,i]=b.dataset.d.split('|');discard(run,w,o.hero,+i);applyOffer(run,o,s);if(o.blessed)run.blessed=Math.max(0,(run.blessed||0)-1);sfx('level');CC.offersCache=null;persist();run.pending?showPick():showCamp();});
  P.querySelector('[data-cancel]').onclick=showPick;
}
function endRun(s,victory){const r=s.run;if(!r)return;const tot=r.score;
  if(r.prestige*100+r.stage>s.best.prestige*100+s.best.stage){s.best.stage=r.stage;s.best.prestige=r.prestige;}s.best.score=Math.max(s.best.score,tot);s.run=null;persist();}
// ---------------------------------------------------------------- playing
function beginStage(){
  const s=SLOT(),run=s.run;panel.hidden=true;CC.paused=false;
  CC.game=new Game({run,slot:s});CC.lv0=Object.fromEntries(run.team.map(k=>[k,s.heroes[k].lvl]));
  hud.style.gridTemplateColumns=`repeat(${run.team.length},minmax(0,1fr))`;
  hud.innerHTML=CC.game.heroes.map(h=>`<div class="cc-hc" data-h="${h.key}"><span data-por="${h.key}"></span><div style="flex:1;min-width:0"><div class="n">${esc(h.def.name)} <span style="color:#ffd23f">${h.lvl}</span></div><div class="bar"><i></i></div>
    <div class="sp"><span class="cc-sp" data-sig style="border-color:#ffd23f"><b>⚡ ${esc(SIG[h.key].name)}</b><i></i></span>${h.spells.map((s,i)=>`<span class="cc-sp" data-s="${i}"><b>${s.r>=CFG.maxRank?'✦ ':''}${esc(sname(h.key,s.card))}</b> r${s.r}<i></i></span>`).join('')}${h.items.map(it=>`<span class="cc-sp it"><b>${esc(shortCard(it.card))}</b> ${ITEM[it.arch].label} r${it.r}</span>`).join('')}</div></div></div>`).join('');
  hud.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  const st=CC.game.st;flash(`STAGE ${run.stage}`,1400);if(st.boss)setTimeout(()=>{},0);
  root.querySelector('[data-a=restart]').hidden=false;layout();CC.last=performance.now();cancelAnimationFrame(CC.raf);CC.raf=requestAnimationFrame(loop);
}
function flash(t,ms){banner.textContent=t;banner.style.opacity=1;clearTimeout(CC.bt);CC.bt=setTimeout(()=>banner.style.opacity=0,ms||1200);}
function loop(now){
  const g=CC.game;if(!g||root.hidden)return;let dt=Math.min(.05,(now-CC.last)/1000);CC.last=now;
  if(!CC.paused){for(let i=0;i<CC.speed;i++)g.step(dt);}
  for(const e of g.events){if(e.type==='levelup'){sfx('level');flash('LEVEL UP!',900);}if(e.type==='boss'){sfx('boss');flash(e.name.toUpperCase(),1800);}
    if(e.type==='herolevel')sfx('level');if(e.type==='enrage')flash('ENRAGED!',1400);if(e.type==='itemdrop'){sfx('level');flash('ITEM FOUND!',900);}if(e.type==='herodown')sfx('die');}
  g.events.length=0;
  ctx.imageSmoothingEnabled=false;drawGame(ctx,g,384,0);
  const run=g.run;info.innerHTML=`<span class="px" style="font-size:10px;color:#a6ff2e">STAGE ${run.stage}${run.prestige?' ★'+run.prestige:''}</span><span>${esc(g.st.biome.name)}</span><span>Score <b>${fmt(run.score+g.stageScore)}</b></span><span>💰 <b>${fmt((SLOT().gold||0)+g.stageGold)}</b></span>
    <span class="cc-xp" title="Next upgrade"><i style="width:${Math.min(100,(run.xp||0)/(8+6*(run.lv||0))*100)}%"></i></span>${run.pending?`<b style="color:#a6ff2e">⬆${run.pending}</b>`:''}`;
  bossEl.textContent=g.boss&&!g.boss.dead?g.boss.B.name.toUpperCase():'';
  for(const h of g.heroes){const el=hud.querySelector(`[data-h="${h.key}"]`);if(!el)continue;el.classList.toggle('dead',!h.alive);el.querySelector('.bar i').style.width=Math.max(0,h.hp/h.max*100)+'%';
    el.querySelector('.n span').textContent=SLOT().heroes[h.key].lvl;
    if(hud.classList.contains('tall')){const sc=el.querySelector('[data-sig] i');if(sc)sc.style.width=Math.max(0,Math.min(100,(1-(h.sigT||0)/(SIG[h.key].cd*(1-h.cdr)))*100))+'%';}
    if(hud.classList.contains('tall'))h.spells.forEach((s,i)=>{const S=SPELL[s.arch];const c=el.querySelector(`[data-s="${i}"] i`);if(c)c.style.width=S.passive?'100%':Math.max(0,Math.min(100,(1-s.cdT/(S.cd*(1-h.cdr)))*100))+'%';});}
  if(g.over){return finishStage(g);}
  CC.raf=requestAnimationFrame(loop);
}
function finishStage(g){
  const s=SLOT(),run=s.run;g.saveBack();run.score+=g.stageScore;s.gold=(s.gold||0)+g.stageGold;
  const found=[];if(g.over==='clear')for(const it of g.stageItems){const where=giveItem(run,s,it);if(where)found.push(shortCard(it.card)+(where==='bag'?' (backpack)':''));else{const v=Math.round(itemPrice(it.rar,run.stage)/3);s.gold+=v;found.push(shortCard(it.card)+' (sold, no room: +'+v+'g)');}}
  const lvls=run.team.filter(k=>s.heroes[k].lvl>CC.lv0[k]).map(k=>`${esc(heroDef(k).name)} → LV ${s.heroes[k].lvl}`);
  if(g.over==='clear'){
    sfx('clear');
    for(const k of run.team){const h=run.heroes[k];if(h.dead){h.dead=false;h.hpf=.25;}else h.hpf=Math.min(1,(h.hpf||0)+.3);}
    const cleared=run.stage;run.score+=Math.round(250*cleared*(1+run.prestige));
    if(cleared>=CFG.maxStage){persist();CC.game=null;return showVictory(lvls);}
    if(cleared===CFG.strangerStage&&run.team.length<3&&!run.strangerDone){run.strangerDone=1;const free=s.forsook?[]:DATA.heroes.filter(h=>h.owner===CC.player&&!run.team.includes(h.key));
      if(CFG.stage(cleared,run.prestige).boss)run.shopAt=cleared+1;run.stage++;persist();CC.game=null;return showStranger(free);}
    if(CFG.stage(cleared,run.prestige).boss)run.shopAt=cleared+1;
    run.stage++;run.rerolls=Math.max(run.rerolls,1);
    if(run.prestige*100+run.stage-1>s.best.prestige*100+s.best.stage){s.best.stage=run.stage-1;s.best.prestige=run.prestige;}
    persist();CC.game=null;
    const P=showPanel(`<div class="cc-h">STAGE ${cleared} CLEAR!</div><p class="cc-sub">+${fmt(g.stageScore+250*cleared*(1+run.prestige))} score · ${g.kills} kills · 💰 +${fmt(g.stageGold)} gold${found.length?'<br>Found: '+found.map(esc).join(', '):''}${lvls.length?'<br>'+lvls.join(', '):''}</p><div class="cc-row"><button class="cc-btn go" data-c>TO CAMP ▶</button></div>`);
    P.querySelector('[data-c]').onclick=showCamp;return;}
  // defeat
  sfx('die');const reached=run.stage,score=run.score,team=run.team.slice();endRun(s,0);CC.game=null;
  const P=showPanel(`<div class="cc-h" style="color:#ff5a5a">YOUR PARTY HAS FALLEN</div><div class="cc-h2">Stage ${reached}${run.prestige?' · ★'+run.prestige:''}</div>
    <p class="cc-sub">Score ${fmt(score)} · best ${fmt(s.best.score)}. Spells and items are gone; hero levels stay.${lvls.length?'<br>Level ups this stage: '+lvls.join(', '):''}</p>
    <div class="cc-load">${team.map(k=>`<div class="cc-card cc-lh"><span data-por="${k}"></span><div><b>${esc(heroDef(k).name)}</b><div class="cc-sub" style="margin:0">LV ${s.heroes[k].lvl} · ${fmt(s.heroes[k].xp)}/${fmt(needHeroXp(s.heroes[k].lvl))} XP</div></div></div>`).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-again>SAME TEAM AGAIN</button><button class="cc-btn" data-team>New team</button><button class="cc-btn" data-saves>Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por,48)));
  P.querySelector('[data-again]').onclick=()=>{s.run=newRun(team,s);s.runs++;persist();showCamp();};
  P.querySelector('[data-team]').onclick=showTeam;P.querySelector('[data-saves]').onclick=showSlots;
}
function showStranger(free){
  const s=SLOT(),run=s.run;const bless=(forsake)=>{if(forsake){s.forsook=1;s.partySize=2;}run.blessed=(run.blessed||0)+1;run.pending=(run.pending||0)+1;sfx('level');persist();showCamp();};
  const P=showPanel(`<div class="cc-h">A MYSTERY STRANGER</div><div class="cc-h2">Freed from the castle cells</div>
    ${free.length?`<p class="cc-sub">Someone was chained up in the dungeon. Choose who it turns out to be: they join this run now and this save can bring 3 heroes from then on. Or leave them be for a ⭐ Blessed Upgrade (every option Uncommon or better, with much better odds of Rare), but then <b>this save stays a 2-hero party for good</b>; later runs that clear stage 6 get the blessing again instead.</p>
    <div class="cc-heroes">${free.map(h=>`<button class="cc-hero" data-k="${h.key}"><span data-por="${h.key}"></span><div class="nm">${h.icon} ${esc(h.name)}</div><div class="dk">Inspired by deck: <b>${esc(h.deck)}</b></div><div class="lv">LV ${s.heroes[h.key].lvl}</div></button>`).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn warn" data-bless="forsake">Leave them be: ⭐ Blessed Upgrade (2 heroes for good)</button></div>`
    :`<p class="cc-sub">${s.forsook?'You swore off the stranger in this save. The empty cell still holds a gift':'The cell holds only a lingering spirit, with no hero of yours to answer the call yet'}. It leaves you a gift instead: a ⭐ Blessed Upgrade (every option Uncommon or better, with much better odds of Rare).</p>
    <div class="cc-row"><button class="cc-btn go" data-bless>⭐ ACCEPT THE BLESSING</button></div>`}`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  P.querySelector('[data-bless]').onclick=e=>{const b=e.currentTarget;if(b.dataset.bless==='forsake'&&!confirmInline(b,'2 heroes for good?'))return;bless(b.dataset.bless==='forsake');};
  P.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k,d=heroDef(k);s.strangerSaved=1;s.partySize=3;run.strangerJoined=1;run.team.push(k);
    run.heroes[k]={hpf:1,dead:false,spells:ABILITIES_OFF?[]:[{card:d.spells[0].card,arch:d.spells[0].arch,r:Math.max(1,Math.min(4,run.stage-3)),augs:[]}],items:[]};if(!ABILITIES_OFF)run.pending=(run.pending||0)+2;sfx('level');persist();showCamp();});
}
function showVictory(lvls){
  const s=SLOT(),run=s.run;const np=run.prestige+1;
  if(run.prestige*100+CFG.maxStage>s.best.prestige*100+s.best.stage){s.best.stage=CFG.maxStage;s.best.prestige=run.prestige;}s.best.score=Math.max(s.best.score,run.score);persist();
  const P=showPanel(`<div class="cc-h">THE CRYPT IS CONQUERED</div><div class="cc-h2">Stage ${CFG.maxStage} cleared${run.prestige?' at ★'+run.prestige:''}</div>
    <p class="cc-sub">Score ${fmt(run.score)}.${lvls.length?' '+lvls.join(', ')+'.':''} More stages are coming. Until then you can <b>Prestige</b>: descend again from stage 1 with your build, monsters much tougher, more score, and rarer loot${np>=2?' (Legendary now possible)':''}.</p>
    <div class="cc-row"><button class="cc-btn go" data-pr>PRESTIGE ★${np}</button><button class="cc-btn" data-ret>Retire this run</button></div>`);
  P.querySelector('[data-pr]').onclick=()=>{run.prestige=np;run.stage=1;run.rerolls+=1;persist();showCamp();};
  P.querySelector('[data-ret]').onclick=()=>{endRun(s,1);showSlots();};
}
function quitToCamp(silent){const g=CC.game;if(!g)return;persist();CC.game=null;if(!silent)showCamp();}   // hero XP already banked; the run restarts this stage
// ---------------------------------------------------------------- header strip (attract mode)
function demoGame(W){const keys=DATA.heroes.map(h=>h.key).sort(()=>Math.random()-.5).slice(0,3);
  const run=newRun(keys,null);run.stage=1+Math.floor(Math.random()*8);run.prestige=0;
  for(const k of keys){const d=heroDef(k);run.heroes[k].spells=d.spells.slice(0,2).map(s=>({card:s.card,arch:s.arch,r:4,augs:[]}));}
  const g=new Game({run,slot:null,demo:true,W});for(const h of g.heroes){h.base=heroBase(h.key,8,3);}g.recalc();for(const h of g.heroes)h.hp=h.max;return g;}
let strip,scv,sctx,sg,sraf=0,svis=true,slast=0;
function updateStripTop(){if(!strip)return;const rows=Object.keys(OWNERS).map(p=>({p,b:bestOf(p)})).filter(r=>r.b.stage).sort((a,b)=>(b.b.prestige*100+b.b.stage)-(a.b.prestige*100+a.b.stage)||b.b.score-a.b.score);
  $('.cs-top',strip).textContent=rows.length?`🏆 ${OWNERS[rows[0].p]} ${rows[0].p} · stage ${Math.min(rows[0].b.stage,CFG.maxStage)}${rows[0].b.prestige?' ★'+rows[0].b.prestige:''} · ${fmt(rows[0].b.score)}`:'🏆 No runs yet. Be first.';}
function stripLoop(now){if(!strip||!svis||(root&&!root.hidden)){sraf=0;return;}
  sraf=requestAnimationFrame(stripLoop);if(now-slast<33)return;const dt=Math.min(.05,(now-slast)/1000);slast=now;
  const H=106,W=Math.max(200,Math.round(H*strip.clientWidth/Math.max(1,strip.clientHeight)));
  if(scv.width!==W*RES||!sg||sg.W!==W){scv.width=W*RES;scv.height=H*RES;sg=demoGame(W);}
  sg.step(dt);if(sg.over||!sg.alive().length)sg=demoGame(W);sg.events.length=0;
  if(IMG.complete&&BGI.complete){sctx.imageSmoothingEnabled=false;drawGame(sctx,sg,W,CFG.H-H);}}
function startStrip(){if(strip&&!sraf&&svis)sraf=requestAnimationFrame(stripLoop);}
function stopStrip(){cancelAnimationFrame(sraf);sraf=0;}
function mountStrip(){
  const nav=document.querySelector('.pagetabs');if(!nav||document.getElementById('crawl-strip'))return;
  strip=document.createElement('div');strip.id='crawl-strip';strip.innerHTML=`<canvas aria-hidden="true"></canvas><button class="cs-play" type="button">▶ PLAY CRYPT CRAWL</button><span class="cs-top"></span>`;
  nav.parentNode.insertBefore(strip,nav);scv=strip.querySelector('canvas');sctx=scv.getContext('2d');
  if(!document.getElementById('cc-style')){const st=document.createElement('style');st.id='cc-style';st.textContent=CSS;document.head.appendChild(st);}
  strip.addEventListener('click',openCrawl);updateStripTop();
  try{new IntersectionObserver(es=>{svis=es[0].isIntersecting;if(svis)startStrip();else stopStrip();}).observe(strip);}catch(e){}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopStrip();else startStrip();});
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){svis=false;const go=()=>{const H=106,W=Math.round(H*strip.clientWidth/strip.clientHeight);scv.width=W*RES;scv.height=H*RES;sg=demoGame(W);sctx.imageSmoothingEnabled=false;drawGame(sctx,sg,W,CFG.H-H);};IMG.complete&&BGI.complete?go():BGI.addEventListener('load',go,{once:true});}
  else startStrip();
}
window.CryptCrawl={open:openCrawl,_cc:CC,
  resetPin(who){const d=Save.load();if(d.players[who]){d.players[who].pin=null;Save.write(d);CC.data=d;return who+"'s PIN cleared on this device";}return 'no such player';}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountStrip);else mountStrip();

})();
