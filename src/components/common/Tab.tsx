import React, { ReactNode, useState } from 'react';

export interface Tab {
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  children: ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    if (!tabs[index].disabled) {
      setSelectedTab(index);
    }
  };

  return (
    <>
      <div className="border-b border-[#E1E1E1] text-center text-sm font-medium text-gray-500 ">
        <ul className="-mb-px flex flex-wrap">
          {tabs.map((tab, index) => (
            <li key={index} className="me-2 relative">
              <button
                className={`relative flex flex-col items-center rounded-t-lg border-b-2 text-lg ${
                  selectedTab === index
                    ? 'alder-tab-btn  text-black '
                    : 'border-transparent'
                } p-4 py-2 ${
                  tab.disabled
                    ? 'cursor-not-allowed text-[#A9A9A9] dark:text-[#A9A9A9]'
                    : ' hover:text-primary '
                }`}
                onClick={() => handleTabClick(index)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {React.Children.map(children, (child, index) =>
          index === selectedTab ? <div className="py-5">{child}</div> : null
        )}
      </div>
    </>
  );
};

export default Tabs;
