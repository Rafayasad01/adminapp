import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import * as React from 'react';

type RatingAccordionsProps = {
  data: Array<object>;
};

function RatingAccordions({ data }: RatingAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(``);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {data?.length > 0 ? (
        data?.map((item: any, index: number) => {
          return (
            <>
              <Accordion
                className="boxShadow bg-transparent"
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    className="flex-grow-1"
                    sx={{ width: '33%', flexShrink: 0 }}
                  >
                    Service {index + 1}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="flex">
                  <Typography className="flex rounded-full border-[1px] border-primary px-4 py-2">
                    {item.storeServiceCategoryItem.name}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </>
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

export default RatingAccordions;
