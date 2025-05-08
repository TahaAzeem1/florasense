import React from 'react';
import { Tab } from '@headlessui/react';
import { Info, Droplet, Sprout, Flower } from 'lucide-react';
import Overview from './tabs/Overview';
import Care from './tabs/Care';
import Growth from './tabs/Growth';
import Features from './tabs/Features';
import { motion, AnimatePresence } from 'framer-motion';

const TabContent = ({ plant, activeTab, setActiveTab }) => {
  const tabCategories = [
    { name: "Overview", icon: Info },
    { name: "Care", icon: Droplet },
    { name: "Growth", icon: Sprout },
    { name: "Features", icon: Flower },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
        <div className="overflow-x-auto no-scrollbar">
          <Tab.List className="flex bg-gray-50 border-b border-gray-200 min-w-max">
            {tabCategories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  `py-4 px-6 text-sm font-medium leading-5 text-gray-700
                  focus:outline-none transition-colors duration-200 whitespace-nowrap
                  ${
                    selected
                      ? "text-primary-700 border-b-2 border-primary-500"
                      : "hover:text-primary-600 hover:border-b-2 hover:border-primary-300"
                  }`
                }
              >
                <div className="flex items-center justify-center">
                  <category.icon className="w-5 h-5 mr-2" />
                  {category.name}
                </div>
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="p-6">
          <Tab.Panel>
            <Overview plant={plant} />
          </Tab.Panel>
          <Tab.Panel>
            <Care plant={plant} />
          </Tab.Panel>
          <Tab.Panel>
            <Growth plant={plant} />
          </Tab.Panel>
          <Tab.Panel>
            <Features plant={plant} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabContent;