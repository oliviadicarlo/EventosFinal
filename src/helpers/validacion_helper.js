import { REQUEST_URI_TOO_LONG } from "http-status-codes";

 export default class validacion
{
     validarEmail = (email) => {
       
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    validarProvincia = (longitude,latitude) =>
    {

        if(typeof(longitude) == 'string' || typeof(latitude) == 'string')
        {
            return "La longitud o la latitud no es un numeral";
        }
        else
        {
            return "Ok";
        }
    }

    ValidarCreacionEvento (max_assistance,CapacidadMax,price,duration_in_minutes) 
    {
        const capacidad_max = parseInt(CapacidadMax);
        if(max_assistance > capacidad_max)
        {
            return "La asistencia maxima no puede superar a la capacidad maxima";
        }
        else if (price < 0 || duration_in_minutes < 0)
        {
            return "El precio o la duracion en minutos deben ser mayor o igual a cero";
        }                           
        return true;
    }

    ValidarInscripcionEvento(max_assistance,max_capacity,start_date)
    {
        if(max_assistance == max_capacity)
        {
            return "El evento ya no posee cupos";
        }
        else if(start_date < Date.now() || start_date == Date.now())
        {
            return "No puedes ingresar a un evento que ya ocurrio o que tiene lugar el dia de la fecha";
        }
        return "Ok";
    }

    validarUpdateEvento(rating,Hora){

        if(rating < 1 || rating > 10)
        {
            return "El rating va de 1-10";
        }
        else if( Hora < Date.now())
        {
            return "No puedes ratear un evento que no termino aun";
        }
        return "Ok";
    }

    validarPostEventLocation(name,full_address,max_capacity)
    {   
        if(name.length < 3 || full_address.length < 3 ){
            return "El nombre o el adress debe tener longitud mayor a 3";
        }
        else if(max_capacity <= 0 )
        {
            return "La capacidad debe ser mayor a 0";
        }
        return "Ok";
    }

}

