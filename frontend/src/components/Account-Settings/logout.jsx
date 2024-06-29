import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ showLogoutModal, handleCloseLogout, handleLogout }) => {
    return (
        <Modal show={showLogoutModal} onHide={handleCloseLogout} centered>
            <Modal.Body className="pause-modal-content">
                <div className="pause-modal-title">Logout?</div>
                <div className="pause-modal-message">
                    Are you sure you want to logout from your account?
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" className="btn-no" onClick={handleCloseLogout}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-yes" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LogoutModal;
