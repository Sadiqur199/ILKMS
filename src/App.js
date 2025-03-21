import Home from './Components/Screen/Home';
import AuthProvider from './AuthProvider';
import './index.css';
import Admin from './Components/Screen/Admin';

function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
      <div>
        <Home />
        {/* <Admin /> */}
      </div>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;
