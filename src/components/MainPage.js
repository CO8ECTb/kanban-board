import React, {Component} from 'react';
import Column from "./Column";
import '../css/MainPage.css';
import { connect } from 'react-redux';

class MainPage extends Component{
    createColumnsList(){
        return this.props.columns.map((column)=>{
            return(
                <Column key={column.id} columnId={column.id} title={column.label}/>
            );
        });
    }
    render() {
        return (
            <div className="centred-div">
                <div className="workspace">
                    {this.createColumnsList()}
                    <Column type="addColumnButton"/>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return{
        columns: state.columns,
    }
}

export default connect(mapStateToProps,null)(MainPage)

