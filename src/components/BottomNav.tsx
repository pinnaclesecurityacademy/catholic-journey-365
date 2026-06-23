import { NavLink } from 'react-router-dom';

function HouseIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#7C5C3E' : '#A8A29E'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#7C5C3E' : '#A8A29E'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
      <path d="M4 4.5A2.5 2.5 0 0 0 6.5 7H20" />
    </svg>
  );
}

function BibleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#7C5C3E' : '#A8A29E'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v15H6a1 1 0 0 0-1 1z" />
      <path d="M5 19a1 1 0 0 0 1 1h12" />
      <path d="M12 6v6" />
      <path d="M9.5 8.5h5" />
    </svg>
  );
}

function FaithIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#7C5C3E' : '#A8A29E'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18" />
      <path d="M7 8h10" />
    </svg>
  );
}

function PersonIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#7C5C3E' : '#A8A29E'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  );
}

export default function BottomNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 flex-1 pb-3 pt-3 text-xs font-medium ${
      isActive ? 'text-leather-600' : 'text-stone-400'
    }`;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20">
      <div className="max-w-md mx-auto flex border-x border-t border-parchment-200 bg-parchment-100 pb-[env(safe-area-inset-bottom)]">
        <NavLink to="/" className={linkClass} end>
          {({ isActive }) => (
            <>
              <HouseIcon active={isActive} />
              <span>Today</span>
            </>
          )}
        </NavLink>
        <NavLink to="/journey" className={linkClass}>
          {({ isActive }) => (
            <>
              <BookIcon active={isActive} />
              <span>Journey</span>
            </>
          )}
        </NavLink>
        <NavLink to="/bible" className={linkClass}>
          {({ isActive }) => (
            <>
              <BibleIcon active={isActive} />
              <span>Bible</span>
            </>
          )}
        </NavLink>
        <NavLink to="/faith" className={linkClass}>
          {({ isActive }) => (
            <>
              <FaithIcon active={isActive} />
              <span>Faith</span>
            </>
          )}
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          {({ isActive }) => (
            <>
              <PersonIcon active={isActive} />
              <span>Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
