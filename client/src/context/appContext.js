import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

export default function Default(props) {
    const [showSidebar, setshowSidebar] = useState(true);
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState("info")
    const [alertBody, setAlertBody] = useState("")
    const onShowAlert = (body, type) => {
        setAlertBody(body)
        setAlertType(type)
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }
    const dismissAlert = () => setShowAlert(false)
    return (
        <AppContext.Provider value={{ showAlert, setShowAlert, alertType, setAlertType, alertBody, onShowAlert, dismissAlert, showSidebar, setshowSidebar }}>
            {props.children}
        </AppContext.Provider>
    )
}
