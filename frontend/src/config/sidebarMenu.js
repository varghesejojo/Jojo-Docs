import {
  FileText,
  Clock3,
  Star,
  Folder,
  Trash2,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "My Documents",
    icon: FileText,
    path: "/dashboard",
  },
  {
    title: "Recent",
    icon: Clock3,
    path: "/recent",
  },
  {
    title: "Starred",
    icon: Star,
    path: "/starred",
  },
  {
    title: "Folders",
    icon: Folder,
    path: "/folders",
  },
  {
    title: "Trash",
    icon: Trash2,
    path: "/trash",
  },
];