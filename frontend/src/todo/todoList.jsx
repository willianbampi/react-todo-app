import React from 'react'
import IconButton from '../template/iconButton'
import Todo from './todo'

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(elemento => (
            <tr key={elemento._id}>
                <td className={elemento.done ? 'markedAsDone' : ''}>{elemento.description}</td>
                <td>
                    <IconButton style="success" 
                                icon="check" 
                                hide={elemento.done} 
                                onClick={() => props.handleMarkAsDone(elemento)}
                    ></IconButton>
                    <IconButton style="warning" 
                                icon="undo" 
                                hide={!elemento.done} 
                                onClick={() => props.handleMarkAsPending(elemento)}
                    ></IconButton>
                    <IconButton style="danger" 
                                icon="trash-o" 
                                hide={elemento.done || !elemento.done} 
                                onClick={() => props.handleRemove(elemento)}
                    ></IconButton>
                </td>
            </tr>
        ))
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}