import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
    this.toggleModal();
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg"></i> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={3}>
                  Rating
                </Label>
                <Col md={9}>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={3}>
                  Your name
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxlength: maxLength(15)
                    }}
                     />
                   <Errors
                     className="text-danger"
                     model=".name"
                     show="touched"
                     messages={{
                       minLength: 'Must be longer than 2 characters.',
                       maxlength: 'Must be less than 16 characters.'
                     }}/>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={3}>Comment</Label>
                <Col md={9}>
                  <Control.textarea  model=".comment" id="comment" name="comment" rows="6"
                    className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 9, offset: 3 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}


function RenderComments({comments}){
    if (comments != null) {
      const dishComments = comments.map((comment) => {
        return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
        );
      });

      return (
        <div>
          {dishComments}
        </div>
      );

    } else {
      return <div></div>
    }
  }

function RenderDish({dish}) {
    if (dish != null) {

      return (
        <div>
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );

    } else {

      return (<div></div>);
    }
  }

const DishDetail = (props) => {
    if (props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish}/>
            </div>
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <ul className="list-unstyled">
                <RenderComments comments={props.comments}/>
                <CommentForm/>
              </ul>
            </div>
          </div>
        </div>
      );

    } else {

      return (<div></div>);
    }

  }



export default DishDetail;
