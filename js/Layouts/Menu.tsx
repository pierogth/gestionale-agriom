import {
  Collapse,
  Icon,
  Nav,
  NavItem,
  NavLink,
  AvatarContainer,
  AvatarIcon,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  LinkList,
  LinkListItem,
  Button,
  Navbar,
  NavbarToggler,
} from 'design-react-kit';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import route from 'ziggy-js';
import useTypedPage from '@/Hooks/useTypedPage';

function logout(e: React.FormEvent) {
  localStorage.clear();
  e.preventDefault();
  router.post(route('logout'));
}

export function Menu() {
  const page = useTypedPage();
  const user = page.props ? page.props.auth : null;
  const [openNav, setOpenNav] = useState(false);
  const reduxMenu = useSelector((state: any) => state.menu);

  useEffect(() => {}, []);

  const toggle = () => {
    setOpenNav(!openNav);
  };
  return (
    <section>
      <Navbar expand="lg" className="fixed-top">
        <NavbarToggler className="custom-navbar-toggler" onClick={toggle}>
          <Icon className="" color="" icon="it-burger" size="" />
        </NavbarToggler>

        <Collapse isOpen={openNav} navbar>
          <Nav navbar className="mt-0 ">
            <NavItem className={'mr-2'}>
              <NavLink href={route('dashboard')}>
                <img
                  src={'/images/logo.png'}
                  height="35"
                  alt="EasySynergy logo"
                />
              </NavLink>
            </NavItem>
            <NavItem>
              {reduxMenu.selectdRole?.name_administration && (
                <NavLink href="#">
                  <div className="mr-2">
                    <AvatarContainer>
                      <AvatarIcon size="lg">
                        <img
                          src={reduxMenu.selectdRole.logo_administration}
                          alt={`Comune di ${reduxMenu.selectdRole.name_administration}`}
                        />
                      </AvatarIcon>
                    </AvatarContainer>
                  </div>
                  <div>
                    <span className="title">Comune di</span>
                    <span className="subtitle">
                      {reduxMenu.selectdRole.name_administration}
                    </span>
                  </div>
                </NavLink>
              )}
            </NavItem>
            <NavItem className={'menu-container'}>
              <Link
                href={route('dashboard')}
                className={
                  'nav-link ' +
                  (location.pathname == '/dashboard' ? ' active' : '')
                }
              >
                Dashboard
              </Link>
            </NavItem>
            {reduxMenu.status !== 'loading' && (
              <>
                {reduxMenu.menu.map(
                  (item: { id: number; title: string; to: string }) => {
                    return (
                      <NavItem key={item.id} className={'menu-container'}>
                        <Link
                          href={item.to}
                          className={
                            'nav-link ' +
                            ('/' + location.pathname.split('/')[1] == item.to
                              ? ' active'
                              : '')
                          }
                        >
                          {item.title}
                        </Link>
                      </NavItem>
                    );
                  },
                )}
                <UncontrolledDropdown nav inNavbar className={'ml-auto'}>
                  <DropdownToggle
                    nav
                    color={'dark-primary'}
                    caret
                    className={'bg-base-dark rounded menu-container'}
                  >
                    {reduxMenu.status !== 'loading' && (
                      <span>
                        {reduxMenu.selectdRole
                          ? reduxMenu.selectdRole.label
                          : ''}
                      </span>
                    )}
                    <Icon icon="it-expand" />
                  </DropdownToggle>
                  <DropdownMenu className="p-3 dropdown-menu-right">
                    <LinkList>
                      <LinkListItem header>
                        <div>
                          <span>
                            <Icon
                              icon="it-open-source"
                              size="sm"
                              className="mr-2 my-0 "
                            />
                            {user?.user?.email}
                          </span>
                        </div>
                      </LinkListItem>
                      <LinkListItem divider />

                      <LinkListItem href="/user/profile" className="py-1 px-0">
                        <Icon
                          icon="it-settings"
                          size="sm"
                          className="mr-2 my-0"
                        />

                        <strong>Cambia password</strong>
                      </LinkListItem>

                      <LinkListItem href="#" className="py-1 px-0">
                        <form>
                          <Button
                            type="submit"
                            className={'p-0 btn-link text-left'}
                            size="sm"
                            onClick={logout}
                            block
                          >
                            <Icon
                              icon="it-upload"
                              size="sm"
                              className="mr-2 my-0"
                            />
                            <strong>Logout</strong>
                          </Button>
                        </form>
                      </LinkListItem>
                    </LinkList>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </section>
  );
}
