export function empyInput(valor){
    return valor === '' ? true : false
}

export function addClassNone(span){
    return span.classList.add("d-none")
}

export function removeClassNone(span){
    return span.classList.remove("d-none")
}

export function formatter (value){
   const formato = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

    return formato.format(value)
} 

export function desFormat (value){
    return value.replace(/[$,]/g,'');
}