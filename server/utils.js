class utils {

  static objectToString(object, name){

	if( ! name ){
      name = "object";
    }

    if( object == null ){
      return "null";
    }

    let s_typeof = typeof object;

	if( s_typeof === "undefined" ){
      return "undefined";
    }
    else if( s_typeof !== "object" ){
      return "(" + s_typeof + ") " +  object;
    }
	else {
      let s_out = "";
      for( let field in object ){ 
        s_out += `${name}["${field}"] = ` + JSON.stringify(object[field]) + `, typeof() = ` + typeof(object[field]) + `, constructor.name = ` + object[field].constructor.name + "\n";
      }
      return s_out;
    }
  }/* objectToString() */

}

// Only need module.exports for node,
// browser gets function through windows
// object... 
(typeof module !== 'undefined') &&
(module.exports = utils);
