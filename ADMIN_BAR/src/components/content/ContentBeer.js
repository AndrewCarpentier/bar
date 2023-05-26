import { NavLink, Outlet } from 'react-router-dom';

export default function ContentBeers() {
    return(
        <>
        <ul className="d-flex p20">
            <li>
            <NavLink end to='' className='btn btn-primary my20 ml20'>Content</NavLink>
            </li>
            <li>
            <NavLink to='form_add' className='btn btn-primary my20 ml20'>Add</NavLink>
            </li>
        </ul>
        <ul className="p20">
            <div>
                <Outlet />
            </div>
        </ul>
        </>
    )
}