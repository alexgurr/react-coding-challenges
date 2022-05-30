import React,  { useState,useRef } from 'react';
import '../styles/_rocket.scss';
import {gsap} from 'gsap';


const SECONDS_TO_TAKEOFF = 5;
const MS_TO_TAKEOFF = SECONDS_TO_TAKEOFF * 1000;
const FINAL_POSITION_BOTTOM_VAL = 'calc(400px)';

function timeToPositionPercent(startTime) {
  const now = Date.now();
  const timeDiff = now - startTime;

  if (timeDiff >= MS_TO_TAKEOFF) { return FINAL_POSITION_BOTTOM_VAL; }

  return `calc(300px + ${((timeDiff / MS_TO_TAKEOFF) * 100).toFixed(0)}%)`;
}

function generateEmptyListEls(quantity) {
  return [...Array(quantity)].map(() => <li />);
  
}

export default function RocketCore({ initialLaunchTime }) {
// crear una referenca al elemento
  let rocket= useRef(null)


// usar una api para que el cohete pueda moverse y volver a su lugar 
  function moverRocket(){

    gsap.to(rocket,{duration:3,y:-900})
    gsap.to(rocket,{delay:4,duration:0.1,y:0})
  }


  return (
    <>
    <button onClick={moverRocket}>Inicio</button>
      <div className="rocket" ref={el=>rocket=el} >
        <div className="rocket__body">
          <div className="rocket__body__main"/>
          <div className="rocket__body__fin rocket__body__fin__left"/>
          <div className="rocket__body__fin rocket__body__fin__right"/>
          <div className="rocket__body__window"/>
        </div>
        <div className="rocket__exhaust__flame"/>
        <ul className="rocket__exhaust__fumes">
          {generateEmptyListEls(9)}
        </ul>
      </div>
      <ul className="stars">
        {generateEmptyListEls(7)}
      </ul>
    </>
  );
}

