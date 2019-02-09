import React, { useState } from 'react';

export function App({ initialData }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{initialData.appName}</h1>
      This is a sample stateful and server-side rendered React application.
      <br />
      <br />
      Here is a button that will track how many times you click it:
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}
