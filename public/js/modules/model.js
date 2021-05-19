export default class Modelo {
    constructor(){
        this.view = null;
        this.employee = JSON.parse(localStorage.getItem('empleados'));
        this.cambio = document.getElementById('cambio')
        if(!this.employee || this.employee.length < 1){
            this.employee = [];
            this.currentId = 1;
        } else {
            this.currentId = this.employee[this.employee.length -1].id + 1;
        }
        
    }

    setView(view){
        this.view = view
    }
    
    getEmployee(){
        return this.employee.map((emp)=>({...emp}))
    }

    save(){
        localStorage.setItem('empleados', JSON.stringify(this.employee))
    }

    changeTitle(callback){
        callback(this.employee.length)
    }

    captureCamera(callback) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
            callback(camera);
        }).catch(function(error) {
            alert('Unable to capture your camera. Please check console logs.');
            console.error(error);
        });
    }

    addEmployee(nombre,company,salary){

        const obEmployee = {
            id: this.currentId++,
            nombre,
            company,
            salary
        }
        this.employee.push(obEmployee)
        this.save();

        return {...obEmployee};
    }

    putEmployee(id,employee){
        const index = this.employee.findIndex((emp) => emp.id === parseInt(id))
        Object.assign(this.employee[index], employee)
        this.save()
    }

    delEmpleado(id){
        const index = this.employee.findIndex((emp) => emp.id === parseInt(id));
        this.employee.splice(index, 1)
        this.save()
    }
}