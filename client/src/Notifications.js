import React, { useContext, useEffect, useState } from "react";

import { NotificationsContext } from "./ContextProviders";

import { useToast } from "@chakra-ui/react";

// import material ui icons
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Notifications = () => {
  const { notifications, setNotifications } = useContext(NotificationsContext);
  const [display, setDisplay] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (notifications.message) {
      setDisplay(true);
    }
    const displayTimeout = setTimeout(() => {
      setDisplay(false);
    }, 5000);

    return () => {
      clearTimeout(displayTimeout);
    };
  }, [notifications]);

  return (
    <div
      className={`notifications ${
        notifications.type === "danger" ? "danger" : "okay"
      }`}
      style={display ? { opacity: "1" } : { opacity: "0" }}
    >
      {/* {notifications.type === "danger" ? (
        <ErrorOutlineIcon />
      ) : (
        <CheckCircleIcon />
      )} */}
      <p>{notifications.message}</p>
    </div>
  );
};

export default Notifications;
