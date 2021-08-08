
# Write your code here :-)
# random kan ook nog
import pygame, sys, time, os
from pygame.locals import *
from os import path

pygame.init()

# FPS clock
FPS = 30
fpsClock = pygame.time.Clock()

# maak venster, grootte van venster etc
# caption in venster bovenin
winBreedte = 600
winHoogte = 400
DISPLAYSURF = pygame.display.set_mode((winBreedte, winHoogte))
pygame.display.set_caption('Kat-en-muis')

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
working_dir = path.dirname(__file__)
#muisImgRDood = pygame.image.load(path.join(working_dir, 'Muis-met-rand-rechts-dood.png'))
#muisImgLDood = pygame.image.load(path.join(working_dir, 'Muis-met-rand-links-dood.png'))
muisImgR = pygame.image.load(path.join(working_dir, 'Muis-met-rand-rechts.png')).convert_alpha()
muisImgL = pygame.image.load(path.join(working_dir, 'Muis-met-rand-links.png')).convert_alpha()
katImg = pygame.image.load(path.join(working_dir, 'Kat-met-rand.png')).convert_alpha()

muisMaskR = pygame.mask.from_surface(muisImgR)
muisMaskL = pygame.mask.from_surface(muisImgL)
#muisRectR = muisImgR.get_rect()
#muisRectL = muisImgL.get_rect()
katMask = pygame.mask.from_surface(katImg)
#katRect = katImg.get_rect()

dood = False

muisx = 375
muisy = 250
muisRicht = 'rechts'
katOffsetMuisx = 85 # Om de cursor in het midden van de sprite te zetten.
katOffsetMuisy = 60 # Om de cursor in het midden van de sprite te zetten.
speling = 15
katxStart = 10
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

# main game loop
# event handling
# blitting
# pygame quit before sys exit
# display update
# clock
while True:
    DISPLAYSURF.fill(WHITE)
    #if dood == False:
    #    DISPLAYSURF.fill(WHITE)
    #else:
    #    DISPLAYSURF.fill(RED)

    # Beginnen met checken van overlap
    #if overlap:
    #    if muisRicht == 'rechts':
    #        muisRicht = 'links'
    #    elif muisRicht == 'links':
    #        muisRicht = 'rechts'

    # Een van de twee afbeeldingen kiezen o.b.v. richting
    if muisRicht == 'rechts':
        DISPLAYSURF.blit(muisImgR, (muisx, muisy))
    elif muisRicht == 'links':
        DISPLAYSURF.blit(muisImgL, (muisx, muisy))
    else:
        DISPLAYSURF.blit(muisImgR, (muisx, muisy))

    # Muis(cursor) positie koppelen aan kat positie.
    tuplKat = pygame.mouse.get_pos()
    katx = tuplKat[0] - katOffsetMuisx # 85
    katy = tuplKat[1] - katOffsetMuisy # 60
    if (katx > (0 - katOffsetMuisx + speling) and katx < (winBreedte - katOffsetMuisx - speling)) and (katy > (0 - katOffsetMuisy + speling) and katy < (winHoogte - katOffsetMuisy - speling)): # -75, 705 en -50, -530
        DISPLAYSURF.blit(katImg, (katx, katy))
    else:
        DISPLAYSURF.blit(katImg, (katxStart, katyStart))

    offsetTwo = (katx - muisx, katy - muisy)
    #offsetTwoTwo = (muisx - katx, muisy - katy)

    if muisRicht == 'rechts':
        result = muisMaskR.overlap(katMask, offsetTwo) # misschien omdraaien
    elif muisRicht == 'links':
        result = muisMaskL.overlap(katMask, offsetTwo)
    else:
        result = muisMaskR.overlap(katMask, offsetTwo)

    if result:
        dood = True

        muisImgR = pygame.image.load(path.join(working_dir, 'Muis-met-rand-rechts-dood.png'))
        muisImgL = pygame.image.load(path.join(working_dir, 'Muis-met-rand-links-dood.png'))

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()
        if (event.type == pygame.KEYDOWN) and (dood == False):
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
##            if event.key == pygame.K_SPACE and catInPos():
##                muisx = 18
##                muisy = 200

    pygame.display.update()
    fpsClock.tick(FPS)
