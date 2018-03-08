const React = require('react')
const OsagoPremium = require('../calc/OsagoPremium.jsx')
const CalcForm = require('../calc/CalcForm.jsx')
const CalcTable = require('../calc/CalcTable.jsx')

const OsagoModel = require('../calc/OsagoModel.js')
const OsagoController = require('../calc/OsagoController.js')
const OsagoView = require('../calc/OsagoView.js')


class MainCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {which: "table"};

    this.model = new OsagoModel();
    this.controller = new OsagoController(this.model);
    this.view = new OsagoView(this.model, this.controller);
  }

/*  getInitialStates() {
    return {
      owner: {buttonChecked: "fiz"},
      registration: {buttonChecked: "regRu"},
      trailer: {checked: false},
      limit: {checked: false},
      region: {region: null},
      crime: {checked: false},
      kbm:{selected:false},

    }
  }*/
  /**
   * Проверить готовность компонентов интерфейса и связать контроллер с собой
   */
  checkReady() {
        if (this.calcForm && this.calcTable && this.displayPremium)
          this.controller.setView(this);
  }

  render(){
    return this.view.render();
  }


}

module.exports = MainCalc