const ingresos = [];
const egresos = [];

//APP
console.log("La función se ha ejecutado correctamente.");
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//Ingresos Total
let totalIngresos = () => {
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos
}
//Egresos Total
let totalEgresos = () => {
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos
}

//Función cargarCabecero
let cargarCabecero = () =>{
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalIngresos());
}

const formatoMoneda = (valor) =>{
    return valor.toLocaleString("es-MX", {style: "currency", currency: "MXN", minimumFractionDigits:2})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX", {style: "percent", minimumFractionDigits:2})
}

//Ingresos
const cargarIngresos = () =>{
    let ingresosHTML = "";
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresos(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresos = (ingreso) =>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn" onclick="eliminarIngreso(${ingreso.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return ingresosHTML;
}

const eliminarIngreso = (id) => {
    let ingresoEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

//Egresos
const cargarEgresos = () => {
    let egresosHTML = "";
    for (const egreso of egresos) {
        egresosHTML += crearEgresos(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresos = (egreso) =>{
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalIngresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn" onclick="eliminarEgreso(${egreso.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return egresosHTML;
}

const eliminarEgreso = (id) =>{
    let egresoEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(egresoEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

//Datos
const agregarDato = () => {
    console.log("La función agregarDato() se ha ejecutado correctamente.");
    
// Selección del Form
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = parseFloat(forma["valor"].value);
    
// Verificar elementos
    console.log("Descripcion:", descripcion);
    console.log("Valor:", valor);
   
//Verificar undefined
    if (descripcion && valor && descripcion.value !== "" && valor !== "") {
        if (tipo.value === "ingreso") {
            ingresos.push(new Ingresos(descripcion.value, valor));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === "egreso") {
            egresos.push(new Egresos(descripcion.value, valor));
            cargarCabecero();
            cargarEgresos();
        } else {
            console.log("Favor de llenar los campos");
        }
    } else {
        console.log("Descripcion o valor están vacíos");
    }
    
}

//Cargar Pág
function validarCarga() {
    console.log("El archivo JavaScript se cargó correctamente.");
}

//Llamar a la función validarCarga()
window.onload = validarCarga;
