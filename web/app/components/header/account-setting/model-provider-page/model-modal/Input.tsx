import type { FC } from 'react'
import { useState } from 'react'
import { CheckCircle } from '@/app/components/base/icons/src/vender/solid/general'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/solid/alertsAndFeedback'

type InputProps = {
  value?: string
  onChange: (v: string) => void
  onFocus?: () => void
  placeholder?: string
  validated?: boolean
  className?: string
  disabled?: boolean
  type?: string
  min?: number
  max?: number
  isUrl?: boolean
}
const Input: FC<InputProps> = ({
  value,
  onChange,
  onFocus,
  placeholder,
  validated,
  className,
  disabled,
  type = 'text',
  min,
  max,
  isUrl = false,
}) => {
  const [error, setError] = useState<string | null>(null)

  const toLimit = (v: string) => {
    const minNum = Number.parseFloat(`${min}`)
    const maxNum = Number.parseFloat(`${max}`)
    if (!isNaN(minNum) && Number.parseFloat(v) < minNum) {
      onChange(`${min}`)
      return
    }

    if (!isNaN(maxNum) && Number.parseFloat(v) > maxNum)
      onChange(`${max}`)
  }

  const validateUrl = (url: string) => {
    if (isUrl && url && !url.startsWith('https://')) {
      setError('URL 必须以 https:// 开头')
      return false
    }
    setError(null)
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    if (isUrl) {
      validateUrl(newValue)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (type === 'number') {
      toLimit(value)
    }
    if (isUrl && value) {
      validateUrl(value)
    }
  }

  return (
    <div className='relative'>
      <input
        tabIndex={0}
        className={`
          block px-3 w-full h-8 bg-components-input-bg-normal text-sm text-components-input-text-filled rounded-lg border ${error ? 'border-red-500' : 'border-transparent'}
          appearance-none outline-none caret-primary-600
          hover:border-components-input-border-hover hover:bg-components-input-bg-hover
          focus:bg-components-input-bg-active focus:border-components-input-border-active focus:shadow-xs
          placeholder:text-sm placeholder:text-text-tertiary
          ${validated && 'pr-[30px]'}
          ${className}
        `}
        placeholder={placeholder || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        value={value}
        disabled={disabled}
        type={type}
        min={min}
        max={max}
      />
      {
        validated && (
          <div className='absolute top-2.5 right-2.5'>
            <CheckCircle className='w-4 h-4 text-[#039855]' />
          </div>
        )
      }
      {
        error && (
          <div className='absolute top-9 left-0 text-xs text-red-500 flex items-center'>
            <AlertTriangle className='w-3 h-3 mr-1' />
            {error}
          </div>
        )
      }
    </div>
  )
}

export default Input
