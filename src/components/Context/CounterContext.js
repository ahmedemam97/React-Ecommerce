import { createContext, useState } from "react";

let CounterContext = createContext(0)

function CounterContextProvider({children}) {

const [counter, setCount] = useState(0)

function changeCount() {
    setCount(counter + 1)
}
return (

    <CounterContext.Provider value={{ counter, changeCount }}>
        {children}
    </CounterContext.Provider>
)

}

export { CounterContext, CounterContextProvider }