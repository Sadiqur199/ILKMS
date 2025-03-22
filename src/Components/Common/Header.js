import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Header.css';

const Header = () => {
    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar className='toogle_position'>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="black"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <div className='Bangladesh_logo_div'>
                        <img src='/images/Bangladesh_Logo.png' className='Bangladesh_logo' />
                    </div>
                    <div className='ilkms_title_div'>
                        <p className='ilkms_title_p'><b>Intelligent Land Knowledge Management System</b></p>
                    </div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button >Sign Up</Button>
                    <Button >Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
        </div>
    )
}

export default Header
