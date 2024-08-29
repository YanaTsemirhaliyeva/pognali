import { FilterParameter } from '@/ui/filter-parameter/FilterParameter'
import styles from './Accordion.module.scss'

export function AccordionItem({ parametersItem, onClick, isOpened }) {

  // .--active открыта вкладка аккордеона

    return (
        <fieldset className={styles['accordion__item']}>
            <button type='button' className={`${isOpened ? styles['accordion__button'] + " " + styles['active'] : styles['accordion__button']}`} onClick={(()=> onClick())}>
                <span>{parametersItem.title}</span>
            </button>
            <div className={styles['accordion__content']}
                style={isOpened ? {height : "max-content"} : {height: "0px"}}>
                <FilterParameter parameters={parametersItem.parameters} svg={parametersItem.svg} />
            </div>
        </fieldset>
    )
}
