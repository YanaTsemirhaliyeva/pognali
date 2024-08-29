import { memo } from 'react'
import parse from 'html-react-parser'

import styles from './PlanStepDesc.module.scss'

export function PlanStepDescComponent({ text }: { text: string }) {
  return <p className={styles['step-desc']}>{parse(text)}</p>
}

export const PlanStepDesc = memo(PlanStepDescComponent)
