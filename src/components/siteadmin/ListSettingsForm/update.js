// Redux Form
import { SubmissionError } from "redux-form";

// Fetch Request
import fetch from "../../../core/fetch";

// Toaster
import { toastr } from "react-redux-toastr";

// Redux
import { closeListSettingsModal } from "../../../actions/siteadmin/modalActions";
import { getAdminListingSettings } from "../../../actions/siteadmin/getAdminListingSettings";
import messages from "../../../locale/messages";

async function update(formatMessage, values, dispatch) {
  const query = `
    query (
        $id:Int,
        $typeId:Int,
        $itemName:String,
        $itemDescription:String,
        $otherItemName:String,
        $maximum:Int,
        $minimum:Int,
      	$startValue:Int,
        $endValue:Int,
        $isEnable: String,
        $makeType: String
      ) {
          updateListSettings (
            id: $id,
            typeId:$typeId,
            itemName:$itemName,
            itemDescription:$itemDescription,
            otherItemName: $otherItemName,
            maximum: $maximum,
            minimum: $minimum,
            startValue: $startValue,
            endValue: $endValue,
            isEnable: $isEnable,
            makeType: $makeType
          ) {
            status
          }
        }
  `;

  const resp = await fetch("/graphql", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: values,
    }),
    credentials: "include",
  });

  const { data } = await resp.json();

  if (data.updateListSettings.status === "success") {
    dispatch(closeListSettingsModal());
    await dispatch(getAdminListingSettings(values.typeId));
    toastr.success(
      formatMessage(messages.updateListSettings),
      formatMessage(messages.updateListSettingsSuccess)
    );
  } else if (data.updateListSettings.status === "unableToDisable") {
    toastr.error(
      formatMessage(messages.updateListSettings),
      formatMessage(messages.updateListSettingsInactiveFail)
    );
  } else if (data.updateListSettings.status === "listingUsed") {
    toastr.error(
      formatMessage(messages.updateListSettings),
      formatMessage(messages.updateListSettingsRemoveFail)
    );
  } else {
    toastr.error(
      formatMessage(messages.updateListSettings),
      formatMessage(messages.somethingWentWrong)
    );
  }
}

export default update;
