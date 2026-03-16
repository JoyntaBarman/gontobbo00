
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NavMenu } from "./NavManu";


export const NavigationSheet = () => {
  return (
    <Sheet>
 {/* <SheetTitle>Edit profile</SheetTitle> */}

      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Logo />
        <NavMenu className="mt-6 [&>div]:h-full" orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
};
