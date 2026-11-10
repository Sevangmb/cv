import React, { useMemo, useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import makeTheme from './theme'
import Competences from './components/Competences'
import Exemple2 from './components/Exemple2'
import data from "./data";
import CenteredTabs from './components/menu';
import Home from './components/home';
import Cv from './components/cv';
import Projets from './components/Projets';
import Footer from './components/Footer';
import Terminal from './components/Terminal';

export const PDF_URL = `${process.env.PUBLIC_URL}/Sevan_Safarian_CV.pdf`;

// Le choix clair / sombre est mémorisé dans le navigateur du visiteur ; à défaut, on suit
// le réglage de son système.
const initialDark = () => {
  try {
    const saved = window.localStorage.getItem('theme');
    if (saved) return saved === 'sombre';
  } catch (e) { /* stockage indisponible : on suit le système */ }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [dark, setDark] = useState(initialDark);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const theme = useMemo(() => makeTheme(dark), [dark]);

  const onChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
    window.scrollTo(0, 0);
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    try { window.localStorage.setItem('theme', next ? 'sombre' : 'clair'); } catch (e) { /* rien */ }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CenteredTabs current={currentTab} onChange={onChangeTab} dark={dark} onToggleDark={toggleDark} />

      {currentTab === 0 && (<Home onNavigate={setCurrentTab} onOpenTerminal={() => setTerminalOpen(true)} pdfUrl={PDF_URL} />)}
      {currentTab === 1 && (<Competences />)}
      {currentTab === 2 && (<Exemple2 title="Parcours" experiences={data.Experiences} />)}
      {currentTab === 3 && (<Projets />)}
      {currentTab === 4 && (<Cv pdfUrl={PDF_URL} />)}
      <Footer />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)}
        onNavigate={setCurrentTab} pdfUrl={PDF_URL} />
    </ThemeProvider>
  )
};

export default App
