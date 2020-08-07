lo primero es tener instala composer, php,mysql y node.js, se utilizara mysql con el usuario root y debe crearse una base de datos vacia con el nombre encuesta,para 
lo anterior es necesario instalar algun tipo de gestor tipo xampp o wampp,
una vez creado el usuario y la base de datos, se debe ingresar a la carpeta encuesta del proyecto, dentro de esta se debe iniciar un cmd y runear el comando 
"php artisan migrate", se ejecutara una serie de migraciones (creaciones de las tablas de bdd) y luego ejecutar el comando php artisan serve, y se dira que la aplicacion
 se inicio en http://127.0.0.1:8000, una vez realizado esto y con la aplicacion ya funcionando, se debe ingresar a la carpeta encuesta-fron, en la cual se encontrara
un proyecto de react.js, para runear este lo primero que necesitamos es runear el comando "npm install", luego runear el comando "npm start", una vez realizadas estas
acciones se debe esperar hasta que se abra el navegador, le mostrara una pantalla con login y registro, la idea de esto es que registre un usuario de cada tipo y luego
se logee con el, si se logea con un tipo admin, entonces vera un formulario y debajo de este una tabla con el listado de las encuestas enviadas importante, la tabla
no se recarga, por temas de tiempo tuve que hacerlo todo en el mismo archivo lo cual proboca que zustand (el state managment utilizado) no recarge el componente
especifico al cambio de estado, para poder logearse con otro usuario se debe dar click si o si en logout, ya que el token de autenticacion esta almacenado en
el local storage del navegador, si se logea con un tipo comun, solo le mostrara el formulario