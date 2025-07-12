import { useEffect, useState } from "react";
import { format } from 'date-fns'
import { useUser } from "../contexts/userContext";


export default function User() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
  })

  useEffect(() => {
    if (user) {
      (async function getPosts() {
        try {
          const response = await fetch(`${baseURL}/posts`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          const result = await response.json();

          if (response.ok) {
            setPosts(result.data.blogPosts)
          } else {
            console.error("Failed to fetch posts:", result.message);
          }
        } catch (err) {
          console.log(err)
        }
      })()
    }
  }, [user, baseURL, token]);

  const toggleComments = (index) => {
    setExpandedPosts(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
  }


  return (
    <main>
      {user && (
        <>
          <h1>{user.first_name + ' ' + user.last_name}</h1>
          <h2>{user.username}</h2>
        </>
      )}

      {Array.isArray(posts) && posts.map((post, index) => {
        const isExpanded = expandedPosts.includes(index);
        const commentsToShow = isExpanded
          ? post.comments
          : post.comments?.slice(0, 2);

        return (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{format(new Date(post.latest_edit), 'H:mm dd/MM/yy')}</p>

            <h4>Comments</h4>
            <div id="comment-section">
              {commentsToShow?.map((comment, i) => (
                <div key={i}>
                  <p>{comment.content}</p>
                  <p>{comment.user.username}</p>
                </div>
              ))}

              {post.comments?.length > 2 && (
                <button onClick={() => toggleComments(index)}>
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
