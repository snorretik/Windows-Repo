
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
bijt = False
laatstPosx = []

muisx = 10
muisy = 10
muisInVenster = False
muisRicht = 'rechts'
#katOffsetMiddenx = 85 # Om de cursor in het midden van de sprite te zetten.
#katOffsetMiddeny = 60 # Om de cursor in het midden van de sprite te zetten.
muisOffsetMiddenx = 75
muisOffsetMiddeny = 33
speling = 15
katx = 375
katy = 225
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

    # Muis(cursor) positie koppelen aan kat positie.
    #start
    # tuplKat = pygame.mouse.get_pos()
    # katx = tuplKat[0] - katOffsetMiddenx # 85
    # katy = tuplKat[1] - katOffsetMiddeny # 60
    # if (katx > (0 - katOffsetMiddenx + speling) and katx < (winBreedte - katOffsetMiddenx - speling)) and (katy > (0 - katOffsetMiddeny + speling) and katy < (winHoogte - katOffsetMiddeny - speling)): # -75, 705 en -50, -530
    #     DISPLAYSURF.blit(katImg, (katx, katy))
    # else:
    #     DISPLAYSURF.blit(katImg, (katxStart, katyStart))
    #eind

    # Muis(cursor) positie kopperen aan muis(sprite) positie.
    if dood == False:
        tuplMuis = pygame.mouse.get_pos()
        muisx = tuplMuis[0] - muisOffsetMiddenx
        muisy = tuplMuis[1] - muisOffsetMiddeny
        # muis in het venster met speling
        if (muisx > (0 - muisOffsetMiddenx + speling) and muisx < (winBreedte - muisOffsetMiddenx - speling)) and (muisy > (0 - muisOffsetMiddeny + speling) and muisy < (winHoogte - muisOffsetMiddeny - speling)):
            muisInVenster = True
        else:
            muisInVenster = False

        #laatstPosy = ''
        if muisInVenster == False:
            muisx = 10
            muisy = 10
            # Blitten?
        elif muisInVenster == True:
            if len(laatstPosx) == 0:
                laatstPosx.append(muisx)
                muisRicht = 'rechts'
                #laatstPosy.append(muisy)
            elif len(laatstPosx) == 1:
                if muisx < laatstPosx[0]:
                    muisRicht = 'links'
                elif muisx > laatstPosx[0]:
                    muisRicht = 'rechts'
                else:
                    None

                laatstPosx.append(muisx)
                laatstPosx.pop(0)

    if muisRicht == 'rechts':
        DISPLAYSURF.blit(muisImgR, (muisx, muisy))
    elif muisRicht == 'links':
        DISPLAYSURF.blit(muisImgL, (muisx, muisy))
    else:
        DISPLAYSURF.blit(muisImgR, (muisx, muisy))

    offsetTwo = (katx - muisx, katy - muisy)
    #offsetTwoTwo = (muisx - katx, muisy - katy)

    if muisRicht == 'rechts':
        result = muisMaskR.overlap(katMask, offsetTwo) # misschien omdraaien
    elif muisRicht == 'links':
        result = muisMaskL.overlap(katMask, offsetTwo)
    else:
        result = muisMaskR.overlap(katMask, offsetTwo)

    if (result) and (bijt == True):
        dood = True

        muisImgR = pygame.image.load(path.join(working_dir, 'Muis-met-rand-rechts-dood.png'))
        muisImgL = pygame.image.load(path.join(working_dir, 'Muis-met-rand-links-dood.png'))

    DISPLAYSURF.blit(katImg, (katx, katy))

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()
        if event.type == KEYDOWN: # and (dood == False):
            if event.key == pygame.K_LEFT:
                katx -= 5
                #starteind muisRicht = 'links'
            if event.key == pygame.K_RIGHT:
                katx += 5
                #starteind muisRicht = 'rechts'
            if event.key == pygame.K_UP:
                katy -= 5
            if event.key == pygame.K_DOWN:
                katy += 5
            if event.key == pygame.K_SPACE:
                bijt = True

        #start
        # if pygame.mouse.get_pressed() == (True, False, False):
        #     klik = True
        # else:
        #     klik = False
        #eind

    pygame.display.update()
    fpsClock.tick(FPS)
