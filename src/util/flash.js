import { flash } from "../redux/actions/actions"
import store from "../redux/store"

const flashMessage = ({
    delay = 0,
    timeout = 5000,
    title = "",
    message = ""
} = {}) => { // equals curly braces at the end allows to call without passing in {} as argument
    store.dispatch((flash({
        delay,
        timeout,
        title,
        message,
    })))
}

window.flash = flashMessage;
export default flashMessage