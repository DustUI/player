import React, { ReactNode, createContext, useContext, useState } from 'react';
import { cn } from '../../utils';

interface SidebarContextProps {
    isOpen: boolean;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within a SidebarProvider');
    }
    return context;
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    position: 'left' | 'right' | 'top' | 'bottom';
    children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ position, children, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };


    const sidebarClasses = cn(
        'dp-fixed dp-bg-gray-800 dp-text-white dp-transition-transform dp-duration-300 dp-delay-150 dp-ease-in-out dp-z-40',
        isOpen && {
            'dp-top-0 dp-left-0 dp-w-64 dp-h-full dp-transform': position === 'left',
            'dp-top-0 dp-right-0 dp-w-64 dp-h-full dp-transform': position === 'right',
            'dp-top-0 dp-left-0 dp-w-full dp-h-64 dp-transform': position === 'top',
            'dp-bottom-0 dp-left-0 dp-w-full dp-h-64 dp-transform': position === 'bottom',
        },
        !isOpen && {
            '-dp-translate-x-full': position === 'left',
            'dp-translate-x-full': position === 'right',
            '-dp-translate-y-full': position === 'top',
            'dp-translate-y-full': position === 'bottom',
        },
        ((position === 'right' || position === 'left') && !isOpen) && "dp-translate-x-0",
        ((position === 'bottom' || position === 'top') && !isOpen) && "dp-translate-y-0",
        className
    );

    const overlayClasses = cn(
        'dp-fixed dp-inset-0 dp-bg-black dp-bg-opacity-50 dp-transition-opacity dp-duration-300 dp-ease-in-out dp-z-30',
        {
            'dp-opacity-0 dp-pointer-events-none': !isOpen,
            'dp-opacity-100': isOpen,
        }
    );

    return (
        <SidebarContext.Provider value={{ isOpen, toggle }}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) && child.type === SidebarTrigger ? child : null
            )}
            <div className={sidebarClasses} {...props}>
                {isOpen && (
                    <>

                        {React.Children.map(children, (child) =>
                            React.isValidElement(child) && child.type !== SidebarTrigger ? child : null
                        )}
                    </>
                )}
            </div>
            <div className={overlayClasses} onClick={toggle}></div>
        </SidebarContext.Provider>
    );
};

interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    children: ReactNode;
}
export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({ asChild, children, ...props }) => {
    const { toggle } = useSidebarContext();
    return asChild ? (
        React.cloneElement(children as React.ReactElement, { onClick: toggle })
    ) : (
        <button onClick={toggle} {...props}>{children}</button>
    );
};

export const SidebarContent: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

interface SidebarElementProps extends React.HTMLAttributes<HTMLDivElement> {
    close?: boolean;
    children: ReactNode;
}
export const SidebarHeader: React.FC<SidebarElementProps> = ({ children, close = true, ...props }) => {
    return <div className="dp-p-4 dp-border-b dp-border-gray-700" {...props}>
        {close && <SidebarCloseButton />}
        {children}
    </div>;
};

export const SidebarFooter: React.FC<SidebarElementProps> = ({ children, ...props }) => {
    return <div className="dp-p-4 dp-border-t dp-border-gray-700" {...props}>{children}</div>;
};

const SidebarCloseButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    const { toggle } = useSidebarContext();
    return (
        <button className="dp-absolute dp-top-2 dp-right-2 dp-text-2xl" onClick={toggle} {...props}>
            &times;
        </button>
    );
};
