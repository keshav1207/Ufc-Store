
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => {
  return (
    <div>
      <ToastContainer />
      {children}
    </div>
  );
};

export default ToastProvider;
