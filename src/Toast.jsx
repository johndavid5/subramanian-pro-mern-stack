/* Simulate the Toast messages in Android OS...
* ...make them disappear automatically after a few seconds...
* ...let the messages overlay the page as well as transition 
* in and out
*/
import React from 'react';
import { Alert, Collapse } from 'react-bootstrap';

export default class Toast extends React.Component {
  componentDidUpdate(){
    if(this.props.showing){
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(this.props.onDismiss, 5000 );
    }
  }

  componentWillUnmount(){
    clearTimeout(this.dismissTimer);
  }

  render(){
    return (
      <Collapse in={this.props.showing}>
        <div style={{ position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center' }}>
    );
          <Alert style={{ display: 'inline-block', width: 500 }}
                 bsStyle={this.props.bsStyle}
                 onDismiss
  }

}
