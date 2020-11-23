import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import Me from './components/pages/Me';
import './App.css';
import { Component } from 'react';
// import {v4 as uuid}  from 'uuid';
// uuid used when dev simulater id
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios';

class App extends Component {
  state = {
    todos :[]        
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
    // .then( res => console.log(res.data) )
    .then(res => this.setState({todos: res.data}))
  }
  markComplete = (id) => {       
  // console.log(id)
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  delTodo = (id) => {
    // deleted back to josn server
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res => this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]}))
    this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]});
  }

  addTodo = (title) =>{
    // console.log(title)
    //set state using spread operator
    // const newTodo = {
    //   id:uuid(),
    //   title:title,
    //   completed:false
    // }
    // this.setState({todos: [...this.state.todos, newTodo] });
    //now get real backend connected
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title:title,
      completed:false
    })
    .then(res => this.setState({todos:[...this.state.todos, res.data]}));
    
  }

  render() {
    //console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={ props => (
              <>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </>
            )} /> 
            <Route exact path="/me" component={Me} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
