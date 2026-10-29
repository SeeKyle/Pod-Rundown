/* Crypt Crawl — side-scrolling auto-battler for Pod Rundown.
   Engine (pure logic, runs headless in node for balance sims) + renderer + UI.
   Content lives in the CFG tables so stages, biomes, enemies, bosses, items and abilities can be added as rows. */
(function(){
'use strict';
const DATA={"heroes":[{"key":"grim","deck":"The Grim Throne","icon":"🏴‍☠️","owner":"Kyle","cmdr":"Kenrith, the Returned King","name":"The Bone Monarch","cls":"melee","duo":false,"blurb":"A crowned grave-king who hauls a greatsword out of the tomb.","stats":{"mana":10,"cards":6,"consistency":10,"threats":10,"clock":6,"reach":10,"answers":7,"staying":9,"control":7},"spells":[{"card":"Ghalta and Mavren","arch":"summon"},{"card":"Galactus, Devourer of Worlds","arch":"smite"},{"card":"Prime Speaker Zegana","arch":"pump"},{"card":"Zacama, Primal Calamity","arch":"bolt"},{"card":"Yidaro, Wandering Monster","arch":"insight"},{"card":"Indominus Rex, Alpha","arch":"regen"},{"card":"The Coming of Galactus","arch":"drain"},{"card":"Zetalpa, Primal Dawn","arch":"aegis"}],"items":[{"card":"Throne of the Grim Captain // The Grim Captain","arch":"armor"},{"card":"Altar of the Wretched // Wretched Bonemass","arch":"blade"},{"card":"Sledge-Class Seedship","arch":"charm"},{"card":"Monster Manual // Zoological Study","arch":"charm"},{"card":"Maskwood Nexus","arch":"charm"}]},{"key":"vile","deck":"A Vile Smashing","icon":"🧪","owner":"Kyle","cmdr":"Ishai, Ojutai Dragonspeaker + Vial Smasher the Fierce","name":"Hex & Smash","cls":"caster","duo":true,"blurb":"A hooded owl hexer and a goblin brute with a spiked maul.","stats":{"mana":8,"cards":11,"consistency":12,"threats":4,"clock":6,"reach":10,"answers":7,"staying":5,"control":7},"spells":[{"card":"Kefka, Dancing Mad","arch":"aegis"},{"card":"Naktamun Lorespinner // Wheel of Fortune","arch":"insight"},{"card":"Seizan, Perverter of Truth","arch":"drain"},{"card":"The Haunt of Hightower","arch":"regen"},{"card":"Nekusar, the Mindrazer","arch":"bolt"},{"card":"Blood for the Blood God!","arch":"nova"},{"card":"Sami, Wildcat Captain","arch":"pump"},{"card":"Voracious Fell Beast","arch":"summon"}],"items":[{"card":"Matzalantli, the Great Door // The Core","arch":"relic"},{"card":"Mask of Griselbrand","arch":"blade"},{"card":"World Map","arch":"charm"},{"card":"Entropic Battlecruiser","arch":"blade"},{"card":"Chromatic Lantern","arch":"relic"}]},{"key":"felothar","deck":"Felothar","icon":"🧱","owner":"Kyle","cmdr":"Felothar the Steadfast","name":"The Bulwark","cls":"tank","duo":false,"blurb":"A walking stone rampart with a tower shield.","stats":{"mana":7,"cards":7,"consistency":6,"threats":7,"clock":2,"reach":7,"answers":9,"staying":15,"control":11},"spells":[{"card":"Betor, Kin to All","arch":"drain"},{"card":"Baldin, Century Herdmaster","arch":"pump"},{"card":"Teyo, Geometric Tactician","arch":"summon"},{"card":"Nethroi, Apex of Death","arch":"regen"},{"card":"Canopy Gargantuan","arch":"aegis"},{"card":"Ayli, Eternal Pilgrim","arch":"smite"},{"card":"Flumph","arch":"insight"},{"card":"Overgrown Battlement","arch":"haste"}],"items":[{"card":"Captain America's Shield","arch":"armor"},{"card":"Sol Ring","arch":"relic"}]},{"key":"thing","deck":"Truly Fantastic","icon":"🪨","owner":"Kyle","cmdr":"The Thing","name":"Geode Golem","cls":"caster","duo":false,"blurb":"A cracked crystal brute that flings spell shards.","stats":{"mana":11,"cards":8,"consistency":7,"threats":7,"clock":8,"reach":5,"answers":8,"staying":6,"control":7},"spells":[{"card":"Bruce Banner // The Incredible Hulk","arch":"pump"},{"card":"The Unagi of Kyoshi Island","arch":"aegis"},{"card":"Recurring Insight","arch":"insight"},{"card":"Human Torch","arch":"bolt"},{"card":"Crystal, Inhuman Princess","arch":"nova"},{"card":"Invisible Woman","arch":"summon"},{"card":"Akroma's Will","arch":"regen"},{"card":"Ultros, Obnoxious Octopus","arch":"freeze"}],"items":[{"card":"Chromatic Lantern","arch":"relic"},{"card":"Sol Ring","arch":"relic"},{"card":"Arcane Signet","arch":"relic"},{"card":"Talisman of Creativity","arch":"relic"},{"card":"Izzet Signet","arch":"relic"}]},{"key":"kykar","deck":"Kykar, Zada & Feather","icon":"🪶","owner":"Cheez","cmdr":"Kykar, Wind's Fury","name":"Gale Magus","cls":"caster","duo":false,"blurb":"A storm-feathered wizard trailed by spirit wisps.","stats":{"mana":6,"cards":6,"consistency":10,"threats":7,"clock":8,"reach":11,"answers":5,"staying":8,"control":6},"spells":[{"card":"Kitsa, Otterball Elite","arch":"pump"},{"card":"God-Eternal Kefnet","arch":"insight"},{"card":"Sorcerer Class","arch":"nova"},{"card":"Talrand, Sky Summoner","arch":"summon"},{"card":"Firemind's Research","arch":"bolt"},{"card":"Unbreakable Formation","arch":"aegis"},{"card":"Essence Capture","arch":"counter"},{"card":"Balmor, Battlemage Captain","arch":"pump"}],"items":[{"card":"Sol Ring","arch":"relic"},{"card":"Swiftfoot Boots","arch":"armor"},{"card":"River Song's Diary","arch":"charm"},{"card":"Commander's Sphere","arch":"relic"},{"card":"Azorius Locket","arch":"relic"}]},{"key":"depala","deck":"Tame Depala","icon":"⚒️","owner":"Kyle","cmdr":"Depala, Pilot Exemplar","name":"Goggles Ironbeard","cls":"melee","duo":false,"blurb":"A dwarf pilot with a rocket hammer and too much confidence.","stats":{"mana":4,"cards":3,"consistency":11,"threats":9,"clock":7,"reach":6,"answers":8,"staying":11,"control":8},"spells":[{"card":"Kíli the Resourceful","arch":"insight"},{"card":"Magda, Brazen Outlaw","arch":"summon"},{"card":"Bruenor Battlehammer","arch":"pump"},{"card":"Balin, Loremaster","arch":"nova"},{"card":"Hammers of Moradin","arch":"freeze"},{"card":"Gimli, Counter of Kills","arch":"bolt"},{"card":"Thorin Oakenshield","arch":"aegis"},{"card":"Dáin's Company","arch":"regen"}],"items":[{"card":"Orcrist, Goblin-cleaver","arch":"blade"},{"card":"The Arkenstone // Seek the Heart","arch":"charm"},{"card":"Necron Monolith","arch":"armor"},{"card":"Colossal Plow","arch":"relic"},{"card":"Skysovereign, Consul Flagship","arch":"charm"}]},{"key":"kotis","deck":"Armed Robbery","icon":"🐍","owner":"Cheez","cmdr":"Kotis, the Fangkeeper","name":"Fang Thief","cls":"melee","duo":false,"blurb":"A masked serpent rogue with twin stolen daggers.","stats":{"mana":7,"cards":5,"consistency":8,"threats":6,"clock":11,"reach":9,"answers":6,"staying":6,"control":7},"spells":[{"card":"Otrimi, the Ever-Playful","arch":"bolt"},{"card":"Tasha, the Witch Queen","arch":"summon"},{"card":"Felix Five-Boots","arch":"aegis"},{"card":"The Thirteenth Doctor","arch":"pump"},{"card":"Growth Spiral","arch":"insight"},{"card":"Dirge Bat","arch":"smite"},{"card":"Cultivate","arch":"haste"},{"card":"Counterspell","arch":"counter"}],"items":[{"card":"Sword of the Animist","arch":"blade"},{"card":"Security Bypass","arch":"charm"},{"card":"Commander's Sphere","arch":"relic"},{"card":"Blackblade Reforged","arch":"blade"},{"card":"Quietus Spike","arch":"blade"}]},{"key":"dragons","deck":"Double Dragons","icon":"🐲","owner":"Cheez","cmdr":"Miirym, Sentinel Wyrm","name":"Twinscale","cls":"ranged","duo":false,"blurb":"A two-headed wyrmling; one head breathes fire, one breathes frost.","stats":{"mana":9,"cards":3,"consistency":8,"threats":13,"clock":7,"reach":11,"answers":7,"staying":2,"control":6},"spells":[{"card":"Dragonhawk, Fate's Tempest","arch":"nova"},{"card":"Lathliss, Dragon Queen","arch":"summon"},{"card":"Intet, the Dreamer","arch":"bolt"},{"card":"Atarka, World Render","arch":"pump"},{"card":"Kairi, the Swirling Sky","arch":"aegis"},{"card":"Earthquake Dragon","arch":"devour"},{"card":"Korlessa, Scale Singer","arch":"insight"},{"card":"Savage Ventmaw","arch":"haste"}],"items":[{"card":"Orb of Dragonkind","arch":"relic"},{"card":"Swiftfoot Boots","arch":"armor"},{"card":"Dragon's Hoard","arch":"relic"},{"card":"Chromatic Lantern","arch":"relic"},{"card":"Dragonstorm Globe","arch":"relic"}]},{"key":"mathas","deck":"Life Swappin' Bounty Poppin'","icon":"💰","owner":"Kyle","cmdr":"Mathas, Fiend Seeker","name":"Bounty Fiend","cls":"ranged","duo":false,"blurb":"A horned bounty hunter with a soul crossbow.","stats":{"mana":7,"cards":11,"consistency":5,"threats":2,"clock":15,"reach":2,"answers":11,"staying":1,"control":13},"spells":[{"card":"Seizan, Perverter of Truth","arch":"drain"},{"card":"Gix, Yawgmoth Praetor","arch":"bolt"},{"card":"K'rrik, Son of Yawgmoth","arch":"regen"},{"card":"Shay Cormac","arch":"aegis"},{"card":"Profane Transfusion","arch":"summon"},{"card":"Peer into the Abyss","arch":"insight"},{"card":"Bitter Triumph","arch":"smite"},{"card":"Knight of Dusk's Shadow","arch":"pump"}],"items":[{"card":"Bounty Board","arch":"relic"},{"card":"Soul Conduit","arch":"charm"},{"card":"Cursed Recording","arch":"relic"},{"card":"Sol Ring","arch":"relic"},{"card":"Arcane Signet","arch":"relic"}]},{"key":"turtle","deck":"Turtle Power","icon":"🐢","owner":"Cheez","cmdr":"Michelangelo, the Heart + Leonardo, the Balance","name":"Shell Brothers","cls":"melee","duo":true,"blurb":"Two tortoise knights: a shield-bearer and a spear-hand.","stats":{"mana":10,"cards":4,"consistency":4,"threats":11,"clock":4,"reach":5,"answers":8,"staying":10,"control":5},"spells":[{"card":"Jetmir, Nexus of Revels","arch":"pump"},{"card":"Hazel of the Rootbloom","arch":"summon"},{"card":"Roxanne, Starfall Savant","arch":"bolt"},{"card":"Jaheira, Friend of the Forest","arch":"haste"},{"card":"Kibo, Uktabi Prince","arch":"regen"},{"card":"White Sun's Twilight","arch":"nova"},{"card":"Junk Winder","arch":"freeze"},{"card":"Lessons from Life","arch":"insight"}],"items":[{"card":"Foot Chopper","arch":"blade"},{"card":"Chromatic Lantern","arch":"relic"},{"card":"Level Up","arch":"charm"},{"card":"Skullclamp","arch":"blade"},{"card":"Coin of Mastery","arch":"relic"}]},{"key":"marina","deck":"House on Haunted Hill","icon":"👻","owner":"Kyle","cmdr":"Marina Vendrell","name":"Lantern Witch","cls":"caster","duo":false,"blurb":"A witch whose lantern keeps a captive ghost.","stats":{"mana":11,"cards":8,"consistency":9,"threats":5,"clock":3,"reach":2,"answers":7,"staying":5,"control":11},"spells":[{"card":"Bello, Bard of the Brambles","arch":"bolt"},{"card":"Unholy Annex // Ritual Chamber","arch":"drain"},{"card":"Lynde, Cheerful Tormentor","arch":"insight"},{"card":"Smoky Lounge // Misty Salon","arch":"summon"},{"card":"Moldering Gym // Weight Room","arch":"pump"},{"card":"Abuelo, Ancestral Echo","arch":"aegis"},{"card":"Meat Locker // Drowned Diner","arch":"freeze"},{"card":"Prismatic Undercurrents","arch":"haste"}],"items":[{"card":"Chromatic Lantern","arch":"relic"},{"card":"Conjurer's Closet","arch":"charm"},{"card":"Haunted Screen","arch":"relic"},{"card":"Freed from the Real","arch":"relic"}]},{"key":"korvold","deck":"Korvold Eats Everything","icon":"🐉","owner":"Cheez","cmdr":"Korvold, Fae-Cursed King","name":"Gorge King","cls":"melee","duo":false,"blurb":"A winged glutton-drake that eats what it kills.","stats":{"mana":10,"cards":3,"consistency":8,"threats":3,"clock":3,"reach":8,"answers":9,"staying":11,"control":4},"spells":[{"card":"Kingpin, Wilson Fisk","arch":"summon"},{"card":"Garruk, Cursed Huntsman","arch":"smite"},{"card":"Judith, the Scourge Diva","arch":"bolt"},{"card":"Juri, Master of the Revue","arch":"pump"},{"card":"Priest of Forgotten Gods","arch":"drain"},{"card":"Primal Growth","arch":"devour"},{"card":"Cultivate","arch":"haste"},{"card":"Moldervine Reclamation","arch":"regen"}],"items":[{"card":"Commander's Sphere","arch":"relic"},{"card":"Swiftfoot Boots","arch":"armor"},{"card":"Spawning Pit","arch":"charm"},{"card":"Golden Egg","arch":"relic"},{"card":"Sol Ring","arch":"relic"}]},{"key":"thranduil","deck":"Thranduil","icon":"🧝","owner":"Leon","cmdr":"Thranduil, the Elvenking","name":"Leafwarden","cls":"ranged","duo":false,"blurb":"An elf ranger-lord with a silverwood bow.","stats":{"mana":11,"cards":5,"consistency":10,"threats":8,"clock":5,"reach":1,"answers":6,"staying":4,"control":9},"spells":[{"card":"Thranduil, Sindarin Liege // Silvan Rally","arch":"summon"},{"card":"Círdan the Shipwright","arch":"insight"},{"card":"Lathril, Blade of the Elves","arch":"drain"},{"card":"Marwyn, the Nurturer","arch":"pump"},{"card":"Dwynen, Gilt-Leaf Daen","arch":"regen"},{"card":"Shadowheart, Dark Justiciar","arch":"devour"},{"card":"Priest of Titania","arch":"haste"},{"card":"Paradise Druid","arch":"aegis"}],"items":[{"card":"Sol Ring","arch":"relic"},{"card":"Altar of Dementia","arch":"charm"},{"card":"Dimir Signet","arch":"relic"}]},{"key":"joel","deck":"The Last of Us","icon":"🍄","owner":"Kyle","cmdr":"Ellie, Vengeful Hunter + Joel, Resolute Survivor","name":"The Spore Runners","cls":"ranged","duo":true,"blurb":"A hooded scout with a bow and a bearded brawler with a pipe.","stats":{"mana":8,"cards":7,"consistency":6,"threats":4,"clock":2,"reach":10,"answers":6,"staying":7,"control":8},"spells":[{"card":"The Mycotyrant","arch":"summon"},{"card":"Grave Venerations","arch":"drain"},{"card":"Jaheira, Friend of the Forest","arch":"haste"},{"card":"Slimefoot, the Stowaway","arch":"nova"},{"card":"Goblin Bombardment","arch":"bolt"},{"card":"Overseer of the Damned","arch":"smite"},{"card":"Grim Haruspex","arch":"insight"},{"card":"Ignoble Hierarch","arch":"pump"}],"items":[{"card":"Cauldron of Essence","arch":"charm"},{"card":"Sol Ring","arch":"relic"},{"card":"Arcane Signet","arch":"relic"},{"card":"Eerie Gravestone","arch":"charm"}]},{"key":"robots","deck":"Primary Directive","icon":"🤖","owner":"Leon","cmdr":"Optimus Prime, Hero // Optimus Prime, Autobot Leader","name":"Aegis Prime-X","cls":"tank","duo":false,"blurb":"A battle robot with an arm cannon and a reactor heart.","stats":{"mana":8,"cards":7,"consistency":6,"threats":10,"clock":2,"reach":8,"answers":5,"staying":6,"control":5},"spells":[{"card":"Iron Man, Master of Machines","arch":"pump"},{"card":"Tri-Sentinel, Act of Vengeance","arch":"bolt"},{"card":"Tameshi, Reality Architect","arch":"insight"},{"card":"H.E.R.B.I.E., Lovable Robot","arch":"haste"},{"card":"Urza, Prince of Kroog","arch":"summon"},{"card":"Kappa Cannoneer","arch":"aegis"},{"card":"Bosh, Iron Golem","arch":"devour"},{"card":"Swords to Plowshares","arch":"smite"}],"items":[{"card":"Fabrication Foundry","arch":"relic"},{"card":"Uthros Research Craft","arch":"blade"},{"card":"Braided Net // Braided Quipu","arch":"charm"},{"card":"Dowsing Device // Geode Grotto","arch":"blade"},{"card":"Arc Reactor","arch":"relic"}]},{"key":"blood","deck":"Blood Suckers","icon":"🦇","owner":"Cheez","cmdr":"Zoraline, Cosmos Caller","name":"Nightwing Cleric","cls":"caster","duo":false,"blurb":"A bat-winged priestess who heals on every bite.","stats":{"mana":3,"cards":3,"consistency":7,"threats":5,"clock":2,"reach":9,"answers":11,"staying":9,"control":8},"spells":[{"card":"Aclazotz, Deepest Betrayal // Temple of the Dead","arch":"summon"},{"card":"Momo, Friendly Flier","arch":"pump"},{"card":"Darkstar Augur","arch":"drain"},{"card":"Vito, Thorn of the Dusk Rose","arch":"regen"},{"card":"Momo, Rambunctious Rascal","arch":"bolt"},{"card":"Etchings of the Chosen","arch":"aegis"},{"card":"Star Charter","arch":"insight"},{"card":"Dirge Bat","arch":"smite"}],"items":[{"card":"Sol Ring","arch":"relic"},{"card":"Desecrated Tomb","arch":"charm"},{"card":"Arcane Signet","arch":"relic"},{"card":"Commander's Sphere","arch":"relic"},{"card":"Pristine Talisman","arch":"relic"}]},{"key":"mech","deck":"Mechanized Mayhem","icon":"🥚","owner":"Cheez","cmdr":"Dr. Eggman","name":"Gearbrain","cls":"ranged","duo":false,"blurb":"A goblin tinkerer piloting a spider-legged walker.","stats":{"mana":7,"cards":2,"consistency":8,"threats":9,"clock":3,"reach":10,"answers":5,"staying":5,"control":5},"spells":[{"card":"Tezzeret, Master of the Bridge","arch":"nova"},{"card":"Cyclonus, the Saboteur // Cyclonus, Cybertronian Fighter","arch":"bolt"},{"card":"Traxos, Scourge of Kroog","arch":"freeze"},{"card":"Davros, Dalek Creator","arch":"summon"},{"card":"Ultron, Machine Overlord","arch":"pump"},{"card":"One with the Machine","arch":"insight"},{"card":"Walking Skyscraper","arch":"aegis"},{"card":"The Antiquities War","arch":"devour"}],"items":[{"card":"The Belligerent","arch":"charm"},{"card":"Cultivator's Caravan","arch":"relic"},{"card":"Darksteel Ingot","arch":"armor"},{"card":"Rolling Hamsphere","arch":"blade"},{"card":"Skysovereign, Consul Flagship","arch":"charm"}]},{"key":"weather","deck":"Ominous Weather","icon":"❄️","owner":"Kyle","cmdr":"Isu the Abominable","name":"Frostfang Yeti","cls":"melee","duo":false,"blurb":"A shaggy yeti shaman who calls blizzards.","stats":{"mana":6,"cards":5,"consistency":8,"threats":5,"clock":4,"reach":7,"answers":8,"staying":2,"control":6},"spells":[{"card":"Marit Lage's Slumber","arch":"freeze"},{"card":"The Pride of Hull Clade","arch":"bolt"},{"card":"Hylda of the Icy Crown","arch":"summon"},{"card":"Become the Avalanche","arch":"pump"},{"card":"Rishkar's Expertise","arch":"insight"},{"card":"Search for Tomorrow","arch":"haste"},{"card":"Ascendant Spirit","arch":"bolt"},{"card":"Cone of Cold","arch":"freeze"}],"items":[{"card":"Replicating Ring","arch":"relic"},{"card":"Snow Devil","arch":"blade"},{"card":"Arcane Signet","arch":"relic"},{"card":"Coldsteel Heart","arch":"relic"},{"card":"Azorius Signet","arch":"relic"}]}],"arch":{"bolt":{"label":"Bolt","titles":["Starfall","Hellfire Lance","the Pyre Eternal"]},"nova":{"label":"Nova","titles":["Cataclysm","the Last Sunrise","Worldbreaker"]},"smite":{"label":"Smite","titles":["Executioner","Final Verdict","the Godslayer"]},"drain":{"label":"Drain","titles":["Soul Harvest","the Bleeding Moon","Crimson Tithe"]},"summon":{"label":"Summon","titles":["Legion Eternal","the Endless Horde","Army of the Damned"]},"regen":{"label":"Regen","titles":["Undying Grace","the Phoenix Psalm","Everbloom"]},"aegis":{"label":"Aegis","titles":["Bastion Unbroken","the Last Wall","Adamant Dawn"]},"pump":{"label":"Pump","titles":["Titan Rising","the Warlord Ascendant","Giantblood"]},"devour":{"label":"Devour","titles":["the Gluttonous Abyss","Bone Feast","Maw of Ages"]},"haste":{"label":"Haste","titles":["Overdrive","the Thousand Hands","Quickening Storm"]},"insight":{"label":"Insight","titles":["the Open Eye","Omniscient","Library of Ash"]},"freeze":{"label":"Freeze","titles":["Absolute Zero","the Long Winter","Glacial Tomb"]},"counter":{"label":"Counter","titles":["Null Mirror","the Silent Ward","Spellbreaker"]},"blade":{"label":"Weapon","titles":["Kingsbane","the Red Edge","Doomforged"]},"armor":{"label":"Armor","titles":["Aegis of Ages","the Unbreakable","Ironsoul"]},"relic":{"label":"Relic","titles":["Clockwork Heart","the Ever-Turning","Infinity Engine"]},"charm":{"label":"Charm","titles":["Lucky Bones","Fate's Favorite","the Gilded Skull"]}}};      // heroes from the decks (built by battler_data.py)
const ATLAS={"sprites":{"h_grim":[0,0,64,64,9],"h_vile":[576,0,80,64,9],"h_felothar":[1296,0,64,64,9],"h_thing":[0,64,64,64,9],"h_kykar":[576,64,64,64,9],"h_depala":[1152,64,64,64,9],"h_kotis":[0,128,64,64,9],"h_dragons":[576,128,64,64,9],"h_mathas":[1152,128,64,64,9],"h_turtle":[0,192,80,64,9],"h_marina":[720,192,64,64,9],"h_korvold":[1296,192,64,64,9],"h_thranduil":[0,256,64,64,9],"h_joel":[576,256,80,64,9],"h_robots":[1296,256,64,64,9],"h_blood":[0,320,64,64,9],"h_mech":[576,320,64,64,9],"h_weather":[1152,320,64,64,9],"e_ghoul":[0,384,64,64,9],"e_cultist":[576,384,64,64,9],"e_knight":[1152,384,64,64,9],"e_wolfman":[0,448,64,64,9],"e_hag":[576,448,64,64,9],"e_zombie":[1152,448,64,64,9],"e_drowned":[0,512,64,64,9],"e_skeleton":[576,512,64,64,9],"e_archer":[1152,512,64,64,9],"e_thrall":[0,576,64,64,9],"e_wraith":[576,576,64,64,9],"e_leech":[1152,576,48,48,9],"e_bat":[1584,576,48,48,9],"e_ghost":[0,640,48,48,9],"e_gargoyle":[432,640,48,48,9],"e_hound":[864,640,48,48,9],"e_spawn":[1296,640,48,48,9],"e_eye":[0,688,48,48,9],"e_spider":[432,688,48,48,9],"b_gravelord":[864,688,128,128,3],"b_countess":[1248,688,128,128,3],"b_maw":[1632,688,128,128,3]},"bg":{"grave":{"far":[0,0,384,216],"mid":[0,216,384,140],"gr":[0,356,64,30]},"manor":{"far":[384,0,384,216],"mid":[384,216,384,140],"gr":[384,356,64,30]},"bog":{"far":[768,0,384,216],"mid":[768,216,384,140],"gr":[768,356,64,30]}}};    // sprite + backdrop atlas (built by make_crawl_art.py)
const OWNERS={Kyle:'🎩',Cheez:'🧀',Leon:'🪼'};

// ======================================================================= CONFIG TABLES
const CFG={
  W:384,H:216,GROUND:190,
  stagesPerBiome:3,
  maxStage:9,                       // add biomes below and raise this to extend the crawl
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
    {id:'grave',name:'Hollowmere Graveyard',pool:{zombie:5,skeleton:4,ghoul:3,bat:3,ghost:2,archer:2,cultist:2},boss:'gravelord'},
    {id:'manor',name:'Castle Sanguine',pool:{thrall:5,bat:4,hound:3,wolfman:3,gargoyle:2,knight:2,ghost:2},boss:'countess'},
    {id:'bog',name:'The Drowned Abbey',pool:{drowned:4,spawn:4,leech:4,spider:3,wraith:3,eye:2,hag:2},boss:'maw'},
  ],
  enemies:{ // hp/dmg at stage 1; spd px/s; atk = seconds between hits; cost = spawn budget
    zombie:  {hp:34,dmg:6, spd:10,atk:1.3,xp:2,pts:10,cost:1.6},
    skeleton:{hp:26,dmg:7, spd:15,atk:1.1,xp:2,pts:12,cost:1.6},
    archer:  {hp:20,dmg:6, spd:13,atk:1.9,xp:3,pts:15,cost:2.2,ranged:1,stop:300,proj:'arrow'},
    bat:     {hp:12,dmg:4, spd:38,atk:0.9,xp:1,pts:8, cost:1.0,fly:1},
    ghost:   {hp:22,dmg:6, spd:16,atk:1.3,xp:3,pts:15,cost:2.0,fly:1,dodge:.3},
    thrall:  {hp:44,dmg:9, spd:16,atk:1.1,xp:3,pts:18,cost:2.2,leech:.3},
    hound:   {hp:32,dmg:8, spd:44,atk:0.8,xp:3,pts:16,cost:2.0},
    gargoyle:{hp:64,dmg:9, spd:13,atk:1.5,xp:4,pts:25,cost:3.0,fly:1,armor:.25},
    drowned: {hp:54,dmg:10,spd:9, atk:1.3,xp:3,pts:18,cost:2.2},
    spawn:   {hp:32,dmg:8, spd:20,atk:0.9,xp:2,pts:12,cost:1.6},
    spider:  {hp:28,dmg:7, spd:34,atk:0.8,xp:3,pts:14,cost:1.8,poison:1},
    wraith:  {hp:46,dmg:12,spd:15,atk:1.2,xp:4,pts:24,cost:2.8,dodge:.2},
    eye:     {hp:36,dmg:9, spd:11,atk:2.2,xp:4,pts:22,cost:2.8,fly:1,ranged:1,stop:290,proj:'beam'},
    ghoul:   {hp:24,dmg:7, spd:30,atk:0.8,xp:2,pts:12,cost:1.6},
    cultist: {hp:26,dmg:8, spd:12,atk:2.0,xp:3,pts:18,cost:2.4,ranged:1,stop:290,proj:'skull'},
    knight:  {hp:90,dmg:12,spd:9, atk:1.6,xp:5,pts:32,cost:3.6,armor:.3},
    wolfman: {hp:58,dmg:11,spd:36,atk:0.9,xp:4,pts:26,cost:3.0},
    hag:     {hp:40,dmg:10,spd:11,atk:2.1,xp:4,pts:24,cost:2.8,ranged:1,stop:280,proj:'hex'},
    leech:   {hp:18,dmg:5, spd:26,atk:0.7,xp:2,pts:10,cost:1.2,leech:.5},
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
      len:820+70*(n-1),
      rate:(0.62+0.11*(n-1))*(1+0.3*P),
      hpMul:Math.pow(1.29,n-1)*Math.pow(2.2,P),
      dmgMul:Math.pow(1.16,n-1)*Math.pow(1.8,P),
      xpMul:1+0.32*(n-1)+P*2.4};
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
  joel:{atk:'duo',a:'brick',b:'melee',reach:28,hp:1.0,dmg:.9},
  robots:{atk:'ranged',proj:'plasma',range:190,hp:1.35,dmg:1.0,tank:1},
  blood:{atk:'caster',proj:'blood',hp:.95,dmg:.9,leech:.25},
  mech:{atk:'ranged',proj:'shell',range:200,hp:1.05,dmg:1.1,splash:12},
  weather:{atk:'caster',proj:'frost',hp:1.1,dmg:.95,chill:1},
};
const ORDER={melee:0,duo:1,ranged:2,caster:3};
// ---- damage pipeline: every hit goes through mitigate(). Today there is one type ('physical') and armor is a flat % reduction.
// To add types later: list them here, tag attacks with {type:'fire'} etc., and give enemies/heroes a resist map
// (e.g. CFG.enemies.zombie.resist={fire:-0.5, cold:0.3} = weak to fire, resists cold).
const DMG_TYPES={physical:{name:'Damage'}};
function mitigate(target,amt,type){
  type=type||'physical';
  const armor=target.armor!=null?target.armor:((target.E&&target.E.armor)||(target.B&&target.B.armor)||0);
  const res=(target.resist||(target.E&&target.E.resist)||(target.B&&target.B.resist)||{})[type]||0;
  return amt*(1-Math.min(.75,armor))*(1-res);
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
    txt:(r,a,S,o)=>`Calls ${1+Math.floor(r/5)+(S.aug.extra?1:0)} minion${r>=5||S.aug.extra?'s':''} (${Math.round(o.max*(.18+.03*r))} HP, ${Math.round(a*(.35+.06*r))} dmg) for 10s.`},
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

// ======================================================================= HERO STATS
function heroDef(key){return DATA.heroes.find(h=>h.key===key);}
function heroBase(key,lvl,teamSize){
  const d=heroDef(key),s=d.stats,st=STYLE[key];
  let hp=(70+9*s.staying)*st.hp, atk=(7+.7*s.threats+.4*s.clock)*st.dmg;
  const L=Math.max(1,lvl||1); hp*=1+.08*(L-1); atk*=1+.06*(L-1);
  const miss=3-teamSize; hp*=1+.3*miss; atk*=1+.3*miss;
  return {hp,atk,aspd:(0.8+0.025*s.mana)*(st.aspd||1)*(st.atk==='caster'?.8:1),crit:.04+.006*s.consistency,dodge:.008*s.control,
    pow:1+.04*s.answers,reach:1+.02*s.reach,luck:Math.round((s.consistency+s.cards)/4),xpm:1+.03*s.cards};
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
    this.stageXp=0;this.stageScore=0;
    this.heroes=this.run.team.map((k,i)=>this.makeHero(k));
    this.heroes.sort((a,b)=>(STYLE[a.key].tank?-1:0)-(STYLE[b.key].tank?-1:0)||ORDER[a.style.atk]-ORDER[b.style.atk]);
    this.recalc();
    this.heroes.forEach((h,i)=>{h.x=this.slotX(i);const saved=this.run.heroes[h.key];h.hp=saved.dead?h.max*.25:Math.max(1,h.max*(saved.hpf==null?1:saved.hpf));});
    this.spawnTimer=0;
  }
  makeHero(key){
    const sv=this.run.heroes[key];const lvl=(this.slot&&this.slot.heroes[key]||{lvl:1}).lvl;
    return {key,def:heroDef(key),style:STYLE[key],lvl,base:heroBase(key,lvl,this.run.team.length),spells:sv.spells.map(s=>Object.assign({cdT:Math.random()*1.5},s)),
      items:sv.items.slice(),alive:true,x:0,atkT:Math.random()*.5,anim:0,animT:0,walkT:Math.random(),shield:0,shieldT:0,buffT:0,lowT:0,nearT:0,hitFlash:0,alt:0};
  }
  slotX(i){return Math.round(this.W*0.36)-i*30;}
  // team-wide passives + per-hero items
  recalc(){
    const T={dmg:1,aspd:1,cdr:0,xp:1,luck:0,dodge:0,devour:0};
    for(const h of this.heroes)for(const s of h.spells){const r=s.r;
      if(s.arch==='pump')T.dmg+=.04*r; if(s.arch==='haste'){T.aspd+=.035*r;T.cdr+=.015*r;}
      if(s.arch==='insight'){T.xp+=.06*r;T.luck+=r;} if(s.arch==='devour')T.devour+=r;}
    this.team=T;
    for(const h of this.heroes){const b=h.base;let hpM=1,atkM=1,crit=b.crit,dr=0,cdr=T.cdr,aspd=T.aspd,luck=b.luck+T.luck,score=0;
      for(const it of h.items){const r=it.r;
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
    const e={type,E,x:this.W+10+this.rng()*20,y:E.fly?this.G-70+this.rng()*36:this.G,hp,max:hp,dmg:E.dmg*st.dmgMul*(elite?1.5:1),atkT:this.rng()*.5,
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
    amt=Math.max(1,amt);e.hp-=amt;e.hitFlash=.12;
    if(opt.kb>0){const ratio=Math.min(1,amt/Math.max(1,e.max));let kb=ratio<.08?ratio*12:ratio<.25?2+ratio*14:5+ratio*12;   // chip ~0, medium small, big decent
      if(crit)kb*=1.6;if(e.boss)kb*=.12;kb*=opt.kb;if(e.fly)kb*=.7;e.kbv=Math.max(e.kbv||0,Math.min(18,kb)*7);}
    this.text(e.x+(this.rng()*8-4),e.y-(e.boss?100:e.fly?16:44),Math.round(amt),crit?'#ffd23f':'#ffffff',crit);
    if(src&&src.style&&src.style.leech)this.healHero(this.weakest(),amt*src.style.leech*.5,true);
    if(src&&src.items&&src.items.length)this.procs(src,crit?'oncrit':'onhit',e);
    if(e.hp<=0)this.kill(e,src);
    return amt;
  }
  kill(e,src){
    e.dead=true;this.kills++;
    const xp=(e.boss?e.B.xp:e.E.xp*(e.elite?2.5:1))*this.st.xpMul;
    const pts=Math.round((e.boss?e.B.pts:e.E.pts*(e.elite?3:1))*(1+.4*(this.st.n-1))*(1+this.run.prestige)*(src?src.scoreM:1));
    this.stageScore+=pts;this.gainXp(xp);
    this.fx.push({k:'poof',x:e.x,y:e.y-(e.fly?0:20),t:0,big:!!e.boss||e.elite});
    if(this.team.devour){this.devourStacks=Math.min(60,this.devourStacks+1);for(const h of this.alive())if(h.spells.some(s=>s.arch==='devour'))this.healHero(h,h.max*(.006+.0025*this.spellRank(h,'devour')),true);}
    if(src&&src.items)this.procs(src,'onkill',e);
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
  hurtHero(h,amt,from){
    if(!h||!h.alive)return;
    if(this.rng()<h.dodge){this.text(h.x,this.G-52,'dodge','#9ae6ff');return;}
    amt=mitigate(h,amt,'physical');
    if(h.shield>0){const s=Math.min(h.shield,amt);h.shield-=s;amt-=s;if(h.thorns&&from&&!from.dead)this.hitEnemy(from,s*.3,null,{nocrit:1,sure:1});}
    if(amt<=0)return;
    h.hp-=amt;h.hitFlash=.12;this.text(h.x+4,this.G-52,Math.round(amt),'#ff5a5a');
    this.procs(h,'whenhit',from,amt);
    if(h.hp/h.max<.35)for(const o of this.alive())this.procs(o,'allylow',null,0,h);
    if(h.hp<=0){h.hp=0;h.alive=false;this.ev('herodown',{key:h.key});this.fx.push({k:'poof',x:h.x,y:this.G-20,t:0,big:true});
      if(!this.alive().length){this.over='defeat';this.ev('defeat');}}
  }
  procs(h,trig,e,amt,ally){
    for(const it of h.items){if(!it.proc)continue;const P=PROCS[it.proc];if(P.t!==trig)continue;const ch=procChance(it.r)/100;const a=h.atk*h.pow;
      if(trig==='onhit'||trig==='oncrit'){if(this.rng()>ch||!e||e.dead)continue;
        if(it.proc==='ignite'){e.burn=Math.max(e.burn,a*.35);e.burnT=3;}
        if(it.proc==='spark')this.shoot(h,e,'bolt',a*.8,{});
        if(it.proc==='stunhit')e.stun=Math.max(e.stun,.6);
        if(it.proc==='critnova'){this.fx.push({k:'ring',x:e.x,y:e.y-16,r:22,t:0,c:'#ffb040'});for(const o of this.enemies)if(!o.dead&&Math.abs(o.x-e.x)<26)this.hitEnemy(o,a*.6,null,{nocrit:1});}}
      if(trig==='onkill'){if(this.rng()>ch)continue;
        if(it.proc==='killheal')for(const o of this.alive())this.healHero(o,o.max*.04);
        if(it.proc==='killraise')this.addMinion(h,h.max*.15,a*.4,8,'raise');}
      if(trig==='whenhit'){
        if(it.proc==='hitshield'&&this.rng()<ch){h.shield+=h.max*.08;h.shieldT=4;}
        if(it.proc==='hitthorns'&&e&&!e.dead)this.hitEnemy(e,amt*ch*1.5,null,{nocrit:1,sure:1});}
      if(trig==='allylow'&&ally&&ally.alive&&!(it.cd>0)){it.cd=20;this.healHero(ally,ally.max*(.1+ch/2));this.fx.push({k:'ring',x:ally.x,y:this.G-24,r:16,t:0,c:'#7dff9a'});}
      if(trig==='oncast'&&this.rng()<ch){h.buffT=3;}
      if(trig==='near'&&!(it.cd>0)){it.cd=6;this.fx.push({k:'ring',x:h.x+20,y:this.G-20,r:40,t:0,c:'#9ae6ff'});
        for(const o of this.enemies)if(!o.dead&&o.x-h.x<60){o.slow=Math.max(o.slow,.4+.02*it.r);o.slowT=2;this.hitEnemy(o,a*(.2+.05*it.r),null,{nocrit:1});}}
    }
  }
  addMinion(owner,hp,atk,life,kind){const f=this.front();const m={owner,hp,max:hp,atk,life,x:(f?f.x:120)+16+this.rng()*10,atkT:0,kind:kind||'spirit',taunt:false,explode:false,leech:false};this.minions.push(m);return m;}
  shoot(h,target,kind,dmg,opt){
    const y0=this.G-30;const p={kind,x:h.x+10,y:y0,tx:target,dmg,src:h,spd:kind==='brick'?190:240,pierce:opt.pierce||0,opt,t:0,vy:kind==='brick'?-70:0,hit:new Set()};
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
        for(let i=0;i<n;i++){const p=this.shoot(h,tg[i%tg.length],'bolt',a*(.7+.12*r),{pierce:aug.pierce?3:0,onHit:(e,d)=>onHit(e,d,0),chain:aug.chain});}break;}
      case 'nova':{const f=this.front();if(!f||!live.length){did=false;break;}const R=(46+3*r)*h.reach;fx('ring',{x:f.x+R/2,y:this.G-22,r:R*.6,c:'#c050ff'});
        let any=false;for(const e of live)if(e.x-f.x<R){onHit(e,a*(1.2+.22*r));any=true;}this.shake=Math.max(this.shake,.2);if(!any)did=false;break;}
      case 'smite':{if(!live.length){did=false;break;}const tg=live.slice().sort((p,q)=>q.hp-p.hp);fx('beam',{x:tg[0].x,y:tg[0].y,c:'#fff4a0'});onHit(tg[0],a*(2.4+.45*r));
        if(aug.chain&&tg[1]){fx('beam',{x:tg[1].x,y:tg[1].y,c:'#fff4a0'});onHit(tg[1],a*(1.2+.22*r));}break;}
      case 'drain':{if(!live.length){did=false;break;}const n=2+Math.floor(r/3)+(aug.extra?2:0);let tot=0;const tg=live.slice().sort(()=>this.rng()-.5).slice(0,n);
        for(const e of tg){tot+=onHit(e,a*(.6+.12*r),0);fx('drain',{x:e.x,y:e.y-(e.fly?0:24),tx:h.x,c:'#ff3a5a'});}this.healHero(this.weakest(),tot*.4);break;}
      case 'summon':{const n=1+Math.floor(r/5)+extra;for(let i=0;i<n;i++){const m=this.addMinion(h,h.max*(.18+.03*r),a*(.35+.06*r),10,h.key==='blood'?'bat':h.key==='joel'?'spore':h.key==='robots'||h.key==='mech'?'drone':'spirit');
        m.taunt=!!aug.taunt;m.explode=!!aug.explode;m.leech=!!aug.leech;}break;}
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
    al.forEach((h,i)=>{const tx=this.slotX(i);h.x+=(tx-h.x)*Math.min(1,dt*3);});
    const f=this.front();if(!f)return;
    // blocking: walk unless something is close
    const near=this.enemies.filter(e=>!e.dead&&!e.fly).reduce((m,e)=>Math.min(m,e.x-(e.boss?e.w:0)-(e.ranged?40:0)),1e9);
    const blocked=near<f.x+70||(this.boss&&!this.boss.dead);
    const scroll=blocked?0:CFG.walkSpeed;this.scroll=scroll;
    if(!this.bossSpawned)this.dist+=scroll*dt;
    // spawning
    const stageDone=this.dist>=this.st.len;
    if(!stageDone){this.budget+=this.st.rate*dt;
      const type=this.nextType||(this.nextType=this.pickType());const c=CFG.enemies[type].cost;
      if(this.budget>=c&&this.enemies.filter(e=>!e.dead).length<14){this.budget-=c;this.spawnEnemy(type);this.nextType=null;}}
    else if(this.st.boss&&!this.bossSpawned&&!this.enemies.some(e=>!e.dead))this.spawnBoss();
    else if(!this.st.boss&&!this.enemies.some(e=>!e.dead)&&!this.demo){this.over='clear';this.ev('clear');return;}
    if(this.demo&&stageDone){this.dist=0;}
    if(this.boss&&this.boss.dead&&!this.over&&!this.demo){this.over='clear';this.ev('clear');return;}
    // heroes
    for(const h of al){
      h.walkT+=dt*(scroll?1:0);if(h.animT>0)h.animT-=dt;if(h.hitFlash>0)h.hitFlash-=dt;if(h.buffT>0)h.buffT-=dt;
      if(h.shieldT>0){h.shieldT-=dt;if(h.shieldT<=0)h.shield=0;}
      for(const it of h.items)if(it.cd>0)it.cd-=dt;
      if(this.enemies.some(e=>!e.dead&&e.x-h.x<36))this.procs(h,'near');
      // spells
      for(const s of h.spells){if(SPELL[s.arch].passive)continue;s.cdT-=dt;if(s.cdT<=0){const ok=this.cast(h,s);s.cdT=ok?SPELL[s.arch].cd*(1-h.cdr):.5;}}
      // basic attack
      h.atkT+=dt*h.aspd*(h.buffT>0?1.3:1);
      const st=h.style;const ox=(st.atk==='melee'||st.atk==='duo')?f.x:h.x;   // melee fighters step up to the front line
      const range=st.atk==='melee'?st.reach+6:st.atk==='duo'?(st.a!=='melee'?170:st.reach+6):st.range||170;
      const tgt=this.enemies.filter(e=>!e.dead&&e.x-(e.boss?e.w:0)-ox<=range&&e.x>h.x-10).sort((p,q)=>p.x-q.x)[0];
      h.lunge=(st.atk==='melee'||(st.atk==='duo'&&st.b==='melee'))&&tgt&&tgt.x-(tgt.boss?tgt.w:0)-f.x<st.reach+6?f.x-h.x:0;
      if(tgt&&h.atkT>=1){h.atkT=0;h.anim=1;h.animT=.32;this.basic(h,tgt);}
      if(h.atkT>1)h.atkT=1;
    }
    // minions
    for(const m of this.minions){m.life-=dt;m.atkT+=dt;const tx=f.x+6;m.x+=(tx+(this.minions.indexOf(m)*6)-m.x)*Math.min(1,dt*2);
      const e=this.enemies.filter(e=>!e.dead&&Math.abs(e.x-(e.boss?e.w:0)-m.x)<30)[0];
      if(e&&m.atkT>=1){m.atkT=0;const d=this.hitEnemy(e,m.atk,m.owner.alive?{crit:m.owner.crit,scoreM:m.owner.scoreM,items:[]}:null,{});if(m.leech)this.healHero(this.weakest(),d*.2,true);}
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
        if(!e.target||!e.target.alive)e.target=al[Math.floor(this.rng()*al.length)];
        const tx=e.ranged?Math.max(e.E.stop*this.W/CFG.W,f.x+90):e.target.x+16,ty=this.G-40+Math.sin(this.t*3+e.phase)*8-(e.ranged?20:0);
        e.x-=scroll*dt;if(e.x>tx)e.x-=Math.min(e.x-tx,e.E.spd*sp*dt);e.y+=(ty-e.y)*Math.min(1,dt*2);
        e.atkT+=dt;if(e.atkT>=e.E.atk&&Math.abs(e.x-tx)<6){e.atkT=0;e.anim=1;e.animT=.3;
          if(e.ranged)this.enemyShot(e,e.target);else this.hurtHero(e.target,e.dmg,e);}
      }else if(e.ranged){
        const stop=Math.max(e.E.stop*this.W/CFG.W,f.x+80);e.x-=scroll*dt;if(e.x>stop)e.x-=e.E.spd*sp*dt;e.x=Math.max(e.x,blockX);
        e.atkT+=dt;if(e.atkT>=e.E.atk&&e.x<this.W-10){e.atkT=0;e.anim=1;e.animT=.3;const t=al[Math.floor(this.rng()*al.length)];this.enemyShot(e,t);}
      }else{
        e.x-=scroll*dt;if(e.x>blockX)e.x=Math.max(blockX,e.x-e.E.spd*sp*dt);
        if(e.x<=blockX+2){e.atkT+=dt;if(e.atkT>=e.E.atk){e.atkT=0;e.anim=1;e.animT=.3;
          if(tank){tank.hp-=e.dmg;}else{this.hurtHero(f,e.dmg,e);if(e.E.leech)e.hp=Math.min(e.max,e.hp+e.dmg*e.E.leech);}}}
      }
    }
    this.enemies=this.enemies.filter(e=>!e.dead||e.boss);
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
    for(const x of this.fx)x.t+=dt;this.fx=this.fx.filter(x=>x.t<.6);
    for(const x of this.texts){x.t+=dt;x.y-=dt*14;}this.texts=this.texts.filter(x=>x.t<.9);
    if(this.shake>0)this.shake-=dt;
  }
  basic(h,tgt){
    const st=h.style;let kind=st.atk;
    if(kind==='duo'){const f=this.front();const close=tgt.x-(tgt.boss?tgt.w:0)-f.x<st.reach+6;
      kind=st.a==='melee'?'melee':(close?(h.alt++%2===0?st.a:'melee'):st.a);}
    if(kind==='melee'){const hits=st.double?2:1;
      for(let i=0;i<hits;i++){this.hitEnemy(tgt,h.atk*(i?0.8:1),h,{kb:1});}
      for(const o of this.enemies)if(o!==tgt&&!o.dead&&!o.fly&&Math.abs(o.x-tgt.x)<12)this.hitEnemy(o,h.atk*.4,h,{nocrit:1});
      this.fx.push({k:'slash',x:tgt.x-6,y:tgt.boss?tgt.y-50:tgt.fly?tgt.y:tgt.y-24,t:0});return;}
    const pk=kind==='ranged'||kind==='caster'?st.proj:kind;
    const p=this.shoot(h,tgt,pk,h.atk,{});p.splash=st.splash||(pk==='orb'?12:0);p.chill=st.chill;
    if(kind==='caster')p.spd=200;
  }
  enemyShot(e,t){if(!t)return;this.proj.push({enemy:true,kind:e.E?e.E.proj:'bat',x:e.x-8,y:e.fly?e.y:e.y-30,tx:t,dmg:e.dmg,src:e,spd:150,t:0});}
  bossAI(b,dt,sp,f){
    const al=this.alive();const k=b.type;b.walkT+=dt;
    const stop=k==='maw'?Math.max(f.x+b.w+30,this.W-96):f.x+b.w+(k==='countess'?14:18);
    if(b.x>stop)b.x-=Math.max(18,b.B.spd)*sp*dt*(k==='maw'?2.2:1.6);
    if(k==='countess')b.y=this.G-40+Math.sin(this.t*1.6)*10;
    b.t1-=dt;b.t2-=dt;b.t3-=dt;
    if(b.x>stop+4)return;
    if(k==='gravelord'){
      if(b.t1<=0){b.t1=2.2;b.anim=1;b.animT=.5;this.hurtHero(f,b.dmg,b);}
      if(b.t2<=0){b.t2=7;b.anim=1;b.animT=.6;this.shake=.4;this.fx.push({k:'ring',x:f.x,y:this.G-6,r:70,t:0,c:'#a6ff2e'});for(const h of al)this.hurtHero(h,b.dmg*.7,b);}
      if(b.t3<=0){b.t3=9;for(let i=0;i<3;i++)this.spawnEnemy('zombie',{x:b.x+10+i*12,hp:CFG.enemies.zombie.hp*this.st.hpMul*.8,max:CFG.enemies.zombie.hp*this.st.hpMul*.8});}
    }else if(k==='countess'){
      if(b.t1<=0){b.t1=1.3;b.anim=1;b.animT=.4;for(let i=0;i<2;i++){const t=al[Math.floor(this.rng()*al.length)];this.proj.push({enemy:true,kind:'batswarm',x:b.x-20,y:b.y-60,tx:t,dmg:b.dmg*.55,src:b,spd:130+i*30,t:0});}}
      if(b.t2<=0){b.t2=8;b.anim=1;b.animT=.6;let tot=0;for(const h of al){const d=b.dmg*.5;this.hurtHero(h,d,b);tot+=d;}b.hp=Math.min(b.max,b.hp+tot*.5);this.fx.push({k:'drainall',t:0,x:b.x,y:b.y-60});}
      if(b.t3<=0){b.t3=10;for(let i=0;i<4;i++)this.spawnEnemy('bat',{x:b.x+i*8});}
    }else{
      if(b.t1<=0){b.t1=2.6;b.anim=1;b.animT=.5;const t=al[Math.floor(this.rng()*al.length)];this.fx.push({k:'tentacle',x:t.x,y:this.G,t:0});this.hurtHero(t,b.dmg*1.15,b);}
      if(b.t2<=0){b.t2=7.5;b.anim=1;b.animT=.8;this.shake=.4;this.fx.push({k:'beamall',t:0,x:b.x,y:b.y-70});for(const h of al)this.hurtHero(h,b.dmg*.6,b);}
      if(b.t3<=0){b.t3=6.5;for(let i=0;i<2;i++)this.spawnEnemy('spawn',{x:b.x-30+i*10});}
    }
  }
  // snapshot what carries to the save point
  saveBack(){for(const h of this.heroes){const sv=this.run.heroes[h.key];sv.hpf=h.alive?h.hp/h.max:0;sv.dead=!h.alive;sv.spells=h.spells.map(s=>({card:s.card,arch:s.arch,r:s.r,augs:s.augs||[]}));}}
}
function setTimeoutSafe(g,t,fn){(g.timers=g.timers||[]).push({t,fn});}
const BIGP={brick:.5};   // ranged shots don't shove, except the thrown brick (a little)
const PCOL={skull:'#7dff9a',hex:'#c050ff',bolt:'#ffb040',orb:'#c050ff',arrow:'#e8e0c8',quarrel:'#e8e0c8',fire:'#ff8a1f',shard:'#6ff0ff',zap:'#bfefff',wisp:'#7dff9a',plasma:'#3ff0ff',blood:'#ff2a3a',shell:'#ffd23f',frost:'#9ae6ff',brick:'#c0603a'};

// ======================================================================= RUN / PICKS (pure)
function newRun(team,slot){
  const run={team:team.slice(),stage:1,prestige:0,score:0,xp:0,lv:0,pending:0,rerolls:1,heroes:{}};
  for(const k of team){const d=heroDef(k);run.heroes[k]={hpf:1,dead:false,spells:[{card:d.spells[0].card,arch:d.spells[0].arch,r:1,augs:[]}],items:[]};}
  return run;
}
function rollRarity(rng,luck,prestige,min){
  const R=CFG.rarity.filter(r=>!(r.minPrestige>prestige));let tot=0;const ws=R.map((r,i)=>{const w=r.w*(i?1+luck*.025:1);tot+=w;return w;});
  let x=rng()*tot;let pick=R[0];for(let i=0;i<R.length;i++){x-=ws[i];if(x<=0){pick=R[i];break;}}
  if(min&&CFG.rarity.indexOf(pick)<CFG.rarity.findIndex(r=>r.id===min))pick=CFG.rarity.find(r=>r.id===min);
  return pick;
}
function offers(run,rng,n){
  rng=rng||Math.random;const out=[];const luck=run.team.reduce((m,k)=>m+heroBase(k,1,3).luck,0)/run.team.length+(run.heroes&&Object.values(run.heroes).reduce((m,h)=>m+h.spells.filter(s=>s.arch==='insight').reduce((a,s)=>a+s.r,0)+h.items.filter(i=>i.arch==='charm').reduce((a,i)=>a+i.r,0),0));
  const pool=[];
  for(const k of run.team){const d=heroDef(k),hv=run.heroes[k];
    for(const s of d.spells)if(!hv.spells.some(x=>x.card===s.card))pool.push({kind:'new',slot:'spell',hero:k,card:s.card,arch:s.arch,w:1.1});
    for(const it of d.items)if(!hv.items.some(x=>x.card===it.card))pool.push({kind:'new',slot:'item',hero:k,card:it.card,arch:it.arch,w:.9});
    for(const s of hv.spells){if(s.r<CFG.maxRank)pool.push({kind:'up',slot:'spell',hero:k,card:s.card,arch:s.arch,w:1.5});
      const A=SPELL[s.arch].augs.filter(g=>!(s.augs||[]).includes(g));if(A.length&&(s.augs||[]).length<1+Math.floor(s.r/4))pool.push({kind:'aug',slot:'spell',hero:k,card:s.card,arch:s.arch,aug:A[Math.floor(rng()*A.length)],w:.8});}
    for(const it of hv.items)if(it.r<CFG.maxRank)pool.push({kind:'up',slot:'item',hero:k,card:it.card,arch:it.arch,w:1.2});}
  const used=new Set();
  while(out.length<(n||3)&&pool.length){let tot=pool.reduce((m,p)=>m+p.w,0),x=rng()*tot,i=0;for(;i<pool.length;i++){x-=pool[i].w;if(x<=0)break;}
    const p=pool.splice(Math.min(i,pool.length-1),1)[0];const key=p.hero+p.card+p.kind;if(used.has(key))continue;used.add(key);
    p.rar=rollRarity(rng,luck,run.prestige,p.kind==='aug'?'U':null);out.push(p);}
  return out;
}
function applyOffer(run,o,replaceIdx){
  const hv=run.heroes[o.hero];const list=o.slot==='spell'?hv.spells:hv.items;
  if(o.kind==='new'){const e={card:o.card,arch:o.arch,r:o.rar.pts,augs:[]};if(o.slot==='item')e.proc=procFor(o.card);
    if(list.length>=CFG.slots[o.slot]){if(replaceIdx==null)return 'full';list.splice(replaceIdx,1,e);}else list.push(e);}
  else{const e=list.find(x=>x.card===o.card);if(!e)return;if(o.kind==='up')e.r=Math.min(CFG.maxRank,e.r+o.rar.pts);else{(e.augs=e.augs||[]).push(o.aug);e.r=Math.min(CFG.maxRank,e.r+o.rar.pts-1);}}
  run.pending=Math.max(0,run.pending-1);return 'ok';
}
function describe(o,run,slot){
  const hv=run.heroes[o.hero];const list=o.slot==='spell'?hv.spells:hv.items;const cur=list.find(x=>x.card===o.card);
  const r0=cur?cur.r:0,r1=o.kind==='new'?o.rar.pts:Math.min(CFG.maxRank,r0+(o.kind==='aug'?o.rar.pts-1:o.rar.pts));
  const lvl=(slot&&slot.heroes[o.hero]||{lvl:1}).lvl;const b=heroBase(o.hero,lvl,run.team.length);const a=b.atk*b.pow;const fake={max:b.hp};
  const augs={};for(const g of (cur&&cur.augs)||[])augs[g]=1;if(o.kind==='aug')augs[o.aug]=1;
  let txt;if(o.slot==='spell')txt=SPELL[o.arch].txt(r1,a,{aug:augs},fake);else{txt=ITEM[o.arch].txt(r1);const pr=cur?cur.proc:procFor(o.card);if(pr)txt+='. '+PROCS[pr].txt(procChance(r1));}
  return {r0,r1,txt,augs:Object.keys(augs)};
}

// ======================================================================= SAVES
const SKEY='podrundown-crawl-v1';
const Save={
  load(){try{return JSON.parse(localStorage.getItem(SKEY))||{v:1,players:{}};}catch(e){return {v:1,players:{}};}},
  write(d){try{localStorage.setItem(SKEY,JSON.stringify(d));}catch(e){}},
  pinHash(p,pin){return String(strHash('crypt:'+p+':'+pin+':pod'));},
};
function newSlot(player){const heroes={};for(const h of DATA.heroes)if(h.owner===player)heroes[h.key]={lvl:1,xp:0};return {heroes,best:{score:0,stage:0,prestige:0},runs:0,run:null,created:Date.now()};}

// ======================================================================= exports for node sims
const API={CFG,STYLE,SPELL,ITEM,PROCS,Game,newRun,offers,applyOffer,describe,heroBase,heroDef,DATA,newSlot,needHeroXp};
if(typeof module!=='undefined'&&module.exports){module.exports=API;}
if(typeof document==='undefined')return;

// ======================================================================= UI (browser only)
const IMG=new Image();IMG.src='crawl.png?v=1793292369';const BGI=new Image();BGI.src='crawl_bg.png?v=1793292369';
const SP=ATLAS.sprites,BGA=ATLAS.bg;
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
function ptext(ctx,s,x,y,col,sc){sc=sc||1;const w=s.length*4*sc;let cx=Math.round(x-w/2);y=Math.round(y);
  for(const ch of s){const g=FONT[ch];if(g){ctx.fillStyle='#0c0810';for(let i=0;i<15;i++)if(g[i]==='1')ctx.fillRect(cx+(i%3)*sc+sc,y+Math.floor(i/3)*sc+sc,sc,sc);
    ctx.fillStyle=col;for(let i=0;i<15;i++)if(g[i]==='1')ctx.fillRect(cx+(i%3)*sc,y+Math.floor(i/3)*sc,sc,sc);}cx+=4*sc;}}
// ---------------------------------------------------------------- renderer
function spr(ctx,name,fr,x,y,flip,alpha,flash){const a=SP[name];if(!a)return;const [sx,sy,w,h,n]=a;fr=Math.max(0,Math.min(n-1,fr|0));
  ctx.save();if(alpha!=null)ctx.globalAlpha=alpha;
  if(flip){ctx.translate(Math.round(x)+w,Math.round(y));ctx.scale(-1,1);ctx.drawImage(IMG,sx+fr*w,sy,w,h,0,0,w,h);}
  else ctx.drawImage(IMG,sx+fr*w,sy,w,h,Math.round(x),Math.round(y),w,h);
  if(flash>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,flash*6)*.7;if(flip)ctx.drawImage(IMG,sx+fr*w,sy,w,h,0,0,w,h);else ctx.drawImage(IMG,sx+fr*w,sy,w,h,Math.round(x),Math.round(y),w,h);}
  ctx.restore();}
function drawBG(ctx,g,W,oy){
  const b=BGA[g.st.biome.id];const d=g.dist+(g.demo?g.t*8:0);
  const fo=Math.floor(d*.06)%384;for(let x=-fo;x<W;x+=384)ctx.drawImage(BGI,b.far[0],b.far[1],384,216,x,-oy,384,216);
  const mo=Math.floor(d*.42)%384;for(let x=-mo;x<W;x+=384)ctx.drawImage(BGI,b.mid[0],b.mid[1],384,140,x,CFG.GROUND-4-140+6-oy,384,140);
  const go=Math.floor(d)%64;for(let x=-go;x<W;x+=64)ctx.drawImage(BGI,b.gr[0],b.gr[1],64,30,x,CFG.GROUND-4-oy,64,30);
}
function shadow(ctx,x,y,w){ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(Math.round(x),Math.round(y),w,2.5,0,0,7);ctx.fill();}
const MINI={bat:'e_bat',spirit:'e_ghost',raise:'e_skeleton',spore:'e_spawn',drone:'e_eye'};
function drawGame(ctx,g,W,oy){
  ctx.imageSmoothingEnabled=false;ctx.save();
  if(g.shake>0)ctx.translate(Math.round((Math.random()-.5)*4*g.shake),Math.round((Math.random()-.5)*3*g.shake));
  drawBG(ctx,g,W,oy);ctx.translate(0,-oy);const G=g.G;
  // minions
  for(const m of g.minions){const n=MINI[m.kind]||'e_ghost';const a=SP[n];shadow(ctx,m.x,G,6);
    ctx.save();ctx.translate(m.x,G-(n==='e_skeleton'?40:32));ctx.scale(.62,.62);spr(ctx,n,Math.floor(g.t*8)%6,-a[2]/2,0,true,.88);ctx.restore();}
  // heroes (back to front)
  const hs=g.heroes.slice().sort((a,b)=>a.x-b.x);
  for(const h of hs){if(!h.alive){continue;}
    let fr=0;if(h.animT>0)fr=6+Math.min(2,Math.floor((.32-h.animT)/.107));else if(g.scroll)fr=Math.floor(h.walkT*9)%6;
    const lx=h.animT>0&&h.lunge?h.lunge*Math.sin(Math.PI*(1-h.animT/.32))*.9:0;
    shadow(ctx,h.x+lx,G,9);spr(ctx,'h_'+h.key,fr,h.x+lx-32,G-60,false,null,h.hitFlash);
    if(h.shield>0){ctx.strokeStyle='rgba(154,230,255,.7)';ctx.beginPath();ctx.ellipse(Math.round(h.x+lx),G-24,15,27,0,0,7);ctx.stroke();}
    const w=22,pct=Math.max(0,h.hp/h.max);ctx.fillStyle='#120a14';ctx.fillRect(Math.round(h.x-w/2)-1,G-63,w+2,4);ctx.fillStyle=pct>.5?'#4fd46a':pct>.25?'#ffb020':'#e8303a';ctx.fillRect(Math.round(h.x-w/2),G-62,Math.round(w*pct),2);}
  // enemies
  const es=g.enemies.filter(e=>!e.dead).sort((a,b)=>b.x-a.x);
  for(const e of es){let fr=e.animT>0?6+Math.min(2,Math.floor((.3-e.animT)/.1)):Math.floor(e.walkT*8)%6;
    if(e.boss){const bf=e.animT>0?2:Math.floor(g.t*2)%2;const y=e.fly?e.y-90:G-124;shadow(ctx,e.x,G,26);spr(ctx,'b_'+e.type,bf,e.x-64,y,false,null,e.hitFlash);continue;}
    const n='e_'+e.type,a=SP[n];const big=a[3]===64;
    const y=e.fly?e.y-a[3]/2:G-(big?60:44);if(!e.fly)shadow(ctx,e.x,G,big?8:7);
    if(e.elite){ctx.save();ctx.translate(e.x,y+a[3]);ctx.scale(1.22,1.22);spr(ctx,n,fr,-a[2]/2,-a[3],false,null,e.hitFlash);ctx.restore();}
    else spr(ctx,n,fr,e.x-a[2]/2,y,false,null,e.hitFlash);
    if(e.slow>0){ctx.fillStyle='rgba(154,230,255,.8)';for(let i=0;i<3;i++)ctx.fillRect(Math.round(e.x-6+i*5),Math.round(y+8+((g.t*20+i*7)%20)),1,1);}
    if(e.burnT>0){ctx.fillStyle=Math.random()<.5?'#ffb040':'#ff5a1a';ctx.fillRect(Math.round(e.x-3+Math.random()*6),Math.round(y+10+Math.random()*12),1,2);}
    if(e.hp<e.max){const w=e.elite?20:14;ctx.fillStyle='#120a14';ctx.fillRect(Math.round(e.x-w/2)-1,Math.round(y)-2,w+2,3);ctx.fillStyle=e.elite?'#ffb020':'#e8303a';ctx.fillRect(Math.round(e.x-w/2),Math.round(y)-1,Math.round(w*Math.max(0,e.hp/e.max)),1);}}
  // projectiles
  for(const p of g.proj){const x=Math.round(p.x),y=Math.round(p.y);const c=PCOL[p.kind]||'#ff3a3a';
    if(p.kind==='arrow'||p.kind==='quarrel'){ctx.fillStyle=p.enemy?'#c8b8a0':'#e8e0c8';ctx.fillRect(x-(p.enemy?-1:5),y,6,1);ctx.fillStyle='#8a6a4a';ctx.fillRect(p.enemy?x+6:x-6,y-1,1,3);}
    else if(p.kind==='brick'){ctx.save();ctx.translate(x,y);ctx.rotate(p.rot||0);ctx.fillStyle='#9a3a24';ctx.fillRect(-3,-2,6,4);ctx.fillStyle='#c8603a';ctx.fillRect(-3,-2,6,1);ctx.restore();}
    else if(p.kind==='beam'){ctx.fillStyle='#ff2a3a';ctx.fillRect(x,y,8,1);}
    else if(p.kind==='batswarm'){ctx.fillStyle='#1a0a14';ctx.fillRect(x-3,y,7,2);ctx.fillRect(x-1,y-1,3,1);ctx.fillStyle='#ff2a2a';ctx.fillRect(x,y,1,1);}
    else{ctx.fillStyle=c;ctx.globalAlpha=.4;ctx.fillRect(x-5,y-1,5,3);ctx.globalAlpha=1;ctx.fillRect(x-1,y-1,3,3);ctx.fillStyle='#fff';ctx.fillRect(x,y,1,1);}}
  // fx
  for(const f of g.fx){const k=f.t/.6;
    if(f.k==='poof'){ctx.fillStyle=`rgba(180,170,190,${1-k})`;for(let i=0;i<(f.big?10:6);i++){const a=i*1.1;const r=4+k*(f.big?22:12);ctx.fillRect(Math.round(f.x+Math.cos(a)*r),Math.round(f.y+Math.sin(a)*r*.6),2,2);}}
    if(f.k==='ring'){ctx.strokeStyle=f.c;ctx.globalAlpha=1-k;ctx.beginPath();ctx.ellipse(Math.round(f.x),Math.round(f.y),f.r*(.3+k),f.r*(.3+k)*.45,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
    if(f.k==='slash'){ctx.fillStyle=`rgba(255,255,255,${1-k*1.5})`;for(let i=0;i<7;i++)ctx.fillRect(Math.round(f.x+i*1.4),Math.round(f.y-8+i*2.2+k*4),2,1);}
    if(f.k==='spark'){ctx.fillStyle=f.c;for(let i=0;i<4;i++){const a=i*1.57+.7;ctx.fillRect(Math.round(f.x+Math.cos(a)*k*8),Math.round(f.y+Math.sin(a)*k*8),1,1);}}
    if(f.k==='beam'){ctx.fillStyle=f.c;ctx.globalAlpha=1-k;ctx.fillRect(Math.round(f.x)-2,0,5,Math.round(f.y));ctx.fillStyle='#fff';ctx.fillRect(Math.round(f.x),0,1,Math.round(f.y));ctx.globalAlpha=1;}
    if(f.k==='drain'){ctx.fillStyle=f.c;for(let i=0;i<8;i++){const u=(i/8+k)%1;ctx.fillRect(Math.round(f.x+(f.tx-f.x)*u),Math.round(f.y+(G-30-f.y)*u-Math.sin(u*3.14)*10),2,2);}}
    if(f.k==='frost'){ctx.fillStyle=`rgba(200,240,255,${1-k})`;for(let i=0;i<40;i++)ctx.fillRect((i*37+Math.round(k*30))%W,(i*53+Math.round(k*80))%G,1,1);}
    if(f.k==='tentacle'){ctx.fillStyle='#4a2a52';const h=Math.sin(k*3.14)*60;ctx.fillRect(Math.round(f.x)-3,Math.round(G-h),6,Math.round(h));ctx.fillStyle='#c050a0';ctx.fillRect(Math.round(f.x)-1,Math.round(G-h),2,2);}
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
.cc-chip.it{border-style:dashed}.cc-chip b{font-weight:600}
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
function migrate(slot,player){for(const h of DATA.heroes)if(h.owner===player&&!slot.heroes[h.key])slot.heroes[h.key]={lvl:1,xp:0};}
function bestOf(player){const p=CC.data.players[player];let b={score:0,stage:0,prestige:0};if(!p)return b;
  for(const s of p.slots)if(s&&(s.best.prestige*100+s.best.stage>b.prestige*100+b.stage||(s.best.score>b.score&&s.best.stage>=b.stage)))b=Object.assign({},s.best);
  for(const s of p.slots)if(s)b.score=Math.max(b.score,s.best.score);return b;}

// ---------------------------------------------------------------- overlay shell
let root,cv,ctx,panel,hud,info,bossEl,banner;
function build(){
  if(root)return;if(!document.getElementById('cc-style')){const st=document.createElement('style');st.id='cc-style';st.textContent=CSS;document.head.appendChild(st);}
  root=document.createElement('div');root.id='cc';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-label','Crypt Crawl');
  root.innerHTML=`<div class="cc-top"><span class="t">⚰️ CRYPT CRAWL</span>
    <button class="cc-ib" data-a="pause" title="Pause">⏸</button><button class="cc-ib" data-a="speed" title="Game speed">1×</button>
    <button class="cc-ib" data-a="mute" title="Sound">${muted?'🔇':'🔊'}</button><button class="cc-ib" data-a="fs" title="Full screen">⛶</button><button class="cc-ib" data-a="close" title="Close">✕</button></div>
    <div class="cc-main"><div class="cc-info"></div><canvas id="cc-cv" width="384" height="216"></canvas><div class="cc-boss"></div><div class="cc-banner"></div><div class="cc-hud"></div><div class="cc-panel"></div></div>`;
  document.body.appendChild(root);
  cv=$('#cc-cv',root);ctx=cv.getContext('2d');panel=$('.cc-panel',root);hud=$('.cc-hud',root);info=$('.cc-info',root);bossEl=$('.cc-boss',root);banner=$('.cc-banner',root);
  root.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
    if(a==='close')closeCrawl();
    if(a==='pause'){CC.paused=!CC.paused;b.textContent=CC.paused?'▶':'⏸';}
    if(a==='speed'){CC.speed=CC.speed%3+1;b.textContent=CC.speed+'×';}
    if(a==='mute'){muted=!muted;b.textContent=muted?'🔇':'🔊';try{localStorage.setItem('podrundown-crawl-mute',muted?'1':'0');}catch(_){}}
    if(a==='fs'){try{if(document.fullscreenElement)document.exitFullscreen();else{(root.requestFullscreen||root.webkitRequestFullscreen||(()=>{})).call(root);try{screen.orientation.lock('landscape').catch(()=>{});}catch(_){}}}catch(_){}}});
  document.addEventListener('keydown',e=>{if(root.hidden)return;if(e.key==='Escape'&&!document.fullscreenElement)closeCrawl();if(e.key===' '&&CC.game){e.preventDefault();CC.paused=!CC.paused;}});
  window.addEventListener('resize',layout);document.addEventListener('fullscreenchange',()=>setTimeout(layout,60));
}
function layout(){if(!root||root.hidden)return;const main=$('.cc-main',root);const W=main.clientWidth,H=main.clientHeight;
  const land=W>H*1.25&&H<560;root.classList.toggle('land',land);
  hud.classList.toggle('tall',!land&&H>W*1.2);
  const reserved=land?0:(info.offsetHeight+hud.offsetHeight+4);let w=Math.min(W,(H-reserved)*16/9);
  const k=Math.floor(w/384);if(k>=2&&k*384>=w*.82)w=k*384;cv.style.width=Math.floor(w)+'px';cv.style.height=Math.floor(w*9/16)+'px';
  bossEl.style.top=(cv.offsetTop+Math.floor(w*9/16)*.06)+'px';banner.style.top=(cv.offsetTop+Math.floor(w*9/16)*.38)+'px';}
function openCrawl(){build();root.hidden=false;document.body.style.overflow='hidden';stopStrip();CC.data=Save.load();showWho();layout();}
function closeCrawl(){if(CC.game&&!CC.game.over)quitToCamp(true);CC.game=null;cancelAnimationFrame(CC.raf);root.hidden=true;document.body.style.overflow='';try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}startStrip();}
function showPanel(html){panel.hidden=false;panel.innerHTML=`<div class="cc-wrap">${html}</div>`;panel.scrollTop=0;hud.innerHTML='';info.innerHTML='';bossEl.textContent='';drawIdle();return panel;}
function drawIdle(){const g=CC.idle||(CC.idle=demoGame(384));ctx.imageSmoothingEnabled=false;if(IMG.complete&&BGI.complete)drawGame(ctx,g,384,0);}
// ---------------------------------------------------------------- screens
function showWho(){
  const rows=Object.keys(OWNERS).map(p=>{const b=bestOf(p);return {p,b};}).sort((a,b)=>(b.b.prestige*100+b.b.stage)-(a.b.prestige*100+a.b.stage)||b.b.score-a.b.score);
  const P=showPanel(`<div class="cc-h">⚰️ CRYPT CRAWL</div><p class="cc-sub">Your deck heroes march through the crypt on their own. You pick the team, the upgrades and when to push on. Three biomes, a boss every third stage, and it's meant to take a lot of tries.</p>
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
    return `<div class="cc-card"><b>Save ${i+1}</b> · best stage ${s.best.stage||0}${s.best.prestige?' ★'+s.best.prestige:''} · best score ${fmt(s.best.score)} · ${s.runs} runs<div class="cc-sub" style="margin:6px 0">${top}</div>
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
function statBars(k,lvl){const b=heroBase(k,lvl,3);const mx={hp:420,atk:40,aspd:1.4};
  return `<div class="cc-stat"><span>HP</span><i><b style="width:${Math.min(100,b.hp/mx.hp*100)}%"></b></i><span>ATK</span><i><b style="width:${Math.min(100,b.atk/mx.atk*100)}%"></b></i><span>SPD</span><i><b style="width:${Math.min(100,b.aspd/mx.aspd*100)}%"></b></i></div>`;}
const ROLE={melee:'Melee',ranged:'Ranged',caster:'Caster',duo:'Duo'};
function showTeam(){
  const s=SLOT();migrate(s,CC.player);const pick=[];
  const mine=DATA.heroes.filter(h=>h.owner===CC.player);
  const P=showPanel(`<div class="cc-h">PICK YOUR PARTY</div><p class="cc-sub">Up to 3 heroes from your decks. Fewer heroes = each one is stronger. Lower-level heroes earn catch-up XP.</p>
    <div class="cc-heroes">${mine.map(h=>{const st=STYLE[h.key];const L=s.heroes[h.key].lvl;
      return `<button class="cc-hero" data-k="${h.key}" aria-pressed="false"><span class="ord"></span><span class="por" data-por="${h.key}"></span><div class="nm">${h.icon} ${esc(h.name)}</div><div class="dk">${esc(h.deck)} · ${ROLE[st.atk]}${st.tank?' · Tank':''}</div>
      <div class="lv">LV ${L}</div>${statBars(h.key,L)}<div class="dk" style="margin-top:4px">Starts with ${esc(shortCard(h.spells[0].card))} (${SPELL[h.spells[0].arch].label})</div></button>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-go disabled>START RUN</button><button class="cc-btn" data-back>← Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  const upd=()=>{P.querySelectorAll('.cc-hero').forEach(b=>{const i=pick.indexOf(b.dataset.k);b.setAttribute('aria-pressed',i>=0);b.querySelector('.ord').textContent=i>=0?i+1:'';});
    const g=P.querySelector('[data-go]');g.disabled=!pick.length;g.textContent=`START RUN (${pick.length}/3)`;};
  P.querySelectorAll('.cc-hero').forEach(b=>b.onclick=()=>{const k=b.dataset.k,i=pick.indexOf(k);if(i>=0)pick.splice(i,1);else if(pick.length<3)pick.push(k);upd();});
  P.querySelector('[data-back]').onclick=showSlots;
  P.querySelector('[data-go]').onclick=()=>{s.run=newRun(pick,s);s.runs++;persist();showCamp();};upd();
}
function rankStars(r){return r>=CFG.maxRank?'<span class="cc-asc">✦ MAX ✦</span>':'<span class="cc-stars">'+'★'.repeat(Math.min(5,Math.ceil(r/2)))+'</span> <span class="cc-sub" style="font-size:11px">r'+r+'</span>';}
function chipFor(e,item){const name=e.r>=CFG.maxRank?`✦ ${esc(maxTitle(e.card,e.arch))}`:esc(shortCard(e.card));
  return `<span class="cc-chip ${item?'it':''}" title="${esc(e.card)}"><b>${name}</b> · ${item?ITEM[e.arch].label:SPELL[e.arch].label} r${e.r}${(e.augs||[]).map(g=>' +'+AUG[g].name).join('')}${item&&e.proc?' · ✦'+PROCS[e.proc].t:''}</span>`;}
function showCamp(){
  const s=SLOT();const run=s.run;migrate(s,CC.player);const st=CFG.stage(run.stage,run.prestige);
  const P=showPanel(`<div class="cc-h">STAGE ${run.stage}${run.prestige?' · ★'+run.prestige:''}</div><div class="cc-h2">${esc(st.biome.name)}${st.boss?` — ${esc(CFG.bosses[st.boss].name)} awaits`:''}</div>
    <p class="cc-sub">Score ${fmt(run.score)} · save point. ${run.pending?`<b style="color:#a6ff2e">⬆ ${run.pending} upgrade${run.pending>1?'s':''} waiting</b>`:'No upgrades waiting.'}</p>
    <div class="cc-load">${run.team.map(k=>{const d=heroDef(k),hv=run.heroes[k],L=s.heroes[k];
      return `<div class="cc-card cc-lh"><span data-por="${k}"></span><div style="flex:1;min-width:0"><b>${d.icon} ${esc(d.name)}</b> <span class="cc-sub" style="font-size:11px">LV ${L.lvl} · ${hv.dead?'fallen (revives at 25%)':Math.round((hv.hpf==null?1:hv.hpf)*100)+'% HP'}</span>
        <div class="cc-chips">${hv.spells.map(e=>chipFor(e)).join('')}${hv.items.map(e=>chipFor(e,1)).join('')}</div>
        <div class="cc-sub" style="font-size:11px;margin:4px 0 0">Spells ${hv.spells.length}/${CFG.slots.spell} · Items ${hv.items.length}/${CFG.slots.item}</div></div></div>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:14px">${run.pending?`<button class="cc-btn go" data-pick>CHOOSE UPGRADES (${run.pending})</button>`:`<button class="cc-btn go" data-begin>BEGIN STAGE ${run.stage} ▶</button>`}
      <button class="cc-btn" data-quit>Save & exit</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por,56)));
  const pk=P.querySelector('[data-pick]');if(pk)pk.onclick=showPick;
  const bg=P.querySelector('[data-begin]');if(bg)bg.onclick=beginStage;
  P.querySelector('[data-quit]').onclick=showSlots;
}
function showPick(){
  const s=SLOT(),run=s.run;if(!run.pending)return showCamp();
  const luckN=run.heroes&&Object.values(run.heroes).some(h=>h.spells.some(x=>x.arch==='insight'&&(x.augs||[]).length))?4:3;
  const os=CC.offersCache||(CC.offersCache=offers(run,Math.random,luckN));
  const P=showPanel(`<div class="cc-h">LEVEL UP!</div><p class="cc-sub">${run.pending} pick${run.pending>1?'s':''} left. Tap one.</p>
    <div class="cc-offers">${os.map((o,i)=>{const d=describe(o,run,s);const hd=heroDef(o.hero);
      const kind=o.kind==='new'?(o.slot==='spell'?'New spell':'New item'):o.kind==='aug'?'Augment':'Upgrade';
      const nm=d.r1>=CFG.maxRank?`✦ ${esc(maxTitle(o.card,o.arch))}`:esc(shortCard(o.card));
      return `<button class="cc-offer" style="--rc:${o.rar.col}" data-i="${i}"><span class="rar">${o.rar.name.toUpperCase()}</span><span class="kind">${kind} · ${o.slot==='spell'?SPELL[o.arch].label:ITEM[o.arch].label}${o.kind==='aug'?' · '+AUG[o.aug].name:''}</span>
        <span class="cn">${nm}</span>${d.r1>=CFG.maxRank?`<span class="cc-sub" style="margin:0;font-size:11px">${esc(shortCard(o.card))} at max rank</span>`:''}
        <span class="who"><span data-por="${o.hero}"></span>${esc(hd.name)}</span>
        <span>${o.kind==='new'?'':`r${d.r0} → `}${rankStars(d.r1)}</span><span class="tx">${esc(d.txt)}${o.kind==='aug'?` <b>${AUG[o.aug].name}:</b> ${AUG[o.aug].txt}.`:''}</span></button>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-reroll ${run.rerolls>0?'':'disabled'}>🎲 Reroll (${run.rerolls})</button><button class="cc-btn" data-skip>Skip (+${fmt(60*run.stage)} score)</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  P.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const o=os[+b.dataset.i];const r=applyOffer(run,o);if(r==='full')return showReplace(o);sfx('level');CC.offersCache=null;persist();run.pending?showPick():showCamp();});
  P.querySelector('[data-reroll]').onclick=()=>{if(run.rerolls>0){run.rerolls--;CC.offersCache=null;persist();showPick();}};
  P.querySelector('[data-skip]').onclick=()=>{run.pending--;run.score+=60*run.stage;CC.offersCache=null;persist();run.pending?showPick():showCamp();};
}
function showReplace(o){
  const s=SLOT(),run=s.run;const hv=run.heroes[o.hero];const list=o.slot==='spell'?hv.spells:hv.items;
  const P=showPanel(`<div class="cc-h">SLOTS FULL</div><p class="cc-sub">${esc(heroDef(o.hero).name)} can hold ${CFG.slots[o.slot]} ${o.slot}s. Replace one with <b>${esc(shortCard(o.card))}</b>?</p>
    <div class="cc-load">${list.map((e,i)=>`<button class="cc-card" style="text-align:left" data-r="${i}">${chipFor(e,o.slot==='item')}<div class="cc-sub" style="margin:4px 0 0;font-size:12px">${esc(o.slot==='spell'?SPELL[e.arch].txt(e.r,heroBase(o.hero,1,3).atk,{aug:{}},{max:heroBase(o.hero,1,3).hp}):ITEM[e.arch].txt(e.r))}</div></button>`).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-cancel>← Back to picks</button></div>`);
  P.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{applyOffer(run,o,+b.dataset.r);sfx('level');CC.offersCache=null;persist();run.pending?showPick():showCamp();});
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
    <div class="sp">${h.spells.map((s,i)=>`<span class="cc-sp" data-s="${i}"><b>${s.r>=CFG.maxRank?'✦ ':''}${esc(shortCard(s.card))}</b> ${SPELL[s.arch].label} r${s.r}<i></i></span>`).join('')}${h.items.map(it=>`<span class="cc-sp it"><b>${esc(shortCard(it.card))}</b> ${ITEM[it.arch].label} r${it.r}</span>`).join('')}</div></div></div>`).join('');
  hud.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  const st=CC.game.st;flash(`STAGE ${run.stage}`,1400);if(st.boss)setTimeout(()=>{},0);
  layout();CC.last=performance.now();cancelAnimationFrame(CC.raf);CC.raf=requestAnimationFrame(loop);
}
function flash(t,ms){banner.textContent=t;banner.style.opacity=1;clearTimeout(CC.bt);CC.bt=setTimeout(()=>banner.style.opacity=0,ms||1200);}
function loop(now){
  const g=CC.game;if(!g||root.hidden)return;let dt=Math.min(.05,(now-CC.last)/1000);CC.last=now;
  if(!CC.paused){for(let i=0;i<CC.speed;i++)g.step(dt);}
  for(const e of g.events){if(e.type==='levelup'){sfx('level');flash('LEVEL UP!',900);}if(e.type==='boss'){sfx('boss');flash(e.name.toUpperCase(),1800);}
    if(e.type==='herolevel')sfx('level');if(e.type==='herodown')sfx('die');}
  g.events.length=0;
  ctx.imageSmoothingEnabled=false;drawGame(ctx,g,384,0);
  const run=g.run;info.innerHTML=`<span class="px" style="font-size:10px;color:#a6ff2e">STAGE ${run.stage}${run.prestige?' ★'+run.prestige:''}</span><span>${esc(g.st.biome.name)}</span><span>Score <b>${fmt(run.score+g.stageScore)}</b></span>
    <span class="cc-xp" title="Next upgrade"><i style="width:${Math.min(100,(run.xp||0)/(8+6*(run.lv||0))*100)}%"></i></span>${run.pending?`<b style="color:#a6ff2e">⬆${run.pending}</b>`:''}`;
  bossEl.textContent=g.boss&&!g.boss.dead?g.boss.B.name.toUpperCase():'';
  for(const h of g.heroes){const el=hud.querySelector(`[data-h="${h.key}"]`);if(!el)continue;el.classList.toggle('dead',!h.alive);el.querySelector('.bar i').style.width=Math.max(0,h.hp/h.max*100)+'%';
    el.querySelector('.n span').textContent=SLOT().heroes[h.key].lvl;
    if(hud.classList.contains('tall'))h.spells.forEach((s,i)=>{const S=SPELL[s.arch];const c=el.querySelector(`[data-s="${i}"] i`);if(c)c.style.width=S.passive?'100%':Math.max(0,Math.min(100,(1-s.cdT/(S.cd*(1-h.cdr)))*100))+'%';});}
  if(g.over){return finishStage(g);}
  CC.raf=requestAnimationFrame(loop);
}
function finishStage(g){
  const s=SLOT(),run=s.run;g.saveBack();run.score+=g.stageScore;
  const lvls=run.team.filter(k=>s.heroes[k].lvl>CC.lv0[k]).map(k=>`${esc(heroDef(k).name)} → LV ${s.heroes[k].lvl}`);
  if(g.over==='clear'){
    sfx('clear');
    for(const k of run.team){const h=run.heroes[k];if(h.dead){h.dead=false;h.hpf=.25;}else h.hpf=Math.min(1,(h.hpf||0)+.3);}
    const cleared=run.stage;run.score+=Math.round(250*cleared*(1+run.prestige));
    if(cleared>=CFG.maxStage){persist();CC.game=null;return showVictory(lvls);}
    run.stage++;run.rerolls=Math.max(run.rerolls,1);
    if(run.prestige*100+run.stage-1>s.best.prestige*100+s.best.stage){s.best.stage=run.stage-1;s.best.prestige=run.prestige;}
    persist();CC.game=null;
    const P=showPanel(`<div class="cc-h">STAGE ${cleared} CLEAR!</div><p class="cc-sub">+${fmt(g.stageScore+250*cleared*(1+run.prestige))} score · ${g.kills} kills${lvls.length?' · '+lvls.join(', '):''}</p><div class="cc-row"><button class="cc-btn go" data-c>TO CAMP ▶</button></div>`);
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
  if(scv.width!==W||!sg||sg.W!==W){scv.width=W;scv.height=H;sg=demoGame(W);}
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
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){svis=false;const go=()=>{const H=106,W=Math.round(H*strip.clientWidth/strip.clientHeight);scv.width=W;scv.height=H;sg=demoGame(W);sctx.imageSmoothingEnabled=false;drawGame(sctx,sg,W,CFG.H-H);};IMG.complete&&BGI.complete?go():BGI.addEventListener('load',go,{once:true});}
  else startStrip();
}
window.CryptCrawl={open:openCrawl,_cc:CC,
  resetPin(who){const d=Save.load();if(d.players[who]){d.players[who].pin=null;Save.write(d);CC.data=d;return who+"'s PIN cleared on this device";}return 'no such player';}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountStrip);else mountStrip();

})();
