player = game.createSprite(2, 4)
class Contador():
    def __init__(self, initial = 0):
        self.numero = initial
    def add(self):
        self.numero += 1
    def showNumber(self):
        return self.numero;
class CrearAsteroid():
    def __init__(self):
        self.x = randint(player.x() - 1, player.x() + 1) or randint(0, 4)
        self.roca = game.create_sprite(self.x, 0)
    def bajando(self):
        if (self.roca.y() != 4 ):
            basic.pause(200 - counter.showNumber())
            self.roca.set(LedSpriteProperty.Y, self.roca.y() + 1)
        elif (self.roca.y() == 4):
            basic.pause(100)
            self.roca.delete()
    def colisiones(self):
        if (player.is_touching(self.roca)):
            music.stop_melody(MelodyStopOptions.ALL)
            game.game_over()
        else:
            return
counter = Contador();
def moveRight():
    player.move(1)
input.onButtonPressed(Button.B, moveRight)

def moveLeft():
    player.move(-1)
input.on_button_pressed(Button.A, moveLeft)


def asteroides():
    asteroid = CrearAsteroid()
    basic.pause(400)
    def loopAsteroides():
        asteroid.bajando()
        asteroid.colisiones()
    loops.every_interval(0, loopAsteroides)

def sumarContador():
    if (game.is_game_over() != True):
        counter.add()
        game.add_score(1)
loops.every_interval(2000, sumarContador)

def musica():
    if (game.is_game_over() != True):
        music.set_volume(127)
        for index in range(2):
            music.play_melody("E B F A E G B G ", 170)
            music.play_melody("E B F A E A B A ", 170)
        music.play_melody("C5 C5 B A G F E D ", 170)
        music.play_melody("G G F E F E F E ", 170)
        music.play_melody("C5 C5 B A G F G C ", 170)
        music.play_melody("E C G F B A - C5 ", 170)
        music.play_melody("B A C5 A E F A E ", 170)
        music.play_melody("C E G D A E G D ", 170)
loops.every_interval(0, musica)

def on_forever():
    asteroides();
basic.forever(on_forever)