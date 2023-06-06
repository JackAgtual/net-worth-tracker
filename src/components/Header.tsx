import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Net Worth Tracker
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
