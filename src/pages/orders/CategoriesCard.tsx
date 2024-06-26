import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppCategories } from '../../interfaces/category.interface';

function getCategoryClasses(isActive: boolean) {
  const classes = 'item';

  if (isActive) {
    return `${classes} active shadow-lg`;
  }
  return classes;
}
interface ICategoryProps {
  categories: any;
  onClick: (item: any) => void;
}

const colorArray = [
  '#e1ccec',
  '#dfd3c3',
  '#c8d9eb',
  'rgba(200, 217, 223, 0.956863)',
  'rgba(217, 217, 217, 0.956863)',
  '#ffe2e2',
];

function CategoriesCard({ categories, onClick }: ICategoryProps) {
  return (
    <div className="categories-swiper-container">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        breakpoints={{
          // Large screens
          1800: {
            slidesPerView: 5,
          },
          // Laptop screens
          1000: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation]}
        className="mySwiper custom-swiper"
      >
        {categories.length &&
          categories.map((category: AppCategories, index: number) => (
            <SwiperSlide className="categories-list" key={index}>
              <button
                type="button"
                onClick={() => onClick(category.id)}
                key={category.id}
                className={getCategoryClasses(category.id === categories?.id)}
                style={{
                  maxWidth: '220px',
                  background: colorArray[index % colorArray.length],
                }}
              >
                <h3 className="truncate text-left text-base font-semibold capitalize">
                  {category.name}
                </h3>
                <div className="cat-img">
                  <img src={category.icon} className="" alt="" />
                </div>
              </button>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="swiper-navigation-container">
        <div className="custom-swiper-button-prev">&#10094;</div>{' '}
        <div className="custom-swiper-button-next">&#10095;</div>{' '}
      </div>
    </div>
  );
}

export default CategoriesCard;
