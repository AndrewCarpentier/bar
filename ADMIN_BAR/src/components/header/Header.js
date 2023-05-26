import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'


export default function Header({ show, count }) {
    return (
        <div className={`d-flex align-items-center ${styles.header}`}>
            <div className="flex-fill">
                <h2>ADMIN BAR</h2>
            </div>
            <ul className={styles.headerMenu}>
                <NavLink end to="/">Homepage</NavLink>
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
    )
}