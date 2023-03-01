import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { GetServerSidePropsContext } from "next";

type Props = {
  post: any;
};

const Parampage = ({ post }: Props) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  console.log(router);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((x) => {
        if (x > 60) clearInterval(intervalId);
        console.log("hi");
        return x + 1;
      });
    }, 1000);
    return clearInterval(intervalId);
  }, []);
  return (
    <>
      <div>Parampage</div>
      <h1>{seconds}</h1>
      <h2>{JSON.stringify(router.query)}</h2>
      <h5>{post?.author}</h5>
      <h5>{post?.description}</h5>
    </>
  );
};

export default Parampage;
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader("Cache-Control", "s-maxage=5");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const postId = context.query?.postId;
  if (!postId)
    return {
      props: { query: context.query },
    };
  const res = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await res.json();
  return {
    props: {
      query: context.query,
      post: data,
    },
  };
};
