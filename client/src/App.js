import React, { useState } from "react";

import ClassBar from "./Components/ClassBar/ClassBar";
import Canvas from "./Components/Canvas/Canvas";
import Notifications from "./Notifications";
import { NotificationsContext } from './ContextProviders';

function App() {
  const [notifications, setNotifications] = useState({ type: '', message: ''});

  return (
    <main className="seating-chart-main">
      <NotificationsContext.Provider value={{ notifications, setNotifications }}>
        <ClassBar />
        <Canvas />
        <Notifications />
      </NotificationsContext.Provider>
    </main>
  );
}

export default App;