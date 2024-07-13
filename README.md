# Microservicios de Emax Peluqueria ✂️

Este proyecto es una extensión del turnero que realicé para el M2 del Bootcamp de Henry. Es mi primera aplicación que realizo siguiendo la arquitectura de microservicios. Pueden haber fallos y cosas que no sean correctas, pero esto recién es el comienzo. ¡Espero que sea de su agrado!

## Descripción

El proyecto está completamente bajo el entorno de Node.js. Se usaron los frameworks de NestJs y Express.js. Emax Peluquería es una aplicación en la cual se puede reservar un turno en un negocio con infinita disponibilidad, siempre y cuando sea en el horario laboral que indica el negocio. También, en su página se pueden comprar artículos específicos del negocio. Todo esto es observable en un dashboard de usuario donde se encuentra tu historial de pagos, inclusive.

### Microservicios

1. **[API Gateway](https://github.com/emacuello/emax-peluqueria-gateway)**: Punto de entrada al backend, recibe las solicitudes del cliente y se encarga de repartir las tareas a los diferentes microservicios. A su vez, cuando se trata del pago, de usuarios de Google, y para la subida de imágenes de perfil de usuario, es este servidor el encargado de hacerlo.
2. **[Microservicio de Auth, Users y Appointments](https://github.com/emacuello/emaxpeluqueria)**: Se encarga de registrar a los nuevos usuarios en la base de datos encriptando sus contraseñas con Bcrypt, verificar sus credenciales y emitir sus respectivos JWT, crear, modificar y eliminar turnos para los usuarios.
3. **[Microservicio de Products](https://github.com/emacuello/shop-emaxpeluqueria)**: El microservicio de productos es el encargado de crear, eliminar y modificar los productos para el Ecommerce de la aplicación.
4. **[Microservicio de Emails](https://github.com/emacuello/mailms)**: El microservicio de correos electrónicos es el encargado de enviar emails cuando un usuario se registra, crea un turno, cancela un turno y realiza una compra exitosa.
5. **[Microservicio de AccessTokens](https://github.com/emacuello/apioauthtoken)**: Este microservicio se encarga de la creación del AccessToken necesario para que el microservicio de correos electrónicos funcione correctamente.

## Diagrama

![Diagrama de microservicios](https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/ypf5twyrewahtu3frvbf)

# Microservicio de AccessTokens

## Config

Para probar el Microservicio de AccessTokens es necesario crear un `.env` en la raíz del proyecto que tengan estos valores:

-   PORT = 1234
-   CLIENT_ID = clientid
-   CLIENT_SECRET = CLIENT_SECRET
-   REFRESH_TOKEN = REFRESH_TOKEN
-   REDIRECT_URL = REDIRECT_URL

## Descripción

El microservicio está creado en Express.js con JavaScript. Se encarga de la creación de Access Tokens cuando lo solicita el microservicio de envío de emails. Este microservicio se creó debido a problemas al desplegar el microservicio de emails, ya que la dependencia utilizada para la obtención de los Access Tokens, googleapis, no funcionaba correctamente en NestJS. Para levantar el servidor, llegaba a consumir más de 2GB de RAM, lo cual no era un problema en local, pero en un entorno de producción, como una imagen de Docker o en AWS EC2, era imposible de construir debido a los recursos limitados. Por esta razón, decidí separar la obtención del Access Token en otro microservicio y, para que fuera más ligero, decidí hacerlo en Express con JavaScript. Esta API está desplegada en Vercel.
