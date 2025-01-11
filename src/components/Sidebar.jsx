import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MdDashboard, MdShoppingCart, MdFavorite, MdInbox, 
  MdList, MdInventory, MdAttachMoney, MdCalendarToday,
  MdCheckBox, MdContacts, MdReceipt, MdPalette,
  MdDelete, MdTableChart, MdSettings, MdLogout 
} from 'react-icons/md';

const menuItems = [
  { name: 'Dashboard', icon: MdDashboard, path: '/' },
  { name: 'Products', icon: MdShoppingCart, path: '/products' },
  { name: 'Favourites', icon: MdFavorite, path: '/favourites' },
  { name: 'Inbox', icon: MdInbox, path: '/inbox' },
  { name: 'Order Lists', icon: MdList, path: '/orders' },
  { name: 'Product Stocks', icon: MdInventory, path: '/stocks' },
  { name: 'Pricing', icon: MdAttachMoney, path: '/pricing' },
  { name: 'Calendar', icon: MdCalendarToday, path: '/calendar' },
  { name: 'To-Do', icon: MdCheckBox, path: '/todo' },
  { name: 'Contact', icon: MdContacts, path: '/contact' },
  { name: 'Invoice', icon: MdReceipt, path: '/invoice' },
  { name: 'UI Elements', icon: MdPalette, path: '/ui-elements' },
  { name: 'Trash', icon: MdDelete, path: '/trash' },
  { name: 'Table', icon: MdTableChart, path: '/table' },
  { name: 'Settings', icon: MdSettings, path: '/settings' },
  { name: 'Logout', icon: MdLogout, path: '/logout' }
];

function Sidebar() {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;