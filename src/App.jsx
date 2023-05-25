import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Pokemons from './pages/Pokemons';
import Type from './pages/Type';
import Types from './pages/Types';
import Habitats from './pages/Habitats.jsx';
import Habitat from './pages/Habitat.jsx';
import Natures from './pages/Natures.jsx';
import Nature from './pages/Nature.jsx';

function App() {
   return (
      <Router>
         <div className="container">
            <Header />

            <main>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon/:name" element={<Pokemon />} />
                  <Route path="/type/:element" element={<Type />} />
                  <Route path="/pokemons" element={<Pokemons />} />
                  <Route path="/types" element={<Types />} />
                  <Route path="/habitats" element={<Habitats />} />
                  <Route path="/habitat/:idOrName" element={<Habitat />} />
                  <Route path="/natures" element={<Natures />} />
                  <Route path="/nature/:idOrName" element={<Nature />} />
               </Routes>
            </main>
         </div>
      </Router>
   );
}

export default App;
