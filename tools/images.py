"""Produit les icônes du site et l'image d'aperçu pour les partages (LinkedIn, messageries).

    python tools/images.py
Écrit dans public/ : favicon.ico, logo192.png, logo512.png, apple-touch-icon.png, apercu.png.
Polices : Arial gras et Consolas, présentes sous Windows.
"""
import pathlib

from PIL import Image, ImageDraw, ImageFont

RACINE = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = RACINE / "public"
POLICES = pathlib.Path("C:/Windows/Fonts")
SARCELLE, SABLE, CORAIL, FOND = "#4f8a8b", "#ffcb74", "#ea907a", "#f4f6ff"


def police(nom, taille):
    return ImageFont.truetype(str(POLICES / nom), taille)


def icone(taille):
    """Un écran de télé rétro avec « S_ » dedans, comme l'illustration de l'accueil."""
    im = Image.new("RGBA", (taille, taille), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    m = taille * 0.06
    d.rounded_rectangle([m, m, taille - m, taille - m], radius=taille * 0.2, fill=CORAIL)
    e = taille * 0.17
    d.rounded_rectangle([e, e, taille - e, taille - e], radius=taille * 0.14, fill=SARCELLE)
    f = police("consolab.ttf", int(taille * 0.42))
    texte = "S_"
    l, h, r, b = d.textbbox((0, 0), texte, font=f)
    d.text(((taille - (r - l)) / 2 - l, (taille - (b - h)) / 2 - h), texte, font=f, fill=SABLE)
    return im


for taille, nom in [(192, "logo192.png"), (512, "logo512.png"), (180, "apple-touch-icon.png")]:
    icone(taille).save(PUBLIC / nom)
icone(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Image d'aperçu 1200 × 630 : bandes de couleur, photo, nom et métier.
L, H = 1200, 630
ap = Image.new("RGB", (L, H), FOND)
d = ImageDraw.Draw(ap)
for y, hauteur, couleur in [(70, 18, SABLE), (88, 34, CORAIL), (122, 70, SARCELLE)]:
    d.rectangle([0, y, L, y + hauteur], fill=couleur)
photo = Image.open(RACINE / "src" / "img" / "me.png").convert("RGBA")
photo = photo.resize((int(photo.width * 300 / photo.height), 300))
ap.paste(photo, (80, 40), photo)
d.text((80, 380), "Sevan Safarian", font=police("arialbd.ttf", 78), fill=SARCELLE)
d.text((84, 475), "Chargé support logiciel · ERP Odoo, Sage, EBP", font=police("arial.ttf", 38), fill="#24343a")
d.text((84, 535), "Valence (Drôme)  ·  cv.sevan.zone", font=police("consola.ttf", 30), fill="#5b6b70")
ap.paste(icone(220), (L - 300, 330), icone(220))
ap.save(PUBLIC / "apercu.png", optimize=True)
print("images écrites dans", PUBLIC)
