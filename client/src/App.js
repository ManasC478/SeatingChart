import React, { useState } from "react";

import ClassBar from "./Components/ClassBar/ClassBar";
import SeatingGenerator from "./Components/SeatingGenerator/SeatingGenerator";
import Notifications from "./Notifications";
import { NotificationsContext } from './ContextProviders';

function App() {
  const [notifications, setNotifications] = useState({ type: '', message: '' });
  const [studentMap, setStudentMap] = useState({});

  return (
    <main className="seating-chart-main">
      <NotificationsContext.Provider value={{ notifications, setNotifications }}>
        <ClassBar studentMap={studentMap} setStudentMap={setStudentMap} />
        <SeatingGenerator studentMap={studentMap} />
        <Notifications />
      </NotificationsContext.Provider>
    </main>
  );
}

export default App;