import Link from "next/link";
import { useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { getAllTaskIds, getTaskData, TASK } from "../../lib/tasks";


const fetcher = (url: RequestInfo) => fetch(url).then(res => res.json())


export default function Task({ id, staticTask }: { id: number, staticTask: TASK }) {
    const router = useRouter();
    const { data: task, mutate } = useSWR<TASK>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
        fetcher,
        {
            initialData: staticTask,
        },
    )
    useEffect(() => {
        mutate()
    }, [])

    if (router.isFallback || !task.id) {
        return <div>Loading...</div>;
    }
    return (
        <Layout title={task.title}>
            <span className="mb-4">
                {"ID : "}
                {task.id}
            </span>
            <p className="mb-4 text-xl font-bold">{task.title}</p>
            <p className="mb-12">{task.created_at}</p>
            <Link href="/task-page">
                <div className="flex cursor-pointer mt-8">
                    <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    <span>Back to task-page</span>
                </div>
            </Link>

        </Layout>
    );
}



export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllTaskIds();

    return {
        paths,
        fallback: true,
    };
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const staticTask = await getTaskData(params.id as any);
    return {
        props: {
            id: staticTask.id,
            staticTask,
        },
        revalidate: 3,
    };
}
