%%[

Var @tabla, @row, @Nombre, @Apellido, @Tipo_ID, @Numero_ID, @Correo, @Telefono, @Uso_Datos, @DNI, @Ciudad

set @Nombre = RequestParameter("firtsName")
set @Apellido = RequestParameter("lastName")
set @Tipo_ID = RequestParameter("Tipo_ID")
set @Numero_ID = RequestParameter("Numero_ID")
set @Correo = RequestParameter("email")
set @Telefono = RequestParameter("phone")
set @Uso_Datos = RequestParameter("useData")
set @DNI = RequestParameter("DNI")
set @Ciudad = RequestParameter("city")

set @tabla=LookupRows("Exclusión_ campaña atraccion jovenes dic 2021","EMAIL",@Correo)
set @row = RowCount(@tabla)

if @row == 0 then
 InsertData("Atracción EPS jóvenes - diciembre 2021", 
"Nombre", @Nombre, 
"Apellido", @Apellido, 
"Tipo_ID", @Tipo_ID, 
"Numero_ID", @Numero_ID, 
"Correo", @Correo,
"Telefono", @Telefono,
"Uso_Datos", @Uso_Datos,
"DNI", @DNI,
"Ciudad", @Ciudad
)
 Redirect(CloudPagesURL(2769))
endif

]%%

alimentate
ejercitate