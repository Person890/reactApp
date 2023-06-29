import React, { useState, useEffect } from "react";
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [image, setImage] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setUserInput(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    displayImages(userInput);
  };

  const displayImages = (count) => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`)
      .then((res) => res.json())
      .then((json) => {
        setImage(json);
        setDataIsLoaded(true);
      });
  };

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`)
      .then((res) => res.json())
      .then((json) => {
        setImage(json);
        setDataIsLoaded(true);
      });
  }, []);

  if (!dataIsLoaded) {
    return (
      <div>
        <h1> Please wait some time.... </h1>
      </div>
    );
  }

  // Ensure image is always an array
  const images = Array.isArray(image) ? image : [image];

  return (
    <div>
      <h1 style={{
        textAlign: "center",
        color: "MidnightBlue",
        fontSize: "10em",
        marginBottom: "1em"
      }}
      >
        NASA picture of the day (count: {userInput})
      </h1>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
        onSubmit={handleSubmit}
      >
        <label style={{ marginRight: '10px' }}>
          <input
            type="text"
            pattern="[0-9]*"
            value={userInput}
            placeholder={"# of images"}
            onChange={handleChange}
            style={{
              padding: "0.5em",
              marginRight: "0.5em",
              borderRadius: "0.3em",
              border: "1px solid MidnightBlue",
            }}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          style={{
            padding: "0.5em 1em",
            backgroundColor: "MidnightBlue",
            color: "white",
            border: "none",
            borderRadius: "0.7em",
            cursor: "pointer",
          }}
        />
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {images.map((item) => (
          <div
            key={item.date}
            style={{
              margin: "10px",
              textAlign: "center",
              width: "20%",
              backgroundColor: "LightBlue",
              borderRadius: "1em",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
              padding: "1em",
            }}
          >
            <h2 style={{ color: "MidnightBlue", fontSize: "2.5em" }}>
              {item.title}
            </h2>
            {item.media_type === "image" ? (
              <img
                src={item.url}
                alt={item.title}
                style={{ width: "100%", borderRadius: "0.3em" }}
              />
            ) : (
              <iframe
                src={item.url}
                title={item.title}
                width="100%"
                height="300"
                style={{ borderRadius: "0.3em" }}
              ></iframe>
            )}
            <p style={{ color: "MidnightBlue", fontSize: "1.5em" }}>
              {item.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;