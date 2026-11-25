# Resume queue (updated 2026-11-18 15:48, live at 0.12.340)
Restore if workspace is gone: clone crawl-dev, untar crawl_src_bundle.tgz into /home/claude, clone main to /home/claude/pod-rundown. Publish with /tmp/pub.sh VER "msg" (recreate from 00_RESUME_HERE.md if missing).
Standing: push live yourself, notes entry each version, always give https://seekyle.github.io/Pod-Rundown/, back up to crawl-dev, message Kyle progress.

DONE today: talent trees v2 (335), 10 waves + trickle (336/337), meetup circle fixes, plan lock 2-5s (abilities offer rethink), level cap 30 (337),
gear system + tap-for-info (338), bats x3, Alphas 5x, JP sword 1d8+4, costly gear upgrades, trickle stall fix (339), werewolf lunge, Lucky Dice v2 (340).

## Remaining, Kyle's order
5. (DONE 0.12.347) Zombie lane AI.
6. Medium testing: RESULTS SENT TO KYLE 16:5x (stage 1 ~0-2/12 for fresh teams, progression sim 0 clears in 30 tries, stage ~380s with ~120 zombies, 70 of them trickle). Waiting on his pick of a lever before changing numbers.
7. (DONE 0.12.342) New-game Inspiration warning.
8. (DONE 0.12.343) Warhound spare-parts upkeep.
9. (DONE 0.12.349, first pass) Garage Needs Repair: 75% from top stat, removal/politics protected, note per deck. Possible follow-up: new swap picks tailored to the new cuts (needs Scryfall prices; current swaps are reused deck-level picks).
10. (DONE 0.12.346) Notes tabs.
11. (DONE 0.12.348) Breakable obstacles.
12. (DONE 0.12.357) Ominous Trails + city doors/windows.

13. (DONE 0.12.351 + 0.12.354) Code cleanup incl. old backpack/merchant/level-up picks/spell+item system.
Difficulty: zombie 20 HP, trickle flat 7s from first pan (0.12.356).

## 2026-11-25 (live at 0.12.490)
- The bundle now includes parts/events.js (build_crawl.py needs it).
- build_site.py needs text modules (takeaways_text etc.) that are NOT in the bundle, so pub.sh fails at that step. Use art_src/pub2.sh instead: it builds crawl.js, copies crawl.js/notes.html/pngs and only bumps the crawl.js cache-bust in index.html.
- Added heroes Bub (0.12.488, Undead tag) and Brood_Bot (0.12.489, spider-bots). Art scripts: art_src/bub/make_bub.py, art_src/broodbot/make_broodbot.py.
- Stage-1 sim (wsim4, 36 games, 0.12.487 build): 13/36 wins, avg clear 357s. New heroes (24 games each): Bub 9/24, Brood_Bot 11/24.
