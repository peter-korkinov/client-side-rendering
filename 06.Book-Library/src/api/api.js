const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if(response.ok !== true) {
            if(response.status === 403) {
                sessionStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method='get', data) {
    const options = {
        method,
        headers: {}
    };

    if(data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

async function get(url) {
    return request(url, createOptions());
}

async function post(url, data) {
    return request(url, createOptions('post', data));
}

async function put(url, data) {
    return request(url, createOptions('put', data));
}

async function del(url) {
    return request(url, createOptions('delete'));
}

async function getAllBooks() {
    return await get('/jsonstore/collections/books');
}

async function getBookById(id) {
    return await get('/jsonstore/collections/books/' + id);
}

async function createBook(data) {
    return await post('/jsonstore/collections/books', data);
}

async function editBookById(id, data) {
    return await put('/jsonstore/collections/books/' + id, data);
}

async function deleteBookById(id) {
    return await del('/jsonstore/collections/books/' + id)
}

export {
    getAllBooks,
    getBookById,
    createBook,
    editBookById,
    deleteBookById
};