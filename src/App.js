import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Competences from './components/Competences'
import Exemple2 from './components/Exemple2'
import data from "./data"; 
import CenteredTabs from './components/menu';
import Home from './components/home';

const App = () => {
  const [currentTab, setCurrentTab] = useState(0); 

  const onChangeTab = (event, newValue) => {
      setCurrentTab(newValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CenteredTabs current={currentTab} onChange={onChangeTab} />

      {currentTab === 1 && (<Competences />)}
      {currentTab === 2 && (<Exemple2 title="Expériences" experiences={data.Experiences} />)}
      {currentTab === 0 && (<Home />)}
      {currentTab === 0 && (<Plex />)}
      
    </ThemeProvider>
  )
};

export default App
