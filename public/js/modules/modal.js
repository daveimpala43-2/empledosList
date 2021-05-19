import { removeClassNone, addClassNone, empyInput } from '../utils.js'

export default class Modal {
    constructor(){
        this.errEmp = document.getElementById('errEmpPut')
        this.errSal = document.getElementById('errSalPut')
        this.employee = null

        this.name = document.getElementById("putEmployeeName")
        this.salary = document.getElementById('putSalary')
        this.putEmployee = document.getElementById('putEmployeeM')
        this.modalDiv = document.getElementById('modal')
        this.ButClose = document.getElementById('closeModalPut')

        this.ButClose.onclick = () => this.close();
    }

    setValues(employee){
        this.name.value = employee.nombre
        this.salary.value = employee.salary
        this.employee = employee
    }

    open(employee){
        console.log(employee)
        this.setValues(employee)
        this.modalDiv.classList.add('d-flex')
        removeClassNone(this.modalDiv)
    }

    close(){
        addClassNone(this.modalDiv)
        this.modalDiv.classList.remove('d-flex')
    }
    
    onclick(callback){
        this.putEmployee.onclick = () =>{
            if(empyInput(this.name.value) || empyInput(this.salary.value)){
                if(empyInput(this.name.value)){
                    removeClassNone(this.errEmp)
                    this.errEmp.innerText = 'Ingresa un nombre del empleados'
                } else{
                    addClassNone(this.errEmp)
                } 
    
                if(empyInput(this.salary.value)){
                    removeClassNone(this.errSal)
                    this.errSal.innerText = 'Ingresa un salario'
                } else {
                    addClassNone(this.errSal)
                }
                return;
            }

            addClassNone(this.errEmp)
            addClassNone(this.errSal)
            this.close();

            callback(this.employee.id,{
                nombre: this.name.value,
                salary: this.salary.value
            })


        }
    }
}