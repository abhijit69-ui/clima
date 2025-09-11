import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>Koti mar</Layout>
    </BrowserRouter>
  );
};

export default App;
