import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3000/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            list: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(response => this.setState({
                ...this.state,
                description,
                list: response.data
            }))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            description: event.target.value
        })
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(response => this.refresh())
    }

    handleRemove(element) {
        axios.delete(`${URL}/${element._id}`)
            .then(response => this.refresh(this.state.description))
    }

    handleMarkAsDone(element) {
        axios.put(`${URL}/${element._id}`, {
            ...element,
            done: true
        }).then(response => this.refresh(this.state.description))
    }

    handleMarkAsPending(element) {
        axios.put(`${URL}/${element._id}`, {
            ...element,
            done: false
        }).then(response => this.refresh(this.state.description))
    }

    handleClear() {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"></PageHeader>
                <TodoForm
                    description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                ></TodoForm>
                <TodoList
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove}
                ></TodoList>
            </div>
        )
    }
}