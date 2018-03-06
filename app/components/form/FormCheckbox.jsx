const React = require('react')
const BaseElement = require('../html/BaseElement.jsx')
const CheckBox = require('../html/CheckBox.jsx')
const PropTypes = require('prop-types')

class FormCheckbox extends BaseElement {
    constructor(props) {
        super(props);
    }

    getExcludeProps() {
        return ['labelProps'];
    }

    render() {
        return <div className="formElement" style={{overflow: "auto"}}>
            <label htmlFor={this.props.id} {...this.props.labelProps}>
                {this.props.formlabel}
            </label>
            <CheckBox {...this.sanitizeProps()}/>
        </div>
    }
}

FormCheckbox.propTypes = {
    assigned: PropTypes.func,

    formlabel: PropTypes.string,
    label: PropTypes.string,
    labelProps: PropTypes.object,
    divlabelProps: PropTypes.object,
//    orientation: PropTypes.string
}
FormCheckbox.defaultProps = {
    wrapperProps: {},
    labelProps: {},
    divlabelProps: {}
}

module.exports = FormCheckbox;


