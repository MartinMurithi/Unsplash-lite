import './App.css';
import Characters from './Componenets/Characters';
import {QueryClient, QueryClientProvider} from 'react-query'
import Home from './Pages/Home';

function App() {

  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {/* <Characters /> */}
        <Home/>
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
