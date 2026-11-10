import React, { useEffect, useState } from 'react';
import './cv.css';
import data from './data';
import Me from './img/me-portrait.webp';
import Terminal from './components/Terminal';

export const PDF_URL = `${process.env.PUBLIC_URL}/Sevan_Safarian_CV.pdf`;

const dates = role => (role.startDate === role.endDate ? role.startDate : `${role.startDate} – ${role.endDate}`);

const Poste = ({ experience, role }) => (
  <div className="poste">
    <div className="poste-dates">{dates(role)}</div>
    <div className="poste-corps">
      <h3>{role.title}</h3>
      <p className="poste-entreprise">
        {experience.url
          ? <a href={experience.url} target="_blank" rel="noopener noreferrer">{experience.companyName}</a>
          : experience.companyName}
        <span className="discret">, {role.location}{experience.about ? ` — ${experience.about}` : ''}</span>
      </p>
      <ul>
        {role.details.map(detail => <li key={detail}>{detail}</li>)}
      </ul>
    </div>
  </div>
);

const App = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Le terminal reste caché : touche « ² » ou « ` », ou le lien discret du bas de page.
  useEffect(() => {
    const onKey = event => {
      const cible = event.target.tagName;
      if ((event.key === '²' || event.key === '`') && cible !== 'INPUT' && cible !== 'TEXTAREA') {
        event.preventDefault();
        setTerminalOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="page">
      <header className="entete">
        <div>
          <h1>{data.Name}</h1>
          <p className="titre">{data.Title}</p>
          <p className="discret">{data.Place}</p>
          <p className="liens">
            {data.SocialMedias.map(m => (
              <a key={m.icon} href={m.url} target="_blank" rel="noopener noreferrer">{m.label}</a>
            ))}
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer">CV en PDF</a>
          </p>
        </div>
        <img className="portrait" src={Me} alt="Sevan Safarian" width="120" height="150" />
      </header>

      <main id="contenu">
        <section id="profil">
          <p className="profil">{data.Profile}</p>
        </section>

        <section id="parcours">
          <h2>Parcours</h2>
          {data.Experiences.map(experience => experience.roles.map(role => (
            <Poste key={`${experience.companyName}-${role.title}`} experience={experience} role={role} />
          )))}
        </section>

        <section id="competences">
          <h2>Compétences</h2>
          <dl className="competences">
            {data.Skills.map(skill => (
              <React.Fragment key={skill.Area}>
                <dt>{skill.Area}</dt>
                <dd>{skill.SkillSet.map(k => k.Name).join(' · ')}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        <section id="formation">
          <h2>Formation</h2>
          <ul className="simple">
            {data.Education.map(line => <li key={line}>{line}</li>)}
          </ul>
          <ul className="simple">
            {data.Extras.map(line => <li key={line}>{line}</li>)}
          </ul>
        </section>

        <section id="projets">
          <h2>À côté</h2>
          <ul className="simple">
            {data.Projects.map(p => (
              <li key={p.name}>
                {p.url
                  ? <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
                  : <strong>{p.name}</strong>}
                {' : '}{p.description}
              </li>
            ))}
          </ul>
          <p className="discret">Centres d'intérêt : {data.Interests}</p>
        </section>
      </main>

      <footer className="pied">
        <p>
          Ce site est construit à partir de mon dépôt{' '}
          <a href="https://github.com/Sevangmb/cv" target="_blank" rel="noopener noreferrer">GitHub Sevangmb/cv</a>,
          publié d'abord sur{' '}
          <a href="https://sevangmb.github.io/cv/" target="_blank" rel="noopener noreferrer">GitHub Pages</a>,
          aujourd'hui sur mon propre serveur.
        </p>
        <p>
          <button type="button" className="lien-terminal" onClick={() => setTerminalOpen(true)}>
            &gt;_ terminal
          </button>
        </p>
      </footer>

      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} pdfUrl={PDF_URL} />
    </div>
  );
};

export default App;
