import { useState } from "react";
import { Tag } from "@/types/tag";
import { FaTags } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface TagsCellProps {
  tags: Tag[];
}

export const TagsCell = ({ tags }: TagsCellProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        <FaTags className="text-blue-500 mr-2" />
        {tags.length} tags
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tags del Tour</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 p-4">
            {tags.map((tag) => (
              <Badge key={tag.id} className="text-md text-white">
                {tag.name}
              </Badge>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
