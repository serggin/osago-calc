const React = require('react')
const Table = require('../html/Table.jsx')
const number_format = require('../../utils/number_format.js')

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
      data.push([factorData[key], number_format(value, 2, ',', ' ')]);
    }
    this.setState({data: data});
  }

 /* number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
          var k = Math.pow(10, prec);
          return '' + (Math.round(n * k) / k)
                  .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1)
          .join('0');
    }
    return s.join(dec);
  }*/

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
      <Table id="coeff_table" colHeaders={this.colHeaders} data={this.state.data} enabled='false'/>

    </div>
  }
}

module.exports = CalcTable