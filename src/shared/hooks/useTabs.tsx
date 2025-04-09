import { useState } from "react"
import { TABS } from "../constants/general";

export const useTabs = () => {
  // @ts-ignore
  const [tabs, setTabs] = useState(TABS);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const updateActiveTab = (newTabHref: string) => {
    const newTab = tabs.find(({ href }) => href === newTabHref);
    if (newTab) {
      setActiveTab(newTab)
    }
  }

  return { tabs, activeTab, updateActiveTab };
}