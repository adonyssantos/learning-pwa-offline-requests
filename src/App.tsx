import { UsersView } from './modules';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <UsersView />
      <ToastContainer />
    </>
  );
}

export default App;
