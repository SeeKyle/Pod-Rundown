/* Crypt Crawl — side-scrolling auto-battler for Pod Rundown.
   Engine (pure logic, runs headless in node for balance sims) + renderer + UI.
   Content lives in the CFG tables so stages, biomes, enemies, bosses, items and abilities can be added as rows. */
(function(){
'use strict';
const DATA={"heroes":[{"key":"flannel","char":1,"deck":"","icon":"🌲","owner":"Kyle","cmdr":"","name":"Flannel_Man","cls":"duo","duo":false,"blurb":"A bearded drifter in green flannel with a bolt-action rifle and a crowbar.","stats":{},"spells":[],"items":[]},{"key":"chibi","char":1,"deck":"","icon":"⚔️","owner":"Kyle","cmdr":"","name":"Chibi_Warrior","cls":"melee","duo":false,"blurb":"A small, fearless swordsman in a long brown coat.","stats":{},"spells":[],"items":[]},{"key":"archer","char":1,"deck":"","icon":"🏹","owner":"Kyle","cmdr":"","name":"Yumi_Archer","cls":"ranged","duo":false,"blurb":"A red-armored longbow archer.","stats":{},"spells":[],"items":[]},{"key":"druid","char":1,"deck":"","icon":"🌿","owner":"Kyle","cmdr":"","name":"Druid","cls":"caster","duo":false,"blurb":"A sea-green druid with a gnarled staff.","stats":{},"spells":[],"items":[]},{"key":"lumberjack","char":1,"deck":"","icon":"🪓","owner":"Kyle","cmdr":"","name":"Lumber_Jack","cls":"melee","duo":false,"blurb":"A red-bearded lumberjack with an axe and a hunting bow.","stats":{},"spells":[],"items":[]},{"key":"robot","char":1,"deck":"","icon":"🤖","owner":"Kyle","cmdr":"","name":"Warhound","cls":"melee","duo":false,"blurb":"A hunched olive war-walker with brass trim, a blue arc blade and a rotary cannon.","stats":{},"spells":[],"items":[]},{"key":"cultist","char":1,"deck":"","icon":"🕯️","owner":"Kyle","cmdr":"","name":"Void_Cultist","cls":"caster","duo":false,"blurb":"A hooded void cultist with a bone mask and a ritual dagger.","stats":{},"spells":[],"items":[]}],"arch":{"bolt":{"label":"Bolt","titles":["Starfall","Hellfire Lance","the Pyre Eternal"]},"nova":{"label":"Nova","titles":["Cataclysm","the Last Sunrise","Worldbreaker"]},"smite":{"label":"Smite","titles":["Executioner","Final Verdict","the Godslayer"]},"drain":{"label":"Drain","titles":["Soul Harvest","the Bleeding Moon","Crimson Tithe"]},"summon":{"label":"Summon","titles":["Legion Eternal","the Endless Horde","Army of the Damned"]},"regen":{"label":"Regen","titles":["Undying Grace","the Phoenix Psalm","Everbloom"]},"aegis":{"label":"Aegis","titles":["Bastion Unbroken","the Last Wall","Adamant Dawn"]},"pump":{"label":"Pump","titles":["Titan Rising","the Warlord Ascendant","Giantblood"]},"devour":{"label":"Devour","titles":["the Gluttonous Abyss","Bone Feast","Maw of Ages"]},"haste":{"label":"Haste","titles":["Overdrive","the Thousand Hands","Quickening Storm"]},"insight":{"label":"Insight","titles":["the Open Eye","Omniscient","Library of Ash"]},"freeze":{"label":"Freeze","titles":["Absolute Zero","the Long Winter","Glacial Tomb"]},"counter":{"label":"Counter","titles":["Null Mirror","the Silent Ward","Spellbreaker"]},"blade":{"label":"Weapon","titles":["Kingsbane","the Red Edge","Doomforged"]},"armor":{"label":"Armor","titles":["Aegis of Ages","the Unbreakable","Ironsoul"]},"relic":{"label":"Relic","titles":["Clockwork Heart","the Ever-Turning","Infinity Engine"]},"charm":{"label":"Charm","titles":["Lucky Bones","Fate's Favorite","the Gilded Skull"]}}};      // heroes from the decks (built by battler_data.py)
const ATLAS={"sprites":{"h_grim":[0,0,128,128,12],"h_vile":[1536,0,160,128,12],"h_vile_a":[0,128,128,128,12],"h_vile_b":[1536,128,128,128,12],"h_felothar":[0,256,128,128,12],"h_thing":[1536,256,128,128,12],"h_kykar":[0,384,128,128,12],"h_depala":[1536,384,128,128,12],"h_kotis":[0,512,128,128,12],"h_dragons":[1536,512,128,128,12],"h_mathas":[0,640,128,128,12],"h_turtle":[1536,640,160,128,12],"h_turtle_a":[0,768,128,128,12],"h_turtle_b":[1536,768,128,128,12],"h_marina":[0,896,128,128,12],"h_korvold":[1536,896,128,128,12],"h_thranduil":[0,1024,128,128,12],"h_joel":[1536,1024,160,128,12],"h_joel_a":[0,1152,128,128,12],"h_joel_b":[1536,1152,128,128,12],"h_robots":[0,1280,128,128,12],"h_blood":[1536,1280,128,128,12],"h_mech":[0,1408,128,128,12],"h_weather":[1536,1408,128,128,12],"e_ghoul":[0,1536,128,128,12],"e_cultist":[1536,1536,128,128,12],"e_knight":[0,1664,128,128,12],"e_wolfman":[1536,1664,128,128,12],"e_hag":[0,1792,128,128,12],"e_zombie":[1536,1792,128,128,12],"e_drowned":[0,1920,128,128,12],"e_skeleton":[1536,1920,128,128,12],"e_archer":[0,2048,128,128,12],"e_thrall":[1536,2048,128,128,12],"e_wraith":[0,2176,128,128,12],"e_leech":[1536,2176,96,96,12],"e_bat":[2688,2176,96,96,12],"e_ghost":[0,2304,96,96,12],"e_gargoyle":[1152,2304,96,96,12],"e_hound":[2304,2304,96,96,12],"e_spawn":[0,2400,96,96,12],"e_eye":[1152,2400,96,96,12],"e_spider":[2304,2400,96,96,12],"b_gravelord":[0,2496,256,256,3],"b_countess":[768,2496,256,256,3],"b_maw":[1536,2496,256,256,3]},"bg":{"grave":{"fill":"#001b27","top":"#000a12","artTop":97,"layers":[{"r":[776,0,48,160],"y":97.0,"sp":0.04,"w":36.0,"h":120.0,"tile":36.0},{"r":[822,409,128,48],"y":97.0,"sp":0.0,"w":96.0,"h":36.0,"once":{"x":230,"period":0}},{"r":[0,247,544,160],"y":97.0,"sp":0.35,"w":408.0,"h":120.0,"tile":408.0},{"r":[0,571,272,48],"y":181.0,"sp":1.0,"w":204.0,"h":36.0,"tile":204.0}]},"manor":{"fill":"#1a4652","top":"#06141c","artTop":69,"layers":[{"r":[546,247,272,160],"y":69.0,"sp":0.04,"w":204.0,"h":120.0,"tile":204.0},{"r":[820,247,272,160],"y":69.0,"sp":0.12,"w":204.0,"h":120.0,"tile":204.0},{"r":[0,409,272,160],"y":69.0,"sp":0.28,"w":204.0,"h":120.0,"tile":204.0},{"r":[274,409,272,81],"y":128.25,"sp":0.5,"w":204.0,"h":60.75,"tile":204.0},{"r":[548,409,272,49],"y":152.25,"sp":0.75,"w":204.0,"h":36.75,"tile":204.0},{"r":[274,571,272,44],"y":183.0,"sp":1.0,"w":204.0,"h":33.0,"tile":204.0}]},"bog":{"fill":"#5a2236","top":"#1e0a16","artTop":44,"layers":[{"r":[322,0,160,224],"y":44.0,"sp":0.04,"w":120.0,"h":168.0,"tile":120.0},{"r":[484,0,160,224],"y":44.0,"sp":0.12,"w":120.0,"h":168.0,"tile":120.0},{"r":[646,0,128,224],"y":44.0,"sp":0.3,"w":96.0,"h":168.0,"once":{"x":130,"period":420}},{"r":[0,0,320,245],"y":44.0,"sp":1.0,"w":240.0,"h":183.75,"tile":240.0}]}},"res":2,"units":{"zombie":{"walk":{"fw":28,"fh":42,"n":6,"ax":15,"ay":41,"pre":0.88,"x":0,"y":0},"atk":{"fw":56,"fh":50,"n":5,"ax":35,"ay":49,"pre":0.88,"x":168,"y":0}},"zombie_f":{"walk":{"fw":28,"fh":42,"n":6,"ax":15,"ay":41,"pre":0.88,"x":448,"y":0},"atk":{"fw":56,"fh":50,"n":5,"ax":35,"ay":49,"pre":0.88,"x":616,"y":0}},"zombie_b":{"walk":{"fw":28,"fh":42,"n":6,"ax":15,"ay":41,"pre":0.88,"x":896,"y":0},"atk":{"fw":56,"fh":50,"n":5,"ax":35,"ay":49,"pre":0.88,"x":1064,"y":0}},"werewolf":{"walk":{"fw":112,"fh":76,"n":6,"ax":65,"ay":75,"x":1344,"y":0},"atk":{"fw":112,"fh":76,"n":8,"ax":60,"ay":75,"x":2016,"y":0},"die":{"fw":112,"fh":76,"n":10,"ax":58,"ay":75,"x":2912,"y":0},"jump":{"fw":112,"fh":76,"n":2,"ax":72,"ay":71,"x":4032,"y":0},"fall":{"fw":112,"fh":76,"n":2,"ax":56,"ay":63,"x":4256,"y":0}},"flannel":{"idle":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":0,"img":"flannel","art":1},"walk":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":208,"img":"flannel","art":1},"run":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":416,"img":"flannel","art":1},"melee":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":624,"img":"flannel","art":1},"ranged":{"fw":230,"fh":208,"n":5,"ax":140,"ay":200,"x":0,"y":832,"img":"flannel","art":1},"reload":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1040,"img":"flannel","art":1},"hurt":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1248,"img":"flannel","art":1},"death":{"fw":230,"fh":208,"n":3,"ax":140,"ay":200,"x":0,"y":1456,"img":"flannel","art":1},"walkfire":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1664,"img":"flannel","art":1},"kneel":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":1872,"img":"flannel","art":1},"bullet":{"fw":24,"fh":16,"n":1,"ax":22,"ay":8,"x":0,"y":2080,"img":"flannel","art":1},"tripbomb":{"fw":45,"fh":36,"n":1,"ax":9,"ay":14,"x":40,"y":2080,"img":"flannel"}},"flannel_pal":{"idle":{"fw":230,"fh":208,"n":1,"ax":140,"ay":200,"x":0,"y":0,"img":"pal","art":1},"walk":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":208,"img":"pal","art":1},"melee":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":416,"img":"pal","art":1},"ranged":{"fw":230,"fh":208,"n":5,"ax":140,"ay":200,"x":0,"y":624,"img":"pal","art":1},"reload":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":832,"img":"pal","art":1},"hurt":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1040,"img":"pal","art":1},"death":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1248,"img":"pal","art":1}},"chibi":{"idle":{"fw":177,"fh":115,"n":6,"ax":94,"ay":111,"x":0,"y":0,"img":"chibi","pre":0.5526},"walk":{"fw":177,"fh":115,"n":8,"ax":94,"ay":111,"x":0,"y":115,"img":"chibi","pre":0.5526},"run":{"fw":177,"fh":115,"n":8,"ax":94,"ay":111,"x":0,"y":230,"img":"chibi","pre":0.5526},"attack1":{"fw":177,"fh":115,"n":5,"ax":94,"ay":111,"x":0,"y":345,"img":"chibi","pre":0.5526},"attack2":{"fw":177,"fh":115,"n":3,"ax":94,"ay":111,"x":0,"y":460,"img":"chibi","pre":0.5526},"runatk":{"fw":177,"fh":115,"n":5,"ax":94,"ay":111,"x":0,"y":575,"img":"chibi","pre":0.5526},"hurt":{"fw":177,"fh":115,"n":3,"ax":94,"ay":111,"x":0,"y":690,"img":"chibi","pre":0.5526},"death":{"fw":177,"fh":115,"n":5,"ax":94,"ay":111,"x":0,"y":805,"img":"chibi","pre":0.5526},"ranged":{"fw":177,"fh":115,"n":4,"ax":94,"ay":111,"x":0,"y":920,"img":"chibi","pre":0.5526}},"archer":{"idle":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":0,"img":"archer","pre":0.5526},"walk":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":143,"img":"archer","pre":0.5526},"run":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":285,"img":"archer","pre":0.5526},"melee":{"fw":204,"fh":143,"n":5,"ax":111,"ay":138,"x":0,"y":428,"img":"archer","pre":0.5526},"ranged":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":570,"img":"archer","pre":0.5526},"hurt":{"fw":204,"fh":143,"n":3,"ax":111,"ay":138,"x":0,"y":713,"img":"archer","pre":0.5526},"death":{"fw":204,"fh":143,"n":5,"ax":111,"ay":138,"x":0,"y":855,"img":"archer","pre":0.5526},"blowgun":{"fw":204,"fh":143,"n":4,"ax":111,"ay":138,"x":0,"y":998,"img":"archer","pre":0.5526},"arrow":{"fw":36,"fh":7,"n":1,"ax":35,"ay":3,"x":0,"y":1141,"img":"archer","pre":0.5526}},"druid":{"walk":{"fw":64,"fh":56,"n":8,"ax":33,"ay":53,"x":0,"y":0,"img":"druid"},"idle":{"fw":64,"fh":56,"n":6,"ax":33,"ay":53,"x":0,"y":56,"img":"druid"},"melee":{"fw":64,"fh":56,"n":3,"ax":33,"ay":53,"x":0,"y":112,"img":"druid"},"ranged":{"fw":64,"fh":56,"n":3,"ax":33,"ay":53,"x":0,"y":168,"img":"druid"},"hurt":{"fw":64,"fh":56,"n":2,"ax":33,"ay":53,"x":0,"y":224,"img":"druid"},"death":{"fw":64,"fh":56,"n":1,"ax":33,"ay":53,"x":0,"y":280,"img":"druid","fall":1}},"robot":{"walk":{"fw":82,"fh":71,"n":8,"ax":39,"ay":68,"x":0,"y":0,"img":"robot","sc":1,"pk":1.3},"idle":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":71,"img":"robot","sc":1,"pk":1.3},"melee":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":142,"img":"robot","sc":1,"pk":1.3},"ranged":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":213,"img":"robot","sc":1,"pk":1.3},"missile":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":284,"img":"robot","sc":1,"pk":1.3},"throw":{"fw":82,"fh":71,"n":3,"ax":39,"ay":68,"x":0,"y":355,"img":"robot","sc":1,"pk":1.3},"hurt":{"fw":82,"fh":71,"n":2,"ax":39,"ay":68,"x":0,"y":426,"img":"robot","sc":1,"pk":1.3},"death":{"fw":82,"fh":71,"n":5,"ax":39,"ay":68,"x":0,"y":497,"img":"robot","sc":1,"pk":1.3,"fall":0}},"cultist":{"walk":{"fw":38,"fh":40,"n":8,"ax":19,"ay":38,"x":0,"y":0,"img":"cultist","pk":1.0},"idle":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":40,"img":"cultist","pk":1.0},"melee":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":80,"img":"cultist","pk":1.0},"ranged":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":120,"img":"cultist","pk":1.0},"summon":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":160,"img":"cultist","pk":1.0},"hurt":{"fw":38,"fh":40,"n":2,"ax":19,"ay":38,"x":0,"y":200,"img":"cultist","pk":1.0},"death":{"fw":38,"fh":40,"n":5,"ax":19,"ay":38,"x":0,"y":240,"img":"cultist","pk":1.0}},"tentacle":{"emerge":{"fw":112,"fh":88,"n":5,"ax":78,"ay":84,"x":0,"y":0,"img":"tentacle"},"idle":{"fw":112,"fh":88,"n":8,"ax":78,"ay":84,"x":0,"y":88,"img":"tentacle"},"attack":{"fw":112,"fh":88,"n":6,"ax":78,"ay":84,"x":0,"y":176,"img":"tentacle"},"hit":{"fw":112,"fh":88,"n":2,"ax":78,"ay":84,"x":0,"y":264,"img":"tentacle"},"death":{"fw":112,"fh":88,"n":6,"ax":78,"ay":84,"x":0,"y":352,"img":"tentacle"}},"lumberjack":{"idle":{"fw":154,"fh":129,"n":1,"ax":82,"ay":121,"x":0,"y":0,"img":"lumberjack","pre":0.5526},"walk":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":129,"img":"lumberjack","pre":0.5526},"run":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":258,"img":"lumberjack","pre":0.5526},"melee":{"fw":154,"fh":129,"n":3,"ax":82,"ay":121,"x":0,"y":388,"img":"lumberjack","pre":0.5526},"ranged":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":517,"img":"lumberjack","pre":0.5526},"hurt":{"fw":154,"fh":129,"n":2,"ax":82,"ay":121,"x":0,"y":646,"img":"lumberjack","pre":0.5526},"death":{"fw":154,"fh":129,"n":3,"ax":82,"ay":121,"x":0,"y":776,"img":"lumberjack","fall":1,"pre":0.5526},"spin":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":905,"img":"lumberjack","pre":0.5526},"chop":{"fw":154,"fh":129,"n":4,"ax":82,"ay":121,"x":0,"y":1034,"img":"lumberjack","pre":0.5526},"leap":{"fw":154,"fh":129,"n":4,"ax":82,"ay":121,"x":0,"y":1163,"img":"lumberjack","pre":0.5526},"rage":{"fw":154,"fh":129,"n":4,"ax":82,"ay":121,"x":0,"y":1292,"img":"lumberjack","pre":0.5526},"roll":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":1422,"img":"lumberjack","pre":0.5526}},"dog":{"run":{"fw":62,"fh":34,"n":4,"ax":31,"ay":32,"x":0,"y":0,"img":"dog"},"walk":{"fw":62,"fh":34,"n":4,"ax":31,"ay":32,"x":0,"y":34,"img":"dog"},"idle":{"fw":62,"fh":34,"n":4,"ax":31,"ay":32,"x":0,"y":68,"img":"dog"},"melee":{"fw":62,"fh":34,"n":3,"ax":31,"ay":32,"x":0,"y":102,"img":"dog"},"hurt":{"fw":62,"fh":34,"n":1,"ax":31,"ay":32,"x":0,"y":136,"img":"dog"},"death":{"fw":62,"fh":34,"n":2,"ax":31,"ay":32,"x":0,"y":170,"img":"dog"}}}};    // sprite + backdrop atlas (built by make_crawl_art.py)
const OWNERS={Kyle:'🎩'};   // 0.12.1: only Kyle's tab while the game is rebuilt (Cheez and Leon come back later)

// ======================================================================= CONFIG TABLES
const CFG={
  W:384,H:216,GROUND:200,
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
    // Kyle's zombie: 25 HP (0.12.3, was 15), 1d6 per hit, swings every 1.25s, 12px reach, very slow, 3 armor (=6% less damage), small-medium knockback resistance,
    // 25% on hit to Bleed (20 dmg over 5s), item 4% / small gold 17.5%. Three looks (skins), identical stats.
    zombie:  {undead:1,scale:.88,aimScale:.88,hp:25,dmgDie:6,spd:8.8,   /* 0.12.38 (Kyle): 12% smaller, about the size of our humanoids */atk:1.25,reach:12,armorPts:3,kbRes:.35,bleed:{chance:.25,dmg:20,dur:5},
              itemChance:.04,goldChance:.175,goldAmt:[2,6],stack:true,xp:2,pts:10,cost:1.2,animAtk:.6,hitAt:.38,skins:['zombie','zombie_f','zombie_b']},
    // Kyle's werewolf, the first fast enemy: zombie stats except 30 HP (0.12.3, was 40) and fast; hunts the back-line heroes first
    werewolf:{hp:30,dmgDie:6,spd:44,atk:1.25,reach:12,armorPts:3,kbRes:.35,bleed:{chance:.25,dmg:20,dur:5},
              itemChance:.04,goldChance:.175,goldAmt:[2,6],xp:3,pts:16,cost:2.2,animAtk:.7,hitAt:.45,backline:true,fps:12,scale:.77,
              leap:{dmg:10,gap:20,dur:.5,cd:8}},   // jumping attack: bounds over a 20px gap and lands for 10 damage
  },
  bosses:{
    gravelord:{undead:1,name:'The Gravelord',hp:950,dmg:20,spd:9, xp:60, pts:1500},
    countess: {undead:1,name:'The Crimson Countess',hp:1350,dmg:20,spd:14,xp:90,pts:2500,fly:1},
    maw:      {name:'The Maw Below',hp:2000,dmg:28,spd:0, xp:130,pts:4000},
  },
  stage(n,prestige){
    const bi=Math.floor((n-1)/this.stagesPerBiome)%this.biomes.length, b=this.biomes[bi];
    const P=prestige||0;
    return {n,biome:b,bi,boss:n%this.stagesPerBiome===0?b.boss:null,
      len:1.5*(820+42*(n-1)),   // 5 stages per biome; each about 25% shorter than before
      rate:1.5*(0.62+0.061*(n-1))*(1+0.3*P),   // spawn budget per second
      // 0.12.13 (Kyle): each stage ~10-20% harder on average (was ~25%): +8% enemy HP, +5% damage and +4% more enemies per stage
      //   = about 1.08*1.05*1.04 = +18% total threat per stage (plus the extra werewolves and strays).
      hpMul:Math.pow(1.08,n-1)*Math.pow(2.2,P),
      dmgMul:Math.pow(1.05,n-1)*Math.pow(1.8,P),
      countMul:1+.04*(n-1),
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
  flannel:{atk:'gunner',proj:'bullet',reach:20,range:250,hp:1,dmg:1},
  lumberjack:{atk:'blade',proj:'yarrow',reach:22,range:200,hp:1,dmg:1},
  cultist:{atk:'gunner',proj:'void',reach:18,range:210,hp:1,dmg:1},   // 0.12.21 Void_Cultist: ritual dagger + void bolts
  robot:{atk:'gunner',proj:'gat',reach:22,range:200,hp:1,dmg:1},   // 0.12.17 Moss_Mech: arc blade + gatling arm   // 0.12.11 Lumber_Jack: axe + bow
  druid:{atk:'gunner',proj:'leaf',reach:18,range:220,hp:1,dmg:1},   // 0.12.9 Druid: nature caster and healer
  archer:{atk:'gunner',proj:'yarrow',reach:22,range:280,hp:1,dmg:1},   // 0.12.7 Yumi_Archer: longbow + bow strike
  chibi:{atk:'blade',proj:'kunai',reach:24,range:180,hp:1,dmg:1},   // 0.12.6 Chibi_Warrior: sword only
  flannel_pal:{atk:'gunner',proj:'bullet',reach:16,range:250,hp:1,dmg:1},
  dog:{atk:'blade',proj:'bullet',reach:14,range:0,hp:1,dmg:1},   /* 0.12.44 Guard Dog (camp Kennel) */   // Flannel_Man's companion (summoned, not picked)   // 0.12.3 Flannel_Man: rifle + crowbar, one body
  joel:{atk:'duo',a:'arrow',b:'melee',reach:28,range:210,hp:1.05,dmg:.9,companion:1},
  robots:{atk:'ranged',proj:'plasma',range:190,hp:1.35,dmg:1.0,tank:1},
  blood:{atk:'caster',proj:'blood',hp:.95,dmg:.9,leech:.25},
  mech:{atk:'ranged',proj:'shell',range:200,hp:1.05,dmg:1.1,splash:12},
  weather:{atk:'caster',proj:'frost',hp:1.1,dmg:.95,chill:1},
};
const ORDER={melee:0,blade:.5,duo:1,gunner:1.5,ranged:2,caster:3};
// walking pace per hero (px/s): heavy/armored/stone slow, light and quick ones faster
const MOVE={dog:24,cultist:15,robot:14,lumberjack:18,druid:16,archer:17,chibi:20,flannel:15,flannel_pal:15,grim:24,vile:26,felothar:18,thing:20,kykar:26,depala:22,kotis:34,dragons:30,mathas:28,turtle:22,marina:26,korvold:26,thranduil:32,joel:28,robots:22,blood:30,mech:24,weather:24};
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
  cultist:{name:'Call_of_the_Deep · Blood_Pact · Spreading_Hex · Dread_Chant · Herald_of_Life_and_Death',cd:12,txt:'A hooded void cultist with a ritual dagger.',fn:()=>false},
  robot:{name:'Arc_Surge · Gatling_Arm · Missile_Barrage · Smoke_Screen',cd:12,txt:'A hunched olive war-walker with an arc blade and a rotary cannon.',fn:()=>false},
  lumberjack:{name:'Whirl_Wind · Ground_Chop · Hatchet_Leap · Timber_Rage · Log_Roll',cd:14,txt:'An axeman with a hunting bow.',fn:()=>false},
  druid:{name:'Mend · Rejuvenating Bloom · Thorn Wave · Cyclone',cd:4,txt:'Mend (17 energy, 5s): instantly heals the most-hurt ally 10%. Rejuvenating Bloom (35 energy, 14s): heals an ally 4% of max HP every second for 8s. Thorn Wave (35 energy, 14s): a wave of thorns erupts along the ground down her lane; everything it bursts under takes 2d6 and bleeds. Cyclone (40 energy, 18s): a tornado wanders in front of her for 5s, pulling nearby enemies in and grinding down everything inside it.',fn:()=>false},
  archer:{name:'Arrow_Rain · One Nocked, Two in Hand · Blow_Gun',cd:14,txt:'Arrow_Rain (40 energy, 18s cooldown): looses a volley into the air and 16 arrows rain down on the thickest group of enemies (1d6 each, about 70px wide and 2 lanes up and down). Blow_Gun (25 energy, 9s cooldown): puffs a poison dart that always adds 1 poison stack to a living target (75% chance of a 2nd, 50% of a 3rd); each stack deals 3% of max HP every 1.5s for 7.5s, and any new stack resets the timer. Undead are immune. One Nocked, Two in Hand (30 energy, 14s cooldown): he nocks one arrow and holds two more ready, his next 3 arrows fly much faster (a third of the usual wait, quicker draw). Longbow shots (1d10) and a close-range bow strike (1d8).',fn:()=>false},
  chibi:{name:'Wave Dash · War Cry · Poultice',cd:10,txt:'Wave Dash (45 energy, 16s cooldown): rides a blue energy wave up to 400px forward, hitting everything it passes through (2 lanes up and down) for 1.4x a sword hit. War Cry (20 energy, 7s cooldown): every ally within 800px gets +25% damage and attack speed for 7s. Sword combo: Attack 1, Attack 2, and a running slash, plus a kunai throw (1d4) at enemies he can\'t reach yet.',fn:()=>false},
  flannel:{name:'Aimed Shot · Trip Bomb · Traveling_Companion',cd:14,txt:'Call Traveling_Companion (25 energy, 24s cooldown, 0.8s whistle): calls his Traveling_Companion, a timid partner who circles around him, with a third of his stats and her own Brick Throw (never misses, 75% stun). If she is already out, she heals 7% of her max HP instead. Trip Bomb (30 energy, 20s cooldown, 1s to set): a nail bomb on a tripwire that blows up the first enemy to walk into it, hurting everything around it (area damage, knockback, 50% bleed). Aimed Shot (40 energy, 14s cooldown, 2s cast with a laser sight): a carefully aimed rifle shot that always goes to the middle (head) box, with +5% crit chance and 2.5x crit damage. Pierces through one enemy.',fn:()=>false},   // runs from Game.gunner (CHAR abilities), shown here
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
// Lanes: feet rows units can stand on (190 = the original ground). Units drift between them so they can pass each other.
const LANES=[188,194,200,206,212],LANE_SPD=26;
// 0.12.14 (Kyle) obstacles: rocks, stumps, bushes, a dead tree and a big log lying diagonally across two lanes. Not many, a bit random.
//   Units walk around them (lane change). Tall ones (blk > 0, in hitbox units like body heights) stop shots that fly low enough.
//   Never more than 2 lanes blocked near each other at once, so there's always a way around.
const OBST={"rock_moss":{"x":0,"y":33,"fw":44,"fh":36,"lanes":1,"blk":34,"foot":[[-7.98,7.98]],"prof":[10,12,13,20,23,24,25,27,29,31,33,34,34,34,33,33,31,26,20,13,12,12]},"rock_pile":{"x":46,"y":39,"fw":32,"fh":30,"lanes":1,"blk":26,"foot":[[-5.7,5.7]],"prof":[5,15,19,22,23,25,27,28,28,28,27,25,22,18,8,7]},"rock_crack":{"x":80,"y":35,"fw":32,"fh":34,"lanes":1,"blk":32,"foot":[[-5.7,5.7]],"prof":[13,17,21,24,26,28,30,31,32,32,32,31,29,26,23,18]},"rock_swirl":{"x":114,"y":37,"fw":30,"fh":32,"lanes":1,"blk":30,"foot":[[-5.32,5.32]],"prof":[12,16,19,22,25,27,29,30,30,30,30,28,25,23,17]},"rock_dirt":{"x":146,"y":37,"fw":30,"fh":32,"lanes":1,"blk":30,"foot":[[-5.38,4.88]],"prof":[12,16,20,23,25,27,29,30,30,30,30,28,25,23,17]},"rock_crumble":{"x":178,"y":41,"fw":30,"fh":28,"lanes":1,"blk":24,"foot":[[-5.32,5.32]],"prof":[12,15,19,22,24,26,26,26,24,23,24,23,21,18,7]},"log_big":{"x":210,"y":35,"fw":80,"fh":34,"lanes":2,"blk":14,"foot":[[-19.5,6.5],[-10.0,20.0]],"prof":[11,16,20,21,21,21,22,22,22,22,23,22,23,24,24,25,24,25,27,26,27,27,27,28,28,29,29,30,30,30,31,31,32,32,32,33,33,32,32,28]},"trunk":{"x":292,"y":29,"fw":29,"fh":40,"lanes":1,"blk":40,"foot":[[-5.528,2.5279999999999996]],"prof":[9,10,14,19,34,35,37,38,37,38,38,38,35,35,0]},"stump":{"x":323,"y":37,"fw":18,"fh":32,"lanes":1,"blk":30,"foot":[[-3.16,2.16]],"prof":[20,27,30,30,30,30,30,29,28]},"bush_a":{"x":343,"y":49,"fw":22,"fh":20,"lanes":1,"blk":0,"foot":[[-3.04,3.04]],"prof":[13,15,15,17,18,18,17,15,17,18,18]},"bush_b":{"x":367,"y":47,"fw":23,"fh":22,"lanes":1,"blk":0,"foot":[[-3.7199999999999998,3.12]],"prof":[11,16,20,20,20,20,20,18,19,19,17,0]},"deadtree":{"x":392,"y":0,"fw":43,"fh":69,"lanes":1,"blk":52,"foot":[[-9.12,-2.2800000000000002]],"prof":[10,11,11,12,16,23,24,45,48,51,64,65,62,67,67,64,60,62,65,66,67,0]}};
const CARS={"car_hatch":{"x":0,"y":8,"fw":110,"fh":40,"lanes":2,"blk":32,"foot":[[-25.3,25.3],[-25.3,25.3]],"img":"cars","prof":[0,0,1,1,12,20,20,21,21,22,22,22,23,23,23,24,27,28,30,33,34,35,35,36,37,37,37,37,37,38,38,39,39,38,38,38,38,37,37,36,36,36,35,34,32,30,28,26,23,13,3,2,1,0,0]},"car_van":{"x":112,"y":0,"fw":141,"fh":48,"lanes":2,"blk":38,"foot":[[-32.4,32.4],[-32.4,32.4]],"img":"cars","prof":[2,3,5,5,6,7,10,25,26,27,27,28,29,30,35,41,43,43,43,44,44,44,44,45,46,46,47,47,46,46,45,45,44,45,45,45,45,46,46,46,46,46,45,45,45,45,45,45,45,44,44,45,45,45,45,45,44,43,35,33,12,6,6,6,4,4,1,0,0,0,0]},"car_sedan":{"x":255,"y":6,"fw":94,"fh":42,"lanes":2,"blk":34,"foot":[[-21.6,21.6],[-21.6,21.6]],"img":"cars","prof":[20,22,23,24,25,25,26,26,26,27,27,29,32,34,38,39,39,40,40,40,41,41,41,41,41,41,41,41,41,41,41,41,41,40,40,40,40,39,34,31,29,29,28,28,28,28,22]},"car_coupe":{"x":351,"y":12,"fw":129,"fh":36,"lanes":2,"blk":29,"foot":[[-29.7,29.7],[-29.7,29.7]],"img":"cars","prof":[1,1,2,2,3,3,1,3,3,14,21,22,22,20,21,23,24,23,24,25,25,27,27,29,30,32,33,33,33,34,35,35,33,33,33,33,33,32,33,33,33,32,31,30,29,28,27,26,25,25,25,25,20,3,3,4,3,2,2,1,1,1,1,1,1]},"car_muscle":{"x":482,"y":10,"fw":129,"fh":38,"lanes":2,"blk":30,"foot":[[-29.7,29.7],[-29.7,29.7]],"img":"cars","prof":[3,3,3,1,2,2,4,4,8,17,21,22,23,23,24,24,25,26,26,26,26,25,29,30,30,32,32,34,35,35,37,35,36,37,35,35,35,36,37,36,35,35,35,35,35,35,35,33,33,31,30,30,30,29,28,27,26,23,19,3,2,2,1,1,1]},"car_ambulance":{"x":613,"y":0,"fw":141,"fh":48,"lanes":2,"blk":38,"foot":[[-32.4,32.4],[-32.4,32.4]],"img":"cars","prof":[2,3,5,5,6,7,10,25,26,27,27,28,29,30,35,41,43,45,45,45,45,45,45,45,46,46,47,47,46,46,45,45,44,45,45,45,45,46,46,46,46,46,45,45,45,45,45,45,45,44,44,45,45,45,45,45,44,43,35,33,12,6,6,6,4,4,1,0,0,0,0]}};Object.assign(OBST,CARS);   // 0.12.29 broken-down cars (Kyle's art), real-car sized, smooth edges, 2 lanes, tall
const OBST_POOL=[['car_ambulance',.5],['car_muscle',1.4],['car_hatch',1.5],['car_van',1.2],['car_sedan',1.5],['car_coupe',1.4],['rock_moss',3],['rock_pile',3],['rock_crack',3],['rock_swirl',2],['rock_dirt',3],['rock_crumble',3],['log_big',2],['trunk',2],['stump',3],['bush_a',2],['bush_b',2],['deadtree',1]];
const SEARCHABLE=/^rock_|^log_|^stump|^trunk|^bush|^deadtree/;const SEARCH_RE={herbalist:SEARCHABLE,scavenger:/^car_/},SEARCH_T={herbalist:1.5,scavenger:2};   // 0.12.28 Herbalist searches these (foliage too)
const GROUND_FX=new Set(['corpse','stuck','thorn','poof','boom','quake','mend','spark','blood','splat','scorch','ring']);
// Units are drawn at half size (the world reads bigger); heights for aiming/hitboxes are in 'ruler units' = full-size sprite pixels
const UNIT_SCALE=.5;
// ---- Aiming (Kyle): a shot's height above the target's feet, in ruler units:
//   50% 20-35, 35% 36-40, 10% 41-50, 5% 51-70. Accuracy (0-100) shifts weight from the wild bands into the first band.
//   The same accuracy also decides how far side-to-side (in lanes) an area spell lands from the lane it was aimed at.
// Accuracy has steep diminishing returns: it takes a lot of it before shots almost always land in the right area.
//   tighten = 0.95 x (1 - e^(-accuracy/90)):  20 -> 19%,  50 -> 41%,  100 -> 64%,  150 -> 77%,  200 -> 85%,  300 -> 92%
function accTighten(acc){return .95*(1-Math.exp(-Math.max(0,acc||0)/90));}
function aimBands(acc){const m=accTighten(acc);const p4=5*(1-m),p3=10*(1-m),p2=35*(1-m*.85);return [[100-p2-p3-p4,20,35],[p2,36,40],[p3,41,50],[p4,51,70]];}
function rollAimHeight(acc,rng){let r=rng()*100;for(const [p,lo,hi] of aimBands(acc)){if(r<p)return lo+rng()*(hi-lo);r-=p;}return 30;}
// Shooting at fliers uses its own, tighter table aimed at the flier's body (ruler units above/below its centre, either side):
//   70% within 0-4, 20% 5-8, 10% 9-14. Accuracy trims the wide bands the same way.
function airBands(acc){const m=accTighten(acc);const p3=10*(1-m),p2=20*(1-m*.85);return [[100-p2-p3,0,4],[p2,5,8],[p3,9,14]];}
function rollAirAim(acc,rng,centre){let r=rng()*100;for(const [p,lo,hi] of airBands(acc)){if(r<p)return centre+(rng()<.5?-1:1)*(lo+rng()*(hi-lo));r-=p;}return centre;}
function rollLaneOffset(acc,rng){const m=accTighten(acc);const off2=10*(1-m),off1=30*(1-m),r=rng()*100;if(r<off2)return rng()<.5?-2:2;if(r<off2+off1)return rng()<.5?-1:1;return 0;}
// hitboxes, ruler units: w = width, h = height above the feet
const HITBOX={zombie:{w:16,h:46},werewolf:{w:30,h:36}};   // werewolf h is before his 0.77 draw scale (~28 tall walking)
// 0.11: heroes have bodies too. Every non-boss unit has a hitbox about its own size (ruler units). Per-hero overrides go in HERO_HB.
const HERO_HITBOX={w:20,h:46},HERO_HB={dog:{w:16,h:22},cultist:{w:14,h:36},robot:{w:23,h:52},lumberjack:{w:20,h:46},druid:{w:18,h:46},archer:{w:20,h:46},flannel:{w:20,h:46},flannel_pal:{w:18,h:42}};   // Flannel_Man: full-detail art drawn at normal humanoid size
function hbOf(u){return u&&u.key?(HERO_HB[u.key]||HERO_HITBOX):(u&&HITBOX[u.type])||{w:16,h:44};}
function depthHalf(hb){return Math.max(1.5,hb.w*.12);}   // how much lane depth (px, top view) a body fills either side of its feet
// ---- 0.11 Aiming reticle (Kyle): when a ranged unit picks a target, a 'shoot box' is laid over the target where it stands.
//   Height: the box is 3x the target's height. Its bottom starts near the target's FEET when close, its WAIST at medium range and
//   its CHEST when far (40-tall target: close 5-125, medium 20-140, far 30-150). Shots bunch toward the bottom of the box.
//   Width (top view, across the lanes): centred on the target, one target-width either side, bunched in the middle.
//   A shot that misses keeps flying and hits whatever hitbox it passes through (friend of the target or not). pierce = extra bodies it can go through.
const AIM_RANGE={close:40,far:170};   // px between shooter and target
const AIM_POINTS={feet:.125,waist:.5,chest:.75};   // fractions of the target's height
const AIM_SHAPE={bunch:4};   // higher = shots bunch harder toward the bottom of the box (tuning knob)
// ---- 0.12.2 Aim boxes (Kyle): every target has 3 stacked boxes, measured in ruler units above its feet (already at drawn size).
//   A shot first rolls WHICH box it goes to (by the box %), then a random height inside that box.
//   Accuracy: each 1 point slides 0.25% from TOP -> BOTTOM and 0.25% from BOTTOM -> MIDDLE (so 10 accuracy on a zombie:
//   top 40 -> 37.5, bottom 50 stays 50, middle 10 -> 12.5). Negative accuracy (shooting on the move) slides it back the other way.
//   Shapes that change (the werewolf rearing up to swipe) get a second set of boxes for that pose.
const AIM_BOXES={
  zombie:  {top:[49,85,40],mid:[28,49,10],bot:[0,28,50]},            // Kyle's numbers: [low, high, %]
  werewolf:{top:[24,44,40],mid:[13,24,40],bot:[0,13,20],             // walking: low and long
            tall:{top:[35,54,30],mid:[15,35,40],bot:[0,15,30]}},     // reared up mid-attack
};
const AIM_STEP=.25;
// ---- 0.12.8 Poison (Kyle): ONE shared stack per target for every poison effect. Each stack deals 3% of the target's max HP
//   every 1.5s; no max stacks. Adding any stack resets the timer for the whole stack to 7.5s. Undead are immune.
const POISON={pct:.03,tick:1.5,dur:7.5};
function isUndead(e){return !!((e.E&&e.E.undead)||(e.B&&e.B.undead)||(CFG.bosses[e.type]&&CFG.bosses[e.type].undead));}
// ---- 0.12.4 Headshots (Kyle): a shot that hits a body inside its MIDDLE box (the head box from the aim boxes, current pose) is a
//   headshot: extra damage that stacks with crits (both multiply). Melee can't headshot.
const HEADSHOT={mul:1.5};
function isHead(tg,h){const B=aimBoxesOf(tg);return h>=B.mid[0]&&h<=B.mid[1];}   // % moved per accuracy point
function aimPose(tg){const B=AIM_BOXES[tg&&tg.type];if(!B)return null;
  if(B.tall&&tg.anim===1&&tg.animT>0&&tg.E){const f=1-tg.animT/(tg.E.animAtk||.3);if(f>.12&&f<.62)return B.tall;}return B;}
function aimBoxesOf(tg){const B=aimPose(tg);if(B){const s=tg&&tg.E&&tg.E.aimScale;if(!s)return B;const S=a=>[a[0]*s,a[1]*s,a[2]];return {top:S(B.top),mid:S(B.mid),bot:S(B.bot)};}
  const h=hbOf(tg).h*((tg&&tg.E&&tg.E.scale)||1);   // anyone without their own boxes (heroes too) uses the zombie's shape scaled to their height
  return {top:[1.065*h,1.85*h,40],mid:[.61*h,1.065*h,10],bot:[0,.61*h,50]};}
function aimOdds(B,acc){let t=B.top[2],b=B.bot[2],m=B.mid[2];const k=AIM_STEP*(acc||0);
  if(k>=0){const a=Math.min(t,k);t-=a;b+=a;const c=Math.min(b,k);b-=c;m+=c;}
  else{const a=Math.min(m,-k);m-=a;b+=a;const c=Math.min(b,-k);b-=c;t+=c;}
  return {top:t,mid:m,bot:b};}
function reticleBox(tg,box,rng){const B=aimBoxesOf(tg);const [lo,hi]=B[box];return {h:lo+rng()*(hi-lo),off:0,lo,hi,box};}   // sure shots: no accuracy roll
function reticle(acc,tg,dist,rng){const hb=hbOf(tg);const m=accTighten(acc);
  const B=aimBoxesOf(tg),P=aimOdds(B,acc);let r=rng()*(P.top+P.mid+P.bot),box;
  box=r<P.top?'top':r<P.top+P.mid?'mid':'bot';const [lo,hi]=B[box];
  const h=lo+rng()*(hi-lo);
  const side=((rng()+rng()+rng())/1.5-1)*(1-.5*m);   // -1..1 target-widths, bunched in the middle
  return {h,off:side*2*depthHalf(hb),lo:B.bot[0],hi:B.top[1],box,odds:P};}
// ---- 0.11 Facing: every hero and regular enemy can turn around, but only does so when its target is really behind it.
//   Turning takes TURN_T seconds and a unit can't swing or shoot while it turns. (Bosses will be rebuilt separately.)
const TURN_T=.22;
function faceToward(u,tx,dt){if(u.face==null)u.face=u.key?1:-1;const want=tx>u.x+2?1:tx<u.x-2?-1:u.face;
  if(want!==u.face){u.turnT=(u.turnT||0)+dt;if(u.turnT>=TURN_T){u.face=want;u.turnT=0;return true;}return false;}u.turnT=0;return true;}
// ---- 0.11 Energy: every unit has an energy pool (like rogue energy). 100 max, refills 10 per second for now (a formula later).
//   Abilities will spend it with spendEnergy(unit, cost) once they come back.
const ENERGY={max:u=>u.enMaxB||100,regen:u=>u.enRegenB||5};   // Kyle: base regen 2.5 every 0.5s (= 5/s)
function regenEnergy(u,dt){const M=ENERGY.max(u);if(u.en==null)u.en=M;u.enMax=M;u.enTick=(u.enTick||0)+dt;while(u.enTick>=.5){u.enTick-=.5;u.en=Math.min(M,u.en+ENERGY.regen(u)*.5);}}   // ticks every 0.5s
function spendEnergy(u,c){if((u.en||0)<c)return false;u.en-=c;return true;}
// Werewolves come in a set number per stage (Kyle: 1 on stage 1, 2 on stage 3), spread along the stage instead of from the random pool
const CLUSTERS={count:7,first:2,last:[6,7]};   // Kyle: first cluster 2, last cluster 6-7
const WOLVES_PER_STAGE=n=>Math.min(7,2+Math.floor((n-1)*.4));   // 0.12.13 (Kyle): 2 on stage 1, then one more about every 2-3 stages (2,2,2,3,3,4,4,4,5...)
const STRAYS_PER_STAGE=n=>2+Math.floor((n-1)/3);   // 0.12.13 (Kyle): a lonely zombie here or there between cluster waves
const ENEMY_BODY=9;   // px between a melee enemy's centre and the front hero's centre before reach is added
const HERO_FLAT_HP=0,HP_PER_STAMINA=5,HERO_DICE=[2,4],HERO_BASE_CRIT=.1;   // basic attack = 2d4; every hero starts at 10% crit
// ---- 0.12.3 real characters: every number comes straight from the character sheet Kyle fills out
const CHAR={
  flannel:{name:'Flannel_Man',role:'Rifle + Melee',flatHp:0,stamina:8,hpPerStamina:5,armorPts:5,dodge:.05,kbRes:.40,
    melee:{dice:[1,12],every:1.5,reach:20,kb:23,hitAt:.15},                 // crowbar: d12, swing every 1.5s, 20px reach, knockback 23/100
    ranged:{dice:[1,8],flat:0,every:1.75,range:250,clip:1,reload:1.75,pellets:1},   /* bolt-action rifle: d8, 1.75s between shots (0.12.38: -0.25s), reloads after every shot */
    acc:18,walkPenalty:12,crit:.12,critMul:2,luck:21,xp:0,run:2,turn:.22,enMax:100,enRegen:5,
    // abilities (Kyle). Aimed Shot: skips the accuracy roll and lands in the MIDDLE box, +5% crit chance, crits hit 2.5x.
    //   Damage = the rifle's dice + every flat damage bonus, so it grows with future flat-damage items/effects.
    //   Cost: 40 energy (8s of base regen) and 14s cooldown: a big hit you see a few times a stage, leaving room for more abilities.
    abilities:[{id:'aimed',name:'Aimed Shot',en:45,cd:14,cast:2,pierce:1,box:'mid',critAdd:.05,critMul:2.5},
      // Trip Bomb: 1s to crouch and set a nail bomb on a stake with a tripwire, a little ahead in his lane. It arms after 0.6s and
      //   blows the first time a ground enemy walks into the wire: CROSS-shaped area damage (36px each way along the lane, 2 lanes
      //   up and down across it; full in the middle, half at the ends), a hard shove away from the blast, and nails that make 50% of victims bleed. 30 energy, 20s cooldown, 1 out at a time.
      // Call Companion: 0.8s whistle. If she isn't out, she joins the fight; if she is, she's patched up for 7% of her max HP instead.
      // Set_Camp: he kneels, flicks a lighter and starts a campfire (1.8s). The fire doesn't block anything; every ally within 250 screen px
      //   (83 world px) gets COZY: +1% max HP and +2 energy every second. The fire has 5 life and can't be attacked, but each time Flannel_Man or
      //   his Traveling_Companion takes damage from an attack it loses 1; at 0 it breaks and dies out. 35 energy, 30s cooldown.
      {id:'camp',name:'Set_Camp',en:40,cd:30,cast:1.8,life:5,radius:83,hp:.01,en2:2},
      // Grit_Teeth (Kyle, 0.12.15): he sets his jaw and digs in: 60% less damage taken for 7s, and for that time his personality slides
      //   hard toward close fighting (Shooter->Slasher +6, Aggressive +3), so the behavior system walks him up into crowbar range. He
      //   shouts for the squishier allies to get behind him. IF hurt (under 60%) with something on him, OR 3+ enemies close, THEN use it. 30 energy, 22s cooldown.
      {id:'grit',name:'Grit_Teeth',en:35,cd:22,dur:7,dr:.6,under:.6},
      {id:'pal',name:'Call Traveling_Companion',en:30,cd:24,cast:.8,heal:.07},
      {id:'trip',name:'Trip Bomb',en:35,cd:20,cast:1,arm:.6,dice:[3,6],flat:0,depth:12,cross:{long:36,thin:4,across:14,wide:12},shock:{r:56,depth:20,kbMul:1.6},kb:45,bleed:{chance:.5,dmg:12,dur:4},life:40}]},
};

// ---- 0.12.3 Inspiration Decks (Kyle): pick a player, then one of their decks. Each deck gives one small, unique bonus tied to
//   what that deck is best at. sl = slider moves (a move that would go below 0 or above 10 doesn't happen). Easy to retune here.
const INSP={   /* 0.12.4 (Kyle): every bonus doubled. 0.12.34: Herbalist x3 and Scavenger x3, each with one distinct stat and no slider nudge; every other deck has its own stat or passive and its own slider nudge */
 // Kyle
 'The Grim Throne':{o:'Kyle',why:'Kenrith\'s royal court: consistent big threats, and nobody haggles like royalty',passive:'haggler',mod:{crit:4}},
 'Felothar':{o:'Kyle',why:'Walls of root and bark: the pod\'s top Survival, and the forest feeds whoever holds behind them',passive:'herbalist',mod:{armor:6}},
 'Modular Beatdown':{o:'Kyle',why:'Gilgamesh suits up: the pod\'s biggest Finish, built from a pile of spare parts',passive:'resourceful',mod:{meleeDmg:20},stash:{parts:6}},
 'A Vile Smashing':{o:'Kyle',why:'Wheels: the most cards seen, and everyone else\'s hand ends up in yours',passive:'pickpocket',mod:{xp:12}},
 'Truly Fantastic':{o:'Kyle',why:'The Thing\'s deep mana pool, and a genius who builds things on the cheap',passive:'haggler',mod:{enMax:24}},
 'Dice Boys Casino':{o:'Kyle',why:'Mr. House runs the casino: the house always has money',passive:'bankroll',sl:{flair:2}},   /* 0.12.42 (Kyle): starting gold instead of energy regen */
 'Tame Depala':{o:'Kyle',why:'Dwarf mechanics who salvage anything with wheels and stand like an anvil',passive:'scavenger',mod:{kbRes:20}},
 "Life Swappin' Bounty Poppin'":{o:'Kyle',why:'Mathas puts bounties on the biggest threat',passive:'bounty',sl:{size:2}},
 'The Last of Us':{o:'Kyle',why:'Survivors who live off what they scrounge from the wrecks and slip every grab',passive:'scavenger',mod:{dodge:4}},
 'House on Haunted Hill':{o:'Kyle',why:'The house always sees you coming',passive:'haunt',sl:{aware:-2}},
 'Mothman Cometh!':{o:'Kyle',why:'A dark omen that is never quite where you hit',passive:'omen',sl:{lane:2}},
 'Ominous Weather':{o:'Kyle',why:'Isu\'s winter storms push everything back; snow shows every tripwire',mod:{kb:30},perk:'sapper'},
 'Build a Scare':{o:'Kyle',why:'Illuna mutates into something bigger, stitched together from whatever is lying around',passive:'resourceful',mod:{stamina:2}},
 "Thunder's Decree":{o:'Kyle',why:'Zurgo only knows one way: forward',passive:'onslaught',sl:{aggr:2}},
 // Cheez
 'Kykar, Zada & Feather':{o:'Cheez',why:'Wind\'s Fury: fast flyers, and Zada the goblin can talk anyone down',passive:'haggler',mod:{move:12}},
 'Double Dragons':{o:'Cheez',why:'Dragon fire, and dragons hoard everything they can get their claws on',passive:'pickpocket',mod:{rangedDmg:16}},
 'Turtle Power':{o:'Cheez',why:'Shells and teamwork: ninjas know a booby trap when they see one',passive:'shell',perk:'sapper'},
 'Korvold Eats Everything':{o:'Cheez',why:'Korvold feeds on what he kills, and never travels without a snack',passive:'devour',sl:{exec:2},stash:{food:3}},
 'Armed Robbery':{o:'Cheez',why:'Kotis steals from everyone',passive:'pickpocket',sl:{self:2}},
 'Blood Suckers':{o:'Cheez',why:'Lifelinking bats that drink deep and forage for anything that keeps the flock alive',passive:'herbalist',mod:{lifesteal:5}},
 'Mechanized Mayhem':{o:'Cheez',why:'Dr. Eggman strips wrecks for parts to overclock his guns',passive:'scavenger',mod:{rangedSpd:15}},
 // Leon
 'Family Matters':{o:'Leon',why:'Zinnia\'s copies look out for each other',passive:'bodyguard',sl:{aware:2}},
 'Thranduil':{o:'Leon',why:'Elven eyes and forest lore: knows every herb in the woods and never misses a shot',passive:'herbalist',mod:{acc:8}},
 'Primary Directive':{o:'Leon',why:'Optimus transforms and swings fast; Autobots patch themselves up from salvage',passive:'resourceful',mod:{meleeSpd:20}},
 'Cosmic Spider':{o:'Leon',why:'Spider-Sense and web shooters: his sense tingles near traps',passive:'webs',perk:'sapper'},
};
const PLAYER_ICON={Kyle:'🎩',Cheez:'🧀',Leon:'🪼'};
// what each character is like in a fight (shown when you hover them on the party screen)
// one line per ability for the party-screen hover boxes
const ABIL_DESC={
  tentacle:'Call_of_the_Deep · 45 energy · 7s. Cast up to 250px away. He tears open the ground and a huge dark tentacle wriggles up near the enemies. Any number can be out at once (one per cast). It can\'t move, but it lashes out a long way (about 105px) every 1.4s for 2d6, knocking things back. It has 15 HP and withers 5% of that every second; enemies standing on it swat at it, and only the life steal on its hits (it heals 20% of the damage it deals) keeps it alive.',
  pact:'Blood_Pact · 25 energy · 20s. He cuts his own palm: pays 15% of his health (never below 40%) to give every ally +20% damage for 6s.',
  hex:'Spreading_Hex · 30 energy · 12s. Curses an enemy: it rots for 2.5% of its max HP every second for 6s. If it dies cursed, the hex jumps to the nearest enemy (up to 3 jumps).',
  dread:'Dread_Chant · 35 energy · 16s. A 0.6s chant: every (non-boss) enemy within 180px is gripped by terror and backs away for 2.5s.',
  herald:'Herald_of_Life_and_Death · Passive. When he\'s the one helping a downed ally up, it takes 4s instead of 5. Every critical hit he lands gives him +1 energy and +1 HP every 0.5s for 5s, and gives every tentacle in play +1 HP every 0.5s for 5s (tentacle crits don\'t count).',
  clone:'Shadow_Clone · 35 energy · 18s. A see-through copy of him steps out for 5s: it mirrors every sword hit he lands (+40% on the same target) and soaks 35% of the blows aimed at him.',
  momentum:'Momentum · Passive. Every sword hit within 2s of the last one gives +6% attack speed, stacking up to +30%. Stop swinging for 2s and it resets.',
  pin:'Pinning_Shot · 30 energy · 12s. An arrow that nails the biggest threat to the ground for 2.5s and marks it for 6s: marked enemies take 25% more damage from everyone.',
  wind:'Wind_Reading · Passive. He reads the wind: shots at anything more than about 450px away get +15 accuracy and +0.5x crit damage.',
  resurge:'Verdant_Resurgence · Passive · 25s cooldown. When an ally would die, vines catch them: they stay up, can\'t be hurt for 2s and heal 30% of their max HP.',
  plating:'Reactive_Plating · Passive. Every 5 hits he takes, his plating vents: a shockwave shoves nearby enemies away and he gets a 12% max-HP shield for 4s.',
  surge:'Arc_Surge · 30 energy · 10s. Overcharges the arc blade for 5s: every blade hit also chains lightning to up to 3 more enemies within 40px (1d8 each) and stuns each one for 0.4s.',
  gatling:'Gatling_Arm · 40 energy · 14s. Spins up the gatling on his far arm and hoses the field for 3s: 10 shots in 2 seconds, 1d3 each, at -10 accuracy with a wild spread. Every shot leaves from a slightly different height and picks its own target.',
  missiles:'Missile_Barrage · 50 energy · 18s. The pod on his back pops open and lobs 6 little missiles high over the field onto the thickest group of enemies: 2d4 each to everything within 9px of where each one lands.',
  smoke:'Smoke_Screen · 35 energy · 16s. Lobs a smoke grenade between a hurt ally and the enemies on them: a thick cloud for 6s (about 180px wide). Enemies inside move 30% slower and miss half their attacks; allies inside dodge 25% of hits.',
  aimed:'Aimed Shot · 45 energy · 14s · 2s cast with a laser sight. Never misses the head box, +5% crit, 2.5x crit damage, pierces one enemy.',
  trip:'Trip Bomb · 35 energy · 20s · 1s to set. A nail bomb on a tripwire: cross-shaped blast (3d6), knockback, 50% bleed, then a wider shockwave that hits anything the cross missed for half damage and shoves it harder.',
  grit:'Grit_Teeth · 35 energy · 22s. He grits his teeth and digs in: takes 60% less damage for 7s, and leans hard into melee for that time (his sliders slide toward Slasher and Aggressive), wading in with the crowbar while he tells the others to get behind him.',
  camp:'Set_Camp · 40 energy · 30s · 1.8s to kneel and light it right in front of him. A campfire that blocks nothing: every ally within 250px gets Cozy (+1% max HP and +2 energy per second). It has 5 life; each hit Flannel_Man or his Traveling_Companion takes costs it 1, and at 0 it dies out.',
  pal:'Call Traveling_Companion · 30 energy · 24s. Calls his timid partner: a third of his toughness, a 1d4 pistol that fires every 0.5s with 7 shots before a 5s reload, and a Brick Throw with 75% stun. She circles around him. If she\'s already out, heals her 7%.',
  dash:'Wave Dash · 50 energy · 16s. Rides a blue energy wave about 300px forward; everything it passes through (2 lanes each way) takes 1.4x a sword hit.',
  shout:'War Cry · 25 energy · 7s. Every ally within 600px gets +25% damage and attack speed for 7s.',
  rain:'Arrow_Rain · 45 energy · 18s. 16 arrows rain down on the thickest group of enemies (1d6 each).',
  rapid:'One Nocked, Two in Hand · 35 energy · 14s. He nocks one arrow and holds two more, then rapid-fires all 3 as basic shots within 1.5 seconds, each at the same or a different target, with slightly lower accuracy (-5).',
  blowgun:'Blow_Gun · 30 energy · 9s. A poison dart: 1 stack of poison is guaranteed, with a 75% chance of a 2nd and 50% of a 3rd. Each stack: 3% max HP every 1.5s for 7.5s. Undead are immune.',
  poultice:'Poultice · 25 energy · 15s. When he\'s under 60% health he slaps a herbal poultice on: heals himself 4% of max HP every second for 6s.',
  whirl:'Whirl_Wind · 45 energy · 14s. Spins with his axe for up to 5s at half speed, trailing a slashing wave: every second it hits everything within about 70px for 1d4 and makes it bleed (6 over 3s). He can break it off early to escape, but usually spins it out.',
  chop:'Ground_Chop · 30 energy · 9s. A huge overhead chop into the ground: a shockwave 120px ahead for 2d6 that shoves and stuns for 0.8s.',
  leap:'Hatchet_Leap · 40 energy · 16s. Double-jumps onto an enemy up to 180px away and slams down for 1d10 to everything around the landing.',
  rage:'Timber_Rage · 35 energy · 20s. Under half health: +30% damage, +20% attack speed and 25% less damage taken for 6s.',
  roll:'Log_Roll · 20 energy · 8s. When he\'s hurt and cornered, rolls back about 90px and can\'t be hit during the roll.',
  mend:'Mend · 17 energy · 5s. Instantly heals the most-hurt ally for 10% of their max HP.',
  bloom:'Rejuvenating Bloom · 35 energy · 14s. Wraps an ally in a healing vine heart: 4% of max HP every second for 8s.',
  thorns:'Thorn Wave · 40 energy · 14s. A wave of earth thorns erupts along the ground 400px down her lane: 2d6 to everything it bursts under, plus bleed (12 over 4s) and a 50% chance of a poison stack (undead are immune).',
  cyclone:'Cyclone · 45 energy · 18s. A slow tornado forms well ahead of her (about 450px out) and wanders there for 5s, slowly pulling nearby enemies toward it and dealing small steady damage (1d3 every 0.5s) to everything inside.'};
const BEHAVIOR={
  cultist:'Theatrical, self-serving zealot. Hangs back behind the front line, flinging void bolts and stabbing with a ritual dagger anything that gets close. Calls tentacles up out of the ground where the enemies bunch, curses the biggest threat, bleeds himself to empower his allies when a fight turns hard, and chants enemies into a panic when they swarm him. Holds grudges and loves to show off. Fairly steady (zealotry), but his chanting makes him loud, so zombies hear him coming; he rarely bothers with cover.',
  robot:'Heavy, patient war machine. Walks slowly, holds a line in front of the squishies and trusts its plating. Slashes with its blue arc blade up close and fires short bursts from the gatling on its far arm. When a crowd lines up it spins the gatling up and sprays; when they bunch it sends a missile barrage; when a friend is hurt and swarmed it smokes them out. Listens to callouts. Unshakable: almost never panics. Also the loudest thing on the field: he clanks past wrecks and sets alarms off, and stray zombies home in on the noise. He stands in the open and trusts his plating.',
  lumberjack:'Big, stubborn brawler. Wades into the thick of it with his axe and goes for the biggest enemy, holding a grudge against whatever hit him. Shoots his hunting bow while he closes in, spins into crowds, leaps onto targets, chops the ground to stun, gets angry when he\'s hurt, and rolls out of trouble. Loud and rowdy, he draws zombies in and trips car alarms. He never hides behind anything.',
  druid:'Selfless healer. Hangs back near her friends and watches their health more than the enemies: patches up whoever is hurt worst, wraps allies in healing vines, and pokes at range with nature bolts. When enemies bunch up she drops thorns on them or sends a tornado down the lane. Light-footed and quiet. Her nerves are middling, so a boss or a fallen friend can rattle her for a moment. She tucks in behind rocks and logs when the horde gets thick.',
  archer:'Patient longbow marksman. Stays well back in his own lane, moves slowly and plants his feet for clean, accurate shots at the biggest threat. Backs up what his allies are fighting, sticks to his plan and doesn\'t waste energy. If something gets in close he cracks it with his bow. Steady and nearly silent: the best one to send searching a wreck. He shoots from behind cover whenever there\'s some nearby.',
  chibi:'Bold little front-liner. Charges in with his sword and fights up close, alternating a two-hit combo when he plants his feet and a running slash when he\'s on the move. Watches the enemies more than his friends, hops lanes to find a fight and picks his own targets. Stubborn about whoever hit him last, and loves to show off after a kill. Light on his feet and fairly steady. He never takes cover; he\'d rather be in their faces.',
  flannel:'Careful, team-first marksman. Hangs back at mid range with his bolt-action rifle and plants his feet before shooting: one shot, then a 2-second reload. Anything that gets into crowbar reach gets a d12 swing instead. Looks after hurt allies before himself and keeps an eye on where his friends are. Goes for the big targets and holds a grudge: whatever hurts him becomes his next target. Sticks to his plan and his own lane, and never shows off. A seasoned survivor: steady nerves, quiet, and always puts a car or a rock between himself and the horde when he can, leaning out to shoot.',
  joel:'Fast, restless pair. Always on the move: they hop lanes looking for better fights and change plans constantly. They lean into close fights, pile onto whatever their allies are hitting, and pick off the small ones. They burn energy as soon as they have it (lots of Power Attacks), shoot on the run (sloppy), forgive quickly and love to taunt after a kill.',
  mathas:'Patient sniper. Stays far back in its own lane, moves slowly and sticks to its plan. Watches the enemies, not its allies, and looks after itself first. Hunts the biggest enemy on screen on its own, plants its feet for clean shots and saves energy for a big burst. Never forgets who hit it. All business.',
};
const INSP_LABEL={acc:['Accuracy',''],crit:['Crit chance','%'],critMul:['Crit damage','x'],dodge:['Dodge','%'],armor:['Armor',' pts'],stamina:['Stamina',''],luck:['Luck',''],xp:['XP gain','%'],
  kbRes:['Knockback resistance','%'],enMax:['Max energy',''],enRegen:['Energy regen','/s'],lifesteal:['Life steal','%'],move:['Move speed','%'],meleeDmg:['Melee damage','%'],rangedDmg:['Ranged damage','%'],
  meleeSpd:['Melee speed','%'],rangedSpd:['Ranged speed','%'],kb:['Melee knockback','']};
const INSP_HELP={acc:'More shots land on the body and head instead of flying over (each point moves 0.25% of shots down a box).',
  crit:'Higher chance for any hit to be a critical hit.',critMul:'Critical hits deal more damage.',dodge:'Chance for an enemy hit to miss him completely.',
  armor:'Takes less damage from every hit (each point = 2% less, up to 20 points).',stamina:'More max health (each Stamina = 5 HP).',luck:'Better odds of rare items and gold.',
  xp:'Levels up faster.',kbRes:'Gets shoved around less by heavy hits.',enMax:'Can store more energy for abilities.',enRegen:'Energy refills faster, so abilities come back sooner.',
  lifesteal:'Heals for part of the damage he deals.',move:'Walks and runs faster.',meleeDmg:'Melee hits deal more damage.',rangedDmg:'Ranged hits deal more damage.',
  meleeSpd:'Swings his melee weapon more often.',rangedSpd:'Shoots and reloads faster.',kb:'Melee hits shove enemies back further.'};
function stashText(S){return Object.entries(S).map(([k,v])=>`+${v} ${{gold:'gold',parts:'spare parts',food:'food',water:'water'}[k]}`).join(', ');}
function inspHelp(name){const I=INSP[name];if(!I)return [];const out=[];if(I.perk==='sapper')out.push('🧨 Sapper (perk): spots enemy mines far more easily and defuses them with good odds (about 82% before traits, versus about 30% for anyone else; a failure sets it off). Slow and Steady, Techy, Steady nerves, Optimal and Luck all help. A defused mine is kept as a one-time item 75% of the time (40% for non-Sappers) and planted in front of zombies coming down his lane; otherwise it comes apart into spare parts.');if(I.stash)out.push('🎒 Starting stash: the run starts with '+stashText(I.stash)+' for every hero carrying this deck.');if(I.passive&&INSP_PASSIVE[I.passive])out.push('✦ '+INSP_PASSIVE[I.passive][0]+' (passive): '+INSP_PASSIVE[I.passive][1]);
  for(const [k,v] of Object.entries(I.mod||{})){const [l,u]=INSP_LABEL[k]||[k,''];out.push(`${v>0?'+':''}${v}${u} ${l}: ${INSP_HELP[k]||''}`);}
  for(const [k,v] of Object.entries(I.sl||{})){const S=SLIDERS.find(s=>s[0]===k);if(!S)continue;const side=v>0?S[2]:S[1];
    if(false)0;out.push(`${side} +${Math.abs(v)}: slides his personality ${Math.abs(v)} step${Math.abs(v)>1?'s':''} toward "${side}" (the ${S[1]} ↔ ${S[2]} slider: ${S[3].toLowerCase()}). If that would go past 0 or 10, it doesn't move.`);}
  return out;}
// 0.12.27 (Kyle): more decks give one unique passive instead of a small stat; fewer give two things at once
const INSP_PASSIVE={
 herbalist:['Herbalist','he searches nearby foliage, rocks, stumps and fallen logs for healing herbs (1.5s each; the chance is good and goes up with his Luck and with how Perceptive he is) and carries up to 3. When he or an ally within about 50px is under 80% health, he uses one: it heals 20% of their max HP over 5s, but any damage stops it. He searches whatever is close by without going far out of his way, and goes to hurt allies with herbs.'],
 scavenger:['Scavenger','he searches broken-down cars (2s each; the chance goes up with his Luck and how Perceptive he is). He can turn up a Medkit (heals an ally under 60% for 25% at once), a Battery (+30 energy for an ally running low) or loose scrap worth gold, and carries 2 Medkits and Batteries at most, in any mix. He searches wrecks close by without going far out of his way, and brings supplies to whoever needs them.'],
 resourceful:['Resourceful','he makes do with what he finds: the team can pay for camp upgrades in spare parts instead of gold (1 part per 4 gold of the price, so a 100g upgrade is 25 parts). Once per team.'],
 haggler:['Haggler','he talks every builder down: camp upgrades cost 20% less. Once per team: more Hagglers still means 20%.'],
 bankroll:['House Money','the house fronts you: the run starts with +50 gold for every hero carrying this deck. Spend it at camp.'],
 bounty:['Bounty Hunter','his first hit on the biggest enemy on the field puts a bounty on it: it is marked (takes 25% more damage from everyone for 8s), and when it dies the party gets +10 gold.'],
 haunt:['Haunted','anything that hits him has a 20% chance to be spooked and back away for 1.5s.'],
 omen:['Dark Omen','once every 12s, the first hit that would land on him passes straight through.'],
 onslaught:['Onslaught','after he has been moving for 1s, his next hit deals double damage.'],
 shell:['Shell Up','when he drops under 40% health he pulls into his shell: 70% less damage taken for 3s while he holds still (30s cooldown).'],
 devour:['Devour','every enemy he kills heals him 3% of his max HP and gives him 4 energy.'],
 pickpocket:['Pickpocket','every enemy he lands a hit on gets its pockets picked: when it dies it is much more likely to drop gold (+60%), food and water (x2), spare parts (x2.5) and items (+50%). A truly Selfish thief (8+) also sometimes helps himself to whatever a nearby ally is carrying...'],
 bodyguard:['Bodyguard','a scripted behavior: he sticks to whichever ally is most hurt and stands by their side, and while he is within reach of them he takes 30% of every hit meant for them.'],
 webs:['Web Shooter','his hits have a 15% chance to web the target: 60% slower for 2s.'],
};
const insP=u=>u&&u.insp&&INSP[u.insp]&&INSP[u.insp].passive;
function inspText(name){const I=INSP[name];if(!I)return '';const out=[];if(I.passive&&INSP_PASSIVE[I.passive])out.push('✦ '+INSP_PASSIVE[I.passive][0]);
  for(const [k,v] of Object.entries(I.mod||{})){const [l,u]=INSP_LABEL[k]||[k,''];out.push(`${v>0?'+':''}${v}${u} ${l}`);}
  for(const [k,v] of Object.entries(I.sl||{})){const S=SLIDERS.find(s=>s[0]===k);if(S)out.push(`${v>0?S[2]:S[1]} +${Math.abs(v)}`);}
  if(I.stash)out.push('🎒 Starts with '+stashText(I.stash));
  if(I.perk==='sapper')out.push('🧨 Sapper');
  return out.join(', ');}
// ---- 0.12.5 Flannel_Man's companion: about 1/3 of every stat of his that applies (health, armor, dodge, knockback resistance,
//   damage, accuracy, crit chance, knockback). Speed, timing, range and energy stay the same so she keeps up and can use her brick.
// 0.12.6 Chibi_Warrior: a quick, sturdy sword fighter (Claude's starting numbers until Kyle fills his sheet). He swings a
//   2-hit combo (Attack 1, Attack 2) standing still and a running slash when he's on the move. No gun, no abilities yet.
CHAR.chibi={name:'Chibi_Warrior',role:'Sword + Kunai',combo:1,flatHp:0,stamina:10,hpPerStamina:5,armorPts:8,dodge:.06,kbRes:.30,
  melee:{dice:[2,6],every:1.1,reach:24,kb:15,hitAt:.18},
  // Kunai throw (built from his Attack 1 wind-up + Run+Attack throwing arm): a light 1d4 poke at range while he closes in
  ranged:{dice:[1,4],flat:0,every:2.6,range:180,clip:0,reload:0,pellets:1,anim:.5,releaseAt:.32},
  acc:10,walkPenalty:4,crit:.10,critMul:1.75,luck:15,xp:0,run:2,turn:.18,enMax:100,enRegen:5,
  abilities:[
    // Wave Dash: he rides a blue energy wave (1.5x his height) about 300 screen px forward (100 world px) in 0.5s.
    //   (Kyle's distances are screen pixels: the normal 1152px-wide game shows 3 screen px per world px.)
    //   Everything the wave passes through (2 lanes up and down) takes 1.4x a sword roll (+flat bonuses) and a shove.
    //   Bigger reach and area, so it costs more: 45 energy, 16s cooldown.
    {id:'dash',name:'Wave Dash',en:50,cd:16,dist:100,dur:.5,dmgMul:1.4,depth:12,kb:25,minHits:2},
    // War Cry: every ally within 600 screen px (200 world px) gets +25% damage and +25% attack speed for 7s. 20 energy, 7s cooldown (Kyle).
    // Poultice (Kyle): he slaps a herbal poultice on his wounds: heals himself 4% of max HP every second for 6s (24% total). 20 energy, 15s.
    {id:'poultice',name:'Poultice',en:25,cd:15,pct:.04,tick:1,dur:6,under:.6},
    // 0.12.20 Shadow_Clone (decoy, new): a see-through copy of him steps out for 5s. It mirrors every sword hit he lands (+40% on the
    //   same target), and 35% of the blows aimed at him hit the clone instead. IF 2+ enemies close OR hurt with something on him. 30 energy, 18s.
    {id:'clone',name:'Shadow_Clone',en:35,cd:18,dur:5,mirror:.4,decoy:.35},
    // 0.12.20 Momentum (passive, new): each sword hit within 2s of the last stacks +6% attack speed, up to 5 stacks (+30%); a 2s gap drops it.
    {id:'momentum',name:'Momentum',passive:1,per:.06,max:5,window:2},
    {id:'shout',name:'War Cry',en:25,cd:7,range:200,dur:7,dmg:.25,spd:.25}]};
// 0.12.7 Yumi_Archer: a patient longbow marksman (Claude's starting numbers; no abilities yet). His arrow leaves from the
//   arrow's tip in his draw pose, at the moment of release in his Ranged animation (0.55s into a 0.8s draw). No reloading.
CHAR.archer={name:'Yumi_Archer',role:'Bow + Melee',flatHp:0,stamina:9,hpPerStamina:5,armorPts:6,dodge:.04,kbRes:.25,
  melee:{dice:[1,8],every:1.6,reach:22,kb:18,hitAt:.2},
  ranged:{dice:[1,10],flat:0,every:1.7,range:280,clip:0,reload:0,pellets:1,anim:.8,releaseAt:.55},
  acc:22,walkPenalty:15,crit:.12,critMul:2,luck:18,xp:0,run:2,turn:.25,enMax:100,enRegen:5,
  // One Nocked, Two in Hand (Kyle's name, with the archery spelling 'nocked'): his next 3 arrows come much faster (time between shots x0.3, quicker draw). 30 energy, 14s cooldown.
  abilities:[{id:'rapid',name:'One Nocked, Two in Hand',en:35,cd:14,shots:3,accPen:5},   // 0.12.23: 3 basic shots in 1.5s
    // Blow_Gun: he puts a bamboo blowgun to his lips (0.7s) and puffs a poison dart (1d3). It always applies 1 poison stack to a
    //   non-undead target, with a 75% chance for a 2nd and a 50% chance for a 3rd. 25 energy, 9s cooldown. Picks living targets.
    // Arrow_Rain: 0.6s to loose a volley high into the air, then 16 arrows rain down over 1.4s on the thickest group of enemies in
    //   range (about 70px wide, 2 lanes up and down). Each arrow hits what it lands on for 1d6 (+flat) and sticks in the ground.
    //   40 energy, 18s cooldown.
    {id:'rain',name:'Arrow_Rain',en:45,cd:18,cast:.6,count:16,over:1.4,fall:.35,spread:36,lanes:12,dice:[1,6],range:280,hitR:5},
    {id:'blowgun',name:'Blow_Gun',en:30,cd:9,anim:.7,releaseAt:.42,dice:[1,3],extra:[.75,.5],range:220},
    // 0.12.20 Pinning_Shot (root + mark, new): an arrow that nails the target to the ground for 2.5s and MARKS it for 6s: marked enemies
    //   take 25% more damage from everyone. IF the biggest (or fastest) enemy in range isn't marked yet. 25 energy, 12s.
    {id:'pin',name:'Pinning_Shot',en:30,cd:12,root:2.5,mark:6,amp:.25,range:280,anim:.5,releaseAt:.3,dice:[1,8]},
    // 0.12.20 Wind_Reading (passive, new): shots at anything more than 150px (450 screen px) away get +15 accuracy and +0.5x crit damage.
    {id:'wind',name:'Wind_Reading',passive:1,far:150,acc:15,critMul:.5}]};
// 0.12.9 Druid (Claude's starting numbers): a staff-wielding nature caster. Small nature bolts at range, a staff poke up close,
//   and four abilities: two heals (one instant, one over time) and two nature attacks (thorns, a tornado).
CHAR.druid={name:'Druid',role:'Staff + Nature Bolts',flatHp:0,stamina:7,hpPerStamina:5,armorPts:3,dodge:.05,kbRes:.2,
  melee:{dice:[1,4],every:1.5,reach:26,kb:10,hitAt:.2,claw:1},   // 0.12.15 (Kyle): she swipes her hand and a glowing green spirit claw lunges off it into the target
  ranged:{dice:[1,6],flat:0,every:1.8,range:220,clip:0,reload:0,pellets:1,anim:.5,releaseAt:.25},
  acc:16,walkPenalty:8,crit:.08,critMul:1.75,luck:20,xp:0,run:2,turn:.22,enMax:100,enRegen:5,
  abilities:[
    // Mend: small instant heal, low cooldown. 12% of the target's max HP on the most-hurt ally (under 85%). 12 energy, 4s cooldown.
    {id:'mend',name:'Mend',en:17,cd:5,heal:.10,under:.85},   /* 0.12.38 (Kyle): 12% -> 10%, 4s -> 5s */
    // Rejuvenating Bloom: heal over time on any ally (most hurt, under 90%, not already blooming): 5% of their max HP every 1s
    //   for 8s (40% total) inside a glowing vine heart. 30 energy, 12s cooldown.
    {id:'bloom',name:'Rejuvenating Bloom',en:35,cd:14,pct:.04,tick:1,dur:8,under:.9},   /* 0.12.38 (Kyle): 5%/s -> 4%/s, 12s -> 14s */
    // Thorn Wave (Kyle): a wave of earth thorns erupts along the ground down her lane, one after another for 200px over 1.2s.
    //   Every enemy a thorn bursts under takes 2d6 (+flat) and bleeds (12 over 4s). 35 energy, 14s cooldown.
    {id:'thorns',name:'Thorn Wave',en:40,cd:14,dice:[2,6],dist:133,dur:.8,poisonCh:.5,step:12,depth:6,bleed:{dmg:12,dur:4},cast:.5},
    // Cyclone (Kyle): a tornado that lasts 5s, wandering around sporadically in front of her. It slowly pulls nearby enemies
    //   (within 40px) toward it and deals small, steady damage to everything inside it (1d3 +flat every 0.5s). 40 energy, 18s cooldown.
    // 0.12.20 Verdant_Resurgence (passive, new): once per stage, when an ally would die, vines catch them instead: they stay up at 1 HP,
    //   can't be hurt for 2s and heal 30% of max HP over those 2s.
    {id:'resurge',name:'Verdant_Resurgence',passive:1,heal:.3,dur:2,icd:25},   // 0.12.24 (Kyle): no longer once per stage, 25s internal cooldown
    {id:'cyclone',name:'Cyclone',en:45,cd:18,ahead:150,near:100,dist:215,dur:5,dice:[1,3],every:.5,pullR:40,pull:16,inR:12,depth:6,spd:20,wander:28,cast:.5}]};
// 0.12.11 Lumber_Jack (Claude's starting numbers): a burly axeman with a hunting bow. Sturdy, hits hard up close.
CHAR.lumberjack={name:'Lumber_Jack',role:'Axe + Bow',combo:0,flatHp:0,stamina:11,hpPerStamina:5,armorPts:7,dodge:.03,kbRes:.45,
  melee:{dice:[1,10],every:1.3,reach:22,kb:25,hitAt:.2},
  ranged:{dice:[1,6],flat:0,every:2.2,range:200,clip:0,reload:0,pellets:1,anim:.7,releaseAt:.45},
  acc:14,walkPenalty:10,crit:.10,critMul:1.9,luck:16,xp:0,run:2,turn:.25,enMax:100,enRegen:5,
  abilities:[
    // Whirl_Wind: spins with his axe for 2.4s, drifting forward; every 0.4s it hits everything around him (1d6 +flat, ~18px, 1 lane each way). 40 energy, 14s.
    // 0.12.26 (Kyle): up to 5s, 1d4 every second to everything in a wider 24px circle, each hit refreshes a bleed (6 over 3s), he moves at half speed while
    //   spinning, and he can break off early (IF he's badly hurt and wants out, OR nothing has been in reach for 1.5s) but usually spins it out.
    {id:'whirl',name:'Whirl_Wind',en:45,cd:14,dur:5,every:1,r:24,depth:7,dice:[1,4],bleed:{dmg:6,dur:3},want:'close',range:30},
    // Ground_Chop: a huge overhead chop into the ground: a shockwave 40px ahead (2d6 +flat), shoves and stuns 0.8s. 25 energy, 9s.
    {id:'chop',name:'Ground_Chop',en:30,cd:9,cast:.5,dist:40,depth:6,dice:[2,6],stun:.8,kb:35,want:'close',range:40},
    // Hatchet_Leap: double-jumps onto an enemy up to 60px away and slams down (1d10 +flat to everything within 16px). 35 energy, 16s.
    {id:'leap',name:'Hatchet_Leap',en:40,cd:16,dur:.6,range:60,min:24,r:16,dice:[1,10],want:'close'},
    // Timber_Rage: when he's under half health he gets angry: +30% damage, +20% attack speed, 25% less damage taken for 6s. 30 energy, 20s.
    {id:'rage',name:'Timber_Rage',en:35,cd:20,dur:6,dmg:.3,spd:.2,dr:.25,under:.5,want:'close'},
    // Log_Roll: when he's hurt and something is in his face, he rolls back 30px and can't be hit during the roll (0.6s). 15 energy, 8s.
    {id:'roll',name:'Log_Roll',en:20,cd:8,dur:.6,dist:30,want:'any'}]};
// 0.12.19: renamed Warhound with Kyle's pick of the new sprite (hunched olive war-walker, brass trim, elbowed blade arm).
// 0.12.17 Moss_Mech (Kyle): an original moss-grown green war mech with a blue electric arc blade on its near arm and a gatling on
//   the far arm, plus a missile pod on its back. Heavy and slow, lots of armor. Basic ranged: a short 3-round burst from the gatling.
CHAR.robot={name:'Warhound',role:'Arc Blade + Gatling',combo:0,flatHp:0,stamina:12,hpPerStamina:5,armorPts:12,dodge:.02,kbRes:.6,
  melee:{dice:[1,8],every:1.3,reach:22,kb:20,hitAt:.2,arc:1},
  ranged:{dice:[3,4],flat:0,every:2.4,range:200,clip:0,reload:0,pellets:3,spread:1,anim:.45,proj:'buck'},   /* 0.12.44 (Kyle): 3 pellets with a wild spread: the middle one flies fairly straight, the outer two angle off (1d4-ish each) */
  acc:10,walkPenalty:8,crit:.08,critMul:1.8,luck:10,xp:0,run:1/* 0.12.38 (Kyle): the Warhound only walks */,turn:.3,enMax:100,enRegen:5,
  abilities:[
    // Arc_Surge: IF 2+ enemies are within 40px THEN overcharge the blade for 5s: each blade hit chains to 3 more (1d8, 0.4s stun). 25 energy, 10s.
    {id:'surge',name:'Arc_Surge',en:30,cd:10,dur:5,chains:3,r:40,dice:[1,8],stun:.4},
    // Gatling_Arm: IF 3+ enemies are in front within range AND nothing is in blade reach THEN spray for 3s at 12/s, 1d3, accuracy -40. 35 energy, 14s.
    {id:'gatling',name:'Gatling_Arm',en:40,cd:14,dur:2,rate:5,dice:[1,3],range:210,accPen:-10,spreadH:10,spreadGy:4,startH:7,min:3},   /* 0.12.38 (Kyle): 10 shots in 2s at -10 accuracy, each from a slightly different height, each picks its own target */
    // Missile_Barrage: IF 3+ enemies are bunched (or a boss is up) 40-260px out THEN 6 missiles arc onto them, 2d4 within 9px each. 45 energy, 18s.
    {id:'missiles',name:'Missile_Barrage',en:50,cd:18,n:6,gap:.14,fly:.95,range:260,min:40,r:9,dice:[2,4],spread:14},
    // Smoke_Screen: IF an ally under 50% has enemies on them (or I'm swarmed by 3+) THEN smoke the spot for 6s. 30 energy, 16s.
    // 0.12.20 Reactive_Plating (passive, new): every 5 hits he takes, the plating vents: a shockwave shoves everything within 30px away
    //   and he gets a shield worth 12% of max HP for 4s. Can vent at most once every 4s.
    {id:'plating',name:'Reactive_Plating',passive:1,stacks:5,shield:.12,shieldT:4,r:30,kb:35,cd:4},
    {id:'smoke',name:'Smoke_Screen',en:35,cd:16,dur:6,r:30,slow:.3,miss:.5,dodge:.25,under:.5,throw:.55}]};
// 0.12.21 Void_Cultist (Kyle): an original hooded cultist (crimson robe, navy hood, bone mask with one burning eye, curved ritual
//   dagger). Void bolts at range, dagger up close. Abilities: a summoned tentacle that can't move but lashes far, a self-bleeding
//   team buff, a curse that jumps on death, a fear chant, and a passive that feeds on nearby deaths.
CHAR.cultist={name:'Void_Cultist',role:'Dagger + Void Bolts',combo:0,flatHp:0,stamina:8,hpPerStamina:5,armorPts:3,dodge:.06,kbRes:.15,
  melee:{dice:[1,6],every:1.4,reach:18,kb:8,hitAt:.2},
  ranged:{dice:[1,4],flat:0,every:.95,range:210,clip:0,reload:0,pellets:1,anim:.34,releaseAt:.18},   // 0.12.22 (Kyle): weak void bolts, fired about twice as fast as other ranged heroes
  acc:14,walkPenalty:8,crit:.1,critMul:1.8,luck:18,xp:0,run:1.8,turn:.22,enMax:100,enRegen:5,
  abilities:[
    // Call_of_the_Deep: IF 2+ enemies are within 150px (or anything big) THEN summon a tentacle beside the nearest group for 10s.
    // 0.12.22 (Kyle): 15 HP, 25% life steal, hits for 2d6; reach 35 world px = how far the lash in its attack frames actually lands.
    {id:'tentacle',name:'Call_of_the_Deep',en:45,cd:7,cast:.8,life:999,decay:.05,hp:15,steal:.2,reach:35,depth:10,every:1.4,dice:[2,6],kb:20,range:83},   // cast up to 250 screen px away (83 world)
    // Blood_Pact: IF an ally is under 50% OR 4+ enemies are on screen, AND I'm above 55%, THEN pay 15% HP for +20% team damage, 6s.
    {id:'pact',name:'Blood_Pact',en:25,cd:20,hpCost:.15,min:.4,dur:6,dmg:.2,cast:.5},
    // Spreading_Hex: IF the biggest enemy in range isn't cursed THEN curse it: 2.5% max HP/s for 6s; jumps on death (3 times).
    {id:'hex',name:'Spreading_Hex',en:30,cd:12,dur:6,pct:.025,range:220,jumps:3,cast:.4},
    // Dread_Chant: IF 2+ enemies are within 40px of me THEN chant: everything within 60px backs off in terror for 2.5s.
    {id:'dread',name:'Dread_Chant',en:35,cd:16,cast:.6,r:60,dur:2.5},
    // 0.12.22 Herald_of_Life_and_Death (Kyle, replaces Dark_Communion): while he's up, every downed ally takes 1s less standing time to
    //   revive (4s instead of 5); and each critical hit he lands gives him +1 energy every 0.5s for 5s.
    {id:'herald',name:'Herald_of_Life_and_Death',passive:1,revive:1,critT:5,critEn:2}]};
const PAL_FRAC=1/3;
// which cooldown timer each ability uses, so the planner can see what is ready
const CD_KEY={tentacle:'tnT',pact:'paT',hex:'hxT',dread:'drT',clone:'clT',pin:'piT',surge:'suT',gatling:'gaT',missiles:'msT',smoke:'smT',grit:'grT',poultice:'poT',aimed:'abT',trip:'tbT',pal:'palT',camp:'caT',dash:'daT',shout:'shT',rapid:'raT',blowgun:'bgT',rain:'arT',mend:'mdT',bloom:'blT',thorns:'thT',cyclone:'cyT',
  whirl:'whT',chop:'cpT',leap:'lpT',rage:'rgT',roll:'rlT',brick:'brT'};
const CLOSE_AB=new Set(['dread','clone','surge','grit','dash','whirl','chop','leap','rage','trip']),FAR_AB=new Set(['tentacle','hex','pin','gatling','missiles','smoke','aimed','rain','rapid','blowgun','thorns','cyclone','brick']);
function abilityPlan(h){const C=h.base&&h.base.char;if(!C||!C.abilities||!C.abilities.length)return {};let close=0,far=0,farRange=0,ready=0;
  for(const a of C.abilities){const k=CD_KEY[a.id];const up=!(h[k]>0)&&(h.en||0)>=a.en;if(!up)continue;ready++;
    if(CLOSE_AB.has(a.id))close++;if(FAR_AB.has(a.id)){far++;farRange=Math.max(farRange,a.range||a.dist||(C.ranged&&C.ranged.range)||150);}}
  return {close,far,farRange,allDown:ready===0};}
CHAR.dog={name:'Guard_Dog',role:'Bite',flatHp:0,stamina:5,hpPerStamina:5,armorPts:2,dodge:.12,kbRes:.15,
  melee:{dice:[1,6],every:.9,reach:14,kb:6,hitAt:.12},ranged:null,
  acc:12,walkPenalty:0,crit:.10,critMul:1.75,luck:0,xp:0,run:2,turn:.15,enMax:100,enRegen:5,pet:1,abilities:[]};
CHAR.flannel_pal=(()=>{const C=CHAR.flannel,f=PAL_FRAC;return {name:'Traveling_Companion',flatHp:C.flatHp*f,stamina:C.stamina*f,hpPerStamina:C.hpPerStamina,armorPts:Math.round(C.armorPts*f),
  dodge:C.dodge*f,kbRes:C.kbRes*f,melee:{dice:C.melee.dice,dmgMul:f,every:C.melee.every,reach:16,kb:Math.round(C.melee.kb*f),hitAt:.12},
  ranged:{dice:[1,4],dmgMul:1,flat:0,every:.5,range:C.ranged.range,clip:7,reload:5,pellets:1},   /* 0.12.38 (Kyle): pistol 1d4, a shot every 0.5s, 7 in the clip, 5s reload */
  acc:Math.round(C.acc*f)-3,   /* a touch less accurate to make up for the faster fire */walkPenalty:Math.round(C.walkPenalty*f),crit:C.crit*f,critMul:C.critMul,luck:0,xp:0,run:C.run,turn:C.turn,enMax:100,enRegen:5,pet:1,
  // Brick Throw: never misses and always deals damage (1.5x her pistol roll + flat bonuses), 75% chance to stun for 1.2s. 20 energy, 9s cooldown.
  abilities:[{id:'brick',name:'Brick Throw',en:25,cd:9,range:170,dmgMul:1.5,stunCh:.75,stunT:1.2}]};})();
function heroBase(key,lvl,teamSize){
  const C=CHAR[key];if(C){const L=Math.max(1,lvl||1);const lv=1+.06*(L-1);
    return {hp:C.flatHp+C.stamina*C.hpPerStamina,atk:10*lv*(1+.3*(3-teamSize)),stamina:C.stamina,flatHp:C.flatHp,dice:(C.ranged||C.melee).dice,aspd:1,crit:C.crit,critMul:C.critMul,
      acc:C.acc,dodge:C.dodge,armorPts:C.armorPts,kbRes:C.kbRes,pow:1,reach:1,luck:C.luck,xpm:1+C.xp/100,char:C,lvMul:lv*(1+.3*(3-teamSize))};}
  const d=heroDef(key),s=d.stats,st=STYLE[key];
  // Kyle's rules: Max Health = Flat Health + Stamina bonus; Stamina = deck lands / 3 (rounded up); 5 HP per Stamina. Base damage = d6.
  const stamina=Math.ceil((d.lands||36)/3);
  const hp=HERO_FLAT_HP+stamina*HP_PER_STAMINA;
  // ability power (spells, signatures, summons) keeps its old formula; only the basic attack is a d6 for now
  let atk=(7+.7*s.threats+.4*s.clock)*st.dmg;const L=Math.max(1,lvl||1);atk*=1+.06*(L-1);atk*=1+.3*(3-teamSize);
  return {hp,atk,stamina,flatHp:HERO_FLAT_HP,critMul:1.75,dice:HERO_DICE,aspd:(0.8+0.025*s.mana)*(st.aspd||1)*(st.atk==='caster'?.8:1)*(st.atk==='ranged'||st.atk==='caster'?.74:1),crit:HERO_BASE_CRIT,acc:0,dodge:.008*s.control,
    pow:1+.04*s.answers,reach:1+.02*s.reach,luck:Math.round((s.consistency+s.cards)/4)*5,xpm:1+.03*s.cards};
}
function needHeroXp(L){return Math.round(70*Math.pow(L,1.6));}
function needRunXp(k){return 8+6*k;}

// ======================================================================= GAME (headless-capable)
// ================= 0.12.2 UNIT BEHAVIOR AI (Kyle's sliders) =================
// Every unit has 13 personality sliders (0 = left trait, 10 = right trait). Each "think", a unit builds every option it has
// (which foe to fight, which lane to stand in, how far to push or hang back, how fast to move, when to spend energy, whether to
// show off) and scores each one with a long list of if/then rules. The sliders set how much each rule counts, so two units
// looking at the same screen make different choices. Buffs/debuffs can slide the scales for a while: addMood(u,{k:+/-n},secs).
const SLIDERS=[
 ['aggr','Calculated Play','Blind Aggression','Safe plays and retreats vs. charging into danger'],
 ['aware','Enemy Awareness','Ally Awareness','Decides by where the enemies are vs. by where allies are'],
 ['pace','Slow and Steady','Fast and Furious','Walks and stops to think, steady hands for fiddly jobs like defusing vs. always running, thinking on the move'],
 ['lane','Stay In Your Lane','Switch It Up','Works the lane it is in vs. hunts for a better lane'],
 ['self','Selfless','Selfish','Protects allies and goes back for the downed vs. looks after itself and rarely risks a revive'],
 ['range','Shooter','Slasher','Prefers fighting from far vs. up close'],
 ['plan','On Track','New Plan','Relentless: sticks with what it started (a search, a revive, a chase) even under fire vs. rethinks often and drops things when hit'],
 ['energy','Squander','Preserve','Spends energy and uses supplies (medkits, herbs, batteries) early vs. saves both for a big burst or a real emergency'],
 ['size','Small Targets','Large Targets','Picks off the small ones vs. goes for the big ones'],
 ['exec','Suboptimal','Optimal','Sloppy (fires on the move) vs. efficient (plants its feet, finishes the weak)'],
 ['grudge','Forgiving','Vengeful','Forgets who hit it vs. hunts whoever hit it last'],
 ['pack','Pack Hunter','Lone Wolf','Piles onto what allies are fighting and stays close to them vs. picks its own fight and spreads out'],
 ['flair','Stoic','Showoff','All business vs. taunts and celebrates'],
 ['talk','Quiet','Chatty','Almost never calls anything out vs. calls out everything it sees'],
 ['tech','Primitive','Techy','Trusts muscle, nature and old ways vs. drawn to machines: shuts off car alarms, picks through wrecks, works the gadgets'],
 ['perc','Tunnel Vision','Perceptive','Locks onto the obvious target vs. keeps looking around for what isn\'t obvious (flankers, danger, things worth searching)'],
 ['listen','Ignores Callouts','Follows Callouts','Does its own thing vs. does what allies shout for'],
 ['nerve','Steady','Panicky','Keeps doing its job when things go wrong vs. panics (bolts, freezes or sprays wild shots) when a boss shows up, an alarm goes off, an ally drops or it gets swarmed'],
 ['noise','Light-Footed','Loud','Moves and searches quietly vs. clanks and crashes about: sets off car alarms more and draws lonely zombies in'],
 ['cover','Out in the Open','Takes Cover','Stands wherever the fight is vs. puts rocks, logs and wrecks between itself and the horde, and leans out to shoot'],
];
const PERSONA={   // starting values (Kyle's test numbers: middling with a few extremes, and very different between the two heroes)
 cultist:{aggr:4,aware:4,pace:4,lane:4,self:9,range:2,plan:5,energy:3,size:7,exec:6,grudge:8,pack:4,flair:8,talk:7,listen:3,perc:6,tech:3,nerve:3,noise:7,cover:3},   // Void_Cultist: hangs back, selfish, theatrical
 robot:{aggr:6,aware:6,pace:2,lane:3,self:3,range:6,plan:2,energy:4,size:7,exec:6,grudge:4,pack:6,flair:2,talk:4,listen:7,perc:6,tech:10,nerve:1,noise:10,cover:2},   // Moss_Mech: slow, steady, team-minded
 lumberjack:{aggr:7,aware:4,pace:6,lane:5,self:6,range:7,plan:5,energy:4,size:8,exec:4,grudge:8,pack:4,flair:6,talk:7,listen:1,perc:2,tech:2,nerve:4,noise:8,cover:1},   // Lumber_Jack: big, angry, goes for the big ones
 druid:{aggr:2,aware:9,pace:4,lane:3,self:0,range:2,plan:4,energy:4,size:5,exec:6,grudge:2,pack:6,flair:3,talk:6,listen:8,perc:7,tech:0,nerve:5,noise:1,cover:6},   // Druid: selfless healer
 archer:{aggr:2,aware:5,pace:3,lane:3,self:5,range:0,plan:2,energy:7,size:7,exec:9,grudge:4,pack:7,flair:2,talk:2,listen:7,perc:8,tech:1,nerve:2,noise:1,cover:7},   // Yumi_Archer: patient marksman
 chibi:{aggr:8,aware:3,pace:7,lane:6,self:6,range:9,plan:6,energy:3,size:6,exec:5,grudge:7,pack:3,flair:7,talk:9,listen:2,perc:3,tech:2,nerve:3,noise:2,cover:2},   // Chibi_Warrior: bold front-liner
 dog:{aggr:7,aware:9,pace:7,lane:6,self:1,range:10,plan:3,energy:5,size:3,exec:5,grudge:9,pack:1,flair:3,talk:6,listen:9,perc:9,tech:0,nerve:3,noise:4,cover:0},   // Guard Dog: loyal, alert, bites what comes near his people
 flannel_pal:{aggr:1,aware:9,pace:4,lane:2,self:5,range:1,plan:3,energy:6,size:2,exec:6,grudge:3,pack:2,flair:0,talk:3,listen:10,perc:7,tech:4,nerve:9,noise:2,cover:9},   // the companion (timid): hangs back, keeps her distance, picks off small ones next to him
 flannel:{aggr:4,aware:7,pace:5,lane:4,self:1,range:7,plan:3,energy:4,size:8,exec:7,grudge:8,pack:6,flair:1,talk:5,listen:6,perc:6,tech:6,nerve:2,noise:3,cover:8},   // Flannel_Man (Kyle's sheet)
 joel:   {aggr:6,aware:7,pace:8,lane:7,self:3,range:7,plan:7,energy:2,size:3,exec:4,grudge:3,pack:2,flair:8,talk:8,listen:3,perc:5,tech:5},   // The Spore Runners
 mathas: {aggr:3,aware:2,pace:3,lane:2,self:8,range:1,plan:2,energy:9,size:10,exec:9,grudge:9,pack:9,flair:1,talk:1,listen:1,perc:4,tech:6},  // Bounty Fiend
 zombie: {aggr:10,aware:1,pace:1,lane:3,self:9,range:10,plan:2,energy:5,size:5,exec:1,grudge:6,pack:6,flair:2},
 werewolf:{aggr:7,aware:2,pace:10,lane:9,self:9,range:10,plan:6,energy:3,size:1,exec:6,grudge:8,pack:8,flair:7,nerve:1,noise:6,cover:0},
 _default:{aggr:5,aware:5,pace:5,lane:5,self:5,range:5,plan:5,energy:5,size:5,exec:5,grudge:5,pack:5,flair:5},
};
const TRAIT_WORDS={aggr:['Careful','Reckless'],aware:['Hunter','Guardian'],pace:['Patient','Frantic'],lane:['Steadfast','Roaming'],self:['Loyal','Greedy'],
 range:['Sharpshooter','Brawler'],plan:['Stubborn','Fickle'],energy:['Spendthrift','Hoarder'],size:['Swarm-Breaker','Giant-Slayer'],exec:['Sloppy','Precise'],
 grudge:['Forgiving','Vengeful'],pack:['Pack','Lone'],flair:['Stoic','Showoff'],talk:['Silent','Loudmouth'],listen:['Headstrong','Team Player'],perc:['Tunnel-Visioned','Watchful'],nerve:['Steady','Jumpy'],noise:['Quiet','Clanky'],cover:['Exposed','Hunkered'],tech:['Old-Ways','Gearhead']};
/* 0.12.52 D&D mode (Kyle): each hero's sliders are rolled (2d6-2 each, so 0-10 with most near the middle) at the start of a run instead of fixed */
let DND_ROLLS=null;function setRunModes(run){DND_ROLLS=run&&run.dnd&&run.rolls?run.rolls:null;}
function rollPersonas(team){const out={};const keys=SLIDERS.map(s=>s[0]);for(const k of team){const r={};for(const s of keys)r[s]=Math.floor(Math.random()*6)+Math.floor(Math.random()*6);out[k]=r;}return out;}
function personaOf(u){if(!u.persona){const key=u.key||u.type;const b=(u.key&&DND_ROLLS&&DND_ROLLS[key])||PERSONA[key]||PERSONA._default;u.persona={talk:5,listen:5,perc:5,tech:5,nerve:5,noise:5,cover:5,...b};
  if(u.insp)for(const [k,d] of Object.entries((INSP[u.insp]||{}).sl||{})){const v=u.persona[k]+d;if(v>=0&&v<=10)u.persona[k]=v;}   // Kyle: a slide past 0 or 10 doesn't move at all
  if(!u.key){for(const k in u.persona)u.persona[k]=Math.max(0,Math.min(10,u.persona[k]+Math.round((Math.random()-.5)*2)));}   // monsters vary a little
  u.moods=[];}return u.persona;}
function addMood(u,shift,secs,name){personaOf(u);u.moods.push({shift,t:secs,name});}
function trait(u,k){const p=personaOf(u);let v=p[k];for(const m of u.moods)v+=(m.shift[k]||0);return Math.max(0,Math.min(10,v))/10;}   // 0..1
function personaTitle(u){const p=personaOf(u);const ex=Object.keys(p).filter(k=>k in TRAIT_WORDS).map(k=>[k,Math.abs(p[k]-5),p[k]]).sort((a,b)=>b[1]-a[1]);
  const w=ex.slice(0,2).map(([k,,v])=>TRAIT_WORDS[k][v>=5?1:0]);return w.join(' ');}
function personaLines(u){const p=personaOf(u);return SLIDERS.map(([k,l,r])=>`${l} ${'▮'.repeat(p[k])}${'▯'.repeat(10-p[k])} ${r}`);}
const SHOW_LINES={hero:['HA!','Too easy!','Next!','Boom!','Did you see that?'],zombie:['Brainsss','Grrah!','*moans*'],werewolf:['AWOOO!','*snarl*','Grrr!']};
/* 0.12.38 (Kyle): every rock, log, car and ambulance can be looted ONCE in total; nobody picks one another unit is already searching */
function g_free(o,h){return !o.looted&&!(o.searchBy&&o.searchBy!==h&&o.searchBy.alive&&o.searchBy.search&&o.searchBy.search.o===o);}
const Brain={
  // one shared picture of the battlefield per tick: every unit can see every other unit
  snapshot(g){const H=g.alive(),E=g.enemies.filter(e=>!e.dead&&e.x<g.W+10);const onTarget=new Map();
    for(const h of H)if(h.plan&&h.plan.tgt)onTarget.set(h.plan.tgt,(onTarget.get(h.plan.tgt)||0)+1);
    const heat=new Map();for(const e of E)if(e.target)heat.set(e.target,(heat.get(e.target)||0)+1);
    const maxE=Math.max(1,...E.map(e=>e.max||1)),maxH=Math.max(1,...H.map(h=>h.max||1));
    g.bb={H,E,onTarget,heat,maxE,maxH,t:g.t};},
  // the decision loop: how often a unit rethinks comes from On Track/New Plan, Slow/Fast and its current mood
  due(g,u,dt){u.thinkT=(u.thinkT==null?Math.random()*.4:u.thinkT)-dt;if(u.thinkT>0)return false;
    u.thinkT=.12+4.2*Math.pow(1-trait(u,'plan'),1.5)+1.2*(1-trait(u,'pace'))+Math.random()*.25;return true;},   // New Plan 10 rethinks ~8x a second; On Track 0 holds a plan 4-5s
  tick(u,dt){if(u.moods)u.moods=u.moods.filter(m=>(m.t-=dt)>0);if(u.grudgeT>0)u.grudgeT-=dt;if(u.pauseT>0)u.pauseT-=dt;if(u.panicT>0)u.panicT-=dt;if(u.sprayT>0)u.sprayT-=dt;},
  // score every foe a unit could fight
  pickTarget(g,u,foes,friends,isHero){if(!foes.length)return null;const bb=g.bb;const A=trait(u,'aware'),ef=1-A;
    const big=trait(u,'size'),venge=trait(u,'grudge'),lone=trait(u,'pack'),selfish=trait(u,'self'),opt=trait(u,'exec'),stay=1-trait(u,'lane'),commit=1-trait(u,'plan'),
          aggr=trait(u,'aggr'),slash=trait(u,'range');
    const ux=isHero?g.heroX(u):u.x,maxSize=isHero?bb.maxE:bb.maxH;const weakAlly=friends.reduce((b,f)=>!b||f.hp/f.max<b.hp/b.max?f:b,null);
    let best=null,bs=-1e9,why='';
    for(const c of foes){const cx=c.owner?c.x:(c.key?g.heroX(c):c.x);const d=Math.abs(cx-ux);let sc=0,w=[];
      if(!isHero&&c.key){const nz=trait(c,'noise');sc+=1.6*(nz-.5)*Math.max(0,1-d/160);if(nz>.7)w.push('heard them');}   /* 0.12.44 Light-Footed <-> Loud: enemies home in on loud heroes */
      // IF it is close THEN it's easier (enemy-focused units care most; slashers care even more)
      const near=Math.max(0,1-d/220);sc+=near*(.4+3.2*slash)*(.2+1.6*ef);
      // IF it is in my lane THEN good, unless I like switching lanes
      if(c.laneI!=null&&u.laneI!=null&&c.laneI===u.laneI){sc+=3*stay*stay;w.push('in my lane');}
      // IF I prefer big THEN size counts up, ELSE small ones count up
      const sz=(c.max||10)/maxSize;sc+=(big*sz+(1-big)*(1-sz))*3.5*Math.abs(big-.5)*2;
      // IF it hit me recently AND I hold grudges THEN go get it
      if(u.lastHitBy===c&&u.grudgeT>0){sc+=7*Math.pow(venge,2);if(venge>.5)w.push('grudge');}
      // IF allies are already on it THEN pack hunters join, lone wolves look elsewhere
      const n=bb.onTarget.get(c)||(c.key?0:0);const allies=isHero?(bb.onTarget.get(c)||0):(bb.heat.get(c)||0);
      sc+=allies*(2.2*Math.pow(1-lone,1.5)-2*Math.pow(lone,1.5))*(.4+.6*A);if(allies&&lone<.4)w.push('with the pack');
      // IF it is hurting my weakest friend THEN selfless units step in
      if(weakAlly&&c.target===weakAlly&&weakAlly.hp/weakAlly.max<.7){sc+=6*Math.pow(1-selfish,1.5)*(.3+.7*A)*(1-weakAlly.hp/weakAlly.max);if(selfish<.5)w.push('protecting');}
      // IF it is nearly dead THEN optimal units finish it
      if(c.hp!=null&&c.max)sc+=Math.pow(opt,1.5)*(1-c.hp/c.max)*3;
      // IF it is my current target THEN stubborn units keep at it
      if(u.plan&&u.plan.tgt===c)sc+=4*Math.pow(commit,1.5);
      // 0.12.28 Tunnel Vision <-> Perceptive: IF tunnel-visioned THEN the obvious pick (current target, the nearest) counts much more;
      //   IF perceptive THEN threats sneaking onto allies behind the line, or tucked behind bigger enemies, count more
      {const pc=trait(u,'perc');if(u.plan&&u.plan.tgt===c)sc+=2.5*(1-pc);sc+=near*1.6*(1-pc);
       if(isHero&&c.target&&c.target!==u&&c.target.key){const mx=bb.H.reduce((s,o)=>s+g.heroX(o),0)/Math.max(1,bb.H.length);if(g.heroX(c.target)<=mx){sc+=2.4*pc;if(pc>.6)w.push('spotted it sneaking up');}}
       if(isHero&&!c.boss&&bb.E.some(o=>o!==c&&(o.max||0)>(c.max||0)*1.5&&Math.abs(o.x-c.x)<14))sc+=1.2*pc;}
      // IF an ally called this one out AND I chose to listen THEN it jumps up my list
      if(isHero){const O=Comms.ord(u,g,['focus','help','flank','boss','reload','tapped','burst','lane','reviving']);if(O){const ot=O.tgt||(O.type==='boss'?g.boss:null);
        if(ot===c){sc+=3+5*O.w;w.unshift('called: '+O.type);}
        else if((O.type==='help'||O.type==='reload'||O.type==='tapped'||O.type==='reviving')&&O.from&&c.target===O.from){sc+=2+4*O.w;w.unshift('covering '+Comms.name(O.from));}}}
      // IF it is a big threat to me and I'm careful THEN I'd rather not walk into it... unless I'm reckless
      if(!isHero&&u.E&&u.E.backline&&!g.isMeleeHero(c)){sc+=2.5;w.push('going for the back line');}   // IF I'm a back-line hunter THEN the squishy ones first
      if(isHero&&c.dmg)sc+=(aggr-.5)*.4*Math.min(2,c.dmg/10);
      sc+=(Math.random()-.5)*(.05+4*Math.pow(1-opt,1.5));   // sloppy units are all over the place; optimal ones are near-perfectly consistent
      if(sc>bs){bs=sc;best=c;why=w[0]||(big>.6?'big target':big<.4?'small target':'closest');}}
    return {tgt:best,why};},
  // which lane to stand in
  pickLane(g,u,tgt,isHero){const bb=g.bb;const cur=u.laneI;
    /* 0.12.37 (Kyle): IF I'm a companion AND my partner is up AND I'm not badly hurt THEN circle him: lanes swing above, level with and below his */
    {const O=Brain.orbitOf(g,u);if(O)return Math.max(0,Math.min(LANES.length-1,u.owner.laneI+O.dl));}const roam=trait(u,'lane'),A=trait(u,'aware'),lone=trait(u,'pack'),aggr=trait(u,'aggr'),commit=1-trait(u,'plan');
    const melee=isHero?g.isMeleeHero(u):true;let best=cur,bs=-1e9;
    const reach=roam<.1?0:roam<.45?1:roam<.8?2:4;   // Stay In Your Lane 0 never leaves it; Switch It Up 10 can cross the whole field
    for(let l=Math.max(0,cur-reach);l<=Math.min(LANES.length-1,cur+reach);l++){let sc=0;
      if(l===cur)sc+=3*(1-roam)+.6*commit-1.2*roam*roam;   // IF I stay put by nature THEN my lane wins ties
      if(isHero){const O=Comms.ord(u,g,['lane','flank','help']);const ol=O?(O.type==='lane'?O.lane:O.type==='flank'?(O.tgt&&O.tgt.laneI):(O.from&&O.from.laneI)):null;if(ol!=null&&l===ol)sc+=2+4*O.w;}   // IF called to a lane THEN go there
      sc-=Math.abs(l-cur)*(.8-.75*roam);
      {const ux=isHero?g.heroX(u):u.x;if(g.laneBlocked(l,isHero?ux-8:ux-50,isHero?ux+50:ux+8))sc-=6;}   // IF an obstacle sits in this lane just ahead THEN don't pick it
      if(tgt&&tgt.laneI!=null){if(l===tgt.laneI)sc+=melee?2.4:.8;}   // melee has to share a lane with what it hits
      const foesHere=bb.E.filter(e=>e.laneI===l).length,friendsHere=(isHero?bb.H:bb.E).filter(o=>o!==u&&o.laneI===l).length;
      sc+=foesHere*(isHero?(aggr-.5):0)*1.6;   // IF careful THEN avoid crowded enemy lanes; IF reckless THEN wade in
      sc+=friendsHere*(A*(1-lone)*1.4-lone*1.3);   // ally-minded pack units bunch up, lone wolves spread out
      if(sc>bs){bs=sc;best=l;}}
    return best;},
  // how far ahead of / behind its formation spot a hero stands, and how fast it moves
  /* companion orbit: an ellipse around the partner, side to side in x while the lane swings up and down; Ally Awareness keeps it tighter, Fast and Furious circles quicker */
  /* 0.12.43 Steady <-> Panicky: IF something scary happens (boss, car alarm, an ally goes down near me, I get swarmed, my HP drops low)
     THEN panicky units may lose it for a moment: bolt away, freeze up, or spray wild shots. Steady ones just keep working. */
  panic(g,u,why){if(!u||!u.alive||g.demo||(u.panicCd||0)>g.t||u.riseT>0)return;const nv=trait(u,'nerve');if(Math.random()>Math.pow(nv,1.4)*.85)return;u.panicCd=g.t+7+6*(1-nv);
    const C=u.base&&u.base.char;const shooter=C&&C.ranged&&trait(u,'range')<.5;const r=Math.random();
    if(shooter&&r<.35){u.sprayT=2.5+2*nv;}else if(r<.6+.2*(1-trait(u,'aggr'))){u.panicT=2+1.5*nv;addMood(u,{aggr:-6,pace:5},u.panicT,'panic');}else{u.pauseT=Math.max(u.pauseT||0,.6+.8*nv);}
    u.thinkT=0;Comms.bubble(g,u,Comms.pick(why==='boss'?['What is THAT?!','Oh no. Oh no no no.','We are so dead!']:why==='alarm'?['Turn it off turn it off!','They\'re coming!','Not the alarm!']:why==='down'?['No no no, get up!','They got them!','Who\'s next?!']:['AAAH!','Too many!','Nope nope nope!','Get them off me!']));},
  orbitOf(g,u){
    if(u.dog){const H=g.heroes.filter(h=>h.alive);if(!H.length)return null;
      if(!u.wardT||g.t>u.wardT||!u.owner||!u.owner.alive){u.owner=H.reduce((b,h)=>{const s=(g.bb.heat.get(h)||0)*2+(1-h.hp/h.max)*3;const sb=(g.bb.heat.get(b)||0)*2+(1-b.hp/b.max)*3;return s>sb?h:b;},H[0]);u.wardT=g.t+1.2;}
      const w=u.owner,wx=g.heroX(w);const th=g.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-wx)<48).sort((p,q)=>Math.abs(p.x-wx)-Math.abs(q.x-wx))[0];
      if(th){const tl=LANES.reduce((b,y,i)=>Math.abs(y-(th.gy!=null?th.gy:g.G))<Math.abs(LANES[b]-(th.gy!=null?th.gy:g.G))?i:b,0);return {dx:th.x-wx-8,dl:tl-w.laneI,ph:0,attack:1};}   /* IF something is on my person THEN go bite it */
      if(u.orbPh==null)u.orbPh=Math.random()*6.28;const ph=g.t*.9+u.orbPh;return {dx:Math.sin(ph)*16,dl:Math.round(Math.cos(ph)*1.2),ph};}   /* ELSE pace around them */
    if(!u.pet||!u.owner||!u.owner.alive)return null;if(u.hp/u.max<.3&&(g.bb.heat.get(u)||0))return null;
    if(u.orbPh==null)u.orbPh=Math.random()*6.28;const A=trait(u,'aware'),pace=trait(u,'pace');const ph=g.t*(.45+.5*pace)+u.orbPh;
    const R=16+18*(1-A);return {dx:Math.sin(ph)*R,dl:Math.round(Math.cos(ph)*1.2),ph};},
  pickPosition(g,h,tgt){const bb=g.bb;const aggr=trait(h,'aggr'),slash=trait(h,'range'),pace=trait(h,'pace'),A=trait(h,'aware'),selfish=trait(h,'self');
    {const O=Brain.orbitOf(g,h);if(O)return {xoff:g.heroX(h.owner)+O.dx-g.home(h),intent:O.attack?'charge':'orbit',runMul:O.attack?2:.6+1.2*pace};}
    if(h.panicT>0){h.search=null;h.order=null;return {xoff:-95,intent:'retreat',runMul:2};}   /* panicking: running for it (drops any search, ignores orders) */
    let xoff=(aggr-.5)*70+(slash-.5)*150,intent='hold';   // Shooter (0) hangs well back, Slasher (10) stands well forward; no class rules
    const hp=h.hp/h.max,danger=bb.heat.get(h)||0;const near=bb.E.filter(e=>Math.abs(e.x-g.heroX(h))<45).length;
    // 0.12.11 (Kyle): plans account for ability cooldowns and distances. IF a close-range ability is ready (and affordable) THEN
    //   step toward the fight; IF only ranged ones are ready THEN keep to their range; IF the big ones are all on cooldown AND hurt
    //   THEN hang back until they come back.
    // 0.12.22 revive: IF an ally is downed THEN most units go help them up. Selfless and pack-minded units are keenest; IF enemies are
    //   standing over the body THEN only the bold (Blind Aggression) still go in. The decision sticks for ~2s so they don't dither.
    {const D=g.heroes.filter(o=>!o.alive&&o.downed&&o!==h).sort((p,q)=>Math.abs(p.x-g.heroX(h))-Math.abs(q.x-g.heroX(h)))[0];
     if(D&&!h.pet){if(!h.revDecide||h.revDecide.D!==D||g.t>h.revDecide.until){const danger=bb.E.filter(e=>Math.abs(e.x-D.x)<40).length;const lone=trait(h,'pack');
         let w=.62+.3*(1-selfish)+.18*(1-lone)+.12*A-.12*(hp<.35?1:0);if(danger)w*=(.35+.85*aggr)*(1.25-.6*trait(h,'nerve'));   /* Steady units still go in under fire, Panicky ones balk */w=Math.max(.05,Math.min(.97,w));
         h.revDecide={D,until:g.t+1.6+Math.random()*.8,go:Math.random()<(h.defib?Math.min(.97,w+.45):w)};}   /* IF I carry a Defibrillator THEN I go for the downed ally far more readily (it is instant) */
       if(h.revDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'revive',runMul,reviveD:D,reviveLane:D.laneI};}}}
    // 0.12.30 car alarm: IF an alarm is blaring nearby THEN units go shut it off. Techy units (and Perceptive ones) are much keener;
    //   IF zombies are already around the car THEN only the bold go. Primitive units mostly leave it to someone else.
    {const car=(g.obst||[]).filter(o=>o.alarmT>0&&Math.abs(o.x-g.heroX(h))<140).sort((p,q)=>Math.abs(p.x-g.heroX(h))-Math.abs(q.x-g.heroX(h)))[0];
     if(car&&!h.pet){if(!h.alDecide||h.alDecide.o!==car||g.t>h.alDecide.until){const tech=trait(h,'tech'),danger=bb.E.filter(e=>Math.abs(e.x-car.x)<40).length;
         let w=(.4+.55*tech+.12*trait(h,'perc'))*(1.15-.35*trait(h,'nerve'));if(danger)w*=.55+.6*aggr;   /* an alarm is treated as a big threat: most units go, Techy ones nearly always */h.alDecide={o:car,until:g.t+1.2+Math.random()*.8,go:Math.random()<Math.min(.95,w)};
         if(h.alDecide.go&&Math.random()<.5)Comms.bubble(g,h,Comms.pick(['I\'ll kill the alarm!','On the alarm!','Leave the car to me!']));}
       if(h.alDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'disarm',runMul,goTo:{ob:car},reviveLane:g.searchSpot(car,h).lane};}}}
    // 0.12.33 Medkit: IF I carry one AND an ally is under 50% THEN take it to them (selfless units most of all)
    if(h.medkit){const H=g.alive().filter(o=>o!==h&&!o.pet&&o.hp/o.max<.62-.3*trait(h,'energy')).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];if(H&&Math.random()<.6+.35*(1-selfish)){const runMul=.45+1.4*pace;return {xoff:0,intent:'herb',runMul,goTo:H,reviveLane:H.laneI};}}
    // ambulance: IF I have no Medkit AND an unsearched ambulance is close (closer for Tunnel Vision) AND it's safe enough THEN search it
    if(!h.medkit&&!h.search&&!h.pet){const look=35+45*trait(h,'perc');const o=(g.obst||[]).find(o=>o.k==='car_ambulance'&&g_free(o,h)&&Math.abs(o.x-g.heroX(h))<look);
      if(o){if(!h.amDecide||h.amDecide.o!==o||g.t>h.amDecide.until){const danger=bb.E.filter(e=>Math.abs(e.x-o.x)<60).length;h.amDecide={o,until:g.t+1.5+Math.random(),go:Math.random()<(danger?.2+.5*aggr:.6+.3*trait(h,'perc'))};}
        if(h.amDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'search',runMul,goTo:{ob:o},reviveLane:g.searchSpot(o,h).lane};}}}
    /* 0.12.51 Sapper: IF a spotted mine is near AND nothing is around it THEN go defuse it (Techy units are keener) */
    if(!h.pet){const M=(g.mines||[]).find(M=>M.armed&&M.spotted&&Math.abs(M.x-g.heroX(h))<95&&!bb.E.some(e=>Math.abs(e.x-M.x)<35)&&!g.heroes.some(o=>o!==h&&o.alive&&o.defuse&&o.defuse.M===M));
      /* IF a spotted mine is near AND it's calm AND nobody else is on it THEN: a Sapper usually goes for it; anyone else only if their own odds look decent (bolder ones gamble more) */
      if(M){if(!h.dfDecide||h.dfDecide.M!==M||g.t>h.dfDecide.until){const od=defuseOdds(h);h.dfDecide={M,until:g.t+2,go:Math.random()<(hasPerk(h,'sapper')?.85+.12*trait(h,'tech'):Math.max(0,od-.22)*1.3*(.45+.55*aggr))};}
        if(h.dfDecide.go){if(!h.defuse||h.defuse.M!==M)h.defuse={M,need:(2.4-1.5*trait(h,'tech'))*(hasPerk(h,'sapper')?1:1.3)*(1+.3*(.5-trait(h,'pace')))};return {xoff:0,intent:'defuse',runMul:.45+1.4*pace,goTo:{mine:M},reviveLane:M.l};}}}
    /* 0.12.45 thievery: IF I'm a Pickpocket AND truly Selfish (8+) AND nothing is in my face AND an ally nearby carries something good THEN I may sidle over and lift it.
       More Selfish = more likely; Light-Footed thieves try it more (they don't get caught as much); a Perceptive one spots what's worth taking. */
    if(insP(h)==='pickpocket'&&selfish>=.75&&!h.pet&&!(bb.heat.get(h)||0)&&(h.thiefCd||0)<=g.t){const goods=o=>(o.defib&&!h.defib)||(o.medkit&&!h.medkit)||((o.kit||[]).length&&(h.kit||[]).length<2)||(o.herbs>0&&(h.herbs||0)<3);
      const V=g.heroes.filter(o=>o!==h&&o.alive&&goods(o)&&Math.abs(g.heroX(o)-g.heroX(h))<70&&!bb.E.some(e=>Math.abs(e.x-g.heroX(o))<35)).sort((p,q)=>Math.abs(g.heroX(p)-g.heroX(h))-Math.abs(g.heroX(q)-g.heroX(h)))[0];
      if(V){if(!h.thDecide||h.thDecide.V!==V||g.t>h.thDecide.until)h.thDecide={V,until:g.t+3+Math.random()*2,go:Math.random()<(selfish-.75)*2.4*(.45+.55*(1-trait(h,'noise')))*(.6+.4*trait(h,'perc'))};
        if(h.thDecide.go)return {xoff:0,intent:'sneak',runMul:.5,goTo:V,reviveLane:V.laneI};}}
    // 0.12.27 Bodyguard (Family Matters, a deck-scripted behavior): IF an ally is hurt (under 90%) THEN stand beside the most hurt one
    if(insP(h)==='bodyguard'){const H=g.alive().filter(o=>o!==h&&!o.pet&&o.hp/o.max<.9).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];if(H&&!(hp<.25)){const runMul=.45+1.4*pace;return {xoff:0,intent:'guard',runMul,goTo:H,reviveLane:H.laneI};}}
    // 0.12.28 Herbalist: IF I have room for herbs AND there's unsearched debris close by AND it isn't swarmed THEN go search it
    {const sp=insP(h);if(sp==='scavenger'&&(h.kit||[]).includes('med')){const H=g.alive().filter(o=>o!==h&&!o.pet&&o.hp/o.max<.72-.3*trait(h,'energy')).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
      if(H&&Math.random()<.55+.35*(1-selfish)){const runMul=.45+1.4*pace;return {xoff:0,intent:'herb',runMul,goTo:H,reviveLane:H.laneI};}}}
    if(((insP(h)==='herbalist'&&(h.herbs||0)<3)||(insP(h)==='scavenger'&&(h.kit||[]).length<2))&&!(h.search)){const RE=SEARCH_RE[insP(h)];const look=30+45*trait(h,'perc')+(insP(h)==='scavenger'?20:0);const o=(g.obst||[]).filter(o=>RE.test(o.k)&&g_free(o,h)&&Math.abs(o.x-g.heroX(h))<look).sort((p,q)=>Math.abs(p.x-g.heroX(h))-Math.abs(q.x-g.heroX(h)))[0];
      if(o){const danger=bb.E.filter(e=>Math.abs(e.x-o.x)<35).length;if(!h.srDecide||h.srDecide.o!==o||g.t>h.srDecide.until)h.srDecide={o,until:g.t+1.5+Math.random(),go:Math.random()<(danger?(.15+.5*aggr):.8+.15*trait(h,'perc'))*((bb.heat.get(h)||0)?.25:1)*   /* IF something is on me right now THEN I usually fight first */(/^car_/.test(o.k)&&bb.E.some(e=>Math.abs(e.x-o.x)<80)?(.45+.55*aggr)*(1.3-.6*trait(h,'noise')):1)};   /* IF it's a car AND enemies are around THEN Calculated units hold off (an alarm would bring more) */
        if(h.srDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'search',runMul,goTo:{ob:o},reviveLane:g.searchSpot(o,h).lane};}}}
    if(h.search)return {xoff:0,intent:'search',runMul:1,goTo:{ob:h.search.o},reviveLane:g.searchSpot(h.search.o,h).lane};
    // 0.12.27 Scavenger: IF I'm carrying an herb AND an ally is under 80% (and not already healing) THEN selfless, ally-aware units go to them
    if(insP(h)==='herbalist'&&h.herbs>0){const H=g.alive().filter(o=>o!==h&&!o.pet&&o.hp/o.max<.9-.3*trait(h,'energy')&&!(o.herbT>0)).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
      if(H){if(!h.herbDecide||h.herbDecide.H!==H||g.t>h.herbDecide.until){const danger=bb.E.filter(e=>Math.abs(e.x-g.heroX(H))<35).length;let w=.5+.35*(1-selfish)+.2*A;if(danger)w*=.4+.8*aggr;h.herbDecide={H,until:g.t+1.5+Math.random(),go:Math.random()<Math.min(.95,w)};}
        if(h.herbDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'herb',runMul,goTo:H,reviveLane:H.laneI};}}}
    const AP=abilityPlan(h);
    if(AP.close&&tgt){xoff+=10+14*aggr;intent=intent==='hold'?'engage':intent;}
    if(AP.farRange&&tgt&&!AP.close){const d=Math.abs(tgt.x-g.heroX(h));if(d<AP.farRange*.4)xoff-=14;}
    if(AP.allDown&&hp<.6){xoff-=10+12*(1-aggr);}
    // callouts: IF I took an order THEN it pushes where I stand (personality still wins in an emergency below)
    const O=Comms.ord(h,g,['fallback','push','help','reload','tapped','camp','flank','trap','tank','smoke','reviving']);
    if(O){const fx=O.from?g.heroX(O.from):g.heroX(h);
      if(O.type==='fallback'||O.type==='trap'||O.type==='tank'){xoff-=O.type==='fallback'?55:25;intent='regroup';}
      else if(O.type==='push'){xoff+=55;intent='charge';}
      else if((O.type==='camp'||O.type==='smoke')&&O.x!=null){xoff=O.x-g.home(h);intent='gather';}
      else if(O.type==='flank'&&O.ally===h){xoff-=35;intent='kite';}
      else{xoff+=Math.max(-40,Math.min(50,fx-g.home(h)-xoff))*.7+10;intent='cover';}}
    // IF hurt AND careful THEN back off (the more careful, the earlier)
    const bail=.03+.72*Math.pow(1-aggr,1.3);if(hp<bail&&(danger||near)){xoff-=30+60*(1-aggr);intent='retreat';}   // Calculated 0 runs at 75% HP; Blind Aggression 10 basically never runs
    // IF a ranged unit has foes in its face THEN shooters step back to keep their distance
    else if(near&&slash<.5){xoff-=60*(1-slash*2);intent='kite';}   // shooter-minded units keep their distance (by slider, not by class)
    else if(aggr>.7&&tgt){intent='charge';}
    // IF an ally is getting mobbed AND I'm selfless and ally-minded THEN move up to help
    const mobbed=bb.H.filter(o=>o!==h&&(bb.heat.get(o)||0)>=2&&o.hp/o.max<.6)[0];if(mobbed&&selfish<.5&&A>.4&&intent!=='retreat'){xoff+=14+40*(1-selfish*2);intent='cover';}
    const runMul=.45+1.4*pace;
    if(near>=3)Brain.panic(g,h,'swarm');   /* Steady <-> Panicky: getting swarmed */
    /* 0.12.43 Pack Hunter <-> Lone Wolf also sets spacing: IF I'm a pack hunter THEN I drift in next to the nearest ally; IF a lone wolf THEN I keep room around me */
    {const pk=trait(h,'pack'),me=g.home(h)+xoff;const mates=bb.H.filter(o=>o!==h&&!o.pet);if(mates.length&&intent!=='retreat'){const m=mates.reduce((b,o)=>Math.abs(g.heroX(o)-me)<Math.abs(g.heroX(b)-me)?o:b,mates[0]);const dx=g.heroX(m)-me,d=Math.abs(dx);
      if(pk<.4&&d>20)xoff+=Math.sign(dx)*(d-20)*.6*(1-pk/.4);else if(pk>.6&&d<22)xoff-=(Math.sign(dx)||1)*(22-d)*.8*((pk-.6)/.4);}}
    /* 0.12.43 Out in the Open <-> Takes Cover: IF the fight is on AND I'm cover-minded (more so when hurt) THEN I put the nearest rock / log / wreck between me and the horde, leaning out to shoot */
    {const cv=trait(h,'cover');if(cv>.55&&intent!=='retreat'&&intent!=='charge'&&(slash>.6?hp<.6:(bb.E.length>=3||hp<.6||h.ammo<=0))){const front=bb.E.reduce((m,e)=>Math.min(m,e.x),1e9);const me=g.home(h)+xoff;
      if(!h.cvDecide||g.t>h.cvDecide.until){const obs=(g.obst||[]).filter(o=>o.blk>0&&o.x<front-10&&Math.abs(o.x-me)<75&&o.x>g.heroX(h)-60).sort((p,q)=>Math.abs(p.x-me)-Math.abs(q.x-me));
        h.cvDecide={o:obs[0]||null,until:g.t+1.5+Math.random(),go:Math.random()<(cv-.55)/.45*(hp<.6?1:.7)};}
      const o=h.cvDecide.o;if(h.cvDecide.go&&o&&(g.obst||[]).includes(o)){const l=o.lanes[o.lanes.length-1],[a]=g.obSpan(o,l);return {xoff:a-5-g.home(h),intent:'hunker',runMul,reviveLane:l};}}}
    return {xoff:Math.max(-115,Math.min(95,xoff)),intent,runMul};},
  // energy: squanderers spend at every chance; preservers wait to unload several big hits in a row
  energyCall(u){const pres=trait(u,'energy');const en=u.en||0;if(u.burst>0)return true;
    if(u.order&&u.order.type==='burst'&&u.order.until>(u._gt||0)&&en>=20)return true;   // IF told to unload on a clump THEN spend now
    // 0 = spends the moment it can afford anything; 10 = sits on it until FULL, then dumps 4 in a row
    if(pres<.5){return en>=10+40*pres&&Math.random()<Math.pow(1-pres*2,.5);}
    const need=70+30*((pres-.5)*2);if(en>=need-0.01){u.burst=2+Math.round(2*(pres-.5)*2);return true;}return false;},
  // Danger zones (marked boss attacks). Replaces the old Reflex stat with if/then rules on the sliders:
  //   notice it?  Enemy Awareness and Optimal units watch the ground; Blind Aggression and units locked on a target miss it more.
  //   react?      Calculated units step out; Blind Aggression may stand and keep swinging; Selfish units always look after themselves;
  //               a Showoff may wait to the last moment on purpose; New Plan units drop what they are doing faster than On Track ones.
  //   how fast?   Fast and Furious moves sooner and quicker; Slow and Steady takes a beat. Low HP makes everyone jumpier.
  //   how far?    Optimal steps fully clear with a margin; Suboptimal often comes up short.
  dangerCall(g,u,z,ux){const ag=trait(u,'aggr'),aw=trait(u,'aware'),pc=trait(u,'pace'),se=trait(u,'self'),pl=trait(u,'plan'),ex=trait(u,'exec'),fl=trait(u,'flair'),r=()=>g.rng();
    const low=u.max?1-Math.max(0,u.hp)/u.max:0;let why;
    let notice=.45+.45*(1-aw)+.35*(ex-.5)-.45*(ag-.3)+.25*low+.4*(trait(u,'perc')-.5);if(u.atkTgt||u.target)notice-=.1*(1-pl);
    if(r()>Math.min(.97,Math.max(.15,notice)))return {react:0,why:'did not see it'};
    let stay=.8*Math.pow(ag,1.5)*(1-low)-.35*se-.3*(1-ag);if(fl>.6&&low<.5)stay+=.1;
    if(r()<Math.max(0,stay))return {react:0,why:'ignores it, keeps fighting'};
    let delay=.15+.45*(1-pc)+.25*(1-pl)-.2*low+r()*.3;let showoff=0;
    if(fl>.7&&low<.4&&r()<fl-.5){delay+=.35;showoff=1;}
    delay=Math.max(.08,Math.min(z.T-.05,delay));
    const mul=ex>.6?1+.3*ex+r()*.15:.6+.5*ex+r()*.5;
    const spd=60+60*pc+30*low;
    why=showoff?'waits till the last second':mul<1?'steps out (short)':'steps clear';
    return {react:1,delay,mul,spd,why};},
  showoff(g,u,what){const fl=trait(u,'flair');if(fl<.05||Math.random()>Math.pow(fl,1.3))return;const L=SHOW_LINES[u.key?'hero':u.type]||SHOW_LINES.hero;
    const x=u.key?g.heroX(u):u.x;g.text(x,(u.key?g.G:u.y)-62,L[Math.floor(Math.random()*L.length)],'#ffd23f',false,.5);u.pauseT=.1+1.1*fl*fl;}   // showing off costs a moment
};
// ---- 0.12.13 Callouts: heroes shout short, colour-coded callouts to each other, and the callouts can change what allies do.
//   Two sliders run it (both part of the if/then behavior system like every other slider):
//     Quiet (0) <-> Chatty (10)            how often a unit calls things out. 0 almost never speaks; 10 calls out everything it sees.
//     Ignores Callouts (0) <-> Follows Callouts (10)   how often a unit does what it's asked. 0 nearly always ignores; 10 nearly always obeys.
//   Each callout is IF (something on the field) THEN (a unit may shout it) AND (each ally rolls whether to listen) THEN (that ally's
//   targeting / position / lane / energy / danger rules get pushed toward what was asked for a few seconds).
const CALL_COLOR={dog:'#d8a060',cultist:'#b05cff',robot:'#4de0d0',flannel:'#f2c94c',flannel_pal:'#ff6b6b',chibi:'#5ab4ff',archer:'#ff9f43',druid:'#7ee081',lumberjack:'#c79bff'};
const NICK={dog:'Dog',cultist:'Cultist',robot:'Hound',flannel:'Flannel',flannel_pal:'Companion',chibi:'Chibi',archer:'Yumi',druid:'Druid',lumberjack:'Jack'};
const FOE_NICK={zombie:['the zombie','that zombie','the shambler','the rotter','the dead one'],werewolf:['the wolf','the werewolf','the dog','the furball','the beast']};
const LANE_NAME=['top','upper','middle','lower','bottom'];
const CALLS={
  help:{dur:5,lines:['Help!','I need help here!','Get it off me!','A little help?!','They\'re on me!','Somebody, please!','I\'m getting swarmed!','Can\'t hold them!','Back me up!','Over here, quick!','I\'m in trouble!','HELP ME!','Cover me!','I can\'t shake {foe}!','{foe} is on me!'],
    ack:['Coming!','On my way!','Hang on!','I\'ve got you!','Moving to you!','Hold on, {ally}!','Right there!','I see you!']},
  heal:{dur:6,lines:['I need healing!','Heal me!','Patch me up!','I\'m bleeding out!','Medic!','Druid, a little help?','Need a heal!','I\'m hurt bad!','Could use some green magic!','Healer!','I\'m not gonna last!','Fix me up!'],
    poison:['I\'m poisoned!','Something in my veins...','I feel sick!','Poison! Cleanse me!'],ack:['Healing!','I\'ve got you!','Hold still!','Mending!','Hang in there!','Here, breathe!']},
  focus:{dur:6,lines:['Focus {foe}!','Everyone on {foe}!','Hit {foe}!','Take out {foe}!','{foe} first!','Burn {foe} down!','Go for {foe}!','Kill {foe}!','Target {foe}!','{foe}! Now!','All in on {foe}!','Drop {foe}!'],
    weak:['{foe} is almost dead!','Finish {foe}!','{foe} is hurt, finish it!','One more hit on {foe}!','{foe} is weak!','Clean up {foe}!'],
    ack:['On it!','Got it!','Switching!','Target acquired.','Yep!','Copy!','Locked on!']},
  flank:{dur:4,lines:['Behind you, {ally}!','{ally}, watch out!','{ally}, on your left!','Something\'s on {ally}!','{ally}, look out!','Watch your back, {ally}!','{ally}! Close one!','It\'s on {ally}!','Protect {ally}!','{foe} is on {ally}!'],
    ack:['I see it!','Got it!','Thanks!','Moving!','On it!']},
  fallback:{dur:5,lines:['Fall back!','Pull back!','Regroup!','Back up, back up!','Retreat!','Too many! Back!','Get back here!','Fall back and breathe!','Back off!','Reset! Reset!','Give ground!','Back to me!'],
    ack:['Falling back!','Backing up!','Right behind you!','Moving!','Regrouping!'],no:['No way!','Not yet!','I can take them!','Retreat? Never!','Keep running then.']},
  push:{dur:5,lines:['Push!','Push forward!','Go go go!','They\'re breaking!','Charge!','Press them!','Move up!','Don\'t let up!','Keep pushing!','Now\'s our chance!','At them!','Forward!'],
    ack:['Pushing!','Let\'s go!','Right with you!','Charging!','Hah! Yes!'],no:['Careful...','You go first.','Not so fast.','I\'ll hang back.','Too risky.']},
  burst:{dur:4,lines:['They\'re bunched up!','Hit them all!','Big group, light them up!','Now! Use everything!','They\'re clumped, blow it!','All together, now!','Pile of them here!','Perfect spot, unload!','Group\'s tight, go big!'],
    ack:['Unloading!','Here it comes!','Saying goodbye!','Firing everything!'],no:['Saving it.','Not yet.','Wait for it...']},
  boss:{dur:7,lines:['Big one!','Here it comes!','Boss incoming!','That\'s a big one!','Oh no. Oh no.','Everybody, on the big one!','Look at the size of it!','Bring it down!','Here\'s the boss!','Whoa, what is THAT?'],
    ack:['Ready!','Let\'s do it!','Bring it!','I\'m ready.']},
  down:{dur:8,lines:['{ally} is down!','We lost {ally}!','{ally}! No!','Man down!','{ally} fell!','They got {ally}!','{ally}, get up!','Avenge {ally}!'],
    angry:['You\'ll pay for that!','For {ally}!','Now I\'m mad.','No mercy!'],scared:['We\'re losing...','Stay close!','This is bad...','Careful, everyone!']},
  reload:{dur:3,lines:['Reloading!','Cover me, reloading!','Changing mags!','Out! Reloading!','Give me a sec!','Reload!','Hold them, reloading!'],ack:['Covering!','Got you!','I\'ll hold them!']},
  camp:{dur:7,lines:['Campfire\'s up!','Gather round the fire!','Warm up, everyone!','Fire\'s lit, come heal!','Come sit by the fire!','Rest up here!'],ack:['Coming!','Ooh, warm!','Be right there!','Don\'t mind if I do!']},
  lane:{dur:5,lines:['Coming up {lane}!','{lane} lane, watch it!','They\'re sneaking {lane}!','{lane} is open!','Somebody cover {lane}!','Eyes {lane}!','Movement {lane}!'],ack:['I\'ll take {lane}!','Got {lane}!','Moving {lane}!']},
  danger:{dur:2,lines:['Move!','Get out of there!','Look out!','Dodge!','Watch the ground!','{ally}, move!','Out of the way!','It\'s gonna hit!','Clear out!','MOVE, {ally}!'],ack:['Whoa!','Thanks!','Moving!','Close one!']},
  tapped:{dur:4,lines:['I\'m tapped out!','No energy!','Out of tricks!','I\'ve got nothing left!','Running on empty!','Cooling down!'],ack:['I\'ll cover you!','Got you!','Take a breath!']},
  kill:{dur:0,lines:['Got one!','Down!','Gotcha!','Next!','That\'s one!','Dropped it!','Stay down!','Easy!','And stay dead!','Another one!','Clean!','Scratch one!']},
  smoke:{dur:5,lines:['Smoke out!','Popping smoke!','Get in the smoke!','Smoke screen, use it!','Hide in the cloud!','Covering you!'],ack:['Thanks!','Into the smoke!','Got it!']},
  missiles:{dur:0,lines:['Missiles away!','Incoming!','Barrage out!','Fire in the hole!','Rockets!','Duck!']},
  gatling:{dur:0,lines:['Spinning up!','Eat lead!','Brrrrt!','Covering fire!','Hose them down!','Lead incoming!']},
  clone:{dur:0,lines:['Shadow clone!','Which one\'s real?','Double trouble!','Two of me!']},
  tentacle:{dur:0,lines:['From the deep!','Rise!','It hungers!','Feed, my pet!','The deep answers!','Tear them apart!']},
  pact:{dur:0,lines:['Blood for power!','Take my blood!','Drink deep, friends!','A small price!','Pain is strength!']},
  dread:{dur:0,lines:['Despair!','Tremble!','Flee, little things!','Your doom whispers!','Kneel!']},
  reviving:{dur:5,lines:['Getting {ally} up!','Hang on, {ally}!','Cover me, I\'m reviving!','Up you get, {ally}!','On my way, {ally}!','Hold them off!'],ack:['Covering!','Got you!','Go, go!']},
  tank:{dur:6,lines:['Get behind me!','I\'ll hold them!','Come on then!','Stay back, I got this!','Let \'em come!','I can take it!','Behind me, now!','Tanking!'],ack:['Behind you!','Got it!','Careful!','Okay!']},
  trap:{dur:4,lines:['Trap\'s down!','Lure them in!','Watch the wire!','Bait them over here!','Mind the bomb!'],ack:['Pulling back!','Luring!','Got it!']},
};
const REFUSE=['Busy!','In a sec!','Nope.','Can\'t right now!','Do it yourself!','I\'ve got my own problems!','Hmm... no.','Later!','Not now!','I\'m on something!','Ugh, fine... no.','Maybe not.'];
// IF this ally cares about this kind of callout THEN how much (0..1); multiplied with Follows Callouts to get the chance it obeys
function callRelevance(type,o,ctx){const ag=trait(o,'aggr'),se=trait(o,'self'),aw=trait(o,'aware'),lone=trait(o,'pack'),en=trait(o,'energy');
  switch(type){
    case 'heal':return isHealer(o)?1:0;
    case 'help':return .4+.6*(1-se);
    case 'focus':return .45+.55*(1-lone);
    case 'flank':return o===ctx.ally?1:(.3+.7*aw);
    case 'fallback':return Math.max(.05,1.1-ag);
    case 'push':return Math.max(.05,.15+ag);
    case 'burst':return hasAbilities(o)?(.25+.75*(1-en)):0;
    case 'boss':return .5+.5*(1-lone);
    case 'reload':case 'tapped':return .3+.7*(1-se);
    case 'camp':return o.hp/o.max<.9?1:.3;
    case 'lane':return .2+.8*trait(o,'lane');
    case 'danger':return o===ctx.ally?1:0;
    case 'trap':return .4+.6*(1-ag);
    case 'smoke':return o===ctx.ally?1:o.hp/o.max<.6?.8:.15;
    case 'reviving':return .4+.6*(1-se);
    case 'tank':return .2+.8*(1-trait(o,'range'));
    default:return 0;}}
function isHealer(u){return ((CHAR[u.key]||{}).abilities||[]).some(a=>a.id==='mend'||a.id==='bloom');}
function hasAbilities(u){return ((CHAR[u.key]||{}).abilities||[]).length>0;}
const Comms={
  name(u){return NICK[u.key]||((CHAR[u.key]||{}).name)||u.key;},
  foe(e){if(!e)return 'that one';if(e.boss)return 'the boss';const L=FOE_NICK[e.type];return L?L[Math.floor(Math.random()*L.length)]:'that one';},
  fill(s,ctx){return s.replace('{foe}',this.foe(ctx.tgt)).replace('{ally}',ctx.ally?this.name(ctx.ally):'you').replace('{lane}',ctx.lane!=null?LANE_NAME[Math.min(4,ctx.lane)]||'that lane':'that lane');},
  pick(a){return a[Math.floor(Math.random()*a.length)];},
  bubble(g,u,s,keep){if(!keep&&Math.random()<.22)return;if(u&&u.key==='dog')s=Comms.pick(['Woof!','Grrr!','Bark bark!','Arf!','*growls*','*snarls*']);   /* 0.12.38 (Kyle): about 22% less chatter on screen */s=s.charAt(0).toUpperCase()+s.slice(1);(g.calls=g.calls||[]).push({u,s,c:CALL_COLOR[u.key]||'#e8e8e8',t:0,life:1.6+Math.min(1.4,s.length*.045)});
    if(g.calls.length>8)g.calls.shift();},
  // IF a unit decides to speak (Quiet<->Chatty, a personal cooldown, and the team not having just said the same thing) THEN shout it
  say(g,u,type,ctx,force){if(!u||!u.alive||g.demo)return false;const C=CALLS[type];if(!C)return false;ctx=ctx||{};
    const talk=trait(u,'talk');g.callGap=g.callGap||0;g.callType=g.callType||{};
    if(!force){if((u.callT||0)>g.t)return false;if(g.t<g.callGap)return false;if((g.callType[type]||-99)>g.t-3.5)return false;
      // 0 = nearly never (2% for something urgent), 10 = practically every time it sees something
      const urgent=type==='help'||type==='heal'||type==='danger'||type==='down';let p=Math.pow(talk,1.6)*.95+(urgent?.03:.004);if(/flank|lane|danger|boss/.test(type))p*=.4+1.2*trait(u,'perc');p*=.78;if(Math.random()>p)return false;}
    u.callT=g.t+.8+9*(1-talk);g.callGap=g.t+.45;g.callType[type]=g.t;
    const pool=ctx.variant&&C[ctx.variant]?C[ctx.variant]:C.lines;this.bubble(g,u,this.fill(this.pick(pool),ctx),true);
    if(C.dur)this.broadcast(g,u,type,ctx,C);return true;},
  // every ally hears it: IF it's relevant to them AND they roll under Follows Callouts THEN they take the order
  broadcast(g,u,type,ctx,C){for(const o of g.alive()){if(o===u||!o.key)continue;if(o.robbedBy===u&&o.moods&&o.moods.some(m=>m.name==='robbed'))continue;   /* still sore about the theft: ignores the thief's calls */const rel=callRelevance(type,o,ctx);if(rel<=0)continue;
      const L=trait(o,'listen');const p=(.02+.96*Math.pow(L,1.15))*rel;
      if(Math.random()<p){o.order={type,from:u,tgt:ctx.tgt||null,ally:ctx.ally||null,lane:ctx.lane,x:ctx.x,until:g.t+C.dur*(.5+L),w:L};
        o.thinkT=Math.min(o.thinkT==null?0:o.thinkT,.08+.25*(1-trait(o,'pace')));   // drop what they're doing and rethink right away
        if(C.ack&&Math.random()<.15+.6*trait(o,'talk'))setTimeoutSafe(g,.35+Math.random()*.5,()=>{if(o.alive)this.bubble(g,o,this.fill(this.pick(C.ack),{tgt:ctx.tgt,ally:u,lane:ctx.lane}));});}
      else if(Math.random()<.05+.35*trait(o,'talk')*(1-L)){const pool=C.no||REFUSE;setTimeoutSafe(g,.4+Math.random()*.5,()=>{if(o.alive)this.bubble(g,o,this.pick(pool));});}}},
  ord(u,g,types){const o=u.order;if(!o||g.t>o.until)return null;if(o.from&&!o.from.alive&&o.type!=='down')return null;return types.includes(o.type)?o:null;},
  // the scan: each hero looks at the field on its own clock (Chatty units look more often) and checks the IF side of every callout
  step(g,dt){if(!g.calls)g.calls=[];for(const c of g.calls)c.t+=dt;g.calls=g.calls.filter(c=>c.t<c.life&&c.u.alive!==false);
    const al=g.alive().filter(h=>h.key&&h.alive);if(!al.length)return;const bb=g.bb;if(!bb)return;
    const E=g.enemies.filter(e=>!e.dead&&e.x<g.W);const mean=al.reduce((s,h)=>s+g.heroX(h),0)/al.length;
    if(g.boss&&!g.boss.dead&&!g.bossCalled){g.bossCalled=1;const sp=al.slice().sort((a,b)=>trait(b,'talk')-trait(a,'talk'))[0];this.say(g,sp,'boss',{tgt:g.boss},trait(sp,'talk')>.15);}
    for(const h of al){h.commT=(h.commT==null?Math.random()*.6:h.commT)-dt;if(h.commT>0)continue;h.commT=.35+.9*(1-trait(h,'talk'))+Math.random()*.3;
      const hp=h.hp/h.max,hx=g.heroX(h),heat=bb.heat.get(h)||0;
      // IF I'm hurt AND a healer is with us THEN ask for healing (poisoned units say so)
      if(hp<.5&&al.some(o=>o!==h&&isHealer(o))&&this.say(g,h,'heal',{ally:h,variant:(h.poison&&h.poison.n)?'poison':null}))continue;
      // IF I'm getting hit AND hurt THEN shout for help
      if(hp<.45&&heat>=1){const t=h.lastHitBy&&!h.lastHitBy.dead?h.lastHitBy:E.filter(e=>e.target===h)[0];if(this.say(g,h,'help',{tgt:t,ally:h}))continue;}
      // IF something has reached a back-liner (someone standing behind the team's middle) THEN warn them
      const back=al.filter(o=>o!==h&&g.heroX(o)<mean-4);for(const v of back){const e=E.find(e=>!e.fly&&Math.abs(e.x-g.heroX(v))<26&&(e.target===v||Math.abs((e.gy||g.G)-(v.gy||g.G))<8));
        if(e&&this.say(g,h,'flank',{tgt:e,ally:v}))break;}
      // IF two or more of us are hurt OR we're badly outnumbered THEN call a fall back
      const hurt=al.filter(o=>o.hp/o.max<.45).length;if((hurt>=2||E.length>=al.length*3+2)&&this.say(g,h,'fallback',{}))continue;
      // IF the enemies are few or nearly dead AND we're healthy THEN call a push
      if(E.length&&al.every(o=>o.hp/o.max>.6)&&(E.length<=2||E.every(e=>e.hp/e.max<.4))&&!(g.boss&&!g.boss.dead)&&this.say(g,h,'push',{}))continue;
      // IF 3+ enemies are bunched within ~17 world px THEN call for everyone to unload
      const clump=E.find(e=>E.filter(o=>Math.abs(o.x-e.x)<17).length>=3);if(clump&&this.say(g,h,'burst',{tgt:clump}))continue;
      // IF my target is big OR nearly dead THEN call a focus
      const T=h.plan&&h.plan.tgt;if(T&&!T.dead){const big=T.boss||(T.max||0)>=bb.maxE*.7,weak=T.hp/T.max<.3;if((big||weak)&&this.say(g,h,'focus',{tgt:T,variant:weak?'weak':null}))continue;}
      // IF a lane has enemies in it but none of us THEN call the lane
      const ln=E.find(e=>e.laneI!=null&&!al.some(o=>o.laneI===e.laneI)&&e.x<g.W*.8);if(ln&&this.say(g,h,'lane',{lane:ln.laneI,tgt:ln}))continue;
      // IF I'm out of energy AND every ability is on cooldown AND enemies are close THEN tell them I've got nothing
      if(hasAbilities(h)&&(h.en||0)<12&&abilityPlan(h).allDown&&E.some(e=>Math.abs(e.x-hx)<60)&&this.say(g,h,'tapped',{ally:h}))continue;}},
  // hooks the rest of the game calls
  onReload(g,h){this.say(g,h,'reload',{ally:h,tgt:h.plan&&h.plan.tgt});},
  onCamp(g,h,x){this.say(g,h,'camp',{ally:h,x},true&&trait(h,'talk')>.1);},
  onTrap(g,h,x){this.say(g,h,'trap',{ally:h,x});},
  onKill(g,h){if(h&&h.key)this.say(g,h,'kill',{});},
  // IF an ally falls THEN someone shouts it; everyone who hears gets angrier (Vengeful) or more careful (Forgiving)
  onDown(g,h){const al=g.alive().filter(o=>o.key&&o!==h);if(!al.length)return;const sp=al.slice().sort((a,b)=>trait(b,'talk')-trait(a,'talk'))[0];
    this.say(g,sp,'down',{ally:h},true);
    for(const o of al){const L=trait(o,'listen'),v=trait(o,'grudge');if(Math.random()<.2+.8*L){if(v>=.5)addMood(o,{aggr:4,grudge:2},10,'avenge');else addMood(o,{aggr:-4,self:-2},10,'shaken');
      if(Math.random()<.3*trait(o,'talk'))setTimeoutSafe(g,.7+Math.random()*.6,()=>{if(o.alive)this.bubble(g,o,this.fill(this.pick(v>=.5?CALLS.down.angry:CALLS.down.scared),{ally:h}));});}}},
  // IF a danger zone is about to hit someone who didn't notice THEN an ally may yell at them, and IF they listen THEN they dodge late
  onDanger(g,z,missed){const al=g.alive().filter(o=>o.key);for(const v of missed){const sp=al.filter(o=>o!==v).sort((a,b)=>trait(b,'talk')-trait(a,'talk'))[0];if(!sp)continue;
      if(this.say(g,sp,'danger',{ally:v})&&v.order&&v.order.type==='danger'){const hx=g.heroX(v);const need=hx<z.cx?-(z.hw+8-(z.cx-hx)):(z.hw+8-(hx-z.cx));
        v.dodge={at:g.t+.25,dx:(v.dodgeX||0)+need,until:g.t+z.T+.5,spd:110};v.dangerWhy='⚠ '+this.name(sp)+' warned me';}}},
};
class Game{
  constructor(opt){
    this.W=opt.W||CFG.W;this.H=CFG.H;this.G=CFG.GROUND;
    this.rng=opt.rng||Math.random;this.demo=!!opt.demo;this.run=opt.run;this.slot=opt.slot;if(!this.demo)setRunModes(this.run);this.hardcore=!this.demo&&!!(this.run&&this.run.hardcore);
    this.st=CFG.stage(this.run.stage,this.run.prestige);
    this.dist=0;this.t=0;this.events=[];this.enemies=[];this.proj=[];this.fx=[];this.minions=[];this.texts=[];
    this.budget=2;this.bossSpawned=false;this.over=null;this.kills=0;this.shake=0;this.devourStacks=0;
    this.stageXp=0;this.stageScore=0;this.loot=[];this.stageGold=0;this.stageItems=[];this.stageFood=0;this.stageWater=0;this.stageParts=0;this.stats={};
    this.heroes=this.run.team.map((k,i)=>this.makeHero(k));
    this.heroes.sort((a,b)=>(STYLE[a.key].tank?-1:0)-(STYLE[b.key].tank?-1:0)||ORDER[a.style.atk]-ORDER[b.style.atk]);
    this.recalc();
    this.heroes.forEach((h,i)=>{h.x=this.home(h);const saved=this.run.heroes[h.key];h.hp=saved.dead?h.max*.25:Math.max(1,h.max*(saved.hpf==null?1:saved.hpf));});
    this.mods=this.demo?scoutMods(null):scoutMods(this.run);
    {const kt=upgT(this.run,'kennel');if(kt&&!this.demo)this.spawnDog(kt);}
    {for(const h of this.heroes){const sv=this.run.heroes[h.key];const cr=sv.carry;   /* Triage builds ride along into the stage */
      if(cr&&!this.demo){if(cr.courage){h.courage=1;addMood(h,{nerve:-3,aggr:2},99999,'courage');}if(cr.medkit){h.medkit=1;h.medkitCamp=1;}if(cr.defib)h.defib=1;if(cr.kit&&cr.kit.length)h.kit=(h.kit||[]).concat(cr.kit).slice(0,2);sv.carry=null;}}}
    if(this.heroes.some(h=>h.courage))this.recalc();
    this.spawnTimer=0;
  }
  makeHero(key){
    const sv=this.run.heroes[key];const lvl=(this.slot&&this.slot.heroes[key]||{lvl:1}).lvl;
    const insp=(this.slot&&this.slot.heroes[key]||{}).insp||null;
    return {key,insp,def:heroDef(key),style:STYLE[key],lvl,base:heroBase(key,lvl,this.run.team.length),spells:ABILITIES_OFF?[]:sv.spells.map(s=>Object.assign({cdT:Math.random()*1.5},s)),
      items:sv.items.slice(),alive:true,x:0,atkT:Math.random()*.5,anim:0,animT:0,walkT:Math.random(),shield:0,shieldT:0,buffT:0,lowT:0,nearT:0,hitFlash:0,alt:0};
  }
  isMeleeHero(h){return h.style.atk==='melee'||h.style.atk==='duo'||h.style.atk==='blade';}
  // where each hero stands: melee 4/10 of the screen, ranged/casters 2/10 (several of a kind spread out a little)
  // 0.12.11 (Kyle): no hard-coded spots for melee vs ranged. Everyone shares one neutral rally point; WHERE each unit actually
  //   stands comes from its personality and abilities (Brain.pickPosition: Shooter<->Slasher, Calculated<->Aggressive, what's ready).
  home(h){if(h.pet&&h.owner)return this.home(h.owner)-(h.dog?6:14);const al=(this.alive().length?this.alive():this.heroes).filter(o=>!o.pet);const j=Math.max(0,al.indexOf(h));
    return Math.round(this.W*.33)-j*8+(j%2?6:0);}
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
        if(it.arch==='relic'){cdr+=.025*r;aspd+=.025*r;} if(it.arch==='charm'){crit+=.015*r;luck+=5*r;score+=.03*r;}}
      const pct=h.max?h.hp/h.max:1;
      h.max=b.hp*hpM;h.atk=b.atk*atkM*T.dmg;h.aspd=b.aspd*aspd;h.crit=Math.min(.6,crit);h.acc=b.acc||0;h.dr=Math.min(.45,dr);h.armor=h.dr;h.cdr=Math.min(.5,cdr);
      h.dodge=Math.min(.4,b.dodge+T.dodge);h.luck=luck;h.scoreM=1+score;h.pow=b.pow;h.reach=b.reach;
      h.critMul=b.critMul||1.75;h.armorPts=b.armorPts||0;h.kbRes=b.kbRes||0;h.enMaxB=100;h.enRegenB=5;h.xpBonus=0;h.lifesteal=0;h.mvMul=1;h.meleeDmg=1;h.rangedDmg=1;h.meleeSpd=1;h.rangedSpd=1;h.kbAdd=0;h.flatRanged=0;h.flatMelee=0;
      const I=INSP[h.insp];if(I){const m=I.mod||{};
        if(m.acc)h.acc+=m.acc;if(m.crit)h.crit+=m.crit/100;if(m.critMul)h.critMul+=m.critMul;if(m.dodge)h.dodge+=m.dodge/100;if(m.armor)h.armorPts+=m.armor;
        if(m.stamina){const add=m.stamina*((b.char&&b.char.hpPerStamina)||HP_PER_STAMINA);h.max+=add;}if(m.luck)h.luck+=m.luck;if(m.xp)h.xpBonus+=m.xp/100;
        if(m.kbRes)h.kbRes+=m.kbRes/100;if(m.enMax)h.enMaxB+=m.enMax;if(m.enRegen)h.enRegenB+=m.enRegen;if(m.lifesteal)h.lifesteal+=m.lifesteal/100;if(m.move)h.mvMul+=m.move/100;
        if(m.meleeDmg)h.meleeDmg+=m.meleeDmg/100;if(m.rangedDmg)h.rangedDmg+=m.rangedDmg/100;if(m.meleeSpd)h.meleeSpd+=m.meleeSpd/100;if(m.rangedSpd)h.rangedSpd+=m.rangedSpd/100;if(m.kb)h.kbAdd+=m.kb;}
      {const H=this.slot&&this.slot.heroes&&this.slot.heroes[h.key];const P=(H&&H.pts)||{};   /* level-up stat points (chosen at camp) */
        if(P.hp)h.max*=1+.04*P.hp;if(P.dmg)h.atk*=1+.03*P.dmg;if(P.acc)h.acc+=2*P.acc;if(P.crit)h.crit+=.01*P.crit;if(P.luck)h.luck+=3*P.luck;if(P.armor)h.armorPts+=P.armor;
        if(h.courage){h.atk*=1.2;h.acc-=10;}   /* Liquid Courage */const gt=upgT(this.run,'gen');if(gt)h.enRegenB+=[0,.25,.5,.75,1][gt];const bt=upgT(this.run,'bench');if(bt){h.flatRanged=(h.flatRanged||0)+bt;h.flatMelee=(h.flatMelee||0)+bt;}const sh=upgT(this.run,'shrine');if(sh)h.luck+=[5,10][sh-1];}
      if(h.hp!=null)h.hp=Math.min(h.max,pct*h.max);}
  }
  alive(){return this.heroes.filter(h=>h.alive).concat((this.pets||[]).filter(p=>p.alive));}
  aliveHeroes(){return this.heroes.filter(h=>h.alive);}
  front(){const a=this.alive();return a.length?a.reduce((m,h)=>h.x>m.x?h:m,a[0]):null;}
  ev(type,o){this.events.push(Object.assign({type},o||{}));}
  // ---------------------------------------------------------------- spawning
  spawnEnemy(type,opt){
    const E=CFG.enemies[type];const st=this.st;const elite=(!opt||opt.elite==='roll')&&this.rng()<.07+.01*st.n;
    const hp=E.hp*st.hpMul*(elite?2.6:1);
    const e={type,E,x:this.W+10+this.rng()*20,y:E.fly?this.G-70+this.rng()*36:this.G,hp,max:hp,dmg:(E.dmg||E.dmgDie/2+.5)*st.dmgMul*(elite?1.5:1),dmgMul:st.dmgMul*(elite?1.5:1),skin:E.skins?E.skins[Math.floor(this.rng()*E.skins.length)]:type,atkT:this.rng()*.5,
      walkT:this.rng(),anim:0,animT:0,slow:0,slowT:0,stun:0,burn:0,burnT:0,shred:0,elite,fly:!!E.fly,ranged:!!E.ranged,hitFlash:0,phase:this.rng()*6,target:null};
    if(opt)Object.assign(e,opt);
    this.enemies.push(e);return e;
  }
  spawnBoss(){
    const B=CFG.bosses[this.st.boss];const hp=B.hp*this.st.hpMul;
    const b={type:this.st.boss,B,boss:true,x:this.W+70,y:B.fly?this.G-40:this.G,hp,max:hp,dmg:B.dmg*this.st.dmgMul,atkT:0,t1:2,t2:5,t3:8,anim:0,animT:0,walkT:0,
      slow:0,slowT:0,stun:0,burn:0,burnT:0,shred:0,hitFlash:0,fly:!!B.fly,phase:0,w:22};
    this.enemies.push(b);this.boss=b;this.bossSpawned=true;this.ev('boss',{name:B.name});this.shake=.6;for(const h of this.alive())Brain.panic(this,h,'boss');
  }
  pickType(){const pool=this.st.biome.pool;let tot=0;for(const k in pool)tot+=pool[k];let r=this.rng()*tot;for(const k in pool){r-=pool[k];if(r<=0)return k;}return Object.keys(pool)[0];}
  // ---------------------------------------------------------------- damage
  /* 0.12.38 stage stats per unit (shown after a stage clears) */
  st8(h){const k=(h&&h.key)||'?';this.stats=this.stats||{};return this.stats[k]||(this.stats[k]={dmg:0,heal:0,kills:0,downs:0,revives:0,searches:0,crits:0,heads:0,taken:0,biggest:0});}
  hitEnemy(e,amt,src,opt){
    if(e.dead||amt<=0)return 0;opt=opt||{};if(src&&src.key){e.lastHitBy=src;e.grudgeT=1+14*trait(e,'grudge');}
    if(!opt.sure&&e.E&&e.E.dodge&&this.rng()<e.E.dodge){this.text(e.x,e.y-30,'miss','#9aa');return 0;}
    let crit=false;if(src&&!opt.nocrit&&this.rng()<src.crit+(opt.critAdd||0)){amt*=(opt.critMul||src.critMul||1.75);crit=true;
      const HR=!opt.fromTent&&src.base&&src.base.char&&(src.base.char.abilities||[]).find(a=>a.id==='herald');if(HR){src.critRegenT=HR.critT;for(const T of this.tentacles||[])T.heraldT=HR.critT;}}   // Herald: his crits (not his tentacles') feed him and every tentacle he has out   // Herald: crits feed energy
    if(opt.head){amt*=HEADSHOT.mul;this.text(e.x,e.y-(e.fly?24:54),'HEADSHOT!','#ff6040',false);   /* 0.12.36 (Kyle): half the old size */}
    {const ip=insP(src);   // inspiration passives that trigger on his hits
     if(ip==='onslaught'&&(src.moveT||0)>1){amt*=2;src.moveT=0;}
     if(ip==='bounty'&&!e.bounty&&!e.dead){const big=this.enemies.filter(o=>!o.dead).reduce((b,o)=>!b||o.max>b.max?o:b,null);if(big===e){e.bounty=src;e.markT=8;e.markAmp=.25;}}
     if(ip==='pickpocket'&&!e.picked&&!e.boss){e.picked=1;if(this.rng()<.35)this.text(e.x,e.y-34,'$','#ffd23f');}   /* 0.12.45 (Kyle): picked pockets mean better drops when it dies */
     if(ip==='webs'&&!e.boss&&this.rng()<.15){e.slow=Math.max(e.slow||0,.6);e.slowT=Math.max(e.slowT||0,2);e.webT=2;}}
    amt=mitigate(e,amt,opt.type); if(e.shred>0)amt*=1.2;if(e.markT>0)amt*=1+(e.markAmp||.25);   // Pinning_Shot mark
    if(opt.execute&&e.hp<e.max*.3)amt*=2;
    amt=Math.max(1,amt);e.hp-=amt;e.hitFlash=.12;this.lastHit=this.t;
    if(src&&src.key&&!this.demo){const S=this.st8(src);S.dmg+=amt;if(crit)S.crits++;if(opt.head)S.heads++;if(amt>S.biggest)S.biggest=amt;}   /* stage stats */
    this.splatter(e,amt,1,crit);
    if(opt.kb>0){const ratio=Math.min(1,amt/Math.max(1,e.max));let kb=ratio<.08?ratio*12:ratio<.25?2+ratio*14:5+ratio*12;   // chip ~0, medium small, big decent
      if(crit)kb*=1.6;if(e.boss)kb*=.12;kb*=opt.kb;if(e.fly)kb*=.7;if(e.E&&e.E.kbRes)kb*=1-e.E.kbRes;e.kbv=Math.max(e.kbv||0,Math.min(18,kb)*7);e.kbDir=src&&src.x!=null&&!e.boss?(e.x>=src.x?1:-1):1;}
    this.text(e.x+(this.rng()*8-4),e.y-(e.boss?100:e.fly?16:44),Math.round(amt),crit?'#ffd23f':'#ffffff',crit);
    if(src&&src.lifesteal>0&&src.alive){const b0=src.hp;src.hp=Math.min(src.max,src.hp+amt*src.lifesteal);if(src.key)this.st8(src).heal+=src.hp-b0;}
    if(!ABILITIES_OFF&&src&&src.style&&src.style.leech)this.healHero(this.weakest(),amt*src.style.leech*.5,true);
    if(src&&src.items&&src.items.length)this.procs(src,crit?'oncrit':'onhit',e);
    if(e.hp<=0){if(opt.blast)e._blast={x:opt.bx!=null?opt.bx:(src?src.x:e.x-20)};this.kill(e,src);}
    return amt;
  }
  kill(e,src){
    if(e.bounty&&!this.demo){this.stageGold+=10;this.text(e.x,e.y-40,'+10','#ffd23f');}
    if(insP(src)==='devour'&&src.alive){this.healHero(src,src.max*.03,true);src.en=Math.min(src.enMax||100,(src.en||0)+4);}
    e.dead=true;this.kills++;if(src&&src.key&&!this.demo)this.st8(src).kills++;this.onKillDark(e);if(src&&src.key&&!this.demo)Brain.showoff(this,src,'kill');if(src&&src.key)Comms.onKill(this,src);
    const xp=(e.boss?e.B.xp:e.E.xp*(e.elite?2.5:1)*.33)*this.st.xpMul;   // regular enemies give about half the XP they used to (stages are twice as long)
    const pts=Math.round((e.boss?e.B.pts:e.E.pts*(e.elite?3:1))*(1+.4*(this.st.n-1))*(1+this.run.prestige)*(src?src.scoreM:1));
    this.stageScore+=pts;this.gainXp(xp);
    this.fx.push({k:'poof',x:e.x,y:e.y-(e.fly?0:20),t:0,big:!!e.boss||e.elite});
    if(!e.boss&&e._blast&&/^zombie/.test(e.type)){   /* 0.12.40 (Kyle): blown up by an explosion -> it bursts into gibs instead of falling over */
      const dir=e.x>=e._blast.x?1:-1;const G0=e.gy!=null?e.gy:this.G;const P=[];for(let i=0;i<16;i++){const a=-Math.PI/2+(this.rng()-.5)*2.2;const sp=40+this.rng()*70;
        P.push({x:e.x+(this.rng()-.5)*4,h:4+this.rng()*10,vx:Math.cos(a)*sp*.6+dir*(20+this.rng()*35),vh:-Math.sin(a)*sp*.9,s:i<4?2.2:i<10?1.5:1,c:i%5===0?'#d8d0c0':i%3===0?'#5a7060':['#7a1010','#a01818','#4a0c0c'][i%3],rot:this.rng()*6});}
      this.fx.push({k:'gibs',x:e.x,gy:G0,t:0,life:2.6,raw:1,P,dir});this.fx.push({k:'blood',raw:1,x:e.x,y:G0-12,gy:G0,dir,n:22,big:true,seed:this.rng()*1000,t:0,life:.9});this.shake=Math.max(this.shake||0,.15);}
    else if(!e.boss)this.fx.push({k:'corpse',gy:e.gy,type:e.type,skin:e.skin,x:e.x,y:e.y,fly:e.fly,elite:e.elite,lane:e.lane||0,t:0,life:1.3});
    if(this.team.devour){this.devourStacks=Math.min(60,this.devourStacks+1);for(const h of this.alive())if(h.spells.some(s=>s.arch==='devour'))this.healHero(h,h.max*(.006+.0025*this.spellRank(h,'devour')),true);}
    if(src&&src.items)this.procs(src,'onkill',e);
    if(!this.demo){const st=this.st;const r=this.rng();
      const PK=e.picked?{g:1.6,s:2,p:2.5,i:1.5}:{g:1,s:1,p:1,i:1};const gChance=e.boss?1:e.elite?1:Math.min(.95,(e.E.goldChance!=null?e.E.goldChance:.12)*((this.mods&&this.mods.gold)||1)*PK.g);if(r<gChance){const piles=e.boss?5:e.elite?2:1;   /* 0.12.38 (Kyle): every gold pile is small, 2-6 gold (bosses drop 5 piles, elites 2) */
        for(let i=0;i<piles;i++)this.loot.push({kind:'gold',x:e.x+(this.rng()*14-7),gy:e.gy,amt:2+Math.floor(this.rng()*5),t:0,big:false});}
      {const m=e.boss?6:e.elite?2:1;   /* 0.12.38 camp supplies off enemies (low odds): food or water 3%, spare parts 4% */
        if(this.rng()<.03*m*((this.mods&&this.mods.supply)||1)*PK.s)this.loot.push({kind:this.rng()<.5?'water':'food',x:e.x+(this.rng()*10-5),gy:e.gy,amt:1,t:0});
        if(this.rng()<.04*m*((this.mods&&this.mods.parts)||1)*PK.p)this.loot.push({kind:'parts',x:e.x+(this.rng()*10-5),gy:e.gy,amt:1+(this.rng()<.5?1:0),t:0});}
      const iChance=(e.boss?1:e.elite?.1+.01*st.n:(e.E.itemChance!=null?e.E.itemChance:.004+.0012*st.n))*PK.i;if(this.rng()<iChance){const it=rollItem(this.run,this.rng,e.boss?'U':null,e.boss?'boss':e.elite?'elite':'mob');if(it)this.loot.push({kind:'item',x:e.x+6,item:it,t:0});}}
    if(e.boss){this.ev('bossdown',{name:e.B.name});this.shake=1;for(const o of this.enemies)if(!o.dead){o.dead=true;this.fx.push({k:'poof',x:o.x,y:o.y-20,t:0});}}
  }
  spellRank(h,arch){const s=h.spells.find(s=>s.arch===arch);return s?s.r:0;}
  gainXp(xp){
    xp*=this.team.xp;this.stageXp+=xp;
    if(this.demo)return;
    this.run.xp=(this.run.xp||0)+xp;
    while(this.run.xp>=needRunXp(this.run.lv||0)){this.run.xp-=needRunXp(this.run.lv||0);this.run.lv=(this.run.lv||0)+1;this.run.pending=(this.run.pending||0)+1;this.ev('levelup');}
    // persistent hero XP with catch-up for heroes behind the team / the stage
    const al=this.aliveHeroes();if(!al.length||!this.slot)return;
    const lv=this.heroes.map(h=>this.slot.heroes[h.key].lvl);const ref=Math.max(Math.max(...lv),1+(this.st.n-1)*1.3+this.run.prestige*12);
    for(const h of al){const H=this.slot.heroes[h.key];const cu=Math.min(5,1+.4*Math.max(0,ref-H.lvl));H.xp+=xp*1.5*h.base.xpm*(1+(h.xpBonus||0)+[0,.1,.2,.3][upgT(this.run,'dummy')])*cu/al.length;
      while(H.xp>=needHeroXp(H.lvl)){H.xp-=needHeroXp(H.lvl);H.lvl++;this.ev('herolevel',{key:h.key,lvl:H.lvl});this.text(h.x,this.G-70,'LV '+H.lvl,'#7dff9a',true);}}
  }
  healHero(h,amt,quiet,by){if(!h||!h.alive||amt<=0)return;const before=h.hp;h.hp=Math.min(h.max,h.hp+amt);{const B=by||this._healBy||h;if(B&&B.key&&!this.demo)this.st8(B).heal+=h.hp-before;}if(!quiet&&h.hp-before>=1)this.text(h.x,this.G-56,'+'+Math.round(h.hp-before),'#7dff9a');}
  weakest(){const a=this.alive();return a.length?a.reduce((m,h)=>h.hp/h.max<m.hp/m.max?h:m,a[0]):null;}
  // hit visual: a spray of blood thrown away from the blow, drops falling to the ground and leaving a fading spatter
  splatter(u,amt,dir,crit){if(this.demo&&this.rng()<.5)return;const boss=!!u.boss;const gy=u.gy!=null&&!u.fly?u.gy:this.G;
    const y=boss?gy-30:u.fly?u.y:gy-(u.type==='werewolf'?8:12);   // chest height on the half-size units
    this.fx.push({k:'blood',raw:1,x:u.x,y,gy:boss?gy:gy,dir,n:Math.min(18,6+Math.round(amt*1.2))+(crit?8:0),big:crit||boss,seed:this.rng()*1000,t:0,life:.9});}
  // Bleed: damage over time that ignores armor; reapplying refreshes it (doesn't stack)
  bleed(h,total,dur){const fresh=!(h.bleedT>0);h.bleedT=dur;h.bleedDps=total/dur;h.bleedTick=h.bleedTick||0;if(fresh)this.text(h.x,this.G-66,'BLEED','#ff3a4a');}
  hurtHero(h,amt,from){
    if(!h||!h.alive)return;if(from&&from.E){h.lastHitBy=from;h.grudgeT=1+19*trait(h,'grudge');}   // Forgiving forgets in a second; Vengeful holds it 20s
    if(this.rng()<h.dodge){this.text(h.x,this.G-52,'dodge','#9ae6ff');return false;}
    if(from&&from.smokeT>0&&this.rng()<.5){this.text(h.x,this.G-52,'miss','#c8d0d8');return false;}   // Smoke_Screen: blinded attackers miss half the time
    if(!this._bgRedirect&&from){const bg=this.alive().find(o=>o!==h&&insP(o)==='bodyguard'&&Math.abs(this.heroX(o)-this.heroX(h))<14&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6);
      if(bg){this._bgRedirect=1;this.hurtHero(bg,amt*.3,from);this._bgRedirect=0;amt*=.7;}}   // Bodyguard takes 30% of the hit
    {const ip=insP(h);
     if(ip==='omen'&&(h.omenCd||0)<=this.t){h.omenCd=this.t+12;this.text(h.x,this.G-52,'miss','#b8a0ff');return false;}
     if(ip==='haunt'&&from&&from.E&&!from.boss&&this.rng()<.2){from.retreatT=Math.max(from.retreatT||0,1.5);from.fearT=1.5;}
     if(ip==='shell'&&h.hp/h.max<.4&&(h.shellCd||0)<=this.t){h.shellCd=this.t+30;h.shellT=3;}}
    if(h.cloneT>0&&from&&from.E&&this.rng()<(h.cloneDecoy||.35)){this.fx.push({k:'spark',x:h.x-(h.face||1)*10,y:this.G-22,t:0,c:'#9ad8ff'});return false;}   // Shadow_Clone soaks it
    if(h.smokeT>0&&this.rng()<.25){this.text(h.x,this.G-52,'dodge','#c8d0d8');return false;}   // ...and heroes inside the smoke are harder to hit
    if(h.invulnT>0){this.text(h.x,this.G-52,'miss','#9ae6ff');return false;}
    amt=mitigate(h,amt,'physical');if(h.rageT>0)amt*=.75;if(h.shellT>0)amt*=.3;if(amt>0&&h.herbT>0)h.herbT=0;   // a hit stops a herb healif(h.gritT>0)amt*=1-(h.gritDR||0);   // Grit_Teeth
    if(h.shield>0){const s=Math.min(h.shield,amt);h.shield-=s;amt-=s;if(h.thorns&&from&&!from.dead)this.hitEnemy(from,s*.3,null,{nocrit:1,sure:1});}
    if(amt<=0)return false;
    {const was=h.hp/h.max;h.hp-=amt;if(h.key&&was>=.35&&h.hp/h.max<.35)Brain.panic(this,h,'hurt');
     /* On Track <-> New Plan: IF I'm hit mid-search or mid-revive THEN rethinkers drop it, relentless units finish the job */
     if(h.key&&!this.demo){const pl=trait(h,'plan');if(h.search&&!h.search.disarm&&Math.random()<.08+.55*pl){h.search=null;h.srDecide={o:null,until:this.t+2,go:false};h.amDecide=null;h.plan=null;h.thinkT=0;}
       else if(h.plan&&h.plan.reviveD&&Math.random()<.05+.45*pl){h.revDecide={D:h.plan.reviveD,until:this.t+1.5,go:false};h.plan=null;h.thinkT=0;}}}
    h.hitFlash=.12;this.text(h.x+4,this.G-52,Math.round(amt),'#ff5a5a');if(h.key&&!this.demo)this.st8(h).taken+=amt;
    {const PL=h.base&&h.base.char&&(h.base.char.abilities||[]).find(a=>a.id==='plating');if(PL){h.plStacks=(h.plStacks||0)+1;   // Reactive_Plating
      if(h.plStacks>=PL.stacks&&!(h.plCd>this.t)){h.plStacks=0;h.plCd=this.t+PL.cd;h.shield=Math.max(h.shield||0,h.max*PL.shield);h.shieldT=PL.shieldT;this.shake=Math.max(this.shake||0,.3);
        this.fx.push({k:'ring',x:h.x,y:this.G-10,r:PL.r,t:0,c:'#7fd8ff'});this.fx.push({k:'quake',x:h.x,gy:h.gy||this.G,t:0,life:.5,raw:1});this.ev('boom',{});
        for(const e of this.enemies){if(e.dead||e.fly||e.boss)continue;if(Math.abs(e.x-h.x)<PL.r&&Math.abs((e.gy||this.G)-(h.gy||this.G))<12){const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,PL.kb/100*40*8*(1-res));e.kbDir=e.x>=h.x?1:-1;}}}}}
    {const F=this.camp;if(F&&(F.state==='burn'||F.state==='start')&&(h===F.owner||h.owner===F.owner)){F.life--;if(F.life<=0){F.state='dying';F.dT=0;this.text(F.x,this.G-40,'THE FIRE DIES','#9aa');}}}
    this.splatter(h,amt,-1,false);
    this.procs(h,'whenhit',from,amt);
    if(h.hp/h.max<.35)for(const o of this.alive())this.procs(o,'allylow',null,0,h);
    if(h.hp<=0)this.heroDown(h);
    return true;
  }
  heroDown(h){if(this.tryResurge(h))return;h.leap=null;h.leapH=0;h.whirl=null;h.dash=null;h.rolling=null;   /* no frozen mid-move poses */for(const o of this.alive())if(o!==h&&Math.abs(this.heroX(o)-this.heroX(h))<90)Brain.panic(this,o,'down');if(h.key&&!this.demo)this.st8(h).downs++;if(!h.pet){h.downed=1;h.revT=0;h.downT=this.t;}/* 0.12.22: downed, not dead: an ally can help them up */if(h.lastHitBy&&!h.lastHitBy.dead&&!this.demo)Brain.showoff(this,h.lastHitBy,'down');h.hp=0;h.alive=false;h.bleedT=0;this.ev('herodown',{key:h.key});Comms.onDown(this,h);this.fx.push({k:'poof',x:h.x,y:this.G-20,t:0,big:true});
    if(!h.pet){for(const p of this.pets||[])if(p.owner===h&&p.alive&&!p.dog){p.alive=false;this.fx.push({k:'poof',x:p.x,y:this.G-20,t:0});}}   // she leaves when he goes down
    if(!this.aliveHeroes().length){this.over='defeat';this.ev('defeat');}}
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
    const mz=MUZZLE[h.key]||[10,30];const y0=this.G-mz[1];const p={kind,x:h.x+(h.face<0?-mz[0]:mz[0]),y:y0,tx:target,dmg,src:h,spd:PSPD[kind]||160,pierce:opt.pierce||(h.style&&h.style.pierce)||0,opt,t:0,vy:kind==='brick'?-70:0,hit:new Set()};
    this.proj.push(p);return p;
  }
  aim(p,h,tg){if(h&&h.sprayT>0){h._accBonus=(h._accBonus||0)-18;const r=this._aimInner(p,h,tg);h._accBonus+=18;return r;}return this._aimInner(p,h,tg);}
  _aimInner(p,h,tg){   // turn a shot into a free-flying projectile aimed with the reticle (0.11): either direction, heroes or enemies
    p.aimed=true;p.gy=h.gy!=null?h.gy:this.G;p.h=h.fly?(this.G-h.y)/UNIT_SCALE:(h.key&&HERO_HB[h.key]?(MUZZLE[h.key]||[0,14])[1]/UNIT_SCALE:28);const air=tg.fly&&!tg.boss;const flyH=air?(this.G-tg.y)/UNIT_SCALE:0;
    const tx=tg.boss?tg.x-tg.w*.5:(tg.key?this.heroX(tg):tg.x);p.dir=tx>=p.x?1:-1;const dist=Math.abs(tx-p.x);
    if(air){p.aimH=rollAirAim((h.acc||0)+(h._accBonus||0),this.rng,flyH);p.tgy=p.gy;}
    else if(tg.boss){p.aimH=rollAimHeight((h.acc||0)+(h._accBonus||0),this.rng);p.tgy=tg.gy!=null?tg.gy:this.G;}
    else{const R=h._forceBox?reticleBox(tg,h._forceBox,this.rng):reticle((h.acc||0)+(h._accBonus||0),tg,dist,this.rng);p.aimH=R.h;p.tgy=(tg.gy!=null?tg.gy:this.G)+R.off;}
    p.arc=ARC[p.kind]||0;p.h0=p.h;p.x0=p.x;p.dist=Math.max(14,dist);p.gy0=p.gy;p.tx=null;p.foes=h.key?'enemies':'heroes';}
  text(x,y,s,c,big,sc){if(this.demo&&typeof s==='number'&&this.rng()<.6)return;this.texts.push({x,y,s:String(s),c,t:0,big:!!big,sc});}
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
    // 0.12.2 behavior AI: everyone reads the same snapshot of the battlefield, then each hero thinks on its own clock
    Brain.snapshot(this);for(const h of al)h._gt=this.t;Comms.step(this,dt);
    for(const h of al){Brain.tick(h,dt);if(Brain.due(this,h,dt)){const foes=this.enemies.filter(e=>!e.dead&&e.x<this.W+4);
      const pk=Brain.pickTarget(this,h,foes,al,true);const lane=Brain.pickLane(this,h,pk&&pk.tgt,true);const pos=Brain.pickPosition(this,h,pk&&pk.tgt);
      const gw=pos.goTo&&pos.goTo.ob?OBST[pos.goTo.ob.k]:null;h.plan={tgt:pk&&pk.tgt,why:pos.reviveD?'helping '+Comms.name(pos.reviveD)+' up':pos.intent==='disarm'?'shutting off the car alarm':pos.intent==='search'?'searching the '+(/^car_/.test(pos.goTo.ob.k)?'wreck':'debris'):pos.intent==='herb'?'bringing supplies to '+Comms.name(pos.goTo):pos.intent==='guard'?'guarding '+Comms.name(pos.goTo):pos.intent==='orbit'?(h.dog?'guarding ':'circling ')+Comms.name(h.owner):pos.intent==='hunker'?'taking cover':pos.intent==='defuse'?'defusing a mine':pos.intent==='sneak'?'eyeing '+Comms.name(pos.goTo)+'\'s pockets':(pk?pk.why:''),lane:pos.reviveLane!=null?pos.reviveLane:lane,...pos};
      if(pos.intent==='hold'&&trait(h,'pace')<.45&&Math.random()<(1-trait(h,'pace'))*.5)h.pauseT=.4+1.6*(1-trait(h,'pace'));}}   // slow-and-steady units stop to think
    // formation
    // formation: everyone heads for their slot at their own pace; while marching, quicker heroes drift ahead and slow ones lag a little
    const avgMv=al.reduce((m,h)=>m+(MOVE[h.key]||26),0)/Math.max(1,al.length);
    al.forEach((h,i)=>{const mv=MOVE[h.key]||26;const drift=this.scroll?Math.max(-8,Math.min(10,(mv-avgMv)*.9)):0;let tx=this.exiting?this.W+60:(h.plan&&h.plan.reviveD&&!h.plan.reviveD.alive?h.plan.reviveD.x:h.plan&&h.plan.goTo&&h.plan.goTo.mine?h.plan.goTo.mine.x-7:h.plan&&h.plan.goTo&&h.plan.goTo.ob?(()=>{const o=h.plan.goTo.ob;if(/search|disarm/.test(h.plan.intent))return this.searchSpot(o,h).x;const [a,b]=this.obSpan(o,o.lanes[0]);return h.x<(a+b)/2?a-6:b+6;})():h.plan&&h.plan.goTo&&h.plan.goTo.alive?this.heroX(h.plan.goTo)+(h.plan.goTo.x<h.x?8:-8):this.home(h)+drift+(h.plan?h.plan.xoff:0));tx=Math.max(8,Math.min(this.W-8,tx));
      if(!this.exiting&&trait(h,'range')>.55&&!(h.plan&&(h.plan.intent==='retreat'||h.plan.reviveD||h.plan.goTo))){const foe=this.enemies.filter(e=>!e.dead&&!e.boss&&!e.fly&&e.gy!=null&&Math.abs(e.gy-(h.gy||190))<4&&e.x>h.x&&e.x-h.x<90).reduce((b,e)=>!b||e.x<b.x?e:b,null);if(foe)tx=Math.max(tx,Math.min(this.home(h)+28,foe.x-12));}   // push forward into the fight
      const x0=h.x;const C=h.base.char;const rm=C?((h.plan&&/retreat|charge|kite|cover|regroup|gather|revive|herb|guard|search|disarm|hunker|defuse/.test(h.plan.intent))||this.exiting?C.run:1):(h.plan?h.plan.runMul:1);h.running=C?rm>1:false;
      const d=tx-h.x,st=mv*(h.mvMul||1)*(h.whirl?.5:1)*(this.exiting&&!C?2.6:1.6)*rm*(rm>1?.75:.85)*dt;/* 0.12.13 (Kyle): walking 15% slower, running 25% slower */if(!(h.pauseT>0)||this.exiting)h.x+=Math.abs(d)<=st?d:Math.sign(d)*st;h.moving=Math.abs(h.x-x0)>.02;h.moveT=h.moving?(h.moveT||0)+dt:0;});
    const f=this.front();if(!f)return;
    // blocking: walk unless something is close
    const near=this.enemies.filter(e=>!e.dead&&!e.fly).reduce((m,e)=>Math.min(m,e.x-(e.boss?e.w:0)-(e.ranged?40:0)),1e9);
    const blocked=(near<f.x+70||(this.boss&&!this.boss.dead))&&!(this.t-(this.lastHit||0)>3&&!(this.boss&&!this.boss.dead));
    const scroll=this.exiting?0:blocked?0:Math.max(18,Math.min(32,avgMv));this.scroll=scroll;if(this.exiting){this.exitT+=dt;for(const h of al)h.walkT+=dt*(MOVE[h.key]||26)/26;}
    if(!this.bossSpawned)this.dist+=scroll*dt;
    // spawning
    const stageDone=this.dist>=this.st.len;
    const prog=Math.min(1,this.dist/this.st.len),ramp=.3+1.4*prog;   // light at the start, heavy near the end
    if(this.demo){if(!stageDone&&!this.exiting){this.budget+=this.st.rate*ramp*dt*(scroll?1.15:.25);   // title-screen demo keeps the old steady trickle
      const type=this.nextType||(this.nextType=this.pickType());const c=CFG.enemies[type].cost;
      if(this.budget>=c&&this.enemies.filter(e=>!e.dead).length<20){this.budget-=c;this.spawnEnemy(type);this.nextType=null;}}}
    else if(!stageDone&&!this.exiting){
      // 0.12.6 (Kyle): enemies come in CLUSTERS instead of a steady flow. 7 clusters per stage, spread along the stage with some
      //   randomness. Sizes grow from 2 at the start to 6-7 at the end (each a little random). A cluster walks in over ~1.5s, bunched.
      if(!this.clusters){const N=CLUSTERS.count;this.clusters=[];
        for(let i=0;i<N;i++){const t=i/(N-1);const size=i===0?CLUSTERS.first:i===N-1?CLUSTERS.last[0]+Math.floor(this.rng()*(CLUSTERS.last[1]-CLUSTERS.last[0]+1)):
            Math.max(2,Math.min(7,Math.round(CLUSTERS.first+(CLUSTERS.last[0]+.5-CLUSTERS.first)*t+(this.rng()*2-1))));
          const at=this.st.len*Math.max(.02,Math.min(.9,.04+.84*t+(this.rng()*2-1)*.04));const sz=Math.max(1,Math.round(size*(this.st.countMul||1)*((this.mods&&this.mods.foes)||1)+(this.rng()-.5)*.6));this.clusters.push({at,size:sz,left:sz,t:0});}
        // strays: single zombies dropped in the quiet gaps between clusters (never right on top of one), some stages get none in a gap
        this.strays=[];const ats=this.clusters.map(q=>q.at);for(let i=0;i<STRAYS_PER_STAGE(this.st.n)*3&&this.strays.length<STRAYS_PER_STAGE(this.st.n);i++){
          const k=Math.floor(this.rng()*(ats.length-1));const a=ats[k],b=ats[k+1];if(b-a<this.st.len*.07)continue;const x=a+(b-a)*(.3+.4*this.rng());if(this.strays.some(s=>Math.abs(s-x)<this.st.len*.05))continue;this.strays.push(x);}
        this.strays.sort((p,q)=>p-q);}
      while(this.strays&&this.strays.length&&this.dist>=this.strays[0]){this.strays.shift();if(this.enemies.filter(e=>!e.dead).length<24)this.spawnEnemy('zombie',{x:this.W+10+this.rng()*22,elite:'roll',stray:1});}
      const C0=this.clusters[0];
      if(C0&&this.dist>=C0.at){C0.t-=dt;if(C0.t<=0&&this.enemies.filter(e=>!e.dead).length<24){C0.left--;C0.t=.12+this.rng()*.35;
          this.spawnEnemy(this.pickType(),{x:this.W+10+this.rng()*22,elite:'roll'});if(C0.left<=0)this.clusters.shift();}}}
    if(!stageDone&&!this.demo){if(!this.wolfPlan){const k=WOLVES_PER_STAGE(this.st.n);this.wolfPlan=[];for(let i=0;i<k;i++)this.wolfPlan.push(this.st.len*(.12+.68*(i+.2+.4*this.rng())/k));}
      while(this.wolfPlan.length&&this.dist>=this.wolfPlan[0]){this.wolfPlan.shift();this.spawnEnemy('werewolf');}}
    else if(this.st.boss&&!this.bossSpawned&&!this.enemies.some(e=>!e.dead))this.spawnBoss();
    else if(!this.st.boss&&!this.enemies.some(e=>!e.dead)&&!this.demo&&!this.exiting){this.exiting=true;this.exitT=0;}
    if(this.demo&&stageDone){this.dist=0;}
    if(this.boss&&this.boss.dead&&!this.over&&!this.demo&&!this.exiting){this.exiting=true;this.exitT=0;}
    if(this.exiting&&!this.over){const al2=this.alive();if(!this.loot.length&&al2.every(h=>h.x>this.W+24)||this.exitT>12){this.over='clear';this.ev('clear');return;}}
    // heroes
    this.stepObstacles(dt,scroll);this.stepMines(dt,scroll);this.stepRobot(dt,scroll);this.stepDark(dt,scroll);
    for(const [i,h] of this.heroes.entries()){if(h.laneI==null){h.laneI=[2,1,3][i%3];h.gy=LANES[h.laneI];}}
    for(const h of al){
      {const hx=h.x;this._ignoreMine=h.defuse&&h.defuse.M;const want=this.freeLane(h.plan&&h.plan.lane!=null?h.plan.lane:h.laneI,h.laneI,hx-8,hx+(scroll?55:14));   // walk around obstacles
       if(want!==h.laneI&&Math.abs(h.gy-LANES[h.laneI])<1)h.laneI+=Math.sign(want-h.laneI);}
      {const ty=LANES[h.laneI];h.gy+=Math.sign(ty-h.gy)*Math.min(Math.abs(ty-h.gy),LANE_SPD*1.4*dt);}
      if(h.leap){h.leap.age=(h.leap.age||0)+dt;if(h.leap.age>1.2){h.x=h.leap.x1;h.leap=null;h.leapH=0;}}   /* 0.12.50 (Kyle): a leap always lands, even if the fight around him ends mid-air */
      regenEnergy(h,dt);if(h.critRegenT>0){h.critRegenT-=dt;h.en=Math.min(h.enMax||100,(h.en||0)+2*dt);h.hp=Math.min(h.max,h.hp+2*dt);}/* Herald: +1 energy and +1 HP every 0.5s */if(h.riseT>0){h.riseT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);}h.walkT+=dt*(scroll?(MOVE[h.key]||26)/26:0);if(h.animT>0)h.animT-=dt;if(h.hitFlash>0)h.hitFlash-=dt;if(h.buffT>0)h.buffT-=dt;
      if(h.shellT>0){h.shellT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);}
      if(h.shieldT>0){h.shieldT-=dt;if(h.shieldT<=0)h.shield=0;}
      if(h.invulnT>0)h.invulnT-=dt;
      if(h.hotT>0){h.hotT-=dt;h.hotTick=(h.hotTick||0)+dt;if(h.hotTick>=h.hotEvery){h.hotTick-=h.hotEvery;this.healHero(h,h.hotAmt,false,h.hotSrc);}}   // Rejuvenating Bloom
      if(h.bleedT>0){h.bleedT-=dt;h.bleedTick+=dt;if(h.bleedTick>=1||h.bleedT<=0){const d=h.bleedDps*Math.min(1,h.bleedTick);h.bleedTick=0;h.hp-=d;this.text(h.x+6,this.G-58,Math.round(d),'#c0102a');if(h.hp<=0){this.heroDown(h);continue;}}}
      for(const it of h.items)if(it.cd>0)it.cd-=dt;
      if(this.enemies.some(e=>!e.dead&&e.x-h.x<36))this.procs(h,'near');
      // signature ability
      const SG=ABILITIES_OFF?null:SIG[h.key];if(SG){h.sigT=(h.sigT==null?SG.cd*.5:h.sigT)-dt;if(h.sigT<=0){const ok=SG.fn(this,h,h.atk*h.pow);h.sigT=ok?SG.cd*(1-h.cdr):.6;if(ok){this.procs(h,'oncast');}}}
      // spells
      for(const s of h.spells){if(SPELL[s.arch].passive)continue;s.cdT-=dt;if(s.cdT<=0){const ok=this.cast(h,s);s.cdT=ok?SPELL[s.arch].cd*(1-h.cdr):.5;}}
      // basic attack
      const rate=dt*h.aspd*(h.buffT>0?1.3:1);const st=h.style;
      const findT=(kind)=>{const melee=kind==='melee';const ox=melee?f.x:h.x;const range=melee?st.reach*UNIT_SCALE+3:(st.range||170);
        const L=this.enemies.filter(e=>!e.dead&&(melee?(e.boss?e.x-e.w-h.x<=range&&e.x>h.x:Math.abs(e.x-h.x)<=range):(Math.abs(e.x-h.x)<=range))).sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x));
        const P=h.plan&&h.plan.tgt;if(P&&!P.dead&&L.includes(P)&&(!melee||P.boss||P.fly||P.gy==null||Math.abs(P.gy-h.gy)<2.5))return P;   // 0.12.2: the brain's pick, if it's in reach
        if(!melee)return L[0];
        // melee only reaches its own lane; if the nearest foe is in another lane, step one lane toward it
        const mine=L.find(e=>e.boss||e.fly||e.gy==null||Math.abs(e.gy-h.gy)<2.5);if(mine)return mine;
        if(!h.plan&&L[0]&&L[0].laneI!=null&&Math.abs(h.gy-LANES[h.laneI])<1)h.laneI+=Math.sign(L[0].laneI-h.laneI);
        return null;};
      if(st.atk==='gunner'||st.atk==='blade'){this.gunner(h,dt,f,findT);}
      else if(st.atk==='duo'){
        // partners fight independently: each has its own swing timer, target and animation
        if(h.animT2>0)h.animT2-=dt;
        h.atkT=Math.min(1,h.atkT+rate);h.atkT2=Math.min(1,(h.atkT2||0)+rate*.93);
        const ta=findT(st.a),tb=findT(st.b);
        const rd=faceToward(h,(ta||tb)?(ta||tb).x:h.x+10,dt);
        if(rd&&ta&&h.atkT>=1){h.atkT=0;h.animT=.32;this.basic(h,ta,st.a,.6*this.powerMul(h));}
        if(rd&&tb&&h.atkT2>=1){h.atkT2=0;h.animT2=.32;this.basic(h,tb,st.b,.6);}
        h.lunge=st.a==='melee'&&ta?f.x-h.x:0;h.lunge2=st.b==='melee'&&tb?f.x-h.x:0;
        if(st.companion)this.companion(h,dt,f);
      }else{
        h.atkT=Math.min(1.6,h.atkT+rate);const kind=st.atk==='melee'?'melee':'ranged';const tgt=findT(kind);
        const rd=faceToward(h,tgt?tgt.x:h.x+10,dt);
        h.lunge=kind==='melee'&&tgt?(h.face>0?f.x-h.x:Math.max(-10,tgt.x-h.x+8)):0;
        const plant=kind!=='melee'&&h.moving&&trait(h,'exec')>.5&&h.atkT<1.6;   // optimal shooters plant their feet before firing
        if(rd&&tgt&&h.atkT>=1&&!plant){h.atkT=0;h.anim=1;h.animT=.32;this.basic(h,tgt,undefined,this.powerMul(h));}
        if(h.atkT>1&&!h.moving)h.atkT=1;}
    }
    this.stepZones(dt);
    for(const l of this.loot){l.t+=dt;l.x-=scroll*dt;if(l.x<=f.x+14||this.over){l.got=1;if(l.kind==='gold'){const bb=upgT(this.run,'board');const a=Math.round(l.amt*(1+[0,.25,.5,.75][bb]));this.stageGold+=a;this.text(l.x,this.G-30,'+'+a,'#ffd23f');}else if(l.kind==='food'||l.kind==='water'){if(l.kind==='food')this.stageFood=(this.stageFood||0)+1;else this.stageWater=(this.stageWater||0)+1;this.text(l.x,this.G-30,'+1 '+l.kind.toUpperCase(),l.kind==='food'?'#e8b060':'#7fd0ff');}else if(l.kind==='parts'){this.stageParts=(this.stageParts||0)+l.amt;this.text(l.x,this.G-30,'+'+l.amt+' PARTS','#c8d0d8');}else{this.stageItems.push(l.item);this.ev('itemdrop',{item:l.item});}}}
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
      if(!e.boss)regenEnergy(e,dt);e.walkT+=dt;if(e.hitFlash>0)e.hitFlash-=dt;if(e.animT>0)e.animT-=dt;if(e.shred>0)e.shred-=dt;
      if(e.burnT>0){e.burnT-=dt;e.hp-=e.burn*dt;if(e.hp<=0){this.kill(e,null);continue;}}
      if(e.poisonT>0){e.poisonT-=dt;e.poisonTick=(e.poisonTick||0)+dt;
        if(e.poisonTick>=POISON.tick){e.poisonTick-=POISON.tick;const d=e.max*POISON.pct*e.poison;e.hp-=d;this.text(e.x+4,e.y-38,Math.round(d),'#7dff6a');if(e.hp<=0){this.kill(e,null);continue;}}
        if(e.poisonT<=0){e.poison=0;e.poisonTick=0;}}
      if(e.bleedT>0){e.bleedT-=dt;e.hp-=e.bleedDps*dt;if(e.hp<=0){this.kill(e,null);continue;}}   // nail bleed from Trip Bomb (ignores armor)
      if(e.slowT>0){e.slowT-=dt;if(e.slowT<=0)e.slow=0;}
      if(e.kbv>0){e.x+=(e.kbDir||1)*e.kbv*dt;e.kbv=Math.max(0,e.kbv-e.kbv*8*dt-4*dt);}
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
        const mx=al.reduce((s,h)=>s+this.heroX(h),0)/Math.max(1,al.length);const back=al.filter(h=>this.heroX(h)<=mx);   // 'back line' = whoever is standing further back right now
        if(e.E.flank&&back.length&&!e.noFlank){
          // fast monsters try to slip past the front line and go for the ranged heroes
          if(!e.target||!e.target.alive||this.isMeleeHero(e.target))e.target=back[Math.floor(this.rng()*back.length)];
          const tx=this.heroX(e.target)+12;e.x-=scroll*dt;if(e.x>tx)e.x=Math.max(tx,e.x-e.E.spd*1.15*sp*dt);else if(e.x<tx-2)e.x+=e.E.spd*.5*sp*dt;
          if(Math.abs(e.x-tx)<4){e.atkT+=dt;if(e.atkT>=e.E.atk){e.atkT=0;e.anim=1;e.animT=e.E.animAtk||.3;this.hurtHero(e.target,e.dmg,e);if(e.E.leech)e.hp=Math.min(e.max,e.hp+e.dmg*e.E.leech);}}
        }else if(e.E.reach!=null&&!e.fly){
          // ---- lane walker (Kyle's rules): shambles at whoever is closest in its own lane; until it is 50px from the first hero it may
          // randomly drift into another lane; it sticks with the hero in front of it, but on rare occasions switches to someone closer
          if(e.laneI==null){e.laneI=Math.floor(this.rng()*LANES.length);e.gy=LANES[e.laneI];}
          const Rch=ENEMY_BODY+e.E.reach;const firstX=Math.max(...al.map(h=>this.heroX(h)));const far=e.x>firstX+50;
          const inLane=al.filter(h=>h.laneI===e.laneI);
          // 0.12.2 behavior AI: the monster thinks on its own clock (who to chase, which lane, when to pause or back off)
          Brain.tick(e,dt);if(Brain.due(this,e,dt)){const others=this.enemies.filter(o=>o!==e&&!o.dead);const pk=Brain.pickTarget(this,e,al,others,false);
            if(pk&&pk.tgt){e.target=pk.tgt;e.plan={tgt:pk.tgt,why:pk.why,lane:Brain.pickLane(this,e,pk.tgt,false)};}
            const aggr=trait(e,'aggr');if(aggr<.6&&e.hp/e.max<.18+.42*(1-aggr)&&!(e.retreatT>0))e.retreatT=1.5+2*(1-aggr);
            if(far&&trait(e,'pace')<.4&&Math.random()<.2*(1-trait(e,'pace')))e.pauseT=.4+.4*(1-trait(e,'pace'));}
          if(e.retreatT>0)e.retreatT-=dt;
          if(!e.plan&&e.E.backline){const mx2=al.reduce((s,h)=>s+this.heroX(h),0)/Math.max(1,al.length);const rear=al.filter(h=>this.heroX(h)<=mx2);const back=rear.length?rear.reduce((b,h)=>!b||this.heroX(h)<this.heroX(b)?h:b,null):al.reduce((b,h)=>!b||Math.abs(this.heroX(h)-e.x)<Math.abs(this.heroX(b)-e.x)?h:b,null);e.target=back;e.think=99;}
          const nearestIn=L=>L.reduce((b,h)=>!b||Math.abs(this.heroX(h)-e.x)<Math.abs(this.heroX(b)-e.x)?h:b,null);
          if(e.plan&&(!e.target||!e.target.alive)){e.target=nearestIn(inLane)||nearestIn(al);e.thinkT=0;}
          if(!e.plan&&!e.E.backline&&(!e.target||!e.target.alive))e.target=nearestIn(inLane)||nearestIn(al);
          else if(!e.plan&&!e.E.backline&&e.target.laneI!==e.laneI&&inLane.length&&Math.abs(e.gy-LANES[e.laneI])<1)e.target=nearestIn(inLane);
          e.think=(e.think==null?this.rng():e.think)-dt;
          if(!e.plan&&e.think<=0){e.think=1;   // once a second of walking: 10% chance to drift a lane (only while still 50px+ out)
            if(far&&this.rng()<.1){const alt=[e.laneI-1,e.laneI+1].filter(l=>l>=0&&l<LANES.length);e.laneI=alt[Math.floor(this.rng()*alt.length)];const t2=nearestIn(al.filter(h=>h.laneI===e.laneI));if(t2)e.target=t2;}   // random drift
            else if(this.rng()<.02){const c=nearestIn(al);if(c&&c!==e.target)e.target=c;}}   // rare: go after someone closer
          const T=e.target;
          this._ignoreMine=null;const wantL0=e.plan&&e.plan.lane!=null?e.plan.lane:T.laneI;const wantL=this.freeLane(wantL0,e.laneI,e.x-45,e.x+6);const dodgeOb=wantL!==wantL0||!!this.laneBlocked(e.laneI,e.x-45,e.x+6);
          if(dodgeOb||e.plan||e.E.backline||!far||!inLane.length||T.laneI!==e.laneI){if(Math.abs(e.gy-LANES[e.laneI])<1&&wantL!==e.laneI)e.laneI+=Math.sign(wantL-e.laneI);}   // head for the chosen lane
          const ty=LANES[e.laneI];e.gy+=Math.sign(ty-e.gy)*Math.min(Math.abs(ty-e.gy),LANE_SPD*dt);e.y=e.gy;
          // queue politely behind a zombie already hitting this hero in this lane
          const front=this.enemies.filter(o=>o!==e&&!o.dead&&o.laneI===e.laneI&&o.x<e.x&&Math.abs(o.gy-e.gy)<3).reduce((b,o)=>!b||o.x>b.x?o:b,null);
          if(e.stackOff==null)e.stackOff=this.rng()*5;
          const stacks=e.E.stack!==false;   // every unit can stack now (a future 'block' ability can turn this off)
          const hx=this.heroX(T);const side=e.x>=hx?1:-1;   // 0.11: which side of its hero it stands on (it can end up behind the heroes)
          let stopX=hx+side*(ENEMY_BODY+e.E.reach*.6+(stacks?e.stackOff:0)+(e.retreatT>0?42:0));if(!stacks&&front&&side>0&&front.x>=stopX-1)stopX=Math.max(stopX,front.x+11);
          const sameLane=Math.abs(e.gy-T.gy)<2;const ready=faceToward(e,hx,dt);const inRange=ready&&sameLane&&Math.abs(e.x-hx)<=Rch+.5;   // must face the hero and touch it
          // ---- leap attack: from about 20px outside its reach, in the target's lane, it bounds in and lands on the hero
          const LP=e.E.leap;e.leapCd=(e.leapCd||0)-dt;
          if(e.leapA){const A2=e.leapA;A2.t+=dt;const u=Math.min(1,A2.t/A2.dur);e.x=A2.x0+(A2.x1-A2.x0)*u-scroll*dt;e.moving=true;
            if(u>=1){e.leapA=null;if(T.alive&&Math.abs(e.gy-T.gy)<3&&Math.abs(e.x-this.heroX(T))<=Rch+2){this.hurtHero(T,LP.dmg*e.dmgMul,e);this.shake=Math.max(this.shake,.25);}e.atkT=e.E.atk*.4;}
            continue;}
          if(LP&&e.leapCd<=0&&sameLane&&ready&&!e.stun){const gap=Math.abs(e.x-hx)-Rch;if(gap>LP.gap*.6&&gap<=LP.gap+4){e.leapA={t:0,dur:LP.dur,x0:e.x,x1:e.x-side*(gap-2)};e.leapCd=LP.cd;e.animT=0;continue;}}
          const x0=e.x;e.x-=scroll*dt;if(!(e.pauseT>0)){if(side>0&&e.x>stopX)e.x=Math.max(stopX,e.x-e.E.spd*sp*dt);else if(side<0&&e.x<stopX)e.x=Math.min(stopX,e.x+e.E.spd*sp*dt);
            else if(e.retreatT>0)e.x+=Math.sign(stopX-e.x)*Math.min(Math.abs(stopX-e.x),e.E.spd*.6*sp*dt);}   // backing offe.moving=Math.abs(e.x-x0)>.05||Math.abs(e.gy-LANES[e.laneI])>.5;
          if(!inRange)e.atkT=Math.min(e.E.atk,e.atkT+dt);
          else{e.atkT+=dt;if(e.atkT>=e.E.atk){e.atkT=0;e.anim=1;e.animT=e.E.animAtk||.3;
            const blow=()=>{if(e.dead||e.stun>0||!T.alive||Math.abs(e.gy-T.gy)>3||Math.abs(e.x-this.heroX(T))>Rch+2)return;/* no swinging at thin air */const d=e.E.dmgDie?(1+Math.floor(this.rng()*e.E.dmgDie))*e.dmgMul:e.dmg;const took=this.hurtHero(T,d,e);
              const B=e.E.bleed;if(B&&took&&T.alive&&this.rng()<B.chance)this.bleed(T,B.dmg*e.dmgMul,B.dur);};
            if(e.E.hitAt)setTimeoutSafe(this,e.E.hitAt,blow);else blow();}}
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
    // ---- Campfire: grows, burns (cozy aura), breaks after 5 hits on Flannel_Man / his companion, then dies out
    if(this.camp){const F=this.camp;F.t+=dt;F.x-=scroll*dt;
      if(F.state==='start'&&F.t>=.9){F.state='burn';}
      if(F.state==='burn'){for(const o of this.alive())if(Math.abs(this.heroX(o)-F.x)<=F.A.radius){o.cozyT=.6;this.healHero(o,o.max*F.A.hp*dt,true,F.owner);o.en=Math.min(o.enMax||100,(o.en||0)+F.A.en2*dt);}}
      if(F.state==='dying'){F.dT=(F.dT||0)+dt;if(F.dT>=1.2)F.state='dead';}
      if(F.state==='dead'){F.deadT=(F.deadT||0)+dt;if(F.deadT>5)this.camp=null;}
      if(this.camp&&F.x<-30)this.camp=null;}
    // ---- Thorn Waves: thorns burst one after another along the lane; each hits what's on top of it (damage + bleed)
    if(this.thornWaves&&this.thornWaves.length){for(const W of this.thornWaves){W.t+=dt;W.x0-=scroll*dt;const A=W.A,N=Math.floor(A.dist/A.step);
        while(W.n<N&&W.t>=A.dur*W.n/N){const x=W.x0+W.n*A.step;W.n++;this.fx.push({k:'thorn',x:x+(this.rng()*4-2),gy:W.gy+(this.rng()*2-1),v:Math.floor(this.rng()*4),t:0,life:1,raw:1});
          for(const e of this.enemies){if(e.dead||e.fly||W.hit.has(e))continue;if(Math.abs(e.x-x)<=A.step*.75+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-W.gy)<=A.depth)){W.hit.add(e);
            this.hitEnemy(e,(this.rollDice(A.dice)+W.flat)*W.mul,W.src&&W.src.alive?W.src:null,{});if(!e.dead){e.bleedT=A.bleed.dur;e.bleedDps=A.bleed.dmg/A.bleed.dur;if(A.poisonCh&&this.rng()<A.poisonCh)this.addPoison(e,1);}}}}
        if(W.n>=N)W.done=1;}
      this.thornWaves=this.thornWaves.filter(W=>!W.done);}
    // ---- Cyclones: wander sporadically, pull nearby enemies in, and grind down whatever is inside them
    if(this.cyclones&&this.cyclones.length){for(const T of this.cyclones){T.t+=dt;const A=T.A;T.x-=scroll*dt;
        T.wT=(T.wT||0)-dt;if(T.wT<=0){const o=T.src&&T.src.alive?T.src.x:T.x0;T.tx=Math.max(o+(A.near||30),Math.min(Math.min(this.W-14,o+A.dist),T.x+(this.rng()*2-1)*(A.wander||70)));
          T.tgy=Math.max(LANES[0],Math.min(LANES[LANES.length-1],T.gy+(this.rng()*2-1)*7));T.wT=.4+this.rng()*.6;}   // a new random heading every 0.4-1s
        const dx=T.tx-T.x;T.x+=Math.sign(dx)*Math.min(Math.abs(dx),A.spd*dt*(.6+this.rng()*.8));T.gy+=Math.sign(T.tgy-T.gy)*Math.min(Math.abs(T.tgy-T.gy),10*dt);
        T.tick=(T.tick||0)+dt;const ticking=T.tick>=A.every;if(ticking)T.tick-=A.every;
        if(T.t<A.dur)for(const e of this.enemies){if(e.dead||e.fly)continue;const ex=e.x-T.x,ez=(e.gy!=null?e.gy:this.G)-T.gy,d=Math.abs(ex);
          if(!e.boss&&d<=A.pullR&&Math.abs(ez)<=A.depth*2){const k=1-d/A.pullR;e.x-=Math.sign(ex)*A.pull*k*dt*(1-((e.E&&e.E.kbRes)||0));if(e.gy!=null)e.gy-=Math.sign(ez)*Math.min(Math.abs(ez),6*k*dt);}   // slight pull toward the funnel
          if(ticking&&d<=A.inR+(e.boss?e.w:0)&&(e.boss||Math.abs(ez)<=A.depth))this.hitEnemy(e,(this.rollDice(A.dice)+(T.src.flatRanged||0))*T.mul,T.src&&T.src.alive?T.src:null,{nocrit:1});}
        if(T.t>=A.dur+.35)T.done=1;}
      this.cyclones=this.cyclones.filter(T=>!T.done);}
    // ---- Arrow_Rain arrows in the air: drop, then hit whatever they land on and stick in the ground
    if(this.rain&&this.rain.length){for(const R of this.rain){R.t+=dt;R.x-=scroll*dt;if(R.t>=R.T&&!R.landed){R.landed=1;
        for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-R.x)<=R.A.hitR+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-R.gy)<=4))this.hitEnemy(e,R.dmg,R.src&&R.src.alive?R.src:null,{});}
        this.fx.push({k:'stuck',x:R.x,gy:R.gy,t:0,life:2,raw:1});}}
      this.rain=this.rain.filter(R=>!R.landed);}
    // ---- traps (Trip Bomb): arm, wait for a ground enemy to walk into the wire, then blow
    if(this.traps&&this.traps.length){for(const T of this.traps){T.t+=dt;T.x-=scroll*dt;const A=T.A;
        if(T.t<A.arm)continue;if(T.t>A.life||T.x<-20){T.done=1;continue;}
        const hit=this.enemies.find(e=>!e.dead&&!e.fly&&!e.boss&&Math.abs((e.gy!=null?e.gy:this.G)-T.gy)<=A.depth&&e.x<=T.x+14&&e.x>=T.x-6);
        if(hit)this.tripBoom(T);}
      this.traps=this.traps.filter(T=>!T.done);}
    // projectiles
    for(const p of this.proj){p.t+=dt;
      if(p.aimed){
        p.x+=(p.dir||1)*p.spd*dt;const u=Math.min(1.6,Math.abs(p.x-p.x0)/p.dist);const h0=p.h0==null?28:p.h0;
        p.gy=p.gy0+(p.tgy-p.gy0)*u;p.h=h0+(p.aimH-h0)*u+(p.arc||0)*4*u*(1-u);p.y=p.gy-p.h*UNIT_SCALE;   /* lobbed things (kunai, darts) rise then drop onto the target. 0.12.38: this p.y update had been swallowed by a // comment, so shots were DRAWN at their launch height while they actually flew to their aim point */
        if(p.h<=0||p.x>this.W+20||p.x<-20||p.t>4){p.dead=true;if(p.h<=0)this.fx.push({k:'spark',x:p.x,y:p.gy,t:0,c:'#8a6a4a'});continue;}
        {const ob=(this.obst||[]).find(o=>this.obHitsShot(o,p));   /* 0.12.38: each obstacle stops shots by its own traced shape */
         if(ob){p.dead=true;this.fx.push({k:'spark',x:p.x,y:p.gy-p.h*UNIT_SCALE,t:0,c:'#b0a090'});
           if(/^car_/.test(ob.k)&&ob.alarmed==null&&!this.demo){ob.alarmed=this.rng()<.25;if(ob.alarmed)this.carAlarm(ob);}   /* a shot into a wreck: 25% to set its alarm off (once per car) */
           continue;}}
        if(p.foes==='heroes'){   // an enemy's aimed shot: any hero body it passes through takes it
          for(const o of this.alive()){if(p.hit.has(o))continue;const hb=hbOf(o);
            if(Math.abs((o.gy||this.G)-p.gy)<=depthHalf(hb)&&Math.abs(p.x-this.heroX(o))<=hb.w*UNIT_SCALE/2&&p.h>=0&&p.h<=hb.h){p.hit.add(o);this.hurtHero(o,p.dmg*(isHead(o,p.h)?HEADSHOT.mul:1),p.src);
              this.fx.push({k:'spark',x:p.x,y:p.y,t:0,c:PCOL[p.kind]||'#fff'});if(p.pierce>0)p.pierce--;else{p.dead=true;break;}}}
          continue;}
        if(this.hardcore&&p.src&&p.src.key&&Math.abs(p.x-p.x0)>14){let ffHit=false;for(const o of this.alive()){if(o===p.src||p.hit.has(o))continue;const hb=hbOf(o);
            if(Math.abs((o.gy||this.G)-p.gy)<=depthHalf(hb)&&Math.abs(p.x-this.heroX(o))<=hb.w*UNIT_SCALE/2&&p.h>=0&&p.h<=hb.h){p.hit.add(o);this.hurtHero(o,p.dmg,null);this.fx.push({k:'spark',x:p.x,y:p.y,t:0,c:'#ff8080'});
              this.st8(p.src).ff=(this.st8(p.src).ff||0)+1;if(Math.random()<.5)Comms.bubble(this,o,Comms.pick(['Watch it!','Friendly fire!','I\'m on YOUR side!','Ow! Hey!']),true);if(p.pierce>0)p.pierce--;else{p.dead=true;ffHit=true;break;}}}
          if(ffHit)continue;}   /* 0.12.52 Hardcore: shots hit whoever is in the way, allies included */
        for(const e of this.enemies){if(e.dead||p.hit.has(e))continue;
          let ok;
          if(e.boss)ok=Math.abs(p.x-(e.x-e.w*.4))<e.w*.6&&p.h<220;
          else if(e.fly){const hb=HITBOX[e.type]||{w:16,h:16};const fh=(this.G-e.y)/UNIT_SCALE;ok=Math.abs(p.x-e.x)<=hb.w*UNIT_SCALE/2&&Math.abs(p.h-fh)<=hb.h/2;}   // fliers: any lane, height window around the body
          else{const hb=HITBOX[e.type]||{w:16,h:44};const hbT=(e.type==='werewolf'&&aimPose(e)===AIM_BOXES.werewolf.tall)?{w:hb.w,h:66}:hb;const lift=e.leapA?Math.sin(Math.PI*Math.min(1,e.leapA.t/e.leapA.dur))*28:0;const sc=(e.E.scale||1)*(e.elite?1.1:1);
            ok=Math.abs((e.gy!=null?e.gy:this.G)-p.gy)<=depthHalf(hb)*sc&&Math.abs(p.x-e.x)<=hb.w*sc*UNIT_SCALE/2&&p.h>=lift&&p.h<=lift+hbT.h*sc;if(ok)p.headNow=isHead(e,p.h-lift);}
          if(!ok)continue;
          p.hit.add(e);const big=BIGP[p.kind]||0;p.opt.onHit?p.opt.onHit(e,p.dmg,0):this.hitEnemy(e,p.dmg,p.src,{kb:big,critAdd:p.critAdd,critMul:p.critMul,head:!!p.headNow&&!e.fly&&!e.boss,sure:p.sure});p.headNow=false;
          if(p.poison&&!e.dead){let n=1;for(const ch of p.poison)if(this.rng()<ch)n++;this.addPoison(e,n);}
          if(p.stunCh&&!e.dead&&this.rng()<p.stunCh){e.stun=Math.max(e.stun||0,p.stunT*(e.boss?.3:1));this.text(e.x,e.y-(e.fly?20:48),'STUNNED','#ffffff');}
          this.fx.push({k:'spark',x:p.x,y:p.y,t:0,c:PCOL[p.kind]||'#fff'});
          if(p.pierce>0)p.pierce--;else{p.dead=true;break;}}
        continue;}
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
    // 0.12.14 (Kyle): nothing lying on the ground slides along with the party: bodies, stuck arrows, thorns, scorch marks scroll with the ground
    this.stepRevive(dt);this.stepHerbs(dt,scroll);this.stepDisarm(dt);
    for(const h of this.alive())this.obClamp(h,true);for(const e of this.enemies)if(!e.dead)this.obClamp(e,false);
    for(const x of this.fx){x.t+=dt;if(scroll&&GROUND_FX.has(x.k))x.x-=scroll*dt;}this.fx=this.fx.filter(x=>x.t<(x.life||.6));
    if(scroll)for(const h of this.heroes.concat(this.pets||[]))if(!h.alive&&h.x!=null)h.x-=scroll*dt;   // fallen heroes stay where they fell
    for(const x of this.texts){x.t+=dt;x.y-=dt*14;}this.texts=this.texts.filter(x=>x.t<.9);
    if(this.shake>0)this.shake-=dt;
  }
  // ---- 0.12.3 gunner (Flannel_Man): one body with a melee weapon and a gun on their own timers.
  //   Melee when something is in reach (crowbar), otherwise shoot. Each shot uses a round; with an empty clip he reloads.
  //   Shooting on the move costs accuracy (flat walkPenalty, never below 1) and plays the walking-fire animation.
  gunner(h,dt,f,findT){const AB_x=(C,id)=>(C.abilities||[]).find(a=>a.id===id);const C=h.base.char;const st=h.style;
    if(h.shoutT>0)h.shoutT-=dt;const cry=h.shoutT>0?h.shoutB:null;if(h.mom&&this.t-(h.momT||0)>2)h.mom=0;if(h.cloneT>0)h.cloneT-=dt;
    const spdB=(cry?1+cry.spd:1)*(h.rageT>0?1.2:1)*(1+(h.mom||0)*(h.momPer||0));h.cryDmg=(cry?1+cry.dmg:1)*(h.pactT>0?1+(h.pactDmg||.2):1);if(h.pactT>0)h.pactT-=dt;
    h.mT=(h.mT||0)+dt*h.meleeSpd*spdB;h.rT=(h.rT||0)+dt*h.rangedSpd*spdB;if(h.animM>0)h.animM-=dt;if(h.animR>0)h.animR-=dt;
    if(h.ammo==null)h.ammo=C.ranged?(C.ranged.clip||Infinity):0;   // clip 0 = never reloads
    if(C.ranged&&h.ammo<=0&&C.ranged.clip>0){if(!h.reloadT&&C.ranged.reload>=1.5)Comms.onReload(this,h);h.reloadT=(h.reloadT||0)+dt*h.rangedSpd*spdB;if(h.reloadT>=C.ranged.reload){h.reloadT=0;h.ammo=C.ranged.clip;}}
    const reachPx=ENEMY_BODY+C.melee.reach*UNIT_SCALE;   // same body gap the zombies measure from, so a 20 reach out-reaches a 12 reach zombie
    if(h.gat){this.robotGat(h,dt,C);return;}
    const mt=this.enemies.filter(e=>!e.dead&&!e.fly&&(e.boss?e.x-e.w-h.x<=reachPx&&e.x>h.x-4:Math.abs(e.x-this.heroX(h))<=reachPx&&(e.gy==null||Math.abs(e.gy-h.gy)<2.5))).sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0];
    // ---- Wave Dash in progress: slide forward along the lane, cutting everything in the line once
    if(h.dash){const D=h.dash;D.t+=dt;const k=Math.min(1,D.t/D.T);const nx=D.x0+(D.x1-D.x0)*(1-(1-k)*(1-k));const px=h.x;h.x=nx;h.pauseT=Math.max(h.pauseT||0,.05);
      D.trail.push(nx);if(D.trail.length>7)D.trail.shift();
      for(const e of this.enemies){if(e.dead||e.fly||D.hit.has(e))continue;const dz=Math.abs((e.gy!=null?e.gy:this.G)-h.gy);
        if(dz<=D.A.depth&&e.x>=px+6&&e.x<=nx+25){/* hit zone = the wave's front crescent, sweeping along with him */D.hit.add(e);const dd=this.hitEnemy(e,D.dmg,h,{});
          if(dd&&!e.dead){e.kbv=Math.max(e.kbv||0,D.A.kb/100*40*8*(1-((e.E&&e.E.kbRes)||0)));e.kbDir=1;}this.fx.push({k:'slash',x:e.x-6,y:e.y-24,t:0});}}
      if(k>=1)h.dash=null;return;}
    const DA=(C.abilities||[]).find(a=>a.id==='dash'),SA=(C.abilities||[]).find(a=>a.id==='shout');
    if(DA){if(h.daT==null)h.daT=DA.cd*.3;if(h.daT>0)h.daT-=dt;}if(SA){if(h.shT==null)h.shT=0;if(h.shT>0)h.shT-=dt;}
    // IF War Cry is ready AND a fight is close AND I'm not already fired up THEN shout
    if(SA&&h.shT<=0&&!(h.shoutT>.5)&&(h.en||0)>=SA.en&&this.enemies.some(e=>!e.dead&&Math.abs(e.x-h.x)<150)&&spendEnergy(h,SA.en)){
      h.shT=SA.cd*(1-(h.cdr||0));for(const o of this.alive())if(Math.abs(this.heroX(o)-this.heroX(h))<=SA.range){o.shoutT=SA.dur;o.shoutB={dmg:SA.dmg,spd:SA.spd};o.buffT=Math.max(o.buffT||0,SA.dur);}
      this.fx.push({k:'ring',x:h.x,y:this.G-14,r:46,t:0,c:'#ffd23f'});this.ev('shout',{});}
    // IF Wave Dash is ready AND an enemy is in my lane a short way ahead (not in my face) THEN dash through the line
    if(DA&&h.daT<=0&&(h.en||0)>=DA.en*(1+.3*trait(h,'energy')-.15)){
      const inPath=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=DA.depth&&e.x-h.x>14&&e.x-h.x<Math.min(DA.dist,this.W-h.x));
      // IF at least 2 enemies are in the wave's path (or 1 if it's the last one around) THEN ride the wave through them
      if((inPath.length>=DA.minHits||(inPath.length&&this.enemies.filter(e=>!e.dead).length===1))&&spendEnergy(h,DA.en)){h.daT=DA.cd*(1-(h.cdr||0));h.face=1;
        const dmg=(this.rollDice(C.melee.dice)+(C.melee.flat||0)+(h.flatMelee||0))*(C.melee.dmgMul||1)*DA.dmgMul*(h.atk/h.base.atk)*h.meleeDmg*(h.cryDmg||1);
        h.dash={t:0,T:DA.dur,x0:h.x,x1:Math.min(this.W-12,h.x+DA.dist),hit:new Set(),dmg,A:DA,trail:[]};this.ev('dash',{});return;}}
    const tgt=mt||(C.ranged?(this.isMeleeHero(h)?(findT('melee'),findT('ranged')):findT('ranged')):(findT('melee'),null));const rd=faceToward(h,tgt?tgt.x:h.x+10,dt);if(!rd||!tgt)return;
    if(mt){if(h.mT>=C.melee.every){h.mT=0;h.combo=(h.combo||0)+1;h.swingAnim=!C.combo?null:(h.moving?'runatk':(h.combo%2?'attack1':'attack2'));h.animM=h.swingAnim==='attack2'?.36:.45;h.animT=0;const roll=(this.rollDice(C.melee.dice)+(C.melee.flat||0)+(h.flatMelee||0))*(C.melee.dmgMul||1)*(h.atk/h.base.atk)*h.meleeDmg*(h.cryDmg||1);
        if(C.melee.arc)this.fx.push({k:'arc',x:h.x,gy:h.gy||this.G,dir:mt.x>=h.x?1:-1,t:0,life:.3,raw:1,big:h.surgeT>0});
        if(C.melee.claw)this.fx.push({k:'claw',x:h.x+(mt.x>=h.x?6:-6),gy:h.gy||this.G,tx:mt.x,dir:mt.x>=h.x?1:-1,t:0,life:.42,raw:1});
        setTimeoutSafe(this,C.melee.hitAt||.15,()=>{if(!h.alive||mt.dead)return;   // the blow lands a moment into the swing (Kyle: very slight delay)
        const K=Math.min(100,C.melee.kb+(h.kbAdd||0));const dealt=this.hitEnemy(mt,roll,h,{});
        {const MO=(C.abilities||[]).find(a=>a.id==='momentum');if(MO){h.mom=this.t-(h.momT||0)<=MO.window?Math.min(MO.max,(h.mom||0)+1):1;h.momT=this.t;h.momPer=MO.per;}}   // Momentum
        if(h.cloneT>0&&!mt.dead){this.hitEnemy(mt,roll*(h.cloneMirror||.4),h,{nocrit:1});this.fx.push({k:'slash',x:mt.x-2,y:mt.y-20,t:0});}   // the clone mirrors the hit   // knockback, Kyle's scale: 0-100, 100 = about a 40px shove
        if(dealt&&!mt.dead&&K>0){const res=mt.boss?.9:((mt.E&&mt.E.kbRes)||0);mt.kbv=Math.max(mt.kbv||0,K/100*40*8*(1-res));mt.kbDir=mt.x>=h.x?1:-1;}   
        if(h.surgeT>0&&!mt.dead)this.arcChain(h,mt);
        if(!C.melee.claw&&!C.melee.arc)this.fx.push({k:'slash',x:mt.x-6,y:mt.boss?mt.y-50:mt.y-24,t:0});});}return;}
    const AB=(C.abilities||[]).find(a=>a.id==='aimed');h.sigT=Math.max(0,(h.abT==null?(h.abT=AB?AB.cd*.4:0):h.abT));if(AB&&h.abT>0)h.abT-=dt;
    // ---- Set_Camp (Flannel_Man)
    const GR=(C.abilities||[]).find(a=>a.id==='grit');if(GR){if(h.grT==null)h.grT=GR.cd*.2;if(h.grT>0)h.grT-=dt;if(h.gritT>0)h.gritT-=dt;
      const close=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<45).length,hf=h.hp/h.max,onMe=(this.bb&&this.bb.heat.get(h))||0;
      if(h.grT<=0&&!(h.gritT>0)&&!h.camping&&(h.en||0)>=GR.en&&((hf<GR.under&&(close>=1||onMe>=1))||close>=3)&&spendEnergy(h,GR.en)){
        h.grT=GR.cd*(1-(h.cdr||0));h.gritT=GR.dur;h.gritDR=GR.dr;addMood(h,{range:6,aggr:3},GR.dur,'grit');h.thinkT=0;
        this.fx.push({k:'ring',x:h.x,y:this.G-14,r:30,t:0,c:'#e0b060'});this.ev('shout',{});Comms.say(this,h,'tank',{ally:h},trait(h,'talk')>.2);}}
    const CA=(C.abilities||[]).find(a=>a.id==='camp');if(CA){if(h.caT==null)h.caT=CA.cd*.1;if(h.caT>0)h.caT-=dt;
      if(h.camping){h.camping-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.camping<=0){h.camping=0;
          this.camp={x:h.x+(h.face<0?-11:11),gy:h.gy,life:CA.life,t:0,A:CA,owner:h,state:'start'};Comms.onCamp(this,h,this.camp.x);this.ev('camp',{});}
        return;}
      // IF there's no fire going AND nothing is right on top of us AND Set_Camp is ready THEN kneel and light one
      const close=this.enemies.some(e=>!e.dead&&Math.abs(e.x-h.x)<70);
      if(h.caT<=0&&!mt&&!close&&!(this.camp&&this.camp.state!=='dead')&&(h.en||0)>=CA.en&&spendEnergy(h,CA.en)){h.caT=CA.cd*(1-(h.cdr||0));h.camping=CA.cast;h.campT0=CA.cast;return;}}
    // ---- Call Companion (Flannel_Man)
    const PB=(C.abilities||[]).find(a=>a.id==='pal');if(PB){if(h.palT==null)h.palT=PB.cd*.15;if(h.palT>0)h.palT-=dt;}
    if(h.calling){const S=h.calling;if(mt){h.calling=null;this.text(h.x,this.G-70,'interrupted','#9aa');}
      else{S.t+=dt;h.pauseT=Math.max(h.pauseT||0,.1);if(S.t>=S.T){h.calling=null;if(spendEnergy(h,PB.en)){h.palT=PB.cd*(1-(h.cdr||0));this.callPal(h,PB);}}return;}}
    if(PB&&!h.cast&&!h.setting&&!mt&&h.palT<=0&&(h.en||0)>=PB.en){const pal=(this.pets||[]).find(p=>p.owner===h&&p.alive);
      // IF she isn't out AND there's a fight THEN call her; IF she's out but hurt THEN patch her up
      if((!pal&&this.enemies.some(e=>!e.dead))||(pal&&pal.hp<pal.max*.93)){h.calling={t:0,T:PB.cast};return;}}
    // ---- Brick Throw (the companion): never misses, always hurts, usually stuns
    const BB=(C.abilities||[]).find(a=>a.id==='brick');if(BB){if(h.brT==null)h.brT=BB.cd*.3;if(h.brT>0)h.brT-=dt;
      if(h.brT<=0&&!mt&&tgt&&Math.abs(tgt.x-h.x)<=BB.range&&(h.en||0)>=BB.en*(1+.3*trait(h,'energy')-.15)&&spendEnergy(h,BB.en)){h.brT=BB.cd*(1-(h.cdr||0));h.animM=.45;
        const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(C.ranged.dmgMul||1)*BB.dmgMul*(h.atk/h.base.atk)*h.rangedDmg;
        h._forceBox='bot';const p=this.shoot(h,tgt,'brick',dmg,{});p.sure=1;p.stunCh=BB.stunCh;p.stunT=BB.stunT;p.spd=170;this.aim(p,h,tgt);h._forceBox=null;return;}}
    // ---- Trip Bomb
    const TB=(C.abilities||[]).find(a=>a.id==='trip');if(TB){if(h.tbT==null)h.tbT=TB.cd*.25;if(h.tbT>0)h.tbT-=dt;}
    if(h.setting){const S=h.setting;if(mt){h.setting=null;this.text(h.x,this.G-70,'interrupted','#9aa');}
      else{S.t+=dt;h.pauseT=Math.max(h.pauseT||0,.1);
        if(S.t>=S.T){h.setting=null;if(spendEnergy(h,TB.en)){h.tbT=TB.cd*(1-(h.cdr||0));const foe=S.near;
          const x=Math.max(h.x+16,Math.min(h.x+46,foe&&!foe.dead?foe.x-16:h.x+34));
          (this.traps=this.traps||[]).push({x,gy:h.gy!=null?h.gy:this.G,t:0,A:TB,owner:h});Comms.onTrap(this,h,x);}}
        return;}}
    // IF Trip Bomb is ready AND no trap is out AND an enemy is coming (in front, not in my face yet) AND enough energy THEN set one
    if(TB&&!h.cast&&!mt&&h.tbT<=0&&!(this.traps||[]).some(t=>t.owner===h)&&(h.en||0)>=TB.en*(1+.3*trait(h,'energy')-.15)){
      const near=this.enemies.filter(e=>!e.dead&&!e.fly&&!e.boss&&e.x>h.x+40&&e.x<h.x+190).sort((p,q)=>p.x-q.x)[0];
      if(near){h.setting={t:0,T:TB.cast,near};return;}}
    // Aimed Shot has a 2s cast: he stands still with a laser on the target, then fires. A foe in crowbar reach breaks the cast
    //   (no energy spent, the cooldown doesn't start). If the target dies mid-cast he swings the laser to the next one in range.
    if(h.cast){const K=h.cast;
      if(mt){h.cast=null;this.text(h.x,this.G-70,'interrupted','#9aa');}
      else{if(!K.tgt||K.tgt.dead){K.tgt=findT('ranged');if(!K.tgt){h.cast=null;return;}}
        K.t+=dt;h.pauseT=Math.max(h.pauseT||0,.1);
        if(K.t>=K.T){h.cast=null;if(!spendEnergy(h,AB.en))return;
          h.abT=AB.cd*(1-(h.cdr||0));h.rT=0;h.ammo-=1;h.animR=.5;h.firedMoving=false;this.ev('gun',{big:1});this.shake=Math.max(this.shake||0,.2);
          const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(h.atk/h.base.atk)*h.rangedDmg;
          h._forceBox=AB.box;const p=this.shoot(h,K.tgt,st.proj,dmg,{pierce:AB.pierce||0});p.critAdd=AB.critAdd;p.critMul=AB.critMul;this.aim(p,h,K.tgt);h._forceBox=null;}
        return;}}
    // IF Aimed Shot is ready AND loaded AND standing still AND enough energy (Preserve-minded units keep a cushion) THEN start the cast
    if(AB&&!mt&&h.abT<=0&&h.ammo>0&&!h.moving&&h.rT>=.5&&(h.en||0)>=AB.en*(1+.4*trait(h,'energy')-.2)){h.cast={t:0,T:AB.cast||2,tgt};return;}
    const RA=(C.abilities||[]).find(a=>a.id==='rapid');if(RA){if(h.raT==null)h.raT=RA.cd*.3;if(h.raT>0)h.raT-=dt;
      // IF One Nocked, Two in Hand is ready AND an enemy is in bow range AND I'm not already rapid-firing THEN nock up
      if(h.raT<=0&&!h.volley3&&!mt&&tgt&&Math.abs(tgt.x-h.x)<=C.ranged.range&&(h.en||0)>=RA.en*(1+.3*trait(h,'energy')-.15)&&spendEnergy(h,RA.en)){
        h.raT=RA.cd*(1-(h.cdr||0));h.volley3={left:RA.shots,t:0,tgt};this.ev('shout',{});}}
    // 0.12.23 (Kyle): One Nocked, Two in Hand = 3 real basic shots rapid-fired inside 1.5s (one every 0.5s), then back to normal
    if(h.volley3&&RA){const V=h.volley3;V.t-=dt;h.pauseT=Math.max(h.pauseT||0,.05);
      if(V.t<=0&&V.left>0){V.left--;V.t=1.5/RA.shots;h.rT=0;h.animR=.42;h.animRT=.42;h.firedMoving=false;
        const inR=this.liveE().filter(e=>Math.abs(e.x-h.x)<=C.ranged.range);const pk=inR.length?Brain.pickTarget(this,h,inR,this.alive(),true):null;const tg0=pk&&pk.tgt;   /* each shot is its own choice through the behavior system: same target or a different one */
        if(tg0){faceToward(h,tg0.x,1);const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(C.ranged.dmgMul||1)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
          setTimeoutSafe(this,.2,()=>{if(!h.alive)return;const tg=tg0.dead?this.liveE().sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0]:tg0;if(!tg)return;this.ev('bow',{});
            const WR=(C.abilities||[]).find(a=>a.id==='wind');const far=WR&&Math.abs(tg.x-h.x)>WR.far;h._accBonus=(far?WR.acc:0)-(RA.accPen||0);   /* rushed shots: slightly less accurate */
            const p=this.shoot(h,tg,st.proj,dmg,{});this.aim(p,h,tg);h._accBonus=0;if(far)p.critMul=(h.critMul||1.75)+WR.critMul;});}}
      if(V.left<=0&&V.t<=0)h.volley3=null;
      return;}
    // ---- Poultice (Chibi_Warrior): self heal over time when he's hurt
    const CL=AB_x(C,'clone');if(CL){if(h.clT==null)h.clT=CL.cd*.3;if(h.clT>0)h.clT-=dt;
      const close=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<50).length,onMe=(this.bb&&this.bb.heat.get(h))||0;
      if(h.clT<=0&&!(h.cloneT>0)&&(close>=2||(h.hp/h.max<.6&&onMe>=1))&&(h.en||0)>=CL.en&&spendEnergy(h,CL.en)){h.clT=CL.cd*(1-(h.cdr||0));h.cloneT=CL.dur;h.cloneMirror=CL.mirror;h.cloneDecoy=CL.decoy;
        this.fx.push({k:'poof',x:h.x-(h.face||1)*10,y:this.G-20,t:0});this.ev('whoosh',{});Comms.say(this,h,'clone',{});}}
    const PO=AB_x(C,'poultice');if(PO){if(h.poT==null)h.poT=PO.cd*.2;if(h.poT>0)h.poT-=dt;
      if(h.poT<=0&&h.hp/h.max<PO.under&&!(h.hotT>0)&&(h.en||0)>=PO.en&&spendEnergy(h,PO.en)){h.poT=PO.cd*(1-(h.cdr||0));h.hotT=PO.dur;h.hotTick=0;h.hotSrc=h;h.hotAmt=h.max*PO.pct;h.hotEvery=PO.tick;h.poulticeT=PO.dur;
        this.ev('heal',{});}}
    if(h.poulticeT>0)h.poulticeT-=dt;
    // ---- Lumber_Jack abilities
    const WH=AB_x(C,'whirl'),CP=AB_x(C,'chop'),LP=AB_x(C,'leap'),RG=AB_x(C,'rage'),RL=AB_x(C,'roll');
    if(WH||CP||LP||RG||RL){for(const [A,k] of [[WH,'whT'],[CP,'cpT'],[LP,'lpT'],[RG,'rgT'],[RL,'rlT']])if(A){if(h[k]==null)h[k]=A.cd*.25;if(h[k]>0)h[k]-=dt;}
      if(h.rageT>0)h.rageT-=dt;
      const mul=(h.atk/h.base.atk)*h.meleeDmg*(h.cryDmg||1)*(h.rageT>0?1+RG.dmg:1);const flat=(C.melee.flat||0)+(h.flatMelee||0);
      // in-progress moves
      if(h.whirl){const W=h.whirl;W.t+=dt;W.tick+=dt;
        const inReach=this.enemies.some(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<=WH.r+(e.boss?e.w:0));W.idle=inReach?0:(W.idle||0)+dt;
        if((h.plan&&h.plan.intent==='retreat'&&h.hp/h.max<.3)||W.idle>1.5){h.whirl=null;return;}   /* breaks off early */
        if(W.tick>=WH.every){W.tick-=WH.every;this.disturb(h.x,h.gy||this.G,WH.r);for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-h.x)<=WH.r+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=WH.depth)){this.hitEnemy(e,(this.rollDice(WH.dice)+flat)*mul,h,{kb:.6});if(!e.dead&&WH.bleed){e.bleedT=WH.bleed.dur;e.bleedDps=WH.bleed.dmg/WH.bleed.dur;}}}this.ev('whoosh',{});}
        if(W.t>=WH.dur)h.whirl=null;return;}
      if(h.leap){const P=h.leap;P.t+=dt;const k=Math.min(1,P.t/LP.dur);h.x=P.x0+(P.x1-P.x0)*k;h.leapH=Math.sin(Math.PI*k)*22;h.pauseT=Math.max(h.pauseT||0,.05);
        if(k>=1){h.leap=null;h.leapH=0;this.shake=Math.max(this.shake||0,.35);this.fx.push({k:'ring',x:h.x,y:this.G-4,r:LP.r*1.6,t:0,c:'#c8a060'});this.ev('thorns',{});
          for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-h.x)<=LP.r+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=8))this.hitEnemy(e,(this.rollDice(LP.dice)+flat)*mul,h,{kb:1});}}
        return;}
      if(h.rolling){const R=h.rolling;R.t+=dt;const k=Math.min(1,R.t/RL.dur);h.x=R.x0+(R.x1-R.x0)*k;h.pauseT=Math.max(h.pauseT||0,.05);if(k>=1)h.rolling=null;return;}
      if(h.chopping){h.chopping-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.chopping<=0){h.chopping=0;const x0=h.x+(h.face<0?-CP.dist:0),x1=x0+CP.dist;this.shake=Math.max(this.shake||0,.3);this.ev('thorns',{});
          this.fx.push({k:'quake',x:h.x+(h.face<0?-CP.dist/2:CP.dist/2),gy:h.gy,w:CP.dist,t:0,life:.5,raw:1});
          for(const e of this.enemies){if(e.dead||e.fly)continue;if(e.x>=x0-4&&e.x<=x1+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=CP.depth)){const d=this.hitEnemy(e,(this.rollDice(CP.dice)+flat)*mul,h,{});
            if(d&&!e.dead){e.stun=Math.max(e.stun||0,CP.stun*(e.boss?.3:1));const res=e.boss?.9:((e.E&&e.E.kbRes)||0);e.kbv=Math.max(e.kbv||0,CP.kb/100*40*8*(1-res));e.kbDir=e.x>=h.x?1:-1;}}}}
        return;}
      const en=h.en||0,hp=h.hp/h.max,close=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<=24&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=6);
      // IF hurt AND something is in my face AND Log_Roll is ready THEN roll back out of it (can't be hit while rolling)
      if(RL&&h.rlT<=0&&hp<.4&&close.length&&en>=RL.en&&spendEnergy(h,RL.en)){h.rlT=RL.cd;h.rolling={t:0,x0:h.x,x1:Math.max(8,h.x-(h.face<0?-RL.dist:RL.dist))};h.invulnT=RL.dur;return;}
      // IF under half health AND Timber_Rage is ready THEN get angry
      if(RG&&h.rgT<=0&&hp<RG.under&&en>=RG.en&&this.enemies.some(e=>!e.dead&&Math.abs(e.x-h.x)<120)&&spendEnergy(h,RG.en)){h.rgT=RG.cd;h.rageT=RG.dur;h.rageAnim=.7;this.ev('shout',{});}
      // IF 2+ enemies are around me AND Whirl_Wind is ready THEN spin
      if(WH&&h.whT<=0&&close.length>=2&&en>=WH.en&&spendEnergy(h,WH.en)){h.whT=WH.cd;h.whirl={t:0,tick:WH.every*.7};this.ev('whoosh',{});return;}
      // IF an enemy is in my lane a little ahead (inside the shockwave) AND Ground_Chop is ready THEN chop
      const ahead=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x-h.x>0&&e.x-h.x<=CP.dist&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=CP.depth);
      if(CP&&h.cpT<=0&&ahead.length&&en>=CP.en&&spendEnergy(h,CP.en)){h.cpT=CP.cd;h.chopping=CP.cast;h.chopT0=CP.cast;h.face=1;return;}
      // IF a big target is 24-60px away (too far to swing, close enough to jump) AND Hatchet_Leap is ready THEN leap onto it
      const lt=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)>=LP.min&&Math.abs(e.x-h.x)<=LP.range).sort((p,q)=>(q.max-p.max))[0];
      if(LP&&h.lpT<=0&&lt&&en>=LP.en&&spendEnergy(h,LP.en)){h.lpT=LP.cd;h.leap={t:0,x0:h.x,x1:lt.x-(lt.x>h.x?10:-10)};faceToward(h,lt.x,1);h.laneI=lt.laneI!=null?lt.laneI:h.laneI;return;}}
    // ---- 0.12.21 Void_Cultist abilities
    {const CB=id=>(C.abilities||[]).find(a=>a.id===id);const TN=CB('tentacle'),PA=CB('pact'),HX=CB('hex'),DR=CB('dread');
     if(TN||PA||HX||DR){for(const [A,k] of [[TN,'tnT'],[PA,'paT'],[HX,'hxT'],[DR,'drT']])if(A){if(h[k]==null)h[k]=A.cd*.25;if(h[k]>0)h[k]-=dt;}
      if(h.summonT>0){h.summonT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);return;}
      const live=this.enemies.filter(e=>!e.dead&&e.x<this.W+4),en=h.en||0,hx=h.x;
      // IF 2+ enemies are within 40px THEN Dread_Chant
      if(DR&&h.drT<=0&&en>=DR.en&&live.filter(e=>Math.abs(e.x-hx)<40).length>=2&&spendEnergy(h,DR.en)){h.drT=DR.cd*(1-(h.cdr||0));h.summonT=DR.cast;h.summonT0=DR.cast;
        setTimeoutSafe(this,DR.cast*.8,()=>{if(!h.alive)return;this.fx.push({k:'dread',x:h.x,gy:h.gy||this.G,t:0,life:.8,raw:1,r:DR.r});this.ev('wind',{});
          for(const e of this.enemies){if(e.dead||e.boss)continue;if(Math.abs(e.x-h.x)<DR.r&&Math.abs((e.gy||this.G)-(h.gy||this.G))<14){e.retreatT=Math.max(e.retreatT||0,DR.dur);e.fearT=DR.dur;}}});
        Comms.say(this,h,'dread',{});return;}
      // IF 2+ enemies are within 150px (or a big one) THEN Call_of_the_Deep near them
      if(TN&&h.tnT<=0&&en>=TN.en){const near=live.filter(e=>!e.fly&&e.x>hx-20&&e.x-hx<=TN.range);if((near.length>=2||near.some(e=>e.boss||e.max>=this.bb.maxE*.8))&&spendEnergy(h,TN.en)){
        h.tnT=TN.cd*(1-(h.cdr||0));h.summonT=TN.cast;h.summonT0=TN.cast;const T=near.sort((p,q)=>p.x-q.x)[0];const tx=Math.min(hx+TN.range,Math.max(hx+18,T.x-14)),gy=T.gy!=null?T.gy:(h.gy||this.G);
        const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
        setTimeoutSafe(this,TN.cast*.7,()=>{if(!h.alive)return;(this.tentacles=this.tentacles||[]).push({x:tx,gy,t:0,life:TN.life,A:TN,src:h,mul,atkT:.6,anim:'emerge',aT:0,face:1,hp:TN.hp,max:TN.hp,swatT:0});this.ev('thorns',{});this.shake=Math.max(this.shake||0,.25);});
        Comms.say(this,h,'tentacle',{});return;}}
      // IF the biggest enemy in range isn't cursed THEN Spreading_Hex
      if(HX&&h.hxT<=0&&en>=HX.en&&!mt){const tg=live.filter(e=>!(e.hexT>0)&&Math.abs(e.x-hx)<=HX.range).sort((p,q)=>q.max-p.max)[0];if(tg&&spendEnergy(h,HX.en)){
        h.hxT=HX.cd*(1-(h.cdr||0));h.animR=HX.cast;h.animRT=HX.cast;faceToward(h,tg.x,1);tg.hexT=HX.dur;tg.hexJ=HX.jumps;tg.hexA=HX;tg.hexSrc=h;tg.hexTick=0;
        this.fx.push({k:'bolt',pts:[[h.x+(h.face||1)*10,(h.gy||this.G)-18],[tg.x,(tg.gy||this.G)-14]],t:0,life:.3,raw:1,c:'v'});return;}}
      // IF an ally is under 50% OR 4+ enemies are up, AND I'm above 55%, THEN Blood_Pact
      if(PA&&h.paT<=0&&en>=PA.en&&h.hp/h.max>PA.min+PA.hpCost&&(this.alive().some(o=>o.hp/o.max<.5)||live.length>=4)&&spendEnergy(h,PA.en)){
        h.paT=PA.cd*(1-(h.cdr||0));h.summonT=PA.cast;h.summonT0=PA.cast;h.hp-=h.max*PA.hpCost;this.text(h.x+4,this.G-52,Math.round(h.max*PA.hpCost),'#c0102a');
        for(const o of this.alive()){o.pactT=PA.dur;o.pactDmg=PA.dmg;}this.fx.push({k:'ring',x:h.x,y:this.G-6,r:26,t:0,c:'#c0102a'});this.ev('heal',{});Comms.say(this,h,'pact',{});return;}}}
    // ---- 0.12.17 Moss_Mech abilities (all IF/THEN on what's on the field; the planner sees the cooldowns through CD_KEY)
    {const RB=id=>(C.abilities||[]).find(a=>a.id===id);const SU=RB('surge'),GA=RB('gatling'),MS=RB('missiles'),SM=RB('smoke');
     if(SU||GA||MS||SM){for(const [A,k] of [[SU,'suT'],[GA,'gaT'],[MS,'msT'],[SM,'smT']])if(A){if(h[k]==null)h[k]=A.cd*.25;if(h[k]>0)h[k]-=dt;}
      if(h.surgeT>0)h.surgeT-=dt;if(h.launchT>0)h.launchT-=dt;if(h.throwT>0)h.throwT-=dt;
      const live=this.enemies.filter(e=>!e.dead&&e.x<this.W+4),en=h.en||0,hx=h.x;
      // IF 2+ enemies are close THEN overcharge the blade
      if(SU&&h.suT<=0&&!(h.surgeT>0)&&live.filter(e=>Math.abs(e.x-hx)<40).length>=2&&en>=SU.en&&spendEnergy(h,SU.en)){h.suT=SU.cd*(1-(h.cdr||0));h.surgeT=SU.dur;this.ev('dash',{});
        this.fx.push({k:'ring',x:hx,y:this.G-14,r:22,t:0,c:'#49c8ff'});}
      // IF a hurt ally has enemies on them (or I'm swarmed) THEN smoke the spot
      if(SM&&h.smT<=0&&en>=SM.en&&!(h.throwT>0)){const al=this.alive();let spot=null,who=null;
        for(const o of al){if(o.hp/o.max>=SM.under)continue;const on=live.filter(e=>Math.abs(e.x-this.heroX(o))<40);if(on.length){spot=(on.reduce((s,e)=>s+e.x,0)/on.length+this.heroX(o))/2;who=o;break;}}
        if(spot==null&&live.filter(e=>Math.abs(e.x-hx)<40).length>=3)spot=hx+10;
        if(spot!=null&&Math.abs(spot-hx)<140&&spendEnergy(h,SM.en)){h.smT=SM.cd*(1-(h.cdr||0));h.throwT=.45;faceToward(h,spot,1);const gy=(who&&who.gy)||h.gy||this.G;
          setTimeoutSafe(this,.25,()=>{if(!h.alive)return;this.ev('whoosh',{});(this.nades=this.nades||[]).push({x0:h.x,x:h.x,x1:spot,gy0:h.gy||this.G,gy,t:0,T:SM.throw,A:SM,src:h});});
          Comms.say(this,h,'smoke',{x:spot,ally:who});return;}}
      // IF 3+ enemies are bunched 40-260px out (or a boss is up) THEN missile barrage on the thickest spot
      if(MS&&h.msT<=0&&en>=MS.en&&!(h.launchT>0)){let best=null,bn=0;for(const e of live){const d=e.x-hx;if(d<MS.min||d>MS.range)continue;const n=live.filter(o=>Math.abs(o.x-e.x)<MS.spread*1.6).length+(e.boss?3:0);if(n>bn){bn=n;best=e;}}
        if(best&&bn>=3&&spendEnergy(h,MS.en)){h.msT=MS.cd*(1-(h.cdr||0));h.launchT=.2+MS.n*MS.gap+.2;const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
          for(let i=0;i<MS.n;i++)setTimeoutSafe(this,.2+i*MS.gap,()=>{if(!h.alive)return;const T=best.dead?(live.find(e=>!e.dead)||best):best;this.ev('whoosh',{});
            (this.missiles=this.missiles||[]).push({x0:h.x+(h.face<0?-3:3),x:h.x,tx:T.x+(this.rng()*2-1)*MS.spread,gy:h.gy||this.G,tgy:Math.max(LANES[0],Math.min(LANES[LANES.length-1],(T.gy||this.G)+(this.rng()*2-1)*6)),t:0,T:MS.fly*(.9+this.rng()*.2),A:MS,src:h,mul,trail:0});});
          Comms.say(this,h,'missiles',{});return;}}
      // IF 3+ enemies are lined up in front AND nothing is in blade reach THEN spin up the gatling
      if(GA&&h.gaT<=0&&!mt&&en>=GA.en){const inGa=live.filter(e=>e.x>hx-6&&e.x-hx<=GA.range);if(inGa.length>=GA.min&&spendEnergy(h,GA.en)){h.gaT=GA.cd*(1-(h.cdr||0));h.gat={t:0,acc:0,A:GA};Comms.say(this,h,'gatling',{});return;}}}}
    // ---- Druid abilities
    const AB_=id=>(C.abilities||[]).find(a=>a.id===id);const MD=AB_('mend'),BL=AB_('bloom'),TH=AB_('thorns'),CY=AB_('cyclone');
    if(MD||BL||TH||CY){for(const [A,k] of [[MD,'mdT'],[BL,'blT'],[TH,'thT'],[CY,'cyT']])if(A){if(h[k]==null)h[k]=A.cd*.2;if(h[k]>0)h[k]-=dt;}
      if(h.casting){h.casting-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.casting<=0)h.casting=0;return;}
      const allies=this.alive();let hurt=allies.slice().sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
      {const O=Comms.ord(h,this,['heal']);if(O&&O.from&&O.from.alive&&O.from.hp/O.from.max<.9)hurt=O.from;}   // IF someone shouted for a heal AND I listened THEN them first
      // IF an ally is low (under 85%) AND Mend is ready THEN heal them now
      if(MD&&h.mdT<=0&&hurt&&hurt.hp/hurt.max<MD.under&&(h.en||0)>=MD.en&&spendEnergy(h,MD.en)){h.mdT=MD.cd*(1-(h.cdr||0));this.healHero(hurt,hurt.max*MD.heal,false,h);
        this.fx.push({k:'mend',x:this.heroX(hurt),gy:hurt.gy||this.G,t:0,life:.9,raw:1});this.ev('heal',{});h.animC=.35;}
      // IF an ally is under 90% AND not already blooming AND Bloom is ready THEN wrap them in a healing vine heart
      const bt=allies.filter(o=>!(o.hotT>0)&&o.hp/o.max<BL.under).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
      if(BL&&h.blT<=0&&bt&&(h.en||0)>=BL.en&&spendEnergy(h,BL.en)){h.blT=BL.cd*(1-(h.cdr||0));bt.hotT=BL.dur;bt.hotTick=0;bt.hotSrc=h;bt.hotAmt=bt.max*BL.pct;bt.hotEvery=BL.tick;bt.hotFx=0;
        this.ev('heal',{});h.animC=.35;}
      // IF 2+ enemies are down my lane (or something big) AND Thorn Wave is ready THEN send thorns rolling along the ground
      if(TH&&h.thT<=0&&!mt&&(h.en||0)>=TH.en){const lane=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x>h.x&&e.x-h.x<=TH.dist&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=TH.depth);
        if((lane.length>=2||lane.some(e=>e.boss))&&spendEnergy(h,TH.en)){h.thT=TH.cd*(1-(h.cdr||0));h.casting=TH.cast;h.castT0=TH.cast;
          setTimeoutSafe(this,TH.cast,()=>{this.ev('thorns',{});(this.thornWaves=this.thornWaves||[]).push({x0:h.x+8,gy:h.gy,t:0,n:0,A:TH,src:h,mul,hit:new Set(),flat:(C.ranged.flat||0)+(h.flatRanged||0)});});return;}}
      // IF Cyclone is ready AND 2+ enemies are down my lane (or something big) THEN send a tornado along it
      if(CY&&h.cyT<=0&&!mt&&(h.en||0)>=CY.en){const lane=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x-h.x>=CY.near-20&&e.x-h.x<=CY.dist&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=CY.depth);   /* 0.12.38 (Kyle): it forms ~450 screen px (150 world) ahead of her, so it wants enemies out there */
        if((lane.length>=2||lane.some(e=>e.boss))&&spendEnergy(h,CY.en)){h.cyT=CY.cd*(1-(h.cdr||0));h.casting=CY.cast;h.castT0=CY.cast;
          setTimeoutSafe(this,CY.cast,()=>{this.ev('wind',{});(this.cyclones=this.cyclones||[]).push({x:Math.min(this.W-14,h.x+CY.ahead),x0:h.x,gy:h.gy,t:0,A:CY,src:h,mul});});return;}}}
    const PN=(C.abilities||[]).find(a=>a.id==='pin');if(PN){if(h.piT==null)h.piT=PN.cd*.3;if(h.piT>0)h.piT-=dt;
      // IF the biggest (or fastest) enemy in range isn't marked yet THEN pin it
      const pt=!mt&&this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<=PN.range&&!(e.markT>0)).sort((p,q)=>((q.max+(q.E&&q.E.spd||0))-(p.max+(p.E&&p.E.spd||0))))[0];
      if(h.piT<=0&&pt&&(h.en||0)>=PN.en&&spendEnergy(h,PN.en)){h.piT=PN.cd*(1-(h.cdr||0));h.animR=PN.anim;h.animRT=PN.anim;faceToward(h,pt.x,1);
        setTimeoutSafe(this,PN.releaseAt,()=>{if(!h.alive)return;const tg=pt.dead?this.enemies.find(e=>!e.dead):pt;if(!tg)return;this.ev('bow',{});
          const dmg=this.rollDice(PN.dice)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
          const p=this.shoot(h,tg,'yarrow',dmg,{onHit:(e,d)=>{this.hitEnemy(e,d,h,{});if(e.dead)return;e.markT=PN.mark;e.markAmp=PN.amp;if(!e.boss){e.slow=Math.max(e.slow||0,.97);e.slowT=Math.max(e.slowT||0,PN.root);e.rootT=PN.root;}
            this.fx.push({k:'stuck',x:e.x,gy:e.gy!=null?e.gy:this.G,t:0,life:PN.root,raw:1});}});p.pin=1;this.aim(p,h,tg);});
        return;}}
    const AR=(C.abilities||[]).find(a=>a.id==='rain');if(AR){if(h.arT==null)h.arT=AR.cd*.25;if(h.arT>0)h.arT-=dt;
      if(h.volley){h.volley-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.volley<=0)h.volley=0;return;}
      // IF Arrow_Rain is ready AND 2+ enemies are bunched up in range THEN rain on the thickest group
      if(h.arT<=0&&!mt&&(h.en||0)>=AR.en){const foes=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<=AR.range);
        let best=null,bn=0;for(const e of foes){const n=foes.filter(o=>Math.abs(o.x-e.x)<=AR.spread&&Math.abs((o.gy||this.G)-(e.gy||this.G))<=AR.lanes).length;if(n>bn){bn=n;best=e;}}
        if(best&&bn>=2&&spendEnergy(h,AR.en)){h.arT=AR.cd*(1-(h.cdr||0));h.volley=AR.cast;h.volleyT0=AR.cast;faceToward(h,best.x,1);
          const cx=best.x,cgy=best.gy!=null?best.gy:this.G,mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
          setTimeoutSafe(this,AR.cast,()=>{this.ev('bow',{});this.rain=this.rain||[];
            for(let i=0;i<AR.count;i++){const at=AR.over*i/AR.count+this.rng()*.08;const gy=Math.max(LANES[0],Math.min(LANES[LANES.length-1],cgy+(this.rng()*2-1)*AR.lanes));
              this.rain.push({x:cx+(this.rng()*2-1)*AR.spread,gy,t:-at,T:AR.fall,dmg:(this.rollDice(AR.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*mul,src:h,A:AR});}});
          return;}}}
    const BG=(C.abilities||[]).find(a=>a.id==='blowgun');if(BG){if(h.bgT==null)h.bgT=BG.cd*.2;if(h.bgT>0)h.bgT-=dt;
      if(h.blowing){h.blowing-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.blowing<=0)h.blowing=0;return;}
      // IF Blow_Gun is ready AND a living (not undead) enemy is in range AND not in my face THEN poison it
      const live=!mt&&this.enemies.filter(e=>!e.dead&&!isUndead(e)&&Math.abs(e.x-h.x)<=BG.range).sort((p,q)=>(q.max-p.max)||(Math.abs(p.x-h.x)-Math.abs(q.x-h.x)))[0];
      if(h.bgT<=0&&live&&(h.en||0)>=BG.en&&spendEnergy(h,BG.en)){h.bgT=BG.cd*(1-(h.cdr||0));h.blowing=BG.anim;h.blowT0=BG.anim;faceToward(h,live.x,1);
        
        setTimeoutSafe(this,BG.releaseAt,()=>{if(!h.alive)return;const tg=live.dead?this.enemies.find(e=>!e.dead&&!isUndead(e)):live;if(!tg)return;this.ev('bow',{});
          const mz=MUZZLE[h.key];MUZZLE[h.key]=[12,12];const p=this.shoot(h,tg,'dart',this.rollDice(BG.dice)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1),{});MUZZLE[h.key]=mz;
          p.poison=BG.extra;this.aim(p,h,tg);});
        return;}}
    const rap=false;
    if(C.ranged&&h.ammo>0&&h.rT>=C.ranged.every*(rap?RA.every:1)){
      if(h.moving&&trait(h,'exec')>.5&&!(h.plan&&h.plan.intent==='retreat')&&(h.plantT=(h.plantT||0)+dt)<.2+1.2*(trait(h,'exec')-.5)*2)return;   // optimal shooters plant their feet first (but not when running away)
      h.plantT=0;h.rT=0;h.ammo-=1;h.animR=rap?RA.anim:(C.ranged.anim||.5);h.animRT=h.animR;h.firedMoving=h.moving;if(!C.ranged.releaseAt)this.ev('gun',{});
      const rel=C.ranged.releaseAt?C.ranged.releaseAt*(h.animR/(C.ranged.anim||.5)):0;if(rap)h.rapid--;
      const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(C.ranged.dmgMul||1)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
      const fire=()=>{if(!h.alive)return;const tg=tgt.dead?this.liveE().sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0]:tgt;if(!tg)return;if(C.ranged.releaseAt)this.ev('bow',{});
        const WR=(C.abilities||[]).find(a=>a.id==='wind');const far=WR&&Math.abs(tg.x-h.x)>WR.far;   // Wind_Reading
        for(let i=0;i<C.ranged.pellets;i++){const acc=h.moving?Math.max(1,h.acc-C.walkPenalty):h.acc;h._accBonus=acc-h.acc+(far?WR.acc:0);
          let T2=tg;if(C.ranged.spread&&i>0){const side=i===1?-1:1;const alt=this.liveE().filter(e=>e!==tg&&Math.abs(e.x-h.x)<=C.ranged.range&&Math.sign((e.gy||this.G)-(tg.gy||this.G))===side).sort((p,q)=>Math.abs(p.x-tg.x)-Math.abs(q.x-tg.x))[0];if(alt&&Math.abs(alt.x-tg.x)<50)T2=alt;}   /* outer pellets go after whoever is up or down a lane from the target */
          const p=this.shoot(h,T2,C.ranged.proj||st.proj,dmg/C.ranged.pellets,{});if(C.ranged.spread&&i>0)h._accBonus-=12;this.aim(p,h,T2);h._accBonus=0;if(far)p.critMul=(h.critMul||1.75)+WR.critMul;
          if(C.ranged.spread&&i>0&&T2===tg){const side=i===1?-1:1;p.tgy+=side*(4+this.rng()*3);p.aimH+=(this.rng()*2-1)*8;}   /* wild outer pellets angle off up and down the lanes */
          else if(C.ranged.spread&&i>0){p.tgy+=(this.rng()*2-1)*2;}}};
      const nb=C.ranged.burst||1;for(let b=0;b<nb;b++){const tt=rel+b*(C.ranged.burstGap||.08);if(tt>0)setTimeoutSafe(this,tt,fire);else fire();}}}
  /* 0.12.44 Guard Dog Kennel: one dog, out from the start of every stage; each Kennel tier makes him a bit tougher and harder-biting */
  spawnDog(t){this.pets=this.pets||[];if(this.pets.some(p=>p.key==='dog'&&p.alive))return;const lv=Math.max(1,Math.round(this.heroes.reduce((s,h)=>s+(h.lvl||1),0)/Math.max(1,this.heroes.length)));
    const key='dog',b=heroBase(key,lv,this.run.team.length);const hm=[1,1.25,1.5][t-1],dm=[1,1.15,1.3][t-1];const h0=this.heroes[0];
    const dg={key,def:{key,name:'Guard_Dog'},style:STYLE[key],lvl:lv,base:b,spells:[],items:[],alive:true,owner:h0,pet:1,dog:1,x:(h0?h0.x:60)-10,gy:(h0&&h0.gy)||LANES[2],laneI:h0&&h0.laneI!=null?h0.laneI:2,
      atkT:0,anim:0,animT:0,walkT:0,shield:0,shieldT:0,buffT:0,lowT:0,nearT:0,hitFlash:0,alt:0,face:1,
      max:b.hp*hm,hp:b.hp*hm,atk:b.atk*dm,aspd:1,crit:b.crit,acc:b.acc+2*(t-1),dr:0,armor:0,cdr:0,dodge:b.dodge+.02*(t-1),luck:0,scoreM:1,pow:1,reach:1,critMul:b.critMul,armorPts:b.armorPts+(t-1),kbRes:b.kbRes,
      enMaxB:100,enRegenB:5,xpBonus:0,lifesteal:0,mvMul:1,meleeDmg:1,rangedDmg:1,meleeSpd:1+.1*(t-1),rangedSpd:1,kbAdd:0,flatRanged:0,flatMelee:0};
    this.pets.push(dg);}
  callPal(h,PB){this.pets=this.pets||[];let pal=this.pets.find(p=>p.owner===h&&p.alive);
    if(pal){const amt=pal.max*PB.heal;pal.hp=Math.min(pal.max,pal.hp+amt);this.text(pal.x,this.G-50,'+'+Math.round(amt),'#7dff9a');return;}
    const key='flannel_pal',b=heroBase(key,h.lvl,this.run.team.length);
    pal={key,def:{key,name:'Traveling_Companion'},style:STYLE[key],lvl:h.lvl,base:b,spells:[],items:[],alive:true,owner:h,pet:1,x:h.x-14,gy:h.gy,laneI:Math.max(0,Math.min(LANES.length-1,(h.laneI||2)+(this.rng()<.5?-1:1))),
      atkT:0,anim:0,animT:0,walkT:0,shield:0,shieldT:0,buffT:0,lowT:0,nearT:0,hitFlash:0,alt:0,face:1,
      max:b.hp,hp:b.hp,atk:b.atk,aspd:1,crit:b.crit,acc:b.acc,dr:0,armor:0,cdr:0,dodge:b.dodge,luck:0,scoreM:1,pow:1,reach:1,critMul:b.critMul,armorPts:b.armorPts,kbRes:b.kbRes,
      enMaxB:100,enRegenB:5,xpBonus:0,lifesteal:0,mvMul:1,meleeDmg:1,rangedDmg:1,meleeSpd:1,rangedSpd:1,kbAdd:0,flatRanged:0,flatMelee:0};
    this.pets.push(pal);this.fx.push({k:'poof',x:pal.x,y:this.G-20,t:0});}
  tripBoom(T){const A=T.A,h=T.owner;T.done=1;this.fx.push({k:'boom',x:T.x+6,gy:T.gy,t:0,life:1.15,raw:1});this.ev('boom',{});this.shake=Math.max(this.shake||0,.55);
    const base=this.rollDice(A.dice)+(A.flat||0)+((h&&h.flatRanged)||0);const mul=h&&h.base?(h.atk/h.base.atk)*(h.rangedDmg||1):1;
    for(const e of this.enemies){if(e.dead||e.fly)continue;const dx=Math.abs(e.x-(T.x+6)),dz=Math.abs((e.gy!=null?e.gy:this.G)-T.gy);
      // cross-shaped blast (Kyle): a long arm along the lane (side to side) and a long arm across the lanes (up and down)
      const C2=A.cross;const inRow=dx<=C2.long&&dz<=C2.thin,inCol=dz<=C2.across&&dx<=C2.wide;if(!inRow&&!inCol)continue;
      const fall=1-.5*Math.min(1,Math.min(inRow?dx/C2.long:9,inCol?dz/C2.across:9));const dealt=this.hitEnemy(e,base*mul*fall,h&&h.alive?h:null,{blast:1});   // AoE: full damage in the middle, half at the edge
      if(dealt&&!e.dead){const res=e.boss?.9:((e.E&&e.E.kbRes)||0);e.kbv=Math.max(e.kbv||0,A.kb/100*40*8*(1-res)*fall);e.kbDir=e.x>=T.x?1:-1;
        if(this.rng()<A.bleed.chance){e.bleedT=A.bleed.dur;e.bleedDps=A.bleed.dmg/A.bleed.dur;}}
      e._tripHit=T;}
    if(this.hardcore)for(const o of this.alive()){const dx=Math.abs(this.heroX(o)-(T.x+6)),dz=Math.abs((o.gy||this.G)-T.gy);const C2=A.cross;const inR=dx<=C2.long&&dz<=C2.thin,inC=dz<=C2.across&&dx<=C2.wide;
      if(inR||inC){this.hurtHero(o,base*mul*.8,null);this.st8(h||o).ff=(this.st8(h||o).ff||0)+1;}}   /* Hardcore: your own bomb hurts your people too */
    /* 0.12.38 (Kyle): shockwave. A wider ring around the cross: anything it reaches that the cross missed takes half damage and a heavier shove (no bleed) */
    const SW=A.shock;if(SW){this.fx.push({k:'ring',x:T.x+6,y:T.gy-4,t:0,r:SW.r,c:'#ffd9a0'});
      for(const e of this.enemies){if(e.dead||e.fly||e._tripHit===T)continue;const dx=Math.abs(e.x-(T.x+6)),dz=Math.abs((e.gy!=null?e.gy:this.G)-T.gy);
        if((dx/SW.r)**2+(dz/SW.depth)**2>1)continue;const dealt=this.hitEnemy(e,base*mul*.5,h&&h.alive?h:null,{blast:1});
        if(dealt&&!e.dead){const res=e.boss?.9:((e.E&&e.E.kbRes)||0);e.kbv=Math.max(e.kbv||0,A.kb*SW.kbMul/100*40*8*(1-res));e.kbDir=e.x>=T.x?1:-1;}}}}
  addPoison(e,n){if(!e||e.dead||n<=0)return 0;if(isUndead(e)){this.text(e.x,e.y-(e.boss?100:44),'IMMUNE','#9aa');return 0;}
    e.poison=(e.poison||0)+n;e.poisonT=POISON.dur;if(e.poisonTick==null)e.poisonTick=0;this.text(e.x,e.y-(e.boss?100:46),'POISON x'+e.poison,'#7dff6a');return n;}
  rollDice([n,d]){let r=0;for(let i=0;i<n;i++)r+=1+Math.floor(this.rng()*d);return r;}
  // 0.12.2 test move for the energy sliders (until real abilities come back): a Power Attack costs 30 energy and hits x1.8
  powerMul(u){if(this.demo||!Brain.energyCall(u))return 1;if(!spendEnergy(u,30)){u.burst=0;return 1;}if(u.burst>0)u.burst--;
    const x=u.key?this.heroX(u):u.x;return 1.8;}
  basic(h,tgt,kind,mult){
    const st=h.style;kind=kind||st.atk;const [nd,ds]=h.base.dice||[2,4];let roll=0;for(let i=0;i<nd;i++)roll+=1+Math.floor(this.rng()*ds);const A=roll*(h.atk/h.base.atk);   // basic attack: a fresh 2d4 every swing/shot (item/team damage bonuses still apply)
    const M=mult==null?1:mult;
    if(kind==='melee'){const hits=st.double&&!ABILITIES_OFF?2:1;
      for(let i=0;i<hits;i++){this.hitEnemy(tgt,A*M*(i?0.8:1),h,{kb:1});}
      if(!ABILITIES_OFF)for(const o of this.enemies)if(o!==tgt&&!o.dead&&!o.fly&&Math.abs(o.x-tgt.x)<12)this.hitEnemy(o,A*.4,h,{nocrit:1});
      this.fx.push({k:'slash',x:tgt.x-6,y:tgt.boss?tgt.y-50:tgt.fly?tgt.y:tgt.y-24,t:0});return;}
    const pk=kind==='ranged'||kind==='caster'?st.proj:kind;
    setTimeoutSafe(this,.11,()=>{if(!h.alive)return;const tg=tgt.dead?this.liveE().sort((p,q)=>p.x-q.x)[0]:tgt;if(!tg)return;
    h._accBonus=h.moving?-45*(1-trait(h,'exec')):12*trait(h,'exec');const p=this.shoot(h,tg,pk,A*M,{});this.aim(p,h,tg);h._accBonus=0;if(st.atk==='duo')p.x=(st.companion?h.x+(h.compX||-12):h.x-9)+(MUZZLE[h.key]||[10])[0];if(!ABILITIES_OFF){p.splash=st.splash||(pk==='orb'?12:0);p.chill=st.chill;}});
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
  enemyShot(e,t){if(!t)return;const p={enemy:true,kind:e.E?e.E.proj:'bat',x:e.x+(e.face>0?8:-8),y:e.fly?e.y:e.y-30,tx:t,dmg:e.dmg,src:e,spd:150,t:0,pierce:(e.E&&e.E.pierce)||0,opt:{},hit:new Set()};
    this.proj.push(p);if(!e.boss)this.aim(p,e,t);}
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
      // 0.12.2: the old Reflex stat is gone; the unit's personality decides if, when and how well it steps out (Brain.dangerCall)
      const D=Brain.dangerCall(this,h,z,hx);if(D.react){
        const need=hx<cx?-(hw+8-(cx-hx)):(hw+8-(hx-cx));const out=need*D.mul;h.dodge={at:this.t+D.delay,dx:(h.dodgeX||0)+out,until:this.t+T+.5,spd:D.spd};}
      h.dangerWhy='⚠ '+D.why;h.dangerT=this.t+T+.6;if(!D.react)(z.missed=z.missed||[]).push(h);}
    if(z.missed)Comms.onDanger(this,z,z.missed);
    return z;}
  hurtMinion(m,amt,from){if(!m||m.dead)return;m.hp-=amt;m.hitFlash=.12;this.text(m.x,this.G-40,Math.round(amt),'#ffb0b0');}
  heroX(h){return h.x+(h.dodgeX||0)+(h.wanderX||0);}
  obHw(o){return Math.max(3,OBST[o.k].fw*.5*.5*.8);}   // half-width in world px (sheet is 2 px per world px)
  // each obstacle's footprint follows its picture: a rock blocks only under its base; the diagonal log blocks its left end in the near lane and its right end in the far lane
  obSpan(o,l){const F=OBST[o.k].foot;const i=o.lanes.length===2?(l===Math.max(...o.lanes)?0:1):0;const f=F[i]||F[0];return o.flip?[o.x-f[1],o.x-f[0]]:[o.x+f[0],o.x+f[1]];}
  /* shot vs obstacle: the shot has to be in one of its lanes and below the sprite's own outline at that spot (per-column heights baked from the art) */
  obHitsShot(o,p){if(!(o.blk>0))return false;const D=OBST[o.k];if(p.x0!=null&&Math.abs(p.x0-o.x)<D.fw/4+14)return false;   /* shooting from right behind cover: he leans out over it */if(!o.lanes.some(l=>Math.abs(LANES[l]-p.gy)<=3.5))return false;
    if(!D.prof){const l=o.lanes[0];const [a,b]=this.obSpan(o,l);return p.h<=o.blk&&p.x>=a&&p.x<=b;}
    const col=Math.floor((p.x-o.x)*(o.flip?-1:1)+D.fw/4);if(col<0||col>=D.prof.length)return false;return p.h<=D.prof[col]-1;}
  laneBlocked(l,x0,x1){for(const M of this.mines||[]){if(M!==this._ignoreMine&&M.armed&&M.spotted&&M.l===l&&M.x+6>x0&&M.x-6<x1)return {mine:M};}for(const o of this.obst||[]){if(!o.lanes.includes(l))continue;const [a,b]=this.obSpan(o,l);if(b>x0&&a<x1)return o;}return null;}
  // IF the lane I want is blocked just ahead THEN take the nearest open lane (ties go to whichever way I was already heading)
  freeLane(want,cur,x0,x1){if(!this.laneBlocked(want,x0,x1))return want;let best=null,bd=99;for(let l=0;l<LANES.length;l++){if(this.laneBlocked(l,x0,x1))continue;const d=Math.abs(l-want)+Math.abs(l-cur)*.3;if(d<bd){bd=d;best=l;}}return best==null?want:best;}
  onKillDark(e){
    if(e.hexT>0&&e.hexJ>0){const n=this.enemies.filter(o=>!o.dead&&o!==e&&!(o.hexT>0)&&Math.abs(o.x-e.x)<80).sort((p,q)=>Math.abs(p.x-e.x)-Math.abs(q.x-e.x))[0];
      if(n){n.hexT=e.hexA.dur;n.hexJ=e.hexJ-1;n.hexA=e.hexA;n.hexSrc=e.hexSrc;n.hexTick=0;this.fx.push({k:'bolt',pts:[[e.x,(e.gy||this.G)-14],[n.x,(n.gy||this.G)-14]],t:0,life:.35,raw:1,c:'v'});}}
    for(const h of this.alive()){const CM=h.base&&h.base.char&&(h.base.char.abilities||[]).find(a=>a.id==='communion');if(!CM||Math.abs(this.heroX(h)-e.x)>CM.r)continue;
      h.en=Math.min(h.enMax||100,(h.en||0)+CM.en);this.healHero(h,h.max*CM.heal,true);this.fx.push({k:'soul',x:e.x,y:(e.gy||this.G)-12,tx:this.heroX(h),ty:(h.gy||this.G)-20,t:0,life:.6,raw:1});}}
  stepDark(dt,scroll){
    for(const e of this.enemies){if(e.dead||!(e.hexT>0))continue;e.hexT-=dt;e.hexTick=(e.hexTick||0)+dt;if(e.hexTick>=.5){e.hexTick-=.5;this.hitEnemy(e,e.max*e.hexA.pct*.5,e.hexSrc&&e.hexSrc.alive?e.hexSrc:null,{nocrit:1,sure:1});}
      if(e.fearT>0)e.fearT-=dt;}
    if(!this.tentacles||!this.tentacles.length)return;
    for(const T of this.tentacles){T.t+=dt;T.x-=scroll*dt;T.aT+=dt;const A=T.A;
      if(T.anim==='emerge'&&T.aT>=.5){T.anim='idle';T.aT=0;}
      // enemies standing on it swat at it (it has 15 HP); IF it drops to 0 THEN it wilts early
      T.swatT-=dt;if(T.swatT<=0&&T.anim!=='death'){T.swatT=1.25;for(const e of this.enemies){if(e.dead||e.fly||e.boss||e.retreatT>0)continue;if(Math.abs(e.x-T.x)<10&&Math.abs((e.gy!=null?e.gy:this.G)-T.gy)<5){T.hp-=e.dmg;T.hitT=.15;if(T.anim!=='attack'){T.anim='hit';T.aT=0;}this.text(T.x,T.gy-40,Math.round(e.dmg),'#c8a0ff');}}}
      if(T.anim==='hit'&&T.aT>=.25){T.anim='idle';T.aT=0;}
      if(T.anim!=='emerge'&&T.anim!=='death')T.hp-=T.max*(A.decay||.05)*dt;
      if(T.heraldT>0){T.heraldT-=dt;T.hp=Math.min(T.max,T.hp+2*dt);}   // Herald crit: +1 HP every 0.5s for 5s   // 0.12.22 (Kyle): it withers 5% of max HP a second; only its life steal keeps it up
      if(T.hp<=0&&T.anim!=='death'){T.anim='death';T.aT=0;}
      if(T.anim==='death'){if(T.aT>=.8)T.done=1;continue;}
      if(T.anim==='attack'&&T.aT>=.6){T.anim='idle';T.aT=0;}
      T.atkT-=dt;
      if(T.anim==='idle'&&T.atkT<=0){const tg=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-T.x)<=A.reach+(e.boss?e.w*.5:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-T.gy)<=A.depth)).sort((p,q)=>Math.abs(p.x-T.x)-Math.abs(q.x-T.x))[0];
        if(tg){T.atkT=A.every;T.anim='attack';T.aT=0;T.face=tg.x>=T.x?1:-1;const dir=T.face;
          setTimeoutSafe(this,.32,()=>{if(T.done)return;this.ev('hit',{});this.shake=Math.max(this.shake||0,.15);
            for(const e of this.enemies){if(e.dead||e.fly)continue;const dx=(e.x-T.x)*dir;if(dx>=-4&&dx<=A.reach+(e.boss?e.w*.5:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-T.gy)<=A.depth)){
              const d=this.hitEnemy(e,(this.rollDice(A.dice)+(T.src.flatRanged||0)*.5)*T.mul,T.src&&T.src.alive?T.src:null,{fromTent:1});if(d)T.hp=Math.min(T.max,T.hp+d*A.steal);/* 0.12.38 (Kyle): heals 20% of the damage it deals */if(d&&!e.dead&&!e.boss){const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,A.kb/100*40*8*(1-res));e.kbDir=dir;}}}
            this.fx.push({k:'quake',x:T.x+dir*A.reach*.8,gy:T.gy,t:0,life:.4,raw:1});});}}}
    this.tentacles=this.tentacles.filter(T=>!T.done);}
  // 0.12.22 Revive (Kyle): a living hero standing on a downed ally for 5s (4s with a Herald up) helps them back to their feet with 25% HP and 0 energy.
  // 0.12.27 Scavenger (inspiration passive): herbs found on kills or foraged while marching; used on any hurt hero within 17 world px (50 screen px)
  /* 0.12.37 (Kyle): where a searcher stands: in the lane just in front of it, right beside a car's door (a bit toward its front end),
     or practically on top of a rock / stump / log (its middle) */
  searchSpot(o,h){const fl=Math.max(...o.lanes),bl=Math.min(...o.lanes)-1,fr=fl+1<LANES.length?fl+1:-1;const cur=h?h.laneI:fr;   /* the lane right in front of it or right behind it, whichever is closer */
    const nl=fr<0?bl:bl<0?fr:(Math.abs(cur-bl)<Math.abs(cur-fr)?bl:fr);const [a,b]=this.obSpan(o,fl);const mid=(a+b)/2;
    const car=/^car_/.test(o.k);const x=car?mid-(o.flip?-1:1)*.16*(b-a):mid;return {x,lane:Math.max(0,nl)};}
  atSpot(h,o){const S=this.searchSpot(o,h);return Math.abs(h.x-S.x)<=(/^car_/.test(o.k)?5:4)&&Math.abs((h.gy||this.G)-LANES[S.lane])<3;}
  obNear(h,o){const l=o.lanes.reduce((b,l)=>Math.abs(LANES[l]-(h.gy||this.G))<Math.abs(LANES[b]-(h.gy||this.G))?l:b,o.lanes[0]);if(Math.abs(LANES[l]-(h.gy||this.G))>7)return false;const [a,b]=this.obSpan(o,l);return h.x>a-9&&h.x<b+9;}
  stepHerbs(dt,scroll){const al=this.alive().filter(o=>!o.pet||true);
    for(const o of al){if(o.herbT>0){o.herbT-=dt;const b0=o.hp;o.hp=Math.min(o.max,o.hp+o.herbHps*dt);if(o.herbSrc&&o.herbSrc.key)this.st8(o.herbSrc).heal+=o.hp-b0;}}
    for(const h of al){const sp=insP(h);if(h.pet)continue;const RE=SEARCH_RE[sp]||/^$/,ST=(SEARCH_T[sp]||2)*[1,.75,.6][upgT(this.run,'lamp')],full=sp==='herbalist'?(h.herbs||0)>=3:sp==='scavenger'?(h.kit||[]).length>=2:true   /* 0.12.34 (Kyle): Scavenger holds 2 items total */;
      const canAmb=o=>o.k==='car_ambulance'&&!h.medkit;   // 0.12.33: anyone can search an ambulance for a Medkit
      // searching debris: stand next to an unsearched rock/stump/log for 1.5s; chance 45% + 1.2% per Luck (max 95%)
      if(h.search&&h.search.disarm)continue;
      if(h.search){const S=h.search,o=S.o;const near=o&&this.obst&&this.obst.includes(o)&&this.atSpot(h,o);
        if(!near||this.exiting||o.looted){h.search=null;}else{S.T=ST;h.pauseT=Math.max(h.pauseT||0,.05);h.x-=(this.scroll||0)*dt;   /* 0.12.37 (Kyle): searching means standing still at it: he stays with the wreck while the world scrolls */
          if(h.moving){continue;}S.t+=dt;   /* no progress while still moving */
          if(S.t>=(S.T||ST)){o.looted=1;o.searched=o.searched||{};o.searched[h.key]=1;h.search=null;this.searchLoot(h,o,sp,full,RE);}}}
      else if(!full||!h.medkit){const o=(this.obst||[]).find(o=>((!full&&RE.test(o.k))||canAmb(o))&&g_free(o,h)&&this.atSpot(h,o)&&h.plan&&h.plan.intent==='search'&&h.plan.goTo&&h.plan.goTo.ob===o);   /* 0.12.37 (Kyle): searching is a decision (the Brain picked THIS object), never automatic for being in range */if(o){o.searchBy=h;h.search={o,t:0,T:ST};if(/^car_/.test(o.k))this.disturb(o.x,LANES[o.lanes[0]],2,Math.max(.03,(.25-.006*(h.luck||0))*(.4+1.2*trait(h,'noise'))));   /* Loud searchers set alarms off far more often */   /* careful searching: 25% minus luck (about 13% at 20 Luck), blasts are 50% */}}
      if(h.medkit&&!((h.herbCd||0)>this.t)){const thr=.62-.3*trait(h,'energy');const tg=al.filter(o=>o.hp/o.max<thr&&Math.abs(this.heroX(o)-this.heroX(h))<=17&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
        if(tg){h.medkit=0;h.herbCd=this.t+.6;this.healHero(tg,tg.max*.35,false,h.medkitCamp?{}:h);h.medkitCamp=0;   /* a Triage-built medkit is the player's doing, not the unit's: it doesn't count toward his healing stat */this.fx.push({k:'mend',x:this.heroX(tg),gy:tg.gy||this.G,t:0,life:.8,raw:1});this.ev('heal',{});if(tg!==h)Comms.bubble(this,h,Comms.pick(['Medkit, hold still!','Patching you up!','Here, take this!']));}}
      // Scavenger: use a Medkit on anyone close under 60%, a Battery on anyone close under 30 energy who has abilities
      if(sp==='scavenger'&&(h.kit||[]).length&&!((h.herbCd||0)>this.t)){const near=al.filter(o=>Math.abs(this.heroX(o)-this.heroX(h))<=17&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6);
        const mi=h.kit.indexOf('med'),bi=h.kit.indexOf('bat');const mt=mi>=0&&near.filter(o=>o.hp/o.max<.72-.3*trait(h,'energy')).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
        const bt=bi>=0&&near.filter(o=>(o.en||0)<42-24*trait(h,'energy')&&((CHAR[o.key]||{}).abilities||[]).some(a=>!a.passive)).sort((p,q)=>(p.en||0)-(q.en||0))[0];
        if(mt){h.kit.splice(mi,1);h.herbCd=this.t+.6;this.healHero(mt,mt.max*.25,false,h);this.fx.push({k:'mend',x:this.heroX(mt),gy:mt.gy||this.G,t:0,life:.7,raw:1});this.ev('heal',{});if(mt!==h&&Math.random()<.5)Comms.bubble(this,h,Comms.pick(['Patch up!','Here, a medkit!','Hold still.']));}
        else if(bt){h.kit.splice(bi,1);h.herbCd=this.t+.6;bt.en=Math.min(bt.enMax||100,(bt.en||0)+30);this.fx.push({k:'ring',x:this.heroX(bt),y:this.G-14,r:10,t:0,c:'#ffe060'});if(bt!==h&&Math.random()<.5)Comms.bubble(this,h,'Catch, fresh battery!');}}
      if(!(h.herbs>0)||(h.herbCd||0)>this.t)continue;
      const tg=al.filter(o=>o.hp/o.max<.9-.3*trait(h,'energy')&&!(o.herbT>0)&&Math.abs(this.heroX(o)-this.heroX(h))<=17&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
      if(tg){h.herbs--;h.herbCd=this.t+.6;tg.herbT=5;tg.herbSrc=h;tg.herbHps=tg.max*.2/5;this.fx.push({k:'mend',x:this.heroX(tg),gy:tg.gy||this.G,t:0,life:.7,raw:1});this.ev('heal',{});
        if(tg!==h&&Math.random()<.5)Comms.bubble(this,h,Comms.pick(['Here, chew this.','Herb for you!','Hold still.','This\'ll help.','Eat up!']));}}}
  stepDisarm(dt){for(const h of this.alive()){const P=h.plan;if(!P||P.intent!=='disarm'||!P.goTo||!P.goTo.ob)continue;const o=P.goTo.ob;
      if(!(o.alarmT>0)||!this.atSpot(h,o)){if(h.search&&h.search.disarm)h.search=null;continue;}
      const need=(2.6-1.9*trait(h,'tech'))*[1,.7,.4][upgT(this.run,'cutters')];if(!h.search||!h.search.disarm)h.search={o,t:0,T:need,disarm:1};const S=h.search;h.x-=(this.scroll||0)*dt;if(!h.moving)S.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);
      if(S.t>=need){o.alarmT=0;o.alarmN=0;h.search=null;h.plan=null;h.thinkT=0;this.fx.push({k:'ring',x:o.x,y:LANES[o.lanes[0]]-10,t:0,r:10,c:'#c8d0d8'});Comms.bubble(this,h,Comms.pick(['Alarm\'s off!','Got it!','Quiet, you.','Wires cut!','Silenced!']));}}}
  /* 0.12.51 (Kyle) ENEMY TRAPS: rusted scrap mines on tripwires, 1-3 per stage, dropped in random lanes ahead.
     IF a unit ahead of one rolls under its Perception (Sapper perk helps) THEN it's spotted: marked, called out, and units path around it.
     IF an unspotted one is right underfoot THEN a last-second dodge (better when Perceptive), ELSE it blows: hurts heroes AND zombies nearby.
     IF I have the Sapper perk AND one is spotted AND it's calm around it THEN I may go defuse it (faster when Techy) and keep it as a one-time mine,
     which I plant in front of zombies coming down my lane. */
  stepMines(dt,scroll){if(this.demo)return;this.mines=this.mines||[];
    if(this.mineAt==null){const n=1+Math.floor(this.rng()*3);this.mineAt=[];for(let i=0;i<n;i++)this.mineAt.push(this.st.len*(.12+.76*this.rng()));this.mineAt.sort((a,b)=>a-b);}
    while(this.mineAt.length&&this.dist>=this.mineAt[0]&&!this.exiting){this.mineAt.shift();let l=Math.floor(this.rng()*LANES.length);for(let k=0;k<5&&this.laneBlocked(l,this.W+20,this.W+44);k++)l=Math.floor(this.rng()*LANES.length);
      this.mines.push({x:this.W+30,l,gy:LANES[l],t:0,armed:true,spotted:false,chk:0});}
    const al=this.alive().filter(h=>!h.pet||h.dog);
    for(const M of this.mines){M.x-=scroll*dt;M.t+=dt;if(!M.armed)continue;
      if(!M.spotted){M.chk-=dt;if(M.chk<=0){M.chk=.5;for(const h of al){const d=M.x-this.heroX(h);if(d<-10||d>75)continue;const sp=(hasPerk(h,'sapper')?.3:0)+trait(h,'perc');
          if(this.rng()<.2*(.35+1.3*sp)){M.spotted=true;M.by=h;this.fx.push({k:'ring',x:M.x,y:M.gy-3,t:0,r:8,c:'#ff4a3a'});Comms.bubble(this,h,Comms.pick(['Trap!','Mine, watch it!','Tripwire!','Careful, mine!']),true);for(const o of al)o.thinkT=Math.min(o.thinkT||1,.1);break;}}}}
      for(const h of al){if(Math.abs((h.gy||this.G)-M.gy)>3||Math.abs(this.heroX(h)-M.x)>4||h.leap)continue;
        if(h.defuse&&h.defuse.M===M)continue;
        if(!M.spotted&&!M.dodged){M.dodged=1;if(this.rng()<.15+.6*trait(h,'perc')){M.spotted=true;h.x-=6;h.pauseT=Math.max(h.pauseT||0,.3);Comms.bubble(this,h,Comms.pick(['Whoa! Trap!','Nearly stepped on that!','MINE!']),true);continue;}}
        if(!M.spotted||this.rng()<dt*2){this.mineBoom(M);break;}}}
    this.mines=this.mines.filter(M=>M.armed&&M.x>-30);
    // defusing (Sapper)
    for(const h of al){const D=h.defuse;if(!D)continue;const M=D.M;if(!M.armed||!this.mines.includes(M)||h.plan&&h.plan.intent!=='defuse'){h.defuse=null;if(h.search&&h.search.trap)h.search=null;continue;}
      if(Math.abs(this.heroX(h)-(M.x-7))>5||Math.abs((h.gy||this.G)-M.gy)>3)continue;h.pauseT=Math.max(h.pauseT||0,.05);h.x-=scroll*dt;if(h.moving)continue;
      h.search=h.search&&h.search.trap?h.search:{o:M,t:0,T:D.need,disarm:1,trap:1};h.search.t+=dt;
      if(h.search.t>=D.need){h.search=null;h.defuse=null;h.plan=null;h.thinkT=0;
        if(this.rng()>defuseOdds(h)){this.mineBoom(M);Comms.bubble(this,h,Comms.pick(['Oh no.','Wrong wire!','Was it the red one?!','Uh oh.']),true);this.st8(h).fumbled=(this.st8(h).fumbled||0)+1;continue;}   /* failed: it goes off in his hands */
        M.armed=false;this.st8(h).defused=(this.st8(h).defused||0)+1;
        if(this.rng()<(hasPerk(h,'sapper')?.75:.4)){h.mine=(h.mine||0)+1;this.fx.push({k:'herbget',x:h.x,y:(h.gy||this.G)-26,t:0,life:.9,raw:1,kit:'defib'});Comms.bubble(this,h,Comms.pick(['Disarmed. Mine now.','Got it. I\'ll save this for them.','Wire cut. Keeping it.']),true);}   /* 0.12.52 (Kyle): 75% he keeps the mine */
        else{this.gainParts(null,{x:M.x,lanes:[M.l]});Comms.bubble(this,h,Comms.pick(['Fell apart. Parts, at least.','Busted it. Spare parts.','Not usable, but salvageable.']),true);}}}   /* ...25% it comes apart into spare parts */
    // planting a defused mine in front of zombies coming down my lane
    for(const h of al){if(!(h.mine>0)||(h.mineCd||0)>this.t)continue;const lane=this.enemies.filter(e=>!e.dead&&!e.fly&&!e.boss&&Math.abs((e.gy!=null?e.gy:this.G)-(h.gy||this.G))<4&&e.x-this.heroX(h)>18&&e.x-this.heroX(h)<75);
      if(!lane.length||this.enemies.some(e=>!e.dead&&Math.abs(e.x-this.heroX(h))<16))continue;h.mine--;h.mineCd=this.t+1;const TB=(CHAR.flannel.abilities||[]).find(a=>a.id==='trip');
      (this.traps=this.traps||[]).push({x:this.heroX(h)+12,gy:h.gy!=null?h.gy:this.G,t:0,A:TB,owner:h,mine:1});Comms.bubble(this,h,Comms.pick(['Mine down!','Step on this.','Present for you!']),true);}}
  mineBoom(M){if(!M.armed)return;M.armed=false;this.fx.push({k:'boom',x:M.x,gy:M.gy,t:0,life:1.15,raw:1,small:1});this.ev('boom',{});this.shake=Math.max(this.shake||0,.4);
    const dmg=(this.rollDice([3,4]))*(1+.12*(this.st.n-1));
    for(const h of this.alive()){const dx=Math.abs(this.heroX(h)-M.x),dz=Math.abs((h.gy||this.G)-M.gy);if(dx>16||dz>7)continue;this.hurtHero(h,dmg*(dx<6?1:.6),null);h.x-=Math.sign(M.x-this.heroX(h)||1)*6;}
    for(const e of this.enemies){if(e.dead||e.fly)continue;const dx=Math.abs(e.x-M.x),dz=Math.abs((e.gy!=null?e.gy:this.G)-M.gy);if(dx>16||dz>7)continue;this.hitEnemy(e,dmg*(dx<6?1:.6),null,{blast:1,bx:M.x,sure:1});}}
  /* 0.12.38 what a finished search turns up (each thing is looted once in total).
     Ambulance (anyone): a Medkit (60% + Luck/Perception, if he has none), a Defibrillator (30%, if he has none), spare parts (55%), food or water (30%).
     Scavenger, on any wreck incl. the ambulance (on top of the ambulance table): medkit/battery (max 2), food/water (good odds), spare parts or a little gold.
     Herbalist, on rocks/logs/stumps: an herb (max 3). Food, water and spare parts are camp supplies: they do nothing during the stage. */
  searchLoot(h,o,sp,full,RE){const luck=h.luck||0,perc=trait(h,'perc'),tech=trait(h,'tech');const pick=a=>Comms.pick(a);let got=0;
    const pop=kit=>this.fx.push({k:'herbget',x:h.x,y:(h.gy||this.G)-26,t:0,life:.9,raw:1,kit});
    const ch=Math.min(.95,.35+.012*luck+.3*perc+(sp==='scavenger'?.15*(tech-.5)*2:.15*(.5-tech)*2));
    this.st8(h).searches++;
    if(o.k==='car_ambulance'){
      if(!h.medkit&&this.rng()<Math.min(.95,.6+.01*luck+.2*perc)){h.medkit=1;h.medkitCamp=0;pop('med');got=1;Comms.bubble(this,h,pick(['A medkit!','Jackpot, first aid!','Still sealed!']));}
      if(!h.defib&&this.rng()<.3+.004*luck){h.defib=1;pop('defib');got=1;Comms.bubble(this,h,pick(['A defibrillator!','Paddles! Still charged!','Clear!']));}
      if(this.rng()<.55){this.gainParts(h,o);got=1;}
      if(this.rng()<.3){this.gainSupply(h,o);got=1;}}
    if(sp==='scavenger'&&RE.test(o.k)&&this.rng()<ch){const r=this.rng();got=1;
      if(r<.35){this.gainSupply(h,o);}
      else if(r<.6){this.gainParts(h,o);}
      else if(r<.85&&!full){const it=this.rng()<.6?'med':'bat';(h.kit=h.kit||[]).push(it);pop(it);Comms.bubble(this,h,it==='med'?pick(['Medkit!','Bandages!','First aid!']):pick(['A battery!','Still has juice!','Power cell!']));}
      else{const gd=2+Math.floor(this.rng()*5);this.stageGold+=gd;this.text(o.x,LANES[o.lanes[0]]-30,'+'+gd,'#ffd23f');Comms.bubble(this,h,pick(['Scrap!','Spare change!','Something shiny!']));}}
    else if(sp==='herbalist'&&o.k!=='car_ambulance'&&RE.test(o.k)&&this.rng()<ch&&(h.herbs||0)<3){h.herbs=(h.herbs||0)+1;pop();got=1;Comms.bubble(this,h,pick(['Found one!','An herb!','Aha!','Lucky!']));}
    if(!got){this.fx.push({k:'poof',x:o.x,y:(LANES[o.lanes[0]])-10,t:0});Comms.bubble(this,h,pick(['Nothing.','Empty.','Just dirt.','Picked clean.']));}}
  gainParts(h,o){const n=1+(this.rng()<.5?1:0);this.stageParts=(this.stageParts||0)+n;this.text(o?o.x:h.x,(o?LANES[o.lanes[0]]:this.G)-30,'+'+n+' PARTS','#c8d0d8');if(h)Comms.bubble(this,h,Comms.pick(['Spare parts!','Useful bits.','Gears and wire!']));}
  gainSupply(h,o){const w=this.rng()<.5;if(w)this.stageWater=(this.stageWater||0)+1;else this.stageFood=(this.stageFood||0)+1;this.text(o?o.x:h.x,(o?LANES[o.lanes[0]]:this.G)-36,w?'+1 WATER':'+1 FOOD',w?'#7fd0ff':'#e8b060');
    if(h)Comms.bubble(this,h,w?Comms.pick(['Clean water!','A bottle!','Water!']):Comms.pick(['Canned food!','Rations!','Still sealed!']));}
  stepRevive(dt){const downs=this.heroes.filter(h=>!h.alive&&h.downed);if(!downs.length)return;
    const al=this.alive().filter(o=>!o.pet);const herald=o=>(o.base.char&&o.base.char.abilities||[]).some(a=>a.id==='herald');
    for(const d of downs){const helpers=al.filter(o=>Math.abs(o.x-d.x)<9&&Math.abs((o.gy||this.G)-(d.gy||this.G))<4.5&&!(o.riseT>0));const need=helpers.some(herald)?4:5;d.revNeed=need;   /* 4s when the Herald is the one helping, 5s for everyone else */
      {const df=helpers.find(o=>o.defib);if(df){df.defib=0;this.fx.push({k:'ring',x:d.x,y:(d.gy||this.G)-10,t:0,r:16,c:'#9ad0ff'});this.fx.push({k:'arc',x:d.x,gy:d.gy||this.G,t:0,life:.4,dir:1,raw:1});this.ev('zap',{});Comms.bubble(this,df,Comms.pick(['Clear!','Shocking you awake!','Get up!']),true);this.st8(df).revives++;this.revive(d);continue;}}   /* 0.12.38 Defibrillator: one use, instant revive */
      if(helpers.length){d.revT=(d.revT||0)+dt;if(!d.revCall){d.revCall=1;Comms.say(this,helpers[0],'reviving',{ally:d});}}
      else{d.revT=Math.max(0,(d.revT||0)-dt*.5);if(d.revT<=0)d.revCall=0;}
      if(d.revT>=need){if(helpers[0])this.st8(helpers[0]).revives++;this.revive(d);}}}
  revive(h){h.alive=true;h.downed=0;h.hp=Math.max(1,h.max*.25);h.en=0;h.revT=0;h.revCall=0;h.riseT=1.1;h.riseT0=1.1;h.invulnT=1.3;h.plan=null;h.thinkT=0;h.bleedT=0;h.hotT=0;
    this.fx.push({k:'ring',x:h.x,y:this.G-10,r:16,t:0,c:'#7dff9a'});this.ev('heal',{});this.text(h.x,this.G-56,'+'+Math.round(h.hp),'#7dff9a');
    Comms.bubble(this,h,Comms.pick(['Thanks!','I\'m up!','Back in it!','Not done yet!','Owe you one!','Still kicking!']));}
  tryResurge(h){if((this.resurgeT||-99)>this.t||h.pet)return false;const D=this.alive().find(o=>o!==h&&o.base&&o.base.char&&(o.base.char.abilities||[]).some(a=>a.id==='resurge'));if(!D)return false;
    const A=D.base.char.abilities.find(a=>a.id==='resurge');this.resurgeT=this.t+(A.icd||25);h.hp=1;h.invulnT=A.dur;h.bleedT=0;h.hotT=A.dur;h.hotTick=0;h.hotSrc=D;h.hotEvery=.5;h.hotAmt=h.max*A.heal/(A.dur/.5);
    this.fx.push({k:'mend',x:this.heroX(h),gy:h.gy||this.G,t:0,life:1.2,raw:1});this.ev('heal',{});Comms.bubble(this,D,Comms.pick(['Not today!','I\'ve got you!','Stay with me!','Roots, hold!','Not yet!']));return true;}
  robotGat(h,dt,C){const G=h.gat,A=G.A;G.t+=dt;G.acc+=dt;h.pauseT=Math.max(h.pauseT||0,.05);
    const live=this.enemies.filter(e=>!e.dead&&e.x>h.x-6&&e.x-h.x<=A.range);
    while(G.acc>=1/A.rate&&G.t<A.dur){G.acc-=1/A.rate;if(!live.length)break;const tg=live[Math.floor(this.rng()*live.length)];faceToward(h,tg.x,1);
      const dmg=(this.rollDice(A.dice)+(h.flatRanged||0)*.25)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
      h._accBonus=A.accPen;const p=this.shoot(h,tg,'gat',dmg,{});this.aim(p,h,tg);h._accBonus=0;p.tgy+=(this.rng()*2-1)*A.spreadGy;p.aimH+=(this.rng()*2-1)*A.spreadH;{const dh=(this.rng()*2-1)*(A.startH||0);p.h0=(p.h0!=null?p.h0:p.h)+dh;p.h=p.h0;p.y-=dh*UNIT_SCALE;}h.gatFlash=.05;if(this.rng()<.45)this.ev('gun',{});}
    if(G.t>=A.dur||!live.length&&G.t>.6)h.gat=null;}
  // Arc_Surge: lightning jumps from the blade's target to up to N more enemies nearby
  arcChain(h,from){const A=(h.base.char.abilities||[]).find(a=>a.id==='surge');if(!A)return;let cur=from;const done=new Set([from]);const pts=[[from.x,(from.gy||this.G)-12]];
    for(let i=0;i<A.chains;i++){const nx=this.enemies.filter(e=>!e.dead&&!done.has(e)&&Math.abs(e.x-cur.x)<A.r&&Math.abs((e.gy||this.G)-(cur.gy||this.G))<14).sort((p,q)=>Math.abs(p.x-cur.x)-Math.abs(q.x-cur.x))[0];if(!nx)break;
      done.add(nx);pts.push([nx.x,(nx.gy||this.G)-12]);this.hitEnemy(nx,this.rollDice(A.dice)*(h.atk/h.base.atk)*h.meleeDmg,h,{});if(!nx.dead)nx.stun=Math.max(nx.stun||0,A.stun*(nx.boss?.3:1));cur=nx;}
    if(pts.length>1)this.fx.push({k:'bolt',pts,t:0,life:.28,raw:1});}
  stepRobot(dt,scroll){
    if(this.missiles&&this.missiles.length){for(const M of this.missiles){M.t+=dt;M.x0-=scroll*dt;M.tx-=scroll*dt;const u=Math.min(1,M.t/M.T);M.x=M.x0+(M.tx-M.x0)*u;M.gyNow=M.gy+(M.tgy-M.gy)*u;M.hgt=(1-u)*23+46*Math.sin(Math.PI*u);
        M.trail-=dt;if(M.trail<=0){M.trail=.035;this.fx.push({k:'puff',x:M.x,y:M.gyNow-M.hgt,t:0,life:.7+this.rng()*.3,s:.6+this.rng()*.5,raw:1});}
        if(u>=1&&!M.done){M.done=1;this.fx.push({k:'boom',x:M.x,gy:M.tgy,t:0,life:.8,raw:1,small:1});this.ev('boom',{});this.shake=Math.max(this.shake||0,.25);
          for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-M.x)<=M.A.r+(e.boss?e.w*.5:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-M.tgy)<=8))this.hitEnemy(e,(this.rollDice(M.A.dice)+(M.src.flatRanged||0)*.5)*M.mul,M.src&&M.src.alive?M.src:null,{blast:1});}
          if(this.hardcore)for(const o of this.alive()){if(Math.abs(this.heroX(o)-M.x)<=M.A.r&&Math.abs((o.gy||this.G)-M.tgy)<=8)this.hurtHero(o,this.rollDice(M.A.dice)*M.mul*.8,null);}}}   /* Hardcore: missiles don't care whose side you're on */
      this.missiles=this.missiles.filter(M=>!M.done);}
    if(this.nades&&this.nades.length){for(const N of this.nades){N.t+=dt;N.x1-=scroll*dt;N.x0-=scroll*dt;const u=Math.min(1,N.t/N.T);N.x=N.x0+(N.x1-N.x0)*u;N.gyNow=N.gy0+(N.gy-N.gy0)*u;N.hgt=18*(1-u)+22*Math.sin(Math.PI*u);
        if(u>=1&&!N.done){N.done=1;(this.clouds=this.clouds||[]).push({x:N.x1,gy:N.gy,r:N.A.r,t:0,life:N.A.dur,A:N.A,seed:Math.floor(this.rng()*999)});this.ev('wind',{});}}
      this.nades=this.nades.filter(N=>!N.done);}
    if(this.clouds&&this.clouds.length){for(const S of this.clouds){S.t+=dt;S.x-=scroll*dt;const A=S.A;
        for(const e of this.enemies){if(e.dead||e.fly||e.boss)continue;if(Math.abs(e.x-S.x)<S.r&&Math.abs((e.gy!=null?e.gy:this.G)-S.gy)<14){e.smokeT=.25;e.slow=Math.max(e.slow||0,A.slow);e.slowT=Math.max(e.slowT||0,.25);}}
        for(const o of this.alive()){if(Math.abs(this.heroX(o)-S.x)<S.r&&Math.abs((o.gy||this.G)-S.gy)<14)o.smokeT=.25;}}
      this.clouds=this.clouds.filter(S=>S.t<S.life);}
    for(const e of this.enemies){if(e.smokeT>0)e.smokeT-=dt;if(e.markT>0)e.markT-=dt;if(e.rootT>0)e.rootT-=dt;}for(const o of this.alive())if(o.smokeT>0)o.smokeT-=dt;}
  // 0.12.30 car alarms (Kyle): disturbing a wrecked car (a damaging ability's blast nearby, or searching it) has a 50% chance to set off
  //   its alarm, once per car. The alarm blares for 3s and a fresh pack of zombies comes in from the edge, on top of the normal waves.
  disturb(x,gy,r,chance){chance=chance==null?.5:chance;for(const o of this.obst||[]){if(!/^car_/.test(o.k)||o.alarmed!=null)continue;const l=o.lanes.reduce((b,l)=>Math.abs(LANES[l]-gy)<Math.abs(LANES[b]-gy)?l:b,o.lanes[0]);
      if(Math.abs(LANES[l]-gy)>r*.5+6)continue;const [a,b]=this.obSpan(o,l);if(x<a-r||x>b+r)continue;
      o.alarmed=this.rng()<chance;if(o.alarmed)this.carAlarm(o);}}
  // 0.12.38: 30s, one zombie every 2s (was 10s / ~1.25s) (a little faster on later stages), up to 8 (+1 per
  //   3 stages). Ignoring it adds about one medium cluster - survivable - but shutting it off in the first few seconds saves most of them.
  carAlarm(o){const other=(this.obst||[]).some(q=>q!==o&&q.alarmT>0&&q.alarmN>0);o.alarmT=[30,22,15][upgT(this.run,'cutters')];o.alarmN=other?1:99;   /* 0.12.38 (Kyle): blares up to 30s, a zombie from off-screen every 2s until shut off; a second alarm at the same time only adds 1 */o.alarmEvery=2;o.alarmTick=.6;this.ev('shout',{});this.shake=Math.max(this.shake||0,.2);
    const sp=this.alive().filter(h=>h.key).sort((p,q)=>Math.abs(p.x-o.x)-Math.abs(q.x-o.x))[0];if(sp){Comms.bubble(this,sp,Comms.pick(['Car alarm!','Shut it off!','Great, now they heard us!','Here they come!','Who touched the car?!']));
      for(const o2 of this.alive())if(o2!==sp&&Math.random()<.4+.5*trait(o2,'listen'))o2.alDecide=null,o2.thinkT=Math.min(o2.thinkT||1,.1);}   // everyone rethinks right away
    for(const h of this.alive())if(Math.abs(this.heroX(h)-o.x)<140)Brain.panic(this,h,'alarm');
    if(this.demo)o.alarmN=0;}
  stepObstacles(dt,scroll){if(!this.obst)this.obst=[];if(this.obNext==null)this.obNext=60+this.rng()*120;
    for(const o of this.obst){o.x-=scroll*dt;if(o.alarmT>0){o.alarmT-=dt;o.alarmTick-=dt;   // the alarm keeps pulling zombies in until it runs out or someone shuts it off
        if(o.alarmTick<=0&&o.alarmN>0&&!this.over&&!this.exiting){o.alarmN--;o.alarmTick=o.alarmEvery||1.25;this.spawnEnemy('zombie',{x:this.W+8+this.rng()*24,elite:'roll',alarm:1});}
        if(o.alarmT<=0)o.alarmN=0;}}
    if(!this.demo)for(const h of this.heroes){if(!h.alive||insP(h)!=='pickpocket'||trait(h,'self')<.75||(h.thiefCd||0)>this.t)continue;const sneaking0=h.plan&&h.plan.intent==='sneak';if(!sneaking0){if((h.thiefChk||0)>this.t)continue;h.thiefChk=this.t+2;}   /* opportunistic check every 2s; a deliberate sneak checks every frame */
      const sneaking=h.plan&&h.plan.intent==='sneak';if(!sneaking&&this.rng()>.06+.3*(trait(h,'self')-.75))continue;
      const v=this.heroes.filter(o=>o!==h&&o.alive&&Math.abs(this.heroX(o)-this.heroX(h))<16&&Math.abs((o.gy||this.G)-(h.gy||this.G))<8).find(o=>(o.defib&&!h.defib)||(o.medkit&&!h.medkit)||((o.kit||[]).length&&(h.kit||[]).length<2)||(o.herbs>0&&(h.herbs||0)<3));if(!v)continue;
      let what;if(v.defib&&!h.defib){v.defib=0;h.defib=1;what='defib';}else if(v.medkit&&!h.medkit){v.medkit=0;h.medkit=1;h.medkitCamp=v.medkitCamp;v.medkitCamp=0;what='medkit';}
      else if((v.kit||[]).length&&(h.kit||[]).length<2){const it=v.kit.pop();(h.kit=h.kit||[]).push(it);what=it==='bat'?'battery':'medicine';}else{v.herbs--;h.herbs=(h.herbs||0)+1;what='herb';}
      h.thiefCd=this.t+18+this.rng()*14;this.fx.push({k:'herbget',x:h.x,y:(h.gy||this.G)-26,t:0,life:.9,raw:1,kit:what==='defib'?'defib':what==='battery'?'bat':what==='herb'?null:'med'});
      const V=Comms.name(v),T=Comms.name(h),r=this.rng();h.thDecide=null;h.plan=null;h.thinkT=0;const caught=this.rng()<Math.min(.95,.2+.5*trait(h,'noise')+.35*trait(v,'perc'));
      const brag=['Finders keepers.','Mine now.','You weren\'t using that, right?','Sharing is caring. Mostly for me.','I\'ll hold onto this '+what+' for you.','Slick.'];
      const caughtL=['Hey! Where\'d my '+what+' go?!',T+', did you just...?','Give that back!','I KNOW you took my '+what+'.','Unbelievable.','Check his pockets!'];
      const reply=['Took what?','Never saw it.','It fell. Into my pocket.','Relax, I\'m holding it for you.','Prove it.','Must\'ve been the zombies.'];
      if(!caught){if(r<.5)Comms.bubble(this,h,Comms.pick(brag),true);}   /* got away with it: maybe a smug mutter */
      else{addMood(v,{listen:-3},20,'robbed');v.robbedBy=h;   /* caught: the victim stops listening to the thief's calls for a while */
        if(r<.5)Comms.bubble(this,v,Comms.pick(caughtL),true);else{Comms.bubble(this,v,Comms.pick(caughtL),true);setTimeoutSafe(this,1.1,()=>{if(h.alive)Comms.bubble(this,h,Comms.pick(reply),true);});}}
      this.st8(h).steals=(this.st8(h).steals||0)+1;}
    if(!this.demo)for(const h of this.heroes)if(h.alive&&h.courage&&this.rng()<dt*.02)Comms.bubble(this,h,Comms.pick(['*hic*','Who wants some?!','I can take \'em all!','*hic* ...what?']),true);   /* Liquid Courage */
    /* 0.12.45 (Kyle): a Pickpocket who is truly Selfish (8+) sometimes lifts what a nearby ally is carrying: a medkit, defib, battery or herb.
     Sometimes the thief brags, sometimes the victim notices, sometimes both. */
    /* 0.12.43 Light-Footed <-> Loud: loud units clanking right past a wreck can set its alarm off, and their racket draws lonely zombies in from off-screen */
    if(!this.demo&&!this.over&&!this.exiting)for(const h of this.alive()){if(!h.key)continue;const nz=trait(h,'noise');if(nz<.3)continue;
      if(h.moving)for(const o of this.obst){if(!/^car_/.test(o.k)||o.alarmed||o.alarmT>0)continue;const l=o.lanes.find(l=>Math.abs(LANES[l]-(h.gy||this.G))<=7);if(l==null)continue;const [a,b]=this.obSpan(o,l);
        if(h.x>a-6&&h.x<b+6&&this.rng()<dt*.05*nz*nz*(h.running?2:1)){o.alarmed=true;this.carAlarm(o);Comms.bubble(this,h,Comms.pick(['Oops.','That wasn\'t me!','My bad!']));}}
      if(!this.boss&&this.enemies.filter(e=>!e.dead).length<20&&this.rng()<dt*.012*nz*nz)this.spawnEnemy('zombie',{x:this.W+10+this.rng()*22,elite:'roll',stray:1});}
    // blasts from damaging abilities disturb wrecks near them (no damage to the car)
    for(const f of this.fx){if(f._dist)continue;f._dist=1;const R={boom:22,quake:18,thorn:8,stuck:6,ring:f.r||0}[f.k];if(R)this.disturb(f.x,f.gy!=null?f.gy:(f.y!=null?f.y+10:this.G),R);}this.obst=this.obst.filter(o=>o.x>-50);
    if(scroll&&!this.exiting&&this.dist>=this.obNext&&!(this.boss&&!this.boss.dead)){this.obNext=this.dist+110+this.rng()*230;
      const M=this.mods||{};const wOf=(n,w)=>w*(n==='car_ambulance'?(M.amb||1)*(M.cars||1):/^car_/.test(n)?(M.cars||1):/^(rock|log|stump|trunk)/.test(n)?(M.grove||1):1);
      const tot=OBST_POOL.reduce((s,p)=>s+wOf(p[0],p[1]),0);let r=this.rng()*tot,k='rock_crack';for(const [n,w] of OBST_POOL){if((r-=wOf(n,w))<0){k=n;break;}}const D=OBST[k];
      const x=this.W+40;const near=this.obst.filter(o=>Math.abs(o.x-x)<90);const used=new Set(near.flatMap(o=>o.lanes));
      for(let tries=0;tries<8;tries++){const l=/^car_/.test(k)?1+Math.floor(this.rng()*(3-D.lanes+1)):Math.floor(this.rng()*(LANES.length-D.lanes+1));   /* 0.12.38 (Kyle): cars only in the middle three lanes */const lanes=D.lanes===2?[l,l+1]:[l];const all=new Set([...used,...lanes]);
        if(all.size>2)continue;const arr=[...all].sort();if(arr.length===2&&arr[1]-arr[0]>1&&near.length)continue;   // never two lanes walled off side by side plus another
        this.obst.push({k,x:x+this.rng()*20,lanes,blk:D.blk,flip:/^car_/.test(k)&&this.rng()<.5});   /* cars can face either way */break;}}}
  // keep bodies out of obstacles: IF a unit ends up inside one in its lane THEN push it out the near side
  obClamp(u,isHero){if(!this.obst||!this.obst.length||u.fly||u.boss)return;const gy=u.gy;if(gy==null)return;
    for(const o of this.obst){const l=o.lanes.find(l=>Math.abs(LANES[l]-gy)<3.5);if(l==null)continue;const pad=isHero?3:2;const [a,b]=this.obSpan(o,l);if(u.x>a-pad&&u.x<b+pad)u.x=(u.x-(a+b)/2)>=0?b+pad:a-pad;}}   // where a hero actually stands right now
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
const MUZZLE={cultist:[10,11],robot:[13,17],lumberjack:[12,15],druid:[8,22],chibi:[10,15],archer:[17,16],flannel:[11,14],flannel_pal:[9,13],vile:[3,30],thing:[14,30],kykar:[15,46],dragons:[18,38],mathas:[17,33],marina:[11,25],thranduil:[12,34],joel:[11,33],robots:[18,33],blood:[13,46],mech:[20,30],weather:[14,47]};
const ARC={kunai:16,dart:6};   // how high each kind is tossed above a straight line (ruler units): kunai lobbed, dart a slight drop
const PSPD={void:165,gat:420,buck:380,leaf:190,dart:330,kunai:240,yarrow:230,bullet:420,arrow:200,quarrel:215,bolt:150,orb:135,fire:150,shard:160,zap:170,wisp:120,plasma:180,blood:140,shell:160,frost:145,brick:190};   // px/s   // ranged shots don't shove, except the thrown brick (a little)
const PCOL={void:'#b05cff',gat:'#ffd27a',buck:'#ffe0a0',skull:'#7dff9a',hex:'#c050ff',bolt:'#ffb040',orb:'#c050ff',arrow:'#e8e0c8',quarrel:'#e8e0c8',fire:'#ff8a1f',shard:'#6ff0ff',zap:'#bfefff',wisp:'#7dff9a',plasma:'#3ff0ff',blood:'#ff2a3a',shell:'#ffd23f',frost:'#9ae6ff',brick:'#c0603a'};

// ======================================================================= RUN / PICKS (pure)
function newRun(team,slot){if(slot){slot.gold=0;slot.parts=0;slot._stash=null;for(const k of team){const H=slot.heroes&&slot.heroes[k];if(H&&H.insp&&INSP[H.insp]&&INSP[H.insp].passive==='bankroll')slot.gold+=50;const St=H&&H.insp&&INSP[H.insp]&&INSP[H.insp].stash;if(St){slot.gold+=St.gold||0;slot.parts+=St.parts||0;slot._stash=slot._stash||{food:0,water:0};slot._stash.food+=St.food||0;slot._stash.water+=St.water||0;}}}   /* 0.12.41 (Kyle): every new run starts broke: gold and spare parts reset to 0 */
  if(slot){slot.partySize=3;team=team.slice(0,3);}
  const run={team:team.slice(),stage:1,prestige:0,score:0,xp:0,lv:0,pending:0,rerolls:1,heroes:{},bag:[]};
  if(slot&&slot._stash){run.food=slot._stash.food;run.water=slot._stash.water;delete slot._stash;}   /* deck starting stashes */
  for(const k of team){const d=heroDef(k);run.heroes[k]={hpf:1,dead:false,spells:ABILITIES_OFF||!d.spells.length?[]:[{card:d.spells[0].card,arch:d.spells[0].arch,r:1,augs:[]}],items:[]};}
  return run;
}
function rollRarity(rng,luck,prestige,min){
  const R=CFG.rarity.filter(r=>!(r.minPrestige>prestige));let tot=0;const ws=R.map((r,i)=>{const w=r.w*(i?1+luck*.005:1);tot+=w;return w;});
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
const SAVE_EPOCH=2;   // 0.12.1: runs reset when the roster was cut to two heroes   // bump only for a change so big that runs in progress can't be carried over (hero levels still stay)
function migrateSlot(slot,player){
  for(const h of DATA.heroes)if(h.owner===player&&!slot.heroes[h.key])slot.heroes[h.key]={lvl:1,xp:0};
  for(const k of Object.keys(slot.heroes))if(!heroDef(k))delete slot.heroes[k];
  slot.best=slot.best||{score:0,stage:0,prestige:0};slot.gold=slot.gold||0;
  slot.partySize=3;   /* 0.12.33: 3-hero parties again */
  const run=slot.run;if(!run)return slot;
  if((slot.epoch||1)!==SAVE_EPOCH){slot.run=null;slot.epoch=SAVE_EPOCH;return slot;}
  run.team=run.team.filter(k=>heroDef(k));if(!run.team.length){slot.run=null;return slot;}
  if(run.team.length>3){for(const k of run.team.slice(3))delete run.heroes[k];run.team=run.team.slice(0,3);}
  for(const k of run.team){const d=heroDef(k);const hv=run.heroes[k]=run.heroes[k]||{hpf:1,dead:false,spells:[],items:[]};
    const fix=(list,pool)=>{const out=[];for(const e of list){let m=pool.find(x=>x.card===e.card&&x.arch===e.arch)||pool.find(x=>x.card===e.card);
        if(!m)m=pool.find(x=>x.arch===e.arch&&!out.some(o=>o.card===x.card)&&!list.some(o=>o.card===x.card));
        if(!m)m=pool.find(x=>!out.some(o=>o.card===x.card)&&!list.some(o=>o.card===x.card));
        if(m)out.push(Object.assign({},e,{card:m.card,arch:m.arch,augs:(e.augs||[]).filter(g=>SPELL[m.arch]&&SPELL[m.arch].augs.includes(g)),r:Math.min(CFG.maxRank,e.r||1)}));}
      return out;};
    hv.spells=fix(hv.spells||[],d.spells);hv.items=fix(hv.items||[],d.items).slice(0,CFG.slots.item).map(it=>Object.assign(it,{proc:procFor(it.card),augs:[]}));
    if(!hv.spells.length&&d.spells.length)hv.spells=[{card:d.spells[0].card,arch:d.spells[0].arch,r:1,augs:[]}];}
  for(const k of Object.keys(run.heroes))if(!run.team.includes(k))delete run.heroes[k];
  run.bag=(run.bag||[]).filter(b=>heroDef(b.owner)&&(b.kind==='item'?heroDef(b.owner).items:heroDef(b.owner).spells).some(x=>x.card===b.card)).slice(0,BAG_SIZE);
  if(run.stage>CFG.maxStage)run.stage=CFG.maxStage;
  return slot;}
function newSlot(player){const heroes={};for(const h of DATA.heroes)if(h.owner===player)heroes[h.key]={lvl:1,xp:0};return {epoch:SAVE_EPOCH,partySize:3,gold:0,heroes,best:{score:0,stage:0,prestige:0},runs:0,run:null,created:Date.now()};}

// ======================================================================= exports for node sims

// ======================================================================================================================
// 0.12.38 CAMP (Kyle): food & water upkeep, spare parts, camp upgrades (offered 3 at a time, tiered, roguelike: they last the run),
//   Triage crafting, and level-up stat points. Gold, spare parts, supplies and upgrades all belong to the run (gold and parts reset in newRun).
// ======================================================================================================================
const CAMP_UPG={
  water:{name:'Water Filtration System',icon:'💧',tiers:[100,175,275],txt:t=>`${[25,50,75][t-1]}% chance to give one hungry unit water by itself when you get back to camp.`},
  triage:{name:'Triage Station',icon:'🩺',tiers:[125,200,300],txt:t=>`Build a Medkit (${TRIAGE.med[t-1]} spare parts), a Battery (${TRIAGE.bat[t-1]}) or a Defibrillator (${TRIAGE.defib[t-1]}) for a unit to carry into the next stage. ${t>=3?'Up to 2 builds':'1 build'} per camp.`},
  garden:{name:'Garden Plot',icon:'🌱',tiers:[100,175,275],txt:t=>['50% chance of 1 food each time you get back.','1 food each time you get back.','2 food each time you get back.'][t-1]},
  rain:{name:'Rain Barrels',icon:'🛢️',tiers:[100,175],txt:t=>['50% chance of 1 water each time you get back.','1 water each time you get back.'][t-1]},
  smoker:{name:'Smokehouse',icon:'🍖',tiers:[125],txt:()=>'Smoked rations go further: one food feeds two units.'},
  cots:{name:'Med Cots',icon:'🛏️',tiers:[100,175,275],txt:t=>`Everyone rests up: +${[10,20,30][t-1]}% HP when you get back to camp.`},
  bench:{name:'Weapon Bench',icon:'🔧',tiers:[100,200,325],txt:t=>`+${t} damage on every basic attack, melee and ranged.`},
  gen:{name:'Generator',icon:'🔋',tiers:[100,175,275,400],needs:{4:'radio'},txt:t=>`Everyone regains energy faster: +${[.25,.5,.75,1][t-1]} energy per second.${t===4?' (Tier IV runs off the Radio Tower.)':''}`},
  dummy:{name:'Training Dummy',icon:'🎯',tiers:[100,175,275],txt:t=>`+${[10,20,30][t-1]}% XP for everyone.`},
  shrine:{name:'Lucky Shrine',icon:'🍀',tiers:[100,200],txt:t=>`+${[5,10][t-1]} Luck for everyone (better odds when searching).`},
  board:{name:'Bounty Board',icon:'📌',tiers:[100,175,275],txt:t=>`Gold piles are worth ${[25,50,75][t-1]}% more.`},
  yard:{name:'Scrap Yard',icon:'⚙️',tiers:[100,175],txt:t=>`+${t} spare part${t>1?'s':''} each time you get back.`},
  cutters:{name:'Wire Cutters',icon:'✂️',tiers:[100,175],txt:t=>`Car alarms shut off ${[30,60][t-1]}% faster and give up after ${[22,15][t-1]}s instead of 30s.`},
  lamp:{name:"Scavenger's Lamp",icon:'🔦',tiers:[100,175],txt:t=>`Searching takes ${[25,40][t-1]}% less time.`},
  kennel:{name:'Guard Dog Kennel',icon:'🐕',tiers:[125,200,300],txt:t=>t===1?'A German Shepherd joins every stage. He guards whoever is in the most trouble and bites anything that gets close. Only ever one dog.':`Your dog gets tougher and bites harder: +${[0,25,50][t-1]}% HP, +${[0,15,30][t-1]}% damage, a little quicker.`},
  tower:{name:'Watchtower',icon:'🗼',tiers:[100,175,275],txt:t=>['Scouts the road ahead: each camp, pick 1 of 2 reports to shape the next stage (more ambulances, more loot, fewer zombies...).','3 reports to pick from.','3 reports, and every one is 50% stronger.'][t-1]},
  still:{name:'Moonshine Still',icon:'🫙',tiers:[100,175],txt:t=>`Brew Liquid Courage from ${t===1?2:1} food (${t===1?1:2} per camp). Whoever drinks it fights the next stage with +20% damage, -10 accuracy and steadier nerves. *hic*`},
  radio:{name:'Radio Tower',icon:'📻',tiers:[125,225],txt:t=>`You hear about more: ${t===1?4:5} upgrade offers each camp instead of 3.`},
};
const SCOUT={amb:{name:'Ambulance Route',icon:'🚑',txt:s=>`Ambulances are ${Math.round(1+3*s)}x as likely to turn up.`},
  cars:{name:'Wreck Yard',icon:'🚗',txt:s=>`${Math.round(100*s)}% more wrecked cars (more loot, more alarms).`},
  grove:{name:'Overgrown Path',icon:'🌲',txt:s=>`${Math.round(100*s)}% more rocks, logs and stumps to search.`},
  quiet:{name:'Quiet Road',icon:'🤫',txt:s=>`${Math.round(20*s)}% fewer zombies.`},
  supplies:{name:'Supply Trail',icon:'🥫',txt:s=>`Food and water drop ${Math.round(1+2*s)}x as often.`},
  scrap:{name:'Junk Pile',icon:'⚙️',txt:s=>`Spare parts drop ${Math.round(1+2*s)}x as often.`},
  gold:{name:'Gold Rumors',icon:'💰',txt:s=>`Gold drops ${Math.round(60*s)}% more often, but ${Math.round(15*s)}% more zombies.`}};
function scoutMods(run){const m={amb:1,cars:1,grove:1,foes:1,supply:1,parts:1,gold:1};const id=run&&run.scoutNow;if(!id||!SCOUT[id])return m;const s=run.scoutTier>=3?1.5:1;
  if(id==='amb')m.amb=1+3*s;if(id==='cars')m.cars=1+s;if(id==='grove')m.grove=1+s;if(id==='quiet')m.foes=1-.2*s;if(id==='supplies')m.supply=1+2*s;if(id==='scrap')m.parts=1+2*s;if(id==='gold'){m.gold=1+.6*s;m.foes=1+.15*s;}return m;}
function scoutRoll(run){const t=upgT(run,'tower');if(!t)return null;const k=Object.keys(SCOUT).sort(()=>Math.random()-.5);return k.slice(0,t===1?2:3);}
function brewCourage(run,k){const t=upgT(run,'still');if(!t)return 'no';if((run.brewN||0)>=(t===1?1:2))return 'max';const cost=t===1?2:1;if((run.food||0)<cost-1e-9)return 'food';
  const cr=run.heroes[k].carry=run.heroes[k].carry||{kit:[]};if(cr.courage)return 'has';cr.courage=1;run.food=Math.round((run.food-cost)*2)/2;run.brewN=(run.brewN||0)+1;return 'ok';}
const TRIAGE={med:[15,13,11],bat:[12,10,8],defib:[25,22,19],max:[1,1,2]};
const LVPTS={hp:{name:'Toughness',icon:'❤️',txt:'+4% max HP'},dmg:{name:'Power',icon:'⚔️',txt:'+3% damage'},acc:{name:'Aim',icon:'🎯',txt:'+2 accuracy'},
  crit:{name:'Edge',icon:'✴️',txt:'+1% crit chance'},luck:{name:'Fortune',icon:'🍀',txt:'+3 Luck'},armor:{name:'Hide',icon:'🛡️',txt:'+1 armor point'}};
/* 0.12.53 (Kyle): anyone can try to defuse a mine; a failure sets it off. Sapper makes it far safer, and fiddly-job traits help:
   Slow and Steady (biggest), Techy, Steady nerves, Optimal, and a little Luck. */
function defuseOdds(h){const sap=hasPerk(h,'sapper');let s=sap?.82:.30;s+=.24*(trait(h,'tech')-.5)+.2*(.5-trait(h,'pace'))+.16*(.5-trait(h,'nerve'))+.12*(trait(h,'exec')-.5)+.006*((h.luck||15)-15);return Math.max(.05,Math.min(.97,s));}
function hasPerk(u,p){const I=u&&u.insp&&INSP[u.insp];return !!(I&&I.perk===p);}
function upgT(run,id){return (run&&run.upg&&run.upg[id])||0;}
function lvPtsFree(H){const used=Object.values(H.pts||{}).reduce((a,b)=>a+b,0);return Math.max(0,(H.lvl||1)-1-used);}
function campOffers(run){const n=3+upgT(run,'radio');const pool=Object.keys(CAMP_UPG).filter(id=>{const t=upgT(run,id),U=CAMP_UPG[id];if(t>=U.tiers.length)return false;const nd=U.needs&&U.needs[t+1];return !nd||upgT(run,nd)>0;});
  const out=[];const bag=pool.slice();while(out.length<n&&bag.length){const i=Math.floor(Math.random()*bag.length);out.push(bag.splice(i,1)[0]);}return out;}
function upgPrice(run,id){const t=upgT(run,id);const h=run.haggle||0;return Math.round(CAMP_UPG[id].tiers[t]*(1-h));}
function resourcefulOf(s,run){return run.team.some(k=>{const H=s.heroes[k];return H&&H.insp&&INSP[H.insp]&&INSP[H.insp].passive==='resourceful';});}
function upgParts(run,id){return Math.ceil(upgPrice(run,id)/4);}
function haggleOf(s,run){const n=run.team.filter(k=>{const H=s.heroes[k];return H&&H.insp&&INSP[H.insp]&&INSP[H.insp].passive==='haggler';}).length;return n?.2:0;}   /* 0.12.46 (Kyle): 20% off, doesn't stack */
/* back at camp after a cleared stage: the camp's own systems run once, then the player feeds whoever is still hungry */
function campArrive(s,run){if(run.campAt===run.stage)return [];run.campAt=run.stage;const log=[];
  run.food=run.food||0;run.water=run.water||0;s.parts=s.parts||0;run.fed={};run.triageN=0;run.brewN=0;run.upgBought=0;run.offers=campOffers(run);run.scoutOffers=scoutRoll(run);run.scoutPick=null;
  const hungry=(run.needFeed||[]).filter(k=>run.team.includes(k));run.needFeed=hungry;
  const g=upgT(run,'garden');if(g){const n=g===1?(Math.random()<.5?1:0):g===2?1:2;if(n){run.food+=n;log.push(`🌱 Garden: +${n} food`);}}
  const r=upgT(run,'rain');if(r){const n=r===1?(Math.random()<.5?1:0):1;if(n){run.water+=n;log.push(`🛢️ Rain Barrels: +1 water`);}}
  const y=upgT(run,'yard');if(y){s.parts+=y;log.push(`⚙️ Scrap Yard: +${y} spare part${y>1?'s':''}`);}
  const w=upgT(run,'water');if(w&&hungry.length&&Math.random()<[.25,.5,.75][w-1]){const k=hungry[Math.floor(Math.random()*hungry.length)];run.fed[k]='auto';log.push(`💧 Water Filtration gave ${heroDef(k).name} water`);}
  const cb=upgT(run,'cots');if(cb){for(const k of run.team){const hv=run.heroes[k];if(!hv.dead)hv.hpf=Math.min(1,(hv.hpf==null?1:hv.hpf)+[.1,.2,.3][cb-1]);}log.push(`🛏️ Med Cots: everyone +${[10,20,30][cb-1]}% HP`);}
  return log;}
function feedUnit(run,k,what){if(run.fed[k]||!(run.needFeed||[]).includes(k))return false;
  if(what==='water'){if(run.water<1)return false;run.water-=1;}else{const cost=upgT(run,'smoker')?.5:1;if(run.food<cost-1e-9)return false;run.food=Math.round((run.food-cost)*2)/2;}
  run.fed[k]=what;return true;}
/* leaving camp: anyone still hungry starts the next stage with 10% less of their current HP (max HP untouched) */
function campDepart(run){run.scoutNow=run.scoutPick||null;run.scoutTier=upgT(run,'tower');run.scoutOffers=null;run.scoutPick=null;const starved=[];for(const k of run.needFeed||[]){if(run.fed&&run.fed[k])continue;const hv=run.heroes[k];if(hv.dead)continue;hv.hpf=Math.max(.05,(hv.hpf==null?1:hv.hpf)*.9);starved.push(k);}
  run.needFeed=[];run.fed={};return starved;}
function triageBuild(s,run,what,k){const t=upgT(run,'triage');if(!t)return 'no';if((run.triageN||0)>=TRIAGE.max[t-1])return 'max';const cost=TRIAGE[what][t-1];if((s.parts||0)<cost)return 'parts';
  const cr=run.heroes[k].carry=run.heroes[k].carry||{kit:[]};
  if(what==='med'){if(cr.medkit)return 'has';cr.medkit=1;}else if(what==='defib'){if(cr.defib)return 'has';cr.defib=1;}else{cr.kit=cr.kit||[];if(cr.kit.length>=2)return 'has';cr.kit.push('bat');}
  s.parts-=cost;run.triageN=(run.triageN||0)+1;return 'ok';}

const API={reticle,ABIL_DESC,HEADSHOT,isHead,inspHelp,PLAYER_ICON,BEHAVIOR,INSP,inspText,CHAR,AIM_BOXES,aimOdds,aimBoxesOf,hbOf,HERO_HITBOX,ENERGY,spendEnergy,faceToward,AIM_RANGE,accTighten,LANES,UNIT_SCALE,HITBOX,aimBands,airBands,rollAirAim,rollAimHeight,rollLaneOffset,ABILITIES_OFF,armorReduction,HP_PER_STAMINA,gearScore,heroGear,giveItem,rollItem,stockShop,itemPrice,honePrice,slotCaps,equip,unequip,discard,typeOf,BAG_SIZE,migrateSlot,CFG,STYLE,SIG,SPELL,ITEM,PROCS,Game,newRun,offers,applyOffer,describe,heroBase,heroDef,DATA,newSlot,needHeroXp};
if(typeof module!=='undefined'&&module.exports){module.exports=API;}
if(typeof document==='undefined')return;

// ======================================================================= UI (browser only)
const IMG=new Image();IMG.src='crawl.png?v=1793900662';const BGI=new Image();BGI.src='crawl_bg.png?v=1793900662';
const SP=ATLAS.sprites,BGA=ATLAS.bg,RES=ATLAS.res||1;const UNITS=ATLAS.units||{};const UIMG=new Image();UIMG.src='crawl_units.png?v=1793900662';const RAIN={f:{fw:5,fh:18,n:1,ax:2,ay:17,x:0,y:0,img:'rain'},s:{fw:5,fh:11,n:1,ax:2,ay:10,x:8,y:7,img:'rain'}};
const CAMPF={fw:34,fh:40,ax:17,ay:37,y:0,img:'camp'};
const XIMG={cars:new Image(),cultist:new Image(),tentacle:new Image(),robot:new Image(),obst:new Image(),lumberjack:new Image(),camp:new Image(),druid:new Image(),tornado:new Image(),vine:new Image(),thorn:new Image(),rain:new Image(),flannel:new Image(),boom:new Image(),pal:new Image(),chibi:new Image(),wave:new Image(),archer:new Image()};XIMG.archer.src='crawl_archer.png?v=1793900662';XIMG.wave.src='crawl_wave.png?v=1793900662';XIMG.chibi.src='crawl_chibi.png?v=1793900662';XIMG.flannel.src='crawl_flannel.png?v=1793900662';XIMG.rain.src='crawl_rain.png?v=1793900662';XIMG.druid.src='crawl_druid.png?v=1793900662';XIMG.camp.src='crawl_campfire.png?v=1793900662';XIMG.lumberjack.src='crawl_lumberjack.png?v=1793900662';XIMG.tornado.src='crawl_fx_tornado.png?v=1793900662';XIMG.vine.src='crawl_fx_vine.png?v=1793900662';XIMG.thorn.src='crawl_fx_thorn.png?v=1793900662';
const TORN={fw:96,fh:96,n:16,ax:48,ay:90,x:0,y:0,img:'tornado',art:1},VINE={fw:260,fh:116,n:7,ax:130,ay:110,x:0,y:0,img:'vine',art:1};
const THORNS=[[0,35,53],[37,67,79],[106,36,82],[144,87,74]].map(([x,w,h])=>({fw:w,fh:h,n:1,ax:w/2,ay:81,x,y:82-h,img:'thorn',art:1}));XIMG.pal.src='crawl_pal.png?v=1793900662';XIMG.dog=new Image();XIMG.dog.src='crawl_dog.png?v=1793900662';XIMG.obst.src='crawl_obst.png?v=1793900662';XIMG.cars.src='crawl_cars.png?v=1793900662';XIMG.robot.src='crawl_robot.png?v=1793900662';XIMG.cultist.src='crawl_cultist.png?v=1793900662';XIMG.tentacle.src='crawl_tentacle.png?v=1793900662';XIMG.boom.src='crawl_boom.png?v=1793900662';
const WAVE={fw:110,fh:68,n:1,ax:48,ay:63,x:0,y:0,img:'wave'};   // Wave Dash energy wave (3 flickering frames)
const BOOM={fw:128,fh:131,n:15,ax:64,ay:128,x:0,y:0,img:'boom',art:1};   // explosion frames from Kyle's sheet (15 frames, half size)
const ART_SCALE=21/152;   // full-detail character art drawn at the in-game size Kyle liked (his 152px-tall art = 21 world px)
const GQ=2;   // the game canvas renders at 2x its old pixel density so full-detail art stays clean (pixel art still draws crisp)
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>Math.round(n).toLocaleString('en-US');
// ---------------------------------------------------------------- sound (tiny WebAudio blips)
let AC=null,muted=false;try{muted=localStorage.getItem('podrundown-crawl-mute')==='1';}catch(e){}
// ---- 0.12.35 music: one original track (Night Shift, made for the game) + four dark-synth tracks from OpenGameArt (all CC0 / public domain),
//   streamed from OpenGameArt like the old loop. ⏭ cycles them; a track that won't load is skipped automatically.
const OGA='https://opengameart.org/sites/default/files/';
const TRACKS=[{name:'Night Shift',by:'made for Crypt Crawl',info:'gritty pulse + sax',src:['music/nightshift.ogg','music/nightshift.mp3']},
  {name:'Dark Night',by:'Alex McCulloch (Pro Sensory)',info:'dark synthwave rock',src:[OGA+'dark_night.mp3']},
  {name:'Nova',by:'SpringySpringo',info:'melancholy dark synthwave',src:[OGA+'nova.mp3']},
  {name:'Futility Belt',by:'iamoneabe',info:'long darksynth / synthpop',src:[OGA+'futilitybelt.mp3']},
  {name:'Dark Things',by:'iamoneabe',info:'short dark synth loop',src:[OGA+'dark_things_loop.mp3']}];
let BGM=null,musicMuted=false,musicVol=.45,trackI=0,trackFails=0;try{musicMuted=localStorage.getItem('podrundown-crawl-music-mute')==='1';const v=localStorage.getItem('podrundown-crawl-music-vol');if(v!=null)musicVol=+v;
  const ti=+localStorage.getItem('podrundown-crawl-music-track');if(ti>=0&&ti<TRACKS.length)trackI=ti;}catch(e){}
function trackSrc(i){const s=TRACKS[i].src;const a=new Audio();return s.find(x=>!x.endsWith('.ogg')||a.canPlayType('audio/ogg; codecs="vorbis"'))||s[s.length-1];}
function musicStart(){try{if(!BGM){BGM=new Audio();BGM.loop=true;BGM.preload='auto';
      BGM.addEventListener('error',()=>{if(++trackFails<TRACKS.length){const T=musicNext(true);if(typeof flash==='function'&&!root.hidden)flash('♫ couldn\'t load that one, now: '+T.name,1800);}});
      BGM.addEventListener('playing',()=>{trackFails=0;});BGM.src=trackSrc(trackI);}
  BGM.volume=musicVol;if(!musicMuted&&musicVol>0)BGM.play().catch(()=>{});else BGM.pause();}catch(e){}}
function musicNext(auto){trackI=(trackI+1)%TRACKS.length;if(!auto)trackFails=0;try{localStorage.setItem('podrundown-crawl-music-track',trackI);}catch(_){}
  try{if(BGM){BGM.pause();BGM.src=trackSrc(trackI);BGM.load();}}catch(e){}musicStart();try{const tb=document.querySelector('#cc [data-a="track"]');if(tb)tb.title='Next track (now: '+TRACKS[trackI].name+')';}catch(_){}return TRACKS[trackI];}
function musicStop(){try{if(BGM)BGM.pause();}catch(e){}}
function sfx(k){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;
  const tone=(f,d,type,v,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(v||.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d);};
  if(k==='hit')tone(180,.06,'square',.025,90);if(k==='crit')tone(520,.1,'square',.04,180);
  if(k==='level'){[523,659,784,1046].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='square';o.frequency.value=f;g.gain.setValueAtTime(.04,t+i*.07);g.gain.exponentialRampToValueAtTime(.0001,t+i*.07+.12);o.connect(g);g.connect(AC.destination);o.start(t+i*.07);o.stop(t+i*.07+.13);});}
  if(k==='gun'||k==='biggun'){const big=k==='biggun',d=big?.45:.16,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);
    for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*Math.pow(1-i/n,big?2.2:3.5);
    const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=buf;f.type='lowpass';f.frequency.value=big?2400:1800;g.gain.value=big?.55:.16;
    s.connect(f);f.connect(g);g.connect(AC.destination);s.start(t);tone(big?90:140,big?.35:.12,'sine',big?.35:.09,big?32:60);if(big)tone(1400,.06,'square',.03,500);}
  if(k==='boom'){const d=1.1,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*Math.pow(1-i/n,1.6);
    const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=buf;f.type='lowpass';f.frequency.setValueAtTime(1600,t);f.frequency.exponentialRampToValueAtTime(220,t+d);g.gain.value=.7;
    s.connect(f);f.connect(g);g.connect(AC.destination);s.start(t);tone(60,.8,'sine',.5,24);}
  if(k==='dash'){tone(240,.25,'sawtooth',.05,900);tone(1200,.2,'sine',.04,300);}
  if(k==='shout'){tone(160,.5,'sawtooth',.07,120);tone(240,.45,'square',.04,200);}
  if(k==='bow'){tone(320,.09,'triangle',.06,120);tone(900,.05,'sine',.03,400);}
  if(k==='heal'){[660,880,1320].forEach((f,i)=>{const o=AC.createOscillator(),gn=AC.createGain();o.type='sine';o.frequency.value=f;gn.gain.setValueAtTime(.035,t+i*.06);gn.gain.exponentialRampToValueAtTime(.0001,t+i*.06+.25);o.connect(gn);gn.connect(AC.destination);o.start(t+i*.06);o.stop(t+i*.06+.26);});}
  if(k==='thorns'){tone(110,.35,'square',.06,50);tone(70,.4,'sawtooth',.05,40);}
  if(k==='wind'){const d=1.6,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/n);
    const s2=AC.createBufferSource(),f2=AC.createBiquadFilter(),g2=AC.createGain();s2.buffer=buf;f2.type='bandpass';f2.frequency.setValueAtTime(500,t);f2.frequency.linearRampToValueAtTime(1400,t+d);g2.gain.value=.25;s2.connect(f2);f2.connect(g2);g2.connect(AC.destination);s2.start(t);}
  if(k==='camp'){tone(1800,.04,'square',.03,1200);setTimeout(()=>tone(220,.6,'triangle',.05,120),180);}
  if(k==='whoosh'){tone(300,.18,'sawtooth',.03,90);}
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
  if(e.leapA&&U.jump){const v=e.leapA.t/e.leapA.dur;const J=v<.5?U.jump:U.fall;return [Object.assign({},J,{ay:U.walk.ay-Math.round(Math.sin(Math.PI*Math.min(1,v))*14)}),Math.min(J.n-1,Math.floor((v<.5?v*2:(v-.5)*2)*J.n))];}   // leap arc
  if(A===U.atk){const dur=e.E.animAtk||.3;fr=Math.min(A.n-1,Math.floor((1-e.animT/dur)*A.n));return [A,fr];}
  if(U.idle&&e.moving===false)return [U.idle,Math.floor(e.walkT*6)%U.idle.n];
  return [A,Math.floor(e.walkT*(e.E.fps||7))%A.n];}
function drawUnit(ctx,A,fr,x,gy,sc,alpha,flash,rot,flip){const IM=A.img?XIMG[A.img]:UIMG;if(!IM||!IM.complete)return;ctx.save();ctx.translate(Math.round(x*RES)/RES,Math.round(gy*RES)/RES);if(rot)ctx.rotate(rot);ctx.scale(flip?-sc:sc,sc);if(alpha!=null)ctx.globalAlpha=alpha;
  if(A.art){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';}const sx=A.x+fr*A.fw;ctx.drawImage(IM,sx,A.y,A.fw,A.fh,-A.ax,-A.ay-1,A.fw,A.fh);
  if(flash>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,flash*6)*.7;ctx.drawImage(IM,sx,A.y,A.fw,A.fh,-A.ax,-A.ay-1,A.fw,A.fh);}ctx.restore();}
function drawBG(ctx,g,W,oy){
  // layered parallax backdrops (Ansimuz packs): each layer scrolls at its own speed, the walking path at full speed
  const b=BGA[g.st.biome.id]||BGA.grave;const d=g.dist+(g.demo?g.t*8:0);
  // tall night sky above the (smaller) backdrop art: a gradient up to darker, with a few stars
  {const gr=ctx.createLinearGradient(0,-oy,0,(b.artTop||0)-oy+20);gr.addColorStop(0,b.top||b.fill);gr.addColorStop(1,b.fill);ctx.fillStyle=gr;ctx.fillRect(0,0,W,CFG.H);
   ctx.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<40;i++){const sx=((i*97+13)%W),sy=((i*53)%Math.max(8,(b.artTop||60)-6))-oy;if(sy>0&&(i+Math.floor(g.t*1.5))%7)ctx.fillRect(Math.round(sx-((d*.01)%W+W)%W+W)%W,sy,1,1);}}
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
const HS=UNIT_SCALE;   // units, effects and projectiles are drawn at half size so the world reads bigger
function shrinkAt(ctx,x,y,s){ctx.translate(x,y);ctx.scale(s,s);ctx.translate(-x,-y);}
// 0.11 unit status plate: framed health bar (a tick every 10 HP), energy bar under it, and status pips above it
const PIPS=[['poulticeT','#9ae08a','drop'],['rageT','#ff3a2a','up'],['cozyT','#ffb040','up'],['poisonT','#6aff4a','drop'],['shoutT','#ff7a1a','up'],['bleedT','#d01830','drop'],['burnT','#ff8a1f','flame'],['slow','#9ae6ff','snow'],['stun','#ffffff','star'],['shield','#7fd8ff','shield'],['buffT','#ffd23f','up']];
function pip(ctx,x,y,c,k){ctx.fillStyle='#120a14';ctx.fillRect(x-1,y-1,5,5);ctx.fillStyle=c;
  if(k==='drop'){ctx.fillRect(x+1,y,1,1);ctx.fillRect(x,y+1,3,2);}else if(k==='flame'){ctx.fillRect(x+1,y,1,1);ctx.fillRect(x,y+1,3,1);ctx.fillRect(x+1,y+2,1,1);}
  else if(k==='snow'){ctx.fillRect(x+1,y,1,3);ctx.fillRect(x,y+1,3,1);}else if(k==='star'){ctx.fillRect(x,y,1,1);ctx.fillRect(x+2,y,1,1);ctx.fillRect(x+1,y+1,1,1);ctx.fillRect(x,y+2,1,1);ctx.fillRect(x+2,y+2,1,1);}
  else if(k==='shield'){ctx.fillRect(x,y,3,2);ctx.fillRect(x+1,y+2,1,1);}else{ctx.fillRect(x+1,y,1,3);ctx.fillRect(x,y+1,3,1);}}
function plate(ctx,u,x,y,w,hero,col){x=Math.round(x-w/2);y=Math.round(y);const pct=Math.max(0,Math.min(1,u.hp/u.max));
  ctx.fillStyle='#120a14';ctx.fillRect(x-1,y-1,w+2,hero?6:4);ctx.fillStyle='#3a1a24';ctx.fillRect(x,y,w,2);
  ctx.fillStyle=col||(pct>.5?'#4fd46a':pct>.25?'#ffb020':'#e8303a');ctx.fillRect(x,y,Math.round(w*pct),2);
  if(u.max>=20){ctx.fillStyle='rgba(18,10,20,.55)';const n=Math.floor(u.max/10);for(let i=1;i<n;i++){const tx=x+Math.round(w*i*10/u.max);if(tx<x+w)ctx.fillRect(tx,y,1,1);}}
  if(hero){const e=u.enMax?Math.max(0,(u.en||0)/u.enMax):1;ctx.fillStyle='#2a2410';ctx.fillRect(x,y+3,w,1);ctx.fillStyle='#ffd23f';ctx.fillRect(x,y+3,Math.round(w*e),1);}
  let px=x;for(const [k,c,sh] of PIPS)if(u[k]>0){pip(ctx,px+1,y-6,c,sh);px+=5;}}
function drawGame(ctx,g,W,oy){
  const RR=ctx.canvas.width/W;ctx.setTransform(RR,0,0,RR,0,0);ctx.imageSmoothingEnabled=false;ctx.save();
  if(g.shake>0)ctx.translate(Math.round((Math.random()-.5)*4*g.shake),Math.round((Math.random()-.5)*3*g.shake));
  drawBG(ctx,g,W,oy);ctx.translate(0,-oy);const G=g.G;
  for(const l of g.loot||[]){const x=Math.round(l.x),y=(l.gy||G)-1;ctx.save();shrinkAt(ctx,x,y+1,HS);
    if(l.kind==='gold'){const n=l.big?7:4;ctx.fillStyle='#7a5a10';ctx.fillRect(x-n,y-2,n*2,2);ctx.fillStyle='#d9a836';for(let i=0;i<n;i++)ctx.fillRect(x-n+1+i*2,y-3-(i%2),2,2);ctx.fillStyle='#ffe27a';ctx.fillRect(x-1,y-5,2,2);
      if(Math.floor(g.t*4+l.x)%3===0){ctx.fillStyle='#ffffff';ctx.fillRect(x+2,y-7,1,1);}}
    else if(l.kind==='food'){ctx.fillStyle='#3a2a18';ctx.fillRect(x-3,y-7,6,7);ctx.fillStyle='#b07a3a';ctx.fillRect(x-2,y-6,4,5);ctx.fillStyle='#e8d0a0';ctx.fillRect(x-2,y-5,4,2);ctx.fillStyle='#d8d8d8';ctx.fillRect(x-3,y-8,6,1);}   /* a tin can */
    else if(l.kind==='water'){ctx.fillStyle='#1a2a38';ctx.fillRect(x-2,y-9,4,9);ctx.fillStyle='#7fd0ff';ctx.fillRect(x-1,y-7,2,6);ctx.fillStyle='#e8f6ff';ctx.fillRect(x-1,y-10,2,2);}   /* a bottle */
    else if(l.kind==='parts'){ctx.fillStyle='#2a2a2e';ctx.fillRect(x-4,y-4,8,4);ctx.fillStyle='#9aa0a8';ctx.fillRect(x-3,y-3,3,2);ctx.fillRect(x+1,y-4,2,3);ctx.fillStyle='#c87a3a';ctx.fillRect(x-1,y-5,2,2);}   /* a little pile of bolts and gears */
    else{const c=(CFG.rarity.find(r=>r.id===l.item.rar)||CFG.rarity[0]).col;const by=Math.round(Math.sin(g.t*4)*1.5);glow(ctx,x,y-6+by,7,c,.25);
      ctx.fillStyle='#5a3a1a';ctx.fillRect(x-4,y-8+by,8,6);ctx.fillStyle=c;ctx.fillRect(x-4,y-8+by,8,2);ctx.fillRect(x-1,y-6+by,2,2);ctx.fillStyle='#ffffff';ctx.fillRect(x+3,y-11+by,1,1);}ctx.restore();}
  for(const z of g.zones||[]){const k=Math.min(1,z.t/z.T);const pulse=.25+.25*Math.sin(g.t*18);ctx.save();
    ctx.fillStyle=z.c;ctx.globalAlpha=z.t>=z.T?.6*(1-(z.t-z.T)/.25):(.12+.25*k+pulse*.3*k);ctx.beginPath();ctx.ellipse(z.cx,G+2,z.hw,6,0,0,7);ctx.fill();
    ctx.globalAlpha=.9;ctx.strokeStyle=z.c;ctx.beginPath();ctx.ellipse(z.cx,G+2,z.hw*k,6*k,0,0,7);ctx.stroke();ctx.restore();}
  // minions
  for(const m of g.minions){ctx.save();shrinkAt(ctx,m.x,G,HS);const n=MINI[m.kind]||'e_ghost';const a=SP[n];shadow(ctx,m.x,G,6);
    const sc=(m.small?.5:.62)*(1+.15*(m.stacks||0));ctx.save();ctx.translate(m.x,G-(n==='e_skeleton'?60:44)*sc);ctx.scale(sc,sc);spr(ctx,n,m.animT>0?6+Math.min(2,Math.floor((.3-m.animT)/.1)):Math.floor(g.t*(m.moving?16:6))%6,-FW(a)/2,0,true,.9,m.hitFlash);ctx.restore();
    const mw=12,mp=Math.max(0,m.hp/m.max);ctx.fillStyle='#120a14';ctx.fillRect(Math.round(m.x-mw/2)-1,Math.round(G-(n==='e_skeleton'?60:44)*sc)-3,mw+2,3);ctx.fillStyle='#7dff9a';ctx.fillRect(Math.round(m.x-mw/2),Math.round(G-(n==='e_skeleton'?60:44)*sc)-2,Math.round(mw*mp),1);ctx.restore();}
  // heroes (back to front)
  const hs=g.heroes.concat((g.pets||[]).filter(p=>p.alive)).sort((a,b)=>a.x-b.x);
  for(const h of hs)if(!h.alive&&h.downed){const gy=h.gy||G,k=Math.min(1,(h.revT||0)/(h.revNeed||5)),p=.5+.5*Math.sin(g.t*5);ctx.save();ctx.strokeStyle=`rgba(125,255,154,${.25+.2*p})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(h.x,gy-20,4,0,7);ctx.stroke();
    if(k>0){ctx.strokeStyle='#7dff9a';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(h.x,gy-20,4,-Math.PI/2,-Math.PI/2+k*6.283);ctx.stroke();}ctx.fillStyle='#7dff9a';ctx.fillRect(h.x-.5,gy-22,1,4);ctx.fillRect(h.x-2,gy-20.5,4,1);ctx.restore();}   // downed: a + to help them up, filling as an ally stands on them
  for(const h of hs)if(!h.alive){const gy=h.gy||G;ctx.save();shrinkAt(ctx,h.x,gy,HS);const U=UNITS[h.key];if(U&&U.death)drawUnit(ctx,U.death,U.death.n-1,h.x,gy-(U.death.fall?2:0),U.death.pre?ART_SCALE/U.death.pre/HS:U.death.art?ART_SCALE/HS:1,.9,0,U.death.fall?((h.face||1)>0?1.45:-1.45):0,(h.face||1)>0);else spr(ctx,'h_'+h.key,10,h.x-32,gy-60,false,.85);ctx.restore();}
  for(const f of g.fx)if(f.k==='corpse'&&UNITS[f.skin||f.type]){ctx.save();shrinkAt(ctx,f.x,f.gy!=null?f.gy:G,HS);ctx.restore();const U=UNITS[f.skin||f.type],k=f.t/f.life;const fall=Math.min(1,k*3.2);
    if(U.die){const fr=Math.min(U.die.n-1,Math.floor(k/.7*U.die.n));const E2=CFG.enemies[f.type]||{};drawUnit(ctx,U.die,fr,f.x,f.gy!=null?f.gy:G,HS*(E2.scale||1)*(f.elite?1.1:1),k>.75?(1-k)*4:1,0,0);continue;}
    drawUnit(ctx,U.walk,0,f.x+fall*3,f.gy!=null?f.gy:G+(f.lane||0),HS*(f.elite?1.1:1),Math.min(1,2.2*(1-k)),0,-fall*Math.PI/2*.96);}
  for(const f of g.fx)if(f.k==='corpse'){const n='e_'+f.type,a=SP[n];if(!a||UNITS[f.type])continue;const k=f.t/f.life;const big=FH(a)===64;
    const y=f.fly?Math.min(G-44,f.y-FH(a)/2+f.t*160):G-(big?60:44)+(f.lane||0);ctx.save();if(f.elite){ctx.translate(f.x,y+FH(a));ctx.scale(1.22,1.22);spr(ctx,n,10,-FW(a)/2,-FH(a),false,Math.min(1,2.2*(1-k)));}else spr(ctx,n,10,f.x-FW(a)/2,y,false,Math.min(1,2.2*(1-k)));ctx.restore();}
  const laser=()=>{for(const h of g.heroes){const K=h.cast;if(!h.alive||!K||!K.tgt||K.tgt.dead)continue;const T=K.tgt,mz=MUZZLE[h.key]||[10,30];
      const x0=g.heroX(h)+(h.face<0?-1:1)*mz[0],y0=(h.gy||g.G)-mz[1],tx=T.x,ty=(T.gy!=null&&!T.fly?T.gy:g.G)-(T.type==='werewolf'?18:38)*HS*((T.E&&T.E.scale)||1);
      const k=K.t/K.T;ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(255,40,40,${.35+.45*k})`;ctx.lineWidth=.6+k*.6;ctx.setLineDash(k>.75?[]:[3,2]);
      ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(tx,ty);ctx.stroke();ctx.setLineDash([]);glow(ctx,tx,ty,3+3*k,'#ff2828',.35+.3*Math.sin(g.t*30));ctx.restore();}};
  const traps=()=>{const T0=UNITS.flannel&&UNITS.flannel.tripbomb;if(!T0)return;for(const T of g.traps||[]){ctx.save();shrinkAt(ctx,T.x,T.gy,HS);
      drawUnit(ctx,T0,0,T.x,T.gy,.5,T.t<T.A.arm?.55+.45*Math.sin(g.t*20)**2:1,0,0,false);ctx.restore();}};
  // Wave Dash: a blue crescent of energy (about 1.5x his height) riding his sword, with fading afterimages
  // Wave Dash: Kyle's wave shape (tall front crescent he rides in, jagged tail along the ground), pixel art, with afterimages
  // Wave Dash: Kyle's wave (his pick of the three), riding ahead of the warrior, with afterimages and lightning crackling around it
  const zap=(x0,y0,len,ang)=>{ctx.beginPath();ctx.moveTo(x0,y0);let x=x0,y=y0;const n=4;for(let i=0;i<n;i++){x+=Math.cos(ang)*len/n+(Math.random()-.5)*3;y+=Math.sin(ang)*len/n+(Math.random()-.5)*3;ctx.lineTo(x,y);}ctx.stroke();};
  const waves=()=>{for(const h of g.alive()){const D=h.dash;if(!D)continue;const G0=h.gy||g.G,fl=(h.face||1)<0,s=fl?-1:1;
      D.trail.forEach((x,i)=>drawUnit(ctx,WAVE,0,x,G0,.5,.12+.1*i/D.trail.length,0,0,fl));
      ctx.save();ctx.globalCompositeOperation='lighter';drawUnit(ctx,WAVE,0,h.x,G0,.5,.5,0,0,fl);ctx.restore();drawUnit(ctx,WAVE,0,h.x,G0,.5,.88,0,0,fl);
      ctx.save();ctx.globalCompositeOperation='lighter';
      for(let k=0;k<4;k++){const t=Math.random();const cx=h.x+s*(9+14*Math.sin(t*Math.PI)+Math.random()*4),cy=G0-1-t*32;   // along the front crescent
        ctx.strokeStyle=k%2?'rgba(170,230,255,.9)':'rgba(255,255,255,.95)';ctx.lineWidth=.5;zap(cx,cy,4+Math.random()*6,Math.random()*6.28);}
      for(let k=0;k<2;k++){const tx=h.x-s*(4+Math.random()*24);ctx.strokeStyle='rgba(140,210,255,.8)';ctx.lineWidth=.5;zap(tx,G0-2-Math.random()*6,3+Math.random()*4,-Math.PI/2+(Math.random()-.5));}   // along the tail
      if(Math.random()<.5)glow(ctx,h.x+s*(14+Math.random()*8),G0-6-Math.random()*24,2.5,'#e8fbff',.6);ctx.restore();}};
  // Arrow_Rain: arrows falling out of the sky, and the ones stuck in the ground
  const rainDraw=()=>{for(const f of g.fx)if(f.k==='stuck'){const k=f.t/f.life;drawUnit(ctx,RAIN.s,0,f.x,f.gy+1,.5,k>.7?(1-k)/.3:1,0,0,false);}
    for(const R of g.rain||[]){if(R.t<0)continue;const k=Math.min(1,R.t/R.T);drawUnit(ctx,RAIN.f,0,R.x,R.gy-(1-k)*90,.5,1,0,0,false);}};
  // Druid effects: Mend sparkle, Bloom vine heart on the healed ally, Thorn Eruption spikes, Cyclone tornadoes
  // 0.12.17 Moss_Mech effects: arc blade glow and slashes, chain lightning, missiles and their smoke trails, grenades and smoke clouds
  const zig=(x0,y0,x1,y1,n,amp)=>{ctx.beginPath();ctx.moveTo(x0,y0);for(let i=1;i<n;i++){const k=i/n;ctx.lineTo(x0+(x1-x0)*k+(Math.random()*2-1)*amp*.4,y0+(y1-y0)*k+(Math.random()*2-1)*amp);}ctx.lineTo(x1,y1);ctx.stroke();};
  const puffAt=(x,y,r,a,shade)=>{ctx.globalAlpha=a;ctx.fillStyle=shade||'#c9d2da';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.fillStyle='#eef3f6';ctx.beginPath();ctx.arc(x-r*.3,y-r*.35,r*.55,0,7);ctx.fill();ctx.globalAlpha=1;};
  const robotFx=()=>{
    for(const h of g.alive())if(h.key==='robot'){const d=(h.face||1),bx=g.heroX(h)-d*-6.5*-1,by=(h.gy||g.G)-8;ctx.save();ctx.globalCompositeOperation='lighter';   // the arc blade hums blue
      const sx=g.heroX(h)+d*13,sy=(h.gy||g.G)-13;glow(ctx,sx,sy,h.surgeT>0?6.5:4.2,'#2aa8ff',h.surgeT>0?.32:.18);
      if(Math.random()<(h.surgeT>0?.9:.35)){ctx.strokeStyle=h.surgeT>0?'rgba(200,240,255,.95)':'rgba(120,210,255,.8)';ctx.lineWidth=.5;zig(sx-d*2,sy-3,sx+d*(2+Math.random()*3),sy+2+Math.random()*2,3,1.2);}
      if(h.gatFlash>0){h.gatFlash-=1/60;const mx=g.heroX(h)+d*14,my=(h.gy||g.G)-17;glow(ctx,mx,my,3.2,'#ffcc66',.55);glow(ctx,mx,my,1.4,'#fff6d0',.9);}ctx.restore();}
    for(const f of g.fx){const k=f.t/f.life;
      if(f.k==='arc'){const d=f.dir,cx=f.x+d*6,cy=f.gy-10,R=f.big?13:10;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-k;ctx.lineCap='round';
        for(const [w,c] of [[3.2,'rgba(30,140,255,.6)'],[1.3,'rgba(200,245,255,.95)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();const a0=d>0?-1.25:Math.PI+1.25,a1=d>0?1.1:Math.PI-1.1,s=a0+(a1-a0)*Math.min(1,k*2.2);ctx.arc(cx-d*4,cy,R,Math.min(a0,s),Math.max(a0,s));ctx.stroke();}
        ctx.strokeStyle='rgba(170,230,255,.9)';ctx.lineWidth=.6;zig(cx,cy-8,cx+d*6,cy+6,4,1.6);ctx.restore();continue;}
      if(f.k==='bolt'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-k;for(const [w,c] of (f.c==='v'?[[2.4,'rgba(140,50,255,.7)'],[.8,'rgba(230,200,255,1)']]:[[2.4,'rgba(40,150,255,.7)'],[.8,'rgba(230,250,255,1)']])){ctx.strokeStyle=c;ctx.lineWidth=w;for(let i=1;i<f.pts.length;i++){const [a,b]=f.pts[i-1],[x,y]=f.pts[i];zig(a,b,x,y,5,2.2);}}
        for(const [x,y] of f.pts)glow(ctx,x,y,3,'#6fd0ff',.4*(1-k));ctx.restore();continue;}
      if(f.k==='puff'){const r=(1.2+2.6*k)*f.s;puffAt(f.x-1.5*k,f.y-3*k,r,.55*(1-k),k<.15?'#ffb860':'#aab4bd');continue;}}
    for(const M of g.missiles||[]){const u=Math.min(1,M.t/M.T),du=.02;const nx=M.x0+(M.tx-M.x0)*Math.min(1,u+du),nh=(1-Math.min(1,u+du))*23+46*Math.sin(Math.PI*Math.min(1,u+du));
      const y=M.gyNow-M.hgt,ang=Math.atan2(-(nh-M.hgt),nx-M.x);ctx.save();ctx.translate(M.x,y);ctx.rotate(ang);
      ctx.fillStyle='#2f3a33';ctx.fillRect(-3.5,-1,6,2);ctx.fillStyle='#6f8a63';ctx.fillRect(-3,-1,4.5,1);ctx.fillStyle='#c84a2a';ctx.fillRect(2.5,-1,1.5,2);ctx.fillStyle='#1d2420';ctx.fillRect(-4.5,-1.8,1.5,3.6);   // body, stripe, red nose, fins
      ctx.globalCompositeOperation='lighter';glow(ctx,-5,0,2.2,'#ff9a30',.7);glow(ctx,-4.6,0,1,'#fff0b0',1);ctx.restore();}
    for(const N of g.nades||[]){const y=N.gyNow-N.hgt;ctx.save();ctx.translate(N.x,y);ctx.rotate(N.t*14);ctx.fillStyle='#3d4a40';ctx.fillRect(-1.5,-1.5,3,3);ctx.fillStyle='#9aa69a';ctx.fillRect(-1.5,-1.5,1,1);ctx.restore();
      if(Math.random()<.5)puffAt(N.x,y,.9,.5);}
    for(const S of g.clouds||[]){const k=S.t/S.life,grow=Math.min(1,S.t/.45),fade=k>.8?(1-k)/.2:1;let sd=S.seed;const rnd=()=>{sd=(sd*9301+49297)%233280;return sd/233280;};
      for(let i=0;i<26;i++){const a=rnd()*6.28,rr=Math.sqrt(rnd())*S.r*grow,ox=Math.cos(a)*rr+Math.sin(g.t*.8+i)*2,oy=Math.sin(a)*rr*.32-6-rnd()*10*grow+Math.cos(g.t*.6+i)*1.2;
        const r=(4+rnd()*5)*grow*(k>.8?.7+.3*fade:1);if(k>.8&&rnd()<(1-fade))continue;puffAt(S.x+ox,S.gy+oy,r,.62*fade,i%3?'#b8c2ca':'#9aa6b0');}}};
  const darkFx=()=>{
    for(const f of g.fx){const k=f.t/f.life;
      if(f.k==='dread'){ctx.save();ctx.globalAlpha=(1-k)*.8;ctx.strokeStyle='#8a3cff';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(f.x,f.gy-2,f.r*k,f.r*k*.3,0,0,7);ctx.stroke();
        ctx.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const a=i*1.05+k*2,rr=f.r*k*.8;ctx.fillStyle='rgba(170,90,255,.8)';ctx.fillRect(f.x+Math.cos(a)*rr,f.gy-8-Math.sin(a)*rr*.3-k*10,1.5,1.5);}ctx.restore();continue;}
      if(f.k==='soul'){const e=1-Math.pow(1-k,2),x=f.x+(f.tx-f.x)*e,y=f.y+(f.ty-f.y)*e-Math.sin(Math.PI*k)*10;ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,x,y,3,'#a060ff',.5*(1-k*.5));glow(ctx,x,y,1.2,'#f0d8ff',.9);ctx.restore();continue;}}
    for(const e of g.enemies){if(e.dead)continue;const y=(e.gy!=null?e.gy:g.G)-12;
      if(e.hexT>0){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const a=g.t*4+i*2.1;ctx.fillStyle='rgba(150,60,255,.75)';ctx.fillRect(e.x+Math.cos(a)*5,y-4+Math.sin(a*1.3)*6,1.2,1.2);}glow(ctx,e.x,y,6,'#6a20c0',.12);ctx.restore();}
      if(e.fearT>0){ctx.fillStyle='#c080ff';ctx.fillRect(Math.round(e.x)-.5,Math.round(y-18),1,3);ctx.fillRect(Math.round(e.x)-.5,Math.round(y-14),1,1);}}
    for(const h of g.alive())if(h.key==='cultist'&&!(h.riseT>0)){const d=h.face||1,ey=(h.gy||g.G)-14.6;ctx.save();ctx.globalCompositeOperation='lighter';for(const ox of[-.1,1.7])glow(ctx,g.heroX(h)+d*(1.2+ox),ey,1.3,'#ff2a20',.32+.12*Math.sin(g.t*3+ox));ctx.restore();}   // his eyes glow red in the dark
    for(const h of g.alive())if(h.defib){const x=Math.round(g.heroX(h)+(h.medkit?12:6)),y=Math.round((h.gy||g.G)-31);ctx.fillStyle='#202020';ctx.fillRect(x-1,y-1,5,5);ctx.fillStyle='#f2d23a';ctx.fillRect(x,y,3,3);ctx.fillStyle='#202020';ctx.fillRect(x+1,y,1,2);ctx.fillRect(x,y+1,1,1);ctx.fillRect(x+2,y+1,1,1);}   /* carrying a Defibrillator: a little yellow pad with a bolt */
    for(const h of g.alive())if(h.medkit){const x=Math.round(g.heroX(h)+6),y=Math.round((h.gy||g.G)-31);ctx.fillStyle='#202020';ctx.fillRect(x-1,y-1,5,5);ctx.fillStyle='#f2f2f2';ctx.fillRect(x,y,3,3);ctx.fillStyle='#e02020';ctx.fillRect(x+1,y,1,3);ctx.fillRect(x,y+1,3,1);}   /* carrying an ambulance Medkit */
    for(const h of g.alive()){if(h.kit&&h.kit.length){const y=(h.gy||g.G)-30;h.kit.forEach((it,i)=>{const x=g.heroX(h)-3+i*3;if(it==='med'){ctx.fillStyle='#f0f0f0';ctx.fillRect(x,y-1,2,2);ctx.fillStyle='#e02020';ctx.fillRect(x+.5,y-.5,1,1);}else{ctx.fillStyle='#ffd23f';ctx.fillRect(x,y-1.5,1.5,2.5);ctx.fillStyle='#404040';ctx.fillRect(x+.2,y-2,1,.6);}});}
      if(h.herbs>0){const y=(h.gy||g.G)-30;for(let i=0;i<h.herbs;i++){const x=g.heroX(h)-3+i*3;ctx.fillStyle='#2e7a2a';ctx.fillRect(x,y,2,1.5);ctx.fillStyle='#8fe36a';ctx.fillRect(x,y-.6,1.2,1);}}   // Scavenger: herbs carried
      if(h.herbT>0&&Math.random()<.4){ctx.fillStyle='rgba(140,230,110,.8)';ctx.fillRect(g.heroX(h)-5+Math.random()*10,(h.gy||g.G)-6-Math.random()*16,1,1);}}
    for(const f of g.fx)if(f.k==='herbget'){const k=f.t/f.life;ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle={med:'#f2f2f2',bat:'#7fe0ff',defib:'#f2d23a'}[f.kit]||'#8fe36a';ctx.fillRect(f.x-1,f.y-k*6,3,2);ctx.fillStyle='#2e7a2a';ctx.fillRect(f.x,f.y-k*6+1,1,2);ctx.restore();}
    for(const h of g.alive())if(h.search){const k=Math.min(1,h.search.t/(h.search.T||1.5)),x=Math.round(g.heroX(h)+8),y0=Math.round((h.gy||g.G)-14),H=12;ctx.fillStyle='#000b';ctx.fillRect(x-1,y0-H-1,4,H+2);const f=Math.round(H*k);const gr=ctx.createLinearGradient(x,0,x+2,0);gr.addColorStop(0,'#e8ecf2');gr.addColorStop(1,'#8a92a0');ctx.fillStyle=gr;ctx.fillRect(x,y0-f,2,f);}   // searching: a silver bar rising beside him
    for(const h of g.alive())if(h.shellT>0){ctx.save();ctx.globalAlpha=.55;ctx.fillStyle='#3e7a3a';ctx.beginPath();ctx.ellipse(g.heroX(h),(h.gy||g.G)-9,10,10,0,Math.PI,0);ctx.fill();ctx.strokeStyle='#9be07a';ctx.lineWidth=1;ctx.stroke();ctx.restore();}   // Shell Up
    for(const e of g.enemies)if(!e.dead&&e.webT>0){e.webT-=1/60;const y=(e.gy!=null?e.gy:g.G)-10;ctx.save();ctx.strokeStyle='rgba(235,240,255,.7)';ctx.lineWidth=.6;for(let i=0;i<4;i++){const a=i*.8;ctx.beginPath();ctx.moveTo(e.x-6*Math.cos(a),y-6*Math.sin(a));ctx.lineTo(e.x+6*Math.cos(a),y+6*Math.sin(a));ctx.stroke();}ctx.restore();}   // webbed
    for(const h of g.alive())if(h.pactT>0){const gy=h.gy||g.G,p=.5+.5*Math.sin(g.t*8);ctx.save();ctx.globalAlpha=Math.min(1,h.pactT)*(.45+.3*p);ctx.strokeStyle='#d0202a';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(g.heroX(h),gy,9,2.4,0,0,7);ctx.stroke();ctx.restore();}};
  const druidFx=()=>{for(const f of g.fx){const k=f.t/f.life;
      if(f.k==='claw'){const d=f.dir,e=1-Math.pow(1-Math.min(1,k/.55),3);const span=Math.max(6,Math.abs(f.tx-f.x));const cx=f.x+d*(span*e),cy=f.gy-11-2*Math.sin(Math.PI*e);
        const s=(.55+.55*e)*(k>.7?1-(k-.7)/.3*.3:1),al=k<.7?1:Math.max(0,1-(k-.7)/.3);ctx.save();ctx.globalAlpha=al;ctx.globalCompositeOperation='lighter';
        glow(ctx,cx,cy,9*s,'#4dff7a',.28);
        ctx.lineCap='round';
        for(const [w,col] of [[2.4*s,'rgba(60,220,110,.55)'],[1.1*s,'rgba(200,255,200,.95)']]){ctx.strokeStyle=col;ctx.lineWidth=w;
          ctx.beginPath();ctx.ellipse(cx-d*2*s,cy,2.6*s,3.2*s,0,0,7);ctx.stroke();   // palm
          for(let i=0;i<4;i++){const oy=(i-1.5)*2.3*s;ctx.beginPath();ctx.moveTo(cx,cy+oy*.7);ctx.quadraticCurveTo(cx+d*4.5*s,cy+oy-1.2*s,cx+d*6.5*s,cy+oy+1.6*s);ctx.stroke();}}   // four hooked talons
        if(k>.45){const q=(k-.45)/.55;ctx.strokeStyle=`rgba(170,255,170,${.9*(1-q)})`;ctx.lineWidth=.9;for(let i=0;i<3;i++){const ox=f.tx+(i-1)*2.2;ctx.beginPath();ctx.moveTo(ox-d*2,f.gy-17+i);ctx.lineTo(ox+d*3,f.gy-6+i);ctx.stroke();}}   // three claw rakes on the target
        ctx.restore();continue;}
      if(f.k==='mend'){ctx.save();ctx.globalCompositeOperation='lighter';const y=f.gy-14-k*10;glow(ctx,f.x,y,8*(1-k)+3,'#5dff6a',.4*(1-k));ctx.fillStyle=`rgba(150,255,140,${1-k})`;ctx.fillRect(f.x-1,y-4,2,8);ctx.fillRect(f.x-4,y-1,8,2);ctx.fillStyle=`rgba(235,255,230,${1-k})`;ctx.fillRect(f.x-.5,y-.5,1,1);
        for(let i=0;i<5;i++){const a=i*1.26+f.t*3;ctx.fillStyle=`rgba(120,230,110,${.8*(1-k)})`;ctx.fillRect(f.x+Math.cos(a)*(6+k*6),f.gy-6-k*16-i*2,1,1);}ctx.restore();}
      if(f.k==='thorn'&&f.t>=0){const T=THORNS[f.v%4];const up=Math.min(1,f.t/.15),dn=k>.75?(1-k)/.25:1;const sc=.17*up;ctx.save();ctx.globalAlpha=dn;drawUnit(ctx,T,0,f.x,f.gy+1+(1-dn)*6,sc,null,0,0,false);ctx.restore();}}
    for(const h of g.alive())if(h.hotT>0){const el=8-h.hotT;const fr=el<1.2?Math.min(6,Math.floor(el/1.2*7)):4+Math.floor(g.t*5)%3;ctx.save();ctx.globalCompositeOperation='lighter';
      drawUnit(ctx,VINE,fr,g.heroX(h),(h.gy||g.G)+2,.11,h.hotT<.6?h.hotT/.6:.9,0,0,false);ctx.restore();}
    for(const T of g.cyclones||[]){const A=T.A,fr=T.t<A.dur?Math.floor(T.t*10)%10:Math.min(15,10+Math.floor((T.t-A.dur)/.35*6));ctx.save();ctx.globalCompositeOperation='lighter';
      drawUnit(ctx,TORN,fr,T.x,T.gy+2,.36,1,0,0,false);ctx.restore();}};
  const poultices=()=>{for(const h of g.alive())if(h.poulticeT>0){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const ph=((g.t*.8+i*.25)%1);ctx.fillStyle=`rgba(150,235,130,${.8*(1-ph)})`;ctx.fillRect(g.heroX(h)-5+i*3,(h.gy||g.G)-8-ph*16,1.5,1.5);}ctx.restore();}};
  const quakes=()=>{for(const f of g.fx)if(f.k==='quake'){const k=f.t/f.life;ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle='#8a6a40';
      for(let i=0;i<8;i++){const x=f.x-f.w/2+(i+.5)*f.w/8;ctx.fillRect(x-1,f.gy-1-Math.sin((k+i*.13)*Math.PI)*4,2,2);}ctx.strokeStyle='#c8a060';ctx.beginPath();ctx.moveTo(f.x-f.w/2,f.gy);ctx.lineTo(f.x+f.w/2,f.gy);ctx.stroke();ctx.restore();}};
  const booms=()=>{for(const f of g.fx){if(f.k!=='boom')continue;const k=f.t/f.life,fr=Math.min(BOOM.n-1,Math.floor(k*BOOM.n));drawUnit(ctx,BOOM,fr,f.x,f.gy+2,f.small?.17:.32,k>.85?(1-k)/.15:1,0,0,false);}};
  const drawHero=(h)=>{const G0=h.gy||g.G;ctx.save();shrinkAt(ctx,h.x,G0,HS);drawHero0(h);ctx.restore();};
  const drawHero0=(h)=>{const G=h.gy||g.G;if(!h.alive){return;}
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
    }else if(UNITS[h.key]&&UNITS[h.key].idle){shadow(ctx,h.x+lx,G,9);const U=UNITS[h.key],C=h.base.char;let A=U.idle,f=Math.floor(g.t*(h.key==='druid'?5:6))%A.n;
      const mov=h.moving||g.scroll;
      let riseRot=0,rum=null,runLean=0,runBob=0;
      // 0.12.22 getting back up: his last death frame, then the death frames played backwards (falling ones rotate back upright), then idle
      if(h.riseT>0&&U.death){const D=U.death,k=1-h.riseT/(h.riseT0||1.1);
        if(k>.86){A=U.idle;f=0;}
        else{A=D;const q=Math.max(0,(k-.18)/.68);f=Math.max(0,D.n-1-Math.floor(q*D.n));if(D.fall)riseRot=((h.face||1)>0?1.45:-1.45)*Math.pow(1-Math.min(1,q*1.15),1.4);}}
      else if(h.summonT>0&&U.summon){A=U.summon;f=Math.min(A.n-1,Math.floor((1-h.summonT/(h.summonT0||.8))*A.n));}   // Void_Cultist: arms raised, both hands glowing
      else if(h.gat&&U.ranged){A=U.ranged;f=Math.floor(g.t*24)%A.n;}   // Moss_Mech's gatling: barrels spinning, muzzle flashing
      else if(h.launchT>0&&U.missile){A=U.missile;f=Math.min(A.n-1,1+Math.floor(g.t*8)%3);}
      else if(h.throwT>0&&U.throw){A=U.throw;f=Math.min(A.n-1,Math.floor((1-h.throwT/.45)*A.n));}
      else if(h.dash&&U.runatk){A=U.runatk;f=Math.min(A.n-1,3+Math.floor(h.dash.t/h.dash.T*2));}
      else if(h.animM>0){A=(h.swingAnim&&U[h.swingAnim])||U.melee;const D=h.swingAnim==='attack2'?.36:.45;f=Math.min(A.n-1,Math.floor((1-h.animM/D)*A.n));}
      else if(h.animR>0){A=(h.firedMoving&&U.walkfire)||U.ranged;f=Math.min(A.n-1,Math.floor((1-h.animR/(h.animRT||.5))*A.n));}
      else if((h.casting>0||h.animC>0)&&h.key==='druid'){A=U.ranged;f=1;}   // staff raised, tip glowing
      else if(h.volley>0&&U.ranged){A=U.ranged;f=Math.min(2,Math.floor((1-h.volley/(h.volleyT0||.6))*3));}   // draws and looses high
      else if(h.blowing>0&&U.blowgun){A=U.blowgun;f=Math.min(A.n-1,Math.floor((1-h.blowing/(h.blowT0||.7))*A.n));}
      else if(h.whirl&&U.spin){A=U.spin;f=Math.floor(g.t*16)%A.n;}
      else if(h.leap&&U.leap){A=U.leap;f=Math.min(A.n-1,Math.floor(h.leap.t/.6*A.n));}
      else if(h.rolling&&U.roll){A=U.roll;f=Math.min(A.n-1,Math.floor(h.rolling.t/.6*A.n));}
      else if(h.chopping>0&&U.chop){A=U.chop;f=Math.min(A.n-1,Math.floor((1-h.chopping/(h.chopT0||.5))*A.n));}
      else if(h.rageAnim>0&&U.rage){h.rageAnim-=1/60;A=U.rage;f=Math.min(A.n-1,Math.floor((1-h.rageAnim/.7)*A.n));}
      else if(h.camping>0&&U.kneel){A=U.kneel;f=Math.min(A.n-1,Math.floor((1-h.camping/(h.campT0||1.8))/.78*A.n));}   // kneel, flick the lighter
      else if(h.cast){A=U.ranged;f=0;}
      else if(h.setting){A=U.reload;f=Math.min(A.n-1,Math.floor(h.setting.t/h.setting.T*A.n));}   // kneels to set the Trip Bomb   // holding the aim during Aimed Shot's cast
      else if(h.search&&U.idle){A=U.idle;f=Math.floor(g.t*3)%A.n;rum=h.search;}   /* 0.12.37: rummaging (built from his idle frames, bent over and digging) */
      else if(h.hitFlash>0){A=U.hurt;f=Math.min(A.n-1,Math.floor((1-h.hitFlash/.12)*A.n));}
      else if(C&&C.ranged&&U.reload&&h.ammo<=0&&!mov){A=U.reload;f=Math.min(A.n-1,Math.floor((h.reloadT||0)/C.ranged.reload*A.n));}
      else if(mov){A=(h.running&&U.run)||U.walk;f=Math.floor(g.t*(h.running?12:h.key==='lumberjack'?9:8))%A.n;
        if(h.running&&!U.run&&A.n>1){f=Math.floor(g.t*15)%A.n;runLean=((h.face||1)>0?1:-1)*.06;runBob=-Math.abs(Math.sin(g.t*15*Math.PI*2/A.n))*.7;}}   /* 0.12.38: no run row (druid): her walk played fast, leaning into it with a bounce */
      const bob=(mov&&A.n===1?-Math.abs(Math.sin(g.t*11))*1.6:0)+runBob;if(runLean&&!riseRot)riseRot=runLean;   // one-frame walk (companion art has no walk row): a little hop
      if(h.whirl){ctx.save();const sp=g.t*16;   // 0.12.26: a wider slashing wave whips round him while he spins, so the reach reads
        ctx.globalCompositeOperation='lighter';
        for(let i=0;i<3;i++){const a0=sp+i*2.09;ctx.lineCap='round';
          ctx.strokeStyle='rgba(200,220,255,.30)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(h.x+lx,G-11,26-i*2,7-i*.5,0,a0,a0+1.3);ctx.stroke();
          ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(h.x+lx,G-11,27-i*2,7.5-i*.5,0,a0+.2,a0+1.15);ctx.stroke();}
        ctx.strokeStyle='rgba(232,240,255,.45)';ctx.lineWidth=1.2;for(let i=0;i<2;i++){ctx.beginPath();ctx.ellipse(h.x+lx,G-10,16-i*3,5-i,0,sp*1.1+i*2,sp*1.1+i*2+2.2);ctx.stroke();}ctx.restore();}   // inner spin trail
      if(h.cloneT>0){const cx=h.x+lx-(h.face||1)*10;ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,cx,G-22,14,'#4aa8ff',.12);ctx.restore();   // Shadow_Clone: a see-through copy just behind him
        drawUnit(ctx,A,f,cx,G+bob,A.pre?ART_SCALE/A.pre/HS:A.art?ART_SCALE/HS:(A.sc||1),.38*Math.min(1,h.cloneT/.4),0,0,(h.face||1)>0);}
      if(rum){   /* rummage: dips down and digs (squash + lean toward the wreck), pops up, repeats; bits fly out where he digs */
        const ox=rum.o?rum.o.x+((OBST[rum.o.k]||{}).w||0)*.0:h.x+10;const dir=(rum.o&&rum.o.x<h.x-2)?-1:1;const ph=(g.t*2.3+(h.key.length*.37))%1;
        const dip=ph<.55?Math.sin(ph/.55*Math.PI):0;const jig=Math.sin(g.t*23)*.02*dip;const fx=h.x+lx;
        ctx.save();ctx.translate(fx,G);ctx.rotate(dir*(.1+.2*dip)+jig);ctx.scale(1+.03*dip,1-.13*dip);ctx.translate(-fx,-G);
        drawUnit(ctx,A,f,fx,G,A.pre?ART_SCALE/A.pre/HS:A.art?ART_SCALE/HS:(A.sc||1),null,h.hitFlash,0,dir>0);ctx.restore();
        const seed=Math.floor(g.t*2.3+(h.key.length*.37));for(let i=0;i<4;i++){const q=((ph*1.6)+i*.17)%1;if(q>.8)continue;const r=Math.sin(seed*12.9+i*78.2)*43758.5%1;const rr=Math.abs(r);
          const bx=fx+dir*(9+q*10*(.6+rr)),by=G-4-Math.sin(q*Math.PI)*(8+6*rr);ctx.fillStyle=rum.disarm?(i%2?'#9ad0ff':'#e8e8e8'):(i%2?'#8a7a64':'#b8b8b8');ctx.globalAlpha=1-q;ctx.fillRect(Math.round(bx),Math.round(by),1.5,1.5);}ctx.globalAlpha=1;}
      else drawUnit(ctx,A,f,h.x+lx,G+bob-(h.leapH||0)*1.2-(A.fall&&riseRot?2*Math.abs(riseRot)/1.45:0),A.pre?ART_SCALE/A.pre/HS:A.art?ART_SCALE/HS:(A.sc||1),null,h.hitFlash,riseRot,(h.face||1)>0);}
    else{shadow(ctx,h.x+lx,G,9);spr(ctx,'h_'+h.key,fr,h.x+lx-32,G-60,h.face<0,null,h.hitFlash);}
    ctx.restore();
    if(h.gritT>0){const p=.5+.5*Math.sin(g.t*9),fa=Math.min(1,h.gritT/.5);ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(230,175,90,${(.35+.3*p)*fa})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(Math.round(h.x+lx),G-24,13+p,26+p,0,0,7);ctx.stroke();
      ctx.fillStyle=`rgba(255,215,140,${.8*fa})`;for(let i=0;i<4;i++){const an=g.t*3+i*1.57;ctx.fillRect(Math.round(h.x+lx+Math.cos(an)*13),Math.round(G-24+Math.sin(an)*24),1.5,1.5);}ctx.restore();}   // Grit_Teeth: a steady amber brace around him
    if(h.shield>0){ctx.strokeStyle='rgba(154,230,255,.7)';ctx.beginPath();ctx.ellipse(Math.round(h.x+lx),G-24,15,27,0,0,7);ctx.stroke();}
    const bx=h.x+(h.dodgeX||0)+(h.wanderX||0);plate(ctx,h,bx,G-(hbOf(h).h+17),22,true);};
  // enemies
  // depth lanes: each enemy stands a few px nearer/farther; small creatures take the front lanes; back lanes draw first
  for(const e of g.enemies)if(e.lane==null){const a=SP['e_'+e.type];e.lane=e.boss||e.fly?0:UNITS[e.type]?Math.floor(Math.random()*6):(a&&FH(a)<64?5+Math.floor(Math.random()*4):Math.floor(Math.random()*5));}
  const es=g.enemies.filter(e=>!e.dead).sort((a,b)=>a.lane-b.lane||b.x-a.x);
  const drawEnemy=(e)=>{const G0=(e.gy!=null&&!e.fly&&!e.boss)?e.gy:g.G;ctx.save();shrinkAt(ctx,e.x,G0,HS);drawEnemy0(e);ctx.restore();};
  const drawEnemy0=(e)=>{const G=(e.gy!=null&&!e.fly&&!e.boss)?e.gy:g.G;let fr=e.animT>0?6+Math.min(2,Math.floor((.3-e.animT)/.1)):e.hitFlash>0&&!e.boss?9:Math.floor(e.walkT*8)%6;
    if(e.boss){const bf=e.animT>0?2:Math.floor(g.t*2)%2;const y=e.fly?e.y-90:G-124;shadow(ctx,e.x,G,26);spr(ctx,'b_'+e.type,bf,e.x-64,y,false,null,e.hitFlash);return;}
    if(UNITS[e.skin||e.type]){const U=UNITS[e.skin||e.type];const [A,uf]=unitFrame(e,U);const gy=e.gy!=null?G:G+e.lane;const sc=(e.E.scale||1)*(e.elite?1.1:1);shadow(ctx,e.x,gy,8);
      const dsc=A.pre?sc/A.pre:sc;drawUnit(ctx,A,uf,e.x,gy,dsc,null,e.hitFlash,0,e.face>0);const y=gy-U.walk.ay*(U.walk.pre?sc/U.walk.pre:sc);   /* pre-shrunk art (zombies) is drawn 1:1 */
      if(e.slow>0){ctx.fillStyle='rgba(154,230,255,.8)';for(let i=0;i<3;i++)ctx.fillRect(Math.round(e.x-6+i*5),Math.round(y+8+((g.t*20+i*7)%20)),1,1);}
      if(e.burnT>0){ctx.fillStyle=Math.random()<.5?'#ffb040':'#ff5a1a';ctx.fillRect(Math.round(e.x-3+Math.random()*6),Math.round(y+10+Math.random()*12),1,2);}
      if(e.hp<e.max||e.bleedT>0||e.burnT>0||e.slow>0||e.stun>0)plate(ctx,e,e.x,y-2,e.elite?20:14,false,e.elite?'#ffb020':'#e8303a');
      if(e.markT>0){const my=y-9,p=.5+.5*Math.sin(g.t*10);ctx.strokeStyle=`rgba(255,70,60,${.6+.4*p})`;ctx.lineWidth=1;ctx.strokeRect(Math.round(e.x)-3.5,Math.round(my)-3.5,7,7);ctx.fillStyle='#ff4a3a';ctx.fillRect(Math.round(e.x)-.5,Math.round(my)-.5,1,1);}   // Pinning_Shot mark
      return;}
    const n='e_'+e.type,a=SP[n];const big=FH(a)===64;
    const y=e.fly?e.y-FH(a)/2:G-(big?60:44)+e.lane;if(!e.fly)shadow(ctx,e.x,G+e.lane,big?8:7);
    if(e.elite){ctx.save();ctx.translate(e.x,y+FH(a));ctx.scale(1.22,1.22);spr(ctx,n,fr,-FW(a)/2,-FH(a),false,null,e.hitFlash);ctx.restore();}
    else spr(ctx,n,fr,e.x-FW(a)/2,y,false,null,e.hitFlash);
    if(e.slow>0){ctx.fillStyle='rgba(154,230,255,.8)';for(let i=0;i<3;i++)ctx.fillRect(Math.round(e.x-6+i*5),Math.round(y+8+((g.t*20+i*7)%20)),1,1);}
    if(e.burnT>0){ctx.fillStyle=Math.random()<.5?'#ffb040':'#ff5a1a';ctx.fillRect(Math.round(e.x-3+Math.random()*6),Math.round(y+10+Math.random()*12),1,2);}
    if(e.hp<e.max||e.bleedT>0||e.burnT>0||e.slow>0||e.stun>0)plate(ctx,e,e.x,y-2,e.elite?20:14,false,e.elite?'#ffb020':'#e8303a');};
  // draw heroes and enemies back-to-front by lane so units in the far lane sit behind the near ones
  const drawOb=o=>{const D=OBST[o.k];const gy=LANES[Math.max(...o.lanes)];ctx.save();shadow(ctx,o.x,gy,Math.max(5,D.fw*.22));drawUnit(ctx,{fw:D.fw,fh:D.fh,n:1,ax:D.fw/2,ay:D.fh-1,x:D.x,y:D.y,img:D.img||'obst'},0,o.x,gy+1,.5,null,0,0,!!o.flip);
    if(o.alarmT>0&&Math.floor(o.alarmT*6)%2===0){const [a0,b0]=[o.x-D.fw*.22,o.x+D.fw*.22];ctx.globalCompositeOperation='lighter';for(const lx of [a0,b0]){glow(ctx,lx,gy-D.fh*.18,5,'#ffa020',.55);glow(ctx,lx,gy-D.fh*.18,2,'#fff0b0',.9);}ctx.globalCompositeOperation='source-over';}/* car alarm: flashing lights */ctx.restore();};
  const drawTent=T=>{const U=UNITS.tentacle;if(!U)return;const A=U[T.anim]||U.idle;let fr;const n=A.n;
    if(T.anim==='idle')fr=Math.floor(g.t*9+T.x)%n;else if(T.anim==='emerge')fr=Math.min(n-1,Math.floor(T.aT/.5*n));else if(T.anim==='attack')fr=Math.min(n-1,Math.floor(T.aT/.6*n));else if(T.anim==='hit')fr=Math.min(n-1,Math.floor(T.aT/.25*n));else fr=Math.min(n-1,Math.floor(T.aT/.8*n));
    ctx.save();shrinkAt(ctx,T.x,T.gy,HS);shadow(ctx,T.x,T.gy,9);drawUnit(ctx,A,fr,T.x,T.gy+1,1,null,T.hitT>0?(T.hitT-=1/60):0,0,T.face>0);ctx.restore();
    if(T.hp<T.max&&T.anim!=='death'){const w=12,y=T.gy-36;ctx.fillStyle='#000a';ctx.fillRect(Math.round(T.x-w/2)-1,y-1,w+2,3);ctx.fillStyle='#9a50e8';ctx.fillRect(Math.round(T.x-w/2),y,Math.max(0,w*T.hp/T.max),1);}};
  const items=[...(g.tentacles||[]).map(T=>[T.gy+.1,0,T.x,()=>drawTent(T)]),...(g.obst||[]).map(o=>[LANES[Math.max(...o.lanes)]+.2,-1,o.x,()=>drawOb(o)]),...hs.filter(h=>h.alive).map(h=>[h.gy||G,0,h.x,()=>drawHero(h)]),...es.map(e=>[e.boss?G-.5:(e.gy!=null&&!e.fly?e.gy:G+e.lane-5),1,-e.x,()=>drawEnemy(e)])]
    .sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);
  // campfire (drawn behind the units) with sparks drifting up while it burns
  if(g.camp){const F=g.camp;let fr=0;if(F.state==='start')fr=1+Math.min(2,Math.floor(F.t/.3));else if(F.state==='burn')fr=4+Math.floor(g.t*8)%4;else if(F.state==='dying')fr=8+Math.min(2,Math.floor((F.dT||0)/.4));else fr=11;
    const A=Object.assign({},CAMPF,{x:fr*34,n:1});const fade=F.state==='dead'&&F.deadT>4?(5-F.deadT):1;drawUnit(ctx,A,0,F.x,F.gy+1,.5,fade,0,0,false);
    if(F.state==='burn'){ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,F.x,F.gy-6,14,'#ff9a30',.12+.04*Math.sin(g.t*9));
      for(let i=0;i<7;i++){const ph=((g.t*.7+i*.143)%1);const sx=F.x+Math.sin(i*2.3+g.t*2)*3+Math.sin(ph*9+i)*2,sy=F.gy-10-ph*28;ctx.fillStyle=ph<.6?'rgba(255,200,90,.95)':'rgba(255,120,40,'+(1-ph)*1.6+')';ctx.fillRect(sx,sy,ph<.3?1:.6,ph<.3?1:.6);}
      ctx.restore();}
    if(F.state==='dying'||F.state==='dead'){ctx.fillStyle='rgba(150,150,160,.25)';for(let i=0;i<3;i++){const ph=((g.t*.4+i*.33)%1);ctx.beginPath();ctx.arc(F.x+Math.sin(ph*6+i)*2,F.gy-6-ph*20,1.5+ph*3,0,7);ctx.fill();}}}
  traps();rainDraw();
  /* 0.12.51 enemy scrap mines: a rusted Trip Bomb cousin, dark red casing, spikes, a blinking red light and a taut wire. Unspotted ones are faint. */
  for(const M of g.mines||[]){if(!M.armed)continue;const x=Math.round(M.x),y=M.gy;ctx.save();ctx.globalAlpha=M.spotted?1:.38;
    ctx.strokeStyle='rgba(200,200,190,.55)';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x-7,y-1.5);ctx.lineTo(x+7,y-1.5);ctx.stroke();ctx.fillStyle='#3a2a24';ctx.fillRect(x-7.5,y-2.5,1,2);ctx.fillRect(x+6.5,y-2.5,1,2);   /* wire + stakes */
    ctx.fillStyle='#1c1412';ctx.fillRect(x-3,y-3,6,3);ctx.fillStyle='#6a2a1e';ctx.fillRect(x-2.5,y-2.5,5,2);ctx.fillStyle='#8a4a2a';ctx.fillRect(x-2,y-2.5,2,1);   /* rusted casing */
    ctx.fillStyle='#9a9a90';for(const sx of [-2.5,-.5,1.5])ctx.fillRect(x+sx,y-4,1,1);   /* nail spikes */
    if(Math.floor(g.t*3)%2===0){ctx.fillStyle='#ff3a2a';ctx.fillRect(x-.5,y-3.5,1,1);glow(ctx,x,y-3,1.6,'#ff3a2a',M.spotted?.3:.12);}
    ctx.globalAlpha=1;if(M.spotted){const b=Math.round(Math.sin(g.t*5)*1);ptext(ctx,'!',x,y-12+b,'#ff5a3a',1);}ctx.restore();}
  for(const h of g.alive())if(h.mine>0){const x=Math.round(g.heroX(h)-8),y=Math.round((h.gy||g.G)-31);ctx.fillStyle='#1c1412';ctx.fillRect(x-1,y,5,3);ctx.fillStyle='#6a2a1e';ctx.fillRect(x,y+1,3,1);ctx.fillStyle='#ff3a2a';ctx.fillRect(x+1,y,1,1);}   /* carrying a defused mine */
  for(const it of items)it[3]();
  laser();waves();druidFx();robotFx();darkFx();quakes();poultices();booms();
  // projectiles
  for(const p of g.proj){const x=Math.round(p.x),y=p.aimed?Math.round(p.y):Math.round(G+(p.y-G)*HS);const c=PCOL[p.kind]||'#ff3a3a';ctx.save();shrinkAt(ctx,x,y,HS);
    if(p.kind==='void'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';for(let i=1;i<=5;i++){ctx.fillStyle=`rgba(150,60,255,${.4-.07*i})`;ctx.fillRect(x-d*i*2.8-1,y-1+Math.sin(g.t*25+i)*.8,2,2);}glow(ctx,x,y,6,'#7a30e0',.35);ctx.restore();ctx.fillStyle='#12061e';ctx.beginPath();ctx.arc(x,y,2.4,0,7);ctx.fill();ctx.strokeStyle='#c090ff';ctx.lineWidth=.8;ctx.stroke();}   // void bolt: a black core in a violet halo
    else if(p.kind==='buck'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';   /* one buckshot pellet: a hot slug with a short streak */
      ctx.strokeStyle='rgba(255,200,120,.55)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x-d*6,y);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff0c0';ctx.fillRect(x-.75,y-.75,1.5,1.5);ctx.restore();}
    else if(p.kind==='gat'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,210,120,.85)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-d*8,y);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff4c8';ctx.fillRect(x-1,y-.5,2,1);ctx.restore();}   // gatling tracer
    else if(p.kind==='leaf'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';   // 0.12.15 nature bolt: a glowing seed with leaves spinning round it and a fading green trail
      for(let i=1;i<=5;i++){ctx.fillStyle=`rgba(90,255,120,${.38-.065*i})`;const s=1.6-.22*i;ctx.fillRect(x-d*i*2.6-s/2,y-s/2+Math.sin(g.t*20+i)*.5,s,s);}
      glow(ctx,x,y,6,'#5dff6a',.32);glow(ctx,x,y,2.6,'#c8ffb0',.55);ctx.restore();
      ctx.fillStyle='#e8ffd8';ctx.fillRect(x-.75,y-.75,1.5,1.5);
      for(let i=0;i<3;i++){const an=g.t*14*d+i*2.09,lx=x+Math.cos(an)*2.6,ly=y+Math.sin(an)*1.6;ctx.fillStyle=i%2?'#3cc84a':'#7ee081';ctx.fillRect(lx-.6,ly-.4,1.2,.8);}}
    else if(p.kind==='dart'){const d=(p.dir||1);ctx.fillStyle='#3a2a18';ctx.fillRect(d>0?x-5:x,y,5,1);ctx.fillStyle='#5fe04a';ctx.fillRect(d>0?x:x-1,y,1,1);ctx.fillStyle='#e8e0c8';ctx.fillRect(d>0?x-6:x+5,y-1,1,3);}   // poison dart: shaft, green-tipped point, little fletch
    else if(p.kind==='kunai'){const d=(p.dir||1);ctx.fillStyle='#2e3040';ctx.fillRect(x-d*6-(d<0?1:0),y,6,1);ctx.fillStyle='#5c3424';for(let i=1;i<5;i+=2)ctx.fillRect(x-d*(1+i),y,1,1);ctx.fillStyle='#a8aec4';ctx.fillRect(d>0?x:x-4,y-1,4,3);ctx.fillStyle='#e0e6f2';ctx.fillRect(d>0?x+3:x-4,y,2,1);ctx.fillStyle='#b0965a';ctx.fillRect(x-d*7,y-1,1,3);}   // spinning-free kunai, pixel drawn
    else if(p.kind==='yarrow'&&UNITS.archer&&UNITS.archer.arrow){const B=UNITS.archer.arrow,d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,240,200,.35)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-d*26,y);ctx.lineTo(x-d*4,y);ctx.stroke();ctx.restore();   // faint streak behind it
      drawUnit(ctx,B,0,x,y,ART_SCALE/B.pre/HS*1.7,null,0,0,d<0);}   // his own arrow, cut from his Ranged frames
    else if(p.kind==='bullet'&&UNITS.flannel&&UNITS.flannel.bullet){const B=UNITS.flannel.bullet;drawUnit(ctx,B,0,x,y+B.ay*ART_SCALE/HS,ART_SCALE/HS,null,0,0,(p.dir||1)<0);}   // sprite bullet from the character's own sheet
    else if(p.kind==='arrow'||p.kind==='quarrel'){const d=p.enemy?-1:1;ctx.fillStyle='#8a6a4a';ctx.fillRect(d>0?x-8:x-1,y,9,1);
      ctx.fillStyle='#d8d0c0';ctx.fillRect(x-d*9,y-1,2,1);ctx.fillRect(x-d*9,y+1,2,1);ctx.fillStyle='#c8ccd6';ctx.fillRect(x+(d>0?1:-3),y-1,2,3);ctx.fillRect(x+(d>0?3:-4),y,1,1);}
    else if(p.kind==='brick'){ctx.save();ctx.translate(x,y);ctx.rotate(p.rot||0);ctx.fillStyle='#9a3a24';ctx.fillRect(-3,-2,6,4);ctx.fillStyle='#c8603a';ctx.fillRect(-3,-2,6,1);ctx.restore();}
    else if(p.kind==='beam'){ctx.fillStyle='#ff2a3a';ctx.fillRect(x,y,8,1);}
    else if(p.kind==='batswarm'){ctx.fillStyle='#1a0a14';ctx.fillRect(x-3,y,7,2);ctx.fillRect(x-1,y-1,3,1);ctx.fillStyle='#ff2a2a';ctx.fillRect(x,y,1,1);}
    else drawProj(ctx,p,x,y,c,g.t);ctx.restore();}
  // fx
  for(const f of g.fx){const k=f.t/.6;ctx.save();if(f.x!=null&&!f.raw)shrinkAt(ctx,f.x,G,HS);
    if(f.k==='gibs'){const tt=f.t,a=tt>1.8?Math.max(0,1-(tt-1.8)/.8):1;ctx.save();ctx.globalAlpha=a;   /* 0.12.40 zombie gibs: chunks fly, bounce once, settle, fade */
      for(const q of f.P){const T=Math.min(tt,2.2);let hh=q.h+q.vh*T-140*T*T,x=q.x+q.vx*Math.min(T,(q.vh+Math.sqrt(q.vh*q.vh+560*q.h))/280);if(hh<0)hh=0;
        ctx.fillStyle=q.c;const s=q.s;ctx.fillRect(Math.round(x*2)/2-s/2,Math.round((f.gy-hh)*2)/2-s/2,s,s*(hh>0?1:.6));}ctx.restore();}
    if(f.k==='blood'){const L=f.life,tt=f.t;let sd=f.seed;const rnd=()=>{sd=(sd*9301+49297)%233280;return sd/233280;};
      for(let i=0;i<f.n;i++){const a=(rnd()-.5)*1.6-(.35);const sp=(f.big?34:24)*(.4+rnd());const vx=Math.cos(a)*sp*f.dir,vy=Math.sin(a)*sp-10*rnd();
        const gy=f.gy+(rnd()*4-2);let x=f.x+vx*tt,y=f.y+vy*tt+60*tt*tt;
        if(y>=gy){const tl=(-vy+Math.sqrt(Math.max(0,vy*vy+240*(gy-f.y))))/120;x=f.x+vx*tl;y=gy;   // landed: a spot on the ground
          ctx.globalAlpha=Math.max(0,1-tt/L);ctx.fillStyle=i%3?'#5a0a12':'#7a1018';ctx.fillRect(Math.round(x),Math.round(y),i%4?1:2,1);}
        else{ctx.globalAlpha=1;ctx.fillStyle=tt<.08?'#ff5050':i%2?'#c0141e':'#8a0c16';const s2=i%3===0?2:1;ctx.fillRect(Math.round(x),Math.round(y),s2,s2);}}
      if(tt<.1){ctx.globalAlpha=1-tt*10;ctx.fillStyle='#ff3a3a';ctx.fillRect(Math.round(f.x)-1,Math.round(f.y)-1,f.big?3:2,f.big?3:2);}   // impact burst
      ctx.globalAlpha=1;}
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
    if(f.k==='drainall'){ctx.strokeStyle=`rgba(255,40,60,${1-k})`;for(const h of g.alive()){ctx.beginPath();ctx.moveTo(h.x,G-30);ctx.lineTo(f.x-30,f.y);ctx.stroke();}}ctx.restore();}
  if(CC.brain&&!g.demo){ctx.save();ctx.font='5px monospace';ctx.textAlign='center';
    const tag=(u,x,y,lines,c)=>{lines=lines.filter(Boolean);const w=Math.max(...lines.map(l=>ctx.measureText(l).width))+4;ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(Math.round(x-w/2),Math.round(y-6*lines.length-1),Math.round(w),6*lines.length+2);
      ctx.fillStyle=c;lines.forEach((l,i)=>ctx.fillText(l,Math.round(x),Math.round(y-6*(lines.length-1-i))));};
    const nm=t=>!t?'nobody':t.key?(heroDef(t.key)||{name:t.key}).name.split(' ').slice(-1)[0]:(t.type||'foe');
    for(const h of g.alive()){const P=h.plan;if(!P)continue;tag(h,g.heroX(h),(h.gy||G)-Math.max(60,hbOf(h).h*UNIT_SCALE+14),[`${(heroDef(h.key)||{name:h.key}).name} · ${personaTitle(h)}`,`${P.intent.toUpperCase()} → ${nm(P.tgt)}`,P.why,...(h.dangerT>g.t?[h.dangerWhy]:[]),h.pauseT>0?'(thinking...)':h.burst>0?'BURST!':''],'#b6ff00');}
    for(const e of g.enemies){if(e.dead||!e.plan)continue;tag(e,e.x,(e.gy||G)-(e.type==='werewolf'?40:52),[`${e.retreatT>0?'BACK OFF':'HUNT'} → ${nm(e.plan.tgt)}`,e.plan.why,e.pauseT>0?'(shambling...)':''],'#ff9a9a');}
    ctx.restore();}
  // 0.12.13 callouts: short shouts above the speaker's head, in that hero's colour
  if(g.calls&&g.calls.length){ctx.save();ctx.font='bold 4px monospace';ctx.textAlign='center';ctx.textBaseline='bottom';const seen=new Set();
    for(let i=g.calls.length-1;i>=0;i--){const c=g.calls[i];if(seen.has(c.u))continue;seen.add(c.u);const u=c.u;if(!u.alive)continue;
      const x=Math.max(30,Math.min(g.W-30,g.heroX(u))),y=(u.gy||G)-Math.max(56,hbOf(u).h*UNIT_SCALE+10)-(CC.brain?32:0)-Math.min(3,c.t*8);
      const k=c.t<.12?c.t/.12:c.t>c.life-.35?Math.max(0,(c.life-c.t)/.35):1;ctx.globalAlpha=k;const w=ctx.measureText(c.s).width+4;
      ctx.fillStyle='rgba(8,6,14,.78)';ctx.fillRect(Math.round(x-w/2),Math.round(y-5.5),Math.round(w),6);ctx.fillStyle=c.c;ctx.fillRect(Math.round(x-w/2),Math.round(y),Math.round(w),1);
      ctx.beginPath();ctx.moveTo(x-2,y+1);ctx.lineTo(x+2,y+1);ctx.lineTo(x,y+3);ctx.fill();ctx.fillText(c.s,Math.round(x),Math.round(y));}
    ctx.restore();ctx.globalAlpha=1;}
  for(const t of g.texts){const a=1-t.t/.9;ctx.globalAlpha=Math.max(0,a);ptext(ctx,t.s,t.x,Math.round(G+(t.y-G)*HS),t.c,t.sc||(t.big?2:1));ctx.globalAlpha=1;}
  ctx.restore();
  // boss bar / stage progress
  if(!g.demo){const p=g.boss&&!g.boss.dead?null:Math.min(1,g.dist/g.st.len);
    if(p!=null){ctx.fillStyle='#120a14';ctx.fillRect(6,4,W-12,4);ctx.fillStyle='#a6ff2e';ctx.fillRect(7,5,Math.round((W-14)*p),2);if(g.st.boss){ctx.fillStyle='#ff3a3a';ctx.fillRect(W-10,3,4,6);}}
    else{ctx.fillStyle='#120a14';ctx.fillRect(40,4,W-80,6);ctx.fillStyle='#c8102e';ctx.fillRect(41,5,Math.round((W-82)*Math.max(0,g.boss.hp/g.boss.max)),4);}}
}
// ---------------------------------------------------------------- portraits
// 0.12.13 one floating tooltip for the whole game: follows what you hover, always fits on screen.
//   Any element with data-tiph (html) gets a rich tip; any plain title="" is taken over so it looks the same.
function howTip(k,insp){const D=heroDef(k)||{name:k},C=CHAR[k]||{};const p=personaOf({key:k,insp});
  return `<div class="tt-h">${esc(D.name)}</div><div class="tt-r">${esc(C.role||'')} · ${esc(personaTitle({key:k,insp}))}</div><div class="tt-b">${esc(BEHAVIOR[k]||D.blurb||'')}</div>`+
    `<div class="tt-s">${SLIDERS.map(([sk,l,r])=>{const v=p[sk]??5,s=Math.abs(v-5)/5;   // 0.12.24: the harder it leans, the brighter and bolder that side's word
      const mix=(a,b)=>Math.round(a+(b-a)*s),col=`rgb(${mix(150,190)},${mix(160,255)},${mix(150,40)})`,st=s>0?`style="opacity:${(.6+.4*s).toFixed(2)};color:${col};font-weight:${s>=.6?800:s>=.3?700:500}${s>=.8?';text-shadow:0 0 6px rgba(166,255,46,.55)':''}"`:'';
      return `<span class="l" ${v<5?st:''}>${esc(l)}</span><i><b style="left:${v*10}%;background:${s>0?col:'#ffd23f'}"></b></i><span class="r" ${v>5?st:''}>${esc(r)}</span>`;}).join('')}</div>`+
    `<div style="margin-top:5px;font-size:9px;opacity:.75">Key: <span style="color:rgb(158,179,128);opacity:.7">slight lean</span> · <span style="color:rgb(174,217,84);font-weight:700">strong</span> · <span style="color:rgb(190,255,40);font-weight:800;text-shadow:0 0 6px rgba(166,255,46,.55)">extreme</span></div>`+
    (insp&&INSP[insp]?`<div style="margin-top:5px;font-size:10px;opacity:.8">✨ ${esc(insp)}: ${esc(inspText(insp))}</div>`:'');}
let FTIP=null;function installTips(){if(FTIP)return;FTIP=document.createElement('div');FTIP.id='cc-ftip';document.body.appendChild(FTIP);let cur=null;
  const place=el=>{const r=el.getBoundingClientRect(),W=innerWidth,H=innerHeight;const tw=FTIP.offsetWidth,th=FTIP.offsetHeight;
    let x=r.left+r.width/2-tw/2;x=Math.max(8,Math.min(W-tw-8,x));let y=r.top-th-8;if(y<8)y=r.bottom+8;if(y+th>H-8)y=Math.max(8,H-th-8);FTIP.style.left=x+'px';FTIP.style.top=y+'px';};
  const show=el=>{if(el.title){el.dataset.tipt=el.title;el.removeAttribute('title');}const h=el.dataset.tiph;FTIP.innerHTML=h!=null?h:esc(el.dataset.tipt||'').replace(/\n/g,'<br>');
    if(!FTIP.innerHTML){hide();return;}FTIP.style.display='block';cur=el;place(el);};
  const hide=()=>{FTIP.style.display='none';cur=null;};
  document.addEventListener('mouseover',e=>{const el=e.target.closest&&e.target.closest('[data-tiph],[title],[data-tipt]');if(el===cur)return;if(!el){hide();return;}show(el);},true);
  document.addEventListener('focusin',e=>{const el=e.target.closest&&e.target.closest('[data-tiph],[title],[data-tipt]');if(el)show(el);});
  document.addEventListener('scroll',()=>{if(cur&&cur.isConnected)place(cur);else hide();},true);document.addEventListener('mousedown',()=>hide(),true);}
function portrait(key,size){const U=UNITS[key];if(U&&U.idle&&!SP['h_'+key]){const c=document.createElement('canvas');const A=U.idle;c.width=A.fw;c.height=A.fh;c.className='cc-por';
    const go=()=>{const x=c.getContext('2d');x.imageSmoothingEnabled=false;const k=A.pk||(A.art?3.4:A.pre?3.4*A.pre:1),w=30*k,hh=46*k,z=A.art?1:2,sx=A.x+A.ax-w/2,sy=A.y+A.ay-hh;c.width=w*z;c.height=hh*z;x.imageSmoothingEnabled=!!A.art;x.translate(c.width,0);x.scale(-z,z);x.drawImage(A.img?XIMG[A.img]:UIMG,sx,sy,w,hh,0,0,w,hh);};
    const IM0=A.img?XIMG[A.img]:UIMG;if(IM0.complete)go();else IM0.addEventListener('load',go,{once:true});if(size)c.style.width=size+'px';return c;}
  const c=document.createElement('canvas');const a=SP['h_'+key];c.width=a[2];c.height=a[3];c.className='cc-por';
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
.cc-vol{width:80px;accent-color:#a6ff2e;vertical-align:middle;margin:0 4px}
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
.cc-heroes{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;align-items:start}
.cc-hero{background:#120a18;border:2px solid #2a1838;border-radius:10px;padding:8px;text-align:left;position:relative}
#cc-ftip{position:fixed;z-index:9999;display:none;pointer-events:none;max-width:min(340px,calc(100vw - 16px));background:#0d0712;border:1px solid #a6ff2e;border-radius:8px;padding:8px 10px;color:#e8dff5;font:11px/1.4 system-ui,sans-serif;box-shadow:0 8px 22px #000c;text-align:left;white-space:normal}#cc-ftip .tt-h{font-weight:700;color:#ffd23f;font-size:12px}#cc-ftip .tt-r{opacity:.7;font-size:10px;margin-bottom:5px}#cc-ftip .tt-b{margin-bottom:6px}#cc-ftip .tt-s{display:grid;grid-template-columns:1fr 64px 1fr;gap:2px 6px;align-items:center;font-size:9.5px}#cc-ftip .tt-s .l{text-align:right;opacity:.55}#cc-ftip .tt-s .r{opacity:.55}#cc-ftip .tt-s .on{opacity:1;color:#a6ff2e;font-weight:700}#cc-ftip .tt-s i{position:relative;height:5px;background:#2a1838;border-radius:3px}#cc-ftip .tt-s i b{position:absolute;top:-2px;width:5px;height:9px;margin-left:-2.5px;background:#ffd23f;border-radius:2px}.cc-ab .cc-tip{display:none!important}.cc-ab.pas{color:#9ad8ff;border-color:#2a4a60;background:#121c28}.cc-hw{display:flex;flex-direction:column;align-self:start}.cc-abl{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}.cc-ab{position:relative;font-size:10.5px;background:#1e1228;border:1px solid #3a2850;border-radius:6px;padding:2px 6px;color:#ffd23f;cursor:help}.cc-ab .cc-tip{display:none;position:absolute;left:0;bottom:calc(100% + 6px);z-index:20;width:220px;background:#0d0712;border:1px solid #a6ff2e;border-radius:8px;padding:7px 9px;color:#e8dff5;font-size:11px;line-height:1.4;box-shadow:0 6px 18px #000a;white-space:normal}.cc-ab:hover .cc-tip,.cc-ab:focus .cc-tip{display:block}.cc-hw .cc-hero{height:auto}.cc-insp{background:#0d0712;border:1px solid #2a1838;border-top:0;border-radius:0 0 10px 10px;padding:4px 8px 8px}.cc-insp select{width:100%;margin-top:3px;background:#120a18;color:#e8dff5;border:1px solid #3a2850;border-radius:6px;font-size:11px;padding:3px}.cc-insp select:disabled{opacity:.45}.cc-ibx{font-size:10.5px;color:#b8aecb;margin-top:4px;line-height:1.35}
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
const CAMP_SHOP=false;   /* 0.12.37 (Kyle): Merchant and Backpack hidden on the camp screen for now (flip to true to bring them back) */
function build(){
  if(root)return;if(!document.getElementById('cc-style')){const st=document.createElement('style');st.id='cc-style';st.textContent=CSS;document.head.appendChild(st);}
  root=document.createElement('div');root.id='cc';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-label','Crypt Crawl');
  root.innerHTML=`<div class="cc-top"><span class="t">⚰️ CRYPT CRAWL <span style="color:#6a5a7a;font-size:8px">v0.12.53</span></span>
    <button class="cc-ib" data-a="restart" title="Restart this stage from its save point" hidden>↺</button><button class="cc-ib" data-a="pause" title="Pause">⏸</button><button class="cc-ib" data-a="speed" title="Game speed">1×</button>
    <button class="cc-ib" data-a="brain" title="Show what every unit is thinking">🧠</button><button class="cc-ib" data-a="mute" title="Sound effects">${muted?'🔇':'🔊'}</button><button class="cc-ib" data-a="music" title="Music on/off">${musicMuted?'🎵̸':'🎵'}</button><button class="cc-ib" data-a="track" title="Next track (now: ${TRACKS[trackI].name})">⏭</button><input class="cc-vol" data-vol type="range" min="0" max="100" value="${Math.round(musicVol*100)}" title="Music volume"><button class="cc-ib" data-a="side" title="Turn sideways (phones held upright)">⟳</button><button class="cc-ib" data-a="fs" title="Full screen">⛶</button><button class="cc-ib" data-a="close" title="Close">✕</button></div>
    <div class="cc-main"><div class="cc-info"></div><canvas id="cc-cv" width="${384*RES*GQ}" height="${216*RES*GQ}"></canvas><div class="cc-boss"></div><div class="cc-banner"></div><div class="cc-hud"></div><div class="cc-panel"></div></div>`;
  document.body.appendChild(root);
  cv=$('#cc-cv',root);ctx=cv.getContext('2d');panel=$('.cc-panel',root);hud=$('.cc-hud',root);info=$('.cc-info',root);bossEl=$('.cc-boss',root);banner=$('.cc-banner',root);
  root.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
    if(a==='close')closeCrawl();
    if(a==='restart'&&CC.game){if(!confirmInline(b,'↺?'))return;CC.game=null;cancelAnimationFrame(CC.raf);persist();beginStage();}
    if(a==='pause'){CC.paused=!CC.paused;b.textContent=CC.paused?'▶':'⏸';}
    if(a==='speed'){CC.speed=CC.speed%3+1;b.textContent=CC.speed+'×';}
    if(a==='brain'){CC.brain=!CC.brain;b.classList.toggle('on',CC.brain);b.style.outline=CC.brain?'2px solid #b6ff00':'';}
    if(a==='music'){musicMuted=!musicMuted;b.textContent=musicMuted?'🎵̸':'🎵';b.style.opacity=musicMuted?.5:1;try{localStorage.setItem('podrundown-crawl-music-mute',musicMuted?'1':'0');}catch(_){}musicStart();}
    if(a==='track'){const T=musicNext();b.title=`Next track (now: ${T.name})`;flash('♫ '+T.name+' · '+T.info+' · '+T.by,2400);}
    if(a==='mute'){muted=!muted;b.textContent=muted?'🔇':'🔊';try{localStorage.setItem('podrundown-crawl-mute',muted?'1':'0');}catch(_){}}
    if(a==='fs'){if(window.PodSideways)PodSideways.goBig(root);setTimeout(layout,120);}
    if(a==='side'){if(window.PodSideways){PodSideways.sidewaysPref(!root.classList.contains('rot-side'));PodSideways.fitSideways(root);}setTimeout(layout,60);}});
  {const vs=root.querySelector('[data-vol]');if(vs)vs.oninput=()=>{musicVol=vs.value/100;try{localStorage.setItem('podrundown-crawl-music-vol',musicVol);}catch(_){}if(BGM)BGM.volume=musicVol;if(musicVol>0&&!musicMuted)musicStart();else if(BGM)BGM.pause();};}
  document.addEventListener('keydown',e=>{if(root.hidden)return;if(e.key==='Escape'&&!document.fullscreenElement)closeCrawl();if(e.key===' '&&CC.game){e.preventDefault();CC.paused=!CC.paused;}});
  window.addEventListener('resize',()=>{if(window.PodSideways&&root&&!root.hidden)PodSideways.fitSideways(root);layout();});document.addEventListener('fullscreenchange',()=>setTimeout(layout,60));
}
function layout(){if(!root||root.hidden)return;const main=$('.cc-main',root);const W=main.clientWidth,H=main.clientHeight;
  const land=W>H*1.25&&H<620;root.classList.toggle('land',land);
  hud.classList.toggle('tall',!land&&H>W*1.2);
  const reserved=land?0:(info.offsetHeight+hud.offsetHeight+4);let w=Math.min(W,(H-reserved)*16/9);
  const k=Math.floor(w/384);if(k>=2&&k*384>=w*.82)w=k*384;cv.style.width=Math.floor(w)+'px';cv.style.height=Math.floor(w*9/16)+'px';
  bossEl.style.top=(cv.offsetTop+Math.floor(w*9/16)*.06)+'px';banner.style.top=(cv.offsetTop+Math.floor(w*9/16)*.38)+'px';}
function openCrawl(){build();root.hidden=false;musicStart();document.body.style.overflow='hidden';stopStrip();if(window.PodSideways)PodSideways.fitSideways(root);CC.data=Save.load();for(const p in CC.data.players)for(const s of CC.data.players[p].slots||[])if(s)migrateSlot(s,p);Save.write(CC.data);showWho();layout();}
function closeCrawl(){musicStop();if(CC.game&&!CC.game.over)quitToCamp(true);CC.game=null;cancelAnimationFrame(CC.raf);root.hidden=true;document.body.style.overflow='';try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}startStrip();}
function showPanel(html){installTips();panel.hidden=false;const rb=root.querySelector('[data-a=restart]');if(rb)rb.hidden=true;panel.innerHTML=`<div class="cc-wrap">${html}</div>`;panel.scrollTop=0;hud.innerHTML='';info.innerHTML='';bossEl.textContent='';drawIdle();return panel;}
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
  return `<div class="cc-stat"><span title="${b.stamina} Stamina × 5 = ${b.hp} HP">HP ${b.hp}</span><i><b style="width:${Math.min(100,b.hp/mx.hp*100)}%"></b></i><span title="Basic attack ${b.dice[0]}d${b.dice[1]}, crit ${Math.round(b.crit*100)}%, accuracy ${b.acc||0}; bar = ability power">PWR</span><i><b style="width:${Math.min(100,b.atk/mx.atk*100)}%"></b></i><span>SPD</span><i><b style="width:${Math.min(100,b.aspd/mx.aspd*100)}%"></b></i></div>`;}
const ROLE={melee:'Melee',ranged:'Ranged',caster:'Caster',duo:'Duo',gunner:'Rifle + Melee',blade:'Sword'};
function showTeam(){
  setRunModes(null);  const s=SLOT();migrate(s,CC.player);s.partySize=3;const pick=[];   /* 0.12.33: back to a 3-hero party */
  const mine=DATA.heroes.filter(h=>h.owner===CC.player);
  const P=showPanel(`<div class="cc-h">PICK YOUR PARTY</div><p class="cc-sub">Up to 3 heroes from your decks. Fewer heroes = each one is stronger. Lower-level heroes earn catch-up XP.</p>
    <div class="cc-heroes">${mine.map(h=>{const st=STYLE[h.key];const H=s.heroes[h.key],L=H.lvl;const tip=[h.name,'',BEHAVIOR[h.key]||h.blurb||'','',...personaLines({key:h.key,insp:H.insp})].join('\n');
      const sp=h.spells[0];return `<div class="cc-hw"><button class="cc-hero" data-k="${h.key}" aria-pressed="false" data-tiph="${esc(howTip(h.key,H.insp))}"><span class="ord"></span><span class="por" data-por="${h.key}"></span><div class="nm">${h.icon} ${esc(h.name)}</div>${h.deck?`<div class="dk">Built from deck: <b>${esc(h.deck)}</b></div>`:''}<div class="dk">${(CHAR[h.key]&&CHAR[h.key].role)||ROLE[st.atk]}${st.tank?' · Tank':''}${st.companion?' · with companion':''}</div>
      <div class="lv">LV ${L}</div><div class="dk">🧠 Personality: <b>${esc(personaTitle({key:h.key,insp:H.insp}))}</b> <span style="opacity:.7">(hover the card for how it fights)</span></div>${statBars(h.key,L)}<div class="cc-abl">${((CHAR[h.key]||{}).abilities||[]).map(a=>`<span class="cc-ab${a.passive?' pas':''}" tabindex="0" data-tiph="${esc('<div class=tt-h>'+(a.passive?'✦ ':'⚡ ')+esc(a.name)+(a.passive?' <span style=opacity:.7>(passive)</span>':'')+'</div>'+esc(ABIL_DESC[a.id]||a.name))}">${a.passive?'✦':'⚡'} ${esc(a.name)}</span>`).join('')||'<span class="dk" style="opacity:.6">No abilities yet</span>'}</div>${sp?`<div class="dk" style="margin-top:2px">Starts with ${esc(sp.name||shortCard(sp.card))} (${SPELL[sp.arch].label})</div>`:''}</button>
      <div class="cc-insp" data-ik="${h.key}"><div class="cc-sub" style="margin:4px 0 2px;font-size:10px">✨ INSPIRATION DECK</div>
        <select data-ip><option value="">Pick a player…</option>${Object.keys(PLAYER_ICON).map(p=>`<option value="${p}"${H.insp&&INSP[H.insp]&&INSP[H.insp].o===p?' selected':''}>${PLAYER_ICON[p]} ${p}</option>`).join('')}</select>
        <select data-id ${H.insp?'':'disabled'}></select><div class="cc-ibx"></div></div></div>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><label class="cc-sub" style="margin:0 8px 0 0;font-size:12px;cursor:pointer" data-tipt="Friendly fire: your heroes' shots can hit allies in the way, and your own explosions (Trip Bomb, its shockwave, missiles, planted mines) hurt your units too."><input type="checkbox" data-hc ${s.lastModes&&s.lastModes.hardcore?'checked':''}> ☠ Hardcore</label><label class="cc-sub" style="margin:0 10px 0 0;font-size:12px;cursor:pointer" data-tipt="Every hero's 20 personality sliders are rolled (2d6-2 each) when the run starts instead of using their fixed values. Deck nudges still apply on top."><input type="checkbox" data-dnd ${s.lastModes&&s.lastModes.dnd?'checked':''}> 🎲 D&amp;D mode</label><button class="cc-btn go" data-go disabled>START RUN</button><button class="cc-btn" data-back>← Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  // Inspiration: player first, then that player's decks (each option shows its bonus). Saved per hero on this save slot.
  P.querySelectorAll('.cc-insp').forEach(box=>{const k=box.dataset.ik,H=s.heroes[k];const ip=box.querySelector('[data-ip]'),id=box.querySelector('[data-id]'),ib=box.querySelector('.cc-ibx');
    const fill=()=>{const p=ip.value;id.disabled=!p;id.innerHTML=p?`<option value="">Pick a deck…</option>`+Object.keys(INSP).filter(d=>INSP[d].o===p).map(d=>`<option value="${esc(d)}"${H.insp===d?' selected':''}>${esc(d)}: ${esc(inspText(d))}</option>`).join(''):'<option>Pick a player first</option>';show();};
    const show=()=>{const d=H.insp;ib.innerHTML=d&&INSP[d]?`<b>${esc(d)}</b>: ${esc(inspText(d))}<br><span style="opacity:.7">${esc(INSP[d].why)}</span><ul style="margin:4px 0 0;padding-left:14px">${inspHelp(d).map(t=>`<li style="margin-top:2px">${esc(t)}</li>`).join('')}</ul>`:'<span style="opacity:.6">No inspiration yet</span>';
      const b=box.parentNode.querySelector('.cc-hero');if(b){b.dataset.tiph=howTip(k,H.insp);const pt=b.querySelector('.dk b');if(pt)pt.textContent=personaTitle({key:k,insp:H.insp});const t=b.querySelector('.dk b');}};
    ip.onchange=()=>{if(!ip.value||(H.insp&&INSP[H.insp]&&INSP[H.insp].o!==ip.value)){H.insp=null;persist();}fill();};
    id.onchange=()=>{H.insp=id.value||null;persist();show();};fill();});
  const upd=()=>{P.querySelectorAll('.cc-hero').forEach(b=>{const i=pick.indexOf(b.dataset.k);b.setAttribute('aria-pressed',i>=0);b.querySelector('.ord').textContent=i>=0?i+1:'';});
    const g=P.querySelector('[data-go]');g.disabled=!pick.length;g.textContent=`START RUN (${pick.length}/${s.partySize||2})`;};
  P.querySelectorAll('.cc-hero').forEach(b=>b.onclick=()=>{const k=b.dataset.k,i=pick.indexOf(k);if(i>=0)pick.splice(i,1);else if(pick.length<(s.partySize||3))pick.push(k);upd();});
  P.querySelector('[data-back]').onclick=showSlots;
  P.querySelector('[data-go]').onclick=()=>{s.run=newRun(pick,s);s.lastModes={hardcore:!!P.querySelector('[data-hc]').checked,dnd:!!P.querySelector('[data-dnd]').checked};s.run.hardcore=s.lastModes.hardcore;s.run.dnd=s.lastModes.dnd;if(s.run.dnd)s.run.rolls=rollPersonas(pick);s.runs++;persist();showCamp();};upd();
}
function rankStars(r){return r>=CFG.maxRank?'<span class="cc-asc">✦ MAX ✦</span>':'<span class="cc-stars">'+'★'.repeat(Math.min(5,Math.ceil(r/2)))+'</span> <span class="cc-sub" style="font-size:11px">r'+r+'</span>';}
function chipFor(e,item,hk){const base=item?shortCard(e.card):sname(hk,e.card);const name=e.r>=CFG.maxRank?`✦ ${esc(maxTitle(e.card,e.arch))}`:esc(base);
  return `<span class="cc-chip ${item?'it':''}" title="${item?esc(e.card):'Inspired by '+esc(e.card)}"><b>${name}</b> · ${item?ITEM[e.arch].label:SPELL[e.arch].label} r${e.r}${(e.augs||[]).map(g=>' +'+AUG[g].name).join('')}${item?' · GS '+gearScore(e):''}${item&&e.proc?' · ✦ '+({onhit:'on hit',oncrit:'on crit',onkill:'on kill',whenhit:'when hit',near:'when close',allylow:'ally low',oncast:'on cast'}[PROCS[e.proc].t]||''):''}</span>`;}
/* camp panel: supplies, what the camp did on arrival, upgrades (pick 1 of the offers per camp), Triage builds */
function campPanel(s,run,btn){const gold=s.gold||0,parts=s.parts||0;const food=run.food||0;run.haggle=haggleOf(s,run);run.resource=resourcefulOf(s,run);
  const owned=Object.keys(run.upg||{}).filter(id=>run.upg[id]);
  const tent=`<span class="cc-tent" style="cursor:help;font-size:18px;margin-left:6px" data-tiph="${esc('<b>⛺ Every camp upgrade</b><br>'+Object.keys(CAMP_UPG).map(id=>{const U=CAMP_UPG[id],t=upgT(run,id);const mx=U.needs?(Object.keys(U.needs).every(k=>upgT(run,U.needs[k])>0)?U.tiers.length:U.tiers.length-1):U.tiers.length;return `${U.icon} ${U.name}: <b style="color:${t?'#a6ff2e':'#9a90a8'}">${t}/${mx}</b>${U.needs&&mx<U.tiers.length?' <span style="opacity:.6">(+1 with a Radio Tower)</span>':''}`;}).join('<br>')+(run.haggle?`<br><br>🤝 Haggler: upgrades ${Math.round(run.haggle*100)}% off`:'')+(run.resource?`<br>🧰 Resourceful: you can pay in spare parts`:''))}">⛺</span>`;
  const sup=`<div class="cc-card"><b>🏕️ Camp</b>${tent} <span class="cc-sub" style="font-size:12px">💰 <b style="color:#ffd23f">${fmt(gold)}</b> gold · ⚙️ <b>${parts}</b> spare parts · 🥫 <b>${Number.isInteger(food)?food:Math.floor(food)+'½'}</b> food · 💧 <b>${run.water||0}</b> water</span>
    ${(run.campLog||[]).length?`<div class="cc-sub" style="font-size:11px;margin:4px 0 0">${run.campLog.map(esc).join(' · ')}</div>`:''}
    ${owned.length?`<div class="cc-chips" style="margin-top:6px">${owned.map(id=>{const U=CAMP_UPG[id],t=run.upg[id];return `<span class="cc-chip" title="${esc(U.txt(t))}">${U.icon} ${esc(U.name)} ${['','I','II','III','IV'][t]}</span>`;}).join('')}</div>`:''}</div>`;
  const offers=(run.offers||[]).filter(id=>upgT(run,id)<CAMP_UPG[id].tiers.length);
  const up=`<div class="cc-card"><b>🔨 Camp upgrades</b> <span class="cc-sub" style="font-size:11px">${run.upgBought?'Built one this camp. More offers next time.':'Pick one to build this camp.'} They last for this run.</span>
    <div class="cc-offers" style="margin-top:8px">${offers.map(id=>{const U=CAMP_UPG[id],t=upgT(run,id)+1,pr=upgPrice(run,id);return `<div class="cc-offer" style="--rc:${t>1?'#7fd0ff':'#a6ff2e'}"><span class="rar">${t>1?'TIER '+t:'NEW'}</span><span class="cn">${U.icon} ${esc(U.name)}${U.tiers.length>1?' '+['','I','II','III','IV'][t]:''}</span><span class="tx">${esc(U.txt(t))}</span>
      <button class="cc-btn" data-upg="${id}" ${run.upgBought||gold<pr?'disabled':''}>Build · ${fmt(pr)}g</button>${run.resource?`<button class="cc-btn" data-upgp="${id}" style="margin-top:4px" ${run.upgBought||parts<upgParts(run,id)?'disabled':''}>Build · ⚙️ ${upgParts(run,id)} parts</button>`:''}</div>`;}).join('')||'<span class="cc-sub">Everything is fully built!</span>'}</div></div>`;
  const tt=upgT(run,'triage');const tri=tt?`<div class="cc-card"><b>🩺 Triage Station ${['','I','II','III','IV'][tt]}</b> <span class="cc-sub" style="font-size:11px">${(run.triageN||0)}/${TRIAGE.max[tt-1]} built this camp · whoever you pick carries it into the next stage</span>
    ${[['med','Medkit','heals an ally under 50% for 35%'],['bat','Battery','+30 energy for an ally running low'],['defib','Defibrillator','instantly revives a downed ally']].map(([w,n,d])=>`<div class="cc-chips" style="align-items:center;margin-top:4px"><span class="cc-sub" style="font-size:11px;margin:0;min-width:180px"><b>${n}</b> · ⚙️ ${TRIAGE[w][tt-1]} · ${d}</span>${run.team.map(k=>btn(`data-tri="${w}|${k}" ${parts<TRIAGE[w][tt-1]||(run.triageN||0)>=TRIAGE.max[tt-1]?'disabled':''}`,'→ '+esc(heroDef(k).name.split(/[ _]/)[0]),'Build it for '+heroDef(k).name)).join(' ')}</div>`).join('')}</div>`:'';
  const tw=upgT(run,'tower');if(tw&&!run.scoutOffers)run.scoutOffers=scoutRoll(run);
  const tower=tw?`<div class="cc-card"><b>🗼 Watchtower ${['','I','II','III'][tw]}</b> <span class="cc-sub" style="font-size:11px">Scouts report on the road ahead. Pick one for the next stage.</span>
    <div class="cc-offers" style="margin-top:8px">${(run.scoutOffers||[]).map(id=>{const S=SCOUT[id],on=run.scoutPick===id;return `<div class="cc-offer" style="--rc:${on?'#a6ff2e':'#7fd0ff'}"><span class="cn">${S.icon} ${esc(S.name)}</span><span class="tx">${esc(S.txt(tw>=3?1.5:1))}</span><button class="cc-btn" data-scout="${id}" ${on?'disabled':''}>${on?'Chosen ✓':'Take this road'}</button></div>`;}).join('')}</div></div>`:'';
  const stl=upgT(run,'still');const still=stl?`<div class="cc-card"><b>🫙 Moonshine Still ${['','I','II'][stl]}</b> <span class="cc-sub" style="font-size:11px">${run.brewN||0}/${stl===1?1:2} brewed this camp · Liquid Courage costs 🥫 ${stl===1?2:1} food · +20% damage, -10 accuracy, steadier nerves for the next stage</span>
    <div class="cc-chips" style="align-items:center;margin-top:4px">${run.team.map(k=>btn(`data-brew="${k}" ${(run.food||0)<(stl===1?2:1)||(run.brewN||0)>=(stl===1?1:2)||(run.heroes[k].carry&&run.heroes[k].carry.courage)?'disabled':''}`,'🫙 → '+esc(heroDef(k).name.split(/[ _]/)[0]),'Pour '+heroDef(k).name+' a jar')).join(' ')}</div></div>`:'';
  return sup+up+tri+tower+still;}
function showCamp(){
  const s=SLOT();const run=s.run;migrate(s,CC.player);run.bag=run.bag||[];if(ABILITIES_OFF){run.pending=0;run.bag=run.bag.filter(e=>e.kind==='item');}const st=CFG.stage(run.stage,run.prestige);
  setRunModes(run);{const lg=campArrive(s,run);if(lg.length)run.campLog=lg;else if(run.campAt!==run.stage)run.campLog=[];}const hungry=new Set(run.needFeed||[]);
  const btn=(attrs,label,title)=>`<button class="cc-mini" ${attrs} ${title?`title="${esc(title)}"`:''}>${label}</button>`;
  const P=showPanel(`<div class="cc-h">STAGE ${run.stage}${run.prestige?' · ★'+run.prestige:''}${run.hardcore?' <span style="color:#ff5a5a;font-size:12px">☠ HARDCORE</span>':''}${run.dnd?' <span style="color:#c8a0ff;font-size:12px">🎲 D&amp;D</span>':''}</div><div class="cc-h2">${esc(st.biome.name)}${st.boss?` — ${esc(CFG.bosses[st.boss].name)} awaits`:''}</div>
    <p class="cc-sub">Score ${fmt(run.score)} · save point. ${run.pending?`<b style="color:#a6ff2e">⬆ ${run.pending} upgrade${run.pending>1?'s':''} waiting</b>`:'No upgrades waiting.'}</p>
    <div class="cc-load">${run.team.map(k=>{const d=heroDef(k),hv=run.heroes[k],L=s.heroes[k],cap=slotCaps(L.lvl);
      const act=hv.spells.map((e,i)=>[e,i]).filter(([e])=>!SPELL[e.arch].passive),pas=hv.spells.map((e,i)=>[e,i]).filter(([e])=>SPELL[e.arch].passive);
      const row=(lbl,list,n,c,slotName)=>`<div class="cc-slotrow"><span class="cc-sub" style="font-size:11px;margin:0">${lbl} ${n}/${c}</span><div class="cc-chips">${list.map(([e,i])=>`<span class="cc-chipw">${chipFor(e,slotName==='item',k)}${btn(`data-un="${k}|${slotName}|${i}"`,'↓','Move to backpack')}</span>`).join('')}</div></div>`;
      return `<div class="cc-card cc-lh"><span data-por="${k}"></span><div style="flex:1;min-width:0"><b>${d.icon} ${esc(d.name)}</b> <span class="cc-sub" style="font-size:11px">LV ${L.lvl} · Gear ${heroGear(hv)} · ${hv.dead?'fallen (revives at 25%)':Math.round((hv.hpf==null?1:hv.hpf)*100)+'% HP'}</span>
        ${ABILITIES_OFF?'':`<div class="cc-chips"><span class="cc-chip" title="${esc(SIG[k].txt)}" style="border-color:#ffd23f"><b>⚡ ${esc(SIG[k].name)}</b> · signature</span></div>`+row('Abilities',act,act.length,cap.active,'spell')+row('Passives',pas,pas.length,cap.passive,'spell')}
        ${hungry.has(k)?(run.fed&&run.fed[k]?`<div class="cc-sub" style="font-size:11px;margin:4px 0 0">🍽 Fed${run.fed[k]==='auto'?' (filtered water)':run.fed[k]==='water'?' (water)':' (food)'} ✓</div>`
          :`<div class="cc-sub" style="font-size:11px;margin:4px 0 0;color:#ffb070">🍽 Hungry: feed them or they start the next stage with 10% less HP ${btn(`data-feed="${k}|food" ${run.food>=(upgT(run,'smoker')?.5:1)?'':'disabled'}`,'🥫 Food','Use 1 food'+(upgT(run,'smoker')?' (smoked: half a ration)':''))} ${btn(`data-feed="${k}|water" ${run.water>=1?'':'disabled'}`,'💧 Water','Use 1 water')}</div>`):''}
        ${(()=>{const fr=lvPtsFree(L),P=L.pts||{};const have=Object.keys(LVPTS).filter(x=>P[x]).map(x=>`${LVPTS[x].icon}${P[x]}`).join(' ');
          return `<div class="cc-sub" style="font-size:11px;margin:4px 0 0">${fr?`<b style="color:#a6ff2e">⬆ ${fr} stat point${fr>1?'s':''} to spend</b> `+Object.keys(LVPTS).map(x=>btn(`data-pt="${k}|${x}"`,LVPTS[x].icon+' '+LVPTS[x].name,LVPTS[x].txt+' per point')).join(' '):'Stat points: one per level gained.'}${have?` <span style="opacity:.8">· spent: ${have}</span>`:''}</div>`;})()}
        ${hv.carry&&(hv.carry.courage||hv.carry.medkit||hv.carry.defib||(hv.carry.kit||[]).length)?`<div class="cc-sub" style="font-size:11px;margin:4px 0 0">🎒 Carrying into the stage: ${[hv.carry.courage?'Liquid Courage':'',hv.carry.medkit?'Medkit':'',hv.carry.defib?'Defibrillator':'',...(hv.carry.kit||[]).map(x=>x==='bat'?'Battery':'Medicine')].filter(Boolean).join(', ')}</div>`:''}</div></div>`;}).join('')}
      ${campPanel(s,run,btn)}
      <div class="cc-shopwrap" ${CAMP_SHOP?'':'hidden'}>${(()=>{const gold=s.gold||0;if(run.shopAt!==run.stage)return `<div class="cc-card"><b>🛒 Merchant</b> <span class="cc-sub" style="font-size:12px">💰 <b style="color:#ffd23f">${fmt(gold)}</b> gold · the merchant sets up shop after each boss you beat.</span></div>`;if(!run.shop||run.shop.stage!==run.stage)stockShop(run);
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
            ${who.filter(k=>run.team.includes(k)).map(k=>btn(`data-eq="${bi}|${k}"`,'↑ '+esc(heroDef(k).name.split(' ').slice(-1)[0]),'Equip on '+heroDef(k).name)).join('')}${isItem?btn(`data-dis="${bi}"`,'Sell +'+(12*(e.r||1))+'g','Sell'):btn(`data-dis="${bi}"`,'✕','Discard')}</div>`;}).join(''):'<span class="cc-sub" style="font-size:12px;margin:0">Empty. New picks that don\'t fit a slot land here.</span>'}</div></div></div></div>
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
  const bg=P.querySelector('[data-begin]');if(bg)bg.onclick=()=>{const left=(run.needFeed||[]).filter(k=>!(run.fed&&run.fed[k])&&!run.heroes[k].dead);
    if(left.length&&!bg.dataset.sure){bg.dataset.sure=1;bg.textContent='Go hungry? '+left.map(k=>heroDef(k).name).join(', ')+' lose 10% HP ▶';return;}campDepart(run);persist();beginStage();};
  P.querySelectorAll('[data-feed]').forEach(b=>b.onclick=()=>{const [k,w]=b.dataset.feed.split('|');if(feedUnit(run,k,w)){sfx('level');persist();showCamp();}});
  P.querySelectorAll('[data-pt]').forEach(b=>b.onclick=()=>{const [k,x]=b.dataset.pt.split('|');const H=s.heroes[k];if(lvPtsFree(H)<1)return;H.pts=H.pts||{};H.pts[x]=(H.pts[x]||0)+1;sfx('level');persist();showCamp();});
  P.querySelectorAll('[data-upgp]').forEach(b=>b.onclick=()=>{const id=b.dataset.upgp,pp=upgParts(run,id);if(run.upgBought||(s.parts||0)<pp)return;s.parts-=pp;run.upg=run.upg||{};run.upg[id]=(run.upg[id]||0)+1;run.upgBought=1;sfx('level');persist();showCamp();});
  P.querySelectorAll('[data-upg]').forEach(b=>b.onclick=()=>{const id=b.dataset.upg,pr=upgPrice(run,id);if(run.upgBought||(s.gold||0)<pr)return;s.gold-=pr;run.upg=run.upg||{};run.upg[id]=(run.upg[id]||0)+1;run.upgBought=1;sfx('level');persist();showCamp();});
  P.querySelectorAll('[data-scout]').forEach(b=>b.onclick=()=>{run.scoutPick=b.dataset.scout;persist();showCamp();});
  P.querySelectorAll('[data-brew]').forEach(b=>b.onclick=()=>{const k=b.dataset.brew;const r=brewCourage(run,k);if(r==='ok'){sfx('level');persist();showCamp();}else msg({max:'No more brewing this camp.',food:'Not enough food.',has:heroDef(k).name+' already has a jar.'}[r]||'Can\'t brew that.');});
  P.querySelectorAll('[data-tri]').forEach(b=>b.onclick=()=>{const [w,k]=b.dataset.tri.split('|');const r=triageBuild(s,run,w,k);if(r==='ok'){sfx('level');persist();showCamp();}else msg({max:'No more builds at this camp.',parts:'Not enough spare parts.',has:heroDef(k).name+' already carries one of those.'}[r]||'Can\'t build that.');});

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
    if(e.type==='herolevel')sfx('level');if(e.type==='enrage')flash('ENRAGED!',1400);if(e.type==='itemdrop'){sfx('level');flash('ITEM FOUND!',900);}if(e.type==='herodown')sfx('die');if(e.type==='gun')sfx(e.big?'biggun':'gun');if(e.type==='boom')sfx('boom');if(e.type==='dash')sfx('dash');if(e.type==='bow')sfx('bow');if(e.type==='heal')sfx('heal');if(e.type==='camp')sfx('camp');if(e.type==='whoosh')sfx('whoosh');if(e.type==='thorns')sfx('thorns');if(e.type==='wind')sfx('wind');if(e.type==='shout')sfx('shout');}
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
/* 0.12.38 (Kyle): a stats brief after each stage: who did what, plus a few awards */
function statsBrief(g){const S=g.stats||{};const keys=Object.keys(S).filter(k=>k!=='?');if(!keys.length)return '';const secs=Math.max(1,g.t||1);
  const nm=k=>k==='flannel_pal'?'Traveling_Companion':(heroDef(k)?heroDef(k).name:((CHAR[k]||{}).name||k));
  const best=(f,min)=>{let b=null,bv=min||0;for(const k of keys){const v=f(S[k]);if(v>bv){bv=v;b=k;}}return b?[b,bv]:null;};
  const aw=[['💥 Most damage',best(s=>s.dmg),v=>fmt(Math.round(v))],['💚 Top healer',best(s=>s.heal,1),v=>fmt(Math.round(v))+' healed'],['💀 Most kills',best(s=>s.kills),v=>v+' kills'],
    ['🎯 Biggest hit',best(s=>s.biggest),v=>Math.round(v)],['🧠 Headshots',best(s=>s.heads),v=>v],['🛟 Revives',best(s=>s.revives),v=>v],['🔍 Searches',best(s=>s.searches),v=>v],['🤏 Sticky fingers',best(s=>s.steals||0),v=>v+' stolen from allies'],['🧨 Defused',best(s=>s.defused||0),v=>v+' mines'],['💥 Wrong wire',best(s=>s.fumbled||0),v=>v+' mines set off'],['💢 Friendly fire',best(s=>s.ff||0),v=>v+' hits on allies'],['🩸 Took the most',best(s=>s.taken),v=>fmt(Math.round(v))+' dmg']]
    .filter(a=>a[1]).map(([t,[k,v],f])=>`<span class="cc-chip" style="margin:2px">${t}: <b>${esc(nm(k))}</b> (${f(v)})</span>`).join('');
  const rows=keys.sort((a,b)=>S[b].dmg-S[a].dmg).map(k=>{const s=S[k];return `<tr><td style="text-align:left">${esc(nm(k))}</td><td>${fmt(Math.round(s.dmg))}</td><td>${(s.dmg/secs).toFixed(1)}</td><td>${fmt(Math.round(s.heal))}</td><td>${s.kills}</td><td>${s.crits}</td><td>${s.heads}</td><td>${fmt(Math.round(s.taken))}</td><td>${s.downs}</td><td>${s.revives}</td><td>${s.searches}</td></tr>`;}).join('');
  return `<div class="cc-card" style="margin-top:8px"><b>📊 Stage stats</b> <span class="cc-sub" style="font-size:11px">${Math.round(secs)}s of fighting</span>
    <div style="margin:6px 0">${aw}</div>
    <div style="overflow-x:auto"><table class="cc-stats" style="border-collapse:collapse;font-size:11px;width:100%;text-align:right"><tr style="opacity:.7"><th style="text-align:left">Unit</th><th>Damage</th><th>DPS</th><th>Healed</th><th>Kills</th><th>Crits</th><th>Heads</th><th>Taken</th><th>Downed</th><th>Revives</th><th>Searches</th></tr>${rows}</table></div></div>`;}
function finishStage(g){
  const s=SLOT(),run=s.run;g.saveBack();run.score+=g.stageScore;s.gold=(s.gold||0)+g.stageGold;
  s.parts=(s.parts||0)+(g.stageParts||0);run.food=(run.food||0)+(g.stageFood||0);run.water=(run.water||0)+(g.stageWater||0);   /* camp supplies */
  run.lastHaul={food:g.stageFood||0,water:g.stageWater||0,parts:g.stageParts||0};
  const found=[];if(g.over==='clear')for(const it of g.stageItems){const where=giveItem(run,s,it);if(where)found.push(shortCard(it.card)+(where==='bag'?' (backpack)':''));else{const v=Math.round(itemPrice(it.rar,run.stage)/3);s.gold+=v;found.push(shortCard(it.card)+' (sold, no room: +'+v+'g)');}}
  const lvls=run.team.filter(k=>s.heroes[k].lvl>CC.lv0[k]).map(k=>`${esc(heroDef(k).name)} → LV ${s.heroes[k].lvl}`);
  if(g.over==='clear'){
    sfx('clear');
    for(const k of run.team){const h=run.heroes[k];if(h.dead){h.dead=false;h.hpf=.25;}else h.hpf=Math.min(1,(h.hpf||0)+.3);}
    run.needFeed=run.team.slice();   /* 0.12.38: everyone needs food or water at camp */
    const cleared=run.stage;run.score+=Math.round(250*cleared*(1+run.prestige));
    if(cleared>=CFG.maxStage){persist();CC.game=null;return showVictory(lvls);}
    if(cleared===CFG.strangerStage&&run.team.length<3&&!run.strangerDone){run.strangerDone=1;const free=s.forsook?[]:DATA.heroes.filter(h=>h.owner===CC.player&&!run.team.includes(h.key));
      if(CFG.stage(cleared,run.prestige).boss)run.shopAt=cleared+1;run.stage++;persist();CC.game=null;return showStranger(free);}
    if(CFG.stage(cleared,run.prestige).boss)run.shopAt=cleared+1;
    run.stage++;run.rerolls=Math.max(run.rerolls,1);
    if(run.prestige*100+run.stage-1>s.best.prestige*100+s.best.stage){s.best.stage=run.stage-1;s.best.prestige=run.prestige;}
    persist();CC.game=null;
    const P=showPanel(`<div class="cc-h">STAGE ${cleared} CLEAR!</div><p class="cc-sub">+${fmt(g.stageScore+250*cleared*(1+run.prestige))} score · ${g.kills} kills · 💰 +${fmt(g.stageGold)} gold${g.stageParts?' · ⚙ +'+g.stageParts+' spare parts':''}${g.stageFood?' · 🥫 +'+g.stageFood+' food':''}${g.stageWater?' · 💧 +'+g.stageWater+' water':''}${found.length?'<br>Found: '+found.map(esc).join(', '):''}${lvls.length?'<br>'+lvls.join(', '):''}</p>${statsBrief(g)}<div class="cc-row"><button class="cc-btn go" data-c>TO CAMP ▶</button></div>`);
    P.querySelector('[data-c]').onclick=showCamp;return;}
  // defeat
  sfx('die');const reached=run.stage,score=run.score,team=run.team.slice();endRun(s,0);CC.game=null;
  const P=showPanel(`<div class="cc-h" style="color:#ff5a5a">YOUR PARTY HAS FALLEN</div><div class="cc-h2">Stage ${reached}${run.prestige?' · ★'+run.prestige:''}</div>
    <p class="cc-sub">Score ${fmt(score)} · best ${fmt(s.best.score)}. Spells and items are gone; hero levels stay.${lvls.length?'<br>Level ups this stage: '+lvls.join(', '):''}</p>
    <div class="cc-load">${team.map(k=>`<div class="cc-card cc-lh"><span data-por="${k}"></span><div><b>${esc(heroDef(k).name)}</b><div class="cc-sub" style="margin:0">LV ${s.heroes[k].lvl} · ${fmt(s.heroes[k].xp)}/${fmt(needHeroXp(s.heroes[k].lvl))} XP</div></div></div>`).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-again>SAME TEAM AGAIN</button><button class="cc-btn" data-team>New team</button><button class="cc-btn" data-saves>Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por,48)));
  P.querySelector('[data-again]').onclick=()=>{s.run=newRun(team,s);const M=s.lastModes||{};s.run.hardcore=!!M.hardcore;s.run.dnd=!!M.dnd;if(s.run.dnd)s.run.rolls=rollPersonas(team);s.runs++;persist();showCamp();};
  P.querySelector('[data-team]').onclick=showTeam;P.querySelector('[data-saves]').onclick=showSlots;
}
function showStranger(free){
  const s=SLOT(),run=s.run;const bless=(forsake)=>{if(forsake){s.forsook=1;}run.blessed=(run.blessed||0)+1;run.pending=(run.pending||0)+1;sfx('level');persist();showCamp();};
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
