export default async function createAccountLinkUrl(axios, toast) {
  try {
    const res = await axios.post('/stripe');
    const url = res.data.url;
    return url;
  } catch (error) {
    if (error?.response?.status === 500)
      toast.error('There was an error connecting to Stripe, please try again.');
  }
}
