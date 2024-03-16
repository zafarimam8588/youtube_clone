import React from 'react'
import Button from './Button';

const ButtonList = () => {
  const buttonNames = [
    "All",
    "Computer",
    "javascript",
    "Node js",
    "Next js",
    "React",
    "Podcasts",
    "Tech",
    "Travel",
    "watched"
  ];
  return (
    <div className='flex'>
      {buttonNames.map((button,index)=>{
        return <Button name={button} key={index} />
      })}
    </div>
  )
}

export default ButtonList