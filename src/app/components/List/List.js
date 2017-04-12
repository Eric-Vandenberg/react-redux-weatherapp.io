import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';
import ItemComponent from '../Item/Item';

class ListComponent extends Component {

  constructor (props) {
    super(props);

    this.state = {};

    this.locale = this.locale.bind(this);
    this.formatValue = this.formatValue.bind(this);
    this.formatLocale = this.formatLocale.bind(this);
    this.formatWeatherKey = this.formatWeatherKey.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  locale = () => {
    return this.formatLocale(this.props.weather.timezone);
  };

  formatLocale = (str) => {
    const string = str.split('/').join(' - ');

    return string.split('_').join(' ');
  };

  formatWeatherKey = (str) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (string) => string.toUpperCase());
  };

  formatValue = (key, value) => {
    const degrees = '°F',
          percent = '%',
          mph = ' mph',
          dist = ' mi.',
          distMax = '+ mi.',
          millibarsToHG = 33.8638866667,
          inchesMercury = ' inHg';
    let formattedValue = '';

    switch (key) {
      case 'temperatureMin':
        formattedValue += Math.round(value) + degrees;
        return ItemComponent(formattedValue);
      case 'temperatureMax':
        formattedValue += Math.round(value) + degrees;
        return ItemComponent(formattedValue);
      case 'sunriseTime':
        formattedValue += moment.unix(value).format('HH:mm');
        return ItemComponent(formattedValue);
      case 'sunsetTime':
        formattedValue += moment.unix(value).format('HH:mm');
        return ItemComponent(formattedValue);
      case 'precipProbability':
        const precip = value * 100;
        formattedValue += precip.toFixed() + percent;
        return ItemComponent(formattedValue);
      case 'humidity':
        const hum = value * 100;
        formattedValue += hum.toFixed() + percent;
        return ItemComponent(formattedValue);
      case 'windSpeed':
        formattedValue += Math.round(value) + mph;
        return ItemComponent(formattedValue);
      case 'pressure':
        formattedValue += Math.round(value / millibarsToHG) + inchesMercury;
        return ItemComponent(formattedValue);
      case 'visibility':
        formattedValue += Math.round(value);
        formattedValue += formattedValue == 10 ? distMax : dist;
        return ItemComponent(formattedValue);
      case 'cloudCover':
        const cover = value * 100;
        formattedValue += cover.toFixed() + percent;
        return ItemComponent(formattedValue);
      case 'dewPoint':
        formattedValue += Math.round(value) + degrees;
        return ItemComponent(formattedValue);
      default:
        formattedValue = value;
        return ItemComponent(formattedValue);
    }
  };

  renderItem = (day) => {
    const data = _.pick(day, [
        'temperatureMin',
        'temperatureMax',
        'sunriseTime',
        'sunsetTime',
        'precipProbability',
        'humidity',
        'windSpeed',
        'pressure',
        'visibility',
        'cloudCover',
        'dewPoint'
    ]);

    return Object.keys(data).map(function (item) {
      return (
          <ListItem
              key={item}
              legend={this.formatWeatherKey(item)}
              rightIcon={this.formatValue(item, data[item])}
          />
      );
    }.bind(this));
  };

  render () {
    return (
        <List>
          <ListSubHeader caption={this.locale()} />
          <ListDivider />
          <ListItem
              caption={this.props.day.summary}
          />
          {this.renderItem(this.props.day)}
        </List>
    );
  }
}

function mapStateToProps ({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(ListComponent);
