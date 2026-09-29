import { Random } from "../../engine/math.js";
import { NodeGroup, NodeObject } from "../../engine/node.js";
import { Rect } from "../../engine/rect.js";
import { Scene } from "../../engine/scene.js";
import { UIButton, UITextView } from "../../engine/ui.js";
import { display, displayRect, nextSceneButton } from "../../root.js";
import { Sprites } from "../../sprites.js";
import { endingScene } from "../ending.js";

const options = [2,4,8]
const optRequest = Random.shuffle(options)[0]

const textGuideText = `yuk kita potong bolu kemojonya menjadi ${optRequest} potong, mana ya angka ${optRequest}`
const textGuideTrue = `keren sekarang bolu kemojo ini menjadi ${optRequest} potong!`

const textGuide = new UITextView(new Rect(displayRect.centerx + 50,0,displayRect.w / 2 - 100,displayRect.h / 2),textGuideText,"70px Arial","white",80,0,10,"#6f3b00",[0,0],["center","center"],"middle","none","3px")
textGuide.scale.enable = true

const kemojo = new NodeObject(Sprites.item.kemojo.full,displayRect.copy())

const cuttingSceneGroups = new NodeGroup([kemojo,textGuide,nextSceneButton])

// selection
let selectionStatus = ""

// option buttons
const buttonSize = 200
const gap = 1.4
const optButtonRect = new Rect(0,displayRect.centery + 200,buttonSize,buttonSize)
const startX = displayRect.centerx + 100

display.addProcess("textGuideResponse",() => {
    if (textGuide.scale.value.w < 1) {
        textGuide.scale.value.w += 0.02
        textGuide.scale.value.h += 0.02
    }
    if (kemojo.rect.y < 0) {
        kemojo.rect.y += 2
    }
})

const optionButtons = []
for (let i = 2;i < 8;i += 2) {
    let value = i
    if (value == 6) {value = 8}
    const optButton = new UIButton(Sprites.ui[`opt_${value}`],optButtonRect.copy())
    optButton.value = value
    optButton.rect.x = startX + ((optButton.rect.w * gap) * optionButtons.length)

    optButton.event.hover = function() {
        if (optButton.rect.y > displayRect.centery + 180) {
            optButton.rect.y -= 10
        }
    }
    optButton.event.noevent = function() {
        if (optButton.rect.y < displayRect.centery + 200) {
            optButton.rect.y += 10
        }
    }

    optButton.event.mouseup = function() {
        kemojo.rect.y -= 30
        if (optButton.value === optRequest) {
            textGuide.scale.value.w = 0.7
            textGuide.scale.value.h = 0.7
            kemojo.sprite = Sprites.item.kemojo[`opt_${optRequest}`]
            textGuide.rewrite(textGuideTrue)
            optionButtons.forEach(btn => {
                if (cuttingSceneGroups.nodes.includes(btn)) {
                    const btnIdx = cuttingSceneGroups.nodes.indexOf(btn)
                    cuttingSceneGroups.nodes.splice(btnIdx,1)
                }
            })
            nextSceneButton.spawn()
            
            
        } else {
            textGuide.scale.value.w = 0.7
            textGuide.scale.value.h = 0.7
            textGuide.rewrite(`itu angka ${optButton.value} bukan angka ${optRequest}, ayo coba lagi!`)
            const btnIdx = cuttingSceneGroups.nodes.indexOf(optButton)
            cuttingSceneGroups.nodes.splice(btnIdx,1)
            
        }
    }

    optionButtons.push(optButton)
}

cuttingSceneGroups.extend(optionButtons)
export const cuttingScene = new Scene([cuttingSceneGroups],Sprites.bg.tablecloth)

cuttingScene.startEvent = () => {
    nextSceneButton.nextScene = endingScene
}
