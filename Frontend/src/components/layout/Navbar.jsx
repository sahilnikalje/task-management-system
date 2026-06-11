import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ title, onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-700">
          <Menu size={22} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 font-medium hidden sm:block">{user?.name}</span>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 capitalize">
          {user?.role}
        </span>
      </div>
    </header>
  );
};

export default Navbar;