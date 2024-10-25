import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import assets from '../../assets';

type SwiperComponentProps = {
  data: any;
  isActiveUser?: string;
  selectedUser?: any;
};

const SwiperComponent = ({
  data,
  isActiveUser,
  selectedUser,
}: SwiperComponentProps) => {
  const handleUser = (name: string) => {
    selectedUser(name);
  };

  return (
    <div className="categories-swiper-container">
      <Swiper
        slidesPerView={10}
        spaceBetween={30}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        breakpoints={{
          // Large screens
          1800: {
            slidesPerView: 10,
          },
          // Laptop screens
          1000: {
            slidesPerView: 10,
          },
        }}
        modules={[Navigation]}
        className="mySwiper custom-swiper"
      >
        {data?.length > 0
          ? data?.map((item: any, index: number) => {
              return (
                <SwiperSlide className="categories-list" key={index}>
                  <div key={index} className="swiper-slide flex items-center">
                    {/* {item.id === isActiveUser && (
                      <div className="">
                        <FiberManualRecordIcon />
                      </div>
                    )} */}
                    <div
                      onClick={() => handleUser(item.id)}
                      className={`w-[100%] cursor-pointer truncate rounded-xl p-1 ${
                        item.id === isActiveUser && 'border-2 border-primary'
                      }`}
                    >
                      <div className="flex h-[35px] items-center justify-center">
                        <img
                          className="flex h-full w-[35px] max-w-full items-center rounded-[20px] object-fill"
                          src={
                            item.imageUrl ?? assets.tempImages.avatarCustomer
                          }
                          alt="avatar-img"
                        />
                      </div>
                      <div className="flex w-[100%] cursor-pointer items-center justify-center truncate">
                        <span className="truncate text-base font-semibold capitalize">
                          {item.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
      <div className="swiper-navigation-container my-4 px-1">
        <div className="custom-swiper-button-prev border-2 border-primary text-primary focus:bg-none">
          &#10094;
        </div>{' '}
        <div className="custom-swiper-button-next border-2 border-primary text-primary">
          &#10095;
        </div>{' '}
      </div>
    </div>
  );
};

export default SwiperComponent;
