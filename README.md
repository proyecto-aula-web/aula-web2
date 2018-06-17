 # Proyecto Aula
 Proyecto para la materia de **Ingenieria del Software**  de la Universidad de los Andes (ULA), Merida, Venezuela
 Aula es tu entorno educacional digital. Una plataforma para la educacion que reune a estudiantes y educadores en torno a conversaciones
 ***
  # Documentacion
  # Requisitos
  1. Sobre usuarios
    1.1 La plataforma debe permitir crear usuarios.
    1.2  Los usuarios pueden cumplir dos roles dentro de la plataforma, pueden ser instructores o pueden ser estudiantes. 
    1.3 El usuario que crea el curso se convierte inmediatamente en un Instructor.
    1.4 El Usuario instructor puede agregar otros instructores con quienes compartirán el espacio del curso. 
    1.5 El instructor debe ser quien agregue a los estudiantes al curso (agregar o eliminar estudiantes) 
    1.6 El instructor es quien debe crear la estructura del curso. Agrega los temas, subtemas, recursos y organiza de una manera sencilla el curso a dictar. 

 2. Sobre la estructura princial de la Plataforma
    2.1 Un curso debe ser una espacio colaborativo donde se encuentren los estudiantes y los instructores (al menos un instructor). 
    2.2 La estructura principal de un curso debe ser una lista completa de los temas que se verán durante el curso. 
    2.3 La estructura de un curso debe ser siempre visible para los participantes (instructores y estudiantes). y de fácil acceso. 
    2.4 Un tema debe ser visto como una unidad independiente dentro de la estructura del curso. 
    2.5 Un tema puede contener subtemas.
    2.6 A cada tema se le debe poder agregar contenido relacionado con el tema
    2.7 Los contenidos se deben agregar como publicaciones, en los que se deben poder adjuntar cualquier tipo de archivo de texto, educativo (Word, pdf, powerpoint,..), y archivos multimedia. 
    2.8 Se deben predefinir categorías que ayuden a mantener cierto orden entre los contenidos publicados. Algunas categorías sugeridas son: Clase digitalizada, Guía explicativa, Guía de Ejercicios,Información relacionada, de interés, o curiosidades relacionadas, Video Explicativo – (Link de enlace a un video que explique el tema), Tareas (propuestas por el instructor), Actividades (Propuestas por el instructor).
    2.9 El instructor debe poder crear un plan de evaluación donde identifique y relacione los temas con las evaluaciones. Dicho plan de evaluación al igual que la estructura del curso siempre debe estar visible para todos los usuarios (instructores y estudiantes).
    2.10 El instructor debe poder llevar un control sobre las notas que obtenga cada estudiante en cada evaluación dentro del curso. Ese control al que se puede asociar con una lista de notas solo debe visible como un todo por el instructor. Para cada estudiante solo debe ser visible sus calificaciones. 
    2.11 Las publicaciones deben estar identificadas: el nombre y el tipo de usuario que la realizo. 
    2.12 El instructor puede exportar la lista de calificaciones a un archivo en excel o pdf. 
    2.13 Cada una de las publicaciones debe tener la posibilidad de realizar comentarios. 
    2.14 Cada tema debe poder ser debatido por los estudiantes. Para ello, cada tema debe tener un chat por el que los estudiantes puedan comunicarse. 
    
 3. Sobre las Herramientas para los Instructores
    3.1 A manera general, la plataforma debe mostrar estadísticas sobre las notas obtenidas. Como por ejemplo : 
        * El promedio general de las notas.
        * Cuantos estudiantes han revisado los recursos.
        * Cantidad de estudiantes que revisan y son constantes en el uso de la plataforma.
        * Graficas de rendimiento de estudiantes en general y específicos.
    3.2 El instructor debe poder llevar un control de asistencia dentro de la plataforma y la plataforma debe mostrar el porcentaje de asistencia de cada estudiante. 
    3.3 El instructor debe poder exportar la lista de asistencias a un archivo en excel o pdf. 
    3.4 La plataforma debe tener integrado un sistema que le permita pasar asistencia de forma sencilla al instructor y guardar esa información. 
    3.5 La lista de asistencia como un todo solo debe ser visible para el instructor. Cada estudiante debe poder ver sus asistencias de forma individual. 
    3.6 La plataforma debe tener integrado un sistema en el que él instructor en un momento dado pueda indicar la cancelación de una clase y que todos los estudiantes sean notificados. 
    3.7 La plataforma debe tener un sistema que notifique a los estudiantes cuando el instructor hace un cambio en el plan de evaluación, es decir, con las fechas de las evaluaciones. 

4. Sobre las herramientas para los estudiantes
    4.1 La plataforma debe mantener a los estudiantes actualizados con las evaluaciones pendientes a través de notificaciones. 
    4.2 Los estudiantes deben tener un espacio donde puedan ver sus notas acumuladas en el curso y sus asistencias.
    4.3 La plataforma debe incentivar a que los estudiantes a que interactúen y participen en la creación de contenido asociados a los temas, desarrollando así la educación colaborativa.

## Iteracion Actual
## Tabla de Componentes-Requisitos
| Component | Descripcion | Requisitos Asociados |
| :--------- | -------------------- | --- |
|  Login Compoenet | Iniciar sesion en la plataforma   | 1.1  |        
|  Logup Compoenet | Registrarse en la plataforma   | 1.1  | 
|  new-course Compoenet | Crear un nuevo curso en la plataforma   | 1.3, 1.4, 1.5, 1.6, 2.1  | 
|  new-theme Compoenet | Crear temas dentro de un curso   | 1.6  | 
|  new-post Compoenet | Crear publicaciones dentro de un tema   |  2.6, 2,7, 2.8  | 


## Lista de tareas de la intetacion (Spring Backlog)

  | Compoenent | *Rquisito*       | *Tareas* | *Quien*  | *Estado* (No Iniciada, En Proceso,Completada) |
  | ---------- | ---------------- |:--------:| :------- | --------------------------------------------- |
  |     |     |    |    |
  |    |     |    |    |
  |    |     |    |    |
    
    
## Tablero de Tareas
| No Planificado | Mejora Continua      |
| -------------- | -------------------- |
|  |  |

| Pendiente | En curso | Hecho  |
|---------- | -------- | ------ |
|  |  |  |

Impediementos
| Pendiente | En curso | Hecho  |
|---------- | -------- | ------ |
|  |  |  |

Retrospectiva
| (+) Pluses | Deltas  |
|---------- | -------- |
|  |  |


  [Referencia y documentacion Spring Backlog](https://proyectosagiles.org/lista-tareas-iteracion-sprint-backlog/)


---

# Aula

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
