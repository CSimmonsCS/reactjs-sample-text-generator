import React from 'react';
import './App.css';
import axios from 'axios';
import Output from './Components/Output.js';
import Select from './Components/Controls/Select.js';
import Text from './Components/Controls/Text.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      paras: 4,
      html: 'html',
      text: ''
    }
  }

  componentWillMount() {
    this.getSampleText();
  }

  getSampleText(){
    axios.get('https://baconipsum.com/api/?type=all-meat&paras='+this.state.paras+'&start-with-lorem=1&format='+this.state.html)
      .then((response) => {
        this.setState({text: response.data}, function() {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showHtml(x){
    if(x==="html"){
      this.setState({html: x}, this.getSampleText);
    } else {
      this.setState({html: x}, this.getSampleText);
    }

  }

  changeParas(number){
    this.setState({paras: number}, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <br />
        <h1>ReactJS Sample Text Generator</h1>
        <hr/>
        <form className="form-inline">
          <div className="form-group">
            <label><strong>Paragraphs:</strong></label>
            <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
          </div>
          <hr/>
          <div className="form-group">
            <label><strong>Include HTML:</strong></label>
            <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
          </div>
        </form>
        <br/><br/>
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
