import React from 'react';


//TO DO : chercher où placer handleValueChange pour que l'évènement se déclenche quand on change l'option sélectionnée;
const InputSelect = ({handleValueChange}) => {
    return (
        <>
            <div class="mb-3">
              <label for="" class="form-label">Choisissez le parcours à afficher:</label>
              <select class="form-select" name="nom-parcours" id="" aria-label="City" onChange={handleValueChange}>
                <option value = '1'>Monuments célèbres de Lille</option>
                <option value = '2'>Vestiges du Moyen-Âge de Paris</option>
              </select>
            </div>
        </>
    );
};

export default InputSelect;