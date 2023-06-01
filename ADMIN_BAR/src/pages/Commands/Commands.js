import styles from "./Commands.module.scss";
import { socket } from "../../Socket";
import { useEffect, useState } from "react";
import { getAllCommands } from "../../apis/commands";
import Command from "./Command/Command";

function Commands() {
  const [commandsBackup, setCommandsBackup] = useState([]);
  const [commands, setCommands] = useState([]);
  const [nav, setNav] = useState("commandsToServe");

  useEffect(() => {
    getAllCommands().then((commands) => {
      setCommandsBackup(commands);
      setCommands(commands.filter((c) => !c.validate));
    });

    function onCommand(value) {
      setCommandsBackup((prev) => [...prev, value]);
      return setCommands((prev) => [...prev, value]);
    }

    socket.on("adminCommand", onCommand);

    return () => {
      socket.off("adminCommand", onCommand);
    };
  }, []);

  function changeNav(e) {
    if (e === "commandsToServe") {
      document.getElementById(e).classList.add(styles.active);
      document.getElementById("allCommands").classList.remove(styles.active);
    } else if (e === "allCommands") {
      document.getElementById(e).classList.add(styles.active);
      document
        .getElementById("commandsToServe")
        .classList.remove(styles.active);
    }
  }

  function onCommands(e) {
    const n = e !== null ? e : nav;
    if (e !== null) {
      setNav(e);
      changeNav(e);
    }

    if (n === "commandsToServe") {
      setCommands(commandsBackup.filter((c) => !c.validate));
    } else if (n === "allCommands") {
      setCommands(commandsBackup);
    }
  }

  return (
    <div>
      <div className="d-flex">
        <div
          id="commandsToServe"
          className={`${styles.nav} ${styles.active}`}
          onClick={() => onCommands("commandsToServe")}
        >
          Commandes à servir
        </div>
        <div
          id="allCommands"
          className={`${styles.nav}`}
          onClick={() => onCommands("allCommands")}
        >
          Toutes les commandes
        </div>
      </div>
      {commands.length ? (
        <>
        <div className={`${styles.titleTab} d-flex`}>
          <div className={`${styles.id} d-flex justify-content-center align-items-center`}>Id</div>
          <div className={`${styles.price} d-flex justify-content-center align-items-center`}>Price</div>
          <div className={`${styles.status} d-flex justify-content-center align-items-center`}>Status</div>
        </div>
          {commands.map((command) => (
            <div className={`${styles.container}`} key={command._id}>
              <Command
                command={command}
                commands={commandsBackup}
                setCommands={setCommands}
                nav={nav}
              />
            </div>
          ))}
        </>
      ) : (
        <div>Aucune commande pour le moment 😃</div>
      )}
    </div>
  );
}

export default Commands;
