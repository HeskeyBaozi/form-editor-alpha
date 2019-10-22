import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import FormEditor from "./components/FormEditor";
import "./App.css";

const PreviewWrapper = styled.div`
  border: 1px solid lightblue;
  width: 75vw;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PreviewWrapper>
          <FormEditor />
          Edit <code>src/App.tsx</code> and save to reload.
        </PreviewWrapper>
      </header>
    </div>
  );
};

export default App;
