const React = require('react')
const OsagoPremium = require('../calc/OsagoPremium.jsx')
const CalcForm = require('../calc/CalcForm.jsx')
const CalcTable = require('../calc/CalcTable.jsx')

const OsagoModel = require('../calc/OsagoModel.js')
const OsagoController = require('../calc/OsagoController.js')
const OsagoView = require('../calc/OsagoView.js')
const PropTypes = require('prop-types')

class MainCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {which: "table"};

    this.model = new OsagoModel();
    this.controller = new OsagoController(this.model);
    this.view = new OsagoView(this.model, this.controller);
    if(props.calcCallBack){
      this.view.setCallBack(props.calcCallBack);
    }
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


  render(){
    return this.view.render();
  }


}
MainCalc.propTypes = {
  calcCallBack: PropTypes.func
}
MainCalc.defaultProps = {
  calcCallBack: null
}
module.exports = MainCalc