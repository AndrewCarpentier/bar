import styles from './Footer.module.scss';

export default function Footer() {
    return(
        <footer className={` ${styles.footer} d-flex justify-content-center p20`}>
            <p>Copyright © Le Pas Sage Inc. <span>Mentions légales</span></p>
        </footer>
    )
}