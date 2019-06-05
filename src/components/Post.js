import React from 'react';
import '../css/Post.css';
class Post extends React.Component{

    onDragStart(event, id){
        event.dataTransfer.setData('id',id);
    }

    render() {
        return (
            <div className="postFrame" id={this.props.id} onDragStart = {(e) => this.onDragStart(e, this.props.id)} draggable>
                <div className="postContent">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default Post;

