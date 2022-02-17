import React, { useState } from "react";
import { Grid } from "@chakra-ui/react";

import ClassBar from "./Components/ClassBar/ClassBar";
import SeatingGenerator from "./Components/SeatingGenerator/SeatingGenerator";
import Notifications from "./Notifications";
import { NotificationsContext } from "./ContextProviders";
import { TableProvider } from "./lib/tableData";
import { StudentsProvider } from "./lib/studentsData";

function App() {
  const [notifications, setNotifications] = useState({ type: "", message: "" });

  return (
    <Grid templateColumns={"400px 1fr"} maxW={1200} mx={"auto"}>
      <TableProvider>
        <StudentsProvider>
          <NotificationsContext.Provider
            value={{ notifications, setNotifications }}
          >
            <ClassBar />
            <SeatingGenerator />
            <Notifications />
          </NotificationsContext.Provider>
        </StudentsProvider>
      </TableProvider>
    </Grid>
  );
}

export default App;
