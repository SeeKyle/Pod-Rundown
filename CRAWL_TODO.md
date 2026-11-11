# Crypt Crawl — work queue for unattended sessions

The site is live at **0.12.63** (https://seekyle.github.io/Pod-Rundown/). Kyle (the owner) is on vacation.
This file lists everything he asked for that is NOT done yet. Work top to bottom, tick items off
(change `[ ]` to `[x]`), and push this file back to the `crawl-dev` branch after every release so the
next session knows where to resume.

## 0. Setting up a fresh session (read first)

1. Clone: `git clone https://github.com/SeeKyle/Pod-Rundown.git pod-rundown`, then
   `git -C pod-rundown fetch origin crawl-dev && git -C pod-rundown checkout crawl-dev -- CRAWL_TODO.md crawl_src_bundle.tgz`
   (or `git worktree add ../crawl-dev crawl-dev`).
2. Restore the build workspace: `mkdir -p /home/claude && tar -xzf crawl_src_bundle.tgz -C /home/claude`
   (this recreates /home/claude/pod2, dog, druid2, bomb, cars, obst, out, flannel, ...; test scripts land in /home/claude/src;
   copy them to /tmp: `cp /home/claude/src/*.py /tmp/`).
   Kyle's reference images are NOT backed up (his choice: the repo is public). Two of his own unwatermarked images that the game will use are in
   pod2/assets/kyle/: camp_cabin_night.png (camp background) and van_overgrown.png (the van). For every other "ref" mentioned below, the
   image isn't available: work from the written description (draw your own pixel art in the game's style).
   Music files (.mp3/.ogg) are not in the bundle; they're already in the site repo (music/) and don't need rebuilding.
3. IMPORTANT: if /home/claude/pod2 already exists and its crawl_ui.js version string is newer than the bundle's, a previous
   session already restored it — don't overwrite. Otherwise, after restoring, check the live repo's crawl.js version
   (`grep -o "v0\.12\.[0-9]*" pod-rundown/crawl.js | head -1`) matches pod2's crawl_ui.js. If the repo is NEWER than the bundle,
   a later session pushed work without updating the bundle: re-derive from the repo is impossible (crawl.js is generated), so
   instead read notes.html for what changed and re-apply onto the bundle sources. Always refresh the bundle on the branch after a release (step 7).

### Build pipeline (in /home/claude/pod2)
- Logic: `crawl_src.js`; UI/drawing: `crawl_ui.js`. `python3 build_crawl.py` merges them into `crawl.js`; check `node --check crawl.js`.
- Sprites: `python3 make_units.py` (atlas + sheets + unit meta; dog meta from /home/claude/dog/dog.json). Rebuild crawl after it.
- Site: `python3 build_site.py` → index.html.
- Bump the version string in crawl_ui.js (search `v0.12.`), add a new `<h3>` entry at the TOP of notes.html (plain-language bullet list of changes).
- Copy to repo: `cp index.html crawl.js notes.html ../pod-rundown/` plus any changed `crawl_*.png` (compare with cmp) and new asset files.
- Commit message must end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  ```
  Push: `git -C pod-rundown push -q https://github.com/SeeKyle/Pod-Rundown.git HEAD` (main branch = the live site).
- Tests (headless Chrome via playwright, `executable_path='/usr/bin/google-chrome'`): inject hooks into a COPY flow:
  back up crawl.js to /tmp/crawl_bak.js, then
  `CC.game=new Game({run,slot:s});` → append `window.__GM=CC.game;` and before `const SLOT=()=>` insert
  `window.__SIM={Game,newRun,newSlot,CFG,heroDef};window.__SLOTF=()=>SLOT();`.
  Run `python3 /tmp/sim.py 60` (headless runs; must report `errors: 0`), `/tmp/fight.py` (screenshots mid-fight),
  `/tmp/campfire.py` (camp screen). Then REBUILD crawl.js (`python3 build_crawl.py`) and `grep -c "__GM\|__SIM" crawl.js` must be 0 before copying.
- After EVERY release (step 7): refresh the backup on the `crawl-dev` branch so the next session starts from your latest sources:
  `cd /home/claude && tar --exclude='./pod-rundown' --exclude='./.claude' --exclude='./.cache' --exclude='./.npm' --exclude='*.mp3' --exclude='*.ogg' --exclude='*.wav' --exclude='*.zip' -czf /tmp/crawl_src_bundle.tgz . -C /tmp src`
  (first `mkdir -p /tmp/src && cp /tmp/*.py /tmp/src/`), copy it plus the updated CRAWL_TODO.md into a checkout of `crawl-dev`, commit, and push that branch.
- Recurring bug sources: a `//` comment swallowing code on the same line; Python string-replace edits that silently drop a guard
  (always `assert src.count(old)==1` before replacing).

### Kyle's standing rules
- Use Kyle's numbers exactly. His "pixels" are SCREEN px: divide by 3 for world px (canvas is 384x216 world px).
- Behaviour must come from the slider / if-then-else brain system (pickPosition intents, trait(h,'aggr') etc.), not hard scripts.
- Abilities and decks should stay unique. No floating ability-name text. Kyle-supplied unwatermarked art may be used directly;
  watermarked art (shutterstock/adobe) is reference only — draw your own version, never copy it.
- Character select: always list the 4 active abilities first, the passive LAST (like Yumi_Archer's card, not Chibi_Warrior's) —
  for every character, including new ones.
- Every update pushed → it's live; record it in notes.html. Keep balance sane (run the sim; report win rate changes in notes).

## 1. Queue (Kyle's requests, oldest first — all NOT yet done)

### Camp & meta
- [x] **Camp background**: use Kyle's cabin-at-night image (pod2/assets/kyle/camp_cabin_night.png) as the camp-screen background (the campfire scene
      area / panel backdrop). Edit it so the campfire is roaring (animated flame frames over the fire pit) and the light sparkles (flicker glow + embers).
- [x] **Cozy buff** (shared definition): lasts 10s; +0.25 Life and +0.25 Energy every 0.5s; +10% MELEE attack speed and +10% movement speed.
      Flannel_Man's campfire ability applies Cozy in a 400 screen-px radius and keeps refreshing it for anyone who stays in range.
      Add a camp building upgrade that gives every unit Cozy at the start of each stage.
- [x] **Remove the Radio Tower** building (the one that lets upgrades go to tier 4+; Generator tier IV needs it — drop tier IV).
      Fix the ⛺ tent tooltip: remove "(+1 with a radio tower)" next to Generator and make the tooltip list the real upgrades/tiers
      generated from CAMP_UPG (so it stays right when upgrades change). Make the tent icon obviously hoverable (pulse/“hover me” hint)
      and add a dismissable camp help popup (“don't show again”, stored in localStorage) explaining the tent tooltip and other camp features.
- [ ] **Feed-all button** in camp (icon: food + drink together, draw your own from uploads b7fb7708 / 9ca96fb5 / 6e8833e9 as reference).
      Auto-feeds/waters the team with what's available: lowest-HP units first, accounts for smoked food costing half (Smoker upgrade),
      worst hunger/thirst tiers first, never wastes supplies on units that don't need them (Warhound needs neither).
- [ ] **Hunger & Thirst rework** (replaces the flat -10% HP per missing food/water):
      Tiers that only get worse while ignored, last the whole stage, and each food/water use lowers the tier by 1
      (by 2 with a new food-quality / water-quality building). Display "Satiated" / "Quenched" when fine.
      Hunger: Hungry → Very Hungry → Starving: reduces heals received, move & attack speed, accuracy; each tier also starts the stage with less HP.
      Thirst: Parched → Mildly Dehydrated → Severely Dehydrated: reduces perception and clear thinking (plan/exec-type sliders, slower decisions),
      plus a small HP drain. Make it punishing (hard roguelike). Show debuff icons on units + in camp.
- [ ] **Retry system**: a run starts with 1 retry (max 1, doesn't stack). On a stage loss you may retry that stage once: snapshot
      everything at stage start (each hero's HP, energy, items, herbs, kit, buffs/debuffs, gold, supplies, parts, run state) and restore it.
      Beating the stage on the next attempt gives the retry back. Dying again after using it = run over (full reset, as now).
- [x] **Car alarms scarier**; stopping an alarm takes 5s; Wire Cutters upgrade makes the fix faster only (not shorter alarms) and costs 125g
      (set after the doubling of camp costs).
- [ ] **Car lights**: on each car sprite find the real headlight/taillight pixels and make alarms flash those spots with light rays
      (not big circles at the ends). **Add Kyle's van** (pod2/assets/kyle/van_overgrown.png — cut it from the grey bg) as a new wrecked vehicle.
- [x] **Combat stats**: companions' and summons' damage counts for their owner in the end-of-stage stats (Traveling_Companion → Flannel_Man,
      tentacles → Cultist, turrets/buildings → Engineer…). Only the Guard Dog (kennel) keeps its own line.
- [x] **Character select**: (actives-first DONE in 0.12.63) Warhound's weapon line must read "Targeted Lazer + Flamethrower".
- [ ] **Cast bars and reload bars** for every unit that reloads or casts.

### Flannel_Man
- [x] **Proximity_Bomb final spec** (overrides the current 0.12.59 version): 40 energy, CD 10s.
      Proximity trigger: 40 px wide in its own lane, plus 20 px wide one lane up and one lane down (bomb in the middle lane).
      Base explosion: 100 px area around the bomb, 40 px wide in the lanes above/below.
      * Overhand Toss: 1s cast, can move while casting, lands anywhere he chooses 300–450 px away (accurate); explodes on impact for 2d4+6,
        100 px wide, 60 px wide spanning three lanes.
      * Underhand Toss: 0.5s cast, can move while casting, lands 100 px in front, then rolls 50 px; at the end it takes 0.5s to "truly activate"
        (flashing light). If an enemy trips it before activation: 2d4+2 and restores 2s of the current CD. If activated when it blows: 2d4+6.
      * Place Bomb: 3s cast, kneel animation (no movement), placed 5 px in front, activates immediately. Placed+activated: 6d4+2 and its blast gets
        +20 px width and +10 px width in the lanes above/below.
      * Bomb left behind off screen → remaining CD halved (keep).
      * AI: with no zombies near he randomly looks for a spot to set or to underhand-toss. He knows placing is stronger but slow:
        decide "quick results" (toss/throw) vs "invest in future damage" (place) from the situation and his sliders. Choose better than before.
- [x] **Rust mine & Proximity Bomb trigger zone**: 40 px wide + 20 px wide in the lanes above/below (as above). Spotting enemy mines a bit harder
      and checked slightly less often. Set safe-defuse range so defusers never trip it.
- [x] **True_Grit** (replaces Grit): 15s CD, lasts 8s, -50% damage taken, +25% move speed, sets Calculated/Aggression AND Shooter/Slasher sliders
      to 10 for the duration. Flannel_Man's base sliders: Calculated/Aggression 3, Shooter/Slasher 4.
- [x] **Aimed Shot**: killing an enemy with it halves its remaining CD.
- [x] **Elite Survivors** passive (replaces Call Traveling_Companion): the companion starts each stage beside him, Flannel_Man has the Scavenger
      perk built in, and both get +10% dodge while within 150 px of each other.
- [x] **Brick toss** (Traveling_Companion): a bit more arc, 20% slower projectile, looks like a brick (ref uploads/388903a3 — make it less tall).
- [x] **Bottle_Distraction** (new Traveling_Companion ability): lobs a glass bottle (bigger arc than the brick) 450–500 px; it shatters and pulls
      nearby zombies' attention briefly. AI: prefers to throw it BEHIND a pack so they turn around.

### Warhound (robot)
- [x] Flamethrower becomes his "melee" (short-range) attack; reshape his blade into a flamethrower nozzle on the sprite.
- [x] **Targeted Lazer** ranged basic attack: 0.5s charge-up, then fires for 2s; starts 200–500 px away aimed ~10 px in front of the target and
      creeps forward 5 px every 0.25s; deals 2d4 every 0.5s in a 20 px radius at the tip; small ground fire travels with the tip; a red beam from
      his upper body angled down to the tip (make it look distinct from Flannel_Man's aimed-shot line). Reload 2s, starting only after the beam ends.
      Base Shooter/Slasher slider 5.
- [x] **Arc Surge** → activated: 30 energy, 15s CD, lasts 8s: Shooter/Slasher -3 toward shooter; lazer +1d4 (3d4 per 0.5s), radius 25 px,
      creep 7 px per 0.25s, and lazer hits apply Burn.
- [x] **Nano-Tech Repair Bots**: 35 energy, 20s CD, stops with a "use" animation and restores 5% max life per second for 5s; can't move/attack,
      may cancel early if in danger. Built-in passive: 10% chance when he's attacked to halve the remaining CD.
- [x] **Smoke Screen**: allies (not Warhound) inside become stealthed (semi-transparent look) until they basic-attack or use an ability (moving is fine);
      the stealth lasts 5s after leaving the smoke; re-entering refreshes it.
- [x] **Stealth AI (general)**: an if/then rule for any stealthed unit — they know they're safer until they break it and act accordingly
      (e.g. reposition, revive, set up). Build it generic for future stealth sources.
- [x] **Missile_Barrage**: 3 missiles that spread out a bit more, same damage, 15s CD, 45 energy.
- [x] **Remove Gatling_Arm**. Add a jetpack to his sprite. New passive **Tactical_Retreat**: when he drops under 30% HP he blasts up in an arc on a
      blue-flame jetpack (recolor one of Kyle's campfire flames blue) with a blue shield effect, flies back to 100 px from the left edge and slowly
      lands; while flying all damage taken is capped at 5 per hit; effects end on landing. Internal CD 40s. The flight takes about the same time
      from anywhere (faster when further); during it he fires single Missile_Barrage-strength missiles at random enemies — about 3 over the flight.

### Lumber_Jack
- [x] Replace Log_Roll with a passive of your choosing (document it). Hatchet_Leap gets a stun (longer near the landing centre, shorter at the edge)
      and a much better landing: cracked-earth decal, dust, pebbles, a small energy burst.

### Yumi_Archer
- [x] **Pinning_Shot**: bigger arrow with a motion trail; looks pinned into the target's legs/ground; auto-aimed (ignores accuracy).
- [x] **One Nocked, Two in Hand**: 3 shots over 1s (was 1.5s), 40 energy, 10s CD; can't crit; built-in passive: whenever she lands a crit,
      its remaining CD is halved.
- [x] **Blow_Gun**: (1d4 + immune-halves-CD DONE 0.12.63) still to do: nicer tiny dart
      (about 4x2 px, ref: dart images eb69cbf7 / 62228cc4 / 131f51f6 — draw your own).

### Chibi_Warrior
- [x] Kunai toss a little slower, with a 50% chance to apply (or refresh) a poison stack.

### Void_Cultist (rework, keep tentacle basics)
- [x] No energy costs; abilities cost life (choose sensible amounts/percentages) except Syphon_Life which is free.
- [x] **Syphon_Life**: dark black/purple swirling beam from his midpoint to the target's; drains life per second (damages, heals him).
- [x] **Poisoned_Blade** (passive): his successful melee hits (not dodged/missed/fully blocked) have 25% to add 1 poison stack; ALL of his
      melee basic attacks refresh poison duration on the target. New poison icon: small green raindrop.
- [x] **Lethal_Strikes**: 12s: +75% melee attack speed, -25% melee damage, Poisoned_Blade doubled (50%, 2 stacks), Shooter/Slasher set to 10 (slasher).
- [x] **Spawn_Tentacle** (keep): can place anywhere within 400 px, prefers the middle of packs.
- [x] **Call_of_Cthulhu**: 10s: Spawn_Tentacle CD halved, all tentacles +25% size (attack range grows to match) and +25% attack speed; on cast,
      existing tentacles burrow and re-emerge 200 px in front of him; a fear pulse from him and from every tentacle: 2s fear, -25% move speed.

### New characters
- [ ] **Engineer** (base on a copy of Flannel_Man's sheet, edited with refs 19965584 / f50e171d / a8e47f2e — hard hat, red shirt/overalls, wrench,
      short shotgun; draw your own). Shooter/Slasher: 6 toward shooter. Basic attacks: heavy slow wrench swing (hits hard, chance to stun);
      2-shell shotgun, 5 pellets per shot, ~0.33s between shots, 5s reload. Animations: build/repair, wrench swing, shotgun.
      Abilities (actives first, passive last on his card):
      * **Build** — opens a WC3-spellbook-style sub-menu of buildings, each with its own internal CD:
        - Tower (bottom tier) — see Modify. Chain-link fencing, steel beams, floors, short walls, a ladder up the whole thing, and a sign per tier
          showing its buff. Full tower ≈125 px wide × 275 px tall. Tier build times 5s / 5s / 7s. One shared health bar; each tier +15% max HP.
          Tier 1 and tier 2 each give a buff (your call, signposted, e.g. medical cross = regen). Top tier: one ally can stand up there for
          +ranged accuracy and +max range and can't be hit until the tower is destroyed; it also gives a buff to nearby units when empty.
        - Concrete barrier (refs 56c004bc / 63cf87ed): blocks zombie movement (they can attack it); allies standing behind it get +accuracy.
        - A third buildable of your design.
      * **Repair** — no CD; slow; repairs buildings and mechanical allies (Warhound). While repairing/upgrading, his other cooldowns pause.
      * **Modify** — builds the next tower tier; or mounts an auto-turret on a broken-down car (turret: 3-round bursts, 0.25s apart, 1s reload, low accuracy).
      * **Satchel_Charge** — tosses a satchel (concept refs d0f5c1e8 / 855b41b8 / e7862f53, draw your own) that never auto-explodes;
        he detonates it when he chooses (AI). Largest explosion in the game, 6d4 at the centre falling off outward, HEAVY knockback.
      * Passive (rename the armor kit): standing near an ally long enough applies an armor kit: +25% armor until they take 3 hits
        (add a small extra effect if it feels weak). Kyle also floated a 0.75s-cast "Armor Kit" active — he settled on making it the passive.
      Balance him against the others with the sim.
- [x] **JP**: new sprite sheet built off Flannel_Man's, refs ec239582 (orange hoodie) / 43f7cc34 / 5c7c9cae: large orange hoodie, shorter hair
      and beard, white skin, Kar98-style rifle, sword melee weapon and a makeshift wooden shield in his off hand. Card weapon line:
      "Kar98 + Sword & Board". Also make a dodge-roll animation (for later skills).
      Melee: medium speed, low-medium damage. Kar98: a bit more damage and range than Flannel_Man's gun, slower between shots.
      Ability **Protect_the_Familia**: rushes to an ally in danger, immune to damage while rushing; on arrival both get a shield = 50% of JP's
      max life for 5s, and he shoves the ally 75 px back toward the left edge. Fill in his other abilities + passive in his spirit and
      list them actives-first.

### Added by Kyle on 11-10 (after 0.12.64)
- [x] Fireman_Zombie: 4x a normal zombie's health and armor, about 2/5 its speed (keeps fire immunity, harder hits).
- [x] Werewolves feel weak / too few: improve (more of them, a bit sturdier), keeping roles: zombies slow/weak, werewolves fast backline threats, firemen slow tanks.
- [x] Stage scaling: remove the old per-stage enemy boosts; instead +3% health, armor and damage per stage (rounded down).
- [x] Guard dog: takes 5 hits before going down (not HP), can't be healed, one hit restored every 15s; a Downed animation so heroes can revive him (dogs never revive others);
      the last kennel tier gives 2 dogs (add tiers if needed) and rebalance kennel tier bonuses around the dog being sturdier/revivable.
- [x] JP details: very good guy who picks on people, avid gamer, smokes pot all day (not a drinker). Skills mix jokey + sensible.
      A SMOKE ability: 2s, he can move while smoking a big doobie (animation with smoke puffs and a burning ember that burns down), no other actions while smoking;
      a HIGH mechanic: buffs while high, falls off / goes negative when not high (passive tied to it). Protect_the_Familia as specified.
      4 actives + 1 passive. Kar98 ranged, homemade-looking wooden shield + real sword. Orange hoodie, dark blue jeans, white, short hair + beard.
      Smooth the sprite edges so he doesn't look blocky; double-check every animation. Put JP FIRST in the roster (before Flannel_Man).
      Same smoothing/animation care for the Engineer.
- [ ] LAST: Magic deck "Primary Directive 2.0" (Leon's robots deck, decks/robots.py + raw_lists.json key Primary_Directive): copy the list, consider adding
      Hulking Metamorph, Repair and Recharge, Digsite Engineer, Dispatch, Liberty Prime Recharged, Combustible Gearhulk (MUST), Memnarch the Warden (MUST),
      Dauntless Scrapbot, Moxite Refinery, Guidelight Synergist, Marketback Walker (MUST), Hedron Archive, Gilded Lotus, Thran Dynamo, Reaver Titan.
      Don't cut mana (he had mana trouble), add the mana rocks if possible; cut from stats the deck is high in to raise low ones; tag + score it
      (decks/*.py TAGS, card_text.json, fetch_order.json + card_info.txt rows), and show it as a separate deck on every site page.
      Card text: scryfall via WebFetch (api.scryfall.com/cards/named?exact=NAME), one card per call (long multi-card URLs are rejected).

## 2. Done (for reference)
0.12.55–0.12.62 shipped: sapper/medicine/inevitable/super-lucky/mountain deck bonuses, 3 bonuses per deck, phone camera, campfire camp scene,
PWR/SPD bars, Proximity_Bomb v1/v2, screen-push rules, stuck-action fix, Lumber_Jack fixes, Warhound repair bots v1 + robot voice + no food,
druid run/staff swing, dog trot, food AND water, universal searching, zombie lane rules, Hardcore AoE friendly fire, Wave Dash = plain sword hit,
Fireman_Zombie, Warhound flamethrower (as ranged — still to move to "melee", see queue).
