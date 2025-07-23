// components/UserDropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogInIcon } from "lucide-react";


export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src="https://res.cloudinary.com/dk5mfu099/image/upload/v1748939948/download_3_gxfldw.jpg"
            alt="User"
          />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2 ">
        <DropdownMenuItem disabled className="opacity-70">
          <LogInIcon />
          Login (Coming Soon)
        </DropdownMenuItem>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
