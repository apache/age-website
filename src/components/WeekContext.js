import React from 'react';
import * as styles from './styles/AgeContributors.module.scss';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'

const WeekContext = ({ text, last, status, setStatus, len }) => {

    const handleClick = (s) => {
        setStatus(s)
    }

    return (
        <div className={styles.Weeks} style={last ? {color: '#483D8B'} : {color: '#B8145A'}}>
            <p>{text}</p>
            {
                len > 0 ? 
                <>
                    <div className={styles.Caret} onClick={() => handleClick(!status)}>
                    { status ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    </div>
                </>
                :
                <>
                </>
            }
        </div>
    )
}


export default WeekContext;