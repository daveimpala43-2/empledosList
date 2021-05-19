import Modelo from './modules/model.js';
import View from './modules/view.js';

document.addEventListener('DOMContentLoaded', function () {
    const model =  new Modelo();
    const view = new View();

    model.setView(view);
    view.setModel(model)

    view.render();
})