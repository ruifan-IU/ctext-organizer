import React, { Component } from 'react';
import { useEffect, useState } from "react";
import TextBox from './TextBox.jsx';
import Title from './Title.jsx';

const App = () => {
  const [titleList, updateList] = useState([]);
  const [title, updateTitle] = useState('');
  const [fulltext, updateFulltext] = useState([]);
  const [mode, updateMode] = useState(false);
  useEffect(() => {
    fetch('/api', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        updateList(data);
      });
  }, []);

  const fetchHandler = (title) => {
    fetch('https://api.ctext.org/gettext?urn=ctp:analects/' + title)
      .then(data => {
        return data.json();
      })
      .then(data => {
        updateTitle(data.title);
        updateFulltext(data.fulltext);
      })
      .catch(err => { });
  }

  const saveHandler = (title, fulltext) => {
    fetch('/api', {
      method: "POST",
      body: JSON.stringify({
        title: title,
        fulltext: fulltext,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => {
        fetch('/api', {
          headers: { 'Content-Type': 'application/json' },
        })
          .then(data => {
            return data.json();
          })
          .then(data => {
            updateList(data);
          });
      });
  };

  const viewHandler = title => {
    fetch('/api/' + title)
      .then(data => {
        return data.json();
      })
      .then(data => {
        updateTitle(data.title);
        updateFulltext(data.fulltext);
      })
  }

  const editHandler = () => {
    updateMode(!mode);
  }
  const onTitleChange = (e) => {
    console.log(e.target.value)
    updateTitle(e.target.value);
  }

  const deleteHandler = title => {
    fetch('/api', {
      method: "DELETE",
      body: JSON.stringify({
        title: title,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => {
        fetch('/api', {
          headers: { 'Content-Type': 'application/json' },
        })
          .then(data => {
            return data.json();
          })
          .then(data => {
            updateList(data);
          });

      });
  }

  return <div>
    {titleList.map((title, index) => {
      return <Title 
      title={title} 
      fulltext={fulltext} 
      key={index} 
      viewHandler={viewHandler} 
      deleteHandler={deleteHandler} />
    })}
    <TextBox title={title} 
    fulltext={fulltext} 
    fetchHandler={fetchHandler} 
    saveHandler={saveHandler} 
    editHandler={editHandler} 
    onTitleChange={onTitleChange}
    mode={mode} />
  </div>

};
export default App;