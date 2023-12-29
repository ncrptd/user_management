import './Footer.css'
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Powered by NIS</p>
                <p>&copy; {currentYear} </p>
            </div>
        </footer>
    );
};

export default Footer;
