import React from 'react';

import { Button } from 'react-toolbox/lib/button';
import theme from './Button.css';

const ButtonComponent = () => (
    <div>
      <Button theme={theme} icon="youtube_searched_for" label="Search" type="submit" raised accent />
    </div>
);

export default ButtonComponent;
