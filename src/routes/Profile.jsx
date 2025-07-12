import { useEffect, useState } from "react";
import { format } from 'date-fns'
import { useUser } from "../contexts/userContext";

export default function User() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState(null);
  const { user } = useUser();


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
  }, [user, baseURL, token])

  return (
    <main>
      {user && <h1>{user.first_name + ' ' + user.last_name}</h1>}
      {user && <h2>{user.username}</h2>}
      {posts && posts.map((post, i) => {
        return<div key={i}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{format(new Date(post.latest_edit), 'H:mm dd/MM/yy')}</p>
        </div>
        })}
    </main>
  );
}
