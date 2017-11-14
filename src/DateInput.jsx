import React from 'react';

if (!Date.prototype.toJohnnyString) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toJohnnyString = function() {
      return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate())
    };

  }());
}

export default class DateInput extends React.Component {
  constructor(props){

    super(props);

	const sWho = "DateInput::constructor";

    console.log(`${sWho}(): props = `, props );

    this.state = {
      value: this.editFormat(props.value),
      focused: false,
      valid: true,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

  }/* constructor(props) */

  componentWillReceiveProps(newProps){

	const sWho = "DateInput::componentWillReceiveProps";

    // Need to check if props have _really_ changed...
    if(newProps.value !== this.props.value){
      console.log(`${sWho}(): newProps.value !== this.props.value...`);
      console.log(`${sWho}(): this.props.value = `, this.props.value );
      console.log(`${sWho}(): newProps.value = `, newProps.value, `, typeof(newProps.value) = `, typeof(newProps.value) );

      console.log(`${sWho}(): Before this.setState(), this.state = `, this.state );

      console.log(`${sWho}(): Calling this.setState({ value: this.editFormat(newProps.value) = `, this.editFormat(newProps.value) );

      this.setState({ value: this.editFormat(newProps.value) },
	  () => {
      	console.log(`${sWho}(): After this.setState(), this.state = `, this.state );
	  });      
    }
  }

  onFocus(){
    this.setState({ focused: true });
  }

  onBlur(e){
    const sWho = "DateInput::onBlur";

	console.log(`${sWho}(): this.state.value = `, this.state.value, `, typeof(this.state.value) = `, typeof(this.state.value) );

    const value = this.unformat(this.state.value);

	console.log(`${sWho}(): value = `, value, `, typeof(value) = `, typeof(value) );

    const valid = this.state.value === '' || value != null;

	console.log(`${sWho}(): valid = `, valid );

	console.log(`${sWho}(): this.state.valid = `, this.state.valid );

    if( valid !== this.state.valid && this.props.onValidityChange){
      this.props.onValidityChange(e, valid);
    }

	console.log(`${sWho}(): Before calling this.setState(), this.state = `, this.state );

	console.log(`${sWho}(): Calling this.setState({ focused: false, valid: `, valid, `})...`);

    this.setState({ focused: false, valid: valid }, ()=>{
		console.log(`${sWho}(): After calling this.setState(), this.state = `, this.state );
	});

    if( valid ){
      console.log(`${sWho}(): Calling this.props.onChange() with value =`, value, `...`);
      this.props.onChange( e, value );
    }
  }/* onBlur() */

  onChange(e){
    const sWho = "DateInput::onChange";


    if(e.target.value.match(/^[\d-]*$/)){
      console.log(`${sWho}(): Calling this.setState({ value: `, e.target.value, ` })...` );
      this.setState({ value: e.target.value });
    }
    else {
      console.log(`${sWho}(): SHEMP: Sorry, Moe, e.target.value don't match da regular expression...NOT callin' this.setState({ value: `, e.target.value, ` })...` );
    }
  }

  // For friendly displayable format string of
  // natural data type...
  displayFormat(date){
    const sWho = "DateInput::displayFormat";
	console.log(`${sWho}(): date = `, date, `typeof(date) = `, typeof(date) );

    //return( date != null ) ? date.toDateString() : '';
		  //
	let sReturno = ( date != null ) ? date.toDateString() : '';
	console.log(`${sWho}(): Returning sReturno = "${sReturno}"...`);
	return sReturno;
  }

  // For editable format string of natural data type...
  // ...for displaying and handling
  // the transient state within the component...this
  // format is also updated in the onChange() handler...
  editFormat(date){
    const sWho = "DateInput::editFormat";
	console.log(`${sWho}(): date = `, date, `typeof(date) = `, typeof(date) );

    //return( date != null ) ? date.toISOString().substr(0, 10) : '';

    //let sReturno = ( date != null ) ? date.toISOString().substr(0, 10) : '';

    //let sReturno = ( date != null ) ? date.toJohnnyString() : '';
	
    let sReturno = ( date != null ) ? this.dateToEditString(date) : '';

	console.log(`${sWho}(): Returning sReturno = "${sReturno}"...`);
    return sReturno;
  }

  pad(number) {
      if (number < 10 && 1 == 1) {
        return '0' + number;
      }
      return number;
  }

  dateToEditString(date){
     return date.getFullYear() + 
        '-' + this.pad(date.getMonth() + 1) +
        '-' + this.pad(date.getDate())
	 ;
  }

  // Convert string to natural data type.
  // https://stackoverflow.com/questions/7556591/javascript-date-object-always-one-day-off/
  unformat(str){
    const sWho = "DateInput::unformat";
    console.log(`${sWho}(): str = "${str}"...`);	
    const doo = new Date(str);
    console.log(`${sWho}(): doo = `, doo );
    const val = new Date( doo.getTime() + Math.abs(doo.getTimezoneOffset()*60000) );
    console.log(`${sWho}(): val = `, val );
    return isNaN(val.getTime()) ? null : val; 
  }

  render(){
    const className = (!this.state.valid && !this.state.focused) ? 'invalid' : null;

    const value = (this.state.focused || !this.state.valid) ? this.state.value : this.displayFormat(this.props.value);

    return (
    <input type="text" size={20} name={this.props.name}
     className={className} value={value}
     placeholder={this.state.focused ? 'yyyy-mm-dd' : null}
     onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange}
    />
    );
  }/* render() */

}/* class DateInput */

DateInput.propTypes = {
  value: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  onValidityChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
};
