import React from 'react'
import { useEffect, useState } from 'react'
import { Range } from '@/ui/range/Range'
import styles from './Accordion.module.scss'
import { FilterParameter } from '@/ui/filter-parameter/FilterParameter'

export function Accordion({ parametersList }) {
  const [openIdArr, setIdArr] = useState([]);
  const [windowSize, setWindowSize] = useState({});

  let p = [...parametersList].map((parametersItem) => {
    return {id: parametersItem.id, openId: false}
  });

  useEffect(() => {
    setIdArr(p)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id) => {
      let ind = openIdArr.findIndex((i) => i.id === id);
      let upd = [...openIdArr];
      upd[ind].openId = !upd[ind].openId;
      setIdArr(upd);
  }

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = (windowSize.width || 0) < 768;
  const isDesktop = (windowSize.width || Infinity) >= 1024;

  return (
    <div className={styles['accordion']}>
      {isMobile || isDesktop ? (
          parametersList.map((parametersItem, id) => (
            <fieldset className={styles['accordion__item']} key={id}>

              {/* .--active открыта вкладка аккордеона */}

              <button type='button' className={`${openIdArr.some((i) => i.id === id && i.openId) ? styles['accordion__button'] + " " + styles['active'] : styles['accordion__button']}`} onClick={() => handleClick(id)}>
                <span>{parametersItem.title === "Левел:" ? "Левел:" : parametersItem.title}</span>
              </button>                {parametersItem.title === "Левел:" ? (
                  <div className={styles['accordion__content']}
                    style={openIdArr.some((i) => i.id === id && i.openId)  ? {height : "max-content"} : {height: "0px"}}>
                    <Range
                      initialMin={30}
                      initialMax={100}
                      min={0}
                      max={100}
                      step={1}
                      priceCap={10} />
                  </div>
                ) : (
                  <div className={styles['accordion__content']}
                    style={openIdArr.some((i) => i.id === id && i.openId) ? {height : "max-content"} : {height: "0px"}}>
                    <FilterParameter parameters={parametersItem.parameters} svg={parametersItem.svg} />
                  </div>
                )}
            </fieldset>
          ))
      ) :
          parametersList.map((parametersItem, id) => (
            <fieldset className={`${styles['accordion__item']}`} key={id}>
              <button type='button' className={`${styles['accordion__button'] + " " + styles['active']}`}>
                <span>{parametersItem.title === "Левел:" ? "Левел:" : parametersItem.title}</span>
              </button>
                {parametersItem.title === "Левел:" ? (
                  <div className={`${styles['accordion__content'] + " " + styles['accordion__content--margin']}`}
                    style={{height : "max-content"}}>
                    <Range
                      initialMin={30}
                      initialMax={100}
                      min={0}
                      max={100}
                      step={1}
                      priceCap={10} />
                  </div>
                ) : (
                  <div className={styles['accordion__content']}
                    style={{height : "max-content"}}>
                    <FilterParameter parameters={parametersItem.parameters} svg={parametersItem.svg} />
                  </div>
                )}
          </fieldset>
          ))}
    </div>
  )
}
