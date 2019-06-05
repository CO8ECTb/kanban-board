import React from 'react';
import '../css/AddButton.css'
import AddContent from "./AddContent";


class AddButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true
        };
    }

    replace() {
        this.setState({visible: !this.state.visible})
    }

    render() {
        if (this.state.visible) {
            return (
                <button className="addButton" onClick={this.replace.bind(this)}>
                    <i className='fas fa-plus'/>
                    <a>{this.props.text}</a>
                </button>
            );
        }
        else {
            if(this.props.type === "column")
            return (
                <AddContent
                    rows = '1'
                    submitTitle='Добавить колонку'
                    textAreaPlaceholder='Введите название колонки'
                    type={this.props.type}
                />
            );
            else if(this.props.type === "card") return (
                <AddContent
                    rows='2'
                    textAreaPlaceholder = "Введите название карточки"
                    submitTitle = "Добавить карточку"
                    columnId = {this.props.columnId}
                    type={this.props.type}/>

            );
        }
    }
}

export default AddButton;
