// fetch predefined html 
export async function getHtml(url) {
    let response = await fetch(url);
    let res = await response.text();
    return res
}