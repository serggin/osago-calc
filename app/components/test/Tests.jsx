const React = require('react')
const RadioGroup = require('../html/RadioGroup.jsx')
const HtmlTest = require('./HtmlTest.jsx')
const FormTest = require('./FormTest.jsx')

class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.radioGroupHandler = this.radioGroupHandler.bind(this)
    this.state = {which: "form"};
  }
  getButtons() {
    return [
      {value: "html", label: "Html Elements Tests", checked: false},
      {value: "form", label: "Form Elements Tests", checked: false},

    ];
  }
  radioGroupHandler(value) {
    this.setState({which: value});
  }
  render() {
    return (
      <div className="well">
        <RadioGroup name="tests" buttons={this.getButtons()} assigned={(v)=>this.radioGroupHandler(v)}
                    checked={this.state.which}/>
        <div id="test-content">
          <div style={{display: this.state.which=='html' ? 'block' : 'none'}}>
            <HtmlTest />
          </div>
          <div style={{display: this.state.which=='form' ? 'block' : 'none'}}>
            <FormTest />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Tests