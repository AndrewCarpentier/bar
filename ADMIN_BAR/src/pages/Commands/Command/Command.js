import { serveCommand } from "../../../apis/commands";
import styles from "./Command.module.scss";
import { useEffect, useState } from "react";

function Command({ command, commands, setCommands, nav }) {
  const [showDetail, setShowDetail] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    command.beers.map((beer) => {
      price = price + beer.price * beer.count;
    });
    setTotalPrice(price);
  }, [command.beers]);

  function onDetail() {
    setShowDetail(!showDetail);
  }

  function onServe() {
    serveCommand(command._id).then((success) => {
      if (success) {
        const commandIndex = commands.findIndex((c) => c._id === command._id);
        commands[commandIndex] = {
          _id: command._id,
          beers: command.beers,
          validate: true,
        };
        if (nav === "commandsToServe") {
          setCommands(commands.filter((c) => !c.validate));
        } else if (nav === "allCommands") {
          setCommands(commands);
        }
      }
    });
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.info} d-flex`}>
        <div
          className={`${styles.id} d-flex justify-content-center align-items-center`}
        >
          COMMAND ID : {command._id}
        </div>
        <div
          className={`${styles.price} d-flex justify-content-center align-items-center`}
        >
          {totalPrice}€
        </div>

        <div
          className={`${styles.status} d-flex justify-content-center align-items-center`}
        >
          {command.validate ? (
            <span>
              <i className={`${styles.dot} ${styles.success}`} />
              Servi
            </span>
          ) : (
            <span>
              <i className={`${styles.dot} ${styles.error}`} />
              Non servi
            </span>
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center mr20">
          {!command.validate ? (
            <button className={`btn btn-primary ${styles.px100}`} onClick={onServe}>
              Servir
            </button>
          ) : (<div className={styles.px100}></div>)}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-primary" onClick={onDetail}>
            <i className="fas fa-chevron-down" />
          </button>
        </div>
      </div>
      {showDetail && (
        <div>
          <ul>
            <li className={`${styles.command} ${styles.titleTab} d-flex`}>
              <div className={`${styles.img} d-flex justify-content-center`}>
                Image
              </div>
              <div className={`${styles.name} d-flex justify-content-center`}>
                Name
              </div>
              <div className={`${styles.count} d-flex justify-content-center`}>
                Count
              </div>
              <div className={`${styles.price} d-flex justify-content-center`}>
                Price
              </div>
            </li>
            {command.beers.map((c) => (
              <li key={c._id} className={`${styles.command} ${styles.itemsTab} d-flex`}>
                <div className={`${styles.img} justify-content-center d-flex`}>
                  <img src={c.beer.img} alt="beer" />
                </div>
                <div
                  className={`${styles.name} d-flex justify-content-center align-items-center`}
                >
                  {c.beer.name}
                </div>
                <div
                  className={`${styles.count} d-flex justify-content-center align-items-center`}
                >
                  {c.count}
                </div>
                <div
                  className={`${styles.price} d-flex justify-content-center align-items-center`}
                >
                  {c.price}€
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Command;
