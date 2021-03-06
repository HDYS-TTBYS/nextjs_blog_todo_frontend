import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookie from "universal-cookie";


const cookie = new Cookie()

export default function TaskForm({ taskCreated }: { taskCreated: any }) {
    const { selectdTask, setSelectedTask } = useContext(StateContext)

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
            method: "POST",
            body: JSON.stringify({ title: selectdTask.title }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${cookie.get("access_token")}`,
            },
        }).then((res) => {
            if (res.status === 401) {
                alert("JWT Token not valid")
            }
        })
        setSelectedTask({ id: 0, title: "", created_at: "" })
        taskCreated()
    }

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectdTask.id}/`,
            {
                method: "PUT",
                body: JSON.stringify({ title: selectdTask.title }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${cookie.get("access_token")}`
                },
            }).then((res) => {
                if (res.status === 401) {
                    alert("JWT Token not valid")
                }
            })
        setSelectedTask({ id: 0, title: "", created_at: "" })
        taskCreated()
    }


    return (
        <div>
            <form onSubmit={selectdTask.id !== 0 ? update : create}>
                <input
                    className="text-black mb-8 px-2 py-1"
                    type="text"
                    value={selectdTask.title}
                    onChange={e => {
                        setSelectedTask({ ...selectdTask, title: e.target.value })
                    }}
                />
                <button
                    type="submit"
                    className="bg-gray-500 ml-2 hover:gb-gray-600 text-sm px-2 py-1 rounded uppercase"
                >
                    {selectdTask.id !== 0 ? "update" : "create"}
                </button>
            </form>
        </div>
    )
}
