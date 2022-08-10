import {Fragment, React} from 'react';

import classes from './Header.module.css';

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1 className={classes['header-title']}>Wordle</h1>
        </header>
    </Fragment>
};

export default Header;