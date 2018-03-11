require('../css/style.css')

const React = require('react')
const ReactDOM = require ('react-dom')
const Table = require('../components/html/Table.jsx')

/*const Tests = require('../components/test/Tests.jsx')
const TestCalc = require('../components/test/TestCalc.jsx')*/
const MainCalc = require('../components/calc/MainCalc.jsx')

function calcCallBack(data) {
  console.log('++++++++++calcCallBack+++++++++++  data =');
  console.dir(data);
var table = '<table>';
      table += '<tr>';
          table += '<th>Владелец</th>';
          table += '<th>Регистрация ТС</th>';
      table += '</tr>'

      table += '<tr>';
        table += '<td>'+(data.owner=='fiz' ? 'Физ.л.':'Юр.л.')+'</td>';
        table += '<td>'+(data.registration=='regRu'? 'РФ' : (data.registration=='regFo'? 'Иностр.гос-во':'Следует к МР'))+'</td>';
      table += '</tr>'

      table += '<tr>';
        table += '<td></td>';
        table += '<td></td>';

      table += '</tr>'
table +=    '</table>';
var colHeaders =['Владелец', 'Регистрация'];
var tabData = [
    [data.owner=='fiz' ? 'Физ.л.':'Юр.л.',
      data.registration=='regRu'? 'РФ' : (data.registration=='regFo'? 'Иностр.гос-во':'Следует к МР')],

    ['','']
];
      ReactDOM.render(
          <Table
              colHeaders={colHeaders}
              data={tabData}/>,
          document.getElementById('requestTable')
      )

  if(document.getElementById('tariff_values')) {
    document.getElementById('tariff_values').value = data.factors.typeTC;
    document.getElementById('request_values').value = document.getElementById('requestTable').innerHTML.toString();
    document.getElementById('premium_values').value = data.premium;
  }
}
ReactDOM.render(
/*    <Tests />,
    <TestCalc />,*/
<MainCalc
    calcCallBack = {calcCallBack}
/>,
    document.getElementById('osagoContent')
)
