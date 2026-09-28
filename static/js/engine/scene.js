import { DISPLAY } from "./display.js";

export class Scene {
    constructor(groups = [],background = null) {
        this.groups = []
        this.addGroups(groups)
        this.background = background
        
    }
    addGroup(group) {
        this.groups.push(group)
    }
    addGroups(groups) {
        groups.forEach(group => {
            this.addGroup(group)
        });
    }
    draw(context2D) {
        if (this.background != null) {
            context2D.drawImage(this.background.canvas,0,0,...DISPLAY.sizeData.size)
        }
        this.groups.forEach(group => {
            if (group.allow.draw) {
                group.draw(context2D)
            }
        });
    }
    update() {
        this.groups.forEach(group => {
            if (group.allow.update) {
                group.update()
            }
        });
    }
    startEvent() {}
}
