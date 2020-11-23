import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
        getStyle = () => {
            return{
                backgroundColor: this.props.todo.completed ?
                '#c3c4c5' : '#f4f4f4' ,
                padding: '12px',
                borderBottom: '2px #ccc dotted',
                textDecoration: this.props.todo.completed ?
                'line-through' : 'none'
            }
        }

    render() {
        const { id, title} = this.props.todo;   //destructing to pull the variable for use in html{}
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
                    {' '}
                    {title}
                    <button style={btnStyle} onClick={this.props.delTodo.bind(this,id)}>x</button>
                </p>
            </div>
        )
    }
}

//PropTypes checkes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo:PropTypes.func.isRequired,
}

const btnStyle = {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '5px 8px',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem
