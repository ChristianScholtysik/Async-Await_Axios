import { useState } from "react";
import { IPost } from "../models/IPost";
import axios, { AxiosResponse } from "axios";

const PostsAxios = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<string>("Initial value");

  const POST_URL = "https://jsonplaceholder.typicode.com/posts";
  const fetchPosts = () => {
    setLoading(true);
    setFetchStatus("Before loading");
    setPosts([]);

    // * statt fetch schreiben wir axios.get
    // * Vorteile von axios
    // * ich muss nicht mit response.json() umwandeln, das passiert automatisch
    // * ich muss nicht auf response.ok prüfen und selbst einen Fehler, das passiert auch automatisch
    axios
      .get(POST_URL)
      // ? statt fetch-response bekomme ich direkt die AxiosResponse mit den den Daten als JSON
      .then((response: AxiosResponse<IPost[]>) => {
        // ? die Daten stecken in response.data
        // ? wenn Axios einen Response-Code, der nicht 2xx beginnt erkennt, wird automatisch in den catch-Block gesprungen
        const posts: IPost[] = response.data;
        setPosts(posts.slice(0, 3));
        setFetchStatus("Fetching posts successful.");
      })
      .catch((error) => {
        // ? Fehler abfangen und anzeigen
        console.error(error);
        setFetchStatus("Error loading posts.");
      })
      .finally(() => {
        setLoading(false);
      });
    // * wir direkt ausgeführt - vor dem then.catch etc.
    setFetchStatus("After fetch code.");
  };

  return (
    <div>
      <h2>Fetch JSON-Placeholder Posts with axios instead of fetch</h2>
      <button onClick={fetchPosts} disabled={loading}>
        Fetch Posts
      </button>
      <p>Status: {fetchStatus}</p>
      {loading && <p>Loading...</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsAxios;
