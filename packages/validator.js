const validator = require('validator');

module.exports = (rules) => {

  if( ! isValidRulesParams(rules) ) {

    return {
      valid: false,
      errors: ['Validation rules expected to be parameters array type!']
    };

  }

  return applyRulesOrReturnErrors(rules);

}

function isValidRulesParams(rules) {

  if( ! Array.isArray(rules) ) {
    return false;
  }

  return true;

}

function applyRulesOrReturnErrors(rules) {

  let errors = [];

  if( rules.every( validation => validation.value === '') ) {
    return true;
  }

  rules.forEach( (validation) => {
    switch (validation.rule) {

      case 'required':

        if( validator.isEmpty( validation.value ) ) {
          let error = validation.value.charAt(0).toUpperCase() + validation.value.slice(1) + 'is required';
          errors.push(error);
        }
        break;
      case 'email':

        if( ! validator.isEmail( validation.value )) {
          let error = validation.value.charAt(0).toUpperCase() + validation.value.slice(1) + 'is invalid email type';
          errors.push(error);
        }

        break;
      default:

    }
  });

  if( errors.length === 0 ) {
    return {
      valid: true,
      errors: errors
    };
  }

  return {
    valid: false,
    errors: errors
  };

}
