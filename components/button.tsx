import React from 'react'
type Props = {
  onClick?: () => void,
  children: React.ReactNode
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg mt-4 bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      {children}
    </button>
  )
}

export default Button
