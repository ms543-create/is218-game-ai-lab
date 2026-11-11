# Experiments

These are proposed trials for a single-room prototype. Each trial can run independently before we combine the outputs in a playtest.

## Gameplay programming

Ask a coding model to implement a pickup and a locked door in the project engine. Give it the scene tree and input bindings. Run the same brief with each candidate model in a fresh checkout.

| Test | Expected behavior |
| --- | --- |
| Use the door before collecting the key | The door stays closed and signals that it is locked. |
| Pick up the key and use the door twice | The key is consumed once and the door stays open. |
| Restart the level | The key and door return to their starting states. |

Save the first patch, the failing input sequence, and the final patch. Record how many manual edits it took to pass all three tests.

## Interactive audio

Ask an audio generator for two separate effects for the same wooden door, a short metal latch and a longer hinge creak. Keep the prompt, original exports, and in-engine recording. Compare candidates at matched playback volume.

Play the latch alone, play it under the creak, then trigger both rapidly. Have a listener identify when the lock releases without watching the screen. Record missed cues, audible clipping, and minutes spent trimming or mixing.

## 3D assets

Give each 3D generation tool the same door reference and target opening dimensions. Import the result into the same scene, place the pivot at the hinge, and swing the door through 90 degrees.

Record import errors, triangle count, missing textures, and time spent repairing scale or collision. Capture the closed and open poses. Walk through the opening in both directions to check that collision follows the visible door.

## Combined playtest

Hand the room to a new player. Ask them to leave the room without instructions. Note where they pause, which cue they respond to, and whether the visible, audible, and scripted door states agree.
