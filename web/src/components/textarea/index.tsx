import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...attrs }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...attrs} />
    </div>
  )
}

export default Textarea
