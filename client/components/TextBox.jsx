import React, { useEffect, useState } from "react";
import Title from './Title.jsx';

const TextBox = ({ title, fulltext, fetchHandler, saveHandler, editHandler, mode, onTitleChange }) => {
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
      <textarea defaultValue={fulltext} rows={30} cols={100}/>
      <button onClick={
        () => {
         return saveHandler(title, fulltext);
        }
      }>Save</button>
      <button onClick={editHandler}>Edit/View</button>
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
    {/* <textarea defaultValue={fulltext} rows={30} cols={100}/> */}
    <button onClick={
      () => {
       return saveHandler(title, fulltext);
      }
    }>Save</button>
    <button onClick={editHandler}>Edit/View</button>
  </div>
  </div>
)
};

export default TextBox;