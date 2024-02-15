const newBlog = document.querySelector('.new_blog');
const form = document.querySelector('.form');
const main = document.querySelector('.main');

newBlog.addEventListener('click', (event) => {
    form.classList.add('block_form');
    form.classList.remove('none_form');
    main.classList.add('opacity');
});

const fetchBlogs = async() => {
    const blogData = await fetch('http://localhost:8080/blogList.php');
    return blogData.json();
}

const blogOutput = async() => {
    const blogs = await fetchBlogs();
    const blogList = document.querySelector('.blog_list');
    if (blogs.length === 0) return blogList.innerHTML = "<p>記事はありません</p>";
    blogs.map(({title, content}) => {
        blogList.insertAdjacentHTML('beforeend', `<div class='blog_content'><p class='mb-0 font-weight'>タイトル</p><p class='mt-0'>${title}</p><p class='mb-0 font-weight'>内容</p><p class='mt-0'>${content}</p></div>`);
    })

}

blogOutput();
