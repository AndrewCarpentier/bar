import { useContext } from 'react';
import { AuthContext } from '../../context';
import styles from './Beers.module.scss';
import Beer from './component/Beer';

export default function Beers() {

    const { beers, addBeer, removeBeer, numberOfBeers, setChangeSizePrice } = useContext(AuthContext);
    // console.log(beers);
    console.log(numberOfBeers)
    return(
        <div className="flex-fill container p20">
            <h1 className="my20">LISTE DE NOS BOISSONS</h1>
            <div className={` ${styles.contentCard} card p20`}>
                <div className={styles.grid}>
                    {
                    beers
                    .filter(beer => beer.visible === true)
                    ?.map((beer) => (
                        <Beer
                            key={beer._id}
                            id={beer._id}
                            beer={beer}
                            sizes={beer.sizes}
                            name={beer.name}
                            image={beer.img}
                            add={() => addBeer(beer._id)}
                            remove = {() => removeBeer(beer._id)}
                            numberOfBeers={numberOfBeers[beer._id]}
                            setChangeSizePrice={setChangeSizePrice}
                            />
                    ))
                    }
                </div>
            </div>
        </div>

    )
}