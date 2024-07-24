import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Payment.css";
import Payment from "../../components/Payment";

// GraphQl
import getPaymentDataQuery from "./getPaymentData.graphql";

// // Components
import Loader from "../../components/Loader";
import NotFound from "../notFound/NotFound";
import { loadingBarMiddleware } from "react-redux-loading-bar";

class PaymentContainer extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    data: PropTypes.any,
  };

  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    console.log("props:", this.props);
    if (!this.props.data?.loading && this.props.data?.getPaymentData) {
      fetch("/opnPayments-payment-complete", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationId: this.props.reservationId }),
      });
    }
  }

  render() {
    const { data } = this.props;

    console.log("data:", data);

    const payment = data?.getPaymentData;
    const error = data?.error;
    const loading = data?.loading;

    console.log("payment:", payment);
    console.log("error:", error);
    console.log("loading:", loading);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      console.error(error);
    }

    if (!loading && !payment) {
      console.log("Cannot Found Payment Data");
      return <NotFound />;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {loading && !payment && <Loader type={"text"} />}
          {!loading && payment && <Payment data={payment} />}
        </div>
      </div>
    );
  }
}

const GET_PAYMENT_DATA = gql`
  query GetPaymentData($reservationId: Int!) {
    getPaymentData(reservationId: $reservationId) {
      id
      listId
      hostId
      guestId
      checkIn
      checkOut
      startTime
      endTime
      guests
      message
      guestServiceFee
      hostServiceFee
      basePrice
      delivery
      discount
      securityDeposit
      discountType
      total
      licenseNumber
      firstName
      lastName
      countryCode
      dateOfBirth
      currency
      securityDeposit
      confirmationCode
      listData {
        id
        title
        street
        city
        state
        country
        zipcode
        personCapacity
        transmission
        reviewsCount
        reviewsStarRating
        listingData {
          checkInStart
          checkInEnd
          cancellation {
            id
            policyName
            policyContent
          }
        }
        coverPhoto
        listPhotos {
          id
          name
        }
        settingsData {
          id
          settingsId
          listsettings {
            id
            itemName
            settingsType {
              typeName
            }
          }
        }
        houseRules {
          houseRulesId
          listsettings {
            id
            itemName
            isEnable
            settingsType {
              typeName
            }
          }
        }
      }
      messageData {
        id
      }
      hostData {
        profileId
        firstName
        picture
        createdAt
      }
      bookingSpecialPricing {
        id
        reservationId
        blockedDates
        isSpecialPrice
      }
    }
  }
`;

export default compose(
  withStyles(s),
  graphql(GET_PAYMENT_DATA, {
    options: (props) => ({
      variables: {
        reservationId: props.reservationId,
      },
      fetchPolicy: 'cache-and-network',
    }),
  })
)(PaymentContainer);
