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
          table += '<th>Лицо</th>';
          table += '<th>Рег. ТС</th>';
    table += '<th>Тип ТС</th>';
    table += '<th>Прицеп</th>';
    table += '<th>Мощность ТС</th>';
    table += '<th>Срок договора</th>';
    table += '<th>Период исп-я  ТС</th>';
    table += '<th>КБМ</th>';
    table += '<th>Регион</th>';
    table += '<th>Город</th>';
    table += '<th>Имеются грубые нарушения</th>';
    table += '<th>Без ограничений по кол-ву водителей</th>';
    table += '<th>Миним. возраст/ стаж</th>';
      table += '</tr>'

      table += '<tr>';
        table += '<td>'+(data.owner=='fiz' ? 'Физ.л.':'Юр.л.')+'</td>';
        table += '<td>'+(data.registration=='regRu'? 'РФ' : (data.registration=='regFo'? 'Иностр.гос-во':'Следует к МР'))+'</td>';
    table += '<td>'+data.typeTC+'</td>';
    table += '<td>'+(data.trailer==false? 'нет':'да')+'</td>';
    table += '<td>'+data.powerTC+'</td>';
    table += '<td>'+data.term+'</td>';
    table += '<td>'+data.period+'</td>';
    table += '<td>'+(data.kbm? data.kbm : 'kbm3')+'</td>';
    table += '<td>'+(data.regions?data.regions : '--')+'</td>';
    table += '<td>'+(data.city ? data.city : '--')+'</td>';
    table += '<td>'+(data.crime==false ? 'нет':'да')+'</td>';
    table += '<td>'+(data.limit==false ? 'нет':'да')+'</td>';
    table += '<td>'+(data.driving_experience ? data.driving_experience.label : '--')+'</td>';
      table += '</tr>';

      table += '<tr>';
        table += '<td colspan="3">Коэффициент</td>';

        table += '<td>'+(data.factors.trailer ? data.factors.trailer : '--' )+'</td>';
    table += '<td>'+(data.factors.powerTC ? data.factors.powerTC : '--' )+'</td>';
    table += '<td>'+(data.factors.term ? data.factors.term : '--' )+'</td>';
    table += '<td>'+(data.factors.period ? data.factors.period : '--' )+'</td>';
    table += '<td>'+(data.factors.kbm ? data.factors.kbm :'--')+'</td>';
    table += '<td colspan="2">Коэфф.территории '+ (data.factors.territory ? data.factors.territory : '--')+'</td>';
    table += '<td>'+(data.factors.crime ? data.factors.crime : '--' )+'</td>';
    table += '<td>'+(data.factors.limit ? data.factors.limit : '--' )+'</td>';
    table += '<td>'+(data.factors.driving_experience ? data.factors.driving_experience : '--' )+'</td>';

      table += '</tr>'
table +=    '</table>';

var selected_city_html =    '<span style="color:red; ">'+(data.city ? data.city : '--')+'</span>';
    var selected_region = data.regions ? data.regions : '--';
    var selected_city = data.city ? data.city : '--';
/*var colHeaders =['Владелец', 'Регистрация'];
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
*/
  if(document.getElementById('tariff_values')) {
    document.getElementById('tariff_values').value = data.factors.typeTC;
    document.getElementById('request_values').value = table;//document.getElementById('requestTable').innerHTML.toString();
      document.getElementById('request_city').value = selected_city_html;
      document.getElementById('request_region').value = selected_region;
    document.getElementById('premium_values').value = data.premium;
      document.getElementById('submit_button2').style.display="none";
      document.getElementById('calc_form').style.display="none";
     /* document.getElementsByName('your-name').style.display='none';
      document.getElementsByName('text-phone').style.display='none';
      document.getElementsByName('your-email').style.display='none';*/

      if(selected_region == 'Москва' || selected_region == 'Санкт-Петербург' || selected_region == 'Московская область' || selected_region == 'Ленинградская область'){
         // if (selected_city == 'Москва' || selected_city == 'Санкт-Петербург') {
          document.getElementById('submit_button2').style.display="block";
          document.getElementById('calc_form').style.display="block";
/*
         document.getElementsByName('your-name').style.display='block';
          document.getElementsByName('text-phone').style.display='block';
          document.getElementsByName('your-email').style.display='block';*/
       //   }

      }
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
