import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

type RatingAccordionsProps = {
  data: Array<object>;
};

function ProjectPlanAccordin({ data }: RatingAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(``);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const formatHeader = (key: string) => {
    return key.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  const getColor = (value: any) => {
    if (value >= 0 && value <= 50) return '#FF0000'; // Red
    if (value >= 51 && value <= 99) return '#FFD700'; // Yellow
    if (value === 100) return '#008000'; // Green
    return '#1a90ff'; // Default color
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
    height: 15,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: getColor(value),
    },
  }));

  const ProgressWithLabel = ({ value }: any) => {
    return (
      <div
        style={{ position: 'relative', display: 'inline-block', width: '100%' }}
      >
        <BorderLinearProgress
          variant="determinate"
          value={value}
          valueBuffer={value}
        />
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, 0)',
            fontSize: '0.8rem',
            color: 'black',
          }}
        >
          {`${value}%`}
        </span>
      </div>
    );
  };

  const fixedColumns = ['stage', 'room', 'activity', 'progress', 'remarks'];

  return (
    <div>
      {
        data?.length > 0 &&
          data?.map((item: any, index: number) => {
            return (
              <div key={index}>
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
                      {item.day}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex items-center justify-center">
                    <Typography className="flex items-center justify-center">
                      <div className="Content thin-scrollbar px-5">
                        <div className="">
                          {/* <h1 className="my-4 text-center text-lg font-bold">
                          {' '}
                          Day Activities
                        </h1> */}
                          <h3>
                            <b>Project Name: </b> {item?.projectName ?? ''}
                          </h3>
                          <h3>
                            <b>Working Day: </b> {item?.day ?? ''}
                          </h3>
                        </div>
                        <div className="mt-3 grid grid-cols-none">
                          <table className="table-border table-auto">
                            <thead>
                              <tr>
                                {/* Render fixed columns */}
                                {fixedColumns.map((col) => (
                                  <th key={col}>
                                    {formatHeader(
                                      col.charAt(0).toUpperCase() + col.slice(1)
                                    )}
                                  </th>
                                ))}
                                {/* Render additional columns dynamically */}
                                {item &&
                                  item.data &&
                                  Object.keys(item.data[0]).map((key) => {
                                    if (!fixedColumns.includes(key)) {
                                      return (
                                        <th key={key}>
                                          {formatHeader(
                                            key.charAt(0).toUpperCase() +
                                              key.slice(1)
                                          )}
                                        </th>
                                      );
                                    }
                                    return null;
                                  })}
                              </tr>
                            </thead>
                            <tbody className="thin-scrollbar">
                              {item &&
                                item.data &&
                                item.data.map((items: any, i: number) => {
                                  const additionalColumns = Object.keys(
                                    items
                                  ).filter(
                                    (key) => !fixedColumns.includes(key)
                                  );

                                  return (
                                    <tr className="thin-scrollbar" key={i}>
                                      <td className="font-bold">
                                        {items.stage ? items.stage : '--'}
                                      </td>
                                      <td>
                                        {items.room ? (
                                          <span
                                            key={items.room}
                                            className="me-2 rounded border border-blue-300 bg-primary px-2.5 py-0.5 text-xs font-medium text-foreground dark:bg-gray-700 dark:text-blue-300"
                                          >
                                            {items.room}
                                          </span>
                                        ) : (
                                          '--'
                                        )}
                                      </td>
                                      <td>
                                        <div className="flex items-center truncate ">
                                          {items.activity
                                            ? items.activity
                                                .split(',')
                                                .map(
                                                  (
                                                    activity: any,
                                                    activityIndex: number
                                                  ) => (
                                                    <span
                                                      key={activityIndex}
                                                      className="me-2 rounded border border-blue-300 bg-primary px-2.5 py-0.5 text-xs font-medium text-foreground dark:bg-gray-700 dark:text-blue-300"
                                                    >
                                                      {activity}
                                                    </span>
                                                  )
                                                )
                                            : '--'}
                                        </div>
                                      </td>
                                      <td>
                                        <ProgressWithLabel
                                          value={Number(items.progress)}
                                        />
                                        {/* <BorderLinearProgress
                                          variant="determinate"
                                          value={Number(items.progress)}
                                          className="text-primary"
                                        /> */}
                                      </td>
                                      <td>
                                        {items.remarks ? items.remarks : '--'}
                                      </td>
                                      {/* Render additional columns dynamically */}
                                      {additionalColumns.map((key: any) => (
                                        <td key={key}>
                                          {items[key] ? items[key] : '--'}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Divider />
              </div>
            );
          })
        // : (
        //   <div className="flex h-[350px] flex-col items-center justify-center">
        //     <span className="text-xl font-semibold">Services</span>
        //     <span>No Record Found</span>
        //   </div>
        // )
      }
    </div>
  );
}

export default ProjectPlanAccordin;
