import styles from "./Command.module.scss";
import { useState } from "react";

function Command({ command }) {
  const [showDetail, setShowDetail] = useState(false);
  console.log(command);
  function onDetail() {
    setShowDetail(!showDetail);
  }

  return (
    <div>
      {!showDetail ? (
        <div onClick={onDetail} className={`${styles.detailCommand}`}>
          Voir detail
        </div>
      ) : (
        <div>
          <div onClick={onDetail} className={`${styles.detailCommand}`}>
            Retirer detail
          </div>
          <ul>
            <li className={`${styles.command} d-flex`}>
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
            {command.map((c) => (
              <li key={c.id} className={`${styles.command} d-flex`}>
                <div className={`${styles.img} justify-content-center d-flex`}>
                  <img src={c.image} alt="beer" />
                </div>
                <div
                  className={`${styles.name} d-flex justify-content-center align-items-center`}
                >
                  {c.name}
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
