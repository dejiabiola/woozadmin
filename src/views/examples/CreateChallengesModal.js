import React from "react";
import { connect } from "react-redux";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Modal,
  Row,
  Col,
} from "reactstrap";
import ImageUploader from 'react-images-upload';
import { handleAddHashtagEntry } from "redux/actions/socials";

class CreateChallengesModal extends React.Component {
  state = {
    CreateChallengesModal: false,
    id: '',
    name: '',
    imageURL: '',
    hashtag: '',
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, imageURL } = this.state;
    if (id === '' || name === '' || imageURL === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.addHashtagEntry({name, categoryId:id, imageURL}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { name, id, imageURL, hashtag, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateChallengesModal")}
        >
          Create
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateChallengesModal}
          toggle={() => this.toggleModal("CreateChallengesModal")}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="CreateChallengesModalLabel"> Create Challenges </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateChallengesModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
          <div className="modal-body">
          
          <Row>
            <Col md="12">
              
              <FormGroup>
                <Label for="exampleSelect"> <h5>Category ID</h5> </Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"><h5>Challenge Name</h5></Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="Challenge Name"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="name"
                  value={name}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"><h5>Challenge Hashtag</h5></Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="Hashtag"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="hashtag"
                  value={hashtag}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"><h5>Upload Challenge Image</h5></Label>
                <ImageUploader
                  withIcon={false}
                  buttonText='Upload Challenge image'
                  onChange={this.onDrop}
                  // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  // maxFileSize={5242880}
                />
              </FormGroup>
            </Col>
          </Row>
       
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateChallengesModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={id === '' || name === '' || imageURL === '' || isMakingRequest === true}
            >
              Create
            </Button>
          </div>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addHashtagEntry: (hashtag) => dispatch(handleAddHashtagEntry(hashtag)) 
}) 


export default connect(null, mapDispatchToProps)(CreateChallengesModal);
