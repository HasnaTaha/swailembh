import { getTags, setTag, setSnippetWithTag, getSnippets, getTagByID, getSnippetByID, getSnippetsByTagID } from './routes';
import { populateTags, populateSnippets, run, selectedtagidPromise, selectedtagPromise, populateTagsForSnippets } from './helper.js';

Office.onReady((info) => {

 

  // Populate tags in the dropdown
  const tagDropdown = document.getElementById('tag-dropdown');
  const tagSnippetDropdown = document.getElementById('tag-snippet-dropdown');

  // Event listener for tag selection
  tagDropdown.addEventListener('change', () => {

    const selectedTagId = parseInt(tagDropdown.value, 10);
    selectedtagidPromise.set(Promise.resolve(selectedTagId));

    // selectedtagidPromise.then(function () {
    (async () => {
      await populateSnippets(selectedTagId)
        ;
    })();
    // }
    // )
  });

  // Initialize tags on page load
  (async () => {
    await populateTags();
  })();
  (async () => {
    await populateTagsForSnippets();
  })();
  // Tab Switching
  const tabs = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      console.log("switching tabs")
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(panel => panel.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Add New Snippet
  const addSnippetBtn = document.getElementById('add-snippet-btn');
  const newSnippetInput = document.getElementById('new-snippet');
  const newSnippetNameInput = document.getElementById('new-snippet-name');

  tagSnippetDropdown.addEventListener('change', () => {
    const selectedTagId = parseInt(tagSnippetDropdown.value, 10);
    selectedtagPromise.set(Promise.resolve(selectedTagId));
  });

  addSnippetBtn.addEventListener('click', async () => {
    const snippetText = newSnippetInput.value.trim();
    const snippetName = newSnippetNameInput.value.trim();

    if (snippetText) {
      const selectedTagId = await selectedtagPromise.get(); // Wait for the promise to resolve

      if (selectedTagId) {
        setSnippetWithTag(snippetName, snippetText, selectedTagId);
        document.getElementById('new-snippet').value = "";
        document.getElementById('new-snippet-name').value = "";
      } else {

      }
    }
  });

  // Insert Snippet (placeholder function)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('insert-btn')) {
      const contentElement = e.target.parentElement.querySelector('div:nth-child(2)');
      const snippetText = contentElement.textContent.trim();
      run(snippetText);
    }
  });



  document.getElementById("add-tag-btn").addEventListener("click", async () => {
    const tagName = document.getElementById("new-tag").value.trim();
    if (tagName) {
      const tag = await setTag(tagName);
      if (tag && tag.id) {
        document.getElementById("new-tag").value = "";
        
        await populateTags();
        await populateTagsForSnippets();
      }
    }
  });
});