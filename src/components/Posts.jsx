/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      axios.get("https://nice-brainy-ptarmigan.glitch.me/posts").then((res) => {
        setPosts(res.data.posts);
      });
    } catch (err) {
      // console.error(err);
    }
  }, []);
  if (!posts) {
    return <h1>Loading...</h1>;
  }

  if (posts) {
    return (
      <>
        {posts.length > 0 &&
          posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
      </>
    );
  }
};

export default Posts;
