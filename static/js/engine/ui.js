import { Input } from "./event.js";
import { NodeObject } from "./node.js";
import { Rect } from "./rect.js";
import { Surface } from "./surface.js";

function runFunction(func) {
    if (func instanceof Function) {
        func()
    }
}
export class UIObject extends NodeObject {
    constructor(sprite,rect) {
        super(sprite,rect)
        this.sprites = new Map()
        this.addSprite("default",sprite)
        this.setSprite("default")
        
        this.event = {
            mouseButtonTrigger:0,
            allow:{
                onclick: true,
                hover: true,
                leave: true,
                mousedown: true,
                mouseup: true,
                noevent: true
            },
            hover:() => {},
            leave: () => {},
            mousedown:() => {},
            mouseup:() => {},
            noevent:() => {},
            update:() => {
                const hovered = this.rect.collidepoint(Input.mouse.x,Input.mouse.y)
                // actions
                if (hovered) {
                    this._hovered = true
                    if (this.event.allow.hover) {
                        this.event.hover()
                    }
                    if (Input.mouse.released(this.event.mouseButtonTrigger) && this.event.allow.mouseup) {
                        this.event.mouseup()
                    } else if (Input.mouse.down(this.event.mouseButtonTrigger) && this.event.allow.mousedown) {
                        this.event.mousedown()
                    } 
                } else if (this._hovered && !hovered) {
                    this._hovered = false
                    if (this.event.allow.leave) {
                        this.event.leave()
                    }

                // nothing
                } else {
                    if (this.event.allow.noevent) {
                        this.event.noevent()
                    }
                }
            }
        }
    }
    update(eventArg) {
        this.event.update(eventArg)
    }
    setSprite(key) {
        if (this.sprites.has(key)) {
            this.sprite = this.getSprite(key)
            return 
        } 
    }
    getSprite(key) {
        if (this.sprites.has(key)) {
            return this.sprites.get(key)
        }
    }
    addSprite(key,sprite) {
        if (!this.sprites.has(key)) {
            this.sprites.set(key,sprite)
            return
        }
    }
}

export class UIButton extends UIObject {
    constructor(sprite,rect,onclick = null) {
        super(sprite,rect)
        this.event.mousedown = () => {
            this.setSprite("pressed")
        }
        this.event.mouseup = () => {
            runFunction(onclick)
        }
        this.event.hover = () => {
            this.setSprite("hovered")
        }
        this.event.noevent = () => {
            this.setSprite("default")
        }
    }
    // GET
    get spritePressed() {
        return this.getSprite("pressed")
    }
    get spriteHovered() {
        return this.getSprite("hovered")
    }
    get spriteDefault() {
        return this.getSprite("default")
    }

    // SET
    set spritePressed(spr) {
        this.addSprite("pressed",spr)
    }
    set spriteHovered(spr) {
        this.addSprite("hovered",spr)
    }
    set spriteDefault(spr) {
        this.addSprite("default",spr)
    }
}

export class UITextView extends UIObject {
    constructor(
        rect,
        text = "",
        font = "50px Arial",
        color="black",
        lineHeight = 50,
        charDuration = 0,
        stroke = 0,
        strokeColor = "white",
        padding = [10,10],
        align = ["left","top"],
        baseline = 'top',
        background = "transparent",
        letterSpacing = "0"
    ) {
        super(new Surface(...rect.size),rect)

        this.text = text
        this.font = font
        this.color = color
        this.lineHeight = lineHeight
        this.charDuration = charDuration
        this.stroke = stroke
        this.strokeColor = strokeColor
        this.padding = {
            left:padding[0],
            top:padding[1],
            right:padding[0],
            bottom:padding[1],
        }
        this.align = {
            horizontal : align[0],
            vertical : align[1]
        }
        this.baseline = baseline
        this.background = background
        this.letterSpacing = letterSpacing

        this._textResult = ""
        this.allow.write = true
    }
    startWrite() {
        this.allow.write = true
    }
    stopWrite() {
        this.allow.write = false
    }
    erase() {
        this._textResult = ""
    }
    rewrite(text = this.text) {
        this.text = text
        this.erase()
        this.startWrite()
    }
    get currentLength() {
        return this._textResult.length
    }
    set currentLength(l) {
        this._textResult = this.text.slice(0,l)
    }
    
    drawIn(context2D) {
        // font setup
        this.sprite.context2D.reset()
        this.sprite.context2D.fillStyle = this.color
        this.sprite.context2D.strokeStyle = this.strokeColor
        this.sprite.context2D.font = this.font
        this.sprite.context2D.lineWidth = this.stroke
        this.sprite.context2D.textBaseline = this.baseline
        this.sprite.context2D.letterSpacing = this.letterSpacing

        let x = this.padding.left
        let y = this.padding.top
        
        // text animation
        if (this.allow.write) {
            if (this.charDuration && this._textResult.length < this.text.length) {
                if (this.currentLength < this.text.length) {
                    for (let i = 0; i <= this.charDuration; i++) {
                        if (i >= this.charDuration) {
                            this.currentLength++
                        }
                    }
                }
            } else {
                this._textResult = this.text
            }
        }
        // textwrap
        let line = ""
        const words = this._textResult.split(' ');
        const measuredLines = []
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            let testLine = line + words[wordIndex] + ' ' // line + nextWord
            let testWrapWidth = this.sprite.context2D.measureText(testLine).width
            
            if ((testWrapWidth > this.textRect.width) && (wordIndex > 0)) { // line wrapper
                measuredLines.push([line,this.sprite.context2D.measureText(line).width])
                line = words[wordIndex] + ' ' // reset line
            } else {
                line = testLine // line saved
            }
        }
        measuredLines.push([line,this.sprite.context2D.measureText(line).width])
        const totalLineHeight = this.lineHeight * measuredLines.length
        for (let lineIndex = 0; lineIndex < measuredLines.length; lineIndex++) {
            let l = measuredLines[lineIndex][0]
            switch (this.align.horizontal) {
                case "left":
                    x = this.padding.left
                    break;
                case "center":
                    x = (this.rect.w / 2) - (measuredLines[lineIndex][1] / 2)
                    break
                case "right":
                    x = this.rect.w - this.padding.right - measuredLines[lineIndex][1]
                    break
            }
            switch (this.align.vertical) {
                case "top":
                    y = this.padding.top + (this.lineHeight * lineIndex)
                    break
                case "center":
                    y = ((this.rect.h - (totalLineHeight/2)) / 2) + (this.lineHeight * lineIndex)
                    break
                case "bottom":
                    y = this.rect.h - this.padding.bottom - (this.lineHeight * lineIndex)
                    break
            }
            // write
            if (this.stroke) {
                this.sprite.context2D.strokeText(l,x,y)
            }
            this.sprite.context2D.fillText(l,x,y)
        }

        // blit
        super.drawIn(context2D)
    }
    get textRect() {
        return new Rect(
            this.rect.x + this.padding.left,
            this.rect.y + this.padding.top,
            this.rect.w - (this.padding.left + this.padding.right),
            this.rect.h - (this.padding.top + this.padding.bottom)
        )
    }
    
}