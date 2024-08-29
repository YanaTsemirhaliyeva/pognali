import { useEffect, useState } from 'react'
import { useCards } from '@/store/cards'
import { useCountries } from '@/store/countries'
import { useForm } from '@/store/form'
import { BtnForm } from '@/ui/btn-form/BtnForm'
import { BtnPrevStep } from '@/ui/btn-prev-step/BtnPrevStep'

import { CountryList } from '@/types/formData'

import Textarea from '../../ui/textarea/Textarea'
import { PlanStepDesc } from '../plan-step-desc/PlanStepDesc'
import { PlanStepTitle } from '../plan-step-title/PlanStepTitle'
import { StepList } from '../step-list/StepList'
import { TITLE_DATA } from './entertainment-data'
import styles from './Entertainment.module.scss'

export function Entertainment() {
  const { step, title, description, activeItem } = TITLE_DATA
  const { activeStep, setActiveStep, countryList, setCountryList } = useForm()
  const { currentCountries, countries } = useCountries()
  const { setActiveContinents, setActiveCountries } = useCards()

  const activeCountryList = [...currentCountries].filter(
    (country) => country.name.rus !== ''
  )
  const activeTravelList = [...countryList].filter(
    (country) => country.name !== ''
  )
  const [travelList, setTravelList] = useState<CountryList[]>(activeTravelList)

  useEffect(() => {
    setCountryList(travelList)

    const countryNames = travelList.map((country) => country.name)
    setActiveCountries(countryNames)
    const continents = new Set()
    countryNames.forEach((name) => {
      for (const letter in countries) {
        const country = countries[letter].find(
          (country) => country.name.rus === name
        )
        if (country) {
          country.continent.forEach((continent) => continents.add(continent))
        }
      }
    })
    setActiveContinents(Array.from(continents) as string[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelList])

  const handleTextareaBlur = (title: string, value: string) => {
    setTravelList((prevList) => {
      const existingItemIndex = prevList.findIndex(
        (item) => item.name === title
      )
      if (existingItemIndex >= 0) {
        const updatedList = [...prevList]
        updatedList[existingItemIndex] = {
          ...updatedList[existingItemIndex],
          description: value
        }
        return updatedList
      } else {
        return [...prevList, { name: title, description: value }]
      }
    })
  }

  return (
    <div className={styles['entertainment']}>
      <div className={styles['entertainment__header']}>
        <div className={styles['entertainment__text']}>
          <PlanStepTitle step={step} title={title} />
          <PlanStepDesc text={description} />
        </div>
        <StepList activeItem={activeItem} />
      </div>
      <div className={styles['entertainment__content']}>
        {activeCountryList.map((country, index) => {
          return (
            <Textarea
              key={index}
              isNoLine={index === 0 ? true : false} // только на первый вешай
              title={country.name.rus}
              flag={country.flags.png}
              onTextareaBlur={handleTextareaBlur}
              value={
                countryList.find((item) => item.name === country.name.rus)
                  ?.description || ''
              }
            />
          )
        })}
      </div>
      <div className={styles['entertainment__btns']}>
        <BtnForm title="Отправить" />
        <BtnPrevStep activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
    </div>
  )
}
