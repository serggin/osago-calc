const React = require('react')
const BaseElement = require('./BaseElement.jsx')
const PropTypes = require('prop-types')

class Table extends BaseElement{
    constructor(props){
        super(props);

    }

    getExcludeProps() {
//    console.log("getExcludeProps(): TextInput4-"+this.getName());
        return ['caption', 'colHeaders','dataFoot'];
    }


    render(){
        return <table {...super.sanitizeProps()} className="table table-striped" >
            {this.props.caption ? <caption>{this.props.caption}</caption> : null}
            {this.props.colHeaders ? <thead>
            <tr>
                {this.props.colHeaders.map((header,index)=>{
                    let w = index==0 ? 1 : 2*index;
                    return <th className={"col-lg-"+w} key={index}>{header} </th>}
                )}
            </tr>
            </thead>:null}
            <tbody>


            {this.props.data.map((row,rowIndex)=>
                <tr key={rowIndex}>
                    {row.map((col, colIndex)=>
                        <td key={colIndex}>{col}</td>
                    )}
                </tr>

            )}
            </tbody>
            {this.props.dataFoot ? <tfoot>
            <tr>{this.props.dataFoot.map((value, index)=> <td key={index}>{value}</td>
            )}
            </tr>
            </tfoot>:null}
        </table>
    }
}


Table.propTypes = {
    colHeaders: PropTypes.array,
    data: PropTypes.array,
    dataFoot: PropTypes.array,
    caption:PropTypes.string
}
module.exports =  Table