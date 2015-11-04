import React from 'react'
import { Link } from 'react-router'

const Card = ({image}) => (
  <span key={image._id}>
    <Link to={`/image/${encodeURIComponent(image.filename)}`}>
      <img src={image.url} />
    </Link>
  </span>
)

export default Card
