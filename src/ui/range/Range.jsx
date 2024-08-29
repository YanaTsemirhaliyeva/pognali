import styles from './Range.module.scss'
import { useState, useEffect, useRef } from "react";

export function Range({ initialMin, initialMax, min, max, step, priceCap }) {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (Number.parseInt(e.target.value) > Number.parseInt(maxValue)) {
        return
      } else {
        setMinValue(Number.parseInt(e.target.value));
      }
    } else {
      if (Number.parseInt(e.target.value) < minValue) {
        setMinValue(Number.parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
        return
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max)  * "100" + "%";
    progressRef.current.style.right = max - (maxValue / max) * "100" + "%";
  }, [minValue, maxValue, max, step]);

  return (
      <div className={styles['range']}>
        <div className={styles['range__field']}>
          <label className={styles['range__field-label'] + ' ' + styles['range__field-label--min']} htmlFor='field-min'>
            <input type='number' value={minValue} max={max} min={min} name='field-min' onChange={(e) => setMinValue(e.target.value)} />
            <span className='visually-hidden'>Минимальное значение</span>
          </label>
          <label className={styles['range__field-label'] + ' ' + styles['range__field-label--max']} htmlFor='field-max'>
            <input type='number' value={maxValue} name='field-max' onChange={(e) => setMaxValue(e.target.value)}  />
            <span className='visually-hidden'>Максимальное значение</span>
          </label>
        </div>
        <div className={styles['range__slider']}>
          <div className={styles['range__slider-track-wrapper']}>
            <div className={styles['range__slider-track']} ref={progressRef} ></div>
          </div>
            <input
              className={styles['range__slider-input-min']}
              onChange={handleMin}
              step={step}
              min={min}
              max={max}
              value={minValue}
              name="min"
              type="range"
            />
            <input
              className={styles['range__slider-input-max']}
              name="max"
              type="range"
              onChange={handleMax}
              step={step}
              min={min}
              max={max}
              value={maxValue}
            />
        </div>
      </div>
  );
}
