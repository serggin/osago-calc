const React = require('react')
const RadioGroup = require('../html/RadioGroup.jsx')
const CalcForm = require('../calc/CalcForm.jsx')
const CalcTable = require('../calc/CalcTable.jsx')
const OsagoModel = require('../calc/OsagoModel.js')
const OsagoController = require('../calc/OsagoController.js')
const OsagoView = require('../calc/OsagoView.js')
const OsagoPremium = require('../calc/OsagoPremium.jsx')

class TestCalc extends React.Component {
  constructor(props) {
    super(props);
    this.radioGroupHandler = this.radioGroupHandler.bind(this)
    this.state = {which: "table"};

    this.model = new OsagoModel();
    this.controller = new OsagoController(this.model);
    this.view = new OsagoView(this.model, this.controller);
  }
  getButtons() {
    return [
      {value: "form", label: "CalcForm", checked: false},
      {value: "table", label: "CalcTable", checked: true},
      {value: "premium", label: "OsagoPremium", checked: false},
    ];
  }
  radioGroupHandler(value) {
    this.setState({which: value});
  }
  getInitialStates() {
    return {
      owner: {buttonChecked: "fiz"},
      registration: {buttonChecked: "regRu"},
      trailer: {checked: false},
      limit: {checked: false},
      region: {region: null},
      crime: {checked: false},
      kbm:{selected:false},

    }
  }
  /**
   * Проверить готовность компонентов интерфейса и связать контроллер с собой
   */
  checkReady() {
    /*    if (this.calcForm && this.calcTable && this.displayPremium)
          this.controller.setView(this);*/
  }

  render() {
    return (
        <div className="well">
          <RadioGroup name="tests" buttons={this.getButtons()} assigned={(v)=>this.radioGroupHandler(v)}
                      checked={this.state.which}/>
          <div id="test-content">
            <div style={{display: this.state.which=='form' ? 'block' : 'none'}}>
              <CalcForm
                  view={this.view}
                  states={this.getInitialStates()}
                  ref={(element)=>{this.calcForm = element; this.checkReady()}}/>
            </div>
            <div style={{display: this.state.which=='table' ? 'block' : 'none'}}>
              <CalcTable/>
            </div>
            <div style={{display: this.state.which=='premium' ? 'block' : 'none'}}>
              <OsagoPremium/>
            </div>
          </div>
        </div>
    )
  }
}

module.exports = TestCalc