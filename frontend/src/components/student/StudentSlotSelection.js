import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, Table, DropdownButton, Dropdown } from 'react-bootstrap';

const StudentSlotSelection = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disableButtons, setDisableButtons] = useState({});
    const [selectedSlots, setSelectedSlots] = useState({});
    const usn = localStorage.getItem('token');

    useEffect(() => {
        // Fetch interview data from the backend API
        fetch(`http://localhost:9000/api/inveriewSlotAvailability/${usn}`)
            .then((response) => response.json())
            .then((data) => {
                setInterviews(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch interview data', error);
                setLoading(false);
            });
    }, [usn]);

    const handleSlotSelection = (interviewId, slotDetails) => {
        setSelectedSlots((prevState) => ({
            ...prevState,
            [interviewId]: slotDetails,
        }));
    };

    const handleApplyClick = (id) => {
        const selectedSlot = selectedSlots[id];
        if (!selectedSlot) {
            alert('Please select a slot before applying.');
            return;
        }

        const { date, time, meetingLink, companyEmail, phaseName } = selectedSlot;

        setDisableButtons((prevState) => ({
            ...prevState,
            [id]: true,
        }));

        fetch('http://localhost:9000/api/finalScheduleSelection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usn,
                date,
                time,
                meetingLink,
                companyEmail,
                phaseName,
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('Response:', responseData);
            })
            .catch((error) => {
                console.error('Failed to send the data', error);
            });
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <img src="https://www.igauge.in/admin/uploaded/rating/logo/CambridgeInstituteLatestLogo2_1623754797.png" height="40" width="110" alt="Logo" />
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" navbarScroll>
                            <Nav.Link href="StudentHome">Home</Nav.Link>
                            <Nav.Link href="StudentSchedule">Schedule</Nav.Link>
                            <Nav.Link href="createResume">Resume</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-Login">
                                <img src="https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-22.jpg" height="30" width="30" alt="Profile" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/">Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <h1 className="text-center">Slot Selection</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    interviews.map((interview, index) => (
                        <Table striped bordered hover key={index} className="mt-4">
                            <thead>
                                <tr>
                                    <th>Company Email</th>
                                    <th>Phase Name</th>
                                    <th>Mode</th>
                                    <th>Meeting Link</th>
                                    <th>Slot Selection</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{interview.companyEmail}</td>
                                    <td>{interview.schedule[0]?.phaseName || 'N/A'}</td>
                                    <td>{interview.schedule[0]?.mode || 'N/A'}</td>
                                    <td>
                                        {interview.schedule[0]?.mode === 'online' ? (
                                            <a href={interview.schedule[0]?.meetingLink} target="_blank" rel="noopener noreferrer">
                                                {interview.schedule[0]?.meetingLink || 'N/A'}
                                            </a>
                                        ) : (
                                            'Offline'
                                        )}
                                    </td>
                                    <td>
                                        <DropdownButton
                                            id={`dropdown-${index}`}
                                            title={
                                                selectedSlots[interview._id]?.date
                                                    ? `${selectedSlots[interview._id].date} - ${selectedSlots[interview._id].time}`
                                                    : 'Select a Slot'
                                            }
                                            onSelect={(eventKey) => {
                                                const [date, time] = eventKey.split('|');
                                                handleSlotSelection(interview._id, {
                                                    date,
                                                    time,
                                                    meetingLink: interview.schedule[0]?.meetingLink,
                                                    companyEmail: interview.companyEmail,
                                                    phaseName: interview.schedule[0]?.phaseName,
                                                });
                                            }}
                                        >
                                            {interview.schedule[0]?.slots.map((slot, slotIndex) => (
                                                <Dropdown.Item key={slotIndex} eventKey={`${slot.date}|${slot.time}`}>
                                                    {slot.date} - {slot.time}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </td>
                                    <td>
                                        <Button
                                            variant="dark"
                                            disabled={disableButtons[interview._id]}
                                            onClick={() => handleApplyClick(interview._id)}
                                        >
                                            Apply
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    ))
                )}
            </Container>
        </div>
    );
};

export default StudentSlotSelection;
