import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { alpha } from '@mui/material/styles';
import { Box, Stack, Drawer, Avatar, Typography, ListItemButton } from '@mui/material';

import { appRoutes } from 'src/routes/config';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';

const Nav = ({ openNav, onCloseNav }) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar
        alt={userInfo.name}
        sx={{
          width: 36,
          height: 36,
          color: (theme) => alpha(theme.palette.primary.main),
          border: (theme) => `solid 2px ${theme.palette.background.paper}`,
        }}
      >
        {userInfo?.name.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{userInfo.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {userInfo.email}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {appRoutes.map((item) => (
        <NavItem key={item.title} item={item} active={item.path === pathname} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

const NavItem = ({ item, active }) => (
  <ListItemButton
    component={RouterLink}
    href={item.path}
    sx={{
      minHeight: 44,
      borderRadius: 0.75,
      typography: 'body2',
      textTransform: 'capitalize',
      fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
      color: active ? 'primary.main' : 'text.secondary',
      backgroundColor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
      '&:hover': {
        backgroundColor: active ? (theme) => alpha(theme.palette.primary.main, 0.2) : 'transparent',
      },
    }}
  >
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        mr: 2,
      }}
    >
      {item.icon}
    </Box>
    <Box component="span">{item.title}</Box>
  </ListItemButton>
);

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
};

export default Nav;
