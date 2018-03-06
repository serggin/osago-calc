const React = require('react')
const BaseElement = require('./BaseElement.jsx')
const PropTypes = require('prop-types')

class CheckBox extends BaseElement{
    constructor(props){
        super(props);
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.state = {checked:props.checked}
//    console.log('CheckBox4 name='+props.name+' checked='+props.checked);
    }
    getExcludeProps() {
        return ['assigned', 'buttons', 'wrapperProps','formlabel','divlabelProps' ];
    }

    handleCheckbox(event){
        this.setState({checked:event.target.checked})
        if (this.props.assigned) {
            this.props.assigned(event.target.checked);
        }
    }
    componentWillReceiveProps(newProps) {
//    console.log('CheckBox4 componentWillReceiveProps() name='+this.props.name);
//    console.dir(newProps);
        this.setState({checked:newProps.checked});
    }
    render(){
        return <span>
      <input type="checkbox" {...super.sanitizeProps()} value={this.state.checked}  checked={this.state.checked} onChange={this.handleCheckbox} />
            {this.props.label}
    </span>
    }

}
CheckBox.propTypes = {
    assigned: PropTypes.func

}

module.exports = CheckBox