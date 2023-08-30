

const form = document.getElementById('registration-form');

  
form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  const userData = {
    nombre: nombre,
    apellido: apellido,
    usuario: usuario,
    contrasena: contrasena
  };

  try { 
    const response = await axios.post('http://localhost:5000/registro', userData);
    console.log('Respuesta de la API:', response.data);
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }
}); 
