import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Title = ({ title, viewHandler, deleteHandler }) => {
  return (
    <Row className='align-items-center'>
      <Col
        lg={9}
        onClick={() => viewHandler(title)}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </Col>
      <Col lg={3}>
        <p
          onClick={() => deleteHandler(title)}
          className='m-2 text-end'
          style={{ cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </p>
      </Col>
    </Row>
  );
};

export default Title;
