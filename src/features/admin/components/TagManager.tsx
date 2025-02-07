import { useState, useEffect, useCallback } from "react";
import { Tag } from "@/types/tag";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllTags } from "@/services/Tags";
import { useToast } from "@/hooks/use-toast";

interface TagManagerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTags: Tag[];
  onSave: (tags: Tag[]) => void;
}

export const TagManager = ({
  isOpen,
  onClose,
  selectedTags,
  onSave,
}: TagManagerProps) => {
  const { toast } = useToast();
  const [selected, setSelected] = useState<Tag[]>(selectedTags);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  const fetchTags = useCallback(async () => {
    try {
      const tags = await getAllTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las etiquetas",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  // Filtrar las etiquetas disponibles excluyendo las seleccionadas
  const unselectedTags = availableTags.filter(
    (tag) => !selected.some((selectedTag) => selectedTag.id === tag.id)
  );

  const handleToggleTag = (tag: Tag) => {
    const isSelected = selected.some((t) => t.id === tag.id);
    if (isSelected) {
      setSelected(selected.filter((t) => t.id !== tag.id));
    } else {
      setSelected([...selected, tag]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Gestionar Etiquetas</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Tags Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Etiquetas seleccionadas</h3>
            <div className="min-h-[100px] p-4 border rounded-lg bg-gray-50">
              <AnimatePresence>
                <div className="flex flex-wrap gap-2">
                  {selected.map((tag) => (
                    <motion.div
                      key={tag.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      layout
                    >
                      <Badge
                        variant="default"
                        className="px-3 py-1 text-md bg-primary text-primary-foreground group"
                      >
                        {tag.name}
                        <button
                          onClick={() => handleToggleTag(tag)}
                          className="ml-2 opacity-60 hover:opacity-100 transition-opacity group-hover:text-red-300"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* Available Tags Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Todas las etiquetas</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex flex-wrap gap-2">
                {unselectedTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="cursor-pointer px-3 py-1 text-md hover:bg-primary/10 border-primary text-primary transition-colors"
                    onClick={() => handleToggleTag(tag)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(selected)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
