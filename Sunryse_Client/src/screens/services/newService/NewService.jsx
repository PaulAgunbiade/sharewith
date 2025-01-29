import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useToast from '../../../hooks/useToast';

import ServiceDetails from './serviceDetails/ServiceDetails';
import ServicePolicy from './servicePolicy/ServicePolicy';
import StyledButton from '../../../components/styledButton/StyledButton';

import { createService, sanitizeData, validateData } from './newServiceHelper';

import styles from './NewService.module.scss';

export default function NewService() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    tax: '',
    taxPercent: '',
    policy: '',
    notice: '',
    lateFee: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    duration: '',
    price: '',
    tax: '',
    taxPercent: '',
    policy: '',
    notice: '',
    lateFee: '',
  });

  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const toast = useToast();

  async function save() {
    const valid = validateData(formData, setErrors);
    if (valid) {
      const sanitizedFormData = await sanitizeData(formData);
      await createService(sanitizedFormData, axios, toast, navigate);
    } else {
      toast.error('Required information is missing');
    }
  }

  const updateForm = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateErrors = (field, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className={styles.screen}>
      <ServiceDetails
        formData={formData}
        errors={errors}
        updateForm={updateForm}
        updateErrors={updateErrors}
      />
      <ServicePolicy
        formData={formData}
        errors={errors}
        updateForm={updateForm}
        updateErrors={updateErrors}
      />
      <StyledButton
        baseClassname={styles.button}
        text="Create New Service"
        onClick={() => {
          save();
        }}
      />
    </div>
  );
}
