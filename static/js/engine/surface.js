import { Rect } from "./rect.js";

export class Surface {
    constructor(width,height) {
        this.canvas = document.createElement("canvas")
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.width = "100%";
        this.canvas.style.height = "auto";
        this.context2D = this.canvas.getContext("2d");

    }
    // GET
    get ctx() {
        return this.context2D
    }
    get size() {
        return [this.width,this.height]
    }
    get width() {
        return this.canvas.width
    }
    get height() {
        return this.canvas.height
    }
    // SET
    set width(v) {
        this.canvas.width = v
    }
    set height(v) {
        this.canvas.height = v
    }
    set size(v) {
        this.width = v[0]
        this.height = v[1]
    }
    //
    getRect(x = 0,y = 0,anchor = "topleft") {
        const rect = new Rect(0,0,...this.size)
        rect[anchor] = [x,y]
        return rect
    }
    blit(source,pos) {
        this.context2D.drawImage(source,...pos)
    }
    clear() {
        this.context2D.fillStyle = this.fillColor
        this.context2D.fillRect(0, 0, this.width, this.height)
    }
    copy() {
        const surf = new Surface(this.width,this.height)
        surf.blit(this.canvas,[0,0])
        return surf
    }
}

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const surface = new Surface(img.width, img.height);
            surface.context2D.drawImage(img, 0, 0);
            resolve(surface);
        };
        img.onerror = reject;
        img.src = src;
    });
}


