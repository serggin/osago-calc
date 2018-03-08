const React = require('react')
const PropTypes = require('prop-types')

class BaseElement extends React.Component {
    constructor(props) {
        super(props);

    }
    sanitizeProps() {
        var exclude = this.getExcludeProps();
        if (exclude.length == 0)
            return this.props;
        var props0 = {};
        for (let [key, value] of Object.entries(this.props)) {
            if (exclude.indexOf(key) == -1)
                props0[key] = value;
        }
        return props0;
    }
    getExcludeProps() {
//    console.log("getExcludeProps(): BaseElement-"+this.getName());
        return [];
    }


}
BaseElement.propTypes = {
  enabled: PropTypes.bool
}

BaseElement.defaultProps = {
  enabled: true

}


module.exports = BaseElement