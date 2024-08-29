import { memo, PointerEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AppRoute } from '@/const'
import { useCards } from '@/store/cards'
import { useCountries } from '@/store/countries'
import { useForm } from '@/store/form'
import { toast } from 'react-hot-toast'

import styles from './BtnForm.module.scss'

export function BtnFormComponent({
  title,
  activeStep,
  setActiveStep
}: {
  title: string
  activeStep?: number
  setActiveStep?: (arg: number) => void
}) {
  const router = useRouter()
  const { getTravelerCards, setCardId, setCardData } = useCards()
  const { setCurrentCountries } = useCountries()
  const {
    transport,
    hashTags,
    countryList,
    endDate,
    startDate,
    children,
    companion,
    createPost,
    loading,
    setActiveStep: setFormActiveStep,
    reset
  } = useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isProcessing = useRef<boolean>(false)

  const postData = {
    companionCount: companion,
    children: children,
    startDate: startDate ? startDate : '',
    endDate: endDate ? endDate : '',
    countryList: countryList,
    hashTags: hashTags,
    transport: transport
  }

  const disabled =
    !startDate || !endDate || countryList.length === 0 || loading || isLoading

  const handleButtonClick = async (evt: PointerEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    if (isLoading || loading || isProcessing.current) return
    isProcessing.current = true
    if (title === 'Отправить' && startDate && endDate) {
      if (transport.length === 0) {
        toast.error('Пожалуйста, укажите предпочитаемый вид транспорта')
        isProcessing.current = false
        return
      }

      if (startDate.length && endDate.length) {
        try {
          setIsLoading(true)
          const response = await createPost(postData)
          if (response.id) {
            toast.success('Карточка успешно создана')
            setCardId(response.id)
            setCardData(postData)
            await getTravelerCards()
            router.push(AppRoute.Catalog)
            setCurrentCountries([])
            reset()
          }
        } catch (error) {
          toast.error(`Ошибка при создании поста: ${error}`)
        } finally {
          setIsLoading(false)
          isProcessing.current = false
        }
      }
    }
    if (activeStep && typeof setActiveStep === 'function') {
      setActiveStep(activeStep + 1)
    } else if (activeStep && typeof setFormActiveStep === 'function') {
      setFormActiveStep(activeStep + 1)
    }
  }

  return (
    <button
      className={styles.button}
      type={title === 'Отправить' ? 'submit' : 'button'}
      onClick={handleButtonClick}
      disabled={title === 'Отправить' && disabled}
      aria-label={title}
    >
      <span>{title === 'Отправить' && loading ? 'Отправка...' : title}</span>
      <Image
        src="img/icons/triangle.svg"
        alt="к следующему шагу"
        width={11}
        height={14}
        className={styles['button__icon']}
      />
    </button>
  )
}

export const BtnForm = memo(BtnFormComponent)
