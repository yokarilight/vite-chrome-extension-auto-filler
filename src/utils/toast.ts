import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const errorNotify = (msg: string) => {
  toast.error(msg, toastConfig);
};

export const successNotify = (msg: string) => {
  toast.success(msg, toastConfig);
};
