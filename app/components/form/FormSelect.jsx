const React = require('react')
const BaseElement = require('../html/BaseElement.jsx')
const Select = require('../html/Select.jsx')
const PropTypes = require('prop-types')

class FormSelect extends BaseElement {
    constructor(props) {
        super(props);
    }

    getExcludeProps() {
        return ['labelProps', 'divlabelProps', 'formlabel'];
    }

    render() {
        return <div className="formElement" style={{overflow: "auto"}}>
            <div className="no-padding-left no-border col-lg-3">
              <label htmlFor={this.props.id} {...this.props.labelProps}>
                  <span id={this.props.metkaId}> {this.props.metkaFormLabel}</span> {this.props.formlabel}
            </label>
            </div>

            <Select {...this.sanitizeProps()}/>

        </div>

    }
}

FormSelect.propTypes = {
    assigned: PropTypes.func,
    formlabel: PropTypes.string,
    metkaFormLabel:PropTypes.string,
    metkaId:PropTypes.string,
    label: PropTypes.string,
    labelProps: PropTypes.object,
    divlabelProps: PropTypes.object,
//    orientation: PropTypes.string,
    disabled: PropTypes.string,
}
FormSelect.defaultProps = {
   // wrapperProps: {},
    labelProps: {},
    divlabelProps: {}
}

module.exports = FormSelect;