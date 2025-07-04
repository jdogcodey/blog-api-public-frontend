import { useOutletContext } from "react-router-dom";

import { useEffect } from "react";

export default function User() {
  const { user, setUser } = useOutletContext();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');

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
            console.log(result.data.user);
          } else {
            console.error("Failed to fetch user:", result.message);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user, token, baseURL, setUser]); // only runs when these change

  return (
    <main>
      {user && <h1>{user.first_name + ' ' + user.last_name}</h1>}
      {user && <h2>{user.username}</h2>}
    </main>
  );
}
