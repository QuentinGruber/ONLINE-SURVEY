import React from "react";
import Axios from "axios";
import { Card, Button } from "reactstrap";
import CheckImg from "../../../src/assets/img/icons/common/check.svg";
import { Link } from "react-router-dom";
class FormValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FormContent: { title: "" } };
  }

  async componentDidMount() {
    let GetFormPromise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/form/" + this.props.FormID,
      withCredentials: true,
    });
    this.setState({ FormContent: GetFormPromise.data });
  }

  render() {
    return (
      <Card className="card-form-saved">
        <img
          className="check-aswered"
          src={CheckImg}
          alt='Icône "validé"'
        ></img>
        <div className="div-form-saved">
          Nous avons enregistré votre réponse au formulaire "
          {this.state.FormContent.title}".
        </div>
        <div className="box-btn-retour">
          <Link to="/form">
            <Button
              color="default"
              outline
              type="button"
              className="btn-retour"
            >
              Retour
            </Button>
          </Link>
        </div>
      </Card>
    );
  }
}

export default FormValidation;
