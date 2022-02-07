export default function ({ $axios, error: nuxtError }) {
  $axios.onError((err) => {
    nuxtError({
      statusCode: err.response.status,
      message: err.message,
    });
    return Promise.resolve(false);
  });
}
