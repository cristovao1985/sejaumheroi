import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login  from './Components/Login';
import Registro from './Components/Registro';
import Ong from './Components/Ong';
import Caso from './Components/Caso';

export default function Routes(){
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/registro"  component={Registro}/>
            <Route path="/ong"  component={Ong}/>
            <Route path="/caso/criar"  component={Caso}/>
        </Switch>
    </BrowserRouter>
    )
}
