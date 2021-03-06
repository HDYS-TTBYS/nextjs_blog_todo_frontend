import fetch from "node-fetch";

export interface POST {
    id: number
    title: string
    content: string
    created_at: string
}
export async function getAllPostsData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
    );
    const posts: POST[] = await res.json();
    const filteredPosts = posts.sort(
        (a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => (new Date(b.created_at) as any) - (new Date(a.created_at) as any)
    );
    return filteredPosts;
}

export async function getAllPostIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
    );
    const posts: POST[] = await res.json();
    return posts.map((post) => {
        return {
            params: {
                id: String(post.id),
            },
        };
    });
}

export async function getPostData(id: string) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
    );
    const post: POST = await res.json();
    // return {
    //   post,
    // };
    return post;
}
