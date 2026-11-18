# START HERE: Pod Rundown + Crypt Crawl handoff (v0.12.313, 2026-11-18)

Kyle: in a new chat, send this zip and say **"Pick up from 00_RESUME_HERE.md"**.

Claude: read this file first, then `01_HOW_TO_UPDATE_AND_ZIP_IT.txt`, then `Rules/` (01-12), then `Crypt_Crawl/CRAWL_TODO.md`.

## 1. Restore the workspace (Claude does this)
1. Unzip the file. `FULL_PROJECT/` is an exact copy of the working folders:
   - `cp -r FULL_PROJECT/pod2 FULL_PROJECT/dog FULL_PROJECT/bat FULL_PROJECT/work FULL_PROJECT/data /home/claude/`
   - `cp FULL_PROJECT/tmp_tools/* /tmp/` (pub.sh, smoke.py sim harness, treeui.py, pgtest.py, show.py)
2. Site repo: `git clone https://github.com/SeeKyle/Pod-Rundown.git /home/claude/pod-rundown`. The main branch is the live site.
   The music files live only in the repo (`music/`), not in this zip.
3. Backup repo: `git clone -b crawl-dev https://github.com/SeeKyle/Pod-Rundown.git /tmp/devrepo`. It holds CRAWL_TODO.md and crawl_src_bundle.tgz.
4. Check that it works:
   - `cd /home/claude/pod2 && python3 score.py | tail -5`
   - `python3 build_crawl.py && node --check crawl.js`
   - `python3 build_site.py`
5. Publish: `/tmp/pub.sh 0.12.NNN "message"`. It bumps the version, builds everything, copies to the repo, commits and pushes.
   - Add a notes.html `<h3>` block at the first `      <h3>` before publishing.
   - **Always give Kyle the link: https://seekyle.github.io/Pod-Rundown/**
6. Back up to crawl-dev:
   `cd /home/claude && tar czf /tmp/devrepo/crawl_src_bundle.tgz --exclude=pod2/music pod2 dog bat && cd /tmp/devrepo && git add -A && git commit -m "..." && git push https://github.com/SeeKyle/Pod-Rundown.git HEAD:crawl-dev`
7. Card data: Scryfall and EDHREC are blocked from the shell. Use the desktop app's built-in browser instead:
   - `preview_start https://api.scryfall.com/`
   - Then use javascript_tool to `fetch` `/cards/collection` (75 names per call) and `json.edhrec.com/pages/cards/<slug>.json` for salt and inclusion.
   - For big results, use a Blob download into Kyle's Downloads folder, then `device_stage_files`.

## 2. Kyle's standing rules
- Push site updates yourself and always include the site link. Back up to crawl-dev.
- Use Kyle's numbers exactly. Crypt Crawl screen px ÷ 3 = world px.
- "Zip it" means: build this full zip (`python3 make_zip_full.py <ver>`).
- No ripped or watermarked assets. Keep the content adults-only. Never push friends' personal photos.
- Never look up card text that's already in card_text.json.
- Player keys are name + emoji only: Kyle = 🎩 · Cheez = 🧀 · Leon = 🪼 · Eddie = ♠ · Kenzie = 🌿
- MTG:
  - Always include land suggestions.
  - Flag low removal.
  - Keep removal and politics cards.
  - Don't proactively suggest upgrades.
  - Needs Repair: 4 weak links × 4 swaps (2 super budget, 1 medium $5–20, 1 any cost), with prices from Scryfall.
- Don't reproduce song lyrics; use only short title or phrase references. No % odds shown for Lucky Dice.
- Kyle doesn't own Excel. Balance sheets are Claude Sheets artifacts:
  - Enemy Balance: https://claude.ai/artifact/5MAjFmGHtoDhXgTmjrWbSn
  - Talent Trees: https://claude.ai/artifact/BAivrRTxea2KH73voSN4PL
  - Items: https://claude.ai/artifact/6oZgct8gnLMBv5apseG39v
  - Hero Stats: artifact id 5taqjN1iNPQmiBqxN1VKQU
  - Abilities: artifact id 8FiYMZNTo4Bhfw8m7ZzAt9

## 3. What was done this session (live as of 0.12.313)
- **0.12.312 Kenzie (🌿)** added as a player: OWN map, header key, BRIEF, dice skin, wheel, owner suffixes, and Crypt Crawl PLAYER_ICON + INSP.
  - Decks: `decks/kenzie_trostani.py` (Trostani's Choir 🕊️), `decks/kenzie_thalia.py` (Gitrog & Gates 🐸), `decks/kenzie_bumble.py` (Bumbleflower's Gifts 🐰).
  - Text is in `takeaways_kenzie.py`; Needs Repair is in `repair_kenzie.py`.
  - Kenzie's decks are filtered out of the Pod Sim picker, the same as Eddie's.
- **Eddie's Miles** rebuilt from the final 100-card list (incoming/eddie_miles_updated.txt): 40 cards out, 39 in.
  - Changes are appended at the bottom of `decks/eddie_miles.py`, with new text and repair in the kenzie modules.
  - Score went from 22 to 47 before Matters, 45 after.
- **0.12.313 Matters formula** (`matters.py`, hooked in score.py just before "per-card totals"):
  - Card points × (1 + 0.04·Y), where Y = deck count minus the flat value. Only the single best Matters type applies to each card.
  - It scales the existing tag points, so all old formulas still apply.
  - Flat values: lands 35, typal 30 (per creature type), spellslinger 35 noncreature spells, noncreature-matters 25, graveyard enablers 10, artifacts 40, enchantments 35, token makers 20.
  - Snow Matters is not added; Kyle wants it separate but gave no flat value.
  - Kyle's file says to ask before adding extra "cards seen" categories. Only his listed ones are in.
  - Rescore results:
    - Gains: Narset +8, Truly Fantastic +7, Turtle Power +4.5, Vivi +3, Mechanized Mayhem +2, Kykar +2, Thranduil +1.5, Last of Us +1.5, PD 2.0 +1.5.
    - Decks with no Matters theme slip 1–3 points, because ratings are relative across the pod.
  - Open question for Kyle: I read his "[1.(Y×4)]" as +4% per card over the flat value. Confirm.
  - Report the rescore and the open question to Kyle; he hasn't seen them yet.
- Earlier this session (already live):
  - Tee_Grizzle hero ('teeg'): No Effort dash-sweep, Robbery and First Day Out passives.
  - Talent trees (parts/trees.js, 🌳 button on the camp card, free reset).
  - Kennel rework (5 hits, petting, 30 s respawn, dogs at camp).
  - Hero damage now grows only from talents, dice and items.
  - Alpha ×3.5. Specialty zombies don't get stage scaling until unlocked; unlock rate is +0.5% per stage.
  - Bigger camp and feed buttons.
  - gear_db.json (258 items) plus icons. **Not wired into the game yet.**

## 4. Work queue (Kyle's order)
1. Tell Kyle the Matters rescore results (section 3). Takeaway text that quotes old ratings may need a touch-up.
2. **Items system**:
   - Wire gear_db.json: Weapon/Armor/Trinket slots, stash, free swap UI, proc engine for "Chance on __" triggers, small stat bonus per item.
   - Drops: kills rarest, crates better, loot boxes best. First item around stage 8–10. Luck raises both drop chance and rarity. Rarity is heavily skewed low.
   - No flashy procs like whirlwind.
   - NEW: Terraria-style tiers of the same item (Rusted/Dull lowest, with a penalty). Add a camp "upgrade" building that spends spare parts to raise an item a tier.
3. **Tee_Grizzle rework**:
   - Only ONE passive: merge Robbery and First Day Out.
   - New ability "Strapped": buffs one or more allies with ranged damage, attack speed and reload speed.
   - Rest of the kit themed on the songs No Effort / Robbery / First Day Out. Kyle's phrases: "Hit 'Em With The Chop", heat-sensor AR, "Pistol Play". Use them as short names only, never lyric lines.
   - Voice lines: he trash-talks zombies ("pussies" etc.) and says "homie", never slurs.
4. Freeze hunt.
5. Rest of the list (CRAWL_TODO.md): cover, towers rework, events, notes split into tabs, Lucky Dice rework (no % shown), Weapon Bench decision (waiting on Kyle).

## 5. Waiting on Kyle (ask him to send)
- His **Warhound food/water idea**. It never arrived.
- His item proc examples and **weather system** idea (fog lowers accuracy, rain lowers fire damage, ...). Resend in full if there's more.
- The **description of his own character** for Crypt Crawl.
- Weapon Bench decision.
- Confirm the Matters reading (+4% per card over) and whether to add the extra "cards seen" ideas and a Snow Matters flat value.
- Two leftover .tmp files in his Downloads folder from card fetching. He can delete them.

## 6. Key files
- Scoring:
  - score.py (DECKS list)
  - formulas.py
  - matters.py
  - plan_tags.py
  - decks/*.py
  - judge.py
- Site:
  - build_data.py, build_site.py, template.html, notes.html
  - Takeaway text: takeaways_text.py (+ _eddie, _kenzie)
  - Needs Repair: repair_data.py (+ _eddie, _kenzie)
- Card data: card_text.json, inclusion.json, pt.json, card_info.txt, fetch_order.json, raw_lists.json. Incoming lists are in incoming/.
- Game:
  - crawl_src.js (logic) + crawl_ui.js (UI), built by build_crawl.py into crawl.js
  - parts/trees.js (talents)
  - gear_db.json + parts/gear_build/ (items)
  - crawl_atlas.json; assets crawl_*.png/mp3/ogg
