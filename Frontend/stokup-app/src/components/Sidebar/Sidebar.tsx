
import { NavLink } from 'react-router-dom';

import { UserCard } from '../UserCard/UserCard';

import { LayoutDashboard, Store, Package, Milk } from 'lucide-react';

export function Sidebar(){
    return (
        <aside className="flex flex-col h-screen w-[280px] bg-white shadow-lg shadow-gray-300">
  <div className="flex flex-col p-4 flex-1">

    <h1 className="font-extrabold text-3xl tracking-wide px-2 mt-4 text-blue-700">
      Stokup
    </h1>
    <p className="text-sm text-gray-500 px-2 mt-1">
      Controle de estoque de produtos
    </p>


    <nav className="flex flex-col flex-1 mt-8">
      <ul className="space-y-3 text-gray-700 text-base">
   
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 font-semibold px-3 py-2 rounded-lg transition-colors
            ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-700"}`
          }
        >
          <LayoutDashboard className="text-blue-500" /> Dashboard
        </NavLink>


        <NavLink
          to="/stores"
          className={({ isActive }) =>
            `flex items-center gap-3 font-semibold px-3 py-2 rounded-lg transition-colors
            ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-700"}`
          }
        >
          <Store className="text-blue-500" /> Lojas
        </NavLink>


        <NavLink
          to="/stock"
          className={({ isActive }) =>
            `flex items-center gap-3 font-semibold px-3 py-2 rounded-lg transition-colors
            ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-700"}`
          }
        >
          <Package className="text-blue-500" /> Estoque
        </NavLink>


        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-3 font-semibold px-3 py-2 rounded-lg transition-colors
            ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-700"}`
          }
        >
          <Milk className="text-blue-500" /> Produtos
        </NavLink>

      </ul>


      <div className="mt-auto border-t-2 border-gray-300 pt-4">
        <UserCard />
      </div>
    </nav>
  </div>
</aside>
    )
};