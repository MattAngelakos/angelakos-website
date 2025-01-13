import React from 'react';

interface NavBarProps {
  setPage: (page: 'about' | 'repos') => void;
}

const NavBar: React.FC<NavBarProps> = ({ setPage }) => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 text-white flex items-center justify-end space-x-4 font-web">
      <button
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded border-none focus:outline-none"
        onClick={() => setPage('about')}
      >
        About Me
      </button>
      <button
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded border-none focus:outline-none"
        onClick={() => setPage('repos')}
      >
        Projects
      </button>
    </div>
  );
};

export default NavBar;
