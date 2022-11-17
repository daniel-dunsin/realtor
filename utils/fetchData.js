const baseUrl = "https://bayut.p.rapidapi.com"

export const fetchData = async (queries) => {

    const res = await fetch(`${baseUrl}${queries}`, {
        headers: {
            'X-RapidAPI-Key': '30c32567d8mshfc8636f6e8e4adbp19fb09jsn651e63ef42b7',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });
    const data = await res.json();

    return data
}