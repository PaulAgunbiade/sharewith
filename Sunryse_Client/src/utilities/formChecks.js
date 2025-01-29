// DepenedentValue: string, number, array
const requiredCheck = (value, dependentField = '', dependentValue = '') => {
  // Check if dependancy present
  if (dependentField) {
    // Check if dependancy passes
    const dependencyPassed = Array.isArray(dependentValue)
      ? dependentValue.includes(dependentField)
      : dependentField === dependentValue;

    if (dependencyPassed) {
      // Check if value is present
      const passed = Boolean(value);
      return {
        passed: passed,
        message: passed ? 'Passed' : 'This field is required',
      };
    } else {
      return {
        passed: true,
        message: 'Passed',
      };
    }
  }
  // Check if value is present
  const passed = Boolean(value);
  return {
    passed: passed,
    message: passed ? 'Passed' : 'This field is required',
  };
};

const maxLengthCheck = (value, length) => {
  if (value.length <= length) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Max length of ${length} exceeded`,
    };
  }
};

const minLengthCheck = (value, length) => {
  if (value.length >= length) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Minimum length of ${length} not reached`,
    };
  }
};

const maxValueCheck = (value, amount) => {
  if (value <= amount) {
    return {
      passed: true,
      message: `Passed`,
    };
  } else {
    return {
      passed: false,
      message: `Max value of ${amount} exceeded`,
    };
  }
};

const minValueCheck = (value, amount) => {
  if (value >= amount) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Minimum length of ${amount} not reached`,
    };
  }
};

const equalsCheck = (value, requiredValue) => {
  if (value === requiredValue) {
    return { passed: true, message: 'Passed equals check' };
  } else {
    return {
      passed: false,
      message: `Values do not match`,
    };
  }
};

const regexCheck = (value, regex) => {
  if (regex.test(value)) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Not a valid email address`,
    };
  }
};

const availabiltyCheck = (availability) => {
  availability.forEach((day) => {
    day.times.forEach((timeBlock) => {
      if (timeBlock.error === true) {
        return { passed: false, message: 'Availability contains errors' };
      }
    });
  });
  return { passed: true, message: 'Passed' };
};

export function checkFormData(formData, formRules) {
  let errors = {};

  for (const field in formData) {
    const fieldChecks = formRules[field]?.checks;
    fieldChecks.forEach((check) => {
      const result = check(formData);
      if (!result.passed) {
        errors[field] = result.message;
      }
    });
  }

  return errors;
}

export const FORM_RULES_FUNCS = {
  requiredCheck: requiredCheck,
  maxLengthCheck: maxLengthCheck,
  minLengthCheck: minLengthCheck,
  maxValueCheck: maxValueCheck,
  minValueCheck: minValueCheck,
  availabiltyCheck: availabiltyCheck,
  equalsCheck: equalsCheck,
  regexCheck: regexCheck,
};
