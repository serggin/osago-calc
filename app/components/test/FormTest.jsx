const React = require('react')
const FormSelect = require('../form/FormSelect.jsx')
const FormCheckbox = require('../form/FormCheckbox.jsx')
const FormCheckbox1 = require('../form/FormCheckbox1.jsx')
const FormRadioGroup = require('../form/FormRadioGroup.jsx')

class FormTest extends React.Component {
  constructor(props) {
    super(props)
  }
  getOptions(){
    return [
      {value: "fiz", label: "Физическое лицо", selected: false},
      {value: "yur", label: "Юридическое лицо", selected: false}
    ];
  }
  getButtons() {
    var buttons = [
      {value: "fiz", label: "Физическое лицо", checked: false},
      {value: "yur", label: "Юридическое лицо", checked: false},
    ];
    return buttons;
  }
  render() {
    return (
        <div className="well">
          <h2>Form Elements Tests</h2>
          <FormSelect formlabel="FormSelect" options={this.getOptions()}/>
          <FormCheckbox formlabel="FormCheckbox" label="checkbox"/>
          <FormCheckbox1 formlabel="FormCheckbox1" label="checkbox"/>
          <FormRadioGroup formlabel="FormRadioGroup" buttons={this.getButtons()}/>
        </div>
    )
  }
}

module.exports = FormTest