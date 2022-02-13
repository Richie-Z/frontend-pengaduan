import Swal from "sweetalert2";

export default function ({ $axios }) {
  $axios.onError((err) => {
    Swal.fire({
      title: `Error: ${err.response.status}`,
      text: err.response.data.message,
      icon: "error",
    });
    return Promise.resolve(false);
  });
}
