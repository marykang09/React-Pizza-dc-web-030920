import React from "react"

const PizzaForm = (props) => {
  //need to pass in props here since it is a functional component

  // this is state in App:
  //  pizzaTopping: ,
  //  pizzaSize: ,
  // vegetarian: 
  // use these exact keys as the names for name="" to update state

  return(
      <div className="form-row">
        <div className="col-5">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Pizza Topping" 
              name="topping"
              value={props.topping}
              onChange={props.handleChange}
                //Pizza Topping Should Go Here
              />
        </div>
        <div className="col">
          <select 
            name="size"
            value={props.size} 
            className="form-control"
            onChange={props.handleChange} >
              <option value="Size">Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input 
              name="vegetarian"
              className="form-check-input" 
              type="radio" 
              value="Vegetarian" 
              checked={props.vegetarian}
              onChange={props.handleChange} />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input 
              name="vegetarian"
              className="form-check-input" 
              type="radio" 
              value="Not Vegetarian" 
              checked={props.vegetarian ? false : true }
              onChange={props.handleChange} />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
