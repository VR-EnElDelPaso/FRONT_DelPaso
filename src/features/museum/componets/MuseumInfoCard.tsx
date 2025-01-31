interface MuseumInfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const MuseumInfoCard = ({
  title,
  icon,
  children,
}: MuseumInfoCardProps) => {
  return (
    <div className="flex flex-col p-4 rounded-lg border bg-card">
      <div className="rounded-full h-fit w-fit bg-primary p-3 mb-3">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};
