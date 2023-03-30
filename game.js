kaboom({
    global:true,
    fullscreen:true,
    scale: 1.5,
    debug: true,
    clearColor:[0,0,0,1]
})

// loadSprite('coin', )
loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')

const MOVE_SPEED = 120
const JUMP_FORCE = 10

scene("game", ()=> {
    layers(['bg', 'obj', 'ui'],'obj')

    const map = [
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '        %      =*=%=                           ',
        '                                               ',
        '                                               ',
        '                                               ',
        '                                   -+          ',
        '                         ^  ^      ()          ',
        '=====================================    ======',
    ]
    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block', solid())],
        '$': [sprite('coin', solid())],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
        '^': [sprite('evil-shroom'), solid()],
        '#': [sprite('mushroom'), solid()],
        
    }

    const gameLevel = addLevel(map, levelCfg)

    const scoreLabel = add([
        text('test'), 
        pos(30, 6),
        layer("ui"),
        {
            value:'test',
        }
    ])

    add([text('level ' + 'test', pos(4,6))])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    // deltatime between the 2 frames
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig(){
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                timer = 0
                isBig = false
            },
            biggify() {
                this.scale = vec2(2)
                timer = time
                isBig = true
            }

        }
    }
    
    const player = add([
        sprite('mario'), solid(), 
        pos(30,0),
        body(),
        big(),
        origin('bot')
    ])

    keyDown('left', ()=> {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', ()=> {
        player.move(MOVE_SPEED, 0)
    })
    
    keyPress('space', ()=>{
        if(player.grounded()){
            player.jump(JUMP_FORCE)
        }
    })
})

start("game")