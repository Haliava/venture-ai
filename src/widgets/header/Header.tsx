import { TABS } from "@/shared/constants/general";
import { useCurrentDevice } from "@/shared/hooks/useCurrentDevice";
import { useTabs } from "@/shared/hooks/useTabs";
import { useUserStore } from "@/shared/store/user";
import { Device } from "@/shared/types/general";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  const { device: currentDevice } = useCurrentDevice();
  const { tabs, activeTab, updateActiveTab } = useTabs();
  const { user } = useUserStore();

  const handleSelectTab = (value: string) => {
    updateActiveTab(value);
    navigate(value);
  }

  return (
    <div className="sticky top-0 z-50 flex justify-between items-end bg-header mb-2 py-1 pt-2 px-5 md:py-3 md:px-20 md:gap-20 lg:px-10 md:items-center xl:mb-10">
      <div className="flex grow max-w-[50%] flex-row gap-3 items-center">
        <Icon type="briefcase" className="w-auto xs:h-9 sm:h-9 md:h-14 lg:h-8" />
        <Icon type="title" className="w-auto xs:h-5 sm:h-5 md:h-9 lg:h-5" />
      </div>
      {currentDevice === Device.WEB && (
        <Tabs className="flex w-full" defaultValue={activeTab.href} onValueChange={handleSelectTab}>
          <TabsList className="flex w-full justify-between bg-header">
            {tabs.map(tab => (
              <TabsTrigger className="text-white active:text-white border-none h-max p-[7px]" key={tab.text} value={tab.href}>
                <p className="text-white text-ai-md">{tab.text}</p>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {currentDevice !== Device.WEB && (
        <Popover>
          <PopoverTrigger asChild className="flex align-middle text-ai-lg">
            <Button variant="ghost">
              <p className="font-normal text-ai-lg">Профиль</p>
              <Icon type="person" className="size-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="absolute -left-50 flex flex-col gap-5">
            <div className="flex flex-col items-center gap-3">
              {user?.avatar && <img className="size-[35%]" src={user?.avatar} />}
              {!user?.avatar && <Icon className="size-[35%]" type="avatar" />}
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold text-ai-regular">{user.name}</p>
                <p className="text-ai-regular">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {tabs.map(tab => (
                <Button className="bg-white shadow-none text-check hover:text-black active:text-black" key={tab.text} onClick={() => navigate(tab.href)}>
                  <p className="text-ai-regular">{tab.text}</p>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
};
