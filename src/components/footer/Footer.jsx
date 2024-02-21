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
                py: 2,
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
                <Typography variant="body1" sx={{ display: 'flex', gap: '10px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <p >Powered by <span style={{ color: theme.palette.secondary.brand }}>NORTH STAR IMPACT SOLUTION</span>
                    </p>
                    <Copyright />

                </Typography>

            </Container>
        </Box>
    );
};

export default Footer;
