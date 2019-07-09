import React from 'react';

import './TheJoke.css';

const TheJoke = ({ joke }) => (
  <div className="joke">
    <p>Joke #{ joke.id }</p>
    <h1 dangerouslySetInnerHTML={{__html: joke.joke}} />
  </div>
);

export default TheJoke;
