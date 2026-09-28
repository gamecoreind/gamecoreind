import { Input } from "./event.js"
import { Size2D } from "./math.js"
import { Rect } from "./rect.js"
import { Scene } from "./scene.js"
import { Surface } from "./surface.js"
import { Transition } from "./transition.js"

export class Display {
    constructor(canvas,size = [1920,1080],scene = null,fillColor = "black") {
        DISPLAY = this
        this.snap = true
        this.canvas = canvas
        this.sizeData = new Size2D(...size)
        this.context2D = canvas.getContext("2d")
        this.fillColor = fillColor
        this.currentScene = scene
        this.sceneTransition = null
        this.process = {}
        this.resizeCanvas(this.sizeData.size)
        this._EventSetup()
        
    // GET
    }
    get width() {
        return this.sizeData.w
    }
    get height() {
        return this.sizeData.h
    }
    get scene() {
        return this.currentScene
    }
    // SET
    set width(v) {
        this.sizeData.w = v
    }
    set height(v) {
        this.sizeData.h = v
    }
    set scene(scn) {
        if (scn instanceof Scene) {
            if (this.currentScene) {
                if (this.sceneTransition instanceof Transition) {
                    const currentCanvas = new Surface(...this.sizeData.size)
                    currentCanvas.blit(this.canvas,[0,0])
                    this.sceneTransition.fromTo(currentCanvas,this.currentScene,scn)
                    scn.addGroup(this.sceneTransition)
                }
            }
            this.currentScene = scn
            scn.startEvent()
        }
    }
    
    // 
    getRect(x=0,y=0) {
        return new Rect(x,y,this.width,this.height)
    }
    update() {
        if (this.scene) {
            this.scene.update()
        }
        
        this.updateProcess()
        Input.update()
    }
    draw() {
        this.clear()
        if (this.scene) {
            this.scene.draw(this.context2D)
        }
    }
    clear() {
        this.context2D.fillStyle = this.fillColor
        this.context2D.fillRect(0, 0, this.width, this.height)
    }
    _EventSetup() {
        window.addEventListener("resize", () => this.resizeCanvas(this.sizeData.size))

        this.canvas.addEventListener("pointermove", (event) => {
            const rect = canvas.getBoundingClientRect();
            Input.mouse.x =
                (event.clientX - rect.left) *
                (this.width / rect.width);
            Input.mouse.y =
                (event.clientY - rect.top) *
                (this.height / rect.height);
        })

        // mouse & pointer Events
        const getButton = (button) => {
            switch (button) {
                case 0:
                    return Input.mouse.left
                case 1:
                    return Input.mouse.middle
                case 2:
                    return Input.mouse.right
            }
        }
        this.canvas.addEventListener("pointerdown",e => {
            const button = getButton(e.button)
            button.down = true
            button.pressed = true
        })
        this.canvas.addEventListener("pointerup",e => {
            const button = getButton(e.button)
            button.down = false
            button.released = true
        })
    }

    // canvas resize
    resizeCanvas(size) {
        const width = size[0]
        const height = size[1]
        const canvasScale = Math.min(
            window.innerWidth / width,
            window.innerHeight / height
        );
        this.canvas.width = width
        this.canvas.height = height
        if (this.snap) {
            this.canvas.style.width = `${width * canvasScale}px`
            this.canvas.style.height = `${height * canvasScale}px`
        }  
    }

    // start game
    run() {
        gameStart()
    }

    // external process
    addProcess(name,func) {
        this.process[name] = {cmd:func,pause:false}
    }
    deleteProcess(name) {
        delete this.process[name]
    }
    pauseProcess(name,toggle = true) {
        this.process[name].pause = toggle
    }
    updateProcess() {
        for (const item of Object.entries(this.process)) {
            if (!item[1].pause) {
                item[1].cmd()
            }
        }
    }
}
export var DISPLAY = undefined

function gameStart() {
    DISPLAY.draw()
    DISPLAY.update()
    requestAnimationFrame(gameStart)
}
