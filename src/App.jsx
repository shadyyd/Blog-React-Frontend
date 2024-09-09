import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import { UserProvider } from "./UserContext"; // Import the provider
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="post/:id" element={<PostDetails />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="/post-edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
