interface DashboardCardProps {
  title: string;
  icon: string;
  value: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  value,
  icon,
  title,
}) => {
  return (
    <div className="alder-dashboard-card">
      <h3 className="text-sm text-[#676767]">{title}</h3>
      <div className="alder-dashboard-card-counting mt-5 flex">
        <div className="w-4/5 text-[21px] font-semibold">{value}</div>
        <div className="w-1/5">
          <img src={icon} alt="" className="h-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
