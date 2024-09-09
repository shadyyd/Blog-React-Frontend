import axios from "axios";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("summary", data.summary);
    formData.set("image", data.file[0]); // Getting the first file from the input
    formData.set("content", data.content);

    const token = localStorage.getItem("token");

    await axios.post(
      "https://nice-brainy-ptarmigan.glitch.me/posts/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Post Created Successfully");
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 p-4 w-9/12 my-6 flex flex-col justify-center items-center gap-3">
        <h2 className="text-xl font-bold">Create a New Post</h2>
        <form
          className="flex flex-col justify-center items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-screen max-w-md"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}

          <input
            type="text"
            placeholder="Summary"
            className="input input-bordered w-screen max-w-md"
            {...register("summary", { required: "Summary is required" })}
          />
          {errors.summary && (
            <span className="text-red-500 text-sm">
              {errors.summary.message}
            </span>
          )}

          {/* File input */}
          <input
            type="file"
            {...register("file", { required: "File is required" })}
          />
          {errors.file && (
            <span className="text-red-500 text-sm">{errors.file.message}</span>
          )}

          {/* ReactQuill for content */}
          <ReactQuill
            theme="snow"
            className="max-w-md w-screen"
            onChange={(content) => setValue("content", content)}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">
              {errors.content.message}
            </span>
          )}

          <br />
          <input
            className="btn btn-primary w-screen max-w-md my-2"
            type="submit"
            value="Create Post"
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
