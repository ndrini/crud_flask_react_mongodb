import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 

import {Navbar} from './components/Navbar';
import {About} from './components/About';
import {Users} from './components/Users';
import {Book} from './components/Book';
// import {Suggestions} from './components/Suggestions';
import Suggestions from './components/Suggestions';


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container p-2">
        <Switch>
          <Route path="/book" component={Book} />
          <Route path="/suggestions" component={Suggestions} />
          <Route path="/about" component={About} />
          <Route path="/" component={Users} />
        </Switch> 
      </div>
    </BrowserRouter> 
  );
}

export default App;






// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Switch>
//           <Route path="/about" component={About} />
//           <Route path="/" component={Users} />
//         </Switch>   
//       </div>
//     </BrowserRouter>         
//     );
// }

// export default App;
