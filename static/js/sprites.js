import { loadImage } from "./engine/surface.js"
import { imagePath } from "./path.js"

export const Sprites = {
    bg:{
        start: await loadImage(imagePath("bg/start.png")),
        leaf: await loadImage(imagePath("bg/leaf.png")),
        kitchen: await loadImage(imagePath("bg/kitchen.png")),
        tablecloth:await loadImage(imagePath("bg/tablecloth.png")),
        baking: {
            oven : [
                await loadImage(imagePath(`bg/baking/oven_0.png`)),
                await loadImage(imagePath(`bg/baking/oven_1.png`)),
                await loadImage(imagePath(`bg/baking/oven_2.png`)),
                await loadImage(imagePath(`bg/baking/oven_3.png`)),
                await loadImage(imagePath(`bg/baking/oven_4.png`)),
            ],
            ready : await loadImage(imagePath(`bg/baking/ready.png`))
        },
        doughing: {
            bg:await loadImage(imagePath(`bg/doughing/bg.png`)),
            table:await loadImage(imagePath(`bg/doughing/table.png`))
        }
    },
    ui:{
        startButton: {
            default: await loadImage(imagePath("ui/start/default.png")),
            hover: await loadImage(imagePath("ui/start/hover.png")),
            press: await loadImage(imagePath("ui/start/press.png")),
        },
        nextButton: {
            default: await loadImage(imagePath("ui/next/default.png")),
            hover: await loadImage(imagePath("ui/next/hover.png")),
            press: await loadImage(imagePath("ui/next/press.png")),
        },
        bgm:{
            play: await loadImage(imagePath("ui/bgm/play.png")),
            pause: await loadImage(imagePath("ui/bgm/pause.png"))
        },
        bakeButton: await loadImage(imagePath("ui/bake.png")),
        logo : await loadImage(imagePath("ui/logo.png")),
        back : await loadImage(imagePath("ui/back.png")),
        pointing : await loadImage(imagePath("ui/pointing.png")),


    },
    numbers:{
        1:await loadImage(imagePath('numbers/1.png')),
        2:await loadImage(imagePath('numbers/2.png')),
        3:await loadImage(imagePath('numbers/3.png')),
        4:await loadImage(imagePath('numbers/4.png')),
        5:await loadImage(imagePath('numbers/5.png')),
        6:await loadImage(imagePath('numbers/6.png')),
        7:await loadImage(imagePath('numbers/7.png')),
        8:await loadImage(imagePath('numbers/8.png')),
        9:await loadImage(imagePath('numbers/9.png')),
    },
    dialog:{
        char_text: await loadImage(imagePath("dialog/char_text.png")),
        char : await loadImage(imagePath("dialog/char.png")),
        sign : await loadImage(imagePath("dialog/sign.png"))
    },
    item:{
        bowl:{
            stir:[
                await loadImage(imagePath(`item/bowl/stir/1.png`)),
                await loadImage(imagePath(`item/bowl/stir/2.png`)),
                await loadImage(imagePath(`item/bowl/stir/3.png`))
            ],
            doughing:[
                await loadImage(imagePath(`item/bowl/1.png`)),
                await loadImage(imagePath(`item/bowl/2.png`)),
                await loadImage(imagePath(`item/bowl/3.png`)),
                await loadImage(imagePath(`item/bowl/4.png`)),
                await loadImage(imagePath(`item/bowl/5.png`)),
                await loadImage(imagePath(`item/bowl/6.png`)),
            ],
            dough:await loadImage(imagePath(`item/bowl/dough.png`)),
        },
        mold:{
            top:{
                empty:await loadImage(imagePath(`item/mold/1.png`)),
                fill:await loadImage(imagePath(`item/mold/2.png`))
            },
            side:await loadImage(imagePath(`item/mold/side.png`))
        },
        kemojo:{
            full:await loadImage(imagePath(`item/kemojo/full.png`)),
            opt_2:await loadImage(imagePath(`item/kemojo/2.png`)),
            opt_4:await loadImage(imagePath(`item/kemojo/4.png`)),
            opt_8:await loadImage(imagePath(`item/kemojo/8.png`)),
        },
        egg:await loadImage(imagePath(`item/egg.png`)),
        flour:await loadImage(imagePath(`item/flour.png`)),
        pandan:await loadImage(imagePath(`item/pandan.png`)),
        coconut_milk:await loadImage(imagePath(`item/coconut_milk.png`)),
        sugar:await loadImage(imagePath(`item/sugar.png`)),
        wisk:await loadImage(imagePath(`item/wisk.png`)),
    }
}