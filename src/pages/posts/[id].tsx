import { useRouter } from 'next/router'
import React from 'react'
import { GetStaticPathsContext,GetStaticPaths ,GetStaticProps,GetStaticPropsContext} from 'next'

type Props = {
  post:any
}

const PostId = ({post}: Props) => {
  const router=useRouter()
  if(!post)return null;
  return (
    <>
    <div>{post.id}</div>
    <h2>{JSON.stringify(router.query)}</h2>
    <h2>{post.title}</h2>
    </>
  )
}

export default PostId


export const getStaticPaths: GetStaticPaths=async(context: GetStaticPathsContext)=>{

  console.log('getStaticPath')
  const res=await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data= await res.json()
    return{
     paths:data.data?.map((post:any)=>({params:{id:post.id}})),
     fallback:false
    }
  }

export const getStaticProps:GetStaticProps=async(context: GetStaticPropsContext)=>{
  const postId=context.params?.id
  if(!postId)return {notFound:true}
  const res=await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data= await res.json()
  return{
    props:{
      post:data
    }
  }
}
