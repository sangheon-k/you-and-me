import { toast } from "react-toastify";

export const ToastInfo = (message) => {
	return toast.info(message, {
		toastId: 1,
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};