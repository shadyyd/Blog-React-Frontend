import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../UserContext";

const PostDetails = () => {
  const { user: loggedInUser } = useContext(UserContext);

  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://nice-brainy-ptarmigan.glitch.me/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      });
  }, [post]);

  function deletePost(id) {
    axios
      .delete(`https://nice-brainy-ptarmigan.glitch.me/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Deleted post");
        window.location.href = "/";
      });
  }
  if (!post) return <div>Loading...</div>;
  if (post) {
    return (
      <div className="flex justify-center mt-10">
        <div className="bg-white w-9/12 p-6 rounded shadow-lg">
          {/* Post Title */}
          <h1 className="text-3xl font-bold text-center mb-2">{post.title}</h1>

          {/* Date and Author */}
          <div className="text-center text-gray-500 mb-4">
            <p>{post.createdAt}</p>
            <p>
              by{" "}
              <span className="text-black font-semibold">
                @{post.user.username}
              </span>
            </p>
          </div>

          {post?.user?._id === loggedInUser?._id && (
            <div className="flex justify-center mb-4">
              <Link
                to={`/post-edit/${post._id}`}
                className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-600 flex text-center items-center"
                // onClick={handleEdit}
              >
                <i className="fas fa-edit mr-2"></i> Edit this post
              </Link>
              <a
                onClick={deletePost}
                className="bg-red-600 text-white mx-2 px-4 py-2 rounded hover:bg-red-800 flex text-center items-center"
                // onClick={handleEdit}
              >
                <i className="fas fa-edit mr-2"></i> Delete this post
              </a>
            </div>
          )}

          {/* Post Image */}
          <div className="mb-4 flex justify-center">
            <img
              src={post.image} // Replace with your image URL
              alt="Post"
              className="max-w-2xl h-auto object-cover rounded"
            />
          </div>

          {/* Post Body */}
          <div className="text-lg text-gray-700 leading-relaxed">
            <p>{post.summary}</p>
            <p className="mt-4">{post.content}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default PostDetails;
