export async function getDirectory(axios, toast) {
  try {
    const fields = ['directory'];
    const res = await axios.get('/clinic', {
      params: {
        fields,
      },
    });
    return res.data?.directory;
  } catch (error) {
    console.log('res', error);
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error loading your clinic data, please try again.',
      );
  }
}
