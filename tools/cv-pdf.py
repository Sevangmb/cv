"""Produit la version imprimable du CV (HTML autonome) à partir de src/data.json.

    python tools/cv-pdf.py > cv-imprimable.html
Le HTML est ensuite converti en PDF par Gotenberg (Chromium sans tête), route
/forms/chromium/convert/html avec le fichier nommé index.html.
Même mise en page que le site : sobre, façon papier.
"""
import base64
import html
import json
import pathlib
import sys

sys.stdout.reconfigure(encoding="utf-8")
RACINE = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((RACINE / "src" / "data.json").read_text(encoding="utf-8"))
e = html.escape

photo = base64.b64encode((RACINE / "src" / "img" / "me-portrait.png").read_bytes()).decode()
linkedin = next(m["url"] for m in data["SocialMedias"] if m["icon"] == "linkedin")


def dates(role):
    if role["startDate"] == role["endDate"]:
        return role["startDate"]
    return f'{role["startDate"]} – {role["endDate"]}'


postes = []
for exp in data["Experiences"]:
    for role in exp["roles"]:
        apropos = f' — {e(exp["about"])}' if exp.get("about") else ""
        details = "".join(f"<li>{e(d)}</li>" for d in role["details"])
        postes.append(f"""
      <div class="poste">
        <div class="dates">{e(dates(role))}</div>
        <div>
          <h3>{e(role["title"])}</h3>
          <p class="ent">{e(exp["companyName"])}<span class="gris">, {e(role["location"])}{apropos}</span></p>
          <ul>{details}</ul>
        </div>
      </div>""")

competences = "".join(
    f'<dt>{e(s["Area"])}</dt><dd>{e(" · ".join(k["Name"] for k in s["SkillSet"]))}</dd>' for s in data["Skills"]
)
formation = "".join(f"<li>{e(x)}</li>" for x in data["Education"] + data["Extras"])
projets = "".join(f'<li><b>{e(p["name"])}</b> : {e(p["description"])}</li>' for p in data["Projects"])

print(f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>CV – {e(data["Name"])}</title>
<style>
  @page {{ size: A4; margin: 14mm 16mm; }}
  * {{ box-sizing: border-box; }}
  body {{ font-family: Charter, "Bitstream Charter", "DejaVu Serif", Georgia, serif; color: #1c1c1c;
         font-size: 9.6pt; line-height: 1.4; margin: 0; }}
  header {{ display: flex; justify-content: space-between; align-items: flex-start;
           padding-bottom: 10px; border-bottom: 1.5px solid #1c1c1c; }}
  h1 {{ font-size: 22pt; font-weight: normal; margin: 0; }}
  .titre {{ font-size: 12pt; margin: 3px 0 1px; }}
  .gris {{ color: #5e5e5e; }}
  header img {{ width: 72px; height: 90px; object-fit: cover; }}
  .profil {{ margin: 12px 0 0; }}
  h2 {{ font-size: 8pt; font-weight: normal; text-transform: uppercase; letter-spacing: .18em; color: #5e5e5e;
       margin: 16px 0 8px; padding-bottom: 3px; border-bottom: 1px solid #d9d6cf; }}
  h3 {{ font-size: 10pt; margin: 0; }}
  p {{ margin: 0; }}
  .poste {{ display: grid; grid-template-columns: 88px 1fr; gap: 12px; margin-bottom: 8px; break-inside: avoid; }}
  .dates {{ color: #5e5e5e; }}
  ul {{ margin: 2px 0 0; padding-left: 14px; }}
  li {{ margin: 1px 0; }}
  dl {{ display: grid; grid-template-columns: 130px 1fr; gap: 3px 12px; margin: 0; }}
  dt {{ color: #5e5e5e; }}
  dd {{ margin: 0; }}
  .bas {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
</style></head><body>
<header>
  <div>
    <h1>{e(data["Name"])}</h1>
    <p class="titre">{e(data["Title"])}</p>
    <p class="gris">{e(data["Place"])} · cv.sevan.zone · {e(linkedin.replace("https://www.", ""))}</p>
  </div>
  <img src="data:image/png;base64,{photo}" alt="">
</header>
<p class="profil">{e(data["Profile"])}</p>
<h2>Parcours</h2>
{''.join(postes)}
<h2>Compétences</h2>
<dl>{competences}</dl>
<div class="bas">
  <div><h2>Formation</h2><ul>{formation}</ul></div>
  <div><h2>À côté</h2><ul>{projets}</ul>
  <p class="gris" style="margin-top:6px">Centres d'intérêt : {e(data["Interests"])}</p></div>
</div>
</body></html>""")
