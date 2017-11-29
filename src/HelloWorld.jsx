import React from 'react';
import PropTypes from 'prop-types';

export default class HelloWorld extends React.Component {

  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props);
    this.whom = [ "Moe", "Larry", "Curly", "Shemp", "Joe", "Curly-Joe" ];
  }


  componentDidMount(){

	//for( let i = 0; i < this.whom.length; i++ ){
    //	setTimeout(()=>{
    //      console.log("setState...", this.whom[i]);
	//      this.setState({addressee: this.whom[i]});
   	//	 }, (i+1)*1000 );
    //}

    //setTimeout(()=>{
    //  console.log("HelloWorld.jsx: this.setState(...)", 'Universe');
    //  this.setState({addressee: 'Universe'});
    //}, (this.whom.length+1)*1000 );

    // Simulate an AJAX call...
    setTimeout(()=>{
      console.log("I'll be back, Bennett!");
      console.log("HelloWorld.jsx: this.setState(...)", 'Universe');
      this.setState({addressee: 'Universe'});
      console.log("Let off some steam, Bennett!");
    }, 5000 );
  }

  render(){
   return (
   <div>
   <h1 style={{color: 'green'}}>Hello, {this.state.addressee}!</h1>
   <h2 style={{fontFamily: 'comic sans ms', color: 'purple'}}>Let off some steam, Bennett!</h2>
   </div>
   );
  }
}

HelloWorld.propTypes = {
  addressee: PropTypes.string,
}

HelloWorld.defaultProps = {
  addressee: '',
}
