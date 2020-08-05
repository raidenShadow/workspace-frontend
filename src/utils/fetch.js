export const fetchData = async ({ requestOptions, URL }) => {
    const response = await fetch(URL, requestOptions);
    const result = await response.json();
    return { result, response };
}