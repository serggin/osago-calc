const React = require('react')
const BaseElement = require('./BaseElement.jsx')
const PropTypes = require('prop-types')

class Select extends BaseElement {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        if(props.selected){
/*          for (var i=0; i<props.options.length; i++) {
              if(props.options[i].value===props.selected){
//                props.options[i].selectedIndex = i;
                props.options[i].selected = true;
//                break;
              } else
                props.options[i].selected = false;
          }*/

           this.state = {selected: props.selected}
        }else{
          var selected = '';
          props.options.map((option)=>{
            if (option.selected)
              selected = option.value;
          });
          this.state = {selected: selected}
        }

    }
    handleChange(event){
        this.setState({
            selected:event.target.value
        });
        if (this.props.assigned) {
            this.props.assigned(event.target.value);
        }
    }
    getExcludeProps() {
        return ['assigned', 'options','enabled'];
    }
    componentWillReceiveProps(newProps) {
//    console.log("componentWillReceiveProps() name="+newProps.name);
        var selected = ''; // для нового
        // this.state.selected = старое
//    console.log("newProps.options.length="+newProps.options.length);
//    console.log("this.state.selected="+this.state.selected);
        if (newProps.options.length == 1)
            selected = newProps.options[0].value;
        else if(newProps.options.length>1) {
            for (var i=0; i<newProps.options.length; i++) {
                var option = newProps.options[i];
                if (option.selected) {
                    selected = option.value;
                    break;
                }
                if (option.value == this.state.selected) {
//          selected = option.value;
//          break;
                    return;
                }
            }
        } else if(newProps.options.length==0) {
            selected = '';
        }
//    console.log("selected="+selected);
        if (this.state.selected != selected)
            this.setState({
                selected:selected
            });
    }

    render(){
        /*
         {this.state.selected=='' && this.props.options.length>1 ?
         т.е. если только 1 опция, то placeholder не ставится!
         */
      console.log('/*/*/*/*/ select '+this.props.name);

        return <select {...super.sanitizeProps()}
                       value={this.state.selected}
                       onChange={this.handleChange}
                       disabled={!this.props.enabled ? null : 'disabled'}
        >
            {this.state.selected=='' && this.props.options.length>1 ?
                <option value="" disabled hidden>-- { this.props.placeholder ? this.props.placeholder : 'Сделайте выбор' }--</option>:''
            }
            {this.props.options.map((option)=>
                <option key={option.value} value={option.value}>{option.label}</option>
            )}
        </select>
    }
}
Select.propTypes = {
    assigned: PropTypes.func,
    options: PropTypes.array,
  selected:PropTypes.string
}
Select.defaultProps = {
  selected: null
}
module.exports = Select