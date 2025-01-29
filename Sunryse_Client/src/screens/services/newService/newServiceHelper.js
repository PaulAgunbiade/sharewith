import { checkFormData } from '../../../utilities/formChecks';
import { NEW_SERVICE_FORM_RULES } from './newServiceFormRules';

export async function createService(data, axios, toast, navigate) {
  console.log(data);
  try {
    const res = await axios.post('/clinic/service', { data: data });
    navigate('/services');
    return res.data;
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error creating your service, please try again later.',
      );
  }
}
export function sanitizeData(formData) {
  const sanitizedFormData = { ...formData };
  sanitizedFormData.policy = formData.policy.value;
  sanitizedFormData.tax = formData.tax.value;
  if (formData.policy.value !== 'notice') {
    sanitizedFormData.notice = '';
    sanitizedFormData.lateFee = '';
  } else {
    sanitizedFormData.notice = formData.notice.value;
  }
  if (formData.tax.value === 'none') {
    sanitizedFormData.taxPercent = 0;
  }
  return sanitizedFormData;
}

export function validateData(formData, setErrors) {
  const newErrors = checkFormData(formData, NEW_SERVICE_FORM_RULES);
  console.log(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setErrors((prevState) => ({
      ...prevState,
      ...newErrors,
    }));
    return false;
  }

  return true;
}
