import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Competences from './components/Competences'
import Plex from './components/Plex'
import Experience from './components/Experience'
import { Experiences } from "./data.json"; 
import CenteredTabs from './components/menu';
import Home from './components/home';
import Cv from './components/cv';

const App = () => {
  // Manages the currently active tab in the navigation menu.
  const [currentTab, setCurrentTab] = useState(0); 

  // Callback function to update the active tab when a new tab is selected.
  const onChangeTab = (event, newValue) => {
      setCurrentTab(newValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CenteredTabs current={currentTab} onChange={onChangeTab} />

      {/* Conditionally render components based on the currentTab value */}
      {currentTab === 1 && (<Competences />)}
      {currentTab === 2 && (<Experience title="Expériences" experiences={Experiences} />)}
      {currentTab === 3 && (<Cv />)}
      {currentTab === 4 && (<Plex />)}
      {currentTab === 0 && (<Home />)}
      
    </ThemeProvider>
  )
};

export default App
