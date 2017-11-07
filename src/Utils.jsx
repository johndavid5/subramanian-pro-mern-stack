export default class Utils {
  static stringToBool(input) {
    if (typeof (input) === 'undefined') {
      return false;
    }

    if (input == null) {
      return false;
    }

    input = '' + input; // coerce to string

    if (input === 'true' || input === '1') {
      return true;
    }

    return false;
  }
}
