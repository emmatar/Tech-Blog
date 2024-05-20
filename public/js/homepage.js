const createComment = async (event) => {
  event.preventDefault();
  if (event.target.matches('button')) {
    const description = event.target.parentElement[0].value.trim();
    const blog_id = event.target.parentElement[0].dataset.id;

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
commentEl.forEach((comment) => {
  comment.addEventListener('click', createComment);
});
