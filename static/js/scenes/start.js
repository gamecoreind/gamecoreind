import { NodeGroup, NodeObject } from "../engine/node.js"
import { Scene } from "../engine/scene.js"
import { UIButton, UITextView } from "../engine/ui.js"
import { Sprites } from "../sprites.js"
import { bgmButton, display , displayRect } from "../root.js"
import { Rect } from "../engine/rect.js"
import { openingScene, showDialogueButton, textDialogue } from "./opening.js"
import { GridTransition } from "../engine/transition.js"
import { audio, playOverlap } from "../audio.js"

export const transitiongrid = new GridTransition()
display.sceneTransition = transitiongrid
const startButton = new UIButton(
    Sprites.ui.startButton.default,
    new Rect(0,500,700,300),
    () => {
        playOverlap(audio.transition)
        openingScene.startEvent = () => {
            display.addProcess("toOpening",() => {
                if (transitiongrid.finish) {
                    display.sceneTransition = null
                    textDialogue.startWrite()
                    showDialogueButton()
                    display.deleteProcess("toOpening")
                }
            })
        }
        display.scene = openingScene
        startButton.allow.update = false
    }
)

startButton.spriteHovered = Sprites.ui.startButton.hover
startButton.spritePressed = Sprites.ui.startButton.press
startButton.rect.centerx = displayRect.centerx
startButton.scale.enable = true
startButton.event.hover = () => {
    startButton.setSprite("hovered")
    if (startButton.scale.value.w < 1.1) {
        startButton.scale.value.w += 0.01
        startButton.scale.value.h += 0.01
    }
}
startButton.event.noevent = () => {
    startButton.setSprite("default")
    if (startButton.scale.value.w > 1) {
        startButton.scale.value.w -= 0.01
        startButton.scale.value.h -= 0.01
    }
}

/*
const credit = new NodeObject(new Surface(650,100),new Rect(0,0,650,100))
credit.sprite.context2D.fillStyle = "white"
credit.sprite.context2D.fillRect(0,0,credit.rect.w,credit.rect.h)

credit.rect.bottomleft = displayRect.bottomleft
const logo = new NodeObject(Sprites.ui.logo,new Rect(...credit.rect.topleft,credit.rect.h,credit.rect.h))

const creditText = new UITextView(new Rect(logo.rect.right + 20,credit.rect.y + 28,credit.rect.w,logo.rect.h),"© TKIT IBU HARAPAN BENGKALIS","bold 30px Arial","black",30,0,0,"black",[10,10],"left","top")
*/

//const startSceneNodes = new NodeGroup([startButton,credit,logo,creditText])
const startSceneNodes = new NodeGroup([startButton,bgmButton])
export const startScene = new Scene([startSceneNodes],Sprites.bg.start)

