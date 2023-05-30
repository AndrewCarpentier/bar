import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { socket } from "../../Socket";
import { useEffect, useState } from "react";
import Notification from "../notification/Notification";

export default function Header({ show, count }) {
  const [numberOfCommand, setNumberOfCommand] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  console.log(notifications);
  useEffect(() => {
    function onCommand() {
      if (!showNotification) {
        setNumberOfCommand(numberOfCommand + 1);
        document.getElementById("numberCommand").classList.add(styles.active);
      }
      setNotifications((prev) => [...prev, {text : "Nouvelle commande", date : Date.now()}]);
      return;
    }

    socket.on("adminCommand", onCommand);

    return () => {
      socket.off("adminCommand", onCommand);
    };
  }, [numberOfCommand]);

  function onNotification() {
    setShowNotification(!showNotification);
    setNumberOfCommand(0);
    document.getElementById("numberCommand").classList.remove(styles.active);
    console.log(notifications);
  }

  return (
    <div className={`d-flex align-items-center ${styles.header}`}>
      {showNotification && <Notification notifications={notifications} />}
      <div className="flex-fill">
        <h2>ADMIN BAR</h2>
      </div>
      <div className={`${styles.notification}`} onClick={onNotification}>
        <i className="fas fa-bell" />
        <div id="numberCommand" className={`${styles.numberOfCommand}`}>
          {numberOfCommand}
        </div>
      </div>
      <ul className={styles.headerMenu}>
        <NavLink end to="/">
          Homepage
        </NavLink>
        <NavLink to="/beers">Beers</NavLink>
        {/* <button className='mr20 btn btn-secondary'>
                    Cocktails
                </button>
                <button className='mr20 btn btn-secondary'>
                    Softs
                </button>
                <button className='mr20 btn btn-secondary'>
                    FOOD
                </button> */}
      </ul>
    </div>
  );
}
