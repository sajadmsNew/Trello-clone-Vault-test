import React, { useEffect, useState } from "react";
import UIProvider from "./context/UIContext";
import Routes from "./routes/Routes";

const App = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [renderedBoard, setRenderedBoard] = useState();

  return (
    <UIProvider
      openBackdrop={openBackdrop}
      setOpenBackdrop={setOpenBackdrop}
      renderedBoard={renderedBoard}
      setRenderedBoard={setRenderedBoard}
    >
          <div className="App">
            <Routes />
          </div>
       
    
    </UIProvider>
  );
};

export default App;
