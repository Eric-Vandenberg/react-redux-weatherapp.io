import React from 'react';

import { AppBar } from 'react-toolbox/lib/app_bar';
import LogoComponent from '../Logo/Logo.js';
import IconButtonComponent from '../Button/IconButton';
import theme from './AppBar.css';

const inlineSVGStyles = {
  width: '3.4rem',
  height: '3.4rem',
  marginRight: '1rem',
  fill: '#fff'
};

const AppBarComponent = () => (
    <AppBar theme={theme} rightIcon={<IconButtonComponent />}>
      <LogoComponent style={inlineSVGStyles} /> Weatherapp.io
    </AppBar>
);

export default AppBarComponent;
