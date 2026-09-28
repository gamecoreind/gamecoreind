export class Rect {
    constructor(x = 0,y = 0,w = 0,h = 0) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    shape() {
        return [this.x,this.y,this.w,this.h]
    }
    transform(x,y,w,h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    scalew(v) {
        this.w = this.w * v
    }
    scaleh(v) {
        this.h = this.h * v
    }
    scale(v) {
        this.scalew(v)
        this.scaleh(v)
    }
    copy() {
        return new Rect(...this.shape())
    }
    inflate(w,h) {
        this.w += w
        this.h += h
    }
    collidepoint(x,y) {
        return (
            x >= this.left &&
            x <= this.left + this.w &&
            y >= this.top &&
            y <= this.top + this.h
        );
    }
    colliderect(rect) {
        return (
            rect.left < this.right &&
            rect.right > this.left &&
            rect.top < this.bottom &&
            rect.bottom > this.top
        );
    }

    // GET
    get size() {
        return [this.w,this.h]
    }
    get width() {
        return this.w
    }
    get height() {
        return this.h
    }
    get top() {
        return this.y
    }
    get left() {
        return this.x
    }
    get right() {
        return this.left + this.width
    }
    get bottom() {
        return this.top + this.height
    }
    
    get centerx() {
        return this.left + this.width / 2
    }
    get centery() {
        return this.top + this.height / 2
    }
    get center() {
        return [this.centerx , this.centery]
    }
    get topleft() {
        return [this.left , this.top]
    }
    get topright() {
        return [this.right , this.top]
    }
    get bottomleft() {
        return [this.left , this.bottom]
    }
    get bottomright() {
        return [this.right , this.bottom]
    }
    get midtop() {
        return [this.centerx , this.top]
    }
    get midleft() {
        return [this.left , this.centery]
    }
    get midright() {
        return [this.right , this.centery]
    }
    get midbottom() {
        return [this.centerx , this.height]
    }

    // SET
    set size(v) {
        this.w = v[0]
        this.h = v[1]
    }
    set width(v) {
        this.w = v
    }
    set height(v) {
        this.h = v
    }
    set top(v) {
        this.y = v
    }
    set left(v) {
        this.x = v
    }
    set right(v) {
        this.x = v - this.width
    }
    set bottom(v) {
        this.y = v - this.height
    }

    set centerx(v) {
        this.x = v - this.width / 2
    }
    set centery(v) {
        this.y = v - this.height / 2
    }
    set center(v) {
        this.centerx = v[0]
        this.centery = v[1]
    }
    set topleft(v) {
        this.left = v[0]
        this.top = v[1]
    }
    set topright(v) {
        this.right = v[0]
        this.top = v[1]
    }
    set bottomleft(v) {
        this.left = v[0]
        this.bottom = v[1]
    }
    set bottomright(v) {
        this.right = v[0]
        this.bottom = v[1]
    }
    set midtop(v) {
        this.centerx = v[0]
        this.top = v[1]
    }
    set midbottom(v) {
        this.centerx = v[0]
        this.bottom = v[1]
    }
    set midleft(v) {
        this.left = v[0]
        this.centery = v[1]
    }
    set midright(v) {
        this.right = v[0]
        this.centery = v[1]
    }
}

