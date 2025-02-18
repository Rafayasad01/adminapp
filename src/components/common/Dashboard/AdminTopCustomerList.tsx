import dayjs from 'dayjs';
import CustomText from '../CustomText';

const AdminTopCustomerList = ({ data }: any) => {
  return (
    <div className="h-[200px] overflow-auto 2xl:h-[350px]">
      <table className="toplisttable">
        <thead className="rounded-[50px] bg-[#FFF3ED]">
          <tr className="">
            <th className="text-[12px] font-bold text-[#FF4F00]">S.no</th>
            <th className="text-[12px] font-bold text-[#FF4F00]">
              Project Name
            </th>
            <th className="text-[12px] font-bold text-[#FF4F00]">Start Date</th>
            <th className="text-[12px] font-bold text-[#FF4F00]">End Date</th>
            <th className="text-[12px] font-bold text-[#FF4F00]">Status</th>
            <th className="text-[12px] font-bold text-[#FF4F00]">Phase</th>
            <th className="text-[12px] font-bold text-[#FF4F00]">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {data?.length
            ? data?.map((x: any, index: number) => {
                const sno = index + 1;
                return (
                  <tr key={index} className="border-b-2 bg-transparent">
                    <td className="font-bold capitalize text-primary">{sno}</td>
                    <td className="font-bold capitalize text-primary">
                      {x.name}
                    </td>
                    <td>{dayjs(x.startDate).format('MMM D, YYYY')}</td>
                    <td>{dayjs(x.endDate).format('MMM D, YYYY')}</td>
                    <td className="flex items-center">
                      <span className="rounded-xl bg-[#04D6430D] px-2 py-1 text-[12px] text-[#04D643]">
                        {dayjs().to(x.endDate, true)} left
                      </span>
                    </td>
                    <td>{x.phase}</td>
                    <td className="cursor-pointer font-bold">View</td>
                  </tr>
                );
              })
            : ''}
        </tbody>
      </table>
      {data?.length < 1 ? (
        <CustomText bg="bg-[#FFF3ED]" text="No Records Found" />
      ) : null}
    </div>
  );
};

export default AdminTopCustomerList;
