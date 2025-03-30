/* VARIABLES */
const newCommentButton = document.querySelector("#new-comment");
const xCommentButton = document.querySelector("#comment-x-out");
const newCommentSection = document.querySelector("#new-comment-section");
const commentNewComment = document.querySelector("#post-new-comment-button");
const commentContentAlert = document.querySelector("#comment-content-alert");
const commentAlert = document.querySelector("#comment-alert");
const editPostSection = document.querySelector("#edit-post-section");
const xEditButton = document.querySelector("#edit-x-out");
const postEditedPost = document.querySelector("#post-edited-post-button");
const postTitleAlert = document.querySelector("#post-title-alert");
const postContentAlert = document.querySelector("#post-content-alert");
const postAlert = document.querySelector("#post-alert");

const username = document.querySelector("#post-username").dataset.username;
const url = window.location.href;
const regex = /post\/(\d+)/;
const postId = url.match(regex)[1];

/* FUNCTIONS */
/* Show/hide new comment prompts */
function toggleNewCommentSection() {
  newCommentSection.classList.toggle("hidden");
  newCommentSection.classList.toggle("center");
}

/* Show/hide edit post prompts */
function toggleUpdatePostSection() {
  const oldTitle = document.querySelector(".post-header h3").textContent;
  const oldContent = document.querySelector(".post-body p").textContent;
  const title = document.querySelector("#edit-post-title");
  const content = document.querySelector("#edit-post-content");

  if (editPostSection.classList.contains("hidden")) {
    title.value = oldTitle;
    content.value = oldContent;
  }
  editPostSection.classList.toggle("hidden");
  editPostSection.classList.toggle("center");
}

/* Post new comment */
async function submitNewComment() {
  const content = document.querySelector("#comment-content").value;

  // If issue with content, show error message
  // If comment properly formatted, create new post
  if (!content) {
    commentContentAlert.classList.remove("hidden");
  } else {
    commentContentAlert.classList.add("hidden");
    const response = await fetch("/api/content/comment", {
      method: "POST",
      body: JSON.stringify({ content, post_id: postId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toggleNewCommentSection();
      location.reload();
    } else {
      commenteAlert.classList.remove("hidden");
    }
  }
}

/* Update post */
async function updatePost() {
  const title = document.querySelector("#edit-post-title").value;
  const content = document.querySelector("#edit-post-content").value;

  if (!title) {
    postTitleAlert.classList.remove("hidden");
  } else {
    postTitleAlert.classList.add("hidden");
  }

  if (!content) {
    postContentAlert.classList.remove("hidden");
  } else {
    postContentAlert.classList.add("hidden");
  }

  if (title && content) {
    const response = await fetch(`/api/content/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toggleUpdatePostSection();
      location.reload();
    } else {
      postAlert.classList.remove("hidden");
    }
  }
}

/* Delete post */
async function deletePost(event) {
  // Delete post
  try {
    const response = await fetch(`/api/content/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Reload page or send failure message
    if (response.ok) {
      document.location.replace(`/dashboard/${username}`);
    } else {
      console.error("Failed to delete comment.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Delete comment */
async function deleteComment(event) {
  // Get comment and comment id
  const comment = event.target.closest(".comment");
  const commentId = comment.dataset.id;

  // Delete comment
  try {
    const response = await fetch(`/api/content/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Reload page or send failure message
    if (response.ok) {
      location.reload();
    } else {
      console.error("Failed to delete comment.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

/* EVENT LISTENERS */
newCommentButton.addEventListener("click", toggleNewCommentSection);
xCommentButton.addEventListener("click", toggleNewCommentSection);
commentNewComment.addEventListener("click", submitNewComment);
xEditButton.addEventListener("click", toggleUpdatePostSection);
postEditedPost.addEventListener("click", updatePost);
document.querySelectorAll("#edit-post").forEach((button) => {
  button.addEventListener("click", toggleUpdatePostSection);
});
document.querySelectorAll("#delete-post").forEach((button) => {
  button.addEventListener("click", deletePost);
});
document.querySelectorAll("#delete-comment").forEach((button) => {
  button.addEventListener("click", deleteComment);
});
