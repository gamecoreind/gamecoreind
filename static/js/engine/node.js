import { Vector2 } from "./math.js"

export class NodeGroup {
    constructor(nodes) {
        this.nodes = []
        if (Array.isArray(nodes)) {
            this.extend(nodes)
        } else {
            this.add(nodes)
        }
        this.allow = {
            draw:true,
            update:true
        }
        this.ySort = false
    }
    extend(nodes) {
        this.nodes.push(...nodes)
    }
    add(node,index = null) {
        if (index) {
            this.nodes.splice(index,0,node)
            return
        }
        this.nodes.push(node)
    }
    update() {
        this.nodes.forEach(node => {
            if (node.allow.update) {
                node.update()
            }
        });
    }
    draw(context2D) {
        const renderNodes = Array.from(this.nodes)
        if (this.ySort) {
            renderNodes.sort((a,b) => {
                if (a.rect.bottom !== b.rect.bottom) {
                    return a.rect.bottom - b.rect.bottom;
                }
                return a.rect.centerx - b.rect.centerx;
            })
        }
        renderNodes.forEach(node => {
            if (node.allow.draw) {
                node.drawIn(context2D)
            }
        });
    }
}

export class NodeObject {
    constructor(
        sprite,
        rect,
    ) {
        this.sizeIsRectSize = true
        this.sprite = sprite
        this.rect = rect

        this.allow = {
            draw:true,
            update:true,
            showBoundingRect:false
        }
        this.rotation = {
            enable:false,
            value:0,
        }
        this.scale = {
            enable:false,
            value:{w:1,h:1},
        }
        this.pivot = new Vector2(0.5)
        
    }
    hide() {
        this.allow.draw = false
    }
    show() {
        this.allow.draw = true
    }

    drawIn(context2D) {
        context2D.save()
        if (this.rotation.enable || this.scale.enable){
            const p_x = this.rect.w * this.pivot.x
            const p_y = this.rect.h * this.pivot.y
            const posx = this.rect.x + p_x
            const posy = this.rect.y + p_y
            context2D.translate(posx,posy)

            // Rotation
            if (this.rotation.enable) {
                context2D.rotate(this.rotation.value)
            }
            // Scale
            if (this.scale.enable) {
                context2D.scale(this.scale.value.w,this.scale.value.h)
            }
            // draw
            if (this.sizeIsRectSize) {
                context2D.drawImage(this.sprite.canvas,-p_x,-p_y,...this.rect.size)
            } else {
                context2D.drawImage(this.sprite.canvas,-p_x-p_y)
            }
        } else {
            if (this.sizeIsRectSize) {
                context2D.drawImage(this.sprite.canvas,...this.rect.shape())
            } else {
                context2D.drawImage(this.sprite.canvas,...this.rect.topleft)
            }
        }
        context2D.restore()
        if (this.allow.showBoundingRect) {this.drawBoundingRect(context2D)}
    }
    update() {

    }
    drawBoundingRect(context2D) {
        context2D.strokeStyle = "red"
        context2D.lineWidth = 5
        context2D.strokeRect(...this.rect.shape())
        
    }
}
