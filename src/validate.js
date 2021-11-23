export function validateIncomingBody(body) {
  const errors = { wrongProps: [], wrongType: [] };

  for (let prop in body) {
    switch (prop) {
      case 'name':
        if (typeof body[prop] !== 'string') {
          errors.wrongType.push(prop);
        }
        break;
      case 'age':
        if (typeof body[prop] !== 'number') {
          errors.wrongType.push(prop);
        }
        break;
      case 'hobbies':
        if (Array.isArray(body[prop])) {
          const wrongHobbies = body[prop].filter((item) => typeof item !== 'string');
          if (wrongHobbies.length > 0) {
            errors.wrongType.push(prop);
          }
        } else {
          errors.wrongType.push(prop);
        }
        break;
      default:
        errors.wrongProps.push(prop);
        break;
    }
  }

  if (errors.wrongProps.length > 0 && errors.wrongType.length > 0) {
    return `Invalid properties: ${errors.wrongProps} and Invalid types for properties: ${errors.wrongType}`;
  } else if (errors.wrongProps.length > 0) {
    return `Invalid properties: ${errors.wrongProps}`;
  } else if (errors.wrongType.length > 0) {
    return `Invalid types for properties: ${errors.wrongType}`;
  } else if (Object.keys(body).length < 3) {
    return 'You don\t pass all requred properties';
  } else {
    return 'Valid';
  }
}
