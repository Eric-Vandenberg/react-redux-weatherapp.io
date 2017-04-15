import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { Tab, Tabs } from 'react-toolbox';
import IconComponent from '../../components/Icon/Icon';
import ListComponent from '../../components/List/List';
import SpinnerComponent from '../../components/Spinner/Spinner';
import SnackbarComponent from '../../components/Snackbar/Snackbar';
import colorGenerator from '../../utils/colorGenerator';
import theme from './Weather.css';

class WeatherContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      index: 0,
      fixedIndex: 0,
      inverseIndex: 0
    };

    this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
    this.renderWeather = this.renderWeather.bind(this);
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.weather.timezone !== nextProps.weather.timezone) {
      this.forceUpdate();
    }
  }

  handleFixedTabChange = (index) => {
      this.setState({fixedIndex: index});
  };

  renderWeather = (day, i, days) => {
      let dayName = moment.unix(day.time).format('dddd');

      if (i === 0) {
          dayName = 'Today';
      }
      return (
          <Tab label={dayName} key={Math.random() * 10}>
            <div className={theme.container}>
              <IconComponent
                  icon={day.icon}
                  color={colorGenerator()} />
              <ListComponent
                  day={day} />
            </div>
          </Tab>
      );

  };

  render () {
    if (this.props.weather.daily) {
      return (
          <section>
            <Tabs theme={theme} index={this.state.fixedIndex} onChange={this.handleFixedTabChange} fixed>
              {this.props.weather.daily.data.map(this.renderWeather)}
            </Tabs>
          </section>
      );
    } else if (this.props.weather.error) {
      return (
          <section>
            <SpinnerComponent />
            <SnackbarComponent />
          </section>
      );
    } else {
      return (
          <SpinnerComponent />
      );
    }

  }
}

function mapStateToProps ({ weather }) {
  return { weather };
}

WeatherContainer.propTypes = {
  weather: PropTypes.object
};

export default connect(mapStateToProps)(WeatherContainer);
