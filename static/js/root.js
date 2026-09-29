import { audio , playOverlap} from "./audio.js"
import { Display } from "./engine/display.js"
import { Vector2 } from "./engine/math.js"
import { Rect } from "./engine/rect.js"
import { UIButton } from "./engine/ui.js"
import { Sprites } from "./sprites.js"

export const display = new Display(document.getElementById("canvas"))
export const displayRect = display.getRect()

class NextSceneButton extends UIButton {
    constructor() {
        super(Sprites.ui.nextButton.default)
        this.animationPos = {
            from:new Vector2(...[1920, 810]),
            to:new Vector2(...[1610, 810]),
            speed:50
        }
        this.rect = new Rect(...this.animationPos.from.pos,200,200)

        this.spriteHovered = Sprites.ui.nextButton.hover
        this.spritePressed = Sprites.ui.nextButton.press
        this.resetWhenClicked = true
        this.nextScene = null
        this.spawned = false
        display.addProcess("spawnNextSceneButtonAnimation",() => {
            if (this.rect.x > this.animationPos.to.x) {
                this.rect.x -= this.animationPos.speed
            } else {
                this.rect.x = this.animationPos.to.x
            }
        })

        this.event.mouseup = () => {
            this.nextSceneFunction()
        }
        this.hide()
    }
    nextSceneFunction() {
        playOverlap(audio.transition)
        display.scene = this.nextScene
        if (this.resetWhenClicked) {
            this.hide()
        }
    }
    setNextScene(scene) {
        display.scene = scene
        
    }
    hide() {
        super.hide()
        this.spawned = false
        this.allow.update = false
    }
    show() {
        super.show()
        this.allow.update = true
    }
    spawn() {
        if (!this.spawned) {
            this.rect.topleft = this.animationPos.from.pos
            this.show()
            this.spawned = true
        }
    }
    
}
export const nextSceneButton = new NextSceneButton()