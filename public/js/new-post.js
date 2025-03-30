/* VARIABLES */
const newPostButton = document.querySelector("#new-post");
const xPostButton = document.querySelector("#x-out");
const newPostSection = document.querySelector("#new-post-section");
const postNewPost = document.querySelector("#post-new-post-button");
const postTitleAlert = document.querySelector("#post-title-alert");
const postContentAlert = document.querySelector("#post-content-alert");
const postAlert = document.querySelector("#post-alert");

/* FUNCTIONS */
/* Show/hide new post prompts */
function toggleNewPostSection() {
  newPostSection.classList.toggle("hidden");
  newPostSection.classList.toggle("center");
}

/* Post new post */
async function submitNewPost() {
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;

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
    const response = await fetch("/api/content/post", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toggleNewPostSection();
      location.reload();
    } else {
      postAlert.classList.remove("hidden");
    }
  }
}

/* EVENT LISTENERS */
newPostButton.addEventListener("click", toggleNewPostSection);
xPostButton.addEventListener("click", toggleNewPostSection);
postNewPost.addEventListener("click", submitNewPost);
