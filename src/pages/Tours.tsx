import { useNavigate } from "react-router-dom";
import { Search, Star, Calendar } from "lucide-react";
import { Tour } from "../types/tour";
import useFetchTours from "../hooks/useFetchTours";
import { dateFormatter } from "../utils/dateFormatter";
import { Card } from "@/components/ui/card";
import image from "../../public/PA_Obra13.jpg";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Tours = () => {
  const navigate = useNavigate();
  const tours = useFetchTours();

  return (
    <div className="container mx-auto max-w-6xl p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Filters */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="search" 
            placeholder="Buscar..." 
            className="pl-10 rounded-full"
          />
        </div>
        <div className='flex items-center gap-4'>
          <span className="text-muted-foreground">Filtrar por:</span>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="museum">Museo</SelectItem>
                <SelectItem value="art">Arte</SelectItem>
                <SelectItem value="history">Historia</SelectItem>
                <SelectItem value="science">Ciencia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tours */}
      <div className='space-y-6'>
        {tours.map((tour: Tour) => (
          <Card key={tour.id} className="overflow-hidden border-none shadow-none bg-transparent">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="w-full md:w-[200px]">
                <img 
                  src={image} // TODO: Change this to tour.image_url
                  alt={tour.name} 
                  className='w-full h-64 md:h-[200px] object-cover rounded-lg'
                />
              </div>

              {/* Content */}
              <div className='flex-1 p-6'>
                <div className="flex flex-col md:h-full md:justify-center space-y-4">
                  {/* Title */}
                  <h2 className='text-3xl font-kaiseiDecol'>{tour.name}</h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="h-6 w-6" style={{ fill: "#B33424", color: "#B33424" }} />
                    <span className="font-medium text-lg">{tour.stars}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <time className='text-sm text-muted-foreground'>
                      {dateFormatter(tour.created_at)}
                    </time>
                  </div>

                  {/* Description */}
                  <div className="flex justify-between items-end gap-4">
                    <p className='text-muted-foreground flex-1'>{tour.description}</p>
                    <Button 
                      onClick={() => navigate(`/tour/${tour.id}`)}
                      className="text-white bg-primary hover:bg-primary/90 whitespace-nowrap"
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Tours;