import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

const TextBox = ({
  title,
  fulltext,
  error,
  fetchHandler,
  saveHandler,
  editHandler,
  mode,
  onTitleChange,
  onFulltextChange,
}) => {
  const [input, updateInput] = useState('');
  const onInputChange = (e) => {
    updateInput(e.target.value);
  };

  if (mode) {
    return (
      <div>
        <div>
          <Form.Group
            as={Row}
            className='mb-3 align-items-center'
            controlId='formPlaintextPassword'
          >
            <Form.Label column lg='2'>
              Fetch by <a href='https://ctext.org/tools/api#urn'>URN</a>:
            </Form.Label>
            <Col lg='5'>
              <Form.Control
                onChange={onInputChange}
                type='text'
                placeholder='URN'
              />
            </Col>
            <Col lg='2'>
              <Button
                className='m-1'
                onClick={() => {
                  return fetchHandler(input);
                }}
              >
                Fetch
              </Button>
            </Col>
          </Form.Group>
          {/* <input
            className="m-1"
            type="text"
            value={input}
            onChange={onInputChange}
          ></input> */}
          {/* <Button
            className="m-1"
            onClick={() => {
              return fetchHandler(input);
            }}
          >
            Fetch
          </Button> */}
        </div>
        <div className='text-danger'>{error}</div>
        <div>
          <FloatingLabel
            controlId='floatingInput'
            label='title'
            className='mb-3 w-50'
          >
            <Form.Control
              value={title}
              onChange={onTitleChange}
              placeholder='Leave a comment here'
            />
          </FloatingLabel>
          {/* <input type='text' value={title} onChange={onTitleChange}/> */}
        </div>
        <FloatingLabel controlId='floatingTextarea2' label='fulltext'>
          <Form.Control
            value={fulltext}
            as='textarea'
            placeholder='Leave a comment here'
            onChange={onFulltextChange}
            style={{ height: '450px' }}
          />
        </FloatingLabel>
        {/* <textarea
            value={fulltext}
            rows={20}
            cols={100}
            onChange={onFulltextChange}
          /> */}
        <div>
          <Button className='m-1' onClick={editHandler}>
            Edit/View
          </Button>
          <Button
            className='m-1'
            onClick={() => {
              return saveHandler(title, fulltext);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Form.Group
          as={Row}
          className='mb-3 align-items-center'
          controlId='formPlaintextPassword'
        >
          <Form.Label column lg='2'>
            Fetch by <a href='https://ctext.org/tools/api#urn'>URN</a>:
          </Form.Label>
          <Col lg='5'>
            <Form.Control
              onChange={onInputChange}
              type='text'
              placeholder='URN'
            />
          </Col>
          <Col lg='2'>
            <Button
              className='m-1'
              onClick={() => {
                return fetchHandler(input);
              }}
            >
              Fetch
            </Button>
          </Col>
        </Form.Group>
        {/* <input className="m-1" type="text" onChange={onInputChange}></input>
        <Button
          className="m-1"
          onClick={() => {
            return fetchHandler(input);
          }}
        >
          Fetch
        </Button> */}
        <div className='text-danger'>{error}</div>
        <h2>{title}</h2>
        <p>{fulltext}</p>
        <Button className='m-1' onClick={editHandler}>
          Edit/View
        </Button>
        <Button
          className='m-1'
          onClick={() => {
            return saveHandler(title, fulltext);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default TextBox;
