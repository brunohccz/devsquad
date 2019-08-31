export const getProducts = async (page = 1, search = '') => {
    try {
        const { data } = await axios.get('products', { params: { page, search } });
        return data;
    } catch (e) {
        //
    }
};
