require('../css/style.css')

const React = require('react')
const ReactDOM = require ('react-dom')
/*const Tests = require('../components/test/Tests.jsx')
const TestCalc = require('../components/test/TestCalc.jsx')*/
const MainCalc = require('../components/calc/MainCalc.jsx')

ReactDOM.render(
/*    <Tests />,
    <TestCalc />,*/
<MainCalc />,
    document.getElementById('content')
)
