// get number of day
export const getDay = (date: string) => {
    const d = new Date(date);
    return d.getDay();
};

export const monthTitle = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', { month: 'short' }); // {month:'long'}
};

export const getYear = (date: string) => {
    const d = new Date(date);
    return d.getFullYear();
};
