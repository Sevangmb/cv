"""Produit la version imprimable du CV (HTML autonome) à partir de src/data.json.

Le HTML est ensuite converti en PDF par Gotenberg (Chromium sans tête) :
    python tools/cv-pdf.py > cv-imprimable.html
puis envoi à Gotenberg (route /forms/chromium/convert/html, fichier nommé index.html).
"""
import base64
import html
import json
import mimetypes
import pathlib
import sys

sys.stdout.reconfigure(encoding="utf-8")

RACINE = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((RACINE / "src" / "data.json").read_text(encoding="utf-8"))
LOGOS = {
    "herbarom": "herbarom.png", "axess": "axess.svg", "ape-conseil": "ape-conseil.svg",
    "tereva": "tereva.jpg", "brossette": "brossette.png", "teleperformance": "teleperformance.svg",
    "inforc": "inforc.svg",
}


def image(chemin):
    fichier = RACINE / "src" / "img" / chemin
    type_mime = mimetypes.guess_type(fichier.name)[0] or "image/svg+xml"
    return f"data:{type_mime};base64,{base64.b64encode(fichier.read_bytes()).decode()}"


e = html.escape
linkedin = next(m["url"] for m in data["SocialMedias"] if m["icon"] == "linkedin")

postes = []
for exp in data["Experiences"]:
    logo = ""
    if exp.get("logo"):
        fond = exp.get("logoBg", "#fff")
        logo = f'<img class="logo" style="background:{fond}" src="{image("logos/" + LOGOS[exp["logo"]])}" alt="">'
    for role in exp["roles"]:
        # Les postes d'avant 2008 gardent leurs trois points principaux, pour tenir sur deux pages.
        garder = 3 if role["startDate"][-4:] < "2008" else None
        details = "".join(f"<li>{e(d)}</li>" for d in role.get("details", [])[:garder])
        dates = role["startDate"] if role["startDate"] == role["endDate"] or role["endDate"] == role["startDate"] else f'{role["startDate"]} – {role["endDate"]}'
        postes.append(f"""
        <article class="poste">
          <div class="tete">
            <div><h3>{e(role["title"])}</h3>
            <p class="ent">{e(exp["companyName"])} · {e(role["location"])}</p></div>
            <div class="droite">{logo}<p class="dates">{e(dates)}</p></div>
          </div>
          <p class="apropos">{e(exp.get("about", ""))}</p>
          <ul>{details}</ul>
        </article>""")

competences = "".join(
    f'<section class="bloc"><h4>{e(s["Area"])}</h4><ul>'
    + "".join(f"<li>{e(k['Name'])}</li>" for k in s["SkillSet"])
    + "</ul></section>"
    for s in data["Skills"]
)
projets = "".join(
    f'<li><b>{e(p["name"])}</b> — {e(p["description"].split(" : ")[0].split(" — ")[0].rstrip("."))}.</li>' for p in data["Projects"]
)

print(f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>CV – Sevan Safarian</title>
<style>
  @page {{ size: A4; margin: 12mm 12mm 14mm; }}
  * {{ box-sizing: border-box; }}
  body {{ font-family: "Helvetica", "Arial", sans-serif; color: #24343a; font-size: 9pt; line-height: 1.32; margin: 0; }}
  .bandes div {{ height: 4px; }}
  header {{ display: flex; gap: 14px; align-items: center; margin: 8px 0 10px; }}
  header img {{ width: 74px; height: 94px; object-fit: cover; border-radius: 4px; }}
  h1 {{ margin: 0; font-size: 22pt; color: #4f8a8b; }}
  .titre {{ font-size: 11.5pt; margin: 2px 0 4px; }}
  .contact {{ color: #5b6b70; font-size: 9pt; }}
  .grille {{ display: grid; grid-template-columns: 1fr 2.15fr; gap: 16px; }}
  h2 {{ font-size: 11pt; color: #4f8a8b; border-bottom: 2px solid #ffcb74; padding-bottom: 2px; margin: 8px 0 6px; text-transform: uppercase; letter-spacing: .04em; }}
  .bloc h4 {{ margin: 6px 0 2px; font-size: 9.6pt; }}
  ul {{ margin: 2px 0 0; padding-left: 14px; }}
  li {{ margin: 1px 0; }}
  .poste {{ break-inside: avoid; margin-bottom: 6px; }}
  .tete {{ display: flex; justify-content: space-between; gap: 8px; }}
  h3 {{ margin: 0; font-size: 10.4pt; }}
  .ent {{ margin: 0; color: #4f8a8b; font-weight: 600; }}
  .droite {{ text-align: right; flex-shrink: 0; }}
  .logo {{ max-height: 20px; max-width: 90px; padding: 2px 4px; border-radius: 3px; }}
  .dates {{ margin: 0; color: #5b6b70; font-size: 8.8pt; white-space: nowrap; }}
  .apropos {{ margin: 1px 0 0; color: #5b6b70; font-style: italic; font-size: 8.8pt; }}
  .resume {{ margin: 0 0 4px; }}
</style></head><body>
<div class="bandes"><div style="background:#ffcb74"></div><div style="background:#ea907a"></div><div style="background:#4f8a8b"></div></div>
<header>
  <img src="{image('me.png')}" alt="">
  <div>
    <h1>Sevan Safarian</h1>
    <p class="titre">Chargé support logiciel · ERP Odoo, Sage, EBP</p>
    <p class="contact">Valence (Drôme) · cv.sevan.zone · {e(linkedin.replace('https://www.', ''))} · github.com/Sevangmb</p>
  </div>
</header>
<div class="grille">
  <aside>
    <h2>Profil</h2>
    <p class="resume">Vingt-cinq ans entre l'informatique, la formation et la relation client. J'accompagne
    aujourd'hui les équipes d'Herbarom sur l'ERP Odoo, après des années de formation et de support
    sur Sage et EBP, dix ans de vente technique chez Brossette et Téréva, et trois ans de hotline à Montréal.</p>
    <h2>Compétences</h2>
    {competences}
  </aside>
  <main>
    <h2>Parcours</h2>
    {''.join(postes)}
    <h2>Projets personnels</h2>
    <ul>{projets}</ul>
  </main>
</div>
</body></html>""")
