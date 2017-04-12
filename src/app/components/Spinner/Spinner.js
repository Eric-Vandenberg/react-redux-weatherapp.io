import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import theme from './Spinner.css';

const inlineSVGContainer = {
  width: '0',
  margin: '0 auto'
};

const SpinnerComponent = () => (
    <div style={inlineSVGContainer}>
      <ProgressBar theme={theme} type="circular" mode="indeterminate" multicolor />
    </div>
);

export default SpinnerComponent;
