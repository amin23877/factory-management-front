import Swal from "sweetalert2";

export default function Confirm({ text, onConfirm }: { text?: string; onConfirm: () => void }) {
  Swal.fire({
    title: "Are you sure?",
    text,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
  })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    })
    .catch((e) => console.log("error from sweetalert2", e));
}
