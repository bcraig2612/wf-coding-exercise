import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading";

function App() {
  const max = 5000;

  const [albums, setAlbums] = useState(null);
  const [limit, setLimit] = useState(10);

  const api = "https://jsonplaceholder.typicode.com/photos";

  useEffect(() => {
    fetchAlbums();
  }, [limit]);

  const fetchAlbums = () => {
    axios.get(api).then((result) => {
      setAlbums(result.data);
    });
  };

  const handleShowMoreAlbums = () => {
    if (limit <= max) {
      setLimit(limit + 10);
    }
  };

  return (
    <>
      <div className="row row-cols-auto" style={{margin: "4px"}}>
        {albums ? (
          albums.slice(0, limit).map((album) => (
            <div className="col" key={album.id} style={{ margin: "5px 0px", padding: "0px 5px" }}>
              <div className="card" style={{ width: "150px", height: "400px", alignItems: "center", backgroundColor: "whitesmoke" }}>
                <img
                  src={album.thumbnailUrl}
                  className="img-fluid"
                  alt={album.title}
                  style={{ width: "150px" }}
                ></img>
                <div className="card-body">
                  <h5 className="card-title">{album.title}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginLeft: "10px", marginTop: "8px" }}
        disabled={limit >= max}
        onClick={handleShowMoreAlbums}
      >
        Load More
      </button>
    </>
  );
}

export default App;
