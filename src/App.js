import React from 'react';

import './App.css';

import TheJoke from './components/TheJoke'
import JokeTools from './components/JokeTools'
import TheFooter from './components/TheFooter'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      joke: null
    }

    this.onSpaceKeyDown = this.onSpaceKeyDown.bind(this)
    this.onGetJokeClick = this.onGetJokeClick.bind(this)
    this.onPopState = this.onPopState.bind(this)
  }

  async getJoke (id) {
    await this.setState({
      error: null,
      joke: null
    })

    let data

    const url = id
      ? `http://api.icndb.com/jokes/${id}`
      : 'http://api.icndb.com/jokes/random'

    try {
      const response = await fetch(url)
      data = await response.json()
    } catch (e) {
      return this.setState({
        error: e
      })
    }

    await this.setState({
      joke: data.value
    })
    window.history.replaceState(this.state.joke, '', `/${this.state.joke.id}`)
  }

  onGetJokeClick () {
    this.getJoke()
  }

  onSpaceKeyDown (ev) {
    if (ev.which === 32) {
      this.getJoke()
    }
  }

  onPopState (ev) {
    this.setState({
      joke: ev.state
    })
  }

  componentDidMount () {
    if (window.location.pathname === '/') {
      this.getJoke()
      return
    }

    const matched = window.location.pathname.match(/^\/(\d+)$/)
    if (matched) {
      this.getJoke(matched[1])
      return
    }

    const error = new Error("404")
    this.setState({
      error
    })
  }

  componentWillMount () {
    window.addEventListener('keydown', this.onSpaceKeyDown)
    window.addEventListener('popstate', this.onPopState)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onSpaceKeyDown)
    window.removeEventListener('popstate', this.onPopState)
  }

  render () {
    return (
      <div className="app">
        <div className="app__main">
          { this.state.joke ? (
            <TheJoke joke={this.state.joke} />
          ) : (
            this.state.error ? (
              <p>{this.state.error.message}</p>
            ) : (
              <p>Loading...</p>
            )
          )}
          <JokeTools onGetJokeClick={this.onGetJokeClick} />
        </div>
        <div className="app__footer">
          <TheFooter />
        </div>
      </div>
    )
  }
}

export default App;
