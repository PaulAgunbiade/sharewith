import { FORM_RULES_FUNCS } from '../../../utilities/formChecks';

export const NEW_SERVICE_FORM_RULES = {
  name: {
    type: 'string',
    required: true,
    checks: [
      (formData) => FORM_RULES_FUNCS.requiredCheck(formData.name),
      (formData) => FORM_RULES_FUNCS.maxLengthCheck(formData.name, 100),
    ],
  },
  description: {
    type: 'string',
    required: true,
    checks: [
      (formData) => FORM_RULES_FUNCS.requiredCheck(formData.description),
      (formData) => FORM_RULES_FUNCS.maxLengthCheck(formData.description, 500),
    ],
  },
  duration: {
    type: 'number',
    required: true,
    checks: [
      (formData) => FORM_RULES_FUNCS.requiredCheck(formData.duration),
      (formData) => FORM_RULES_FUNCS.minValueCheck(formData.duration, 0),
    ],
  },
  price: {
    type: 'number',
    required: true,
    checks: [
      (formData) => FORM_RULES_FUNCS.requiredCheck(formData.price),
      (formData) => FORM_RULES_FUNCS.minValueCheck(formData.price, 0),
    ],
  },
  tax: {
    type: 'string',
    required: true,
    checks: [(formData) => FORM_RULES_FUNCS.requiredCheck(formData.tax)],
    options: [
      { value: 'none', label: 'None' },
      { value: 'gst', label: 'GST' },
      { value: 'hst', label: 'HST' },
      { value: 'pst', label: 'PST' },
    ],
  },
  taxPercent: {
    type: 'number',
    required: false,
    checks: [
      (formData) =>
        FORM_RULES_FUNCS.requiredCheck(formData.taxPercent, formData.tax, [
          'gst, hst, pst',
        ]),
      (formData) => FORM_RULES_FUNCS.minValueCheck(formData.taxPercent, 0),
    ],
  },
  policy: {
    type: 'string',
    required: true,
    checks: [(formData) => FORM_RULES_FUNCS.requiredCheck(formData.policy)],
    options: [
      { value: 'anytime', label: 'Cancel Anytime' },
      { value: 'notice', label: 'Notice Required' },
      { value: 'none', label: 'No Refunds' },
    ],
  },
  notice: {
    type: 'string',
    required: false,
    checks: [
      (formData) =>
        FORM_RULES_FUNCS.requiredCheck(
          formData.notice,
          formData.policy,
          'notice',
        ),
    ],
    options: [
      { value: '12', label: '12 hours' },
      { value: '24', label: '24 hours' },
      { value: '48', label: '48 hours' },
    ],
  },
  lateFee: {
    type: 'number',
    required: false,
    checks: [
      (formData) =>
        FORM_RULES_FUNCS.requiredCheck(
          formData.lateFee,
          formData.policy,
          'notice',
        ),
    ],
  },
};
