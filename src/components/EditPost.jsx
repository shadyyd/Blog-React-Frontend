import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPost = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm();
  const { id } = useParams();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("summary", data.summary);
    formData.set("content", data.content);
    // Check if a file is uploaded
    if (data.file && data.file.length > 0) {
      formData.set("image", data.file[0]); // Only append the file if it exists
    }

    const token = localStorage.getItem("token");

    await axios.patch(
      `https://nice-brainy-ptarmigan.glitch.me/posts/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Post Updated Successfully");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`https://nice-brainy-ptarmigan.glitch.me/posts/${id}`)
      .then((res) => {
        setValue("title", res.data.title);
        setValue("summary", res.data.summary);
        setValue("content", res.data.content); // Set initial content in Quill
      });
  }, [id, setValue]);

  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 p-4 w-9/12 my-6 flex flex-col justify-center items-center gap-3">
        <h2 className="text-xl font-bold">Edit Post</h2>
        <form
          className="flex flex-col justify-center items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-screen max-w-md"
            {...register("title")}
          />

          <input
            type="text"
            placeholder="Summary"
            className="input input-bordered w-screen max-w-md"
            {...register("summary")}
          />

          <input type="file" {...register("file")} />

          {/* Update value of ReactQuill */}
          <ReactQuill
            theme="snow"
            className="max-w-md w-screen"
            value={watch("content") || ""} // Set initial value from the form
            onChange={(content) => setValue("content", content)} // Update form value on content change
          />

          <br />
          <input
            className="btn btn-primary w-screen max-w-md my-2"
            type="submit"
            value="Update Post"
          />
        </form>
      </div>
    </div>
  );
};

export default EditPost;
