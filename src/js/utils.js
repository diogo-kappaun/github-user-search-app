export function toggleClassNotAvailable(data) {
  const dataElement = document.querySelector(`.${data}-box`)
  const textContent = document.querySelector(`.${data}-box #${data}`).textContent;
  
  if (textContent === 'Not Available') {
    dataElement.classList.add('not-available')
  } else {
    dataElement.classList.remove('not-available')
  }
}