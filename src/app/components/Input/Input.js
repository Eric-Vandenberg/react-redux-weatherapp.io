import React, { Component } from 'react';

import { Input } from 'react-toolbox/lib/input';
import theme from './Input.css';

class InputComponent extends Component {

  constructor (props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
    this.props.onSearchTermChange(value);
  };

  render () {
    return (
        <div>
          <Input theme={theme} type='text' label='Search by city or zip' name='search' value={this.state.search} onChange={this.handleChange.bind(this, 'search')} maxLength={30} autoFocus />
        </div>
    );
  }
}

export default InputComponent;
