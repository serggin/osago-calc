require('../css/style.css')

const React = require('react')
const ReactDOM = require ('react-dom')
const Tests = require('../components/test/Tests.jsx')
const TestCalc = require('../components/test/TestCalc.jsx')


ReactDOM.render(
/*    <Tests />, */
    <TestCalc />,
    document.getElementById('content')
)
