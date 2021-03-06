import { createContext, useState, Dispatch, SetStateAction } from "react";
import { TASK } from "../lib/tasks";

interface STATECONTEXTPROVIDER {
    selectdTask?: TASK,
    setSelectedTask?: Dispatch<SetStateAction<TASK>>
}

export const StateContext = createContext<STATECONTEXTPROVIDER>({})


export default function StateContextProvider(props) {
    const [selectdTask, setSelectedTask] = useState<TASK>({ id: 0, title: "", created_at: "" })

    return (
        <StateContextProvider
            value={{
                selectdTask,
                setSelectedTask,
            }}>
            {props.children}
        </StateContextProvider>
    )

}
