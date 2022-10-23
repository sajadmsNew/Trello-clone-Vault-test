import React, { useState } from "react";
import UIProvider from "./context/UIContext";
import RouteSwitcher from "./routes/Routes";

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
            <RouteSwitcher />
          </div>
       
    
    </UIProvider>
  );
};

export default App;
