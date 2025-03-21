import React from 'react';
import useAuth from '../../hooks/authHooks';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
    const { marginDiv } = useAuth()
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <p>Company Name &copy; {new Date().getFullYear()}</p>
                    </div>
                    <div className="col-lg-6">
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default AdminFooter;
