import styles from './Commands.module.scss';
import { socket } from "../../Socket";
import { useEffect, useState } from "react";
import Command from "./Command/Command";

function Commands() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    function onCommand(value) {
      return setCommands((prev) => [...prev, value]);
    }

    socket.on("adminCommand", onCommand);

    return () => {
      socket.off("adminCommand", onCommand);
    };
  }, []);

  return (
    <div>
      {commands.map((command, i) => (
        <div className={`${styles.container}`} key={i}>
          <div>Command number {i + 1}</div>
          <Command command={command} />
        </div>
      ))}
    </div>
  );
}

export default Commands;
