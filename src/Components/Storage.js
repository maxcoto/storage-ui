import { useState } from "react";
import { Button, InputGroup, Table, Form } from "react-bootstrap";
import { constants } from "../Utils/constants";
import { jsonLoad } from "../Utils/api";

const Storage = (props) => {  
  const empty = { color: "", msg: "" };

  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(empty);
  const [storage, setStorage] = useState([]);
  
  const [network, setNetwork] = useState("ethereum");
  const [target, setTarget] = useState("");

  const read = async () => {
    setResult(empty);
    setProcessing(true);

    try {
      const json = await jsonLoad(network, target);
      setStorage(json.data);
      setResult({ color: "green", msg: "done" });
    } catch (error) {
      setStorage([]);
      setResult({ color: "red", msg: error?.response?.data?.error || "unknown problem" });
    }

    setProcessing(false);
  };

  const handleTarget = (event) => { setTarget(event.target.value) }
  const handleNetwork = (event) => { setNetwork(event.target.value) }

  return (
    <div>
      <div>
        <span className="green">storage reader</span>
        <br /><br />

        <div style={{ maxWidth: "530px" }}>
          <InputGroup>
            <InputGroup.Text>network</InputGroup.Text>
            <Form.Select onChange={handleNetwork}>
              {Object.entries(constants.networks).map((network, index) => (
                <option key={index} value={network[0]}>{network[1].display}</option>
              ))}
            </Form.Select>
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>&nbsp;target</InputGroup.Text>
            <Form.Control placeholder="0x00..." aria-label="With textarea" onChange={handleTarget} />
          </InputGroup>
        </div>
        <br />

        <div>
          <Button className="button" onClick={read} disabled={processing}>
            { processing &&
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
            { processing ? " reading..." : "read" }
          </Button>
        </div>
      </div>

      { storage.length > 0 &&
        <div>
          <br /><br />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>slot</th>
                <th>offset</th>
                <th>name</th>
                <th>value</th>
                <th>size</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>
              {storage.map((variable, index) => (
                <tr key={index}>
                  <td>{variable.slot}</td>
                  <td>{variable.offset}</td>
                  <td>{variable.name}</td>
                  <td>{variable.value}</td>
                  <td>{variable.size}</td>
                  <td>{variable.type_string}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      }

      <br /><br />
      <span className={result.color}>{result.msg}</span>

    </div>
  );
};

export default Storage;
