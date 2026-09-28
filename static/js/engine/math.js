import { Rect } from "./rect.js"

export class Vector2 {
    constructor(x = 0,y = x) {
        this.x = x
        this.y = y
    }
    set(x,y=x) {
        this.x = x
        this.y = y
    }
    add(x,y=x) {
        this.x += x
        this.y += y
    }
    getDistance(vector) {
        const dx = vector.x - this.x
        const dy = vector.y - this.y

        return Math.hypot(dx, dy)
    }
    copy() {
        return new Vector2(this.x,this.y)
    }
    getRect(w=0,h=0) {
        return new Rect(this.x,this.y,w,h)
    }
    // GET
    get radian() {
        return Math.atan2(this.y,this.x)
    }
    get degree() {
        return this.radian * 180 / Math.PI
    }
    get pos() {
        return [this.x,this.y]
    }

    // SET
    set radian(value) {
        let length = Math.hypot(this.x, this.y)

        this.x = Math.cos(value) * length
        this.y = Math.sin(value) * length
    }
    set degree(value) {
        this.radian = value * Math.PI / 180
    }
    set pos(v) {
        this.x = v[0]
        this.y = v[1]
    }
}
export class Size2D {
    constructor(w,h) {
        this.w = w
        this.h = h
    }
    // GET
    get width() {
        return this.w
    }
    get height() {
        return this.h
    }
    get size() {
        return [this.w,this.h]
    }
    // SET
    set width(v) {
        this.w = v
    } 
    set height(v) {
        this.h = v
    }
    set size(v) {
        this.w = v[0]
        this.h = v[1]
    }
    copy() {
        return new Size2D(this.w,this.h)
    }
    scale(w,h=w) {
        this.w *= w
        this.h *= h
    }
    getRect(x=0,y=0) {
        return new Rect(x,y,this.w,this.h)
    }
}

export function clamp(value,min,max) {
    if (value <= min) {
        value = min
    } else if (value >= max) {
        value = max
    }
    return value
}
export class Random {
    static random() {
        return Math.random()
    }

    static range(min, max) {
        return Math.floor(
            Random.random() * (max - min + 1)
        ) + min
    }

    static float(min, max) {
        return Random.random() * (max - min) + min
    }
    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}