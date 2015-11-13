import React from 'react'
import { Link } from 'react-router'

const Card = ({image}) => {
  let styles = {
    'backgroundImage': `url(${image.url})`
  }
  return (
    <span key={image._id}>
      <Link to={`/image/${image.uniqueid}`}>
        <div className="image-card" style={styles}></div>
      </Link>
    </span>
  )
}

export default Card
