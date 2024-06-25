import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import moment from 'moment';
import assets from '../../assets';

type RatingAccordionsProps = {
  data: Array<object>;
};

function ViewCardAccordin({ data }: RatingAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel0`);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="max-h-[250px]">
      {data?.length > 0 ? (
        data?.map((item: any, index: number) => {
          const date = dayjs(item.appointmentTime);
          const formattedDateTime = dayjs(date).format('h:mm:ss A');
          //   const date2 = date.add(item.serviceTime, 'minute');
          //   const formattedDate2 = date2.format('h:mm:ss A');
          return (
            <div key={index}>
              <Accordion
                key={index}
                className="boxShadow bg-transparent"
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <div className="flex w-full items-center justify-between">
                    <Typography
                      className="flex-grow-1 truncate font-semibold"
                      sx={{ width: '50%', flexShrink: 0 }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      className="flex-grow-2 flex items-end justify-end text-[12px]"
                      sx={{ width: '50%', flexShrink: 0 }}
                    >
                      {formattedDateTime}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="m-4 rounded border-[1px] border-[#949EAE]">
                  <div className="flex items-center">
                    <div>
                      <img src={assets.images.appHead} alt="app-head" />
                    </div>
                    <div>
                      <span className="mx-2 text-xs text-[#6A6A6A]">
                        {item.storeServiceCategoryItem?.name}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center">
                    <div>
                      <img src={assets.images.appCalender} alt="app-head" />
                    </div>
                    <div>
                      <span className="mx-2 text-xs text-[#6A6A6A]">
                        {moment(item?.appointmentTime)?.format(
                          'MMMM DD, YYYY'
                        ) ?? '--'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center">
                    <div>
                      <img
                        className="ml-[-1px] h-[14px] w-[14px] rounded-full"
                        src={
                          item.appointmentType !== 'AnyProfessional'
                            ? item.storeEmployee?.avatar
                            : assets.images.usersIcon
                        }
                        alt="app-head"
                      />
                    </div>
                    <div>
                      <span className="mx-2 text-xs text-[#6A6A6A]">
                        {item.appointmentType !== 'AnyProfessional'
                          ? item?.storeEmployee?.name
                          : 'Any Professional'}
                      </span>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </div>
          );
        })
      ) : (
        <div className="flex h-[350px] flex-col items-center justify-center">
          <span className="text-xl font-semibold">Services</span>
          <span>No Record Found</span>
        </div>
      )}
    </div>
  );
}

export default ViewCardAccordin;
