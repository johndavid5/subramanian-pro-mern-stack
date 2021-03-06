import React from 'react';
import PropTypes from 'prop-types';

export default class ContextWrapper extends React.Component {

  getChildContext(){
    return { initialState: this.props.initialState };
  }

  render(){
    return this.props.children;
  }

}/* export default calss ContextWrapper extends React.Component */

ContextWrapper.childContextTypes = {
  initialState: PropTypes.object,
};

ContextWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object,
};
