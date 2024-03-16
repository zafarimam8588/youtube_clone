import React from 'react'

const Button = ({name}) => {
  return (
    <div className="font-semibold text-sm px-3 py-2 m-2 bg-gray-200 rounded-lg hover:bg-black hover:text-white hover:ring-sky-500">
        {name}
    </div>
  )
}

export default Button