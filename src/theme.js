import { createTheme } from '@material-ui/core/styles'

// Mêmes couleurs rétro dans les deux modes ; seuls les fonds et le texte changent.
const makeTheme = dark => createTheme({
  palette: {
    type: dark ? 'dark' : 'light',
    background: dark
      ? { default: '#162022', paper: '#1f2c2e' }
      : { default: '#f4f6ff', paper: '#ffffff' },
    primary: {
      main: dark ? '#7fbcbd' : '#4f8a8b',
    },
    secondary: {
      main: '#ffcb74',
    },
  },
});

export default makeTheme
