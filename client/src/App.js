import React, { useState } from "react";

import ClassBar from "./Components/ClassBar/ClassBar";
import SeatingGenerator from "./Components/SeatingGenerator/SeatingGenerator";
import Notifications from "./Notifications";
import { NotificationsContext } from "./ContextProviders";
import { TableProvider } from "./lib/tableData";
import { Table } from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState({ type: "", message: "" });
  const [studentMap, setStudentMap] = useState({});

  return (
    <main className='seating-chart-main'>
      <TableProvider>
        <NotificationsContext.Provider
          value={{ notifications, setNotifications }}
        >
          <ClassBar studentMap={studentMap} setStudentMap={setStudentMap} />
          <SeatingGenerator studentMap={studentMap} />
          <Notifications />
        </NotificationsContext.Provider>
      </TableProvider>
    </main>
  );
}

export default App;
