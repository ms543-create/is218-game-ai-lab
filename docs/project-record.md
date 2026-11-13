# One Room Escape

**Plan review · November 12, 2026.** Can AI-generated feedback help a first-time puzzle player tell when a door has unlocked? The audience is a classmate playing a browser puzzle between classes, with headphones optional. This record follows the project from the initial choice through later builds.

## Two possible first screens

| Concept | What the visitor sees and does | What makes a return visit useful |
| --- | --- | --- |
| One Room Escape | A locked door, a shelf, and a move counter. Inspect the shelf, take the key, then unlock the door. | Replay and compare the number of moves with a personal best. |
| Sound Shelf | Two labeled playback buttons for competing latch sounds. Listen, choose the clearer cue, and save a reason. | Reopen prior decisions when selecting audio for a scene. |

**Choice.** Build the room. Both ideas can save a meaningful record, but only the room tests whether the latch makes sense at the moment the player acts. Sound Shelf would answer a different question about isolated clips. The larger dream is a room with generated scenery and sound. The first playable version needs only text, buttons, and one puzzle.

**Assumption.** A returning player cares about taking fewer moves. Ask a player to replay after their first escape and see whether they consult their best. If that measure has little value, ask what they hoped to learn from their history.

## The promise in five stories

1. As a new player, I can register, sign in, and sign out. A mistyped password shows a recoverable error.
2. As a player, I can inspect the shelf, take the revealed key, and unlock the door. Trying the locked door early gives a clue and costs a move. Escaping lets me start a fresh round.
3. As a finisher, I get one saved result with my move count and finish time. Retrying the finish request gives me the same result.
4. As a returning player, I can see my recent escapes and fewest moves after signing back in. Before my first escape, the dashboard offers a way to play.
5. As an account holder, I can edit my display name and change my password after entering my current password. Changing it ends my existing sessions.

## Where the rules and records live

```text
Browser (Jinja templates and HTML forms)
  → Flask route checks session, CSRF token, round owner, and action
    → puzzle rule computes next state and move count
      → SQLite transaction updates round and saves finish once
  ← next clue, result, or private dashboard
```

Use Python, Flask, Flask-Login, Flask-WTF, Werkzeug password hashing, SQLite, and pytest. Run the application on a local Python server. GitHub Pages hosts this notebook. Store accounts, rounds, and results on the server. Every dashboard query uses the signed-in account ID. Each round action checks ownership before changing state. Rotate the account's login identifier after a password change so stale cookies lose access.

## Research behind two decisions

| Observed in the original source · checked November 12, 2026 | Interpretation for this project |
| --- | --- |
| Flask-Login documents session management and authenticated views. Its permissions section leaves finer access decisions to the application. [Flask-Login documentation](https://flask-login.readthedocs.io/en/latest/#flask-login) | Story 4 needs a two-account test. Sign in as B and request A's round by ID. Expect denial and no disclosed move count. |
| SQLite enforces uniqueness across a declared set of columns and treats null values as distinct. [SQLite CREATE TABLE, §3.6](https://www.sqlite.org/lang_createtable.html#unique_constraints) | For story 3, give each result a required, unique round ID. Test two finish requests for one round and count the saved rows. |
| The course example describes a downloadable Flask/SQLite game and distinguishes its local backend from its static preview. [Working game example](https://keithwilliams.org/is218-studio/examples/full-game.html) · [Individual project brief](https://keithwilliams.org/is218-studio/projects/individual.html) | Use the local-server approach for account tests. A classmate can read this plan on Pages before the application exists. |

**AI assistance.** Codex drafted the comparison, stories, and test plan. The authentication and uniqueness claims were checked against the linked library and database documentation. The proposed schema and ownership checks still need implementation and tests.

## Experiments and checks

**Planned creative trial.** Generate two short latch sounds within 30 minutes. Pair each with the same on-screen unlock message. Ask a listener to identify the release during a recorded sequence of failed and successful attempts. Log misses, editing time, and the exact generation settings in [field notes](./field-notes). Keep the text cue in every version. If neither clip is recognizable, ship the text-only interaction. [Earlier audio and 3D experiment briefs](./experiments)

**Planned pattern trial.** Implement the three actions first as one conditional, then as a table of handler functions (the Command pattern). Run the same move sequences against both. Keep the table only if adding a fourth action leaves the existing handlers untouched and the outcomes remain easy to trace.

| Check | Status | Evidence or expected result |
| --- | --- | --- |
| Research sources | Observed | The source table records the passages used for the design. |
| Core rules | Planned | Inspect → take → unlock finishes in three moves. Trying the door first finishes in four. An unknown action leaves state unchanged. |
| Database and access | Planned | Two finish requests save one result. Restart preserves it. A second synthetic account cannot read it or change its owner’s profile. |
| Browser journey | Planned | With synthetic accounts, try the empty dashboard, play, refresh, update the name, change the password, and try the old session in another browser. |
| Classmate walkthrough | Planned | No classmate has reviewed the plan yet. [Open walkthrough task](https://github.com/ms543-create/is218-game-ai-lab/issues/1) |

The next build is one signed-in escape with one saved result. Keep subsequent observations and review decisions in this record. [Programming repository](https://github.com/ms543-create/is218-game-ai-lab) · [Career portfolio](https://ms543-create.github.io/career---portfolio/)
