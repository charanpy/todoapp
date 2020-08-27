import React, { Fragment, useEffect } from 'react'
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home'
import { Provider } from 'react-redux';
import store from './store';
import CategoryList from './component/Main/CategoryList'
import setAuthToken from './utils/setAuthToken'
import Login from './component/Login/Login';
import Register from './component/Register/Register'
import Todo from './pages/Todo/Todo'
import { loadUser } from './actions/auth';
import TodoItem from './component/Todo/TodoItem'
import TodoComplete from './component/Todo/TodoComplete'
import TodayTask from './component/Today/TodayTask'
if (localStorage.token) {
      setAuthToken(localStorage.token)
}
export const App = () => {

      useEffect(() => {
            store.dispatch(loadUser())
      }, [])
      return (
            <>
                  <Provider store={store}>

                        <Route exact path="/home" component={Home} />
                        <Switch>
                              <Route exact path='/login' component={Login} />
                              <Route exact path='/register' component={Register} />
                              <Route exact path='/' component={Todo} />
                              <Route exact path="/category" component={CategoryList} />
                              <Route exact path="/category/:id" component={TodoItem} />
                              <Route exact path='/test' component={TodoComplete} />
                              <Route exact path="/today" component={TodayTask} />

                        </Switch>
                  </Provider>

            </>
      )
}


export default App;
