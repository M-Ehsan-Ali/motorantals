import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import cs from "../../components/commonStyle.css";
import s from "./AddPayoutContainer.css";

// Components
import PayoutForm from "../../components/Payout/PayoutForm";

class AddPayoutContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    initialData: PropTypes.object.isRequired,
  };

  render() {
    const { title, initialData } = this.props;
    return (
      <Grid fluid className={"listingContainer"}>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <PayoutForm initialValues={initialData} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s, cs)(AddPayoutContainer);
