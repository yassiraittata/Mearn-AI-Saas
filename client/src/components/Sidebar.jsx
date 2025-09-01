import { useClerk, useUser } from "@clerk/clerk-react";

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
        <img src={user.imageUrl} alt="Logo" />
        <h1 className="mt-1 text-center">{user.fullName}</h1>
      </div>
    </div>
  );
};

export default Sidebar;
