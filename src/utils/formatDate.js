export const formatDueDate = (dueDate) => {
    if (!dueDate) return ""; // Handle cases where dueDate is null or undefined
    const date = new Date(dueDate);
    const options = { month: "short", day: "numeric" }; // Format for "Apr 27"
    return date.toLocaleDateString("en-US", options);
  };