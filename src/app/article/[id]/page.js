'use client'
import React from 'react'
import {useParams} from 'next/navigation'

function ArticleDetail() {
    const {id} = useParams()
  return (
    <div>ArticleDetail {id}</div>
  )
}

export default ArticleDetail