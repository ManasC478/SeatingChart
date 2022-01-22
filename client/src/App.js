import React, { useState } from "react";

import ClassBar from "./Components/ClassBar/ClassBar";
import SeatingGenerator from "./Components/SeatingGenerator/SeatingGenerator";
import Notifications from "./Notifications";
import { NotificationsContext } from "./ContextProviders";
import { TableProvider } from "./lib/tableData";
import { StudentsProvider } from "./lib/studentsData";

function App() {
  const [notifications, setNotifications] = useState({ type: "", message: "" });
  const [studentMap, setStudentMap] = useState({});

  return (
    <main className='seating-chart-main'>
      <TableProvider>
        <StudentsProvider>
          <NotificationsContext.Provider
            value={{ notifications, setNotifications }}
          >
            <ClassBar setStudentMap={setStudentMap} />
            <SeatingGenerator />
            <Notifications />
          </NotificationsContext.Provider>
        </StudentsProvider>
      </TableProvider>
    </main>
  );
}

export default App;
