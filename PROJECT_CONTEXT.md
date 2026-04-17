Entregable
Prototipo visual + estructura del sistema.

Preparar


Cimientos y Definición del Problema


Diagnóstico del Contexto (Investigación)

Ubicación: La Unión, Nariño, Colombia. 
Sujeto: Pequeños y medianos negocios de ropa con baja familiaridad tecnológica.



Dimensión Emocional (El Factor Humano)
El dueño del negocio vive en un estado de estrés por incertidumbre. Al no tener datos claros, siente que no tiene libertad ni control sobre su tiempo. La digitalización se percibe como una "amenaza compleja" o algo lejano, lo que genera una barrera psicológica de resistencia.


Dimensión de Negocio (El Factor Operativo)
Existe un cuello de botella sistémico. La gestión manual (cuaderno/libreta) funciona al inicio, pero con el crecimiento, los flujos de datos se dispersan. La falta de métricas impide tomar decisiones informadas (qué comprar, a quién cobrar, cuánto se ganó realmente), estancando el potencial de rentabilidad.


Dimensión Técnica
Como desarrollador, el síntoma es claro: desorden de datos. El manejo de información en flujos separados (una hoja para ventas, otra para fiados, otra para inventario) hace que la integridad del sistema sea nula. El control manual no es escalable; es un sistema que tiende al desorden y al error humano.


Visión Sistémica (Componentes y Flujos)


Administración (Cerebro): Necesita visibilidad total. Su flujo requiere métricas para decidir, control de fiados para asegurar liquidez y gestión de catálogo para proyectar imagen.


Empleados (Ejecución): Necesitan agilidad quirúrgica. Su flujo es el contacto con el cliente; si el sistema es lento, el proceso de venta se rompe.


Inventario (El Recurso): Debe ser un componente automatizado. Si se gestiona manualmente, se generan fugas de dinero por olvidos o desorden.


Cliente (El Beneficiario): Busca una experiencia fluida. Un negocio que gestiona rápido su venta proyecta confianza y profesionalismo.

Falta de control general. Al crecer el volumen de datos, el cuaderno deja de ser una herramienta para convertirse en un obstáculo.


La Intención de KODA 
KODA nace como un Entorno de Resolución de Conflictos Digitales. La intención es transformar la "resistencia al cambio" en "confianza asistida".

El Puente de Transición
KODA propone una solución en dos capas:


Capa Tecnológica: Una plataforma intuitiva, minimalista e inmersiva que automatiza los flujos de inventario y ventas, eliminando la carga cognitiva de "aprender a usar un sistema difícil".


Capa Humana (El Acompañamiento): Entendemos que el primer paso es el más difícil. KODA ofrece soporte en la migración de datos históricos (del cuaderno al sistema) para reducir la fricción inicial y asegurar que el dueño no se sienta solo en el proceso.


Impacto


Tiempo: Reducción drástica de la carga de trabajo administrativa.

Economía: Crecimiento basado en datos reales de inversión, deuda y ganancia.

Control: Paz mental para el dueño, sabiendo exactamente qué sucede en su negocio en tiempo real. ItemOne — Descubrimiento + Propuesta


Definición Funcional


Solución
KODA será una web que se piensa extender como una PWA (Progressive Web App) de Gestión Minimalista. 

Alternativas


App Nativa


Ventajas:


Alto rendimiento

acceso total al hardware

Desventajas


Costo de desarrollo alto

fricción de descargar

Decisión: Descartada: los costos de desarrollo no son asumibkes ni por el desarrollador ni los negocios.  


Web Tradicional


Ventajas:


Acceso universal

sin instalación.

Desventajas


Dependencia total de internet

Decisión: Aceptada como primer MVP: debdio a el manejo de las tecnologías de desarrollo sera lo más viable, además se trata de búscar interesados en usar la herramienta, por defecto no se necesita algo exesibamente grande que genere cosaotos adicionles injustificados


PWA


Ventajas:


Instalación inmediata

offline parcial

ligera y multiplataforma

Desventajas


Acceso limitado a hardware avanzado

Decisión: Elegida: Combina la facilidad de una web con la presencia de una app. Es la solución más realista para el hardware de gama media local, solo se acoplara si la web  lo necesita a nivel negocio



Capas del negocio dentro del sistema


Capa 1: Clasificación (Categorías)


Función: Organización lógica (ej. Camisas, Pantalones, Accesorios).

Criterio: Facilita el filtrado en el POS y genera métricas de "qué categoría se vende más".


Capa 2: Identidad (Productos)


Función: El concepto del artículo (ej. "Camiseta Polo Classic").

Criterio: Aquí reside la información general, descripción y marca.


Capa 3: Especificación (Variantes)


Función: La realidad física (Talla: M, Color: Azul, Stock: 5).

Criterio: Es vital para negocios de ropa. El inventario se descuenta de la variante. 


Capa 4: Capital Humano (Empleados)


Función: Registro de quién realiza la acción.

Criterio: Permite al dueño delegar la venta sin perder el control. Cada transacción lleva la "firma" de un empleado. Esto resuelve el dolor emocional de la desconfianza y permite medir el rendimiento de ventas por persona.


roles: Simples (Admin/Vendedor). En negocios locales, demasiados permisos confunden. El vendedor solo vende y busca; el admin gestiona utilidades y deudas.

Historial de Sesión: El sistema debe registrar qué empleado hizo cada abono a un fiado para evitar disputas internas.


Capa 5: Transacción (Ventas y Salidas)


Función: El registro de ventas. Conecta el Inventario con el Dinero.

Criterio: Debe registrar: Variante vendida + Precio + descuento + Método de pago  + checar si es fiado.


Capa 6: Resolución (Créditos / Fiados)


Función: Gestión de la deuda pendiente.

Criterio: Si el pago no es total, la venta se vincula a un Actor: Cliente. Esto convierte una "Venta" en un "Saldo pendiente".


Capa 7: Escaparate Digital (Catálogo Público & WhatsApp)


Función: Capa de exposición externa.

Criterio: Es un "espejo" filtrado de la Capa 2.

Lógica del Botón WhatsApp: Al ser un entorno local, el cierre de venta ocurre en el chat. El catálogo genera un mensaje pre-formateado: "Hola, estoy interesado en el producto [Nombre] talla [X] color [Y]". Esto reduce la fricción para el consumidor final.


Sincronización en Tiempo Real: Si el empleado vende la última prenda en el local (Capa 4/5), el catálogo público (Capa 7) la marca automáticamente como "Agotado". Evitas que el cliente pregunte por WhatsApp por algo que ya no existe.

Marketing de Bajo Esfuerzo: El dueño no tiene que crear un catálogo aparte en PDF o Facebook. Al cargar el inventario para su control interno, ya está haciendo su marketing digital sin trabajo extra.


Relación de Actores en el Flujo


Administrador (El Arquitecto)
Es el dueño del negocio y quien configura el ecosistema. Su enfoque es estratégico.


Opera las Capas 1, 2, 3, 4 y 7:


Define la estructura (Categorías y Productos).

Gestiona el talento humano (Crea los perfiles de los Empleados).

Configura la visibilidad del Catálogo Público (qué se muestra y qué no). 

Supervisa la Capa 6: Tiene la última palabra sobre el estado de las deudas y los límites de crédito de los clientes.


Empleado (El Operador)
Se identifica en la Capa 4: El sistema sabe quién está trabajando.

Opera las Capas 5 y 6: Es el encargado de ejecutar la Venta (Capa 5) usando el buscador de variantes.


Registra los Abonos (Capa 6) cuando un cliente llega a pagar su deuda.

Nota: No edita productos ni ve utilidades globales; su interfaz es pura ejecución.


Cliente (El Consumidor / Actor Externo)
Navega la Capa 7: Interactúa con el Catálogo Público, selecciona lo que le gusta y dispara la intención de compra vía WhatsApp.

Genera la Capa 5 y 6: Al comprar, crea un registro de venta; si queda debiendo, se convierte en el titular de un saldo pendiente en la capa de resolución.


Sistema - KODA (El Motor Invisible)
Es el pegamento sistémico que garantiza que no haya errores humanos.


Automatiza la Capa 3: Actualiza el stock de las Variantes inmediatamente después de una acción en la Capa 5.

Sincroniza la Capa 7: Si una variante llega a cero, la oculta o la marca como "Agotada" en el catálogo público en tiempo real.

Notifica a la Capa 1: Genera las alertas de "bajo stock" para que el Administrador sepa qué comprar.

Ejemplo:


El Administrador carga una "chaqueta" (capa 1) tipo "Chaqueta Denim" (Capa 2) con 5 unidades en Talla M colo Negro (Capa 3).

Un Cliente ve la chaqueta en el Catálogo Público (Capa 7) y llega al local.

El Empleado (Capa 4) escanea la prenda, aplica un descuento del 10% y registra la Venta (Capa 5).

KODA descuenta la unidad de la Talla M (Capa 3) y actualiza el Catálogo (Capa 7) avisando que ahora solo quedan 4.

Si el cliente no tiene todo el dinero, el Empleado marca el resto como Fiado (Capa 6), vinculando la deuda al perfil del cliente para que el Administrador lo vea en su reporte nocturno.


Arquitectura Multi-tenant de KODA


Base de Datos
Cada tabla en la base de datos (Productos, Ventas, Empleados) tendrá una columna obligatoria: tenantId



Lógica: Cuando el sistema busca un dato se agregar la condicional del identificador del negocio.

Rendimiento: Crear un Índice Compuesto en la base de datos que combine el tenantId con el id del producto. Esto hace que, aunque hayan miles de registros de 100 tiendas, la base de datos encuentre la información de un local específico en milisegundos.


Backend
se usá un Middleware de Contexto para que siempre se agrege el condicional que identifica a cada negocio:


Identificación: KODA detectará quién está pidiendo la información mediante el subdominio o el token de sesión del usuario.

Inyección de Contexto: El backend inyectará automáticamente el ID del negocio en cada consulta. 


Frontend


Dashboard Administrativo/POS: Una interfaz de alto rendimiento, enfocada en la velocidad.

Catálogo Público: Una interfaz ligera, visual y optimizada para móviles, donde el tenantId define los colores, el logo y el número de WhatsApp al que llegan los pedidos.


Arquitectura global del sistema
las 7 capas del negocio definidas manual de operación de cada tienda, la Arquitectura Multi-tenant es el sistema operativo que permite que esas tiendas existan. Organización:



Arquitectura Multi-tenant: El Núcleo del SaaS (Gestión Global)
Esta no sabe cuántos productos tiene cada tienda, pero sabe perfectamente si la Tienda A está activa, cuánto paga y quién es su dueño.



componentes del SaaS


Gestor de Inquilinos (Tenant Manager): Es el registro de los negocios. Se encarga de la creación, suspensión y archivado de las tiendas.

Motor de Suscripciones (Billing Engine): Gestiona los ciclos de pago.


Lógica: No solo cobra, sino que define el Estado del Negocio:



Estado: Onboarding / ACTIVO


Acción del SaaS:  Proceso de registro y configuración inicial.

Acceso a las 7 Capas: Abierto

Estado: Activo / ACTIVO


Acción del SaaS: suscripción al día (50k COP)

Acceso a las 7 Capas: Acceso total.


Estado: Periodo de Gracia / MORA


Acción del SaaS: Pago vencido, 3 días de retraso

Acceso a las 7 Capas: Acceso total + Alerta visual


Estado: Solo Lectura / MORA


Acción del SaaS: Pago vencido, >5 días

Acceso a las 7 Capas: Pueden ver datos, pero no registrar ventas ni abonos


Estado: Suspendido / SUSPENDIDO


Acción del SaaS: Incumplimiento prolongado

Acceso a las 7 Capas: Acceso bloqueado. Data guardada por 6 meses.


Consola de Control (Super-Admin): Tablero personal. Aquí es donde el admin del sistema monitorea la salud global: cuántos negocios hay, cuánto dinero entra y si hay errores en el servidor.

Capa de Autenticación Unificada (Global Auth): Un solo servicio de login que identifica si el usuario es un "Dueño" (acceso al SaaS) o un "Empleado" (acceso solo al Negocio).


¿Por qué asi?
esta parte es la encargada de verificar el  tenantId antes de que cualquier petición llegue a las 7 capas inferiores. Es quien revisa la identidad del negocio.


El Mapa Mental de la Solución


Arquitectura Multi-tenant: Gestión de Suscripciones, Auth Global, Facturación del servicio.

Arquitectura para los negocios registrados


Capa 1 (Categorías): Organización de stock.

Capa 2 (Productos): Catálogo base.

Capa 3 (Variantes): Talla y Color (Stock real).

Capa 4 (Empleados): Identidad del operador.

Capa 5 (Ventas): Transacción económica.

Capa 6 (Fiados): Resolución de deudas.

Capa 7 (Público): Visibilidad externa (WhatsApp).





Requisitos Funcionales y No Funcionales: Lo que el sistema hace y cómo se siente (velocidad, seguridad, offline).


Requisitos Funcionales (Qué hace el sistema)


RF0 (Multi-tenant - SaaS): 


RF0.1: El Super-Admin debe poder registrar manualmente un nuevo negocio en la base de datos (Nombre del local, Dueño, Teléfono) y también un negocio se peude registra desde la landing de el saas.

RF0.2: El sistema debe proveer un login unificado. Si entra el Dueño, ve el Dashboard y configuración; si entra el Empleado, va directo a la pantalla de Ventas (Capa 5).

RF0.3: El sistema debe restringir el acceso a la cuenta si el estado de la suscripción cambia a "Suspendido" (modificable solo por el Super-Admin en caso de algún error del sistema sino solo se cambiara sis e cancela la susccripción).


RF1 (Categorías): 


RF1.1: El Administrador debe poder crear, editar y eliminar (CRUD) categorías (Ej: "Camisas", "Jeans", "Accesorios").

RF1.2: El sistema no debe permitir eliminar una categoría si hay productos vinculados a ella.

Al confirmar una venta, el sistema debe descontar de manera atómica el stock específico de la variante (talla/color) seleccionada, no del producto general.


RF2 (Productos (Catálogo Base): 


RF2.1: El Administrador debe poder crear un producto asignándole los datos requeridos.

RF2.2: El sistema debe permitir editar el producto

RF2.3: El sistema no debe permitir eliminar un producto si hay variantes vinculadas a ella.


RF3 (Variantes): 


RF3.1: El Administrador debe poder agregar variantes a un producto definiendo "Talla", "Color", "Costo de Compra" y "Cantidad inicial en stock".

RF3.2: El sistema debe actualizar el stock automáticamente sumando o restando unidades cuando ocurra una entrada manual (compras) o una salida (ventas).

RF3.3: El sistema debe mostrar una alerta visual cuando el stock de una variante llegue a 2 o menos unidades.

RF3.4: El sistema debe permitir definir el Precio de Venta en esta capa.


RF4 (Empleados)


RF4.1: El Administrador debe poder crear perfiles de empleados con Nombre y un PIN de 4 dígitos para acceso rápido.

RF4.2: El sistema debe registrar qué empleado en turno realizó cada venta o recibió cada abono.


RF5 (Transacción)


RF5.1: El Empleado debe tener un buscador predictivo que encuentre productos/variantes por nombre.

RF5.2: El sistema debe permitir aplicar un descuento manual (en porcentaje o valor exacto) y sumar el total.

RF5.3: El sistema debe ofrecer 3 métodos de cierre de venta: Efectivo, Transferencia (Nequi/Banco) y Fiado (Crédito local).

RF5.4: Al confirmar la venta, el sistema debe descontar el stock de la variante (Capa 3) de manera inmediata.


RF6 (Resolución (Fiados))


RF6.1: Al seleccionar método de pago "Fiado" (RF5.3), el sistema debe obligar a seleccionar o crear un Cliente (Nombre y Teléfono).

RF6.2: El sistema debe tener una vista dedicada para "Deudas", mostrando la lista de clientes con saldo pendiente.

RF6.3: El sistema debe permitir registrar un "Abono" a la deuda de un cliente, actualizando el saldo pendiente y guardando el historial (Fecha, Monto, Empleado que lo recibió).


RF7 (Catálogo Público (WhatsApp))


RF7.1: El sistema debe generar una vista pública de solo lectura que muestre los productos de la Capa 2 que tengan stock mayor a 0 en la Capa 3.

RF7.2: Cada producto en el catálogo debe tener un botón que redirija al WhatsApp del negocio con un mensaje pre-armado.


Requisitos No Funcionales (Cómo se comporta)


Seguridad y Multi-Tenant


RNF-S1: Aislamiento de Datos: Todo endpoint del backend (/api/...) debe validar obligatoriamente el tenantId extraído del token de sesión. Un usuario nunca debe poder consultar IDs por URL (ej: prohibido /api/ventas?negocio=2).


Rendimiento y Latencia


RNF-R1: Búsqueda Instantánea: La consulta de productos en la vista de POS (Ventas) debe retornar resultados en menos de 300ms. (cachear el catálogo en el navegador al iniciar turno).

RNF-R2: Carga Inicial Ligera: El "First Contentful Paint" (FCP) de la pantalla de Ventas debe ocurrir en menos de 1.5 segundos en redes 3G, minimizando el envío de librerías JavaScript pesadas.


Experiencia de Usuario (UI/UX) y Minimalismo


RNF-UX1: Regla de los 3 Clics: El flujo desde buscar una prenda hasta cobrar en efectivo en el POS no debe superar los 3 clics/toques en pantalla.

RNF-UX2: Ley de Fitts para Móviles: Todos los botones de acción principal (Cobrar, Agregar, Buscar) deben tener un área mínima táctil de 48x48 píxeles.

RNF-UX3: Contraste Operativo: La paleta de colores del POS debe garantizar un ratio de contraste alto para ser legible en pantallas de celular con brillo bajo o reflejos de luz solar.


Resiliencia Web


RNF-W1: Manejo de Caídas de Red: Si el usuario presiona "Cobrar" y no hay conexión a internet, el sistema debe bloquear el botón, no refrescar la página, y mostrar un Toast rojo: "Sin conexión. Espera a que vuelva el internet para registrar la venta".

RNF-W2: Atomicidad de Base de Datos: Si una venta involucra crear un cliente nuevo y descontar stock, ambas acciones deben ocurrir en una sola Transacción SQL. Si falla el descuento de stock, no se debe registrar al cliente ni la venta.





Historias de Usuario (User Stories)


SaaS (Administración Global)
Historia: Como Dueño de KODA, quiero dar de alta un nuevo negocio en la base de datos, para que el comerciante pueda acceder a su instancia privada y empezar a configurar su tienda.


Criterio de Aceptación: El sistema debe generar un tenantId único y asignar un usuario con rol de "Admin" vinculado a ese ID.


Capa 1: Categorías
Historia: Como Administrador de negocio, quiero agrupar mis prendas por tipos (ej. Camisetas, Jeans), para que tanto en el catálogo público como en el punto de venta sea más fácil localizar lo que busco.


Criterio de Aceptación: El sistema debe permitir filtrar productos por categoría y no permitir borrar categorías que tengan productos activos.


Capa 2 y 3: Productos y Variantes (La Verdad del Stock)
Historia: Como Administrador de negocio, quiero crear un producto y asignarle múltiples variantes de talla y color, para que el inventario refleje cuántas unidades reales tengo de cada prenda específica.


Criterio de Aceptación: Al crear una variante (ej. Talla M, Color Negro), el stock debe ser independiente de otras variantes del mismo producto.


Capa 4: Empleados 
Historia: Como Administrador de negocio, quiero crear perfiles para mis vendedores con un código de acceso simple, para saber quién realizó cada venta/abonos y evitar errores en el cierre de caja.


Criterio de Aceptación: El sistema debe marcar cada transacción (Capa 5) con el ID del empleado que tiene la sesión iniciada.


Capa 5: Transacción / ventas
Historia: Como Empleado, quiero registrar una venta seleccionando el método de pago (Efectivo o Transferencia), para que el sistema descuente el stock y guarde el registro del ingreso de dinero.


Criterio de Aceptación: El sistema debe permitir cerrar la venta en máximo 3 pasos y mostrar un resumen final del total cobrado.


Capa 6: Resolución (Gestión de Fiados)
Historia: Como Administrador, quiero ver una lista de clientes con saldos pendientes y registrar abonos a sus deudas, para recuperar el capital del negocio y mantener la relación de confianza con el cliente.


Criterio de Aceptación: Al registrar un abono, el sistema debe restar el monto del saldo total y guardar la fecha del pago para seguimiento.
 

Capa 6: catálogo Público (WhatsApp)
Historia: Como Cliente, quiero ver las fotos y tallas disponibles de la tienda desde mi celular, para poder enviar un mensaje de WhatsApp preguntando por una prenda específica de forma directa.


Criterio de Aceptación: El catálogo debe ocultar automáticamente variantes con stock 0 y el botón de WhatsApp debe incluir el nombre del negocio y de la prenda en el mensaje.






Casos de Uso


Nivel SaaS: Administración Global


UC1


caso de uso: Alta de Negocio

Actor: Super-Admin

Descripción: registra un local (en caso de ser neecsario), se asigna un tenantId y se crea el primer usuario Admin. Si el correo del dueño ya existe, el sistema impide el registro duplicado.


UC2


caso de uso: Suspensión de Servicio

Actor: Super-Admin

Descripción: Bloqueo de acceso por falta de pago.El sistema permite el login pero redirige según el estado en que se encuentre


Nivel Negocio: Gestión de Operaciones


Capa 1, 2 y 3: Catálogo e Inventario


UC1


caso de uso: Creación de Producto

Actor: Admin

Descripción: Registro de datos y categoría.

Camino Alterno: Si la categoría no existe, el sistema obliga a crearla primero (Capa 1)

UC2


caso de uso: Ajuste de Stock

Actor: Admin

Descripción: Entrada manual de mercancía por compra a proveedores o devolución.

Camino Alterno: El sistema debe registrar una "nota de ajuste" para no confundirlo con una venta.


UC3


caso de uso: Alerta de Stock Bajo

Actor: Sistema / Admin

Descripción: Notificación visual cuando una variante (talla/color) llega al mínimo

Camino Alterno: Si el stock es 0, el sistema oculta automáticamente la variante en el Catálogo Público (Capa 7).


Capa 4: Empleados


UC1


caso de uso: Cambio de Turno 

Actor: Empleado

Descripción: El vendedor ingresa su PIN para empezar a registrar ventas.

Camino Alterno: Si el PIN es incorrecto 3 veces, el sistema bloquea el acceso por 1 minuto por seguridad y notificar al admin.


Capa 5: Transacción / ventas


UC1


caso de uso: Venta Rápida

Actor: Empleado

Descripción: Búsqueda, selección de variante y cobro en efectivo/transferencia.

Camino Alterno: Venta Fallida, Si el internet se cae durante el proceso, el sistema retiene el flujo y espera reconexión.


UC2


caso de uso: Aplicación de Descuento

Actor: Empleado

Descripción: Reducción del precio final por promoción o fidelidad.

Camino Alterno: el Empleado puede colcoar un Descuento por compra


Capa 6: Resolución de Fiados


UC1


caso de uso: Apertura de Crédito

Actor: Empleado

Descripción: Registro de venta con pago $0 o parcial, vinculada a un Cliente.

Camino Alterno: Si el Cliente ya tiene una deuda vencida (>30 días), el sistema arroja una alerta de Riesgo de Impago.


UC2


caso de uso: Registro de Abono

Actor: Empleado

Descripción: El cliente paga una parte de su deuda en el local.

Camino Alterno: Si el abono es mayor a la deuda, el sistema arroja una alerta


Capa 7: catálogo Público (WhatsApp)


UC1


caso de uso: Consulta de Catálogo

Actor: Cliente

Descripción: Navegación por categorías, productos y variantes desde el navegador.

Camino Alterno: Si el producto se agotó mientras el cliente navegaba, al dar clic en WhatsApp el sistema avisa Producto Agotado.


UC2


caso de uso: Intención de Compra

Actor: Cliente

Descripción: Envío de mensaje pre-formateado al dueño del local.

Camino Alterno: Si el negocio no configuró su número de WhatsApp, el botón se oculta automáticamente.

Reglas de Negocio


Atomicidad: Una venta no se considera exitosa hasta que el stock se descuenta Y el registro de venta se crea. Si una falla, la otra no ocurre.

Identidad: Ninguna transacción (Capa 5 o 6) puede existir sin un employeeId (Capa 4) y un tenantId.

Transparencia: El historial de abonos (Capa 6) no se puede borrar, solo se pueden crear "registros de corrección" para mantener la trazabilidad contable.






Diseño de Base de Datos (ERD)


plans [ED | GLOBAL]
Define las ofertas del SaaS.


planId ———————————— [PK] [CUID] [UNIQUE]

name —————————————— [VARCHAR(50)] (Ej: 'Emprendedor', 'Empresarial')

description—————————————— [VARCHAR(100)] 

price ————————————— [DECIMAL(10,2)]

interval —————————— [ENUM('monthly', 'yearly')]

updatedAt —————————— [TIMESTAMP]

createdAt —————————— [TIMESTAMP]


subscriptions [ED | GLOBAL]
El "contrato" activo. Vincula un negocio con un plan y define fechas de corte.


subscriptionId ————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID] [UNIQUE]

planId ————————————— [FK] [CUID]

startDate —————————— [TIMESTAMP]

endDate ———————————— [TIMESTAMP] (Fecha en la que expira el acceso)

status ————————————— [ENUM('active', 'pastDue', 'canceled')]

updatedAt —————————— [TIMESTAMP]

createdAt —————————— [TIMESTAMP]


saasTransactions [ED | GLOBAL]
Permite métricas de ingresos globales.


transactionId —————— [PK] [CUID] [UNIQUE]

subscriptionId ————— [FK] [CUID]

amount ————————————— [DECIMAL(10,2)]

paymentDate ———————— [TIMESTAMP]

paymentMethod —————— [ENUM('cash', 'transfer', 'online')]

reference —————————— [VARCHAR(255)] (Ej: "Nro de comprobante Nequi")


tenants [ED | GLOBAL]
Representa a cada negocio registrado en el sistema. Es la raíz de la multi-tenencia.


tenantId —————————— [PK] [CUID] [UNIQUE]

businessName —————— [VARCHAR(100)]

description —————— [TEXT]

type -------------- [ENUM(ropa)]

whatsApp -----------[CHAR(10)]

slug —————————————— [VARCHAR(50)] [UNIQUE]

status ———————————— [ENUM('noVerify', 'active', 'mora', 'suspended')]

createdAt —————————— [TIMESTAMP]

updatedAt —————————— [TIMESTAMP]
Nota: El slug es vital para generar la URL del catálogo público (Capa 7).


users [ED | GLOBAL/LOCAL]
Usuarios con acceso al sistema (Dueño o Empleados). Vinculados a un negocio.


userId ———————————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID] [NULLABLE] (Null para el SuperAdmin)

role —————————————— [ENUM('superAdmin', 'admin', 'employee')]

name —————————————— [VARCHAR(100)]

email ————————————— [VARCHAR(50)] [UNIQUE]

password —————————— [VARCHAR(255)]

createdAt —————————— [TIMESTAMP]

updatedAt —————————— [TIMESTAMP]


categories ———————— [ED | EC]
Capa 1. Clasificación lógica de los productos de cada negocio.


categoryId ———————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID]

name —————————————— [VARCHAR(50)]

createdAt —————————— [TIMESTAMP]

updatedAt —————————— [TIMESTAMP]


products [ED | EC]
Capa 2. Identidad base del producto para el catálogo público.


productId ————————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID]

categoryId ———————— [FK] [CUID]

name —————————————— [VARCHAR(100)]

description ——————— [TEXT]

isPublic —————————— [BOOLEAN] [DEFAULT TRUE]

gender------------ENUM('hombre', 'mujer', 'mixto')

createdAt----------[TIMESTAMP]  

updatedAt---------[TIMESTAMP] 


variants [ED]
Capa 3. La realidad física del stock (Tallas y Colores).


variantId ————————— [PK] [CUID] [UNIQUE]

productId ————————— [FK] [CUID]

sku ——————————————— [VARCHAR(50)]

size —————————————— [VARCHAR(20)]

color ————————————— [VARCHAR(20)]

stock ————————————— [INT] [DEFAULT 0]

price ————————————— [DECIMAL(10,2)] (Precio de venta)

cost —————————————— [DECIMAL(10,2)] (Precio de compra - Solo Admin)

popularity-------[INT UNSIGNED DEFAULT 0]

createdAt----------[TIMESTAMP]  

updatedAt---------[TIMESTAMP] 


customers [ED]
Capa 6. Clientes del negocio, principalmente para el manejo de deudas.


customerId ———————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID]

name —————————————— [VARCHAR(100)]

phone ————————————— [VARCHAR(20)]

totalDebt ————————— [DECIMAL(10,2)] [DEFAULT 0] 


payments [ED]
Historial de abonos realizados por un cliente para reducir su deuda. Es la contraparte de una venta a crédito.


paymentId ————————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID]

customerId ———————— [FK] [CUID]

amount ————————————— [DECIMAL(10,2)] (Monto que el cliente entrega)

paymentMethod ————— [ENUM('cash', 'transfer')]

note ——————————————— [VARCHAR(255)] [NULLABLE] (Ej: "Abono de la quincena")

createdAt —————————— [TIMESTAMP]


sales [ED]
Capa 5. Cabecera de la transacción de venta.


saleId ———————————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID]

userId ————————————— [FK] [CUID] (Empleado que vendió)

customerId ———————— [FK] [CUID] [NULLABLE] (Obligatorio si es fiado)

total ————————————— [DECIMAL(10,2)]

paymentMethod ————— [ENUM('cash', 'transfer', 'debt')]

createdAt —————————— [TIMESTAMP]


saleItems [ED]
Detalle de los productos vendidos en una transacción.


itemId ———————————— [PK] [CUID] [UNIQUE]

saleId ———————————— [FK] [CUID]

variantId ————————— [FK] [CUID]

quantity —————————— [INT]

priceAtSale ——————— [DECIMAL(10,2)] (Precio capturado al momento)


aboutUs [ED]
Información de branding de cada negocio para su catálogo público.


aboutId ——————————— [PK] [CUID] [UNIQUE]

tenantId ——————————— [FK] [CUID]

logo —————————————— [VARCHAR(255)]

socialLinks ——————— [JSON] (Instagram, Facebook, etc.)





Arquitectura Inicial de Software


Stack Tecnológico Propuesto


Framework: Next.js (App Router) — para manejar el Frontend y las API Routes en un solo lugar.

Lenguaje: TypeScript — para evitar errores de tipos en las deudas y el stock.}

Base de Datos: Postgres Neon, Fiabilidad para transacciones financieras (ventas/deudas)

ORM: Prisma — para interactuar con la base de datos

estado: zustand
Autenticación: Auth.js — para gestionar los roles .

Estilos y UI: Tailwind CSS + GSAP — para lograr esa estética minimalista y transiciones fluidas.


Arquitectura: Monolito


Eficiencia de Recursos (Overhead Mínimo): la comunicación entre módulos es instantánea (llamadas a funciones).

Velocidad de Desarrollo (Time-to-Market): para el MVP se necesita iterar rápido. Refactorizar código entre carpetas es mucho más veloz que cambiar contratos de APIs entre servicios independientes.

Consistencia de Datos: Al estar en un solo proyecto con una sola base de datos (TiDB/Postgres), las transacciones son atómicas y simples. N


Arquitectura de Despliegue (Infraestructura)


Frontend y Backend (App): Vercel. Al usar Next.js, las rutas de la API se despliegan automáticamente como Serverless Functions. Es rápido, global y tiene un despliegue por cada "push" a GitHub.

Base de Datos: Neon
Postgres Serverless. Rápido y confiable para los datos de La Unión.

Almacenamiento: Cloudinary
Para las fotos de las prendas

Validación: Zod
En los controladores para que no entre basura a los servicios.

Flujo de Despliegue:


Código: GitHub (Repositorio único).

CI/CD: Vercel detecta el cambio -> Corre tests -> Despliega.

Conexión: La App se conecta a la BD Postgres en Neon mediante una Connection Pool para manejar los picos de tráfico de los negocios.


Estructura de Carpetas (Arquitectura por Capas)
el código se organizara siguiendo una lógica de "Feature-based Architecture" (Arquitectura basada en funcionalidades). Esto evita que el proyecto se vuelva un desorden.
src/
├── app/          
│   ├── api/              # API ROUTES (Los "Entry Points") 
│   │ ├── saas/         # Rutas globales (planes, suscripciones) 
│   │   └── [tenantId]/   # Rutas por negocio (ventas, productos)               
│   ├── (auth)/           # Login y registro
│   ├── (dashboard)/      # Rutas protegidas para Admin/Empleado
│   └── [slug]/           # Catálogo público dinámico (ej: koda.app/tienda-1)
├── components/           # Componentes UI reutilizables
│   ├── ui/               # Botones, inputs, modales (shadcn/ui)
│   ├── pos/              # Componentes específicos del Punto de Venta
│   └── shared/           # Navbar, Footer
├── core/                 # La "Lógica de Negocio" (Independiente del UI)
│   ├── modules/     # Separación por Dominios de Negocio 
│   │ ├── inventory/      
│   │ ├── sales/        
│   │ └── billing/
│   │    ├── controller.ts # Maneja Req/Res y validaciones (Zod) 
│   │    ├── service.ts       # Lógica pura, cálculos y encriptación 
│   │    └── repository.ts  # Consultas a Prisma (SQL) 
│   └── shared/     # Interfaces y utilidades comunes
│        ├── errors/ # Clases personalizadas 
│        │      ├── AppError.ts # 
│        │      ├── BusinessError.ts 
│        │      └── AuthError.ts 
│        └── utils/ # Gestión de respuestas HTTP 
│               ├── apiResponse.ts 

│               └── logger.ts
├── lib/                  # Configuraciones (Prisma client, utilidades)
├── hooks/                # Hooks personalizados (useCart, useScanner)
└── middleware.ts         # valida suscripción y tenantId


Responsabilidades por Capa


API Route Handlers (app/api/...)
Es el receptor. Su única función es recibir el tráfico de internet y pasarle la request al controlador adecuado.


Ejemplo: POST /api/321/sales extrae el body y el tenantId, y llama a SalesController.create(req, tenantId).


Controller
Es el responsable de la comunicación externa


Misión: Validar que los datos lleguen completos (Zod), manejar los códigos de estado HTTP (200, 400, 500) y atrapar errores.

No hace: Cálculos de dinero ni consultas a la base de datos.


Service
Aquí reside la Capa de Negocio


Misión: Si es una venta, el Service orquestará: Primero resta el stock, luego verifica si el cliente debe, y finalmente genera el registro de venta.

Seguridad: Aquí se gestiona la encriptación de datos sensibles y las reglas de negocio.


Repository (El Bibliotecario)
se conecta con Prisma.


Filtro de Seguridad: El Repository siempre debe recibir el tenantId para asegurar que las queries tengan el where: { tenantId } inyectado. 


Comunicación Frontend -> Backend
Para mantener el orden, el frontend nunca llamará a Prisma directamente. El flujo será:


Componente React: El botón "Finalizar Venta" dispara un evento.

Hook (useSales): Llama a un servicio de fetch hacia la ruta /api/[tenantId]/sales.

API Route: Recibe la petición y la envía al SalesController.

SalesController: Valida los datos y los pasa al SalesService.

SalesService: Ejecuta la lógica y pide al SalesRepository guardar en la DB.

Respuesta: Todo regresa en cadena hasta que el componente muestra un mensaje de "Venta Exitosa".


 Manejo de Errores
Para que usuario siempre sepa qué pasa, se implementa una Gestión de Errores por Capas:



Errores de Dominio (Core)


InsufficientStockError: Cuando no hay prendas en la Capa 3.

SubscriptionExpiredError: Cuando el tenantId no ha pagado su plan en la Capa 0.


El "Global Catch" en los Controladores
Cada controlador envolverá las llamadas a los servicios en un bloque try/catch.


Si el error es conocido (de dominio), devuelve un 400 Bad Request con un mensaje claro.

Si el error es desconocido (se cayó la BD), devuelve un 500 Internal Server Error

Error Boundaries (Frontend)
se usara los error.tsx de Next.js para que, si un componente falla, el resto del dashboard siga funcionando. El usuario verá un mensaje amable en lugar de una pantalla blanca.


El Middleware: El "Cerebro" de la Multi-tenencia
que el Negocio A no vea los datos del Negocio B. Para ello, usaremos un Middleware que inyecte el tenantId en cada sesión.

Flujo de Seguridad:


El usuario se loguea.

El token de sesión guarda su tenantId y su role.

Cada vez que el Frontend hace una petición a la API (ej: GET /api/products), el backend extrae el tenantId del token de forma automática.

Prisma ejecuta la consulta: prisma.product.findMany({ where: { tenantId: session.tenantId } }).


Implementación de las 7 Capas en el Código
Cada una de tus 7 capas residirá en la carpeta core.
Esto permite que, si el día de mañana se cambia Prisma por otra herramienta, solo se cambia los archivos en core y el resto de la aplicación (el frontend) sigue funcionando igual.


Estrategia de Inmersión (Landing + Dashboard)


Landing Page (Pública): Ubicada en app/page.tsx. recide: KODA, planes y registros.

Dashboard (Privado): Ubicada en app/(dashboard). Un diseño minimalista centrado en la velocidad operativa.

Catálogo Público: Ubicado en app/[slug]. Esta ruta es la que el dueño del negocio comparte por WhatsApp.





Flujos de Usuario (User Flows)


Flujo de Gestión de Inventario (Capas 1, 2 y 3)
Actor: Dueño del Negocio (Admin).
Objetivo: Transformar la mercancía física en activos digitales listos para la venta.


Dueño: Accede al dashboard y crea una Categoría (Capa 1) para organizar su vitrina

Dueño: Registra el Producto (Capa 2) subiendo los datos requeridos

Dueño: Define las Variantes (Capa 3) especificando la combinación de Talla, Color y demas datos commo el Stock inicial disponible.

Sistema: Valida que no existan SKUs duplicados y guarda la relación jerárquica en la base de datos de Neon.

Sistema: Sincroniza automáticamente los datos para que el producto sea visible en el Catálogo Público.


Flujo de Venta y Manejo de Fiados (Capas 5 y 6)
Actor: Empleado (Vendedor).
Objetivo: Registrar una transacción rápida afectando stock y, si es necesario, la deuda del cliente.


Empleado: Inicia sesión con su contraseña y accede al POS (Punto de Venta).

Empleado: Selecciona los productos y las variantes específicas (Talla/Color) que el cliente desea llevar.

Sistema: Verifica en tiempo real que haya Stock (Capa 3) suficiente para completar la operación.

Empleado: Selecciona el método de pago. Si elige "Fiado" (Capa 6), el sistema le obliga a seleccionar o registrar un Cliente.

Sistema: Si es fiado, suma el total a la deuda del cliente; si es contado, solo registra el ingreso.

Sistema: Descuenta las unidades del inventario y genera el recibo digital para compartir por WhatsApp.


Flujo de Abono a Deudas (Capa 6)
Actor: Empleado o Dueño/admin.
Objetivo: Registrar pagos parciales o totales de clientes con deudas pendientes.


Usuario: Busca al cliente por nombre o teléfono en el módulo de Clientes (Capa 6).

Sistema: Muestra el totalDebt actual y el historial de ventas fiadas del cliente.

Usuario: Registra un nuevo Abono (Payment) ingresando el monto recibido y el método (Efectivo/Transferencia).

Sistema: Resta automáticamente el monto del abono al saldo pendiente del cliente (totalDebt).

Sistema: Registra la transacción en el historial para auditoría y confirma el nuevo saldo en pantalla.


Flujo de Consulta y Conversión (Capa 7)
Actor: Cliente Final.
Objetivo: Visualizar el catálogo y generar una intención de compra real.


Cliente: Escanea el código QR del local o abre el enlace

Sistema: Filtra el inventario y muestra solo los productos que tienen Stock activo (Capa 3).

Cliente: Navega por las Categorías (Capa 1) y selecciona una prenda para ver sus fotos y tallas disponibles.

Cliente: Hace clic en el botón de WhatsApp de una variante específica.

Sistema: Redirige a WhatsApp con un mensaje pre-configurado que incluye el nombre del producto, talla, color y precio.

Dueño: Recibe el mensaje y cierra la venta de forma personalizada.


Flujo de Gestión de Suscripción (Capa 0)
Actor: SuperAdmin y Dueño del Negocio.
Objetivo: Asegurar la continuidad del servicio mediante el registro de pagos.


Dueño: Notifica al SuperAdmin que ha realizado el pago mensual (ej: vía transferencia).

SuperAdmin: Accede al Dashboard Global, busca el Tenant y registra la transacción en transactions.

Sistema: Actualiza la endDate de la Subscription del negocio sumando el periodo correspondiente.

Sistema: Valida que el status cambie a ACTIVE (en caso de haber estado suspendido o en mora).

Dueño: Recibe una notificación en su dashboard confirmando que su acceso a las 7 capas ha sido renovado.




UX/UI


UX: Design Thinking


Empatizar (Ya trabajado)
Resumen: Identificamos que el usuario es un dueño de local que valora su tiempo, busca simplicidad y necesita gestionar la confianza (fiados) sin errores.


Insight clave: El sistema debe ser más rápido que el cuaderno


Definir (Ya trabajado)
Resumen: Aquí aterrizamos las 7 Capas. El problema no es solo vender, es la falta de visibilidad del inventario y el desorden en el recaudo de deudas. Definimos que KODA debe ser un SaaS multi-tenancy con un backend robusto y una UI minimalista. Que ademas busca familizar a los negocios con el software mediante el acompañamiento


Idear (Ya trabajado)
Resumen: Ideamos la solución técnica. Decidimos usar Next.js, Prisma y Neon para un monolito modular. Diseñamos un POS, un catálogo público automático y un módulo de deudas inteligente.


Prototipar


Funcionalidad Crítica: el flujo de "Venta -> Descuento de Stock -> Registro de Deuda" funcione. Eso es lo que demostrará el valor real.

Herramientas: la arquitectura (Punto 10), el prototipo es código funcional directo.


Testear (instituto y negocios)
Probarlo con compañeros y personas de otros cursos