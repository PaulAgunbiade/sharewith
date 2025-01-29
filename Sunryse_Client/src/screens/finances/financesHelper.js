export async function getStripeStatus(axios, toast) {
  try {
    const res = await axios.get('/stripe/status');
    return res.data.active;
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error retrieving your finances, please try again later.',
      );
  }
}

export async function getDashboardLink(axios, toast) {
  try {
    const res = await axios.get('/stripe');
    return res.data.url;
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error retrieving your finances, please try again later.',
      );
  }
}
