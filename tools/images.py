"""Produit les icônes du site et l'image d'aperçu pour les partages (LinkedIn, messageries).

    python tools/images.py
Écrit dans public/ : favicon.ico, logo192.png, logo512.png, apple-touch-icon.png, apercu.png.
Style sobre, façon papier : initiales en Georgia, noir sur blanc cassé.
"""
import pathlib

from PIL import Image, ImageDraw, ImageFont

RACINE = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = RACINE / "public"
POLICES = pathlib.Path("C:/Windows/Fonts")
ENCRE, GRIS, PAPIER = "#1c1c1c", "#5e5e5e", "#fffefb"


def police(nom, taille):
    return ImageFont.truetype(str(POLICES / nom), taille)


def icone(taille):
    im = Image.new("RGB", (taille, taille), PAPIER)
    d = ImageDraw.Draw(im)
    f = police("georgia.ttf", int(taille * 0.5))
    texte = "SS"
    l, h, r, b = d.textbbox((0, 0), texte, font=f)
    d.text(((taille - (r - l)) / 2 - l, (taille - (b - h)) / 2 - h - taille * 0.03), texte, font=f, fill=ENCRE)
    y = int(taille * 0.78)
    d.line([(taille * 0.22, y), (taille * 0.78, y)], fill=ENCRE, width=max(1, taille // 40))
    return im


for taille, nom in [(192, "logo192.png"), (512, "logo512.png"), (180, "apple-touch-icon.png")]:
    icone(taille).save(PUBLIC / nom)
icone(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Image d'aperçu 1200 × 630, comme l'en-tête du CV.
L, H = 1200, 630
ap = Image.new("RGB", (L, H), PAPIER)
d = ImageDraw.Draw(ap)
d.text((90, 170), "Sevan Safarian", font=police("georgia.ttf", 92), fill=ENCRE)
d.text((94, 300), "Chargé support logiciel", font=police("georgia.ttf", 44), fill=ENCRE)
d.text((94, 370), "Odoo · Sage · EBP — Valence (Drôme)", font=police("georgia.ttf", 34), fill=GRIS)
d.line([(90, 450), (L - 90, 450)], fill=ENCRE, width=3)
d.text((94, 480), "cv.sevan.zone", font=police("georgia.ttf", 32), fill=GRIS)
photo = Image.open(RACINE / "src" / "img" / "me-portrait.png").convert("RGB").resize((256, 320))
ap.paste(photo, (L - 90 - 256, 110))
ap.save(PUBLIC / "apercu.png", optimize=True)
print("images ecrites dans", PUBLIC)
