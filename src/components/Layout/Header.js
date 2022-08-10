import {Fragment, React} from 'react';

import styles from './Header.module.css';

const Header = (props) => {
    return <Fragment>
        <header className={styles.header}>
            <h1 className={styles['header-title']}>Wordle</h1>
        </header>
    </Fragment>
};

export default Header;