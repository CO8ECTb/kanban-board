import React from 'react';
import '../css/AddContent.css'
import * as actionCreators from '../actions/ColumnActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddButton from "./AddButton";

class AddContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true,
        };
    }

    replace() {
        this.setState({visible: !this.state.visible})
    }
    createContent(){
        if(this.props.type === 'card'){
            this.createNewPost();
        } else if (this.props.type ==='column')this.createNewColumn()
        this.replace();
    }

    saveTextValue(e){
        if(this.props.type === 'card'){
            this.props.setCardText(e.target.value);
        } else if (this.props.type ==='column') this.props.setColumnText(e.target.value);
    }

    createNewColumn(){
        this.props.addColumn(this.props.columnText)
    }

    createNewPost(){
        this.props.addCard(this.props.columnId,this.props.cardText)
    }

    createTextArea(){
        let maxInputLength;
        if(this.props.type === "column") maxInputLength = 30;
        else if (this.props.type === "card") maxInputLength = 300;
        return(
            <input id="textArea" type="text" maxLength={maxInputLength} rows={this.props.rows} className="textArea"
                   required autoFocus='autoFocus' minLength="2" placeholder={this.props.textAreaPlaceholder}
                   onChange={(e)=>{this.saveTextValue(e)}}>
            </input>
        );

    }

    render() {

        if(this.state.visible) {
            return (
                <form
                    onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.createContent();
                            }
                            if(e.key === "Escape"){
                                e.preventDefault();
                                this.replace();
                            }
                        }
                    }
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.createContent();
                        }
                    }>
                    <div className="postFrame">
                        <div className="textAreaBlock">
                            {this.createTextArea()}
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="submitButton"
                        value={this.props.submitTitle}/>
                    <a className="closeIcon" onClick={this.replace.bind(this)}>
                        <i className="fas fa-times"/>
                    </a>
                </form>
            );
        } else {
            let buttonText;
             if(this.props.type === "card") {
                 buttonText = 'Добавить карточку';
                 return (<AddButton text={buttonText} type={this.props.type}
                                    columnId={this.props.columnId}/>)
            }
            else if(this.props.type === "column") {
                if(this.props.columns.length > 0) buttonText = 'Добавить еще одну колонку';
                else buttonText = 'Добавить колонку';
                return (<AddButton text={buttonText} type={this.props.type}
                                   columnId={this.props.columnId}/>);
            }
        }
    }
}

function mapStateToProps(state) {
    return{
        columns: state.columns,
        cards: state.cards,
        columnText: state.columnText,
        cardText: state.cardText,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addColumn: actionCreators.addColumn,
        setColumnText: actionCreators.setColumnText,
        addCard: actionCreators.addCard,
        setCardText: actionCreators.setCardText,
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(AddContent)
