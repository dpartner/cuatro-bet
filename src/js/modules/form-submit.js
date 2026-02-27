export function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // For demonstration purposes, log the data
  console.log('Form submitted:', data);

  // Here you would typically send the data to a server
  // fetch('/api/register', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
}
