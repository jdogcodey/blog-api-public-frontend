import { useNavigate, useOutletContext } from "react-router-dom";

import { useEffect, useState } from "react";

import { format } from 'date-fns'

export default function Profile() {
  const { user, setUser } = useOutletContext();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState(null);
  let navigate = useNavigate()
  useEffect(() => {if (!user && !token) {
    navigate('/login')
  }
})

  useEffect(() => {
    if (!user && token) {
      (async function getUser() {
        try {
          const response = await fetch(`${baseURL}/user`, {
            method: 'GET',
            headers: {
              "Content-Type": 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          const result = await response.json();

          if (response.ok) {
            setUser(result.data.user);
          } else {
            console.error("Failed to fetch user:", result.message);
            navigate('/login')
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user, token, baseURL, setUser, navigate]);

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
