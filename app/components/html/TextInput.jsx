const React = require('react')
const BaseElement = require('./BaseElement.jsx')
const PropTypes = require('prop-types')

class TextInput extends BaseElement {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.defaultValidator = this.defaultValidator.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {value: props.value ? props.value : ""};
    }
    /*  getName() {
     return "TextInput4";
     }*/
    getExcludeProps() {
//    console.log("getExcludeProps(): TextInput4-"+this.getName());
        return ['value', 'charFilter', 'assigned', 'convert'];
    }
    handleChange(event) {
        var value = event.target.value;
        if (this.props.charFilter) {
            value = value.replace(new RegExp(this.props.charFilter), '');
        }
        this.setState({value: value})
    }
    convert(value) {
//    console.debug("TextInput4.convert");
//    return value; // no default conversion
        var convertor = this.props.convert ? this.props.convert : this.convert;
        return convertor(value);
    }
    handleBlur(event) {
//    console.log("getName()="+this.getName());
//    console.dir(this);
        if (this.props.assigned) {
            var error = this.validate(this.state.value);
            if (error) {
                console.error(error);
                this.setState({error: error});
            } else
                this.props.assigned(this.convert(this.state.value));
        }
    }
    defaultValidator(value) {
        var error = null;
        if (this.props.pattern) {
            var pattern = new RegExp(this.props.pattern);
            if (!pattern.test(value))
                error = this.props.errorMessage ? this.props.errorMessage : "Value is invalid";
        }
        return error;
    }
    validate(value) {
        var validator = this.props.validator ? this.props.validator : this.defaultValidator;
        return validator(value);
    }
    componentWillReceiveProps(newProps) {
        this.setState({value:newProps.value});
    }

    render() {
        return <input type="text" {...super.sanitizeProps()}
                      value={this.state.value}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
        />
    }
}
TextInput.propTypes = {
    charFilter: PropTypes.object,
    assigned: PropTypes.func,
    validator: PropTypes.func,
    convert: PropTypes.func,
    errorMessage: PropTypes.string
}
module.exports = TextInput;