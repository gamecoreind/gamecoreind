import { NodeGroup, NodeObject } from "../engine/node.js";
import { Rect } from "../engine/rect.js";
import { Scene } from "../engine/scene.js";
import { UIButton, UITextView } from "../engine/ui.js";
import { display, displayRect } from "../root.js";
import { Sprites } from "../sprites.js";

const dialogue = [
    "terima kasih ya sudah membantu ibu membuat kue bolu kemojo",
    "ternyata membuat kue bolu kemojo itu menyenangkan ya!",
]
let dialogIndex = 0

const textcolor = "#151515"
const textDialogue = new UITextView(new Rect(700,180,1050,400),dialogue[dialogIndex],"40px Arial",textcolor,75,5,2,textcolor,[10,10],["left","top"])

// dialogue button
const dialogButtonY = textDialogue.rect.bottom - 70

const nextButton = new UITextView(new Rect(0,0,230,100),"selanjutnya >","bold 30px Arial","black",100,0)
nextButton.rect.right = textDialogue.rect.right
nextButton.rect.centery = dialogButtonY
nextButton.event.hover = () => {
    nextButton.color = "#b17623"
}
nextButton.event.noevent = () => {
    nextButton.color = textcolor
}
nextButton.event.mouseup = () => {
    dialogIndex++
    textDialogue.rewrite(dialogue[dialogIndex])
}

const prevButton = new UITextView(new Rect(0,0,230,100),"sebelumnya >","bold 30px Arial","black",100,0)
prevButton.rect.left = textDialogue.rect.left
prevButton.rect.centery = dialogButtonY
prevButton.event.hover = () => {
    prevButton.color = "#b17623"
}
prevButton.event.noevent = () => {
    prevButton.color = textcolor
}
prevButton.event.mouseup = () => {
    dialogIndex--
    textDialogue.rewrite(dialogue[dialogIndex])
}

const characterDialog = new NodeObject(Sprites.dialog.char_text,displayRect)
const backToStartButton = new UIButton(Sprites.ui.back,new Rect(0,0,200,200),() => {location.reload()})
backToStartButton.startpos = [1920, 810]
backToStartButton.endpos = [1610, 810]
backToStartButton.rect.topleft = backToStartButton.startpos

display.addProcess("backToStartButtonSpawn",() => {
    if (dialogIndex >= dialogue.length - 1) {
        if (backToStartButton.rect.x > backToStartButton.startpos[0]) {
            backToStartButton.rect.x -= 30
        } else {
            backToStartButton.rect.x = backToStartButton.endpos[0]
        }
    }
})
display.addProcess("dialogueController",() => {

    if (!dialogIndex) {
        prevButton.hide()
        prevButton.allow.update = false
    } else {
        prevButton.show()
        prevButton.allow.update = true
    }

    if (dialogIndex >= dialogue.length - 1) {
        nextButton.hide()
        nextButton.allow.update = false
    } else {
        nextButton.show()
        nextButton.allow.update = true
    }
})

const endingSceneGroup = new NodeGroup([characterDialog,textDialogue,backToStartButton,prevButton,nextButton])
export const endingScene = new Scene([endingSceneGroup],Sprites.bg.kitchen)