const React = require('react')
const Table = require('../html/Table.jsx')
const PropTypes = require('prop-types')

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
      <div className="col-lg-7">Страховая премия (руб.): </div>
      <div className="col-lg-5">{this.state.premium ?  this.state.premium : 'Мало данных для расчета'  }  </div>

    </div>
  }


}

OsagoPremium.propTypes = {
  premium: PropTypes.string
}

module.exports = OsagoPremium