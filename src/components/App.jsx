import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import data from "../data";


function App() {
  return (
    <div>
      <Header />
      {data.map( (infoItem) => (
        <List
        key={infoItem.key}
        name={infoItem.name}
        number={infoItem.size}
        size={infoItem.number}
    />
  ))}

      <Footer />
    </div>
  );
}

export default App;
