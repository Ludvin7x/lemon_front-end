# react-frontend
Aplicación web desarrollada en REACT para un restaurante.
> [Ir a sitio web](https://restaurant-littlelemon.netlify.app/)

<details>
  <summary><b>Version 0.3 Project Assessment</b></summary>

  - **Front-End desarrollado**
</details>

<details>
  <summary><b>Version 0.2 Interacting with the API</b></summary>

  > Week 3, completado

  * Interacting With The Api
    - 14 de Noviembre 2023: Exercise: Connecting the bookings page to the API (completado)
    - 16 de Noviembre 2023:
      - Update the unit tests for the API queries
      - 17 de Noviembre 2023: Completed
      - Improving the experience
    - 17 - 18 de Noviembre 2023:
      - Exercise: Ensuring your application is accessible to users
      - Mejorar la interfaz
      - Eliminando el Footer (solo ocupa espacio)
      - actualizando el HomePage
      - actualizando Navbar
      - agregado versión para teléfonos
</details>

<details>
  <summary><b>Version 0.1 Table Booking System</b></summary>

  - Septiembre 9/2023: 1er prueba - modificar este archivo desde VS Code

  - Septiembre 22:
      - Creación de página web genérica
          - Uso de React Route / Path
          - Header/Nav/Footer
          - Route(Body)->BookingPage, Login, Home

  - Octubre 12 2023:
      - Se modificó Router para que lo maneje Main y Nav, ya que generaba problema el usar `props.availableTimes.map` en BookingForm, se modificó index.js debido a Router.
      - Funcionando todo hasta la lección Week 3 > Adding Table Booking state > Step 1
      - API como script ya no está disponible en línea, de todas formas, Chrome lo bloqueaba, ahora se agregó de forma local como api.js

  - Octubre 14/2023:
      - Week 3 -> Table Booking System completo
          - 1: Al inicio se muestran horas predeterminadas de `initializeTimes`, cuando se selecciona cualquier fecha, dispatch se acciona ejecutando `updateTimes` que modifica las horas (lo anterior se va a modificar en la próxima lección, para que las horas sean acorde a lo que el API devuelva en función de la fecha que el usuario seleccione).
          - 2: Se agregó Test a App.Test.js
          - 3: Se agregó la página Not Found 404

  - Octubre 15/2023:
      - Se modificó App.test.js:
          - 1: Que se renderice "Book Now"
          - 2: Que el selector muestre `initializeTimes`
          - 3: Que al elegir una fecha cambien los datos del selector según `updateTimes`
      - Las pruebas deberán ser modificadas cuando se integre la API
</details>
