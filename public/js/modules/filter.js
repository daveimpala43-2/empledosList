export default class filter {
    constructor() {
        this.form = document.getElementById('filtro')
        this.typeFilter = document.getElementById('typeFil')
    }

    onChange(calback){
        this.form.oninput = (e) => {
            calback({
                type: this.typeFilter.value,
                word: this.form.value
            })
        }
    }
}