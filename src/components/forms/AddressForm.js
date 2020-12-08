import React from "react";

const AddressForm = ({ handleChange, saveAddressToDb, values }) => {
  const {
    prenom,
    nom,
    societe,
    adresse,
    adresse2,
    codePostal,
    ville,
    pays,
    portable,
  } = values;

  return (
    <div className="form-content" style={{ textAlign: "center" }}>
      <form className="form" onSubmit={saveAddressToDb}>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="prenom"
            placeholder="Prenom"
            value={prenom}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="nom"
            placeholder="Nom"
            value={nom}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="societe"
            placeholder="Nom de la société"
            value={societe}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="adresse"
            placeholder="adresse"
            value={adresse}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="adresse2"
            placeholder="complément d'adresse"
            value={adresse2}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="codePostal"
            placeholder="Code postal"
            value={codePostal}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="ville"
            placeholder="Ville"
            value={ville}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="pays"
            placeholder="Pays"
            value={pays}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input w-75 p-1 mb-1"
            type="text"
            name="portable"
            placeholder="téléphone portable"
            value={portable}
            style={{ borderRadius: "10px" }}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary text-center">Sauvegarder</button>
      </form>
    </div>
  );
};

export default AddressForm;
