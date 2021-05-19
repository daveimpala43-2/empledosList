import {empyInput, addClassNone, removeClassNone} from '../utils.js'

export default class addEmployee{
    constructor(){
        this.name = document.getElementById("employeeName")
        this.company = document.getElementById("companyName")
        this.salary = document.getElementById('salary')
        this.addEmployee = document.getElementById("addEmployee")
        this.errEmp = document.getElementById('errEmp')
        this.errCom = document.getElementById('errCom')
        this.errSal = document.getElementById('errSal')

        this.addEmp = document.getElementById('addEmp')
        this.addEmp.onclick = () => this.open();

        this.closeModalAdd = document.getElementById('closeModalAdd')
        this.closeModalAdd.onclick = () => this.close();

        this.modalAdd = document.getElementById('modalAdd')
    }

    open(){
        this.name.value = ''
        this.company.value= ''
        this.salary.value = ''
        this.modalAdd.classList.add('d-flex')
        removeClassNone(this.modalAdd)
    }

    close(){
        this.modalAdd.classList.remove('d-flex')
        addClassNone(this.modalAdd)
    }

    onclick(callback){
        this.addEmployee.onclick = () => {
            if(empyInput(this.name.value) || empyInput(this.company.value) || empyInput(this.salary.value)){
                if(empyInput(this.name.value)){
                    removeClassNone(this.errEmp)
                    this.errEmp.innerText = 'Ingresa un nombre del empleados'
                } else{
                    addClassNone(this.errEmp)
                } 
    
                if(empyInput(this.company.value)){
                    removeClassNone(this.errCom)
                    this.errCom.innerText = 'Ingresa una empresa'
                } else {
                    addClassNone(this.errCom)
                }
    
                if(empyInput(this.salary.value)){
                    removeClassNone(this.errSal)
                    this.errSal.innerText = 'Ingresa un salario'
                } else {
                    addClassNone(this.errSal)
                }

            } else {

                addClassNone(this.errSal)
                addClassNone(this.errCom)
                addClassNone(this.errEmp)

                callback(this.name.value, this.company.value, this.salary.value)
                
            }
        }
    }
}