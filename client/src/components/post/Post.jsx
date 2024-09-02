import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  // Initializing state with default values
  const [like, setLike] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?._id) {
      setIsLiked(post?.likes?.includes(currentUser._id) || false);
    }
  }, [currentUser?._id, post?.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post?.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    if (post?.userId) {
      fetchUser();
    }
  }, [post?.userId]);

  const likeHandler = async () => {
    if (!currentUser?._id) return;

    try {
      await axios.put("/posts/" + post?._id + "/like", { userId: currentUser._id });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Failed to like the post:", err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "persons/1.jpg"
                }
                alt="Profile"
              />
            </Link>
            <span className="postUsername">{user.username || "Unknown"}</span>
            <span className="postDate">{post?.createdAt ? format(post.createdAt) : "Unknown date"}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc || "No description"}</span>
          {post?.img && <img className="postImg" src={PF + post.img} alt="Post" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt="Like"
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt="Heart"
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comments?.length || 0} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
