import React from 'react';

import { IconButton } from 'react-toolbox/lib/button';
import GithubIcon from '../../icons/github';

import theme from './IconButton.css';

const IconButtonComponent = () => (
    <IconButton
        href="http://github.com/Eric-Vandenberg/react-redux-weatherapp.io"
        target="_blank"
        icon={<GithubIcon />}
        className={theme.link} />
);

export default IconButtonComponent;
