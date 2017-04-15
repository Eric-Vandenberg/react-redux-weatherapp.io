import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Vivus from 'vivus';

import randomAnimation from '../../utils/randomAnimation';

import theme from './Icons.css';

class IconComponent extends Component {

  static importComponent = (component) => {
    if (component.hasOwnProperty('default')) {
      return component.default;
    }
    return component;
  };

  constructor (props) {
    super(props);

    this.state = {
      finished: false,
      selectedColor: ''
    };

    this.fillIcon = this.fillIcon.bind(this);
  }

  componentDidMount () {
    this._vivus = new Vivus(this.props.icon, {
      type: 'oneByOne',
      duration: 200,
      animTimingFunction: randomAnimation(),
      selfDestroy: true
    }, this.fillIcon.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount () {
    this.setState({finished: false});
    this._isMounted = false;
    this._vivus = null;
  }

  fillIcon = () => {
    if (this._isMounted) {
      this.setState({finished: true});
    }
  };

  render () {
    const Icon = this.constructor.importComponent(require(`./../../icons/${this.props.icon}`));

    return (
        <Icon
            width="200"
            height="200"
            fill={this.props.color}
            stroke={this.props.color}
            className={this.state.finished ? theme.finished : theme.icon}/>
    );
  }
}

IconComponent.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default IconComponent;
