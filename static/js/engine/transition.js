import { DISPLAY } from "./display.js"
import { Random } from "./math.js"
import { NodeObject } from "./node.js"
import { Rect } from "./rect.js"
import { Surface } from "./surface.js"

export class Transition {
    constructor(duration) {
        this.parts = []
        this.duration = duration
        this.displayRect = DISPLAY.getRect()
        this.allow = {
            draw:true,
            update:true
        }
        this.fromCanvas = undefined

        this.scenes = {
            from:undefined,
            to:undefined
        }
        this.finish = false
    }
    fromTo(fromCanvas,fromScene,toScene) {
        this.fromCanvas = fromCanvas
        this.scenes.from = fromScene
        this.scenes.to = toScene
    }
    update() {}
    draw(context2D) {
        this.parts.forEach(part => {
            part.drawIn(context2D)
        });
    }
}

export class GridTransition extends Transition {
    constructor(duration = 20,row = 7,column = 5) {
        super(duration)
        this.row = row
        this.column = column
        this.partDuration = undefined
    }  
    fromTo(fromCanvas,fromScene,toScene) {
        super.fromTo(fromCanvas,fromScene,toScene)
        const crop = {
            x:0,
            y:0,
            w:this.displayRect.w / this.row,
            h:this.displayRect.h / this.column
        }
        for (let i = 0;i < this.row;i++) {
            for (let j = 0;j < this.column;j++) {
                crop.x = crop.w * i
                crop.y = crop.h * j
                const sprite = new Surface(crop.w,crop.h)
                sprite.blit(this.fromCanvas.canvas,[crop.x,crop.y,crop.w,crop.h,0,0,crop.w,crop.h])
                this.parts.push(new NodeObject(sprite,new Rect(crop.x,crop.y,crop.w,crop.h)))
            }
        }

        this.partDuration = this.duration / this.parts.length
        this.currentPartDuration = 0
    }
    update() {
        if (!this.parts.length) {
            this.finish = true
            // remove from destination scene

            const i = this.scenes.to.groups.indexOf(this)
            this.scenes.to.groups.splice(i,1)
            return
        }
        this.currentPartDuration++
        if (this.currentPartDuration > this.partDuration) {
            const indexSelected = Random.range(0,this.parts.length - 1)
            this.parts.splice(indexSelected,1)
            this.currentPartDuration = 0
        }
    }
}

export class GateTransition extends Transition {
    constructor(duration,direction="horizontal") {
        super(duration)
        this.direction = direction
    }
    fromTo(fromCanvas,fromScene,toScene) {
        super.fromTo(fromCanvas,fromScene,toScene)
        const crop = {
            x:0,
            y:0,
            w:this.displayRect.w,
            h:this.displayRect.h
        }

        switch (this.direction) {
            case "horizontal":
                crop.w /= 2
                break;
            case "vertical":
                crop.h /= 2
                break;
        }

        const sprite = new Surface(crop.w,crop.h)
        switch (this.direction) {
            case "horizontal":
                const spriteLeft = sprite.copy()
                spriteLeft.blit(this.fromCanvas.canvas,[0,crop.y,crop.w,crop.h,0,0,crop.w,crop.h])
                const left = new NodeObject(spriteLeft,spriteLeft.getRect(0,0))

                const spriteRight = sprite.copy()
                spriteRight.blit(this.fromCanvas.canvas,[crop.w,crop.y,crop.w,crop.h,0,0,crop.w,crop.h])
                const right = new NodeObject(spriteRight,spriteRight.getRect(crop.w,0))

                this.parts.push(left,right)
                break;
            case "vertical":
                const spriteTop = sprite.copy()
                spriteTop.blit(this.fromCanvas.canvas,[crop.x,0,crop.w,crop.h,0,0,crop.w,crop.h])
                const top = new NodeObject(spriteTop,spriteTop.getRect(0,0))

                const spriteBottom = sprite.copy()
                spriteBottom.blit(this.fromCanvas.canvas,[crop.x,crop.h,crop.w,crop.h,0,0,crop.w,crop.h])
                const bottom = new NodeObject(spriteBottom,spriteBottom.getRect(0,crop.h))

                this.parts.push(top,bottom)
                break
        }
    }
    update() {
        switch (this.direction) {
            case "horizontal":
                if (this.parts[0].rect.right > this.displayRect.left) {
                    this.parts[0].rect.x -= (this.duration / 2) 
                    this.parts[1].rect.x += (this.duration / 2) 
                } else {
                    this.finish = true
                    // remove from destination scene
                    const i = this.scenes.to.groups.indexOf(this)
                    this.scenes.to.groups.splice(i,1)
                }
                break;
            case "vertical":
                if (this.parts[0].rect.bottom > this.displayRect.top) {
                    this.parts[0].rect.y -= (this.duration / 2) 
                    this.parts[1].rect.y += (this.duration / 2) 
                } else {
                    this.finish = true
                    // remove from destination scene
                    const i = this.scenes.to.groups.indexOf(this)
                    this.scenes.to.groups.splice(i,1)
                }
                break;
        }
        
    }
}