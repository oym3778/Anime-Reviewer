import { toast } from "react-toastify";

export function logError(uiMessage, meta = {}, devMessage = uiMessage) {
  const error = new Error(devMessage);
  error.meta = meta;

  // console.error(error);
  // TODO send to remote logging here

  return { error, uiMessage };
}

// Statless, given toastID we can work together with react. Given a state variable we display it
// can also be used to show sucess messages, but by default well use type error
export function showToast(toastId, message, type = "error") {
  toast.update(toastId, {
    render: message,
    type,
    autoClose: 3000,
    isLoading: false,
  });
}
