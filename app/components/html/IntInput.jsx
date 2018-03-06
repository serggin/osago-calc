const React = require('react')
const TextInput = require('./TextInput.jsx')
//const PropTypes = require('prop-types')

class IntInput extends TextInput {
    constructor(props) {
        super(props);
        this.props0 = Object.assign(props.pattern ? {} : {pattern:"^[\+\-]?[0-9]+$"}, props);
        super.convert = this.convert;
    }
     componentWillReceiveProps(newProps) {
        this.props0 = Object.assign(newProps.pattern ? {} : {pattern:"^[\+\-]?[0-9]+$"}, newProps);
//    console.log('IntInput newProps='+super.getName());
//    console.dir(this.props0);
    }
    convert(value) {
//    console.debug("IntInput.convert");
        return parseInt(value);
    }
    render() {
        return <TextInput {...this.props0} convert={this.convert}/>
    }
}
module.exports = IntInput;