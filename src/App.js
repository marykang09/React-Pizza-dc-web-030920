import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  constructor(){
    super()
    this.state = {
      pizza: [],
      id: null,
      topping: "",
      size: "",
      vegetarian: false
    }
  }
  //set up the pizza as an empty array so it doesn't cause problems later


  componentDidMount(){
    console.log("componentDidMount")
    //checking to make sure this hits
        
    fetch("http://localhost:3000/pizzas")
      .then(response => response.json())
      .then(pizzaArray => this.setState({pizza: pizzaArray})) 
    //put the fetch here then save the array in state
  }

  handleClick = (pizza) => {
    console.log(pizza)

    this.setState({
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })

    //pass the pizza from pizza component up to pizzalist up to app
    //use the pizza to find the pizza data
    //then set state with that pizza info
  }

  handleChange = (event) => {
    console.log("looking for the topping:", event.target.value)

    if (event.target.name === "vegetarian"){
      this.setState({vegetarian: !this.state.vegetarian})
    } else {
     this.setState({[event.target.name]: event.target.value })
    }
  }

  handleSubmit = () => {
    console.log("handle submit")
    console.log("this.state:", this.state)

    const newPizza = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }

    if (this.state.id){
      fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(newPizza)
      })
        .then(response => response.json())
        .then(editedPizza => 

                 { console.log("edited Pizza", editedPizza)
                 let updatedArray = this.state.pizza.map(newPizza => editedPizza.id === newPizza.id ? editedPizza : newPizza)
                 this.setState({
                   pizza: updatedArray
                 })
                })
        
    } else {
      fetch("http://localhost:3000/pizzas", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(newPizza)
      })
        .then(response => response.json())
        .then(newPizza => 
            this.setState({
              pizza: [...this.state.pizza, newPizza]
            }))
    }

    this.setState({
      id: null,
      topping: "",
      size: "size",
      vegetarian: false
    })
    //this is to reset the state

  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          id={this.state.id}
          topping={this.state.topping} 
          size={this.state.size} 
          vegetarian={this.state.vegetarian}
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit} />
        <PizzaList 
          pizza={this.state.pizza} 
          handleClick={this.handleClick} />
      </Fragment>
    );
  }
}

export default App;
