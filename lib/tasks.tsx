import fetch from "node-fetch";

export interface TASK {
    id: number
    title: string
    created_at: string
}
export async function getAllTasksData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
    );
    const posts: TASK[] = await res.json();
    const filteredTasks = posts.sort(
        (a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => (new Date(b.created_at) as any) - (new Date(a.created_at) as any)
    );
    return filteredTasks;
}

export async function getAllTaskIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
    );
    const task: TASK[] = await res.json();
    return task.map((task) => {
        return {
            params: {
                id: String(task.id),
            },
        };
    });
}

export async function getTaskData(id: string) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
    );
    const task: TASK = await res.json();
    return task;
}
