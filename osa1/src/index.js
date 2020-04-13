import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import personService from './personservice.js'
/*const persons = [
  
]*/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
    console.log('constructor')
  }
  componentDidMount() {
    console.log('did mount')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }
  addPerson = (event) => {
    event.preventDefault()
    if(!this.state.persons.some(person => person.name === this.state.newName)){
        const personObj = {
                name:this.state.newName,
                number:this.state.newNumber
            }
        personService
            .create(personObj)
            .then(newPerson =>{
             this.setState({
                persons: this.state.persons.concat(newPerson),
                newName: '',
                newNumber: ''
              })
            })
 } else {
     alert(this.state.newName+ "on jo")
 }
}
  addNote = (event) => {
    event.preventDefault()
    var totta = this.state.persons.map(p => p.name).includes(this.state.newName)
    if (totta) {
      alert('duplikaatti !')
      totta = false;
    }
    else {
    
      const noteObject = {
        name: this.state.newName,
        numero: this.state.newNumber
      }
      const persons = this.state.persons.concat(noteObject)

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }

  }
  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  render() {
    console.log('render')
    //this.componentDidMount()
    
    return (
      <div>
      <h2>Puhelinluettelo</h2>
      <Form submit={this.addPerson} addNote = {this.addNote} newNote = {this.state.newNote}
      onChangeNote={this.handleNoteChange} newNumber = {this.state.newNumber}
      onChangeNumber={this.handleNumberChange}></Form>
      <h2>Numerot</h2>
     <ul>
     <ViewDirectory persons = {this.state.persons}></ViewDirectory>
     </ul>
    </div>
    )
  }
}

const ViewDirectory = (props) => {
  return(
    <div>
      {props.persons.map(p => <li key={p.name}>{p.name} {p.numero}</li>)}
    </div>
  )
}

const Form = (props) => {
  return (
    <div>
      <form onSubmit={props.addNote}>
        <div>
          nimi: <input value={props.newNote}
            onChange={props.onChangeNote}
          />
          numero: <input value={props.newNumber}
            onChange={props.onChangeNumber}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)