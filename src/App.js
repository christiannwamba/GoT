import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Questions from "./components/questions";
import "./App.css";

const client = new ApolloClient({
  uri: 'https://api.8base.com/cjvp33au9000201ru4hupd7r5'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <div>GOT Quizapp</div>
        </header>
        <Questions />
      </div>
    </ApolloProvider>
  );
}

export default App;
