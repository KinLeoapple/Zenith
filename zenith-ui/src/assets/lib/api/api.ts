import {crypt_str} from "@/assets/lib/crypt/crypt.ts";
import {MAX_PER_PAGE} from "@/assets/lib/data/static.ts";
import {request} from "@/assets/lib/api/request.ts";

export function basic_info(id: string | number) {
    return request(`/basic_info/${id}`, {
        method: "GET",
        withCredentials: true,
    });
}

export function post_login(username: string, password: string) {
    return new Promise(resolve => {
        crypt_str(password).then(hash => {
            resolve(request(`/login`, {
                method: "POST",
                mode: "cors",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    username: username,
                    password: hash,
                })
            }));
        });
    });
}

export function post_token_login(token: string) {
    return request('/login/token', {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

/*
Blog
 */

export function get_blog_total() {
    return request('/blog/total', {
        method: "GET",
        withCredentials: true,
    });
}

export function get_blog_all(userId: string | number,
                             offset: number = 0,
                             size: number = MAX_PER_PAGE) {
    return request(`/blog/${userId}/null?offset=${offset}&size=${size}`, {
        method: "GET",
        withCredentials: true,
    });
}

export function get_blog(userId: string | number, id: string | number) {
    return request(`/blog/${userId}/${id}`, {
        method: "GET",
        withCredentials: true,
    });
}

export function get_blog_content(id: string | number) {
    return request(`/blog/content/${id}`, {
        method: "GET",
        withCredentials: true,
    });
}

export function post_blog(token: string,
                          title: string,
                          blog: string,
                          catId: string | number,
                          blogDes: string,
                          id: string | number | null = null) {
    return request(`/blog/${id}`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
            title: title,
            blog: blog,
            cat_id: catId,
            blog_des: blogDes
        })
    });
}

export function delete_blog(token: string, id: string | number) {
    return request('/blog', {
        method: "DELETE",
        mode: "cors",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
            blog_id: id,
        })
    });
}

/*
 Draft
 */

export function get_draft_total(token: string) {
    return request('/blog/draft/total', {
        method: "GET",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function get_draft(token: string,
                          userId: string | number,
                          id: string | number) {
    return request(`/blog/draft/${userId}/${id}`, {
        method: "GET",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function get_draft_all(token: string,
                              userId: string | number,
                              offset: number = 0,
                              size: number = MAX_PER_PAGE) {
    return request(`/blog/draft/${userId}/null?offset=${offset}&size=${size}`, {
        method: "GET",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function get_draft_content(token: string, id: string | number) {
    return request(`/blog/draft/content/${id}`, {
        method: "GET",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function post_draft(token: string,
                           title: string,
                           draft: string,
                           id: string | number | null = null) {
    return request(`/blog/draft/${id}`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
            title: title,
            draft: draft
        })
    });
}

export function delete_draft(token: string, id: string | number) {
    return request('/blog/draft', {
        method: "DELETE",
        mode: "cors",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            draft_id: id,
        })
    });
}

/*
 Image
 */

export function post_img(token: string,
                         file: Blob,
                         id: string | number | null = null) {
    const form = new FormData();
    form.append("file", file);

    return request(`/img/${id}`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        data: form
    });
}

/*
 Category
 */

export function post_category(token: string,
                              categoryName: string,
                              id: string | number | null = null) {
    return request(`/cat/${id}`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
            catName: categoryName,
        })
    });
}

export function get_category(id: string | number) {
    return request(`/cat/${id}`, {
        method: "GET",
        withCredentials: true,
    });
}

export function get_category_all() {
    return request('/cat/null', {
        method: "GET",
        withCredentials: true,
    });
}

export function get_category_number(id: string | number) {
    return request(`/cat/number/${id}`, {
        method: "GET",
        withCredentials: true,
    });
}

/*
 RSA Key
 */

export function get_key() {
    return request('/key', {
        method: "GET",
        withCredentials: true,
    });
}

/*
 Search
 */

export function get_search_blog(keyword: string,
                                offset: number = 0,
                                size: number = MAX_PER_PAGE) {
    return request(`/search/blog?keyword=${keyword}&offset=${offset}&size=${size}`, {
        method: "GET",
        withCredentials: true,
    });
}