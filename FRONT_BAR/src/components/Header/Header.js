import styles from './Header.module.scss'
import logo from '../../assets/images/bar_logo.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context';

export default function Header() {

    const { totalOfBeers } = useContext(AuthContext);
    console.log(totalOfBeers)
    return (
        <div className={`d-flex align-items-center ${styles.header}`}>
            <NavLink to ="/" className="flex-fill">
                <img src={logo} alt="logo_bar" />
            </NavLink>
            <ul className={styles.headerMenu}>
                <NavLink to='beers' className='mr20 btn btn-reverse'>
                    <i className='fas fa-beer-mug-empty mr10'></i>
                    Beers
                </NavLink>
                <NavLink to="food" className='mr20 btn btn-reverse'>
                <i className="fa-solid fa-burger mr10"></i>
                    Food
                </NavLink>
                <NavLink className='mr20 btn btn-reverse'>
                <i className="fa-solid fa-user mr10"></i>
                    Profile
                </NavLink>
                <NavLink className='mr20 btn btn-reverse'>
                <i className="fa-solid fa-right-to-bracket mr10"></i>
                    Login
                </NavLink>
                <NavLink to='payment' className='mr20 btn btn-reverse'>
                    <i className={`fa-regular fa-credit-card `}></i>
                    Payment
                    { totalOfBeers > 0 ? <span className={styles.headerSpan}>({totalOfBeers})</span> : null }
                </NavLink>
            </ul>
        </div>
    )
}