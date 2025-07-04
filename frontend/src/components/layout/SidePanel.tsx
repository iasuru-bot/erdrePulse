import React from 'react';

interface SidePanelProps {
  title: string;
  description: string;
  illustration?: string;
  children?: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({
  title,
  description,
  illustration = '/images/logo_short_b.png',
  children
}) => {
  return (
    <div className="hidden md:flex fixed left-0 top-0 w-1/2 h-screen bg-primary text-white p-8 flex-col justify-center items-center z-50">
      <div className="max-w-md text-center animate-fadeIn">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-lg mb-8">{description}</p>
        {illustration && (
          <img 
            src={illustration} 
            alt="Illustration" 
            className="max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300" 
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default SidePanel; 