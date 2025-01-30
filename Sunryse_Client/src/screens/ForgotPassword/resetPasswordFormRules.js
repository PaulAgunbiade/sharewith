import { FORM_RULES_FUNCS } from '../../utilities/formChecks';

export const RESET_PASSWORD_FORM_RULES = {
  password: {
    type: 'string',
    required: true,
    checks: [
      (formData) => FORM_RULES_FUNCS.requiredCheck(formData.password),
      (formData) => FORM_RULES_FUNCS.minLengthCheck(formData.password, 8),
    ],
  },
  passwordConf: {
    type: 'string',
    required: true,
    checks: [
      (formData) => FORM_RULES_FUNCS.requiredCheck(formData.passwordConf),
      (formData) => FORM_RULES_FUNCS.minLengthCheck(formData.passwordConf, 8),
      (formData) =>
        FORM_RULES_FUNCS.equalsCheck(formData.passwordConf, formData.password),
    ],
  },
};
