import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginLink, logoutLink, mainLinks, userLinks } from '../data/navigationLinks';
import { AUTH_EVENTS, authUtils } from '../lib/utils';
import AnimatedLink from './ui/animation/animatedLink';
import Clock from './ui/clock';
import Menu from './ui/Menu';

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authUtils.isAuthenticated());
    };
    
    // Check initially
    checkAuth();
    
    // Setup event listeners
    const handleLogin = () => checkAuth();
    const handleLogout = () => checkAuth();
    
    window.addEventListener(AUTH_EVENTS.LOGIN, handleLogin);
    window.addEventListener(AUTH_EVENTS.LOGOUT, handleLogout);
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener(AUTH_EVENTS.LOGIN, handleLogin);
      window.removeEventListener(AUTH_EVENTS.LOGOUT, handleLogout);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Navigate to logout page to show transition animation
    navigate('/logout');
  };

  return (
    <>
      <Menu/>
      <header className="w-full h-full pt-6 pb-4 bg-white z-10">
        <div className="border-b-2 border-black mx-8">
          <div className="px-2 md:px-4 py-4 items-stretch justify-items-stretch">
            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-6 md:gap-[100px] text-md">
              {/* First Column */}
              <div className="space-y-1">
                <p className="text-muted font-medium">App</p>
                <AnimatedLink className="font-bold" href="/">FINANCE TRACKER</AnimatedLink>
                <p className="text-muted"><Clock /></p>
              </div>

              {/* Second Column */}
              <div className="space-y-1">
                <p className="text-muted font-medium">Status</p>
                <p className="uppercase font-semibold">New generated paycheck Currently available for viewing</p>
              </div>

              {/* Desktop Navigation - Hidden on Mobile */}
              <div className="hidden lg:block space-y-1">
                <p className="text-muted font-medium">Sitemap</p>
                <div className="flex flex-wrap gap-2">
                  {mainLinks.map((link, index) => (
                    <Fragment key={link.href}>
                      <AnimatedLink href={link.href}>{link.title}</AnimatedLink>
                      {index < mainLinks.length - 1 && <span>,</span>}
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* Desktop User Links - Hidden on Mobile */}
              <div className="hidden lg:block space-y-1">
                <p className="text-muted font-medium">User</p>
                <div className="flex flex-wrap gap-2">
                  {/* Conditional login/logout link */}
                  {isAuthenticated ? (
                    <Fragment key="logout">
                      <AnimatedLink href="#" onClick={handleLogout}>
                        {logoutLink.title}
                      </AnimatedLink>
                      <span>,</span>
                    </Fragment>
                  ) : (
                    <Fragment key="login">
                      <AnimatedLink href={loginLink.href}>
                        {loginLink.title}
                      </AnimatedLink>
                      <span>,</span>
                    </Fragment>
                  )}
                  
                  {/* Other user links */}
                  {userLinks.map((link, index) => (
                    <Fragment key={link.href}>
                      <AnimatedLink href={link.href}>{link.title}</AnimatedLink>
                      {index < userLinks.length - 1 && <span>,</span>}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
