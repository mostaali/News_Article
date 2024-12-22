import { checkForUrl } from "./urlChecker";
const API_ENDPOINT = "https://localhost:8000/api";

// Select the form and attach a submit event listener
document.getElementById("urlForm").addEventListener("submit", processFormSubmission);

function processFormSubmission(event) {
  event.preventDefault();

  // Get input value
  const inputUrl = document.getElementById("name").value;

  // Check if the URL is valid before sending
  if (checkForUrl(inputUrl)) {
    submitUrlToServer(API_ENDPOINT, { url: inputUrl })
      .then((data) => {
        updateResults(data.score_tag);
      })
      .catch((err) => {
        console.error("Submission error:", err);
      });
  } else {
    console.warn("Invalid URL. Please provide a valid link.");
  }
}

// Function to send data to the backend
async function submitUrlToServer(endpoint, payload) {
  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const serverResponse = await fetch(endpoint, requestConfig);

    if (!serverResponse.ok) {
      throw new Error(`Server responded with a status: ${serverResponse.status}`);
    }

    return serverResponse.json();
  } catch (err) {
    console.error("Failed to communicate with server:", err);
    throw err;
  }
}

// Function to update the UI with server response
function updateResults(score) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.textContent = score || "No score provided";
}

// Exporting the primary function
export { processFormSubmission };