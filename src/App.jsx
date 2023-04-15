import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  // New movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newRealeseDate, setNewRealeseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  // Function that gets all data from database
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);

      /** Here we can get data from firebase storage.
       * Exactly our data.
       * Not an status, query, pending and etc.*/
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
      // console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);

    getMovieList();
  };

  // Updating data in database (here is title)
  const updateModieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });

    getMovieList();
  };

  // Get the movie list by loading the page
  useEffect(() => {
    getMovieList();
  }, []);

  // Add movie
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newRealeseDate,
        recievedAnOskar: isNewMovieOscar,
      });

      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie title..."
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release date..."
          value={newRealeseDate}
          onChange={(e) => setNewRealeseDate(+e.target.value)}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an Oskar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>

      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>
            <h3 style={{ color: movie.recievedAnOskar && "green" }}>
              {movie.title}
            </h3>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
            <br />
            <input
              type="text"
              placeholder="New title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateModieTitle(movie.id)}>
              Update Title
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
