import { GetStaticProps,GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {
  posts:Array<any>
}

const index:React.FC<Props> = ({posts}) => {
  return (
    <div>
      <h1>post list</h1>
      <ul>
        {posts?.map(post =><li key={post?.id}><Link href={`posts/${post.id}`} legacyBehavior><a>{post?.title}</a></Link></li>)}
      </ul>
    </div>
  )
}

export default index

export const getStaticProps:GetStaticProps<Props>=async(context: GetStaticPropsContext)=>{

  const res=await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data= await res.json()
  return{
    props:{
      posts:data.data.map((post:any)=>({id:post.id,title:post.title}))
    }
  }
}