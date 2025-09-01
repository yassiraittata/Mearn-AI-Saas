import { useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/ai",
    Label: "Dashboard",
    Icon: House,
  },
  {
    to: "/ai/write-article",
    Label: "Write Article",
    Icon: SquarePen,
  },
  {
    to: "/ai/blog-titles",
    Label: "Blog Titles",
    Icon: Hash,
  },
  {
    to: "/ai/generate-images",
    Label: "Generate Images",
    Icon: Image,
  },
  {
    to: "/ai/remove-background",
    Label: "Remove Background",
    Icon: Eraser,
  },
  {
    to: "/ai/remove-object",
    Label: "Remove Object",
    Icon: Scissors,
  },
  {
    to: "/ai/review-resume",
    Label: "Review Resume",
    Icon: FileText,
  },
  {
    to: "/ai/community",
    Label: "Community",
    Icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 p-4">
        <img
          src={user.imageUrl}
          alt="Logo"
          className="w-14 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center">{user.fullName}</h1>
        <div className="px-4 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ Icon, Label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />{" "}
                  {Label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
