export const getProducts = async (page = 1, search = '') => {
    try {
        const { data } = await axios.get('products', { params: { page, search } });
        return data;
    } catch (e) {
        //
    }
};

export const storeProduct = async ({ name, category, description, price, image }) => {
    try {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        if (image instanceof File) {
            formData.append('image', image);
        }

        const { data } = await axios.post('products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;

    } catch (e) {
        throw (e.response.data.errors);
    }
};

export const getProduct = async id => {
    try {
        const { data } = await axios.get(`products/${id}`);
        return data;
    } catch (e) {
        //
    }
};

export const editProduct = async ({ id, name, category, description, price, image }) => {
    try {
        const formData = new FormData();

        formData.append('_method', 'patch');
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        if (image instanceof File) {
            formData.append('image', image);
        }

        const { data } = await axios.post(`products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;

    } catch (e) {
        throw (e.response.data.errors);
    }
};

export const deleteProduct = async id => {
    console.log(id);
    try {
        await axios.delete(`products/${id}`);
    } catch (e) {
        //
    }
};

export const importCsv = async file => {
    try {
        const formData = new FormData();

        formData.append('csv', file);

        const { data } = await axios.post('products/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;

    } catch (e) {
        throw (e.response.data.errors);
    }
};
