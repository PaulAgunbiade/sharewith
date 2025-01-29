export async function updateService(serviceData, axios, toast) {
  try {
    await axios.put('/clinic/service', { data: serviceData });
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error('There was an error updating the status, please try again.');
  }
}

export async function getCurrentServices(axios, toast) {
  try {
    const fields = ['services'];
    const res = await axios.get('/clinic', {
      params: {
        fields,
      },
    });
    return res.data.services;
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error retrieving your service offerings, please try again later.',
      );
  }
}

export async function deleteService(id, axios, toast) {
  try {
    await axios.delete('/clinic/service', { data: { id: id } });
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error('There was an error deleting the service, please try again.');
  }
}

export function sanitizeServices(services) {
  const filteredData = services.map((sv) => {
    // Create an object row for each service with keys from TABLE_HEADERS
    const dataObject = {};
    dataObject['id'] = sv['id'];
    TABLE_HEADERS.forEach((header) => {
      dataObject[header.value] = sv[header.value];
    });
    dataObject['status'] = sv['status'];
    return dataObject;
  });
  return filteredData;
}

// Options: [{value: any, label: string}]
function getLabelFromValue(value, options) {
  const selectedOption = options.find((op) => op.value === value);
  return selectedOption?.label;
}

export const TABLE_HEADERS = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'description',
    label: 'Description',
  },
  {
    value: 'duration',
    label: 'Duration',
  },
  {
    value: 'price',
    label: 'Price',
  },
  {
    value: 'currency',
    label: 'Currency',
  },
];
