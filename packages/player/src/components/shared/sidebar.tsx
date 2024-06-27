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
        'fixed bg-gray-800 text-white transition-transform duration-300 delay-150 ease-in-out z-40',
        isOpen && {
            'top-0 left-0 w-64 h-full transform': position === 'left',
            'top-0 right-0 w-64 h-full transform': position === 'right',
            'top-0 left-0 w-full h-64 transform': position === 'top',
            'bottom-0 left-0 w-full h-64 transform': position === 'bottom',
        },
        !isOpen && {
            '-translate-x-full': position === 'left',
            'translate-x-full': position === 'right',
            '-translate-y-full': position === 'top',
            'translate-y-full': position === 'bottom',
        },
        ((position === 'right' || position === 'left') && !isOpen) && "translate-x-0",
        ((position === 'bottom' || position === 'top') && !isOpen) && "translate-y-0",
        className
    );

    const overlayClasses = cn(
        'fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-30',
        {
            'opacity-0 pointer-events-none': !isOpen,
            'opacity-100': isOpen,
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
    return <div className="p-4 border-b border-gray-700" {...props}>
        {close && <SidebarCloseButton />}
        {children}
    </div>;
};

export const SidebarFooter: React.FC<SidebarElementProps> = ({ children, ...props }) => {
    return <div className="p-4 border-t border-gray-700" {...props}>{children}</div>;
};

const SidebarCloseButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    const { toggle } = useSidebarContext();
    return (
        <button className="absolute top-2 right-2 text-2xl" onClick={toggle} {...props}>
            &times;
        </button>
    );
};
