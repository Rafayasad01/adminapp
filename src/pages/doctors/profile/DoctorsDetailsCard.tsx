interface DoctorsDetailsCardProps {
  label?: string;
  value?: string;
}
const DoctorsDetailsCard: React.FC<DoctorsDetailsCardProps> = ({
  label,
  value,
}) => {
  return (
    <div className="mt-5">
      <p className="text-sm text-primary">{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default DoctorsDetailsCard;
