import styles from "./Beer.module.scss";
import { useState } from "react";

export default function Beer({beer, name, sizes, image, add, remove, numberOfBeers, setChangeSizePrice, id}) {
    const [selectedPrice, setSelectedPrice] = useState(null);

    const sizeChange = (event) => {
        const sizeChosen = event.target.value;
        const selectedPriceBeer = beer.sizes.find((size) => size.size === sizeChosen).price;
        console.log({selectedPriceBeer});
        setSelectedPrice(selectedPriceBeer);
        setChangeSizePrice(selectedPriceBeer, id);
    }

    return(
        <div className={styles.beer}>
            <div className={styles.imgContainer}>
                <img src={image} alt="beer" />
            </div>
            <div className={numberOfBeers ? styles.size : styles.sizeSmall}>
                <div className={` d-flex justify-content-around`}>
                    { sizes && numberOfBeers > 0 && sizes.map((size, i) => (
                        <div key={i}>
                            <div className="d-flex">
                                <label>{size.size}</label>
                                <input type="radio" name={name} value={size.size} onChange={sizeChange} />
                            </div>
                        </div>
                    ))}
                </div>
                {selectedPrice != null  && numberOfBeers !== 0 ? <p className="ml20">Prix: {selectedPrice} €</p> : <p className="ml20">Prix: selon quantité</p>}
            </div>
            <div className={`${styles.beerName} d-flex justify-content-center align-items-center`} >
                <h3 className="mr20">{name}</h3>
                {
                    numberOfBeers > 0 ? (
                        <>
                        <button className="ml10" onClick={remove}>
                            <span>-</span>
                        </button>
                        <div className={` ml10 d-flex justify-content-center align-items-center ${styles.showCount}`}>
                            {numberOfBeers}
                        </div>
                        </>
                    ) : null
                }
                <button className="ml10" onClick={add} >
                    <span>+</span>
                    </button>
            </div>
        </div>
    )
}