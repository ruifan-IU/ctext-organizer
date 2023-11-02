import React, { useEffect, useState } from "react";

const Title = ({ title, viewHandler, deleteHandler})=> {
  return <div>
    {title}
    <button onClick={() => viewHandler(title)}>View</button>
    <button onClick={() => deleteHandler(title)}>Delete</button>
    </div>;
};

export default Title;