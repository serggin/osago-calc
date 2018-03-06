const React = require('react')
//const ReactDOM = require('react-dom')
const CheckBox = require('../html/CheckBox.jsx')
const RadioGroup = require('../html/RadioGroup.jsx')
const Select = require('../html/Select.jsx')
const TextInput = require('../html/TextInput.jsx')
const IntInput = require('../html/IntInput.jsx')
const Table = require('../html/Table.jsx')

class HtmlTest extends React.Component {
  constructor(props) {
    super(props)
  }
  getButtons() {
    var buttons = [
      {value: "fiz", label: "Физическое лицо", checked: false},
      {value: "yur", label: "Юридическое лицо", checked: false},
    ];
    return buttons;
  }
  getOptions(){
    return [
      {value: "fiz", label: "Физическое лицо", selected: false},
      {value: "yur", label: "Юридическое лицо", selected: false}
    ];
  }
  getTable(){
    return [
        [1,2],
        [2,3]
    ]
  }
  render() {
    return (
        <div className="well">
          <h2>Html Elements Tests</h2>
          <p>CheckBox <CheckBox /></p>
          <p>RadioGroup</p> <RadioGroup buttons={this.getButtons()} checked="yur"/>
          <p>Select <Select options={this.getOptions()}/></p>
          <p>TextInput <TextInput /> <IntInput /></p>
          <p>Table</p> <Table data={this.getTable()}/>
        </div>
    )
  }
}

module.exports = HtmlTest