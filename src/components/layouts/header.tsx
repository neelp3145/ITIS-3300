import React from 'react';

type NavLink = { label: string; href: string };

interface HeaderProps {
    title?: string;
    className?: string;
}

const headerStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#fff',
    padding: '0.75rem 1rem',
    boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
};

const containerStyle: React.CSSProperties = {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
};

const navListStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
};

const linkStyle: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '0.95rem',
};

const Header: React.FC<HeaderProps> = ({ title = 'FastBite', className }) => {
    return (
        <header style={headerStyle} className={className}>
            <div style={containerStyle}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{title}</span>
                    <small style={{ color: '#9aa6c0' }}>v1</small>
                </div>

                <nav aria-label="Main navigation">
                    <ul style={navListStyle}>
                        <div>
                            <li><a style={linkStyle} href="/">Home</a></li>
                            <li><a style={linkStyle} href="/about">About</a></li>
                            <li><a style={linkStyle} href="/contact">Contact</a></li>
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;