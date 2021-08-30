import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import ReactJson from 'react-json-view';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import {useState} from 'react';

const recursiveRemoveKey = (object, deleteKey) => {
  delete object[deleteKey];
  Object.values(object).forEach((val) => {
    if (typeof val !== 'object') return;

    recursiveRemoveKey(val, deleteKey);
  });
};

const MainPage = () => {
  // this is also pure string, no need to convert to JSON here
  const [aceText, setAceTextState] = useState('{}');
  // its a string, need to convert to JSON before sending to <ReactJson />
  const [jsonViewText, setJsonViewTextState] = useState('{}');
  const onEdit = true;
  const onAdd = true;
  const onDelete = true;
  const handleChange = (value) => setAceTextState(value);

  const handleCopyRight = () => {
    console.log('aceval is', aceText);
    setJsonViewTextState(aceText);
  };

  const handleCopyLeft = () => {
    setAceTextState(jsonViewText);
  };

  const handleNestedDelete = () => {
    let nkeys = document.getElementById('idNestedKeys').value;
    nkeys = nkeys.split(/,|" "+/);
    let jsonObj = JSON.parse(jsonViewText);
    nkeys.forEach((key) => {
      recursiveRemoveKey(jsonObj, JSON.parse(key));
      console.log('object after deleting ', key, ':- ', jsonObj);
    });
    setJsonViewTextState(JSON.stringify(jsonObj));
  };

  return (
    <Container fluid={true}>
      <Row fluid id="row-8">
        <Col md={5}>
          <AceEditor
            mode="java"
            theme="github"
            onChange={handleChange}
            name="ace-style"
            editorProps={{$blockScrolling: true}}
            value={aceText}
            height="100%"
            width="100%"
          />
        </Col>
        <Col id="middle-button-col" md={2}>
          <Button
            className="copy-right btn-secondary"
            onClick={handleCopyRight}
          >
            Copy{' '}
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-right"
              className="svg-inline--fa fa-angle-right fa-w-8 "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                fill="currentColor"
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </Button>
          <Button className="copy-left btn-secondary" onClick={handleCopyLeft}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-left"
              className="svg-inline--fa fa-angle-left fa-w-8 "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                fill="currentColor"
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
              ></path>
            </svg>{' '}
            Copy
          </Button>
        </Col>
        <Col md={5} id="json-view-col">
          <ReactJson
            theme="bright:inverted"
            src={JSON.parse(jsonViewText)}
            onEdit={
              onEdit
                ? (e) => {
                    console.log(e);
                    setJsonViewTextState(JSON.stringify(e.updated_src));
                  }
                : false
            }
            onDelete={
              onDelete
                ? (e) => {
                    console.log(e);
                    setJsonViewTextState(JSON.stringify(e.updated_src));
                  }
                : false
            }
            onAdd={
              onAdd
                ? (e) => {
                    console.log(e);
                    setJsonViewTextState(JSON.stringify(e.updated_src));
                  }
                : false
            }
          />
        </Col>
      </Row>
      <Row id="row-2">
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter keys of nodes to be deleted seperated by ,"
              aria-label="Enter keys of nodes to be deleted seperated by ,"
              id="idNestedKeys"
            />
            <Button variant="danger" onClick={handleNestedDelete}>
              Submit
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
