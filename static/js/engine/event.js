
class PointerButtonState {
    constructor() {
        this.down = false
        this.pressed = false
        this.released = false
    }
    beginFrame() {
        this.pressed = false
        this.released = false
    }
}

export class Input {
    // pointer or mouse
    static mouse = {
        x:0,
        y:0,
        left:new PointerButtonState(),
        middle:new PointerButtonState(),
        right:new PointerButtonState(),

        getPos:function() {
            return [this.x,this.y]
        },

        update:function() {
            this.left.beginFrame()
            this.middle.beginFrame()
            this.right.beginFrame()
        },
        buttons() {
            return [this.left,this.middle,this.right]
        },
        down(button = 0) {
            return this.buttons()[button].down
        },
        pressed(button = 0) {
            return this.buttons()[button].pressed
        },
        released(button = 0) {
            return this.buttons()[button].released
        }
    }
    static key = {
        maps:new Map(), // "keyCode":{down:boolean,pressed:boolean,released:boolean}
        down:function (keyCode) {
            return this.maps.get(keyCode)[0]
        },
        pressed:function (keyCode) {
            return this.maps.get(keyCode)[1]
        },
        released:function (keyCode) {
            return this.maps.get(keyCode)[2]
        },
        update:function () {

        }
    }
    static update() {
        this.mouse.update()
        this.key.update()
    }
}
