import Swal from "sweetalert2";

export default function Confirm({ text, onConfirm }: { text?: string; onConfirm: () => void }) {
  Swal.fire({
    title: "Are you sure?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    })
    .catch((e) => console.log("error from sweetalert2", e));
}
