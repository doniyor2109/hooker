import React from "react";
import ReactDOM from "react-dom";
import { useContext, useState, useMemo } from "react";

import "./styles.css";

const useValue = initial => {
  const [value, setValue] = useState(initial);
  return useMemo(() => {
    return { value, setValue, increment: () => setValue(value + 1) };
  }, [value]);
};

function Bar() {
  const contexts = useContext(AppContext);
  const bar = useContext(contexts.bar);
  console.log("bar render");
  return <button onClick={() => bar.increment()}>Bar - {bar.value}</button>;
}

function Foo() {
  const contexts = useContext(AppContext);
  const foo = useContext(contexts.foo);
  console.log("foo render");
  return <button onClick={() => foo.increment()}>Foo - {foo.value}</button>;
}

const AppContext = React.createContext();
function Store({ children }) {
  const foo = useValue(1);
  const bar = useValue(1);

  const Contexts = useMemo(() => {
    return { foo: React.createContext(), bar: React.createContext() };
  }, []);

  return (
    <AppContext.Provider value={Contexts}>
      <Contexts.foo.Provider value={foo}>
        <Contexts.bar.Provider value={bar}>{children}</Contexts.bar.Provider>
      </Contexts.foo.Provider>
    </AppContext.Provider>
  );
}

function App() {
  return (
    <Store>
      <Foo />
      <Bar />
    </Store>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
