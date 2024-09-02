import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url;
        if (username) {
          url = "/posts/profile/" + username;
        } else if (user && user._id) {
          url = "/posts/timeline/" + user._id;
        } else {
          // Handle case where user is not available or user._id is not defined
          console.error("User is not available or user._id is not defined");
          return;
        }
        const res = await axios.get(url);
        setPosts(
          res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username, user?._id]); // Use optional chaining to safely access user._id

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
