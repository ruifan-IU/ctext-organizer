import React, { Component } from "react";
import { useEffect, useState } from "react";
import TextBox from "./TextBox.jsx";
import Title from "./Title.jsx";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const [titleList, updateList] = useState([]);
  const [title, updateTitle] = useState("");
  const [fulltext, updateFulltext] = useState([]);
  const [mode, updateMode] = useState(false);
  const [error, updateError] = useState("");
  useEffect(() => {
    fetch("/api", {
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        updateList(data);
      });
  }, []);

  const fetchHandler = (title) => {
    fetch("https://api.ctext.org/gettext?urn=ctp:" + title)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.title) {
          updateTitle(data.title);
          updateFulltext(data.fulltext);
          updateError("");
        } else {
          updateError("Invalid URN.");
        }
      });
  };

  const saveHandler = (title, fulltext) => {
    if (title.length === 0) {
      updateError("Title cannot be empty.");
    } else {
      fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          fulltext: fulltext,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((data) => {
        fetch("/api", {
          headers: { "Content-Type": "application/json" },
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            updateError("");
            updateList(data);
          });
      });
    }
  };

  const viewHandler = (title) => {
    fetch("/api/" + title)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        updateTitle(data.title);
        updateFulltext(data.fulltext);
        updateError("");
      });
  };

  const editHandler = () => {
    updateMode(!mode);
  };

  const onTitleChange = (e) => {
    console.log(e.target.value);
    updateTitle(e.target.value);
  };

  const onFulltextChange = (e) => {
    console.log(e.target.value);
    updateFulltext(e.target.value);
  };

  const deleteHandler = (titleDelete) => {
    fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({
        title: titleDelete,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      fetch("/api", {
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          updateList(data);
          updateError("");
          if (titleDelete === title) {
            updateTitle("");
            updateFulltext([]);
          }
        });
    });
  };

  return (
    <>
      <Row>
        <h1 className="bg-dark-subtle text-center p-3">CText Organizer</h1>
      </Row>
      <Container className="mt-3">
        <Row>
          <Col sm={3}>
            <div className="bg-dark-subtle p-4">
              <h3 className="mb-4">Saved Titles</h3>
              {titleList.map((title, index) => {
                return (
                  <Title
                    title={title}
                    fulltext={fulltext}
                    key={index}
                    viewHandler={viewHandler}
                    deleteHandler={deleteHandler}
                  />
                );
              })}
            </div>
          </Col>
          <Col className="p-5" sm={9}>
            <TextBox
              title={title}
              fulltext={fulltext}
              error={error}
              fetchHandler={fetchHandler}
              saveHandler={saveHandler}
              editHandler={editHandler}
              onTitleChange={onTitleChange}
              onFulltextChange={onFulltextChange}
              mode={mode}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default App;
