import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "CSV Upload", href: "/fileUpload", icon: FolderIcon },
  { name: "Analytics", href: "/", icon: UsersIcon },
  { name: "Help", href: "/help", icon: InformationCircleIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 p-4 bg-white dark:bg-gray-900">
        <button type="button" onClick={() => setSidebarOpen(true)}>
          <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 w-full max-w-xs bg-white dark:bg-gray-800 p-4 transition-transform transform duration-300 ease-in-out">
            <TransitionChild>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="absolute right-4 top-4 p-2"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </TransitionChild>
            <nav>
              <ul className="space-y-4">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          isCurrent
                            ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
                          "flex items-center gap-3 rounded-md p-2 text-sm font-medium"
                        )}
                      >
                        <item.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden h-full lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <img
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            className="h-8"
          />
        </div>

        <nav className="flex flex-1 flex-col p-4">
          <ul className="space-y-4">
            {navigation.map((item) => {
              const isCurrent =
                item.name === "Dashboard" || location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      isCurrent
                        ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
                      "flex items-center gap-3 rounded-md p-2 text-sm font-medium"
                    )}
                  >
                    <item.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
