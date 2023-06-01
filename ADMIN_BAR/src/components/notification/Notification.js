import { useEffect, useRef } from "react";
import styles from "./Notification.module.scss";
import * as moment from "moment";

moment.locale("fr");
function Notification({ notifications, onClickOutside }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <ul ref={ref} className={`${styles.container}`}>
      {notifications.map((notif, i) => (
        <li
          key={i}
          className="d-flex justify-content-end align-items-center mt10 mr10"
        >
          {notif.text} - {moment(notif.date).fromNow()}{" "}
        </li>
      ))}
    </ul>
  );
}

export default Notification;
