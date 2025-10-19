import React from "react";

type FooterProps = {
    companyName?: string;
    address?: {
        line1?: string;
        city?: string;
        phone?: string;
        email?: string;
    };
};

const Footer: React.FC<FooterProps> = ({
    companyName = "FastBite",
    address = {
        line1: "9201 University City Blvd",
        city: "Charlotte, NC 28223",
        phone: "(555) 123-4567",
        email: "hello@fastbite.com",
    },
}) => {
    const year = new Date().getFullYear();

    const linkStyle: React.CSSProperties = {
        color: "inherit",
        textDecoration: "none",
    };

    const containerStyle: React.CSSProperties = {
        background: "linear-gradient(180deg, #252525, #1b1b1b)",
        color: "#fff",
        padding: "2rem 1.25rem",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    };

    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1.25rem",
        maxWidth: 1100,
        margin: "0 auto",
        alignItems: "start",
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        marginBottom: "0.5rem",
        fontSize: "0.95rem",
    };

    const smallStyle: React.CSSProperties = {
        fontSize: "0.9rem",
        lineHeight: 1.6,
        color: "#ddd",
    };


    return (
        <footer role="contentinfo" aria-label={`${companyName} footer`} style={containerStyle}>
            <div style={gridStyle}>
                <div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{companyName}</div>
                    <p style={smallStyle}>
                        Craving satisfaction at 2 AM? We've got you covered. 
                        Gourmet burgers, crispy fries, and cheesy pizza served hot until the early hours. Your late-night hunger solution.
                    </p>
                </div>

                <div>
                    <div style={sectionTitleStyle}>Hours</div>
                    <div style={smallStyle}>
                        <div>Mon-Fri: 11:00 AM — 4:00 AM</div>
                        <div>Sat-Sun: 12:00 AM — 4:00 AM</div>
                    </div>
                </div>

                <div>
                    <div style={sectionTitleStyle}>Location</div>
                    <address style={smallStyle}>
                        <div>{address.line1}</div>
                        <div>{address.city}</div>
                        <div style={{ marginTop: 8 }}>
                            {address.phone && (
                                <div>
                                    Phone: <a style={linkStyle} href={`tel:${address.phone.replace(/[^\d+]/g, "")}`}>{address.phone}</a>
                                </div>
                            )}
                            {address.email && (
                                <div>
                                    Email: <a style={linkStyle} href={`mailto:${address.email}`}>{address.email}</a>
                                </div>
                            )}
                        </div>
                    </address>
                </div>

                <nav aria-label="Footer navigation">
                    <div style={sectionTitleStyle}>Explore</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, ...smallStyle }}>
                        <li><a style={linkStyle} href="/menu">Menu</a></li>
                        <li><a style={linkStyle} href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1.25rem", paddingTop: "1rem", textAlign: "center", color: "#bbb", fontSize: "0.9rem" }}>
                <div>
                    &copy; {year} {companyName}. All rights reserved.
                </div>
                <div style={{ marginTop: 6 }}>
                    <a style={{ ...linkStyle, marginRight: 12 }} href="/privacy">Privacy</a>
                    <a style={linkStyle} href="/terms">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;