import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EdiForm({ ediPayload }) {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Interchange</Card.Title>
          <Container>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Sender ISA Qualifer:
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Sender ISA"
                    placeholder={ediPayload.ISA.SenderIDQualifier_5}
                    readOnly
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Sender ISA ID:
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Sender ISA"
                    placeholder={ediPayload.ISA.InterchangeSenderID_6}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Receiver Qualifer:
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Reciever Qualifer"
                    placeholder={ediPayload.ISA.ReceiverIDQualifier_7}
                    readOnly
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Reciever ISA ID:
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Reciever Qualifer"
                    placeholder={ediPayload.ISA.InterchangeReceiverID_8}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Version:</InputGroup.Text>
                  <Form.Control
                    aria-label="Reciever Qualifer"
                    placeholder={
                      ediPayload.ISA.InterchangeControlVersionNumber_12
                    }
                    readOnly
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Usage Flag:
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Reciever Qualifer"
                    placeholder={ediPayload.ISA.UsageIndicator_15}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      {ediPayload.Groups.map((group) => {
        return (
          <React.Fragment key={`${group.GroupControlNumber_6}-control`}>
            <Card>
              <Card.Body>
                <Card.Title>Group</Card.Title>
                <Container>
                  <Row>
                    <Col>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          Sender GS:
                        </InputGroup.Text>
                        <Form.Control
                          aria-label="Sender GS"
                          placeholder={group.GS.SenderIDCode_2}
                          readOnly
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          Receiver GS:
                        </InputGroup.Text>
                        <Form.Control
                          aria-label="Receiver GS"
                          placeholder={group.GS.ReceiverIDCode_3}
                          readOnly
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
            {group.Transactions.map((trans) => {
              return (
                <React.Fragment
                  key={`${trans.ST.TransactionSetControlNumber_02}-control`}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {`Transaction - ${trans.ST.TransactionSetIdentifierCode_01} -
                  ${trans.ST.TransactionSetControlNumber_02} `}
                      </Card.Title>

                      <Container>
                        <Card.Subtitle>B10</Card.Subtitle>

                        <Row>
                          <Col>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1">
                                Order Number:
                              </InputGroup.Text>
                              <Form.Control
                                aria-label="Order Number"
                                placeholder={
                                  trans.B10.ReferenceIdentification_01
                                }
                                readOnly
                              />
                            </InputGroup>
                          </Col>
                          <Col>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1">
                                BOL:
                              </InputGroup.Text>
                              <Form.Control
                                aria-label="Bol"
                                placeholder={
                                  trans.B10.ShipmentIdentificationNumber_02
                                }
                                readOnly
                              />
                            </InputGroup>
                          </Col>
                          <Col>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1">
                                SCAC:
                              </InputGroup.Text>
                              <Form.Control
                                aria-label="SCAC"
                                placeholder={
                                  trans.B10.StandardCarrierAlphaCode_03
                                }
                                readOnly
                              />
                            </InputGroup>
                          </Col>
                        </Row>

                        {trans.L11.map((L11, i) => (
                          <React.Fragment
                            key={`${i}-L11-${trans.ST.TransactionSetControlNumber_02}`}
                          >
                            <Card.Subtitle>L11</Card.Subtitle>

                            <Row>
                              <Col>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text id="basic-addon1">
                                    Customer Name/ID:
                                  </InputGroup.Text>
                                  <Form.Control
                                    aria-label="Customer Name/ID"
                                    placeholder={L11.ReferenceIdentification_01}
                                  />
                                </InputGroup>
                              </Col>
                              <Col>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text id="basic-addon1">
                                    ID Qualifier:
                                  </InputGroup.Text>
                                  <Form.Control
                                    aria-label="Bol"
                                    placeholder={
                                      L11.ReferenceIdentificationQualifier_02
                                    }
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                          </React.Fragment>
                        ))}

                        {trans.LXLoop.map((LX) => {
                          return (
                            <React.Fragment
                              key={`${LX.LX.AssignedNumber_01}-LX`}
                            >
                              <Card.Subtitle>
                                LX Loop - {LX.LX.AssignedNumber_01}
                              </Card.Subtitle>
                              <Container>
                                <Card>
                                  <Card.Body>
                                    <Card.Subtitle>
                                      AT7 Loop - {LX.LX.AssignedNumber_01}
                                    </Card.Subtitle>
                                    {LX.AT7Loop.map((AT7L, i) => {
                                      return (
                                        <React.Fragment
                                          key={`${LX.LX.AssignedNumber_01}-AT7-${i}`}
                                        >
                                          <Row>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Status Code:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Status Code"
                                                  placeholder={
                                                    AT7L.AT7
                                                      .ShipmentStatusCode_01
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Reason Code:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Reason Code"
                                                  placeholder={
                                                    AT7L.AT7
                                                      .ShipmentStatusorAppointmentReasonCode_02
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Reason Code:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Reason Code"
                                                  placeholder={AT7L.AT7.Date_05}
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Date:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Date"
                                                  placeholder={AT7L.AT7.Time_06}
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Time Zone:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="Time Zone"
                                                  placeholder={
                                                    AT7L.AT7.TimeCode_07
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                          </Row>
                                          <Card.Subtitle>MS1</Card.Subtitle>
                                          <Row>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  City:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="City"
                                                  placeholder={
                                                    AT7L.MS1.CityName_01
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  State:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="State"
                                                  placeholder={
                                                    AT7L.MS1
                                                      .StateorProvinceCode_02
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Country:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="City"
                                                  placeholder={
                                                    AT7L.MS1.CountryCode_03
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Longitude:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="City"
                                                  placeholder={
                                                    AT7L.MS1.LongitudeCode_04
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Direction:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="City"
                                                  placeholder={
                                                    AT7L.MS1
                                                      .DirectionIdentifierCode_06
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Latitude:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="City"
                                                  placeholder={
                                                    AT7L.MS1.LatitudeCode_05
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1">
                                                  Direction:
                                                </InputGroup.Text>
                                                <Form.Control
                                                  aria-label="City"
                                                  placeholder={
                                                    AT7L.MS1
                                                      .DirectionIdentifierCode_07
                                                  }
                                                  readOnly
                                                />
                                              </InputGroup>
                                            </Col>
                                          </Row>
                                        </React.Fragment>
                                      );
                                    })}
                                    <Card.Subtitle>L11</Card.Subtitle>
                                    <Row>
                                      <Col>
                                        <InputGroup className="mb-3">
                                          <InputGroup.Text id="basic-addon1">
                                            Stop Sequence:
                                          </InputGroup.Text>
                                          <Form.Control
                                            aria-label="Stop Sequence"
                                            placeholder={
                                              LX.L11[0]
                                                .ReferenceIdentification_01
                                            }
                                            readOnly
                                          />
                                        </InputGroup>
                                      </Col>
                                      <Col>
                                        <InputGroup className="mb-3">
                                          <InputGroup.Text id="basic-addon1">
                                            Stop Sequence Qual:
                                          </InputGroup.Text>
                                          <Form.Control
                                            aria-label="Stop Sequence"
                                            placeholder={
                                              LX.L11[0]
                                                .ReferenceIdentificationQualifier_02
                                            }
                                            readOnly
                                          />
                                        </InputGroup>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </Container>
                            </React.Fragment>
                          );
                        })}
                      </Container>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </Container>
  );
}
export default EdiForm;
