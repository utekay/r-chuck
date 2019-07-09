import React from 'react'

import './JokeTools.css'

export default ({ onGetJokeClick }) => {
  const handleGetJokeClick = (ev) => {
    ev.preventDefault()
    onGetJokeClick()
  }
  const handleCopyLinkClick = (ev) => {
    ev.preventDefault()
    onCopyLinkClick()
  }
  return (
    <ul className="tools">
      <li className="tools__item">
        <a className="tools__link" href="/"
          onClick={handleGetJokeClick}
        >
          Random joke
        </a>
      </li>
      <li className="tools__item">
        <a className="tools__link" href="/"
          onClick={handleCopyLinkClick}
        >
          Copy link
        </a>
      </li>
    </ul>
  )
}

const onCopyLinkClick = () => {
  let input = document.createElement('input')
  document.body.appendChild(input)
  input.value = window.location.href
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  alert('Copied!')
}
