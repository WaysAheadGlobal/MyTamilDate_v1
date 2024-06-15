import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './job-title.css';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import { Container, Image, Button, Form, Modal, InputGroup } from 'react-bootstrap';
import responsivebg from "../assets/images/responsive-bg.png";
import job from "../assets/images/job.png";

import { IoIosSearch } from "react-icons/io";

const jobTypes = [
    'Anesthesiologist', 'Actor', 'Analyst', 'Anthropologist', 'Biologist', 'Business owner', 'Chef', 'Civil Engineer', 'Designer', 'Entrepreneur'
];

export const JobTitle = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customJobs, setCustomJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newJobTitle, setNewJobTitle] = useState('');
    const jobListEndRef = useRef(null);
    const [hasAddedJob, setHasAddedJob] = useState(false);

    const filteredJobs = jobTypes.filter(job => job.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSave = () => {
        setCustomJobs([...customJobs, newJobTitle]);
        setShowModal(false);
        setNewJobTitle('');
        setHasAddedJob(true);
    };

    useEffect(() => {
        if (hasAddedJob && jobListEndRef.current) {
            jobListEndRef.current.scrollIntoView({ behavior: 'smooth' });
            setHasAddedJob(false);
        }
    }, [customJobs, hasAddedJob]);

    return (
        <div className='job-container'>
            <div className='job-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div>
            <Container className='job-main'>
                <Container className='job-content'>
                    <Container className='logo-progressbar10'>
                        <Container className='logo-arrow10'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} alt="Back Arrow" />
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn10'>
                            <div></div>
                        </div>
                    </Container>
                    <Container className='job-details'>
                        <div className='your-job'>
                            <Container className='job-text'>
                                <Image className='about-yourself-icon' src={job} alt="Job Icon" />
                                <p>What type of job are you looking for?</p>
                            </Container>
                            <InputGroup className='job-search-bar'>
                                <Form.Control
                                    className='job-search'
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <InputGroup.Text className='search-icon'><IoIosSearch /></InputGroup.Text>
                            </InputGroup>
                            <Container className='all-job'>
                                <div className="job-columns">
                                    {filteredJobs.map((job, index) => (
                                        <div key={index} className='job-item'>
                                            {job}
                                        </div>
                                    ))}
                                    {customJobs.map((job, index) => (
                                        <div key={index + filteredJobs.length} className='job-item'>
                                            {job}
                                        </div>
                                    ))}
                                    <div ref={jobListEndRef} />
                                </div>
                            </Container>
                            <div className='not-seeing-job'>
                                Not seeing your job?
                                <a href='#' onClick={() => setShowModal(true)}>Add here</a>
                            </div>
                        </div>
                    </Container>
                    <Button variant="primary" type="submit" className='job-nxt-btn'>
                        Next
                    </Button>
                </Container>
            </Container>
            <Modal show={showModal} centered onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title className='job-model-title'>Add your job title</Modal.Title>
                </Modal.Header>
                <Modal.Body className='job-modal-body'>
                    <Form.Control
                        className='job-model-form'
                        type="text"
                        placeholder="Type here...!"
                        value={newJobTitle}
                        onChange={(e) => setNewJobTitle(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer className='job-model-footer'>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};



