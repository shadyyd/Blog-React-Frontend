/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

async function deletePost(postId) {
  try {
    await axios.delete(
      `https://nice-brainy-ptarmigan.glitch.me/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Post Deleted Successfully");
  } catch (e) {
    // console.error("Failed to delete post", e);
    toast.error("Failed to delete post");
  }
}

const PostCard = ({ post }) => {
  const { _id: id, image, title, summary, user, createdAt: date } = post;
  const { user: loggedInUser } = useContext(UserContext);
  return (
    <div className="card card-side bg-gray-100 shadow-xl my-8">
      <figure className="max-w-md">
        <img src={image} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">{title}</h2>
        <span className="text-sm">
          <span className="font-normal">{user.username}</span>{" "}
          <span className="font-thin">{new Date(date).toISOString()}</span>
        </span>
        <p className="text-lg">{summary}</p>
        <div className="card-actions justify-end">
          <Link to={`/post/${id}`} className="btn btn-primary">
            Read Post Details
          </Link>
          {user?._id === loggedInUser?._id && (
            <>
              <Link to={`/post-edit/${id}`} className="btn btn-warning">
                <MdOutlineEdit />
              </Link>
              <button className="btn btn-error" onClick={() => deletePost(id)}>
                <FaRegTrashAlt />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
