import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation } from 'react-router-dom';

const InterviewScheduler = () => {
  const location = useLocation();
  const usn = location.state.usn;
  const companyEmail = localStorage.getItem('token')
  const [phases, setPhases] = useState([
    {
      phaseName: "",
      mode: "online",
      meetingLink: "",
      slots: [{ date: "", time: "" }],
    },
  ]);

  const handleAddPhase = () => {
    setPhases([
      ...phases,
      { phaseName: "", mode: "online", slots: [{ date: "", time: "" }] },
    ]);
  };

  const handleRemovePhase = (index) => {
    const updatedPhases = [...phases];
    updatedPhases.splice(index, 1);
    setPhases(updatedPhases);
  };

  const handlePhaseChange = (index, field, value) => {
    const updatedPhases = [...phases];
    updatedPhases[index][field] = value;
    setPhases(updatedPhases);
  };

  const handleSlotChange = (phaseIndex, slotIndex, field, value) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].slots[slotIndex][field] = value;
    setPhases(updatedPhases);
  };

  const handleAddSlot = (phaseIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].slots.push({ date: "", time: "" });
    setPhases(updatedPhases);
  };

  const handleRemoveSlot = (phaseIndex, slotIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].slots.splice(slotIndex, 1);
    setPhases(updatedPhases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Phases:", phases);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/schedulePhases`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        usn, companyEmail, phases
      }),

    })

    const data = await response.json();

    console.log(data)
  
      alert(data.message)
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Interview Scheduler</h1>
          <Form onSubmit={handleSubmit}>
            {phases.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="mb-4">
                <Form.Group>
                  <Form.Label>Phase Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={phase.phaseName}
                    onChange={(e) =>
                      handlePhaseChange(phaseIndex, "phaseName", e.target.value)
                    }
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mode:</Form.Label>
                  <Form.Control
                    as="select"
                    value={phase.mode}
                    onChange={(e) =>
                      handlePhaseChange(phaseIndex, "mode", e.target.value)
                    }
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </Form.Control>
                </Form.Group>

                {phase.mode === "online" && (
                  <Form.Group>
                    <Form.Label>Meeting Link:</Form.Label>
                    <Form.Control
                      type="text"
                      value={phase.meetingLink}
                      onChange={(e) =>
                        handlePhaseChange(
                          phaseIndex,
                          "meetingLink",
                          e.target.value
                        )
                      }
                      placeholder="Enter meeting link (e.g., Zoom, Google Meet)"
                      required
                    />
                  </Form.Group>
                )}

                <h5>Slots:</h5>
                {phase.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="mb-3">
                    <Form.Group>
                      <Form.Label>Date:</Form.Label>
                      <Form.Control
                        type="date"
                        value={slot.date}
                        onChange={(e) =>
                          handleSlotChange(
                            phaseIndex,
                            slotIndex,
                            "date",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Time:</Form.Label>
                      <Form.Control
                        type="time"
                        value={slot.time}
                        onChange={(e) =>
                          handleSlotChange(
                            phaseIndex,
                            slotIndex,
                            "time",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveSlot(phaseIndex, slotIndex)}
                      disabled={phase.slots.length <= 1}
                    >
                      Remove Slot
                    </Button>
                  </div>
                ))}

                <Button
                  variant="secondary"
                  onClick={() => handleAddSlot(phaseIndex)}
                >
                  Add Slot
                </Button>
                <hr />
                <Button
                  variant="danger"
                  onClick={() => handleRemovePhase(phaseIndex)}
                  disabled={phases.length <= 1}
                >
                  Remove Phase
                </Button>
              </div>
            ))}
            <Button variant="primary" onClick={handleAddPhase}>
              Add Phase
            </Button>
            <Button variant="success" type="submit" className="ml-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default InterviewScheduler;
