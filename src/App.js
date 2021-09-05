import { useState } from 'react';

import MarkdownIt from 'markdown-it';
import FileSaver from 'file-saver';

import './App.css';

function App() {

  // Create the states that will be used 
  // through the application
  // This state will be used for the Markdown text
  let [markdownText, setMarkDownText] = useState("");

  // This state will be used for the rendered HTML
  let [renderedHTML, setRenderedHTML] = useState("");

  // This state will be used for the filename while saving
  let [fileName, setFileName] = useState("untitled-note");

  // Create a function that will be invoked
  // whenever the user modifies the content
  // in the textarea
  function handleTextInput(e) {

    // Change the text of the markdown side
    setMarkDownText(e.target.value);

    // Initialize a MarkdownIt instance
    let md = new MarkdownIt();

    // Render out the markdown to HTML using
    // the render() method
    let renderedHTML = md.render(e.target.value);

    // Change the markdown's side to the rendered HTML
    setRenderedHTML(renderedHTML);
  }

  // Create a function download the rendered HTML
  function saveHTML() {

    // Create a new Blob of the type 'text/html'
    // using the rendered HTML content
    let blobFile = new Blob([renderedHTML], {
      type: "text/html"
    });

    // Save the file using the given file name
    FileSaver.saveAs(blobFile, fileName);
  }

  // Create a function download the Markdown text
  function saveMarkdown() {

    // Create a new Blob of the type 'text'
    // using the markdown content
    let blobFile = new Blob([markdownText], {
      type: "text"
    });

    // Save the file using the given file name
    FileSaver.saveAs(blobFile, fileName);
  }

  return (
    <div className="container">
      <h2 className="app-heading text-center display-4 my-3">
        React Markdown Notes
      </h2>
      <div className="row">
        <div className="col col-sm-12 col-md-6">

          {/* Card for the markdown editor */}
          <div className="card bg-light markdown-editor">
            <h4 className="card-title text-center">
              Markdown
            </h4>
            <div className="card-body">

              {/* Textarea for the markdown editor */}
              <textarea
                className="form-control markdown-textarea"
                rows={20}
                value={markdownText}
                onChange={handleTextInput}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6">

          {/* Card for the markdown editor */}
          <div className="card bg-light rendered-output">
            <h4 className="card-title text-center">
              Output
            </h4>

            {/* Textarea for the markdown editor */}
            <div className="card-body">
              <div

                // Change the HTML to be displayed according
                // to the render produced by MarkdownIt
                dangerouslySetInnerHTML={{ __html: renderedHTML }}
                className="rendered-html-output"
              >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col col-sm-12">

          {/* Card for the save files option */}
          <div className="card bg-light my-3">
            <div className="card-body">
              <h4>Save Content</h4>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="File name"
                  aria-label="File name"
                  value={fileName}
                  onChange={fname => setFileName(fname.target.value)}
                />

                {/* Buttons for saving the text */}
                <div className="input-group-append">
                  <button className="btn btn-primary" 
                          type="button" 
                          onClick={saveMarkdown}>
                            Save Markdown
                  </button>
                  <button className="btn btn-primary" 
                          type="button" 
                          onClick={saveHTML}>
                            Save HTML
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;