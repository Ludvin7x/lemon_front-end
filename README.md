# react-frontend
React front end capsone
Link de referencia:
https://github.com/mdalmamunit427/Meta-Front-End-Developer-Capstone-Booking-a-table-on-the-Little-Lemon-website

# Version 0.1 Table Booking System
-Septiembre 9/2023
1er prueba - modificar este archivo desde vs code

-Septiembre 22
    Creacion de pagina Web Generica
        Uso de React Route / Path
        Header/Nav/Footer
        Route(Body)->BookingPage, Login, Home

-Octubre 12 2023
    Se modifico Router para que lo maneje Main y Nav, ya que generaba problema el usar props.avialableTimes.map en BookingForm, se modico index.js debido a Router.
    Funcionando todo hasta la leccion Week 3 > Adding Table Booking state > Step 1
    API como script ya no esta disponible enlinea, de todas formas Chrome lo bloqueaba, ahora se agrego de forma local como api.js

-Octubre 14/2023
    Week 3 -> Table Booking System completo
        1{-al inicio se muestran horas predeterminadas de initializeTimes, cuando se selecciona cualquier fecha, dispatch se acciona ejecutando updateTimes que modifica las horas
          -lo anterior se va modificar en la proxima leccion, para que las horas sean acorde a lo que el API devuelva en funcion de la fecha que el usuario seleccione.
         }
        2{se agrego Test a App.Test.js}
        3{se agrego la pagina Not Found 404}
-Octubre 15/2023
    Se modifico App.test.js 1.que se renderize "Book Now", 2.Que el selector muestre initializeTimes, 3. que al elegir una fecha cambien los datos del selector segun updateTimes
    las pruebas deberan ser modificadas cuando se integre la API


# Version 0.2 Interacting with the API
Week 3
    Interacting With The Api
        -14 de Noviembre 2023
            completado-> Exercise: Connecting the bookings page to the API
        -16 de Noviembre 2023
            Update the unit tests for the API queries
        -17 de Noviembre 2023
            Completed
    Improving the experience
        -17 de Noviembre 2023
            Exercise: Ensuring your application is accessible to users
            Mejorar la interfaz
                Eliminando el Footer (solo ocupa espacio)
                actualizando el HomePage
                actualizando Navbar