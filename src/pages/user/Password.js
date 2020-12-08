import React, { useState } from "react";
import UserNav from "../../components/Nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === password2) {
      setLoading(true);
      await auth.currentUser
        .updatePassword(password)
        .then(() => {
          setLoading(false);
          toast.success("Mot de passe mis à jour");
          setPassword("");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
          setPassword("");
        });
    } else {
      setLoading(false);
      toast.error(
        "Le mot de passe et ça confirmation ne correspondent pas, veuillez à renseignez le même mot de passe pour les deux champs"
      );
      setPassword("");
      setPassword2("");
    }
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Votre mot de passe</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Entrer nouveau mot de passe"
          disabled={loading}
          value={password}
        />
        <input
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
          className="form-control"
          placeholder="Confirmez nouveau mot de passe"
          disabled={loading}
          value={password2}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Valider
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4>Mise à jour de votre mot de passe</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
