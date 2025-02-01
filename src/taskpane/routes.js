import 'whatwg-fetch';

// const URL = "http://localhost:3030"
const URL = "https://addin.solidtecheg.com/api"

 
export async function getTags() {
  const response = await fetch(URL+'/tags');
  const data = await response.json();
  return data;

}
export async function getSnippets() {
  const response = await fetch(URL+'/snippets');
  const data = await response.json();
  return data;

}

export async function getTagByID( id ) {
  const response = await fetch(URL+'/tags/:${id}');
  const data = await response.json();
  return data;
}
export async function getSnippetByID( id ) {
  const response = await fetch(URL+`/snippets/${id}`);
  const data = await response.json();
  return data;
}
 
export async function getSnippetsByTagID( tag_id ) {
  const response = await fetch(URL+`/snippetswithtag/${tag_id}`);
  const data = await response.json();
  return data;
}


export async function setTag(tag_name) {
  const url = URL + `/tags`;
  const response = await fetch(url, {
    method: 'POST',
    // Add any necessary headers or body data here
    headers: {
      'Content-Type': 'application/json' // If sending JSON data
    },
    body: JSON.stringify({ tag_name }) // If sending JSON data in the request body
  });
  const data = await response.json();
  return data;
}
 
export async function setSnippetWithTag(snippet_name, content, tag_id) {
  const url = URL + `/snippets`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      snippet_name,
      content,
      tag_id
    })
  });
  const data = await response.json();
  return data;
}
 