Buenas. Esta es la aplicación consumiendo la API de GitHub.

Herramientas usadas para el UI:
- `Tailwind` Para las clases
- `Tailwind Animated` Para las animaciones
- `Figma` Para el maquetado pdf:[Prueba - Git.pdf](https://github.com/krakatua/prueba-git/files/12386177/Prueba.-.Git.pdf)

Herramientas para testear:

- `Postman` Para el testeo de la api

Algunas dependencias:

- `Octokit`
- `Next-Auth`
- `React-Icons`

Para poder configurar y ejecutar el proyecto localmente, se necesita un Token Personal y una Aplicación OAuth.

Para conseguir el Token Personal:"


1. ![image](https://github.com/krakatua/prueba-git/assets/82242977/743083e6-438f-4576-96bb-7b48fd034270)
2. ![image](https://github.com/krakatua/prueba-git/assets/82242977/c21277a6-78cc-44a6-a20e-c7f812a6aa65)
3. ![image](https://github.com/krakatua/prueba-git/assets/82242977/8921c766-462e-4d01-9ae5-cb1b3e63406c)
4. Le das un nombre, seleccionas 'read only' y crear.
5. Ese código que se genera al darle al botón, guárdalo en un bloc de notas.



Para configurar el OAuth App:

1. Haz los mismos pasos que con el Personal Token hasta llegar aquí. ![image](https://github.com/krakatua/prueba-git/assets/82242977/533fcade-adbb-4158-8502-272e336f6bbb)

2. ![image](https://github.com/krakatua/prueba-git/assets/82242977/ff8dd44e-0dcb-44a7-ab49-40e10749c7ce)
3. Así debes tener los campos configurados para poder recibir los callbacks del API.
4. ![image](https://github.com/krakatua/prueba-git/assets/82242977/c8e6b0fa-2dd9-4258-934e-a46ad8852a71)
5. Guarda estas claves en un bloc de notas junto con el Token Personal. ![image](https://github.com/krakatua/prueba-git/assets/82242977/448b3caa-7c8e-4d95-8041-ce50c38c099a)

"Una vez que hayas hecho un clon del repositorio, crea un archivo `.env` con las claves que has guardado en el bloc de notas."

![image](https://github.com/krakatua/prueba-git/assets/82242977/f02afc19-8aa3-44d5-b99d-7957bbe40139)

1. `GITHUB_TOKEN` es el Token Personal.
2. `CLIENT_ID` es el ID del OAuth.
3. `CLIENT_SECRET` es el secreto del OAuth.
4. `NEXTAUTH_URL` es básicamente poner "http://localhost:3000".
5. `JWT_SECRET` se obtiene abriendo la terminal y escribiendo "openssl rand -base64 32" o usando este enlace: https://generate-secret.vercel.app/32.

Como último paso, abre la terminal y escribe `npm run dev`.




   




