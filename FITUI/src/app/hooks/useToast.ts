import { Bounce, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
	const showToast = (
		message: string,
		type: "success" | "error" | "info" | "warning",
		options?: ToastOptions
	) => {
		const defaultOptions: ToastOptions = {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
			...options,
		};

		switch (type) {
			case "success":
				toast.success(message, defaultOptions);
				break;
			case "error":
				toast.error(message, defaultOptions);
				break;
			case "info":
				toast.info(message, defaultOptions);
				break;
			case "warning":
				toast.warning(message, defaultOptions);
				break;
			default:
				toast(message, defaultOptions);
		}
	};

	return { showToast };
};

export default useToast;
