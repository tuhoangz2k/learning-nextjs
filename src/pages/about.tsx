import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

type Props = {};

const About = (props: Props) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${
          router.query?._page || 1
        }`
      );
      const data = await res.json();
      setPosts(data.data);
    })();
  }, [router.query?._page]);

  const handleNextPage = () => {
    const nextPage = !router.query?._page ? 2 : Number(router.query?._page) + 1;
    router.push({ query: { _page: nextPage } }, undefined, { shallow: true });
  };

  return (
    <div>
      <h1>About</h1>
      <Header />
      <ul>
        {posts?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

// export async function getServerSideProps() {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default About;
