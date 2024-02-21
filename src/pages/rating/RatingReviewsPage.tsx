import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
// import CustomersCreatePopup from './CustomersCreatePopup';
// import CustomersEditPopup from './CustomersEditPopup';
import CustomButton from '../../components/common/CustomButton';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Loader2 from '../../components/common/Loader2';
import Notify from '../../components/common/Notify';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/rating';
import { listingRolePermission } from '../../utils/helper';
import RatingAccordions from './RatingAccordin';

dayjs.extend(relativeTime);

function RatingReviewsPage() {
  const { itemId } = useParams();
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [emptyVariable] = useState(null);
  const [search] = useState<any>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = React.useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [currentList, setCurrentList] = useState<any>([]);
  const [starRatings, setStarRatings] = useState<any>();
  const [ratingDetail, setRatingDetail] = useState<any>();
  const [isLoader, setIsLoader] = React.useState(true);
  const [isLoaderPagination, setIsLoaderPagination] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoader(true);
        if (listingRolePermission(dataRole, 'Employee List')) {
          const [catListResponse, catStarRatingResponse, catDetailResponse] =
            await Promise.all([
              Service.getCatListService(itemId, search, page, rowsPerPage),
              Service.getCatStarRating(itemId),
              Service.getCatStarDetail(itemId),
            ]);
          // Handling list response
          if (catListResponse.data.success) {
            setList(catListResponse.data.data.list);
            setTotal(catListResponse.data.data.total);
          } else {
            throw new Error(catListResponse.data.message);
          }
          // Handling star rating response
          if (catStarRatingResponse.data.success) {
            setStarRatings(catStarRatingResponse.data.data);
          } else {
            throw new Error(catStarRatingResponse.data.message);
          }
          // Handling detail response
          if (catDetailResponse.data.success) {
            setRatingDetail(catDetailResponse.data.data);
          } else {
            throw new Error(catDetailResponse.data.message);
          }
        }
        setIsLoader(false);
      } catch (error: Error | any) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      }
    };
    fetchData();
  }, [emptyVariable]);

  const handleRatingText = (num: number) => {
    switch (true) {
      case num > 4 && num < 5:
        return 'Very Good';
      case num <= 4 && num > 3.5:
        return 'Good';
      case num <= 3.5 && num > 2:
        return 'Average';
      case num <= 2 && num >= 0:
        return 'Below Average';
      default:
        return null;
    }
  };

  const handleRatingValue = (num: any) => {
    switch (true) {
      case num > 4 && num < 5:
        return 5;
      case num <= 4 && num > 3.5:
        return 4;
      case num <= 3.5 && num > 2:
        return 3;
      case num <= 2 && num >= 0:
        return 2;
      default:
        return null;
    }
  };

  const handleViewMore = () => {
    setIsLoaderPagination(true);
    const newPage = page + 1;
    setPage(newPage);
    Service.getCatListService(itemId, search, newPage, rowsPerPage)
      .then((item) => {
        setIsLoaderPagination(false);
        setCurrentList(item.data.data.list);
        setList((prev: any) => [...prev, ...item.data.data.list]);
        setTotal(item.data.data.total);
      })
      .catch((error: Error) => {
        setIsLoaderPagination(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  const handleViewLess = () => {
    setIsLoaderPagination(true);
    const newPage = page - 1;
    setPage(newPage);
    Service.getCatListService(itemId, search, newPage, rowsPerPage)
      .then((item) => {
        setIsLoaderPagination(false);
        setList((prev: any) =>
          prev?.filter(
            (el: any) => !currentList.some((items: any) => items.id === el.id)
          )
        );
        setCurrentList(item.data.data.list);
        setTotal(item.data.data.total);
      })
      .catch((error: Error) => {
        setIsLoaderPagination(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            style={{ height: '8px' }}
            variant="determinate"
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold' }}
            color="text.secondary"
          >{`${Math.round(props.value)}`}</Typography>
        </Box>
      </Box>
    );
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Reviews" isNestedRoute />
      <div className="container m-auto mt-5">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-8 xl:gap-4">
            <div className="rounded-xl bg-white shadow-md xl:col-span-7 2xl:col-span-8">
              <div className="m-auto my-5 h-[266px] w-[637px]">
                <img
                  alt="rating-detail"
                  className="h-full w-full object-contain"
                  src={ratingDetail?.icon}
                />
              </div>
              <div className="mx-4 my-2">
                <div>
                  <span className="text-3xl font-semibold">
                    {ratingDetail?.name}
                  </span>
                </div>
                <div>
                  <span className="mt-3">{ratingDetail?.desc}</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-md xl:col-span-5 2xl:col-span-4">
              <RatingAccordions data={ratingDetail?.homeCatItemFaq} />
            </div>
          </div>
          <div className="mt-5 w-full rounded-xl bg-white p-5 shadow-md">
            <div className="my-5 grid grid-cols-12">
              <div className="xl:col-span-3 2xl:col-span-2">
                <div className="flex items-center">
                  <span className="text-4xl font-semibold">
                    {Number(starRatings?.total) / 5}
                  </span>
                  <div className="mx-4 flex items-center rounded-full bg-black px-4 text-white">
                    <div className="mb-1">
                      <StarOutlinedIcon
                        fontSize="small"
                        style={{ color: 'white' }}
                      />
                    </div>
                    <span className="mx-2 text-sm">
                      {handleRatingText(Number(starRatings?.total / 5))}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <Rating
                    name="half-rating-read"
                    value={handleRatingValue(Number(starRatings?.total / 5))}
                    precision={0.5}
                    readOnly
                  />
                  {/* <Rating name="read-only" value={} readOnly /> */}
                </div>
                <div className="text-[#6A6A6A]">
                  {starRatings?.total} Ratings
                </div>
                <div className="text-[#6A6A6A]">{total} Reviews</div>
              </div>
              <div className="2xl:col-col-span-10 border-l-[1px] xl:col-span-9">
                <div>
                  {starRatings?.list
                    .slice(1)
                    ?.reverse()
                    ?.map((ratings: any, index: number) => {
                      return (
                        <div
                          className="mx-5 grid grid-cols-12 items-center"
                          key={index}
                        >
                          <div className="xl:col-span-2 2xl:col-span-1">
                            <Rating
                              name="half-rating-read"
                              value={Number(ratings?.star)}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                          <div className="mx-10 xl:col-span-6 2xl:col-span-3">
                            <LinearProgressWithLabel value={ratings?.total} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              {isLoaderPagination ? (
                <Loader2 />
              ) : (
                list &&
                list?.map((items: any, index: number) => {
                  return (
                    <div key={index}>
                      {index !== items.length - 1 && (
                        <Divider className="my-5" />
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Rating
                            name="half-rating-read"
                            value={Number(items?.star)}
                            precision={0.5}
                            readOnly
                          />
                          <span className="mx-3 text-sm font-normal text-[#6A6A6A]">
                            {items.appUser?.firstName} {items.appUser?.lastName}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-[#6A6A6A]">
                            {dayjs(items.createdDate).fromNow()}
                          </span>
                        </div>
                      </div>
                      <div className="my-1 w-[70%] text-sm font-normal">
                        <span>{items.review}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {list?.length < 1 ? (
              <CustomText noroundedborders text="No Records Found" />
            ) : null}
            <div className="mt-3 flex w-[100%] justify-end py-3">
              {list?.length > rowsPerPage && (
                <CustomButton
                  onclick={handleViewLess}
                  className="bg-transparent text-sm font-light lowercase text-primary shadow-none"
                  title="View less"
                  buttonType="button"
                />
              )}
              {list?.length !== total && (
                <CustomButton
                  onclick={handleViewMore}
                  className="bg-transparent text-sm font-light lowercase text-primary shadow-none"
                  title="View more"
                  buttonType="button"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {cancelDialogOpen && (
                <PermissionPopup
                    type="shock"
                    open={cancelDialogOpen}
                    setOpen={setCancelDialogOpen}
                    dialogText={dialogText}
                    callback={statusCancelHandler}
                />
            )} */}
    </>
  );
}

export default RatingReviewsPage;
