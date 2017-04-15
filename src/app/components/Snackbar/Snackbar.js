import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchIP} from '../../actions/fetchIP';

import {Snackbar} from 'react-toolbox';
import theme from './Snackbar.css';

class SnackbarComponent extends Component {

  constructor (props) {
    super(props);

    this.state = {
      active: false,
      message: ''
    };

    this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this);
  }

  componentDidMount () {
    this._isMounted = true;
    this.setState({
      active: this.props.weather.error,
      message: this.props.weather.message
    });
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  handleSnackbarClick = () => {
    this.setState({active: false});
    this.forceUpdate();
  };

  handleSnackbarTimeout = () => {
    if (this._isMounted) {
      this.setState({active: false});
    }
    this.props.fetchIP();
  };

  render () {
    return (
        <section>
          <Snackbar
              theme={theme}
              action="Hide"
              active={this.props.weather.error}
              label={this.props.weather.message}
              timeout={1500}
              onClick={this.handleSnackbarClick}
              onTimeout={this.handleSnackbarTimeout}
              type="warning"
          />
        </section>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchIP}, dispatch);
}

function mapStateToProps ({weather}) {
  return {weather};
}

SnackbarComponent.propTypes = {
  fetchIP: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarComponent);
