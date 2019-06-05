import React,{Component} from 'react';
import '../css/Column.css';
import '../assets/fonts/fontawesome-free-5.8.2-web/css/all.min.css'
import AddButton from "./AddButton";
import Post from "./Post";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/ColumnActions";

class Column extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true,
            addColumnDefaultText:'Добавить колонку',
            addCardDefaultText:'Добавить карточку',
            columnFixStyle : {
                height: window.innerHeight * 0.95,
                width: window.innerWidth * 0.2,
            },
            overflowBlockMaxHeight : {
                maxHeight: window.innerHeight*0.8,
            }
        };

        if(this.props.columns.length !== 0)
            this.state.addColumnDefaultText = 'Добавить еще одну колонку';

    }

    createCardsList(){
        return this.props.cards.map((card)=>{
            if(this.props.columnId === card.columnId)
            return(<Post key={card.id} id={card.id}  columnId={card.columnId} content={card.label}/>);
            else return true;
        });
    }

    onDragOver = (ev) => {
        ev.preventDefault();

    };

    onDrop = (ev) => {
        this.props.changeCardColumn(ev.dataTransfer.getData("id"), this.props.columnId);
    };

    renderComponents(){
        if (this.props.type === 'addColumnButton') {
             return (
                     <AddButton text={this.state.addColumnDefaultText} type='column' columnId={this.props.columnId}/>
             );
        } else return (
            <div>
                <h3 className="columnTitle">{this.props.title}</h3>
                <div className="text" style={this.state.overflowBlockMaxHeight}>
                    {this.createCardsList()}
                </div>
                <AddButton text={this.state.addCardDefaultText} type='card' columnId={this.props.columnId}/>
            </div>
        );
    }

    render() {
            return (
                <div className="fixedColumn" style={this.state.columnFixStyle} onDrop={(e)=>{this.onDrop(e)}} onDragOver={(e)=>{this.onDragOver(e)}}>
                    <div className="column">
                        {this.renderComponents()}
                    </div>
                </div>
            );
    }
}


function mapStateToProps(state) {
    return{
        cards: state.cards,
        columns: state.columns
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeCardColumn: actionCreators.changeCardColumn,
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(Column)

