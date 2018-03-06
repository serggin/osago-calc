const React = require('react')
const BaseElement = require('./BaseElement.jsx')
const PropTypes = require('prop-types')

class RadioGroup extends BaseElement {
    constructor(props) {
        super(props);
        this.handleRadio = this.handleRadio.bind(this)
        var buttonChecked = null;
        props.buttons.map((button)=>{
            if (button.checked)
                buttonChecked = button.value;
        });
        this.state = {buttonChecked: buttonChecked};
        this.wrapperProps = props.wrapperProps;
        if (props.id)
            this.wrapperProps.id = props.id;
        this.labelDisplay = props.orientation=="vertical" ? {style:{display:"block"}} : {};
    }
    getExcludeProps() {
        return ['assigned', 'buttons', 'wrapperProps','formlabel','divlabelProps'];
    }
    handleRadio(event) {
        this.setState({buttonChecked: event.target.value})
        if (this.props.assigned) {
            this.props.assigned(event.target.value);
        }
    }
    componentWillReceiveProps(newProps) {
//    console.log('CheckBox4 componentWillReceiveProps() name='+this.props.name);
//    console.dir(newProps);
        this.setState({buttonChecked:newProps.checked});
    }
    // {...this.labelDisplay}
    render() {
        return <div {...this.wrapperProps} >
            {this.props.buttons.map((button)=>
                <label key={button.value} {...this.labelDisplay}>
                    <input type="radio" {...super.sanitizeProps()} onChange={this.handleRadio}
                           value={button.value} checked={this.state.buttonChecked == button.value}/>
                    {button.label}
                </label>
            )}
        </div>
    }
}
RadioGroup.propTypes = {
    assigned: PropTypes.func,
    wrapperProps: PropTypes.object,
    orientation: PropTypes.string
}
RadioGroup.defaultProps = {
    wrapperProps: {},
    orientation: "horizontal"
}
module.exports = RadioGroup