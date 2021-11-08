import { useState } from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet'
import './App.css';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const SliderDatetime = styled(Slider)<SliderProps>(({ theme }) => ({
  width: 300,
  // color: theme.palette.success.main,
  // '& .MuiSlider-thumb': {
  //   '&:hover, &.Mui-focusVisible': {
  //     boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
  //   },
  //   '&.Mui-active': {
  //     boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
  //   },
  // },
}));

const marks = [
  {
    value: 10,
    label: '1時間前',
  },
  {
    value: 20,
    label: '現在',
  },
  {
    value: 30,
    label: '1時間後',
  },
  {
    value: 40,
    label: '2',
  },
  {
    value: 50,
    label: '3',
  },
];

const blueOptions = { color: 'blue' };
const greenOptions = { color: 'green' };
const redOptions = { color: 'red' };

const App = () =>  {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [visibleMesh, setVisibleMesh] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleMesh(event.target.checked);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            v2-mock
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <div style={{padding: '5px 30px'}}>
          <SliderDatetime
            defaultValue={20}
            step={10}
            marks={marks}
            min={10}
            max={50}
          />
        </div>
        <div style={{height: '600px'}}>
          <MapContainer center={[35.6809591, 139.7673068]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[35.6809591, 139.7673068]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            {visibleMesh ? (
              <>
                <Rectangle bounds={[[35.65, 139.70], [35.68, 139.74]]} pathOptions={blueOptions} />
                <Rectangle bounds={[[35.65, 139.74], [35.68, 139.78]]} pathOptions={greenOptions} />
                <Rectangle bounds={[[35.65, 139.78], [35.68, 139.82]]} pathOptions={greenOptions} />
                <Rectangle bounds={[[35.68, 139.70], [35.71, 139.74]]} pathOptions={blueOptions} />
                <Rectangle bounds={[[35.68, 139.74], [35.71, 139.78]]} pathOptions={redOptions} />
                <Rectangle bounds={[[35.68, 139.78], [35.71, 139.82]]} pathOptions={blueOptions} />
                <Rectangle bounds={[[35.71, 139.70], [35.74, 139.74]]} pathOptions={blueOptions} />
                <Rectangle bounds={[[35.71, 139.74], [35.74, 139.78]]} pathOptions={greenOptions} />
                <Rectangle bounds={[[35.71, 139.78], [35.74, 139.82]]} pathOptions={blueOptions} />
              </>
              ) : (<></>)
            }
            
          </MapContainer>
        </div>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <FormGroup>
              <FormControlLabel control={
                <Switch
                  checked={visibleMesh}
                  onChange={handleChange}
                />
              }
              label="メッシュ表示"
              />
            </FormGroup>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default App;
