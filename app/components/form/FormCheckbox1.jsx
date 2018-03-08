const React = require('react')
const BaseElement = require('../html/BaseElement.jsx')
const CheckBox = require('../html/CheckBox.jsx')
const PropTypes = require('prop-types')

class FormCheckbox1 extends BaseElement {

    constructor(props) {
        super(props);
    }

    getExcludeProps() {
        //return ['labelProps','formlabel', 'disabled'];
        return ['labelProps', 'formlabel'];
    }

    render() {
        return <div className="formElement" style={{overflow: "auto"}}>

            <div className="no-padding-left no-border col-lg-3">
                <label htmlFor={this.props.id} {...this.props.labelProps}>
                    {this.props.formlabel}
                </label>
                <br/><br/>
            </div>
            <CheckBox {...this.sanitizeProps()}/>

        </div>
    }
}

FormCheckbox1.propTypes = {
    assigned: PropTypes.func,
    wrapperProps: PropTypes.object,
    formlabel: PropTypes.string,
    label: PropTypes.string,
    labelProps: PropTypes.object,
    divlabelProps: PropTypes.object,
//    orientation: PropTypes.string,
 //   disabled: PropTypes.string,
}
FormCheckbox1.defaultProps = {
    wrapperProps: {},
    labelProps: {},
    divlabelProps: {}
}


module.exports = FormCheckbox1;