import React from 'react'

import {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
} from './apiClient'

class App extends React.Component {
  state = {
    fruits: [],
    adding: {},
    editing: {}
  }

  handleEditChange = e => {
    this.setState({
      editing: {
        ...this.state.editing,
        [e.target.name]: e.target.value
      }
    })
  }

  handleAddChange = e => {
    this.setState({
      adding: {
        ...this.state.adding,
        [e.target.name]: e.target.value
      }
    })
  }

  getSelectHandler = id => {
    const { fruits } = this.state
    return e => {
      e.preventDefault()
      this.setState({
        editing: fruits.find(fruit => fruit.id === id)
      })
    }
  }

  clearSelected = () => {
    this.setState({
      editing: {}
    })
  }

  handleUpdate = () => {
    updateFruit(this.state.editing)
      .then(fruits => {
        this.setState({
          fruits,
          editing: {}
        })
      })
  }

  handleDelete = () => {
    deleteFruit(this.state.editing.id)
      .then(fruits => {
        this.setState({
          fruits,
          editing: {}
        })
      })
  }

  handleAdd = () => {
    const newFruit = { ...this.state.adding, id: 0 }
    addFruit(newFruit)
      .then(fruits => {
        this.setState({
          fruits,
          adding: {}
        })
      })
  }

  componentDidMount () {
    getFruits()
      .then(fruits => {
        this.setState({ fruits })
      })
  }

  render () {
    const { name: addingName, calories: addingCalories } = this.state.adding
    const { name: editingName, calories: editingCalories } = this.state.editing
    return (
      <div className='app'>
        <h1>Fruit FTW!</h1>

        <ul>
          {this.state.fruits.map(fruit => (
            <li key={fruit.id}>
              <a href='#' onClick={this.getSelectHandler(fruit.id)}>
                {fruit.name}
              </a>
            </li>
          ))}
        </ul>

        <h2>Selected</h2>
        <div className='form'>
          <span>Name:</span>
          <input name='name'
            value={editingName || ''}
            onChange={this.handleEditChange} />

          <span>Calories:</span>
          <input name='calories'
            value={editingCalories || ''}
            onChange={this.handleEditChange} />

          <button onClick={this.handleUpdate}>Update fruit</button>
          <button onClick={this.handleDelete}>Delete fruit</button>
          <button onClick={this.clearSelected}>Clear selection</button>
        </div>

        <h2>Add new</h2>
        <div className='form'>
          <span>Name:</span>
          <input name='name'
            value={addingName || ''}
            onChange={this.handleAddChange} />

          <span>Calories:</span>
          <input name='calories'
            value={addingCalories || ''}
            onChange={this.handleAddChange} />

          <button onClick={this.handleAdd}>Add fruit</button>
        </div>
      </div>
    )
  }
}

export default App
