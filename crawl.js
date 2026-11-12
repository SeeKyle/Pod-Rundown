/* Crypt Crawl — side-scrolling auto-battler for Pod Rundown.
   Engine (pure logic, runs headless in node for balance sims) + renderer + UI.
   Content lives in the CFG tables so stages, biomes, enemies, bosses, items and abilities can be added as rows. */
(function(){
'use strict';
const DATA={"heroes":[{"key":"jp","char":1,"deck":"","icon":"🧡","owner":"Kyle","cmdr":"","name":"JP","cls":"duo","duo":false,"blurb":"A bearded guy in a big orange hoodie with a Kar98, a sword and a homemade wooden shield. Probably high.","stats":{},"spells":[],"items":[]},{"key":"shoshi","char":1,"deck":"","icon":"📱","owner":"Kyle","cmdr":"","name":"Shoshi","cls":"ranged","duo":false,"blurb":"Kyle's cousin and go-to tech guy: purple hoodie, glasses, a headset and an Automatic_Pistol with a 20-round mag. Keeps everybody running.","stats":{},"spells":[],"items":[]},{"key":"eng","char":1,"deck":"","icon":"🔧","owner":"Kyle","cmdr":"","name":"Engineer","cls":"duo","duo":false,"blurb":"A hard-hatted engineer in a red shirt and overalls with a big wrench and a sawn-off. Builds towers, barriers, tesla coils and turrets.","stats":{},"spells":[],"items":[]},{"key":"soldier","char":1,"deck":"","icon":"🪖","owner":"Kyle","cmdr":"","name":"Soldier","cls":"ranged","duo":false,"blurb":"A helmeted soldier in a balaclava and plate carrier with an assault rifle and a bag of frag grenades.","stats":{},"spells":[],"items":[]},{"key":"flannel","char":1,"deck":"","icon":"🌲","owner":"Kyle","cmdr":"","name":"Flannel_Man","cls":"duo","duo":false,"blurb":"A bearded drifter in green flannel with a bolt-action rifle and a crowbar.","stats":{},"spells":[],"items":[]},{"key":"chibi","char":1,"deck":"","icon":"⚔️","owner":"Kyle","cmdr":"","name":"Chibi_Warrior","cls":"melee","duo":false,"blurb":"A small, fearless swordsman in a long brown coat.","stats":{},"spells":[],"items":[]},{"key":"archer","char":1,"deck":"","icon":"🏹","owner":"Kyle","cmdr":"","name":"Yumi_Archer","cls":"ranged","duo":false,"blurb":"A red-armored longbow archer.","stats":{},"spells":[],"items":[]},{"key":"druid","char":1,"deck":"","icon":"🌿","owner":"Kyle","cmdr":"","name":"Druid","cls":"caster","duo":false,"blurb":"A sea-green druid with a gnarled staff.","stats":{},"spells":[],"items":[]},{"key":"lumberjack","char":1,"deck":"","icon":"🪓","owner":"Kyle","cmdr":"","name":"Lumber_Jack","cls":"melee","duo":false,"blurb":"A red-bearded lumberjack with an axe and a hunting bow.","stats":{},"spells":[],"items":[]},{"key":"robot","char":1,"deck":"","icon":"🤖","owner":"Kyle","cmdr":"","name":"Warhound","cls":"melee","duo":false,"blurb":"A hunched olive war-walker with brass trim: a flamethrower up close, a Targeted Lazer at range and a jetpack on its back.","stats":{},"spells":[],"items":[]},{"key":"cultist","char":1,"deck":"","icon":"🕯️","owner":"Kyle","cmdr":"","name":"Void_Cultist","cls":"caster","duo":false,"blurb":"A hooded void cultist with a bone mask and a ritual dagger.","stats":{},"spells":[],"items":[]},{"key":"carcher","char":1,"deck":"","icon":"🎯","owner":"Kyle","cmdr":"","name":"Chibi_Archer","cls":"ranged","duo":false,"blurb":"A little red-hooded archer with white hair and a short bow. Shoots from far away and hops back out of reach.","stats":{},"spells":[],"items":[]},{"key":"csorc","char":1,"deck":"","icon":"⚡","owner":"Kyle","cmdr":"","name":"Chibi_Sorcerer","cls":"caster","duo":false,"blurb":"A small dark-haired sorcerer in a dark cloak who throws yellow lightning.","stats":{},"spells":[],"items":[]}],"arch":{"bolt":{"label":"Bolt","titles":["Starfall","Hellfire Lance","the Pyre Eternal"]},"nova":{"label":"Nova","titles":["Cataclysm","the Last Sunrise","Worldbreaker"]},"smite":{"label":"Smite","titles":["Executioner","Final Verdict","the Godslayer"]},"drain":{"label":"Drain","titles":["Soul Harvest","the Bleeding Moon","Crimson Tithe"]},"summon":{"label":"Summon","titles":["Legion Eternal","the Endless Horde","Army of the Damned"]},"regen":{"label":"Regen","titles":["Undying Grace","the Phoenix Psalm","Everbloom"]},"aegis":{"label":"Aegis","titles":["Bastion Unbroken","the Last Wall","Adamant Dawn"]},"pump":{"label":"Pump","titles":["Titan Rising","the Warlord Ascendant","Giantblood"]},"devour":{"label":"Devour","titles":["the Gluttonous Abyss","Bone Feast","Maw of Ages"]},"haste":{"label":"Haste","titles":["Overdrive","the Thousand Hands","Quickening Storm"]},"insight":{"label":"Insight","titles":["the Open Eye","Omniscient","Library of Ash"]},"freeze":{"label":"Freeze","titles":["Absolute Zero","the Long Winter","Glacial Tomb"]},"counter":{"label":"Counter","titles":["Null Mirror","the Silent Ward","Spellbreaker"]},"blade":{"label":"Weapon","titles":["Kingsbane","the Red Edge","Doomforged"]},"armor":{"label":"Armor","titles":["Aegis of Ages","the Unbreakable","Ironsoul"]},"relic":{"label":"Relic","titles":["Clockwork Heart","the Ever-Turning","Infinity Engine"]},"charm":{"label":"Charm","titles":["Lucky Bones","Fate's Favorite","the Gilded Skull"]}}};      // heroes from the decks (built by battler_data.py)
const ATLAS={"sprites":{"h_grim":[0,0,128,128,12],"h_vile":[1536,0,160,128,12],"h_vile_a":[0,128,128,128,12],"h_vile_b":[1536,128,128,128,12],"h_felothar":[0,256,128,128,12],"h_thing":[1536,256,128,128,12],"h_kykar":[0,384,128,128,12],"h_depala":[1536,384,128,128,12],"h_kotis":[0,512,128,128,12],"h_dragons":[1536,512,128,128,12],"h_mathas":[0,640,128,128,12],"h_turtle":[1536,640,160,128,12],"h_turtle_a":[0,768,128,128,12],"h_turtle_b":[1536,768,128,128,12],"h_marina":[0,896,128,128,12],"h_korvold":[1536,896,128,128,12],"h_thranduil":[0,1024,128,128,12],"h_joel":[1536,1024,160,128,12],"h_joel_a":[0,1152,128,128,12],"h_joel_b":[1536,1152,128,128,12],"h_robots":[0,1280,128,128,12],"h_blood":[1536,1280,128,128,12],"h_mech":[0,1408,128,128,12],"h_weather":[1536,1408,128,128,12],"e_ghoul":[0,1536,128,128,12],"e_cultist":[1536,1536,128,128,12],"e_knight":[0,1664,128,128,12],"e_wolfman":[1536,1664,128,128,12],"e_hag":[0,1792,128,128,12],"e_zombie":[1536,1792,128,128,12],"e_drowned":[0,1920,128,128,12],"e_skeleton":[1536,1920,128,128,12],"e_archer":[0,2048,128,128,12],"e_thrall":[1536,2048,128,128,12],"e_wraith":[0,2176,128,128,12],"e_leech":[1536,2176,96,96,12],"e_bat":[2688,2176,96,96,12],"e_ghost":[0,2304,96,96,12],"e_gargoyle":[1152,2304,96,96,12],"e_hound":[2304,2304,96,96,12],"e_spawn":[0,2400,96,96,12],"e_eye":[1152,2400,96,96,12],"e_spider":[2304,2400,96,96,12],"b_gravelord":[0,2496,256,256,3],"b_countess":[768,2496,256,256,3],"b_maw":[1536,2496,256,256,3]},"bg":{"grave":{"fill":"#001b27","top":"#000a12","artTop":97,"layers":[{"r":[776,604,48,160],"y":97.0,"sp":0.04,"w":36.0,"h":120.0,"tile":36.0},{"r":[872,1013,128,48],"y":97.0,"sp":0.0,"w":96.0,"h":36.0,"once":{"x":230,"period":0}},{"r":[0,851,544,160],"y":97.0,"sp":0.35,"w":408.0,"h":120.0,"tile":408.0},{"r":[0,1175,272,48],"y":181.0,"sp":1.0,"w":204.0,"h":36.0,"tile":204.0}]},"manor":{"fill":"#1a4652","top":"#06141c","artTop":69,"layers":[{"r":[546,851,272,160],"y":69.0,"sp":0.04,"w":204.0,"h":120.0,"tile":204.0},{"r":[820,851,272,160],"y":69.0,"sp":0.12,"w":204.0,"h":120.0,"tile":204.0},{"r":[0,1013,272,160],"y":69.0,"sp":0.28,"w":204.0,"h":120.0,"tile":204.0},{"r":[324,1013,272,81],"y":128.25,"sp":0.5,"w":204.0,"h":60.75,"tile":204.0},{"r":[598,1013,272,49],"y":152.25,"sp":0.75,"w":204.0,"h":36.75,"tile":204.0},{"r":[548,1175,272,44],"y":183.0,"sp":1.0,"w":204.0,"h":33.0,"tile":204.0}]},"city":{"fill":"#001628","top":"#000a14","artTop":67,"layers":[{"r":[274,1013,48,160],"y":-38.0,"sp":0.04,"w":36.0,"h":120.0,"tile":36.0},{"r":[0,0,544,300],"y":-38.0,"sp":0.12,"w":408.0,"h":225.0,"tile":408.0},{"r":[0,302,1088,300],"y":-38.0,"sp":0.35,"w":816.0,"h":225.0,"tile":816.0,"lamps":[[35.5,239,"ok",0.295],[183.5,239,"flicker",0.833],[328.5,239,"dead",0.096],[458.5,239,"ok",0.867],[560.5,239,"dying",0.634],[666.5,247,"broken",0.85],[769.5,239,"ok",0.266],[905.5,239,"sputter",0.189],[1051.5,239,"flicker",0.522]],"ground":292,"shops":[[38.5,"pharmacy",69],[159.0,"bank",70],[376.5,"hardware",67],[431.0,"deli",42],[485.5,"grocery",59],[545.5,"pawn",61],[684.5,"pharmacy",73],[760.0,"bank",70],[906.0,"liquor",42],[1006.0,"deli",58],[1063.5,"pharmacy",41]],"front":266},{"r":[274,1175,272,48],"y":181.0,"sp":1.0,"w":204.0,"h":36.0,"tile":204.0}]},"bog":{"fill":"#5a2236","top":"#1e0a16","artTop":44,"layers":[{"r":[322,604,160,224],"y":44.0,"sp":0.04,"w":120.0,"h":168.0,"tile":120.0},{"r":[484,604,160,224],"y":44.0,"sp":0.12,"w":120.0,"h":168.0,"tile":120.0},{"r":[646,604,128,224],"y":44.0,"sp":0.3,"w":96.0,"h":168.0,"once":{"x":130,"period":420}},{"r":[0,604,320,245],"y":44.0,"sp":1.0,"w":240.0,"h":183.75,"tile":240.0}]}},"res":2,"units":{"zombie":{"walk":{"fw":28,"fh":42,"n":6,"ax":15,"ay":41,"pre":0.88,"x":0,"y":0},"atk":{"fw":56,"fh":50,"n":5,"ax":35,"ay":49,"pre":0.88,"x":168,"y":0}},"zombie_f":{"walk":{"fw":28,"fh":42,"n":6,"ax":15,"ay":41,"pre":0.88,"x":448,"y":0},"atk":{"fw":56,"fh":50,"n":5,"ax":35,"ay":49,"pre":0.88,"x":616,"y":0}},"zombie_b":{"walk":{"fw":28,"fh":42,"n":6,"ax":15,"ay":41,"pre":0.88,"x":896,"y":0},"atk":{"fw":56,"fh":50,"n":5,"ax":35,"ay":49,"pre":0.88,"x":1064,"y":0}},"zombie_fire":{"walk":{"fw":49,"fh":48,"n":8,"ax":25,"ay":47,"pre":0.88,"x":1344,"y":0},"atk":{"fw":49,"fh":48,"n":4,"ax":24,"ay":47,"pre":0.88,"x":1736,"y":0},"idle":{"fw":49,"fh":48,"n":6,"ax":25,"ay":47,"pre":0.88,"x":1932,"y":0},"die":{"fw":49,"fh":48,"n":5,"ax":25,"ay":47,"pre":0.88,"x":2226,"y":0}},"werewolf":{"walk":{"fw":112,"fh":76,"n":6,"ax":65,"ay":75,"x":2471,"y":0},"atk":{"fw":112,"fh":76,"n":8,"ax":60,"ay":75,"x":3143,"y":0},"die":{"fw":112,"fh":76,"n":10,"ax":58,"ay":75,"x":4039,"y":0},"jump":{"fw":112,"fh":76,"n":2,"ax":72,"ay":71,"x":5159,"y":0},"fall":{"fw":112,"fh":76,"n":2,"ax":56,"ay":63,"x":5383,"y":0}},"flannel":{"idle":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":0,"img":"flannel","art":1},"walk":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":208,"img":"flannel","art":1},"run":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":416,"img":"flannel","art":1},"melee":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":624,"img":"flannel","art":1},"ranged":{"fw":230,"fh":208,"n":5,"ax":140,"ay":200,"x":0,"y":832,"img":"flannel","art":1},"reload":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1040,"img":"flannel","art":1},"hurt":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1248,"img":"flannel","art":1},"death":{"fw":230,"fh":208,"n":3,"ax":140,"ay":200,"x":0,"y":1456,"img":"flannel","art":1},"walkfire":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1664,"img":"flannel","art":1},"kneel":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":1872,"img":"flannel","art":1},"toss":{"fw":230,"fh":208,"n":3,"ax":140,"ay":200,"x":0,"y":2080,"img":"flannel","art":1},"throw":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":2288,"img":"flannel","art":1},"bullet":{"fw":24,"fh":16,"n":1,"ax":22,"ay":8,"x":0,"y":2496,"img":"flannel","art":1},"tripbomb":{"fw":45,"fh":36,"n":1,"ax":9,"ay":14,"x":40,"y":2496,"img":"flannel"},"bombball":{"fw":19,"fh":15,"n":1,"ax":9,"ay":7,"x":90,"y":2496,"img":"flannel"}},"jp":{"idle":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":2288,"img":"jp","art":1,"sheetH":2288},"walk":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":208,"img":"jp","art":1},"run":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":416,"img":"jp","art":1},"melee":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":624,"img":"jp","art":1},"ranged":{"fw":230,"fh":208,"n":5,"ax":140,"ay":200,"x":0,"y":832,"img":"jp","art":1},"reload":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1040,"img":"jp","art":1},"hurt":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1248,"img":"jp","art":1},"death":{"fw":230,"fh":208,"n":3,"ax":140,"ay":200,"x":0,"y":1456,"img":"jp","art":1},"walkfire":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1664,"img":"jp","art":1},"kneel":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":1872,"img":"jp","art":1},"roll":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":2080,"img":"jp","art":1},"bullet":{"fw":24,"fh":16,"n":1,"ax":22,"ay":8,"x":0,"y":2496,"img":"flannel","art":1},"idle0":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":0,"img":"jp","art":1,"sheetH":2288}},"eng":{"idle":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":2496,"img":"eng","art":1,"sheetH":2496},"walk":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":208,"img":"eng","art":1},"run":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":416,"img":"eng","art":1},"melee":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":624,"img":"eng","art":1},"ranged":{"fw":230,"fh":208,"n":5,"ax":140,"ay":200,"x":0,"y":832,"img":"eng","art":1},"reload":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1040,"img":"eng","art":1},"hurt":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1248,"img":"eng","art":1},"death":{"fw":230,"fh":208,"n":3,"ax":140,"ay":200,"x":0,"y":1456,"img":"eng","art":1},"walkfire":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":1664,"img":"eng","art":1},"kneel":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":1872,"img":"eng","art":1},"throw":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":2080,"img":"eng","art":1},"toss":{"fw":230,"fh":208,"n":3,"ax":140,"ay":200,"x":0,"y":2288,"img":"eng","art":1},"idle0":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":0,"img":"eng","art":1,"sheetH":2496}},"flannel_pal":{"idle":{"fw":230,"fh":208,"n":1,"ax":140,"ay":200,"x":0,"y":0,"img":"pal","art":1},"walk":{"fw":230,"fh":208,"n":6,"ax":140,"ay":200,"x":0,"y":208,"img":"pal","art":1},"melee":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":416,"img":"pal","art":1},"ranged":{"fw":230,"fh":208,"n":5,"ax":140,"ay":200,"x":0,"y":624,"img":"pal","art":1},"reload":{"fw":230,"fh":208,"n":8,"ax":140,"ay":200,"x":0,"y":832,"img":"pal","art":1},"hurt":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1040,"img":"pal","art":1},"death":{"fw":230,"fh":208,"n":4,"ax":140,"ay":200,"x":0,"y":1248,"img":"pal","art":1}},"chibi":{"idle":{"fw":128,"fh":128,"n":8,"ax":66,"ay":128,"x":0,"y":0,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"walk":{"fw":128,"fh":128,"n":8,"ax":66,"ay":128,"x":0,"y":128,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"run":{"fw":128,"fh":128,"n":8,"ax":66,"ay":128,"x":0,"y":256,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"attack1":{"fw":128,"fh":128,"n":4,"ax":66,"ay":128,"x":0,"y":384,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"attack2":{"fw":128,"fh":128,"n":3,"ax":66,"ay":128,"x":0,"y":512,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"runatk":{"fw":128,"fh":128,"n":4,"ax":66,"ay":128,"x":0,"y":640,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"hurt":{"fw":128,"fh":128,"n":3,"ax":66,"ay":128,"x":0,"y":768,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"death":{"fw":128,"fh":128,"n":3,"ax":66,"ay":128,"x":0,"y":896,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5},"ranged":{"fw":128,"fh":128,"n":4,"ax":66,"ay":128,"x":0,"y":1024,"img":"chibi","pre":0.5957,"faceR":1,"pk":1.5}},"archer":{"idle":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":0,"img":"archer","pre":0.5526},"walk":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":143,"img":"archer","pre":0.5526},"run":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":285,"img":"archer","pre":0.5526},"melee":{"fw":204,"fh":143,"n":5,"ax":111,"ay":138,"x":0,"y":428,"img":"archer","pre":0.5526},"ranged":{"fw":204,"fh":143,"n":6,"ax":111,"ay":138,"x":0,"y":570,"img":"archer","pre":0.5526},"hurt":{"fw":204,"fh":143,"n":3,"ax":111,"ay":138,"x":0,"y":713,"img":"archer","pre":0.5526},"death":{"fw":204,"fh":143,"n":5,"ax":111,"ay":138,"x":0,"y":855,"img":"archer","pre":0.5526},"blowgun":{"fw":204,"fh":143,"n":4,"ax":111,"ay":138,"x":0,"y":998,"img":"archer","pre":0.5526},"arrow":{"fw":36,"fh":7,"n":1,"ax":35,"ay":3,"x":0,"y":1141,"img":"archer","pre":0.5526}},"druid":{"walk":{"fw":64,"fh":56,"n":8,"ax":33,"ay":53,"x":0,"y":0,"img":"druid"},"idle":{"fw":64,"fh":56,"n":6,"ax":33,"ay":53,"x":0,"y":56,"img":"druid"},"melee":{"fw":64,"fh":56,"n":3,"ax":33,"ay":53,"x":0,"y":112,"img":"druid"},"ranged":{"fw":64,"fh":56,"n":4,"ax":33,"ay":53,"x":0,"y":168,"img":"druid"},"hurt":{"fw":64,"fh":56,"n":2,"ax":33,"ay":53,"x":0,"y":224,"img":"druid"},"death":{"fw":64,"fh":56,"n":1,"ax":33,"ay":53,"x":0,"y":280,"img":"druid","fall":1},"run":{"fw":64,"fh":56,"n":8,"ax":33,"ay":53,"x":0,"y":336,"img":"druid"}},"robot":{"walk":{"fw":82,"fh":71,"n":8,"ax":39,"ay":68,"x":0,"y":0,"img":"robot","sc":1,"pk":1.3},"idle":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":71,"img":"robot","sc":1,"pk":1.3},"melee":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":142,"img":"robot","sc":1,"pk":1.3},"ranged":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":213,"img":"robot","sc":1,"pk":1.3},"missile":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":284,"img":"robot","sc":1,"pk":1.3},"throw":{"fw":82,"fh":71,"n":3,"ax":39,"ay":68,"x":0,"y":355,"img":"robot","sc":1,"pk":1.3},"hurt":{"fw":82,"fh":71,"n":2,"ax":39,"ay":68,"x":0,"y":426,"img":"robot","sc":1,"pk":1.3},"death":{"fw":82,"fh":71,"n":5,"ax":39,"ay":68,"x":0,"y":497,"img":"robot","sc":1,"pk":1.3,"fall":0},"jet":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":568,"img":"robot","sc":1,"pk":1.3},"use":{"fw":82,"fh":71,"n":4,"ax":39,"ay":68,"x":0,"y":639,"img":"robot","sc":1,"pk":1.3}},"cultist":{"walk":{"fw":38,"fh":40,"n":8,"ax":19,"ay":38,"x":0,"y":0,"img":"cultist","pk":1.0},"idle":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":40,"img":"cultist","pk":1.0},"melee":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":80,"img":"cultist","pk":1.0},"ranged":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":120,"img":"cultist","pk":1.0},"summon":{"fw":38,"fh":40,"n":4,"ax":19,"ay":38,"x":0,"y":160,"img":"cultist","pk":1.0},"hurt":{"fw":38,"fh":40,"n":2,"ax":19,"ay":38,"x":0,"y":200,"img":"cultist","pk":1.0},"death":{"fw":38,"fh":40,"n":5,"ax":19,"ay":38,"x":0,"y":240,"img":"cultist","pk":1.0}},"tentacle":{"emerge":{"fw":112,"fh":88,"n":5,"ax":78,"ay":84,"x":0,"y":0,"img":"tentacle"},"idle":{"fw":112,"fh":88,"n":8,"ax":78,"ay":84,"x":0,"y":88,"img":"tentacle"},"attack":{"fw":112,"fh":88,"n":6,"ax":78,"ay":84,"x":0,"y":176,"img":"tentacle"},"hit":{"fw":112,"fh":88,"n":2,"ax":78,"ay":84,"x":0,"y":264,"img":"tentacle"},"death":{"fw":112,"fh":88,"n":6,"ax":78,"ay":84,"x":0,"y":352,"img":"tentacle"}},"lumberjack":{"idle":{"fw":154,"fh":129,"n":1,"ax":82,"ay":121,"x":0,"y":0,"img":"lumberjack","pre":0.5526},"walk":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":129,"img":"lumberjack","pre":0.5526},"run":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":258,"img":"lumberjack","pre":0.5526},"melee":{"fw":154,"fh":129,"n":3,"ax":82,"ay":121,"x":0,"y":388,"img":"lumberjack","pre":0.5526},"ranged":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":517,"img":"lumberjack","pre":0.5526},"hurt":{"fw":154,"fh":129,"n":2,"ax":82,"ay":121,"x":0,"y":646,"img":"lumberjack","pre":0.5526},"death":{"fw":154,"fh":129,"n":3,"ax":82,"ay":121,"x":0,"y":776,"img":"lumberjack","fall":1,"pre":0.5526},"spin":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":905,"img":"lumberjack","pre":0.5526},"chop":{"fw":154,"fh":129,"n":4,"ax":82,"ay":121,"x":0,"y":1034,"img":"lumberjack","pre":0.5526},"leap":{"fw":154,"fh":129,"n":4,"ax":82,"ay":121,"x":0,"y":1163,"img":"lumberjack","pre":0.5526},"rage":{"fw":154,"fh":129,"n":4,"ax":82,"ay":121,"x":0,"y":1292,"img":"lumberjack","pre":0.5526},"roll":{"fw":154,"fh":129,"n":6,"ax":82,"ay":121,"x":0,"y":1422,"img":"lumberjack","pre":0.5526}},"dog":{"run":{"fw":62,"fh":34,"n":4,"ax":31,"ay":32,"x":0,"y":0,"img":"dog"},"walk":{"fw":62,"fh":34,"n":6,"ax":31,"ay":32,"x":0,"y":34,"img":"dog"},"idle":{"fw":62,"fh":34,"n":4,"ax":31,"ay":32,"x":0,"y":68,"img":"dog"},"melee":{"fw":62,"fh":34,"n":3,"ax":31,"ay":32,"x":0,"y":102,"img":"dog"},"hurt":{"fw":62,"fh":34,"n":1,"ax":31,"ay":32,"x":0,"y":136,"img":"dog"},"death":{"fw":62,"fh":34,"n":2,"ax":31,"ay":32,"x":0,"y":170,"img":"dog"}},"shoshi":{"idle":{"fw":112,"fh":84,"n":6,"ax":46,"ay":80,"x":0,"y":0,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"walk":{"fw":112,"fh":84,"n":8,"ax":46,"ay":80,"x":0,"y":84,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"run":{"fw":112,"fh":84,"n":8,"ax":46,"ay":80,"x":0,"y":168,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"ranged":{"fw":112,"fh":84,"n":5,"ax":46,"ay":80,"x":0,"y":252,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"melee":{"fw":112,"fh":84,"n":3,"ax":46,"ay":80,"x":0,"y":336,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"use":{"fw":112,"fh":84,"n":4,"ax":46,"ay":80,"x":0,"y":420,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"hurt":{"fw":112,"fh":84,"n":4,"ax":46,"ay":80,"x":0,"y":504,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1},"death":{"fw":112,"fh":84,"n":4,"ax":46,"ay":80,"x":0,"y":588,"img":"shoshi","pre":0.4737,"art":1,"pk":1.65,"faceR":1}},"soldier":{"idle":{"fw":128,"fh":128,"n":7,"ax":64,"ay":128,"x":0,"y":0,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"walk":{"fw":128,"fh":128,"n":7,"ax":64,"ay":128,"x":0,"y":128,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"run":{"fw":128,"fh":128,"n":8,"ax":64,"ay":128,"x":0,"y":256,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"ranged":{"fw":128,"fh":128,"n":4,"ax":64,"ay":128,"x":0,"y":384,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"melee":{"fw":128,"fh":128,"n":3,"ax":64,"ay":128,"x":0,"y":512,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"reload":{"fw":128,"fh":128,"n":13,"ax":64,"ay":128,"x":0,"y":640,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"throw":{"fw":128,"fh":128,"n":9,"ax":64,"ay":128,"x":0,"y":768,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"hurt":{"fw":128,"fh":128,"n":3,"ax":64,"ay":128,"x":0,"y":896,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0},"death":{"fw":128,"fh":128,"n":4,"ax":64,"ay":128,"x":0,"y":1024,"img":"soldier","pre":0.4598,"art":1,"faceR":1,"pk":2.0,"fall":0}},"screamer":{"walk":{"fw":96,"fh":96,"n":7,"ax":46,"ay":96,"x":0,"y":0,"img":"screamer","pre":1.4589,"art":1,"faceR":1},"atk":{"fw":96,"fh":96,"n":4,"ax":46,"ay":96,"x":0,"y":96,"img":"screamer","pre":1.4589,"art":1,"faceR":1},"scream":{"fw":96,"fh":96,"n":5,"ax":46,"ay":96,"x":0,"y":192,"img":"screamer","pre":1.4589,"art":1,"faceR":1},"idle":{"fw":96,"fh":96,"n":5,"ax":46,"ay":96,"x":0,"y":288,"img":"screamer","pre":1.4589,"art":1,"faceR":1},"die":{"fw":96,"fh":96,"n":5,"ax":46,"ay":96,"x":0,"y":384,"img":"screamer","pre":1.4589,"art":1,"faceR":1},"hurt":{"fw":96,"fh":96,"n":3,"ax":46,"ay":96,"x":0,"y":480,"img":"screamer","pre":1.4589,"art":1,"faceR":1}},"carcher":{"idle":{"fw":128,"fh":128,"n":6,"ax":59,"ay":128,"x":0,"y":0,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"walk":{"fw":128,"fh":128,"n":8,"ax":59,"ay":128,"x":0,"y":128,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"run":{"fw":128,"fh":128,"n":8,"ax":59,"ay":128,"x":0,"y":256,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"ranged":{"fw":128,"fh":128,"n":14,"ax":59,"ay":128,"x":0,"y":384,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"shot2":{"fw":128,"fh":128,"n":13,"ax":59,"ay":128,"x":0,"y":512,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"melee":{"fw":128,"fh":128,"n":4,"ax":59,"ay":128,"x":0,"y":640,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"jump":{"fw":128,"fh":128,"n":9,"ax":59,"ay":128,"x":0,"y":768,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"hurt":{"fw":128,"fh":128,"n":3,"ax":59,"ay":128,"x":0,"y":896,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5},"death":{"fw":128,"fh":128,"n":3,"ax":59,"ay":128,"x":0,"y":1024,"img":"carcher","pre":0.6146,"faceR":1,"pk":1.5}},"csorc":{"idle":{"fw":128,"fh":128,"n":6,"ax":65,"ay":128,"x":0,"y":0,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"walk":{"fw":128,"fh":128,"n":7,"ax":65,"ay":128,"x":0,"y":128,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"run":{"fw":128,"fh":128,"n":8,"ax":65,"ay":128,"x":0,"y":256,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"ranged":{"fw":128,"fh":128,"n":4,"ax":65,"ay":128,"x":0,"y":384,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"cast":{"fw":128,"fh":128,"n":10,"ax":65,"ay":128,"x":0,"y":512,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"nova":{"fw":128,"fh":128,"n":7,"ax":65,"ay":128,"x":0,"y":640,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"melee":{"fw":128,"fh":128,"n":4,"ax":65,"ay":128,"x":0,"y":768,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"hurt":{"fw":128,"fh":128,"n":4,"ax":65,"ay":128,"x":0,"y":896,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5},"death":{"fw":128,"fh":128,"n":4,"ax":65,"ay":128,"x":0,"y":1024,"img":"csorc","pre":0.624,"faceR":1,"pk":1.5}}},"harvest":{"idle":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":0,"img":"harvest","art":0},"walk":{"fw":160,"fh":160,"n":8,"ax":80,"ay":154,"x":0,"y":160,"img":"harvest","art":0},"run":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":320,"img":"harvest","art":0},"sweep":{"fw":160,"fh":160,"n":8,"ax":80,"ay":154,"x":0,"y":480,"img":"harvest","art":0},"slam":{"fw":160,"fh":160,"n":7,"ax":80,"ay":154,"x":0,"y":640,"img":"harvest","art":0},"cast":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":800,"img":"harvest","art":0},"hurt":{"fw":160,"fh":160,"n":2,"ax":80,"ay":154,"x":0,"y":960,"img":"harvest","art":0},"enraged":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":1120,"img":"harvest","art":0},"die":{"fw":160,"fh":160,"n":10,"ax":80,"ay":154,"x":0,"y":1280,"img":"harvest","art":0}},"wraith":{"idle":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":0,"img":"wraith","art":0},"drift":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":160,"img":"wraith","art":0},"dash":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":320,"img":"wraith","art":0},"sweep":{"fw":160,"fh":160,"n":8,"ax":80,"ay":154,"x":0,"y":480,"img":"wraith","art":0},"claw":{"fw":160,"fh":160,"n":7,"ax":80,"ay":154,"x":0,"y":640,"img":"wraith","art":0},"cast":{"fw":160,"fh":160,"n":6,"ax":80,"ay":154,"x":0,"y":800,"img":"wraith","art":0},"hurt":{"fw":160,"fh":160,"n":2,"ax":80,"ay":154,"x":0,"y":960,"img":"wraith","art":0},"die":{"fw":160,"fh":160,"n":10,"ax":80,"ay":154,"x":0,"y":1120,"img":"wraith","art":0}},"frag":{"fw":128,"fh":128,"n":9,"ax":63,"ay":128,"x":0,"y":1152,"img":"soldier","pre":0.4598,"art":1},"strike":{"fw":52,"fh":264,"n":5,"ax":26,"ay":262,"x":0,"y":1152,"img":"csorc"}};    // sprite + backdrop atlas (built by make_crawl_art.py)
const OWNERS={Kyle:'🎩',Cheez:'🧀',Leon:'🪼',Eddie:'♠'};   // 0.12.92 (Kyle): everyone plays; the hero roster is shared   // 0.12.1: only Kyle's tab while the game is rebuilt (Cheez and Leon come back later)

// ======================================================================= CONFIG TABLES
const CFG={
  W:384,H:216,GROUND:200,
  stagesPerBiome:10,
  strangerStage:10,                  // clearing this frees the mystery stranger (3rd party spot)
  maxStage:20,                      /* 0.12.117 (Kyle): 1-10 the lake, 11-20 downtown; beat 20 to Prestige */
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
    {id:'grave',name:'Blackwater Lake',pool:{zombie:1,fireman:.14},boss:'gravelord'},
    {id:'city',name:'Downtown',pool:{zombie:1,fireman:.2},boss:null},   /* 0.12.108 (Kyle): the city streets. 0.12.117: stages 11-20 */
  ],   /* 0.12.85 (Kyle): only the cabin-by-the-lake level for now; it just keeps going. Saved for later:
    {id:'manor',name:'Hollowmere Cemetery',pool:{zombie:1,fireman:.14},boss:'countess'},
    {id:'bog',name:'The Cathedral Corridor',pool:{zombie:1,fireman:.14},boss:'maw'}, */
  enemies:{ // hp/dmg at stage 1; spd px/s; atk = seconds between hits; cost = spawn budget
    // rebuilt roster: only the zombie so far. animAtk = attack animation length (s), hitAt = when in it the blow lands (s)
    // Kyle's zombie: 25 HP (0.12.3, was 15), 1d6 per hit, swings every 1.25s, 12px reach, very slow, 3 armor (=6% less damage), small-medium knockback resistance,
    // 25% on hit to Bleed (20 dmg over 5s), item 4% / small gold 17.5%. Three looks (skins), identical stats.
    zombie:  {undead:1,scale:.88,aimScale:.88,hp:25,dmgDie:6,spd:9.5,   /* 0.12.136 (Kyle): 9.5 (was 8.8) */   /* 0.12.38 (Kyle): 12% smaller, about the size of our humanoids */atk:1.25,reach:12,armorPts:3,kbRes:.35,bleed:{chance:.25,dmg:20,dur:5},
              itemChance:.04,goldChance:.6,goldAmt:[2,6],stack:true,xp:2,pts:10,cost:1.2,animAtk:.6,hitAt:.38,skins:['zombie','zombie_f','zombie_b']},
    // 0.12.62 (Kyle) Fireman_Zombie: a zombie in turnout gear. A touch slower than a normal zombie, 1.25x the life, triple the armor,
    //   hits slightly harder, and can't be burned (fire and burn damage do nothing to him). Swings a heavy gloved arm.
    // 0.12.65 (Kyle): now 4x a zombie's health (100) and armor (12) at 2/5 its speed
    fireman: {undead:1,scale:.88,aimScale:.88,hp:100,dmgDie:7,spd:5,   /* 0.12.136 (Kyle): 5 (was 3.5) */atk:1.25,reach:12,armorPts:12,kbRes:.6,bleed:{chance:.25,dmg:20,dur:5},fireImmune:1,name:'Fireman_Zombie',
              itemChance:.05,goldChance:.65,goldAmt:[3,7],stack:true,xp:5,pts:30,cost:3.2,animAtk:.6,hitAt:.4,skins:['zombie_fire']},
    // 0.12.175 (Kyle) Screamer: a fast, lanky zombie woman (CraftPix freebie art). Fragile, hits light, runs. When she gets near the party she stops and
    //   SHRIEKS (1.4s): if she finishes it, 2-4 more zombies come running in (+1 every 5 stages, max 6). Kill or stun her mid-scream and nobody comes.
    //   Up to 2 shrieks, 14s apart. Stage 1: exactly one, in the last wave. Later stages: 1 (stage 2-4), 1-2 (5-9), 2 (10-14), 2-3 (15+), all in the back half of the waves.
    screamer:{undead:1,scale:.88,aimScale:.88,hp:20,dmgDie:4,spd:22,atk:1.0,reach:12,armorPts:1,kbRes:.15,name:'Screamer',fps:11,
              itemChance:.04,goldChance:.6,goldAmt:[2,6],stack:true,xp:4,pts:25,cost:2,animAtk:.5,hitAt:.35,skins:['screamer'],scream:{r:115,T:1.4,cd:14,max:2,n:[2,4]}},
    // Kyle's werewolf, the first fast enemy: zombie stats except 30 HP (0.12.3, was 40) and fast; hunts the back-line heroes first
    werewolf:{hp:38,dmgDie:7,spd:44,atk:1.2,reach:12,armorPts:4,   /* 0.12.65: a bit sturdier and meaner (was 30 HP, 1d6, 3 armor) */kbRes:.35,bleed:{chance:.25,dmg:20,dur:5},
              itemChance:.04,goldChance:.6,goldAmt:[2,6],xp:3,pts:16,cost:2.2,animAtk:.7,hitAt:.45,backline:true,fps:12,scale:.77,
              leap:{dmg:10,gap:20,dur:.5,cd:8}},   // jumping attack: bounds over a 20px gap and lands for 10 damage
  },
  harvestLive:true,wraithLive:true,   /* 0.12.132 (Kyle): switched on */   /* 0.12.127 (Kyle): switched on to try him */
  bosses:{
    wraith:{undead:1,name:'The Hollow Wraith',hp:1300,dmg:16,spd:16,xp:220,pts:5200,art:'wraith'},   /* 0.12.130 (Kyle) stage 20 boss */
    harvest:{undead:1,name:'The Harvest Knight',hp:1100,dmg:15,spd:12,xp:140,pts:3200,art:'harvest'},   /* 0.12.127 (Kyle) stage 10 boss */
    gravelord:{undead:1,name:'The Gravelord',hp:950,dmg:20,spd:9, xp:60, pts:1500},
    countess: {undead:1,name:'The Crimson Countess',hp:1350,dmg:20,spd:14,xp:90,pts:2500,fly:1},
    maw:      {name:'The Maw Below',hp:2000,dmg:28,spd:0, xp:130,pts:4000},
  },
  stage(n,prestige){
    const bi=Math.min(this.biomes.length-1,Math.floor((n-1)/this.stagesPerBiome)), b=this.biomes[bi];
    const P=prestige||0;
    return {n,biome:b,bi,boss:(n===10&&this.harvestLive)?'harvest':(n===20&&this.wraithLive)?'wraith':null,   /* 0.12.84 (Kyle): no bosses for now (the table stays for later) */
      len:1.5*(820+42*(n-1)),   // 5 stages per biome; each about 25% shorter than before
      rate:1.5*(0.62+0.061*(n-1))*(1+0.3*P),   // spawn budget per second
      // 0.12.13 (Kyle): each stage ~10-20% harder on average (was ~25%): +8% enemy HP, +5% damage and +4% more enemies per stage
      //   = about 1.08*1.05*1.04 = +18% total threat per stage (plus the extra werewolves and strays).
      // 0.12.65 (Kyle): enemies get +3% health, armor and damage per stage (rounded down), nothing else
      hpMul:Math.pow(1.03,n-1)*Math.pow(2.2,P),
      dmgMul:Math.pow(1.03,n-1)*Math.pow(1.8,P),
      countMul:1+.04*(n-1),   /* 0.12.104 (Kyle): 4% more enemies per stage (was 5%) */   /* 0.12.87 (Kyle): 5% more enemies per stage, rounded down per wave */   // more enemies per stage stays (that is numbers, not stats)
      xpMul:1+0.10*(n-1)+P*2.4};   /* 0.12.104 (Kyle): XP per kill +10% per stage (was 19%) */
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
  jp:{atk:'gunner',proj:'bullet',reach:18,range:290,hp:1,dmg:1},
  carcher:{atk:'gunner',proj:'arrow',reach:12,range:260,hp:1,dmg:1},   // 0.12.178 Chibi_Archer: bow
  csorc:{atk:'gunner',proj:'zap',reach:13,range:220,hp:1,dmg:1},   // 0.12.178 Chibi_Sorcerer: lightning bolts
  soldier:{atk:'gunner',proj:'bullet',reach:15,range:240,hp:1,dmg:1},   // 0.12.175 Soldier: assault rifle
  shoshi:{atk:'gunner',proj:'bullet',reach:1,range:230,hp:1,dmg:1},   // 0.12.110 Shoshi: machine pistol
  eng:{atk:'gunner',proj:'nade',reach:20,range:165,hp:1,dmg:1},   // 0.12.105 Engineer: wrench + Grenade_Launcher
  flannel:{atk:'gunner',proj:'bullet',reach:20,range:250,hp:1,dmg:1},
  lumberjack:{atk:'blade',proj:'yarrow',reach:22,range:200,hp:1,dmg:1},
  cultist:{atk:'gunner',proj:'void',reach:18,range:210,hp:1,dmg:1},   // 0.12.21 Void_Cultist: ritual dagger + void bolts
  robot:{atk:'gunner',proj:'gat',reach:22,range:160,hp:1,dmg:1},   // 0.12.17 Moss_Mech: arc blade + gatling arm   // 0.12.11 Lumber_Jack: axe + bow
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
const MOVE={carcher:19,csorc:16,soldier:16,shoshi:17,eng:15,jp:16,dog:24,cultist:15,robot:14,lumberjack:18,druid:16,archer:17,chibi:20,flannel:15,flannel_pal:15,grim:24,vile:26,felothar:18,thing:20,kykar:26,depala:22,kotis:34,dragons:30,mathas:28,turtle:22,marina:26,korvold:26,thranduil:32,joel:28,robots:22,blood:30,mech:24,weather:24};
const MINION_SPEED=62;
// how each hero's Summon spell behaves when recast (easy to retune per hero)
const SUMMON_STYLE={grim:'empower',thing:'empower',korvold:'empower',felothar:'mend',depala:'mend',robots:'mend',mech:'mend',
  vile:'volatile',mathas:'volatile',joel:'volatile',kykar:'swarm',kotis:'swarm',dragons:'swarm',turtle:'swarm',thranduil:'swarm',blood:'swarm',marina:'linger',weather:'linger'};
const SUMMON_TXT={empower:'Recasting grows the one already out (+25% power, up to 3 stacks) instead of adding another.',mend:'Recasting fully repairs and refreshes the one already out.',
  volatile:'Recasting detonates the old one in a blast as the new one arrives.',swarm:'Calls two smaller ones each time.',linger:'Lasts 18s; recasting refreshes it.'};
const RANGED_SUMMONERS=new Set(['robots','mech','marina','kykar','thing','vile']);   // their summons shoot from mid-screen; everyone else's charge in
// ---- signature abilities: every hero comes with one, on its own cooldown (not a spell slot). fn(game, hero, atk)
const SIG={
  carcher:{name:'Piercing_Shot · Tumble · Light_Feet',cd:10,txt:'Shoots a bow from long range, puts a Piercing_Shot through a whole line of zombies, and Tumbles back out of reach when one gets on her, loosing an arrow mid-air. Light_Feet: quick and hard to pin down.',fn:()=>false},
  csorc:{name:'Chain_Lightning · Thunderclap · Arcane_Flow',cd:11,txt:'Throws sparks of lightning, arcs Chain_Lightning through a pack, and calls down a Thunderclap on a crowd (big hit and a stun). Arcane_Flow: every kill gives him energy back.',fn:()=>false},
  soldier:{name:'Frag_Grenade · Battle_Hardened',cd:14,txt:'Holds the middle with an Assault_Rifle (24-round mag) and a rifle-butt up close, lobs a Frag_Grenade into bunched-up zombies (4d6 blast and a 1.5s stun), and is Battle_Hardened: below half HP he takes 15% less damage and reloads 25% faster.',fn:()=>false},
  shoshi:{name:'Ctrl_Z · Turn_It_Off_And_On_Again · Tech_Support · Dad_Mode · Always_Online',cd:12,txt:'Taps zombies with an Automatic_Pistol (20-round mag; unloads on big targets), undoes the damage an ally just took, reboots allies in trouble, keeps everyone\'s cooldowns moving with Tech_Support, goes dad mode for anyone about to drop, and is Always_Online: pings when someone goes down, kills car alarms from his phone, and calls targets for everyone near him.',fn:()=>false},
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
  cultist:{name:'Syphon_Life · Lethal_Strikes · Spawn_Tentacle · Call_of_Cthulhu · Ritual_Blade',cd:12,txt:'A hooded void cultist with a poisoned ritual dagger who pays for his magic in blood.',fn:()=>false},
  robot:{name:'Arc_Surge · Missile_Barrage · Smoke_Screen · Nano-Tech_Repair_Bots',cd:12,txt:'A hunched olive war-walker: a flamethrower up close, a Targeted Lazer at range, and a jetpack for getting out of trouble.',fn:()=>false},
  lumberjack:{name:'Whirl_Wind · Ground_Chop · Hatchet_Leap · Timber_Rage · Feller\'s_Rhythm',cd:14,txt:'An axeman with a hunting bow.',fn:()=>false},
  druid:{name:'Mend · Rejuvenating Bloom · Thorn Wave · Cyclone',cd:4,txt:'Mend (20 energy, 5s): instantly heals the most-hurt ally 10%. Rejuvenating Bloom (40 energy, 14s): heals an ally 4% of max HP every second for 8s. Thorn Wave (35 energy, 14s): a wave of thorns erupts along the ground down her lane; everything it bursts under takes 2d6 and bleeds. Cyclone (40 energy, 18s): a tornado wanders in front of her for 5s, pulling nearby enemies in and grinding down everything inside it.',fn:()=>false},
  archer:{name:'Arrow_Rain · One Nocked, Two in Hand · Blow_Gun',cd:14,txt:'Arrow_Rain (40 energy, 18s cooldown): looses a volley into the air and 16 arrows rain down on the thickest group of enemies (1d6 each, about 70px wide and 2 lanes up and down). Blow_Gun (25 energy, 9s cooldown): puffs a poison dart that always adds 1 poison stack to a living target (75% chance of a 2nd, 50% of a 3rd); each stack deals 3% of max HP every 1.5s for 7.5s, and any new stack resets the timer. Undead are immune. One Nocked, Two in Hand (30 energy, 14s cooldown): he nocks one arrow and holds two more ready, his next 3 arrows fly much faster (a third of the usual wait, quicker draw). Longbow shots (1d10) and a close-range bow strike (1d8).',fn:()=>false},
  chibi:{name:'Wave Dash · War Cry · Poultice',cd:10,txt:'Wave Dash (45 energy, 16s cooldown): rides a blue energy wave up to 400px forward, hitting everything it passes through (2 lanes up and down) for a normal sword hit (2d5 base, buffs and crits apply). War Cry (20 energy, 7s cooldown): every ally within 800px gets +25% damage and attack speed for 7s. Sword combo: Attack 1, Attack 2, and a running slash, plus a kunai throw (1d4) at enemies he can\'t reach yet.',fn:()=>false},
  eng:{name:'Build · Repair · Modify · Satchel_Charge · Field_Plating',cd:20,txt:'Builds a watchtower, a concrete barrier and a tesla coil, fixes them and the Warhound, bolts auto-turrets onto wrecks, and blows things up with a satchel he sets off himself.',fn:()=>false},
  jp:{name:'Toke_Break · Protect_the_Familia · No_Scope · Trash_Talk',cd:20,txt:'Smokes up to get HIGH (Wake_n_Bake), rushes in to shield family in trouble (and shield-bashes the closest zombie away), no-scopes zombies in a line with the Kar98 and talks trash to pull zombies onto himself.'},
  flannel:{name:'Aimed Shot · Proximity_Bomb · Traveling_Companion',cd:14,txt:'Call Traveling_Companion (25 energy, 24s cooldown, 0.8s whistle): calls his Traveling_Companion, a timid partner who circles around him, with a third of his stats, her own Brick Throw (never misses, 75% stun) and Bottle_Distraction (34 energy, 16s: she lobs a bottle behind the zombies, preferably behind a crowd; every zombie within 180px turns and walks to the noise for 2.5s). If she is already out, she heals 7% of her max HP instead. Proximity_Bomb (35 energy, 10s cooldown): planted, tossed underhand to roll, or thrown overhand; it blows up the first enemy to come near it, hurting everything around it (area damage, knockback, 50% bleed). Aimed Shot (40 energy, 14s cooldown, 2s cast with a laser sight): a carefully aimed rifle shot that always goes to the middle (head) box, with +5% crit chance and 2.5x crit damage. Pierces through one enemy.',fn:()=>false},   // runs from Game.gunner (CHAR abilities), shown here
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
  const pts=target.E&&target.armorPts!=null?target.armorPts:((target.E&&target.E.armorPts)||(target.B&&target.B.armorPts)||target.armorPts||0);   /* enemies carry their own stage-scaled armor */
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
const OBST={"rock_moss":{"x":0,"y":33,"fw":44,"fh":36,"lanes":1,"blk":34,"foot":[[-7.98,7.98]],"prof":[10,12,13,20,23,24,25,27,29,31,33,34,34,34,33,33,31,26,20,13,12,12]},"rock_pile":{"x":46,"y":39,"fw":32,"fh":30,"lanes":1,"blk":26,"foot":[[-5.7,5.7]],"prof":[5,15,19,22,23,25,27,28,28,28,27,25,22,18,8,7]},"rock_crack":{"x":80,"y":35,"fw":32,"fh":34,"lanes":1,"blk":32,"foot":[[-5.7,5.7]],"prof":[13,17,21,24,26,28,30,31,32,32,32,31,29,26,23,18]},"rock_swirl":{"x":114,"y":37,"fw":30,"fh":32,"lanes":1,"blk":30,"foot":[[-5.32,5.32]],"prof":[12,16,19,22,25,27,29,30,30,30,30,28,25,23,17]},"rock_dirt":{"x":146,"y":37,"fw":30,"fh":32,"lanes":1,"blk":30,"foot":[[-5.38,4.88]],"prof":[12,16,20,23,25,27,29,30,30,30,30,28,25,23,17]},"rock_crumble":{"x":178,"y":41,"fw":30,"fh":28,"lanes":1,"blk":24,"foot":[[-5.32,5.32]],"prof":[12,15,19,22,24,26,26,26,24,23,24,23,21,18,7]},"log_big":{"x":210,"y":35,"fw":80,"fh":34,"lanes":2,"blk":14,"foot":[[-19.5,6.5],[-10.0,20.0]],"prof":[11,16,20,21,21,21,22,22,22,22,23,22,23,24,24,25,24,25,27,26,27,27,27,28,28,29,29,30,30,30,31,31,32,32,32,33,33,32,32,28]},"trunk":{"x":292,"y":29,"fw":29,"fh":40,"lanes":1,"blk":40,"foot":[[-5.528,2.5279999999999996]],"prof":[9,10,14,19,34,35,37,38,37,38,38,38,35,35,0]},"stump":{"x":323,"y":37,"fw":18,"fh":32,"lanes":1,"blk":30,"foot":[[-3.16,2.16]],"prof":[20,27,30,30,30,30,30,29,28]},"bush_a":{"x":343,"y":49,"fw":22,"fh":20,"lanes":1,"blk":0,"foot":[[-3.04,3.04]],"prof":[13,15,15,17,18,18,17,15,17,18,18]},"bush_b":{"x":367,"y":47,"fw":23,"fh":22,"lanes":1,"blk":0,"foot":[[-3.7199999999999998,3.12]],"prof":[11,16,20,20,20,20,20,18,19,19,17,0]},"deadtree":{"x":392,"y":0,"fw":43,"fh":69,"lanes":1,"blk":52,"foot":[[-9.12,-2.2800000000000002]],"prof":[10,11,11,12,16,23,24,45,48,51,64,65,62,67,67,64,60,62,65,66,67,0]},"city_crate":{"x":0,"y":22,"fw":30,"fh":32,"lanes":1,"blk":25,"foot":[[-5.4,5.4]],"prof":[25,27,27,27,27,27,27,27,27,27,27,27,27,27,26],"img":"cityob","open":1},"city_crate_tall":{"x":62,"y":16,"fw":26,"fh":38,"lanes":1,"blk":31,"foot":[[-4.68,4.68]],"prof":[31,33,33,33,33,33,33,33,33,33,33,33,32],"img":"cityob","open":1},"city_crate_stack":{"x":116,"y":0,"fw":40,"fh":54,"lanes":1,"blk":43,"foot":[[-7.2,7.2]],"prof":[0,43,45,45,45,45,45,45,45,45,45,45,45,45,44,25,25,25,25,24],"img":"cityob","open":1},"city_lootbox":{"x":198,"y":32,"fw":32,"fh":22,"lanes":1,"blk":15,"foot":[[-5.76,5.76]],"prof":[17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17],"img":"cityob","open":1},"city_moss_a":{"x":264,"y":39,"fw":44,"fh":15,"lanes":1,"blk":0,"foot":[[-7.92,7.92]],"prof":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"img":"cityob","flat":1},"city_moss_b":{"x":310,"y":41,"fw":32,"fh":13,"lanes":1,"blk":0,"foot":[[-5.76,5.76]],"prof":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"img":"cityob","flat":1},"city_moss_c":{"x":344,"y":37,"fw":58,"fh":17,"lanes":1,"blk":0,"foot":[[-10.44,10.44]],"prof":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"img":"cityob","flat":1},"city_front":{"x":0,"y":0,"fw":2,"fh":2,"lanes":1,"blk":0,"foot":[[-7,7]],"prof":[0],"flat":1,"front":1},"city_pillar":{"x":0,"y":0,"fw":8,"fh":2,"lanes":1,"blk":0,"foot":[[-1.2,1.2]],"prof":[0],"pillar":1,"pass":1}};
const CARS={"car_hatch":{"x":0,"y":8,"fw":110,"fh":40,"lanes":2,"blk":32,"foot":[[-25.3,25.3],[-25.3,25.3]],"img":"cars","prof":[0,0,1,1,12,20,20,21,21,22,22,22,23,23,23,24,27,28,30,33,34,35,35,36,37,37,37,37,37,38,38,39,39,38,38,38,38,37,37,36,36,36,35,34,32,30,28,26,23,13,3,2,1,0,0],"lights":{"head":[16.1,20.3],"tail":[92.2,20.8]}},"car_van":{"x":112,"y":0,"fw":141,"fh":48,"lanes":2,"blk":38,"foot":[[-32.4,32.4],[-32.4,32.4]],"img":"cars","prof":[2,3,5,5,6,7,10,25,26,27,27,28,29,30,35,41,43,43,43,44,44,44,44,45,46,46,47,47,46,46,45,45,44,45,45,45,45,46,46,46,46,46,45,45,45,45,45,45,45,44,44,45,45,45,45,45,44,43,35,33,12,6,6,6,4,4,1,0,0,0,0],"lights":{"head":[23.7,25.7],"tail":[113.0,24.0]}},"car_sedan":{"x":255,"y":6,"fw":94,"fh":42,"lanes":2,"blk":34,"foot":[[-21.6,21.6],[-21.6,21.6]],"img":"cars","prof":[20,22,23,24,25,25,26,26,26,27,27,29,32,34,38,39,39,40,40,40,41,41,41,41,41,41,41,41,41,41,41,41,41,40,40,40,40,39,34,31,29,29,28,28,28,28,22],"lights":{"head":[5.7,23.3],"tail":[90.0,21.0]}},"car_coupe":{"x":351,"y":12,"fw":129,"fh":36,"lanes":2,"blk":29,"foot":[[-29.7,29.7],[-29.7,29.7]],"img":"cars","prof":[1,1,2,2,3,3,1,3,3,14,21,22,22,20,21,23,24,23,24,25,25,27,27,29,30,32,33,33,33,34,35,35,33,33,33,33,33,32,33,33,33,32,31,30,29,28,27,26,25,25,25,25,20,3,3,4,3,2,2,1,1,1,1,1,1],"lights":{"head":[28.1,20.1],"tail":[101.0,18.0]}},"car_muscle":{"x":482,"y":10,"fw":129,"fh":38,"lanes":2,"blk":30,"foot":[[-29.7,29.7],[-29.7,29.7]],"img":"cars","prof":[3,3,3,1,2,2,4,4,8,17,21,22,23,23,24,24,25,26,26,26,26,25,29,30,30,32,32,34,35,35,37,35,36,37,35,35,35,36,37,36,35,35,35,35,35,35,35,33,33,31,30,30,30,29,28,27,26,23,19,3,2,2,1,1,1],"lights":{"head":[25.0,20.8],"tail":[110.2,20.1]}},"car_ambulance":{"x":613,"y":0,"fw":141,"fh":48,"lanes":2,"blk":38,"foot":[[-32.4,32.4],[-32.4,32.4]],"img":"cars","prof":[2,3,5,5,6,7,10,25,26,27,27,28,29,30,35,41,43,45,45,45,45,45,45,45,46,46,47,47,46,46,45,45,44,45,45,45,45,46,46,46,46,46,45,45,45,45,45,45,45,44,44,45,45,45,45,45,44,43,35,33,12,6,6,6,4,4,1,0,0,0,0],"lights":{"head":[23.6,25.5],"tail":[110.1,24.8]}},"car_vw":{"x":756,"y":4,"fw":73,"fh":44,"lanes":2,"blk":35,"foot":[[-16.8,16.8],[-16.8,16.8]],"img":"cars","lights":{"head":[12.8,29.4],"tail":[61.7,22.0]},"prof":[0,1,1,12,20,25,29,28,29,30,30,30,30,30,37,38,43,41,38,41,41,35,36,36,29,29,29,29,29,29,27,25,8,1,3,0,0]}};Object.assign(OBST,CARS);   // 0.12.29 broken-down cars (Kyle's art), real-car sized, smooth edges, 2 lanes, tall
const OBST_POOL=[['car_ambulance',.5],['car_muscle',1.4],['car_hatch',1.5],['car_van',1.2],['car_vw',1.2],['car_sedan',1.5],['car_coupe',1.4],['rock_moss',3],['rock_pile',3],['rock_crack',3],['rock_swirl',2],['rock_dirt',3],['rock_crumble',3],['log_big',2],['trunk',2],['stump',3],['bush_a',2],['bush_b',2],['deadtree',1],['city_crate',1.5],['city_crate_tall',1.1],['city_crate_stack',.8],['city_lootbox',.6],['city_moss_a',4.4],['city_moss_b',4.4],['city_moss_c',2.2]];   /* 0.12.119 (Kyle): downtown gets crates, loot boxes and moss patches instead of rocks and logs */
const SEARCHABLE=/^rock_|^log_|^stump|^trunk|^bush|^deadtree|^city_moss/;const CONTAINER=/^car_|^city_crate|^city_lootbox|^city_front/;const ALARMABLE=/^car_|^city_front/;const SEARCH_RE={herbalist:SEARCHABLE,scavenger:CONTAINER},SEARCH_T={herbalist:1.5,scavenger:2};   // 0.12.28 Herbalist searches these (foliage too)
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
const HERO_HITBOX={w:20,h:46},HERO_HB={carcher:{w:16,h:40},csorc:{w:16,h:40},soldier:{w:18,h:46},shoshi:{w:18,h:44},eng:{w:20,h:46},jp:{w:20,h:46},dog:{w:16,h:22},cultist:{w:14,h:36},robot:{w:23,h:52},lumberjack:{w:20,h:46},druid:{w:18,h:46},archer:{w:20,h:46},flannel:{w:20,h:46},flannel_pal:{w:18,h:42}};   // Flannel_Man: full-detail art drawn at normal humanoid size
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
const ENERGY={max:u=>u.enMaxB||100,regen:u=>u.enRegenB||4.6};   // 0.12.169 (Kyle): base regen 4.6/s (was 5)
function regenEnergy(u,dt){const M=ENERGY.max(u);if(u.en==null)u.en=M;u.enMax=M;u.enTick=(u.enTick||0)+dt;while(u.enTick>=.5){u.enTick-=.5;u.en=Math.min(M,u.en+ENERGY.regen(u)*.5);}}   // ticks every 0.5s
function spendEnergy(u,c){c*=u.enCostM||1;if((u.en||0)<c)return false;u.en-=c;unstealth(u);return true;}   // 0.12.67: using an ability breaks stealth
/* 0.12.67 Stealth (generic, for any future stealth source too): u.stealthT>0 = zombies can't pick you as a target and lose you if they had you.
   Attacking or using an ability breaks it (and a short lockout stops the same smoke cloud from re-hiding you instantly). */
function onMeE(g,h){const x=g.heroX(h);return g.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-x)<16).length;}
function unstealth(u){if(u&&u.stealthT>0){u.stealthT=0;u.stealthCd=1.2;}}
// Werewolves come in a set number per stage (Kyle: 1 on stage 1, 2 on stage 3), spread along the stage instead of from the random pool
const CLUSTERS={count:8,first:3,last:[7,9],cap:7};
const CLUSTERS1={count:8,first:3,last:[8,9],cap:7};   /* 0.12.134 (Kyle): one fewer zombie in every stage-1 wave */   /* 0.12.104 (Kyle): stage 1 only: bigger waves, the last one most of all (other stages keep 3 -> 7-9) */   // 0.12.84 (Kyle: good waves of regular zombies): 8 waves, 3 at the start to 7-9 at the end   // Kyle: first cluster 2, last cluster 6-7
const WOLVES_PER_STAGE=n=>n<2?0:Math.min(8,2+Math.floor((n-2)*.5));   // 0.12.84 (Kyle): no werewolves on stage 1; 2 on stage 2, one more every 2 stages, max 8   // 0.12.65 (Kyle: too weak / too few): 3 on stage 1, one more about every 2 stages   // 0.12.13 (Kyle): 2 on stage 1, then one more about every 2-3 stages (2,2,2,3,3,4,4,4,5...)
const STRAYS_PER_STAGE=n=>3+Math.floor((n-1)/3);   // 0.12.84: one more lonely zombie per stage   // 0.12.13 (Kyle): a lonely zombie here or there between cluster waves
const ENEMY_BODY=9;   // px between a melee enemy's centre and the front hero's centre before reach is added
const HERO_FLAT_HP=0,HP_PER_STAMINA=5,HERO_DICE=[2,4],HERO_BASE_CRIT=.1;   // basic attack = 2d4; every hero starts at 10% crit
// ---- 0.12.3 real characters: every number comes straight from the character sheet Kyle fills out
const CHAR={
  // 0.12.110 (Kyle) SHOSHI: Kyle's cousin, his go-to tech guy. Smart, funny, always helps when asked. Works at Life360, wife and a 4-year-old girl.
  //   Purple hoodie, jeans, glasses and a headset; a machine pistol in 3-round bursts. A support gunner who keeps everyone running.
  shoshi:{name:'Shoshi',role:'Automatic_Pistol + Tech Support',flatHp:0,stamina:9,hpPerStamina:5,armorPts:5,dodge:.07,kbRes:.25,
    melee:{dice:[1,1],every:99,reach:0,kb:0,hitAt:.1},   // 0.12.110 (Kyle): no melee at all; up close he just keeps shooting
    ranged:{dice:[1,4],flat:0,every:.08,range:230,clip:20,reload:3.25,pellets:1,anim:.12,burst:1,burstGap:.45,tapAcc:15,sprayAcc:-6},   /* 0.12.110 (Kyle): TAP = single aimed shots (+15 acc, ~2/s); UNLOAD = full auto (-6 acc) on a big target or one mauling a hurt ally */   // 0.12.110 (Kyle): auto-switch Glock, 20-round mag (0.12.111, was 33), ~12 rounds/s. Aimed taps normally; he UNLOADS on a big or dangerous target
    acc:16,walkPenalty:8,crit:.08,critMul:1.75,luck:18,xp:0,run:2,turn:.2,enMax:100,enRegen:4.6,
    abilities:[
      // Always_Online (passive, one big one: Life360 + his phone): he always knows where his people are and everything is connected.
      //   - When an ally goes down he gets a PING: +40% move speed for 4s to get there, and he helps anyone up 30% faster.
      //   - Car alarms within 150px get shut off from his phone in 1.5s (he stops to tap it, no running over).
      //   - Allies within 100px of him get +5 accuracy (he's calling targets on the headset).
      {id:'online',name:'Always_Online',passive:1,move:.4,dur:4,rev:.3,r:150,T:1.5,auraR:100,auraAcc:5},
      // Ctrl_Z: UNDO. IF an ally within 90px lost 25%+ of their max HP in the last 3s THEN he undoes it: they get all of it back. 30 energy, 20s.
      {id:'undo',name:'Ctrl_Z',en:34,cd:20,r:90,win:3,min:.25},
      // Turn_It_Off_And_On_Again: he "reboots" an ally within 70px: clears bleed, fear and slow, heals 8% and refreshes one of their cooldowns.
      //   IF an ally near me is bleeding/afraid/slowed, OR under 50% with an ability on cooldown THEN reboot them. 25 energy, 12s.
      {id:'reboot',name:'Turn_It_Off_And_On_Again',en:29,cd:12,r:70,heal:.08,under:.5},
      // Tech_Support (was Free_Trial): an INSTANT, no buff. Every cast cuts the remaining cooldowns of every ally within 100px (not his own) by 15% and gives each +5 energy.
      //   IF an ally near me has a cooldown running AND there's a fight near us THEN do it. 15 energy, 7s (0.12.116: 15% cut + 5 energy each).
      {id:'trial',name:'Tech_Support',en:17,cd:7,r:100,cut:.15,energy:5},   /* 0.12.116 (Kyle): 15% cut, 7s, 15 energy; little bonus: +5 energy to each ally (he pushed an update) */   /* 0.12.114 (Kyle): every cast cuts the remaining cooldowns of every ally near him (not his own) by 20%, plus 3s of +10% damage. 12 energy, 6s: he keeps it going */
      // Dad_Mode: IF an ally within 90px is under 40% with 2+ zombies on them THEN he plants himself next to them: 40% less damage for 5s,
      //   the ally gets a shield worth 20% of their max HP, and zombies on them get shoved back. 30 energy, 18s.
      {id:'dad',name:'Dad_Mode',en:34,cd:18,r:90,dur:5,dr:.4,shield:.2,under:.4,kb:30}]},
  // 0.12.178 (Kyle) Chibi_Archer (CraftPix chibi pack, the Archer): a little hooded archer. Long-range bow, light on her feet.
  //   Piercing_Shot: IF 3+ zombies are lined up ahead in one lane THEN a heavy arrow goes through all of them (up to 5): 2d6 each. 35 energy, 10s.
  //   Tumble: IF a zombie gets right on her THEN she hops back about 45px and looses an arrow mid-air. 25 energy, 12s.
  //   Light_Feet (passive): +12% dodge and she moves quicker than most.
  carcher:{name:'Chibi_Archer',role:'Bow + Tumble',flatHp:0,stamina:8,hpPerStamina:5,armorPts:3,dodge:.12,kbRes:.15,
    melee:{dice:[1,4],every:1.0,reach:12,kb:18,hitAt:.2},   // a quick kick with the bow
    ranged:{dice:[1,6],flat:2,every:1.15,range:260,clip:0,reload:0,pellets:1,anim:.9,releaseAt:.55},   // draw, hold, loose (her Shot_1 row)
    acc:20,walkPenalty:10,crit:.15,critMul:2,luck:20,xp:0,run:2,turn:.18,enMax:100,enRegen:4.6,
    abilities:[
      {id:'lightfeet',name:'Light_Feet',passive:1},
      {id:'pierce',name:'Piercing_Shot',en:40,cd:10,n:5,dice:[2,6],lineN:3},
      {id:'tumble',name:'Tumble',en:29,cd:12,dist:45,T:.6}]},
  // 0.12.178 (Kyle) Chibi_Sorcerer (CraftPix chibi pack, the Wizard): dark-haired, dark cloak, yellow lightning.
  //   Chain_Lightning: IF 2+ zombies are within 150 THEN a bolt hits the nearest and jumps to 3 more within 45 of each other: 2d6, 20% less each jump, and a 0.4s stun. 40 energy, 11s.
  //   Thunderclap: IF 3+ zombies are bunched 30-160 out THEN he charges up and calls lightning down on them: 3d6 in a 60-wide blast, 1s stun (bosses 0.4s). 45 energy, 16s.
  //   Arcane_Flow (passive): +3 energy every time he kills something.
  csorc:{name:'Chibi_Sorcerer',role:'Lightning + Staff',flatHp:0,stamina:8,hpPerStamina:5,armorPts:2,dodge:.06,kbRes:.15,
    melee:{dice:[1,4],every:1.2,reach:13,kb:16,hitAt:.2},   // staff bonk
    ranged:{dice:[1,8],flat:1,every:1.4,range:220,clip:0,reload:0,pellets:1,anim:.5,releaseAt:.3},   // a spark of lightning (his Attack_2 row)
    acc:18,walkPenalty:6,crit:.08,critMul:1.8,luck:18,xp:0,run:2,turn:.2,enMax:100,enRegen:4.6,
    abilities:[
      {id:'arcflow',name:'Arcane_Flow',passive:1,en:3},
      {id:'chain',name:'Chain_Lightning',en:46,cd:11,r:150,jump:45,n:4,dice:[2,6],fall:.2,stun:.4},
      {id:'thunder',name:'Thunderclap',en:52,cd:16,min:30,max:160,r:30,dice:[3,6],stun:1,T:.9}]},
  // 0.12.175 (Kyle) the Soldier (CraftPix freebie art): helmet, balaclava, plate carrier and an assault rifle. Steady mid-range shooter with a rifle-butt up close.
  //   Frag_Grenade: he pulls a pin and lobs it 40-130 out onto a bunch of zombies; it lands, ticks for 0.5s and blows: 4d6 in a 30-wide blast
  //   (full in the middle, 60% at the edge) and everything caught is STUNNED for 1.5s. He won't throw it where an ally would be caught.
  //   Battle_Hardened (passive): below half HP he takes 15% less damage and reloads 25% faster.
  soldier:{name:'Soldier',role:'Assault_Rifle + Frag_Grenade',flatHp:0,stamina:10,hpPerStamina:5,armorPts:8,dodge:.05,kbRes:.4,
    melee:{dice:[1,6],every:1.2,reach:15,kb:24,hitAt:.15},   // rifle-butt
    ranged:{dice:[1,6],flat:1,every:.5,range:240,clip:24,reload:2.8,pellets:1,anim:.3},   // assault rifle: ~2 rounds/s, 24-round mag, Recharge animation as the reload
    acc:17,walkPenalty:8,crit:.1,critMul:1.8,luck:16,xp:0,run:2,turn:.2,enMax:100,enRegen:4.6,
    abilities:[
      {id:'hardened',name:'Battle_Hardened',passive:1,under:.5,dr:.15,reload:.25},
      {id:'frag',name:'Frag_Grenade',en:40,cd:14,min:40,max:130,r:30,dice:[4,6],stun:1.5,fuse:.5,fly:.6}]},
  // 0.12.66 (Kyle) JP: big orange hoodie, dark jeans, Kar98 + a real sword and a homemade wooden shield. A good guy who loves picking on people,
  //   games all day and smokes a lot of weed (not a drinker). Plays sword-fight with his kids. Mixes jokey and sensible.
  jp:{name:'JP',role:'Kar98 + Sword & Board',flatHp:0,stamina:9,hpPerStamina:5,armorPts:7,dodge:.05,kbRes:.35,
    melee:{dice:[1,8],every:1.1,reach:18,kb:18,hitAt:.15},                    // sword: medium speed, low-medium damage
    ranged:{dice:[1,8],flat:4,every:2.25,range:290,clip:1,reload:2.25,pellets:1,quietReload:1,aimT:.25},   // 0.12.163 (Kyle): Kar98 1d8+4 with a 0.25s aim wind-up before the shot (was 4d4-2, no wind-up); 2.25s; he doesn't call out reloads
    acc:20,walkPenalty:12,crit:.12,critMul:2,luck:18,xp:0,run:2,turn:.22,enMax:100,enRegen:4.6,
    blockCh:.2,   // 0.12.79 Sword & Board (built into his melee kit): 20% to BLOCK a hit outright with the homemade shield. Any unit with a shield gets blockCh.
    abilities:[
      // Toke_Break: 2s, he can keep walking but does nothing else, then he's HIGH for 30s and patched up 6%. No energy, 22s.
      //   IF I'm not high (or nearly down) AND nothing is within 45px THEN spark one up.
      {id:'toke',name:'Toke_Break',en:0,cd:22,dur:2,high:30,heal:.06},
      // Protect_the_Familia: IF an ally is under 55% with a zombie on them (or under 35%) within ~660px THEN rush to them, immune while rushing;
      //   on arrival we both get a shield worth 50% of my max HP for 5s. 0.12.93 (Kyle): Shield_Bash is baked in: he shoves the ally 75px toward
      //   the friend furthest left AND bashes the closest zombie 75px the other way for 2d4 (1s stun). 50 energy, 20s.
      {id:'familia',name:'Protect_the_Familia',en:57,cd:20,range:220,spd:120,shield:.5,shieldT:5,push:25,under:.55,bashDice:[2,4],bashPush:25,bashStun:1},
      // 0.12.93 No_Scope (replaces Shield_Bash): the gamer in him. A hip-fired Kar98 flick that punches through up to 3 zombies in a line
      //   for 3d6 each (+15% crit). IF 2+ zombies are lined up in front of me within 290px (or a big one) THEN no-scope it. 35 energy, 15s.
      {id:'noscope',name:'No_Scope',en:40,cd:15,dice:[3,6],pierce:3,range:290,crit:.15},   // 0.12.94: toned down (was 4d6, 30 energy, 10s)
      // Trash_Talk: he picks on the zombies (and his friends). Every zombie within 70px comes for HIM for 4s while he hides behind the shield
      //   (30% less damage); his friends laugh it off: +5% crit for 6s. IF 2+ zombies are on an ally near me THEN talk trash. 25 energy, 18s.
      {id:'trash',name:'Trash_Talk',en:34,cd:12,r:70,dur:4,dr:.3,crit:.05,critT:6},   // 0.12.79: 12s, and more reasons to use it
      // Wake_n_Bake (passive): HIGH = +10% dodge, 10% less damage taken, +1 energy/s, +10% sword speed. Sober (not high for 10s+) =
      //   -6 accuracy, -10% move and attack speed, and he gets grumpy.
      {id:'baked',name:'Wake_n_Bake',passive:1,dodge:.2,dr:.2,en:1,   /* 0.12.151 (Kyle): +1 energy a second (was 2) */mspd:.2,slide:4,soberAfter:10,acc:-6,slow:.1}]},   // 0.12.79: high bonuses doubled + slides 4 toward slasher
  flannel:{name:'Flannel_Man',role:'Rifle + Melee',flatHp:0,stamina:8,hpPerStamina:5,armorPts:5,dodge:.05,kbRes:.40,
    melee:{dice:[1,12],every:1.5,reach:20,kb:23,hitAt:.15},                 // crowbar: d12, swing every 1.5s, 20px reach, knockback 23/100
    ranged:{dice:[1,8],flat:0,every:1.75,range:250,clip:1,reload:1.75,pellets:1},   /* bolt-action rifle: d8, 1.75s between shots (0.12.38: -0.25s), reloads after every shot */
    acc:18,walkPenalty:12,crit:.12,critMul:2,luck:21,xp:0,run:2,turn:.22,enMax:100,enRegen:4.6,
    // abilities (Kyle). Aimed Shot: skips the accuracy roll and lands in the MIDDLE box, +5% crit chance, crits hit 2.5x.
    //   Damage = the rifle's dice + every flat damage bonus, so it grows with future flat-damage items/effects.
    //   Cost: 40 energy (8s of base regen) and 14s cooldown: a big hit you see a few times a stage, leaving room for more abilities.
    abilities:[{id:'aimed',name:'Aimed Shot',en:52,cd:14,cast:2,pierce:1,box:'mid',critAdd:.05,critMul:2.5},
      // Trip Bomb: 1s to crouch and set a nail bomb on a stake with a tripwire, a little ahead in his lane. It arms after 0.6s and
      //   blows the first time a ground enemy walks into the wire: CROSS-shaped area damage (36px each way along the lane, 2 lanes
      //   up and down across it; full in the middle, half at the ends), a hard shove away from the blast, and nails that make 50% of victims bleed. 30 energy, 20s cooldown, 1 out at a time.
      // Call Companion: 0.8s whistle. If she isn't out, she joins the fight; if she is, she's patched up for 7% of her max HP instead.
      // Set_Camp: he kneels, flicks a lighter and starts a campfire (1.8s). The fire doesn't block anything; every ally within 250 screen px
      //   (83 world px) gets COZY: +1% max HP and +2 energy every second. The fire has 5 life and can't be attacked, but each time Flannel_Man or
      //   his Traveling_Companion takes damage from an attack it loses 1; at 0 it breaks and dies out. 35 energy, 30s cooldown.
      // 0.12.63 (Kyle): the fire gives COZY to every ally within 400 screen px (133 world) and keeps refreshing it while they stay (see COZY).
      {id:'camp',name:'Set_Camp',en:46,cd:30,cast:1.8,life:5,radius:133},
      // Grit_Teeth (Kyle, 0.12.15): he sets his jaw and digs in: 60% less damage taken for 7s, and for that time his personality slides
      //   hard toward close fighting (Shooter->Slasher +6, Aggressive +3), so the behavior system walks him up into crowbar range. He
      //   shouts for the squishier allies to get behind him. IF hurt (under 60%) with something on him, OR 3+ enemies close, THEN use it. 30 energy, 22s cooldown.
      // 0.12.63 (Kyle) True_Grit (was Grit_Teeth): 15s CD, lasts 8s: 50% less damage taken, +25% move speed, and his Careful/Reckless and
      //   Sharpshooter/Brawler sliders go to 10 for the duration (all-in, up close). IF hurt with something on him, OR 3+ close, THEN use it.
      {id:'grit',name:'True_Grit',en:40,cd:15,dur:8,dr:.5,under:.6,move:.25},
      // 0.12.68 (Kyle) Elite_Survivors (passive, replaces Call Traveling_Companion): his partner starts every stage beside him; he has the
      //   Scavenger perk built in; and while they're within 150 screen px (50 world) of each other both get +10% dodge.
      {id:'elite',name:'Elite_Survivors',passive:1,r:50,dodge:.1},
      // 0.12.59 (Kyle) Proximity_Bomb: one bomb, same blast shape every way, three activations on one shared 10s cooldown:
      //   OVERHAND THROW: a big arc ~117-133px out (350-400 screen px); it blows the moment it lands: 4d4.
      //   CAREFUL ROLL: underhand ~25px out (75 screen px), then it rolls ~17-25px more (50-75 screen px). IF a zombie comes near while it rolls
      //     THEN it blows early for 3d4 AND the cooldown is cut in half; ELSE it stops, and a moment later ACTIVATES (red glow): then 6d4.
      //   SET IT UP: kneel ~3s and plant it further down the trail; a planted bomb is activated: 6d4.
      //   IF one of his bombs is left behind off screen (the party moved on) THEN the cooldown is cut in half.
      // 0.12.64 (Kyle's hard stats, screen px / 3 = world px): 40 energy, 10s.
      //   Trigger: 40px wide in its own lane (+-6.7), 20px wide one lane up and one down (+-3.3).
      //   Blast: 100px wide in its own lane (+-16.7), 40px wide one lane up/down (+-6.7).
      //   OVERHAND: 1s cast (can walk), lands exactly where he picks 300-450px (100-150) away, blows on impact: 2d4+6, lanes up/down 60px wide (+-10).
      //   UNDERHAND: 0.5s cast (can walk), lands 100px (33) ahead, rolls 50px (17), then 0.5s to truly activate (flashing).
      //     Tripped before that: 2d4+2 and 2s back on the cooldown. Activated: 2d4+6.
      //   PLACE: 3s kneeling (no moving), put 5px (1.7) in front, active at once: 6d4+2, blast +20px wide (+-20) and +10px in the side lanes (+-8.3).
      //   Left behind off screen: what's left of the cooldown is halved.
      {id:'trip',name:'Proximity_Bomb',en:46,cd:10,arm:0,trig:{w0:6.7,w1:3.3},blast:{w0:16.7,w1:6.7},
        hurl:{min:100,max:150,h:42,dur:.95,cast:1,dmg:[[2,4],6],w1:10},lob:{dist:33,h:7,dur:.55,roll:16.7,rollSpd:26,settle:.5,cast:.5,early:[[2,4],2],live:[[2,4],6],refund:2},
        place:{cast:3,off:1.7,dmg:[[6,4],2],w0:20,w1:8.3},kb:45,bleed:{chance:.5,dmg:12,dur:4},life:40}]},
};

// ---- 0.12.3 Inspiration Decks (Kyle): pick a player, then one of their decks. Each deck gives one small, unique bonus tied to
//   what that deck is best at. sl = slider moves (a move that would go below 0 or above 10 doesn't happen). Easy to retune here.
const INSP={   /* 0.12.82 (Kyle): every deck now gives exactly TWO things (a passive or perk, a stat, a starting stash, or a slider nudge), as unique as possible and
   tied to what the deck does best. A slider nudge only counts as one of the two when the other bonus is a particularly strong passive. */
 // Kyle
 'The Grim Throne':{o:'Kyle',why:'Kenrith\'s royal court: nobody haggles like royalty, and the throne always gets its due in the end',passive:'haggler',perk:'inevitable'},
 'Felothar':{o:'Kyle',why:'Walls of root and bark: the pod\'s top Survival, and the forest feeds whoever holds behind them',passive:'herbalist',mod:{armor:6}},
 'Modular Beatdown':{o:'Kyle',why:'Gilgamesh suits up from a pile of spare parts and hits the hardest in the pod',passive:'resourceful',mod:{meleeDmg:20}},
 'A Vile Smashing':{o:'Kyle',why:'Wheels: the most cards seen, and everyone else\'s hand ends up in yours',passive:'pickpocket',mod:{xp:12}},
 'Truly Fantastic':{o:'Kyle',why:'The Thing: a walking pile of orange rock that nothing shoves, and the team\'s deep mana pool',passive:'mountain',mod:{enMax:24}},
 'Dice Boys Casino':{o:'Kyle',why:'Mr. House runs the casino: the house always has money, and the dice always seem to land his way',passive:'bankroll',perk:'superlucky'},
 'Tame Depala':{o:'Kyle',why:'Dwarf mechanics in plated rigs: hard to shove and they hit like a hammer',mod:{kbRes:20,meleeDmg:10}},
 "Life Swappin' Bounty Poppin'":{o:'Kyle',why:'Mathas puts bounties on the biggest threat and always gets paid',passive:'bounty',sl:{size:2}},
 'The Last of Us':{o:'Kyle',why:'Survivors who live off what they scrounge from the wrecks and slip every grab',passive:'scavenger',mod:{dodge:4}},
 'House on Haunted Hill':{o:'Kyle',why:'The house always sees you coming, and things that touch it get scared off',passive:'haunt',mod:{acc:6}},
 'Mothman Cometh!':{o:'Kyle',why:'A dark omen that is never quite where you hit, and never far behind',passive:'omen',sl:{lane:2}},
 'Ominous Weather':{o:'Kyle',why:'Isu\'s winter storms push everything back, and every storm fills the barrels',passive:'raincatch',mod:{kb:40}},   // 0.12.104: Rain Catcher instead of Sapper (Sapper stays on Cosmic Spider)   // 0.12.101 review: knockback 30 -> 40 (Sapper is situational)
 'Build a Scare':{o:'Kyle',why:'Illuna mutates into something bigger, stitched together from whatever is lying around, and stitches up whoever falls apart',perk:'medicine',mod:{stamina:2}},
 "Thunder's Decree":{o:'Kyle',why:'Zurgo only knows one way: forward, and faster every swing',passive:'onslaught',sl:{aggr:2}},
 // Cheez
 'Kykar, Zada & Feather':{o:'Cheez',why:'Wind\'s Fury: a flurry of cheap spells, one after another, from a flock that never sits still',mod:{cdr:15,move:8}},   // 0.12.100 (Kyle): 15% cooldown reduction, lighter second bonus
 'Double Dragons':{o:'Cheez',why:'Dragon fire, and two dragons means double the luck: every hoard they stumble on is a big one',perk:'superlucky',mod:{rangedDmg:16}},
 'Turtle Power':{o:'Cheez',why:'Shells and teamwork: when it gets bad, they pull in and wait it out',passive:'shell',mod:{armor:4}},
 'Korvold Eats Everything':{o:'Cheez',why:'Korvold feeds on what he kills, and eats (and drinks) everything they were carrying',passive:'devour',perk:'looter'},   // 0.12.104: Lucky Looter instead of a 3-food starting stash
 'Armed Robbery':{o:'Cheez',why:'Kotis steals from everyone, and his crew gets in and out before anyone notices',passive:'pickpocket',sl:{self:2}},
 'Blood Suckers':{o:'Cheez',why:'Lifelinking bats: the night always comes, and every bite they miss only makes the next one surer',perk:'inevitable',mod:{lifesteal:5}},
 'Mechanized Mayhem':{o:'Cheez',why:'Dr. Eggman strips wrecks for parts to overclock his guns',passive:'scavenger',mod:{rangedSpd:15}},
 // Leon
 'Family Matters':{o:'Leon',why:'Zinnia\'s copies look out for each other and bandage each other up',passive:'bodyguard',perk:'medicine'},
 'Thranduil':{o:'Leon',why:'Elven eyes and forest lore: knows every herb in the woods and never misses a shot',passive:'herbalist',mod:{acc:8}},
 'Primary Directive 2.0':{o:'Leon',why:'Optimus\'s rebuild: the Autobots patch themselves up from salvage, and a stack of big mana rocks keeps them charged',passive:'resourceful',mod:{enRegen:1}},
 'Cosmic Spider':{o:'Leon',why:'Spider-Sense and web shooters: his sense tingles near traps',passive:'webs',perk:'sapper'},
 // Eddie
 'Vivi':{o:'Eddie',why:'The Black Mage: his commander makes a pile of mana every turn and every spell hits harder',mod:{enRegen:1,rangedDmg:12}},   // 0.12.101 review: energy regen 1.5 -> 1 (was the strongest stat pair)
 'Bruce Banner':{o:'Eddie',why:'Hulk smash: the longer he runs at you, the harder the first punch lands, and he soaks a lot getting there',passive:'onslaught',mod:{stamina:2}},   // 0.12.101 review: Onslaught instead of +10% XP (more fun, on theme)
 'Cloud':{o:'Eddie',why:'Omnislash: a suited-up SOLDIER whose every big hit is a Limit Break',mod:{critMul:.3,crit:3}},
 'Kasla, the Broken Halo':{o:'Eddie',why:'Convoke: the whole angel army chips in, so everything at camp costs less, and she flies in fast',passive:'haggler',mod:{move:10}},
 'Master Splinter':{o:'Eddie',why:'A sewer rat knows where every scrap of food is, and his shuriken fly fast',passive:'forager',mod:{rangedSpd:15}},   // 0.12.104: Forager instead of Dark Omen (Omen stays on Mothman); shuriken speed 10 -> 15% to make up for it   // 0.12.101 review: Dark Omen (a sure dodge every 12s) instead of +4% dodge
 'Miles Morales':{o:'Eddie',why:'Spider-Man in the making: web shooters to slow them down, and he grows with every fight',passive:'webs',mod:{xp:8}},   // 0.12.101 review: Web Shooter instead of +6 Luck
 'Narset, Enlightened Master':{o:'Eddie',why:'A monk who turns every attack into free spells: her abilities come back 20% faster, with a little more energy to spend',mod:{cdr:20,enMax:10}},   // 0.12.98 (Kyle): cooldown reduction
};
const PLAYER_ICON={Kyle:'🎩',Cheez:'🧀',Leon:'🪼',Eddie:'♠'};
// what each character is like in a fight (shown when you hover them on the party screen)
// one line per ability for the party-screen hover boxes
const ABIL_DESC={
  autopistol:'Automatic_Pistol (his basic attack) · 1d4 a round, a 20-round mag, 3.25s reload. TAP: single aimed shots (+15 accuracy, about 2 a second). UNLOAD: full auto at about 12 rounds a second (-6 accuracy), used on big targets (firemen, werewolves, bosses), on anything mauling a hurt ally, and now and then just because. No melee: up close he just keeps shooting.',
  lightfeet:'Light_Feet (passive) · +12% dodge, and she moves quicker than most heroes.',
  pierce:'Piercing_Shot · 40 energy · 10s. When 3+ zombies are lined up ahead of her in one lane, she looses a heavy arrow that goes through all of them (up to 5): 2d6 each.',
  tumble:'Tumble · 29 energy · 12s. When a zombie gets right on her, she hops back about 135px and looses an arrow while she\'s in the air.',
  arcflow:'Arcane_Flow (passive) · +3 energy every time he kills something.',
  chain:'Chain_Lightning · 46 energy · 11s. When 2+ zombies are within 450px, a bolt hits the nearest and jumps to 3 more (each within 135px of the last): 2d6, 20% less each jump, and a 0.4s stun.',
  thunder:'Thunderclap · 52 energy · 16s. When 3+ zombies are bunched 90-480px out, he charges for 0.9s and calls lightning down on them: 3d6 in a 180px-wide blast and a 1s stun (bosses 0.4s).',
  frag:'Frag_Grenade · 40 energy · 14s. Pulls the pin and lobs it 40-130px out onto 3+ bunched zombies (or 2 with a big one). It lands, ticks for 0.5s and blows: 4d6 in a 90px-wide blast (full in the middle, 60% at the edge), and every zombie caught is STUNNED for 1.5s. He won\'t throw it where an ally would be caught.',
  hardened:'Battle_Hardened (passive) · below half HP he takes 15% less damage and reloads 25% faster.',
  online:'Always_Online (passive) · he always knows where his people are and everything is connected. When an ally goes down he gets a PING (+40% move speed for 4s, and he helps anyone up 30% faster). Car alarms within 450px are shut off from his phone in 1.5s. Allies within 300px get +5 accuracy from his target calls on the headset.',
  undo:'Ctrl_Z · 34 energy · 20s. When an ally within 270px (or he himself) has lost 25%+ of their max HP in the last 3s, he undoes it: they get all of it back.',
  reboot:'Turn_It_Off_And_On_Again · 29 energy · 12s. Reboots an ally within 210px: clears bleed, fear and slow, heals 8% and refreshes one of their cooldowns. Used on anyone bleeding, scared or slowed, or under half health with an ability waiting.',
  trial:'Tech_Support · 17 energy · 7s. An instant: every cast cuts the remaining cooldowns of every ally within 300px (not his own) by 15% and gives each of them +5 energy. Cheap and quick, so he keeps doing it all fight.',
  dad:'Dad_Mode · 34 energy · 18s. When an ally within 270px is under 40% with 2+ zombies on them, he plants himself beside them: 40% less damage for 5s, a shield worth 20% of their max HP, and the zombies on them get shoved back.',
  build:'Build · 29 energy · a spellbook of three buildings, each with its own cooldown (he kneels to build; his other cooldowns pause meanwhile). Built in: whenever one of his towers scrolls off behind the team, the tower and Modify cooldowns reset. WATCHTOWER (7s, 3s to build): chain-link, steel beams and a ladder; tier 1 (medical cross) heals allies near it 1% a second; Modify adds tier 2 (2.5s; ammo sign: +15% ranged attack speed nearby) and tier 3 (3.5s; (lookout: one ranged ally climbs up for +12 accuracy and +30% range and can\'t be hit until it falls; empty, it gives +5 accuracy nearby)). Each tier adds 15% to its health. HESCO_BARRIER (16s, 3s): one tall wire-mesh cell filled with dirt; zombies in its lanes can\'t pass and hit it instead; allies behind it +8 accuracy. TESLA COIL (22s, 3s): zaps the nearest zombie for 1d4+2 every 1.5s and arcs to one more, for 25s.',
  repair:'Repair · free, no cooldown · slow: patches up his buildings (6 HP a second) and the Warhound (2% a second) while he stays beside them. His other cooldowns pause while he works.',
  modify:'Modify · 34 energy · 10s, but a watchtower tier refunds 70% of that (back in 3s). Still takes its build time. Adds the next tier to his watchtower (5s, then 7s), or bolts an auto-turret onto a broken-down car: 3-round bursts 0.25s apart, 1s reload, not very accurate.',
  satchel:'Satchel_Charge · 40 energy · 18s. Tosses a satchel of explosives that never goes off on its own; he sets it off when it\'s worth it. The biggest blast in the game: 6d4 at the centre, falling off outward, and a huge shove.',
  plating:'Field_Plating (passive) · stay next to an ally for 3s and he straps a plate kit on them: +25% armor and +15% knockback resistance until they take 3 hits.',
  syphon:'Syphon_Life · 100 energy · 9s. A swirling black and purple beam from his chest into an enemy up to 330px away for 3s: it drains 3 life a second (more with damage buffs) and heals him for 1.25x what it drains. This is how he pays for everything else.',
  lethal:'Lethal_Strikes · 10% of his life · 20s · 12s. A frenzy: +75% dagger speed, 25% less per hit, Ritual_Blade poison doubled (50% chance, 2 stacks), and he goes all-in up close.',
  tentacle:'Spawn_Tentacle · 8% of his life · 10s. Raises a tentacle anywhere within 400px, right in the middle of the biggest pack. It can\'t move, lashes 1d6+2 out to its reach, heals off what it hits, and withers 5% a second.',
  cthulhu:'Call_of_Cthulhu · 15% of his life · 30s · 10s. His tentacles burrow and burst back up 200px in front of him, and a wave of terror rolls out from him and every tentacle: 2s of fear and 25% slower. For 10s every tentacle is 25% bigger (longer reach) and lashes 25% faster, and Spawn_Tentacle comes back twice as fast.',
  harvest:'Ritual_Harvest (passive) · built into his dagger: every dagger kill takes 1.5s off Spawn_Tentacle\'s cooldown.',
  blade:'Ritual_Blade (passive) · his poisoned ritual dagger: a hit that lands has a 25% chance to add a poison stack, every dagger swing refreshes the poison already on the target, and every dagger kill takes 1.5s off Spawn_Tentacle\'s cooldown.',
  clone:'Shadow_Clone · 40 energy · 18s. A see-through copy of him with a faint purple glow steps out for 5s and goes its own way: it runs to a different zombie (one bothering an ally first), swings his sword at 40% damage, and every zombie it hits turns on it for a moment. While it\'s near him it also soaks 35% of the blows aimed at him.',
  momentum:'Momentum · Passive. Every sword hit within 2s of the last one gives +6% attack speed, stacking up to +30%. Stop swinging for 2s and it resets.',
  pin:'Pinning_Shot · 34 energy · 12s. An arrow that nails the biggest threat to the ground for 2.5s and marks it for 6s: marked enemies take 25% more damage from everyone.',
  wind:'Wind_Reading · Passive. He reads the wind: shots at anything more than about 450px away get +15 accuracy and +0.5x crit damage.',
  resurge:'Verdant_Resurgence · Passive · 25s cooldown. When an ally would die, vines catch them: they stay up, can\'t be hurt for 2s and heal 30% of their max HP.',
  nano:'Nano-Tech_Repair_Bots · 40 energy · 20s. A machine can\'t be bandaged or healed with herbs and spells, so when he drops under 55% he stops and a swarm of repair bots restores 5% of his max life every second for 5s. He can\'t move or attack while they work, and cuts it short if he gets swarmed. Built in: every time he\'s hit there\'s a 10% chance the remaining cooldown is halved.',
  surge:'Arc_Surge · 34 energy · 15s · 8s. Overcharges the Targeted Lazer: 2d4 every 0.35s, a 25 px blast at the tip that sweeps 210 px instead of 150, and every lazer hit sets them on fire. He leans 3 toward Shooter while it lasts.',
  retreat:'Tactical_Retreat (passive) · when he drops under 30% he blasts off on a blue-flame jetpack in a big arc back to the rear and lands slowly. In the air a blue shield caps every hit at 5, and he fires about 3 single missiles at random zombies on the way. Once every 40s.',
  missiles:'Missile_Barrage · 52 energy · 15s. The pod on his back pops open and lobs 3 missiles high over the fight onto a group, spread wide; each one 2d4 in a small blast.',
  smoke:'Smoke_Screen · 40 energy · 16s. Lobs a smoke grenade between a hurt ally and the enemies on them: a thick cloud for 6s (about 180px wide). Enemies inside move 30% slower and miss half their attacks; allies inside dodge 25% of hits and are STEALTHED (see-through): zombies lose track of them until they attack or use an ability. Stealth lasts 5s after they step out; stepping back in refreshes it. Not the Warhound himself.',
  toke:'Toke_Break · no energy · 22s · 2s. He sparks up a big one and keeps walking but does nothing else while he smokes; then he\'s HIGH for 30s (see Wake_n_Bake) and feels 6% better.',
  familia:'Protect_the_Familia · 57 energy · 20s. When a friend within 660px drops under 55% with a zombie near them (or under 35% no matter what), he sprints to them (immune on the way), shields you both for 50% of his max HP for 5s, shoves the friend 75px toward whoever is furthest left, and shield-bashes the closest zombie 75px the other way for 2d4 with a 1s stun.',
  noscope:'No_Scope · 40 energy · 15s. The gamer in him: a hip-fired Kar98 flick that punches through up to 3 zombies in a line for 3d6 each, with +15% crit. Used when 2+ zombies line up in front of him, on one big one, or right after a Kar98 shot to finish off a lone zombie it would likely kill.',
  trash:'Trash_Talk · 34 energy · 12s. He roasts every zombie within 210px so they all come for him for 4s while he hides behind the shield (30% less damage); his friends laugh: +5% crit for 6s. He uses it when zombies are piling on a friend, or when 3+ are around him and he\'s above half health.',
  baked:'Wake_n_Bake · Passive. While HIGH: +20% dodge, 20% less damage taken, +1 energy a second, +20% sword speed, and he leans 4 toward Slasher. Sober for 10s+: -6 accuracy and 10% slower moving and attacking. Sword & Board (built in): 20% to BLOCK a hit outright with the shield.',
  aimed:'Aimed Shot · 52 energy · 14s · 2s cast with a laser sight. Never misses the head box, +5% crit, 2.5x crit damage, pierces. If the shot kills, what\'s left of its cooldown is halved.',
  trip:'Proximity_Bomb · 46 energy · 10s. One bomb, three ways out. It goes off when a zombie comes within 40px in its lane (20px one lane up or down); the blast covers 100px of its lane and 40px of the lanes above and below. OVERHAND (1s, can walk): thrown exactly where he picks 300-450px away, blows on impact for 2d4+6 (60px into the side lanes). UNDERHAND (0.5s, can walk): lands 100px ahead and rolls 50px, then takes 0.5s to truly activate; tripped before that it does 2d4+2 and gives 2s back on the cooldown, activated it does 2d4+6. PLACE (3s kneeling): set 5px in front, active at once, 6d4+2 with a wider blast. A bomb left behind off screen halves what\'s left of the cooldown.',
  grit:'True_Grit · 40 energy · 15s. For 8s he takes 50% less damage, moves 25% faster, and goes all in: his Careful/Reckless and Sharpshooter/Brawler sliders both jump to 10, so he wades in with the crowbar.',
  camp:'Set_Camp · 46 energy · 30s · 1.8s to kneel and light it right in front of him. Every ally within 400px gets COZY and keeps it refreshed while they stay close: for 10s, +0.25 life and +0.25 energy every 0.5s, +10% melee attack speed and +10% move speed. The fire has 5 life; each attack that hurts Flannel_Man or his companion takes 1 off it.',
  elite:'Elite_Survivors (passive) · his Traveling_Companion starts every stage right beside him, he has the Scavenger perk built in (searches wrecks for medkits, batteries and scrap), and while the two of them are within 150px of each other both get +10% dodge. She fights with Brick Throw (never misses, 75% stun) and Bottle_Distraction (34 energy, 16s: she lobs a bottle behind the zombies, preferably behind a crowd; every zombie within 180px turns and walks to the noise for 2.5s).',
  dash:'Wave Dash · 57 energy · 16s. Rides a blue energy wave about 300px forward; everything it passes through (about 1.5 lanes each way) takes a normal sword hit (2d5 base); War Cry, damage buffs and crits apply as usual.',
  shout:'War Cry · 29 energy · 7s. Every ally within 600px gets +25% damage and attack speed for 7s.',
  rain:'Arrow_Rain · 52 energy · 18s. 16 arrows rain down on the thickest group of enemies (1d6 each).',
  rapid:'One Nocked, Two in Hand · 46 energy · 10s. She rapid-fires 3 arrows within 1 second, each at the same or a different target (-5 accuracy). These can\'t crit, but any crit she lands at any time halves what\'s left of this cooldown.',
  blowgun:'Blow_Gun · 34 energy · 9s. A dart that hits for 1d4 on its own plus poison (1 stack guaranteed, 75% for a 2nd, 50% for a 3rd) on the living. Undead are immune to the poison, but hitting one halves what\'s left of the cooldown.',
  poultice:'Poultice · 29 energy · 15s. When he\'s under 60% health he slaps a herbal poultice on: heals himself 4% of max HP every second for 6s.',
  whirl:'Whirl_Wind · 52 energy · 14s. Spins with his axe for up to 5s at half speed, trailing a slashing wave: every second it hits everything within about 70px for 1d4 and makes it bleed (6 over 3s). He can break it off early to escape, but usually spins it out.',
  chop:'Ground_Chop · 34 energy · 9s. A huge overhead chop into the ground: a shockwave 120px ahead for 2d6 that shoves and stuns for 0.8s.',
  leap:'Hatchet_Leap · 46 energy · 16s. Double-jumps onto an enemy up to 180px away and slams down for 1d10 to everything around the landing, cracking the ground. Everything hit is stunned: 1.2s right under him, down to 0.4s at the edge.',
  rage:'Timber_Rage · 40 energy · 20s. Under half health: +30% damage, +20% attack speed and 25% less damage taken for 6s.',
  rhythm:'Feller\'s_Rhythm (passive) · every 3rd axe hit in a row (each within 3s of the last) is a felling blow: +50% damage and a 0.4s stagger. TIMBER!',
  mend:'Mend · 20 energy · 5s. Instantly heals the most-hurt ally for 10% of their max HP.',
  bloom:'Rejuvenating Bloom · 40 energy · 14s. Wraps an ally in a healing vine heart: 4% of max HP every second for 8s.',
  thorns:'Thorn Wave · 46 energy · 14s. A wave of earth thorns erupts along the ground 400px down her lane: 2d6 to everything it bursts under, plus bleed (12 over 4s) and a 50% chance of a poison stack (undead are immune).',
  cyclone:'Cyclone · 52 energy · 18s. A slow tornado forms well ahead of her (about 450px out) and wanders there for 5s, slowly pulling nearby enemies toward it and dealing small steady damage (1d3 every 0.5s) to everything inside.'};
const BEHAVIOR={
  carcher:'A small hooded archer who would much rather be shooting from far away. Picks targets off at long range, lines up shots that go through a whole row, and hops back out of reach the moment something gets close.',
  csorc:'A quiet, dark-haired little sorcerer who throws lightning. Hangs back in the middle, sparks single zombies, chains bolts through a pack, and saves his Thunderclap for a real crowd. Gets a second wind from every kill.',
  soldier:'A soldier who kept his kit when everything fell apart. Calm, by the book, a little dry. Holds the middle of the line with his assault rifle, butt-strokes anything that gets too close, and saves his frag grenades for a real crowd. Calls his throws.',
  shoshi:'Kyle\'s cousin and go-to tech guy. Smart, funny, and the first to help whenever anyone asks. Hangs back at mid range bursting zombies with his Automatic_Pistol (20-round mag: aimed taps, or he unloads on a big target), always keeps an eye on where everyone is, reboots whoever\'s in trouble, keeps everyone\'s cooldowns moving with Tech_Support, shuts car alarms off from his phone, and goes full dad mode when someone is about to go down.',
  cultist:'Theatrical, self-serving zealot. Hangs back behind the front line, flinging void bolts and stabbing with a ritual dagger anything that gets close. Pays for his magic in his own blood: tentacles up out of the middle of the pack, a frenzy of poisoned stabs, and the call of Cthulhu to send everything fleeing. Then he drinks the life back out of them with a swirling void beam. Holds grudges and loves to show off. Fairly steady (zealotry), but his chanting makes him loud, so zombies hear him coming; he rarely bothers with cover.',
  robot:'Heavy, patient war machine. Walks slowly, holds a line in front of the squishies and trusts its plating. Hoses anything close with its flamethrower and burns a creeping red lazer through anything further out (overcharged with Arc Surge when a crowd lines up). When they bunch it sends a missile barrage; when a friend is hurt and swarmed it smokes them out and hides them. When it is about to break it jets out of the fight. Listens to callouts. Unshakable: almost never panics. Also the loudest thing on the field: he clanks past wrecks and sets alarms off, and stray zombies home in on the noise. He stands in the open and trusts his plating.',
  lumberjack:'Big, stubborn brawler. Wades into the thick of it with his axe and goes for the biggest enemy, holding a grudge against whatever hit him. Shoots his hunting bow while he closes in, spins into crowds, leaps onto targets, chops the ground to stun, gets angry when he\'s hurt, and rolls out of trouble. Loud and rowdy, he draws zombies in and trips car alarms. He never hides behind anything.',
  druid:'Selfless healer. Hangs back near her friends and watches their health more than the enemies: patches up whoever is hurt worst, wraps allies in healing vines, and pokes at range with nature bolts. When enemies bunch up she drops thorns on them or sends a tornado down the lane. Light-footed and quiet. Her nerves are middling, so a boss or a fallen friend can rattle her for a moment. She tucks in behind rocks and logs when the horde gets thick.',
  archer:'Patient longbow marksman. Stays well back in his own lane, moves slowly and plants his feet for clean, accurate shots at the biggest threat. Backs up what his allies are fighting, sticks to his plan and doesn\'t waste energy. If something gets in close he cracks it with his bow. Steady and nearly silent: the best one to send searching a wreck. He shoots from behind cover whenever there\'s some nearby.',
  chibi:'Bold little front-liner. Charges in with his sword and fights up close, alternating a two-hit combo when he plants his feet and a running slash when he\'s on the move. Watches the enemies more than his friends, hops lanes to find a fight and picks his own targets. Stubborn about whoever hit him last, and loves to show off after a kill. Light on his feet and fairly steady. He never takes cover; he\'d rather be in their faces.',
  eng:'Practical fixer. Hangs a little behind the front, works with his hands: puts up a watchtower behind the team and builds it up, drops a concrete barrier in front of a crowd, plants a tesla coil, bolts turrets onto wrecks and keeps it all patched together. Halving the tower cooldown whenever one of his towers scrolls off behind the team keeps them coming. Bashes anything close with a heavy wrench and lobs grenades into the crowd with his Grenade_Launcher (from the lookout, they come down hard and bounce further). Patient, very techy, a bit quiet; holds his satchel until the moment is right.',
  jp:'Loud, lovable menace. A good guy who picks on everybody, games all day and smokes even more. Kar98 at range, sword and a homemade wooden shield up close, and the first one in when family is in trouble. Keep him high or he gets grumpy.',
  flannel:'Careful, team-first marksman. Hangs back at mid range with his bolt-action rifle and plants his feet before shooting: one shot, then a 2-second reload. Anything that gets into crowbar reach gets a d12 swing instead. Looks after hurt allies before himself and keeps an eye on where his friends are. Goes for the big targets and holds a grudge: whatever hurts him becomes his next target. Sticks to his plan and his own lane, and never shows off. A seasoned survivor: steady nerves, quiet, and always puts a car or a rock between himself and the horde when he can, leaning out to shoot.',
  joel:'Fast, restless pair. Always on the move: they hop lanes looking for better fights and change plans constantly. They lean into close fights, pile onto whatever their allies are hitting, and pick off the small ones. They burn energy as soon as they have it (lots of Power Attacks), shoot on the run (sloppy), forgive quickly and love to taunt after a kill.',
  mathas:'Patient sniper. Stays far back in its own lane, moves slowly and sticks to its plan. Watches the enemies, not its allies, and looks after itself first. Hunts the biggest enemy on screen on its own, plants its feet for clean shots and saves energy for a big burst. Never forgets who hit it. All business.',
};
const INSP_LABEL={acc:['Accuracy',''],crit:['Crit chance','%'],critMul:['Crit damage','x'],dodge:['Dodge','%'],armor:['Armor',' pts'],stamina:['Stamina',''],luck:['Luck',''],xp:['XP gain','%'],
  kbRes:['Knockback resistance','%'],enMax:['Max energy',''],enRegen:['Energy regen','/s'],lifesteal:['Life steal','%'],move:['Move speed','%'],meleeDmg:['Melee damage','%'],rangedDmg:['Ranged damage','%'],
  meleeSpd:['Melee speed','%'],rangedSpd:['Ranged speed','%'],kb:['Melee knockback',''],cdr:['Cooldown reduction','%']};
const INSP_HELP={cdr:'Every ability comes back that much faster (cooldown reduction tops out at 50%).',acc:'More shots land on the body and head instead of flying over (each point moves 0.25% of shots down a box).',
  crit:'Higher chance for any hit to be a critical hit.',critMul:'Critical hits deal more damage.',dodge:'Chance for an enemy hit to miss him completely.',
  armor:'Takes less damage from every hit (each point = 2% less, up to 20 points).',stamina:'More max health (each Stamina = 5 HP).',luck:'Better odds of rare items and gold.',
  xp:'Levels up faster.',kbRes:'Gets shoved around less by heavy hits.',enMax:'Can store more energy for abilities.',enRegen:'Energy refills faster, so abilities come back sooner.',
  lifesteal:'Heals for part of the damage he deals.',move:'Walks and runs faster.',meleeDmg:'Melee hits deal more damage.',rangedDmg:'Ranged hits deal more damage.',
  meleeSpd:'Swings his melee weapon more often.',rangedSpd:'Shoots and reloads faster.',kb:'Melee hits shove enemies back further.'};
function stashText(S){return Object.entries(S).map(([k,v])=>`+${v} ${{gold:'gold',parts:'spare parts',food:'food',water:'water'}[k]}`).join(', ');}
function inspHelp(name){const I=INSP[name];if(!I)return [];const out=[];if(I.perk&&PERKS[I.perk]){const P=PERKS[I.perk];out.push(P[0]+' '+P[1]+' (perk): '+P[2]);}
  if(I.passive&&INSP_PASSIVE[I.passive])out.unshift('✦ '+INSP_PASSIVE[I.passive][0]+': '+INSP_PASSIVE[I.passive][1]);
  for(const [k,v] of Object.entries(I.mod||{})){const [l,u]=INSP_LABEL[k]||[k,''];out.push(`${v>0?'+':''}${v}${u} ${l}: ${INSP_HELP[k]||''}`);}
  for(const [k,v] of Object.entries(I.sl||{})){const S=SLIDERS.find(s=>s[0]===k);if(!S)continue;const side=v>0?S[2]:S[1];
    if(false)0;out.push(`${side} +${Math.abs(v)}: slides his personality ${Math.abs(v)} step${Math.abs(v)>1?'s':''} toward "${side}" (the ${S[1]} ↔ ${S[2]} slider: ${S[3].toLowerCase()}). If that would go past 0 or 10, it doesn't move.`);}
  return out;}
// 0.12.27 (Kyle): more decks give one unique passive instead of a small stat; fewer give two things at once
const INSP_PASSIVE={
 herbalist:['Herbalist','he searches nearby foliage, rocks, stumps and fallen logs for healing herbs (1.5s each; the chance is good and goes up with his Luck and with how Perceptive he is) and carries up to 3. When he or an ally within about 50px is under 80% health, he uses one: it heals 20% of their max HP over 5s, but any damage stops it. He searches whatever is close by without going far out of his way, and goes to hurt allies with herbs.'],
 scavenger:['Scavenger','he searches broken-down cars (2s each; the chance goes up with his Luck and how Perceptive he is). He can turn up a Medkit (heals an ally under 60% for 25% at once), loose scrap worth gold, or, with a Warhound on the team, a Battery (+30 energy for the Warhound when he runs low). He carries 2 at most, in any mix. He searches wrecks close by without going far out of his way, and brings supplies to whoever needs them.'],
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
 forager:['Forager','he knows what\'s edible: food drops from the enemies he kills come about twice as often (roughly one per 9 of his kills instead of one per 18).'],
 raincatch:['Rain Catcher','he never lets a storm go to waste: water drops from the enemies he kills come about twice as often (roughly one per 9 of his kills instead of one per 18).'],
 mountain:['The Mountain','nothing moves him: +50% knockback resistance (up to 95%), so heavy hits, boss slams and blasts barely shove him, and boss hits deal 10% less to him.'],
};
/* 0.12.56 (Kyle): perks are a second, smaller bonus a deck can carry; each one shows up on 2 decks for now */
const PERKS={
 sapper:['🧨','Sapper','spots enemy mines far more easily and defuses them with good odds (about 82% before traits, versus about 30% for anyone else; a failure sets it off). Slow and Steady, Techy, Steady nerves, Optimal and Luck all help. Plants bombs and mines faster (-0.8s), and his own Trip Bomb (Flannel_Man) hits 25% harder. A defused mine is kept as a one-time item 75% of the time (40% for non-Sappers) and planted in front of zombies coming down his lane; otherwise it comes apart into spare parts.'],
 medicine:['🌿','Medicine Man','every heal he gives lands 30% stronger: healing spells, medkits, herbs, healing over time and his abilities\' heals. Allies he helps up come back with 35% HP instead of 25%.'],
 inevitable:['⏳','Inevitable','every time something he tries fails (a shot that hits nothing, an attack that\'s dodged, an empty search, a fumbled defuse) he gains +2 Luck and +1% crit chance, stacking up to 10 times. The next critical hit he lands cashes it all in and the stacks start over. Resets each stage.'],
 looter:['🎒','Lucky Looter','nothing goes to waste: food AND water drops from the enemies he kills both come about 50% more often (roughly one of each per 12 of his kills instead of one per 18).'],
 superlucky:['🍀','Super Lucky','everything his Luck does, it does twice as well: his Luck counts double for finds when searching, rare drops, defusing and planting, and anything else Luck touches (Inevitable stacks included).'],
};
function deckSkills(name){const I=INSP[name];if(!I)return [];const out=[];if(I.passive&&INSP_PASSIVE[I.passive])out.push(['✦',INSP_PASSIVE[I.passive][0],'Deck passive: '+INSP_PASSIVE[I.passive][1]]);if(I.perk&&PERKS[I.perk])out.push([PERKS[I.perk][0],PERKS[I.perk][1],'Deck perk: '+PERKS[I.perk][2]]);return out;}
const insP=u=>(u&&u.insp&&INSP[u.insp]&&INSP[u.insp].passive)||(u&&u.key==='flannel'&&(((u.base&&u.base.char)||CHAR.flannel).abilities||[]).some(a=>a.id==='elite')?'scavenger':undefined);   /* 0.12.68: Elite_Survivors = Scavenger built in (a deck perk still wins) */
function inspText(name){const I=INSP[name];if(!I)return '';const out=[];if(I.passive&&INSP_PASSIVE[I.passive])out.push('✦ '+INSP_PASSIVE[I.passive][0]);
  for(const [k,v] of Object.entries(I.mod||{})){const [l,u]=INSP_LABEL[k]||[k,''];out.push(`${v>0?'+':''}${v}${u} ${l}`);}
  for(const [k,v] of Object.entries(I.sl||{})){const S=SLIDERS.find(s=>s[0]===k);if(S)out.push(`${v>0?S[2]:S[1]} +${Math.abs(v)}`);}
  if(I.stash)out.push('🎒 Starts with '+stashText(I.stash));
  if(I.perk&&PERKS[I.perk])out.push(PERKS[I.perk][0]+' '+PERKS[I.perk][1]);
  return out.join(', ');}
// ---- 0.12.5 Flannel_Man's companion: about 1/3 of every stat of his that applies (health, armor, dodge, knockback resistance,
//   damage, accuracy, crit chance, knockback). Speed, timing, range and energy stay the same so she keeps up and can use her brick.
// 0.12.6 Chibi_Warrior: a quick, sturdy sword fighter (Claude's starting numbers until Kyle fills his sheet). He swings a
//   2-hit combo (Attack 1, Attack 2) standing still and a running slash when he's on the move. No gun, no abilities yet.
CHAR.chibi={name:'Chibi_Warrior',role:'Sword + Kunai',combo:1,flatHp:0,stamina:10,hpPerStamina:5,armorPts:8,dodge:.06,kbRes:.30,
  melee:{dice:[2,5],every:1.2,reach:24,kb:15,hitAt:.18},   /* 0.12.58 (Kyle): too strong: 2d6/1.1s -> 2d5/1.2s (about -20% damage) */
  // Kunai throw (built from his Attack 1 wind-up + Run+Attack throwing arm): a light 1d4 poke at range while he closes in
  ranged:{dice:[1,4],flat:0,every:2.6,range:180,clip:0,reload:0,pellets:1,anim:.5,releaseAt:.32},
  acc:10,walkPenalty:4,crit:.10,critMul:1.75,luck:15,xp:0,run:2,turn:.18,enMax:100,enRegen:4.6,
  abilities:[
    // Wave Dash: he rides a blue energy wave (1.5x his height) about 300 screen px forward (100 world px) in 0.5s.
    //   (Kyle's distances are screen pixels: the normal 1152px-wide game shows 3 screen px per world px.)
    //   Everything the wave passes through (2 lanes up and down) takes 1.4x a sword roll (+flat bonuses) and a shove.
    //   Bigger reach and area, so it costs more: 45 energy, 16s cooldown.
    {id:'dash',name:'Wave Dash',en:57,cd:16,dist:100,dur:.5,dmgMul:1,depth:12,kb:25,minHits:2},
    // War Cry: every ally within 600 screen px (200 world px) gets +25% damage and +25% attack speed for 7s. 20 energy, 7s cooldown (Kyle).
    // Poultice (Kyle): he slaps a herbal poultice on his wounds: heals himself 4% of max HP every second for 6s (24% total). 20 energy, 15s.
    {id:'poultice',name:'Poultice',en:29,cd:15,pct:.04,tick:1,dur:6,under:.6},
    // 0.12.20 Shadow_Clone (decoy, new): a see-through copy of him steps out for 5s. It mirrors every sword hit he lands (+40% on the
    //   same target), and 35% of the blows aimed at him hit the clone instead. IF 2+ enemies close OR hurt with something on him. 30 energy, 18s.
    {id:'clone',name:'Shadow_Clone',en:40,cd:18,dur:5,mirror:.4,decoy:.35},
    // 0.12.20 Momentum (passive, new): each sword hit within 2s of the last stacks +6% attack speed, up to 5 stacks (+30%); a 2s gap drops it.
    {id:'momentum',name:'Momentum',passive:1,per:.06,max:5,window:2},
    {id:'shout',name:'War Cry',en:29,cd:7,range:200,dur:7,dmg:.25,spd:.25}]};
// 0.12.7 Yumi_Archer: a patient longbow marksman (Claude's starting numbers; no abilities yet). His arrow leaves from the
//   arrow's tip in his draw pose, at the moment of release in his Ranged animation (0.55s into a 0.8s draw). No reloading.
CHAR.archer={name:'Yumi_Archer',role:'Bow + Melee',flatHp:0,stamina:9,hpPerStamina:5,armorPts:6,dodge:.04,kbRes:.25,
  melee:{dice:[1,8],every:1.6,reach:22,kb:18,hitAt:.2},
  ranged:{dice:[1,10],flat:0,every:1.7,range:280,clip:0,reload:0,pellets:1,anim:.8,releaseAt:.55},
  acc:22,walkPenalty:15,crit:.12,critMul:2,luck:18,xp:0,run:2,turn:.25,enMax:100,enRegen:4.6,
  // One Nocked, Two in Hand (Kyle's name, with the archery spelling 'nocked'): his next 3 arrows come much faster (time between shots x0.3, quicker draw). 30 energy, 14s cooldown.
  abilities:[{id:'rapid',name:'One Nocked, Two in Hand',en:46,cd:10,shots:3,accPen:5,over:1},   // 0.12.63 (Kyle): 3 shots in 1s, 40 energy, 10s, can't crit; any crit she lands halves its remaining cooldown   // 0.12.23: 3 basic shots in 1.5s
    // Blow_Gun: he puts a bamboo blowgun to his lips (0.7s) and puffs a poison dart (1d3). It always applies 1 poison stack to a
    //   non-undead target, with a 75% chance for a 2nd and a 50% chance for a 3rd. 25 energy, 9s cooldown. Picks living targets.
    // Arrow_Rain: 0.6s to loose a volley high into the air, then 16 arrows rain down over 1.4s on the thickest group of enemies in
    //   range (about 70px wide, 2 lanes up and down). Each arrow hits what it lands on for 1d6 (+flat) and sticks in the ground.
    //   40 energy, 18s cooldown.
    {id:'rain',name:'Arrow_Rain',en:52,cd:18,cast:.6,count:16,over:1.4,fall:.35,spread:36,lanes:12,dice:[1,6],range:280,hitR:5},
    {id:'blowgun',name:'Blow_Gun',en:34,cd:9,anim:.7,releaseAt:.42,dice:[1,3],extra:[.75,.5],range:220,base:[1,4]},   // 0.12.63 (Kyle): +1d4 hit damage on top of the poison; hitting a poison-immune target halves its remaining cooldown
    // 0.12.20 Pinning_Shot (root + mark, new): an arrow that nails the target to the ground for 2.5s and MARKS it for 6s: marked enemies
    //   take 25% more damage from everyone. IF the biggest (or fastest) enemy in range isn't marked yet. 25 energy, 12s.
    {id:'pin',name:'Pinning_Shot',en:34,cd:12,root:2.5,mark:6,amp:.25,range:280,anim:.5,releaseAt:.3,dice:[1,8]},
    // 0.12.20 Wind_Reading (passive, new): shots at anything more than 150px (450 screen px) away get +15 accuracy and +0.5x crit damage.
    {id:'wind',name:'Wind_Reading',passive:1,far:150,acc:15,critMul:.5}]};
// 0.12.9 Druid (Claude's starting numbers): a staff-wielding nature caster. Small nature bolts at range, a staff poke up close,
//   and four abilities: two heals (one instant, one over time) and two nature attacks (thorns, a tornado).
CHAR.druid={name:'Druid',role:'Staff + Nature Bolts',flatHp:0,stamina:7,hpPerStamina:5,armorPts:3,dodge:.05,kbRes:.2,
  melee:{dice:[1,4],every:1.5,reach:26,kb:10,hitAt:.2,claw:1},   // 0.12.15 (Kyle): she swipes her hand and a glowing green spirit claw lunges off it into the target
  ranged:{dice:[1,6],flat:0,every:1.8,range:220,clip:0,reload:0,pellets:1,anim:.5,releaseAt:.3},   /* 0.12.58: released as the staff swing reaches its full thrust (frame 3), from the staff head */
  acc:16,walkPenalty:8,crit:.08,critMul:1.75,luck:20,xp:0,run:2,turn:.22,enMax:100,enRegen:4.6,
  abilities:[
    // Mend: small instant heal, low cooldown. 12% of the target's max HP on the most-hurt ally (under 85%). 12 energy, 4s cooldown.
    {id:'mend',name:'Mend',en:20,cd:5,heal:.10,under:.85},   /* 0.12.38 (Kyle): 12% -> 10%, 4s -> 5s */
    // Rejuvenating Bloom: heal over time on any ally (most hurt, under 90%, not already blooming): 5% of their max HP every 1s
    //   for 8s (40% total) inside a glowing vine heart. 30 energy, 12s cooldown.
    {id:'bloom',name:'Rejuvenating Bloom',en:40,cd:14,pct:.04,tick:1,dur:8,under:.9},   /* 0.12.38 (Kyle): 5%/s -> 4%/s, 12s -> 14s */
    // Thorn Wave (Kyle): a wave of earth thorns erupts along the ground down her lane, one after another for 200px over 1.2s.
    //   Every enemy a thorn bursts under takes 2d6 (+flat) and bleeds (12 over 4s). 35 energy, 14s cooldown.
    {id:'thorns',name:'Thorn Wave',en:46,cd:14,dice:[2,6],dist:133,dur:.8,poisonCh:.5,step:12,depth:6,bleed:{dmg:12,dur:4},cast:.5},
    // Cyclone (Kyle): a tornado that lasts 5s, wandering around sporadically in front of her. It slowly pulls nearby enemies
    //   (within 40px) toward it and deals small, steady damage to everything inside it (1d3 +flat every 0.5s). 40 energy, 18s cooldown.
    // 0.12.20 Verdant_Resurgence (passive, new): once per stage, when an ally would die, vines catch them instead: they stay up at 1 HP,
    //   can't be hurt for 2s and heal 30% of max HP over those 2s.
    {id:'resurge',name:'Verdant_Resurgence',passive:1,heal:.3,dur:2,icd:25},   // 0.12.24 (Kyle): no longer once per stage, 25s internal cooldown
    {id:'cyclone',name:'Cyclone',en:52,cd:18,ahead:150,near:100,dist:215,dur:5,dice:[1,3],every:.5,pullR:40,pull:16,inR:12,depth:6,spd:20,wander:28,cast:.5}]};
// 0.12.11 Lumber_Jack (Claude's starting numbers): a burly axeman with a hunting bow. Sturdy, hits hard up close.
CHAR.lumberjack={name:'Lumber_Jack',role:'Axe + Bow',combo:0,flatHp:0,stamina:11,hpPerStamina:5,armorPts:7,dodge:.03,kbRes:.45,
  melee:{dice:[1,12],every:1.2,reach:22,kb:28,hitAt:.2},   /* 0.12.58 (Kyle): a little weak: 1d10/1.3s -> 1d12/1.2s (about +25%) */
  ranged:{dice:[1,6],flat:0,every:2.2,range:200,clip:0,reload:0,pellets:1,anim:.7,releaseAt:.45},
  acc:14,walkPenalty:10,crit:.10,critMul:1.9,luck:16,xp:0,run:2,turn:.25,enMax:100,enRegen:4.6,
  abilities:[
    // Whirl_Wind: spins with his axe for 2.4s, drifting forward; every 0.4s it hits everything around him (1d6 +flat, ~18px, 1 lane each way). 40 energy, 14s.
    // 0.12.26 (Kyle): up to 5s, 1d4 every second to everything in a wider 24px circle, each hit refreshes a bleed (6 over 3s), he moves at half speed while
    //   spinning, and he can break off early (IF he's badly hurt and wants out, OR nothing has been in reach for 1.5s) but usually spins it out.
    {id:'whirl',name:'Whirl_Wind',en:52,cd:14,dur:5,every:1,r:24,depth:7,dice:[1,4],bleed:{dmg:6,dur:3},want:'close',range:30},
    // Ground_Chop: a huge overhead chop into the ground: a shockwave 40px ahead (2d6 +flat), shoves and stuns 0.8s. 25 energy, 9s.
    {id:'chop',name:'Ground_Chop',en:34,cd:9,cast:.5,dist:40,depth:6,dice:[2,6],stun:.8,kb:35,want:'close',range:40},
    // Hatchet_Leap: double-jumps onto an enemy up to 60px away and slams down (1d10 +flat to everything within 16px). 35 energy, 16s.
    // 0.12.69 (Kyle): the slam stuns: 1.2s right under him, down to 0.4s at the edge of the blast; a much bigger landing (cracked earth, dust, pebbles, a burst).
    {id:'leap',name:'Hatchet_Leap',en:46,cd:16,dur:.6,range:60,min:24,r:16,dice:[1,10],want:'close',stun0:1.2,stun1:.4},
    // Timber_Rage: when he's under half health he gets angry: +30% damage, +20% attack speed, 25% less damage taken for 6s. 30 energy, 20s.
    {id:'rage',name:'Timber_Rage',en:40,cd:20,dur:6,dmg:.3,spd:.2,dr:.25,under:.5,want:'close'},
    // 0.12.58 (Kyle: it never seemed to do anything) Log_Roll reworked: he kicks a log down his lane. It rolls 120px forward at 110px/s,
    //   hitting each zombie it passes once for 1d8 +flat, knocking them back and tripping them for 0.6s. 25 energy, 11s.
    //   IF 2+ enemies are in my lane ahead within 90px (or 1 big one) THEN roll it.
    // 0.12.69 (Kyle: replace Log_Roll with a passive of my choosing) Feller's_Rhythm (passive): every 3rd axe hit in a row (each within 3s of the
    //   last) is a FELLING blow: +50% damage and a 0.4s stagger (bosses don't stagger). "TIMBER!" pops over the target.
    {id:'rhythm',name:"Feller's_Rhythm",passive:1,n:3,window:3,bonus:.5,stun:.4}]};
// 0.12.19: renamed Warhound with Kyle's pick of the new sprite (hunched olive war-walker, brass trim, elbowed blade arm).
// 0.12.17 Moss_Mech (Kyle): an original moss-grown green war mech with a blue electric arc blade on its near arm and a gatling on
//   the far arm, plus a missile pod on its back. Heavy and slow, lots of armor. Basic ranged: a short 3-round burst from the gatling.
CHAR.robot={name:'Warhound',role:'Targeted Lazer + Flamethrower',combo:0,flatHp:0,stamina:12,hpPerStamina:5,armorPts:12,dodge:.02,kbRes:.6,
  /* 0.12.67 (Kyle): the arc blade is gone: up close he hoses them with the flamethrower (his "melee"); a wide cone about 210 screen px long,
     everything it touches burns for 2s, 1d4 every 0.25s (numbers only on crits) */
  melee:{dice:[1,4],every:1.5,reach:46,kb:0,hitAt:0,flame:{len:56,w0:8,w1:19,burn:1.5,tick:.35,dice:[1,4],dur:.75}},   // 0.12.93 (Kyle: way too much DPS): ticks .25->.35s, burn 2->1.5s, every 1.3->1.5s   // 0.12.77: Kyle's burst sprite; a bit shorter, much wider
  /* Targeted Lazer (ranged basic): 0.5s charge-up, then a 2s beam. The tip starts ~10 screen px in front of a target 200-500 screen px away and
     (0.12.77) now: starts 50 px in front of the target and sweeps 150 px forward in 1s; 2d4 every 0.25s to everything within 20 px of the tip, with a little ground fire riding along.
     2s reload that only starts once the beam is done. (All in screen px; world = /3.) */
  ranged:{dice:[2,4],flat:0,every:0,range:167,clip:0,reload:0,pellets:1,anim:.45,
    lazer:{charge:.5,fire:1,min:30,max:167,lead:50/3,travel:50,tick:.35,r:20/3,dice:[1,4],reload:5,travelS:70,rS:25/3,diceS:[2,4]}},   // 0.12.93 (Kyle: way too much DPS): 1d4 every .35s (was 2d4 every .25s), 3.25s between shots, Arc_Surge 2d4   // 0.12.77 (Kyle): starts 50px in front of the target, sweeps 150px in 1s; 2.75s between shots
  acc:10,walkPenalty:8,crit:.08,critMul:1.8,luck:10,xp:0,run:1/* 0.12.38 (Kyle): the Warhound only walks */,turn:.3,enMax:100,enRegen:4.6,
  abilities:[
    // Arc_Surge (0.12.67, now activated): IF the lazer is up (or 3+ enemies are in lazer range) THEN 30 energy, 15s CD, 8s:
    //   Shooter/Slasher -3 (toward shooter); lazer 3d4 per 0.25s, 25 px radius, sweeps 210 px, and lazer hits Burn.
    {id:'surge',name:'Arc_Surge',en:34,cd:15,dur:8,slide:-3,burn:2},
    // Missile_Barrage: IF 3+ enemies are bunched (or a boss is up) 40-260px out THEN 3 missiles arc onto them, 2d4 each. 45 energy, 15s.
    {id:'missiles',name:'Missile_Barrage',en:52,cd:15,n:3,gap:.18,fly:.95,range:260,min:40,r:9,dice:[2,4],spread:24},
    // Smoke_Screen: IF an ally under 50% has enemies on them (or I'm swarmed by 3+) THEN smoke the spot for 6s. Allies (not me) inside are
    //   stealthed until they basic-attack or use an ability; it lasts 5s after they leave the smoke, re-entering refreshes it.
    {id:'smoke',name:'Smoke_Screen',en:40,cd:16,dur:6,r:30,slow:.3,miss:.5,dodge:.25,under:.5,throw:.55,stealth:5},
    // Nano-Tech_Repair_Bots (0.12.67): IF I'm under 55% AND nothing is on top of me (or I'm under 30%) THEN 35 energy, 20s CD: I stop ("use")
    //   and the bots restore 5% max life per second for 5s. I can't move or attack, but I cancel early if I get swarmed (2+ on me).
    //   Built in: 10% chance whenever I'm hit to halve the remaining cooldown.
    {id:'nano',name:'Nano-Tech_Repair_Bots',en:40,cd:20,dur:5,per:.05,under:.55,halveCh:.1},
    // Tactical_Retreat (passive, 0.12.67): when I drop under 30% I blast off on a blue-flame jetpack in an arc back to 100 px from the left edge
    //   and land slowly. While flying: every hit is capped at 5 damage (blue shield) and I fire ~3 single missiles at random enemies. 40s ICD.
    {id:'retreat',name:'Tactical_Retreat',passive:1,under:.3,icd:40,T:2.6,H:38,shots:3,cap:5,x1:100/3}]};
// 0.12.75 Engineer (Kyle): hard hat, red shirt + overalls, a heavy wrench and a sawn-off shotgun. Builds things.
CHAR.eng={name:'Engineer',role:'Wrench + Grenade_Launcher',combo:0,flatHp:0,stamina:9,hpPerStamina:5,armorPts:7,dodge:.04,kbRes:.35,
  melee:{dice:[2,8],every:1.9,reach:20,kb:34,hitAt:.3,stunCh:.25,stun:.8},   // heavy, slow wrench: hits hard, 25% to stun 0.8s
  ranged:{dice:[3,4],flat:0,every:1.15,range:165,clip:1,reload:4,pellets:1,anim:.35,gl:{r:25,splash:1,fuse:.45,maxT:3,kb:22}},   /* 0.12.161 (Kyle): one grenade, then a 4s reload. 3d4 to everything within a 75 screen px blast radius (25 world) */   /* 0.12.105 (Kyle) Grenade_Launcher (was a sawn-off): 3 grenades, ~1.15s apart, 4.5s reload. 2d6 to whatever it hits, 55% to everything within ~42 screen px. Misses land, roll and blow 0.45s after they stop */
  acc:14,walkPenalty:10,crit:.08,critMul:1.8,luck:14,xp:0,run:1.8,turn:.22,enMax:100,enRegen:4.6,
  abilities:[
    // Build (a WC3-style spellbook: each building has its own cooldown). While he builds or repairs, his other cooldowns pause.
    //   Watchtower: tier 1 takes 5s; Modify adds tier 2 (5s) and tier 3 (7s). One shared health bar, +15% max HP per tier.
    //     T1 sign MEDICAL CROSS: allies within ~150 screen px regen 1% max HP a second.  T2 sign AMMO: allies nearby +15% ranged attack speed.
    //     T3 LOOKOUT: one ranged ally can climb up: +12 accuracy, +30% range, can't be hit until the tower falls. Empty, it gives allies nearby +5 accuracy.
    //   HESCO_Barrier (0.12.76, was the concrete barrier): ONE wire-mesh, fabric-lined cell filled with dirt; blocks zombies in its lane and the ones next to it
    //   (they hit it instead); allies standing behind it +8 accuracy.
    //   Tesla coil (my design): zaps the nearest zombie within ~135 screen px for 1d8 every 1.5s and arcs to one more; lasts 25s.
    {id:'build',name:'Build',en:29,cd:0,book:1,
      tower:{cd:7,T:[3,2.5,3.5],hp:60,   /* 0.12.95 (Kyle: tower too lame): 7s cooldown, builds in 3s, tiers 2/3 take half the time (2.5s / 3.5s) */per:.15,r:50,regen:.01,aspd:.15,acc:5,perchAcc:12,perchRange:.3},
      barrier:{cd:16,T:3,hp:80,depth:9,acc:8,behind:40},
      tesla:{cd:22,T:3,hp:30,life:25,r:45,every:1.5,dice:[1,4],flat:2}},   // 0.12.79: 1d4+2
    // Repair: no cooldown, slow: fixes buildings (6 HP/s) and the Warhound (2% a second) while he stays next to them. Pauses his other cooldowns.
    {id:'repair',name:'Repair',en:0,cd:0,bld:6,mech:.02},
    // Modify: adds the next watchtower tier, or bolts an auto-turret onto a broken-down car (3-round bursts 0.25s apart, 1s reload, low accuracy).
    {id:'modify',name:'Modify',en:34,cd:10,towerBack:.7,   /* 0.12.119 (Kyle): 10s cooldown, but a tower tier gives 70% of it back (3s); still takes its build time */turret:{T:4,hp:40,range:120,burst:3,gap:.25,reload:1,hit:.45,dice:[1,4]}},
    // Satchel_Charge: tosses a satchel that never goes off by itself; he sets it off when it's worth it (3+ zombies on it, or something big).
    //   The biggest blast in the game: 6d4 at the centre, falling off to 30% at ~100 screen px, with a HEAVY shove.
    {id:'satchel',name:'Satchel_Charge',en:40,cd:18,min:30,max:100,r:33,dice:[6,4],kb:95,fly:.8},
    // Field_Plating (passive, the armor kit): staying within ~60 screen px of an ally for 3s straps a plate kit on them: +25% armor and
    //   +15% knockback resistance until they take 3 hits. One kit per ally at a time.
    {id:'plating',name:'Field_Plating',passive:1,r:20,T:3,armor:.25,kb:.15,hits:3}]};
// 0.12.21 Void_Cultist (Kyle): an original hooded cultist (crimson robe, navy hood, bone mask with one burning eye, curved ritual
//   dagger). Void bolts at range, dagger up close. Abilities: a summoned tentacle that can't move but lashes far, a self-bleeding
//   team buff, a curse that jumps on death, a fear chant, and a passive that feeds on nearby deaths.
CHAR.cultist={name:'Void_Cultist',role:'Dagger + Void Bolts',combo:0,flatHp:0,stamina:8,hpPerStamina:5,armorPts:3,dodge:.06,kbRes:.15,
  melee:{dice:[1,6],every:1.4,reach:18,kb:8,hitAt:.2},
  ranged:{dice:[1,4],flat:0,every:.95,range:210,clip:0,reload:0,pellets:1,anim:.34,releaseAt:.18},   // 0.12.22 (Kyle): weak void bolts, fired about twice as fast as other ranged heroes
  acc:14,walkPenalty:8,crit:.1,critMul:1.8,luck:18,xp:0,run:1.8,turn:.22,enMax:100,enRegen:4.6,
  /* 0.12.70 (Kyle) Void_Cultist rework: no energy at all. His abilities cost LIFE (Syphon_Life is free and is how he gets it back). */
  abilities:[
    // Syphon_Life (free): IF an enemy is within ~330 screen px (110 world) AND (I'm hurt OR nothing is on me) THEN channel a swirling black-and-purple
    //   beam into it for 3s: 3 damage a second (scaled by his damage), and he heals for everything it drains. Breaks if it dies or gets away. 9s CD.
    {id:'syphon',name:'Syphon_Life',en:100,cd:9,dur:3,range:110,dps:3,heal:1.25},   /* 0.12.154 (Kyle): 100 energy (his only energy skill), heals 1.25x what it drains */
    // Lethal_Strikes (10% of max life): IF a zombie is in dagger range and I can afford it THEN for 12s: +75% melee attack speed, -25% melee damage,
    //   Poisoned_Blade doubled (50%, 2 stacks), and Shooter/Slasher goes to 10 (all slasher). 20s CD.
    {id:'lethal',name:'Lethal_Strikes',en:0,hpCost:.1,cd:20,dur:12,spd:.75,dmg:.25,want:'close'},
    // Spawn_Tentacle (8% of max life, keeps the old tentacle): placed anywhere within 400 screen px (133 world), in the middle of the biggest pack.
    {id:'tentacle',name:'Spawn_Tentacle',en:0,hpCost:.08,cd:10,cast:.8,life:999,decay:.05,hp:15,steal:.2,reach:35,depth:10,every:1.4,dice:[1,6],flat:2,kb:20,range:133},   // 0.12.101 (Kyle): 10s (0.12.96 was 9s), 1d6+2; wither unchanged
    // Call_of_Cthulhu (15% of max life): 10s: Spawn_Tentacle's CD runs twice as fast, every tentacle is 25% bigger (reach too) and attacks 25% faster.
    //   On cast his tentacles burrow and re-emerge 200 screen px (67 world) in front of him, and a fear pulse goes out from him and from every tentacle:
    //   2s of fear and -25% move speed. IF 2+ tentacles are up OR 4+ zombies are coming, AND I can afford it THEN call. 30s CD.
    {id:'cthulhu',name:'Call_of_Cthulhu',en:0,hpCost:.15,cd:30,dur:10,size:.25,spd:.25,fear:2,slow:.25,r:45,move:67,cast:.9},
    // 0.12.152 (Kyle) Ritual_Blade (passive): Poisoned_Blade and Ritual_Harvest in one. A dagger hit that lands has a 25% chance to add
    //   1 poison stack; EVERY dagger swing refreshes the poison on its target; a dagger hit that KILLS takes 1.5s off Spawn_Tentacle's cooldown.
    {id:'blade',name:'Ritual_Blade',passive:1,ch:.25,n:1,cut:1.5}]};
const PAL_FRAC=1/3;
// which cooldown timer each ability uses, so the planner can see what is ready
/* 0.12.98 RULE for every ability now and later (Kyle): set its cooldown as  A.cd*(1-(h.cdr||0))  (internal cooldowns too: this.t+A.icd*(1-(h.cdr||0))).
   h.cdr is the hero's cooldown reduction (capped at 50%), e.g. from Narset's inspiration. Tested 0.12.98: all 9 heroes' abilities come back 20% faster. */
const CD_KEY={undo:'unT',reboot:'rbT',trial:'frT',dad:'ddT',syphon:'syT',lethal:'leT',cthulhu:'ctT',nano:'nbT',tentacle:'tnT',pact:'paT',hex:'hxT',dread:'drT',clone:'clT',pin:'piT',surge:'suT',gatling:'gaT',missiles:'msT',smoke:'smT',grit:'grT',poultice:'poT',aimed:'abT',trip:'tbT',pal:'palT',camp:'caT',dash:'daT',shout:'shT',rapid:'raT',blowgun:'bgT',rain:'arT',mend:'mdT',bloom:'blT',thorns:'thT',cyclone:'cyT',
  whirl:'whT',chop:'cpT',leap:'lpT',rage:'rgT',roll:'rlT',brick:'brT',bottle:'boT'};
const CLOSE_AB=new Set(['lethal','dread','clone','surge','grit','dash','whirl','chop','leap','rage','trip']),FAR_AB=new Set(['syphon','cthulhu','tentacle','hex','pin','gatling','missiles','smoke','aimed','rain','rapid','blowgun','thorns','cyclone','brick']);
function abilityPlan(h){const C=h.base&&h.base.char;if(!C||!C.abilities||!C.abilities.length)return {};let close=0,far=0,farRange=0,ready=0;
  for(const a of C.abilities){const k=CD_KEY[a.id];const up=!(h[k]>0)&&(h.en||0)>=a.en;if(!up)continue;ready++;
    if(CLOSE_AB.has(a.id))close++;if(FAR_AB.has(a.id)){far++;farRange=Math.max(farRange,a.range||a.dist||(C.ranged&&C.ranged.range)||150);}}
  return {close,far,farRange,allDown:ready===0};}
CHAR.dog={name:'Guard_Dog',role:'Bite',flatHp:0,stamina:5,hpPerStamina:5,armorPts:2,dodge:.12,kbRes:.15,
  melee:{dice:[1,8],every:.7,reach:14,kb:6,hitAt:.12},ranged:null,   /* 0.12.58: bites harder and more often */
  acc:12,walkPenalty:0,crit:.10,critMul:1.75,luck:0,xp:0,run:2,turn:.15,enMax:100,enRegen:4.6,pet:1,abilities:[]};
CHAR.flannel_pal=(()=>{const C=CHAR.flannel,f=PAL_FRAC;return {name:'Traveling_Companion',flatHp:C.flatHp*f,stamina:C.stamina*f,hpPerStamina:C.hpPerStamina,armorPts:Math.round(C.armorPts*f),
  dodge:C.dodge*f,kbRes:C.kbRes*f,melee:{dice:C.melee.dice,dmgMul:f,every:C.melee.every,reach:16,kb:Math.round(C.melee.kb*f),hitAt:.12},
  ranged:{dice:[1,4],dmgMul:1,flat:0,every:.5,range:C.ranged.range,clip:7,reload:5,pellets:1},   /* 0.12.38 (Kyle): pistol 1d4, a shot every 0.5s, 7 in the clip, 5s reload */
  acc:Math.round(C.acc*f)-3,   /* a touch less accurate to make up for the faster fire */walkPenalty:Math.round(C.walkPenalty*f),crit:C.crit*f,critMul:C.critMul,luck:0,xp:0,run:C.run,turn:C.turn,enMax:100,enRegen:4.6,pet:1,
  // Brick Throw: never misses and always deals damage (1.5x her pistol roll + flat bonuses), 75% chance to stun for 1.2s. 20 energy, 9s cooldown.
  abilities:[{id:'brick',name:'Brick Throw',en:29,cd:9,range:170,dmgMul:1.5,stunCh:.75,stunT:1.2},
    // 0.12.68 (Kyle) Bottle_Distraction: lobs a glass bottle in a big arc 450-500 screen px (150-167 world); it shatters and every zombie within
    //   ~180 screen px (60 world) turns and goes to check the noise for 2.5s (no attacks). IF a pack of 3+ is coming THEN throw it BEHIND them.
    {id:'bottle',name:'Bottle_Distraction',en:34,cd:16,min:150,max:167,r:60,dur:2.5,fly:1.1,min3:3}]};})();
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
function needHeroXp(L){return 100+75*(L-1);}   /* 0.12.145 (Kyle): level 1 needs 100 XP, each level after takes 75 more */
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
const PERSONA={
 carcher:{aggr:3,aware:8,pace:6,lane:5,self:6,range:0,plan:6,energy:6,size:4,exec:8,grudge:3,pack:5,flair:6,talk:5,listen:6,perc:9,tech:3,nerve:4,noise:3,cover:7},   // 0.12.178 Chibi_Archer: keeps her distance, sharp-eyed
 csorc:{aggr:5,aware:7,pace:5,lane:5,self:4,range:0,plan:7,energy:7,size:6,exec:7,grudge:4,pack:6,flair:8,talk:3,listen:6,perc:7,tech:6,nerve:5,noise:5,cover:5},   // 0.12.178 Chibi_Sorcerer: quiet, showy with his magic
 soldier:{aggr:6,aware:8,pace:5,lane:5,self:5,range:0,plan:8,energy:5,size:6,exec:9,grudge:4,pack:8,flair:3,talk:4,listen:7,perc:7,tech:5,nerve:9,noise:5,cover:8},   // 0.12.175 Soldier: disciplined, steady nerve, sticks with the group
 shoshi:{aggr:4,aware:9,pace:5,lane:5,self:2,range:0,plan:6,energy:5,size:5,exec:8,grudge:2,pack:3,flair:6,talk:8,listen:8,perc:8,tech:10,nerve:3,noise:3,cover:6},   // Shoshi: watches everybody, very techy, steady, chatty and funny   // starting values (Kyle's test numbers: middling with a few extremes, and very different between the two heroes)
 cultist:{aggr:4,aware:4,pace:4,lane:4,self:9,range:2,plan:5,energy:3,size:7,exec:6,grudge:8,pack:4,flair:8,talk:7,listen:3,perc:6,tech:3,nerve:3,noise:7,cover:3},   // Void_Cultist: hangs back, selfish, theatrical
 robot:{aggr:6,aware:6,pace:2,lane:3,self:3,range:5,plan:2,energy:4,size:7,exec:6,grudge:4,pack:6,flair:2,talk:4,listen:7,perc:6,tech:10,nerve:1,noise:10,cover:2},   // Moss_Mech: slow, steady, team-minded
 lumberjack:{aggr:7,aware:4,pace:6,lane:5,self:6,range:7,plan:5,energy:4,size:8,exec:4,grudge:8,pack:4,flair:6,talk:7,listen:1,perc:2,tech:2,nerve:4,noise:8,cover:1},   // Lumber_Jack: big, angry, goes for the big ones
 druid:{aggr:2,aware:9,pace:4,lane:3,self:0,range:2,plan:4,energy:4,size:5,exec:6,grudge:2,pack:6,flair:3,talk:6,listen:8,perc:7,tech:0,nerve:5,noise:1,cover:6},   // Druid: selfless healer
 archer:{aggr:2,aware:5,pace:3,lane:3,self:5,range:0,plan:2,energy:7,size:7,exec:9,grudge:4,pack:7,flair:2,talk:2,listen:7,perc:8,tech:1,nerve:2,noise:1,cover:7},   // Yumi_Archer: patient marksman
 chibi:{aggr:8,aware:3,pace:7,lane:6,self:6,range:9,plan:6,energy:3,size:6,exec:5,grudge:7,pack:3,flair:7,talk:9,listen:2,perc:3,tech:2,nerve:3,noise:2,cover:2},   // Chibi_Warrior: bold front-liner
 dog:{aggr:7,aware:9,pace:7,lane:6,self:1,range:10,plan:3,energy:5,size:3,exec:5,grudge:9,pack:1,flair:3,talk:6,listen:9,perc:9,tech:0,nerve:3,noise:4,cover:0},   // Guard Dog: loyal, alert, bites what comes near his people
 flannel_pal:{aggr:1,aware:9,pace:4,lane:2,self:5,range:1,plan:3,energy:6,size:2,exec:6,grudge:3,pack:2,flair:0,talk:3,listen:10,perc:7,tech:4,nerve:9,noise:2,cover:9},   // the companion (timid): hangs back, keeps her distance, picks off small ones next to him
 eng:{aggr:4,aware:6,pace:4,lane:4,self:4,range:4,plan:7,energy:5,size:6,exec:8,grudge:3,pack:6,flair:3,talk:4,listen:7,perc:7,tech:10,nerve:6,noise:5,cover:6},   // 0.12.75 Engineer: Shooter/Slasher 4 (6 toward shooter), very techy
 jp:{aggr:6,aware:5,pace:6,lane:5,self:2,range:4,plan:4,energy:5,size:5,exec:5,grudge:3,pack:2,flair:8,talk:10,listen:4,perc:5,tech:5,nerve:6,noise:7,cover:5},   // JP: loud, social, picks on everyone, steps in for family
 flannel:{aggr:3,aware:7,pace:5,lane:4,self:1,range:4,plan:3,energy:4,size:8,exec:7,grudge:8,pack:6,flair:1,talk:5,listen:6,perc:6,tech:6,nerve:2,noise:3,cover:8},   // Flannel_Man (Kyle's sheet)
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
function trait(u,k){if(k==='range'&&u&&u.key==='robot'&&u.lzReload>0)return 1;   /* 0.12.135 (Kyle): Warhound goes full Slasher while his lazer recharges, then back to normal */
  const p=personaOf(u);let v=p[k];for(const m of u.moods)v+=(m.shift[k]||0);return Math.max(0,Math.min(10,v))/10;}   // 0..1
function personaTitle(u){const p=personaOf(u);const ex=Object.keys(p).filter(k=>k in TRAIT_WORDS).map(k=>[k,Math.abs(p[k]-5),p[k]]).sort((a,b)=>b[1]-a[1]);
  const w=ex.slice(0,2).map(([k,,v])=>TRAIT_WORDS[k][v>=5?1:0]);return w.join(' ');}
function personaLines(u){const p=personaOf(u);return SLIDERS.map(([k,l,r])=>`${l} ${'▮'.repeat(p[k])}${'▯'.repeat(10-p[k])} ${r}`);}
const SHOW_LINES={hero:['HA!','Too easy!','Next!','Boom!','Did you see that?'],zombie:['Brainsss','Grrah!','*moans*'],werewolf:['AWOOO!','*snarl*','Grrr!']};
/* 0.12.38 (Kyle): every rock, log, car and ambulance can be looted ONCE in total; nobody picks one another unit is already searching */
/* 0.12.58 (Kyle): anyone can search anything. Debris (rocks, logs, stumps, bushes) hides herbs; cars hide spare parts, supplies and gear.
   The deck perk for it (Herbalist for debris, Scavenger for cars) makes it quick and likely to pay off; without it, it's slow and usually comes up empty.
   Returns 'perk' (my specialty), 'weak' (I can try), or null (nothing in it for me). */
function searchFit(h,o){if(!o||o.k==='car_ambulance')return null;const sp=insP(h),car=CONTAINER.test(o.k);if(o.k==='city_lootbox'||o.k==='city_front')return o.looted?null:'perk';   /* 0.12.119: a loot box is worth anyone's time */
  if(car){if(sp==='scavenger')return (h.kit||[]).length<2?'perk':'weak';return 'weak';}
  if(!SEARCHABLE.test(o.k))return null;if(sp==='herbalist')return (h.herbs||0)<3?'perk':null;return (h.herbs||0)<1?'weak':null;}
/* 0.12.58 (Kyle): the Warhound talks like a machine: clipped, capitals, no feelings, still readable.
   'I'll kill the alarm!' -> 'THIS UNIT WILL KILL THE ALARM.'  'They got them!' -> 'ALERT: THEY GOT THEM.' */
/* 0.12.139 (Kyle): JP doesn't hold back irl, so about a third of his lines get some salt on them */
/* 0.12.141 (Kyle): a little salt for the others: the traveling companion swears a fair bit, everyone else now and then (JP stays the worst) */
function saltify(s,rate){const r=Math.random();if(r>rate)return s;const P=['Shit, ','Damn, ','Hell, ','Christ, ','Ah, crap. '],S=[' Damn it!',' Holy shit.',' Hell yeah!',' Shit.',' Son of a bitch.'];
  if(r<rate/2)return P[Math.floor(Math.random()*P.length)]+s.charAt(0).toLowerCase()+s.slice(1);return s.replace(/[.!?]*$/,'')+'!'+S[Math.floor(Math.random()*S.length)];}
function jpify(s){const r=Math.random();if(r>.45)return s;   /* 0.12.139 (Kyle): hardcore, no kids playing this */
  const P=['Shit! ','Fuck! ','Fuckin\' hell, ','Goddamn, ','Son of a bitch! ','Holy shit, ','Oh fuck me. ','Motherfucker! ','Jesus fuckin\' Christ, ','Ah shit, ','Bullshit! '],
    S=[' Fuck yeah!',' Holy shit.',' Dumbass.',' Shit!',' Fuck off!',' Eat shit!',' Motherfucker.',' Goddamn it!',' Piece of shit.',' Get fucked!',' Shit\'s crazy.'];
  if(r<.22)return P[Math.floor(Math.random()*P.length)]+s.charAt(0).toLowerCase()+s.slice(1);return s.replace(/[.!?]*$/,'')+'!'+S[Math.floor(Math.random()*S.length)];}
function robotize(s){if(/^[A-Z0-9 :.,'\-?]+$/.test(s))return s;let t=' '+s+' ';
  const R=[[/\bI'm\b/gi,'THIS UNIT IS'],[/\bI'll\b/gi,'THIS UNIT WILL'],[/\bI've\b/gi,'THIS UNIT HAS'],[/\bI\b/g,'THIS UNIT'],[/\bme\b/gi,'THIS UNIT'],[/\bmy\b/gi,'THIS UNIT\'S'],
    [/\byou're\b/gi,'YOU ARE'],[/\bcan't\b/gi,'CANNOT'],[/\bdon't\b/gi,'DO NOT'],[/\bwon't\b/gi,'WILL NOT'],[/\bit's\b/gi,'IT IS'],[/\bthat's\b/gi,'THAT IS'],[/\blet's\b/gi,'PROCEED:'],
    [/\bgo go go\b/gi,'ADVANCE'],[/\bhelp\b/gi,'ASSISTANCE'],[/\bnope\b/gi,'NEGATIVE'],[/\byes\b/gi,'AFFIRMATIVE'],[/\bno\b(?=[!.?, ])/gi,'NEGATIVE'],[/\bok(ay)?\b/gi,'ACKNOWLEDGED'],[/\bthanks?( you)?\b/gi,'GRATITUDE LOGGED'],
    [/\b(ugh|oof|ow|ouch|argh|aah+|aaah+)\b/gi,'DAMAGE'],[/\bwhoa\b/gi,'ANOMALY'],[/\bhaha+\b/gi,'HA. HA.']];
  for(const [r,w] of R)t=t.replace(r,w);
  t=t.trim().replace(/\*[^*]*\*/g,'').replace(/[!]+/g,'.').replace(/\?+/g,'?').replace(/\.\.\.+/g,'.').replace(/\s+/g,' ').toUpperCase().trim();if(!/[.?]$/.test(t))t+='.';
  const pre=Math.random();return (pre<.18?'ALERT: ':pre<.3?'*BEEP* ':pre<.38?'QUERY: ':'')+t;}
/* 0.12.63 (Kyle): ability lists always show the actives first and the passive last, on every character card */
/* 0.12.63: temporary move-speed buffs (True_Grit +25%, Cozy +10%) */
/* 0.12.63 (Kyle) COZY: lasts 10s; +0.25 life and +0.25 energy every 0.5s; +10% melee attack speed and +10% move speed.
   Set_Camp keeps refreshing it for anyone in range; the Hearth camp upgrade gives it to everyone at the start of a stage. */
const COZY={dur:10,hp:.5,en:.5,melee:.1,move:.1};
function giveCozy(o){o.cozyT=Math.max(o.cozyT||0,COZY.dur);}
/* 0.12.64 (Kyle): proximity zone shared by Proximity_Bomb and the enemy rust mines: half-width w0 in its own lane, w1 one lane up or down */
var DEFUSE_D=12;   /* 0.12.156: where a defuser stands, world px left of the mine (tested for a safe sweet spot) */
function bombTrig(g,x,gy,Z,who){Z=Z||{w0:6.7,w1:3.3};for(const e of (who||g.enemies)){if(e.dead||e.fly)continue;const ex=e.key?g.heroX(e):e.x,dz=Math.abs(((e.gy!=null?e.gy:g.G))-gy),dx=Math.abs(ex-x)-(e.boss?e.w*.5:0);
    if((dz<=3.5&&dx<=Z.w0)||(dz>3.5&&dz<=11.5&&dx<=Z.w1))return e;}return null;}
function dynMv(h){let m=1-(h.hunger>0?HUNGER.spd[h.hunger]:0);if(h.key==='jp'&&!(h.highT>0)&&(h.soberT||0)>10)m-=.1;if(h.gritT>0)m+=h.gritMv||0;if(h.cozyT>0)m+=.1;return m;}
function abOrder(L){L=L||[];return [...L.filter(a=>!a.passive),...L.filter(a=>a.passive)];}
function fleshy(u){return !(u&&u.key==='robot');}
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
    u.thinkT=(.12+4.2*Math.pow(1-trait(u,'plan'),1.5)+1.2*(1-trait(u,'pace'))+Math.random()*.25)*(u.thirst>0?THIRST.slow[u.thirst]:1);return true;},   // 0.12.72: thirst slows decisions   // New Plan 10 rethinks ~8x a second; On Track 0 holds a plan 4-5s
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
      // 0.12.137 (Kyle) IF it's a Nemesis THEN take it seriously: a big pull to it (more per rank, more if it downed someone I know, more for grudge-holders)
      if(isHero&&c.nem){sc+=3+1.6*c.nem.rank+3*venge;if((c.nem.kills||[]).includes(u.key))sc+=3;w.push(c.nem.name.split(' ')[0]+'!');}
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
      const w=u.owner,wx=g.heroX(w),dx0=g.heroX(u);   /* 0.12.58 (Kyle): more aggressive: he goes after anything within 48px of his person OR within 85px of himself near the party, nearest first */
      const th=g.enemies.filter(e=>!e.dead&&!e.fly&&e.x<g.W-4&&(Math.abs(e.x-wx)<48||(Math.abs(e.x-dx0)<85&&H.some(h=>Math.abs(e.x-g.heroX(h))<110)))).sort((p,q)=>Math.abs(p.x-wx)*.5+Math.abs(p.x-dx0)-(Math.abs(q.x-wx)*.5+Math.abs(q.x-dx0)))[0];
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
    {const D=g.heroes.concat((g.pets||[]).filter(p=>p.dog)).filter(o=>!o.alive&&o.downed&&o!==h).sort((p,q)=>Math.abs(p.x-g.heroX(h))-Math.abs(q.x-g.heroX(h)))[0];
     if(D&&!h.pet){if(!h.revDecide||h.revDecide.D!==D||g.t>h.revDecide.until){const danger=bb.E.filter(e=>Math.abs(e.x-D.x)<40).length,swarm=bb.E.filter(e=>Math.abs(e.x-D.x)<22).length;const lone=trait(h,'pack');
         let w=.62+.3*(1-selfish)+.18*(1-lone)+.12*A-.12*(hp<.35?1:0);if(danger)w*=(.35+.85*aggr)*(1.25-.6*trait(h,'nerve'));   /* 0.12.58 (Kyle): more careful: IF the body is swarmed THEN each zombie right on it cuts the odds hard; 3+ and only the reckless try */if(swarm)w*=Math.pow(.5+.25*aggr,swarm)*(h.defib?1.5:1);   /* Steady units still go in under fire, Panicky ones balk */w=Math.max(.05,Math.min(.97,w));
         h.revDecide={D,until:g.t+1.6+Math.random()*.8,go:Math.random()<(h.defib?Math.min(.97,w+.45):w)};}   /* IF I carry a Defibrillator THEN I go for the downed ally far more readily (it is instant) */
       if(h.revDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'revive',runMul,reviveD:D,reviveLane:D.laneI};}}}
    // 0.12.30 car alarm: IF an alarm is blaring nearby THEN units go shut it off. Techy units (and Perceptive ones) are much keener;
    //   IF zombies are already around the car THEN only the bold go. Primitive units mostly leave it to someone else.
    {const car=(g.obst||[]).filter(o=>o.alarmT>0&&o.x>30&&Math.abs(o.x-g.heroX(h))<140).sort((p,q)=>Math.abs(p.x-g.heroX(h))-Math.abs(q.x-g.heroX(h)))[0];
     if(car&&!h.pet){if(!h.alDecide||h.alDecide.o!==car||g.t>h.alDecide.until){const tech=trait(h,'tech'),danger=bb.E.filter(e=>Math.abs(e.x-car.x)<40).length;
         let w=(.4+.55*tech+.12*trait(h,'perc'))*(1.15-.35*trait(h,'nerve'));if(danger)w*=.55+.6*aggr;   /* an alarm is treated as a big threat: most units go, Techy ones nearly always */h.alDecide={o:car,until:g.t+1.2+Math.random()*.8,go:Math.random()<Math.min(.95,w)};
         if(h.alDecide.go&&Math.random()<.5)Comms.bubble(g,h,Comms.pick(['I\'ll kill the alarm!','On the alarm!','Leave the car to me!']));}
       if(h.alDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'disarm',runMul,goTo:{ob:car},reviveLane:g.searchSpot(car,h).lane};}}}
    // 0.12.33 Medkit: IF I carry one AND an ally is under 50% THEN take it to them (selfless units most of all)
    if(h.medkit){const H=g.alive().filter(o=>o!==h&&!o.pet&&fleshy(o)&&o.hp/o.max<.62-.3*trait(h,'energy')).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];if(H&&Math.random()<.6+.35*(1-selfish)){const runMul=.45+1.4*pace;return {xoff:0,intent:'herb',runMul,goTo:H,reviveLane:H.laneI};}}
    // ambulance: IF I have no Medkit AND an unsearched ambulance is close (closer for Tunnel Vision) AND it's safe enough THEN search it
    if(!h.medkit&&!h.search&&!h.pet){const look=35+45*trait(h,'perc');const o=(g.obst||[]).find(o=>o.k==='car_ambulance'&&g_free(o,h)&&o.x>30&&Math.abs(o.x-g.heroX(h))<look);
      if(o){if(!h.amDecide||h.amDecide.o!==o||g.t>h.amDecide.until){const danger=bb.E.filter(e=>Math.abs(e.x-o.x)<60).length;h.amDecide={o,until:g.t+1.5+Math.random(),go:Math.random()<(danger?.2+.5*aggr:.6+.3*trait(h,'perc'))};}
        if(h.amDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'search',runMul,goTo:{ob:o},reviveLane:g.searchSpot(o,h).lane};}}}
    /* 0.12.51 Sapper: IF a spotted mine is near AND nothing is around it THEN go defuse it (Techy units are keener) */
    if(!h.pet){const M=(g.mines||[]).find(M=>!M.owner&&M.armed&&M.spotted&&M.x>30&&Math.abs(M.x-g.heroX(h))<95&&!bb.E.some(e=>Math.abs(e.x-M.x)<35)&&!g.heroes.some(o=>o!==h&&o.alive&&o.defuse&&o.defuse.M===M));
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
    {const sp=insP(h);if(sp==='scavenger'&&(h.kit||[]).includes('med')){const H=g.alive().filter(o=>o!==h&&!o.pet&&fleshy(o)&&o.hp/o.max<.72-.3*trait(h,'energy')).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
      if(H&&Math.random()<.55+.35*(1-selfish)){const runMul=.45+1.4*pace;return {xoff:0,intent:'herb',runMul,goTo:H,reviveLane:H.laneI};}}}
    if(!h.search&&!h.pet){const look=30+45*trait(h,'perc')+(insP(h)==='scavenger'?20:0);const o=(g.obst||[]).filter(o=>searchFit(h,o)&&g_free(o,h)&&o.x>30&&o.x<g.W-10&&Math.abs(o.x-g.heroX(h))<look).sort((p,q)=>(searchFit(h,p)==='perk'?0:60)+Math.abs(p.x-g.heroX(h))-((searchFit(h,q)==='perk'?0:60)+Math.abs(q.x-g.heroX(h))))[0];
      if(o){const fit=searchFit(h,o),danger=bb.E.filter(e=>Math.abs(e.x-o.x)<(fit==='perk'?35:60)).length;
        if(!h.srDecide||h.srDecide.o!==o||g.t>h.srDecide.until)h.srDecide={o,until:g.t+1.5+Math.random()*(fit==='perk'?1:3),go:Math.random()<(fit==='perk'?(danger?(.15+.5*aggr):.8+.15*trait(h,'perc')):(danger?0:(.12+.3*trait(h,'perc')+.1*trait(h,'tech'))*(1-.5*trait(h,'aggr'))))*((bb.heat.get(h)||0)?.25:1)*   /* IF something is on me right now THEN I usually fight first; a long shot without the perk is only worth it when it's quiet */(/^car_/.test(o.k)&&bb.E.some(e=>Math.abs(e.x-o.x)<80)?(.45+.55*aggr)*(1.3-.6*trait(h,'noise')):1)};   /* IF it's a car AND enemies are around THEN Calculated units hold off (an alarm would bring more) */
        if(h.srDecide.go){const runMul=.45+1.4*pace;return {xoff:0,intent:'search',runMul,goTo:{ob:o},reviveLane:g.searchSpot(o,h).lane};}}}
    if(h.search&&!h.search.trap&&h.search.o&&h.search.o.lanes)return {xoff:0,intent:'search',runMul:1,goTo:{ob:h.search.o},reviveLane:g.searchSpot(h.search.o,h).lane};
    // 0.12.27 Scavenger: IF I'm carrying an herb AND an ally is under 80% (and not already healing) THEN selfless, ally-aware units go to them
    if(insP(h)==='herbalist'&&h.herbs>0){const H=g.alive().filter(o=>o!==h&&!o.pet&&fleshy(o)&&o.hp/o.max<.9-.3*trait(h,'energy')&&!(o.herbT>0)).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
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
const CALL_COLOR={carcher:'#e05a5a',csorc:'#ffd84a',soldier:'#9fb06a',shoshi:'#b38cff',eng:'#ffcc33',jp:'#ff9a3c',dog:'#d8a060',cultist:'#b05cff',robot:'#4de0d0',flannel:'#f2c94c',flannel_pal:'#ff6b6b',chibi:'#5ab4ff',archer:'#ff9f43',druid:'#7ee081',lumberjack:'#c79bff'};
const NICK={carcher:'Archer',csorc:'Sorcerer',soldier:'Soldier',shoshi:'Shoshi',eng:'Engineer',dog:'Dog',cultist:'Cultist',robot:'Hound',flannel:'Flannel',flannel_pal:'Companion',chibi:'Chibi',archer:'Yumi',druid:'Druid',lumberjack:'Jack'};
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
  bubble(g,u,s,keep){if(!keep&&Math.random()<.22)return;if(u&&u.key==='dog')s=Comms.pick(['Woof!','Grrr!','Bark bark!','Arf!','*growls*','*snarls*']);   /* 0.12.38 (Kyle): about 22% less chatter on screen */if(u&&u.key==='robot')s=robotize(s);if(u&&u.key==='jp')s=jpify(s);else if(u&&u.key==='flannel_pal')s=saltify(s,.25);else if(u&&u.key&&u.key!=='robot'&&u.key!=='dog')s=saltify(s,.08);s=s.charAt(0).toUpperCase()+s.slice(1);(g.calls=g.calls||[]).push({u,s,c:CALL_COLOR[u.key]||'#e8e8e8',t:0,life:1.6+Math.min(1.4,s.length*.045)});
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
    this.nemQ=(this.run.nemeses||[]).filter(n=>n.stage<this.st.n).slice(0,1);   /* 0.12.136: one returning Nemesis per stage, 40% of the way in */
    this.dist=0;this.t=0;this.events=[];this.enemies=[];this.proj=[];this.fx=[];this.minions=[];this.texts=[];
    this.budget=2;this.bossSpawned=false;this.over=null;this.kills=0;this.shake=0;this.devourStacks=0;
    this.stageXp=0;this.stageScore=0;this.loot=[];this.stageGold=0;this.stageItems=[];this.stageFood=0;this.stageWater=0;this.stageParts=0;this.stats={};
    this.heroes=this.run.team.map((k,i)=>this.makeHero(k));
    this.heroes.sort((a,b)=>(STYLE[a.key].tank?-1:0)-(STYLE[b.key].tank?-1:0)||ORDER[a.style.atk]-ORDER[b.style.atk]);
    this.recalc();
    this.heroes.forEach((h,i)=>{h.x=this.home(h);const saved=this.run.heroes[h.key];h.hp=saved.dead?h.max*.25:Math.max(1,h.max*(saved.hpf==null?1:saved.hpf));});
    for(const h of this.heroes)if(h.thirst>0){const T=h.thirst;addMood(h,{perc:-THIRST.perc[T],plan:-THIRST.think[T],exec:-THIRST.think[T]},1e9,'thirst');}   /* 0.12.72 thirst: foggy head */
    this.mods=this.demo?scoutMods(null):scoutMods(this.run);
    {const kt=upgT(this.run,'kennel');if(kt&&!this.demo)this.spawnDog(kt);}
    for(const h of this.heroes)if((h.base.char&&h.base.char.abilities||[]).some(a=>a.id==='elite'))this.callPal(h,{heal:0});   /* 0.12.68 Elite_Survivors: she starts the stage beside him */
    {for(const h of this.heroes){const sv=this.run.heroes[h.key];const cr=sv.carry;   /* Triage builds ride along into the stage */
      if(cr&&!this.demo){if(cr.courage){h.courage=1;addMood(h,{nerve:-3,aggr:2},99999,'courage');}if(cr.medkit){h.medkit=1;h.medkitCamp=1;}if(cr.defib)h.defib=1;if(cr.kit&&cr.kit.length)h.kit=(h.kit||[]).concat(cr.kit).slice(0,2);sv.carry=null;}}}
    if(this.heroes.some(h=>h.courage))this.recalc();
    this.spawnTimer=0;
  }
  makeHero(key){
    const sv=this.run.heroes[key];const lvl=(this.slot&&this.slot.heroes[key]||{lvl:1}).lvl;
    const insp=(this.slot&&this.slot.heroes[key]||{}).insp||null;
    const TH=this.slot&&this.slot.heroes[key];const bse=heroBase(key,lvl,this.run.team.length);if(TH&&bse.char)bse.char=talChar(key,TH);   /* 0.12.106 skill-mod talents */
    return {key,insp,def:heroDef(key),style:STYLE[key],lvl,base:bse,spells:ABILITIES_OFF?[]:sv.spells.map(s=>Object.assign({cdT:Math.random()*1.5},s)),
      items:sv.items.slice(),alive:true,x:0,atkT:Math.random()*.5,anim:0,animT:0,walkT:Math.random(),shield:0,shieldT:0,buffT:0,lowT:0,nearT:0,hitFlash:0,alt:0};
  }
  isMeleeHero(h){return h.style.atk==='melee'||h.style.atk==='duo'||h.style.atk==='blade';}
  // where each hero stands: melee 4/10 of the screen, ranged/casters 2/10 (several of a kind spread out a little)
  // 0.12.11 (Kyle): no hard-coded spots for melee vs ranged. Everyone shares one neutral rally point; WHERE each unit actually
  //   stands comes from its personality and abilities (Brain.pickPosition: Shooter<->Slasher, Calculated<->Aggressive, what's ready).
  home(h){if(h.pet&&h.owner)return this.home(h.owner)-(h.dog?6:14);const al=(this.alive().length?this.alive():this.heroes).filter(o=>!o.pet);const j=Math.max(0,al.indexOf(h));
    return Math.round(this.homeX||this.W*.33)-j*8+(j%2?6:0);}
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
        if(m.meleeDmg)h.meleeDmg+=m.meleeDmg/100;if(m.rangedDmg)h.rangedDmg+=m.rangedDmg/100;if(m.meleeSpd)h.meleeSpd+=m.meleeSpd/100;if(m.rangedSpd)h.rangedSpd+=m.rangedSpd/100;if(m.kb)h.kbAdd+=m.kb;if(m.cdr)h.cdr=Math.min(.5,(h.cdr||0)+m.cdr/100);}
      {const H=this.slot&&this.slot.heroes&&this.slot.heroes[h.key];const P=(H&&H.pts)||{};   /* level-up stat points (chosen at camp) */
        {const tl=talPicks(H);const m={};let hpP=0,dmP=0;h.healBonus=0;h.revBonus=0;h.cap={};
          for(const id of tl){const [t,a,b]=id.split(':');if(t==='st'){const S=TAL_STAT[a];if(!S)continue;if(S.hpPct)hpP+=S.hpPct;if(S.dmgPct)dmP+=S.dmgPct;if(S.heal)h.healBonus+=S.heal/100;if(S.rev)h.revBonus+=S.rev/100;for(const [x,v] of Object.entries(S.mod||{}))m[x]=(m[x]||0)+v;}
            else if(t==='cap')h.cap[b]=1;}
          if(h.cap.glass){dmP+=15;hpP-=10;}if(h.cap.bulwark){hpP+=20;m.armor=(m.armor||0)+2;}if(h.cap.over)m.cdr=(m.cdr||0)+20;if(h.cap.jugg){m.armor=(m.armor||0)+3;m.kbRes=(m.kbRes||0)+40;}
          h.enCostM=h.cap.over?.8:1;h.talDR=h.cap.jugg?.1:0;h.adrOn=0;h.pingOn=0;h.olAcc=0;if(h.key==='shoshi')h.revBonus=(h.revBonus||0)+.3;
          if(hpP)h.max*=1+hpP/100;if(dmP)h.atk*=1+dmP/100;
          if(m.acc)h.acc+=m.acc;if(m.crit)h.crit+=m.crit/100;if(m.dodge)h.dodge+=m.dodge/100;if(m.armor)h.armorPts+=m.armor;if(m.luck)h.luck+=m.luck;
          if(m.kbRes)h.kbRes+=m.kbRes/100;if(m.enMax)h.enMaxB+=m.enMax;if(m.enRegen)h.enRegenB+=m.enRegen;if(m.move)h.mvMul+=m.move/100;
          if(m.meleeSpd)h.meleeSpd+=m.meleeSpd/100;if(m.rangedSpd)h.rangedSpd+=m.rangedSpd/100;if(m.kb)h.kbAdd+=m.kb;if(m.cdr)h.cdr=Math.min(.5,(h.cdr||0)+m.cdr/100);}   /* 0.12.106 talents */
        if(P.hp)h.max*=1+.04*P.hp;if(P.dmg)h.atk*=1+.03*P.dmg;if(P.acc)h.acc+=2*P.acc;if(P.crit)h.crit+=.01*P.crit;if(P.luck)h.luck+=3*P.luck;if(P.armor)h.armorPts+=P.armor;
        if(h.courage){h.atk*=1.2;h.acc-=10;}{const sv=this.run&&this.run.heroes&&this.run.heroes[h.key];const hu=(sv&&sv.hunger)||0,th=(sv&&sv.thirst)||0;h.hunger=hu;h.thirst=th;if(hu)h.acc-=HUNGER.acc[hu];}   /* 0.12.72 hunger: shaky aim */   /* Liquid Courage */const gt=upgT(this.run,'gen');if(gt)h.enRegenB+=[0,.25,.5,.75,1][gt];const bt=upgT(this.run,'bench');if(bt){h.flatRanged=(h.flatRanged||0)+bt;h.flatMelee=(h.flatMelee||0)+bt;}const sh=upgT(this.run,'shrine');if(sh)h.luck+=[5,10][sh-1];}
      if(insP(h)==='mountain')h.kbRes=Math.min(.95,(h.kbRes||0)+.5);h.luck+=2*(h.inevN||0);if(hasPerk(h,'superlucky'))h.luck*=2;   /* 0.12.56: The Mountain, Inevitable, Super Lucky */
      if(h.hp!=null)h.hp=Math.min(h.max,pct*h.max);}
  }
  alive(){return this.heroes.filter(h=>h.alive).concat((this.pets||[]).filter(p=>p.alive));}
  aliveHeroes(){return this.heroes.filter(h=>h.alive);}
  front(){const a=this.alive();return a.length?a.reduce((m,h)=>h.x>m.x?h:m,a[0]):null;}
  ev(type,o){this.events.push(Object.assign({type},o||{}));}
  // ---------------------------------------------------------------- spawning
  /* 0.12.136 (Kyle) NEMESIS (Shadow of Mordor style): IF an enemy downs a hero THEN it's promoted: it gets a name, heals to full,
     grows bigger and tougher, glows red and wears a name tag. Each further hero it downs ranks it up (max III).
     IF it's still alive when the stage ends THEN it remembers you: it comes back in a later stage, one rank higher.
     Killing one pays out bonus gold and XP. */
  nemesis(e,h){const run=this.run;run.nemeses=run.nemeses||[];const N=e.nem;
    if(!N){const F=['Rotgut','Gnasher','Mulch','Grimjaw','Stitches','Bonesaw','Sludge','Gristle','Moldy Mike','Chompers','Big Sheila','Toejam','Wormtooth','Hollowgut','Larry'],
        T=['the Hungry','Ankle-Biter','the Unkillable','Hero-Eater','the Persistent','of the Gutter','the Smelly','Kneecapper','the Patient','Two-Bites'];
      const used=new Set(run.nemeses.map(n=>n.name));let name;for(let i=0;i<20;i++){name=F[Math.floor(this.rng()*F.length)]+' '+T[Math.floor(this.rng()*T.length)];if(!used.has(name))break;}
      e.nem={id:'n'+Date.now()+Math.floor(this.rng()*1e4),name,rank:0,kills:[]};run.nemeses.push({id:e.nem.id,name,rank:0,type:e.type,kills:[],stage:this.st.n});}
    this.nemRank(e,h);this.ev('nemesis',{name:e.nem.name,rank:e.nem.rank,trait:(e.nem.traits||[]).slice(-1)[0]});}
  /* Nemesis traits (Kyle: skills they pick up): one when it first rises, a second at rank III.
     Ravenous: heals 40% of the damage it deals.  Bloodthirsty: every hit makes them bleed.  Bulwark: +8 armor and 70% knockback resistance.
     Howler: every 12s it howls and 2 zombies come running.  Cleaver: each swing also hits another hero standing next to the target (50%). */
  nemOnHit(e,V,d){if(e.nemHas('rav')){e.hp=Math.min(e.max,e.hp+d*.4);}
    if(e.nemHas('cleave')){const o=this.alive().find(o=>o!==V&&!o.pet&&Math.abs(this.heroX(o)-this.heroX(V))<10&&Math.abs((o.gy||this.G)-(V.gy||this.G))<8);if(o)this.hurtHero(o,d*.5,e);}}
  nemTrait(e){const N=e.nem,pool=['rav','blood','bulwark','howl','cleave'].filter(t=>!(N.traits||[]).includes(t));const t=pool[Math.floor(this.rng()*pool.length)];(N.traits=N.traits||[]).push(t);
    if(t==='bulwark'){e.armorPts=(e.armorPts||0)+8;e.nemKb=.7;}return t;}
  nemRank(e,h){const N=e.nem;if(N.rank>=3){e.hp=e.max;return;}N.rank++;if(h)N.kills.push(h.key);
    e.nemHas=t=>(N.traits||[]).includes(t);if(N.rank===1&&!(N.traits||[]).length)this.nemTrait(e);else if(N.rank===3&&(N.traits||[]).length<2)this.nemTrait(e);
    const r=()=>this.rng();   /* 0.12.136 (Kyle): no two promotions alike: every rank-up rolls its own boosts */
    const hpM=N.rank===1?1.5+r()*.7:1.2+r()*.35,dmM=1.1+r()*.3,arm=1+Math.floor(r()*6);e.max=Math.round(e.max*hpM);e.hp=e.max;e.dmg*=dmM;e.dmgMul*=dmM;e.armorPts=(e.armorPts||0)+arm;
    if(N.col==null){N.col=['#ff2a1a','#ff8a1a','#b04aff','#4aff7a','#ffd23f','#4ad8ff'][Math.floor(r()*6)];N.size=.95+r()*.25;}
    const R=(this.run.nemeses||[]).find(n=>n.id===N.id);if(R){R.rank=N.rank;R.kills=N.kills.slice();R.stage=this.st.n;R.traits=(N.traits||[]).slice();R.col=N.col;R.size=N.size;}
    this.text(e.x,(e.gy||this.G)-48,N.name.toUpperCase()+(N.rank>1?' · RANK '+'I'.repeat(N.rank):' RISES'),'#ff4a3a');this.shake=Math.max(this.shake||0,.3);
    for(const o of this.alive())if(Math.random()<.5)Comms.bubble(this,o,Comms.pick(N.rank>1?['It\'s getting stronger!','Not HIM again!',N.name.split(' ')[0]+' is back for more!']:['That one\'s got a name now...','We\'ve made an enemy.','Watch out for that one!']));}
  spawnNemesis(n){const e=this.spawnEnemy(n.type||'zombie',{x:this.W+12});e.nem={id:n.id,name:n.name,rank:0,kills:(n.kills||[]).slice(),traits:[]};const r=Math.min(3,(n.rank||1)+1);e.nem.col=n.col;e.nem.size=n.size;for(const t of (n.traits||[])){e.nem.traits.push(t);if(t==='bulwark'){e.armorPts=(e.armorPts||0)+8;e.nemKb=.7;}}
    for(let i=0;i<r;i++)this.nemRank(e,null);this.ev('nemesis',{name:n.name,rank:e.nem.rank,back:1});return e;}
  spawnEnemy(type,opt){
    const E=CFG.enemies[type];const st=this.st;const elite=false;   /* 0.12.87 (Kyle): no elite zombies for now (was 7% +1% a stage) */
    const hp=Math.max(1,Math.round(E.hp*st.hpMul*ENEMY_HP))*(elite?2.6:1);   /* 0.12.103: zombies trimmed with hero damage so fights take as long as before */
    const e={type,E,x:this.W+10+this.rng()*20,y:E.fly?this.G-70+this.rng()*36:this.G,hp,max:hp,dmg:(E.dmg||E.dmgDie/2+.5)*st.dmgMul*(elite?1.5:1),dmgMul:st.dmgMul*(elite?1.5:1),skin:E.skins?E.skins[Math.floor(this.rng()*E.skins.length)]:type,atkT:this.rng()*.5,
      walkT:this.rng(),anim:0,animT:0,slow:0,slowT:0,stun:0,burn:0,burnT:0,shred:0,elite,armorPts:Math.floor((E.armorPts||0)*Math.pow(1.03,(st.n||1)-1)),fly:!!E.fly,ranged:!!E.ranged,hitFlash:0,phase:this.rng()*6,target:null};
    if(opt)Object.assign(e,opt);e.elite=false;   /* 0.12.142 (Kyle): no elites at all (the leftover elite:'roll' made every wave zombie secretly elite); only promoted Nemeses are different */
    this.enemies.push(e);return e;
  }
  spawnBoss(){
    const B=CFG.bosses[this.st.boss];const hp=B.hp*this.st.hpMul;
    const b={type:this.st.boss,B,boss:true,x:this.W+70,y:B.fly?this.G-40:this.G,hp,max:hp,dmg:B.dmg*this.st.dmgMul,atkT:0,t1:2,t2:5,t3:8,anim:0,animT:0,walkT:0,
      slow:0,slowT:0,stun:0,burn:0,burnT:0,shred:0,hitFlash:0,fly:!!B.fly,phase:0,w:22};
    this.enemies.push(b);this.boss=b;this.bossSpawned=true;this.ev('boss',{name:B.name});this.shake=.6;for(const h of this.alive())Brain.panic(this,h,'boss');
  }
  pickType(){const n=this.st.n||1;const pool=Object.assign({},this.st.biome.pool);if(pool.fireman!=null)pool.fireman=n<3?0:Math.min(.2,.08+.015*(n-3));   /* 0.12.84 (Kyle): Fireman_Zombie from stage 3 (8% of a wave, +1.5% a stage, max 20%) */
    let tot=0;for(const k in pool)tot+=pool[k];let r=this.rng()*tot;for(const k in pool){r-=pool[k];if(r<=0&&pool[k]>0)return k;}return 'zombie';}
  // ---------------------------------------------------------------- damage
  /* 0.12.38 stage stats per unit (shown after a stage clears) */
  st8(h,own){if(!own&&h&&h.owner&&h.owner.key&&!h.dog)h=h.owner;   /* 0.12.68: companions/summons' numbers count for their owner; the Guard Dog keeps his own line */
    const k=(h&&h.key)||'?';this.stats=this.stats||{};return this.stats[k]||(this.stats[k]={dmg:0,heal:0,kills:0,downs:0,revives:0,searches:0,crits:0,heads:0,taken:0,biggest:0});}
  /* 0.12.56 Inevitable: IF something I try fails THEN +2 Luck and +1% crit (up to 10 stacks) until my next crit */
  failAct(h){if(!h||!h.key||this.demo||!hasPerk(h,'inevitable')||(h.inevN||0)>=10)return;h.inevN=(h.inevN||0)+1;h.luck+=2*(hasPerk(h,'superlucky')?2:1);}
  hitEnemy(e,amt,src,opt){
    if(src&&src.perch&&src.perch.roofP&&src.perch.st==='fight')amt*=1.15;   /* 0.12.124 (Kyle): shooting down from a storefront roof: +15% damage from the height */
    if(e.dead||amt<=0)return 0;opt=opt||{};{let o=src,n=0;while(o&&o.owner&&!o.base&&n++<4)o=o.owner;const M=o&&o.base&&HERO_DMG[o.key];if(M)amt*=M;}   /* 0.12.103 (Kyle): every hero's damage tuned so a stage-1 hero averages about 300; healers and utility lower */if(opt.fire&&e.E&&e.E.fireImmune){if(!opt.quiet&&this.rng()<.3)this.text(e.x,e.y-40,'immune','#9ab');return 0;}if(src&&src.key){e.lastHitBy=src;e.grudgeT=1+14*trait(e,'grudge');}
    if(!opt.sure&&e.E&&e.E.dodge&&this.rng()<e.E.dodge){this.text(e.x,e.y-30,'miss','#9aa');this.failAct(src);return 0;}
    let crit=false;if(src&&!opt.nocrit&&this.rng()<src.crit+(opt.critAdd||0)+.01*(src.inevN||0)+(src.laughT>0?.05:0)){amt*=(opt.critMul||src.critMul||1.75);crit=true;if(src.raT>0&&src.key==='archer')src.raT*=.5;   /* One Nocked passive: any crit halves its remaining cooldown */if(src.inevN){src.luck-=2*src.inevN*(hasPerk(src,'superlucky')?2:1);src.inevN=0;}
      const HR=!opt.fromTent&&src.base&&src.base.char&&(src.base.char.abilities||[]).find(a=>a.id==='herald');if(HR){src.critRegenT=HR.critT;for(const T of this.tentacles||[])T.heraldT=HR.critT;}}   // Herald: his crits (not his tentacles') feed him and every tentacle he has out   // Herald: crits feed energy
    if(opt.head){amt*=HEADSHOT.mul;this.text(e.x,e.y-(e.fly?24:54),'HEADSHOT!','#ff6040',false);   /* 0.12.36 (Kyle): half the old size */}
    {const ip=insP(src);   // inspiration passives that trigger on his hits
     if(ip==='onslaught'&&(src.moveT||0)>1){amt*=2;src.moveT=0;}
     if(ip==='bounty'&&!e.bounty&&!e.dead){const big=this.enemies.filter(o=>!o.dead).reduce((b,o)=>!b||o.max>b.max?o:b,null);if(big===e){e.bounty=src;e.markT=8;e.markAmp=.25;}}
     if(ip==='pickpocket'&&!e.picked&&!e.boss){e.picked=1;if(this.rng()<.35)this.text(e.x,e.y-34,'$','#ffd23f');}   /* 0.12.45 (Kyle): picked pockets mean better drops when it dies */
     if(ip==='webs'&&!e.boss&&this.rng()<.15){e.slow=Math.max(e.slow||0,.6);e.slowT=Math.max(e.slowT||0,2);e.webT=2;}}
    amt=mitigate(e,amt,opt.type); if(e.shred>0)amt*=1.2;if(e.markT>0)amt*=1+(e.markAmp||.25);   // Pinning_Shot mark
    if(opt.execute&&e.hp<e.max*.3)amt*=2;if(src&&src.cap&&src.cap.exec&&e.hp<e.max*.25)amt*=1.6;   /* Executioner talent */
    amt=Math.max(1,amt);e.hp-=amt;e.hitFlash=.12;this.lastHit=this.t;
    if(src&&src.key&&!this.demo){const S=this.st8(src);S.dmg+=amt;if(crit)S.crits++;if(opt.head)S.heads++;if(amt>S.biggest)S.biggest=amt;}   /* stage stats */
    this.splatter(e,amt,1,crit);
    if(opt.kb>0){const ratio=Math.min(1,amt/Math.max(1,e.max));let kb=ratio<.08?ratio*12:ratio<.25?2+ratio*14:5+ratio*12;   // chip ~0, medium small, big decent
      if(crit)kb*=1.6;if(e.boss)kb*=.12;kb*=opt.kb;if(e.fly)kb*=.7;if(e.nemKb)kb*=1-e.nemKb;else if(e.E&&e.E.kbRes)kb*=1-e.E.kbRes;e.kbv=Math.max(e.kbv||0,Math.min(18,kb)*7);e.kbDir=src&&src.x!=null&&!e.boss?(e.x>=src.x?1:-1):1;}
    if(!opt.quiet||crit)this.text(e.x+(this.rng()*8-4),e.y-(e.boss?100:e.fly?16:44),Math.round(amt),crit?'#ffd23f':opt.fire?'#ffb060':'#ffffff',crit);   /* burn ticks only show a number when they crit */
    if(src&&src.lifesteal>0&&src.alive){const b0=src.hp;src.hp=Math.min(src.max,src.hp+amt*src.lifesteal);if(src.key)this.st8(src).heal+=src.hp-b0;}
    if(!ABILITIES_OFF&&src&&src.style&&src.style.leech)this.healHero(this.weakest(),amt*src.style.leech*.5,true);
    if(src&&src.items&&src.items.length)this.procs(src,crit?'oncrit':'onhit',e);
    if(e.hp<=0){if(opt.blast)e._blast={x:opt.bx!=null?opt.bx:(src?src.x:e.x-20)};this.kill(e,src);}
    return amt;
  }
  kill(e,src){
    if(e.bounty&&!this.demo){this.stageGold+=10;this.text(e.x,e.y-40,'+10','#ffd23f');}
    if(insP(src)==='devour'&&src.alive){this.healHero(src,src.max*.03,true);src.en=Math.min(src.enMax||100,(src.en||0)+4);}
    if(src&&src.key==='csorc'&&src.alive){const AF=(src.base.char.abilities||[]).find(a=>a.id==='arcflow');if(AF)src.en=Math.min(src.enMax||100,(src.en||0)+AF.en);}   /* 0.12.178 Arcane_Flow */
    e.dead=true;this.kills++;if(src&&src.key&&!this.demo)this.st8(src).kills++;this.onKillDark(e);if(src&&src.key&&!this.demo)Brain.showoff(this,src,'kill');if(src&&src.key)Comms.onKill(this,src);
    const xp=(e.boss?e.B.xp*.95:e.E.xp*.8)*this.st.xpMul;   /* 0.12.149 (Kyle): kill XP back up a bit (.7 -> .8, bosses .85 -> .95) */   /* 0.12.142: same XP per kill as before the elite fix (was 2.5 x .33) */   // regular enemies give about half the XP they used to (stages are twice as long)
    /* 0.12.94 (Kyle): scores are much lower: a zombie is worth 1 (werewolf 1.6, fireman 3), +10% a stage; about 50 for a good stage 1 */
    const pts=(e.boss?e.B.pts:e.E.pts*3)/10*(1+.1*(this.st.n-1))*(1+this.run.prestige)*(src?src.scoreM:1);
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
        for(let i=0;i<piles;i++)this.loot.push({kind:'gold',x:e.x+(this.rng()*14-7),gy:e.gy,amt:1+Math.floor(this.rng()*4.6),t:0,big:false});   /* 0.12.93 (Kyle): smaller piles since there are more enemies now: 1-5 gold (avg 4.0 -> 2.8) */}
      {const m=e.boss?6:e.nem?2:1;   /* 0.12.38 camp supplies off enemies (low odds): food or water 3%, spare parts 4% */
        /* 0.12.93 (Kyle): food and water each run their own "pity" roll PER HERO (summons, companions and pets don't roll). The first kill is a
           2% chance; every miss adds +0.3% (more with Supply boosts, Luck and a picked-up enemy) until it drops, then it resets to 2%.
           That's about one of each every ~18 kills per hero (0.12.94). Bosses and elites still drop extra. */
        const K=src&&!src.pet&&!src.minion&&this.run.team&&this.run.team.includes(src.key)?src:null;
        if(K){const P=this.run.pity=this.run.pity||{},q=P[K.key]=P[K.key]||{food:0,water:0};const boost=((this.mods&&this.mods.supply)||1)*PK.s*(1+(K.luck||0)/200)*(1+[0,.15,.3][upgT(this.run,'forage')||0]);const kp=insP(K);   /* 0.12.104 Forager / Rain Catcher / Lucky Looter */
          for(const kind of ['food','water']){const ch=Math.min(1,(.02+.0025*q[kind])*boost*m*   /* 0.12.140 (Kyle: too much food and water): 1.2% + 0.15% a miss (was 2% + 0.3%) */((kp==='forager'&&kind==='food')||(kp==='raincatch'&&kind==='water')?2.5:hasPerk(K,'looter')?1.8:1));if(this.rng()<ch){q[kind]=0;this.loot.push({kind,x:e.x+(this.rng()*10-5),gy:e.gy,amt:1,t:0});}else q[kind]++;}}
        else if(m>1&&this.rng()<.03*m)this.loot.push({kind:this.rng()<.5?'water':'food',x:e.x+(this.rng()*10-5),gy:e.gy,amt:1,t:0});
        if(this.rng()<.04*m*((this.mods&&this.mods.parts)||1)*PK.p)this.loot.push({kind:'parts',x:e.x+(this.rng()*10-5),gy:e.gy,amt:1+(this.rng()<.5?1:0),t:0});}
      const iChance=(e.boss?1:e.elite?.1+.01*st.n:(e.E.itemChance!=null?e.E.itemChance:.004+.0012*st.n))*PK.i;if(this.rng()<iChance){const it=rollItem(this.run,this.rng,e.boss?'U':null,e.boss?'boss':e.elite?'elite':'mob');if(it)this.loot.push({kind:'item',x:e.x+6,item:it,t:0});}}
    if(e.nem){const N=e.nem;this.run.nemeses=(this.run.nemeses||[]).filter(n=>n.id!==N.id);const gd=15*N.rank;this.stageGold+=gd;for(const o of this.aliveHeroes())this.supXp(o,10+this.st.n);   /* 0.12.148 (Kyle): a Nemesis gives each hero 10 + the stage number in XP */this.ev('nemdown',{name:N.name});this.text(e.x,(e.gy||this.G)-50,N.name.toUpperCase()+' IS DEAD · +'+gd+'g','#ffd23f');}
    if(e.boss&&(e.type==='harvest'||e.type==='wraith'))this.fx.push({k:e.type+'die',x:e.x,gy:this.G,t:0,life:2.2,raw:1});
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
  /* 0.12.146 (Kyle): a really tiny XP trickle for doing supporty things: 0.03 XP per HP healed on someone else (or repaired on a building),
     3 XP for helping someone up, 0.25 XP per ally Tech_Support reaches. Goes straight to that hero. */
  supXp(h,x){if(!h||!h.key||this.demo||!this.slot||!(x>0))return;while(h&&h.owner&&!h.base)h=h.owner;const H=h&&this.slot.heroes[h.key];if(!H)return;H.xp+=x;
    while(H.xp>=needHeroXp(H.lvl)){H.xp-=needHeroXp(H.lvl);H.lvl++;this.ev('herolevel',{key:h.key,lvl:H.lvl});this.text(h.x,this.G-70,'LV '+H.lvl,'#7dff9a',true);}}
  healHero(h,amt,quiet,by){if(!h||!h.alive||amt<=0||h.dog)return;if(h.hunger>0)amt*=1-HUNGER.heal[h.hunger];   /* 0.12.72: a starving body heals badly */if(!fleshy(h)&&!this._mech)return;   /* 0.12.58: herbs, medkits and healing magic do nothing for the Warhound */{const M=by||this._healBy;if(M&&M.healBonus)amt*=1+M.healBonus;if(M&&hasPerk(M,'medicine'))amt*=1.3;}/* 0.12.56 Medicine Man: heals he gives +30% */const before=h.hp;h.hp=Math.min(h.max,h.hp+amt);{const B=by||this._healBy||h;if(B&&B.key&&!this.demo){this.st8(B).heal+=h.hp-before;if(B!==h)this.supXp(B,(h.hp-before)*.036);}}if(!quiet&&h.hp-before>=1)this.text(h.x,this.G-56,'+'+Math.round(h.hp-before),'#7dff9a');}
  weakest(){const a=this.alive().filter(fleshy);return a.length?a.reduce((m,h)=>h.hp/h.max<m.hp/m.max?h:m,a[0]):null;}
  // hit visual: a spray of blood thrown away from the blow, drops falling to the ground and leaving a fading spatter
  splatter(u,amt,dir,crit){if(this.demo&&this.rng()<.5)return;const boss=!!u.boss;const gy=u.gy!=null&&!u.fly?u.gy:this.G;
    const y=boss?gy-30:u.fly?u.y:gy-(u.type==='werewolf'?8:12);   // chest height on the half-size units
    this.fx.push({k:'blood',raw:1,x:u.x,y,gy:boss?gy:gy,dir,n:Math.min(18,6+Math.round(amt*1.2))+(crit?8:0),big:crit||boss,seed:this.rng()*1000,t:0,life:.9});}
  // Bleed: damage over time that ignores armor; reapplying refreshes it (doesn't stack)
  bleed(h,total,dur){const fresh=!(h.bleedT>0);h.bleedT=dur;h.bleedDps=total/dur;h.bleedTick=h.bleedTick||0;if(fresh)this.text(h.x,this.G-66,'BLEED','#ff3a4a');}
  hurtHero(h,amt,from){
    if(!h||!h.alive)return;
    /* 0.12.65 (Kyle) Guard Dog: no HP, he can take 5 hits (6 with a Tier III Kennel) before he goes down; one hit comes back every 15s (10s at Tier III).
       He can't be healed, but anyone can help him up (dogs never help others up: no hands). */
    if(h.dog){if(this.rng()<h.dodge){this.text(h.x,this.G-30,'dodge','#9ae6ff');return false;}if(h.invulnT>0)return false;h.hits=(h.hits||0)-1;h.hitFlash=.12;h.hitRegT=0;h.hp=h.max*Math.max(0,h.hits)/h.hitsMax;
      if(h.hits<=0){h.alive=false;h.downed=1;h.revT=0;h.downT=this.t;h.hp=0;h.plan=null;this.fx.push({k:'poof',x:h.x,y:this.G-14,t:0});Comms.bubble(this,h,'*yelp*',true);if(this.slot)this.st8(h).downs++;}return true;}if(from&&from.E){h.lastHitBy=from;h.grudgeT=1+19*trait(h,'grudge');}   // Forgiving forgets in a second; Vengeful holds it 20s
    if(this.rng()<h.dodge+this.eliteDodge(h)){this.text(h.x,this.G-52,'dodge','#9ae6ff');return false;}
    {const bc=h.base&&h.base.char&&h.base.char.blockCh;if(bc&&from&&!(h.smoking)&&this.rng()<bc){this.text(h.x,this.G-52,'BLOCK','#e8c890');this.ev('hit',{});h.blockT=.25;return false;}}   /* 0.12.79: shields block */
    if(from&&from.smokeT>0&&this.rng()<(from.smokeMiss||.5)){this.text(h.x,this.G-52,'miss','#c8d0d8');return false;}   // Smoke_Screen: blinded attackers miss half the time
    if(!this._bgRedirect&&from){const bg=this.alive().find(o=>o!==h&&insP(o)==='bodyguard'&&Math.abs(this.heroX(o)-this.heroX(h))<14&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6);
      if(bg){this._bgRedirect=1;this.hurtHero(bg,amt*.3,from);this._bgRedirect=0;amt*=.7;}}   // Bodyguard takes 30% of the hit
    {const ip=insP(h);
     if(ip==='omen'&&(h.omenCd||0)<=this.t){h.omenCd=this.t+12;this.text(h.x,this.G-52,'miss','#b8a0ff');return false;}
     if(ip==='haunt'&&from&&from.E&&!from.boss&&this.rng()<.2){from.retreatT=Math.max(from.retreatT||0,1.5);from.fearT=1.5;}
     if(ip==='shell'&&h.hp/h.max<.4&&(h.shellCd||0)<=this.t){h.shellCd=this.t+30;h.shellT=3;}}
    if(h.cloneT>0&&from&&from.E&&(this.clones||[]).some(c=>c.owner===h&&Math.abs(c.x-h.x)<40)&&this.rng()<(h.cloneDecoy||.35)){this.fx.push({k:'spark',x:h.x-(h.face||1)*10,y:this.G-22,t:0,c:'#9ad8ff'});return false;}   // Shadow_Clone soaks it
    if(h.smokeT>0&&this.rng()<.25){this.text(h.x,this.G-52,'dodge','#c8d0d8');return false;}   // ...and heroes inside the smoke are harder to hit
    if(h.invulnT>0){this.text(h.x,this.G-52,'miss','#9ae6ff');return false;}
    amt=mitigate(h,amt,'physical');if(from&&from.boss&&insP(h)==='mountain')amt*=.9;if(h.rageT>0)amt*=.75;if(h.shellT>0)amt*=.3;if(amt>0&&h.herbT>0)h.herbT=0;   // a hit stops a herb heal
    if(h.gritT>0)amt*=1-(h.gritDR||0);
    if(h.perch&&h.perch.hp>0)return false;   /* 0.12.75: up on the lookout, nothing can reach them */
    if(h.kitHits>0){h.kitHits--;if(h.kitHits<=0){h.armorPts-=h.kitAdd||0;h.kbRes-=h.kitKb||0;h.kitAdd=0;h.kitKb=0;this.text(h.x,this.G-60,'plating gone','#b8c0cc');}}   /* Field_Plating */
    if(h.key==='robot'){if(h.jet)amt=Math.min(amt,(h.jet.A&&h.jet.A.cap)||5);if(from&&h.nbT>0&&this.rng()<.1){h.nbT/=2;this.text(h.x,this.G-60,'CD½','#7fe0ff');}}   /* 0.12.67 Tactical_Retreat shield; Nano-Tech's built-in CD halving */
    if(h.key==='jp'){if(h.highT>0)amt*=.8;if(h.trashT>0)amt*=.7;if(h.rushT>0)return false;}   /* JP: high 10% less, Trash_Talk 30% less, immune while rushing to family */   // True_Grit (0.12.63: this was hidden inside the comment above, so Grit never actually reduced damage)
    if(h.talDR)amt*=1-h.talDR;   /* Juggernaut talent */
    if(h.key==='soldier'){const HB=(h.base.char.abilities||[]).find(a=>a.id==='hardened');if(HB&&h.hp<h.max*HB.under)amt*=1-HB.dr;}   /* 0.12.175 Battle_Hardened */
    if(this.heroes.some(o=>o.key==='shoshi'&&o.alive)){const L=h.dmgLog=h.dmgLog||[];L.push([this.t,amt]);while(L.length&&this.t-L[0][0]>4)L.shift();}   /* for Shoshi's Ctrl_Z */
    if(h.dadT>0)amt*=1-(h.dadDR||.4);   /* Shoshi's Dad_Mode */
    if(h.shield>0){const s=Math.min(h.shield,amt);h.shield-=s;amt-=s;if(h.thorns&&from&&!from.dead)this.hitEnemy(from,s*.3,null,{nocrit:1,sure:1});}
    if(amt<=0)return false;
    {const was=h.hp/h.max;h.hp-=amt;if(h.key&&was>=.35&&h.hp/h.max<.35)Brain.panic(this,h,'hurt');
     /* On Track <-> New Plan: IF I'm hit mid-search or mid-revive THEN rethinkers drop it, relentless units finish the job */
     if(h.key&&!this.demo){const pl=trait(h,'plan');if(h.search&&!h.search.disarm&&Math.random()<.08+.55*pl){h.search=null;h.srDecide={o:null,until:this.t+2,go:false};h.amDecide=null;h.plan=null;h.thinkT=0;}
       else if(h.plan&&h.plan.reviveD&&Math.random()<.05+.45*pl){h.revDecide={D:h.plan.reviveD,until:this.t+1.5,go:false};h.plan=null;h.thinkT=0;}}}
    /* 0.12.56: heavy hits shove heroes back a little (boss hits and anything over 15% of max HP); knockback resistance and The Mountain cut it */
    if(from&&from.E&&h.key&&(from.boss||amt>=h.max*.15)){const v=(from.boss?48:24)*(1-Math.min(.95,h.kbRes||0));if(v>1){h.kbv=Math.max(h.kbv||0,v);h.kbDir=(from.x>=this.heroX(h))?-1:1;}}
    if(h.key==='robot'&&h.alive&&h.hp>0&&h.hp/h.max<.3&&!h.jet&&!(h.trICD>this.t)&&(h.base.char.abilities||[]).some(a=>a.id==='retreat'))this.startJet(h);
    h.hitFlash=.12;this.text(h.x+4,this.G-52,Math.round(amt),'#ff5a5a');if(h.key&&!this.demo)this.st8(h).taken+=amt;
    {const PL=h.base&&h.base.char&&(h.base.char.abilities||[]).find(a=>a.id==='plating');if(PL){h.plStacks=(h.plStacks||0)+1;   // Reactive_Plating
      if(h.plStacks>=PL.stacks&&!(h.plCd>this.t)){h.plStacks=0;h.plCd=this.t+PL.cd;h.shield=Math.max(h.shield||0,h.max*PL.shield);h.shieldT=PL.shieldT;this.shake=Math.max(this.shake||0,.3);
        this.fx.push({k:'ring',x:h.x,y:this.G-10,r:PL.r,t:0,c:'#7fd8ff'});this.fx.push({k:'quake',x:h.x,gy:h.gy||this.G,t:0,life:.5,raw:1});this.ev('boom',{});
        for(const e of this.enemies){if(e.dead||e.fly||e.boss)continue;if(Math.abs(e.x-h.x)<PL.r&&Math.abs((e.gy||this.G)-(h.gy||this.G))<12){const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,PL.kb/100*40*8*(1-res));e.kbDir=e.x>=h.x?1:-1;}}}}}
    {const F=this.camp;if(F&&(F.state==='burn'||F.state==='start')&&(h===F.owner||h.owner===F.owner)){F.life--;if(F.life<=0){F.state='dying';F.dT=0;this.text(F.x,this.G-40,'THE FIRE DIES','#9aa');}}}
    this.splatter(h,amt,-1,false);
    this.procs(h,'whenhit',from,amt);
    if(h.hp/h.max<.35)for(const o of this.alive())this.procs(o,'allylow',null,0,h);
    if(h.hp<=0){if(from&&from.E&&!from.boss&&!from.dead&&!h.pet&&!h.dog)this.nemesis(from,h);this.heroDown(h);}
    return true;
  }
  heroDown(h){if(this.tryResurge(h))return;if(!h.pet)for(const o of this.alive())if(o.key==='shoshi'&&o!==h){o.pingT=4;this.text(this.heroX(o),(o.gy||this.G)-50,'PING!','#b38cff');}   /* Circle_Ping */if(h.cap&&h.cap.last&&!h.lsUsed&&!h.pet){h.lsUsed=1;h.hp=1;h.alive=true;h.invulnT=3;this.text(this.heroX(h),(h.gy||this.G)-50,'LAST STAND!','#ffd23f');this.fx.push({k:'ring',x:this.heroX(h),y:(h.gy||this.G)-10,r:18,t:0,c:'#ffd23f'});return;}   /* 0.12.106 Last Stand talent */h.building=null;h.repairing=null;h.syph=null;h.jet=null;h.lz=null;h.nano=null;h.stealthT=0;h.leap=null;h.leapH=0;h.whirl=null;h.dash=null;h.rolling=null;   /* no frozen mid-move poses */for(const o of this.alive())if(o!==h&&Math.abs(this.heroX(o)-this.heroX(h))<90)Brain.panic(this,o,'down');if(h.key&&!this.demo)this.st8(h).downs++;if(!h.pet&&h.cap&&h.cap.wind&&!h.swUsed){h.swUsed=1;h.swT=this.t+3;}   /* Second Wind talent */if(!h.pet){h.downed=1;h.revT=0;h.downT=this.t;h.search=null;h.plan=null;h.alDecide=null;h.srDecide=null;h.building=null;h.repairing=null;h.smoking=null;h.rush=null;h.cast=null;}   /* 0.12.102 fix: going down drops whatever job I was in the middle of (alarm, search, build...) *//* 0.12.22: downed, not dead: an ally can help them up */if(h.lastHitBy&&!h.lastHitBy.dead&&!this.demo)Brain.showoff(this,h.lastHitBy,'down');h.hp=0;h.alive=false;h.bleedT=0;this.ev('herodown',{key:h.key});Comms.onDown(this,h);this.fx.push({k:'poof',x:h.x,y:this.G-20,t:0,big:true});
    if(!h.pet){for(const p of this.pets||[])if(p.owner===h&&p.alive&&!p.dog){p.alive=false;this.fx.push({k:'poof',x:p.x,y:this.G-20,t:0});}}   // she leaves when he goes down
    if(!this.aliveHeroes().length){this.over='defeat';this.ev('defeat');
      /* 0.12.150 (Kyle): a small "learned something" bonus for a loss so a stuck team can grind through: each hero gets
         (4 + stage) x how far they got (0..1). Stage 7 at the halfway point = +5.5 XP each; a clear of that stage is worth ~60. */
      const prog=Math.max(0,Math.min(1,this.dist/(this.st.len||1))),bx=(4+this.st.n)*prog;if(bx>=1)for(const o of this.heroes)if(!o.pet)this.supXp(o,bx);this.lossXp=Math.round(bx);}}
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
    const mz=MUZZLE[h.key]||[10,30];const lift=h.perch?(h.leapH||0)*.6:0;const y0=this.G-mz[1]-lift;   /* 0.12.76: up on the lookout, shots leave from up there */const p={kind,x:h.x+(h.face<0?-mz[0]:mz[0]),y:y0,tx:target,dmg,src:h,spd:PSPD[kind]||160,pierce:opt.pierce||(h.style&&h.style.pierce)||0,opt,t:0,vy:kind==='brick'?-70:0,hit:new Set()};
    this.proj.push(p);return p;
  }
  aim(p,h,tg){if(h&&h.sprayT>0){h._accBonus=(h._accBonus||0)-18;const r=this._aimInner(p,h,tg);h._accBonus+=18;return r;}return this._aimInner(p,h,tg);}
  _aimInner(p,h,tg){   // turn a shot into a free-flying projectile aimed with the reticle (0.11): either direction, heroes or enemies
    p.aimed=true;p.gy=h.gy!=null?h.gy:this.G;p.h=(h.fly?(this.G-h.y)/UNIT_SCALE:(h.key&&HERO_HB[h.key]?(MUZZLE[h.key]||[0,14])[1]/UNIT_SCALE:28))+(h.perch?(h.leapH||0)*.6/UNIT_SCALE:0);const air=tg.fly&&!tg.boss;const flyH=air?(this.G-tg.y)/UNIT_SCALE:0;
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
  /* 0.12.58 (Kyle): IF what I'm working on (a search, an alarm, a mine, a plant) slides off the screen, or I'm being dragged off the edge with it,
     THEN drop it right away (bar and all) and think again. */
  /* 0.12.58 (Kyle): Hardcore: every area attack hurts allies caught in it too (the caster is spared). Hits each ally at most once per 'key'. */
  ffArea(src,x,gy,r,depth,dmg,key){if(!this.hardcore||!src||!src.key||!(dmg>0))return;for(const o of this.alive()){if(o===src||o.pet&&o.owner===src)continue;
      if(key){o._ffK=o._ffK||new Set();if(o._ffK.has(key))continue;}
      if(Math.abs(this.heroX(o)-x)<=r&&Math.abs((o.gy||this.G)-(gy==null?this.G:gy))<=depth){if(key)o._ffK.add(key);this.hurtHero(o,dmg,null);const S=this.st8(src);S.ff=(S.ff||0)+1;}}}
  /* 0.12.62 Warhound flamethrower: a cone that widens from 5 to 15 (gy) over 70px in front of him; every enemy in it starts (or restarts) burning */
  /* 0.12.75 Engineer: buildings */
  finishBuild(h,W){const BU=(h.base.char.abilities||[]).find(a=>a.id==='build'),MO=(h.base.char.abilities||[]).find(a=>a.id==='modify');const B=this.blds=this.blds||[];this.ev('thorns',{});
    if(W.k==='tower'){const A=BU.tower;B.push({bld:1,k:'tower',tier:1,x:W.x,gy:W.gy,hp:A.hp,max:A.hp,A,owner:h,t:0,occ:null});this.text(W.x,W.gy-40,'WATCHTOWER','#ffd23f');}
    else if(W.k==='tier'){const T=W.tgt;if(T&&T.hp>0&&T.tier<3){T.tier++;const nm=T.A.hp*Math.pow(1+T.A.per,T.tier-1);T.hp+=nm-T.max;T.max=nm;this.text(T.x,T.gy-50,'TIER '+T.tier,'#ffd23f');}}
    else if(W.k==='barrier'){const A=BU.barrier;B.push({bld:1,k:'barrier',x:W.x,gy:W.gy,hp:A.hp,max:A.hp,A,owner:h,t:0});}
    else if(W.k==='tesla'){const A=BU.tesla;B.push({bld:1,k:'tesla',x:W.x,gy:W.gy,hp:A.hp,max:A.hp,A,owner:h,t:0,zT:.5});}
    else if(W.k==='turret'){const A=MO.turret;const car=W.car;if(car){car.turret=1;B.push({bld:1,k:'turret',car,x:car.x,gy:LANES[Math.max(...car.lanes)],hp:A.hp,max:A.hp,A,owner:h,t:0,rl:0,shots:0,sT:0});}}}
  bldBlock(e,dt){for(const b of this.blds){if(b.hp<=0)continue;const ey=e.gy!=null?e.gy:this.G;
      if((b.k==='barrier'||b.k==='sandbag')&&Math.abs(ey-b.gy)<=b.A.depth&&e.x>b.x-2&&e.x<b.x+12){e.x=Math.max(e.x,b.x+10);e.bwT=(e.bwT||0)+dt;if(e.bwT>=(e.E&&e.E.atk||1.2)){e.bwT=0;e.anim=1;e.animT=.3;b.hp-=e.dmg;b.hitT=.15;if(b.A.barb){e.hp-=b.A.barb;e.hitFlash=.1;if(e.hp<=0)this.hitEnemy(e,1,null,{sure:1,nocrit:1});}}}
      else if(b.k!=='barrier'&&b.k!=='sandbag'&&b.k!=='turret'&&Math.abs(e.x-b.x)<9&&Math.abs(ey-b.gy)<5){e.bwT=(e.bwT||0)+dt*.5;if(e.bwT>=(e.E&&e.E.atk||1.2)){e.bwT=0;b.hp-=e.dmg;b.hitT=.15;}}}}
  satchelBoom(S){S.boom=1;const A=S.A,h=S.owner;this.fx.push({k:'boom',x:S.x,gy:S.gy,t:0,life:1.3,raw:1,big:1},{k:'crack',x:S.x,gy:S.gy,t:0,life:4,raw:1,r:A.r*.8},{k:'slam',x:S.x,gy:S.gy,t:0,life:.9,raw:1,r:A.r,seed:Math.random()*99});this.ev('boom',{});this.shake=Math.max(this.shake||0,1);
    const mul=h&&h.base?(h.atk/h.base.atk)*(h.rangedDmg||1)*(hasPerk(h,'sapper')?1.25:1):1;
    for(const e of this.enemies){if(e.dead)continue;const dx=Math.abs(e.x-S.x)-(e.boss?e.w*.4:0),dz=e.fly?0:Math.abs((e.gy!=null?e.gy:this.G)-S.gy);const d=Math.hypot(Math.max(0,dx),dz*1.6);if(d>A.r)continue;const f=1-.7*d/A.r;
      this.hitEnemy(e,(this.rollDice(A.dice)+((h&&h.flatRanged)||0))*mul*f,h&&h.alive?h:null,{sure:1});if(!e.dead&&!e.boss){const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,A.kb/100*40*8*(1-res)*f);e.kbDir=e.x>=S.x?1:-1;e.stun=Math.max(e.stun||0,.5*f);}}
    if(this.hardcore)for(const o of this.alive()){const d=Math.abs(this.heroX(o)-S.x);if(d<A.r&&Math.abs((o.gy||this.G)-S.gy)<14)this.hurtHero(o,this.rollDice(A.dice)*(1-.7*d/A.r)*.8,null);}
    for(const o of this.obst||[])if(/^car_/.test(o.k)&&Math.abs(o.x-S.x)<A.r&&o.alarmed==null&&!this.demo){o.alarmed=this.rng()<.5;if(o.alarmed)this.carAlarm(o);}}
  stepEng(dt,scroll){
    if(this.satchels&&this.satchels.length){for(const S of this.satchels){S.t+=dt;S.x0-=scroll*dt;S.x1-=scroll*dt;const u=Math.min(1,S.t/S.T);S.x=S.x0+(S.x1-S.x0)*u;S.hgt=50*Math.sin(Math.PI*u)*(u<1?1:0);if(S.x<-10)S.boom=1;}
      this.satchels=this.satchels.filter(S=>!S.boom);}
    const B=this.blds;if(!B||!B.length){this.engAuras(dt);return;}
    for(const b of B){b.t+=dt;b.x-=scroll*dt;if(b.hitT>0)b.hitT-=dt;if(b.car)b.x=b.car.x;
      if(b.k==='tesla'){b.hp-=b.max/b.A.life*dt;b.zT-=dt;if(b.zT<=0&&b.hp>0){const T=this.enemies.filter(e=>!e.dead&&Math.abs(e.x-b.x)<b.A.r).sort((p,q)=>Math.abs(p.x-b.x)-Math.abs(q.x-b.x))[0];
          if(T){b.zT=b.A.every;const mul=b.owner&&b.owner.base?(b.owner.atk/b.owner.base.atk):1;this.hitEnemy(T,(this.rollDice(b.A.dice)+(b.A.flat||0))*mul,b.owner&&b.owner.alive?b.owner:null,{sure:1});
            const pts=[[b.x,b.gy-20],[T.x,(T.gy!=null?T.gy:this.G)-12]];const T2=this.enemies.find(e=>!e.dead&&e!==T&&Math.abs(e.x-T.x)<25);
            if(T2){this.hitEnemy(T2,(this.rollDice(b.A.dice)+(b.A.flat||0))*mul*.6,b.owner&&b.owner.alive?b.owner:null,{sure:1});pts.push([T2.x,(T2.gy!=null?T2.gy:this.G)-12]);}
            this.fx.push({k:'bolt',pts,t:0,life:.25,raw:1});this.ev('zap',{});}else b.zT=.3;}}
      if(b.k==='turret'&&b.hp>0){const A=b.A;if(b.rl>0)b.rl-=dt;else{b.sT-=dt;if(b.sT<=0){const T=this.enemies.filter(e=>!e.dead&&e.x>b.x-20&&Math.abs(e.x-b.x)<A.range).sort((p,q)=>Math.abs(p.x-b.x)-Math.abs(q.x-b.x))[0];
          if(T){b.sT=A.gap;b.shots++;b.face=T.x>=b.x?1:-1;const ty=(T.gy!=null?T.gy:this.G)-12;this.fx.push({k:'tracer',x0:b.x+b.face*4,y0:b.gy-26,x1:T.x+(Math.random()-.5)*6,y1:ty+(Math.random()-.5)*8,t:0,life:.08,raw:1});this.ev('gun',{});
            if(this.rng()<A.hit)this.hitEnemy(T,this.rollDice(A.dice),b.owner&&b.owner.alive?b.owner:null,{sure:1,nocrit:1});
            if(b.shots>=A.burst){b.shots=0;b.rl=A.reload;}}else b.sT=.2;}}}}
    for(const b of B){if(b.hp<=0&&!b.gone){b.gone=1;this.fx.push({k:'poof',x:b.x,y:b.gy-14,t:0,big:true});if(b.car)b.car.turret=0;if(b.occ){const o=b.occ;o.perch=null;o.leapH=0;o.acc-=b.A.perchAcc;b.occ=null;}}}
    for(const b of B){if(b.k==='tower'&&!b.gone&&b.x<=-14&&b.owner){b.gone=1;if(b.occ){const o=b.occ;o.perch=null;o.leapH=0;o.acc-=b.A.perchAcc;b.occ=null;}
        if(b.owner.twT>0||b.owner.moT>0){b.owner.twT=0;b.owner.moT=0;this.text(this.heroX(b.owner),this.G-62,'tower + Modify ready!','#ffd23f');}}}   /* 0.12.95 (Kyle): a tower left behind RESETS the tower and Modify cooldowns */
    this.blds=B.filter(b=>!b.gone&&b.x>-30);
    this.engAuras(dt);}
  engAuras(dt){const B=this.blds||[];
    for(const o of this.alive()){if(o.ammoBuffT>0)o.ammoBuffT-=dt;o._bAcc=o._bAcc||0;let acc=0;
      for(const b of B){if(b.hp<=0)continue;const dx=this.heroX(o)-b.x,ad=Math.abs(dx),dz=Math.abs((o.gy||this.G)-b.gy);
        if(b.k==='tower'&&ad<b.A.r){if(b.tier>=1)this.healHero(o,o.max*b.A.regen*dt,true,b.owner);if(b.tier>=2)o.ammoBuffT=.3;if(b.tier>=3&&!b.occ)acc=Math.max(acc,b.A.acc);}
        if((b.k==='barrier'||b.k==='sandbag')&&b.A.acc&&dx<0&&dx>-b.A.behind&&dz<=b.A.depth)acc=Math.max(acc,b.A.acc);}
      if(acc!==o._bAcc){o.acc+=acc-o._bAcc;o._bAcc=acc;}}
    // lookout: IF the tower is tier 3 and empty THEN the nearest ranged ally (not the Engineer) climbs up
    for(const b of B){if(b.k!=='tower'||b.tier<3||b.hp<=0)continue;if(b.occ&&(!b.occ.alive||b.x<12)){const o=b.occ;o.perch=null;o.leapH=0;o.acc-=b.A.perchAcc;b.occ=null;}
      /* 0.12.174 (Kyle): every 2s someone is up the lookout, 20% chance per downed ally that they climb down to help. Nobody climbs up while an ally is down. */
      const downs=this.heroes.filter(o=>!o.pet&&!o.alive&&o.downed);
      if(b.occ&&b.occ.climbT>=1){b.dnT=(b.dnT||0)+dt;if(b.dnT>=2){b.dnT=0;const o=b.occ;
        if(downs.length&&this.rng()<Math.min(1,.2*downs.length)){const all=this.heroes.filter(x=>!x.pet&&x!==o).every(x=>!x.alive);o.perch=null;o.leapH=0;o.acc-=b.A.perchAcc;b.occ=null;o.climbT=0;
          Comms.bubble(this,o,Comms.pick(all?['Hold on, I\'m coming down!','Nobody else is standing, I\'m coming!']:['Man down! Coming down!','Hang on, I\'m on my way!','Getting off this thing!']),true);}}}
      if(!b.occ&&b.x>20&&!downs.length){const cand=this.alive().filter(o=>!o.pet&&o.key!=='robot'&&o.base.char&&o.base.char.ranged&&!this.isMeleeHero(o)&&Math.abs(this.heroX(o)-b.x)<60&&!(o.key==='eng'&&(o.building||o.repairing))).sort((p,q)=>(p.key==='eng')-(q.key==='eng')||Math.abs(this.heroX(p)-b.x)-Math.abs(this.heroX(q)-b.x));const o=cand[0];   /* 0.12.105: the Engineer can take the lookout himself when no other shooter is near (lobbing grenades from up there) */
        if(o){b.occ=o;o.perch=b;o.climbT=0;o.acc+=b.A.perchAcc;Comms.bubble(this,o,Comms.pick(['Going up!','I have the high ground.','Nice view.']),true);}}
      if(b.occ){const o=b.occ;o.pauseT=Math.max(o.pauseT||0,.05);o.moving=false;   /* 0.12.76: they slide up the ladder (about 1s), then step over to the middle */
        if(o.climbT<1){if(o.climbT===0)o.x=b.x+14;o.climbT=Math.min(1,o.climbT+dt/1.1);o.x+=(b.x+14-o.x)*Math.min(1,dt*12);o.leapH=150*o.climbT;}else{o.x+=(b.x-o.x)*Math.min(1,dt*8);o.leapH=150;}}}
    // Field_Plating: IF the Engineer has been next to an ally for 3s AND they have no kit THEN strap one on
    for(const h of this.heroes){if(h.key!=='eng'||!h.alive)continue;const PL=(h.base.char.abilities||[]).find(a=>a.id==='plating');if(!PL)continue;
      for(const o of this.alive()){if(o===h||o.dog||o.kitHits>0)continue;if(Math.abs(this.heroX(o)-this.heroX(h))<PL.r&&Math.abs((o.gy||this.G)-(h.gy||this.G))<8){o.kitT=(o.kitT||0)+dt;if(o.kitT>=PL.T){o.kitT=0;o.kitHits=PL.hits;o.kitAdd=o.armorPts*PL.armor;o.armorPts+=o.kitAdd;o.kitKb=PL.kb;o.kbRes=(o.kbRes||0)+PL.kb;this.text(o.x,this.G-60,'+PLATING','#c8d0dc');this.ev('zap',{});}}else o.kitT=0;}}}
  /* 0.12.70 Void_Cultist: pay life for an ability (never below 25%) */
  payLife(h,c){if(h.hp-h.max*c<h.max*.25)return false;h.hp-=h.max*c;this.text(h.x+4,this.G-52,'-'+Math.round(h.max*c),'#c0102a');this.fx.push({k:'ring',x:h.x,y:(h.gy||this.G)-8,r:10,t:0,c:'#c0102a'});unstealth(h);return true;}
  /* 0.12.67 Warhound: one Missile_Barrage-strength missile at T (used by the barrage and by Tactical_Retreat) */
  fireMissile(h,T,MS){if(!T)return;const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);this.ev('whoosh',{});
    (this.missiles=this.missiles||[]).push({x0:h.x+(h.face<0?-3:3),x:h.x,tx:T.x+(this.rng()*2-1)*MS.spread,gy:h.gy||this.G,tgy:Math.max(LANES[0],Math.min(LANES[LANES.length-1],(T.gy||this.G)+(this.rng()*2-1)*6)),t:0,T:MS.fly*(.9+this.rng()*.2),A:MS,src:h,mul,trail:0,h0:h.leapH||0});}
  /* Targeted Lazer: 0.5s charge (the tip tracks the target), then a 2s beam whose tip creeps forward; damage every 0.5s around the tip */
  robotLazer(h,dt,LZ){const L=h.lz;L.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;h.face=L.dir;const S=h.surgeT>0;L.tx-=(this.scroll||0)*dt;
    if(L.t<LZ.charge){if(L.tg&&!L.tg.dead){L.tx=L.tg.x-L.dir*LZ.lead;L.gy=L.tg.gy!=null?L.tg.gy:this.G;}return;}
    if(!L.fired){L.fired=1;this.ev('lazer',{d:LZ.fire});}   /* 0.12.129 (Kyle): a proper bzzzz for the lazer */
    L.tx+=L.dir*(S?LZ.travelS:LZ.travel)/LZ.fire*dt;   /* 0.12.77: a smooth fast sweep */
    L.dt+=dt;if(L.dt>=LZ.tick||L.first==null){L.first=1;if(L.dt>=LZ.tick)L.dt-=LZ.tick;else L.dt=0;const r=S?LZ.rS:LZ.r,dice=S?LZ.diceS:LZ.dice,mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);L.puff=1;
      for(const e of this.enemies){if(e.dead)continue;const dx=Math.abs(e.x-L.tx)-(e.boss?e.w*.5:0),dz=e.fly?0:Math.abs((e.gy!=null?e.gy:this.G)-L.gy);if(dx>r||dz>Math.max(4,r*.75))continue;
        this.hitEnemy(e,(this.rollDice(dice)+(h.flatRanged||0))*mul,h,{sure:1});if(S&&!e.dead&&!(e.E&&e.E.fireImmune))e.fb={T:(h.base.char.abilities.find(a=>a.id==='surge')||{}).burn||2,tick:e.fb?e.fb.tick:.2,src:h,mul};}
      if(this.hardcore)for(const o of this.alive()){if(Math.abs(this.heroX(o)-L.tx)<=r&&Math.abs((o.gy||this.G)-L.gy)<=Math.max(4,r*.75)){this.hurtHero(o,this.rollDice(dice)*.8,null);const S8=this.st8(h);S8.ff=(S8.ff||0)+1;}}}
    if(L.t>=LZ.charge+LZ.fire||L.tx<-4||L.tx>this.W+6){h.lz=null;h.lzReload=LZ.reload;}}
  /* Tactical_Retreat: an arc on the jetpack back to ~100 screen px from the left edge, then a slow landing. Same flight time from anywhere. */
  startJet(h){const TR=(h.base.char.abilities||[]).find(a=>a.id==='retreat');if(!TR)return;h.jet={t:0,T:TR.T,x0:h.x,x1:TR.x1,A:TR,shot:0};h.trICD=this.t+TR.icd*(1-(h.cdr||0));h.lz=null;h.nano=null;h.plan=null;
    this.ev('whoosh',{});this.shake=Math.max(this.shake||0,.2);Comms.bubble(this,h,Comms.pick(['TACTICAL RETREAT.','JETS: ENGAGED.','DISENGAGING.','REPOSITIONING.']),true);}
  robotJet(h,dt){const J=h.jet,A=J.A;J.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;J.x1=A.x1;const u=Math.min(1,J.t/J.T);
    const ux=Math.min(1,u/.78),e=ux*ux*(3-2*ux);h.x=J.x0+(J.x1-J.x0)*e;h.face=J.x1<J.x0?-1:1;
    h.leapH=u<.3?A.H*Math.sin(u/.3*Math.PI/2):u<.55?A.H:A.H*Math.pow(1-(u-.55)/.45,1.5);
    const MS=(h.base.char.abilities||[]).find(a=>a.id==='missiles');while(MS&&J.shot<A.shots&&u>=(J.shot+.6)/(A.shots+.4)){J.shot++;const live=this.enemies.filter(e=>!e.dead&&e.x>0&&e.x<this.W);if(live.length)this.fireMissile(h,live[Math.floor(this.rng()*live.length)],{...MS,spread:4});}
    if(u>=1){h.jet=null;h.leapH=0;this.fx.push({k:'puff',x:h.x,y:(h.gy||this.G)-2,t:0,life:.5,s:1.6});Comms.bubble(this,h,Comms.pick(['TOUCHDOWN.','REPAIRS ADVISED.','RE-ENGAGING.']));}}
  flameSpray(h,tg,FL){const dir=tg.x>=h.x?1:-1;h.face=dir;this.ev('flame',{});   /* 0.12.129 (Kyle): a flamethrower whoosh-roar */const gy=h.gy!=null?h.gy:this.G,x0=h.x+dir*12;const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
    this.fx.push({k:'flame',x:x0,gy,dir,len:FL.len,w0:FL.w0,w1:FL.w1,t:0,life:FL.dur,raw:1,src:h});this.ev('whoosh',{});
    const inCone=(x,y)=>{const d=(x-x0)*dir;if(d<-2||d>FL.len)return false;return Math.abs(y-gy)<=FL.w0+(FL.w1-FL.w0)*Math.max(0,d)/FL.len;};
    for(const e of this.enemies){if(e.dead||e.fly)continue;const ey=e.gy!=null?e.gy:this.G;if(!(inCone(e.x,ey)||(e.boss&&Math.abs(e.x-x0)<FL.len+e.w&&Math.sign(e.x-x0)===dir)))continue;
      if(e.E&&e.E.fireImmune){if(this.rng()<.3)this.text(e.x,e.y-40,'immune','#9ab');continue;}
      e.fb={T:FL.burn,tick:e.fb?e.fb.tick:.2,src:h,mul};}
    if(this.hardcore)for(const o of this.alive()){if(o===h||o.pet&&o.owner===h)continue;if(inCone(this.heroX(o),o.gy||this.G)){this.hurtHero(o,this.rollDice([2,4]),null);const S=this.st8(h);S.ff=(S.ff||0)+1;}}}
  dropLost(){const off=x=>x==null||x<14||x>this.W+8;
    for(const h of this.alive()){let lost=false;const S=h.search,D=h.defuse,P=h.plan;
      if(S&&S.o&&(off(S.o.x)||(!S.trap&&this.obst&&!this.obst.includes(S.o))))lost=true;   /* 0.12.156 fix: a defuse job points at a mine, not an obstacle; this used to throw every defuse out on its first frame */
      if(D&&D.M&&(off(D.M.x)||!(this.mines||[]).includes(D.M)))lost=true;
      if(P&&P.goTo&&((P.goTo.ob&&(off(P.goTo.ob.x)||!(this.obst||[]).includes(P.goTo.ob)))||(P.goTo.mine&&off(P.goTo.mine.x))))lost=true;
      if((S||D||h.planting||h.setting||h.tossing)&&this.heroX(h)<12)lost=true;
      if(lost){h.search=null;h.defuse=null;h.planting=null;h.setting=null;h.tossing=null;h.plan=null;h.thinkT=0;h.pauseT=0;if(S&&S.o&&S.o.searchBy===h)S.o.searchBy=null;}}}
  step(dt){
    if(this.over)return;this.t+=dt;
    const T=this;const al=this.alive();this.dropLost();for(const h of this.heroes)if(h.alive&&h.thirst>0&&!this.over){h.hp-=h.max*THIRST.drain[h.thirst]*dt;if(h.hp<1)h.hp=1;}   /* 0.12.72: dehydration drains a little life (never kills on its own) */for(const p of this.pets||[])if(p.dog&&!p.alive&&p.downed){p.x-=(this.scroll||0)*dt;if(p.x<-10)p.downed=0;}   /* a downed dog is left behind if nobody helps him up before he slides off screen */
    for(const p of this.pets||[])if(p.dog&&p.alive&&p.hits<p.hitsMax){p.hitRegT=(p.hitRegT||0)+dt;if(p.hitRegT>=p.hitRegEvery){p.hitRegT=0;p.hits++;p.hp=p.max*p.hits/p.hitsMax;}}   /* dog: one hit back every 15s (10s at Kennel III) */
    if(!this._hearth){this._hearth=1;if(!this.demo&&this.run&&upgT(this.run,'hearth'))for(const h of al)giveCozy(h);if(!this.demo&&this.run&&upgT(this.run,'jukebox'))for(const h of al)if(!h.pet)addMood(h,{nerve:-2},1e9,'jukebox');
      if(!this.demo&&this.slot)for(const h of al){const H=this.slot.heroes[h.key];for(const id of talPicks(H))if(id.startsWith('ps:')){const P=TAL_PERSONA[id.slice(3)];if(P)addMood(h,P.shift,1e9,'talent');}}   /* 0.12.106 personality talents */   /* 0.12.105 Old Jukebox */
      const sb=!this.demo&&this.run&&upgT(this.run,'sandbag');if(sb){const pool=al.filter(h=>!h.pet).sort(()=>this.rng()-.5);for(const h of pool.slice(0,sb>=3?2:1)){h.sandbag=sb;Comms.bubble(this,h,Comms.pick(['Got the sandbags.','I\'ll carry the bags.','Sandbags on my back!']));}}}   /* 0.12.104 Sandbag Wall: random carriers */   /* Hearth camp upgrade: everyone starts the stage Cozy */
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
    al.forEach((h,i)=>{const mv=MOVE[h.key]||26;const drift=this.scroll?Math.max(-8,Math.min(10,(mv-avgMv)*.9)):0;let tx=this.exiting?this.W+60:(h.plan&&h.plan.reviveD&&!h.plan.reviveD.alive?h.plan.reviveD.x:h.plan&&h.plan.goTo&&h.plan.goTo.mine?h.plan.goTo.mine.x-DEFUSE_D:h.plan&&h.plan.goTo&&h.plan.goTo.ob?(()=>{const o=h.plan.goTo.ob;if(/search|disarm/.test(h.plan.intent))return this.searchSpot(o,h).x;const [a,b]=this.obSpan(o,o.lanes[0]);return h.x<(a+b)/2?a-6:b+6;})():h.plan&&h.plan.goTo&&h.plan.goTo.alive?this.heroX(h.plan.goTo)+(h.plan.goTo.x<h.x?8:-8):this.home(h)+drift+(h.plan?(this._clear?Math.max(-6,h.plan.xoff):h.plan.xoff):0));tx=Math.max(8,Math.min(this.W-8,tx));   /* 0.12.58: with nothing near, nobody hangs far back (the march needs the party up front) */
      if(!this.exiting&&trait(h,'range')>.55&&!(h.plan&&(h.plan.intent==='retreat'||h.plan.reviveD||h.plan.goTo))){const foe=this.enemies.filter(e=>!e.dead&&!e.boss&&!e.fly&&e.gy!=null&&Math.abs(e.gy-(h.gy||190))<4&&e.x>h.x&&e.x-h.x<90).reduce((b,e)=>!b||e.x<b.x?e:b,null);if(foe)tx=Math.max(tx,Math.min(this.home(h)+28,foe.x-12));}   // push forward into the fight
      h._tx=tx;const x0=h.x;const C=h.base.char;const rm=C?((h.plan&&/retreat|charge|kite|cover|regroup|gather|revive|herb|guard|search|disarm|hunker|defuse/.test(h.plan.intent))||this.exiting?C.run:1):(h.plan?h.plan.runMul:1);h.running=C?rm>1:false;
      const d=tx-h.x,st=mv*(h.mvMul||1)*(h.slowT>0?1-(h.slow||0):1)*dynMv(h)*(h.whirl?.5:1)*(this.exiting&&!C?2.6:1.6)*rm*(rm>1?.75:.85)*dt;/* 0.12.13 (Kyle): walking 15% slower, running 25% slower */const busy=(h.building&&h.walkTo==null)||h.repairing;   /* 0.12.162 (Kyle): the Engineer stands still while he builds, upgrades/modifies or repairs */
      if((!(h.pauseT>0)||this.exiting)&&!busy)h.x+=Math.abs(d)<=st?d:Math.sign(d)*st;h.moving=Math.abs(h.x-x0)>.02;h.moveT=h.moving?(h.moveT||0)+dt:0;});
    const f=this.front();if(!f)return;
    // blocking: walk unless something is close
    const near=this.enemies.filter(e=>!e.dead&&!e.fly).reduce((m,e)=>Math.min(m,e.x-(e.boss?e.w:0)-(e.ranged?40:0)),1e9);
    const blocked=(near<f.x+70||(this.boss&&!this.boss.dead))&&!(this.t-(this.lastHit||0)>3&&!(this.boss&&!this.boss.dead));
    /* 0.12.58 (Kyle): the screen only pushes forward once MORE than half of the standing party is past the middle of the screen.
       The party's resting spot is just past the middle, so walking up to it is what lets the screen move on. */
    {const H0=this.W*.33,H1=this.W*.58;this.homeX=this.homeX||H0;if(!this.exiting)this.homeX=H1;}
    const stand=al.filter(h=>!h.pet&&!h.perch),past=stand.filter(h=>h.x>this.W/2).length;   /* 0.12.75: whoever is up the lookout doesn't hold the march back */
    this._clear=!blocked;const anyDown=this.heroes.some(h=>!h.alive&&h.downed);   /* 0.12.58 (Kyle): the screen can't move on while anyone is down */
    const scroll=this.exiting?0:blocked||anyDown?0:past>stand.length/2?Math.max(18,Math.min(32,avgMv)):0;this.scroll=scroll;if(this.exiting){this.exitT+=dt;for(const h of al)h.walkT+=dt*(MOVE[h.key]||26)/26;}
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
      if(!this.clusters){const CL=this.st.n===1?CLUSTERS1:CLUSTERS;const N=CL.count;this.clusters=[];
        for(let i=0;i<N;i++){const t=i/(N-1);const size=i===0?CL.first:i===N-1?CL.last[0]+Math.floor(this.rng()*(CL.last[1]-CL.last[0]+1)):
            Math.max(2,Math.min(CL.cap,Math.round(CL.first+(CL.last[0]+.5-CL.first)*t+(this.rng()*2-1))));
          const at=this.st.len*Math.max(.02,Math.min(.9,.04+.84*t+(this.rng()*2-1)*.04));const sz=Math.max(1,Math.floor(size*(this.st.countMul||1)*((this.mods&&this.mods.foes)||1)));this.clusters.push({at,size:sz,left:sz,t:0});}
        {const n=this.st.n||1;let k=n===1?1:n<5?1:n<10?1+(this.rng()<.5?1:0):n<15?2:2+(this.rng()<.5?1:0);   /* 0.12.175 (Kyle): Screamers */
          if(this.demo)k=0;if(n===1&&N>0)this.clusters[N-1].scr=1;else for(let q=0;q<k;q++){const i=Math.floor(N/2)+Math.floor(this.rng()*Math.ceil(N/2));if(this.clusters[i])this.clusters[i].scr=(this.clusters[i].scr||0)+1;}}
        // strays: single zombies dropped in the quiet gaps between clusters (never right on top of one), some stages get none in a gap
        this.strays=[];const ats=this.clusters.map(q=>q.at);for(let i=0;i<STRAYS_PER_STAGE(this.st.n)*3&&this.strays.length<STRAYS_PER_STAGE(this.st.n);i++){
          const k=Math.floor(this.rng()*(ats.length-1));const a=ats[k],b=ats[k+1];if(b-a<this.st.len*.07)continue;const x=a+(b-a)*(.3+.4*this.rng());if(this.strays.some(s=>Math.abs(s-x)<this.st.len*.05))continue;this.strays.push(x);}
        this.strays.sort((p,q)=>p-q);}
      if(!this.demo&&this.nemQ&&this.nemQ.length&&this.dist>=this.st.len*.4)this.spawnNemesis(this.nemQ.shift());
      while(this.strays&&this.strays.length&&this.dist>=this.strays[0]){this.strays.shift();if(this.enemies.filter(e=>!e.dead).length<24)this.spawnEnemy('zombie',{x:this.W+10+this.rng()*22,elite:'roll',stray:1});}
      const C0=this.clusters[0];
      if(C0&&this.dist>=C0.at){if(!C0.alerted){C0.alerted=1;if(!this.demo&&this.run&&upgT(this.run,'radio')>=2)for(const h of this.alive())if(!h.pet){if(!(h.alertT>0))h.acc+=10;h.alertT=5;}}   /* 0.12.105 Radio Shack II: early warning */C0.t-=dt;if(C0.t<=0&&this.enemies.filter(e=>!e.dead).length<28){C0.left--;C0.t=.12+this.rng()*.35;
          {const scr=C0.scr>0&&(C0.left<C0.size*.6||C0.left<=C0.scr);if(scr)C0.scr--;this.spawnEnemy(scr?'screamer':this.pickType(),{x:this.W+10+this.rng()*22,elite:'roll'});}if(C0.left<=0)this.clusters.shift();}}}
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
      if(!((h.building&&h.walkTo==null)||h.repairing)){const ty=LANES[h.laneI];h.gy+=Math.sign(ty-h.gy)*Math.min(Math.abs(ty-h.gy),LANE_SPD*1.4*dt);}
      if(h.leap){h.leap.age=(h.leap.age||0)+dt;if(h.leap.age>1.2){h.x=h.leap.x1;h.leap=null;h.leapH=0;}}   /* 0.12.50 (Kyle): a leap always lands, even if the fight around him ends mid-air */
      if(h.kbv>0&&h.building&&h.walkTo==null)h.kbv=0;if(h.kbv>0){h.x+=(h.kbDir||-1)*h.kbv*dt;h.kbv=Math.max(0,h.kbv-h.kbv*8*dt-4*dt);}   /* shoved by a heavy hit */
      regenEnergy(h,dt);if(h.critRegenT>0){h.critRegenT-=dt;h.en=Math.min(h.enMax||100,(h.en||0)+2*dt);h.hp=Math.min(h.max,h.hp+2*dt);}/* Herald: +1 energy and +1 HP every 0.5s */if(h.riseT>0){h.riseT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);}h.walkT+=dt*(scroll?(MOVE[h.key]||26)/26:0);if(h.animT>0)h.animT-=dt;if(h.hitFlash>0)h.hitFlash-=dt;if(h.buffT>0)h.buffT-=dt;
      if(h.shellT>0){h.shellT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);}
      if(h.shieldT>0){h.shieldT-=dt;if(h.shieldT<=0)h.shield=0;}
      if(h.invulnT>0)h.invulnT-=dt;
      if(h.hotT>0){h.hotT-=dt;h.hotTick=(h.hotTick||0)+dt;if(h.hotTick>=h.hotEvery){h.hotTick-=h.hotEvery;this.healHero(h,h.hotAmt,false,h.hotSrc);}}   // Rejuvenating Bloom
      if(h.slowT>0){h.slowT-=dt;if(h.slowT<=0)h.slow=0;}if(h.bleedT>0){h.bleedT-=dt;h.bleedTick+=dt;if(h.bleedTick>=1||h.bleedT<=0){const d=h.bleedDps*Math.min(1,h.bleedTick);h.bleedTick=0;h.hp-=d;this.text(h.x+6,this.G-58,Math.round(d),'#c0102a');if(h.hp<=0){this.heroDown(h);continue;}}}
      for(const it of h.items)if(it.cd>0)it.cd-=dt;
      if(this.enemies.some(e=>!e.dead&&e.x-h.x<36))this.procs(h,'near');
      if(h.roofBusy)continue;   /* 0.12.122: up a storefront roof for the crate: busy, no fighting */
      // signature ability
      const SG=ABILITIES_OFF?null:SIG[h.key];if(SG){h.sigT=(h.sigT==null?SG.cd*.5:h.sigT)-dt;if(h.sigT<=0){const ok=SG.fn(this,h,h.atk*h.pow);h.sigT=ok?SG.cd*(1-h.cdr):.6;if(ok){this.procs(h,'oncast');}}}
      // spells
      for(const s of h.spells){if(SPELL[s.arch].passive)continue;s.cdT-=dt;if(s.cdT<=0){const ok=this.cast(h,s);s.cdT=ok?SPELL[s.arch].cd*(1-h.cdr):.5;}}
      // basic attack
      const rate=dt*h.aspd*(h.buffT>0?1.3:1);const st=h.style;
      const findT=(kind)=>{const melee=kind==='melee';const ox=melee?f.x:h.x;const range=melee?st.reach*UNIT_SCALE+3:(st.range||170)*(h.perch?1+((CHAR.eng.abilities[0].tower.perchRange)||.3):1);
        const L=this.enemies.filter(e=>!e.dead&&e.inside==null&&(melee?(e.boss?e.x-e.w-h.x<=range&&e.x>h.x:Math.abs(e.x-h.x)<=range):(Math.abs(e.x-h.x)<=range))).sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x));
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
    const alSeen=al.filter(o=>!(o.stealthT>0)&&!(o.perch&&o.perch.hp>0)),alE=alSeen.length?alSeen:al;   /* 0.12.67 stealth: zombies only see who isn't hidden */
    for(const e of this.enemies){if(e.dead)continue;const al=alE;if(e.target&&(e.target.stealthT>0||(e.target.perch&&e.target.perch.hp>0))&&alSeen.length&&!(e.tauntT>0)){e.target=null;e.plan=null;}
      if(!e.boss)regenEnergy(e,dt);e.walkT+=dt;if(e.hitFlash>0)e.hitFlash-=dt;if(e.animT>0)e.animT-=dt;if(e.shred>0)e.shred-=dt;
      if(e.burnT>0&&e.E.fireImmune)e.burnT=0;   /* Fireman_Zombie can't burn */
      if(e.fb){const F=e.fb;F.T-=dt;F.tick+=dt;while(F.tick>=.25&&!e.dead){F.tick-=.25;this.hitEnemy(e,this.rollDice([1,4])*F.mul,F.src&&F.src.alive?F.src:null,{fire:1,quiet:1,sure:1});}if(F.T<=0||e.dead)e.fb=null;}   /* 0.12.62 flamethrower burn: 1d4 every 0.25s for 2s */
      if(e.burnT>0){e.burnT-=dt;e.hp-=e.burn*dt;if(e.hp<=0){this.kill(e,null);continue;}}
      if(e.poisonT>0){e.poisonT-=dt;e.poisonTick=(e.poisonTick||0)+dt;
        if(e.poisonTick>=POISON.tick){e.poisonTick-=POISON.tick;const d=e.max*POISON.pct*e.poison;e.hp-=d;this.text(e.x+4,e.y-38,Math.round(d),'#7dff6a');if(e.hp<=0){this.kill(e,null);continue;}}
        if(e.poisonT<=0){e.poison=0;e.poisonTick=0;}}
      if(e.bleedT>0){e.bleedT-=dt;e.hp-=e.bleedDps*dt;if(e.hp<=0){this.kill(e,null);continue;}}   // nail bleed from Trip Bomb (ignores armor)
      if(e.slowT>0){e.slowT-=dt;if(e.slowT<=0)e.slow=0;}
      if(e.kbv>0){e.x+=(e.kbDir||1)*e.kbv*dt;e.kbv=Math.max(0,e.kbv-e.kbv*8*dt-4*dt);}
      if(e.stun>0){e.stun-=dt;continue;}
      if(this.obst&&this.roofEnemy(e,dt,scroll))continue;   /* 0.12.122: storefront roof routes */
      if(this.blds&&!e.fly&&!e.boss)this.bldBlock(e,dt);   /* 0.12.75: barriers stop them; they hit buildings in their way */
      if(e.distractT>0){e.distractT-=dt;e.distractX-=scroll*dt;e.x-=scroll*dt;const dx=e.distractX-e.x;if(Math.abs(dx)>2)e.x+=Math.sign(dx)*Math.min(Math.abs(dx),e.E.spd*(1-(e.slow||0))*dt);e.face=dx>0?1:-1;e.walkT=(e.walkT||0)+dt;continue;}   /* 0.12.68 Bottle_Distraction: they go check the noise */
      const sp=(1-e.slow);
      if(e.E.scream&&this.screamAI(e,dt,scroll,al))continue;
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
          if(e.tauntT>0){e.tauntT-=dt;if(e.tauntBy&&e.tauntBy.alive){e.target=e.tauntBy;e.plan=null;}}   /* Trash_Talk: they only want JP */
          else if(!e.plan&&!e.E.backline&&e.target.laneI!==e.laneI&&inLane.length&&Math.abs(e.gy-LANES[e.laneI])<1)e.target=nearestIn(inLane);
          e.think=(e.think==null?this.rng():e.think)-dt;
          if(!e.plan&&e.think<=0){e.think=1;   // once a second of walking: 10% chance to drift a lane (only while still 50px+ out)
            if(far&&this.rng()<.1){const alt=[e.laneI-1,e.laneI+1].filter(l=>l>=0&&l<LANES.length);e.laneI=alt[Math.floor(this.rng()*alt.length)];const t2=nearestIn(al.filter(h=>h.laneI===e.laneI));if(t2)e.target=t2;}   // random drift
            else if(this.rng()<.02){const c=nearestIn(al);if(c&&c!==e.target)e.target=c;}}   // rare: go after someone closer
          /* 0.12.58 (Kyle): every 1.5s a zombie has a 7% chance to wander into a neighbouring lane, wherever it is */
          e.lsw=(e.lsw==null?this.rng()*1.5:e.lsw)-dt;if(e.lsw<=0){e.lsw=1.5;if(!e.leapA&&!e.stun&&this.rng()<.07){const alt=[e.laneI-1,e.laneI+1].filter(l=>l>=0&&l<LANES.length);e.laneI=alt[Math.floor(this.rng()*alt.length)];e.laneHold=this.t+2.5;const t2=nearestIn(al.filter(h=>h.laneI===e.laneI));if(t2&&Math.abs(this.heroX(t2)-e.x)<60)e.target=t2;}}
          const T=e.target;
          this._ignoreMine=null;const wantL0=e.plan&&e.plan.lane!=null?e.plan.lane:T.laneI;const wantL=this.freeLane(wantL0,e.laneI,e.x-45,e.x+6);const dodgeOb=wantL!==wantL0||!!this.laneBlocked(e.laneI,e.x-45,e.x+6);
          if(!(e.laneHold>this.t&&!dodgeOb)&&(dodgeOb||e.plan||e.E.backline||!far||!inLane.length||T.laneI!==e.laneI)){if(Math.abs(e.gy-LANES[e.laneI])<1&&wantL!==e.laneI)e.laneI+=Math.sign(wantL-e.laneI);}   // head for the chosen lane
          const ty=LANES[e.laneI];e.gy+=Math.sign(ty-e.gy)*Math.min(Math.abs(ty-e.gy),LANE_SPD*dt);e.y=e.gy;
          // queue politely behind a zombie already hitting this hero in this lane
          const front=this.enemies.filter(o=>o!==e&&!o.dead&&o.laneI===e.laneI&&o.x<e.x&&Math.abs(o.gy-e.gy)<3).reduce((b,o)=>!b||o.x>b.x?o:b,null);
          if(e.stackOff==null)e.stackOff=this.rng()*5;
          const stacks=e.E.stack!==false;   // every unit can stack now (a future 'block' ability can turn this off)
          const hx=this.heroX(T);const side=e.x>=hx?1:-1;const bodyT=u=>u&&u.key==='robot'?7:0;   /* 0.12.58: the Warhound is a big machine: zombies can reach him from further out */   // 0.11: which side of its hero it stands on (it can end up behind the heroes)
          let stopX=hx+side*(ENEMY_BODY+bodyT(T)+e.E.reach*.6+(stacks?e.stackOff:0)+(e.retreatT>0?42:0));if(!stacks&&front&&side>0&&front.x>=stopX-1)stopX=Math.max(stopX,front.x+11);
          const sameLane=Math.abs(e.gy-T.gy)<2;const ready=faceToward(e,hx,dt);let V=T;let inRange=ready&&sameLane&&Math.abs(e.x-hx)<=Rch+bodyT(T)+.5;
          /* 0.12.58 (Kyle): IF nobody in my lane is in reach BUT a hero one lane up or down is right next to me THEN swing at them instead */
          if(!inRange&&!e.leapA){const adj=al.filter(h=>Math.abs((h.gy||this.G)-e.gy)>=2&&Math.abs((h.gy||this.G)-e.gy)<=9.5&&Math.abs(this.heroX(h)-e.x)<=Rch+bodyT(h)-1).sort((p,q)=>Math.abs(this.heroX(p)-e.x)-Math.abs(this.heroX(q)-e.x))[0];if(adj&&faceToward(e,this.heroX(adj),dt)){V=adj;inRange=true;}}   // must face the hero and touch it
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
            const blow=()=>{if(e.dead||e.stun>0||!V.alive||Math.abs(e.gy-(V.gy||this.G))>(V===T?3:10)||Math.abs(e.x-this.heroX(V))>Rch+bodyT(V)+2)return;/* no swinging at thin air */const d=e.E.dmgDie?Math.max(1,Math.floor((1+Math.floor(this.rng()*e.E.dmgDie))*e.dmgMul)):e.dmg;const took=this.hurtHero(V,d,e);
              const B=e.E.bleed;if(B&&took&&V.alive&&this.rng()<(e.nemHas&&e.nemHas('blood')?1:B.chance))this.bleed(V,B.dmg*e.dmgMul,B.dur);
              if(took&&e.nem)this.nemOnHit(e,V,d);};
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
          const blow=()=>{if(e.dead||e.stun>0)return;const F=this.front();if(wall&&!wall.dead&&(!heroClose||bx>blockX))this.hurtMinion(wall,e.dmg,e);else if(tank&&tank.taunt&&!tank.dead)this.hurtMinion(tank,e.dmg,e);else if(F){const d=e.E.dmgDie?Math.max(1,Math.floor((1+Math.floor(this.rng()*e.E.dmgDie))*e.dmgMul)):e.dmg;const took=this.hurtHero(F,d,e);if(e.E.leech)e.hp=Math.min(e.max,e.hp+d*e.E.leech);
            const B=e.E.bleed;if(B&&took&&F.alive&&this.rng()<B.chance)this.bleed(F,B.dmg*e.dmgMul,B.dur);}};
          if(e.E.hitAt)setTimeoutSafe(this,e.E.hitAt,blow);else blow();}}
        }
      }
    }
    this.enemies=this.enemies.filter(e=>!e.dead||e.boss);
    /* 0.12.87 (Kyle): removed for now: enemies grew fiercer when a stage dragged past 3 minutes */   // stage dragging on: monsters grow fierce
    // ---- Campfire: grows, burns (cozy aura), breaks after 5 hits on Flannel_Man / his companion, then dies out
    if(this.camp){const F=this.camp;F.t+=dt;F.x-=scroll*dt;
      if(F.state==='start'&&F.t>=.9){F.state='burn';}
      if(F.state==='burn'){for(const o of this.alive())if(Math.abs(this.heroX(o)-F.x)<=F.A.radius)giveCozy(o);}
      if(F.state==='dying'){F.dT=(F.dT||0)+dt;if(F.dT>=1.2)F.state='dead';}
      if(F.state==='dead'){F.deadT=(F.deadT||0)+dt;if(F.deadT>5)this.camp=null;}
      if(this.camp&&F.x<-30)this.camp=null;}
    // ---- Thorn Waves: thorns burst one after another along the lane; each hits what's on top of it (damage + bleed)
    if(this.thornWaves&&this.thornWaves.length){for(const W of this.thornWaves){W.t+=dt;W.x0-=scroll*dt;const A=W.A,N=Math.floor(A.dist/A.step);
        while(W.n<N&&W.t>=A.dur*W.n/N){const x=W.x0+W.n*A.step;W.n++;this.fx.push({k:'thorn',x:x+(this.rng()*4-2),gy:W.gy+(this.rng()*2-1),v:Math.floor(this.rng()*4),t:0,life:1,raw:1});
          this.ffArea(W.src,x,W.gy,A.step*.75,A.depth,(this.rollDice(A.dice)+W.flat)*W.mul,W);
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
        if(ticking&&T.t<A.dur)this.ffArea(T.src,T.x,T.gy,A.inR,A.depth,(this.rollDice(A.dice)+(T.src.flatRanged||0))*T.mul);
        if(T.t>=A.dur+.35)T.done=1;}
      this.cyclones=this.cyclones.filter(T=>!T.done);}
    // ---- Arrow_Rain arrows in the air: drop, then hit whatever they land on and stick in the ground
    if(this.rain&&this.rain.length){for(const R of this.rain){R.t+=dt;R.x-=scroll*dt;if(R.t>=R.T&&!R.landed){R.landed=1;
        for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-R.x)<=R.A.hitR+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-R.gy)<=4))this.hitEnemy(e,R.dmg,R.src&&R.src.alive?R.src:null,{});}
        this.ffArea(R.src,R.x,R.gy,R.A.hitR,4,R.dmg);this.fx.push({k:'stuck',x:R.x,gy:R.gy,t:0,life:2,raw:1});}}
      this.rain=this.rain.filter(R=>!R.landed);}
    // ---- traps (Trip Bomb): arm, wait for a ground enemy to walk into the wire, then blow
    /* 0.12.58 Log_Roll: the log rolls down its lane, hitting each zombie once (knockback + trip); in Hardcore it bowls allies over too */
    if(this.logs&&this.logs.length){for(const L of this.logs){L.t+=dt;L.x+=(L.A.spd-scroll)*dt;
        for(const e of this.enemies){if(e.dead||e.fly||L.hit.has(e))continue;if(Math.abs(e.x-L.x)<=6+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-L.gy)<=L.A.depth)){L.hit.add(e);const d=this.hitEnemy(e,(this.rollDice(L.A.dice)+L.flat)*L.mul,L.h,{kb:.8});
          if(d&&!e.dead){e.stun=Math.max(e.stun||0,L.A.trip*(e.boss?.3:1));const res=e.boss?.9:((e.E&&e.E.kbRes)||0);e.kbv=Math.max(e.kbv||0,L.A.kb/100*40*8*(1-res));e.kbDir=1;}}}
        if(this.hardcore)for(const o of this.alive()){if(o===L.h||L.hit.has(o)||o.pet)continue;if(Math.abs(this.heroX(o)-L.x)<=5&&Math.abs((o.gy||this.G)-L.gy)<=L.A.depth){L.hit.add(o);this.hurtHero(o,this.rollDice(L.A.dice)*.5,null);this.st8(L.h).ff=(this.st8(L.h).ff||0)+1;}}
        L.done=L.x-L.x0>=L.A.dist+L.t*scroll||L.x>this.W+20;}
      this.logs=this.logs.filter(L=>!L.done);}
    if(this.traps&&this.traps.length){for(const T of this.traps){T.t+=dt;T.x-=scroll*dt;const A=T.A;
        if(T.fly){const F=T.fly;F.t+=dt;F.x0-=scroll*dt;F.x1-=scroll*dt;const k=Math.min(1,F.t/F.T);T.x=F.x0+(F.x1-F.x0)*k;T.air=Math.sin(Math.PI*k)*F.h;T.spin=(T.spin||0)+dt*14;
          if(k>=1){T.fly=null;T.air=0;if(T.impact){this.tripBoom(T);continue;}T.t=0;this.fx.push({k:'ring',x:T.x,y:T.gy-1,t:0,r:5,c:'#b0a080'});}continue;}   /* overhand: blows on impact; underhand: lands and rolls */
        const near=()=>bombTrig(this,T.x,T.gy,A.trig);
        if(T.rollLeft>0){const Lb=A.lob,v=Lb.rollSpd*Math.max(.3,T.rollLeft/T.roll0);const s=Math.min(T.rollLeft,v*dt);T.x+=s;T.rollLeft-=s;T.spin=(T.spin||0)+s*.6;
          if(T.rollLeft<=.05){T.rollLeft=0;T.settleT=0;}}
        if(T.how==='toss'&&!T.live){if(near()){T.early=1;if(T.owner&&T.owner.tbT>0)T.owner.tbT=Math.max(0,T.owner.tbT-A.lob.refund);this.tripBoom(T);continue;}   /* tripped before it truly activated: 2d4+2, 2s back on the cooldown */
          if(!(T.rollLeft>0)){T.settleT=(T.settleT||0)+dt;if(T.settleT>=A.lob.settle){T.live=1;T.dice=A.lob.live[0];T.flat=A.lob.live[1];this.fx.push({k:'ring',x:T.x,y:T.gy-3,t:0,r:6,c:'#ff4030'});}}continue;}   /* truly activated: 2d4+6 */if(T.x<-6&&!T.done){T.done=1;if(T.owner&&T.owner.tbT>0)T.owner.tbT*=.5;continue;}   /* 0.12.59 (Kyle): left behind off screen: cooldown halved */
        if(T.t>A.life){T.done=1;continue;}
        if(near())this.tripBoom(T);}
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
          p.hit.add(e);const big=BIGP[p.kind]||0;p.opt.onHit?p.opt.onHit(e,p.dmg,0):this.hitEnemy(e,p.dmg,p.src,{kb:big,critAdd:p.critAdd,critMul:p.critMul,head:!!p.headNow&&!e.fly&&!e.boss,sure:p.sure,nocrit:p.nocrit});p.headNow=false;
          if(p.aimedBy&&e.dead&&p.aimedBy.abT>0){p.aimedBy.abT*=.5;p.aimedBy=null;}   /* 0.12.63 (Kyle): an Aimed Shot kill halves what's left of its cooldown */
          if(p.blowBy&&isUndead(e)&&p.blowBy.bgT>0){p.blowBy.bgT*=.5;p.blowBy=null;}   /* Blow_Gun into a poison-immune target: remaining cooldown halved */
          if(p.poison&&!e.dead){let n=1;for(const ch of p.poison)if(this.rng()<ch)n++;this.addPoison(e,n);}
          if(p.kind==='kunai'&&!e.dead&&!isUndead(e)&&this.rng()<.5)this.addPoison(e,1);   /* 0.12.63 (Kyle): kunai have a 50% chance to add/refresh a poison stack */
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
        p.x=p.sx+(tx-p.sx)*u;p.y=p.sy+(ty-p.sy)*u-46*4*u*(1-u);p.rot=(p.rot||0)+dt*14;if(u>=1){p.x=tx;p.y=ty;}}
      else{const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy)||1;p.x+=dx/d*p.spd*dt;p.y+=dy/d*p.spd*dt;}
      if(Math.abs(p.x-tx)<8&&Math.abs(p.y-ty)<(tg.boss?40:16)){
        p.hit.add(tg);const big=BIGP[p.kind]||0;const dmg=p.opt.onHit?p.opt.onHit(tg,p.dmg,0):this.hitEnemy(tg,p.dmg,p.src,{kb:big});
        if(p.splash)for(const o of this.enemies)if(o!==tg&&!o.dead&&Math.abs(o.x-tg.x)<p.splash)this.hitEnemy(o,p.dmg*.5,p.src,{nocrit:1});
        if(p.chill&&!tg.dead){tg.slow=Math.max(tg.slow,.25);tg.slowT=1.5;}
        this.fx.push({k:'spark',x:p.x,y:p.y,t:0,c:PCOL[p.kind]||'#fff'});
        if(p.opt.chain&&!p.chained){const n=this.enemies.filter(e=>!e.dead&&!p.hit.has(e)).sort((a,b)=>Math.abs(a.x-tg.x)-Math.abs(b.x-tg.x))[0];if(n){p.chained=1;p.tx=n;continue;}}
        if(p.pierce>0){p.pierce--;p.tx=null;}else p.dead=true;}
      if(p.t>4)p.dead=true;}
    for(const p of this.proj)if(p.dead&&p.aimed&&p.foes==='enemies'&&p.src&&p.src.key&&!(p.hit&&p.hit.size)&&!p._fc){p._fc=1;this.failAct(p.src);}
    this.proj=this.proj.filter(p=>!p.dead);
    // fx + text
    // 0.12.14 (Kyle): nothing lying on the ground slides along with the party: bodies, stuck arrows, thorns, scorch marks scroll with the ground
    this.stepRevive(dt);this.stepGlNades(dt,scroll);this.stepClones(dt,scroll);this.stepWatchdog(dt);this.stepSandbags(dt,scroll);this.stepClimb(dt,scroll);this.stepHerbs(dt,scroll);this.stepDisarm(dt);
    for(const h of this.alive()){this.obClamp(h,true);this.mineClamp(h);}for(const e of this.enemies)if(!e.dead)this.obClamp(e,false);
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
    if(h.laughT>0)h.laughT-=dt;
    if(h.cozyT>0){h.cozyT-=dt;h._cozyAcc=(h._cozyAcc||0)+dt;while(h._cozyAcc>=.5){h._cozyAcc-=.5;this.healHero(h,.25,true,h);h.en=Math.min(h.enMax||100,(h.en||0)+.25);}}
    h.mT=(h.mT||0)+dt*h.meleeSpd*spdB*(h.cozyT>0?1+COZY.melee:1)*(h.key==='jp'?(h.highT>0?1.2:(h.soberT||0)>10?.9:1):1)*(h.lethalT>0?1.75:1)*(h.hunger>0?1-HUNGER.spd[h.hunger]:1);h.rT=(h.rT||0)+dt*h.rangedSpd*spdB*(h.hunger>0?1-HUNGER.spd[h.hunger]:1)*(h.ammoBuffT>0?1.15:1);if(h.animM>0)h.animM-=dt;if(h.animR>0)h.animR-=dt;
    if(h.ammo==null)h.ammo=C.ranged?(C.ranged.clip||Infinity):0;   // clip 0 = never reloads
    if(C.ranged&&h.ammo<=0&&C.ranged.clip>0){if(!h.reloadT&&C.ranged.reload>=1.5&&!C.ranged.quietReload)Comms.onReload(this,h);h.reloadT=(h.reloadT||0)+dt*h.rangedSpd*spdB*(h.key==='soldier'&&h.hp<h.max*.5?1.25:1);if(h.reloadT>=C.ranged.reload){h.reloadT=0;h.ammo=C.ranged.clip;}}
    const reachPx=ENEMY_BODY+C.melee.reach*UNIT_SCALE;   // same body gap the zombies measure from, so a 20 reach out-reaches a 12 reach zombie
    /* 0.12.67 Stealth AI (works for any stealth source): IF I'm hidden AND (I'm hurt under 45% OR a friend is down) THEN hold my fire and stay hidden
       (let heals land, get revived, or slip over and revive them: reviving doesn't break it); IF I'm hidden and healthy THEN take the free opening shot (which reveals me) */
    if(h.stealthT>0&&!h.pet&&(h.hp/h.max<.45||this.heroes.some(o=>!o.alive&&o.downed))){if(h.lz)h.lz=null;return;}
    if(h.gat){this.robotGat(h,dt,C);return;}
    // ---- 0.12.67 Warhound (Kyle's rework): everything IF/THEN on what's on the field; runs before the attack so it works up close too
    if(h.key==='robot'){const RB=id=>(C.abilities||[]).find(a=>a.id===id);const SU=RB('surge'),MS=RB('missiles'),SM=RB('smoke'),NB=RB('nano'),LZ=C.ranged&&C.ranged.lazer;
      for(const [A,k] of [[SU,'suT'],[MS,'msT'],[SM,'smT'],[NB,'nbT']])if(A){if(h[k]==null)h[k]=A.cd*.25;if(h[k]>0)h[k]-=dt;}
      if(h.surgeT>0)h.surgeT-=dt;if(h.launchT>0)h.launchT-=dt;if(h.throwT>0)h.throwT-=dt;if(h.lzReload>0)h.lzReload-=dt*h.rangedSpd*spdB;
      if(h.jet){this.robotJet(h,dt);return;}   // Tactical_Retreat flight
      const live=this.enemies.filter(e=>!e.dead&&e.x<this.W+4),en=h.en||0,hx=this.heroX(h);const onMe=live.filter(e=>!e.fly&&Math.abs(e.x-hx)<16).length;
      // Nano-Tech_Repair_Bots in progress: stopped, 5%/s; IF I get swarmed (2+ on me) and I'm not desperate THEN cut it short
      if(h.nano){const N=h.nano;N.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;this._mech=1;this.healHero(h,h.max*NB.per*dt,true,h);this._mech=0;
        if(N.t>=NB.dur||(N.t>1&&onMe>=2&&h.hp/h.max>.3)){const cut=N.t<NB.dur;h.nano=null;Comms.bubble(this,h,cut?Comms.pick(['REPAIR: ABORTED.','THREAT DETECTED. RESUMING.']):Comms.pick(['REPAIRS: COMPLETE.','HULL: RESTORED.','SYSTEMS: NOMINAL.']));}return;}
      if(NB&&h.nbT<=0&&en>=NB.en&&h.hp/h.max<NB.under&&(h.hp/h.max<.3||onMe===0)&&spendEnergy(h,NB.en)){h.nbT=NB.cd*(1-(h.cdr||0));h.nano={t:0};h.lz=null;this.ev('zap',{});Comms.bubble(this,h,Comms.pick(['DEPLOYING REPAIR SWARM.','DAMAGE DETECTED. REPAIRING.','NANITES: ENGAGE.']));return;}
      // Arc_Surge: IF the lazer is burning (or 3+ enemies are in lazer range) THEN overcharge it
      if(SU&&h.suT<=0&&!(h.surgeT>0)&&en>=SU.en&&LZ&&(h.lz&&h.lz.t>=LZ.charge*.5||live.filter(e=>Math.abs(e.x-hx)<=LZ.max).length>=3)&&spendEnergy(h,SU.en)){
        h.suT=SU.cd*(1-(h.cdr||0));h.surgeT=SU.dur;addMood(h,{range:SU.slide},SU.dur,'surge');this.ev('zap',{});this.fx.push({k:'ring',x:h.x,y:(h.gy||this.G)-24,r:18,t:0,c:'#49c8ff'});
        Comms.bubble(this,h,Comms.pick(['ARC SURGE: ONLINE.','OVERCHARGING LAZER.','POWER TO WEAPONS.']));}
      // IF a hurt ally has enemies on them (or I'm swarmed) THEN smoke the spot
      if(SM&&h.smT<=0&&en>=SM.en&&!(h.throwT>0)&&!h.lz){const al=this.alive();let spot=null,who=null;
        for(const o of al){if(o.hp/o.max>=SM.under||o===h)continue;const on=live.filter(e=>Math.abs(e.x-this.heroX(o))<40);if(on.length){spot=(on.reduce((s,e)=>s+e.x,0)/on.length+this.heroX(o))/2;who=o;break;}}
        if(spot==null&&onMe>=3)spot=hx+10;
        if(spot!=null&&Math.abs(spot-hx)<140&&spendEnergy(h,SM.en)){h.smT=SM.cd*(1-(h.cdr||0));h.throwT=.45;faceToward(h,spot,1);const gy=(who&&who.gy)||h.gy||this.G;
          setTimeoutSafe(this,.25,()=>{if(!h.alive)return;this.ev('whoosh',{});(this.nades=this.nades||[]).push({x0:h.x,x:h.x,x1:spot,gy0:h.gy||this.G,gy,t:0,T:SM.throw,A:SM,src:h});});
          Comms.say(this,h,'smoke',{x:spot,ally:who});return;}}
      // IF 3+ enemies are bunched 40-260px out (or a boss is up) THEN missile barrage on the thickest spot
      if(MS&&h.msT<=0&&en>=MS.en&&!(h.launchT>0)&&!h.lz){let best=null,bn=0;for(const e of live){const d=e.x-hx;if(d<MS.min||d>MS.range)continue;const n=live.filter(o=>Math.abs(o.x-e.x)<MS.spread*1.6).length+(e.boss?3:0);if(n>bn){bn=n;best=e;}}
        if(best&&bn>=3&&spendEnergy(h,MS.en)){h.msT=MS.cd*(1-(h.cdr||0));h.launchT=.2+MS.n*MS.gap+.2;
          for(let i=0;i<MS.n;i++)setTimeoutSafe(this,.2+i*MS.gap,()=>{if(!h.alive)return;const T=best.dead?(live.find(e=>!e.dead)||best):best;this.fireMissile(h,T,MS);});
          Comms.say(this,h,'missiles',{});return;}}
      // Targeted Lazer in progress (he plants and holds the beam); IF something gets right on top of me THEN drop the beam and use the flamethrower
      if(h.lz){if(onMe>=1&&h.lz.t>LZ.charge){h.lz=null;h.lzReload=LZ.reload;}else{this.robotLazer(h,dt,LZ);return;}}}
    // ---- 0.12.75 Engineer: Build / Repair / Modify / Satchel_Charge (IF/THEN on the field). Building and repairing pause his other cooldowns.
    // ---- 0.12.178 Chibi_Archer: Piercing_Shot and Tumble (both lock her into an animation)
    if(h.key==='carcher'){const AB=id=>(C.abilities||[]).find(a=>a.id===id);const PS=AB('pierce'),TB=AB('tumble');for(const k of ['psT','tbT'])if(h[k]>0)h[k]-=dt;if(h.psT==null){h.psT=PS.cd*.3;h.tbT=0;}
      const hx=this.heroX(h),gy=h.gy||this.G;
      if(h.tumble){const T=h.tumble;T.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;const u=Math.min(1,T.t/T.T);h.x=T.x0+(T.x1-T.x0)*(1-(1-u)*(1-u));h.leapH=Math.sin(Math.PI*u)*14;
        if(!T.shot&&u>.45){T.shot=1;const tg=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-hx)<C.ranged.range).sort((a,b)=>Math.abs(a.x-hx)-Math.abs(b.x-hx))[0];if(tg){faceToward(h,tg.x,1);const p=this.shoot(h,tg,'arrow',(this.rollDice(C.ranged.dice)+C.ranged.flat)*(h.atk/h.base.atk)*h.rangedDmg,{});this.aim(p,h,tg);this.ev('bow',{});}}
        if(u>=1){h.tumble=null;h.leapH=0;}return;}
      if(h.pshot){const P=h.pshot;P.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;if(!P.shot&&P.t>=P.T*.55){P.shot=1;if(!P.tg.dead){const p=this.shoot(h,P.tg,'arrow',this.rollDice(PS.dice)*(h.atk/h.base.atk)*h.rangedDmg,{pierce:PS.n});p.big=1;this.aim(p,h,P.tg);p.arc=0;p.h=p.h0=p.aimH=24;p.tgy=p.gy0=p.gy=P.tg.gy!=null?P.tg.gy:this.G;p.sure=1;this.ev('bow',{});   /* flat and true down the lane so it can go through the whole line */this.text(hx,gy-30,'PIERCE','#ffd0d0');}}if(P.t>=P.T)h.pshot=null;return;}
      const live=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x>2&&e.x<this.W+2);
      if(TB&&h.tbT<=0&&(h.en||0)>=TB.en){const on=live.filter(e=>Math.abs(e.x-hx)<16&&Math.abs((e.gy!=null?e.gy:this.G)-gy)<9);if(on.length&&spendEnergy(h,TB.en)){h.tbT=TB.cd*(1-(h.cdr||0));const away=on[0].x>=hx?-1:1;const x1=Math.max(8,Math.min(this.W-8,hx+away*TB.dist));h.tumble={t:0,T:TB.T,x0:h.x,x1:h.x+(x1-hx)};h.face=-away;Comms.bubble(this,h,Comms.pick(['Nope!','Too close!','Hup!']),true);return;}}
      if(PS&&h.psT<=0&&(h.en||0)>=PS.en){let best=null,bn=0;for(const e of live){const d=e.x-hx;if(Math.abs(d)>C.ranged.range||Math.abs(d)<14)continue;const eg=e.gy!=null?e.gy:this.G;const n=live.filter(o=>Math.abs((o.gy!=null?o.gy:this.G)-eg)<5&&Math.sign(o.x-hx)===Math.sign(d)&&Math.abs(o.x-hx)>=Math.abs(d)).length;if(n>bn){bn=n;best=e;}}
        if(best&&bn>=PS.lineN&&spendEnergy(h,PS.en)){h.psT=PS.cd*(1-(h.cdr||0));h.pshot={t:0,T:1.0,tg:best,shot:0};faceToward(h,best.x,1);return;}}}
    // ---- 0.12.178 Chibi_Sorcerer: Chain_Lightning and Thunderclap
    if(h.key==='csorc'){const AB=id=>(C.abilities||[]).find(a=>a.id===id);const CH=AB('chain'),TC=AB('thunder');for(const k of ['chT','tcT'])if(h[k]>0)h[k]-=dt;if(h.chT==null){h.chT=CH.cd*.3;h.tcT=TC.cd*.4;}
      const hx=this.heroX(h),gy=h.gy||this.G;
      if(h.cast){const K=h.cast;K.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;if(!K.done&&K.t>=K.at){K.done=1;K.fn();}if(K.t>=K.T)h.cast=null;return;}
      const live=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x>2&&e.x<this.W+2);const al=this.alive().filter(o=>o!==h);
      if(TC&&h.tcT<=0&&(h.en||0)>=TC.en){const inR=(a,b,R)=>{const dx=a.x-b.x,dz=((a.gy!=null?a.gy:this.G)-(b.gy!=null?b.gy:this.G))/.45;return dx*dx+dz*dz<=R*R;};let best=null,bs=0;
        for(const e of live){const d=Math.abs(e.x-hx);if(d<TC.min||d>TC.max)continue;const sp={x:e.x,gy:e.gy!=null?e.gy:this.G};const got=live.filter(o=>inR(o,sp,TC.r*.85));const sc=got.length+(got.some(o=>o.boss||o.nem||o.max>=60)?1:0);if(sc>bs){bs=sc;best=sp;}}
        if(best&&bs>=3&&spendEnergy(h,TC.en)){h.tcT=TC.cd*(1-(h.cdr||0));faceToward(h,best.x,1);const sp=best;Comms.bubble(this,h,Comms.pick(['Get down!','Here it comes.','Thunder!']),true);
          h.cast={t:0,T:1.0,at:TC.T,anim:'cast',fn:()=>{this.fx.push({k:'strike',x:sp.x,gy:sp.gy,t:0,life:.5,raw:1});this.fx.push({k:'ring',x:sp.x,y:sp.gy-2,t:0,r:TC.r,c:'#fff08a'});this.ev('zap',{});this.ev('boom',{});this.shake=Math.max(this.shake||0,.35);
            const dmg=this.rollDice(TC.dice)*(h.atk/h.base.atk);for(const e of this.enemies){if(e.dead||e.fly)continue;if(!inR(e,sp,TC.r))continue;this.hitEnemy(e,dmg,h,{blast:1,bx:sp.x,sure:1});if(!e.dead){e.stun=Math.max(e.stun||0,e.boss?TC.stun*.4:TC.stun);if(!e.boss)this.text(e.x,(e.gy!=null?e.gy:this.G)-26,'STUN','#ffe07a');}}}};return;}}
      if(CH&&h.chT<=0&&(h.en||0)>=CH.en){const near=live.filter(e=>Math.abs(e.x-hx)<CH.r).sort((a,b)=>Math.abs(a.x-hx)-Math.abs(b.x-hx));
        if(near.length>=2&&spendEnergy(h,CH.en)){h.chT=CH.cd*(1-(h.cdr||0));faceToward(h,near[0].x,1);
          h.cast={t:0,T:.75,at:.4,anim:'nova',fn:()=>{const hit=[];let cur=near[0];let m=1;const pts=[[this.heroX(h)+(h.face||1)*8,gy-14]];const base=this.rollDice(CH.dice)*(h.atk/h.base.atk);
            for(let i=0;i<CH.n&&cur;i++){hit.push(cur);const cg=cur.gy!=null?cur.gy:this.G;pts.push([cur.x,cg-12]);this.hitEnemy(cur,base*m,h,{sure:1});if(!cur.dead)cur.stun=Math.max(cur.stun||0,CH.stun);m*=1-CH.fall;
              const nx=this.enemies.filter(o=>!o.dead&&!o.fly&&!hit.includes(o)&&Math.abs(o.x-cur.x)<CH.jump&&Math.abs((o.gy!=null?o.gy:this.G)-cg)<14).sort((a,b)=>Math.abs(a.x-cur.x)-Math.abs(b.x-cur.x))[0];cur=nx;}
            this.fx.push({k:'bolt',pts,t:0,life:.3,raw:1,c:'y'});this.ev('zap',{});}};return;}}}
    // ---- 0.12.175 Soldier: Frag_Grenade. IF 3+ zombies are bunched 40-130 out (or 2 with a big one) AND no ally would be caught THEN pull the pin and lob it.
    if(h.key==='soldier'){const FG=(C.abilities||[]).find(a=>a.id==='frag');if(FG){if(h.fgT==null)h.fgT=FG.cd*.25;if(h.fgT>0)h.fgT-=dt;if(h.throwT>0){h.throwT-=dt;return;}
      if(h.fgT<=0&&(h.en||0)>=FG.en&&!(h.animM>0)){const hx=this.heroX(h),live=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x<this.W+4&&e.x>4);const al=this.alive().filter(o=>o!==h);
        const inR=(a,b,R)=>{const dx=a.x-b.x,dz=((a.gy!=null?a.gy:this.G)-(b.gy!=null?b.gy:this.G))/.45;return dx*dx+dz*dz<=R*R;};let best=null,bs=0;
        for(const e of live){const d=Math.abs(e.x-hx);if(d<FG.min||d>FG.max)continue;const sp={x:e.x,gy:e.gy!=null?e.gy:this.G};
          if(al.some(o=>inR({x:this.heroX(o),gy:o.gy||this.G},sp,FG.r*1.1)))continue;
          const got=live.filter(o=>inR(o,sp,FG.r*.85));const big=got.some(o=>o.boss||o.nem||o.max>=60);const sc=got.length+(big?1:0);if(sc>bs){bs=sc;best=sp;}}
        if(best&&bs>=3&&spendEnergy(h,FG.en)){h.fgT=FG.cd*(1-(h.cdr||0));h.throwT=h.throwT0=.75;faceToward(h,best.x,1);h.pauseT=Math.max(h.pauseT||0,.75);h.moving=false;
          Comms.bubble(this,h,Comms.pick(['Frag out!','Grenade!','Fire in the hole!','Frag, get down!']),true);const sp=best;
          setTimeoutSafe(this,.42,()=>{if(!h.alive)return;const x0=this.heroX(h)+(h.face||1)*4;(this.bomblets=this.bomblets||[]).push({x0,gy0:h.gy||this.G,x1:sp.x,gy1:sp.gy,t:0,H:16+Math.abs(sp.x-x0)*.12,T:FG.fly,fuse:-1,fz:FG.fuse,spin:0,R:FG.r,dmg:this.rollDice(FG.dice)*(h.atk/h.base.atk),stun:FG.stun,owner:h,frag:1});this.ev('whoosh',{});});return;}}}}
    if(h.key==='eng'){const EB=id=>(C.abilities||[]).find(a=>a.id===id);const BU=EB('build'),RP=EB('repair'),MO=EB('modify'),SC=EB('satchel');
      const working=!!(h.building||h.repairing);
      if(!working){for(const k of ['twT','brT2','tsT','moT','scT'])if(h[k]>0)h[k]-=dt;}
      if(h.twT==null){h.twT=2;h.brT2=4;h.tsT=6;h.moT=3;h.scT=SC.cd*.3;}
      const hx=this.heroX(h),gy=h.gy||this.G,live=this.enemies.filter(e=>!e.dead&&e.x<this.W+4);const near=r=>live.filter(e=>!e.fly&&Math.abs(e.x-hx)<r).length;
      const B=this.blds=this.blds||[];const tower=B.find(b=>b.k==='tower'&&b.hp>0&&b.owner===h);
      // satchel: IF one of mine is out AND 3+ zombies (or a big one) are on it THEN set it off
      for(const S of this.satchels||[]){if(S.owner!==h||S.boom||S.t<S.T)continue;const on=live.filter(e=>!e.fly&&Math.abs(e.x-S.x)<S.A.r*.6&&Math.abs((e.gy!=null?e.gy:this.G)-S.gy)<12);
        if(on.length>=3||on.some(e=>e.boss||e.elite||e.max>=60)||(S.t>6&&on.length>=2)||(S.t>12&&on.length>=1)){this.satchelBoom(S);Comms.bubble(this,h,Comms.pick(['Fire in the hole!','Clacker time.','Boom.','Cover your ears!']),true);}}
      // in-progress work
      if(h.building&&h.walkTo!=null){{const sc=this.scroll||0;h.walkTo-=sc*dt;h.building.x-=sc*dt;}   /* 0.12.166: the build spot is on the ground, so it slides with the world */const d=h.walkTo-hx;h.building.wt=(h.building.wt||0)+dt;if(h.building.wt>4){h.building.x=hx;h.walkTo=null;}else if(Math.abs(d)>6&&onMeE(this,h)<2){h.x+=Math.sign(d)*Math.min(Math.abs(d),(MOVE.eng||15)*dt*1.4);h.face=d>0?1:-1;h.moving=true;h.walkT=(h.walkT||0)+dt;return;}h.walkTo=null;}
      if(h.building){const W=h.building;W.t+=dt;{const sc=this.scroll||0;if(W.ax==null)W.ax=h.x;W.ax-=sc*dt;W.x-=sc*dt;h.x=W.ax;h.dodgeX=0;h.wanderX=0;h.kbv=0;h.dodge=null;}   /* 0.12.167 (Kyle): locked to his spot: no walking, shoves, dodges or drift until it's done */   /* 0.12.166 (Kyle): kneeling on the ground, he slides back with the world instead of gliding along it */h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;if(Math.random()<dt*6)this.fx.push({k:'spark',x:W.x+(Math.random()-.5)*10,gy:W.gy,t:0,life:.35,raw:1});
        if(W.t>=W.T){h.building=null;this.finishBuild(h,W);}return;}
      if(h.repairing){const R=h.repairing,T=R.tgt;R.t+=dt;if(T&&T.bld)h.x-=(this.scroll||0)*dt;   /* 0.12.166: stays with the building he's fixing */h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;
        const done=!T||(T.bld?(T.hp<=0||T.hp>=T.max):(!T.alive||T.hp>=T.max))||Math.abs((T.bld?T.x:this.heroX(T))-hx)>30||onMeE(this,h)>=2||R.t>6;
        if(done){h.repairing=null;}else{if(T.bld){const b0=T.hp;T.hp=Math.min(T.max,T.hp+RP.bld*dt);this.supXp(h,(T.hp-b0)*.036);}else{this._mech=1;this.healHero(T,T.max*RP.mech*dt,true,h);this._mech=0;}if(Math.random()<dt*8)this.fx.push({k:'spark',x:(T.bld?T.x:this.heroX(T))+(Math.random()-.5)*8,gy:T.gy||this.G,t:0,life:.3,raw:1});return;}}
      const safe=near(40)===0&&!this.heroes.some(o=>!o.alive&&o.downed),en=h.en||0;   // a friend down comes first: no building until they're up
      // IF there's a fight AND no tower of mine AND it's quiet right here THEN put a watchtower up a little behind me
      if(BU&&!tower&&h.twT<=0&&en>=BU.en&&(safe||near(25)<=1)&&live.length>=1&&spendEnergy(h,BU.en))   /* 0.12.95: builds more eagerly (one zombie close by is OK, any fight counts) */{h.twT=BU.tower.cd*(1-(h.cdr||0));h.building={k:'tower',tier:1,t:0,T:BU.tower.T[0],x:Math.max(20,Math.min(this.W-40,hx+45)),gy};   /* 0.12.76: well up the road so the team doesn't walk past it right away */h.walkTo=h.building.x;Comms.bubble(this,h,Comms.pick(['Putting up a tower.','Give me three seconds.','Cover me, building!']));return;}
      // IF my tower can go higher AND it's quiet AND Modify is ready THEN add a tier
      if(MO&&tower&&tower.tier<3&&h.moT<=0&&en>=MO.en&&(safe||near(25)<=1)&&Math.abs(tower.x-hx)<60&&spendEnergy(h,MO.en)){h.moT=MO.cd*(1-(h.cdr||0))*(1-(MO.towerBack||0));h.building={k:'tier',tgt:tower,t:0,T:BU.tower.T[tower.tier],x:tower.x,gy:tower.gy};return;}
      // IF a pack of 3+ is coming down one lane 30-120 out THEN drop a concrete barrier in front of them
      if(BU&&h.brT2<=0&&en>=BU.en){let bl=null,bn=0;for(const l of LANES){const n=live.filter(e=>!e.fly&&!e.boss&&Math.abs((e.gy!=null?e.gy:this.G)-l)<=BU.barrier.depth&&e.x-hx>30&&e.x-hx<120).length;if(n>bn){bn=n;bl=l;}}
        if(bl!=null&&bn>=3&&!B.some(b=>b.k==='barrier'&&b.hp>0&&Math.abs(b.gy-bl)<6&&b.x>hx)&&spendEnergy(h,BU.en)){h.brT2=BU.barrier.cd*(1-(h.cdr||0));h.building={k:'barrier',t:0,T:BU.barrier.T,x:Math.min(this.W-20,hx+24),gy:bl};Comms.bubble(this,h,Comms.pick(['HESCO going up!','Wall them off!','Filling a HESCO!']));return;}}
      // IF 2+ zombies are within ~300 screen px THEN plant a tesla coil a little ahead
      if(BU&&h.tsT<=0&&en>=BU.en&&near(100)>=2&&near(20)===0&&spendEnergy(h,BU.en)){h.tsT=BU.tesla.cd*(1-(h.cdr||0));h.building={k:'tesla',t:0,T:BU.tesla.T,x:Math.min(this.W-20,hx+16),gy};return;}
      // IF a wreck is right here with no turret AND it's quiet THEN bolt a turret onto it
      if(MO&&h.moT<=0&&en>=MO.en&&safe){const car=(this.obst||[]).find(o=>/^car_/.test(o.k)&&!o.turret&&Math.abs(o.x-hx)<35&&o.x>20&&o.x<this.W-20);if(car&&spendEnergy(h,MO.en)){h.moT=MO.cd*(1-(h.cdr||0));h.building={k:'turret',car,t:0,T:MO.turret.T,x:car.x,gy:LANES[Math.max(...car.lanes)]};Comms.bubble(this,h,Comms.pick(['Let me mount something on this.','This wreck needs a gun.']));return;}}
      // Repair: IF a building of mine (or the Warhound) is hurt AND I'm beside it AND it's quiet THEN fix it
      if(RP&&safe){const T=B.filter(b=>b.hp>0&&b.hp<b.max*.75&&Math.abs(b.x-hx)<28).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0]||this.alive().find(o=>o.key==='robot'&&o.hp<o.max*.6&&Math.abs(this.heroX(o)-hx)<24);if(T){h.repairing={tgt:T,t:0};return;}}
      // satchel: IF 3+ zombies are bunched 30-100 out THEN toss one onto them (he sets it off later)
      if(SC&&h.scT<=0&&en>=SC.en&&!(this.satchels||[]).some(S=>S.owner===h&&!S.boom)){let best=null,bn=0;for(const e of live){const d=e.x-hx;if(e.fly||d<SC.min||d>SC.max)continue;const n=live.filter(o=>Math.abs(o.x-e.x)<20).length;if(n>bn){bn=n;best=e;}}
        if(!(best&&bn>=3)){const big=live.filter(e=>!e.fly&&e.x-hx>=SC.min&&e.x-hx<=SC.max+40&&(e.boss||e.elite||e.max>=60)).sort((p,q)=>q.max-p.max)[0];if(big){best=big;bn=3;}else if(best&&bn>=2&&live.length>=4){bn=3;}}   /* 0.12.79: bosses/big ones, or a pair when the field is busy */
        if(best&&bn>=3&&spendEnergy(h,SC.en)){h.scT=SC.cd*(1-(h.cdr||0));h.animM=.45;h.face=1;(this.satchels=this.satchels||[]).push({x0:hx+3,x:hx,x1:best.x-6,gy0:gy,gy:best.gy!=null?best.gy:gy,gy1:best.gy!=null?best.gy:gy,t:0,T:SC.fly,A:SC,owner:h});this.ev('whoosh',{});return;}}}
    // ---- 0.12.70 Void_Cultist (Kyle's rework): life costs, all IF/THEN on the field; runs before the attack so Lethal_Strikes works up close
    if(h.key==='cultist'){const CB=id=>(C.abilities||[]).find(a=>a.id===id);const SY=CB('syphon'),LS=CB('lethal'),TN=CB('tentacle'),CT=CB('cthulhu');
      for(const [A,k] of [[SY,'syT'],[LS,'leT'],[TN,'tnT'],[CT,'ctT']])if(A){if(h[k]==null)h[k]=A.cd*.25;if(h[k]>0)h[k]-=dt*(k==='tnT'&&h.cthT>0?2:1);}
      if(h.lethalT>0)h.lethalT-=dt;if(h.cthT>0)h.cthT-=dt;
      if(h.summonT>0){h.summonT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);return;}
      const live=this.enemies.filter(e=>!e.dead&&e.x<this.W+4),hx=this.heroX(h),hp=h.hp/h.max,afford=A=>A&&hp-A.hpCost>=.35;
      // Syphon_Life in progress: stand and drain
      if(h.syph){const S=h.syph,T=S.tg;S.t+=dt;S.acc+=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;if(T)h.face=T.x>=h.x?1:-1;
        if(!T||T.dead||Math.abs(T.x-hx)>SY.range*1.15||S.t>=SY.dur){h.syph=null;}
        else{while(S.acc>=.25){S.acc-=.25;const d=this.hitEnemy(T,SY.dps*.25*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1),h,{sure:1,nocrit:1,quiet:1});if(d)this.healHero(h,d*SY.heal,true,h);}return;}}
      // IF Call_of_Cthulhu is ready AND (2+ tentacles are up OR 4+ zombies are coming) AND I can afford it THEN call
      const tents=(this.tentacles||[]).filter(T=>T.src===h&&T.anim!=='death');
      if(CT&&h.ctT<=0&&afford(CT)&&(tents.length>=2||live.filter(e=>e.x-hx<160).length>=4)&&this.payLife(h,CT.hpCost)){h.ctT=CT.cd*(1-(h.cdr||0));h.cthT=CT.dur;h.summonT=CT.cast;h.summonT0=CT.cast;
        Comms.bubble(this,h,Comms.pick(['Ph\'nglui mglw\'nafh!','HE WAKES!','Cthulhu fhtagn!','The deep calls you home!']),true);this.ev('wind',{});this.shake=Math.max(this.shake||0,.35);
        setTimeoutSafe(this,CT.cast*.7,()=>{if(!h.alive)return;const d=h.face||1,cx=this.heroX(h)+d*CT.move,ts=(this.tentacles||[]).filter(T=>T.src===h&&T.anim!=='death');
          ts.forEach((T,i)=>{this.fx.push({k:'burrow',x:T.x,gy:T.gy,t:0,life:.5,raw:1});T.x=Math.max(8,Math.min(this.W-8,cx+(i-(ts.length-1)/2)*16));T.gy=LANES[Math.max(0,Math.min(LANES.length-1,(h.laneI||2)+((i%3)-1)))]||T.gy;T.anim='emerge';T.aT=0;});
          for(const o of [{x:this.heroX(h),gy:h.gy||this.G}].concat(ts.map(T=>({x:T.x,gy:T.gy})))){this.fx.push({k:'dread',x:o.x,gy:o.gy,t:0,life:.8,raw:1,r:CT.r});
            for(const e of this.enemies){if(e.dead||e.boss)continue;if(Math.abs(e.x-o.x)<CT.r&&Math.abs((e.gy||this.G)-o.gy)<16){e.retreatT=Math.max(e.retreatT||0,CT.fear);e.fearT=CT.fear;e.slow=Math.max(e.slow||0,CT.slow);e.slowT=Math.max(e.slowT||0,CT.fear);}}}});
        return;}
      // IF zombies are bunched within 133 world AND I can afford it THEN Spawn_Tentacle in the middle of the biggest pack
      if(TN&&h.tnT<=0&&afford(TN)){const near=live.filter(e=>!e.fly&&Math.abs(e.x-hx)<=TN.range);let best=null,bn=0;for(const e of near){const n=near.filter(o=>Math.abs(o.x-e.x)<30).length+(e.boss?2:0);if(n>bn){bn=n;best=e;}}
        if(best&&(bn>=2||best.boss||best.max>=this.bb.maxE*.8)&&this.payLife(h,TN.hpCost)){h.tnT=TN.cd*(1-(h.cdr||0));h.summonT=TN.cast;h.summonT0=TN.cast;
          const pack=near.filter(o=>Math.abs(o.x-best.x)<30),tx=Math.max(8,Math.min(this.W-8,pack.reduce((a,o)=>a+o.x,0)/pack.length)),gy=best.gy!=null?best.gy:(h.gy||this.G);const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
          setTimeoutSafe(this,TN.cast*.7,()=>{if(!h.alive)return;(this.tentacles=this.tentacles||[]).push({x:tx,gy,t:0,life:TN.life,A:TN,src:h,mul,atkT:.6,anim:'emerge',aT:0,face:1,hp:TN.hp,max:TN.hp,swatT:0});this.ev('thorns',{});this.shake=Math.max(this.shake||0,.25);});
          Comms.say(this,h,'tentacle',{});return;}}
      // IF a zombie is in dagger range AND Lethal_Strikes is ready AND I can afford it THEN frenzy
      if(LS&&h.leT<=0&&afford(LS)&&live.some(e=>!e.fly&&Math.abs(e.x-hx)<26&&Math.abs((e.gy!=null?e.gy:this.G)-(h.gy||this.G))<4)&&this.payLife(h,LS.hpCost)){h.leT=LS.cd*(1-(h.cdr||0));h.lethalT=LS.dur;addMood(h,{range:10},LS.dur,'lethal');
        this.fx.push({k:'ring',x:h.x,y:(h.gy||this.G)-10,r:16,t:0,c:'#6aff4a'});Comms.bubble(this,h,Comms.pick(['Bleed for me!','Steel and venom!','Dance, little corpses!']));}
      // IF an enemy is in syphon range AND (I'm hurt OR nothing is on me) THEN drain it (free)
      if(SY&&h.syT<=0&&!h.syph&&(h.en||0)>=(SY.en||0)){const T=live.filter(e=>Math.abs(e.x-hx)<=SY.range&&e.x>-4).sort((p,q)=>(hp<.6?Math.abs(p.x-hx)-Math.abs(q.x-hx):q.hp-p.hp))[0];const onMe=live.some(e=>!e.fly&&Math.abs(e.x-hx)<16);
        if(T&&(hp<.9||!onMe)&&spendEnergy(h,SY.en||0)){h.syT=SY.cd*(1-(h.cdr||0));h.syph={t:0,acc:0,tg:T};unstealth(h);this.ev('zap',{});return;}}}
    const mt=this.enemies.filter(e=>!e.dead&&!e.fly&&(e.boss?e.x-e.w-h.x<=reachPx&&e.x>h.x-4:Math.abs(e.x-this.heroX(h))<=reachPx&&(e.gy==null||Math.abs(e.gy-h.gy)<2.5))).sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0];
    // ---- Wave Dash in progress: slide forward along the lane, cutting everything in the line once
    if(h.dash){const D=h.dash;D.t+=dt;const k=Math.min(1,D.t/D.T);const nx=D.x0+(D.x1-D.x0)*(1-(1-k)*(1-k));const px=h.x;h.x=nx;h.pauseT=Math.max(h.pauseT||0,.05);
      D.trail.push(nx);if(D.trail.length>7)D.trail.shift();
      this.ffArea(h,(px+nx)/2+12,h.gy,(nx-px)/2+14,D.A.depth,D.dmg,D);
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
        const dmg=(this.rollDice(C.melee.dice)+(C.melee.flat||0)+(h.flatMelee||0))*(C.melee.dmgMul||1)*(h.atk/h.base.atk)*h.meleeDmg*(h.cryDmg||1);   /* 0.12.61 (Kyle): base = a plain sword hit (no 1.4x); buffs like War Cry and crits still apply */
        h.dash={t:0,T:DA.dur,x0:h.x,x1:Math.min(this.W-12,h.x+DA.dist),hit:new Set(),dmg:dmg*(DA.dmgMul||1),A:DA,trail:[]};this.ev('dash',{});return;}}
    const tgt=mt||(C.ranged?(this.isMeleeHero(h)?(findT('melee'),findT('ranged')):findT('ranged')):(findT('melee'),null));const rd=faceToward(h,tgt?tgt.x:h.x+10,dt);if(!rd||!tgt)return;
    if(mt&&C.melee.flame){if(h.mT>=C.melee.every){h.mT=0;h.animM=.45;h.swingAnim=null;h.animT=0;unstealth(h);this.flameSpray(h,mt,C.melee.flame);}return;}   /* 0.12.67 Warhound: the flamethrower is his close-range attack */
    if(mt){if(h.mT>=C.melee.every){h.mT=0;unstealth(h);h.combo=(h.combo||0)+1;h.swingAnim=!C.combo?null:(h.moving?'runatk':(h.combo%2?'attack1':'attack2'));h.animM=h.swingAnim==='attack2'?.36:.45;h.animT=0;const roll=(this.rollDice(C.melee.dice)+(C.melee.flat||0)+(h.flatMelee||0))*(C.melee.dmgMul||1)*(h.atk/h.base.atk)*h.meleeDmg*(h.cryDmg||1);
        if(C.melee.arc)this.fx.push({k:'arc',x:h.x,gy:h.gy||this.G,dir:mt.x>=h.x?1:-1,t:0,life:.3,raw:1,big:h.surgeT>0});
        if(C.melee.claw)this.fx.push({k:'claw',x:h.x+(mt.x>=h.x?6:-6),gy:h.gy||this.G,tx:mt.x,dir:mt.x>=h.x?1:-1,t:0,life:.42,raw:1});
        setTimeoutSafe(this,C.melee.hitAt||.15,()=>{if(!h.alive||mt.dead)return;   // the blow lands a moment into the swing (Kyle: very slight delay)
        const K=Math.min(100,C.melee.kb+(h.kbAdd||0));const RY=(C.abilities||[]).find(a=>a.id==='rhythm');let fell=0;if(RY){h.rhyN=(this.t-(h.rhyT==null?-99:h.rhyT)<=RY.window)?(h.rhyN||0)+1:1;h.rhyT=this.t;if(h.rhyN>=RY.n){h.rhyN=0;fell=1;}}   /* 0.12.69 Feller's_Rhythm */
        const LT=h.lethalT>0?(C.abilities||[]).find(a=>a.id==='lethal'):null;const dealt=this.hitEnemy(mt,roll*(fell?1+RY.bonus:1)*(LT?1-LT.dmg:1),h,{});if(dealt&&!mt.dead&&!mt.boss&&C.melee.stunCh&&this.rng()<C.melee.stunCh){mt.stun=Math.max(mt.stun||0,C.melee.stun);this.text(mt.x,mt.y-30,'CLANG','#d8dce8');}
        {const RH=(C.abilities||[]).find(a=>a.id==='blade'&&a.cut);if(RH&&dealt&&mt.dead&&h.tnT>0){h.tnT=Math.max(0,h.tnT-RH.cut);this.text(h.x,this.G-58,'-'+RH.cut+'s','#b070ff');}}   /* 0.12.97 Ritual_Harvest */
        {const PBd=(C.abilities||[]).find(a=>a.id==='blade');if(PBd&&!mt.dead){if(mt.poison>0)mt.poisonT=POISON.dur;if(dealt&&this.rng()<PBd.ch*(LT?2:1))this.addPoison(mt,PBd.n*(LT?2:1));}}   /* 0.12.70 Poisoned_Blade */if(fell&&!mt.dead){if(!mt.boss)mt.stun=Math.max(mt.stun||0,RY.stun);this.text(mt.x,mt.y-34,'TIMBER!','#ffc860');this.shake=Math.max(this.shake||0,.12);}
        {const MO=(C.abilities||[]).find(a=>a.id==='momentum');if(MO){h.mom=this.t-(h.momT||0)<=MO.window?Math.min(MO.max,(h.mom||0)+1):1;h.momT=this.t;h.momPer=MO.per;}}   // Momentum
        h._mt=mt;   /* 0.12.107: the Shadow_Clone no longer mirrors his hits from behind him; it peels off and swings on its own (stepClones) */   // knockback, Kyle's scale: 0-100, 100 = about a 40px shove
        if(dealt&&!mt.dead&&K>0){const res=mt.boss?.9:((mt.E&&mt.E.kbRes)||0);mt.kbv=Math.max(mt.kbv||0,K/100*40*8*(1-res));mt.kbDir=mt.x>=h.x?1:-1;}   
        if(h.surgeT>0&&!mt.dead)this.arcChain(h,mt);
        if(!C.melee.claw&&!C.melee.arc)this.fx.push({k:'slash',x:mt.x-6,y:mt.boss?mt.y-50:mt.y-24,t:0});});}return;}
    const AB=(C.abilities||[]).find(a=>a.id==='aimed');h.sigT=Math.max(0,(h.abT==null?(h.abT=AB?AB.cd*.4:0):h.abT));if(AB&&h.abT>0)h.abT-=dt;
    // ---- Set_Camp (Flannel_Man)
    const GR=(C.abilities||[]).find(a=>a.id==='grit');if(GR){if(h.grT==null)h.grT=GR.cd*.2;if(h.grT>0)h.grT-=dt;if(h.gritT>0)h.gritT-=dt;
      const close=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<45).length,hf=h.hp/h.max,onMe=(this.bb&&this.bb.heat.get(h))||0;
      if(h.grT<=0&&!(h.gritT>0)&&!h.camping&&(h.en||0)>=GR.en&&((hf<GR.under&&(close>=1||onMe>=1))||close>=3)&&spendEnergy(h,GR.en)){
        h.grT=GR.cd*(1-(h.cdr||0));h.gritT=GR.dur;h.gritDR=GR.dr;h.gritMv=GR.move||0;addMood(h,{range:10,aggr:10},GR.dur,'grit');h.thinkT=0;
        this.fx.push({k:'ring',x:h.x,y:this.G-14,r:30,t:0,c:'#e0b060'});this.ev('shout',{});Comms.say(this,h,'tank',{ally:h},trait(h,'talk')>.2);}}
    const CA=(C.abilities||[]).find(a=>a.id==='camp');if(CA){if(h.caT==null)h.caT=CA.cd*.1;if(h.caT>0)h.caT-=dt;
      if(h.camping){h.camping-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.camping<=0){h.camping=0;
          this.camp={x:h.x+(h.face<0?-11:11),gy:h.gy,life:CA.life,t:0,A:CA,owner:h,state:'start'};Comms.onCamp(this,h,this.camp.x);this.ev('camp',{});}
        return;}
      // IF there's no fire going AND nothing is right on top of us AND Set_Camp is ready THEN kneel and light one
      const close=this.enemies.some(e=>!e.dead&&Math.abs(e.x-h.x)<70);
      if(h.caT<=0&&!mt&&!close&&!(this.camp&&this.camp.state!=='dead')&&(h.en||0)>=CA.en&&spendEnergy(h,CA.en)){h.caT=CA.cd*(1-(h.cdr||0));h.camping=CA.cast;h.campT0=CA.cast;return;}}
    // ---- SHOSHI (0.12.110)
    if(h.key==='shoshi'){const AS=id=>(C.abilities||[]).find(a=>a.id===id);const RB=AS('reboot'),FT=AS('trial'),DM=AS('dad'),RM=AS('online'),UZ=AS('undo');
      for(const [A,k] of [[RB,'rbT'],[FT,'frT'],[DM,'ddT'],[UZ,'unT']])if(A){if(h[k]==null)h[k]=A.cd*.3;if(h[k]>0)h[k]-=dt;}
      if(h.dadT>0)h.dadT-=dt;
      const hx=this.heroX(h),al=this.alive().filter(o=>o!==h&&!o.pet);const near=(o,r)=>Math.abs(this.heroX(o)-hx)<Math.max(r,150);   /* 0.12.138 (Kyle: barely saw him cast): his abilities reach ~150 px, any lane */
      const foesOn=o=>this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-this.heroX(o))<20).length;
      const cdsOf=o=>((o.base&&o.base.char&&o.base.char.abilities)||[]).filter(a=>!a.passive&&CD_KEY[a.id]&&o[CD_KEY[a.id]]>.5).map(a=>CD_KEY[a.id]);
      // phone in hand (Remote_Fix / reboot taps): stand still while it plays
      if(h.phoneT>0){h.phoneT-=dt;h.pauseT=Math.max(h.pauseT||0,.05);h.useT=h.phoneT;
        if(h.phoneT<=0&&h.phoneDo){const f=h.phoneDo;h.phoneDo=null;f();}return;}
      // Remote_Fix: an alarm going off within range -> tap it off from the phone
      if(RM){const car=(this.obst||[]).find(o=>o.alarmT>0&&Math.abs(o.x-hx)<RM.r);if(car&&!h.remoteCar){h.remoteCar=car;h.phoneT=RM.T;h.phoneDo=()=>{h.remoteCar=null;if(car.alarmT>0){car.alarmT=0;car.alarmN=0;this.supXp(h,2);this.fx.push({k:'ring',x:car.x,y:LANES[car.lanes[0]]-10,t:0,r:10,c:'#7affe0'});this.text(car.x,LANES[car.lanes[0]]-30,'ALARM OFF','#7affe0');
            Comms.bubble(this,h,Comms.pick(['Disabled it from my phone.','There\'s an app for that.','Alarm\'s off. You\'re welcome.','Remote access, baby.']),true);}};return;}}
      // Ctrl_Z: undo the last few seconds of damage on an ally who just got chunked
      if(UZ&&h.unT<=0&&(h.en||0)>=UZ.en){const lost=o=>(o.dmgLog||[]).filter(e=>this.t-e[0]<=UZ.win).reduce((a,e)=>a+e[1],0);
        const T=al.concat([h]).filter(o=>!o.downed&&o.alive&&(o===h||near(o,UZ.r))&&lost(o)>=o.max*Math.min(UZ.min,.15)).sort((p,q)=>lost(q)/q.max-lost(p)/p.max)[0];
        if(T&&spendEnergy(h,UZ.en)){h.unT=UZ.cd*(1-(h.cdr||0));const amt=Math.min(lost(T),T.max-T.hp);T.dmgLog=[];h.phoneT=.4;h.phoneDo=()=>{if(!T.alive)return;this.healHero(T,amt,false,h);
            this.fx.push({k:'ring',x:this.heroX(T),y:(T.gy||this.G)-14,r:14,t:0,c:'#7affe0'});this.text(this.heroX(T),(T.gy||this.G)-46,'CTRL+Z','#7affe0');
            Comms.bubble(this,h,Comms.pick(['Ctrl+Z. That never happened.','Undo! Undo!','Rolling you back to the last save.','Reverting that.']),true);};return;}}
      // Dad_Mode: an ally under 40% with 2+ zombies on them
      if(DM&&h.ddT<=0&&(h.en||0)>=DM.en){const T=al.filter(o=>near(o,DM.r)&&o.hp/o.max<Math.max(DM.under,.55)&&foesOn(o)>=1)[0];
        if(T&&spendEnergy(h,DM.en)){h.ddT=DM.cd*(1-(h.cdr||0));h.dadT=DM.dur;h.dadDR=DM.dr;h.x=this.heroX(T)+(T.x<h.x?6:-6);h.gy=T.gy;h.laneI=T.laneI;
          T.shield=Math.max(T.shield||0,T.max*DM.shield);T.shieldT=Math.max(T.shieldT||0,DM.dur);
          for(const e of this.enemies){if(e.dead||e.boss||Math.abs(e.x-this.heroX(T))>22)continue;const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,DM.kb/100*40*8*(1-res));e.kbDir=e.x>=this.heroX(T)?1:-1;}
          this.fx.push({k:'ring',x:this.heroX(T),y:(T.gy||this.G)-12,r:16,t:0,c:'#b38cff'});this.text(this.heroX(h),(h.gy||this.G)-48,'DAD MODE','#b38cff');
          Comms.bubble(this,h,Comms.pick(['Nobody touches my people.','Dad mode: ON.','Get behind me.','Not today, buddy.']),true);return;}}
      // Turn_It_Off_And_On_Again
      if(RB&&h.rbT<=0&&(h.en||0)>=RB.en){const T=al.filter(o=>near(o,RB.r)&&!o.downed&&((o.bleedT>0)||(o.fearT>0)||(o.slow>0&&o.slowT>0)||(o.hp/o.max<RB.under&&cdsOf(o).length)))
          .sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
        if(T&&spendEnergy(h,RB.en)){h.rbT=RB.cd*(1-(h.cdr||0));h.phoneT=.6;h.phoneDo=()=>{if(!T.alive)return;T.bleedT=0;T.fearT=0;T.slow=0;T.slowT=0;this.healHero(T,T.max*RB.heal,false,h);
            const cds=cdsOf(T).sort(()=>this.rng()-.5);for(const k of cds.slice(0,RB.n||1))T[k]=0;
            this.fx.push({k:'ring',x:this.heroX(T),y:(T.gy||this.G)-14,r:12,t:0,c:'#7affe0'});this.text(this.heroX(T),(T.gy||this.G)-44,'REBOOTED','#7affe0');
            Comms.bubble(this,h,Comms.pick(['Have you tried turning it off and on again?','Hold power for ten seconds.','Rebooting you, one sec.','Clear your cache, buddy.','Fixed it. Don\'t touch anything.']),true);};return;}}
      // Tech_Support (was Free_Trial)
      if(FT&&h.frT<=0&&(h.en||0)>=FT.en){const grp=al.filter(o=>near(o,FT.r)&&!o.downed&&o.alive);const worth=grp;   /* 0.12.138: worth casting whenever someone's in reach and zombies are around (the +energy helps everyone) */
        if(worth.length&&this.enemies.some(e=>!e.dead&&e.x<this.W+10)&&spendEnergy(h,FT.en)){h.frT=FT.cd*(1-(h.cdr||0));
          this.supXp(h,.3*grp.length);for(const o of grp){for(const k of cdsOf(o))o[k]*=1-FT.cut;if(FT.energy)o.en=Math.min(o.enMax||100,(o.en||0)+FT.energy);this.fx.push({k:'ring',x:this.heroX(o),y:(o.gy||this.G)-14,r:10,t:0,c:'#ffd23f'});}
          this.text(hx,(h.gy||this.G)-48,'TECH SUPPORT','#ffd23f');if(this.rng()<.35)Comms.bubble(this,h,Comms.pick(['Tech support, how can I help?','Pushing an update to everyone.','Have you tried closing some tabs?','I just optimized you. You\'re welcome.','Ticket closed.']),true);return;}}}
    // ---- JP (0.12.66)
    if(h.key==='jp'){const AJ=id=>(C.abilities||[]).find(a=>a.id===id);const TK=AJ('toke'),FM=AJ('familia'),BS=AJ('noscope'),TT=AJ('trash'),BK=AJ('baked');
      for(const [A,k] of [[TK,'tkT'],[FM,'fmT'],[BS,'bsT'],[TT,'ttT']])if(A){if(h[k]==null)h[k]=A.cd*.2;if(h[k]>0)h[k]-=dt;}
      if(h._soberAcc&&h.highT>0){h.acc+=6;h._soberAcc=0;}if(!h._soberAcc&&!(h.highT>0)&&(h.soberT||0)>BK.soberAfter){h.acc-=6;h._soberAcc=1;}
      if(h.highT>0){h.highT-=dt;h.soberT=0;h.en=Math.min(h.enMax||100,(h.en||0)+BK.en*dt);}else{h.soberT=(h.soberT||0)+dt;if(h.soberT>BK.soberAfter&&!h._grump){h._grump=1;Comms.bubble(this,h,Comms.pick(['Ugh, I need a break.','Who touched my lighter?','Not now, I\'m sober.','Everybody shut up for a sec.']));}}
      h.dodgeB=h.dodgeB==null?h.dodge:h.dodgeB;h.dodge=h.dodgeB+(h.highT>0?BK.dodge:0);h._accBonus=(h._accBonus||0);if(h.trashT>0)h.trashT-=dt;
      // smoking: 2s, can walk, nothing else
      if(h.smoking){const S=h.smoking;S.t+=dt;if(S.t>=TK.dur){h.smoking=null;h.highT=TK.high;h._grump=0;addMood(h,{range:BK.slide||4},TK.high,'high');this.healHero(h,h.max*TK.heal,true,h);Comms.bubble(this,h,Comms.pick(['Ahh. Okay. Okay, I\'m good.','Now THAT\'S the stuff.','Alright, who wants some? ...No? More for me.','Lag\'s gone. Let\'s go.']));}return;}
      // rushing to family
      if(h.rush){h.pauseT=Math.max(h.pauseT||0,.05);h.moving=true;const R=h.rush,o=R.ally;if(!o.alive&&!o.downed||o===h){h.rush=null;h.rushT=0;}else{const tx=this.heroX(o)+6,d=tx-h.x;const st=Math.sign(d)*Math.min(Math.abs(d),FM.spd*dt);h.x+=st;h.gy+=Math.sign((o.gy||this.G)-h.gy)*Math.min(Math.abs((o.gy||this.G)-h.gy),40*dt);h.face=d<0?-1:1;
          if(Math.abs(d)<3){h.rush=null;h.rushT=0;for(const u of [h,o]){u.shield=Math.max(u.shield||0,h.max*FM.shield);u.shieldT=FM.shieldT;}
            /* 0.12.93 Shield_Bash baked in: ally goes 75px toward the friend furthest left; the closest zombie goes 75px the other way, 2d4 + 1s stun */
            const left=this.alive().filter(a=>a!==o&&!a.pet&&!a.perch).sort((p,q)=>this.heroX(p)-this.heroX(q))[0];const adir=left&&this.heroX(left)<this.heroX(o)-2?-1:(left?Math.sign(this.heroX(left)-this.heroX(o))||-1:-1);
            o.x=Math.max(10,o.x+adir*FM.push);o.thinkT=0;if(!o.alive&&o.downed){for(const u of this.heroes){u.revDecide=null;u.thinkT=0;u.walkTo=null;}}   /* 0.12.95: a downed friend can be dragged too; everyone re-reads where the body is now */
            const be=this.enemies.filter(e=>!e.dead&&!e.fly).sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0];
            if(be&&Math.abs(be.x-h.x)<60){h.animM=.35;h.face=be.x>=h.x?1:-1;const bd=this.hitEnemy(be,(this.rollDice(FM.bashDice)+(h.flatMelee||0))*(h.atk/h.base.atk)*h.meleeDmg,h,{kb:0});
              if(!be.dead){const res=be.boss?.9:((be.E&&be.E.kbRes)||0);be.x+=-adir*FM.bashPush*(1-res);be.stun=Math.max(be.stun||0,FM.bashStun*(be.boss?.3:1));}this.fx.push({k:'slam',x:be.x,gy:be.gy||this.G,t:0,life:.6,raw:1,r:18,seed:Math.random()*99});this.ev('hit',{});}this.fx.push({k:'ring',x:o.x,y:(o.gy||this.G)-10,t:0,r:12,c:'#ffa040'});Comms.bubble(this,h,Comms.pick(['Get behind me!','Not my family!','Back up, I got this!','Nobody touches them!']),true);}}return;}
      // Protect_the_Familia
      if(FM&&h.fmT<=0&&(h.en||0)>=FM.en){const dn=this.heroes.filter(a=>a!==h&&!a.alive&&a.downed&&!a.pet&&Math.abs(a.x-h.x)<=FM.range&&this.enemies.some(e=>!e.dead&&Math.abs(e.x-a.x)<35));   /* 0.12.95 (Kyle): he can also rush a DOWNED friend with zombies over them */
        const o=dn[0]||this.alive().filter(a=>a!==h&&!a.pet&&!a.perch&&Math.abs(this.heroX(a)-h.x)<=FM.range&&(a.hp/a.max<.35||(a.hp/a.max<FM.under&&this.enemies.some(e=>!e.dead&&Math.abs(e.x-this.heroX(a))<30)))).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
        if(o&&spendEnergy(h,FM.en)){h.fmT=FM.cd*(1-(h.cdr||0));h.rush={ally:o};h.rushT=9;Comms.bubble(this,h,Comms.pick(['FAMILIA!','Hold on, I\'m coming!','HEY! That\'s my people!']),true);return;}}
      // No_Scope (0.12.93): IF 2+ zombies lined up ahead within range (or one big one, or 0.12.164 a lone one his last shot left nearly dead) THEN flick a piercing Kar98 shot through up to 3
      if(BS&&h.bsT<=0&&(h.en||0)>=BS.en){const line=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x>h.x&&e.x-h.x<=BS.range).sort((p,q)=>p.x-q.x).slice(0,BS.pierce);
        const mul=(h.atk/h.base.atk)*(h.rangedDmg||1),avg=((BS.dice[0]*(BS.dice[1]+1))/2+(h.flatRanged||0))*mul;
        /* 0.12.164 (Kyle): follow-up finisher. IF I just fired my Kar98 (within ~1s) AND a lone zombie is left ahead with HP a No_Scope would very likely finish THEN flick it right away */
        const finish=line.length===1&&!line[0].boss&&h.rT<1&&!(h.aimHold>0)&&line[0].hp<=avg*1.1&&line[0].hp>3;
        if((line.length>=2||finish||(line[0]&&(line[0].boss||(line[0].E&&line[0].E.big))))&&spendEnergy(h,BS.en)){h.bsT=BS.cd*(1-(h.cdr||0));h.animR=.3;h.face=1;
          for(const e of line){let dmg=(this.rollDice(BS.dice)+(h.flatRanged||0))*(h.atk/h.base.atk)*(h.rangedDmg||1);if(Math.random()<(h.crit||0)+BS.crit){dmg*=h.critMul||2;this.text(e.x,e.y-30,'NO SCOPE!','#ffd23f');}this.hitEnemy(e,dmg,h,{kb:.4});}
          {const L=line[line.length-1],gy=h.gy!=null?h.gy:this.G,ty=L.gy!=null?L.gy:this.G;this.fx.push({k:'nstrace',x1:h.x+(h.face<0?-7:7),x2:L.x,y:gy-9,y2:ty-9,t:0,c:'#ffd23f'});}   /* 0.12.155 (Kyle): a hip-fire: from JP's hip to the last zombie's middle */this.ev('shot',{});
          if(Math.random()<.6)Comms.bubble(this,h,Comms.pick(['360 no scope, baby!','Get REKT.','Did you see that?! Clip it!','Collateral! Collateral!']),true);return;}}
      // Trash_Talk
      if(TT&&h.ttT<=0&&(h.en||0)>=TT.en){const near=this.enemies.filter(e=>!e.dead&&!e.boss&&Math.abs(e.x-h.x)<=TT.r);const onAlly=this.alive().some(a=>a!==h&&!a.pet&&this.enemies.filter(e=>!e.dead&&Math.abs(e.x-this.heroX(a))<22).length>=2);
        const selfOK=h.hp/h.max>.5&&near.length>=3;if(near.length>=2&&(onAlly||selfOK)&&spendEnergy(h,TT.en)){h.ttT=TT.cd*(1-(h.cdr||0));h.trashT=TT.dur;for(const e of near){e.tauntT=TT.dur;e.tauntBy=h;e.target=h;}for(const a of this.alive())if(!a.pet)a.laughT=TT.critT;
          Comms.bubble(this,h,Comms.pick(['Your mom walks faster than that!','Bro, you smell worse than my gaming chair.','Is that your best? My kids hit harder!','Come here, you rotten nerds!','Zero kills, all deaths. Classic.']),true);return;}}
      // Toke_Break
      if(TK&&h.tkT<=0&&!(h.highT>3)&&!this.enemies.some(e=>!e.dead&&Math.abs(e.x-h.x)<45)){h.tkT=TK.cd*(1-(h.cdr||0));h.smoking={t:0};if(Math.random()<.7)Comms.bubble(this,h,Comms.pick(['Hold up, smoke break.','Pause the game, I gotta hit this.','One sec, one sec...','Medicinal. Totally medicinal.']));return;}}
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
        h._forceBox='bot';const p=this.shoot(h,tgt,'brick',dmg,{});p.sure=1;p.stunCh=BB.stunCh;p.stunT=BB.stunT;p.spd=136;this.aim(p,h,tgt);h._forceBox=null;return;}}
    // ---- 0.12.68 Bottle_Distraction (the companion): IF a pack of 3+ is bunched up THEN lob a bottle 150-167 world px out, just BEHIND them,
    //   so they turn around and walk away from us to check the noise
    {const BO=(C.abilities||[]).find(a=>a.id==='bottle');if(BO){if(h.boT==null)h.boT=BO.cd*.4;if(h.boT>0)h.boT-=dt;
      if(h.boT<=0&&(h.en||0)>=BO.en){const hx=this.heroX(h),live=this.enemies.filter(e=>!e.dead&&!e.boss&&!e.fly&&e.x>hx&&e.x<this.W&&!(e.distractT>0));let best=null,bn=0;
        for(const e of live){const n=live.filter(o=>Math.abs(o.x-e.x)<40).length;if(n>bn||(n===bn&&best&&e.x>best.x)){bn=n;best=e;}}
        if(!(bn>=BO.min3)){const near=live.filter(o=>o.x-hx<110).sort((a,b)=>a.x-b.x)[0];if(near&&live.filter(o=>Math.abs(o.x-near.x)<40).length>=1){best=near;bn=live.filter(o=>Math.abs(o.x-near.x)<40).length;}else best=null;}   /* 0.12.103 (Kyle): a crowd is best, but not required: with no pack of 3 she still lobs it behind whatever is closing in */
        if(best){const pack=live.filter(o=>Math.abs(o.x-best.x)<40),far=Math.max(...pack.map(o=>o.x));const tx=Math.min(hx+BO.max,Math.max(hx+BO.min,far+22),this.W-6);
          if(tx-far>4&&spendEnergy(h,BO.en)){h.boT=BO.cd*(1-(h.cdr||0));h.animM=.45;h.face=1;const gy=best.gy!=null?best.gy:this.G;
            (this.bottles=this.bottles||[]).push({x0:hx+3,gy0:h.gy||this.G,x1:tx,gy1:gy,t:0,T:BO.fly,A:BO,src:h,rot:0});this.ev('whoosh',{});
            Comms.bubble(this,h,Comms.pick(['Hey! Over there!','Go fetch!','Look, shiny!','Catch!']),true);return;}}}}}
    // ---- Trip Bomb
    const TB=(C.abilities||[]).find(a=>a.id==='trip');if(TB){if(h.tbT==null)h.tbT=TB.cd*.25;if(h.tbT>0)h.tbT-=dt;}
    /* 0.12.64 Proximity_Bomb casts. PLACE: kneel 3s, no moving (a hit on him in crowbar range breaks it). TOSS / THROW: he keeps walking while the cast fills. */
    if(h.setting){const S=h.setting;if(mt){h.setting=null;this.text(h.x,this.G-70,'interrupted','#9aa');}
      else{S.t+=dt;h.pauseT=Math.max(h.pauseT||0,.1);
        if(S.t>=S.T){h.setting=null;if(spendEnergy(h,TB.en)){h.tbT=TB.cd*(1-(h.cdr||0));const P=TB.place;
          (this.traps=this.traps||[]).push({x:h.x+(h.face<0?-P.off:P.off),gy:h.gy!=null?h.gy:this.G,t:0,A:TB,owner:h,how:'plant',live:1,dice:P.dmg[0],flat:P.dmg[1],blast:{w0:P.w0,w1:P.w1}});Comms.onTrap(this,h,h.x);}}
        return;}}
    if(h.tossing){const K=h.tossing;K.t+=dt;   // no pauseT: he can move while it winds up
      if(K.t>=K.T){h.tossing=null;if(spendEnergy(h,TB.en)){h.tbT=TB.cd*(1-(h.cdr||0));const gy=K.gy,x0=h.x+(h.face<0?-8:8);
          const T={x:x0,gy,t:0,A:TB,owner:h,how:K.kind,air:0};
          if(K.kind==='toss'){const Lb=TB.lob;T.fly={t:0,T:Lb.dur,x0,x1:x0+Lb.dist,h:Lb.h};T.rollLeft=Lb.roll;T.roll0=Lb.roll;T.dice=Lb.early[0];T.flat=Lb.early[1];}
          else{const H=TB.hurl;const tx=Math.max(h.x+H.min,Math.min(h.x+H.max,K.tx));T.fly={t:0,T:H.dur,x0,x1:tx,h:H.h};T.rollLeft=0;T.impact=1;T.dice=H.dmg[0];T.flat=H.dmg[1];T.blast={w0:TB.blast.w0,w1:H.w1};}
          (this.traps=this.traps||[]).push(T);this.ev('whoosh',{});if(Math.random()<.55)Comms.bubble(this,h,K.kind==='toss'?Comms.pick(['Rolling one in!','Fire in the hole!','Bowling!']):Comms.pick(['Catch!','Heads up!','Present for you!']),true);}}}
    /* 0.12.64 Proximity_Bomb choice (Kyle): he knows PLACING is the strongest (6d4+2, wider) but slow (3s on his knees), tossing/throwing is quick.
       IF a zombie is close or on him THEN he can't afford to kneel: quick only.
       IF a bunch / a big one sits 100-150px out THEN THROW it right on them (2d4+6 on impact) when he wants quick results.
       IF zombies are 25-60px ahead in his lane THEN TOSS it so it lands short and rolls into them.
       IF the nearest threat is still far (>70px) THEN he invests: PLACE it (Careful and Calculated lean this way).
       IF nothing is near at all THEN he randomly scouts a spot to place or to toss for later. */
    if(TB&&!h.cast&&!h.setting&&!h.tossing&&!mt&&h.tbT<=0&&!(this.traps||[]).some(t=>t.owner===h)&&(h.en||0)>=TB.en*(1+.3*trait(h,'energy')-.15)){
      const hx=h.x,gy0=h.gy!=null?h.gy:this.G,live=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x<this.W-4);
      const H=TB.hurl;let best=null;for(const e of live){const d=e.x-hx;if(d<H.min||d>H.max)continue;const n=live.filter(o=>Math.abs(o.x-e.x)<16&&Math.abs((o.gy||this.G)-(e.gy||this.G))<10).length;const sc=n+(e.boss||e.max>=40?2:0);if(!best||sc>best.sc)best={e,sc,n};}
      const near1=live.reduce((m,e)=>Math.min(m,Math.abs(e.x-hx)),999),inLane=live.filter(e=>e.x-hx>=25&&e.x-hx<=60&&Math.abs((e.gy!=null?e.gy:this.G)-gy0)<=9);
      const aggr=trait(h,'aggr'),plan=trait(h,'plan'),wantQuick=near1<45||(h.hp/h.max<.5)||aggr>.65;
      if(best&&best.sc>=2&&(wantQuick||near1<70||Math.random()<.5)){const cx=live.filter(o=>Math.abs(o.x-best.e.x)<16).reduce((s,o)=>s+o.x,0)/Math.max(1,best.n);h.tossing={t:0,T:H.cast,kind:'throw',tx:cx-4,gy:best.e.gy!=null?best.e.gy:gy0};return;}
      if(inLane.length&&near1>=18){h.tossing={t:0,T:TB.lob.cast,kind:'toss',gy:gy0};return;}
      if(near1>70&&near1<260&&!wantQuick&&Math.random()<.35+.4*(1-aggr)+.2*plan){h.setting={t:0,T:TB.place.cast};return;}
      if(!live.length&&this._clear&&Math.random()<dt*.25){if(Math.random()<.5)h.setting={t:0,T:TB.place.cast};else h.tossing={t:0,T:TB.lob.cast,kind:'toss',gy:gy0};return;}}
    // Aimed Shot has a 2s cast: he stands still with a laser on the target, then fires. A foe in crowbar reach breaks the cast
    //   (no energy spent, the cooldown doesn't start). If the target dies mid-cast he swings the laser to the next one in range.
    if(h.cast){const K=h.cast;
      if(mt){h.cast=null;this.text(h.x,this.G-70,'interrupted','#9aa');}
      else{if(!K.tgt||K.tgt.dead){K.tgt=findT('ranged');if(!K.tgt){h.cast=null;return;}}
        K.t+=dt;h.pauseT=Math.max(h.pauseT||0,.1);
        if(K.t>=K.T){h.cast=null;if(!spendEnergy(h,AB.en))return;
          h.abT=AB.cd*(1-(h.cdr||0));h.rT=0;h.ammo-=1;h.animR=.5;h.firedMoving=false;this.ev('gun',{big:1});this.shake=Math.max(this.shake||0,.2);
          const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(h.atk/h.base.atk)*h.rangedDmg;
          h._forceBox=AB.box;const p=this.shoot(h,K.tgt,st.proj,dmg,{pierce:AB.pierce||0});p.critAdd=AB.critAdd;p.critMul=AB.critMul;p.aimedBy=h;this.aim(p,h,K.tgt);h._forceBox=null;}
        return;}}
    // IF Aimed Shot is ready AND loaded AND standing still AND enough energy (Preserve-minded units keep a cushion) THEN start the cast
    if(AB&&!mt&&h.abT<=0&&h.ammo>0&&!h.moving&&h.rT>=.5&&(h.en||0)>=AB.en*(1+.4*trait(h,'energy')-.2)){h.cast={t:0,T:AB.cast||2,tgt};return;}
    const RA=(C.abilities||[]).find(a=>a.id==='rapid');if(RA){if(h.raT==null)h.raT=RA.cd*.3;if(h.raT>0)h.raT-=dt;
      // IF One Nocked, Two in Hand is ready AND an enemy is in bow range AND I'm not already rapid-firing THEN nock up
      if(h.raT<=0&&!h.volley3&&!mt&&tgt&&Math.abs(tgt.x-h.x)<=C.ranged.range&&(h.en||0)>=RA.en*(1+.3*trait(h,'energy')-.15)&&spendEnergy(h,RA.en)){
        h.raT=RA.cd*(1-(h.cdr||0));h.volley3={left:RA.shots,t:0,tgt};this.ev('shout',{});}}
    // 0.12.23 (Kyle): One Nocked, Two in Hand = 3 real basic shots rapid-fired inside 1.5s (one every 0.5s), then back to normal
    if(h.volley3&&RA){const V=h.volley3;V.t-=dt;h.pauseT=Math.max(h.pauseT||0,.05);
      if(V.t<=0&&V.left>0){V.left--;V.t=RA.over/RA.shots;h.rT=0;h.animR=.42;h.animRT=.42;h.firedMoving=false;
        const inR=this.liveE().filter(e=>Math.abs(e.x-h.x)<=C.ranged.range);const pk=inR.length?Brain.pickTarget(this,h,inR,this.alive(),true):null;const tg0=pk&&pk.tgt;   /* each shot is its own choice through the behavior system: same target or a different one */
        if(tg0){faceToward(h,tg0.x,1);const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(C.ranged.dmgMul||1)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
          setTimeoutSafe(this,.2,()=>{if(!h.alive)return;const tg=tg0.dead?this.liveE().sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0]:tg0;if(!tg)return;this.ev('bow',{});
            const WR=(C.abilities||[]).find(a=>a.id==='wind');const far=WR&&Math.abs(tg.x-h.x)>WR.far;h._accBonus=(far?WR.acc:0)-(RA.accPen||0);   /* rushed shots: slightly less accurate */
            const p=this.shoot(h,tg,st.proj,dmg,{});p.nocrit=1;this.aim(p,h,tg);h._accBonus=0;if(far)p.critMul=(h.critMul||1.75)+WR.critMul;});}}
      if(V.left<=0&&V.t<=0)h.volley3=null;
      return;}
    // ---- Poultice (Chibi_Warrior): self heal over time when he's hurt
    const CL=AB_x(C,'clone');if(CL){if(h.clT==null)h.clT=CL.cd*.3;if(h.clT>0)h.clT-=dt;
      const close=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<50).length,onMe=(this.bb&&this.bb.heat.get(h))||0;
      if(h.clT<=0&&!(h.cloneT>0)&&(close>=2||(h.hp/h.max<.6&&onMe>=1))&&(h.en||0)>=CL.en&&spendEnergy(h,CL.en)){h.clT=CL.cd*(1-(h.cdr||0));h.cloneT=CL.dur;h.cloneMirror=CL.mirror;h.cloneDecoy=CL.decoy;(this.clones=this.clones||[]).push({owner:h,x:h.x-(h.face||1)*10,gy:h.gy||this.G,face:h.face||1,t:0,life:CL.dur,atkT:.3,tgt:null,animM:0,walkT:0,moving:false,mirror:CL.mirror});   /* 0.12.107 (Kyle): the clone detaches and fights on its own */
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
        if(W.tick>=WH.every){W.tick-=WH.every;this.disturb(h.x,h.gy||this.G,WH.r);for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-h.x)<=WH.r+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=WH.depth)){this.hitEnemy(e,(this.rollDice(WH.dice)+flat)*mul,h,{kb:.6});if(!e.dead&&WH.bleed){e.bleedT=WH.bleed.dur;e.bleedDps=WH.bleed.dmg/WH.bleed.dur;}}}this.ffArea(h,h.x,h.gy,WH.r,WH.depth,(this.rollDice(WH.dice)+flat)*mul);this.ev('whoosh',{});}
        if(W.t>=WH.dur)h.whirl=null;return;}
      if(h.leap){const P=h.leap;P.t+=dt;const k=Math.min(1,P.t/LP.dur);h.x=P.x0+(P.x1-P.x0)*k;h.leapH=Math.sin(Math.PI*k)*22;h.pauseT=Math.max(h.pauseT||0,.05);
        if(k>=1){h.leap=null;h.leapH=0;this.shake=Math.max(this.shake||0,.35);this.fx.push({k:'ring',x:h.x,y:this.G-4,r:LP.r*1.6,t:0,c:'#c8a060'});this.ev('thorns',{});
          this.fx.push({k:'crack',x:h.x,gy:h.gy||this.G,t:0,life:3.2,raw:1,r:LP.r},{k:'slam',x:h.x,gy:h.gy||this.G,t:0,life:.7,raw:1,r:LP.r,seed:Math.random()*99});
          for(const e of this.enemies){if(e.dead||e.fly)continue;const dx=Math.abs(e.x-h.x);if(dx<=LP.r+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=8)){this.hitEnemy(e,(this.rollDice(LP.dice)+flat)*mul,h,{kb:1});
            if(!e.dead&&!e.boss&&LP.stun0){const q=Math.min(1,dx/LP.r);e.stun=Math.max(e.stun||0,LP.stun0-(LP.stun0-LP.stun1)*q);}}}   /* 0.12.69: stun, longest at the centre */this.ffArea(h,h.x,h.gy,LP.r,8,(this.rollDice(LP.dice)+flat)*mul);}
        return;}
      if(h.rolling)h.rolling=null;
      if(h.chopping){h.chopping-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.chopping<=0){h.chopping=0;const x0=h.x+(h.face<0?-CP.dist:0),x1=x0+CP.dist;this.shake=Math.max(this.shake||0,.3);this.ev('thorns',{});
          this.fx.push({k:'quake',x:h.x+(h.face<0?-CP.dist/2:CP.dist/2),gy:h.gy,w:CP.dist,t:0,life:.6,raw:1,chop:h.face<0?-1:1});this.ffArea(h,h.x+(h.face<0?-CP.dist/2:CP.dist/2),h.gy,CP.dist/2+2,CP.depth,(this.rollDice(CP.dice)+flat)*mul);this.fx.push({k:'ring',x:h.x+(h.face<0?-6:6),y:(h.gy||this.G)-2,r:10,t:0,c:'#c8a060'});
          for(const e of this.enemies){if(e.dead||e.fly)continue;if(e.x>=x0-4&&e.x<=x1+(e.boss?e.w:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=CP.depth)){const d=this.hitEnemy(e,(this.rollDice(CP.dice)+flat)*mul,h,{});
            if(d&&!e.dead){e.stun=Math.max(e.stun||0,CP.stun*(e.boss?.3:1));const res=e.boss?.9:((e.E&&e.E.kbRes)||0);e.kbv=Math.max(e.kbv||0,CP.kb/100*40*8*(1-res));e.kbDir=e.x>=h.x?1:-1;}}}}
        return;}
      const en=h.en||0,hp=h.hp/h.max,close=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)<=24&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=6);
      // IF hurt AND something is in my face AND Log_Roll is ready THEN roll back out of it (can't be hit while rolling)
      if(RL){const lane=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x-h.x>6&&e.x-h.x<=RL.range&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=RL.depth);
       if(RL&&h.rlT<=0&&(lane.length>=2||lane.some(e=>e.boss||e.max>=40))&&en>=RL.en&&spendEnergy(h,RL.en)){h.rlT=RL.cd*(1-(h.cdr||0));h.face=1;h.animT=.32;h.lunge=4;
         (this.logs=this.logs||[]).push({x:h.x+8,gy:h.gy||this.G,x0:h.x+8,A:RL,h,hit:new Set(),mul,flat,t:0});this.ev('whoosh',{});return;}}
      // IF under half health AND Timber_Rage is ready THEN get angry
      if(RG&&h.rgT<=0&&hp<RG.under&&en>=RG.en&&this.enemies.some(e=>!e.dead&&Math.abs(e.x-h.x)<120)&&spendEnergy(h,RG.en)){h.rgT=RG.cd*(1-(h.cdr||0));h.rageT=RG.dur;h.rageAnim=.7;this.ev('shout',{});}
      // IF 2+ enemies are around me AND Whirl_Wind is ready THEN spin
      if(WH&&h.whT<=0&&close.length>=2&&en>=WH.en&&spendEnergy(h,WH.en)){h.whT=WH.cd*(1-(h.cdr||0));h.whirl={t:0,tick:WH.every*.7};this.ev('whoosh',{});return;}
      // IF an enemy is in my lane a little ahead (inside the shockwave) AND Ground_Chop is ready THEN chop
      const ahead=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x-h.x>0&&e.x-h.x<=CP.dist&&Math.abs((e.gy!=null?e.gy:this.G)-h.gy)<=CP.depth);
      if(CP&&h.cpT<=0&&ahead.length&&en>=CP.en&&spendEnergy(h,CP.en)){h.cpT=CP.cd*(1-(h.cdr||0));h.chopping=CP.cast;h.chopT0=CP.cast;h.face=1;return;}
      // IF a big target is 24-60px away (too far to swing, close enough to jump) AND Hatchet_Leap is ready THEN leap onto it
      const lt=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-h.x)>=LP.min&&Math.abs(e.x-h.x)<=LP.range).sort((p,q)=>(q.max-p.max))[0];
      if(LP&&h.lpT<=0&&lt&&en>=LP.en&&spendEnergy(h,LP.en)){h.lpT=LP.cd*(1-(h.cdr||0));h.leap={t:0,x0:h.x,x1:lt.x-(lt.x>h.x?10:-10)};faceToward(h,lt.x,1);h.laneI=lt.laneI!=null?lt.laneI:h.laneI;return;}}
    // ---- Druid abilities
    const AB_=id=>(C.abilities||[]).find(a=>a.id===id);const MD=AB_('mend'),BL=AB_('bloom'),TH=AB_('thorns'),CY=AB_('cyclone');
    if(MD||BL||TH||CY){for(const [A,k] of [[MD,'mdT'],[BL,'blT'],[TH,'thT'],[CY,'cyT']])if(A){if(h[k]==null)h[k]=A.cd*.2;if(h[k]>0)h[k]-=dt;}
      if(h.casting){h.casting-=dt;h.pauseT=Math.max(h.pauseT||0,.05);if(h.casting<=0)h.casting=0;return;}
      const allies=this.alive().filter(fleshy);let hurt=allies.slice().sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];const mul=(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
      {const O=Comms.ord(h,this,['heal']);if(O&&O.from&&O.from.alive&&fleshy(O.from)&&O.from.hp/O.from.max<.9)hurt=O.from;}   // IF someone shouted for a heal AND I listened THEN them first
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
            this.fx.push({k:'pinned',e,x:e.x,gy:e.gy!=null?e.gy:this.G,dir:e.x>=h.x?1:-1,t:0,life:PN.root+.4,raw:1});}});p.pin=1;p.sure=1;h._forceBox='bot';this.aim(p,h,tg);h._forceBox=null;});   /* 0.12.68 (Kyle): auto-aimed at the legs, ignores accuracy */
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
      /* 0.12.63: prefers the living (poison works on them) but will dart an undead too now that the dart does 1d4 on its own; an immune hit refunds half the cooldown */
      const live=!mt&&this.enemies.filter(e=>!e.dead&&Math.abs(e.x-h.x)<=BG.range).sort((p,q)=>((isUndead(p)?1:0)-(isUndead(q)?1:0))||(q.max-p.max)||(Math.abs(p.x-h.x)-Math.abs(q.x-h.x)))[0];
      if(h.bgT<=0&&live&&(h.en||0)>=BG.en&&spendEnergy(h,BG.en)){h.bgT=BG.cd*(1-(h.cdr||0));h.blowing=BG.anim;h.blowT0=BG.anim;faceToward(h,live.x,1);
        
        setTimeoutSafe(this,BG.releaseAt,()=>{if(!h.alive)return;const tg=live.dead?this.enemies.find(e=>!e.dead&&Math.abs(e.x-h.x)<=BG.range):live;if(!tg)return;this.ev('bow',{});
          const mz=MUZZLE[h.key];MUZZLE[h.key]=[12,12];const p=this.shoot(h,tg,'dart',(this.rollDice(BG.base)+(isUndead(tg)?0:this.rollDice(BG.dice)))*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1),{});MUZZLE[h.key]=mz;
          p.poison=isUndead(tg)?null:BG.extra;if(isUndead(tg))p.blowBy=h;this.aim(p,h,tg);});
        return;}}
    if(C.ranged&&C.ranged.lazer){const LZ=C.ranged.lazer;   // 0.12.67 Warhound: IF the lazer is reloaded AND a target is 200-500 screen px out THEN charge it up
      if(!h.lz&&!(h.lzReload>0)&&tgt&&tgt.x<this.W-4){const d=Math.abs(tgt.x-this.heroX(h));if(d>=LZ.min&&d<=LZ.max){const dir=tgt.x>=h.x?1:-1;h.face=dir;unstealth(h);
        h.lz={t:0,tg:tgt,dir,tx:tgt.x-dir*LZ.lead,gy:tgt.gy!=null?tgt.gy:this.G,ct:0,dt:0};this.ev('zap',{});}}return;}
    const rap=false;
    if(C.ranged&&C.ranged.burst&&tgt){   /* 0.12.110 Shoshi's trigger discipline: short bursts, or dump the mag when it's worth it */
      const big=tgt.boss||(tgt.E&&(tgt.E.hp>=38||tgt.type==='werewolf'))||tgt.hp>=26;const onHurt=this.alive().some(o=>!o.pet&&o!==h&&o.hp/o.max<.45&&Math.abs(this.heroX(o)-tgt.x)<22);
      if(!(h.freeUntil>this.t)&&!big&&!onHurt&&(h.burstN||0)>=C.ranged.burst&&h.rT>=C.ranged.burstGap&&this.rng()<.015)h.freeUntil=this.t+.5+this.rng()*.6;   /* 0.12.110 (Kyle): now and then he just lets it rip for no reason */
      h.unload=big||onHurt||h.freeUntil>this.t;h.shAcc=h.unload?(C.ranged.sprayAcc||0):(C.ranged.tapAcc||0);if(!h.unload&&(h.burstN||0)>=C.ranged.burst){if(h.rT<C.ranged.burstGap)return;h.burstN=0;}}
    if(C.ranged&&h.ammo>0&&h.rT>=C.ranged.every*(rap?RA.every:1)){if(C.ranged.burst)h.burstN=(h.burstN||0)+1;
      if(h.moving&&trait(h,'exec')>.5&&!(h.plan&&h.plan.intent==='retreat')&&(h.plantT=(h.plantT||0)+dt)<.2+1.2*(trait(h,'exec')-.5)*2)return;   // optimal shooters plant their feet first (but not when running away)
      h.plantT=0;h.rT=0;h.ammo-=1;unstealth(h);const AIM=C.ranged.aimT||0;
      if(AIM){h.aimHold=AIM;h.pauseT=Math.max(h.pauseT||0,AIM);h.moving=false;faceToward(h,tgt.x,1);   /* 0.12.163 aim wind-up: he plants, shoulders it, then fires */
        setTimeoutSafe(this,AIM,()=>{if(!h.alive)return;h.aimHold=0;h.animR=C.ranged.anim||.5;h.animRT=h.animR;h.firedMoving=false;this.ev('gun',{});});}
      else{h.animR=rap?RA.anim:(C.ranged.anim||.5);h.animRT=h.animR;h.firedMoving=h.moving;if(!C.ranged.releaseAt)this.ev('gun',{});}
      const rel=AIM?AIM:C.ranged.releaseAt?C.ranged.releaseAt*(h.animR/(C.ranged.anim||.5)):0;if(rap)h.rapid--;
      const dmg=(this.rollDice(C.ranged.dice)+(C.ranged.flat||0)+(h.flatRanged||0))*(C.ranged.dmgMul||1)*(h.atk/h.base.atk)*h.rangedDmg*(h.cryDmg||1);
      const fire=()=>{if(!h.alive)return;const tg=tgt.dead?this.liveE().sort((p,q)=>Math.abs(p.x-h.x)-Math.abs(q.x-h.x))[0]:tgt;if(!tg)return;if(C.ranged.flame){this.flameSpray(h,tg,C.ranged.flame);return;}if(C.ranged.gl){this.launchNade(h,tg,dmg,C.ranged.gl);return;}if(C.ranged.releaseAt)this.ev('bow',{});
        const WR=(C.abilities||[]).find(a=>a.id==='wind');const far=WR&&Math.abs(tg.x-h.x)>WR.far;   // Wind_Reading
        for(let i=0;i<C.ranged.pellets;i++){const acc=h.moving?Math.max(1,h.acc-C.walkPenalty):h.acc;h._accBonus=acc-h.acc+(far?WR.acc:0)+(C.ranged.burst?(h.shAcc||0):0);
          let T2=tg;if(C.ranged.spread&&i>0){const side=i===1?-1:1;const alt=this.liveE().filter(e=>e!==tg&&Math.abs(e.x-h.x)<=C.ranged.range&&Math.sign((e.gy||this.G)-(tg.gy||this.G))===side).sort((p,q)=>Math.abs(p.x-tg.x)-Math.abs(q.x-tg.x))[0];if(alt&&Math.abs(alt.x-tg.x)<50)T2=alt;}   /* outer pellets go after whoever is up or down a lane from the target */
          const p=this.shoot(h,T2,C.ranged.proj||st.proj,dmg/C.ranged.pellets,{});if(C.ranged.spread&&i>0)h._accBonus-=12;this.aim(p,h,T2);h._accBonus=0;if(far)p.critMul=(h.critMul||1.75)+WR.critMul;
          if(C.ranged.spread&&i>0&&T2===tg){const side=i===1?-1:1;p.tgy+=side*(4+this.rng()*3);p.aimH+=(this.rng()*2-1)*8;}   /* wild outer pellets angle off up and down the lanes */
          else if(C.ranged.spread&&i>0){p.tgy+=(this.rng()*2-1)*2;}}};
      const nb=C.ranged.burst||1;for(let b=0;b<nb;b++){const tt=rel+b*(C.ranged.burstGap||.08);if(tt>0)setTimeoutSafe(this,tt,fire);else fire();}}}
  /* 0.12.44 Guard Dog Kennel: one dog, out from the start of every stage; each Kennel tier makes him a bit tougher and harder-biting */
  spawnDog(t,i){this.pets=this.pets||[];if(!i&&t>=4&&!this._dog2){this._dog2=1;this.spawnDog(t,1);}if(!i&&this.pets.some(p=>p.key==='dog'&&!p.second))return;const lv=Math.max(1,Math.round(this.heroes.reduce((s,h)=>s+(h.lvl||1),0)/Math.max(1,this.heroes.length)));
    const key='dog',b=heroBase(key,lv,this.run.team.length);const hm=1,dm=[1,1.2,1.3,1.4][t-1];const h0=this.heroes[i?Math.min(1,this.heroes.length-1):0];
    const hitsMax=t>=3?6:5;const dg={key,def:{key,name:i?'Guard_Dog 2':'Guard_Dog'},style:STYLE[key],lvl:lv,base:b,spells:[],items:[],alive:true,owner:h0,pet:1,dog:1,second:!!i,hits:hitsMax,hitsMax,hitRegEvery:t>=3?10:15,hitRegT:0,x:(h0?h0.x:60)-10-(i?14:0),gy:(h0&&h0.gy)||LANES[2],laneI:h0&&h0.laneI!=null?h0.laneI:2,
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
  tripBoom(T){const A=T.A,h=T.owner;T.done=1;this.fx.push({k:'boom',x:T.x,gy:T.gy,t:0,life:1.15,raw:1});this.ev('boom',{});this.shake=Math.max(this.shake||0,.55);
    const base=this.rollDice(T.dice||[2,4])+(T.flat||0)+((h&&h.flatRanged)||0);const mul=(h&&h.base?(h.atk/h.base.atk)*(h.rangedDmg||1):1)*(h&&hasPerk(h,'sapper')?1.25:1);   /* 0.12.55: a Sapper's own bomb hits 25% harder */
    for(const e of this.enemies){if(e.dead||e.fly)continue;const dx=Math.abs(e.x-T.x),dz=Math.abs((e.gy!=null?e.gy:this.G)-T.gy);
      // 0.12.64 (Kyle): blast covers its own lane wide and the lanes just above and below narrower
      const BW=T.blast||A.blast;const own=dz<=3.5,side=dz>3.5&&dz<=11.5;const lim=own?BW.w0:side?BW.w1:-1;if(dx>lim)continue;
      const fall=1-.45*Math.min(1,dx/Math.max(1,lim));const dealt=this.hitEnemy(e,base*mul*fall,h&&h.alive?h:null,{blast:1});   // AoE: full damage in the middle, half at the edge
      if(dealt&&!e.dead){const res=e.boss?.9:((e.E&&e.E.kbRes)||0);e.kbv=Math.max(e.kbv||0,A.kb/100*40*8*(1-res)*fall);e.kbDir=e.x>=T.x?1:-1;
        if(this.rng()<A.bleed.chance){e.bleedT=A.bleed.dur;e.bleedDps=A.bleed.dmg/A.bleed.dur;}}
      e._tripHit=T;}
    if(this.hardcore)for(const o of this.alive()){const dx=Math.abs(this.heroX(o)-T.x),dz=Math.abs((o.gy||this.G)-T.gy);const BW=T.blast||A.blast;const lim=dz<=3.5?BW.w0:dz<=11.5?BW.w1:-1;
      if(dx<=lim){this.hurtHero(o,base*mul*.8,null);this.st8(h||o).ff=(this.st8(h||o).ff||0)+1;}}   /* Hardcore: your own bomb hurts your people too */
    /* 0.12.38 (Kyle): shockwave. A wider ring around the cross: anything it reaches that the cross missed takes half damage and a heavier shove (no bleed) */
    const SW=A.shock;if(SW){this.fx.push({k:'ring',x:T.x+6,y:T.gy-4,t:0,r:SW.r,c:'#ffd9a0'});
      for(const e of this.enemies){if(e.dead||e.fly||e._tripHit===T)continue;const dx=Math.abs(e.x-T.x),dz=Math.abs((e.gy!=null?e.gy:this.G)-T.gy);
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
  /* 0.12.127 (Kyle) THE HARVEST KNIGHT (stage 10). Every move is telegraphed on the ground first.
     Reaping_Sweep (every 3.2s, 2.4s enraged): a wide arc in front of him.  Pitchfork_Slam (every 8s): the scythe brought down two-handed on one hero.
     Murder_of_Crows (every 11s): crows dive at three heroes.  Bonfire_Harvest: at half HP his head flares up (enraged): faster sweeps and
     fire patches erupting under two heroes every 5s. */
  harvestAI(b,dt,al,f){if(!al.length)return;const A=b.act;
    if(!b.phase&&b.hp<b.max*.5){b.phase=1;this.ev('enrage');this.shake=.5;this.fx.push({k:'ring',x:b.x,y:this.G-40,t:0,r:30,c:'#ff8a20'});b.tF=2;}
    if(A){A.t+=dt;if(!A.done&&A.t>=A.hit){A.done=1;A.fn&&A.fn();}if(A.t>=A.T)b.act=null;return;}
    const go=(name,T,hit,fn)=>{b.act={name,t:0,T,hit,fn};b.anim=1;b.animT=T;};
    if(b.phase){b.tF=(b.tF||5)-dt;if(b.tF<=0){b.tF=5;const ts=al.slice().sort(()=>this.rng()-.5).slice(0,2);go('cast',.75,.3,()=>{for(const t of ts)this.zone(this.heroX(t),14,1.1,b.dmg*.8,b,'fire','#ff7a1a');});return;}}
    if(b.t3<=0){b.t3=11;go('cast',.75,.4,()=>{for(let i=0;i<3;i++){const t=al[Math.floor(this.rng()*al.length)];this.proj.push({enemy:true,kind:'batswarm',x:b.x-10,y:b.y-70,tx:t,dmg:b.dmg*.5,src:b,spd:120+i*25,t:0});}});return;}
    if(b.t2<=0){b.t2=8;const t=al[Math.floor(this.rng()*al.length)];const tx=this.heroX(t);this.zone(tx,14,.65,b.dmg*1.6,b,'slam','#ffb040');go('slam',.9,.65,()=>{this.shake=Math.max(this.shake,.5);this.fx.push({k:'quake',x:tx,gy:t.gy||this.G,t:0,life:.4,raw:1});});return;}
    if(b.t1<=0){b.t1=b.phase?3:4;this.zone(b.x-24,16,.5,b.dmg*1.1,b,'sweep','#ffb040');go('sweep',1,.5,null);return;}}
  /* 0.12.130 THE HOLLOW WRAITH (stage 20). Telegraphed like the Harvest Knight.
     Scythe_Reap (every 3.5s, 2.6s in phase 2): an arc in front.  Soul_Drain (every 9s): a claw grab on one hero: they bleed for 3s and the
     wraith mends a little.  Phase_Dash (every 12s): a streak of cold through the whole party's line.  Spectral_Orbs (every 10s): three
     homing orbs.  Shroud: at half HP it calls up two shades, and everything comes faster. */
  wraithAI(b,dt,al,f){if(!al.length)return;const A=b.act;
    if(!b.phase&&b.hp<b.max*.5){b.phase=1;this.ev('enrage');this.shake=.5;this.fx.push({k:'ring',x:b.x,y:this.G-40,t:0,r:34,c:'#5ae0e8'});for(let i=0;i<2;i++)this.spawnEnemy('zombie',{x:b.x+12+i*10,elite:'roll'});}
    if(A){A.t+=dt;if(!A.done&&A.t>=A.hit){A.done=1;A.fn&&A.fn();}if(A.t>=A.T)b.act=null;return;}
    const go=(name,T,hit,fn)=>{b.act={name,t:0,T,hit,fn};b.anim=1;b.animT=T;};const P=b.phase?.75:1;
    b.t4=(b.t4==null?6:b.t4)-dt;
    if(b.t4<=0){b.t4=12*P;const xs=al.map(h=>this.heroX(h)),x0=Math.min(...xs)-6,x1=Math.max(...xs)+6;this.zone((x0+x1)/2,(x1-x0)/2+8,.7,b.dmg*.9,b,'dash','#5ae0e8');go('dash',.9,.7,()=>{this.shake=Math.max(this.shake,.35);});return;}
    if(b.t3<=0){b.t3=10*P;go('cast',.8,.45,()=>{for(let i=0;i<3;i++){const t=al[Math.floor(this.rng()*al.length)];this.proj.push({enemy:true,kind:'wisp',x:b.x-10,y:b.y-70,tx:t,dmg:b.dmg*.55,src:b,spd:110+i*20,t:0});}});return;}
    if(b.t2<=0){b.t2=9*P;const t=al[Math.floor(this.rng()*al.length)];const tx=this.heroX(t);const z=this.zone(tx,10,.6,b.dmg*.8,b,'drain','#5ae0e8');
      go('claw',.95,.6,()=>{if(t.alive&&Math.abs(this.heroX(t)-tx)<14){t.bleedT=3;t.bleedDps=b.dmg*.3;t.bleedTick=0;b.hp=Math.min(b.max,b.hp+b.dmg*1.2);this.text(b.x,this.G-70,'+'+Math.round(b.dmg*1.2),'#5ae0e8');}});return;}
    if(b.t1<=0){b.t1=3.5*P;this.zone(b.x-24,16,.5,b.dmg*1.1,b,'sweep','#5ae0e8');go('sweep',1,.5,null);return;}}
  bossAI(b,dt,sp,f){
    const al=this.alive();const k=b.type;b.walkT+=dt;b.age=(b.age||0)+dt;if(b.age>90&&!b.enraged){b.enraged=1;this.ev('enrage');}if(b.enraged)b.dmg*=1+.012*dt;   // enrage after 90s so fights always end
    const stop=k==='maw'?Math.max(f.x+b.w+30,this.W-96):f.x+b.w+(k==='countess'?14:18);
    if(b.x>stop)b.x-=Math.max(18,b.B.spd)*sp*dt*(k==='maw'?2.2:1.6);
    if(k==='countess')b.y=this.G-40+Math.sin(this.t*1.6)*10;
    b.t1-=dt;b.t2-=dt;b.t3-=dt;
    if(k==='harvest'){if(b.x<=stop+4)this.harvestAI(b,dt,al,f);return;}
    if(k==='wraith'){if(b.x<=stop+4)this.wraithAI(b,dt,al,f);return;}   /* 0.12.127: his own moves, not gated by ABILITIES_OFF */
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
  /* 0.12.68 Elite_Survivors: +10% dodge for Flannel_Man and his companion while they're within 50 world px of each other */
  eliteDodge(h){const fm=h&&h.key==='flannel'?h:h&&h.key==='flannel_pal'?h.owner:null;if(!fm||!fm.alive)return 0;const E=((fm.base.char&&fm.base.char.abilities)||[]).find(a=>a.id==='elite');if(!E)return 0;
    const pal=h.key==='flannel'?(this.pets||[]).find(p=>p.owner===fm&&p.key==='flannel_pal'&&p.alive):h;if(!pal||!pal.alive)return 0;return Math.abs(this.heroX(fm)-this.heroX(pal))<=E.r?E.dodge:0;}
  hurtMinion(m,amt,from){if(!m||m.dead)return;if(m.key==='flannel_pal'&&this.rng()<(m.dodge||0)+this.eliteDodge(m)){this.text(m.x,this.G-40,'dodge','#9ae6ff');return;}m.hp-=amt;m.hitFlash=.12;this.text(m.x,this.G-40,Math.round(amt),'#ffb0b0');}
  heroX(h){return h.x+(h.dodgeX||0)+(h.wanderX||0);}
  obHw(o){return Math.max(3,OBST[o.k].fw*.5*.5*.8);}   // half-width in world px (sheet is 2 px per world px)
  // each obstacle's footprint follows its picture: a rock blocks only under its base; the diagonal log blocks its left end in the near lane and its right end in the far lane
  obSpan(o,l){const F=OBST[o.k].foot;const i=o.lanes.length===2?(l===Math.max(...o.lanes)?0:1):0;const f=F[i]||F[0];return o.flip?[o.x-f[1],o.x-f[0]]:[o.x+f[0],o.x+f[1]];}
  /* shot vs obstacle: the shot has to be in one of its lanes and below the sprite's own outline at that spot (per-column heights baked from the art) */
  obHitsShot(o,p){if(!(o.blk>0))return false;const D=OBST[o.k];if(p.x0!=null&&Math.abs(p.x0-o.x)<D.fw/4+14)return false;   /* shooting from right behind cover: he leans out over it */if(!o.lanes.some(l=>Math.abs(LANES[l]-p.gy)<=3.5))return false;
    if(!D.prof){const l=o.lanes[0];const [a,b]=this.obSpan(o,l);return p.h<=o.blk&&p.x>=a&&p.x<=b;}
    const col=Math.floor((p.x-o.x)*(o.flip?-1:1)+D.fw/4);if(col<0||col>=D.prof.length)return false;return p.h<=D.prof[col]-1;}
  laneBlocked(l,x0,x1){for(const M of this.mines||[]){if(M!==this._ignoreMine&&!M.owner&&M.armed&&M.spotted&&M.l===l&&M.x+9>x0&&M.x-9<x1)return {mine:M};}for(const o of this.obst||[]){if(OBST[o.k].flat||OBST[o.k].pass||!o.lanes.includes(l))continue;const [a,b]=this.obSpan(o,l);if(b>x0&&a<x1)return o;}return null;}
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
    this.stepEng(dt,scroll);
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
      const big=T.src&&T.src.cthT>0?1.25:1;T.big=big;T.atkT-=dt*big;   /* 0.12.70 Call_of_Cthulhu: 25% bigger, longer reach, 25% faster */
      if(T.anim==='idle'&&T.atkT<=0){const tg=this.enemies.filter(e=>!e.dead&&!e.fly&&Math.abs(e.x-T.x)<=A.reach*big+(e.boss?e.w*.5:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-T.gy)<=A.depth)).sort((p,q)=>Math.abs(p.x-T.x)-Math.abs(q.x-T.x))[0];
        if(tg){T.atkT=A.every;T.anim='attack';T.aT=0;T.face=tg.x>=T.x?1:-1;const dir=T.face;
          setTimeoutSafe(this,.32,()=>{if(T.done)return;this.ev('hit',{});this.shake=Math.max(this.shake||0,.15);
            for(const e of this.enemies){if(e.dead||e.fly)continue;const dx=(e.x-T.x)*dir;if(dx>=-4&&dx<=A.reach*(T.big||1)+(e.boss?e.w*.5:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-T.gy)<=A.depth)){
              const d=this.hitEnemy(e,(this.rollDice(A.dice)+(A.flat||0)+(T.src.flatRanged||0)*.5)*T.mul,T.src&&T.src.alive?T.src:null,{fromTent:1});if(d)T.hp=Math.min(T.max,T.hp+d*A.steal);/* 0.12.38 (Kyle): heals 20% of the damage it deals */if(d&&!e.dead&&!e.boss){const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,A.kb/100*40*8*(1-res));e.kbDir=dir;}}}
            this.fx.push({k:'quake',x:T.x+dir*A.reach*.8,gy:T.gy,t:0,life:.4,raw:1});});}}}
    this.tentacles=this.tentacles.filter(T=>!T.done);}
  // 0.12.22 Revive (Kyle): a living hero standing on a downed ally for 5s (4s with a Herald up) helps them back to their feet with 25% HP and 0 energy.
  // 0.12.27 Scavenger (inspiration passive): herbs found on kills or foraged while marching; used on any hurt hero within 17 world px (50 screen px)
  /* 0.12.37 (Kyle): where a searcher stands: in the lane just in front of it, right beside a car's door (a bit toward its front end),
     or practically on top of a rock / stump / log (its middle) */
  searchSpot(o,h){const fl=Math.max(...o.lanes),bl=Math.min(...o.lanes)-1,fr=fl+1<LANES.length?fl+1:-1;const cur=h?h.laneI:fr;   /* the lane right in front of it or right behind it, whichever is closer */
    const nl=fr<0?bl:bl<0?fr:(Math.abs(cur-bl)<Math.abs(cur-fr)?bl:fr);const [a,b]=this.obSpan(o,fl);const mid=(a+b)/2;
    const car=/^car_/.test(o.k);if(OBST[o.k].flat)return {x:mid,lane:fl};const x=car?mid-(o.flip?-1:1)*.16*(b-a):mid;return {x,lane:Math.max(0,nl)};}
  atSpot(h,o){const S=this.searchSpot(o,h);return Math.abs(h.x-S.x)<=(/^car_/.test(o.k)?5:4)&&Math.abs((h.gy||this.G)-LANES[S.lane])<3;}
  obNear(h,o){const l=o.lanes.reduce((b,l)=>Math.abs(LANES[l]-(h.gy||this.G))<Math.abs(LANES[b]-(h.gy||this.G))?l:b,o.lanes[0]);if(Math.abs(LANES[l]-(h.gy||this.G))>7)return false;const [a,b]=this.obSpan(o,l);return h.x>a-9&&h.x<b+9;}
  stepHerbs(dt,scroll){const al=this.alive().filter(o=>!o.pet||true);
    for(const o of al){if(o.herbT>0){o.herbT-=dt;const b0=o.hp;o.hp=Math.min(o.max,o.hp+o.herbHps*dt);if(o.herbSrc&&o.herbSrc.key)this.st8(o.herbSrc).heal+=o.hp-b0;}}
    for(const h of al){const sp=insP(h);if(h.pet)continue;const RE=SEARCH_RE[sp]||/^$/,ST0=(SEARCH_T[sp]||2)*[1,.75,.6][upgT(this.run,'lamp')],full=sp==='herbalist'?(h.herbs||0)>=3:sp==='scavenger'?(h.kit||[]).length>=2:true   /* 0.12.34 (Kyle): Scavenger holds 2 items total */;
      const canAmb=o=>o.k==='car_ambulance'&&!h.medkit;   // 0.12.33: anyone can search an ambulance for a Medkit
      // searching debris: stand next to an unsearched rock/stump/log for 1.5s; chance 45% + 1.2% per Luck (max 95%)
      if(h.search&&h.search.disarm)continue;
      if(h.search){const S=h.search,o=S.o;const near=o&&this.obst&&this.obst.includes(o)&&this.atSpot(h,o);
        const close=!near&&o&&this.obst&&this.obst.includes(o)&&(()=>{const SP=this.searchSpot(o,h);return Math.abs(this.heroX(h)-SP.x)<12&&Math.abs((h.gy||this.G)-LANES[SP.lane])<8;})();   /* 0.12.156: shoved a few px off the spot: pause, step back, keep the job */
        if(close&&!this.exiting&&!o.looted){h.x-=(this.scroll||0)*dt;}
        else if(!near||this.exiting||o.looted){h.search=null;}else{const ST=searchFit(h,o)==='perk'?ST0:2.6*[1,.75,.6][upgT(this.run,'lamp')];S.T=ST;h.pauseT=Math.max(h.pauseT||0,.05);h.x-=(this.scroll||0)*dt*(o.par||1);   /* 0.12.37 (Kyle): searching means standing still at it: he stays with the wreck while the world scrolls */
          if(h.moving){continue;}S.t+=dt;   /* no progress while still moving */
          if(S.t>=(S.T||ST0)){o.looted=1;o.searched=o.searched||{};o.searched[h.key]=1;h.search=null;this.searchLoot(h,o,sp,full,RE);this.supXp(h,o.k==='city_front'||o.k==='city_lootbox'?2:1);}}}
      else{const o=(this.obst||[]).find(o=>(searchFit(h,o)||canAmb(o))&&g_free(o,h)&&this.atSpot(h,o)&&h.plan&&h.plan.intent==='search'&&h.plan.goTo&&h.plan.goTo.ob===o);   /* 0.12.37 (Kyle): searching is a decision (the Brain picked THIS object), never automatic for being in range */if(o){o.searchBy=h;h.search={o,t:0,T:ST0};if(ALARMABLE.test(o.k))this.disturb(o.x,LANES[o.lanes[0]],2,Math.max(.03,(o.k==='city_front'?.4:.25)-.006*(h.luck||0))*(.4+1.2*trait(h,'noise')),o);   /* Loud searchers set alarms off far more often */   /* careful searching: 25% minus luck (about 13% at 20 Luck), blasts are 50% */}}
      if(h.medkit&&!((h.herbCd||0)>this.t)){const thr=.62-.3*trait(h,'energy');const tg=al.filter(o=>fleshy(o)&&o.hp/o.max<thr&&Math.abs(this.heroX(o)-this.heroX(h))<=17&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
        if(tg){h.medkit=0;h.herbCd=this.t+.6;this.healHero(tg,tg.max*.35,false,h.medkitCamp?{}:h);h.medkitCamp=0;   /* a Triage-built medkit is the player's doing, not the unit's: it doesn't count toward his healing stat */this.fx.push({k:'mend',x:this.heroX(tg),gy:tg.gy||this.G,t:0,life:.8,raw:1});this.ev('heal',{});if(tg!==h)Comms.bubble(this,h,Comms.pick(['Medkit, hold still!','Patching you up!','Here, take this!']));}}
      // Scavenger: use a Medkit on anyone close under 60%, a Battery on anyone close under 30 energy who has abilities
      if(sp==='scavenger'&&(h.kit||[]).length&&!((h.herbCd||0)>this.t)){const near=al.filter(o=>Math.abs(this.heroX(o)-this.heroX(h))<=17&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6);
        const mi=h.kit.indexOf('med'),bi=h.kit.indexOf('bat');const mt=mi>=0&&near.filter(o=>fleshy(o)&&o.hp/o.max<.72-.3*trait(h,'energy')).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
        const bt=bi>=0&&near.filter(o=>o.key==='robot'&&(o.en||0)<42-24*trait(h,'energy')).sort((p,q)=>(p.en||0)-(q.en||0))[0];
        if(mt){h.kit.splice(mi,1);h.herbCd=this.t+.6;this.healHero(mt,mt.max*.25,false,h);this.fx.push({k:'mend',x:this.heroX(mt),gy:mt.gy||this.G,t:0,life:.7,raw:1});this.ev('heal',{});if(mt!==h&&Math.random()<.5)Comms.bubble(this,h,Comms.pick(['Patch up!','Here, a medkit!','Hold still.']));}
        else if(bt){h.kit.splice(bi,1);h.herbCd=this.t+.6;bt.en=Math.min(bt.enMax||100,(bt.en||0)+30);this.fx.push({k:'ring',x:this.heroX(bt),y:this.G-14,r:10,t:0,c:'#ffe060'});if(bt!==h&&Math.random()<.5)Comms.bubble(this,h,'Catch, fresh battery!');}}
      if(!(h.herbs>0)||(h.herbCd||0)>this.t)continue;
      const tg=al.filter(o=>fleshy(o)&&o.hp/o.max<.9-.3*trait(h,'energy')&&!(o.herbT>0)&&Math.abs(this.heroX(o)-this.heroX(h))<=17&&Math.abs((o.gy||this.G)-(h.gy||this.G))<6).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
      if(tg){h.herbs--;h.herbCd=this.t+.6;tg.herbT=5;tg.herbSrc=h;tg.herbHps=tg.max*.2/5*(hasPerk(h,'medicine')?1.3:1);this.fx.push({k:'mend',x:this.heroX(tg),gy:tg.gy||this.G,t:0,life:.7,raw:1});this.ev('heal',{});
        if(tg!==h&&Math.random()<.5)Comms.bubble(this,h,Comms.pick(['Here, chew this.','Herb for you!','Hold still.','This\'ll help.','Eat up!']));}}}
  stepDisarm(dt){for(const h of this.alive()){const P=h.plan;if(!P||P.intent!=='disarm'||!P.goTo||!P.goTo.ob)continue;const o=P.goTo.ob;
      if(!(o.alarmT>0)){if(h.search&&h.search.disarm)h.search=null;h.plan=null;h.alDecide=null;h.thinkT=0;continue;}   /* 0.12.102 fix: the alarm is already off (e.g. it ran out while I was down): drop the job and think again */
      if(!this.atSpot(h,o)){const SP=this.searchSpot(o,h);if(h.search&&h.search.disarm&&!(Math.abs(this.heroX(h)-SP.x)<12&&Math.abs((h.gy||this.G)-LANES[SP.lane])<8))h.search=null;continue;}   /* 0.12.156: a small shove pauses the job, it doesn't end it */
      const need=5*(1.15-.3*trait(h,'tech'))*[1,.7,.45][upgT(this.run,'cutters')];   /* 0.12.63 (Kyle): shutting an alarm off takes about 5s (Techy a bit less; Wire Cutters 30%/55% faster) */if(!h.search||!h.search.disarm)h.search={o,t:0,T:need,disarm:1};const S=h.search;h.x-=(this.scroll||0)*dt*(o.par||1);if(!h.moving)S.t+=dt;h.pauseT=Math.max(h.pauseT||0,.05);
      if(S.t>=need){o.alarmT=0;o.alarmN=0;this.supXp(h,2);h.search=null;h.plan=null;h.thinkT=0;this.fx.push({k:'ring',x:o.x,y:LANES[o.lanes[0]]-10,t:0,r:10,c:'#c8d0d8'});Comms.bubble(this,h,Comms.pick(['Alarm\'s off!','Got it!','Quiet, you.','Wires cut!','Silenced!']));}}}
  /* 0.12.51 (Kyle) ENEMY TRAPS: rusted scrap mines on tripwires, 1-5 per stage (0.12.160), dropped in random lanes ahead.
     IF a unit ahead of one rolls under its Perception (Sapper perk helps) THEN it's spotted: marked, called out, and units path around it.
     IF an unspotted one is right underfoot THEN a last-second dodge (better when Perceptive), ELSE it blows: hurts heroes AND zombies nearby.
     IF I have the Sapper perk AND one is spotted AND it's calm around it THEN I may go defuse it (faster when Techy) and keep it as a one-time mine,
     which I plant in front of zombies coming down my lane. */
  stepMines(dt,scroll){if(this.demo)return;this.mines=this.mines||[];this.stepBomblets(dt,scroll);
    if(this.mineAt==null){const n=1+Math.floor(this.rng()*5);   /* 0.12.160 (Kyle): 1-5 traps a stage */this.mineAt=[];for(let i=0;i<n;i++)this.mineAt.push(this.st.len*(.12+.76*this.rng()));this.mineAt.sort((a,b)=>a-b);}
    while(this.mineAt.length&&this.dist>=this.mineAt[0]&&!this.exiting){this.mineAt.shift();let l=Math.floor(this.rng()*LANES.length);for(let k=0;k<5&&this.laneBlocked(l,this.W+20,this.W+44);k++)l=Math.floor(this.rng()*LANES.length);
      {const r=this.rng();this.mines.push({x:this.W+30,l,gy:LANES[l],t:0,armed:true,spotted:false,chk:0,cluster:r<.3,shotgun:r>=.3&&r<.6});}}   /* 0.12.160 (Kyle): 30% cluster mines, 30% tripwire shotguns, 40% rust mines */
    const al=this.alive().filter(h=>!h.pet||h.dog);for(const h of al)this.mineClamp(h);   /* 0.12.156: re-check after dodges and shoves so nobody gets carried onto a mine they know about */
    for(const M of this.mines){M.x-=scroll*dt;M.t+=dt;if(!M.armed)continue;
      if(M.owner){if(M.t<M.arm)continue;if(bombTrig(this,M.x,M.gy))this.mineBoom(M);continue;}   /* 0.12.64: same proximity zone as the Proximity_Bomb */
      if(!M.spotted){M.chk-=dt;if(M.chk<=0){M.chk=.8;   /* 0.12.64 (Kyle): checked less often (0.5s -> 0.8s) and harder to spot */for(const h of al){const d=M.x-this.heroX(h);if(d<-10||d>75)continue;const sp=(hasPerk(h,'sapper')?.3:0)+trait(h,'perc');
          if(this.rng()<.11*(.3+1.2*sp)){M.spotted=true;   /* 0.12.156 (Kyle): spotting a touch harder (was .14) */M.by=h;this.fx.push({k:'ring',x:M.x,y:M.gy-3,t:0,r:8,c:'#ff4a3a'});Comms.bubble(this,h,Comms.pick(['Trap!','Mine, watch it!','Tripwire!','Careful, mine!']),true);for(const o of al)o.thinkT=Math.min(o.thinkT||1,.1);break;}}}}
      for(const h of al){if(h.leap||bombTrig(this,M.x,M.gy,{w0:9,w1:4.5},[h])!==h)continue;   /* 0.12.156 (Kyle): a wider trigger zone (was 6.7 / 3.3) */   /* 0.12.64 (Kyle): 40px wide in its lane, 20px wide one lane up/down (defusers work from 27px out, safely outside it) */
        if(h.defuse&&h.defuse.M===M)continue;
        if(!M.spotted&&!M.dodged){M.dodged=1;if(this.rng()<.12+.5*trait(h,'perc')){M.spotted=true;h.x-=6;h.pauseT=Math.max(h.pauseT||0,.3);Comms.bubble(this,h,Comms.pick(['Whoa! Trap!','Nearly stepped on that!','MINE!']),true);continue;}}
        if(!M.spotted||this.rng()<dt*8){this.mineBoom(M);break;}}}   /* 0.12.156: a spotted mine still goes off almost at once if you step on it (was ~2 a second) */
    this.mines=this.mines.filter(M=>M.armed&&M.x>-30);
    // defusing (Sapper)
    for(const h of al){const D=h.defuse;if(!D)continue;const M=D.M;if(M.armed&&this.mines.includes(M)&&h.plan&&h.plan.intent!=='defuse'&&h.search&&h.search.trap&&h.search.t>0&&!this.enemies.some(e=>!e.dead&&!e.fly&&Math.abs(e.x-this.heroX(h))<35)){h.plan={intent:'defuse',goTo:{mine:M},runMul:.4};h.thinkT=Math.max(h.thinkT||0,.5);}   /* 0.12.156: mid-defuse and nothing close: don't wander off to 'hold' */
      if(!M.armed||!this.mines.includes(M)||h.plan&&h.plan.intent!=='defuse'){h.defuse=null;if(h.search&&h.search.trap)h.search=null;continue;}
      if(Math.abs(h.x+(h.dodgeX||0)-(M.x-DEFUSE_D))>1.6||Math.abs((h.gy||this.G)-M.gy)>3)continue;h.wanderX=0;   /* 0.12.156 fix: his idle sway kept him off the spot, so defusing never finished; he holds still while he works */   /* defuse from DEFUSE_D (12 px) out: clear of the 9 px trigger even with a 1.6 px wobble */h.pauseT=Math.max(h.pauseT||0,.05);h.x-=scroll*dt;h.moving=false;   /* tiny nudges toward the spot counted as 'moving' and froze his progress */
      h.search=h.search&&h.search.trap?h.search:{o:M,t:0,T:D.need,disarm:1,trap:1};h.search.t+=dt;
      if(h.search.t>=D.need){h.search=null;h.defuse=null;h.plan=null;h.thinkT=0;
        if(this.rng()>defuseOdds(h)){this.mineBoom(M);Comms.bubble(this,h,Comms.pick(['Oh no.','Wrong wire!','Was it the red one?!','Uh oh.']),true);this.st8(h).fumbled=(this.st8(h).fumbled||0)+1;this.failAct(h);continue;}   /* failed: it goes off in his hands */
        M.armed=false;this.st8(h).defused=(this.st8(h).defused||0)+1;this.supXp(h,3);   /* 0.12.151: defusing a trap gives a little XP */
        if(this.rng()<(hasPerk(h,'sapper')?.75:.4)){h.mine=(h.mine||0)+1;this.fx.push({k:'herbget',x:h.x,y:(h.gy||this.G)-26,t:0,life:.9,raw:1,kit:'defib'});Comms.bubble(this,h,Comms.pick(['Disarmed. Mine now.','Got it. I\'ll save this for them.','Wire cut. Keeping it.']),true);}   /* 0.12.52 (Kyle): 75% he keeps the mine */
        else{this.gainParts(null,{x:M.x,lanes:[M.l]});Comms.bubble(this,h,Comms.pick(['Fell apart. Parts, at least.','Busted it. Spare parts.','Not usable, but salvageable.']),true);}}}   /* ...25% it comes apart into spare parts */
    // planting a defused mine in front of zombies coming down my lane
    for(const h of al){const P=h.planting;
      if(P){if(this.enemies.some(e=>!e.dead&&!e.fly&&Math.abs(e.x-this.heroX(h))<16&&Math.abs((e.gy!=null?e.gy:this.G)-(h.gy||this.G))<4)){h.planting=null;this.text(h.x,this.G-70,'interrupted','#9aa');continue;}
        P.t+=dt;h.pauseT=Math.max(h.pauseT||0,.1);if(P.t<P.T)continue;h.planting=null;h.mine--;h.mineCd=this.t+1;const gy=h.gy!=null?h.gy:this.G;const l=LANES.reduce((b,y,i)=>Math.abs(y-gy)<Math.abs(LANES[b]-gy)?i:b,0);
      /* 0.12.54 (Kyle): a planted mine is our own rust mine: 4d4, 60px blast, no stage bonus; its punch comes from who set it (Sapper +25%, Techy up to +30%, Optimal up to +10%, a little Luck) */
      const mult=1+(hasPerk(h,'sapper')?.25:0)+.3*trait(h,'tech')+.1*trait(h,'exec')+.004*Math.max(0,(h.luck||0)-10);
      this.mines.push({x:P.x,l,gy:LANES[l],t:0,armed:true,spotted:true,chk:0,owner:h,mult,arm:.6});Comms.bubble(this,h,Comms.pick(['Mine down!','Step on this.','Present for you!']),true);continue;}
      /* IF I carry a mine AND zombies are coming down my lane (not in my face yet) THEN kneel and plant it in front of me */
      if(!(h.mine>0)||(h.mineCd||0)>this.t||h.search||h.setting)continue;const lane=this.enemies.filter(e=>!e.dead&&!e.fly&&!e.boss&&Math.abs((e.gy!=null?e.gy:this.G)-(h.gy||this.G))<4&&e.x-this.heroX(h)>40&&e.x-this.heroX(h)<190);
      if(!lane.length||this.enemies.some(e=>!e.dead&&Math.abs(e.x-this.heroX(h))<16))continue;h.planting={t:0,T:plantTime(h),x:this.heroX(h)+12};h.mineCd=this.t+.5;}}
  mineBoom(M){if(!M.armed)return;M.armed=false;this.fx.push({k:'boom',x:M.x,gy:M.gy,t:0,life:1.15,raw:1,small:1});this.fx.push({k:'ring',x:M.x,y:M.gy-2,t:0,r:20,c:'#ff8a5a'});this.ev('boom',{});this.shake=Math.max(this.shake||0,.4);
    /* 0.12.157 (Kyle): an enemy rust mine is 2d4+4 (+5% a stage), 24 world px blast (72 screen px), full damage in the inner third, 60% out to the edge.
       A CLUSTER mine pops for 2d4+2 in a 30-50 screen px blast and throws 5-6 bomblets 50-150 screen px out either side (random lanes too);
       each arcs, lands, and goes off 0.25s later for 2d4+2 in its own 30-50 screen px blast. Our own planted mines are unchanged (4d4 x who set it). */
    const sc=M.owner?M.mult:(1+.05*(this.st.n-1));
    if(M.shotgun&&!M.owner){this.shotgunFire(M,sc);return;}
    if(M.cluster&&!M.owner){const R=10+this.rng()*6.7;this.blastAt(M.x,M.gy,R,R*.45,(this.rollDice([2,4])+2)*sc,null);
      const n=5+(this.rng()<.5?1:0);for(let i=0;i<n;i++){const dir=this.rng()<.5?-1:1,dx=dir*(16.7+this.rng()*33.3),dl=Math.floor(this.rng()*3)-1,l=Math.max(0,Math.min(LANES.length-1,(M.l!=null?M.l:2)+dl));
        (this.bomblets=this.bomblets||[]).push({x0:M.x,gy0:M.gy,x1:M.x+dx,gy1:LANES[l],t:0,...(()=>{const H=9+this.rng()*11;return {H,T:.28+.025*H+this.rng()*.05};})(),fuse:-1,   /* 0.12.159 (Kyle): each bomblet arcs a bit higher or lower, so they land and pop at slightly different times */
        R:10+this.rng()*6.7,dmg:(this.rollDice([2,4])+2)*sc,spin:this.rng()*6});}
      return;}
    const R=M.owner?20:24,RD=M.owner?9:10,dmg=M.owner?this.rollDice([4,4])*sc:(this.rollDice([2,4])+4)*sc;this.blastAt(M.x,M.gy,R,RD,dmg,M.owner&&M.owner.alive?M.owner:null,!!M.owner);}
  /* 0.12.158 (Kyle) TRIPWIRE SHOTGUN: a sawed-off hidden in a bush (a trash pile downtown) aimed back down its lane. Crossing the wire fires a pellet spread
     to the left: 3d4+3 point-blank falling to half at 60 world px (180 screen px) in its lane; one lane over within 40 world px takes half again. Hits zombies too. */
  /* 0.12.158 (Kyle): tripwire shotgun. One loud blast, 7 pellets fanned out to the left, 1d4 each (+5%/stage). Each pellet stops in the first body
     in its path. Anyone hit bleeds (3 per pellet over 4s) and is slowed 30% for 2.5s. Hurts heroes and zombies alike. */
  shotgunFire(M,sc){const RNG=70,N=7,offs=[];for(let i=0;i<N;i++)offs.push((i/(N-1)*2-1)*20+(this.rng()-.5)*14);   /* semi-random: each pellet wobbles inside its slice of the cone */   /* large cone: about two lanes either way at full range */
    this.fx.push({k:'pellets',x:M.x-4,gy:M.gy,t:0,life:.35,raw:1,offs,R:RNG});this.ev('shotgun',{});this.shake=Math.max(this.shake||0,.4);
    const T=[];for(const h of this.alive())T.push({u:h,hero:1,x:this.heroX(h),gy:h.gy||this.G});
    for(const e of this.enemies){if(e.dead||e.fly)continue;T.push({u:e,x:e.x,gy:e.gy!=null?e.gy:this.G});}
    const hits=new Map();
    for(const o of offs){let best=null,bd=1e9;for(const t of T){const dx=M.x-t.x;if(dx<-4||dx>RNG)continue;const py=M.gy+o*Math.max(0,dx)/RNG;if(Math.abs(t.gy-py)>4)continue;if(dx<bd){bd=dx;best=t;}}
      if(best)hits.set(best,(hits.get(best)||0)+1);}
    for(const [t,n] of hits){let d=0;for(let i=0;i<n;i++)d+=this.rollDice([1,4]);d*=sc;const u=t.u;
      if(t.hero){this.hurtHero(u,d,null);if(u.alive){this.bleed(u,3*n,4);u.slow=Math.max(u.slow||0,.3);u.slowT=Math.max(u.slowT||0,2.5);}u.x-=1.5*n*(1-Math.min(.95,u.kbRes||0));}
      else{this.hitEnemy(u,d,null,{sure:1,kb:.15*n});if(!u.dead){u.bleedT=4;u.bleedDps=Math.max(u.bleedDps&&u.bleedT>0?u.bleedDps:0,3*n/4);u.slow=Math.max(u.slow||0,.3);u.slowT=Math.max(u.slowT||0,2.5);}}}}
  blastAt(x,gy,R,RD,dmg,owner,ours){const inB=(px,pgy)=>{const dx=px-x,dz=pgy-gy;const q=(dx/R)**2+(dz/RD)**2;return q<=1?(q<=1/9?1:.6):0;};
    for(const h of this.alive()){if(ours&&!this.hardcore)break;const f=inB(this.heroX(h),h.gy||this.G);if(!f)continue;this.hurtHero(h,dmg*f,null);h.x-=Math.sign(x-this.heroX(h)||1)*6*(1-Math.min(.95,h.kbRes||0));}
    for(const e of this.enemies){if(e.dead||e.fly)continue;const f=inB(e.x,e.gy!=null?e.gy:this.G);if(!f)continue;this.hitEnemy(e,dmg*f,owner,{blast:1,bx:x,sure:1});}}
  /* 0.12.175 Screamer: IF she's on screen AND a hero is within 115 AND she has a shriek left (2, 14s apart) THEN she stops and shrieks for 1.4s.
     Halfway through, the call goes out: 2-4 zombies (+1 every 5 stages, max 6) come running in from the right. Killed or stunned before then: no call. */
  screamAI(e,dt,scroll,al){const SC=e.E.scream;if(e.scrCd>0)e.scrCd-=dt;
    if(e.scrT>0){e.x-=scroll*dt;e.scrT-=dt;e.moving=false;e.ringT=(e.ringT||0)-dt;if(e.ringT<=0&&!e.scrDone){e.ringT=.22;this.fx.push({k:'ring',x:e.x+e.face*3,y:(e.gy!=null?e.gy:this.G)-15,t:0,r:14,c:'#ff8a8a'});}
      if(!e.scrDone&&e.scrT<=SC.T*.5){e.scrDone=1;this.screamCall(e);}return true;}
    if((e.scrN||0)>=SC.max||e.scrCd>0||e.x>this.W-14||!al.length)return false;
    let near=null,nd=1e9;for(const h of al){const d=Math.abs(this.heroX(h)-e.x);if(d<nd){nd=d;near=h;}}
    if(!near||nd>SC.r)return false;
    e.scrT=SC.T;e.scrDone=0;e.scrN=(e.scrN||0)+1;e.scrCd=SC.cd;e.face=this.heroX(near)>e.x?1:-1;e.ringT=0;this.ev('shriek',{});this.text(e.x,(e.gy!=null?e.gy:this.G)-30,'SHRIEK!','#ff6a6a');return true;}
  screamCall(e){const SC=e.E.scream,n=this.st.n||1;let k=SC.n[0]+Math.floor(this.rng()*(SC.n[1]-SC.n[0]+1))+Math.floor((n-1)/5);k=Math.min(6,k);
    const live=this.enemies.filter(x=>!x.dead).length;k=Math.max(0,Math.min(k,30-live));
    for(let i=0;i<k;i++)this.spawnEnemy(this.pickType(),{x:this.W+10+this.rng()*40,elite:'roll'});
    if(k)this.text(e.x,(e.gy!=null?e.gy:this.G)-38,'+'+k+' coming!','#ffb0b0');}
  /* 0.12.175 the Soldier's Frag_Grenade going off: the pack's explosion, blast damage (heroes only in Hardcore), and a stun on every zombie caught */
  fragBoom(b){this.fx.push({k:'frag',x:b.x1,gy:b.gy1,t:0,life:.75,raw:1});this.fx.push({k:'ring',x:b.x1,y:b.gy1-2,t:0,r:b.R,c:'#ffd27a'});this.ev('boom',{big:1});this.shake=Math.max(this.shake||0,.4);
    const inB=(px,pgy)=>{const dx=px-b.x1,dz=(pgy-b.gy1)/.45;return dx*dx+dz*dz<=b.R*b.R;};
    const caught=this.enemies.filter(e=>!e.dead&&!e.fly&&inB(e.x,e.gy!=null?e.gy:this.G));this.blastAt(b.x1,b.gy1,b.R,b.R*.45,b.dmg,b.owner&&b.owner.alive?b.owner:null,1);
    for(const e of caught){if(e.dead)continue;e.stun=Math.max(e.stun||0,e.boss?b.stun*.4:b.stun);if(!e.boss)this.text(e.x,(e.gy!=null?e.gy:this.G)-26,'STUN','#ffe07a');}}
  stepBomblets(dt,scroll){const B=this.bomblets;if(!B||!B.length)return;
    for(const b of B){b.x0-=scroll*dt;b.x1-=scroll*dt;if(b.fuse<0){b.t+=dt;b.spin+=dt*14;if(b.t>=b.T){b.fuse=b.fz!=null?b.fz:.25;this.fx.push({k:'puff',x:b.x1,y:b.gy1-1,t:0,life:.3,s:.6});}}
      else{b.fuse-=dt;if(b.fuse<=0){b.done=1;if(b.frag){this.fragBoom(b);continue;}this.fx.push({k:'boom',x:b.x1,gy:b.gy1,t:0,life:.8,raw:1,small:1});this.fx.push({k:'ring',x:b.x1,y:b.gy1-2,t:0,r:b.R,c:'#ffb05a'});this.ev('boom',{});this.shake=Math.max(this.shake||0,.25);this.blastAt(b.x1,b.gy1,b.R,b.R*.45,b.dmg,null);}}}
    this.bomblets=B.filter(b=>!b.done);}
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
    if(o.k==='city_front'){   /* 0.12.119 (Kyle): looting a storefront always pays, by what kind of shop it is */
      const S2=o.shop;got=1;const gold=(a,b)=>{const gd=a+Math.floor(this.rng()*(b-a+1)+luck*.1);this.stageGold+=gd;this.text(o.x,LANES[0]-30,'+'+gd,'#ffd23f');};
      if(S2==='deli'||S2==='liquor'){this.gainSupply(h,o);if(this.rng()<.4)this.gainSupply(h,o);Comms.bubble(this,h,pick(S2==='deli'?['Sandwich meat... still sealed!','Deli\'s got food!']:['Bottled water and... other bottles.','Liquor store run!']));}
      else if(S2==='hardware'){this.gainParts(h,o);this.gainParts(h,o);if(this.rng()<.5)this.gainParts(h,o);Comms.bubble(this,h,pick(['Tools and wire!','Hardware store, jackpot!','Duct tape fixes everything.']));}
      else if(S2==='grocery'){this.gainSupply(h,o);this.gainSupply(h,o);   /* 0.12.140 (Kyle): a grocery always gives 2 */Comms.bubble(this,h,pick(['Canned food!','Bottled water, jackpot!','Still some stock on the shelves!']));}
      else if(S2==='pharmacy'){if(fleshy(h)&&(h.kit||[]).length<2&&this.rng()<.7){(h.kit=h.kit||[]).push('med');pop('med');}else if((h.herbs||0)<3){h.herbs=(h.herbs||0)+1;pop();}if(this.rng()<.4)this.gainSupply(h,o);Comms.bubble(this,h,pick(['Painkillers!','Bandages, nice!','The pharmacy\'s not empty!']));}
      else if(S2==='pawn'){this.gainParts(h,o);if(this.rng()<.5)this.gainParts(h,o);gold(3,8);Comms.bubble(this,h,pick(['Pawn shop goodies!','Tools and scrap!','This was somebody\'s stuff once.']));}
      else{gold(10,22);Comms.bubble(this,h,pick(['The register\'s still full!','Cash drawer!','Money\'s no good now... I\'ll take it anyway.']));}}
    if(o.k==='city_lootbox'){   /* 0.12.119 (Kyle): loot boxes always pay out something, for anyone; a Scavenger digs deeper (below) */
      const r=this.rng();got=1;if(r<.35)this.gainParts(h,o);else if(r<.65)this.gainSupply(h,o);
      else{const gd=5+Math.floor(this.rng()*8+luck*.1);this.stageGold+=gd;this.text(o.x,LANES[o.lanes[0]]-30,'+'+gd,'#ffd23f');}
      if(this.rng()<.25+.005*luck&&(h.kit||[]).length<2&&fleshy(h)){(h.kit=h.kit||[]).push('med');pop('med');}
      Comms.bubble(this,h,pick(['Loot box!','Ooh, what\'s in here?','Supply drop!','Somebody left the good stuff.']));}
    if(sp==='scavenger'&&RE.test(o.k)&&this.rng()<ch){const r=this.rng();got=1;
      if(r<.35){this.gainSupply(h,o);}
      else if(r<.6){this.gainParts(h,o);}
      else if(r<.85&&!full){const it=this.heroes.some(o=>o.key==='robot')&&this.rng()<.4?'bat':'med';   /* 0.12.105 (Kyle): batteries only turn up when there's a Warhound to run on them */(h.kit=h.kit||[]).push(it);pop(it);Comms.bubble(this,h,it==='med'?pick(['Medkit!','Bandages!','First aid!']):pick(['A battery!','Still has juice!','Power cell!']));}
      else{const gd=2+Math.floor(this.rng()*5);this.stageGold+=gd;this.text(o.x,LANES[o.lanes[0]]-30,'+'+gd,'#ffd23f');Comms.bubble(this,h,pick(['Scrap!','Spare change!','Something shiny!']));}}
    else if(sp==='herbalist'&&o.k!=='car_ambulance'&&RE.test(o.k)&&this.rng()<ch&&(h.herbs||0)<3){h.herbs=(h.herbs||0)+1;pop();got=1;Comms.bubble(this,h,pick(['Found one!','An herb!','Aha!','Lucky!']));}
    /* 0.12.58: without the perk for it, a search rarely turns anything up */
    if(!got&&o.k!=='car_ambulance'&&searchFit(h,o)==='weak'){const car=CONTAINER.test(o.k);
      if(car&&sp!=='scavenger'&&this.rng()<Math.min(.4,.14+.004*luck+.1*tech+.05*perc)){got=1;if(this.rng()<.6)this.gainParts(h,o);else this.gainSupply(h,o);}
      else if(!car&&sp!=='herbalist'&&(h.herbs||0)<1&&this.rng()<Math.min(.35,.12+.004*luck+.12*perc)){h.herbs=1;pop();got=1;Comms.bubble(this,h,pick(['Huh, an herb.','Is this one edible?','Found something green.']));}}
    if(!got){this.failAct(h);this.fx.push({k:'poof',x:o.x,y:(LANES[o.lanes[0]])-10,t:0});Comms.bubble(this,h,pick(['Nothing.','Empty.','Just dirt.','Picked clean.']));}}
  gainParts(h,o){const n=1+(this.rng()<.5?1:0);this.stageParts=(this.stageParts||0)+n;this.text(o?o.x:h.x,(o?LANES[o.lanes[0]]:this.G)-30,'+'+n+' PARTS','#c8d0d8');if(h)Comms.bubble(this,h,Comms.pick(['Spare parts!','Useful bits.','Gears and wire!']));}
  gainSupply(h,o){const w=this.rng()<.5;if(w)this.stageWater=(this.stageWater||0)+1;else this.stageFood=(this.stageFood||0)+1;this.text(o?o.x:h.x,(o?LANES[o.lanes[0]]:this.G)-36,w?'+1 WATER':'+1 FOOD',w?'#7fd0ff':'#e8b060');
    if(h)Comms.bubble(this,h,w?Comms.pick(['Clean water!','A bottle!','Water!']):Comms.pick(['Canned food!','Rations!','Still sealed!']));}
  /* 0.12.104 (Kyle): a mechanical check that keeps units on track (no thinking, just "is this job actually moving?").
     Every job a unit walks to (helping someone up, an alarm, a search, a mine, an herb, a pickpocket try) must show progress:
     the unit is getting closer, or the job's own timer is going up. After 6s with neither, the job is dropped, the unit stands up
     and thinks again, and that same target is skipped for 5s. Units that went down or are mid-ability are left alone. */
  stepWatchdog(dt){for(const h of this.heroes)if(h.alertT>0){h.alertT-=dt;if(h.alertT<=0)h.acc-=10;}
    {const S_=this.heroes.find(o=>o.key==='shoshi'&&o.alive);for(const o of this.heroes){const on=!!S_&&o!==S_&&o.alive&&Math.abs(this.heroX(o)-this.heroX(S_))<100;if(on&&!o.olAcc){o.olAcc=1;o.acc+=5;}else if(!on&&o.olAcc){o.olAcc=0;o.acc-=5;}}}   /* Always_Online: target calls on the headset */
    for(const h of this.heroes)if(h.key==='shoshi'){const on=h.alive&&h.pingT>0;if(h.pingT>0)h.pingT-=dt;if(on&&!h.pingOn){h.pingOn=1;h.mvMul+=.4;}else if(!on&&h.pingOn){h.pingOn=0;h.mvMul-=.4;}}   /* Circle_Ping speed */
    for(const h of this.heroes)if(h.cap&&h.cap.adren){const on=h.alive&&h.hp/h.max<.4;if(on&&!h.adrOn){h.adrOn=1;h.meleeSpd+=.25;h.rangedSpd+=.25;h.mvMul+=.15;}else if(!on&&h.adrOn){h.adrOn=0;h.meleeSpd-=.25;h.rangedSpd-=.25;h.mvMul-=.15;}}   /* Adrenaline talent */   /* Radio Shack ALERT wears off */
    const JOB=/^(revive|disarm|search|defuse|herb|sneak)$/;
    for(const u of this.heroes.concat(this.pets||[])){if(!isFinite(u.gy))u.gy=LANES[u.laneI!=null&&LANES[u.laneI]?u.laneI:2];if(!isFinite(u.x))u.x=60;}   /* bad numbers never stick: a unit with no lane height or position gets put back on a lane */
    for(const h of this.alive()){if(h.pet)continue;const P=h.plan;const tgt=P&&(P.reviveD||(P.goTo&&(P.goTo.ob||P.goTo.mine))||P.goTo);
      if(!P||!JOB.test(P.intent||'')||!tgt||h.cast||h.rush){h._wd=null;continue;}
      const prog=(tgt.revT||0)+(h.search&&h.search.t||0)+(tgt.disT||0),dist=Math.abs((tgt.x!=null?tgt.x:h.x)-h.x);
      const W=h._wd;if(!W||W.tgt!==tgt||W.intent!==P.intent){h._wd={tgt,intent:P.intent,t:0,prog,dist};continue;}
      if(prog>W.prog+.05||dist<W.dist-3){W.t=0;W.prog=prog;W.dist=dist;continue;}
      W.t+=dt;
      if(P.intent==='revive'&&W.t>=2.5&&tgt.downed&&dist<60){tgt.x=h.x+(tgt.x>h.x?5:-5);tgt.gy=h.gy||tgt.gy;tgt.laneI=h.laneI!=null?h.laneI:tgt.laneI;W.t=0;W.dist=0;   /* blocked by a wreck or a lane: he reaches over and pulls the body to him */
        if(this.debugWD)this.debugWD.push([h.key,'pull',+this.t.toFixed(1)]);continue;}
      if(W.t<6)continue;
      h._wd=null;h.plan=null;h.thinkT=0;h.revDecide={D:P.reviveD||null,until:this.t+5,go:false};h.alDecide=P.intent==='disarm'?{o:tgt,until:this.t+5,go:false}:h.alDecide;
      if(h.search)h.search=null;if(h.defuse&&P.intent==='defuse')h.defuse=null;h.pauseT=0;h.animM=0;
      if(this.debugWD)this.debugWD.push([h.key,P.intent,+this.t.toFixed(1),Math.round(h.x),Math.round(h.gy||0),tgt.key||tgt.k,Math.round(tgt.x),Math.round(tgt.gy||0),!!tgt.alive,!!tgt.downed,+(tgt.revT||0).toFixed(1),!!(h.riseT>0),h.moving]);}}
  /* 0.12.104 Sandbag Wall (camp item). IF I carry sandbags AND a pack of 4+ is coming down a lane (3+ late in the stage, or 3+ already close)
     THEN heave the wall into that lane, as far out as it can still land in front of them: aim for about 3/4 across the screen
     (mid-to-far right), never behind the zombies, never in my own face. 0.7s heave, then it lands. */
  stepSandbags(dt,scroll){const SB=[null,{hp:70,acc:0,barb:0},{hp:110,acc:8,barb:0},{hp:140,acc:8,barb:3}];
    for(const h of this.alive()){if(!h.sandbag||h.pet)continue;
      if(h.sbThrow){const T=h.sbThrow;T.t+=dt;T.x-=scroll*dt;h.pauseT=Math.max(h.pauseT||0,.05);if(T.t<.7)continue;h.sbThrow=null;
        const A=Object.assign({depth:8,behind:40},SB[h.sandbag]);const B=this.blds=this.blds||[];B.push({bld:1,k:'sandbag',x:T.x,gy:T.gy,hp:A.hp,max:A.hp,A,owner:h,t:0});h.sandbag=0;
        this.fx.push({k:'puff',x:T.x,y:T.gy-2,t:0,life:.6,s:2});this.text(T.x,T.gy-34,'SANDBAGS!','#d8c08a');this.shake=Math.max(this.shake||0,.15);continue;}
      if((h.sbCd||0)>this.t)continue;h.sbCd=this.t+.4;
      const hx=this.heroX(h),live=this.enemies.filter(e=>!e.dead&&!e.fly&&!e.boss&&e.x<this.W+30&&e.x>hx+20);let best=null;
      for(let li=0;li<LANES.length;li++){const l=LANES[li],ln=live.filter(e=>Math.abs((e.gy!=null?e.gy:this.G)-l)<=8);if(!ln.length)continue;
        const front=Math.min(...ln.map(e=>e.x)),close=ln.filter(e=>e.x-hx<110).length;
        if((ln.length>=(this.dist>this.st.len*.6?3:4)||close>=3)&&(!best||ln.length>best.n))best={l,n:ln.length,front};}
      if(!best)continue;if((this.blds||[]).some(b=>b.k==='sandbag'&&b.hp>0&&Math.abs(b.gy-best.l)<=8&&b.x>hx))continue;
      const tx=Math.min(this.W*.78,best.front-14);if(tx<hx+22)continue;   /* too late to get it in front of them */
      h.sbThrow={t:0,x:tx,gy:best.l};h.animM=.5;h.face=1;Comms.bubble(this,h,Comms.pick(['Sandbags out!','Wall going down!','Heads up, bags!']),true);this.ev('whoosh',{});}}
  /* 0.12.104 (Kyle): allies don't walk through a HESCO cell any more. It has a little ladder on its left side: a unit
     that reaches it climbs up and drops down the far side (about 0.9s). Coming back from the right he climbs over it too.
     A Sandbag Wall is low, so it's a quick hop (0.45s). Downed bodies, pets and anyone mid-ability are left alone. */
  stepClimb(dt,scroll){const B=(this.blds||[]).filter(b=>(b.k==='barrier'||b.k==='sandbag')&&b.hp>0);
    for(const h of this.alive()){if(h.dog)continue;const px=h._cpx;h._cpx=h.x;
      if(h.climb){const C=h.climb;C.t+=dt;C.x0-=scroll*dt;C.x1-=scroll*dt;const u=Math.min(1,C.t/C.T);h.x=C.x0+(C.x1-C.x0)*(u<.55?u*.25/.55:.25+(u-.55)/.45*.75);
        h.leapH=C.H*(u<.55?u/.55:Math.max(0,1-(u-.55)/.45*1.2));h.pauseT=Math.max(h.pauseT||0,.05);h.face=C.x1>C.x0?1:-1;h._cpx=h.x;
        if(u>=1){h.climb=null;h.leapH=0;h.x=C.x1;h._cpx=h.x;}continue;}
      if(px==null||h.jet||h.rush||h.perch||h.sbThrow)continue;
      for(const b of B){if(Math.abs((h.gy||this.G)-b.gy)>b.A.depth)continue;const L=b.x-8,R=b.x+9;
        const right=px<L&&h.x>=L,left=px>R&&h.x<=R;if(!right&&!left)continue;
        if(h._tx!=null&&!this.exiting&&(right?h._tx<R+6:h._tx>L-6)){h.x=right?L:R;h._cpx=h.x;break;}   /* only climb when he's actually going somewhere past it; shuffling around next to it, he just stops at it */
        const low=b.k==='sandbag';h.climb={t:0,T:low?.45:.9,x0:right?L:R,x1:right?R+1:L-1,H:low?9:19};h.x=h.climb.x0;h._cpx=h.x;break;}}}
  /* 0.12.107 Shadow_Clone, detached (Kyle). The copy steps out and goes its own way: it picks a zombie that ISN'T the one he's
     fighting (one bothering an ally first, else the nearest other one), runs over at 1.5x his speed and swings his sword for
     `mirror` of a normal hit (40%, 60% with Twin Shadows) on his swing timer. Every zombie it hits turns to fight it for a moment
     (they stop going for the party). It fades when its time runs out or if he goes down. */
  stepClones(dt,scroll){if(!this.clones||!this.clones.length)return;
    for(const c of this.clones){const h=c.owner;c.t+=dt;c.x-=scroll*dt;if(c.animM>0)c.animM-=dt;if(!h.alive||c.t>=c.life){c.done=1;this.fx.push({k:'poof',x:c.x,y:c.gy-20,t:0});continue;}
      const live=this.enemies.filter(e=>!e.dead&&!e.fly&&e.x<this.W+4);const mine=h._mt&&!h._mt.dead?h._mt:null;
      if(!c.tgt||c.tgt.dead){const bother=live.filter(e=>e!==mine&&this.alive().some(o=>o!==h&&!o.pet&&Math.abs(this.heroX(o)-e.x)<26));
        const pool=(bother.length?bother:live.filter(e=>e!==mine)).length?(bother.length?bother:live.filter(e=>e!==mine)):live;
        c.tgt=pool.sort((p,q)=>Math.abs(p.x-c.x)+Math.abs((p.gy||this.G)-c.gy)*2-Math.abs(q.x-c.x)-Math.abs((q.gy||this.G)-c.gy)*2)[0]||null;}
      const T=c.tgt;if(!T){c.moving=false;const hx=this.heroX(h)-(h.face||1)*12;const d=hx-c.x;if(Math.abs(d)>2){c.x+=Math.sign(d)*Math.min(Math.abs(d),(MOVE.chibi||20)*1.5*dt);c.moving=true;c.face=d>0?1:-1;c.walkT+=dt;}continue;}
      const tgy=T.gy!=null?T.gy:this.G;const dx=T.x-c.x-(T.x>c.x?9:-9),dz=tgy-c.gy;c.face=T.x>=c.x?1:-1;
      if(Math.abs(dx)>1.5||Math.abs(dz)>1){const sp=(MOVE.chibi||20)*1.5*dt;c.x+=Math.sign(dx)*Math.min(Math.abs(dx),sp);c.gy+=Math.sign(dz)*Math.min(Math.abs(dz),sp*.6);c.moving=true;c.walkT+=dt;}else c.moving=false;
      c.atkT-=dt;const C=h.base.char;
      if(Math.abs(T.x-c.x)<=12&&Math.abs(tgy-c.gy)<=4&&c.atkT<=0){c.atkT=(C.melee.every||1.2)/((h.meleeSpd||1)*(h.aspd||1));c.animM=.35;
        const roll=(this.rollDice(C.melee.dice)+(C.melee.flat||0)+(h.flatMelee||0))*(h.atk/h.base.atk)*(h.meleeDmg||1)*(h.cryDmg||1);
        this.hitEnemy(T,roll*(c.mirror||.4),h,{nocrit:1});this.fx.push({k:'slash',x:T.x-2,y:(tgy)-20,t:0});
        if(!T.dead&&!T.boss){T.distractT=Math.max(T.distractT||0,.9);T.distractX=c.x;}}}   /* the zombie turns on the clone */
    this.clones=this.clones.filter(c=>!c.done);for(const h of this.heroes)if(h.cloneT>0&&!(this.clones||[]).some(c=>c.owner===h))h.cloneT=0;}
  stepRevive(dt){const downs=this.heroes.concat((this.pets||[]).filter(p=>p.dog)).filter(h=>!h.alive&&h.downed);if(!downs.length)return;
    const al=this.alive().filter(o=>!o.pet);const herald=o=>(o.base.char&&o.base.char.abilities||[]).some(a=>a.id==='herald');
    for(const d of downs){if(d.swT&&this.t>=d.swT){d.swT=0;this.text(d.x,(d.gy||this.G)-40,'SECOND WIND!','#7dff9a');this.revive(d);continue;}
      if(!isFinite(d.gy))d.gy=LANES[d.laneI!=null&&LANES[d.laneI]?d.laneI:2];if(!isFinite(d.x))d.x=60;   /* 0.12.104 fix: the dog's body could end up with no lane height (NaN), so nobody could ever reach it */if(!d.dog){if(d.x<10)d.x=10;if(d.x>this.W-10)d.x=this.W-10;}   /* (a downed dog that scrolls off is still left behind, as before) */if(d.gy!=null){let bi=0;for(let i=1;i<LANES.length;i++)if(Math.abs(LANES[i]-d.gy)<Math.abs(LANES[bi]-d.gy))bi=i;d.laneI=bi;}   /* 0.12.104 fix: a body that was dragged (Protect_the_Familia) or knocked between lanes kept its old lane, so helpers knelt one lane off and never got anywhere */   /* 0.12.104 fix: a body that scrolled to the screen edge stays where helpers can reach it (the dog could slide off-screen and everyone kneeled at the edge forever) */
      const helpers=al.filter(o=>Math.abs(o.x-d.x)<9&&Math.abs((o.gy||this.G)-(d.gy||this.G))<4.5&&!(o.riseT>0));const need=(helpers.some(herald)?4:5)*(1-Math.min(.5,Math.max(0,...helpers.map(o=>o.revBonus||0))))*(1-[0,.2,.4][(!this.demo&&this.run&&upgT(this.run,'stretch'))||0]);d.revNeed=need;   /* 4s when the Herald is the one helping, 5s for everyone else */
      {const df=helpers.find(o=>o.defib);if(df){df.defib=0;this.fx.push({k:'ring',x:d.x,y:(d.gy||this.G)-10,t:0,r:16,c:'#9ad0ff'});this.fx.push({k:'arc',x:d.x,gy:d.gy||this.G,t:0,life:.4,dir:1,raw:1});this.ev('zap',{});Comms.bubble(this,df,Comms.pick(['Clear!','Shocking you awake!','Get up!']),true);this.st8(df).revives++;this.revive(d);continue;}}   /* 0.12.38 Defibrillator: one use, instant revive */
      if(helpers.length){d.revT=(d.revT||0)+dt;if(!d.revCall){d.revCall=1;Comms.say(this,helpers[0],'reviving',{ally:d});}}
      else{d.revT=Math.max(0,(d.revT||0)-dt*.5);if(d.revT<=0)d.revCall=0;}
      if(d.revT>=need){if(helpers[0]){this.st8(helpers[0]).revives++;for(const o of helpers)this.supXp(o,3.5);}this.revive(d,helpers.some(o=>hasPerk(o,'medicine')));}}}
  revive(h,med){if(h.dog){h.alive=true;h.downed=0;h.hits=2;h.hp=h.max*2/h.hitsMax;h.revT=0;h.revCall=0;h.invulnT=1.3;h.plan=null;h.thinkT=0;this.fx.push({k:'ring',x:h.x,y:(h.gy||this.G)-8,t:0,r:10,c:'#ffe08a'});Comms.bubble(this,h,'*happy bark*',true);return;}   /* back up with 2 hits */
    h.alive=true;h.downed=0;h.hp=Math.max(1,h.max*(med?.35:.25));h.en=0;h.revT=0;h.revCall=0;h.riseT=1.1;h.riseT0=1.1;h.invulnT=1.3;h.plan=null;h.thinkT=0;h.bleedT=0;h.hotT=0;
    this.fx.push({k:'ring',x:h.x,y:this.G-10,r:16,t:0,c:'#7dff9a'});this.ev('heal',{});this.text(h.x,this.G-56,'+'+Math.round(h.hp),'#7dff9a');
    Comms.bubble(this,h,Comms.pick(['Thanks!','I\'m up!','Back in it!','Not done yet!','Owe you one!','Still kicking!']));}
  tryResurge(h){if((this.resurgeT||-99)>this.t||h.pet)return false;const D=this.alive().find(o=>o!==h&&o.base&&o.base.char&&(o.base.char.abilities||[]).some(a=>a.id==='resurge'));if(!D)return false;
    const A=D.base.char.abilities.find(a=>a.id==='resurge');this.resurgeT=this.t+(A.icd||25)*(1-(D.cdr||0));h.hp=1;h.invulnT=A.dur;h.bleedT=0;h.hotT=A.dur;h.hotTick=0;h.hotSrc=D;h.hotEvery=.5;h.hotAmt=h.max*A.heal/(A.dur/.5);
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
  /* 0.12.105 Grenade_Launcher. A lobbed grenade: IF it reaches a zombie in the air THEN it blows on impact. Otherwise it lands,
     and from up high (the watchtower) it comes down hard enough to BOUNCE a couple of times before it settles into a roll, so it
     carries further; from standing height it just rolls. It blows on touching a zombie while rolling, or 0.45s after it stops
     (never later than 3s). Accuracy decides whether the lob is on target or lands a little short or long. */
  launchNade(h,tg,dmg,GL){const hx=this.heroX(h),dir=tg.x>=hx?1:-1;h.face=dir;this.ev('gun',{});
    const acc=h.moving?Math.max(1,h.acc-(h.base.char.ranged.walkPenalty||h.base.char.walkPenalty||0)):h.acc,hit=this.rng()<Math.min(.92,.5+acc/60);
    const off=hit?0:(this.rng()<.5?-1:1)*(8+this.rng()*14);const tx=tg.x+off,tgy=tg.gy!=null?tg.gy:this.G;
    const z0=12+(h.leapH||0),zEnd=hit?9:0,T=Math.max(.35,Math.min(.95,Math.abs(tx-hx)/150)),G=360;
    const N={high:(h.leapH||0)>=25,x:hx+dir*5,gy:h.gy||this.G,gy0:h.gy||this.G,gy1:tgy,z:z0,vx:(tx-hx-dir*5)/T,vz:(zEnd-z0+.5*G*T*T)/T,G,t:0,T,st:'fly',rot:0,bounces:0,dmg,GL,src:h,dir,fuseT:0,life:0};
    (this.glNades=this.glNades||[]).push(N);}
  stepGlNades(dt,scroll){if(!this.glNades||!this.glNades.length)return;
    for(const N of this.glNades){N.life+=dt;N.x-=scroll*dt;N.x+=N.vx*dt;
      const touch=()=>this.enemies.find(e=>!e.dead&&!e.fly&&Math.abs(e.x-N.x)<(e.boss?e.w*.5:5)&&Math.abs((e.gy!=null?e.gy:this.G)-N.gy)<=5&&N.z<20);
      if(N.st==='fly'){N.t+=dt;N.gy=N.gy0+(N.gy1-N.gy0)*Math.min(1,N.t/N.T);N.vz-=N.G*dt;N.z+=N.vz*dt;N.rot+=dt*14*N.dir;
        const e=touch();if(e){this.nadeBoom(N,e);continue;}
        if(N.z<=0){N.z=0;N.gy=N.gy1;const imp=-N.vz;
          if(N.high&&imp>95&&N.bounces<2){N.bounces++;N.vz=imp*.42;N.vx*=.78;this.fx.push({k:'puff',x:N.x,y:N.gy-1,t:0,life:.3,s:.6});}   /* hit hard (from height): bounce */
          else{N.st='roll';N.vz=0;N.vx*=N.bounces?.7:.5;}}}
      else if(N.st==='roll'){N.rot+=N.vx*dt*.35;const fr=70*dt;N.vx=Math.abs(N.vx)<=fr?0:N.vx-Math.sign(N.vx)*fr;
        const e=touch();if(e){this.nadeBoom(N,e);continue;}
        if(N.vx===0){N.fuseT+=dt;if(N.fuseT>=N.GL.fuse){this.nadeBoom(N,null);continue;}}}
      if(N.life>=N.GL.maxT||N.x<-20||N.x>this.W+40)this.nadeBoom(N,null);}
    this.glNades=this.glNades.filter(N=>!N.done);}
  nadeBoom(N,hitE){if(N.done)return;N.done=1;const GL=N.GL,h=N.src&&N.src.alive?N.src:null;this.fx.push({k:'boom',x:N.x,gy:N.gy,t:0,life:.9,raw:1},{k:'crack',x:N.x,gy:N.gy,t:0,life:2.5,raw:1,r:GL.r*.6});this.ev('boom',{});this.shake=Math.max(this.shake||0,.35);
    for(const e of this.enemies){if(e.dead)continue;const dx=Math.max(0,Math.abs(e.x-N.x)-(e.boss?e.w*.4:0)),dz=e.fly?0:Math.abs((e.gy!=null?e.gy:this.G)-N.gy);const d=Math.hypot(dx,dz*1.6);
      const full=e===hitE||d<3;if(!full&&d>GL.r)continue;this.hitEnemy(e,N.dmg*(full?1:GL.splash),h,{sure:1,nocrit:!full,quiet:1});
      if(!e.dead&&!e.boss){const res=(e.E&&e.E.kbRes)||0;e.kbv=Math.max(e.kbv||0,GL.kb/100*40*8*(1-res)*(full?1:.5));e.kbDir=e.x>=N.x?1:-1;}}}
  stepRobot(dt,scroll){
    if(this.bottles&&this.bottles.length){for(const B of this.bottles){B.t+=dt;B.x0-=scroll*dt;B.x1-=scroll*dt;B.rot+=dt*11;const u=Math.min(1,B.t/B.T);B.x=B.x0+(B.x1-B.x0)*u;B.gy=B.gy0+(B.gy1-B.gy0)*u;B.hgt=14*(1-u)+62*Math.sin(Math.PI*u);
        if(u>=1&&!B.done){B.done=1;this.ev('shatter',{});this.fx.push({k:'glass',x:B.x1,gy:B.gy1,t:0,life:.9,raw:1});
          for(const e of this.enemies){if(e.dead||e.boss||e.fly)continue;if(Math.abs(e.x-B.x1)<=B.A.r&&Math.abs((e.gy!=null?e.gy:this.G)-B.gy1)<=14){e.distractT=B.A.dur;e.distractX=B.x1+(this.rng()*2-1)*6;e.target=null;e.plan=null;}}}}
      this.bottles=this.bottles.filter(B=>!B.done);}
    if(this.missiles&&this.missiles.length){for(const M of this.missiles){M.t+=dt;M.x0-=scroll*dt;M.tx-=scroll*dt;const u=Math.min(1,M.t/M.T);M.x=M.x0+(M.tx-M.x0)*u;M.gyNow=M.gy+(M.tgy-M.gy)*u;M.hgt=(1-u)*(23+(M.h0||0)*.6)+46*Math.sin(Math.PI*u);
        M.trail-=dt;if(M.trail<=0){M.trail=.035;this.fx.push({k:'puff',x:M.x,y:M.gyNow-M.hgt,t:0,life:.7+this.rng()*.3,s:.6+this.rng()*.5,raw:1});}
        if(u>=1&&!M.done){M.done=1;this.fx.push({k:'boom',x:M.x,gy:M.tgy,t:0,life:.8,raw:1,small:1});this.ev('boom',{});this.shake=Math.max(this.shake||0,.25);
          for(const e of this.enemies){if(e.dead||e.fly)continue;if(Math.abs(e.x-M.x)<=M.A.r+(e.boss?e.w*.5:0)&&(e.boss||Math.abs((e.gy!=null?e.gy:this.G)-M.tgy)<=8))this.hitEnemy(e,(this.rollDice(M.A.dice)+(M.src.flatRanged||0)*.5)*M.mul,M.src&&M.src.alive?M.src:null,{blast:1});}
          if(this.hardcore)for(const o of this.alive()){if(Math.abs(this.heroX(o)-M.x)<=M.A.r&&Math.abs((o.gy||this.G)-M.tgy)<=8)this.hurtHero(o,this.rollDice(M.A.dice)*M.mul*.8,null);}}}   /* Hardcore: missiles don't care whose side you're on */
      this.missiles=this.missiles.filter(M=>!M.done);}
    if(this.nades&&this.nades.length){for(const N of this.nades){N.t+=dt;N.x1-=scroll*dt;N.x0-=scroll*dt;const u=Math.min(1,N.t/N.T);N.x=N.x0+(N.x1-N.x0)*u;N.gyNow=N.gy0+(N.gy-N.gy0)*u;N.hgt=18*(1-u)+22*Math.sin(Math.PI*u);
        if(u>=1&&!N.done){N.done=1;(this.clouds=this.clouds||[]).push({x:N.x1,gy:N.gy,r:N.A.r,t:0,life:N.A.dur,A:N.A,seed:Math.floor(this.rng()*999)});this.ev('wind',{});}}
      this.nades=this.nades.filter(N=>!N.done);}
    if(this.clouds&&this.clouds.length){for(const S of this.clouds){S.t+=dt;S.x-=scroll*dt;const A=S.A;
        for(const e of this.enemies){if(e.dead||e.fly||e.boss)continue;if(Math.abs(e.x-S.x)<S.r&&Math.abs((e.gy!=null?e.gy:this.G)-S.gy)<14){e.smokeT=.25;e.smokeMiss=A.miss||.5;e.slow=Math.max(e.slow||0,A.slow);e.slowT=Math.max(e.slowT||0,.25);}}
        for(const o of this.alive()){if(Math.abs(this.heroX(o)-S.x)<S.r&&Math.abs((o.gy||this.G)-S.gy)<14){o.smokeT=.25;if(A.stealth&&o.key!=='robot'&&!(o.stealthCd>0)){if(!(o.stealthT>0))this.text(o.x,this.G-56,'hidden','#c8d0d8');o.stealthT=A.stealth;}}}}
      this.clouds=this.clouds.filter(S=>S.t<S.life);}
    for(const e of this.enemies){if(e.smokeT>0)e.smokeT-=dt;if(e.markT>0)e.markT-=dt;if(e.rootT>0)e.rootT-=dt;}for(const o of this.alive()){if(o.smokeT>0)o.smokeT-=dt;if(o.stealthT>0)o.stealthT-=dt;if(o.stealthCd>0)o.stealthCd-=dt;}}
  // 0.12.30 car alarms (Kyle): disturbing a wrecked car (a damaging ability's blast nearby, or searching it) has a 50% chance to set off
  //   its alarm, once per car. The alarm blares for 3s and a fresh pack of zombies comes in from the edge, on top of the normal waves.
  disturb(x,gy,r,chance,only){chance=chance==null?.5:chance;for(const o of this.obst||[]){if(only&&o!==only)continue;if(!ALARMABLE.test(o.k)||o.alarmed!=null)continue;const l=o.lanes.reduce((b,l)=>Math.abs(LANES[l]-gy)<Math.abs(LANES[b]-gy)?l:b,o.lanes[0]);
      if(Math.abs(LANES[l]-gy)>r*.5+6)continue;const [a,b]=this.obSpan(o,l);if(x<a-r||x>b+r)continue;
      o.alarmed=this.rng()<chance;if(o.alarmed)this.carAlarm(o);}}
  // 0.12.38: 30s, one zombie every 2s (was 10s / ~1.25s) (a little faster on later stages), up to 8 (+1 per
  //   3 stages). Ignoring it adds about one medium cluster - survivable - but shutting it off in the first few seconds saves most of them.
  carAlarm(o){const other=(this.obst||[]).some(q=>q!==o&&q.alarmT>0&&q.alarmN>0);o.alarmT=30;o.alarmN=other?1:99;   /* 0.12.38 (Kyle): blares up to 30s, a zombie from off-screen every 2s until shut off; a second alarm at the same time only adds 1 */o.alarmEvery=1.6;o.alarmTick=.4;o.alarmScare=1;this.ev(o.k==='city_front'?'bell':'shout',{});this.shake=Math.max(this.shake||0,.45);   /* 0.12.63 (Kyle): scarier: a zombie every 1.6s, the first almost at once, and a harder jolt */
    const sp=this.alive().filter(h=>h.key).sort((p,q)=>Math.abs(p.x-o.x)-Math.abs(q.x-o.x))[0];if(sp){Comms.bubble(this,sp,Comms.pick(o.k==='city_front'?['Burglar alarm!','The store\'s alarm!','Kill that bell!','Every zombie in town heard that!']:['Car alarm!','Shut it off!','Great, now they heard us!','Here they come!','Who touched the car?!']));
      for(const o2 of this.alive())if(o2!==sp&&Math.random()<.4+.5*trait(o2,'listen'))o2.alDecide=null,o2.thinkT=Math.min(o2.thinkT||1,.1);}   // everyone rethinks right away
    for(const h of this.alive())if(Math.abs(this.heroX(h)-o.x)<140)Brain.panic(this,h,'alarm');
    if(this.demo)o.alarmN=0;}
  stepObstacles(dt,scroll){if(!this.obst)this.obst=[];if(this.obNext==null)this.obNext=60+this.rng()*120;
    this.stepRoofs(dt);for(const o of this.obst){o.x-=scroll*dt*(o.par||1);if(o.alarmT>0){o.alarmT-=dt;o.alarmTick-=dt;if(o.k==='city_front'&&(o.bellT=(o.bellT||0)-dt)<=0){o.bellT=1.4;this.ev('bell',{});}   // the alarm keeps pulling zombies in until it runs out or someone shuts it off
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
    if(scroll&&!this.exiting)this.spawnFronts();if(scroll&&!this.exiting&&this.dist>=this.obNext&&!(this.boss&&!this.boss.dead)){this.obNext=this.dist+110+this.rng()*230;
      const M=this.mods||{};const city=this.st.biome&&this.st.biome.id==='city';const wOf=(n,w)=>w*(n==='car_ambulance'?(M.amb||1)*(M.cars||1):/^car_/.test(n)?(M.cars||1):/^(rock|log|stump|trunk)/.test(n)?(M.grove||1):1)*(city?(/^car_/.test(n)?2.3:/^city_/.test(n)?1:0):(/^city_moss/.test(n)?0:/^city_crate/.test(n)?.65:n==='city_lootbox'?.8:1));   /* 0.12.119 (Kyle) downtown: vehicles > moss > shops > crates > loot crates. The lake gets the odd crate and a rare loot crate (old camp supplies) */   /* 0.12.119 (Kyle): downtown = wrecked cars, crates, loot boxes and moss; no rocks, logs or trees. The city props stay downtown */
      const tot=OBST_POOL.reduce((s,p)=>s+wOf(p[0],p[1]),0);let r=this.rng()*tot,k='rock_crack';for(const [n,w] of OBST_POOL){if((r-=wOf(n,w))<0){k=n;break;}}const D=OBST[k];
      const x=this.W+40;const near=D.flat?[]:this.obst.filter(o=>Math.abs(o.x-x)<90&&!OBST[o.k].flat&&!OBST[o.k].pass);const used=new Set(near.flatMap(o=>o.lanes));
      for(let tries=0;tries<8;tries++){const l=/^car_/.test(k)?1+Math.floor(this.rng()*(3-D.lanes+1)):Math.floor(this.rng()*(LANES.length-D.lanes+1));   /* 0.12.38 (Kyle): cars only in the middle three lanes */const lanes=D.lanes===2?[l,l+1]:[l];const all=new Set([...used,...lanes]);
        if(all.size>2)continue;const arr=[...all].sort();if(arr.length===2&&arr[1]-arr[0]>1&&near.length)continue;   // never two lanes walled off side by side plus another
        this.obst.push({k,x:x+this.rng()*20,lanes,blk:D.blk,flip:/^car_/.test(k)&&this.rng()<.5});   /* cars can face either way */break;}}}
  /* 0.12.119 (Kyle): lootable storefronts. Each lives at the middle of its building in the downtown backdrop and moves with it (the
     building's parallax speed), so it never drifts off its building or into a gap. As a shop's building scrolls in, ~45% of them are open
     for looting (shown by a gold glint and an alarm bell). */
  /* 0.12.122 (Kyle) storefront rooftops. Two reasons to go up the ladder (1.1s climb, busy while climbing):
     - a crate up there: anyone free goes up, loots it (1.5s) and comes straight back down;
     - a fight: a shooter takes the roof (+6 accuracy, +30% range) while there's something to shoot. IF nothing's in range for 2s, or
       they drop under 30% HP, or the shop scrolls off THEN they climb down. Nobody hangs out up there doing nothing.
     Zombies can get up too: they walk into the shop's front door, vanish inside (1.2s) and come out the stairwell door on the roof
     (at most 2 per roof), then go for whoever's up there. With nobody left up top they hop back down. */
  stepRoofs(dt){for(const o of this.obst||[]){const R=o.roof;if(!R)continue;const hw=(o.bw||36)/2,lx=o.x+hw+1.5;R.dx=0;   /* the roof door is a recessed doorway in the middle of the wall above the roof */
      const off=h=>{if(!h)return;h.perch=null;h.leapH=0;h.roofBusy=0;if(R.acc){h.acc-=R.acc;R.acc=0;}R.occ=null;};
      if(R.occ&&(!R.occ.alive||o.x<10)){off(R.occ);}
      const foes=x=>this.enemies.filter(e=>!e.dead&&e.inside==null&&Math.abs(e.x-x)<170).length;
      if(!R.occ&&o.x>40&&o.x<this.W-30){R.wait=(R.wait||0)-dt;const quiet=this.enemies.filter(e=>!e.dead&&Math.abs(e.x-lx)<50&&!e.onRoof).length<2;
        const free=(h,r)=>!h.pet&&h.key!=='robot'&&!h.perch&&!h.jet&&!h.search&&!h.building&&!h.repairing&&Math.abs(this.heroX(h)-lx)<(r||40)&&h.hp/h.max>.4;
        const near=(L)=>L.sort((p,q)=>Math.abs(this.heroX(p)-lx)-Math.abs(this.heroX(q)-lx))[0];
        let h=null,why=null;
        if(R.crate&&quiet){h=near(this.alive().filter(h=>free(h)));why='crate';}   /* 0.12.124 (Kyle): the crate first */
        if(!h&&R.wait<=0){R.wait=2;const sh=near(this.alive().filter(h=>free(h,60)&&h.base.char&&h.base.char.ranged&&!this.isMeleeHero(h)));if(sh&&foes(lx)>=3&&this.rng()<.25){h=sh;why='fight';}}   /* the high ground second */
        if(h){R.roofP=1;R.occ=h;h.perch=R;h.roofBusy=1;R.st='up';R.t=0;R.why=why;R.idle=0;h.x=lx;h.laneI=0;h.gy=LANES[0];
          Comms.bubble(this,h,Comms.pick(why==='fight'?['Taking the roof!','High ground!','I\'ll cover you from up here.']:['Crate on the roof!','Grabbing that crate.','Be right back down.']),true);}}
      if(R.occ){const h=R.occ;h.laneI=0;h.gy=LANES[0];const lift=Math.max(10,LANES[0]-R.y)/(1.2*UNIT_SCALE);R.t+=dt;   /* 0.12.125: pinned to the back lane while up there so the roof wall draws in front of them */
        const down=()=>{R.st='down';R.t=0;R.dt2=0;h.roofBusy=1;if(R.acc){h.acc-=R.acc;R.acc=0;}};
        const lootCrate=()=>{R.crate=false;R.crateDone=1;this.supXp(h,1.5);const r=this.rng();if(r<.45)this.gainSupply(h,o);else if(r<.8)this.gainParts(h,o);else{const gd=4+Math.floor(this.rng()*7);this.stageGold+=gd;this.text(h.x,R.y-10,'+'+gd,'#ffd23f');}
          Comms.bubble(this,h,Comms.pick(['Rooftop stash!','Someone hid this up here.','Found a crate up top!']));};
        if(R.st==='up'){h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;h.x+=(lx-h.x)*Math.min(1,dt*12);h.leapH=lift*Math.min(1,R.t/1.1);
          if(R.t>=1.1){R.t=0;if(R.why==='fight'){R.st='fight';h.roofBusy=0;R.acc=6;h.acc+=6;}else R.st='loot';}}
        else if(R.st==='loot'){h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;h.x+=(o.x-hw*.55-h.x)*Math.min(1,dt*6);h.leapH=lift;if(R.t>=1.5){lootCrate();   /* a shooter with targets stays up to use the height */
          if(h.base.char&&h.base.char.ranged&&!this.isMeleeHero(h)&&foes(h.x)>=1&&h.hp/h.max>.4){R.st='fight';R.t=0;R.idle=0;h.roofBusy=0;R.acc=6;h.acc+=6;Comms.bubble(this,h,Comms.pick(['Staying up, good angle!','Nice view from up here.']),true);}else down();}}
        else if(R.st==='fight'){h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;h.leapH=lift;const spot=o.x+hw*.25;h.x+=(spot-h.x)*Math.min(1,dt*6);h.face=1;
          if(R.crate&&R.t>1.5)lootCrate();
          R.idle=foes(h.x)?0:R.idle+dt;if(R.idle>2||h.hp/h.max<.3||o.x<16)down();
          else{R.dnT=(R.dnT||0)+dt;if(R.dnT>=2){R.dnT=0;const nd=this.heroes.filter(x=>!x.pet&&!x.alive&&x.downed).length;   /* 0.12.174 (Kyle): every 2s up here, 20% per downed ally to head down and help */
            if(nd&&this.rng()<Math.min(1,.2*nd)){Comms.bubble(this,h,Comms.pick(['Man down! Coming down!','Hang on, I\'m on my way!']),true);down();}}}}
        else{h.pauseT=Math.max(h.pauseT||0,.05);h.moving=false;h.x+=(lx-h.x)*Math.min(1,dt*10);if(Math.abs(h.x-lx)<1.5||R.t>.6){R.dt2=(R.dt2||0)+dt;h.leapH=lift*Math.max(0,1-R.dt2/1);if(R.dt2>=1)off(h);}}}
      if(R.doorT>0)R.doorT-=dt;}}
  /* zombies and storefront roofs: walk in the front door -> vanish -> come out the roof door -> fight whoever's up there -> hop down */
  roofEnemy(e,dt,scroll){if(e.emergeT>0)e.emergeT-=dt;
    if(e.nem&&e.nemHas&&e.nemHas('howl')){e.howlT=(e.howlT==null?4:e.howlT)-dt;if(e.howlT<=0){e.howlT=12;for(let i=0;i<2;i++)this.spawnEnemy('zombie',{x:this.W+10+i*10});this.text(e.x,(e.gy||this.G)-44,'HOWLS!','#ff6a4a');this.ev('shout',{});}}
    if(e.inside!=null){const o=e.roofO;e.inside-=dt;if(o)e.x=o.x;if(e.inside>0&&o&&this.obst.includes(o))return true;
      e.inside=null;if(e.goingDown||!o||!o.roof||!this.obst.includes(o)||!o.roof.occ){e.goingDown=0;e.gy=LANES[0];e.laneI=0;e.roofO=null;if(o)e.x=o.x;e.emergeT=.5;return false;}   /* back out the front door */
      e.onRoof=1;e.rx=o.roof.dx||0;e.gy=o.roof.y;o.roof.doorT=.6;e.atkT2=.6;e.emergeT=.5;return true;}   /* 0.12.130 (Kyle): steps out of the dark doorway faded and brightens */
    if(e.onRoof){const o=e.roofO,R=o&&o.roof;if(!R||!this.obst.includes(o)){e.onRoof=0;e.gy=LANES[0];e.laneI=0;e.roofO=null;return false;}
      const hw=(o.bw||36)/2,occ=R.occ&&R.st!=='down'&&R.st!=='up'?R.occ:null;e.gy=R.y;
      if(occ){const tx=occ.x-o.x-4;const d=tx-e.rx;e.face=d>0?1:-1;if(Math.abs(d)>1){e.rx+=Math.sign(d)*Math.min(Math.abs(d),e.E.spd*(1-(e.slow||0))*dt);e.walkT+=dt;}
        e.atkT2-=dt;if(Math.abs(d)<=2&&e.atkT2<=0){e.atkT2=e.E.atk||1.25;e.animT=.3;const dm=e.E.dmgDie?Math.max(1,Math.floor((1+Math.floor(this.rng()*e.E.dmgDie))*e.dmgMul)):e.dmg;this.hurtHero(occ,dm,e);}e.rIdle=0;}
      else{e.rIdle=(e.rIdle||0)+dt;if(e.rIdle>.6){const d=(R.dx||0)-e.rx;e.face=d>0?1:-1;if(Math.abs(d)>1){e.rx+=Math.sign(d)*Math.min(Math.abs(d),e.E.spd*dt);e.walkT+=dt;}
          else{e.onRoof=0;e.goingDown=1;e.inside=1.2;R.doorT=.6;return true;}}}   /* 0.12.122 (Kyle): nobody left up top: back through the roof door, down the stairs and out the front door */
      e.rx=Math.max(-hw+2,Math.min(hw-2,e.rx));e.x=o.x+e.rx;return true;}
    if(e.roofGo){const o=e.roofO,R=o&&o.roof;if(!R||!R.occ||!this.obst.includes(o)){e.roofGo=0;e.roofO=null;return false;}
      e.x-=scroll*dt;const dx=o.x-e.x,ty=LANES[0];e.face=dx>0?1:-1;const v=e.E.spd*(1-(e.slow||0))*dt;
      if(Math.abs(dx)>1)e.x+=Math.sign(dx)*Math.min(Math.abs(dx),v*1.2);if(Math.abs(e.gy-ty)>.5)e.gy+=Math.sign(ty-e.gy)*Math.min(Math.abs(ty-e.gy),LANE_SPD*dt);e.walkT+=dt;
      if(Math.abs(dx)<3&&Math.abs(e.gy-ty)<1){e.roofGo=0;e.inside=1.2;this.fx.push({k:'puff',x:o.x,y:ty-4,t:0,life:.35,s:1});}return true;}
    // IF a roof has a shooter on it AND fewer than 2 zombies are on their way up THEN a nearby zombie may head for the shop door
    if(!e.boss&&!e.fly&&e.E.undead&&e.gy!=null&&this.rng()<dt*.5){for(const o of this.obst||[]){const R=o.roof;if(!R||!R.occ||R.st!=='fight')continue;if(Math.abs(e.x-o.x)>45)continue;
        const n=this.enemies.filter(q=>!q.dead&&q.roofO===o).length;if(n>=2)continue;e.roofGo=1;e.roofO=o;e.target=null;e.plan=null;return true;}}
    return false;}
  spawnFronts(){if(!(this.st.biome&&this.st.biome.id==='city')||typeof BGA==='undefined'||!BGA.city)return;const L=BGA.city.layers.find(l=>l.shops);if(!L)return;
    const s=L.w/L.r[2],T=L.tile,d=this.dist*L.sp;this.frontSeen=this.frontSeen||{};
    for(const [ax,kind,bw] of L.shops){const base=ax*s-d,k=Math.ceil((this.W+2-base)/T),x=base+k*T;if(x>this.W+30)continue;const id=k+':'+ax;if(this.frontSeen[id])continue;this.frontSeen[id]=1;
      if(this.rng()<.3){const BW=(bw||40)*s;const F={k:'city_front',x,lanes:[0],blk:0,par:L.sp,shop:kind,bw:BW};this.obst.push(F);
        if(this.rng()<.5)F.roof={hp:1,y:L.y+L.front*s-7,crate:this.rng()<.7,occ:null};   /* 0.12.122 (Kyle): some have a flat roof with a ladder up the side and maybe a crate up top */   /* 0.12.121 (Kyle): two pillars stand out front: the only part you can't walk through */
        for(const sd of [-1,1])this.obst.push({k:'city_pillar',x:x+sd*(BW/2-2),lanes:[0],blk:0,par:L.sp,front:1,F,sd});}}}
  // keep bodies out of obstacles: IF a unit ends up inside one in its lane THEN push it out the near side
  /* 0.12.156 (Kyle): heroes don't walk onto a SPOTTED enemy mine: in its lane they stop 11 px short (the trigger reaches 9), one lane over
     they keep 6 px clear. Whoever is defusing it, leaping or jetting is exempt. Unspotted mines still catch them. */
  mineClamp(h){if(!this.mines||h.leap||h.jet||h.perch||h.dog&&false)return;const gy=h.gy;if(gy==null)return;
    for(const M of this.mines){if(M.owner||!M.armed||!M.spotted)continue;if(h.defuse&&h.defuse.M===M)continue;const dz=Math.abs(gy-M.gy);const R=dz<=3.5?11:dz<=11.5?6:0;if(!R)continue;
      if(h.building&&h.walkTo==null)continue;const hx=this.heroX(h),d=hx-M.x;if(Math.abs(d)<R){h.x+=(d>=0?R-d:-R-d);}}}
  obClamp(u,isHero){if(!this.obst||!this.obst.length||u.fly||u.boss)return;const gy=u.gy;if(gy==null)return;
    for(const o of this.obst){if(OBST[o.k].flat||OBST[o.k].pass)continue;const l=o.lanes.find(l=>Math.abs(LANES[l]-gy)<3.5);if(l==null)continue;const pad=isHero?3:2;const [a,b]=this.obSpan(o,l);if(u.x>a-pad&&u.x<b+pad)u.x=(u.x-(a+b)/2)>=0?b+pad:a-pad;}}   // where a hero actually stands right now
  stepZones(dt){
    // beat-'em-up shuffle: everyone drifts a little on their own (bigger while standing and fighting) — can carry them clear of danger by luck
    for(const h of this.heroes){if(!h.alive)continue;const ph=(h.key.length*1.7)%6.3;const amp=this.scroll?3:7;
      h.wanderX=(h.defuse||h.search||(h.building&&h.walkTo==null)||h.repairing||(h.plan&&/^(search|disarm|defuse)$/.test(h.plan.intent||'')))?0:Math.sin(this.t*1.1+ph)*amp+Math.sin(this.t*2.7+ph*2)*amp*.45;}   /* no idle sway while defusing or cutting an alarm */
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
const MUZZLE={carcher:[12,15],csorc:[12,15],soldier:[18,16],shoshi:[13,16],eng:[12,14],jp:[13,14],cultist:[10,11],robot:[13,17],lumberjack:[12,15],druid:[14,16],chibi:[10,15],archer:[17,16],flannel:[11,14],flannel_pal:[9,13],vile:[3,30],thing:[14,30],kykar:[15,46],dragons:[18,38],mathas:[17,33],marina:[11,25],thranduil:[12,34],joel:[11,33],robots:[18,33],blood:[13,46],mech:[20,30],weather:[14,47]};
const ARC={kunai:16,dart:6};   // how high each kind is tossed above a straight line (ruler units): kunai lobbed, dart a slight drop
const PSPD={void:165,gat:420,buck:380,leaf:190,dart:330,kunai:200,yarrow:230,bullet:420,arrow:200,quarrel:215,bolt:150,orb:135,fire:150,shard:160,zap:170,wisp:120,plasma:180,blood:140,shell:160,frost:145,brick:190};   // px/s   // ranged shots don't shove, except the thrown brick (a little)
const PCOL={void:'#b05cff',gat:'#ffd27a',buck:'#ffe0a0',skull:'#7dff9a',hex:'#c050ff',bolt:'#ffb040',orb:'#c050ff',arrow:'#e8e0c8',quarrel:'#e8e0c8',fire:'#ff8a1f',shard:'#6ff0ff',zap:'#bfefff',wisp:'#7dff9a',plasma:'#3ff0ff',blood:'#ff2a3a',shell:'#ffd23f',frost:'#9ae6ff',brick:'#c0603a'};

// ======================================================================= RUN / PICKS (pure)
/* 0.12.56: remember who is acting while an ability, proc or signature runs, so heals inside it count as theirs (Medicine Man) */
for(const nm of ['cast','procs','basic','companion','callPal','sigArea','sigShot','sigMulti','sigChain','sigFront','sigMark','sigDrain']){const f=Game.prototype[nm];if(!f)continue;Game.prototype[nm]=function(h){const p=this._healBy;this._healBy=h&&h.key?h:p;try{return f.apply(this,arguments);}finally{this._healBy=p;}};}
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
  for(const h of DATA.heroes)if(!slot.heroes[h.key])slot.heroes[h.key]={lvl:1,xp:0};
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
function newSlot(player){const heroes={};for(const h of DATA.heroes)heroes[h.key]={lvl:1,xp:0};return {epoch:SAVE_EPOCH,partySize:3,gold:0,heroes,best:{score:0,stage:0,prestige:0},runs:0,run:null,created:Date.now()};}

// ======================================================================= exports for node sims

// ======================================================================================================================
// 0.12.38 CAMP (Kyle): food & water upkeep, spare parts, camp upgrades (offered 3 at a time, tiered, roguelike: they last the run),
//   Triage crafting, and level-up stat points. Gold, spare parts, supplies and upgrades all belong to the run (gold and parts reset in newRun).
// ======================================================================================================================
/* 0.12.103 (Kyle: average hero damage in stage 1 about 300, healer and utility heroes lower). Scales ALL of a hero's damage: basic attacks, abilities and anything he summons or builds. */
const ENEMY_HP=.54;   /* 0.12.104: .63 -> .52 with the bigger waves, to hold ~300 */   /* every enemy's HP; heroes hit for about .76 of before on average, so time-to-kill stays about the same and the numbers land near 300 */
const HERO_DMG={carcher:.6,csorc:.55,soldier:.62,shoshi:.95,jp:.48,chibi:.58,archer:.64,flannel:.72,druid:.50,eng:.37,lumberjack:.61,robot:.46,cultist:.36};
const CAMP_UPG={
  water:{name:'Water Filtration System',icon:'💧',tiers:[100,175,275],txt:t=>`${[25,50,75][t-1]}% chance to give one hungry unit water by itself when you get back to camp.`},
  triage:{name:'Triage Station',icon:'🩺',tiers:[125,200,300],txt:t=>`Build a Medkit (${TRIAGE.med[t-1]} spare parts), a Defibrillator (${TRIAGE.defib[t-1]}) or, with the Warhound on the team, a Battery for him (${TRIAGE.bat[t-1]}) for a unit to carry into the next stage. ${t>=3?'Up to 2 builds':'1 build'} per camp.`},
  garden:{name:'Garden Plot',icon:'🌱',tiers:[100,175,275],txt:t=>['50% chance of 1 food each time you get back.','1 food each time you get back.','2 food each time you get back.'][t-1]},
  rain:{name:'Rain Barrels',icon:'🛢️',tiers:[100,175],txt:t=>['50% chance of 1 water each time you get back.','1 water each time you get back.'][t-1]},
  smoker:{name:'Smokehouse',icon:'🍖',tiers:[125],txt:()=>'Smoked rations go further: one food feeds two units.'},
  kitchen:{name:'Camp Kitchen',icon:'🍲',tiers:[200],txt:()=>'Real cooked meals: each food lowers Hunger by 2 tiers instead of 1.'},   /* 0.12.72 food quality */
  purifier:{name:'Water Purifier',icon:'🚰',tiers:[200],txt:()=>'Clean water: each water lowers Thirst by 2 tiers instead of 1.'},   /* 0.12.72 water quality */
  cots:{name:'Med Cots',icon:'🛏️',tiers:[100,175,275],txt:t=>`Everyone rests up: +${[10,20,30][t-1]}% HP when you get back to camp.`},
  bench:{name:'Weapon Bench',icon:'🔧',tiers:[100,200,325],txt:t=>`+${t} damage on every basic attack, melee and ranged.`},
  gen:{name:'Generator',icon:'🔋',tiers:[100,175,275],txt:t=>`Everyone regains energy faster: +${[.25,.5,.75][t-1]} energy per second.`},   // 0.12.63: no tier IV (Radio Tower removed)
  dummy:{name:'Training Dummy',icon:'🎯',tiers:[100,175,275],txt:t=>`+${[10,20,30][t-1]}% XP for everyone.`},
  shrine:{name:'Lucky Shrine',icon:'🍀',tiers:[100,200],txt:t=>`+${[5,10][t-1]} Luck for everyone (better odds when searching).`},
  board:{name:'Bounty Board',icon:'📌',tiers:[100,175,275],txt:t=>`Gold piles are worth ${[25,50,75][t-1]}% more.`},
  yard:{name:'Scrap Yard',icon:'⚙️',tiers:[100,175],txt:t=>`+${t} spare part${t>1?'s':''} each time you get back.`},
  cutters:{name:'Wire Cutters',icon:'✂️',tiers:[100,175],txt:t=>`Shutting a car alarm off is ${[30,55][t-1]}% faster (normally about 5s).`},
  lamp:{name:"Scavenger's Lamp",icon:'🔦',tiers:[100,175],txt:t=>`Searching takes ${[25,40][t-1]}% less time.`},
  kennel:{name:'Guard Dog Kennel',icon:'🐕',tiers:[125,200,300,450],txt:t=>['A German Shepherd joins every stage. He takes 5 hits before going down, gets a hit back every 15s, and your people can help him up.','Your dog bites 20% harder and a little quicker, and dodges more.','Your dog takes 6 hits, gets one back every 10s, and bites 30% harder.','A second German Shepherd joins the pack (both bite 40% harder).'][t-1]},   // 0.12.65 (Kyle): 4 tiers, two dogs at the top
  tower:{name:'Watchtower',icon:'🗼',tiers:[100,175,275,400],txt:t=>['Scouts the road ahead: each camp, pick 1 of 2 reports to shape the next stage (more ambulances, more loot, fewer zombies...).','3 reports to pick from.','3 reports, and every one is 50% stronger.','MAP TABLE: 4 reports to pick from, and you can follow TWO of them at once.'][t-1]},   /* 0.12.105 (Kyle): the Map Table idea merged in as tier IV */
  still:{name:'Moonshine Still',icon:'🫙',tiers:[100,175],txt:t=>`Brew Liquid Courage from ${t===1?2:1} food (${t===1?1:2} per camp). Whoever drinks it fights the next stage with +20% damage, -10 accuracy and steadier nerves. *hic*`},
  // 0.12.63 (Kyle): Radio Tower removed
  radio:{name:'Radio Shack',icon:'📻',tiers:[100,175],txt:t=>['A scratchy radio picks up chatter about the road ahead: at camp you see how many zombies and waves are coming next stage, and whether there are werewolves or firemen.','Early warning too: every time a wave starts coming in, everyone gets ALERT for 5s (+10 accuracy).'][t-1]},   /* 0.12.105 (Kyle) */
  jukebox:{name:'Old Jukebox',icon:'🎵',tiers:[60],txt:()=>'Music round the fire: everyone heads out with steadier nerves (+2 Steady for the whole stage), so they panic less.'},   /* 0.12.105 (Kyle): a cheap one */
  stretch:{name:'Stretchers',icon:'🩼',tiers:[100,175],txt:t=>`Helping a downed ally up takes ${[20,40][t-1]}% less time (normally 5s).`},   /* 0.12.102 */
  sandbag:{name:'Sandbag Wall',icon:'🧱',tiers:[100,175,275],txt:t=>['One random hero heads into each stage carrying a Sandbag Wall (70 HP). When a pack comes down the road he heaves it out into their path, toward the far right of the screen: zombies in that lane and the ones next to it can\'t pass until they tear through it.','The wall is heavier (110 HP), and allies standing just behind it get +8 accuracy.','TWO heroes carry one each (140 HP), and they\'re barbed: every swing a zombie takes at the wall costs it 3 HP.'][t-1]},   /* 0.12.104 (Kyle): an item a hero carries in, not a shield */
  forage:{name:'Foraging Packs',icon:'🎒',tiers:[100,175],txt:t=>`Food and water drop from kills ${[15,30][t-1]}% more often.`},   /* 0.12.102 */
  hearth:{name:'Hearth',icon:'🔥',tiers:[90],txt:t=>`Everyone sets out warm: each stage starts with COZY (10s: +0.25 life and energy every 0.5s, +10% melee attack speed and move speed).`},
};
const SCOUT={amb:{name:'Ambulance Route',icon:'🚑',txt:s=>`Ambulances are ${Math.round(1+3*s)}x as likely to turn up.`},
  cars:{name:'Wreck Yard',icon:'🚗',txt:s=>`${Math.round(100*s)}% more wrecked cars (more loot, more alarms).`},
  grove:{name:'Overgrown Path',icon:'🌲',txt:s=>`${Math.round(100*s)}% more rocks, logs and stumps to search.`},
  quiet:{name:'Quiet Road',icon:'🤫',txt:s=>`${Math.round(20*s)}% fewer zombies.`},
  supplies:{name:'Supply Trail',icon:'🥫',txt:s=>`Food and water drop ${Math.round(1+2*s)}x as often.`},
  scrap:{name:'Junk Pile',icon:'⚙️',txt:s=>`Spare parts drop ${Math.round(1+2*s)}x as often.`},
  gold:{name:'Gold Rumors',icon:'💰',txt:s=>`Gold drops ${Math.round(60*s)}% more often, but ${Math.round(15*s)}% more zombies.`}};
function scoutMods(run){const m={amb:1,cars:1,grove:1,foes:1,supply:1,parts:1,gold:1};const ids=[].concat((run&&run.scoutNow)||[]).filter(id=>SCOUT[id]);if(!ids.length)return m;const s=run.scoutTier>=3?1.5:1;
  for(const id of ids){if(id==='amb')m.amb*=1+3*s;if(id==='cars')m.cars*=1+s;if(id==='grove')m.grove*=1+s;if(id==='quiet')m.foes*=1-.2*s;if(id==='supplies')m.supply*=1+2*s;if(id==='scrap')m.parts*=1+2*s;if(id==='gold'){m.gold*=1+.6*s;m.foes*=1+.15*s;}}return m;}   /* 0.12.105: two reports at once with the Map Table */
/* 0.12.105 Radio Shack: a rough forecast of the next stage (the same numbers the stage itself uses) */
function radioForecast(run){const st=CFG.stage(run.stage,run.prestige);const CL=st.n===1?CLUSTERS1:CLUSTERS;const avg=(CL.first+(CL.last[0]+CL.last[1])/2)/2;
  const foes=Math.round(avg*CL.count*st.countMul*scoutMods({scoutNow:run.scoutPick,scoutTier:upgT(run,'tower')}).foes+WOLVES_PER_STAGE(st.n));return {waves:CL.count,foes,wolves:st.n>=2,firemen:st.n>=3};}
function scoutRoll(run){const t=upgT(run,'tower');if(!t)return null;const k=Object.keys(SCOUT).sort(()=>Math.random()-.5);return k.slice(0,t===1?2:t>=4?4:3);}
function brewCourage(run,k){const t=upgT(run,'still');if(!t)return 'no';if((run.brewN||0)>=(t===1?1:2))return 'max';const cost=t===1?2:1;if((run.food||0)<cost-1e-9)return 'food';
  const cr=run.heroes[k].carry=run.heroes[k].carry||{kit:[]};if(cr.courage)return 'has';cr.courage=1;run.food=Math.round((run.food-cost)*2)/2;run.brewN=(run.brewN||0)+1;return 'ok';}
const TRIAGE={med:[15,13,11],bat:[12,10,8],defib:[25,22,19],max:[1,1,2]};
/* ======================================================================= 0.12.106 (Kyle) TALENTS: the level-up revamp
   Every level gives a talent point. What you get offered depends on the level that earned it:
     - most levels: pick 1 of 3 STAT cards (a bigger pool than before, weighted to what the hero actually uses) or, now and then, a PERSONALITY card
     - every 3rd level (3, 6, 9, 12...): pick 1 of 3 SKILL MODS that change one of the hero's own abilities
     - level 5 and level 10: a CAPSTONE fork, pick 1 of 2 big talents
   Offers are rolled once per point and kept, so closing camp doesn't reroll them. */
const TAL_STAT={
  tough:{name:'Toughness',icon:'❤️',txt:'+5% max HP',hpPct:5},
  power:{name:'Power',icon:'⚔️',txt:'+4% damage',dmgPct:4},
  aim:{name:'Aim',icon:'🎯',txt:'+3 accuracy',mod:{acc:3}},
  edge:{name:'Edge',icon:'✴️',txt:'+2% crit chance',mod:{crit:2}},
  fortune:{name:'Fortune',icon:'🍀',txt:'+4 Luck',mod:{luck:4}},
  hide:{name:'Hide',icon:'🛡️',txt:'+1 armor point',mod:{armor:1}},
  quick:{name:'Quick Hands',icon:'⚡',txt:'+5% attack speed (melee and ranged)',mod:{meleeSpd:5,rangedSpd:5}},
  fleet:{name:'Fleet',icon:'👟',txt:'+4% move speed',mod:{move:4}},
  well:{name:'Deep Well',icon:'🔷',txt:'+10 max energy',mod:{enMax:10},abil:1},
  focus:{name:'Focus',icon:'🌀',txt:'+0.35 energy per second',mod:{enRegen:.35},abil:1},
  haste:{name:'Haste',icon:'⏱️',txt:'-3% cooldowns',mod:{cdr:3},abil:1},
  brawn:{name:'Brawn',icon:'💪',txt:'+10 knockback, +5% knockback resistance',mod:{kb:10,kbRes:5},melee:1},
  evade:{name:'Evasion',icon:'💨',txt:'+1.5% dodge',mod:{dodge:1.5}},
  medic:{name:'Field Medic',icon:'🩹',txt:'+8% healing done',heal:8,healer:1},
  rescue:{name:'Rescuer',icon:'🤝',txt:'helps allies up 12% faster',rev:12}};
const TAL_PERSONA={
  steady:{name:'Nerves of Steel',icon:'🧊',txt:'+2 Steady (panics less)',shift:{nerve:-2}},
  fury:{name:'Bloodlust',icon:'🔥',txt:'+2 Blind Aggression (fights harder, backs off later)',shift:{aggr:2}},
  calm:{name:'Cool Head',icon:'🧠',txt:'+2 Calculated Play (backs off earlier, picks safer fights)',shift:{aggr:-2}},
  eyes:{name:'Sharp Eyes',icon:'👁️',txt:'+2 Perceptive (spots loot, mines and danger sooner)',shift:{perc:2}},
  team:{name:'Brothers in Arms',icon:'🫂',txt:'+2 Selfless and +1 Pack Hunter',shift:{self:-2,pack:-1}}};
/* skill mods: each one patches the hero's own ability numbers (only this hero, only while he has it) */
const TAL_MOD={
  jp:{scope:{name:'Hollow Tip Scope',icon:'🎯',txt:'No_Scope pierces 5 zombies (was 3) and hits for 4d6 (was 3d6).',ab:'noscope',set:{pierce:5,dice:[4,6]}},
      familia:{name:'Familia Forever',icon:'🛡️',txt:'Protect_the_Familia shields for 75% (was 50%) and comes back in 15s (was 20s).',ab:'familia',set:{shield:.75,cd:15}},
      hotbox:{name:'Hotbox',icon:'🌿',txt:'Toke_Break lasts 3s (was 2s) and heals 10% (was 6%).',ab:'toke',set:{dur:3,heal:.1}}},
  chibi:{twin:{name:'Twin Shadows',icon:'👥',txt:'Shadow_Clone lasts 7s (was 5s) and its own sword hits land at 60% (was 40%).',ab:'clone',set:{dur:7,mirror:.6}},
      tsunami:{name:'Tsunami Dash',icon:'🌊',txt:'Wave Dash rides 140px (was 100) and hits 50% harder.',ab:'dash',set:{dist:140,dmgMul:1.5}},
      hymn:{name:'Battle Hymn',icon:'📣',txt:'War Cry gives +35% damage (was 25%) for 9s (was 7s).',ab:'shout',set:{dmg:.35,dur:9}}},
  archer:{three:{name:'Five in Hand',icon:'🏹',txt:'One Nocked, Two in Hand fires 5 quick arrows (was 3).',ab:'rapid',set:{shots:5}},
      monsoon:{name:'Monsoon',icon:'🌧️',txt:'Arrow_Rain drops 26 arrows (was 16).',ab:'rain',set:{count:26}},
      deeppin:{name:'Deep Pin',icon:'📌',txt:'Pinning_Shot roots for 4s (was 2.5s) and its mark makes the target take 40% more (was 25%).',ab:'pin',set:{root:4,amp:.4}}},
  flannel:{hollow:{name:'Hollow Point',icon:'🔫',txt:'Aimed Shot pierces 3 zombies (was 1) and crits for 3x (was 2.5x).',ab:'aimed',set:{pierce:3,critMul:3}},
      nails:{name:'Hard as Nails',icon:'🪨',txt:'True_Grit blocks 65% of damage (was 50%) for 11s (was 8s).',ab:'grit',set:{dr:.65,dur:11}},
      boom:{name:'Bigger Boom',icon:'💥',txt:'Proximity_Bomb throws zombies much harder (70 knockback, was 45) and is back in 7s (was 10s).',ab:'trip',set:{kb:70,cd:7}}},
  druid:{overgrow:{name:'Overgrowth',icon:'🌸',txt:'Rejuvenating Bloom lasts 12s (was 8s).',ab:'bloom',set:{dur:12}},
      bramble:{name:'Bramble Tide',icon:'🌵',txt:'Thorn Wave hits for 3d6 (was 2d6) and poisons 80% of the time (was 50%).',ab:'thorns',set:{dice:[3,6],poisonCh:.8}},
      eye:{name:'Eye of the Storm',icon:'🌪️',txt:'Cyclone lasts 8s (was 5s) and pulls much harder.',ab:'cyclone',set:{dur:8,pull:26}}},
  lumberjack:{widow:{name:'Widowmaker Spin',icon:'🌀',txt:'Whirl_Wind spins for 7s (was 5s) with a wider reach.',ab:'whirl',set:{dur:7,r:32}},
      split:{name:'Earthsplitter',icon:'🪓',txt:'Ground_Chop splits the ground 60px out (was 40) and stuns for 1.4s (was 0.8s).',ab:'chop',set:{dist:60,stun:1.4}},
      unbridled:{name:'Unbridled',icon:'😤',txt:'Timber_Rage gives +45% damage (was 30%) for 9s (was 6s).',ab:'rage',set:{dmg:.45,dur:9}}},
  cultist:{arms:{name:'Many-Armed',icon:'🐙',txt:'Tentacles have 25 HP (was 15) and hit for 2d6+2 (was 1d6+2).',ab:'tentacle',set:{hp:25,dice:[2,6]}},
      elder:{name:'Elder Sign',icon:'👁️',txt:'Call_of_Cthulhu lasts 14s (was 10s) and terrifies for 3s (was 2s).',ab:'cthulhu',set:{dur:14,fear:3}},
      thirst:{name:'Thirsting Shadows',icon:'🩸',txt:'Syphon_Life drains 5 a second (was 3).',ab:'syphon',set:{dps:5}}},
  eng:{cells:{name:'Reinforced Cells',icon:'🧱',txt:'His HESCO cell has 130 HP (was 80).',ab:'build',path:'barrier',set:{hp:130}},
      coil:{name:'Overcharged Coil',icon:'⚡',txt:'His tesla coil lasts 40s (was 25s) and zaps every 1s (was 1.5s).',ab:'build',path:'tesla',set:{life:40,every:1}},
      shaped:{name:'Shaped Charge',icon:'🧨',txt:'Satchel_Charge hits for 8d4 (was 6d4) over a bigger blast.',ab:'satchel',set:{dice:[8,4],r:42}}},
  carcher:{broad:{name:'Broadhead',icon:'🏹',txt:'Piercing_Shot hits for 3d6 (was 2d6) and goes through up to 7 (was 5).',ab:'pierce',set:{dice:[3,6],n:7}},
      roll:{name:'Combat Roll',icon:'🤸',txt:'Tumble goes 50% farther and its cooldown is 8s (was 12s).',ab:'tumble',set:{dist:68,cd:8}}},
  csorc:{storm:{name:'Storm Caller',icon:'⛈️',txt:'Chain_Lightning jumps to 5 more (was 3) and stuns for 0.8s (was 0.4s).',ab:'chain',set:{n:6,stun:.8}},
      clap:{name:'Thunderhead',icon:'🌩️',txt:'Thunderclap hits for 4d6 (was 3d6) and stuns for 1.5s (was 1s).',ab:'thunder',set:{dice:[4,6],stun:1.5}},
      flow:{name:'Overflow',icon:'🔋',txt:'Arcane_Flow gives +6 energy a kill (was +3).',ab:'arcflow',set:{en:6}}},
  soldier:{cook:{name:'Cooked Fuse',icon:'⏱️',txt:'Frag_Grenade blows the moment it lands (no 0.5s tick) and stuns for 2s (was 1.5s).',ab:'frag',set:{fuse:.05,stun:2}},
      heavy:{name:'Heavy Frag',icon:'💣',txt:'Frag_Grenade hits for 5d6 (was 4d6) in a 120px-wide blast (was 90px).',ab:'frag',set:{dice:[5,6],r:40}},
      tough:{name:'Hardened Veteran',icon:'🎖️',txt:'Battle_Hardened kicks in below 65% HP (was 50%) and blocks 25% (was 15%).',ab:'hardened',set:{under:.65,dr:.25}}},
  shoshi:{undo:{name:'Version History',icon:'🕘',txt:'Ctrl_Z reaches back 5s (was 3s) and triggers at 18% lost (was 25%).',ab:'undo',set:{win:5,min:.18}},
      reset:{name:'Hard Reset',icon:'🔄',txt:'Turn_It_Off_And_On_Again refreshes 2 cooldowns (was 1) and heals 15% (was 8%).',ab:'reboot',set:{n:2,heal:.15}},
      premium:{name:'Priority Support',icon:'🎧',txt:'Tech_Support cuts cooldowns by 22% (was 15%) and gives +8 energy (was 5).',ab:'trial',set:{cut:.22,energy:8}},
      dadstr:{name:'Dad Strength',icon:'💪',txt:'Dad_Mode blocks 60% of damage (was 40%) and the shield is worth 35% of their max HP (was 20%).',ab:'dad',set:{dr:.6,shield:.35}}},
  robot:{swarm:{name:'Swarm Protocol',icon:'🚀',txt:'Missile_Barrage fires 5 missiles (was 3).',ab:'missiles',set:{n:5}},
      smoke:{name:'Thick Smoke',icon:'🌫️',txt:'Smoke_Screen lasts 9s (was 6s) and zombies inside miss 65% of the time (was 50%).',ab:'smoke',set:{dur:9,miss:.65}},
      nanite:{name:'Nanite Overdrive',icon:'🔧',txt:'Nano-Tech_Repair_Bots fix 8% a second (was 5%).',ab:'nano',set:{per:.08}}}};
/* capstones: real game changers. Level 5 and level 10 each offer two (rolled from the list, kept once rolled) */
const TAL_CAP={
  5:{glass:{name:'Glass Cannon',icon:'💥',txt:'+15% damage, but -10% max HP.'},
     bulwark:{name:'Bulwark',icon:'🏰',txt:'+20% max HP and +2 armor.'},
     adren:{name:'Adrenaline',icon:'💉',txt:'Under 40% HP he fights at +25% attack speed and moves 15% faster.'},
     wind:{name:'Second Wind',icon:'🌬️',txt:'Once a stage, when he goes down he gets back up by himself after 3s.'}},
  10:{last:{name:'Last Stand',icon:'🗿',txt:'Once a stage, a hit that would put him down leaves him at 1 HP and untouchable for 3s instead.'},
      exec:{name:'Executioner',icon:'🪦',txt:'His hits deal +60% damage to anything under 25% health.'},
      over:{name:'Overclock',icon:'⚙️',txt:'-20% cooldowns, and his abilities cost 20% less energy.'},
      jugg:{name:'Juggernaut',icon:'🦏',txt:'+3 armor, +40% knockback resistance, and every hit on him lands 10% softer.'}}};
function talKind(L){return L===5||L===10?'cap':L%3===0?'mod':'stat';}
function talPicks(H){return (H&&H.tal)||[];}
function talFree(H){const used=Object.values(H.pts||{}).reduce((a,b)=>a+b,0)+talPicks(H).length;return Math.max(0,(H.lvl||1)-1-used);}
function talCard(id,k){const [t,a,b]=id.split(':');if(t==='st')return TAL_STAT[a];if(t==='ps')return TAL_PERSONA[a];if(t==='cap')return (TAL_CAP[a]||{})[b];if(t==='mod')return ((TAL_MOD[k]||{})[a]);return null;}
/* the level a point came from: points are spent in order, so the next free point belongs to level (spent+2) */
function talNextLevel(H){const used=Object.values(H.pts||{}).reduce((a,b)=>a+b,0)+talPicks(H).length;return used+2;}
function talRoll(k,H,rng){rng=rng||Math.random;const L=talNextLevel(H),kind=talKind(L),have=new Set(talPicks(H));const C=CHAR[k]||{};const abil=(C.abilities||[]).some(a=>!a.passive);
  const healer=k==='druid',melee=!!(C.melee&&!C.ranged)||k==='lumberjack'||k==='chibi';
  if(kind==='cap'){const ids=Object.keys(TAL_CAP[L]).sort(()=>rng()-.5).slice(0,2);return {L,kind,ids:ids.map(x=>'cap:'+L+':'+x)};}
  if(kind==='mod'){const ids=Object.keys(TAL_MOD[k]||{}).filter(x=>!have.has('mod:'+x)).sort(()=>rng()-.5).slice(0,3).map(x=>'mod:'+x);if(ids.length)return {L,kind,ids};}
  const pool=[];for(const [x,S] of Object.entries(TAL_STAT)){if(S.abil&&!abil)continue;let w=1;if(S.healer)w=healer?2.5:.3;if(S.melee)w=melee?1.6:.5;if(x==='edge'&&healer)w=.4;pool.push(['st:'+x,w]);}
  for(const x of Object.keys(TAL_PERSONA))if(!have.has('ps:'+x))pool.push(['ps:'+x,.35]);
  const ids=[];while(ids.length<3&&pool.length){let tot=pool.reduce((a,p)=>a+p[1],0),r=rng()*tot,i=0;for(;i<pool.length;i++){r-=pool[i][1];if(r<=0)break;}ids.push(pool.splice(Math.min(i,pool.length-1),1)[0][0]);}
  return {L,kind:'stat',ids};}
function talOffer(k,H){if(talFree(H)<1){H.offer=null;return null;}const L=talNextLevel(H);if(!H.offer||H.offer.L!==L)H.offer=talRoll(k,H);return H.offer;}
function talTake(k,H,id){const O=talOffer(k,H);if(!O||!O.ids.includes(id))return false;(H.tal=H.tal||[]).push(id);H.offer=null;return true;}
/* the hero's ability set with his skill mods patched in (a private copy: nobody else's numbers change) */
function talChar(k,H){const C=CHAR[k];const mods=talPicks(H).filter(x=>x.startsWith('mod:')).map(x=>(TAL_MOD[k]||{})[x.slice(4)]).filter(Boolean);if(!C||!mods.length)return C;
  const C2=Object.assign({},C,{abilities:(C.abilities||[]).map(a=>JSON.parse(JSON.stringify(a)))});
  for(const M of mods){const A=C2.abilities.find(a=>a.id===M.ab);if(!A)continue;const T=M.path?A[M.path]:A;if(T)Object.assign(T,JSON.parse(JSON.stringify(M.set)));}
  return C2;}
const LVPTS={hp:{name:'Toughness',icon:'❤️',txt:'+4% max HP'},dmg:{name:'Power',icon:'⚔️',txt:'+3% damage'},acc:{name:'Aim',icon:'🎯',txt:'+2 accuracy'},
  crit:{name:'Edge',icon:'✴️',txt:'+1% crit chance'},luck:{name:'Fortune',icon:'🍀',txt:'+3 Luck'},armor:{name:'Hide',icon:'🛡️',txt:'+1 armor point'}};
/* 0.12.53 (Kyle): anyone can try to defuse a mine; a failure sets it off. Sapper makes it far safer, and fiddly-job traits help:
   Slow and Steady (biggest), Techy, Steady nerves, Optimal, and a little Luck. */
function defuseOdds(h){const sap=hasPerk(h,'sapper');   /* 0.12.156 (Kyle): about 40% for anybody, up to ~65% with everything high and stacked (Sapper +12%, Techy, Slow and Steady, Calm, Optimal, Luck) */
  let s=.40+(sap?.12:0)+.12*(trait(h,'tech')-.5)+.06*(.5-trait(h,'pace'))+.04*(.5-trait(h,'nerve'))+.04*(trait(h,'exec')-.5)+.002*((h.luck||15)-15);return Math.max(.3,Math.min(.65,s));}
/* 0.12.55 (Kyle): planting any bomb or mine takes ~3s, shaved by: Sapper -0.8s, Techy up to -0.7s, Optimal up to -0.3s, Slow and Steady up to -0.3s, a little Luck (min 1.2s) */
function plantTime(h){return Math.max(1.2,3-(hasPerk(h,'sapper')?.8:0)-.7*trait(h,'tech')-.3*trait(h,'exec')-.3*(1-trait(h,'pace'))-.004*Math.max(0,(h.luck||0)-10));}
function hasPerk(u,p){const I=u&&u.insp&&INSP[u.insp];return !!(I&&I.perk===p);}
for(const U of Object.values(CAMP_UPG))U.tiers=U.tiers.map(x=>x*2);CAMP_UPG.cutters.tiers=[125,225];   /* Wire Cutters only shortens the fix now, so it's cheaper (Kyle) */   /* 0.12.58 (Kyle): every camp upgrade costs twice the gold */
function upgT(run,id){return (run&&run.upg&&run.upg[id])||0;}
function lvPtsFree(H){const used=Object.values(H.pts||{}).reduce((a,b)=>a+b,0);return Math.max(0,(H.lvl||1)-1-used);}
function campOffers(run){const n=3;const pool=Object.keys(CAMP_UPG).filter(id=>{const t=upgT(run,id),U=CAMP_UPG[id];if(t>=U.tiers.length)return false;const nd=U.needs&&U.needs[t+1];return !nd||upgT(run,nd)>0;});
  const out=[];const bag=pool.slice();while(out.length<n&&bag.length){const i=Math.floor(Math.random()*bag.length);out.push(bag.splice(i,1)[0]);}return out;}
function upgPrice(run,id){const t=upgT(run,id);const h=run.haggle||0;return Math.round(CAMP_UPG[id].tiers[t]*(1-h));}
function resourcefulOf(s,run){return run.team.some(k=>{const H=s.heroes[k];return H&&H.insp&&INSP[H.insp]&&INSP[H.insp].passive==='resourceful';});}
function upgParts(run,id){return Math.ceil(upgPrice(run,id)/4);}
/* 0.12.93 (Kyle) Construction: build ANY available upgrade or tier, as many as you like in one camp, at double the pick price */
function conList(run){return Object.keys(CAMP_UPG).filter(id=>{const t=upgT(run,id),U=CAMP_UPG[id];if(t>=U.tiers.length)return false;const nd=U.needs&&U.needs[t+1];return !nd||upgT(run,nd)>0;});}
function conPrice(run,id){return upgPrice(run,id)*2;}function conParts(run,id){return upgParts(run,id)*2;}
function haggleOf(s,run){const n=run.team.filter(k=>{const H=s.heroes[k];return H&&H.insp&&INSP[H.insp]&&INSP[H.insp].passive==='haggler';}).length;return n?.2:0;}   /* 0.12.46 (Kyle): 20% off, doesn't stack */
/* back at camp after a cleared stage: the camp's own systems run once, then the player feeds whoever is still hungry */
function campArrive(s,run){if(run.campAt===run.stage)return [];run.campAt=run.stage;const log=[];
  run.food=run.food||0;run.water=run.water||0;s.parts=s.parts||0;run.fed={};run.triageN=0;run.brewN=0;run.upgBought=0;run.offers=campOffers(run);run.scoutOffers=scoutRoll(run);run.scoutPick=null;
  const hungry=(run.needFeed||[]).filter(k=>run.team.includes(k)&&k!=='robot');run.needFeed=hungry;
  for(const k of hungry){const hv=run.heroes[k];if(!hv||hv.dead)continue;hv.hunger=Math.min(3,(hv.hunger||0)+1);hv.thirst=Math.min(3,(hv.thirst||0)+1);}   /* 0.12.72 Hunger & Thirst */
  const g=upgT(run,'garden');if(g){const n=g===1?(Math.random()<.5?1:0):g===2?1:2;if(n){run.food+=n;log.push(`🌱 Garden: +${n} food`);}}
  const r=upgT(run,'rain');if(r){const n=r===1?(Math.random()<.5?1:0):1;if(n){run.water+=n;log.push(`🛢️ Rain Barrels: +1 water`);}}
  const y=upgT(run,'yard');if(y){s.parts+=y;log.push(`⚙️ Scrap Yard: +${y} spare part${y>1?'s':''}`);}
  const w=upgT(run,'water');if(w&&hungry.length&&Math.random()<[.25,.5,.75][w-1]){const th=hungry.filter(k=>run.heroes[k].thirst>0);const k=th[Math.floor(Math.random()*th.length)];if(k){run.heroes[k].thirst=Math.max(0,run.heroes[k].thirst-1);log.push(`💧 Water Filtration gave ${heroDef(k).name} a drink`);}}
  const cb=upgT(run,'cots');if(cb){for(const k of run.team){const hv=run.heroes[k];if(!hv.dead)hv.hpf=Math.min(1,(hv.hpf==null?1:hv.hpf)+[.1,.2,.3][cb-1]);}log.push(`🛏️ Med Cots: everyone +${[10,20,30][cb-1]}% HP`);}
  return log;}
/* 0.12.72 (Kyle) Hunger & Thirst: tiers that only get worse while ignored. Every time the team gets back to camp each unit that eats and drinks
   goes up one tier of each (max 3); each food lowers Hunger by 1 and each water lowers Thirst by 1 (by 2 with the Camp Kitchen / Water Purifier).
   Whatever tier they leave camp at lasts the whole next stage. The Warhound needs neither. Hard-roguelike punishing on purpose. */
const HUNGER={names:['Satiated','Hungry','Very Hungry','Starving'],heal:[0,.15,.3,.5],spd:[0,.06,.13,.22],acc:[0,2,5,9],hp:[0,.1,.2,.35]};
const THIRST={names:['Quenched','Parched','Mildly Dehydrated','Severely Dehydrated'],perc:[0,2,4,7],think:[0,1,2,4],slow:[1,1.15,1.35,1.65],drain:[0,.0004,.001,.002]};
function needsOf(run,k){const hv=run.heroes&&run.heroes[k];return {h:(hv&&hv.hunger)||0,t:(hv&&hv.thirst)||0};}
function fedOf(run,k){const n=needsOf(run,k);return {food:!n.h,water:!n.t};}   // kept for the UI: true = nothing needed
function missingOf(run,k){if(k==='robot'||!run.team.includes(k))return 0;const n=needsOf(run,k);return n.h+n.t;}
function feedUnit(run,k,what){if(k==='robot')return false;const hv=run.heroes[k];if(!hv||hv.dead)return false;const key=what==='water'?'thirst':'hunger';if(!(hv[key]>0))return false;
  if(what==='water'){if(run.water<1)return false;run.water-=1;}else{const cost=upgT(run,'smoker')?.5:1;if(run.food<cost-1e-9)return false;run.food=Math.round((run.food-cost)*2)/2;}
  hv[key]=Math.max(0,hv[key]-(upgT(run,what==='water'?'purifier':'kitchen')?2:1));return true;}
/* Feed all: spends what's in the pack on whoever needs it most: the worst tiers first, then lowest HP; never wastes a ration on someone who's fine */
function feedAll(run){let n=0;for(let guard=0;guard<40;guard++){const L=run.team.filter(k=>k!=='robot'&&run.heroes[k]&&!run.heroes[k].dead&&missingOf(run,k));if(!L.length)break;
    const pick=(key)=>L.filter(k=>run.heroes[k][key]>0).sort((a,b)=>(run.heroes[b][key]-run.heroes[a][key])||((run.heroes[a].hpf==null?1:run.heroes[a].hpf)-(run.heroes[b].hpf==null?1:run.heroes[b].hpf)))[0];
    const a=pick('hunger'),b=pick('thirst');let did=0;if(a&&feedUnit(run,a,'food')){n++;did=1;}if(b&&feedUnit(run,b,'water')){n++;did=1;}if(!did)break;}return n;}
/* leaving camp: Hunger takes its bite out of their HP for the next stage (Thirst works during the stage) */
function campDepart(run){run.scoutNow=run.scoutPick||null;run.scoutTier=upgT(run,'tower');run.scoutOffers=null;run.scoutPick=null;const starved=[];
  for(const k of run.team){if(k==='robot')continue;const hv=run.heroes[k];if(!hv||hv.dead)continue;const n=needsOf(run,k);if(n.h)hv.hpf=Math.max(.05,(hv.hpf==null?1:hv.hpf)*(1-HUNGER.hp[n.h]));if(n.h||n.t)starved.push(k);}
  run.needFeed=[];run.fed={};return starved;}
function triageBuild(s,run,what,k){const t=upgT(run,'triage');if(!t)return 'no';if((run.triageN||0)>=TRIAGE.max[t-1])return 'max';const cost=TRIAGE[what][t-1];if((s.parts||0)<cost)return 'parts';
  const cr=run.heroes[k].carry=run.heroes[k].carry||{kit:[]};
  if(what==='med'){if(cr.medkit)return 'has';cr.medkit=1;}else if(what==='defib'){if(cr.defib)return 'has';cr.defib=1;}else{if(!run.team.includes('robot'))return 'no';cr.kit=cr.kit||[];if(cr.kit.length>=2)return 'has';cr.kit.push('bat');}
  s.parts-=cost;run.triageN=(run.triageN||0)+1;return 'ok';}

const API={radioForecast,reticle,ABIL_DESC,HEADSHOT,isHead,inspHelp,PLAYER_ICON,BEHAVIOR,INSP,inspText,CHAR,AIM_BOXES,aimOdds,aimBoxesOf,hbOf,HERO_HITBOX,ENERGY,spendEnergy,faceToward,AIM_RANGE,accTighten,LANES,UNIT_SCALE,HITBOX,aimBands,airBands,rollAirAim,rollAimHeight,rollLaneOffset,ABILITIES_OFF,armorReduction,HP_PER_STAMINA,gearScore,heroGear,giveItem,rollItem,stockShop,itemPrice,honePrice,slotCaps,equip,unequip,discard,typeOf,BAG_SIZE,migrateSlot,CFG,STYLE,SIG,SPELL,ITEM,PROCS,Game,newRun,offers,applyOffer,describe,heroBase,heroDef,DATA,newSlot,needHeroXp};
if(typeof module!=='undefined'&&module.exports){module.exports=API;}
if(typeof document==='undefined')return;

// ======================================================================= UI (browser only)
const IMG=new Image();IMG.src='crawl.png?v=1794490587';const BGI=new Image();BGI.src='crawl_bg.png?v=1794490587';
const SP=ATLAS.sprites,BGA=ATLAS.bg,RES=ATLAS.res||1;const UNITS=ATLAS.units||{};const UIMG=new Image();UIMG.src='crawl_units.png?v=1794490587';const RAIN={f:{fw:5,fh:18,n:1,ax:2,ay:17,x:0,y:0,img:'rain'},s:{fw:5,fh:11,n:1,ax:2,ay:10,x:8,y:7,img:'rain'}};
const CAMPF={fw:34,fh:40,ax:17,ay:37,y:0,img:'camp'};
const XIMG={wraith:new Image(),harvest:new Image(),cityob:new Image(),cars:new Image(),cultist:new Image(),tentacle:new Image(),robot:new Image(),obst:new Image(),lumberjack:new Image(),camp:new Image(),druid:new Image(),tornado:new Image(),vine:new Image(),thorn:new Image(),rain:new Image(),flannel:new Image(),boom:new Image(),pal:new Image(),chibi:new Image(),wave:new Image(),archer:new Image()};XIMG.archer.src='crawl_archer.png?v=1794490587';XIMG.wave.src='crawl_wave.png?v=1794490587';XIMG.chibi.src='crawl_chibi.png?v=1794490587';XIMG.flannel.src='crawl_flannel.png?v=1794490587';XIMG.jp=new Image();XIMG.jp.src='crawl_jp.png?v=1794490587';XIMG.eng=new Image();XIMG.eng.src='crawl_eng.png?v=1794490587';XIMG.shoshi=new Image();XIMG.shoshi.src='crawl_shoshi.png?v=1794490587';XIMG.carcher=new Image();XIMG.carcher.src='crawl_carcher.png?v=1794490587';XIMG.csorc=new Image();XIMG.csorc.src='crawl_csorc.png?v=1794490587';XIMG.soldier=new Image();XIMG.soldier.src='crawl_soldier.png?v=1794490587';XIMG.screamer=new Image();XIMG.screamer.src='crawl_screamer.png?v=1794490587';XIMG.flame=new Image();XIMG.flame.src='crawl_flame.png?v=1794490587';XIMG.rain.src='crawl_rain.png?v=1794490587';XIMG.druid.src='crawl_druid.png?v=1794490587';XIMG.camp.src='crawl_campfire.png?v=1794490587';XIMG.lumberjack.src='crawl_lumberjack.png?v=1794490587';XIMG.tornado.src='crawl_fx_tornado.png?v=1794490587';XIMG.vine.src='crawl_fx_vine.png?v=1794490587';XIMG.thorn.src='crawl_fx_thorn.png?v=1794490587';
const TORN={fw:96,fh:96,n:16,ax:48,ay:90,x:0,y:0,img:'tornado',art:1},VINE={fw:260,fh:116,n:7,ax:130,ay:110,x:0,y:0,img:'vine',art:1};
const THORNS=[[0,35,53],[37,67,79],[106,36,82],[144,87,74]].map(([x,w,h])=>({fw:w,fh:h,n:1,ax:w/2,ay:81,x,y:82-h,img:'thorn',art:1}));XIMG.pal.src='crawl_pal.png?v=1794490587';XIMG.dog=new Image();XIMG.dog.src='crawl_dog.png?v=1794490587';XIMG.obst.src='crawl_obst.png?v=1794490587';XIMG.cityob.src='crawl_cityob.png?v=1794490587';XIMG.harvest.src='crawl_harvest.png?v=1794490587';XIMG.wraith.src='crawl_wraith.png?v=1794490587';XIMG.cars.src='crawl_cars.png?v=1794490587';XIMG.robot.src='crawl_robot.png?v=1794490587';XIMG.cultist.src='crawl_cultist.png?v=1794490587';XIMG.tentacle.src='crawl_tentacle.png?v=1794490587';XIMG.boom.src='crawl_boom.png?v=1794490587';
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
function sfx(k,o){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;
  const tone=(f,d,type,v,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(v||.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d);};
  if(k==='hit')tone(180,.06,'square',.025,90);if(k==='crit')tone(520,.1,'square',.04,180);
  if(k==='level'){[523,659,784,1046].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='square';o.frequency.value=f;g.gain.setValueAtTime(.04,t+i*.07);g.gain.exponentialRampToValueAtTime(.0001,t+i*.07+.12);o.connect(g);g.connect(AC.destination);o.start(t+i*.07);o.stop(t+i*.07+.13);});}
  if(k==='gun'||k==='biggun'){const big=k==='biggun',d=big?.45:.16,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);
    for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*Math.pow(1-i/n,big?2.2:3.5);
    const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=buf;f.type='lowpass';f.frequency.value=big?2400:1800;g.gain.value=big?.55:.16;
    s.connect(f);f.connect(g);g.connect(AC.destination);s.start(t);tone(big?90:140,big?.35:.12,'sine',big?.35:.09,big?32:60);if(big)tone(1400,.06,'square',.03,500);}
  if(k==='shriek'){const d=1.25,g=AC.createGain(),f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=1400;f.Q.value=1.2;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.32,t+.08);g.gain.setValueAtTime(.32,t+d*.7);g.gain.exponentialRampToValueAtTime(.001,t+d);   /* 0.12.175 the Screamer's shriek: two detuned saws wailing up and cracking, with a raspy noise layer */
    for(const det of [0,23]){const o=AC.createOscillator(),lfo=AC.createOscillator(),lg=AC.createGain();o.type='sawtooth';o.frequency.setValueAtTime(700+det,t);o.frequency.linearRampToValueAtTime(1500+det,t+.25);o.frequency.linearRampToValueAtTime(1250+det,t+.8);o.frequency.linearRampToValueAtTime(820+det,t+d);
      lfo.frequency.value=9+det/10;lg.gain.value=60;lfo.connect(lg);lg.connect(o.frequency);o.connect(f);lfo.start(t);o.start(t);o.stop(t+d);lfo.stop(t+d);}
    {const n=Math.floor(AC.sampleRate*d),b=AC.createBuffer(1,n,AC.sampleRate),c=b.getChannelData(0);for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*.35;const s=AC.createBufferSource();s.buffer=b;s.connect(f);s.start(t);}
    f.connect(g);g.connect(AC.destination);}
  if(k==='shotgun'){const d=.6,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);   /* 0.12.158 one big loud shotgun blast */
    const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=buf;f.type='lowpass';f.frequency.setValueAtTime(5000,t);f.frequency.exponentialRampToValueAtTime(400,t+d);g.gain.value=.9;
    s.connect(f);f.connect(g);g.connect(AC.destination);s.start(t);tone(70,.45,'sine',.55,28);tone(2200,.04,'square',.06,600);}
  if(k==='boom'){const d=1.1,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*Math.pow(1-i/n,1.6);
    const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=buf;f.type='lowpass';f.frequency.setValueAtTime(1600,t);f.frequency.exponentialRampToValueAtTime(220,t+d);g.gain.value=.7;
    s.connect(f);f.connect(g);g.connect(AC.destination);s.start(t);tone(60,.8,'sine',.5,24);}
  if(k==='lazer'){const d=(o&&o.d)||1,out=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;out.gain.setValueAtTime(.0001,t);out.gain.exponentialRampToValueAtTime(.09,t+.04);out.gain.setValueAtTime(.09,t+d-.08);out.gain.exponentialRampToValueAtTime(.0001,t+d);
    const am=AC.createGain();am.gain.value=.55;const lfo=AC.createOscillator();lfo.frequency.value=48;const lg=AC.createGain();lg.gain.value=.45;lfo.connect(lg);lg.connect(am.gain);   /* the bzzzz: two buzzy tones chopped 48 times a second */
    for(const [f,ty,v] of [[92,'sawtooth',.9],[184,'square',.35],[1240,'sine',.12]]){const os=AC.createOscillator(),g2=AC.createGain();os.type=ty;os.frequency.setValueAtTime(f,t);if(f>1000)os.frequency.exponentialRampToValueAtTime(820,t+d);g2.gain.value=v;os.connect(g2);g2.connect(am);os.start(t);os.stop(t+d);}
    am.connect(lp);lp.connect(out);out.connect(AC.destination);lfo.start(t);lfo.stop(t+d);}
  if(k==='flame'){if(t-(sfx.lastFlame||0)<.3)return;sfx.lastFlame=t;const d=.55,n=Math.floor(AC.sampleRate*d),buf=AC.createBuffer(1,n,AC.sampleRate),ch=buf.getChannelData(0);let b=0;
    for(let i=0;i<n;i++){b=b*.82+(Math.random()*2-1)*.18;ch[i]=(b*2.2+(Math.random()*2-1)*.35)*Math.min(1,i/(AC.sampleRate*.04))*Math.pow(1-i/n,.7)*(.8+.2*Math.sin(i/AC.sampleRate*60));}   /* roaring, flickering rumble */
    const src=AC.createBufferSource(),bp=AC.createBiquadFilter(),lp2=AC.createBiquadFilter(),g2=AC.createGain();src.buffer=buf;bp.type='bandpass';bp.frequency.setValueAtTime(700,t);bp.frequency.linearRampToValueAtTime(1100,t+d);bp.Q.value=.6;lp2.type='lowpass';lp2.frequency.value=2600;g2.gain.value=.32;
    src.connect(bp);bp.connect(lp2);lp2.connect(g2);g2.connect(AC.destination);src.start(t);tone(70,.45,'sine',.12,45);}
  if(k==='bell'){const d=1.1,gn=AC.createGain();gn.gain.setValueAtTime(0,t);for(let i=0;i<d*28;i++){const tt=t+i/28;gn.gain.setValueAtTime(.05,tt);gn.gain.exponentialRampToValueAtTime(.004,tt+.03);}gn.gain.setValueAtTime(0,t+d);gn.connect(AC.destination);
    for(const f of [2330,3110,4480]){const o=AC.createOscillator();o.type=f>4000?'sine':'square';o.frequency.value=f;const g2=AC.createGain();g2.gain.value=f>4000?.6:.35;o.connect(g2);g2.connect(gn);o.start(t);o.stop(t+d);}}
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
  if(e.scrT>0&&U.scream){const T=e.E.scream.T,k=1-e.scrT/T,n=U.scream.n;return [U.scream,k<.3?Math.floor(k/.3*2):2+Math.floor(k*14)%(n-2)];}   /* 0.12.175 Screamer: rears back, then shrieks (last frames looping) */
  if(e.leapA&&U.jump){const v=e.leapA.t/e.leapA.dur;const J=v<.5?U.jump:U.fall;return [Object.assign({},J,{ay:U.walk.ay-Math.round(Math.sin(Math.PI*Math.min(1,v))*14)}),Math.min(J.n-1,Math.floor((v<.5?v*2:(v-.5)*2)*J.n))];}   // leap arc
  if(A===U.atk){const dur=e.E.animAtk||.3;fr=Math.min(A.n-1,Math.floor((1-e.animT/dur)*A.n));return [A,fr];}
  if(U.idle&&e.moving===false)return [U.idle,Math.floor(e.walkT*6)%U.idle.n];
  return [A,Math.floor(e.walkT*(e.E.fps||7))%A.n];}
let GHOST_A=1;   /* 0.12.107: <1 while drawing the Shadow_Clone */
function drawUnit(ctx,A,fr,x,gy,sc,alpha,flash,rot,flip){const IM=A.img?XIMG[A.img]:UIMG;if(!IM||!IM.complete)return;ctx.save();ctx.translate(Math.round(x*RES)/RES,Math.round(gy*RES)/RES);if(rot)ctx.rotate(rot);{const sx=sc*(A.sx||1);ctx.scale(flip?-sx:sx,sc);}if(alpha!=null)ctx.globalAlpha=alpha*GHOST_A;else if(GHOST_A<1)ctx.globalAlpha*=GHOST_A;
  if(A.art){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';}const sx=A.x+fr*A.fw;ctx.drawImage(IM,sx,A.y,A.fw,A.fh,-A.ax,-A.ay-1,A.fw,A.fh);
  if(flash>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,flash*6)*.7;ctx.drawImage(IM,sx,A.y,A.fw,A.fh,-A.ax,-A.ay-1,A.fw,A.fh);}ctx.restore();}
/* 0.12.117 (Kyle): downtown street lamps are lit live. Each lamp has a kind and its own timing (seed), so along the
   two-screen loop some hum steadily, some stutter, one sputters on and off, one is dying, one is dead, and one hangs by its wire.
   The faulty ones throw sparks now and then: they fall, most burn out in the air, a few land and flicker out on the pavement. */
const LH=(n)=>{const v=Math.sin(n*12.9898+78.233)*43758.5453;return v-Math.floor(v);};
let LAMP_HALO=null;
function lampHalo(){if(LAMP_HALO)return LAMP_HALO;const c=document.createElement('canvas');c.width=60;c.height=80;const x=c.getContext('2d'),im=x.createImageData(60,80);
  for(let yy=0;yy<80;yy++)for(let xx=0;xx<60;xx++){const dx=xx-30,dy=yy-10,r=Math.hypot(dx,dy*(dy>0?.42:1.6)),a=Math.max(0,62-r*3.1);if(a>0){const i=(yy*60+xx)*4;im.data[i]=255;im.data[i+1]=186;im.data[i+2]=90;im.data[i+3]=a;}}
  x.putImageData(im,0,0);return LAMP_HALO=c;}
function lampLevel(k,t,sd){
  if(k==='dead'||k==='broken')return 0;
  if(k==='ok')return .94+.06*Math.sin(t*47+sd*9);
  if(k==='flicker'){const burst=((t*.21+sd)%1)<.3;if(!burst)return 1;const n=LH(Math.floor(t*17)+sd*977);return n<.4?0:n<.55?.35:1;}
  if(k==='sputter'){const P=7+sd*4,ph=((t+sd*20)%P)/P;if(ph>.42)return 0;const n=LH(Math.floor(t*11)+sd*311);return (ph<.04||n<.12)?(n<.5?0:.5):1;}
  if(k==='dying'){const n=LH(Math.floor(t*6)+sd*53);const surge=((t*.13+sd)%1)<.05;return surge?(LH(Math.floor(t*20))<.5?1:.2):(n<.15?.05:.32+.06*Math.sin(t*30));}
  return 1;}
function drawLamps(ctx,L,x0,y0,W,t){const s=L.w/L.r[2],gy=y0+L.ground*s;const H=lampHalo();
  for(const [ax,ay,k,sd] of L.lamps){const hx=x0+ax*s,hy=y0+ay*s;if(hx<-40||hx>W+40)continue;
    // spark events: a lamp shorts out every few seconds (not every period, so it never feels metronomic)
    let flash=0;const spk=k==='flicker'||k==='broken'||k==='sputter'||k==='dying';
    if(spk){const P=(k==='broken'?2.2:3.5)+sd*4,ofs=sd*7,e=Math.floor((t+ofs)/P),dt=t+ofs-e*P;
      if(LH(e*7.1+sd*13)<(k==='broken'?.75:.5)&&dt<2){if(dt<.1)flash=1-dt/.1;
        const N=4+Math.floor(LH(e+sd)*7),G=150*s/.75;
        for(let i=0;i<N;i++){const h1=LH(e*31+i*7+sd*100),h2=LH(e*17+i*3+sd*50),h3=LH(e*13+i*11+sd*70);
          const vx=(h1-.5)*40*s,vy=(-4-h2*22)*s,life=.12+h3*.9;
          const tl=(-vy+Math.sqrt(vy*vy+2*G*(gy-hy)))/G;   // when it would reach the pavement
          if(dt<Math.min(life,tl)){const px=hx+vx*dt,py=hy+vy*dt+.5*G*dt*dt,age=dt/Math.min(life,tl);
            ctx.globalAlpha=1-age*.5;ctx.fillStyle=age<.25?'#fffbe0':age<.6?'#ffd040':'#ff8a20';ctx.fillRect(px,py,1,1);
            ctx.globalAlpha=.4*(1-age);ctx.fillRect(px-vx*.02,py-(vy+G*dt)*.02,1,1);}
          else if(tl<=life&&dt<tl+.55){const px=hx+vx*tl,q=(dt-tl)/.55;   // landed: sputters on the ground, then goes out
            if(LH(Math.floor(dt*24)+i*5+e)>q*.9){ctx.globalAlpha=1-q;ctx.fillStyle=q<.3?'#ffd040':'#ff6a20';ctx.fillRect(px,gy-1,1,1);}}}
        ctx.globalAlpha=1;}}
    if(k==='broken'){if(flash>0){ctx.globalAlpha=flash*.8;ctx.fillStyle='#d8f0ff';ctx.fillRect(hx-1,hy-2,2,2);ctx.globalAlpha=flash*.35;ctx.drawImage(H,hx-12*s,hy-8*s,24*s,30*s);ctx.globalAlpha=1;}continue;}
    const b=Math.min(1,lampLevel(k,t,sd)+flash);if(b<=.02)continue;
    ctx.globalAlpha=b;ctx.drawImage(H,hx-29.5*s,hy-11*s,60*s,80*s);
    ctx.fillStyle='#ffd682';ctx.fillRect(hx-2.5*s,hy-1*s,6*s,2*s);ctx.fillStyle='#fff0c8';ctx.fillRect(hx-.5*s,hy+.5*s,2*s,1*s);ctx.globalAlpha=1;}}
function drawBG(ctx,g,W,oy){
  // layered parallax backdrops (Ansimuz packs): each layer scrolls at its own speed, the walking path at full speed
  const b=BGA[g.st.biome.id]||BGA.grave;const d=g.dist+(g.demo?g.t*8:0);
  // tall night sky above the (smaller) backdrop art: a gradient up to darker, with a few stars
  {const gr=ctx.createLinearGradient(0,-oy,0,(b.artTop||0)-oy+20);gr.addColorStop(0,b.top||b.fill);gr.addColorStop(1,b.fill);ctx.fillStyle=gr;ctx.fillRect(0,0,W,CFG.H);
   ctx.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<40;i++){const sx=((i*97+13)%W),sy=((i*53)%Math.max(8,(b.artTop||60)-6))-oy;if(sy>0&&(i+Math.floor(g.t*1.5))%7)ctx.fillRect(Math.round(sx-((d*.01)%W+W)%W+W)%W,sy,1,1);}}
  for(const L of b.layers){const y=L.y-oy;const r=L.r;
    if(L.tile){const off=((d*L.sp)%L.tile+L.tile)%L.tile;for(let x=-off;x<W;x+=L.tile){ctx.drawImage(BGI,r[0],r[1],r[2],r[3],Math.round(x*RES)/RES,y,L.w,L.h);if(L.lamps)drawLamps(ctx,L,Math.round(x*RES)/RES,y,W,g.t);}}
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
const PIPS=[['kitHits','#c8d0dc','shield'],['hunger','#ff9a40','food'],['thirst','#5ab8ff','drip'],['poulticeT','#9ae08a','drop'],['rageT','#ff3a2a','up'],['cozyT','#ffb040','up'],['poisonT','#6aff4a','rain'],['shoutT','#ff7a1a','up'],['bleedT','#d01830','drop'],['burnT','#ff8a1f','flame'],['slow','#9ae6ff','snow'],['stun','#ffffff','star'],['shield','#7fd8ff','shield'],['buffT','#ffd23f','up']];
function pip(ctx,x,y,c,k){ctx.fillStyle='#120a14';ctx.fillRect(x-1,y-1,5,5);ctx.fillStyle=c;
  if(k==='food'){ctx.fillRect(x,y,3,1);ctx.fillRect(x+1,y+1,1,2);ctx.fillStyle='#ffd8a0';ctx.fillRect(x,y,1,1);}   // 0.12.72 hunger: a little drumstick
  else if(k==='drip'){ctx.fillRect(x+1,y,1,1);ctx.fillRect(x,y+1,3,1);ctx.fillRect(x+1,y+2,1,1);ctx.fillStyle='#ff6a4a';ctx.fillRect(x+2,y+2,1,1);}   // thirst: a drop with a red fleck
  else if(k==='rain'){ctx.fillRect(x+1,y-1,1,2);ctx.fillRect(x,y+1,3,2);ctx.fillStyle='#d8ffd0';ctx.fillRect(x,y+1,1,1);}   // 0.12.70: poison = a little green raindrop
  else if(k==='drop'){ctx.fillRect(x+1,y,1,1);ctx.fillRect(x,y+1,3,2);}else if(k==='flame'){ctx.fillRect(x+1,y,1,1);ctx.fillRect(x,y+1,3,1);ctx.fillRect(x+1,y+2,1,1);}
  else if(k==='snow'){ctx.fillRect(x+1,y,1,3);ctx.fillRect(x,y+1,3,1);}else if(k==='star'){ctx.fillRect(x,y,1,1);ctx.fillRect(x+2,y,1,1);ctx.fillRect(x+1,y+1,1,1);ctx.fillRect(x,y+2,1,1);ctx.fillRect(x+2,y+2,1,1);}
  else if(k==='shield'){ctx.fillRect(x,y,3,2);ctx.fillRect(x+1,y+2,1,1);}else{ctx.fillRect(x+1,y,1,3);ctx.fillRect(x,y+1,3,1);}}
let PLATE_OFF=false;
/* 0.12.71 (Kyle): a cast/reload bar for anything that casts, channels or reloads: [progress 0..1, colour, still filling?]
   gold = casting, violet = channelling, grey = reloading, red = lazer charge/burn, green = smoking/repairs */
function castBar(h){const C=h.base&&h.base.char;if(!C||!h.alive)return null;const R=C.ranged;
  if(h.cast&&h.cast.T)return [h.cast.t/h.cast.T,'#ffd23f',1];
  if(h.building)return [h.building.t/h.building.T,'#ffb040',1];
  if(h.repairing&&h.repairing.tgt){const T=h.repairing.tgt;return [T.hp/T.max,'#7ee081',1];}
  if(h.lz&&R&&R.lazer){const L=R.lazer;return h.lz.t<L.charge?[h.lz.t/L.charge,'#ff4a3a',1]:[1-(h.lz.t-L.charge)/L.fire,'#ff8a6a',0];}
  if(h.lzReload>0&&R&&R.lazer)return [1-h.lzReload/R.lazer.reload,'#a8b0bc',1];
  if(h.syph)return [1-h.syph.t/((C.abilities||[]).find(a=>a.id==='syphon')||{dur:3}).dur,'#b070ff',0];
  if(h.nano)return [h.nano.t/((C.abilities||[]).find(a=>a.id==='nano')||{dur:5}).dur,'#5af0d0',1];
  if(h.smoking)return [h.smoking.t/2,'#7ee081',1];
  if(h.camping>0)return [1-h.camping/(h.campT0||1.8),'#ffb040',1];
  if(h.summonT>0)return [1-h.summonT/(h.summonT0||.8),'#b070ff',1];
  if(h.casting>0)return [1-h.casting/(h.castT0||.5),'#7ee081',1];
  if(h.setting&&h.setting.T)return [h.setting.t/h.setting.T,'#ffd23f',1];
  if(h.tossing&&h.tossing.T)return [h.tossing.t/h.tossing.T,'#ffd23f',1];
  if(h.volley>0)return [1-h.volley/(h.volleyT0||.6),'#ffd23f',1];
  if(h.blowing>0)return [1-h.blowing/(h.blowT0||.7),'#ffd23f',1];
  if(h.calling&&h.calling.T)return [h.calling.t/h.calling.T,'#ffd23f',1];
  if(R&&R.clip>0&&h.ammo<=0&&R.reload)return [(h.reloadT||0)/R.reload,'#a8b0bc',1];
  if(h.search&&h.search.T)return [h.search.t/h.search.T,'#9ad0ff',1];
  return null;}   /* the camp scene draws its heroes without health plates */
function plate(ctx,u,x,y,w,hero,col){if(PLATE_OFF)return;x=Math.round(x-w/2);y=Math.round(y);const pct=Math.max(0,Math.min(1,u.hp/u.max));
  ctx.fillStyle='#120a14';ctx.fillRect(x-1,y-1,w+2,hero?6:4);ctx.fillStyle='#3a1a24';ctx.fillRect(x,y,w,2);
  ctx.fillStyle=col||(pct>.5?'#4fd46a':pct>.25?'#ffb020':'#e8303a');ctx.fillRect(x,y,Math.round(w*pct),2);
  if(u.max>=20){ctx.fillStyle='rgba(18,10,20,.55)';const n=Math.floor(u.max/10);for(let i=1;i<n;i++){const tx=x+Math.round(w*i*10/u.max);if(tx<x+w)ctx.fillRect(tx,y,1,1);}}
  if(hero){const e=u.enMax?Math.max(0,(u.en||0)/u.enMax):1;ctx.fillStyle='#2a2410';ctx.fillRect(x,y+3,w,1);ctx.fillStyle='#ffd23f';ctx.fillRect(x,y+3,Math.round(w*e),1);}
  let px=x;for(const [k,c,sh] of PIPS)if(u[k]>0){pip(ctx,px+1,y-6,c,sh);px+=5;}}
function drawGame(ctx,g,W,oy){
  const RR=ctx.canvas.width/W;ctx.setTransform(RR,0,0,RR,0,0);ctx.imageSmoothingEnabled=false;ctx.save();
  if(g.shake>0)ctx.translate(Math.round((Math.random()-.5)*4*g.shake),Math.round((Math.random()-.5)*3*g.shake));
  if(g.bgImg){ctx.imageSmoothingEnabled=true;ctx.drawImage(g.bgImg,0,0,W,ctx.canvas.height/RR);ctx.imageSmoothingEnabled=false;}else drawBG(ctx,g,W,oy);ctx.translate(0,-oy);const G=g.G;
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
  const hs=g.heroes.concat((g.pets||[]).filter(p=>p.alive||(p.dog&&p.downed))).sort((a,b)=>a.x-b.x);   // a downed dog lies there until someone helps him up
  for(const h of hs)if(!h.alive&&h.downed){const gy=h.gy||G,k=Math.min(1,(h.revT||0)/(h.revNeed||5)),p=.5+.5*Math.sin(g.t*5);ctx.save();ctx.strokeStyle=`rgba(125,255,154,${.25+.2*p})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(h.x,gy-20,4,0,7);ctx.stroke();
    if(k>0){ctx.strokeStyle='#7dff9a';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(h.x,gy-20,4,-Math.PI/2,-Math.PI/2+k*6.283);ctx.stroke();}ctx.fillStyle='#7dff9a';ctx.fillRect(h.x-.5,gy-22,1,4);ctx.fillRect(h.x-2,gy-20.5,4,1);ctx.restore();}   // downed: a + to help them up, filling as an ally stands on them
  for(const h of hs)if(!h.alive){const gy=h.gy||G;ctx.save();shrinkAt(ctx,h.x,gy,HS);const U=UNITS[h.key];if(U&&U.death)drawUnit(ctx,U.death,U.death.n-1,h.x,gy-(U.death.fall?2:0),U.death.pre?ART_SCALE/U.death.pre/HS:U.death.art?ART_SCALE/HS:1,.9,0,U.death.fall?((h.face||1)>0?1.45:-1.45):0,((h.face||1)>0)!==!!U.death.faceR);else spr(ctx,'h_'+h.key,10,h.x-32,gy-60,false,.85);ctx.restore();}
  for(const f of g.fx)if(f.k==='corpse'&&UNITS[f.skin||f.type]){ctx.save();shrinkAt(ctx,f.x,f.gy!=null?f.gy:G,HS);ctx.restore();const U=UNITS[f.skin||f.type],k=f.t/f.life;const fall=Math.min(1,k*3.2);
    if(U.die){const fr=Math.min(U.die.n-1,Math.floor(k/.7*U.die.n));const E2=CFG.enemies[f.type]||{};drawUnit(ctx,U.die,fr,f.x,f.gy!=null?f.gy:G,HS*(E2.scale||1)*(f.elite?1.1:1)*(U.die.pre?.88/U.die.pre:1),k>.75?(1-k)*4:1,0,0,!!U.die.faceR);continue;}
    drawUnit(ctx,U.walk,0,f.x+fall*3,f.gy!=null?f.gy:G+(f.lane||0),HS*(f.elite?1.1:1),Math.min(1,2.2*(1-k)),0,-fall*Math.PI/2*.96);}
  for(const f of g.fx)if(f.k==='corpse'){const n='e_'+f.type,a=SP[n];if(!a||UNITS[f.type])continue;const k=f.t/f.life;const big=FH(a)===64;
    const y=f.fly?Math.min(G-44,f.y-FH(a)/2+f.t*160):G-(big?60:44)+(f.lane||0);ctx.save();if(f.elite){ctx.translate(f.x,y+FH(a));ctx.scale(1.22,1.22);spr(ctx,n,10,-FW(a)/2,-FH(a),false,Math.min(1,2.2*(1-k)));}else spr(ctx,n,10,f.x-FW(a)/2,y,false,Math.min(1,2.2*(1-k)));ctx.restore();}
  const laser=()=>{for(const h of g.heroes){const K=h.cast;if(!h.alive||!K||!K.tgt||K.tgt.dead)continue;const T=K.tgt,mz=MUZZLE[h.key]||[10,30];
      const x0=g.heroX(h)+(h.face<0?-1:1)*mz[0],y0=(h.gy||g.G)-mz[1],tx=T.x,ty=(T.gy!=null&&!T.fly?T.gy:g.G)-(T.type==='werewolf'?18:38)*HS*((T.E&&T.E.scale)||1);
      const k=K.t/K.T;ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(255,40,40,${.35+.45*k})`;ctx.lineWidth=.6+k*.6;ctx.setLineDash(k>.75?[]:[3,2]);
      ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(tx,ty);ctx.stroke();ctx.setLineDash([]);glow(ctx,tx,ty,3+3*k,'#ff2828',.35+.3*Math.sin(g.t*30));ctx.restore();}};
  const traps=()=>{const T0=UNITS.flannel&&UNITS.flannel.tripbomb,BB=UNITS.flannel&&UNITS.flannel.bombball;if(!T0)return;for(const T of g.traps||[]){
      if(T.how&&T.how!=='plant'&&BB){   /* 0.12.58 thrown/tossed Proximity_Bomb: just the ball, spinning through the air, rolling, then blinking once armed */
        const y=T.gy-(T.air||0);ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(Math.round(T.x-3+(T.air||0)*.05),T.gy-1,6,1.5);ctx.save();ctx.translate(T.x,y-3.5);ctx.rotate(T.spin||0);
        drawUnit(ctx,BB,0,0,3.5,.5*HS,1,0,0,false);ctx.restore();
        if(T.live){const p=.5+.5*Math.sin(g.t*6);ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,T.x,y-3,7+2*p,'#ff2a1a',.35+.25*p);ctx.restore();if(p>.5){ctx.fillStyle='#ff4030';ctx.fillRect(Math.round(T.x)-.5,Math.round(y-7.5),1,1);}}   /* 0.12.59: activated (6d4): the rust-mine red glow */
        continue;}
      if(T.live&&T.t>=T.A.arm){const p=.5+.5*Math.sin(g.t*6);ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,T.x-2,T.gy-4,8+2*p,'#ff2a1a',.3+.2*p);ctx.restore();}
      ctx.save();shrinkAt(ctx,T.x,T.gy,HS);
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
  /* 0.12.69 Hatchet_Leap landing: a cracked-earth decal that lingers, dust clouds rolling out, pebbles thrown up, a short burst of energy */
  /* 0.12.70 Syphon_Life: two twisting strands (black and violet) from his chest to the target's middle, motes of life drifting back into him;
     a burrow puff where Call_of_Cthulhu pulls a tentacle under; a green glint on his dagger during Lethal_Strikes */
  const voidFx=()=>{for(const h of g.alive()){if(h.key!=='cultist')continue;const hx=g.heroX(h),gy=h.gy||G;
      if(h.syph&&h.syph.tg&&!h.syph.tg.dead){const T=h.syph.tg,x0=hx+(h.face||1)*3,y0=gy-12,x1=T.x,y1=(T.gy!=null?T.gy:G)-(T.boss?30:12),L=Math.hypot(x1-x0,y1-y0)||1,nx=-(y1-y0)/L,ny=(x1-x0)/L;
        ctx.save();for(const [w,c,ph,amp] of [[3.2,'rgba(10,0,16,.75)',0,2.2],[1.6,'rgba(150,60,255,.85)',Math.PI,2],[.7,'rgba(230,200,255,.9)',Math.PI*.5,1.2]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();
          for(let i=0;i<=24;i++){const k=i/24,sw=Math.sin(k*12-g.t*14+ph)*amp*Math.sin(k*Math.PI),x=x0+(x1-x0)*k+nx*sw,y=y0+(y1-y0)*k+ny*sw;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
        ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const k=1-((g.t*1.3+i/5)%1);glow(ctx,x0+(x1-x0)*k,y0+(y1-y0)*k+Math.sin(g.t*9+i)*1.5,1.3,i%2?'#ff5a8a':'#b070ff',.8);}
        glow(ctx,x1,y1,5,'#6a20c0',.35);glow(ctx,x0,y0,3,'#b070ff',.4);ctx.restore();}
      if(h.lethalT>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,hx+(h.face||1)*7,gy-10,2.2,'#6aff4a',.35+.25*Math.sin(g.t*14));ctx.restore();}}
    for(const f of g.fx){if(f.k!=='burrow')continue;const k=f.t/f.life;for(let i=0;i<5;i++)puffAt(f.x+(i-2)*2.5,f.gy-1-k*5-(i%2),1.6+k*2,.6*(1-k),'#4a3a2c');}};
  const slamDraw=()=>{for(const f of g.fx){if(f.k!=='crack')continue;const k=f.t/f.life,a=k>.7?(1-k)/.3:1;let sd=Math.floor(f.x*13+f.gy*7);const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280;};
      ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(20,12,8,.35)';ctx.beginPath();ctx.ellipse(f.x,f.gy,f.r*.55,f.r*.16,0,0,7);ctx.fill();
      for(let i=0;i<8;i++){let ang=i/8*6.283+R()*.5,x=f.x,y=f.gy,L=f.r*(.55+R()*.6);ctx.beginPath();ctx.moveTo(x,y);
        for(let j=1;j<=3;j++){ang+=(R()-.5)*.7;x=f.x+Math.cos(ang)*L*j/3;y=f.gy+Math.sin(ang)*L*j/3*.28;ctx.lineTo(x,y);}
        ctx.strokeStyle='#1a0e08';ctx.lineWidth=1.1-.0*i;ctx.stroke();ctx.strokeStyle='rgba(200,150,100,.35)';ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(f.x,f.gy+.6);ctx.lineTo(x,y+.6);ctx.stroke();}
      ctx.restore();}
    for(const f of g.fx){if(f.k!=='slam')continue;const k=f.t/f.life;ctx.save();
      if(k<.35){ctx.globalCompositeOperation='lighter';glow(ctx,f.x,f.gy-4,f.r*(.5+k*2),'#ffb040',.45*(1-k/.35));glow(ctx,f.x,f.gy-3,4,'#fff0c0',.7*(1-k/.35));ctx.globalCompositeOperation='source-over';
        ctx.strokeStyle=`rgba(255,200,110,${.8*(1-k/.35)})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(f.x,f.gy-1,f.r*(.4+k*3.4),f.r*(.12+k*.9),0,0,7);ctx.stroke();}
      for(let i=0;i<6;i++){const s=i%2?1:-1,d=f.r*(.3+k*1.4)*(1+i%3*.25),r=(2.2+i%3)*(.6+k*1.2);puffAt(f.x+s*d,f.gy-2-k*4-(i%3),r,.55*(1-k),'#9a8670');}   // dust rolling out both ways
      for(let i=0;i<10;i++){const a=((f.seed+i*2.4)%3.1)+.02,sp=18+(i*7%11)*2,px=f.x+Math.cos(a)*sp*k*1.4*(i%2?1:-1),py=f.gy-2-(Math.sin(a)*40*k-60*k*k)-2;
        if(py<f.gy){ctx.fillStyle=i%3?'#6a5a48':'#a89880';ctx.globalAlpha=1-k*.6;ctx.fillRect(px,py,i%4?1:1.5,i%4?1:1.5);}}   // pebbles
      ctx.restore();}};
  const pinnedDraw=()=>{for(const f of g.fx){if(f.k!=='pinned')continue;const e=f.e;if(e&&!e.dead){f.x=e.x;f.gy=e.gy!=null?e.gy:G;}const k=f.t/f.life,a=k>.85?(1-k)/.15:1;
      const B=UNITS.archer&&UNITS.archer.arrow;const x=f.x-f.dir*1.5,y=f.gy-3.5;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(f.dir>0?.62:Math.PI-.62);   /* 0.12.68: the big arrow driven through the legs into the dirt */
      if(B)drawUnit(ctx,B,0,0,0,ART_SCALE/B.pre*2,a,0,0,false);else{ctx.fillStyle='#8a6a4a';ctx.fillRect(-9,-.5,12,1);}ctx.restore();
      ctx.fillStyle=`rgba(60,40,24,${.6*a})`;ctx.fillRect(Math.round(f.x+f.dir*1.5)-2,Math.round(f.gy)-.5,4,1.2);   // dirt kicked up where it bit in
      if(f.t<.25)for(let i=0;i<4;i++){ctx.fillStyle=`rgba(150,120,90,${1-f.t*4})`;ctx.fillRect(f.x+f.dir*2+(i-1.5)*1.6,f.gy-1-f.t*14*(1+i%2),1,1);}}};
  const bottleDraw=()=>{for(const B of g.bottles||[]){const y=B.gy-B.hgt*.5-6;ctx.save();ctx.translate(B.x,y);ctx.rotate(B.rot);   /* 0.12.68 Bottle_Distraction: a green glass bottle tumbling in a big arc */
      ctx.fillStyle='#1e4a2a';ctx.fillRect(-1.5,-3,3,5);ctx.fillRect(-.5,-5,1,2);ctx.fillStyle='#3c8a52';ctx.fillRect(-1,-2.5,1,4);ctx.fillStyle='#bfe8c8';ctx.fillRect(-1,-2.5,.6,2);ctx.fillStyle='#8a5a30';ctx.fillRect(-.5,-5.5,1,.8);ctx.restore();
      ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(B.x-1.5,B.gy-.5,3,1);}
    for(const f of g.fx){if(f.k!=='glass')continue;const k=f.t/f.life;ctx.save();ctx.globalAlpha=1-k;for(let i=0;i<9;i++){const a=i*.7+1,sp=10+((i*37)%7)*2.2,dx=Math.cos(a)*sp*Math.min(1,k*2.4),up=Math.sin(Math.min(1,k*2)*Math.PI)*(4+i%3*2);
        ctx.fillStyle=i%3?'#7fd49a':'#e8fff0';ctx.fillRect(f.x+dx,f.gy-1-up,1,1);}
      ctx.strokeStyle=`rgba(230,255,240,${.7*(1-k)})`;ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(f.x,f.gy-1,6+k*24,1.5+k*6,0,0,7);ctx.stroke();   // the noise rings out
      if(k<.5){ctx.fillStyle='#ffffff';ctx.font='bold 5px monospace';ctx.textAlign='center';ctx.fillText('CRASH!',f.x,f.gy-12-k*8);}ctx.restore();}};
  /* 0.12.105 Grenade_Launcher rounds: a stubby 40mm grenade. In the air it points the way it's flying (nose down on the way in,
     steeper from the tower); once it hits the ground it tumbles and rolls, and blinks red while the fuse runs. */
  const nadeDraw=()=>{for(const N of g.glNades||[]){const y=N.gy-N.z*.6-2;let ang;
      if(N.st==='fly'){const vy=-N.vz*.6;ang=Math.atan2(vy,N.vx);}else ang=N.rot;
      ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(N.x-1.5,N.gy-.5,3,1);
      ctx.save();ctx.translate(N.x,y);ctx.rotate(ang);ctx.scale(.7,.7);   /* 0.12.161 (Kyle): a little smaller */
      ctx.fillStyle='#3e4a2a';ctx.fillRect(-2.2,-1.2,3.2,2.4);   /* olive body */
      ctx.fillStyle='#c9a24a';ctx.fillRect(-2.6,-1.2,.8,2.4);   /* brass case base */
      ctx.fillStyle=N.st!=='fly'&&N.vx===0&&Math.floor(N.fuseT*12)%2?'#ff3a2a':'#8a9a5a';ctx.beginPath();ctx.moveTo(1,-1.2);ctx.lineTo(2.6,0);ctx.lineTo(1,1.2);ctx.closePath();ctx.fill();   /* ogive nose (blinks while the fuse runs) */
      ctx.fillStyle='#ffd23f';ctx.fillRect(-.6,-1.2,.5,2.4);   /* yellow HE band */
      ctx.restore();}};
  const rainDraw=()=>{for(const f of g.fx)if(f.k==='stuck'){const k=f.t/f.life;drawUnit(ctx,RAIN.s,0,f.x,f.gy+1,.5,k>.7?(1-k)/.3:1,0,0,false);}
    for(const R of g.rain||[]){if(R.t<0)continue;const k=Math.min(1,R.t/R.T);drawUnit(ctx,RAIN.f,0,R.x,R.gy-(1-k)*90,.5,1,0,0,false);}};
  // Druid effects: Mend sparkle, Bloom vine heart on the healed ally, Thorn Eruption spikes, Cyclone tornadoes
  // 0.12.17 Moss_Mech effects: arc blade glow and slashes, chain lightning, missiles and their smoke trails, grenades and smoke clouds
  const zig=(x0,y0,x1,y1,n,amp)=>{ctx.beginPath();ctx.moveTo(x0,y0);for(let i=1;i<n;i++){const k=i/n;ctx.lineTo(x0+(x1-x0)*k+(Math.random()*2-1)*amp*.4,y0+(y1-y0)*k+(Math.random()*2-1)*amp);}ctx.lineTo(x1,y1);ctx.stroke();};
  const puffAt=(x,y,r,a,shade)=>{ctx.globalAlpha=a;ctx.fillStyle=shade||'#c9d2da';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.fillStyle='#eef3f6';ctx.beginPath();ctx.arc(x-r*.3,y-r*.35,r*.55,0,7);ctx.fill();ctx.globalAlpha=1;};
  const robotFx=()=>{
    /* 0.12.67 Warhound: pilot light on the flamethrower; the Targeted Lazer (lens charge, a thick pulsing red beam angled down from his hull to
       a target reticle on the ground, ground fire riding the tip, blue arcs when Arc Surge is on); the blue jetpack flames + shield; nano glow */
    for(const h of g.alive())if(h.key==='robot'){const d=(h.face||1)>0?1:-1,hx=g.heroX(h),gy=h.gy||g.G,lift=(h.leapH||0)*1.2*HS;ctx.save();ctx.globalCompositeOperation='lighter';
      if(!h.jet&&!h.nano){const px=hx+d*(h.animM>0||h.lz?17.7:14.1),py=gy-(h.animM>0||h.lz?22:13)-lift;glow(ctx,px,py,1.6+Math.random()*.4,'#ff9a30',.55);glow(ctx,px,py,.7,'#fff0b0',.9);}
      if(h.lz){const C2=h.base.char.ranged.lazer,L=h.lz,ex=hx+d*8.2,ey=gy-25.5-lift,tx=L.tx,ty=L.gy-1.5,S=h.surgeT>0;
        if(L.t<C2.charge){const k=L.t/C2.charge;glow(ctx,ex,ey,1.2+2.5*k,'#ff2a1a',.35+.4*k);ctx.strokeStyle=`rgba(255,60,40,${.35+.5*k})`;ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(tx,ty+1,6*(1-k)+2,2*(1-k)+1,0,0,7);ctx.stroke();
          ctx.setLineDash([1.5,2]);ctx.strokeStyle=`rgba(255,80,60,${.25*k})`;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(tx,ty);ctx.stroke();ctx.setLineDash([]);}
        else{const fl=.75+.25*Math.sin(g.t*40);for(const [w,c] of [[S?4.4:3.4,`rgba(255,20,10,${.28*fl})`],[S?2.2:1.7,`rgba(255,70,40,${.7*fl})`],[.7,'rgba(255,235,225,.95)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(tx,ty);ctx.stroke();}
          glow(ctx,ex,ey,3,'#ff3020',.6);glow(ctx,tx,ty,(S?8.3:6.7)*.9,'#ff4010',.22);glow(ctx,tx,ty,2.2,'#fff0d0',.85);
          if(S&&Math.random()<.8){ctx.strokeStyle='rgba(150,220,255,.9)';ctx.lineWidth=.5;const m=Math.random();zig(ex+(tx-ex)*m,ey+(ty-ey)*m,ex+(tx-ex)*(m+.15),ey+(ty-ey)*(m+.15)+(Math.random()-.5)*4,3,1.5);}
          ctx.restore();ctx.save();fireBit(tx-d*1.5,L.gy+1,.3,4+Math.floor(g.t*12)%4,.9);fireBit(tx-d*4.5,L.gy+1,.2,4+Math.floor(g.t*12+2)%4,.7);ctx.globalCompositeOperation='lighter';}}
      if(h.jet){const bx=hx-d*9,by=gy-9-lift;for(const o of[-1.3,1.3])blueFire(bx+o,by,.3+Math.random()*.06,4+Math.floor(g.t*14+(o>0?2:0))%4,.95,1);
        glow(ctx,bx,by+5,4.5,'#3a8cff',.35);ctx.strokeStyle=`rgba(120,200,255,${.5+.2*Math.sin(g.t*20)})`;ctx.lineWidth=.9;ctx.beginPath();ctx.ellipse(hx,gy-16-lift,14,19,0,0,7);ctx.stroke();glow(ctx,hx,gy-16-lift,16,'#4aa8ff',.1);}
      if(h.nano)glow(ctx,hx,gy-15,15,'#5af0d0',.08+.05*Math.sin(g.t*8));
      if(h.surgeT>0&&!h.lz&&Math.random()<.5){ctx.strokeStyle='rgba(150,220,255,.85)';ctx.lineWidth=.5;zig(hx+d*8,gy-26-lift,hx+d*(8+Math.random()*4),gy-21-lift,3,1.2);}
      ctx.restore();}
    for(const f of g.fx){const k=f.t/f.life;
      if(f.k==='arc'){const d=f.dir,cx=f.x+d*6,cy=f.gy-10,R=f.big?13:10;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-k;ctx.lineCap='round';
        for(const [w,c] of [[3.2,'rgba(30,140,255,.6)'],[1.3,'rgba(200,245,255,.95)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();const a0=d>0?-1.25:Math.PI+1.25,a1=d>0?1.1:Math.PI-1.1,s=a0+(a1-a0)*Math.min(1,k*2.2);ctx.arc(cx-d*4,cy,R,Math.min(a0,s),Math.max(a0,s));ctx.stroke();}
        ctx.strokeStyle='rgba(170,230,255,.9)';ctx.lineWidth=.6;zig(cx,cy-8,cx+d*6,cy+6,4,1.6);ctx.restore();continue;}
      if(f.k==='bolt'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-k;for(const [w,c] of (f.c==='y'?[[2.4,'rgba(255,220,60,.7)'],[.8,'rgba(255,255,220,1)']]:f.c==='v'?[[2.4,'rgba(140,50,255,.7)'],[.8,'rgba(230,200,255,1)']]:[[2.4,'rgba(40,150,255,.7)'],[.8,'rgba(230,250,255,1)']])){ctx.strokeStyle=c;ctx.lineWidth=w;for(let i=1;i<f.pts.length;i++){const [a,b]=f.pts[i-1],[x,y]=f.pts[i];zig(a,b,x,y,5,2.2);}}
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
    for(const h of g.alive())if(h.sandbag&&!h.sbThrow){const x=Math.round(g.heroX(h)-7),y=Math.round((h.gy||g.G)-31);ctx.fillStyle='#3a2c18';ctx.fillRect(x-1,y-1,6,5);ctx.fillStyle='#b89c68';ctx.fillRect(x,y,4,3);ctx.fillStyle='#8a7048';ctx.fillRect(x,y+1,4,.6);}   /* 0.12.104 carrying the Sandbag Wall: a little burlap bag */
    for(const h of g.alive())if(h.medkit){const x=Math.round(g.heroX(h)+6),y=Math.round((h.gy||g.G)-31);ctx.fillStyle='#202020';ctx.fillRect(x-1,y-1,5,5);ctx.fillStyle='#f2f2f2';ctx.fillRect(x,y,3,3);ctx.fillStyle='#e02020';ctx.fillRect(x+1,y,1,3);ctx.fillRect(x,y+1,3,1);}   /* carrying an ambulance Medkit */
    for(const h of g.alive()){if(h.kit&&h.kit.length){const y=(h.gy||g.G)-30;h.kit.forEach((it,i)=>{const x=g.heroX(h)-3+i*3;if(it==='med'){ctx.fillStyle='#f0f0f0';ctx.fillRect(x,y-1,2,2);ctx.fillStyle='#e02020';ctx.fillRect(x+.5,y-.5,1,1);}else{ctx.fillStyle='#ffd23f';ctx.fillRect(x,y-1.5,1.5,2.5);ctx.fillStyle='#404040';ctx.fillRect(x+.2,y-2,1,.6);}});}
      if(h.herbs>0){const y=(h.gy||g.G)-30;for(let i=0;i<h.herbs;i++){const x=g.heroX(h)-3+i*3;ctx.fillStyle='#2e7a2a';ctx.fillRect(x,y,2,1.5);ctx.fillStyle='#8fe36a';ctx.fillRect(x,y-.6,1.2,1);}}   // Scavenger: herbs carried
      if(h.herbT>0&&Math.random()<.4){ctx.fillStyle='rgba(140,230,110,.8)';ctx.fillRect(g.heroX(h)-5+Math.random()*10,(h.gy||g.G)-6-Math.random()*16,1,1);}}
    for(const f of g.fx)if(f.k==='herbget'){const k=f.t/f.life;ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle={med:'#f2f2f2',bat:'#7fe0ff',defib:'#f2d23a'}[f.kit]||'#8fe36a';ctx.fillRect(f.x-1,f.y-k*6,3,2);ctx.fillStyle='#2e7a2a';ctx.fillRect(f.x,f.y-k*6+1,1,2);ctx.restore();}
    for(const h of g.alive()){const A=h.search?[h.search.t,h.search.T||1.5,h.search.trap||h.search.disarm?'#9ad0ff':'#e8ecf2','#8a92a0']:h.setting?[h.setting.t,h.setting.T,'#ffc070','#a06030']:h.planting?[h.planting.t,h.planting.T,'#ffc070','#a06030']:null;if(!A)continue;   /* 0.12.55: one progress bar for every timed action: searching (silver), defusing / alarms (blue), planting (amber) */
      const k=Math.min(1,A[0]/A[1]),x=Math.round(g.heroX(h)+8),y0=Math.round((h.gy||g.G)-14),H=12;ctx.fillStyle='#000b';ctx.fillRect(x-1,y0-H-1,4,H+2);const f=Math.round(H*k);const gr=ctx.createLinearGradient(x,0,x+2,0);gr.addColorStop(0,A[2]);gr.addColorStop(1,A[3]);ctx.fillStyle=gr;ctx.fillRect(x,y0-f,2,f);}   // searching: a silver bar rising beside him
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
  /* 0.12.62 Warhound flamethrower: campfire flames (Kyle's fire art, logs cut off) pouring out in a widening cone, with a hot glow; burning enemies carry small flames */
  const blueFire=(x,gy,s,fr,a,down)=>{const IM=XIMG.camp;if(!IM||!IM.complete)return;if(!XIMG._blueCamp){try{const c=document.createElement('canvas');c.width=IM.width;c.height=IM.height;const cx=c.getContext('2d');cx.drawImage(IM,0,0);const D=cx.getImageData(0,0,c.width,c.height),p=D.data;
      for(let i=0;i<p.length;i+=4){const r=p[i],gg=p[i+1],b=p[i+2];p[i]=b*.6;p[i+1]=gg*.85;p[i+2]=Math.min(255,r*1.1+30);}cx.putImageData(D,0,0);XIMG._blueCamp=c;}catch(e){XIMG._blueCamp=IM;}}   /* 0.12.67: Kyle's campfire flames, recoloured blue for the jetpack */
    ctx.save();ctx.globalAlpha=a;if(down){ctx.translate(x,gy);ctx.scale(1,-1);ctx.translate(-x,-gy);}ctx.drawImage(XIMG._blueCamp,fr*34+3,0,28,27,x-14*s,gy-27*s,28*s,27*s);ctx.restore();};   // down: the flame points down (jet exhaust)
  const fireBit=(x,gy,s,fr,a)=>{const IM=XIMG.camp;if(!IM||!IM.complete)return;ctx.save();ctx.globalAlpha=a;ctx.drawImage(IM,fr*34+3,0,28,27,x-14*s,gy-27*s,28*s,27*s);ctx.restore();};
  /* 0.12.77 (Kyle's flamethrower sheet, crawl_flame.png): 15 frames, 290x200 each, nozzle at (22,156): 5 ignite, 5 full burst, 5 dying off.
     Scaled so the burst reaches the flame's length, anchored on the nozzle (the Warhound's) or in front of the Fireman_Zombie, mirrored when facing left */
  const flames=()=>{const IM=XIMG.flame;for(const f of g.fx){if(f.k!=='flame')continue;const k=Math.min(.999,f.t/f.life),src=f.src;
      let x0,y0;if(src&&src.alive&&src.key==='robot'){x0=g.heroX(src)+f.dir*13;y0=(src.gy||G)-13.5;}else{x0=src&&!src.dead&&src.x!=null?src.x+f.dir*12:f.x;y0=f.gy-12;}f.x=x0;
      const fi=k<.2?Math.floor(k/.2*5):k<.72?5+Math.floor((k-.2)/.52*10)%5:10+Math.min(4,Math.floor((k-.72)/.28*5));
      if(IM&&IM.complete&&IM.naturalWidth){const s=f.len/205;ctx.save();ctx.translate(x0,y0);const dn=Math.max(0,(f.gy-y0));const ang=Math.min(.45,.216*dn/13.5);ctx.rotate(f.dir*ang);ctx.scale(f.dir*s,s*.62);ctx.drawImage(IM,fi*290,0,290,200,-22,-156,290,200);ctx.restore();}}   // 0.12.78: from the barrel, angled so the bottom of the burst just touches the ground of his lane
    for(const e of g.enemies)if(e.fb&&!e.dead){const fr=4+Math.floor(g.t*10+e.phase*3)%4;fireBit(e.x+Math.sin(g.t*7+e.phase)*2,(e.gy!=null?e.gy:G)-14,.32,fr,.85);fireBit(e.x-3,(e.gy!=null?e.gy:G)-4,.22,(fr+2)%4+4,.7);}};
  /* 0.12.66 JP: the doobie (a little white joint at his mouth burning down over the 2s, glowing ember), smoke puffs drifting off him,
     a green haze while he's HIGH, a dust trail while he rushes to family, and his shield glinting during Trash_Talk */
  const jpFx=()=>{for(const h of g.heroes){if(h.key!=='jp'||!h.alive)continue;const gy=h.gy||G,dir=(h.face||1)>0?1:-1,mx=h.x+dir*2.2,my=gy-16.4;
      if(h.smoking){const k=Math.min(1,h.smoking.t/2),L=3.4*(1-k*.6);ctx.fillStyle='#f4efe4';ctx.fillRect(Math.min(mx,mx+dir*L),my,Math.abs(dir*L),.9);
        const fl=.6+.4*Math.sin(g.t*23);ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,mx+dir*L,my+.4,2.2,'#ff6a20',.5*fl);ctx.restore();ctx.fillStyle=fl>.7?'#ffd060':'#ff4a10';ctx.fillRect(mx+dir*L-.5,my,1,1);
        for(let i=0;i<5;i++){const p=((g.t*.7+i*.2)%1);ctx.globalAlpha=(1-p)*.55;ctx.fillStyle='#c8c8c0';const r=.8+p*2.6;ctx.beginPath();ctx.arc(mx+dir*(L+1)+Math.sin(g.t*2+i)*2+p*4*dir,my-1-p*14,r,0,7);ctx.fill();}ctx.globalAlpha=1;}
      if(h.highT>0){const p=.5+.5*Math.sin(g.t*1.7);ctx.globalAlpha=.18+.1*p;ctx.fillStyle='#9ad06a';for(let i=0;i<3;i++){const q=((g.t*.25+i/3)%1);ctx.beginPath();ctx.arc(h.x-3+i*3+Math.sin(g.t+i)*2,gy-22-q*10,1.4+q*2,0,7);ctx.fill();}ctx.globalAlpha=1;}
      if(h.rush){ctx.fillStyle='rgba(180,150,110,.5)';for(let i=0;i<4;i++)ctx.fillRect(h.x-dir*(4+i*3)+Math.sin(g.t*30+i)*1,gy-1-(i%2),2,1.5);}
      if(h.trashT>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,h.x+dir*3,gy-14,6,'#ffb040',.25+.15*Math.sin(g.t*8));ctx.restore();}}};
  const logs=()=>{for(const L of g.logs||[]){const x=Math.round(L.x),y=L.gy,a=(L.x-L.x0)/5;ctx.save();ctx.translate(x,y-4);   /* 0.12.58 Log_Roll: a rolling log with dust behind it */
      ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(-7,3,14,2);ctx.fillStyle='#6b4423';ctx.fillRect(-7,-3,14,7);ctx.fillStyle='#8a5a30';ctx.fillRect(-7,-3,14,2);
      ctx.fillStyle='#c8a070';ctx.beginPath();ctx.ellipse(7,0.5,2,3.5,0,0,7);ctx.fill();ctx.strokeStyle='#7a4a20';ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(7,.5,1,2,0,0,7);ctx.stroke();
      ctx.fillStyle='#4a2c14';for(let i=0;i<3;i++){const px=((i*5-a*3)%14+14)%14-7;ctx.fillRect(px,-3,1,7);}ctx.restore();
      ctx.fillStyle='rgba(170,140,100,.5)';for(let i=0;i<4;i++){const ph=(g.t*3+i*.25)%1;ctx.fillRect(x-9-ph*10,y-2-ph*4,1.5,1.5);}}};
  const quakes=()=>{for(const f of g.fx)if(f.k==='quake'){if(f.chop){const k0=Math.min(1,f.t/(f.life*.7)),n=7;ctx.save();   /* 0.12.58 Ground_Chop: rock spikes burst up along the ground, running outward from the axe */
      for(let i=0;i<n;i++){const p=i/(n-1);if(p>k0)break;const life=1-Math.min(1,(k0-p)*2.2+f.t/f.life*.5);if(life<=0)continue;const sx=f.x-f.chop*f.w/2+f.chop*p*f.w,hh=(3+4*(1-p*.4))*life;ctx.fillStyle='#5a4228';ctx.beginPath();ctx.moveTo(sx-2.5,f.gy);ctx.lineTo(sx-.5,f.gy-hh);ctx.lineTo(sx+.6,f.gy-hh*.7);ctx.lineTo(sx+2.5,f.gy);ctx.fill();ctx.fillStyle='#b89060';ctx.fillRect(sx-.5,f.gy-hh,1,1.2);
        ctx.fillStyle=`rgba(190,160,110,${.6*life})`;ctx.fillRect(sx-3+((i*7)%5),f.gy-hh-2-(1-life)*4,1.5,1.5);ctx.fillRect(sx+1,f.gy-hh-4-(1-life)*6,1,1);}ctx.restore();}const k=f.t/f.life;ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle='#8a6a40';
      for(let i=0;i<8;i++){const x=f.x-f.w/2+(i+.5)*f.w/8;ctx.fillRect(x-1,f.gy-1-Math.sin((k+i*.13)*Math.PI)*4,2,2);}ctx.strokeStyle='#c8a060';ctx.beginPath();ctx.moveTo(f.x-f.w/2,f.gy);ctx.lineTo(f.x+f.w/2,f.gy);ctx.stroke();ctx.restore();}};
  const booms=()=>{for(const f of g.fx){if(f.k==='strike'&&ATLAS.strike){const S=ATLAS.strike,k=f.t/f.life,fr=Math.min(S.n-1,Math.floor(k*S.n));ctx.save();ctx.globalCompositeOperation='lighter';ctx.filter='hue-rotate(180deg) saturate(1.6)';drawUnit(ctx,S,fr,f.x,f.gy+1,.6,k>.8?(1-k)/.2:1,0,0,false);ctx.restore();glow(ctx,f.x,f.gy-4,14,'#fff08a',.5*(1-k));continue;}   /* 0.12.178 Thunderclap: the pack's lightning strike, tinted yellow */
    if(f.k==='frag'&&ATLAS.frag){const F=ATLAS.frag,k=f.t/f.life,fr=Math.min(F.n-1,4+Math.floor(k*(F.n-4)));drawUnit(ctx,F,fr,f.x,f.gy+2,.52,k>.8?(1-k)/.2:1,0,0,false);continue;}   /* 0.12.175 frag blast: the pack's explosion */
    if(f.k!=='boom')continue;const k=f.t/f.life,fr=Math.min(BOOM.n-1,Math.floor(k*BOOM.n));drawUnit(ctx,BOOM,fr,f.x,f.gy+2,f.small?.17:.32,k>.85?(1-k)/.15:1,0,0,false);}};
  /* 0.12.107 Shadow_Clone: a see-through copy of Chibi with a faint purple glow, moving and swinging on its own */
  const drawClone=(c)=>{const h=c.owner;if(!h)return;const fade=Math.min(1,(c.life-c.t)/.4,c.t/.25);
    ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,c.x,c.gy-12,7,'#b066ff',.13*fade);glow(ctx,c.x,c.gy-12,3.5,'#d9a6ff',.08*fade);ctx.restore();
    const ghost=Object.assign({},h,{x:c.x,gy:c.gy,face:c.face,ghost:1,moving:c.moving,walkT:c.walkT,animM:c.animM,animT:c.animM>0?.35-c.animM:0,swingAnim:h.swingAnim||'attack1',leapH:0,bleedT:0,shield:0,shieldT:0,hotT:0,cozyT:0,stealthT:0,cloneT:0,smoking:null,dash:null,whirl:null,perch:null,sbThrow:null,climb:null,sandbag:0,medkit:0,defib:0,herbs:0,kit:[],hitFlash:0,downed:0,riseT:0,shoutT:0,rageT:0,courage:0});
    GHOST_A=.5*fade;try{drawHero(ghost);}finally{GHOST_A=1;}};
  const drawHero=(h)=>{const G0=h.gy||g.G;ctx.save();shrinkAt(ctx,h.x,G0,HS);drawHero0(h);ctx.restore();};
  const drawHero0=(h)=>{const G=h.gy||g.G;if(!h.alive){return;}
    if(h.bleedT>0){const p=.5+.5*Math.sin(g.t*10);ctx.save();ctx.globalCompositeOperation='lighter';
      for(let r=0;r<3;r++){const rr=((g.t*1.4+r/3)%1);ctx.strokeStyle=`rgba(220,20,40,${.55*(1-rr)})`;ctx.beginPath();ctx.ellipse(h.x,G-26,8+rr*14,(8+rr*14)*1.25,0,0,7);ctx.stroke();}
      glow(ctx,h.x,G-26,10+2*p,'#c0102a',.18);ctx.restore();
      for(let i=0;i<5;i++){const u2=((g.t*1.6+i*.21)%1);const dx=Math.round(h.x-7+((i*37)%15));const dy=Math.round(G-44+u2*42);ctx.fillStyle=u2<.15?'#ff3a4a':'#c0102a';ctx.fillRect(dx,dy,2,2);if(u2>.92){ctx.fillStyle='#7a0a16';ctx.fillRect(dx-1,G-1,3,1);}}}
    if(h.rageT>0){const p=.5+.5*Math.sin(g.t*9);ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,h.x,G-24,15+3*p,'#a0541c',.32);glow(ctx,h.x,G-24,8,'#ff8a30',.12+.08*p);   /* 0.12.58 Timber_Rage: a pulsing brown-orange glow and wood chips flying off him */
      for(let i=0;i<5;i++){const u2=((g.t*1.3+i*.2)%1);ctx.fillStyle=u2<.3?'#e0a060':'#8a5a2a';ctx.fillRect(Math.round(h.x-8+((i*29)%17)),Math.round(G-10-u2*40),1.5,1);}ctx.restore();}
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
      else if((h.building||h.repairing)&&U.kneel){A=U.kneel;f=Math.min(A.n-1,2+Math.floor(g.t*6)%Math.max(1,A.n-2));}   // 0.12.75 Engineer: kneeling, working
      else if(h.jet&&U.jet){A=U.jet;f=Math.floor(g.t*10)%A.n;}   // 0.12.67 Warhound: Tactical_Retreat (legs tucked, jets lit)
      else if(h.nano&&U.use){A=U.use;f=Math.floor(g.t*6)%A.n;}
      else if(h.useT>0&&h.key==='shoshi'&&U.use){A=U.use;f=Math.floor(g.t*8)%A.n;}   // 0.12.110 Shoshi on his phone   // Nano-Tech Repair Bots: kneeling, bots swirling
      else if(h.lz&&U.ranged){const C2=h.base.char.ranged.lazer;A=U.ranged;f=h.lz.t<C2.charge?(h.lz.t<C2.charge/2?0:1):2+Math.floor(g.t*10)%2;}   // Targeted Lazer: lens charges, then burns
      else if(h.gat&&U.ranged){A=U.ranged;f=Math.floor(g.t*24)%A.n;}   // Moss_Mech's gatling: barrels spinning, muzzle flashing
      else if(h.launchT>0&&U.missile){A=U.missile;f=Math.min(A.n-1,1+Math.floor(g.t*8)%3);}
      else if(h.pshot&&U.shot2){A=U.shot2;f=Math.min(A.n-1,Math.floor(h.pshot.t/h.pshot.T*A.n));}   /* 0.12.178 Chibi_Archer: Piercing_Shot */
      else if(h.tumble&&U.jump){A=U.jump;f=Math.min(A.n-1,Math.floor(h.tumble.t/h.tumble.T*A.n));}   /* Tumble */
      else if(h.cast&&h.cast.anim&&U[h.cast.anim]){A=U[h.cast.anim];f=Math.min(A.n-1,Math.floor(h.cast.t/h.cast.T*A.n));}   /* Chibi_Sorcerer casting */
      else if(h.throwT>0&&U.throw){A=U.throw;f=Math.min(A.n-1,Math.floor((1-h.throwT/(h.throwT0||.45))*A.n));}
      else if(h.dash&&U.runatk){A=U.runatk;f=Math.min(A.n-1,3+Math.floor(h.dash.t/h.dash.T*2));}
      else if(h.animM>0){A=(h.swingAnim&&U[h.swingAnim])||U.melee;const D=h.swingAnim==='attack2'?.36:.45;f=Math.min(A.n-1,Math.floor((1-h.animM/D)*A.n));}
      else if(h.aimHold>0&&U.ranged){A=U.ranged;f=0;}   /* 0.12.163 holding the aim before the shot */
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
      else if(h.tossing&&U[h.tossing.kind]){A=U[h.tossing.kind];f=Math.min(A.n-1,Math.floor(h.tossing.t/h.tossing.T*A.n));}   // 0.12.58 Proximity_Bomb toss / throw
      else if(h.setting){A=U.reload;f=Math.min(A.n-1,Math.floor(h.setting.t/h.setting.T*A.n));}   // kneels to set the Trip Bomb   // holding the aim during Aimed Shot's cast
      else if((h.search||h.planting)&&U.idle&&!(h.setting&&U.reload)){A=U.idle;f=Math.floor(g.t*3)%A.n;rum=h.search||{o:{x:h.planting.x},t:0};}   /* 0.12.37: rummaging (built from his idle frames, bent over and digging) */
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
      /* 0.12.107: the Shadow_Clone is drawn on its own now (drawClone) */
      if(rum){   /* rummage: dips down and digs (squash + lean toward the wreck), pops up, repeats; bits fly out where he digs */
        const ox=rum.o?rum.o.x+((OBST[rum.o.k]||{}).w||0)*.0:h.x+10;const dir=(rum.o&&rum.o.x<h.x-2)?-1:1;const ph=(g.t*2.3+(h.key.length*.37))%1;
        const dip=ph<.55?Math.sin(ph/.55*Math.PI):0;const jig=Math.sin(g.t*23)*.02*dip;const fx=h.x+lx;
        ctx.save();ctx.translate(fx,G);ctx.rotate(dir*(.1+.2*dip)+jig);ctx.scale(1+.03*dip,1-.13*dip);ctx.translate(-fx,-G);
        drawUnit(ctx,A,f,fx,G,A.pre?ART_SCALE/A.pre/HS:A.art?ART_SCALE/HS:(A.sc||1),null,h.hitFlash,0,(dir>0)!==!!A.faceR);ctx.restore();
        const seed=Math.floor(g.t*2.3+(h.key.length*.37));for(let i=0;i<4;i++){const q=((ph*1.6)+i*.17)%1;if(q>.8)continue;const r=Math.sin(seed*12.9+i*78.2)*43758.5%1;const rr=Math.abs(r);
          const bx=fx+dir*(9+q*10*(.6+rr)),by=G-4-Math.sin(q*Math.PI)*(8+6*rr);ctx.fillStyle=rum.disarm?(i%2?'#9ad0ff':'#e8e8e8'):(i%2?'#8a7a64':'#b8b8b8');ctx.globalAlpha=1-q;ctx.fillRect(Math.round(bx),Math.round(by),1.5,1.5);}ctx.globalAlpha=1;}
      else drawUnit(ctx,A,f,h.x+lx,G+bob-(h.leapH||0)*1.2-(A.fall&&riseRot?2*Math.abs(riseRot)/1.45:0),A.pre?ART_SCALE/A.pre/HS:A.art?ART_SCALE/HS:(A.sc||1),h.stealthT>0?.4+.08*Math.sin(g.t*5):null,h.hitFlash,riseRot,((h.face||1)>0)!==!!A.faceR);}   /* 0.12.128: Shoshi's sheet faces right, the others face left */   /* 0.12.67: stealthed = see-through, a faint shimmer */
    else{shadow(ctx,h.x+lx,G,9);spr(ctx,'h_'+h.key,fr,h.x+lx-32,G-60,h.face<0,null,h.hitFlash);}
    ctx.restore();
    if(h.gritT>0){const p=.5+.5*Math.sin(g.t*9),fa=Math.min(1,h.gritT/.5);ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(230,175,90,${(.35+.3*p)*fa})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(Math.round(h.x+lx),G-24,13+p,26+p,0,0,7);ctx.stroke();
      ctx.fillStyle=`rgba(255,215,140,${.8*fa})`;for(let i=0;i<4;i++){const an=g.t*3+i*1.57;ctx.fillRect(Math.round(h.x+lx+Math.cos(an)*13),Math.round(G-24+Math.sin(an)*24),1.5,1.5);}ctx.restore();}   // Grit_Teeth: a steady amber brace around him
    if(h.shield>0){ctx.strokeStyle='rgba(154,230,255,.7)';ctx.beginPath();ctx.ellipse(Math.round(h.x+lx),G-24,15,27,0,0,7);ctx.stroke();}
    const bx=h.x+(h.dodgeX||0)+(h.wanderX||0),G0=G;{const G=G0-(h.leapH||0)*1.2*HS;if(!h.ghost)plate(ctx,h,bx,G-(hbOf(h).h+17),22,true);   /* 0.12.75: the plate rides up with a hero on the lookout or a jetpack */
    {const cb=castBar(h);if(cb&&!PLATE_OFF){const w=18,x=Math.round(bx-w/2),y=Math.round(G-(hbOf(h).h+17))+6;const k=Math.max(0,Math.min(1,cb[0]));   /* 0.12.71: cast / channel / reload bar under the plate */
      ctx.fillStyle='#120a14';ctx.fillRect(x-1,y-1,w+2,3);ctx.fillStyle='#2a2430';ctx.fillRect(x,y,w,1);ctx.fillStyle=cb[1];ctx.fillRect(x,y,Math.max(1,Math.round(w*k)),1);
      if(cb[2]){ctx.fillStyle='#ffffff';ctx.globalAlpha=.55+.45*Math.sin(g.t*12);ctx.fillRect(x+Math.round(w*k)-1,y,1,1);ctx.globalAlpha=1;}}}}};
  // enemies
  // depth lanes: each enemy stands a few px nearer/farther; small creatures take the front lanes; back lanes draw first
  for(const e of g.enemies)if(e.lane==null){const a=SP['e_'+e.type];e.lane=e.boss||e.fly?0:UNITS[e.type]?Math.floor(Math.random()*6):(a&&FH(a)<64?5+Math.floor(Math.random()*4):Math.floor(Math.random()*5));}
  const es=g.enemies.filter(e=>!e.dead).sort((a,b)=>a.lane-b.lane||b.x-a.x);
  const drawEnemy=(e)=>{if(e.inside!=null)return;const G0=(e.gy!=null&&!e.fly&&!e.boss)?e.gy:g.G;ctx.save();if(e.emergeT>0){const k=1-e.emergeT/.5;ctx.filter=`brightness(${(.12+.88*k).toFixed(2)})`;ctx.globalAlpha=.45+.55*k;}shrinkAt(ctx,e.x,G0,HS);drawEnemy0(e);ctx.restore();};   /* 0.12.130: out of a dark doorway: starts as a shadow, brightens to normal */
  const drawEnemy0=(e)=>{const G=(e.gy!=null&&!e.fly&&!e.boss)?e.gy:g.G;let fr=e.animT>0?6+Math.min(2,Math.floor((.3-e.animT)/.1)):e.hitFlash>0&&!e.boss?9:Math.floor(e.walkT*8)%6;
    if(e.boss&&(e.type==='harvest'||e.type==='wraith')&&ATLAS[e.type]){const H=ATLAS[e.type],A=e.act,W=e.type==='wraith';let nm,fr;   /* 0.12.127 the Harvest Knight's own animations */
      if(A){nm=A.name;const N=H[nm].n;fr=Math.min(N-1,Math.floor(A.t/A.T*N));}else if(e.hitFlash>0){nm='hurt';fr=0;}else{const mov=e.x>(e._px==null?e.x:e._px)+.01||e.x<(e._px==null?e.x:e._px)-.01;nm=mov?(W?'drift':'walk'):(e.phase&&!W?'enraged':'idle');fr=Math.floor(g.t*(mov?9:7))%H[nm].n;}
      e._px=e.x;const a=H[nm];shadow(ctx,e.x,G,W?22:30);drawUnit(ctx,Object.assign({},a,{img:e.type}),fr,e.x,G-(W?6+Math.sin(g.t*2)*3:0),.95,null,e.hitFlash,0,true);return;}   /* the wraith floats */
    if(e.boss){const bf=e.animT>0?2:Math.floor(g.t*2)%2;const y=e.fly?e.y-90:G-124;shadow(ctx,e.x,G,26);spr(ctx,'b_'+e.type,bf,e.x-64,y,false,null,e.hitFlash);return;}
    if(UNITS[e.skin||e.type]){const U=UNITS[e.skin||e.type];const [A,uf]=unitFrame(e,U);const gy=e.gy!=null?G:G+e.lane;const sc=(e.E.scale||1)*(e.elite?1.1:1)*(e.nem?(1.12+.1*e.nem.rank)*(e.nem.size||1):1);shadow(ctx,e.x,gy,8);if(e.nem){glow(ctx,e.x,gy-10,10+e.nem.rank*2,e.nem.col||'#ff2a1a',.16+.04*Math.sin(g.t*4));}   /* 0.12.136 Nemesis: bigger with a red glow */
      const dsc=A.pre?sc/A.pre:sc;drawUnit(ctx,A,uf,e.x,gy,dsc,null,e.hitFlash,0,(e.face>0)!==!!A.faceR);const y=gy-U.walk.ay*(U.walk.pre?sc/U.walk.pre:sc);   /* pre-shrunk art (zombies) is drawn 1:1 */
      if(e.slow>0){ctx.fillStyle='rgba(154,230,255,.8)';for(let i=0;i<3;i++)ctx.fillRect(Math.round(e.x-6+i*5),Math.round(y+8+((g.t*20+i*7)%20)),1,1);}
      if(e.burnT>0){ctx.fillStyle=Math.random()<.5?'#ffb040':'#ff5a1a';ctx.fillRect(Math.round(e.x-3+Math.random()*6),Math.round(y+10+Math.random()*12),1,2);}
      if(e.nem||e.hp<e.max||e.bleedT>0||e.burnT>0||e.slow>0||e.stun>0)plate(ctx,e,e.x,y-2,e.nem?24:e.elite?20:14,false,e.nem?'#ff4a3a':e.elite?'#ffb020':'#e8303a');
      if(e.nem){ctx.save();ctx.font='bold 7px monospace';ctx.textAlign='center';const nm=e.nem.name+' '+'★'.repeat(e.nem.rank);ctx.fillStyle='#000';ctx.fillText(nm,e.x+.8,y-7.2);ctx.fillStyle=e.nem.col||'#ff6a4a';ctx.fillText(nm,e.x,y-8);ctx.restore();}
      if(e.distractT>0){ctx.fillStyle='#e8fff0';ctx.font='bold 6px monospace';ctx.textAlign='center';ctx.fillText('?',Math.round(e.x),Math.round(y-12-Math.abs(Math.sin(g.t*6))*1.5));}   // 0.12.68: off to check the noise
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
  /* 0.12.119 (Kyle) lootable storefronts, drawn over their building's own shop front. Lootable: a gold glint at the door and an alarm
     bell box over it. Looted: the door kicked in, glass and stock spilled on the sidewalk. Ringing: NOT the car's flashing lights but a
     rotating red beacon on the bell throwing a sweeping beam, the window strobing white in double flashes, and the bell shaking. */
  /* 0.12.121 (Kyle) lootable storefronts: a full shop front laid over its building's ground floor (same height as before): a lit sign
     naming the shop, two big display windows with stock on the shelves, a centre door, an alarm bell. Units walk through it; only the two
     pillars out front (their own obstacles, drawn in front of lane-0 units) block. Looted: dark, glass smashed, door kicked in, stock spilled.
     Ringing: a rotating red beacon on the bell sweeping the street, the windows strobing white in double flashes, the bell shaking. */
  const SIGNF={D:'110101101101110',I:'111010010010111',L:'100100100100111',Q:'010101101111011',T:'111010010010010',U:'101101101101111',A:'010101111101101',B:'110101110101110',C:'011100100100011',E:'111100110100111',G:'011100101101011',H:'101101111101101',K:'101101110101101',M:'101111111101101',N:'110101101101101',O:'010101101101010',P:'110101110100100',R:'110101110101101',W:'101101101111101',Y:'101101010010010',' ':'000000000000000'};
  const SHOPS={grocery:{t:'GROCERY',c:'#ffb84a',goods:['#a83c32','#c8a046','#46708c','#7a7a86','#5a9a46']},pharmacy:{t:'PHARMACY',c:'#5ae08a',goods:['#e0e0e0','#c89a46','#5a8cb0','#e0e0e0']},
    pawn:{t:'PAWN',c:'#7fb8ff',goods:['#c8c8d0','#b08a40','#8a5a3a','#5a6a7a']},hardware:{t:'HARDWARE',c:'#ff8a3a',goods:['#c86a2a','#8a8a96','#c8c040','#5a6a7a']},deli:{t:'DELI',c:'#ff7a9a',goods:['#c86a6a','#e8d0a0','#a0c060','#c8a046']},liquor:{t:'LIQUOR',c:'#b88aff',goods:['#5a8a5a','#a87a40','#c8c8d0','#7a4a8a']},bank:{t:'BANK',c:'#ffd23f',goods:['#ffd23f','#c8b060']}};
  const hsh=n=>{const v=Math.sin(n*12.9898)*43758.5453;return v-Math.floor(v);};
  const drawFront=o=>{const L=(BGA.city&&BGA.city.layers.find(l=>l.shops));if(!L)return;const s=L.w/L.r[2];const fy=L.y+L.front*s,gy=L.y+L.ground*s,x=Math.round(o.x*2)/2;
    const S=SHOPS[o.shop]||SHOPS.grocery,hw=Math.max(14,(o.bw||36)/2-1),top=fy-7,lt=!o.looted,ring=o.alarmT>0,pu=.5+.5*Math.sin(g.t*3.2+o.x*.05);ctx.save();
    // wall + cornice + sign board
    ctx.fillStyle='#1a2332';ctx.fillRect(x-hw,top,hw*2,gy-top);ctx.fillStyle='#34445c';ctx.fillRect(x-hw,top,hw*2,.8);ctx.fillRect(x-hw,top+6.2,hw*2,1);
    ctx.fillStyle='#0b1018';ctx.fillRect(x-hw+2,top+1.2,hw*2-4,4.6);
    const tx=S.t,sc=.8,tw=tx.length*4*sc-sc;let sx=x-tw/2;ctx.fillStyle=lt?S.c:'#3a4656';
    for(const ch of tx){const gl=SIGNF[ch]||SIGNF[' '];for(let k=0;k<15;k++)if(gl[k]==='1'&&!(o.looted&&hsh(o.x+k+ch.charCodeAt(0))<.3))ctx.fillRect(sx+(k%3)*sc,top+1.6+Math.floor(k/3)*sc,sc,sc);sx+=4*sc;}
    if(lt)glow(ctx,x,top+3.5,Math.min(hw,tw/2+4),S.c,.12+.08*pu);
    // two big display windows either side of the door
    const wy0=top+8,wy1=gy-2.5;
    for(const sd of [-1,1]){const x0=sd<0?x-hw+2.5:x+4.5,x1=sd<0?x-4.5:x+hw-2.5,ww=x1-x0;
      ctx.fillStyle='#3e4e66';ctx.fillRect(x0-.6,wy0-.6,ww+1.2,wy1-wy0+1.2);
      if(lt){const gr=ctx.createLinearGradient(0,wy0,0,wy1);gr.addColorStop(0,'#3a2c1c');gr.addColorStop(1,'#7a5a30');ctx.fillStyle=gr;}else ctx.fillStyle='#06090e';ctx.fillRect(x0,wy0,ww,wy1-wy0);
      for(let sh=wy0+3.5;sh<wy1;sh+=3.5){ctx.fillStyle=lt?'#2a2016':'#141a22';ctx.fillRect(x0,sh,ww,.5);   // shelves and stock
        for(let gx=x0+.5;gx<x1-.5;gx+=1.2){const h=hsh(o.x*7+gx*3+sh);if(h<(lt?.75:.25)){ctx.fillStyle=S.goods[Math.floor(h*97)%S.goods.length];ctx.globalAlpha=lt?1:.5;ctx.fillRect(gx,sh-1.4,.8,1.4);ctx.globalAlpha=1;}}}
      if(lt){ctx.globalAlpha=.22;ctx.fillStyle='#e8f4ff';ctx.beginPath();ctx.moveTo(x0+ww*.15,wy0);ctx.lineTo(x0+ww*.35,wy0);ctx.lineTo(x0+ww*.1,wy1);ctx.lineTo(x0-.01,wy1);ctx.fill();ctx.fillRect(x0+ww*.55,wy0,.6,wy1-wy0);ctx.globalAlpha=1;}
      else{ctx.fillStyle='#7aa8d0';for(let k=0;k<6;k++){const h=hsh(o.x+k*5+sd);ctx.fillRect(x0+h*ww,k%2?wy0:wy1-.8,.6,.8);}}
      ctx.fillStyle='#3e4e66';ctx.fillRect(x0+ww/2-.3,wy0,.6,wy1-wy0);}
    // door
    ctx.fillStyle='#3e4e66';ctx.fillRect(x-4,wy0-1,8,gy-wy0+1);
    if(lt){ctx.fillStyle='#ffcf7a';ctx.fillRect(x-3,wy0,6,gy-wy0);ctx.fillStyle='#ffe8b8';ctx.fillRect(x-1.5,wy0+1,3,gy-wy0-2);ctx.fillStyle='#3e4e66';ctx.fillRect(x-.25,wy0,.5,gy-wy0);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5;const lg=ctx.createRadialGradient(x,gy,1,x,gy,24);lg.addColorStop(0,'rgba(255,200,110,.7)');lg.addColorStop(1,'rgba(255,200,110,0)');ctx.fillStyle=lg;ctx.fillRect(x-26,gy-12,52,20);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;}
    else{ctx.fillStyle='#04070b';ctx.fillRect(x-3,wy0,6,gy-wy0);ctx.fillStyle='#2a3a4c';ctx.beginPath();ctx.moveTo(x-3,wy0);ctx.lineTo(x-7,wy0+2);ctx.lineTo(x-7,gy+1);ctx.lineTo(x-3,gy);ctx.fill();
      for(let i=0;i<12;i++){ctx.fillStyle=S.goods[i%S.goods.length];ctx.fillRect(x-hw+2+hsh(o.x+i)*(hw*2-4),gy+.5+hsh(o.x*3+i)*2,i%3?.6:1,.6);}}
    // 0.12.122 rooftop: a parapet slab across the top, a ladder up the right side, maybe a crate up there
    if(o.roof){const R=o.roof,ry=R.y;ctx.fillStyle='#2c3a50';ctx.fillRect(x-hw-1,ry-1.5,hw*2+2,2.2);ctx.fillStyle='#5e7090';ctx.fillRect(x-hw-1,ry-1.5,hw*2+2,.6);
      // 0.12.127 (Kyle): the roof door: a dark recessed doorway in the middle of the wall above the roof, where zombies step out
      ctx.fillStyle='#3e4e66';ctx.fillRect(x-4,ry-15,8,14);ctx.fillStyle='#26324a';ctx.fillRect(x-3.4,ry-14.4,6.8,13.4);ctx.fillStyle='#020304';ctx.fillRect(x-2.6,ry-13.6,5.2,12.6);
      ctx.fillStyle='#5e7090';ctx.fillRect(x-4.4,ry-15.6,8.8,.8);if(R.doorT>0){ctx.globalAlpha=Math.min(1,R.doorT*2);ctx.fillStyle='#ff4030';ctx.fillRect(x-1.2,ry-10,.6,.6);ctx.fillRect(x+.6,ry-10,.6,.6);ctx.globalAlpha=1;}
      const lx=x+hw+1.5,ly=LANES[0]+1;ctx.fillStyle='#6a5a48';ctx.fillRect(lx-1.6,ry-3,.6,ly-ry+3);ctx.fillRect(lx+1,ry-3,.6,ly-ry+3);for(let y=ry-1;y<ly;y+=2.4)ctx.fillRect(lx-1.6,y,3.2,.5);
      if(R.crate||R.crateDone){const D=OBST.city_crate;drawUnit(ctx,{fw:D.fw,fh:D.fh,n:1,ax:D.fw/2,ay:D.fh-1,x:D.x,y:D.y,img:'cityob'},R.crateDone?1:0,x-hw*.55,ry-1,.45,null,0,0,false);
        if(R.crate&&(g.t*.9+o.x*.02)%2<.2){const f=((g.t*.9+o.x*.02)%2)/.2;ctx.globalAlpha=Math.sin(f*3.14);ctx.fillStyle='#fff6c0';const sx=x-hw*.55+2,sy=ry-9;ctx.fillRect(sx-1.5,sy,3,.5);ctx.fillRect(sx-.25,sy-1.25,.5,3);ctx.globalAlpha=1;}}}
    // loot bag over the door while it's still lootable
    if(lt){const iy=top-6+Math.sin(g.t*3+o.x)*1.2;ctx.fillStyle='#1a1208';ctx.beginPath();ctx.arc(x,iy+1.6,3.2,0,7);ctx.fill();ctx.fillStyle=S.c;ctx.beginPath();ctx.arc(x,iy+1.6,2.5,0,7);ctx.fill();ctx.fillRect(x-1,iy-2.2,2,1.6);
      ctx.fillStyle='#1a1208';ctx.fillRect(x-1.5,iy-.8,3,.6);ctx.fillStyle='#fff6d0';ctx.fillRect(x-1.4,iy+.6,.8,.8);glow(ctx,x,iy+1.6,6,S.c,.18*(.6+.4*pu));}
    // alarm bell on the sign's corner
    const bx=x+hw-3,by=top+1,sh=ring?Math.sin(g.t*70)*.35:0;
    ctx.fillStyle='#1c1c22';ctx.fillRect(bx-2+sh,by-1,4,2.5);ctx.fillStyle=ring?'#ff3a2e':'#8a2420';ctx.beginPath();ctx.arc(bx+sh,by-1,1.6,Math.PI,0);ctx.fill();
    if(ring){const a=g.t*5.5;ctx.globalCompositeOperation='lighter';const dx=Math.cos(a),vis=Math.max(0,Math.sin(a)*.5+.5),len=70;ctx.globalAlpha=.32*vis+.06;
      const gr=ctx.createLinearGradient(bx,by,bx+dx*len,by+18);gr.addColorStop(0,'rgba(255,40,30,.9)');gr.addColorStop(1,'rgba(255,40,30,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(bx,by-1);ctx.lineTo(bx+dx*len,by+6);ctx.lineTo(bx+dx*len,by+26);ctx.closePath();ctx.fill();
      ctx.globalAlpha=.55+.45*vis;glow(ctx,bx,by-1,4.5,'#ff2a1a',.5);glow(ctx,bx,by-1,1.4,'#ffd0c0',.9);
      const ph=(g.t*1.3+o.x*.01)%1;if(ph<.05||(ph>.1&&ph<.15)){ctx.globalAlpha=.5;ctx.fillStyle='#e8f4ff';ctx.fillRect(x-hw+2.5,wy0,hw*2-5,wy1-wy0);ctx.globalAlpha=.25;glow(ctx,x,wy0+6,hw+6,'#d8ecff',.25);}
      ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
    ctx.restore();};
  // the storefront's two pillars: stone columns from the sidewalk up to the cornice, in front of lane-0 units
  const drawPillar=o=>{const L=(BGA.city&&BGA.city.layers.find(l=>l.shops));if(!L)return;const s=L.w/L.r[2];const top=L.y+L.front*s-7,gy=LANES[0]+1,x=Math.round(o.x*2)/2;ctx.save();
    /* 0.12.122 (Kyle): a waist-high wall along the front edge of the roof, drawn in front of whoever is up there (low enough that the crate shows over it) */
    if(o.sd>0&&o.F&&o.F.roof){const F=o.F,R=F.roof,fx=Math.round(F.x*2)/2,hw=Math.max(14,(F.bw||36)/2-1),ry=R.y;ctx.fillStyle='#2c3a50';ctx.fillRect(fx-hw-1,ry-6.5,hw*2+2,7.2);
      ctx.fillStyle='#5e7090';ctx.fillRect(fx-hw-1.4,ry-7,hw*2+2.8,1);ctx.fillStyle='#202a3a';for(let yy=ry-4.5;yy<ry;yy+=2.2)ctx.fillRect(fx-hw-1,yy,hw*2+2,.4);
      for(let k=fx-hw;k<fx+hw;k+=4)ctx.fillRect(k+((Math.round(k)%8)?2:0),ry-6,.4,6);ctx.fillStyle='#3a4a62';ctx.fillRect(fx-hw-1,ry-6,.6,6.6);}
    shadow(ctx,x,gy,3);ctx.fillStyle='#2a3444';ctx.fillRect(x-2.6,top-1,5.2,2.2);ctx.fillRect(x-2.6,gy-2.2,5.2,2.2);
    ctx.fillStyle='#4a5a72';ctx.fillRect(x-1.7,top+1,3.4,gy-top-3);ctx.fillStyle='#7a8ca6';ctx.fillRect(x-1.7,top+1,.8,gy-top-3);ctx.fillStyle='#26303f';ctx.fillRect(x+1,top+1,.7,gy-top-3);
    ctx.fillStyle='#5e7090';ctx.fillRect(x-2.6,top-1,5.2,.6);ctx.fillStyle='#1e2632';for(let y=top+5;y<gy-4;y+=5)ctx.fillRect(x-1.7,y,3.4,.4);ctx.restore();};
  const drawOb=o=>{const D=OBST[o.k];if(D.front)return drawFront(o);if(D.pillar)return drawPillar(o);const gy=LANES[Math.max(...o.lanes)];ctx.save();if(!D.flat)shadow(ctx,o.x,gy,Math.max(5,D.fw*.22));drawUnit(ctx,{fw:D.fw,fh:D.fh,n:1,ax:D.fw/2,ay:D.fh-(D.flat?6:1),x:D.x,y:D.y,img:D.img||'obst'},D.open&&o.looted?1:0,o.x,gy+1,.5,null,0,0,!!o.flip);if(o.k==='city_lootbox'&&!o.looted&&(g.t*.7+o.x*.01)%2<.18){const f=((g.t*.7+o.x*.01)%2)/.18;ctx.globalAlpha=Math.sin(f*3.14);ctx.fillStyle='#fff6c0';const sx=o.x-3+(o.x%5),sy=gy-8;ctx.fillRect(sx-1.5,sy,3,.5);ctx.fillRect(sx-.25,sy-1.25,.5,3);ctx.globalAlpha=1;}
    if(o.alarmT>0&&D.lights){const on=Math.floor(o.alarmT*6)%2===0,fl=o.flip?-1:1;ctx.globalCompositeOperation='lighter';   /* 0.12.74 (Kyle): the car's own head- and taillights flash, throwing light rays */
      const P=([lx,ly])=>[o.x+(lx-D.fw/2)*.5*fl,gy+1+(ly-(D.fh-1))*.5];
      if(D.lights.head){const [x,y]=P(D.lights.head),d=-fl;if(on){glow(ctx,x,y,2.6,'#fff4c0',.85);glow(ctx,x,y,1,'#ffffff',1);
          const gr=ctx.createLinearGradient(x,y,x+d*46,y);gr.addColorStop(0,'rgba(255,240,180,.45)');gr.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(x,y-.8);ctx.lineTo(x+d*46,y-9);ctx.lineTo(x+d*46,y+5);ctx.lineTo(x,y+.8);ctx.fill();
          for(let i=-2;i<=2;i++){ctx.strokeStyle='rgba(255,250,220,.35)';ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+d*(14+Math.abs(i)*2),y+i*3);ctx.stroke();}}}
      if(D.lights.tail){const [x,y]=P(D.lights.tail),d=fl;const k=on?1:.25;glow(ctx,x,y,3*k+.6,'#ff2a1a',.7*k);glow(ctx,x,y,.9,'#ffb0a0',k);
        if(on)for(let i=-2;i<=2;i++){ctx.strokeStyle='rgba(255,60,40,.4)';ctx.lineWidth=.45;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+d*(10+Math.abs(i)*2),y+i*2.6);ctx.stroke();}}
      ctx.globalCompositeOperation='source-over';}/* car alarm: flashing lights */ctx.restore();};
  /* 0.12.75 Engineer's buildings, drawn from shapes: the watchtower (steel legs, X braces, chain-link panels, plank floors with low walls,
     a ladder up the whole thing and a sign per tier), the concrete barrier, the tesla coil and the car turret */
  const drawBld=b=>{const x=Math.round(b.x),gy=b.gy;ctx.save();if(b.hitT>0){ctx.globalAlpha=.75;}
    if(b.k==='tower'){const W=9.5,TH=30;const top=gy-TH*b.tier;   /* 0.12.76: about 45% as wide as before */
      shadow(ctx,x,gy,11);
      for(let i=0;i<b.tier;i++){const y0=gy-TH*i,y1=y0-TH;
        ctx.strokeStyle='rgba(170,180,190,.35)';ctx.lineWidth=.4;   // chain-link: diamond lattice on the lower part of each tier
        ctx.save();ctx.beginPath();ctx.rect(x-W,y0-14,2*W,14);ctx.clip();for(let k=-W-12;k<=W+12;k+=2.5){ctx.beginPath();ctx.moveTo(x+k,y0-1);ctx.lineTo(x+k+12,y0-13);ctx.stroke();ctx.beginPath();ctx.moveTo(x+k,y0-1);ctx.lineTo(x+k-12,y0-13);ctx.stroke();}ctx.restore();
        ctx.fillStyle='#4a5058';ctx.fillRect(x-W-1,y0-14,2*W+2,1);
        ctx.strokeStyle='#6a7280';ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(x-W+2,y0);ctx.lineTo(x+W-2,y1+2);ctx.moveTo(x+W-2,y0);ctx.lineTo(x-W+2,y1+2);ctx.stroke();   // X brace
        ctx.fillStyle='#6a4a2a';ctx.fillRect(x-W-3,y1,2*W+6,2.5);ctx.fillStyle='#8a6438';ctx.fillRect(x-W-3,y1,2*W+6,1);   // plank floor
        ctx.fillStyle='#4e5560';ctx.fillRect(x-W-3,y1-5,1.5,5);ctx.fillRect(x+W+1.5,y1-5,1.5,5);ctx.fillRect(x-W-3,y1-5,2*W+6,1.2);   // low wall rail
        ctx.save();ctx.translate(x-4.2,y0-23);ctx.scale(.7,.7);ctx.translate(-(x-6),-(y0-24));const sx=x-6,sy=y0-24;ctx.fillStyle='#1a1410';ctx.fillRect(sx-1,sy-1,14,10);   // the tier's sign (smaller now)
        if(i===0){ctx.fillStyle='#f2f2ea';ctx.fillRect(sx,sy,12,8);ctx.fillStyle='#d0202a';ctx.fillRect(sx+5,sy+1,2,6);ctx.fillRect(sx+3,sy+3,6,2);}
        else if(i===1){ctx.fillStyle='#4a5a2a';ctx.fillRect(sx,sy,12,8);ctx.fillStyle='#d8b040';for(let q=0;q<3;q++){ctx.fillRect(sx+2+q*3,sy+2,2,5);ctx.fillStyle='#b08020';ctx.fillRect(sx+2+q*3,sy+2,2,1);ctx.fillStyle='#d8b040';}}
        else{ctx.fillStyle='#2a3a5a';ctx.fillRect(sx,sy,12,8);ctx.fillStyle='#9ad0ff';ctx.beginPath();ctx.arc(sx+4,sy+4,2,0,7);ctx.arc(sx+8,sy+4,2,0,7);ctx.fill();ctx.fillStyle='#1a1410';ctx.fillRect(sx+5.5,sy+3,1,2);}ctx.restore();}
      ctx.fillStyle='#5a626e';ctx.fillRect(x-W,top,2.2,gy-top);ctx.fillRect(x+W-2.2,top,2.2,gy-top);ctx.fillStyle='#8a94a2';ctx.fillRect(x-W,top,.8,gy-top);ctx.fillRect(x+W-2.2,top,.8,gy-top);   // steel legs
      ctx.fillStyle='#7a5a34';ctx.fillRect(x+W+3,top-2,1,gy-top+2);ctx.fillRect(x+W+7,top-2,1,gy-top+2);for(let y=gy-2;y>top;y-=3)ctx.fillRect(x+W+3,y,5,.8);   // ladder all the way up
      if(b.tier>=3){ctx.fillStyle='#3a3f48';ctx.fillRect(x-W-3,top-14,2,9);ctx.fillRect(x+W+1,top-14,2,9);ctx.fillStyle='#6a4a2a';ctx.fillRect(x-W-4,top-15,2*W+8,2);}   // lookout roof
      if(b.hp<b.max){const w=20;ctx.fillStyle='#000a';ctx.fillRect(x-w/2-1,top-20,w+2,3);ctx.fillStyle='#ffd23f';ctx.fillRect(x-w/2,top-19,w*Math.max(0,b.hp/b.max),1);}}
    else if(b.k==='sandbag'){shadow(ctx,x,gy,12);   /* 0.12.104 Sandbag Wall: a low, wide pile of burlap bags, staggered like bricks (shorter and wider than a HESCO cell) */
      const rows=[[-9,-3,3,9],[-6,0,6],[-3,3]];const bw=6.4,bh=3.6;
      rows.forEach((r,ri)=>{const yy=gy-bh*(ri+1)+ri*.6;for(const dx of r){const cx=x+dx;ctx.fillStyle=ri%2?'#b89c68':'#a88c5a';ctx.beginPath();ctx.ellipse(cx,yy+bh/2,bw/2,bh/2,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(255,240,200,.25)';ctx.fillRect(cx-bw/2+1,yy+.5,bw-3,.7);ctx.fillStyle='rgba(60,40,20,.45)';ctx.fillRect(cx+bw/2-1.2,yy+1,.6,bh-1.5);   /* lit top edge, tied-off end */
        if(b.A&&b.A.barb){ctx.strokeStyle='rgba(70,70,74,.9)';ctx.lineWidth=.4;}}});
      if(b.A&&b.A.barb){const T=gy-bh*3+1;ctx.strokeStyle='#5b5f63';ctx.lineWidth=.45;ctx.beginPath();for(let k=0;k<=12;k++){const px=x-10+k*1.7,py=T-1.2+Math.sin(k*1.9)*1.1;k?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();ctx.fillStyle='#8a8f94';for(let k=0;k<12;k+=2)ctx.fillRect(x-10+k*1.7,T-1.6+Math.sin(k*1.9)*1.1,.8,.8);}   /* barbed wire along the top (tier III) */
      if(b.hp<b.max*.5){ctx.fillStyle='#c8b080';for(let k=0;k<5;k++)ctx.fillRect(x-6+k*3,gy-.8,1.4,.8);}   /* split bags, sand spilling */
      if(b.hp<b.max){ctx.fillStyle='#000a';ctx.fillRect(x-8,gy-17,16,3);ctx.fillStyle='#ffd23f';ctx.fillRect(x-7,gy-16,14*Math.max(0,b.hp/b.max),1);}}
    else if(b.k==='barrier'){const w=7,h=17,L=x-w,R=x+w,T=gy-h;shadow(ctx,x,gy,10);   /* 0.12.76 (Kyle): one HESCO_Barrier cell, like his photos */
      ctx.fillStyle='#a8946c';ctx.fillRect(L,T,2*w,h);ctx.fillStyle='#c2ad84';ctx.fillRect(L+1,T+1,w-1,h-2);ctx.fillStyle='#8e7a56';ctx.fillRect(x+3,T+1,w-3,h-2);   // geotextile, lit from the left
      for(let yy=T+2;yy<gy;yy+=2.6){ctx.fillStyle='rgba(120,100,70,.35)';ctx.fillRect(L,yy,2*w,.5);}   // fabric bulging between the wires
      ctx.strokeStyle='rgba(70,72,74,.85)';ctx.lineWidth=.35;for(let xx=L+1.6;xx<R;xx+=2.4){ctx.beginPath();ctx.moveTo(xx,T);ctx.lineTo(xx,gy);ctx.stroke();}for(let yy=T+1.3;yy<gy;yy+=2.4){ctx.beginPath();ctx.moveTo(L,yy);ctx.lineTo(R,yy);ctx.stroke();}   // welded wire mesh
      ctx.fillStyle='#3e4246';for(const cx of[L,x,R-1])ctx.fillRect(cx,T-1,1,h+1);ctx.fillStyle='#7a8086';for(let yy=T;yy<gy;yy+=1.6)for(const cx of[L,x,R-1])ctx.fillRect(cx,yy,1,.6);   // coil-joint rods
      ctx.fillStyle='#5a4228';ctx.beginPath();ctx.moveTo(L-.5,T+.5);ctx.quadraticCurveTo(x-3,T-4,x,T-2.6);ctx.quadraticCurveTo(x+4,T-4.5,R+.5,T+.5);ctx.closePath();ctx.fill();ctx.fillStyle='#7a5c38';ctx.fillRect(x-4,T-2.6,3,1);   // dirt heaped over the top
      ctx.fillStyle='#c8b48a';ctx.fillRect(L,T,2*w,1);   // the fabric lip folded over the rim
      {ctx.fillStyle='#6b4a2a';ctx.fillRect(L-3.2,T-1,.8,h+1);ctx.fillRect(L-1.2,T-1,.8,h+1);ctx.fillStyle='#8a6438';for(let yy=T+1;yy<gy-.5;yy+=2.6)ctx.fillRect(L-3.2,yy,2.8,.7);}   // 0.12.104 (Kyle): a little wooden ladder up the left side
      if(b.hp<b.max*.6){ctx.strokeStyle='#4a3a22';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x-3,T+4);ctx.lineTo(x-1,T+8);ctx.lineTo(x-3,T+11);ctx.stroke();ctx.fillStyle='#6a5030';ctx.fillRect(x-2,gy-1,4,1);}   // torn, dirt spilling
      if(b.hp<b.max){ctx.fillStyle='#000a';ctx.fillRect(x-8,T-8,16,3);ctx.fillStyle='#ffd23f';ctx.fillRect(x-7,T-7,14*Math.max(0,b.hp/b.max),1);}}
    else if(b.k==='tesla'){shadow(ctx,x,gy,6);ctx.fillStyle='#3a3f48';ctx.fillRect(x-4,gy-4,8,4);ctx.fillStyle='#22262c';ctx.fillRect(x-1,gy-16,2,12);
      for(let y=gy-15;y<gy-5;y+=2){ctx.fillStyle='#c87a3a';ctx.fillRect(x-2.5,y,5,1);}ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,x,gy-19,3+Math.sin(g.t*12),'#6ad0ff',.5);glow(ctx,x,gy-19,1.4,'#e8fbff',1);
      if(Math.random()<.5){ctx.strokeStyle='rgba(160,230,255,.8)';ctx.lineWidth=.5;zig(x,gy-19,x+(Math.random()-.5)*12,gy-19+(Math.random()-.5)*10,3,1.5);}ctx.restore();
      ctx.fillStyle='#000a';ctx.fillRect(x-6,gy-25,12,2.5);ctx.fillStyle='#6ad0ff';ctx.fillRect(x-5,gy-24.5,10*Math.max(0,b.hp/b.max),1);}
    else if(b.k==='turret'){const d=b.face||-1,ty=gy-22;ctx.fillStyle='#2a2e34';ctx.fillRect(x-3,ty,6,4);ctx.fillStyle='#4a525c';ctx.fillRect(x-2,ty-3,5,3);ctx.fillStyle='#1a1c20';ctx.fillRect(d>0?x+2:x-9,ty-2,7,1.5);
      ctx.fillStyle='#e8c020';ctx.fillRect(x-3,ty+3,6,.8);if(b.hp<b.max){ctx.fillStyle='#000a';ctx.fillRect(x-6,ty-7,12,2.5);ctx.fillStyle='#ffd23f';ctx.fillRect(x-5,ty-6.5,10*Math.max(0,b.hp/b.max),1);}}
    ctx.restore();};
  const engFx=()=>{for(const S of g.satchels||[]){const y=S.gy-(S.hgt||0)*.5-2;ctx.fillStyle='#3a2a18';ctx.fillRect(S.x-3,y-3,6,4);ctx.fillStyle='#6a4a28';ctx.fillRect(S.x-3,y-3,6,1);ctx.fillStyle='#2a1c10';ctx.fillRect(S.x-1,y-5,2,2);   /* 0.12.75 satchel: canvas pouch, strap, blinking red light */
      if(Math.floor(g.t*3)%2){ctx.save();ctx.globalCompositeOperation='lighter';glow(ctx,S.x+2,y-2,1.6,'#ff2a1a',.9);ctx.restore();}}
    for(const f of g.fx){const k=f.t/f.life;if(f.k==='spark'){ctx.fillStyle=k<.4?'#fff6c0':'#ffb040';for(let i=0;i<3;i++)ctx.fillRect(f.x+Math.cos(i*2.1+f.x)*k*6,f.gy-4-Math.sin(i*2.1+f.x)*k*5+k*k*6,1,1);}
      else if(f.k==='tracer'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(255,220,140,${1-k})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(f.x0,f.y0);ctx.lineTo(f.x1,f.y1);ctx.stroke();glow(ctx,f.x0,f.y0,1.6,'#ffd080',.8*(1-k));ctx.restore();}}
    for(const h of g.alive())if(h.kitHits>0){ctx.fillStyle='rgba(200,208,220,.55)';ctx.fillRect(Math.round(g.heroX(h))-3,(h.gy||G)-14,6,1);}};
  const drawTent=T=>{const U=UNITS.tentacle;if(!U)return;const A=U[T.anim]||U.idle;let fr;const n=A.n;
    if(T.anim==='idle')fr=Math.floor(g.t*9+T.x)%n;else if(T.anim==='emerge')fr=Math.min(n-1,Math.floor(T.aT/.5*n));else if(T.anim==='attack')fr=Math.min(n-1,Math.floor(T.aT/.6*n));else if(T.anim==='hit')fr=Math.min(n-1,Math.floor(T.aT/.25*n));else fr=Math.min(n-1,Math.floor(T.aT/.8*n));
    ctx.save();shrinkAt(ctx,T.x,T.gy,HS);shadow(ctx,T.x,T.gy,9);drawUnit(ctx,A,fr,T.x,T.gy+1,T.big||1,null,T.hitT>0?(T.hitT-=1/60):0,0,T.face>0);ctx.restore();   // 0.12.70: Call_of_Cthulhu makes them 25% bigger
    if(T.hp<T.max&&T.anim!=='death'){const w=12,y=T.gy-36;ctx.fillStyle='#000a';ctx.fillRect(Math.round(T.x-w/2)-1,y-1,w+2,3);ctx.fillStyle='#9a50e8';ctx.fillRect(Math.round(T.x-w/2),y,Math.max(0,w*T.hp/T.max),1);}};
  const items=[...(g.blds||[]).map(b=>[b.gy-.3,-1,b.x,()=>drawBld(b)]),...(g.tentacles||[]).map(T=>[T.gy+.1,0,T.x,()=>drawTent(T)]),...(g.obst||[]).map(o=>[OBST[o.k].flat?-999:LANES[Math.max(...o.lanes)]+.2,-1,o.x,()=>drawOb(o)]),...hs.filter(h=>h.alive).map(h=>[h.gy||G,0,h.x,()=>drawHero(h)]),...(g.clones||[]).map(c=>[c.gy,0,c.x,()=>drawClone(c)]),...es.map(e=>[e.boss?G-.5:(e.gy!=null&&!e.fly?e.gy:G+e.lane-5),1,-e.x,()=>drawEnemy(e)])]
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
  for(const M of g.mines||[]){if(!M.armed)continue;const x=Math.round(M.x),y=M.gy;ctx.save();
    if(M.shotgun&&!M.owner){const city=g.st.biome&&g.st.biome.id==='city';   /* 0.12.158 tripwire shotgun: a bush (trash bags downtown), a barrel peeking out pointing left, a wire across the lane */
      ctx.globalAlpha=M.spotted?1:.55;ctx.strokeStyle='rgba(210,210,200,.6)';ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(x-10,y-5);ctx.lineTo(x-10,y+1.5);ctx.moveTo(x-10,y-4.5);ctx.lineTo(x-2,y-3.2);ctx.stroke();ctx.fillStyle='#3a2a24';ctx.fillRect(x-10.5,y-5.5,1,1);
      ctx.globalAlpha=1;ctx.fillStyle='#2a2a2e';ctx.fillRect(x-6,y-4,5,1);ctx.fillStyle='#55555c';ctx.fillRect(x-6,y-4,5,.4);ctx.fillStyle='#000';ctx.fillRect(x-6.4,y-4,.5,1);   /* twin barrels */
      if(city){ctx.fillStyle='#1c1f26';ctx.beginPath();ctx.ellipse(x+1.5,y-2.6,4.2,3,0,0,7);ctx.fill();ctx.fillStyle='#262a33';ctx.beginPath();ctx.ellipse(x+4.5,y-2,3.2,2.4,0,0,7);ctx.fill();ctx.fillStyle='#3a404c';ctx.fillRect(x+.5,y-5,1.4,.6);}
      else{for(const [bx,by,r,c] of [[x+1,y-3,3.6,'#1e3a1a'],[x+3.6,y-2.4,3,'#244a20'],[x-.6,y-1.6,2.6,'#2c5a26'],[x+2.4,y-4.6,2.4,'#30642a']]){ctx.fillStyle=c;ctx.beginPath();ctx.arc(bx,by,r,0,7);ctx.fill();}}
      if(M.spotted){const b=Math.round(Math.sin(g.t*5)*1);ptext(ctx,'!',x-4,y-12+b,'#ff5a3a',1);}ctx.restore();continue;}
    ctx.globalAlpha=M.spotted?1:.38;
    ctx.strokeStyle='rgba(200,200,190,.55)';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x-7,y-1.5);ctx.lineTo(x+7,y-1.5);ctx.stroke();ctx.fillStyle='#3a2a24';ctx.fillRect(x-7.5,y-2.5,1,2);ctx.fillRect(x+6.5,y-2.5,1,2);   /* wire + stakes */
    ctx.fillStyle='#1c1412';ctx.fillRect(x-3,y-3,6,3);ctx.fillStyle='#6a2a1e';ctx.fillRect(x-2.5,y-2.5,5,2);ctx.fillStyle='#8a4a2a';ctx.fillRect(x-2,y-2.5,2,1);   /* rusted casing */
    if(M.cluster){ctx.fillStyle='#4a3a30';for(const sx of [-2.5,-.5,1.5]){ctx.beginPath();ctx.arc(x+sx+.5,y-3.6,.9,0,7);ctx.fill();}ctx.fillStyle='#c8a030';ctx.fillRect(x-2.5,y-1.2,5,.5);}   /* 0.12.157 cluster mine: little bomblets packed on top and a faded yellow band */
    else{ctx.fillStyle='#9a9a90';for(const sx of [-2.5,-.5,1.5])ctx.fillRect(x+sx,y-4,1,1);}   /* nail spikes */
    if(Math.floor(g.t*3)%2===0){const lc=M.owner?'#5aff6a':'#ff3a2a';ctx.fillStyle=lc;ctx.fillRect(x-.5,y-3.5,1,1);glow(ctx,x,y-3,1.6,lc,M.spotted?.3:.12);}   /* ours blink green */
    ctx.globalAlpha=1;if(M.spotted&&!M.owner){const b=Math.round(Math.sin(g.t*5)*1);ptext(ctx,'!',x,y-12+b,'#ff5a3a',1);}ctx.restore();}
  for(const b of g.bomblets||[]){let x,y;if(b.fuse<0){const u=Math.min(1,b.t/b.T);x=b.x0+(b.x1-b.x0)*u;y=b.gy0+(b.gy1-b.gy0)*u-Math.sin(u*Math.PI)*(b.H||14)-2;}else{x=b.x1;y=b.gy1-1.5;}   /* bomblets: arc, land, blink, pop */
    if(b.frag&&ATLAS.frag){const F=ATLAS.frag;shadow(ctx,b.fuse<0?b.x0+(b.x1-b.x0)*Math.min(1,b.t/b.T):b.x1,b.fuse<0?b.gy0+(b.gy1-b.gy0)*Math.min(1,b.t/b.T):b.gy1,1.4);drawUnit(ctx,F,b.fuse<0?0:2+Math.floor(g.t*10)%2,x,y+1.5,.42,null,0,b.fuse<0?b.t*14:0,false);continue;}   /* 0.12.175 the Soldier's frag: the pack's grenade, spinning in the air, then ticking on the ground */
    shadow(ctx,b.fuse<0?b.x0+(b.x1-b.x0)*Math.min(1,b.t/b.T):b.x1,b.fuse<0?b.gy0+(b.gy1-b.gy0)*Math.min(1,b.t/b.T):b.gy1,1.6);ctx.fillStyle='#2a201a';ctx.beginPath();ctx.arc(x,y,1.4,0,7);ctx.fill();ctx.fillStyle='#6a4a30';ctx.fillRect(x-.5+Math.cos(b.spin)*.6,y-.9,.8,.6);
    const blink=b.fuse<0?Math.floor(g.t*8)%2===0:Math.floor(g.t*24)%2===0;if(blink){ctx.fillStyle='#ff3a2a';ctx.fillRect(x-.4,y-1.6,.8,.8);glow(ctx,x,y-1.2,2,'#ff3a2a',.35);}}
  for(const h of g.alive())if(h.mine>0){const x=Math.round(g.heroX(h)-8),y=Math.round((h.gy||g.G)-31);ctx.fillStyle='#1c1412';ctx.fillRect(x-1,y,5,3);ctx.fillStyle='#6a2a1e';ctx.fillRect(x,y+1,3,1);ctx.fillStyle='#ff3a2a';ctx.fillRect(x+1,y,1,1);}   /* carrying a defused mine */
  for(const it of items)it[3]();
  engFx();voidFx();slamDraw();pinnedDraw();bottleDraw();nadeDraw();laser();waves();druidFx();robotFx();darkFx();quakes();logs();flames();jpFx();poultices();booms();
  // projectiles
  for(const p of g.proj){const x=Math.round(p.x),y=p.aimed?Math.round(p.y):Math.round(G+(p.y-G)*HS);const c=PCOL[p.kind]||'#ff3a3a';ctx.save();shrinkAt(ctx,x,y,HS);
    /* 0.12.94 (Kyle): projectiles turn to match the way they're flying (arrows from the tower point down at the target) */
    {const fx=p.x,fy=p.aimed?p.y:G+(p.y-G)*HS;if(p._sx!=null){const dx=fx-p._sx,dy=fy-p._sy;if(dx*dx+dy*dy>.01)p._ang=Math.atan2(dy,dx);}p._sx=fx;p._sy=fy;
      if(p._ang!=null&&p.kind!=='buck'){const d=(p.kind==='arrow'||p.kind==='quarrel')?(p.enemy?-1:1):(p.dir||1);let r=d<0?p._ang-Math.PI:p._ang;while(r>Math.PI)r-=2*Math.PI;while(r<-Math.PI)r+=2*Math.PI;if(Math.abs(r)>.02){ctx.translate(x,y);ctx.rotate(r);ctx.translate(-x,-y);}}}
    if(p.kind==='void'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';for(let i=1;i<=5;i++){ctx.fillStyle=`rgba(150,60,255,${.4-.07*i})`;ctx.fillRect(x-d*i*2.8-1,y-1+Math.sin(g.t*25+i)*.8,2,2);}glow(ctx,x,y,6,'#7a30e0',.35);ctx.restore();ctx.fillStyle='#12061e';ctx.beginPath();ctx.arc(x,y,2.4,0,7);ctx.fill();ctx.strokeStyle='#c090ff';ctx.lineWidth=.8;ctx.stroke();}   // void bolt: a black core in a violet halo
    else if(p.kind==='buck'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';   /* one buckshot pellet: a hot slug with a short streak */
      ctx.strokeStyle='rgba(255,200,120,.55)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x-d*6,y);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff0c0';ctx.fillRect(x-.75,y-.75,1.5,1.5);ctx.restore();}
    else if(p.kind==='gat'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,210,120,.85)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-d*8,y);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff4c8';ctx.fillRect(x-1,y-.5,2,1);ctx.restore();}   // gatling tracer
    else if(p.kind==='leaf'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';   // 0.12.15 nature bolt: a glowing seed with leaves spinning round it and a fading green trail
      for(let i=1;i<=5;i++){ctx.fillStyle=`rgba(90,255,120,${.38-.065*i})`;const s=1.6-.22*i;ctx.fillRect(x-d*i*2.6-s/2,y-s/2+Math.sin(g.t*20+i)*.5,s,s);}
      glow(ctx,x,y,6,'#5dff6a',.32);glow(ctx,x,y,2.6,'#c8ffb0',.55);ctx.restore();
      ctx.fillStyle='#e8ffd8';ctx.fillRect(x-.75,y-.75,1.5,1.5);
      for(let i=0;i<3;i++){const an=g.t*14*d+i*2.09,lx=x+Math.cos(an)*2.6,ly=y+Math.sin(an)*1.6;ctx.fillStyle=i%2?'#3cc84a':'#7ee081';ctx.fillRect(lx-.6,ly-.4,1.2,.8);}}
    else if(p.kind==='dart'){const d=(p.dir||1),X=k=>d>0?x+k:x-k-1;   /* 0.12.68: a nicer tiny dart: steel needle, dark shaft, red and cream tuft, a drop of green poison */
      ctx.fillStyle='rgba(200,255,190,.18)';ctx.fillRect(d>0?x-11:x+2,y,9,1);ctx.fillStyle='#d8dde8';ctx.fillRect(X(1),y,2,1);ctx.fillStyle='#5fe04a';ctx.fillRect(X(0),y,1,1);ctx.fillStyle='#2a1e14';ctx.fillRect(d>0?x-4:x+1,y,4,1);
      ctx.fillStyle='#c8302a';ctx.fillRect(X(-5),y-1,1,3);ctx.fillStyle='#f0e6d0';ctx.fillRect(X(-6),y-1,1,1);ctx.fillRect(X(-6),y+1,1,1);ctx.fillStyle='#e04838';ctx.fillRect(X(-6),y,1,1);}   // poison dart: shaft, green-tipped point, little fletch
    else if(p.kind==='kunai'){const d=(p.dir||1);ctx.fillStyle='#2e3040';ctx.fillRect(x-d*6-(d<0?1:0),y,6,1);ctx.fillStyle='#5c3424';for(let i=1;i<5;i+=2)ctx.fillRect(x-d*(1+i),y,1,1);ctx.fillStyle='#a8aec4';ctx.fillRect(d>0?x:x-4,y-1,4,3);ctx.fillStyle='#e0e6f2';ctx.fillRect(d>0?x+3:x-4,y,2,1);ctx.fillStyle='#b0965a';ctx.fillRect(x-d*7,y-1,1,3);}   // spinning-free kunai, pixel drawn
    else if(p.kind==='yarrow'&&UNITS.archer&&UNITS.archer.arrow){const B=UNITS.archer.arrow,d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';if(p.pin){for(let i=0;i<5;i++){ctx.strokeStyle=`rgba(255,${200-i*25},${120-i*20},${.5-i*.09})`;ctx.lineWidth=3-i*.45;ctx.beginPath();ctx.moveTo(x-d*(10+i*9),y+i*.15);ctx.lineTo(x-d*(4+i*9),y);ctx.stroke();}glow(ctx,x,y,4,'#ffb050',.3);}   /* 0.12.68 Pinning_Shot: a hot motion trail */
      else{ctx.strokeStyle='rgba(255,240,200,.35)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-d*26,y);ctx.lineTo(x-d*4,y);ctx.stroke();}ctx.restore();   // faint streak behind it
      drawUnit(ctx,B,0,x,y,ART_SCALE/B.pre/HS*(p.pin?2.4:1.7),null,0,0,d<0);}   // his own arrow, cut from his Ranged frames
    else if(p.kind==='bullet'&&UNITS.flannel&&UNITS.flannel.bullet){const B=UNITS.flannel.bullet;drawUnit(ctx,B,0,x,y+B.ay*ART_SCALE/HS,ART_SCALE/HS,null,0,0,(p.dir||1)<0);}   // sprite bullet from the character's own sheet
    else if(p.kind==='zap'){const d=(p.dir||1);ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,230,90,.75)';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(x-d*9,y+Math.sin(g.t*40)*1.2);ctx.lineTo(x-d*6,y-1.2);ctx.lineTo(x-d*3,y+1.2);ctx.lineTo(x,y);ctx.stroke();glow(ctx,x,y,4,'#ffe04a',.5);ctx.fillStyle='#fffbe0';ctx.fillRect(x-1,y-1,2,2);ctx.restore();}   /* 0.12.178 the Sorcerer's spark */
    else if(p.kind==='arrow'||p.kind==='quarrel'){const d=p.enemy?-1:1;ctx.fillStyle='#8a6a4a';ctx.fillRect(d>0?x-8:x-1,y,9,1);
      ctx.fillStyle='#d8d0c0';ctx.fillRect(x-d*9,y-1,2,1);ctx.fillRect(x-d*9,y+1,2,1);ctx.fillStyle='#c8ccd6';ctx.fillRect(x+(d>0?1:-3),y-1,2,3);ctx.fillRect(x+(d>0?3:-4),y,1,1);}
    else if(p.kind==='brick'){ctx.save();ctx.translate(x,y);ctx.rotate(p.rot||0);   /* 0.12.68: a real-looking brick (long and flat), tumbling */
      ctx.fillStyle='#4a1a10';ctx.fillRect(-4.5,-2,9,4);ctx.fillStyle='#a8442a';ctx.fillRect(-4,-1.5,8,3);ctx.fillStyle='#c9663e';ctx.fillRect(-4,-1.5,8,1);ctx.fillStyle='#8a3220';ctx.fillRect(-4,.5,8,1);
      ctx.fillStyle='#d8c8b0';ctx.globalAlpha=.55;ctx.fillRect(-4,-1.5,1,3);ctx.fillRect(3,-1.5,1,1);ctx.globalAlpha=1;ctx.fillStyle='#5a2214';ctx.fillRect(-2,-.5,1,1);ctx.fillRect(1,-.5,1,1);ctx.restore();}
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
    if((f.k==='harvestdie'||f.k==='wraithdie')&&ATLAS[f.k.slice(0,-3)]){const D=ATLAS[f.k.slice(0,-3)].die;const fr=Math.min(D.n-1,Math.floor(f.t/1.6*D.n));ctx.save();shrinkAt(ctx,f.x,f.gy,HS);ctx.globalAlpha=f.t>1.8?Math.max(0,1-(f.t-1.8)/.4):1;drawUnit(ctx,Object.assign({},D,{img:f.k.slice(0,-3)}),fr,f.x,f.gy,.95,null,0,0,true);ctx.restore();continue;}
    if(f.k==='pellets'){const k2=f.t/f.life;glow(ctx,f.x,f.gy-3.5,6*(1-k2),'#ffd080',.8*(1-k2));   /* 0.12.158 shotgun pellets: 7 streaks along their real paths */
      ctx.strokeStyle=`rgba(255,220,150,${(1-k2).toFixed(2)})`;ctx.lineWidth=.6;for(const o of f.offs||[]){const d0=k2*f.R,a=o/f.R;ctx.beginPath();ctx.moveTo(f.x-d0,f.gy-3.5+a*d0);ctx.lineTo(f.x-d0-7,f.gy-3.5+a*(d0+7));ctx.stroke();}continue;}
    if(f.k==='poof'){ctx.fillStyle=`rgba(180,170,190,${1-k})`;for(let i=0;i<(f.big?10:6);i++){const a=i*1.1;const r=4+k*(f.big?22:12);ctx.fillRect(Math.round(f.x+Math.cos(a)*r),Math.round(f.y+Math.sin(a)*r*.6),2,2);}}
    if(f.k==='ring'){ctx.strokeStyle=f.c;ctx.globalAlpha=1-k;ctx.beginPath();ctx.ellipse(Math.round(f.x),Math.round(f.y),f.r*(.3+k),f.r*(.3+k)*.45,0,0,7);ctx.stroke();ctx.globalAlpha=1;}
    if(f.k==='slash'){const al=Math.max(0,1-k*1.6);for(let i=0;i<14;i++){const a2=-1.2+i*.18;const r=13+k*3;ctx.fillStyle=`rgba(240,232,214,${al*(i<3||i>11?.5:1)})`;ctx.fillRect(Math.round(f.x-6+Math.cos(a2)*r),Math.round(f.y+Math.sin(a2)*r*.9),2,i>3&&i<10?2:1);}}
    if(f.k==='spark'){ctx.fillStyle=f.c;for(let i=0;i<4;i++){const a=i*1.57+.7;ctx.fillRect(Math.round(f.x+Math.cos(a)*k*8),Math.round(f.y+Math.sin(a)*k*8),1,1);}}
    if(f.k==='beam'){ctx.fillStyle=f.c;ctx.globalAlpha=1-k;ctx.fillRect(Math.round(f.x)-2,0,5,Math.round(f.y));ctx.fillStyle='#fff';ctx.fillRect(Math.round(f.x),0,1,Math.round(f.y));ctx.globalAlpha=1;}
    if(f.k==='drain'){ctx.fillStyle=f.c;for(let i=0;i<8;i++){const u=(i/8+k)%1;ctx.fillRect(Math.round(f.x+(f.tx-f.x)*u),Math.round(f.y+(G-30-f.y)*u-Math.sin(u*3.14)*10),2,2);}}
    if(f.k==='frost'){ctx.fillStyle=`rgba(200,240,255,${1-k})`;for(let i=0;i<40;i++)ctx.fillRect((i*37+Math.round(k*30))%W,(i*53+Math.round(k*80))%G,1,1);}
    if(f.k==='tentacle'){ctx.fillStyle='#4a2a52';const h=Math.sin(k*3.14)*60;ctx.fillRect(Math.round(f.x)-3,Math.round(G-h),6,Math.round(h));ctx.fillStyle='#c050a0';ctx.fillRect(Math.round(f.x)-1,Math.round(G-h),2,2);}
    if(f.k==='zap'){ctx.strokeStyle=`rgba(190,240,255,${1-k})`;ctx.beginPath();ctx.moveTo(f.x,f.y);for(let i=1;i<=5;i++){const u2=i/5;ctx.lineTo(f.x+(f.tx-f.x)*u2+(i<5?(Math.random()-.5)*6:0),f.y+(f.ty-f.y)*u2+(i<5?(Math.random()-.5)*6:0));}ctx.stroke();}
    if(f.k==='nstrace'){const y2=f.y2!=null?f.y2:f.y,dx=f.x2-f.x1,ex=f.x2+Math.sign(dx||1)*8,ey=y2+(y2-f.y)*8/Math.max(4,Math.abs(dx));ctx.globalAlpha=Math.max(0,.9*(1-k));ctx.lineCap='round';ctx.strokeStyle=f.c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(f.x1,f.y);ctx.lineTo(ex,ey);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(f.x1,f.y);ctx.lineTo(ex,ey);ctx.stroke();glow(ctx,f.x1,f.y,3,'#ffe08a',.6*(1-k));ctx.globalAlpha=1;}   /* 0.12.155 No_Scope tracer: hip to target, angled across lanes */   /* 0.12.93 No_Scope tracer */
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
    if(!FTIP.innerHTML){hide();return;}FTIP.style.display='block';cur=el;const rr=el.closest('.rot-side');if(rr){if(FTIP.parentNode!==rr)rr.appendChild(FTIP);FTIP.classList.add('inrot');FTIP.style.left='';FTIP.style.top='';}else{if(FTIP.parentNode!==document.body)document.body.appendChild(FTIP);FTIP.classList.remove('inrot');place(el);}};
  const hide=()=>{FTIP.style.display='none';cur=null;};
  document.addEventListener('mouseover',e=>{if(Date.now()-lastT<800)return;const el=e.target.closest&&e.target.closest('[data-tiph],[title],[data-tipt]');if(el===cur)return;if(!el){hide();return;}show(el);},true);
  document.addEventListener('focusin',e=>{if(Date.now()-lastT<800||(e.target.matches&&e.target.matches(':focus-visible')===false))return;const el=e.target.closest&&e.target.closest('[data-tiph],[title],[data-tipt]');if(el)show(el);});
  document.addEventListener('scroll',()=>{if(cur&&cur.isConnected){if(!FTIP.classList.contains('inrot'))place(cur);}else hide();},true);document.addEventListener('mousedown',()=>{if(Date.now()-lastT>800)hide();},true);
  // 0.12.81 phones: tap (or long-press) anything with a tip to view it; tap again or tap elsewhere to close. No text selection.
  let lastT=0;const TSEL='[data-tiph],[title],[data-tipt]';document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')lastT=Date.now();},true);
  document.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')return;lastT=Date.now();const el=e.target.closest&&e.target.closest(TSEL);
    if(e.target.closest&&e.target.closest('#cc-ftip')){hide();return;}if(!el){hide();return;}if(el.closest('button,a,input,select,label')){hide();return;}if(cur===el){hide();return;}show(el);},true);   // buttons act on tap; long-press them to read the tip
  document.addEventListener('contextmenu',e=>{const el=e.target.closest&&e.target.closest(TSEL);if(el&&el.closest('#cc')){e.preventDefault();show(el);}},true);
  }
function portrait(key,size){const U=UNITS[key];if(U&&U.idle&&!SP['h_'+key]){const c=document.createElement('canvas');const A=U.idle;c.width=A.fw;c.height=A.fh;c.className='cc-por';
    const go=()=>{const x=c.getContext('2d');x.imageSmoothingEnabled=false;const k=A.pk||(A.art?3.4:A.pre?3.4*A.pre:1),w=30*k,hh=46*k,z=A.art?1:2,sx=A.x+A.ax-w/2,sy=A.y+A.ay-hh;c.width=w*z;c.height=hh*z;x.imageSmoothingEnabled=!!A.art;if(key==='jp')x.scale(z,z);else{x.translate(c.width,0);x.scale(-z,z);}   /* 0.12.143 (Kyle): JP faces the other way in character select */x.drawImage(A.img?XIMG[A.img]:UIMG,sx,sy,w,hh,0,0,w,hh);};
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
@keyframes ccTentPulse{0%,100%{box-shadow:0 0 0 #a6ff2e00}50%{box-shadow:0 0 10px #a6ff2e88}}
.cc-help{background:#140c1c;border:1px solid #a6ff2e66;border-radius:10px;padding:8px 12px;margin:6px 0 10px;font-size:12px;line-height:1.45;color:#e8dff5}
.cc-help b{color:#a6ff2e}
canvas.cc-fire{display:block;width:100%;image-rendering:pixelated;image-rendering:crisp-edges;border-radius:10px;border:1px solid #3a2a1a;box-shadow:0 0 30px rgba(255,120,40,.18);margin:6px 0 10px}
#cc-cv{image-rendering:pixelated;image-rendering:crisp-edges;background:#000;display:block;flex:0 0 auto}
.cc-cvw{position:relative;overflow:hidden;flex:0 0 auto;max-width:100%}
.cc-cvw.cam #cc-cv{position:absolute;left:0;top:0}
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
[data-tiph],[data-tipt]{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
#cc-ftip.inrot{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%);max-height:85%;overflow:auto;pointer-events:auto}
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
#cc .cc-uf{display:none}
#cc.phone .cc-hud{display:none!important}
#cc.phone .cc-uf{display:flex;flex-direction:column;gap:3px;position:absolute;left:4px;top:4px;z-index:3;pointer-events:auto}
#cc.phone.land .cc-uf{top:22px}
#cc .uf{display:flex;align-items:center;gap:4px;background:rgba(7,4,10,.62);border:1px solid #a6ff2e55;border-radius:6px;padding:2px 5px 2px 2px;width:118px;cursor:help}
#cc .uf .cc-por{width:22px!important;height:22px!important;border-radius:4px;flex:0 0 auto}
#cc .uf .ufb{flex:1;min-width:0}
#cc .uf .ufn{font-size:9px;line-height:1.1;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#cc .uf .ufn span{color:#ffd23f}
#cc .uf .ufh,#cc .uf .ufe{height:5px;background:#2a1020;border-radius:2px;margin-top:2px;overflow:hidden}#cc .uf .ufe{height:3px;background:#101a2a}
#cc .uf .ufh i,#cc .uf .ufe i{display:block;height:100%;width:100%;background:linear-gradient(#5ee07a,#1f9a3c)}#cc .uf .ufe i{background:#3fb6ff}
#cc .uf.dead{opacity:.45;filter:grayscale(1)}
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
const PL=()=>{const p=CC.data.players[CC.player]=CC.data.players[CC.player]||{pin:null,slots:[null,null,null,null,null]};while(p.slots.length<5)p.slots.push(null);return p;};   /* 0.12.86 (Kyle): 5 save files, no PIN */
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
  root.innerHTML=`<div class="cc-top"><span class="t">⚰️ CRYPT CRAWL <span style="color:#6a5a7a;font-size:8px">v0.12.179</span></span>
    <button class="cc-ib" data-a="restart" title="Restart this stage from its save point" hidden>↺</button><button class="cc-ib" data-a="pause" title="Pause">⏸</button><button class="cc-ib" data-a="speed" title="Game speed">1×</button>
    <button class="cc-ib" data-a="brain" title="Show what every unit is thinking">🧠</button><button class="cc-ib" data-a="mute" title="Sound effects">${muted?'🔇':'🔊'}</button><button class="cc-ib" data-a="music" title="Music on/off">${musicMuted?'🎵̸':'🎵'}</button><button class="cc-ib" data-a="track" title="Next track (now: ${TRACKS[trackI].name})">⏭</button><input class="cc-vol" data-vol type="range" min="0" max="100" value="${Math.round(musicVol*100)}" title="Music volume"><button class="cc-ib" data-a="zoom" title="Zoom (Auto: closer camera on phones)">🔍</button><button class="cc-ib" data-a="side" title="Turn sideways (phones held upright)">⟳</button><button class="cc-ib" data-a="fs" title="Full screen">⛶</button><button class="cc-ib" data-a="close" title="Close">✕</button></div>
    <div class="cc-main"><div class="cc-info"></div><div class="cc-cvw"><div class="cc-uf"></div><canvas id="cc-cv" width="${384*RES*GQ}" height="${216*RES*GQ}"></canvas></div><div class="cc-boss"></div><div class="cc-banner"></div><div class="cc-hud"></div><div class="cc-panel"></div></div>`;
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
    if(a==='zoom'){const L=[0,1,1.5,2];CAMZ=L[(L.indexOf(CAMZ)+1)%L.length];try{localStorage.setItem('cc-zoom',String(CAMZ));}catch(e){}b.title='Zoom: '+(CAMZ?CAMZ+'×':'Auto');b.textContent=CAMZ?CAMZ+'×':'🔍';layout();}
    if(a==='side'){if(window.PodSideways){PodSideways.sidewaysPref(!root.classList.contains('rot-side'));PodSideways.fitSideways(root);}setTimeout(layout,60);}});
  {const vs=root.querySelector('[data-vol]');if(vs)vs.oninput=()=>{musicVol=vs.value/100;try{localStorage.setItem('podrundown-crawl-music-vol',musicVol);}catch(_){}if(BGM)BGM.volume=musicVol;if(musicVol>0&&!musicMuted)musicStart();else if(BGM)BGM.pause();};}
  document.addEventListener('keydown',e=>{if(root.hidden)return;if(e.key==='Escape'&&!document.fullscreenElement)closeCrawl();if(e.key===' '&&CC.game){e.preventDefault();CC.paused=!CC.paused;}});
  window.addEventListener('resize',()=>{if(window.PodSideways&&root&&!root.hidden)PodSideways.fitSideways(root);layout();});document.addEventListener('fullscreenchange',()=>setTimeout(layout,60));
}
/* 0.12.56 (Kyle): phones get a closer camera. The fight happens in the bottom fifth of the picture, so on a phone we
   blow the picture up and crop: sideways phones fill the width and lose some sky; upright phones zoom 2x and the camera follows the party.
   Desktop is unchanged (Auto = whole field). The 🔍 button cycles Auto / 1x / 1.5x / 2x. */
let CAMZ=(()=>{try{return +(localStorage.getItem('cc-zoom')||0)||0;}catch(e){return 0;}})(),CAM={sc:1,vw:0,vh:0,cw:0,ch:0,on:false,x:null};
const handset=()=>!!(window.PodSideways&&PodSideways.isPhone());
function layout(){if(!root||root.hidden)return;root.classList.toggle('phone',handset());const main=$('.cc-main',root);const W=main.clientWidth,H=main.clientHeight;const wrap=$('.cc-cvw',root);
  const land=W>H*1.25&&H<620;root.classList.toggle('land',land);
  hud.classList.toggle('tall',!land&&H>W*1.2);
  const reserved=land?0:(info.offsetHeight+hud.offsetHeight+4);const avH=Math.max(120,H-reserved);let w=Math.min(W,avH*16/9);
  const k=Math.floor(w/384);if(k>=2&&k*384>=w*.82)w=k*384;
  let z=CAMZ||(handset()?(land?'fill':2):1);
  let cw=w,ch=w*9/16,vw=w,vh=ch;
  if(z==='fill'){cw=W;ch=W*9/16;vw=W;vh=Math.min(ch,avH);}
  else if(z>1){cw=w*z;ch=cw*9/16;vw=Math.min(W,cw);vh=Math.min(avH,ch);}
  cw=Math.floor(cw);ch=Math.floor(ch);vw=Math.floor(vw);vh=Math.floor(vh);
  CAM.on=cw>vw+1||ch>vh+1;CAM.sc=cw/384;CAM.vw=vw;CAM.vh=vh;CAM.cw=cw;CAM.ch=ch;if(!CAM.on)CAM.x=null;
  wrap.classList.toggle('cam',CAM.on);wrap.style.width=vw+'px';wrap.style.height=vh+'px';
  cv.style.width=cw+'px';cv.style.height=ch+'px';panCam();
  bossEl.style.top=(wrap.offsetTop+vh*.06)+'px';banner.style.top=(wrap.offsetTop+vh*.38)+'px';}
/* keep the party (and a bit of what's ahead of them) in view; always keep the ground at the bottom */
function panCam(){if(!CAM.on){cv.style.left='0px';cv.style.top='0px';return;}const g=CC.game;const sc=CAM.sc;
  let fx=192;if(g&&g.heroes){const al=g.heroes.filter(h=>h.alive);if(al.length){const xs=al.map(h=>h.x);fx=(Math.min(...xs)+Math.max(...xs))/2+55;}}
  CAM.x=CAM.x==null?fx:CAM.x+(fx-CAM.x)*.08;
  const L=Math.max(CAM.vw-CAM.cw,Math.min(0,CAM.vw/2-CAM.x*sc)),T=CAM.vh-CAM.ch;
  cv.style.left=Math.round(L)+'px';cv.style.top=Math.round(T)+'px';}
function openCrawl(){build();root.hidden=false;musicStart();document.body.style.overflow='hidden';stopStrip();if(window.PodSideways)PodSideways.fitSideways(root);CC.data=Save.load();for(const p in CC.data.players)for(const s of CC.data.players[p].slots||[])if(s)migrateSlot(s,p);Save.write(CC.data);showWho();layout();}
function closeCrawl(){musicStop();if(CC.game&&!CC.game.over)quitToCamp(true);CC.game=null;cancelAnimationFrame(CC.raf);root.hidden=true;document.body.style.overflow='';try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}startStrip();}
function showPanel(html){installTips();const wy=window.scrollY,wx=window.scrollX,same=!panel.hidden&&panel._k===html.slice(0,80),pt=panel.scrollTop;panel._k=html.slice(0,80);panel.hidden=false;const rb=root.querySelector('[data-a=restart]');if(rb)rb.hidden=true;panel.innerHTML=`<div class="cc-wrap">${html}</div>`;panel.scrollTop=same?pt:0;window.scrollTo(wx,wy);requestAnimationFrame(()=>{if(Math.abs(window.scrollY-wy)>2)window.scrollTo(wx,wy);});   // 0.12.80: re-rendering a screen (feeding, buttons) no longer jumps the page scroll
  hud.innerHTML='';info.innerHTML='';bossEl.textContent='';drawIdle();return panel;}
function drawIdle(){const g=CC.idle||(CC.idle=demoGame(384));ctx.imageSmoothingEnabled=false;if(IMG.complete&&BGI.complete)drawGame(ctx,g,384,0);}
// ---------------------------------------------------------------- screens
function showWho(){
  const rows=Object.keys(OWNERS).map(p=>{const b=bestOf(p);return {p,b};}).sort((a,b)=>(b.b.prestige*100+b.b.stage)-(a.b.prestige*100+a.b.stage)||b.b.score-a.b.score);
  const P=showPanel(`<div class="cc-h">⚰️ CRYPT CRAWL</div><p class="cc-sub">Your deck heroes march through the crypt on their own. You pick the team, the upgrades and when to push on. For now it's one endless stretch of Blackwater Lake. Fall and you keep everything, so you can always grind your way past a tough stage.</p>
  <div class="cc-who">${Object.keys(OWNERS).map(p=>{const b=bestOf(p);const has=CC.data.players[p]&&CC.data.players[p].pin;
    return `<button data-p="${p}"><div class="e">${OWNERS[p]}</div><div class="nm px">${p}</div><div class="cc-sub" style="margin:0">${b.stage?`Best stage ${b.stage}${b.prestige?' ★'+b.prestige:''}`:''}</div></button>`;}).join('')}</div>
  <div class="cc-h" style="margin-top:18px;font-size:12px">🏆 LEADERBOARD</div>
  <table class="cc-lb"><tr><th>Player</th><th>Furthest</th><th>Best score</th></tr>${rows.map(r=>`<tr><td>${OWNERS[r.p]} ${r.p}</td><td>${r.b.stage?`Stage ${Math.min(r.b.stage,CFG.maxStage)}${r.b.prestige?' · Prestige '+r.b.prestige:''}`:'—'}</td><td>${r.b.score?fmt(r.b.score):'—'}</td></tr>`).join('')}</table>
  <details style="margin-top:14px"><summary class="cc-sub" style="cursor:pointer">How it works</summary><p class="cc-sub">Each player has 5 save files. Hero levels, gold and items stay with the save, and nothing is lost when the party falls. Lower-level heroes earn catch-up XP. Between stages you camp: spend level-ups, then press Begin. Beat stage ${CFG.maxStage} to Prestige and loop with tougher monsters.</p></details>`);
  P.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{CC.player=b.dataset.p;CC.unlocked[CC.player]=1;showSlots();});   /* 0.12.86 (Kyle): no PIN for now */
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
  const P=showPanel(`<div class="cc-h">${OWNERS[CC.player]} ${CC.player.toUpperCase()} · SAVES</div><p class="cc-sub">Five separate games. Try different hero combos in each.</p>
  <div class="cc-load">${p.slots.map((s,i)=>{if(!s)return `<div class="cc-card"><b>Save ${i+1}</b> · empty<div class="cc-row" style="margin-top:8px"><button class="cc-btn go" data-new="${i}">NEW SAVE</button></div></div>`;
    migrate(s,CC.player);if(!s.team&&s.run)s.team=s.run.team.slice();const top=Object.entries(s.heroes).sort((a,b)=>b[1].lvl-a[1].lvl).slice(0,4).map(([k,v])=>`${heroDef(k).icon} ${esc(heroDef(k).name)} <b>Lv ${v.lvl}</b>`).join(' · ');
    return `<div class="cc-card"><b>Save ${i+1}</b> · 💰 ${fmt(s.gold||0)} · best stage ${s.best.stage||0}${s.best.prestige?' ★'+s.best.prestige:''} · best score ${fmt(s.best.score)} · ${s.runs} runs
      ${s.run?`<div class="cc-sub" style="margin:0 0 6px">Run in progress: stage ${s.run.stage}${s.run.prestige?' ★'+s.run.prestige:''} with ${s.run.team.map(k=>esc(heroDef(k).name)).join(', ')}</div>`:''}
      <div class="cc-row">${s.run||(s.team&&s.team.length)?`<button class="cc-btn go" data-cont="${i}">CONTINUE</button>`:`<button class="cc-btn go" data-team="${i}">BEGIN</button>`}${s.run||(s.team&&s.team.length)||s.runs?`<button class="cc-btn warn" data-del="${i}">Delete</button>`:''}</div></div>`;}).join('')}</div>
  <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-back>← Players</button></div>`);
  P.querySelector('[data-back]').onclick=showWho;
  P.querySelectorAll('[data-reset]').forEach(b=>b.onclick=()=>{const who=b.dataset.reset;if(!confirmInline(b,`Reset ${who}'s PIN?`))return;CC.data.players[who].pin=null;delete CC.unlocked[who];persist();
    if(who==='Kyle'){CC.unlocked.Kyle=0;return showPin();}showSlots();});
  P.querySelectorAll('[data-new]').forEach(b=>b.onclick=()=>{p.slots[+b.dataset.new]=newSlot(CC.player);persist();CC.slotIdx=+b.dataset.new;showTeam();});
  P.querySelectorAll('[data-cont]').forEach(b=>b.onclick=()=>{const i=+b.dataset.cont,S=p.slots[i];CC.slotIdx=i;if(S.run)showCamp();else restartSameTeam(S,S.team);});   /* 0.12.171: Continue picks the run back up, or starts the next run with the save's team */
  P.querySelectorAll('[data-team]').forEach(b=>b.onclick=()=>{const i=+b.dataset.team,S=p.slots[i];CC.slotIdx=i;if(S.run)return;if(S.team&&S.team.length)restartSameTeam(S,S.team);else showTeam();});
  P.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(!confirmInline(b,'Delete forever?'))return;p.slots[+b.dataset.del]=null;persist();showSlots();});
}
function confirmInline(b,msg){if(b.dataset.armed)return true;b.dataset.armed=1;const t=b.textContent;b.textContent=msg+' Tap again';setTimeout(()=>{if(b.isConnected){delete b.dataset.armed;b.textContent=t;}},2600);return false;}
/* 0.12.57 (Kyle): PWR and SPD used the old flat atk/aspd numbers, which are the same for every hero now that damage comes from dice.
   PWR is now his best basic attack's damage per second (dice, flat bonus, pellets, crit), SPD how many basic attacks he gets off per second.
   Both are scaled against the best in the roster so the bars spread out. */
function atkProfile(k){const C=CHAR[k]||{};let best={dps:0,rate:0};
  for(const [nm,A] of Object.entries(C)){if(!A||typeof A!=='object'||!Array.isArray(A.dice)||!(A.every>0))continue;
    const avg=(A.dice[0]*(A.dice[1]+1)/2+(A.flat||0))*(1+((A.pellets||1)-1)*.5);/* pellets spread wide: count about half of the extras as landing */const clip=A.clip||1,cyc=clip>1?((clip-1)*A.every+(A.reload||A.every))/clip:A.every;
    const dps=avg/cyc*(1+(C.crit||0)*((C.critMul||1.75)-1));const r=best.rate;if(dps>best.dps)best={dps,rate:r,nm,avg};best.rate=Math.max(best.rate,1/cyc);}
  return best;}
function statBars(k,lvl){const b=heroBase(k,lvl,3);const mx={hp:80};const HE=Object.keys(CHAR).filter(x=>x!=='dog');const P=atkProfile(k);
  const mxD=Math.max(...HE.map(x=>atkProfile(x).dps)),mxR=Math.max(...HE.map(x=>atkProfile(x).rate));
  return `<div class="cc-stat"><span title="${b.stamina} Stamina × 5 = ${b.hp} HP">HP ${b.hp}</span><i><b style="width:${Math.min(100,b.hp/mx.hp*100)}%"></b></i><span title="Basic attack damage per second: about ${P.dps.toFixed(1)} (${P.nm||'basic'}: ${(P.avg||0).toFixed(1)} a hit, crit ${Math.round(b.crit*100)}%, accuracy ${b.acc||0}). Abilities not counted.">PWR</span><i><b style="width:${Math.max(8,P.dps/mxD*100).toFixed(0)}%"></b></i><span title="About ${P.rate.toFixed(2)} basic attacks a second">SPD</span><i><b style="width:${Math.max(8,P.rate/mxR*100).toFixed(0)}%"></b></i></div>`;}
const ROLE={melee:'Melee',ranged:'Ranged',caster:'Caster',duo:'Duo',gunner:'Rifle + Melee',blade:'Sword'};
/* 0.12.170 (Kyle): a save keeps one team for good. The party is picked once, when the save is made; later runs restart with that same team. */
function restartSameTeam(s,team){for(const k of team){const H=s.heroes[k];if(H){H.lvl=1;H.xp=0;H.pts={};H.tal=[];H.offer=null;}}s.run=newRun(team,s);const M=s.lastModes||{};s.run.hardcore=!!M.hardcore;s.run.dnd=!!M.dnd;if(s.run.dnd)s.run.rolls=rollPersonas(team);s.runs++;persist();showCamp();}
function showTeam(){
  setRunModes(null);  const s=SLOT();migrate(s,CC.player);s.partySize=3;const pick=[];   /* 0.12.33: back to a 3-hero party */
  const mine=DATA.heroes.slice();   /* 0.12.92: every player uses the shared roster */
  const P=showPanel(`<div class="cc-h">PICK YOUR PARTY</div><p class="cc-sub">Up to 3 heroes from your decks. Fewer heroes = each one is stronger. Lower-level heroes earn catch-up XP.</p>
    <div class="cc-heroes">${mine.map(h=>{const st=STYLE[h.key];const H=s.heroes[h.key],L=H.lvl;const tip=[h.name,'',BEHAVIOR[h.key]||h.blurb||'','',...personaLines({key:h.key,insp:H.insp})].join('\n');
      const sp=h.spells[0];return `<div class="cc-hw"><button class="cc-hero" data-k="${h.key}" aria-pressed="false" data-tiph="${esc(howTip(h.key,H.insp))}"><span class="ord"></span><span class="por" data-por="${h.key}"></span><div class="nm">${h.icon} ${esc(h.name)}</div>${h.deck?`<div class="dk">Built from deck: <b>${esc(h.deck)}</b></div>`:''}<div class="dk">${(CHAR[h.key]&&CHAR[h.key].role)||ROLE[st.atk]}${st.tank?' · Tank':''}${st.companion?' · with companion':''}</div>
      <div class="lv">LV ${L}</div><div class="dk">🧠 Personality: <b>${esc(personaTitle({key:h.key,insp:H.insp}))}</b> <span style="opacity:.7">(hover the card for how it fights)</span></div>${statBars(h.key,L)}<div class="cc-abl">${abOrder((CHAR[h.key]||{}).abilities).map(a=>`<span class="cc-ab${a.passive?' pas':''}" tabindex="0" data-tiph="${esc('<div class=tt-h>'+(a.passive?'✦ ':'⚡ ')+esc(a.name)+(a.passive?' <span style=opacity:.7>(passive)</span>':'')+'</div>'+esc(ABIL_DESC[a.id]||a.name))}">${a.passive?'✦':'⚡'} ${esc(a.name)}</span>`).join('')||'<span class="dk" style="opacity:.6">No abilities yet</span>'}</div>${sp?`<div class="dk" style="margin-top:2px">Starts with ${esc(sp.name||shortCard(sp.card))} (${SPELL[sp.arch].label})</div>`:''}</button>
      <div class="cc-insp" data-ik="${h.key}"><div class="cc-sub" style="margin:4px 0 2px;font-size:10px">✨ INSPIRATION DECK</div>
        <select data-ip><option value="">Pick a player…</option>${Object.keys(PLAYER_ICON).map(p=>`<option value="${p}"${H.insp&&INSP[H.insp]&&INSP[H.insp].o===p?' selected':''}>${PLAYER_ICON[p]} ${p}</option>`).join('')}</select>
        <select data-id ${H.insp?'':'disabled'}></select><div class="cc-ibx"></div></div></div>`;}).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><label class="cc-sub" style="margin:0 8px 0 0;font-size:12px;cursor:pointer" data-tipt="Friendly fire: your heroes' shots can hit allies in the way, and your own explosions (Trip Bomb, its shockwave, missiles, planted mines) hurt your units too."><input type="checkbox" data-hc ${s.lastModes&&s.lastModes.hardcore?'checked':''}> ☠ Hardcore</label><label class="cc-sub" style="margin:0 10px 0 0;font-size:12px;cursor:pointer" data-tipt="Every hero's 20 personality sliders are rolled (2d6-2 each) when the run starts instead of using their fixed values. Deck nudges still apply on top."><input type="checkbox" data-dnd ${s.lastModes&&s.lastModes.dnd?'checked':''}> 🎲 D&amp;D mode</label><button class="cc-btn go" data-go disabled>START RUN</button><button class="cc-btn" data-back>← Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  // Inspiration: player first, then that player's decks (each option shows its bonus). Saved per hero on this save slot.
  P.querySelectorAll('.cc-insp').forEach(box=>{const k=box.dataset.ik,H=s.heroes[k];const ip=box.querySelector('[data-ip]'),id=box.querySelector('[data-id]'),ib=box.querySelector('.cc-ibx');
    const fill=()=>{const p=ip.value;id.disabled=!p;id.innerHTML=p?`<option value="">Pick a deck…</option>`+Object.keys(INSP).filter(d=>INSP[d].o===p).map(d=>`<option value="${esc(d)}"${H.insp===d?' selected':''}>${esc(d)}: ${esc(inspText(d))}</option>`).join(''):'<option>Pick a player first</option>';show();};
    const show=()=>{const d=H.insp;ib.innerHTML=d&&INSP[d]?`<b>${esc(d)}</b>: ${esc(inspText(d))}<br><span style="opacity:.7">${esc(INSP[d].why)}</span><ul style="margin:4px 0 0;padding-left:14px">${inspHelp(d).map(t=>`<li style="margin-top:2px">${esc(t)}</li>`).join('')}</ul>${cdrTable(k,d)}`:'<span style="opacity:.6">No inspiration yet</span>';
      const b=box.parentNode.querySelector('.cc-hero');if(b){b.dataset.tiph=howTip(k,H.insp);const pt=b.querySelector('.dk b');if(pt)pt.textContent=personaTitle({key:k,insp:H.insp});const t=b.querySelector('.dk b');}};
    ip.onchange=()=>{if(!ip.value||(H.insp&&INSP[H.insp]&&INSP[H.insp].o!==ip.value)){H.insp=null;persist();}fill();};
    id.onchange=()=>{H.insp=id.value||null;persist();show();};fill();});
  const upd=()=>{P.querySelectorAll('.cc-hero').forEach(b=>{const i=pick.indexOf(b.dataset.k);b.setAttribute('aria-pressed',i>=0);b.querySelector('.ord').textContent=i>=0?i+1:'';});
    const g=P.querySelector('[data-go]');g.disabled=!pick.length;g.textContent=`START RUN (${pick.length}/${s.partySize||2})`;};
  P.querySelectorAll('.cc-hero').forEach(b=>b.onclick=()=>{const k=b.dataset.k,i=pick.indexOf(k);if(i>=0)pick.splice(i,1);else if(pick.length<(s.partySize||3))pick.push(k);upd();});
  P.querySelector('[data-back]').onclick=showSlots;
  P.querySelector('[data-go]').onclick=()=>{s.team=pick.slice();s.run=newRun(pick,s);s.lastModes={hardcore:!!P.querySelector('[data-hc]').checked,dnd:!!P.querySelector('[data-dnd]').checked};s.run.hardcore=s.lastModes.hardcore;s.run.dnd=s.lastModes.dnd;if(s.run.dnd)s.run.rolls=rollPersonas(pick);s.runs++;persist();showCamp();};upd();
}
function rankStars(r){return r>=CFG.maxRank?'<span class="cc-asc">✦ MAX ✦</span>':'<span class="cc-stars">'+'★'.repeat(Math.min(5,Math.ceil(r/2)))+'</span> <span class="cc-sub" style="font-size:11px">r'+r+'</span>';}
function chipFor(e,item,hk){const base=item?shortCard(e.card):sname(hk,e.card);const name=e.r>=CFG.maxRank?`✦ ${esc(maxTitle(e.card,e.arch))}`:esc(base);
  return `<span class="cc-chip ${item?'it':''}" title="${item?esc(e.card):'Inspired by '+esc(e.card)}"><b>${name}</b> · ${item?ITEM[e.arch].label:SPELL[e.arch].label} r${e.r}${(e.augs||[]).map(g=>' +'+AUG[g].name).join('')}${item?' · GS '+gearScore(e):''}${item&&e.proc?' · ✦ '+({onhit:'on hit',oncrit:'on crit',onkill:'on kill',whenhit:'when hit',near:'when close',allylow:'ally low',oncast:'on cast'}[PROCS[e.proc].t]||''):''}</span>`;}
/* camp panel: supplies, what the camp did on arrival, upgrades (pick 1 of the offers per camp), Triage builds */
function campPanel(s,run,btn){const gold=s.gold||0,parts=s.parts||0;const food=run.food||0;run.haggle=haggleOf(s,run);run.resource=resourcefulOf(s,run);
  const owned=Object.keys(run.upg||{}).filter(id=>run.upg[id]);
  const tent=`<span class="cc-tent" style="cursor:help;font-size:18px;margin-left:6px;display:inline-flex;align-items:center;gap:3px;padding:1px 6px;border:1px dashed #a6ff2e88;border-radius:10px;animation:ccTentPulse 2.2s ease-in-out infinite" data-tiph="${esc('<b>⛺ Every camp upgrade</b><br>'+Object.keys(CAMP_UPG).map(id=>{const U=CAMP_UPG[id],t=upgT(run,id);const mx=U.needs?(Object.keys(U.needs).every(k=>upgT(run,U.needs[k])>0)?U.tiers.length:U.tiers.length-1):U.tiers.length;return `${U.icon} ${U.name}: <b style="color:${t?'#a6ff2e':'#9a90a8'}">${t}/${mx}</b> <span style="opacity:.6">(${U.tiers.map(g=>Math.round(g*(1-(run.haggle||0)))+'g').join(' / ')})</span>`;}).join('<br>')+(run.haggle?`<br><br>🤝 Haggler: upgrades ${Math.round(run.haggle*100)}% off`:'')+(run.resource?`<br>🧰 Resourceful: you can pay in spare parts`:''))}">⛺<span style="font-size:10px;color:#a6ff2e">ⓘ</span></span>`;
  const sup=`<div class="cc-card"><b>🏕️ Camp</b>${tent} <span class="cc-sub" style="font-size:12px">💰 <b style="color:#ffd23f">${fmt(gold)}</b> gold · ⚙️ <b>${parts}</b> spare parts · 🥫 <b>${Number.isInteger(food)?food:Math.floor(food)+'½'}</b> food · 💧 <b>${run.water||0}</b> water</span>${run.team.some(k=>missingOf(run,k)&&run.heroes[k]&&!run.heroes[k].dead)?` <button class="cc-btn" data-feedall style="padding:2px 8px;font-size:12px;vertical-align:middle" title="Feed and water everyone who needs it: most-needy and lowest HP first, never wastes supplies"><svg width="16" height="14" viewBox="0 0 16 14" style="vertical-align:-2px;image-rendering:pixelated"><rect x="1" y="5" width="7" height="8" fill="#b8642a"/><rect x="1" y="5" width="7" height="2" fill="#e8d0a0"/><rect x="2" y="8" width="5" height="3" fill="#e8302a"/><rect x="1" y="12" width="7" height="1" fill="#6a3a18"/><path d="M12 2 L14.5 7 A2.6 2.6 0 1 1 9.5 7 Z" fill="#4ab8ff"/><rect x="10.5" y="7" width="1" height="2" fill="#d8f4ff"/></svg> Feed all</button>`:''}
    ${(run.campLog||[]).length?`<div class="cc-sub" style="font-size:11px;margin:4px 0 0">${run.campLog.map(esc).join(' · ')}</div>`:''}
    ${owned.length?`<div class="cc-chips" style="margin-top:6px">${owned.map(id=>{const U=CAMP_UPG[id],t=run.upg[id];return `<span class="cc-chip" title="${esc(U.txt(t))}">${U.icon} ${esc(U.name)} ${['','I','II','III','IV'][t]}</span>`;}).join('')}</div>`:''}</div>`;
  const offers=(run.offers||[]).filter(id=>upgT(run,id)<CAMP_UPG[id].tiers.length);
  const up=`<div class="cc-card"><b>🔨 Camp upgrades</b> <span class="cc-sub" style="font-size:11px">${run.upgBought?'Built one this camp. More offers next time.':'Pick one to build this camp.'} They last for this run.</span>
    <div class="cc-offers" style="margin-top:8px">${offers.map(id=>{const U=CAMP_UPG[id],t=upgT(run,id)+1,pr=upgPrice(run,id);return `<div class="cc-offer" style="--rc:${t>1?'#7fd0ff':'#a6ff2e'}"><span class="rar">${t>1?'TIER '+t:'NEW'}</span><span class="cn">${U.icon} ${esc(U.name)}${U.tiers.length>1?' '+['','I','II','III','IV'][t]:''}</span><span class="tx">${esc(U.txt(t))}</span>
      <button class="cc-btn" data-upg="${id}" ${run.upgBought||gold<pr?'disabled':''}>Build · ${fmt(pr)}g</button>${run.resource?`<button class="cc-btn" data-upgp="${id}" style="margin-top:4px" ${run.upgBought||parts<upgParts(run,id)?'disabled':''}>Build · ⚙️ ${upgParts(run,id)} parts</button>`:''}</div>`;}).join('')||'<span class="cc-sub">Everything is fully built!</span>'}</div></div>`;
  const cl=conList(run);const con=`<div class="cc-card" style="border-color:#ffb020;box-shadow:0 0 0 1px #ffb02055,0 0 14px #ffb02033"><b>🏗️ Construction</b> <span class="cc-sub" style="font-size:11px">Build anything, as many as you like this camp, at <b>double</b> the pick price.</span>
    <button class="cc-btn" data-con style="margin-left:8px;background:#ffb020;color:#1a1000;font-weight:800">${run.conOpen?'▲ HIDE':'🏗️ OPEN CONSTRUCTION'}</button>
    ${run.conOpen?`<div class="cc-offers" style="margin-top:8px">${cl.map(id=>{const U=CAMP_UPG[id],t=upgT(run,id)+1,pr=conPrice(run,id);return `<div class="cc-offer" style="--rc:#ffb020"><span class="rar">${t>1?'TIER '+t:'NEW'}</span><span class="cn">${U.icon} ${esc(U.name)}${U.tiers.length>1?' '+['','I','II','III','IV'][t]:''}</span><span class="tx">${esc(U.txt(t))}</span>
      <button class="cc-btn" data-conb="${id}" ${gold<pr?'disabled':''}>Build · ${fmt(pr)}g</button>${run.resource?`<button class="cc-btn" data-conp="${id}" style="margin-top:4px" ${parts<conParts(run,id)?'disabled':''}>Build · ⚙️ ${conParts(run,id)} parts</button>`:''}</div>`;}).join('')||'<span class="cc-sub">Everything is fully built!</span>'}</div>`:''}</div>`;
  const tt=upgT(run,'triage');const tri=tt?`<div class="cc-card"><b>🩺 Triage Station ${['','I','II','III','IV'][tt]}</b> <span class="cc-sub" style="font-size:11px">${(run.triageN||0)}/${TRIAGE.max[tt-1]} built this camp · whoever you pick carries it into the next stage</span>
    ${[['med','Medkit','heals an ally under 50% for 35%'],['defib','Defibrillator','instantly revives a downed ally']].concat(run.team.includes('robot')?[['bat','Battery','+30 energy for the Warhound when he runs low']]:[]).map(([w,n,d])=>`<div class="cc-chips" style="align-items:center;margin-top:4px"><span class="cc-sub" style="font-size:11px;margin:0;min-width:180px"><b>${n}</b> · ⚙️ ${TRIAGE[w][tt-1]} · ${d}</span>${run.team.map(k=>btn(`data-tri="${w}|${k}" ${parts<TRIAGE[w][tt-1]||(run.triageN||0)>=TRIAGE.max[tt-1]?'disabled':''}`,'→ '+esc(heroDef(k).name.split(/[ _]/)[0]),'Build it for '+heroDef(k).name)).join(' ')}</div>`).join('')}</div>`:'';
  const tw=upgT(run,'tower');if(tw&&!run.scoutOffers)run.scoutOffers=scoutRoll(run);
  const tower=tw?`<div class="cc-card"><b>🗼 Watchtower ${['','I','II','III','IV'][tw]}</b> <span class="cc-sub" style="font-size:11px">Scouts report on the road ahead. ${tw>=4?'MAP TABLE: pick up to TWO roads for the next stage.':'Pick one for the next stage.'}</span>
    <div class="cc-offers" style="margin-top:8px">${(run.scoutOffers||[]).map(id=>{const S=SCOUT[id],on=[].concat(run.scoutPick||[]).includes(id);return `<div class="cc-offer" style="--rc:${on?'#a6ff2e':'#7fd0ff'}"><span class="cn">${S.icon} ${esc(S.name)}</span><span class="tx">${esc(S.txt(tw>=3?1.5:1))}</span><button class="cc-btn" data-scout="${id}" ${on&&tw<4?'disabled':''}>${on?(tw>=4?'Chosen ✓ (tap to drop)':'Chosen ✓'):'Take this road'}</button></div>`;}).join('')}</div></div>`:'';
  const rd=upgT(run,'radio');const radio=rd?(()=>{const F=radioForecast(run);return `<div class="cc-card"><b>📻 Radio Shack ${['','I','II'][rd]}</b> <span class="cc-sub" style="font-size:11px">Chatter about stage ${run.stage}: about <b>${F.foes}</b> undead in <b>${F.waves}</b> waves${F.wolves?' · 🐺 werewolves':''}${F.firemen?' · 🧑‍🚒 firemen':''}${rd>=2?' · early warning on (ALERT +10 accuracy for 5s as each wave comes in)':''}</span></div>`;})():'';   /* 0.12.105 */
  const stl=upgT(run,'still');const still=stl?`<div class="cc-card"><b>🫙 Moonshine Still ${['','I','II'][stl]}</b> <span class="cc-sub" style="font-size:11px">${run.brewN||0}/${stl===1?1:2} brewed this camp · Liquid Courage costs 🥫 ${stl===1?2:1} food · +20% damage, -10 accuracy, steadier nerves for the next stage</span>
    <div class="cc-chips" style="align-items:center;margin-top:4px">${run.team.map(k=>btn(`data-brew="${k}" ${(run.food||0)<(stl===1?2:1)||(run.brewN||0)>=(stl===1?1:2)||(run.heroes[k].carry&&run.heroes[k].carry.courage)?'disabled':''}`,'🫙 → '+esc(heroDef(k).name.split(/[ _]/)[0]),'Pour '+heroDef(k).name+' a jar')).join(' ')}</div></div>`:'';
  return radio+sup+con+up+tri+tower+still;}
/* 0.12.57 (Kyle): the camp screen opens on the party resting around a roaring fire at night (Diablo-style),
   idling with their normal animations, the fire flickering light over them. Everything else on the camp screen stays below it. */
const CAMPBG=new Image();CAMPBG.src='crawl_campbg.png';   /* 0.12.63 (Kyle): his cabin-at-night painting is the camp backdrop */
function campScene(host,run){const W=171,H=96;const c=document.createElement('canvas');c.className='cc-fire';c.width=W*RES;c.height=H*RES;host.appendChild(c);
  const x=c.getContext('2d');let g;try{const r2=newRun(run.team.slice(),null);r2.stage=run.stage;r2.prestige=run.prestige||0;g=new Game({run:r2,slot:null,demo:true,W});}catch(e){c.remove();return;}
  g.enemies=[];g.obst=[];g.mines=[];g.bomblets=[];g.loot=[];g.minions=[];g.proj=[];g.fx=[];g.texts=[];
  const fx=90,fgy=CFG.H-H+80;g.camp={x:fx,gy:fgy,t:1,life:99,state:'burn',A:{}};g.bgImg=CAMPBG;   // the painting's fire pit
  const spots=[[fx-30,fgy+7,1],[fx+30,fgy+7,-1],[fx-14,fgy-6,1]];
  g.heroes.forEach((h,i)=>{const s=spots[i]||spots[0];h.x=s[0];h.gy=s[1];h.face=s[2];h.alive=true;h.moving=false;h.hp=h.max;h.en=h.enMax||100;h.wanderX=0;h.dodgeX=0;h.plan=null;});
  const stars=[...Array(34)].map(()=>[60+Math.random()*60,30+Math.random()*50,Math.random()]);   // embers drifting up from the fire
  let last=performance.now();
  const frame=now=>{if(!c.isConnected)return;requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);if(dt<1/31)return;last=now;
    g.t+=dt;g.camp.t+=dt;for(const h of g.heroes){h.walkT=(h.walkT||0);h.animT=0;h.hitFlash=0;}
    if(!(IMG.complete&&CAMPBG.complete))return;PLATE_OFF=true;try{drawGame(x,g,W,CFG.H-H);}catch(e){PLATE_OFF=false;return;}PLATE_OFF=false;
    const RR=c.width/W;x.setTransform(RR,0,0,RR,0,0);
    x.globalCompositeOperation='source-over';x.fillStyle='rgba(4,2,14,.18)';x.fillRect(0,0,W,H);   // the painting is already night: only a light shade
    for(const s of stars){const life=(g.t*.35+s[2])%1;const ex=fx+(s[0]-90)*.35*life+Math.sin(g.t*3+s[2]*20)*2,ey=(fgy-(CFG.H-H))-6-life*55;x.globalAlpha=(1-life)*(.5+.5*Math.sin(g.t*14+s[2]*30));x.fillStyle=life<.3?'#fff2b0':'#ff9a40';x.fillRect(ex,ey,.8,.8);}x.globalAlpha=1;   // sparkling embers
    const fy=fgy-(CFG.H-H)-6,fl=1+.07*Math.sin(g.t*11)+.05*Math.sin(g.t*17.3);
    x.globalCompositeOperation='lighter';
    let gr=x.createRadialGradient(fx,fy,1,fx,fy,78*fl);gr.addColorStop(0,'rgba(255,160,60,.6)');gr.addColorStop(.35,'rgba(255,110,30,.22)');gr.addColorStop(1,'rgba(255,80,20,0)');x.fillStyle=gr;x.fillRect(0,0,W,H);
    gr=x.createRadialGradient(fx,fy+2,0,fx,fy+2,14*fl);gr.addColorStop(0,'rgba(255,230,150,.7)');gr.addColorStop(1,'rgba(255,140,40,0)');x.fillStyle=gr;x.fillRect(fx-20,fy-20,40,40);
    x.globalCompositeOperation='source-over';
    gr=x.createLinearGradient(0,0,W,0);gr.addColorStop(0,'rgba(4,2,10,.75)');gr.addColorStop(.25,'rgba(4,2,10,0)');gr.addColorStop(.75,'rgba(4,2,10,0)');gr.addColorStop(1,'rgba(4,2,10,.75)');x.fillStyle=gr;x.fillRect(0,0,W,H);   // vignette
  };requestAnimationFrame(frame);}
function showCamp(){
  const s=SLOT();const run=s.run;migrate(s,CC.player);run.bag=run.bag||[];if(ABILITIES_OFF){run.pending=0;run.bag=run.bag.filter(e=>e.kind==='item');}const st=CFG.stage(run.stage,run.prestige);
  setRunModes(run);{const lg=campArrive(s,run);if(lg.length)run.campLog=lg;else if(run.campAt!==run.stage)run.campLog=[];}const hungry=new Set(run.needFeed||[]);
  const btn=(attrs,label,title)=>`<button class="cc-mini" ${attrs} ${title?`title="${esc(title)}"`:''}>${label}</button>`;
  const P=showPanel(`<div class="cc-h">STAGE ${run.stage}${run.prestige?' · ★'+run.prestige:''}${run.hardcore?' <span style="color:#ff5a5a;font-size:12px">☠ HARDCORE</span>':''}${run.dnd?' <span style="color:#c8a0ff;font-size:12px">🎲 D&amp;D</span>':''}</div><div class="cc-h2">${esc(st.biome.name)}${st.boss?` — ${esc(CFG.bosses[st.boss].name)} awaits`:''}</div>
    <div class="cc-firehost"></div>
    ${(()=>{try{if(localStorage.getItem('cc-camphelp')==='off')return '';}catch(e){}return `<div class="cc-help" data-camphelp>🏕️ <b>Camp tips</b> · Hover the pulsing <b>⛺ ⓘ</b> next to the title to see every camp upgrade, its tiers and prices. Hover ability and deck chips under 📜 <b>Skills</b> for details. Feed and water everyone before you leave, or they start the next stage weaker. Anything with a dotted underline or ⓘ has more info on hover.
      <div style="margin-top:6px;display:flex;gap:8px"><button class="cc-btn" data-helpx="once" style="padding:2px 10px">Got it</button><button class="cc-btn" data-helpx="off" style="padding:2px 10px;opacity:.75">Don't show again</button></div></div>`;})()}
    <p class="cc-sub">Score ${fmt(run.score)} · save point. ${run.pending?`<b style="color:#a6ff2e">⬆ ${run.pending} upgrade${run.pending>1?'s':''} waiting</b>`:'No upgrades waiting.'}</p>
    <div class="cc-load">${run.team.map(k=>{const d=heroDef(k),hv=run.heroes[k],L=s.heroes[k],cap=slotCaps(L.lvl);
      const act=hv.spells.map((e,i)=>[e,i]).filter(([e])=>!SPELL[e.arch].passive),pas=hv.spells.map((e,i)=>[e,i]).filter(([e])=>SPELL[e.arch].passive);
      const row=(lbl,list,n,c,slotName)=>`<div class="cc-slotrow"><span class="cc-sub" style="font-size:11px;margin:0">${lbl} ${n}/${c}</span><div class="cc-chips">${list.map(([e,i])=>`<span class="cc-chipw">${chipFor(e,slotName==='item',k)}${btn(`data-un="${k}|${slotName}|${i}"`,'↓','Move to backpack')}</span>`).join('')}</div></div>`;
      return `<div class="cc-card cc-lh"><span data-por="${k}"></span><div style="flex:1;min-width:0"><b>${d.icon} ${esc(d.name)}</b> <span class="cc-sub" style="font-size:11px">LV ${L.lvl} · Gear ${heroGear(hv)} · ${hv.dead?'fallen (revives at 25%)':Math.round((hv.hpf==null?1:hv.hpf)*100)+'% HP'}</span>
        ${ABILITIES_OFF?'':`<div class="cc-chips"><span class="cc-chip" title="${esc(SIG[k].txt)}" style="border-color:#ffd23f"><b>⚡ ${esc(SIG[k].name)}</b> · signature</span></div>`+row('Abilities',act,act.length,cap.active,'spell')+row('Passives',pas,pas.length,cap.passive,'spell')}
        ${(()=>{const C=CHAR[k]||{};const ab=abOrder(C.abilities).map(A=>[A.passive?'✦':'⚔',A.name||A.id,ABIL_DESC[A.id]||'']);const dk=L.insp?deckSkills(L.insp):[];   /* 0.12.56 (Kyle): Skills tab: his own abilities plus what his deck gives him; hover any for the details */
          const chip=([ic,n,d],col)=>`<span class="cc-chip" style="cursor:help;border-color:${col}" data-tiph="${esc('<div class="tt-h">'+esc(n.replace(/_/g,' '))+'</div><div class="tt-b">'+esc(d)+'</div>')}">${ic} ${esc(n.replace(/_/g,' '))}</span>`;
          return `<details class="cc-skills" style="margin-top:4px"><summary class="cc-sub" style="font-size:11px;margin:0;cursor:pointer">📜 Skills</summary><div class="cc-chips" style="margin-top:4px">${ab.map(x=>chip(x,'#7fd0ff')).join('')}${dk.map(x=>chip(x,'#c8a0ff')).join('')||(L.insp?'':'<span class="cc-sub" style="font-size:11px;margin:0">No deck inspiration</span>')}</div>${L.insp?`<div class="cc-sub" style="font-size:10px;margin:3px 0 0;opacity:.75">✨ ${esc(L.insp)}${inspText(L.insp)?': '+esc(inspText(L.insp)):''}</div>`:''}</details>`;})()}
        ${k!=='robot'&&!run.heroes[k].dead?(()=>{const n=needsOf(run,k);const fc=upgT(run,'smoker')?.5:1;   /* 0.12.72 Hunger & Thirst tiers */
          const hc=['#7ee081','#ffd060','#ff9040','#ff4a3a'][n.h],tc=['#7fd0ff','#ffd060','#ff9040','#ff4a3a'][n.t];
          const hT=n.h?`Next stage: heals on them ${Math.round(HUNGER.heal[n.h]*100)}% weaker, ${Math.round(HUNGER.spd[n.h]*100)}% slower moving and attacking, -${HUNGER.acc[n.h]} accuracy, and they start with ${Math.round(HUNGER.hp[n.h]*100)}% less HP.`:'Well fed.';
          const tT=n.t?`Next stage: foggy head (Perception -${THIRST.perc[n.t]}, plans and focus -${THIRST.think[n.t]}, decisions ${Math.round((THIRST.slow[n.t]-1)*100)}% slower) and a slow life drain (${(THIRST.drain[n.t]*100).toFixed(2)}% of max HP a second).`:'Well watered.';
          return `<div class="cc-sub" style="font-size:11px;margin:4px 0 0">🍖 <b style="color:${hc};cursor:help" title="${esc(hT)}">${HUNGER.names[n.h]}</b> ${n.h?btn(`data-feed="${k}|food" ${run.food>=fc?'':'disabled'}`,'🥫 Eat','Use '+(fc<1?'half a ration (smoked)':'1 food')+': Hunger -'+(upgT(run,'kitchen')?2:1)):''} · 💧 <b style="color:${tc};cursor:help" title="${esc(tT)}">${THIRST.names[n.t]}</b> ${n.t?btn(`data-feed="${k}|water" ${run.water>=1?'':'disabled'}`,'💧 Drink','Use 1 water: Thirst -'+(upgT(run,'purifier')?2:1)):''}${n.h||n.t?'<span style="opacity:.75"> · it only gets worse if ignored</span>':''}</div>`;})()
          :(k==='robot'?`<div class="cc-sub" style="font-size:11px;margin:4px 0 0;opacity:.7">🔋 Runs on its own power: no food or water needed</div>`:'')}
        ${(()=>{const fr=talFree(L),P=L.pts||{};const old=Object.keys(LVPTS).filter(x=>P[x]).map(x=>`${LVPTS[x].icon}${P[x]}`).join(' ');   /* 0.12.106 TALENTS (Kyle's level-up revamp) */
          const got=talPicks(L).map(id=>{const c=talCard(id,k);return c?`<span class="cc-chip" title="${esc(c.txt)}" style="${id.startsWith('cap:')?'border-color:#ffd23f;color:#ffd23f':id.startsWith('mod:')?'border-color:#c792ff;color:#d8b8ff':''}">${c.icon} ${esc(c.name)}</span>`:'';}).join('');
          const O=fr?talOffer(k,L):null;const kindName={cap:'⭐ CAPSTONE (pick 1 of 2)',mod:'🔮 SKILL MOD (pick 1)',stat:'⬆ Talent (pick 1)'};
          const offer=O?`<div style="margin-top:6px"><b style="color:${O.kind==='cap'?'#ffd23f':O.kind==='mod'?'#d8b8ff':'#a6ff2e'}">Level ${O.L} ${kindName[O.kind]}</b>${fr>1?` <span style="opacity:.8">(${fr} points waiting)</span>`:''}
            <div class="cc-offers" style="margin-top:6px">${O.ids.map(id=>{const c=talCard(id,k);if(!c)return '';const col=O.kind==='cap'?'#ffd23f':O.kind==='mod'?'#c792ff':id.startsWith('ps:')?'#7fd0ff':'#a6ff2e';
              return `<div class="cc-offer" style="--rc:${col}"><span class="rar">${O.kind==='cap'?'CAPSTONE':O.kind==='mod'?'SKILL MOD':id.startsWith('ps:')?'PERSONALITY':'STAT'}</span><span class="cn">${c.icon} ${esc(c.name)}</span><span class="tx">${esc(c.txt)}</span><button class="cc-btn" data-tal="${k}|${id}">Take it</button></div>`;}).join('')}</div></div>`:'';
          return `<div class="cc-sub" style="font-size:11px;margin:4px 0 0">${got?`<div class="cc-chips" style="margin-top:2px">${got}</div>`:fr?'':'Talents: one per level gained (skill mods every 3rd level, capstones at 5 and 10).'}${old?` <span style="opacity:.8">· old stat points: ${old}</span>`:''}${offer}</div>`;})()}
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
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por,56)));{const fh=P.querySelector('.cc-firehost');if(fh)campScene(fh,run);}P.querySelectorAll('[data-helpx]').forEach(x=>x.onclick=()=>{if(x.dataset.helpx==='off'){try{localStorage.setItem('cc-camphelp','off');}catch(e){}}const el=P.querySelector('[data-camphelp]');if(el)el.remove();});
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
  const bg=P.querySelector('[data-begin]');if(bg)bg.onclick=()=>{const left=run.team.filter(k=>missingOf(run,k)&&!run.heroes[k].dead);
    if(left.length&&!bg.dataset.sure){bg.dataset.sure=1;bg.textContent='Leave hungry/thirsty? '+left.map(k=>{const n=needsOf(run,k);return heroDef(k).name+(n.h?' '+HUNGER.names[n.h]:'')+(n.t?' '+THIRST.names[n.t]:'');}).join(', ')+' ▶';return;}campDepart(run);persist();beginStage();};
  {const fa=P.querySelector('[data-feedall]');if(fa)fa.onclick=()=>{if(feedAll(run)){sfx('level');persist();showCamp();}else{fa.textContent='Not enough supplies';}};}
  P.querySelectorAll('[data-feed]').forEach(b=>b.onclick=()=>{const [k,w]=b.dataset.feed.split('|');if(feedUnit(run,k,w)){sfx('level');persist();showCamp();}});
  P.querySelectorAll('[data-tal]').forEach(b=>b.onclick=()=>{const [k,...r]=b.dataset.tal.split('|');const id=r.join('|');const H=s.heroes[k];if(talTake(k,H,id)){sfx('level');persist();showCamp();}});
  P.querySelectorAll('[data-upgp]').forEach(b=>b.onclick=()=>{const id=b.dataset.upgp,pp=upgParts(run,id);if(run.upgBought||(s.parts||0)<pp)return;s.parts-=pp;run.upg=run.upg||{};run.upg[id]=(run.upg[id]||0)+1;run.upgBought=1;sfx('level');persist();showCamp();});
  P.querySelectorAll('[data-upg]').forEach(b=>b.onclick=()=>{const id=b.dataset.upg,pr=upgPrice(run,id);if(run.upgBought||(s.gold||0)<pr)return;s.gold-=pr;run.upg=run.upg||{};run.upg[id]=(run.upg[id]||0)+1;run.upgBought=1;sfx('level');persist();showCamp();});
  {const cb=P.querySelector('[data-con]');if(cb)cb.onclick=()=>{run.conOpen=!run.conOpen;persist();showCamp();};}
  P.querySelectorAll('[data-conb]').forEach(b=>b.onclick=()=>{const id=b.dataset.conb,pr=conPrice(run,id);if((s.gold||0)<pr)return;s.gold-=pr;run.upg=run.upg||{};run.upg[id]=(run.upg[id]||0)+1;sfx('level');persist();showCamp();});
  P.querySelectorAll('[data-conp]').forEach(b=>b.onclick=()=>{const id=b.dataset.conp,pp=conParts(run,id);if((s.parts||0)<pp)return;s.parts-=pp;run.upg=run.upg||{};run.upg[id]=(run.upg[id]||0)+1;sfx('level');persist();showCamp();});
  P.querySelectorAll('[data-scout]').forEach(b=>b.onclick=()=>{const id=b.dataset.scout;if(upgT(run,'tower')>=4){let a=[].concat(run.scoutPick||[]);a=a.includes(id)?a.filter(x=>x!==id):a.concat(id).slice(-2);run.scoutPick=a.length?a:null;}else run.scoutPick=id;persist();showCamp();});   /* 0.12.105 Map Table: two roads */
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
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn" data-reroll ${run.rerolls>0?'':'disabled'}>🎲 Reroll (${run.rerolls})</button><button class="cc-btn" data-skip>Skip (+${fmt(2*run.stage)} score)</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  P.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const o=os[+b.dataset.i];const r=applyOffer(run,o,s);if(r==='full')return showReplace(o);if(o.blessed)run.blessed=Math.max(0,(run.blessed||0)-1);sfx('level');CC.offersCache=null;persist();run.pending?showPick():showCamp();});
  P.querySelector('[data-reroll]').onclick=()=>{if(run.rerolls>0){run.rerolls--;CC.offersCache=null;persist();showPick();}};
  P.querySelector('[data-skip]').onclick=()=>{run.pending--;if(isB)run.blessed=Math.max(0,(run.blessed||0)-1);run.score+=2*run.stage;CC.offersCache=null;persist();run.pending?showPick():showCamp();};
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
function ufTip(h){const C=CHAR[h.key]||{};const ab=abOrder(C.abilities||[]);   /* 0.12.81: phone unit-frame tip: abilities (actives first, passives last) */
  return `<div class="tt-h">${esc(h.def.name)} · LV ${h.lvl}</div>`+ab.map(A=>`<div class="tt-b"><b>${A.passive?'✦':'⚔'} ${esc((A.name||A.id).replace(/_/g,' '))}</b>${A.passive?' <span style="opacity:.6">(passive)</span>':''}<br>${esc(ABIL_DESC[A.id]||'')}</div>`).join('')+`<div class="tt-b" style="opacity:.7;margin-top:4px">Tap again to close.</div>`;}
/* 0.12.99 (Kyle): when a deck gives cooldown reduction, show THIS hero's ability cooldowns before -> after so players can choose */
function cdrTable(k,d){const I=INSP[d];const r=I&&I.mod&&I.mod.cdr;if(!r)return '';const C=CHAR[k]||{};const rows=[];
  for(const A of abOrder(C.abilities||[])){if(A.passive&&!A.icd)continue;const nm=(A.name||A.id).replace(/_/g,' ');
    if(A.book){for(const [bk,B] of Object.entries(A))if(B&&typeof B==='object'&&B.cd)rows.push([nm+' · '+bk,B.cd]);continue;}
    if(A.cd)rows.push([nm,A.cd]);else if(A.icd)rows.push([nm+' (internal)',A.icd]);}
  const sg=SIG[k];if(sg&&sg.fn&&String(sg.fn).indexOf('false')<0&&sg.cd)rows.push([sg.name,sg.cd]);
  if(!rows.length)return '';const f=v=>(Math.round(v*10)/10)+'s';
  return `<div style="margin-top:6px;font-size:11px"><b>⏱ ${esc(heroDef(k).name)} with −${r}% cooldowns</b><table style="border-collapse:collapse;margin-top:3px">${rows.map(([n,v])=>`<tr><td style="padding:1px 10px 1px 0">${esc(n)}</td><td style="opacity:.6">${f(v)}</td><td style="padding:0 6px">→</td><td style="color:#a6ff2e"><b>${f(v*(1-Math.min(.5,r/100)))}</b></td></tr>`).join('')}</table></div>`;}
function beginStage(){
  const s=SLOT(),run=s.run;panel.hidden=true;CC.paused=false;
  /* 0.12.73 (Kyle) Retry: snapshot everything at the start of the stage (heroes, HP, items, herbs, kit, buffs, gold, parts, supplies, run state) */
  if(run.retries==null)run.retries=1;try{const r2=Object.assign({},run);delete r2.snap;run.snap=JSON.stringify({run:r2,gold:s.gold||0,parts:s.parts||0,heroes:s.heroes,best:s.best});}catch(e){run.snap=null;}
  CC.game=new Game({run,slot:s});CC.lv0=Object.fromEntries(run.team.map(k=>[k,s.heroes[k].lvl]));
  hud.style.gridTemplateColumns=`repeat(${run.team.length},minmax(0,1fr))`;
  hud.innerHTML=CC.game.heroes.map(h=>`<div class="cc-hc" data-h="${h.key}"><span data-por="${h.key}"></span><div style="flex:1;min-width:0"><div class="n">${esc(h.def.name)} <span style="color:#ffd23f">${h.lvl}</span></div><div class="bar"><i></i></div>
    <div class="sp"><span class="cc-sp" data-sig style="border-color:#ffd23f"><b>⚡ ${esc(SIG[h.key].name)}</b><i></i></span>${h.spells.map((s,i)=>`<span class="cc-sp" data-s="${i}"><b>${s.r>=CFG.maxRank?'✦ ':''}${esc(sname(h.key,s.card))}</b> r${s.r}<i></i></span>`).join('')}${h.items.map(it=>`<span class="cc-sp it"><b>${esc(shortCard(it.card))}</b> ${ITEM[it.arch].label} r${it.r}</span>`).join('')}</div></div></div>`).join('');
  hud.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  /* 0.12.81 (Kyle) phones: small WoW-style unit frames in the top-left of the sky instead of the panels under the stage; tap one to see its abilities */
  const uf=$('.cc-uf',root);uf.innerHTML=CC.game.heroes.map(h=>`<div class="uf" data-h="${h.key}" data-tiph="${esc(ufTip(h))}"><span data-por="${h.key}"></span><div class="ufb"><div class="ufn">${esc(h.def.name)} <span>${h.lvl}</span></div><div class="ufh"><i></i></div><div class="ufe"><i></i></div></div></div>`).join('');
  uf.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por)));
  const st=CC.game.st;flash(`STAGE ${run.stage}`,1400);if(st.boss)setTimeout(()=>{},0);
  root.querySelector('[data-a=restart]').hidden=false;layout();CC.last=performance.now();cancelAnimationFrame(CC.raf);CC.raf=requestAnimationFrame(loop);
}
function flash(t,ms){banner.textContent=t;banner.style.opacity=1;clearTimeout(CC.bt);CC.bt=setTimeout(()=>banner.style.opacity=0,ms||1200);}
function loop(now){
  const g=CC.game;if(!g||root.hidden)return;let dt=Math.min(.05,(now-CC.last)/1000);CC.last=now;
  if(!CC.paused){for(let i=0;i<CC.speed;i++)g.step(dt);}
  for(const e of g.events){if(e.type==='levelup'){sfx('level');flash('LEVEL UP!',900);}if(e.type==='boss'){sfx('boss');flash(e.name.toUpperCase(),1800);}
    if(e.type==='herolevel')sfx('level');if(e.type==='enrage')flash('ENRAGED!',1400);if(e.type==='itemdrop'){sfx('level');flash('ITEM FOUND!',900);}if(e.type==='herodown')sfx('die');if(e.type==='gun')sfx(e.big?'biggun':'gun');if(e.type==='boom')sfx('boom');if(e.type==='dash')sfx('dash');if(e.type==='bow')sfx('bow');if(e.type==='heal')sfx('heal');if(e.type==='camp')sfx('camp');if(e.type==='whoosh')sfx('whoosh');if(e.type==='thorns')sfx('thorns');if(e.type==='bell')sfx('bell');if(e.type==='nemesis'){sfx('boss');flash(e.back?e.name.toUpperCase()+' RETURNS! (RANK '+'I'.repeat(e.rank)+')':(e.rank>1?e.name.toUpperCase()+' GROWS STRONGER':e.name.toUpperCase()+' RISES')+(e.trait?' · '+({rav:'RAVENOUS',blood:'BLOODTHIRSTY',bulwark:'BULWARK',howl:'HOWLER',cleave:'CLEAVER'}[e.trait]||''):''),1800);}if(e.type==='nemdown'){sfx('clear');flash(e.name.toUpperCase()+' IS DEAD',1600);}if(e.type==='lazer')sfx('lazer',e);if(e.type==='flame')sfx('flame');if(e.type==='shotgun')sfx('shotgun');if(e.type==='shriek')sfx('shriek');if(e.type==='wind')sfx('wind');if(e.type==='shout')sfx('shout');}
  g.events.length=0;
  ctx.imageSmoothingEnabled=false;drawGame(ctx,g,384,0);panCam();
  const run=g.run;info.innerHTML=`<span class="px" style="font-size:10px;color:#a6ff2e">STAGE ${run.stage}${run.prestige?' ★'+run.prestige:''}</span><span>${esc(g.st.biome.name)}</span><span>Score <b>${fmt(run.score+g.stageScore)}</b></span><span>💰 <b>${fmt((SLOT().gold||0)+g.stageGold)}</b></span>
    <span class="cc-xp" title="Next upgrade"><i style="width:${Math.min(100,(run.xp||0)/(8+6*(run.lv||0))*100)}%"></i></span>${run.pending?`<b style="color:#a6ff2e">⬆${run.pending}</b>`:''}`;
  bossEl.textContent=g.boss&&!g.boss.dead?g.boss.B.name.toUpperCase():'';
  if(root.classList.contains('phone'))for(const h of g.heroes){const f=root.querySelector(`.cc-uf [data-h="${h.key}"]`);if(!f)continue;f.classList.toggle('dead',!h.alive);
    f.querySelector('.ufh i').style.width=Math.max(0,h.hp/h.max*100)+'%';f.querySelector('.ufe i').style.width=h.enMax?Math.max(0,Math.min(100,(h.en||0)/h.enMax*100))+'%':'0%';}
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
  const s=SLOT(),run=s.run;const first=!g._fin;g._fin=1;   /* 0.12.73: 'give up' after a retry offer comes back through here: don't count the stage twice */
  if(first){g.saveBack();run.score+=Math.round(g.stageScore);s.gold=(s.gold||0)+g.stageGold;
  s.parts=(s.parts||0)+(g.stageParts||0);run.food=(run.food||0)+(g.stageFood||0);run.water=(run.water||0)+(g.stageWater||0);}   /* camp supplies */
  run.lastHaul={food:g.stageFood||0,water:g.stageWater||0,parts:g.stageParts||0};
  const found=[];if(g.over==='clear')for(const it of g.stageItems){const where=giveItem(run,s,it);if(where)found.push(shortCard(it.card)+(where==='bag'?' (backpack)':''));else{const v=Math.round(itemPrice(it.rar,run.stage)/3);s.gold+=v;found.push(shortCard(it.card)+' (sold, no room: +'+v+'g)');}}
  const lvls=run.team.filter(k=>s.heroes[k].lvl>CC.lv0[k]).map(k=>`${esc(heroDef(k).name)} → LV ${s.heroes[k].lvl}`);
  if(g.over==='clear'){
    sfx('clear');
    for(const k of run.team){const h=run.heroes[k];if(h.dead){h.dead=false;h.hpf=.25;}else h.hpf=Math.min(1,(h.hpf||0)+.3);}
    run.needFeed=run.team.filter(k=>k!=='robot');   /* 0.12.58: everyone needs food AND water at camp, except the Warhound */
    if(run.retryUsed){run.retryUsed=0;run.retries=1;run.campLog2='↻ Stage beaten on the retry: you get your retry back.';}   /* 0.12.73 */
    const cleared=run.stage;run.score+=Math.round(5*cleared*(1+run.prestige));   /* 0.12.94: clear bonus 5 x stage (was 250 x stage) */
    if(cleared>=CFG.maxStage){persist();CC.game=null;return showVictory(lvls);}
    if(cleared===CFG.strangerStage&&run.team.length<3&&!run.strangerDone){run.strangerDone=1;const free=s.forsook?[]:DATA.heroes.filter(h=>!run.team.includes(h.key));
      if(CFG.stage(cleared,run.prestige).boss)run.shopAt=cleared+1;run.stage++;persist();CC.game=null;return showStranger(free);}
    if(CFG.stage(cleared,run.prestige).boss)run.shopAt=cleared+1;
    run.stage++;run.rerolls=Math.max(run.rerolls,1);
    if(run.prestige*100+run.stage-1>s.best.prestige*100+s.best.stage){s.best.stage=run.stage-1;s.best.prestige=run.prestige;}
    persist();CC.game=null;
    const rb=run.campLog2;run.campLog2=null;const P=showPanel(`<div class="cc-h">STAGE ${cleared} CLEAR!</div>${rb?`<p class="cc-sub" style="color:#a6ff2e">${rb}</p>`:''}<p class="cc-sub">+${fmt(Math.round(g.stageScore)+Math.round(5*cleared*(1+run.prestige)))} score · ${g.kills} kills · 💰 +${fmt(g.stageGold)} gold${g.stageParts?' · ⚙ +'+g.stageParts+' spare parts':''}${g.stageFood?' · 🥫 +'+g.stageFood+' food':''}${g.stageWater?' · 💧 +'+g.stageWater+' water':''}${found.length?'<br>Found: '+found.map(esc).join(', '):''}${lvls.length?'<br>'+lvls.join(', '):''}</p>${statsBrief(g)}<div class="cc-row"><button class="cc-btn go" data-c>TO CAMP ▶</button></div>`);
    P.querySelector('[data-c]').onclick=showCamp;return;}
  // defeat
  /* 0.12.85 (Kyle): nobody loses a run any more. A wipe keeps EVERYTHING (gold, parts, food, water, items and XP picked up on the way),
     the party limps back to camp at half health, and you can spend it all to grind out the stage you're stuck on. */
  if(true){sfx('die');
    for(const it of g.stageItems||[]){const where=giveItem(run,s,it);if(where)found.push(shortCard(it.card)+(where==='bag'?' (backpack)':''));else{const v=Math.round(itemPrice(it.rar,run.stage)/3);s.gold+=v;found.push(shortCard(it.card)+' (sold, no room: +'+v+'g)');}}
    for(const k of run.team){const h=run.heroes[k];if(h){h.dead=false;h.hpf=Math.max(.5,h.hpf||0);}}
    run.needFeed=run.team.filter(k=>k!=='robot');run.snap=null;run.retries=1;run.retryUsed=0;run.falls=(run.falls||0)+1;
    persist();CC.game=null;
    const P=showPanel(`<div class="cc-h" style="color:#ff9a3c">THE PARTY FELL BACK</div><div class="cc-h2">Stage ${run.stage}${run.prestige?' · ★'+run.prestige:''}</div>
      <p class="cc-sub">Nothing is lost. Everything you picked up comes with you: 💰 +${fmt(g.stageGold)} gold${g.stageParts?` · 🔩 +${g.stageParts} parts`:''}${(g.stageFood||g.stageWater)?` · 🍖 +${g.stageFood||0} food · 💧 +${g.stageWater||0} water`:''}${found.length?'<br>Items: '+found.map(esc).join(', '):''}${g.lossXp?`<br>📘 Lessons learned: +${g.lossXp} XP each`:''}${lvls.length?'<br>Level ups: '+lvls.join(', '):''}</p>
      <p class="cc-sub">Everyone gets back up at half health. Rest at camp, spend what you found, and take another run at stage ${run.stage}.</p>
      <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-c>⛺ BACK TO CAMP</button></div>`);
    P.querySelector('[data-c]').onclick=showCamp;return;}
  if((run.retries==null?1:run.retries)>0&&run.snap){sfx('die');CC.game=null;   /* 0.12.73: one retry per run (doesn't stack); beating the stage gives it back */
    const P=showPanel(`<div class="cc-h" style="color:#ff5a5a">YOUR PARTY HAS FALLEN</div><div class="cc-h2">Stage ${run.stage}${run.prestige?' · ★'+run.prestige:''}</div>
      <p class="cc-sub">You have <b style="color:#a6ff2e">1 retry</b> left this run. Retrying puts everything back exactly as it was when this stage started: every hero's HP, items, herbs and kit, your gold, parts and supplies. Beat the stage this time and you get the retry back. Fall again and the run is over.</p>
      <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-retry>↻ RETRY STAGE ${run.stage}</button><button class="cc-btn warn" data-giveup>Give up the run</button></div>`);
    P.querySelector('[data-retry]').onclick=()=>{const S=JSON.parse(run.snap);s.run=S.run;s.run.snap=run.snap;s.run.retries=0;s.run.retryUsed=1;s.gold=S.gold;s.parts=S.parts;s.heroes=S.heroes;if(S.best)s.best=S.best;persist();beginStage();};
    P.querySelector('[data-giveup]').onclick=e=>{if(!confirmInline(e.currentTarget,'Really end the run?'))return;run.retries=0;run.snap=null;finishStage(g);};
    return;}
  sfx('die');const reached=run.stage,score=run.score,team=run.team.slice();endRun(s,0);CC.game=null;
  const P=showPanel(`<div class="cc-h" style="color:#ff5a5a">YOUR PARTY HAS FALLEN</div><div class="cc-h2">Stage ${reached}${run.prestige?' · ★'+run.prestige:''}</div>
    <p class="cc-sub">Score ${fmt(score)} · best ${fmt(s.best.score)}. Spells and items are gone; hero levels stay.${lvls.length?'<br>Level ups this stage: '+lvls.join(', '):''}</p>
    <div class="cc-load">${team.map(k=>`<div class="cc-card cc-lh"><span data-por="${k}"></span><div><b>${esc(heroDef(k).name)}</b><div class="cc-sub" style="margin:0">LV ${s.heroes[k].lvl} · ${fmt(s.heroes[k].xp)}/${fmt(needHeroXp(s.heroes[k].lvl))} XP</div></div></div>`).join('')}</div>
    <div class="cc-row" style="margin-top:12px"><button class="cc-btn go" data-again>SAME TEAM AGAIN</button><button class="cc-btn" data-saves>Saves</button></div>`);
  P.querySelectorAll('[data-por]').forEach(e=>e.replaceWith(portrait(e.dataset.por,48)));
  P.querySelector('[data-again]').onclick=()=>{s.team=team.slice();restartSameTeam(s,team);};
  P.querySelector('[data-saves]').onclick=showSlots;
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
