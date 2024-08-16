import React, { useState, useEffect } from "react";
import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const Art = (props) => {
  
  // const [user, setUser] = useState("");
  // const [bid, setBid] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault(); 
  //   if (user && bid) {
  //     props.editArt(props.keyt, user, bid); 
  //     setUser("");
  //     setBid("");
  //   }
  // };

  // when no need to bid less than highest one

  // State hooks to manage form input values
  const [user, setUser] = useState("");
  const [bid, setBid] = useState("");
  const [error, setError] = useState(""); // State to store error messages

  // Find the highest bid from the bids array
  const highestBid = props.bids.length > 0 ? Math.max(...props.bids.map(b => b.bid)) : 0;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (user && bid) {
      if (bid > highestBid) {
        props.editArt(props.keyt, user, bid); // Call the editArt function with the form values
        setUser(""); // Clear the input fields after submission
        setBid("");
        setError(""); // Clear any previous error message
      } else {
        setError(`Error: Your bid of ${bid} must be higher than the current highest bid of ${highestBid}.`); // Set error message
      }
    }
  };

  return (
    <div className="photo-container">
      <div className="photo">
        <img src={props.src} alt={props.alt} width="200" />
      </div>
      <div className="comments-section">
        <div>
          <h4>Bids</h4>
          <ul>
            {props.bids.map((bid, index) => (
              <li key={index}>
                <strong>{bid.user}:</strong> {bid.bid}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="addbid">
        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)} 
          />
          <input
            type="number"
            placeholder="Add a higher bid"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
          <button type="submit">Submit Your Higher Bid</button>
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default function Arts() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    axios
      .get(backend_url + "/api/arts")
      .then((response) => {
        setArts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editArt = (id, user, bid) => {
    const newBid = { user, bid };

    axios
      .post(`${backend_url}/api/art/${id}/bid`, newBid)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="photo-gallery">
        {arts.map((art) => (
          <Art
            src={art.src}
            alt={art.alt}
            bids={art.bids}
            key={art._id}
            keyt={art._id}
            editArt={editArt}
          />
        ))}
      </div>
    </div>
  );
}