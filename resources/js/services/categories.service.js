export const getCategories = async () => {
    try {
        const { data } = await axios.get('categories');
        return data;
    } catch (e) {
        //
    }
};
