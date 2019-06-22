# Carrusel-con-Jquery
Un carrusel que permite mostrar elementos en modo carrusel, con controles para cambiar de elemento.
Se puede optar por usar los controles html que genera el carrusel o controlar que slider se muestra desde javascript gracias a los métodos que se proveen.

**NOTA:** Es escencial hacer referencia a jQuery antes de llamar el archivo con la libreria, de preferencia utilizar una verrión superior a la 3.0
  
  
 
# Instalación
**NOTA:** Las rutas de los archivos pueden cambiar dependiendo de la estructura de archivos de tu proyecto. 

Para poder utilizar el __carrusel__ es necesario cargar __jquery__, el archivo __js.js__ y el archivo __css.css__
Para llamar el archivo __css.css__ se puede ir al _<head>_ de un archivo html y colocar una línea como la siguiente

```
<head>  
  <link rel="stylesheet" href="css/css.css">
</head>
```
Ahora para cargar los archivos de javascript se puede ir antes del cierre de la etiqueta _body_ y cargar los scripts
```
<script src="js/jquery-3.4.1.js"></script>
<script src="js/js.js"></script>
<script>
    $(document).ready(function () {
      //Aquí podemos utilizar el carrusel
    });
</script>
``` 

# Manual de uso

Para poder utilizar el carrusel es necesario tener una estructura como la siguiente:
```
<div class="contenedor">
    <div class="activo">
        <p>Slider uno</p>
    </div>
    <div>
        <p>Slider dos</p>
    </div>
    <div>
        <p>Slider tres</p>
    </div>
    <div>
        <p>Slider cuatro</p>
    </div>
    <div>
        <p>Slider cinco</p>
    </div>
    <div>
        <p>Slider seis</p>
    </div>
</div>  
```
En esta estructura hay varias partes escenciales, la más importante es un **contenedor** con una clase o id único para identificar el elemento, en este caso es el div con la clase *contenedor*. 
Otro elemento son los hijos directos que el contenedor tiene dentro de si, estos representan cada elemento del carousel, dentro de estos hijos que en este caso son div's es dónde se colocará el contenido de casa slider, en este caso es una simple etiqueta p con texto indicando que slider se muestra. 
 
**Importante:** Debe ponerse atención en que uno de los dijos del **contenedor** tiene la clase _activo_, esta indica el elemento que se muestra por defecto, el elemento puede ser cualquiera sin importar el orden. Por ejemplo: Poemos colocar la clase en el _div_ que contiene el _p_ con el texto _Slider Seis_ y el slider funcionaría de forma correcta. 
La única excepción es no colocar más de un elemento con la clase _activo_, para prevenir esto el script se encarga de dejar sólo un elemento con la clase _activo_  

Para **inicializar** nuestro _carrusel_ debemos ir al código javascript y crear un objeto del tipo Carrusel de la siguiente forma. Además es ideal que este se guarde en una variable que en este caso se llamará _carrusel_ en minusculas.

```
<script>
    $(document).ready(function () {
      let carrusel = new Carrusel($(".contenedor") , {
        velocidad: 250,
      });
      carrusel.init();
    });
</script>
```

Nuestro Carrusel recibe 2 parametros, el primero es el contenedor de nuestro slider, seleccionado con jquery, es este caso el primer parámetro es _$(".contenedor")_,.
El segundo parámetro es un objeto que indicará configuraciones opcionales.
Estos parámetros son los siguientes y tienen los valores por defecto:
```
{
  velocidad: 400,
  controles: true
}
``` 
_velocidad_ nos indica la velocidad en milisegundos con la que se mueven los elementos al cambiar de slider
_controles_ cuando se le da el valor _false_ desactiva los controles y estos no se muestran, esto es especialmente útil cuando no se desea que el usuario tenga el control de que slider ve.

Ejemplo:
Supongamos que por alguna razón necesitamos que se llene un formulario con datos escenciales para que un usuario se registre, acto posterior al registro del usuario se desea que este pueda agregar su foto de perfil, para dividir esto en pasos creariamos el formulario de los datos escenciales en un slider y en otro crearíamos la funcionalidad para que el usuario agregue su foto de perfil.

No tendría sentido que el usuario primero suba su imagen sin haber dado siquiera su email u otros datos importantes. Algo que se puede hacer es ocultar los controles y a través de ajax enviar la información para que esta sea procesada y subida a la base de datos.
En caso de que se tenga éxito en el registro de la información ya podríamos mostrar el siguiente slider que contiene lo necesario para que este agregue su imagen de perfil.

Esto en código se vería más o menos así:

```

$.ajax({...}).done(function (respuesta) {
  /*Suponiendo que establecimos la información de retorno como un json podemos hacer algo como lo siguiente*/
  if(respuesta.hasOwnProperty("insertado")){ //si el json tiene la clave insertado
    if(respiesta.insertado) {  //si la clave insertado tiene como valor verdadero
      //Aqui es dónde podemos manipular la página
      carrusel.siguiente(); //llamamos al método siguiente para avanzar a la siguiente página
    }
  }
});

```

Además del método *siguiente*, tenemos el método *anterior* para manipular desde código el slider que se muestra. 


