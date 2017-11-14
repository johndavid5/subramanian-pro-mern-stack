import React from 'react';

export default class NumInput extends React.Component {
  constructor(props){
    const sWho = "NumInput::constructor";
    console.log(`${sWho}(): props = `, props);
    super(props);
    this.state = { value: this.format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }/* constructor(props) */

  componentWillReceiveProps(newProps){
    this.setState( { value: this.format(newProps.value) } );
  }

  onBlur(e){
    const sWho = "NumInput::onBlur";
	console.log(`${sWho}(): GILLIGAN: Skipper, this.state.value = `, this.state.value, `passing this.unformat(this.state.value) = `, this.unformat(this.state.value), ` as 2nd arg to this.props.onChange...`); 
    this.props.onChange(e, this.unformat(this.state.value)); 
  }

  onChange(e){
    if(e.target.value.match(/^\d*$/)){
      this.setState({ value: e.target.value });
    }
  }

  // Convert natural data type to a string.
  //
  // Field is optional, so a null value needs
  // to be shown as an empty string.
  format(num){
    return (num != null ? num.toString(): '');
  }

  // Convert string to natural data type.
  //
  // Field is optional, so if NaN (including
  // the case of an empty string...the regex check
  // in onChange makes it very difficult to type
  // in invalid values, so most probably NaN will be
  // an empty string), set value to null.
  unformat(str){
    const val = parseInt(str, 10);
    return ( isNaN(val) ? null : val);
  }

  /* Use the spread attribute "..." to place
  * key-value pairs of this.props into property-value
  * pairs at that point...
  */
  render(){
    return (
    <input type="text" {...this.props} value={this.state.value}
     onBlur={this.onBlur} onChange={this.onChange}
     />
    );
  }

}/* class NumInput */

NumInput.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired,
};
