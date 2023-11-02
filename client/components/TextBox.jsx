import React, { useEffect, useState } from "react";

const TextBox = ({ title, fulltext, fetchHandler, saveHandler, editHandler, mode, onTitleChange, onFulltextChange}) => {
  const [input, updateInput] = useState('');
  const onInputChange = (e) => {
    updateInput(e.target.value);
  }


  if(mode) {
  return (
    <div>
    <div>
      <input type='text' onChange={onInputChange}></input>
      <button onClick={() => {
        return fetchHandler(input);
        }}>Fetch</button>
      <input type='text' value={title} onChange={onTitleChange}/>
      <textarea value={fulltext} rows={30} cols={100} onChange={onFulltextChange}/>
      <button onClick={editHandler}>Edit/View</button>
      <button onClick={
        () => {
         return saveHandler(title, fulltext);
        }
      }>Save</button>
    </div>
    </div>
  );
};
return (
  <div>
  <div>
    <input type='text' onChange={onInputChange}></input>
    <button onClick={() => {
      return fetchHandler(input);
      }}>Fetch</button>
    <h2>{title}</h2>
    <p>{fulltext}</p>
    <button onClick={editHandler}>Edit/View</button>
    <button onClick={
      () => {
       return saveHandler(title, fulltext);
      }
    }>Save</button>
  </div>
  </div>
)
};

export default TextBox;