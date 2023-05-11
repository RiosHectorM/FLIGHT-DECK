import React from 'react';

interface MainProps {
  children?: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="w-full max-w-4xl flex-grow p-4">
      {children}
    </main>
  );
};

export default Main;
