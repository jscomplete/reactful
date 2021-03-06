import * as React from 'react';

export function App({ initialData }) {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Reactful</h1>
      This is a sample stateful React application.
      <br />
      <br />
      Here is a button that will track how many times you click it:
      <br />
      <br />
      <button title="increment" onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </div>
  );
}
