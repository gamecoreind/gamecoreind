import { display } from "./root.js"
import { bakeScene } from "./scenes/bake.js"
import { cuttingScene } from "./scenes/cutv2.js"
import { endingScene } from "./scenes/ending.js"
import { moldScene } from "./scenes/mold.js"
import { startScene } from "./scenes/start.js"

// Game Run

display.scene =startScene
display.run()