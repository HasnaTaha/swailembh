import { getTags, getSnippets, getTagByID, getSnippetByID, getSnippetsByTagID } from './routes';


const tagDropdown = document.getElementById('tag-dropdown');
const tagSnippetDropdown = document.getElementById('tag-snippet-dropdown');
const snippetList = document.getElementById('snippet-list');


let _selectedtagPromise = Promise.resolve(undefined);

export const selectedtagPromise = {
  get() {
    return _selectedtagPromise;
  },
  set(newPromise) {
    _selectedtagPromise = newPromise;
  }
};


let _selectedtagidPromise = Promise.resolve(undefined);

export const selectedtagidPromise = {
  get() {
    return _selectedtagidPromise;
  },
  set(newPromise) {
    _selectedtagidPromise = newPromise;
  }
};


export async function populateTags() {
  tagDropdown.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = '-- Choose a Tag --';
  tagDropdown.appendChild(defaultOption);
  const tags = await getTags();

  return new Promise((resolve) => {
    tags.forEach((tag) => {
      const option = document.createElement('option');
      option.value = tag.id.toString();
      option.textContent = tag.tag_name;
      tagDropdown.appendChild(option);
    });

    if (tags.length === 1) {
      tagDropdown.value = tags[0].id; // Set to the single tag's ID
      selectedtagidPromise.set(Promise.resolve(tags[0].id)); // Update the promise using the setter
    }
    resolve(); // Resolve the promise after appending options
  });
}

export async function populateTagsForSnippets() {
  tagSnippetDropdown.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = '-- Choose a Tag --';
  tagSnippetDropdown.appendChild(defaultOption);
  const tags = await getTags();

  return new Promise((resolve) => {
    tags.forEach((tag) => {
      const option = document.createElement('option');
      option.value = tag.id.toString();
      option.textContent = tag.tag_name;
      tagSnippetDropdown.appendChild(option);
    });

    if (tags.length === 1) {
      tagSnippetDropdown.value = tags[0].id; // Set to the single tag's ID
      selectedtagPromise.set(Promise.resolve(tags[0].id)); // Update the promise using the setter

    }
    resolve(); // Resolve the promise after appending options
  });
}

export async function populateSnippets(tagId) {
  snippetList.innerHTML = ''; // Clear current snippets
  const snippets = await getSnippetsByTagID(tagId);

  snippets.forEach((snippet) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div>  ${snippet.snippet_name} </div>
    <div> ${snippet.content} </div>
    <button class="insert-btn">Insert</button>
    `;
    snippetList.appendChild(li);
  });
}

export async function run(snippet) {
  return Word.run(async (context) => {
    // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph(snippet, Word.InsertLocation.end);
    await context.sync();
  });
}