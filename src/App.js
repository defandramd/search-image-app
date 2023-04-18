import { GalleryData } from "./GalleryData";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [collection, setCollection] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");

  useEffect(() => {
    setData(GalleryData);
    setCollection([...new Set(GalleryData.map((item) => item.kategori))]);

  }, []);

  const galleryFilter = (itemData) => {
    const filterData = GalleryData.filter((item) => item.kategori === itemData);
    setData(filterData);
    setSelectedKategori(itemData);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filterData = GalleryData.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(query)
    );
    setData(filterData);
    setSelectedKategori("");
  };

  return (
    <div className="App">
      <h1>SnapShot</h1>
      <form onSubmit={handleSubmit}>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by name"
            value={query}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div className="galleryWrapper">
        <div className="filterItem">
          <ul>
            {collection.map((item) => (
              <li key={item}>
                <button onClick={() => galleryFilter(item)}>{item}</button>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="subtitle">{selectedKategori}</h2>
        <div className="galleryContainer">
          {data.map((item) => (
            <div key={item.id} className="galleryItem">
              <img src={item.image} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
