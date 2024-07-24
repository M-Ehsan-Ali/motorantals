import { updateConfigSettings } from "../../../actions/siteadmin/ConfigSettings/updateConfigSettings";

async function submit(formatMessage, values, dispatch){
   await dispatch(updateConfigSettings(values, formatMessage))
}

export default submit;