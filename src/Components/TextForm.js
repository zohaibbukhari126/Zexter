import React, { useState } from "react";
import "./button.css";
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>

export default function TextForm(props) {
  const [text, setText] = useState("");
  const replacecasefunc = () => {
    let existing_text = prompt("Enter which word to replace : ");
    let replaced_text = prompt("Enter New Text");
    setText(text.replaceAll(existing_text, replaced_text));
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Speaking", "success");
  };

  let [count, setCount] = useState(0);
  let [count1, setCount1] = useState(0);
  let countChar = 0,
    countCons = 0;

  const handleVoClick = () => {
    for (count = 0; count <= text.length; count++) {
      if (text.charAt(count).match(/[aeiouAEIOU]/)) {
        countChar++;
        setCount(countChar);
      }
    }
    props.showAlert("No. of Vowels are: " + countChar, "success");
  };

  const handleCoClick = () => {
    for (count1 = 0; count1 <= text.length; count1++) {
      if (
        text
          .charAt(count1)
          .match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/)
      ) {
        countCons++;
        setCount1(countCons);
      }
    }
    props.showAlert("No. of Consonants are: " + countCons, "success");
  };

  let minutesRead = 0;

  if (text.trim() !== "") {
    // Calculate the reading time only if text is present
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).filter((word) => word !== "").length;
    minutesRead = (wordCount / wordsPerMinute).toFixed(3);
  }

  return (
    <>
      <div className="parentcontainer" style={{ color: props.mode === "dark" ? "white" : "black" }}>
        <div className="container" style={{ color: props.mode === "dark" ? "white" : "black" }}>
          <h1>{props.heading}</h1>
          <div className="mb-3">
            <textarea
              className="form-control"
              onChange={handleOnChange}
              id="myBox"
              rows="8"
              value={text}
              placeholder="Enter your text here"
              style={{ backgroundColor: props.mode === "dark" ? "#2b3035" : "white", color: props.mode === "dark" ? "white" : "black" }}
            ></textarea>
          </div>
          <button className="btn btn-primary mx-1" onClick={handleUpClick}>
            Convert to Uppercase
          </button>
          <button className="btn btn-primary mx-1" onClick={handleLoClick}>
            Convert to Lowercase
          </button>
          <button
            type="submit"
            onClick={speak}
            className="btn btn-warning mx-2 my-2"
          >
            Speak
          </button>
          <button className="button-neon btn btn-primary mx-1" onClick={handleVoClick}>
            Count no. of Vowels
          </button>
          <button className="btn btn-primary mx-1 my-2" onClick={handleCoClick}>
            Count no. of Consonants
          </button>
          <button className="btn btn-primary mx-1" onClick={replacecasefunc}>
            Replace
          </button>
        </div>
        <div className="container my-3"></div>
        <h2>Your text summary</h2>
        <p>
          <b>{text.trim().split(/\s+/).filter((word) => word !== "").length}</b> words and <b>{text.replace(/\s/g, "").length}</b>{" "}
          characters
        </p>
        <p>
          <b>{minutesRead}</b> Minutes read
        </p>
        <p> No. of Vowels: {count}</p>
        <p> No. of Consonants: {count1}</p>

        <h2>Preview</h2>
        <p>{text.length > 0 ? text : <i>Enter your text above to preview it here</i>}</p>
      </div>
    </>
  );
}
