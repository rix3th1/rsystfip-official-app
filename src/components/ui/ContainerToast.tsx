import { Flip, ToastContainer } from "react-toastify";

function ContainerToast(): React.ReactNode {
  return (
    <ToastContainer
      position={"top-right"}
      autoClose={3000}
      hideProgressBar
      newestOnTop
      transition={Flip}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      limit={4}
      theme="dark"
    />
  );
}

export default ContainerToast;
