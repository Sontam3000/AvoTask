import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Create from './components/Create/create.component';
import Footer from './components/Footer/footer.component';
import Header from './components/Header/header.component';
import Manage from './components/Manage/manage.component';
import Edit from './components/Edit/edit.component.jsx';

function App() {
  return (
    <Router>
    <div className="App">
     <Header/>
     <Routes>
       <Route exact path='/' element={<Create/>} />
       <Route exact path='/manage' element={<Manage/>}/>
       <Route path='manage/:id' element={<Edit/>} />
     </Routes>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
