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
