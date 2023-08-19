Buenas! Este es la app consumiendo la app de github.

Para poder configura y ejecutar el proyecto localmente se necesita un Personal Token y un OAuth App.

Para conseguir el Personal Token:


1. ![image](https://github.com/krakatua/prueba-git/assets/82242977/743083e6-438f-4576-96bb-7b48fd034270)
2. ![image](https://github.com/krakatua/prueba-git/assets/82242977/c21277a6-78cc-44a6-a20e-c7f812a6aa65)
3. ![image](https://github.com/krakatua/prueba-git/assets/82242977/8921c766-462e-4d01-9ae5-cb1b3e63406c)
4. Le das un nombre, seleccionas read only y crear.
5. Ese codigo que se genera al darle el boton guardarlo en un block de notas.


Para configurar el OAuth App:

1. Hacer los mismos pasos que el Personal Token hasta llegar Aqui. ![image](https://github.com/krakatua/prueba-git/assets/82242977/533fcade-adbb-4158-8502-272e336f6bbb)

2. ![image](https://github.com/krakatua/prueba-git/assets/82242977/ff8dd44e-0dcb-44a7-ab49-40e10749c7ce)
3. Asi debes tener los campos para poder recibir los callbacks del API
4. ![image](https://github.com/krakatua/prueba-git/assets/82242977/c8e6b0fa-2dd9-4258-934e-a46ad8852a71)
5. Guardar estas Keys en un block de Notas junto con el Personal Token ![image](https://github.com/krakatua/prueba-git/assets/82242977/448b3caa-7c8e-4d95-8041-ce50c38c099a)

Cuando se haya hecho un clone del repositorio crear un .env con las keys que tienen guardadas en el block de notas.

![image](https://github.com/krakatua/prueba-git/assets/82242977/f02afc19-8aa3-44d5-b99d-7957bbe40139)

1. GITHUB_TOKEN es el personal Token.
2. CLIENT_ID es el id del OAuth
3. Cliente_Secret es el id secreto del Oauth
4. Next Auth es basicamente poner un "http://localhost:3000"
5. JWT_SECRET se consigue abriendo el terminal y escribiendo "openssl rand -base64 32" o usar este link: https://generate-secret.vercel.app/32

La aplicacion podra correr. 



   




