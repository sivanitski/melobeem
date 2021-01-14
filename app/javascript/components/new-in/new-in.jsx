import React from 'react';
import propTypes from 'prop-types'
import './style.less';
import logoIcon from '../../images/logo-icon.svg';
import logoText from '../../images/logo-text.svg';

const NewIn = ({competitors}) => {
  return (
    <div className="new-in">
      <div className="new-in__header">
        <h2 className="new-in__header__title title">New in</h2>
        <div>See All</div>
      </div>
      <div className="new-in__swiper swiper">
        {competitors.map((it) => {
          return (
            <div className="swiper__item" key={it.ID}>
              <div className="swiper__item__img">
                <img src={it.PHOTO}/>
              </div>
              <div className="swiper__item__name">
                {it.NAME}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

NewIn.propTypes = {
  competitors: propTypes.arrayOf(propTypes.shape({
    ID: propTypes.number.isRequired,
    NAME: propTypes.string.isRequired,
    PHOTO: propTypes.string.isRequired})).isRequired,
};

export default NewIn;
