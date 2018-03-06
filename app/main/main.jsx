require('../css/style.css')

const React = require('react')
const ReactDOM = require ('react-dom')
const Tests = require('../components/test/Tests.jsx')


ReactDOM.render(
    <Tests />,
    document.getElementById('content')
)
