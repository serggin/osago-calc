const React = require('react')
const Table = require('../html/Table.jsx')
const PropTypes = require('prop-types')
const number_format = require('../../utils/number_format.js')

class OsagoPremium extends React.Component{
  constructor(props) {
    super(props);
    this.state = {premium:0};
  }

  setPremium(premium){
    console.log('setPremium premium = '  +premium);
    this.setState({premium: premium});
  }

  render() {
    return <div>
      <div className="col-lg-6">Страховая премия: </div>
      <div className="col-lg-6">{this.state.premium ? (number_format(this.state.premium,2, ',', ' ')) +' руб.': 'Мало данных для расчета'  }  </div>

    </div>
  }


}

OsagoPremium.propTypes = {
  premium: PropTypes.string
}

module.exports = OsagoPremium