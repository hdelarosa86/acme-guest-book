const { render } = ReactDOM;
const { Component } = React;
const app = document.querySelector('#app');
const { HashRouter, Switch, Link, Route, Redirect } = ReactRouterDOM;

class App extends Component {
  constructor() {
    super();
    this.state = {
        names: [],
    }  
  }

  async componentDidMount(){
      const data = (await axios.get('/api/guests')).data;
      console.log(data);
  }
  render() {
     const {names} = this.state;
    return <div>
            <h1>The Acme Guest Book</h1>
            <form>
                <input name='name' type='text'></input>
                <button> Sign In </button>
            </form>
            <ul>
                {names.map( (user,idx) => {
                    return <li key={idx}> {user.name} </li>
                } )}
            </ul>
        </div>;
  }
}
render(<App />, app);
