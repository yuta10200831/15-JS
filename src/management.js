document.addEventListener('DOMContentLoaded', () => {
 fetchBlogPosts();
});

async function fetchBlogPosts() {
 const response = await fetch('http://localhost:8080/blogList.php');
 const blogs = await response.json();
 const blogList = document.getElementById('blogList');

 if (blogs.length === 0) {
     blogList.innerHTML = "<p>記事はありません</p>";
 } else {
     blogs.forEach(blog => {
         const blogElement = document.createElement('div');
         blogElement.innerHTML = `
             <h3 id="blogTitle_${blog.id}">${blog.title}</h3>
             <p id="blogContent_${blog.id}">${blog.content}</p>
             <button onclick="editBlog(${blog.id})">編集</button>
             <button onclick="deleteBlog(${blog.id})">削除</button>
         `;
         blogList.appendChild(blogElement);
     });
 }
}

function editBlog(id) {
 const blogTitle = document.getElementById(`blogTitle_${id}`).innerText;
 const blogContent = document.getElementById(`blogContent_${id}`).innerText;

 const editForm = document.getElementById('editForm');
 editForm.querySelector('input[name="id"]').value = id;
 editForm.querySelector('input[name="title"]').value = blogTitle;
 editForm.querySelector('textarea[name="content"]').value = blogContent;

 editForm.style.display = 'block';
 window.scrollTo(0, 0);
}

function deleteBlog(id) {
 console.log(`Deleting blog ${id}`);
 // 実際に削除機能を実装する際には、ここにコードを追加します。
}
