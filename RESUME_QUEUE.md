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
9. Garage Needs Repair pass for most decks: weak cards, 75% of cuts from the deck's highest stat, explain highest stat + lower stats to improve.
10. (DONE 0.12.346) Notes tabs.
11. (DONE 0.12.348) Breakable obstacles.
12. Ominous Trails / doors+windows (near last).

13. NEW (Kyle 17:02): go over ALL game code (crawl_src.js, crawl_ui.js): fix bugs, erase unused/garbage code (e.g. old deck-item system PROCS/ITEM/rollItem/bag/shop, LUCKY_LADDER/luckyDieRoll, old TAL_CAP offer flow, demo-only leftovers, ABILITIES_OFF branches), look for more potential bugs. Test after (tsim, gsim, wsim1, browser load). Publish + notes.
Difficulty data for Kyle: stage-1 fresh teams win 0/12 with 7s trickle vs 5/12 with no trickle (bats/stray-block not the cause). Trickle is the whole difference.
