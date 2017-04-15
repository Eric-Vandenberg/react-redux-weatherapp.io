import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../../actions/fetchWeather';

import InputComponent from '../../components/Input/Input';
import ButtonComponent from '../../components/Button/Button';
import theme from './Search.css';

class SearchContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      term: ''
    };

    this.trackSearch = this.trackSearch.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({ term: this.props.ip.zip_code });
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props !== nextProps) {
      this.props.fetchWeather(nextProps.ip.zip_code);
    }
  }

  trackSearch = (searchTerm) => {
      this.setState({ term: searchTerm });
  };

  onFormSubmit = (event) => {
      event.preventDefault();

      this.props.fetchWeather(this.state.term);
  };

  render () {
    return (
        <form className={theme.form} onSubmit={this.onFormSubmit.bind(this)}>
          <InputComponent
              onSearchTermChange={searchTerm => {this.trackSearch(searchTerm)}} />
          <ButtonComponent />
        </form>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

function mapStateToProps ({ ip }) {
  return { ip };
}

SearchContainer.propTypes = {
  fetchWeather: PropTypes.func,
  ip: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
