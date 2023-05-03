import React from 'react'

const Character = ({ character }) => {
  return (
      <div className='characterCard'>
          <img src={character.image} alt="" />
          <div className="textContainer">
              <h4 className="name">{character.name}</h4>
              <h5 className="species">{character.species}</h5>
              <h5 className="status">{character.status}</h5>
              <h5 className="location"> Last seen -{ character.location.name }</h5>
          </div>
    </div>
  )
}

export default Character