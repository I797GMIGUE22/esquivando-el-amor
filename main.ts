let player = game.createSprite(2, 4)
class Contador {
    numero: number
    constructor(initial: number = 0) {
        this.numero = initial
    }
    
    public add() {
        this.numero += 1
    }
    
    public showNumber(): number {
        return this.numero
    }
    
}

class CrearAsteroid {
    x: number
    roca: game.LedSprite
    constructor() {
        this.x = randint(player.x() - 1, player.x() + 1) || randint(0, 4)
        this.roca = game.createSprite(this.x, 0)
    }
    
    public bajando() {
        if (this.roca.y() != 4) {
            basic.pause(200 - counter.showNumber())
            this.roca.set(LedSpriteProperty.Y, this.roca.y() + 1)
        } else if (this.roca.y() == 4) {
            basic.pause(100)
            this.roca.delete()
        }
        
    }
    
    public colisiones() {
        if (player.isTouching(this.roca)) {
            music.stopMelody(MelodyStopOptions.All)
            game.gameOver()
        } else {
            return
        }
        
    }
    
}

let counter = new Contador()
input.onButtonPressed(Button.B, function moveRight() {
    player.move(1)
})
input.onButtonPressed(Button.A, function moveLeft() {
    player.move(-1)
})
function asteroides() {
    let asteroid = new CrearAsteroid()
    basic.pause(400)
    loops.everyInterval(0, function loopAsteroides() {
        asteroid.bajando()
        asteroid.colisiones()
    })
}

loops.everyInterval(2000, function sumarContador() {
    if (game.isGameOver() != true) {
        counter.add()
        game.addScore(1)
    }
    
})
loops.everyInterval(0, function musica() {
    if (game.isGameOver() != true) {
        music.setVolume(127)
        for (let index = 0; index < 2; index++) {
            music.playMelody("E B F A E G B G ", 170)
            music.playMelody("E B F A E A B A ", 170)
        }
        music.playMelody("C5 C5 B A G F E D ", 170)
        music.playMelody("G G F E F E F E ", 170)
        music.playMelody("C5 C5 B A G F G C ", 170)
        music.playMelody("E C G F B A - C5 ", 170)
        music.playMelody("B A C5 A E F A E ", 170)
        music.playMelody("C E G D A E G D ", 170)
    }
    
})
basic.forever(function on_forever() {
    asteroides()
})
