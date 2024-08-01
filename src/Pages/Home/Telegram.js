import { useEffect } from 'react'
// import { Link } from 'react-router-dom';
import style from './Telegram.module.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


export function Telegram() {
  return (
    <div className={style.container}>
      <em className={style.textStyle}>Unveil Your Username’s Uniqueness!</em>
      <img src={require('../../Assets/Home/super-sponge-bob.png')} className={style['App-logo']} alt="logo" />
      <Link className={style.continueButtonContainer} to={'./CheckUserRating'}>
        <Button className={style.continueButton}>Continue</Button>
      </Link>
    </div>
  );
}