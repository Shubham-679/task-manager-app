import { Route, Switch,Redirect } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Navbar from "./components/navbar";
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Tasks from './components/addTasks';
import NotFound from './components/notFound'
import Logout from './components/logout';
import Profile from './components/profile';
import Deleteaccount from './components/deleteAccount';
import addProject from './components/addProject';
import Project from './components/project'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      
      <Switch>
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/addproject" component={addProject} />
      <Route path="/project/:id" component={Project} />
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route path="/delete-account" component={Deleteaccount} />
      <Route path="/not-found" component={NotFound}/>
      <Redirect from="/"  exact to="/home" />
      <Redirect to="/not-found"/>
      </Switch>
    
    </div>
  );
}

export default App;
