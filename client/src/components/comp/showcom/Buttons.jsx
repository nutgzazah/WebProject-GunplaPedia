import React from 'react'

const Buttons = ({onClickHandler, value, title}) => {
  return (
    <button onClick={onClickHandler} value={value} className='gbtns'>
        {title}
    </button>
  )
}

export default Buttons