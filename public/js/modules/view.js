import { formatter, desFormat } from '../utils.js'
import AddEmployee from './addEmployee.js'
import Modal from './modal.js'
import Filtro from './filter.js'

export default class View {
    constructor() {
        this.model = null
        this.dolar =  21.50;
        this.recorder;
        this.photo = document.getElementById('modalFoto')
        this.bMphoto = document.getElementById('closeModalPutP')
        this.bMphoto.onclick = () => this.closePhoto();

        this.TakePhoto = document.getElementById('TakePhoto')
        this.TakePhoto.onclick = () => this.Capturar();

        this.table = document.getElementById('emplado-list').getElementsByTagName('tbody')[0];
        this.title = document.getElementById('Title')

        this.typeFilter = document.getElementById('typeFil')
        this.typeFilter.onchange = e => {
            const filt = document.getElementById('filtro')
            const filtro = {
                type:e.target.value,
                word:filt.value
            }
            this.filter(filtro)
        }

        this.cambio = document.getElementById('cambio')
        this.cambio.value="MXM"
        this.cambio.onchange = e => {
            this.changeMoneda(e.target.value);
            this.model.changeTitle((num)=>this.changetitle(num))
        }

        this.addEmpForm = new AddEmployee();
        this.modal = new Modal();
        this.filtro = new Filtro(); 

        this.addEmpForm.onclick((nombre,company,salary) => this.addEmployee(nombre,company,salary))
        this.modal.onclick((id,employee)=>this.putEmployee(id,employee))
        this.filtro.onChange((filtro)=> this.filter(filtro))
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const empleado = this.model.getEmployee();
        empleado.forEach((emp)=>this.createRow(emp))
    }

    addEmployee(nombre,company,salary){
       const employee = this.model.addEmployee(nombre,company,salary)
       this.createRow(employee)
       this.model.changeTitle((num)=> this.changetitle(num))
    }

    putEmployee(id,employee){
        this.model.putEmployee(id,employee)
        const row = document.getElementById(id)
        row.children[1].innerText = employee.nombre
        if(employee.salary < 10000) {
            row.children[3].classList.remove('mayorS')
            row.children[3].classList.add('menorS')
        } else {
            row.children[3].classList.remove('menorS')
            row.children[3].classList.add('mayorS')
        }
        if(this.cambio.value === 'MXM'){
            row.children[3].innerText = formatter(employee.salary)
        } else{
            row.children[3].innerText = formatter(employee.salary / this.dolar) 
        }
        
    }

    delEmpleado(id){
        this.model.delEmpleado(id)
        document.getElementById(id).remove();
        this.model.changeTitle((num)=> this.changetitle(num))
    }

    changetitle(num){
        this.title.innerText = `Numero de registros: ${num} | Tipo de cambio: ${this.cambio.value}`;
    }

    filter(filter){
        const {type, word} = filter;
        const [...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows){
            const [,nombre, company] = row.children;
            let hiden = false;
            if(word){
                if(type === 'nombre') {
                    hiden = !nombre.innerText.toLowerCase().includes(word.toLowerCase())
                } else if(type === 'company'){
                    hiden = !company.innerText.toLowerCase().includes(word.toLowerCase())
                }

                if(hiden){
                    row.classList.add('d-none')
                }else{
                    row.classList.remove('d-none')
                }
            }else{
                row.classList.remove('d-none')
            }
            //console.log(row, hiden)
        }

    }

    changeMoneda(moneda){
        const [...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows){
            const [,,, salary] = row.children;
            if(moneda === 'MXM'){
                let newSalary = desFormat(salary.innerText) * this.dolar;
                salary.innerText=formatter(newSalary)
            }else if(moneda === 'USD'){
                let newSalary = desFormat(salary.innerText) / this.dolar;
                salary.innerText=formatter(newSalary)
            }
            //console.log(row, hiden)
        }
    }

    createRow(employee){
        this.addEmpForm.close()
        const row = this.table.insertRow();
            row.setAttribute('id',employee.id)
            row.innerHTML = `
            <td><img /></td>
            <td>${employee.nombre}</td>
            <td>${employee.company}</td>
            <td>${formatter(employee.salary)}</td>
            <td></td>
            <td></td>
            `;

            if(employee.salary < 10000) {
                row.children[3].classList.remove('mayorS')
                row.children[3].classList.add('menorS')
            } else {
                row.children[3].classList.remove('menorS')
                row.children[3].classList.add('mayorS')
            }

            let salaryReal;
            if(this.cambio.value === 'MXM'){
                salaryReal = desFormat(row.children[3].innerText)
            } else{
                salaryReal = desFormat(row.children[3].innerText) * this.dolar
            }

            const putEmployee = document.createElement('button')
            putEmployee.classList.add('edit')
            putEmployee.innerText = "Editar"
            putEmployee.onclick = () => this.modal.open({
                id: employee.id,
                nombre: row.children[1].innerText,
                salary: salaryReal
            })
            row.children[4].appendChild(putEmployee)

            const delEmployee = document.createElement('button')
            delEmployee.classList.add('danger')
            delEmployee.innerText = 'Eliminar'
            delEmployee.onclick = e => this.delEmpleado(employee.id)
            row.children[5].appendChild(delEmployee)

            const photo = document.createElement('button')
            photo.classList.add('photoB')
            photo.innerText = "Foto"
            photo.onclick = e => this.takephoto(employee.id);
            row.children[0].appendChild(photo)
            
            this.model.changeTitle((num)=> this.changetitle(num))
    }

    takephoto(){
        this.photo.classList.remove('d-none')
        this.photo.classList.add('d-flex')
        this.model.captureCamera((camera)=>{
                document.getElementById('señal').innerHTML = 'Preparando foto';
                this.recorder = RecordRTC(camera, {
                    type: 'gif',
                    frameRate: 1,
                    quality: 10,
                    width: 360,
                    hidden: 240,
                    onGifRecordingStarted: function() {
                        document.getElementById('señal').innerHTML = 'Listo';
                    },
                    onGifPreview: function(gifURL) {
                        document.getElementById('photo').src = gifURL;
                    }
                });
        
                this.recorder.startRecording();
        
                // release camera on stopRecording
                this.recorder.camera = camera;
        })
    }

    closePhoto(){
        this.photo.classList.remove('d-flex')
        this.photo.classList.add('d-none')
    }

    Capturar(){
        this.recorder.stopRecording(()=>{
            console.log(this.recorder.getBlob())
            this.photo.classList.remove('d-flex')
            this.photo.classList.add('d-none')
            const down = document.createElement('a');
            down.href = URL.createObjectURL(new Blob([this.recorder.getBlob()]));
            down.click();
            this.recorder.camera.stop();
            this.recorder.destroy();
            this.recorder = null;
        });
        
        
    }
}