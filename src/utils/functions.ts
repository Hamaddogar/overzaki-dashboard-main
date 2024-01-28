export const isValidJSON = (value: string | undefined) => {
    try {
        JSON.parse(value as string);
        return true;
    } catch (e) {
        return false;
    }
};
