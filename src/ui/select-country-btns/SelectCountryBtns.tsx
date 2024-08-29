import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useCards } from '@/store/cards'
import { useCountries } from '@/store/countries'
import { useForm } from '@/store/form'
import { BtnSelect } from '@/ui/btn-select/BtnSelect'
import { SearchCountry } from '@/ui/search-country/SearchCountry'
import { ReactSVG } from 'react-svg'

import { Country } from '@/types/countries'

import styles from './SelectCountryBtns.module.scss'

export function SelectCountryBtns({ name }: { name: string }) {
  const [active, setActive] = useState<boolean>(false)
  const [activeSelect, setActiveSelect] = useState<string>('')
  const { setCurrentCountries, currentCountries } = useCountries()
  const { setActiveContinents, setActiveCountries } = useCards()
  const { setCountryList } = useForm()

  useEffect(() => {
    const updatedCountryList = currentCountries.map((country) => ({
      name: country.name.rus,
      description: ''
    }))
    setCountryList(updatedCountryList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCountries])

  const queryCountries = useMemo(() => {
    return currentCountries.map((country) => country.name.rus)
  }, [currentCountries])

  const queryContinents = useMemo(() => {
    return Array.from(
      new Set(currentCountries.flatMap((country) => country.continent))
    )
  }, [currentCountries])

  useEffect(() => {
    setActiveContinents(queryContinents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryContinents])

  useEffect(() => {
    setActiveCountries(queryCountries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryCountries])

  const handleClickSelect = () => {
    setActive(!active)
  }

  const changeSelectedCountries = (index: number, country: Country) => {
    const newSelectedCountries = [...currentCountries]
    newSelectedCountries[index] = country
    setCurrentCountries(newSelectedCountries)
  }

  const handleSelectAdd = () => {
    setCurrentCountries([
      ...currentCountries,
      {
        flags: {
          png: '',
          svg: ''
        },
        name: {
          common: '',
          rus: ''
        },
        continent: [],
        island: false
      }
    ])
  }

  const handleCountryDelete = (id: number) => {
    const newSelectedCountries = currentCountries.filter((_, i) => i !== id)
    setCurrentCountries(newSelectedCountries)
  }

  return (
    <>
      {name === 'select' ? (
        <>
          {currentCountries.length > 0 ? (
            currentCountries.map((country, index) => {
              return country.name.common.length > 0 ? (
                <div
                  key={index}
                  data-name={index.toString()}
                  onClick={(evt) =>
                    setActiveSelect(evt.currentTarget.dataset.name ?? '')
                  }
                  className={`${active && activeSelect === index.toString() ? `${styles['select-country-btns']} ${styles['select-country-btns--select']} ${styles['opened']}` : `${styles['select-country-btns']} ${styles['select-country-btns--select']}`}`}
                >
                  <BtnSelect
                    name="select"
                    isActive={active && activeSelect === index.toString()}
                    onClick={handleClickSelect}
                    country={country.name.rus}
                  />
                  {activeSelect === index.toString() && (
                    <div className={styles['select-country-btns__search']}>
                      <SearchCountry
                        setActiveAlphabet={handleClickSelect}
                        index={index}
                        changeSelectedCountries={changeSelectedCountries}
                      />
                    </div>
                  )}
                  <div className={styles['select-country-btns__flag']}>
                    <div
                      className={styles['select-country-btns__flag-wrapper']}
                    >
                      <Image
                        src={country.flags.png}
                        alt={`флаг ${country.name.rus}`}
                        width={100}
                        height={50}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles['select-country-btns__delete']}
                    onClick={() => handleCountryDelete(index)}
                  >
                    <ReactSVG
                      src="img/icons/icon-close.svg"
                      className={`${styles['select-country-btns__icon']} ${styles['select-country-btns__icon--delete']}`}
                    />
                  </button>
                  <div className={styles['select-country-btns__arrow']}>
                    <ReactSVG src="img/icons/icon-arrow-down.svg" />
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  data-name={index.toString()}
                  onClick={(evt) =>
                    setActiveSelect(evt.currentTarget.dataset.name ?? '')
                  }
                  className={`${active && activeSelect === index.toString() ? `${styles['select-country-btns']} ${styles['select-country-btns--select']} ${styles['opened']}` : `${styles['select-country-btns']} ${styles['select-country-btns--select']}`}`}
                >
                  <BtnSelect
                    name="select"
                    isActive={active && activeSelect === index.toString()}
                    onClick={handleClickSelect}
                  />
                  {activeSelect === index.toString() && (
                    <div className={styles['select-country-btns__search']}>
                      <SearchCountry
                        setActiveAlphabet={handleClickSelect}
                        index={index}
                        changeSelectedCountries={changeSelectedCountries}
                      />
                    </div>
                  )}
                  <div className={styles['select-country-btns__flag']}></div>
                  <button
                    type="button"
                    className={styles['select-country-btns__delete']}
                    onClick={() => handleCountryDelete(index)}
                  >
                    <ReactSVG
                      src="img/icons/icon-close.svg"
                      className={`${styles['select-country-btns__icon']} ${styles['select-country-btns__icon--delete']}`}
                    />
                  </button>
                  <div className={styles['select-country-btns__arrow']}>
                    <ReactSVG src="img/icons/icon-arrow-down.svg" />
                  </div>
                </div>
              )
            })
          ) : (
            <div
              className={`${active ? `${styles['select-country-btns']} ${styles['select-country-btns--select']} ${styles['opened']}` : `${styles['select-country-btns']} ${styles['select-country-btns--select']}`}`}
            >
              <BtnSelect
                name="select"
                isActive={active}
                onClick={handleClickSelect}
              />
              <div className={styles['select-country-btns__search']}>
                <SearchCountry
                  setActiveAlphabet={handleClickSelect}
                  index={0}
                  changeSelectedCountries={changeSelectedCountries}
                />
              </div>
              <div className={styles['select-country-btns__flag']}></div>
              <button
                type="button"
                className={styles['select-country-btns__delete']}
              >
                <ReactSVG
                  src="img/icons/icon-close.svg"
                  className={`${styles['select-country-btns__icon']} ${styles['select-country-btns__icon--delete']}`}
                />
              </button>
              <div className={styles['select-country-btns__arrow']}>
                <ReactSVG src="img/icons/icon-arrow-down.svg" />
              </div>
            </div>
          )}
        </>
      ) : currentCountries.length < 4 ? (
        <div
          className={`${active ? `${styles['select-country-btns']} ${styles['select-country-btns--add']}` : `${styles['select-country-btns']} ${styles['select-country-btns--add']}`}`}
        >
          <BtnSelect
            name="add"
            isActive={active}
            handleSelectAdd={handleSelectAdd}
          />
        </div>
      ) : null}
    </>
  )
}
