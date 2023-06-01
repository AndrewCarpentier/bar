import styles from "./Notification.module.scss";
import * as moment from "moment";

moment.locale("fr");
function Notification({ notifications }) {
  return (
    <ul className={`${styles.container}`}>
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
