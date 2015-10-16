import React from 'react'
import { Link } from 'react-router'

const Brief = ({post}) => (
  <div className="brief">
    <Link to={`/apps/blog/posts/${post._id}`} className="title">
      <strong>{post.title}</strong>
    </Link>
    <p className="description">{post.blurb}</p>
  </div>
)

export default Brief
