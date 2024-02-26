const newBlogButton = document.querySelector('.new_blog');
const form = document.querySelector('.form');
const main = document.querySelector('.main');
const titleInput = form.querySelector('input[name="title"]');
const contentTextarea = form.querySelector('textarea[name="text"]');
const idInput = form.querySelector('input[name="id"]');
const blogListContainer = document.querySelector('.blog_list');

newBlogButton.addEventListener('click', () => {
    form.classList.add('block_form');
    form.classList.remove('none_form');
    main.classList.add('opacity');
    form.reset();
    idInput.value = '';
});

const fetchBlogs = async () => {
    const response = await fetch('http://localhost:8080/blogList.php');
    return response.json();
};

const blogOutput = async () => {
    const blogs = await fetchBlogs();
    blogListContainer.innerHTML = '';
    if (blogs.length === 0) {
        blogListContainer.innerHTML = "<p>記事はありません</p>";
    } else {
        blogs.forEach(({ id, title, content }) => {
            blogListContainer.insertAdjacentHTML('beforeend', `
                <div class='blog_content'>
                    <p class='mb-0 font-weight'>タイトル: ${title}</p>
                    <p class='mb-0 font-weight'>内容: ${content}</p>
                    <button class='edit_link' data-id='${id}'>編集</button>
                </div>
            `);
        });
        bindEditButtons();
    }
};

const bindEditButtons = () => {
    const editButtons = document.querySelectorAll('.edit_link');
    editButtons.forEach(button => {
        button.addEventListener('click', event => {
            const blogId = event.target.dataset.id;
            const blogContent = event.target.closest('.blog_content');
            const blogTitle = blogContent.querySelector('.mb-0.font-weight').textContent.replace('タイトル: ', '');
            const blogText = blogContent.querySelectorAll('.mb-0.font-weight')[1].textContent.replace('内容: ', '');

            titleInput.value = blogTitle;
            contentTextarea.value = blogText;
            idInput.value = blogId;

            form.classList.add('block_form');
            form.classList.remove('none_form');
            main.classList.add('opacity');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    blogOutput();
    newBlogButton.addEventListener('click', () => {
        form.reset();
        idInput.value = '';
    });
});

const addBlogButton = document.querySelector('.addBlog');
const returnButton = document.querySelector('.return');

addBlogButton.addEventListener('click', async () => {
    const formData = new FormData(form);
    const response = await fetch('http://localhost:8080/store.php', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        window.location.reload();
    } else {
        console.error('ブログの追加に失敗しました。');
    }
});

returnButton.addEventListener('click', () => {
    form.classList.remove('block_form');
    form.classList.add('none_form');
    main.classList.remove('opacity');
});

const updateBlogButton = form.querySelector('.updateBlog');
const backButton = form.querySelector('.back');

updateBlogButton.addEventListener('click', async () => {
    const formData = new FormData(form);
    const response = await fetch('http://localhost:8080/update.php', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        window.location.reload();
    } else {
        console.error('ブログの更新に失敗しました。');
    }
});

backButton.addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/index.php';
});
