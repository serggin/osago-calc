const React = require('react')
const ReactDOM = require('react-dom')

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <div className="well">
          <p>CheckBox</p>

        </div>
    )
  }
}

module.exports = Content