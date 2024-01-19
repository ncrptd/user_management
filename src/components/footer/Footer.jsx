import './Footer.css'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
// import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
function Copyright() {
    return (
        <Typography variant="body2" color="white">
            {'Copyright © '}
            {/* <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '} */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const Footer = () => {

    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.primary.brand,
                color: 'white'

            }}
        >
            <Container maxWidth="sm" sx={{
                textAlign: 'center'
            }}>
                <Typography variant="body1">
                    <p >Powered by <span style={{ color: theme.palette.secondary.brand }}>NIS</span></p>
                </Typography>

                <Copyright />
            </Container>
        </Box>
    );
};

export default Footer;
