export const getArticles = async topic => {
    const response = await fetch(
        `http://localhost:3001?q=${topic}`
    );
    const json = await response.json();
    return json;
};