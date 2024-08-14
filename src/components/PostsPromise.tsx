import { useState } from "react";
import { IPost } from "../models/IPost";

const PostsPromise = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<string>("Initial value");

  const POST_URL = "https://jsonplaceholder.typicode.com/posts";
  const fetchPosts = () => {
    setLoading(true);
    setFetchStatus("Before loading");
    setPosts([]);

    // * wir registrieren uns hier auch nur auf die Antwort der API
    // * Code im then wird erst beim Erfüllen des Promise von der API ausgeführt
    fetch(POST_URL)
      .then((response: Response) => {
        // ? erster Schritt: prüfen, ob der Response-Code ok ist
        // ? wenn nicht dann Fehler werfen
        if (!response.ok) {
          throw new Error();
        }
        // ? Response in JSON-Format umwandeln
        return response.json();
      })
      .then((posts: IPost[]) => {
        // ? die ersten 3 Posts in den State schreiben
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
      <h2>Fetch JSON-Placeholder Posts with Promise.then</h2>
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

export default PostsPromise;
