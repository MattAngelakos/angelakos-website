import { useState } from 'react';
import './App.css'
import NavBar from './NavBar';
import Repos from './Repos';
import AboutMe from './AboutMe';

function App() {
  const [page, setPage] = useState<'about' | 'repos'>('about'); 
  return (
    <div>
      <NavBar setPage={setPage} />
      {page === 'about' && <AboutMe />}
      {page === 'repos' && <Repos />}
    </div>
  );
}

export default App;
