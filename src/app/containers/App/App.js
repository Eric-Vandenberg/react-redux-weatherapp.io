import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchIP } from '../../actions/fetchIP';

import AppBarComponent from '../../components/AppBar/AppBar';
import SearchContainer from '../Search/Search';
import WeatherContainer from '../Weather/Weather';

class AppContainer extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchIP();
  }

  render () {
    return (
        <div>
          <AppBarComponent />
          <SearchContainer />
          <WeatherContainer />
        </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchIP }, dispatch);
}

AppContainer.propTypes = {
  fetchIP: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AppContainer);
