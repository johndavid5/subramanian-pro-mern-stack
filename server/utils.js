class utils {

  /* WARNING: Experimental func...
  * 
  */
  static objectToString(object, name) {
    if (!name) {
      name = 'object';
    }

    if (object == null) {
      return 'null';
    }

    const s_typeof = typeof object;

    if (s_typeof === 'undefined') {
      return 'undefined';
    } else if (s_typeof !== 'object') {
      return `(${s_typeof}) ${object}`;
    }

    let s_out = '';
    for (const field in object) {
      s_out += `${name}["${field}"] = ${JSON.stringify(object[field])}`;
      s_out += `, typeof() = ${typeof (object[field])}`;
      if( object[field] ){
        s_out += `, constructor.name = ${object[field].constructor.name}`;
      }
      s_out += "\n";
    }
    return s_out;
  }/* objectToString() */
}

// Only need module.exports for node,
// browser gets function through windows
// object...
(typeof module !== 'undefined') &&
(module.exports = utils);
