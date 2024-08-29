import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { ru } from 'date-fns/locale'

import './calendar.scss'

import { useForm } from '@/store/form'
import { differenceInCalendarDays, format } from 'date-fns'

import {
  DAY_CONTENT_STYLES,
  DAY_NAMES,
  DAY_NAMES_MOBILE,
  WEEKDAY_NAMES
} from './const'

registerLocale('ru', ru)

export function CalendarComponent() {
  const {
    setDuration,
    duration,
    setStartDate,
    setEndDate,
    setStartDateCalendar,
    startDateCalendar,
    setEndDateCalendar,
    endDateCalendar
  } = useForm()
  const [startDateState, setStartDateState] = useState<Date | null>(
    startDateCalendar
  )
  const [endDateState, setEndDateState] = useState<Date | null>(endDateCalendar)
  const [maxDate, setMaxDate] = useState<Date | null>(null)

  const [windowSize, setWindowSize] = useState<{
    width?: number
    height?: number
  }>({})

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = useMemo(
    () => (windowSize.width || 0) < 768,
    [windowSize.width]
  )
  const isDesktop = useMemo(
    () => (windowSize.width || Infinity) >= 1024,
    [windowSize.width]
  )

  useEffect(() => {
    if (startDateState && endDateState) {
      const newEndDate = new Date(startDateState.getTime())
      newEndDate.setDate(newEndDate.getDate() + duration - 1)
      setEndDateState(newEndDate)
      setEndDate(format(newEndDate, 'yyyy-MM-dd', { locale: ru }))
      setEndDateCalendar(endDateState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  const handleDateChange = useCallback(
    (dates: [Date | null, Date | null]): void => {
      const [start, end] = dates
      if (start && end) {
        if (start.getTime() < end.getTime()) {
          setStartDateState(start)
          setEndDateState(end)
          setStartDateCalendar(start)
          setEndDateCalendar(end)
          setStartDate(format(start, 'yyyy-MM-dd', { locale: ru }))
          setEndDate(format(end, 'yyyy-MM-dd', { locale: ru }))
          setMaxDate(
            new Date(
              start.getFullYear(),
              start.getMonth(),
              start.getDate() + 30
            )
          )
          setDuration(differenceInCalendarDays(end, start) + 1)
        } else {
          setStartDateState(end)
          setEndDateState(null)
          setStartDateCalendar(end)
          setEndDateCalendar(null)
          setStartDate(format(end, 'yyyy-MM-dd', { locale: ru }))
          setEndDate(null)
          setMaxDate(
            new Date(end.getFullYear(), end.getMonth(), end.getDate() + 30)
          )
          setDuration(3)
        }
      } else if (start && !end) {
        setStartDateState(start)
        setStartDateCalendar(start)
        setEndDateCalendar(null)
        setStartDate(format(start, 'yyyy-MM-dd', { locale: ru }))
        setEndDateState(null)
        setEndDate(null)
        setMaxDate(
          new Date(start.getFullYear(), start.getMonth(), start.getDate() + 30)
        )
        setDuration(3)
      } else {
        setStartDateState(null)
        setEndDateState(null)
        setEndDate(null)
        setStartDate(null)
        setMaxDate(null)
        setDuration(3)
        setStartDateCalendar(null)
        setEndDateCalendar(null)
      }
    },
    [
      setStartDate,
      setEndDate,
      setStartDateCalendar,
      setEndDateCalendar,
      setDuration
    ]
  )

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (!startDateState || (startDateState && endDateState)) {
        setStartDateState(date)
        setEndDateState(null)
        setStartDateCalendar(date)
        setEndDateCalendar(null)
        setStartDate(format(date, 'yyyy-MM-dd', { locale: ru }))
        setEndDate(null)
        setMaxDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 30)
        )
        setDuration(3)
      } else if (startDateState && !endDateState) {
        if (date.getTime() <= startDateState.getTime()) {
          setStartDateState(date)
          setEndDateState(null)
          setStartDateCalendar(date)
          setEndDateCalendar(null)
          setStartDate(format(date, 'yyyy-MM-dd', { locale: ru }))
          setEndDate(null)
          setMaxDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 30)
          )
          setDuration(3)
        } else {
          setEndDateState(date)
          setEndDateCalendar(date)
          setEndDate(format(date, 'yyyy-MM-dd', { locale: ru }))
          setMaxDate(
            new Date(
              startDateState.getFullYear(),
              startDateState.getMonth(),
              startDateState.getDate() + 30
            )
          )
          setDuration(differenceInCalendarDays(date, startDateState) + 1)
        }
      }
    },
    [
      startDateState,
      endDateState,
      setStartDateState,
      setEndDateState,
      setStartDateCalendar,
      setEndDateCalendar,
      setStartDate,
      setEndDate,
      setMaxDate,
      setDuration
    ]
  )

  const renderDayContents = useCallback(
    (day: number, date: Date) => {
      if (isDesktop) {
        if (
          day === 1 &&
          (!startDateState || date.getTime() !== startDateState.getTime()) &&
          (!endDateState || date.getTime() !== endDateState.getTime())
        ) {
          const monthName = format(date, 'LLLL', { locale: ru }).slice(0, 3)
          return (
            <div
              style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}
            >
              <span>{day}</span>
              <div>{monthName}</div>
            </div>
          )
        }
        if (startDateState && date.getTime() === startDateState.getTime()) {
          return (
            <div style={DAY_CONTENT_STYLES}>
              <span>{day}</span>
              <span>Заезд</span>
            </div>
          )
        } else if (endDateState && date.getTime() === endDateState.getTime()) {
          return (
            <div style={DAY_CONTENT_STYLES}>
              <span>{day}</span>
              <span>Выезд</span>
            </div>
          )
        }
      }
      return day
    },
    [isDesktop, startDateState, endDateState]
  )

  return (
    <div className="custom-datepicker">
      <DatePicker
        key={new Date().getTime()}
        selected={startDateState}
        onChange={(dates) =>
          handleDateChange(dates as [Date | null, Date | null])
        }
        onSelect={handleDateSelect}
        startDate={startDateState}
        endDate={endDateState}
        selectsRange
        inline
        locale="ru"
        showDisabledMonthNavigation
        minDate={new Date()}
        maxDate={maxDate}
        renderDayContents={renderDayContents}
        formatWeekDay={(day) => {
          const index = WEEKDAY_NAMES.findIndex((elem) => elem === day)
          return isMobile ? DAY_NAMES_MOBILE[index] : DAY_NAMES[index]
        }}
      />
    </div>
  )
}

export const Calendar = memo(CalendarComponent)
