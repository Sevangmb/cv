import React from 'react';
import Bandeau from '../components/bandeau';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'

export default {
  title: 'Example/Bandeau',
  component: Bandeau,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => 
<ThemeProvider theme={theme}>
      <CssBaseline />
    <Bandeau {...args} />
</ThemeProvider>;

export const Primary = Template.bind({});