import React from 'react';
import ICONS from '../constants/icons';
import '../styles/_icon-background.scss';

const SPACING_PX = 125;
const SPACING_MARGIN = SPACING_PX / 4;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIcon() {
  return ICONS[getRandomNumber(0, ICONS.length)];
}

function IconRow({ numberOfIcons }) {
  return (
    <div className="icon-background__row">
      {[...new Array(numberOfIcons)].map(() => {
        const icon = getRandomIcon();

        return (
          <i
            aria-hidden="true"
            className={icon.name}
            style={{
              transform: icon.noRotation ? void 0 : `rotate(${getRandomNumber(0, 360)}deg)`,
              fontSize: `${getRandomNumber(icon.minSize || 10, icon.maxSize)}px`,
              marginTop: `${getRandomNumber(-SPACING_MARGIN, SPACING_MARGIN)}px`,
              marginLeft: `${getRandomNumber(-SPACING_MARGIN, SPACING_MARGIN)}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function IconBackground() {
  const { height, width } = document.body.getBoundingClientRect();
  const numberOfElsPerRow = parseInt((width / SPACING_PX).toFixed());
  const numberOfRows = parseInt((height / SPACING_PX).toFixed());

  return (
    <div className="icon-background">
      {[...new Array(numberOfRows)].map(() => (
        <IconRow numberOfIcons={numberOfElsPerRow} />
      ))}
    </div>
  )
}
