import React, { useState } from 'react';
import * as styles from './styles/HowToAge.module.scss';
import storagePmg from '../img/img-Storage.png';

const HowToAge = () => {
  const [toggle, setToggle] = useState('');

  const onToggle = (num) => {
    setToggle(String(num));
  };

  return (
    <div className={styles.root}>
      <div className={styles.Section1}>
        <div className={styles.Section1Wrap}>
          <div className={styles.Vertical}>
            <button
              type="button"
              className={toggle === '5' ? styles.Toggle : ''}
              onClick={() => onToggle(5)}
              onMouseEnter={() => onToggle(5)}
            >
              Transaction / Cashe Layer
            </button>
          </div>
          <div className={styles.Horizon}>
            <button
              type="button"
              className={toggle === '1' ? styles.Toggle : ''}
              onClick={() => onToggle(1)}
              onMouseEnter={() => onToggle(1)}
            >
              Query Parsing
            </button>
            <button
              type="button"
              className={toggle === '2' ? styles.Toggle : ''}
              onClick={() => onToggle(2)}
              onMouseEnter={() => onToggle(2)}
            >
              Query Transform
            </button>
            <button
              type="button"
              className={toggle === '3' ? styles.Toggle : ''}
              onClick={() => onToggle(3)}
              onMouseEnter={() => onToggle(3)}
            >
              Planner/Optimizer
            </button>
            <button
              type="button"
              className={toggle === '4' ? styles.Toggle : ''}
              onClick={() => onToggle(4)}
              onMouseEnter={() => onToggle(4)}
            >
              Executor
            </button>
          </div>
        </div>
        <div className={styles.StorageImg}>
          <img src={storagePmg} />
        </div>
      </div>
      <div className={styles.Section2}>
        <p className={toggle === '1' ? styles.Toggle : ''}>
          <i>1</i>
          <span>
            Pares Cypher queries by a function call tha uses a parser followong
            the openCypher specification
          </span>
        </p>
        <p className={toggle === '2' ? styles.Toggle : ''}>
          <i>2</i>
          Teansforms a Cypher query into a Query tree that will be attached as a
          subquery node.
        </p>
        <p className={toggle === '3' ? styles.Toggle : ''}>
          <i>3</i>
          Understands some graph operations and produces plan nodes that are
          related to graph operation.
        </p>
        <p className={toggle === '4' ? styles.Toggle : ''}>
          <i>4</i>
          Executes plan nodes that are related to graph operations.
        </p>
        <p className={toggle === '5' ? styles.Toggle : ''}>
          <i>5</i>
          Cypher aueries work with Postgre' existing fully transaction system
          (ACID).
        </p>
      </div>
    </div>
  );
};

export default HowToAge;
