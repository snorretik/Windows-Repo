# Write your code here :-)
# random kan ook nog
import pygame, sys, time
from pygame.locals import *

pygame.init()

# FPS clock
FPS = 30
fpsClock = pygame.time.Clock()

# maak venster, grootte van venster etc
# caption in venster bovenin
winBreedte = 800
winHoogte = 600
DISPLAYSURF = pygame.display.set_mode((winBreedte, winHoogte))
pygame.display.set_caption('Cat teleport')

# eventuele kleuren
# 255, 255, 255
# transparantie 4de argument (optioneel), convert_alpha
# color objects
# individuele pixels, pixel array... maar lock, dus delete pixelarray
# load image
WHITE = (255, 255, 255)
BLACK = (  0,   0,   0)
GREEN = (  0, 255,   0)
RED   = (255,   0,   0)
muisImgR = pygame.image.load('Muis-met-rand-rechts.png')
muisImgL = pygame.image.load('Muis-met-rand-links.png')
katImg = pygame.image.load('Kat-met-rand.png')
muisx = 10
muisy = 10
muisRicht = 'rechts'
katOffsetx = 85 # Om de cursor in het midden van de sprite te zetten.
katOffsety = 60 # Om de cursor in het midden van de sprite te zetten.
speling = 15
katxStart = 500
katyStart = 10
pygame.key.set_repeat(1, 10)

# fonts
# 1 font object
# 2 object.render
# 3 (object.render).get_rect()
# 4 position rect
# 5 blit (eigenlijk verder naar onder)
# 6 update (eigenlijk verder naar onder)

# sound
# 1 soundObj
# 2 play method
# 3 stop method
# 4 eventueel timer
# ---
# background sound
# 1 load
# 2 play
# 3 -1 to loop forever
# 4 stop

# ...
# def functie
# function calls method calls
# surface object, rect

# def catInPos():
#     if muisx > 230 and muisx < 280:
#         if muisy > -2 and muisy < 50:
#             return True

# main game loop
# event handling
# blitting
# pygame quit before sys exit
# display update
# clock
while True:
    DISPLAYSURF.fill(WHITE)

    # Maakt groene vak
    # pygame.draw.line(DISPLAYSURF, GREEN, (250, 10), (390, 10), 4)
    # pygame.draw.line(DISPLAYSURF, GREEN, (390, 10), (390, 110), 4)
    # pygame.draw.line(DISPLAYSURF, GREEN, (390, 110), (250, 110), 4)

    # Maakt rode vak
    # pygame.draw.line(DISPLAYSURF, RED, (10, 190), (10, 290), 4)
    # pygame.draw.line(DISPLAYSURF, RED, (10, 290), (175, 290), 4)
    # pygame.draw.line(DISPLAYSURF, RED, (175, 290), (175, 190), 4)

    # Een van de twee afbeeldingen kiezen o.b.v. richting
    if muisRicht == 'rechts':
        DISPLAYSURF.blit(muisImgR, (muisx, muisy))
    elif muisRicht == 'links':
        DISPLAYSURF.blit(muisImgL, (muisx, muisy))
    else:
        DISPLAYSURF.blit(muisImgR, (muisx, muisy))

    # Muis(cursor) positie koppelen aan kat positie.
    tuplKat = pygame.mouse.get_pos()
    katx = tuplKat[0] - katOffsetx # 85
    katy = tuplKat[1] - katOffsety # 60
    if (katx > (0 - katOffsetx + speling) and katx < (winBreedte - katOffsetx - speling)) and (katy > (0 - katOffsety + speling) and katy < (winHoogte - katOffsety - speling)): # -75, 705 en -50, -530
        DISPLAYSURF.blit(katImg, (katx, katy))
    else:
        DISPLAYSURF.blit(katImg, (katxStart, katyStart))

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                muisx -= 5
                muisRicht = 'links'
            if event.key == pygame.K_RIGHT:
                muisx += 5
                muisRicht = 'rechts'
            if event.key == pygame.K_UP:
                muisy -= 5
            if event.key == pygame.K_DOWN:
                muisy += 5
            # if event.key == pygame.K_SPACE and catInPos():
            #     muisx = 18
            #     muisy = 200

    pygame.display.update()
    fpsClock.tick(FPS)