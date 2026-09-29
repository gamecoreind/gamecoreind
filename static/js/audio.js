
export const audio = {
    transition : new Audio("/static/res/sfx/transition.mp3"),
    correct : new Audio("/static/res/sfx/correct.mp3"),
    wrong : new Audio("/static/res/sfx/wrong.mp3"),
    ovenReady : new Audio("/static/res/sfx/ovenReady.mp3"),
    ovenClick : new Audio("/static/res/sfx/ovenClick.mp3"),
    ovenStart : new Audio("/static/res/sfx/ovenStart.mp3"),
    correctItem : new Audio("/static/res/sfx/correctItem.mp3"),
    dialogueButton : new Audio("/static/res/sfx/dialogueButton.mp3"),
}

export function playOverlap(audio) {
    audio.cloneNode(true).play()
}