import './Footer.css'
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Powered by <spa className="nis-brand">NIS</spa></p>
                <p>&copy; {currentYear} </p>
            </div>
        </footer>
    );
};

export default Footer;
