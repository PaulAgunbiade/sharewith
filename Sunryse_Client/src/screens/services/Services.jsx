import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingHOC from '../../components/loading/LoadingHOC';
import Placeholder from '../../components/placeholder/Placeholder';
import StyledTable from '../../components/table/StyledTable';
import StyledButton from '../../components/styledButton/StyledButton';

import useToast from '../../hooks/useToast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  TABLE_HEADERS,
  deleteService,
  getCurrentServices,
  sanitizeServices,
  updateService,
} from './servicesHelper';

import ServicesImage from '../../assets/ServicesImage.png';
import styles from './Services.module.scss';

Services.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

function Services({ setLoading }) {
  const [currentServices, setCurrentServices] = useState(false);
  const [rowData, setRowData] = useState(false);

  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getCurrentServices(axios, toast);
    if (data.length > 0) setCurrentServices(data);
    const tableData = sanitizeServices(data);
    setRowData(tableData);
    setLoading(false);
  };

  const onEdit = async (serviceData) => {
    setLoading(true);
    await updateService(serviceData, axios, toast);
    fetchData();
  };

  const onStatusChange = async (serviceId, status) => {
    setLoading(true);
    const serviceToUpdate = currentServices.find((s) => s.id === serviceId);
    const updatedServiceData = { ...serviceToUpdate, status: status };
    await updateService(updatedServiceData, axios, toast);
    fetchData();
  };

  const onDelete = async (id) => {
    setLoading(true);
    await deleteService(id, axios, toast);
    fetchData();
  };

  return (
    <div id="Services" className={styles.screen}>
      {currentServices.length > 0 ? (
        <div className={styles.servicesContainer}>
          <p className={styles.header}>Services</p>
          <StyledTable
            headerData={TABLE_HEADERS}
            rowData={rowData}
            actions={true}
            onEdit={onEdit}
            onDelete={onDelete}
            status={true}
            onStatusChange={onStatusChange}
          />
          <StyledButton
            baseClassname={styles.button}
            text={'New Service +'}
            onClick={() => navigate('/services/new')}
          />
        </div>
      ) : (
        <Placeholder
          image={ServicesImage}
          title="Welcome to your serivce offerings"
          text="You have no services right now"
          button={true}
          buttonText="Create your first service"
          onClick={() => navigate('/services/new')}
        />
      )}
    </div>
  );
}

export default LoadingHOC(Services, 'Services', false);
