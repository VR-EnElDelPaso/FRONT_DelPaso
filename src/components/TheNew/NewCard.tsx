export interface NewCardProps {
  imagePath: string;
  title: string;
  description: string;
}

export default function NewCard({ title, description, imagePath }: NewCardProps) {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-5 gap-3">
      {/* imagen */}
      <div className="aspect-square sm:w-1/5 sm:min-w-[100px] sm:max-h-[100px] w-full ">
        <img
          src={imagePath}
          alt="imagen del pasillo del museo Fernando del paso"
          className="w-full h-full object-cover"
        />
      </div>
      {/* fin de imagen */}

      {/* texto */}
      <div className=" flex flex-col justify-center">
        <h4 className="text-lg">{title}</h4>
        <p className="tracking-[1.4px] font-semibold font-inter">{description}</p>
      </div>
      {/* fin de texto */}
    </div>
  )
}
