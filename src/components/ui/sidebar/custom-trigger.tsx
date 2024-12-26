import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SidebarCustomTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {open ? <PanelRightClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
    </Button>
  );
}