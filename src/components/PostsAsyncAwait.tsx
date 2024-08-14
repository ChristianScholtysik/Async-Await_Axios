import { useState } from "react";
import { IPost } from "../models/IPost";
import { startWaitTimer } from "../waitTimer";

const PostsAsyncAwait = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<string>("Initial value");

  const POST_URL = "https://jsonplaceholder.typicode.com/posts";
  // * Async-await Aufruf der API

  // ? alternative Schreibweise mit klassischer function
  async function fetchPostsClassic() {}

  // ? in der Arrow-Function muss ich ein async vor die runden Klammern schreiben
  const fetchPosts = async () => {
    setLoading(true);
    setFetchStatus("Before loading");
    setPosts([]);

    // * wir müssen dann ein try-catch-finally um unseren API-Aufruf machen
    // ? wir wollen Fehler mit catch abfangen und auch ein finally
    // ? zur Verfügung haben
    try {
      // ? der Aufruf der API mit fetch und await
      // ? es muss ein await vor den fetch-Aufruf
      // ? ich muss mir das Ergebnis in einer Variable response speichern
      // * Warten auf das Ergebnis, solange nichts anderes machen
      const response = await fetch(POST_URL);
      // ? eigene Verzögerung einbauen mit Funktion, die setTimeout intern nutzt
      await startWaitTimer(3000);
      // ? auch hier prüfen wir, ob die Response ok ist
      if (!response.ok) {
        throw new Error();
      }
      // ? auch das Umwandeln der Daten in JSON ist ein Promise
      // ? deshalb muss ich hier auch nochmal await vorne dran schreiben
      // * Warten auf das Ergebnis, solange nichts anderes machen
      const posts: IPost[] = await response.json();
      if (posts && posts.length && posts.length >= 3) {
        setPosts(posts.slice(0, 3));
        setFetchStatus("Fetching posts successful.");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      setFetchStatus("Error loading posts.");
    } finally {
      setLoading(false);
    }
    // * wird wirklich erst am Ende ausgeführt, weil vorher auf
    // * alle Ergebnisse mit await gewartet wird
    setFetchStatus("After fetch code.");
  };

  return (
    <div>
      <h2>Fetch JSON-Placeholder Posts with async await</h2>
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

export default PostsAsyncAwait;
