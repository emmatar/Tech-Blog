// add comment func
const createComment = async (event) => {
  event.preventDefault();
  if (event.target.matches('button')) {
    // console.dir(event.target);

    const description = event.target.parentElement[0].value.trim();
    const blog_id = event.target.parentElement[0].dataset.id;

    // console.log(description, blog_id)

    if (description && blog_id) {
      const response = await fetch('api/comments', {
        method: 'POST',
        body: JSON.stringify({ description, blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    }
  }
};

const commentEl = document.querySelectorAll('.comment-forum');
// console.log(commentEl)
commentEl.forEach((comment) => {
  comment.addEventListener('click', createComment);
});
