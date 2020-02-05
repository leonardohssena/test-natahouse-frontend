import React, { Component } from 'react'
import api from '../../services/api'

import './styles.css'

import Loading from '../../components/Loading'

export default class Main extends Component {
  state = {
    starships: [],
    starshipInfo: {},
    page: 1,
    mglt: '',
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.loadStarships()
  }

  loadStarships = async (page = 1) => {
    this.setState({ loading: true })
    const { mglt } = this.state
    const { data: { docs, ...starshipInfo } } = await api.get(`/starship/stops?mglt=${mglt || 0}&page=${page}&limit=5`)
    this.setState({ starships: docs, starshipInfo, page, loading: false })
  }

  prevPage = () => {
    const { page } = this.state

    if (page === 1) return
    this.loadStarships(page - 1)
  }

  nextPage = () => {
    const { page, starshipInfo } = this.state

    if (page === starshipInfo.pages) return
    this.loadStarships(page + 1)
  }

  render() {
    const { loading, starships, page, starshipInfo, mglt } = this.state
    return (
      <div className="container">
        { loading ? <Loading /> : null }
        <h3>Calcule o número de paradas para a distancia em MGLT informada</h3>
        <form onSubmit={this.handleSubmit} className="formMGLT">
          <div className="input">
            <label htmlFor="mglt">MGLT</label>
            <input
              id="mglt"
              type="number"
              placeholder="Insira a distancia em mega lights (MGLT)"
              value={mglt}
              onChange={e => this.setState({ mglt: e.target.value })}
            />
          </div>
          <button type="submit">Calcular</button>
        </form>
        <div className="starship-list">
          {starships.map(({ name, consumables, MGLT, stops }) => (
            <article key={name}>
              <p><strong>Aeronave: </strong>{name}</p>
              <p><strong>Duração dos suprimentos: </strong>{consumables}</p>
              <p><strong>Distancia em Megalights por hora: </strong>{MGLT}</p>
              <p><strong>Número de paradas necessária: </strong>{stops}</p>
            </article>
          ))}
          { starships.length ?
            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
              <button disabled={page === starshipInfo.pages} onClick={this.nextPage}>Próxima</button>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}
