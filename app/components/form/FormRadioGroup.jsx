const React = require('react')
const BaseElement = require('../html/BaseElement.jsx')
const RadioGroup = require('../html/RadioGroup.jsx')
const PropTypes = require('prop-types')

class FormRadioGroup extends BaseElement {
    constructor(props) {
        super(props);
    }

    getExcludeProps() {
        return ['labelProps'];
    }

    render() {
        return <div className="formElement" style={{overflow: "auto"}}>
            <div className="no-padding-left no-border col-lg-3">
              <label htmlFor={this.props.id} {...this.props.labelProps}>
                {this.props.formlabel}
              </label>
            </div>
            <RadioGroup {...this.sanitizeProps()}/>
        </div>
    }
}
FormRadioGroup.propTypes = {
    assigned: PropTypes.func,
    wrapperProps: PropTypes.object,
    formlabel: PropTypes.string,
    labelProps: PropTypes.object,
    orientation: PropTypes.string,
    disabled: PropTypes.string,
}
FormRadioGroup.defaultProps = {
    wrapperProps: {style: {display: "inline-block"}},
    labelProps: {},

}
module.exports = FormRadioGroup;