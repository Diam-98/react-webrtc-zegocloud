import React from "react";

import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
        <div className="auth-container">
            <Outlet/>
        </div>
    </>
  );
}

export default App;
