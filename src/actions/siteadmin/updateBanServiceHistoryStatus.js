import { gql } from "react-apollo";
import { sendEmail } from "../../core/email/sendEmail";
// Toaster
import { toastr } from "react-redux-toastr";
import messages from "../../locale/messages";

const query = gql`
  query userManagement($currentPage: Int, $searchList: String) {
    userManagement(currentPage: $currentPage, searchList: $searchList) {
      count
      usersData {
        id
        email
        profile {
          profileId
          firstName
          lastName
          gender
          dateOfBirth
          phoneNumber
          preferredLanguage
          preferredCurrency
          location
          info
          createdAt
        }
        userBanStatus
      }
    }
  }
`;
const mutation = gql`
  mutation($id: String, $banStatus: Int) {
    updateBanServiceHistoryStatus(id: $id, banStatus: $banStatus) {
      status
    }
  }
`;
export function updateBanServiceHistoryStatus(
  id,
  banStatus,
  userMail,
  userName,
  currentPage,
  searchList,
  adminMail,
  intl
) {
  const { formatMessage } = intl;
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation,
        variables: { id, banStatus },
        fetchPolicy: "network-only",
        refetchQueries: [{ query, variables: { currentPage, searchList } }],
      });
      if (data.updateBanServiceHistoryStatus.status === "success") {
        let mailData = {
          userName,
          userMail,
          adminMail,
        };
        toastr.success(
          formatMessage(messages.updateBanStatus),
          formatMessage(messages.updateBanStatusSuccess)
        );
        if (banStatus === "1") {
          await sendEmail(
            userMail,
            "banStatusServiceStatusBanned",
            mailData,
            intl
          );
        } else if (banStatus === "0") {
          await sendEmail(
            userMail,
            "banStatusServiceStatusUnBanned",
            mailData,
            intl
          );
        }
      } else {
        toastr.error(
          formatMessage(messages.updateBanStatus),
          formatMessage(messages.updateBanStatusFail)
        );
      }
    } catch (error) {
      toastr.warning(
        formatMessage(messages.selectBan),
        formatMessage(messages.selectBanInfo)
      );
      return false;
    }
    return true;
  };
}
