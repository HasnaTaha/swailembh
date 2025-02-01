
import {initializeDatabase} from './database';

// insert to tag table

// const localDb = await initializeDatabase(); 
// async function addTag(tag) {
//     const localDb = await initializeDatabase(); 
//     localDb.run("INSERT INTO tags (tag) VALUES ( ?)", [
//         tag,
//     ], (err) => {
//         if (err) console.error("Error adding tag:", err);
//         else console.log("Tag added successfully!");
//     });
// }

//insert to snippets table
export async function addSnippetWithTag(name, content, tagId) {
    const localDb = await initializeDatabase(); 
    localDb.run("INSERT INTO snippets (name, content, tag_id) VALUES (?, ?, ?)", [
        
        name,
        content,
        tagId,
    ], (err) => {
        if (err) console.error("Error adding snippet:", err);
        else console.log("Snippet added successfully!");
    });
}

// select with tag
// async function getSnippetsByTag(tag, callback) {
//     const localDb = await initializeDatabase(); 
//     localDb.all(
//         `
//       SELECT snippets.id, snippets.name, snippets.content 
//       FROM snippets 
//       INNER JOIN tags ON snippets.tag_id = tags.id 
//       WHERE tags.tag = ?
//       `,
//         [tag],
//         (err, rows) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             callback(rows);
//         }
//     );

// }

// async function getTag() {
//     const localDb = await initializeDatabase(); 
//     localDb.all(
//         `
//       SELECT * 
//       FROM tags 
      
//       `,
       
//         (err, rows) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             callback(rows);
//         }
//     );

// }


// moDdule.exports = { addTag, addSnippetWithTag, getSnippetsByTag, getTag };
// module.exports = { addSnippetWithTag};
// exports :  addSnippetWithTag;

