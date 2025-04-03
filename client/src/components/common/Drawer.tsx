import React, { ReactNode } from "react";
import cn from "classnames";

interface DrawerProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  title: string;
  onClose: Function | any;
  headitems: ReactNode[];
  sectionLoading: boolean;
  scroll: boolean;
  className: string;
}

const Drawer = ({
  isOpen,
  title,
  children,
  onClose,
  headitems,
  sectionLoading = false,
  scroll = true,
  className,
}: DrawerProps) => {
  const classname = cn(
    "fixed right-0 top-0 bg-white h-screen w-full max-w-[920px] xs:max-w-full lg:max-w-[920px] z-[1000] transition-all duration-300",
    className,
    { ["overflow-hidden"]: !scroll },
    { ["overflow-auto"]: scroll }
  );
  return isOpen ? (
    <React.Fragment>
      <div
        className={`fixed inset-0 bg-black/50 block z-[1000] transition-all duration-300 h-screen`}
        onClick={onClose}
      />
      <div className={classname}>
        {
          <>
            {title || headitems ? (
              <div className="bg-[#0F111A] sticky top-0 flex items-center justify-between gap-4 bg-lightBlack font-hauora h-16 px-3 z-40 xs:block xs:py-5 xs:h-auto sm:flex sm:py-0 sm:h-16">
                {title && (
                  <h2 className="text-white text-2xl uppercase xs:mb-5 sm:mb-0">
                    {title}
                  </h2>
                )}
                {headitems && (
                  <div className="flex items-center gap-3">{headitems}</div>
                )}
              </div>
            ) : null}
            {!sectionLoading ? (
              <div className="relative p-8 xs:p-4 lg:p-8 h-[calc(100%-64px)] overflow-y-auto custom-scroll-bar">
                {children}
              </div>
            ) : (
              <div className="h-[calc(100vh-70px)] w-full flex justify-center items-center">
                Loading...
              </div>
            )}
          </>
        }
      </div>
    </React.Fragment>
  ) : null;
};

export default Drawer;
