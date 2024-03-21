import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import assets from '../../assets';

type Props = {
  data: any;
  selectedUser?: any;
};

const SwiperComponent = ({ data, selectedUser }: Props) => {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 4,
      direction: getDirection(),
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        resize: function () {
          swiper.changeDirection(getDirection());
        },
        reachEnd: function () {
          document
            .querySelector('.swiper-button-next')
            ?.classList.add('swiper-button-disabled');
        },
        reachBeginning: function () {
          document
            .querySelector('.swiper-button-prev')
            ?.classList.add('swiper-button-disabled');
        },
        fromEdge: function () {
          document
            .querySelector('.swiper-button-next')
            ?.classList.remove('swiper-button-disabled');
          document
            .querySelector('.swiper-button-prev')
            ?.classList.remove('swiper-button-disabled');
        },
      },
    });

    function getDirection() {
      const windowWidth = window.innerWidth;
      return windowWidth <= 760 ? 'vertical' : 'horizontal';
    }

    // Event handler for clicking the right arrow button
    const handleNextButtonClick = () => {
      swiper.slideNext();
    };

    // Event handler for clicking the left arrow button
    const handlePrevButtonClick = () => {
      swiper.slidePrev();
    };

    // Add event listeners to the arrow buttons
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');
    nextButton!.addEventListener('click', handleNextButtonClick);
    prevButton!.addEventListener('click', handlePrevButtonClick);

    // Remove event listeners when component unmounts
    return () => {
      nextButton!.removeEventListener('click', handleNextButtonClick);
      prevButton!.removeEventListener('click', handlePrevButtonClick);
    };
  }, []);

  const handleUser = (name: string) => {
    console.log(name);
    selectedUser(name);
  };

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {data?.map((item: any, index: number) => {
          return (
            <div key={index} className="swiper-slide">
              <div className="flex items-center">
                <div>
                  <img
                    className="w-[35px]"
                    src={assets.images.avatarUser}
                    alt="avatar-img"
                  />
                </div>
                <div
                  onClick={() => handleUser(item.name)}
                  className="cursor-pointer"
                >
                  <span className="mx-3 text-base font-semibold">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default SwiperComponent;
