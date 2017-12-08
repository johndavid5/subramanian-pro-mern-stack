/* A Higher Order Component (HOC) Design Pattern
* to add Toast Functionality...
*
* HOC design pattern: a function that
* takes in a component and returns a wrapped component
* with additional functionality, thus enhancing it...
*/  
import React from 'react';
import Toast from './Toast.jsx';

export default function withToast(OriginalComponent){
  /* Return new component which wraps the original component... */
  return class WithToast extends React.Component{  

    constructor(props){

      super(props);

      this.state = {
        toastVisible: false,
	    toastMessage: '',
        toastType: 'success',
      };

      this.showSuccess = this.showSuccess.bind(this);

      this.showError = this.showError.bind(this);

      this.dismissToast = this.dismissToast.bind(this);
       
    }/* constructor(props) */

    showSuccess(message){
      this.setState(
        {
         toastVisible: true,
         toastMessage: message,
         toastType: 'success'
		}
	  );
    }

    showError(message){
      this.setState(
        {
         toastVisible: true,
         toastMessage: message,
         toastType: 'danger'
		}
	  );
    }

    dismissToast(){
      this.setState({toastVisible:false});
    }

    render(){
      return(
        <div>
          <OriginalComponent
           showError={this.showError}
           showSuccess={this.showSuccess}
           {...this.props}
          />
          <Toast
           showing={this.state.toastVisible}
           message={this.state.toastMessage}
           onDismiss={this.dismissToast}
           bsStyle={this.state.toastType}
          /> 
         </div>
      );
    }/* render() */

  };/* return class WithToast extends React.Component */

}/* export default function withToast(OriginalComponent) */
