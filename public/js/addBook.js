const loadingComponent = document.getElementById('loadingOverlay');
loadingComponent.style.display = 'none';
function validateForm(event) {
  
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const author = document.getElementById('author').value.trim();
  const stock = document.getElementById('stock').value.trim();
  const image = document.getElementById('image').value.trim();
  const category = document.getElementById('category').value.trim();
  console.log({name,description,author,stock,image})

  const nameError = document.getElementById('name-error');
  const descriptionError = document.getElementById('description-error');
  const authorError = document.getElementById('author-error');
  const stockError = document.getElementById('stock-error');
  const imageError = document.getElementById('image-error');
  const categoryError = document.getElementById('category-error');

  nameError.style.display = !name ? 'block' : 'none';
  descriptionError.style.display = !description ? 'block' : 'none';
  authorError.style.display = !author ? 'block' : 'none';
  stockError.style.display = !stock ? 'block' : 'none';
  imageError.style.display = !image ? 'block' : 'none';
  categoryError.style.display = !image ? 'block' : 'none';

 
  if (!name||!description||!author||!stock||!image||!category) {
    event.preventDefault();
    return;
  }
  loadingComponent.style.display = 'flex';
  return;

}