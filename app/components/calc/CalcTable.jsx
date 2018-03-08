const React = require('react')
const Table = require('../html/Table.jsx')


class CalcTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states;
    this.colHeaders = ["Наименование", "Коэффициент"];
    this.state = {data: []};
  }

  /**
   * Получить и обновить таблицу коеэффициентов
   * @param factors
   */
  setFactors(factors) {
    var data = [];
    var factorData = this.factorData();
    for (var key in factorData) {
      var value = factors[key] ? factors[key] : 'не используется';
      data.push([factorData[key], value]);
    }
    this.setState({data: data});
  }

  factorData() {
    return {
      powerTC: 'По мощности',
      term: 'По сроку страхования',
      period: 'По периоду использования',
      kbm: 'По КБМ',
      trailer: 'По наличию прицепа',
      territory: 'По территории использования',
      limit: 'По ограничению лиц, допущенных к управлению ТС',
      crime: 'По наличию грубых нарушений условий страхования',
      driving_experience: 'Минимальный возраст и водительский стаж лиц, допущенных к управлению ТС',

      typeTC: 'Базовый тариф',
    }
  }

  /**
   * Выдать массив ключей коэффициентов (для контроллера)
   * @returns {Array}
   */
  getFactorKeys() {
    return Object.keys(this.factorData());
  }

  render() {
    return <div>
      <Table id="coeff_table" colHeaders={this.colHeaders} data={this.state.data}/>

    </div>
  }
}

module.exports = CalcTable