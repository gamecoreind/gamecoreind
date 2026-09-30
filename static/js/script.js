import { display } from "./root.js"
import { startScene } from "./scenes/start.js"

// Game Run

display.scene = startScene
display.run()