export type user = {
    id: number;
    nom: string;
    prenom: string;
    sexe: string;
    date_naissance: Date;
};

export type Employe = {
    id: number;
    nom: string;
    prenom: string;
    sexe: string;
    date_naissance: string;
    cin: string;
    mot_de_passe: string;
    compte_active: boolean;
};

export type Citoyen = {
    id: number;
    nom: string;
    prenom: string;
    sexe: string;
    date_naissance: string;
    lieu_naissance: string;
    cin: string;
    adresse: string;
    telephone: string;
    nationalite: string;
    profession: string;
    email: string;
};

export type Vehicule = {
    id: number;
    modele: string;
    marque: string;
    carburant: string;
    puissance: number;
    nb_place: number;
    nb_cylindres: number;
    ptac: number;
};

export type CarteGrise = {
    id: number;
    immatriculation: string;
    immatriculation_anterieure: string;
    date_premiere_utilisation: string;
    date_mutation: string;
    date_fin_validation: string;
    vehicule_usage: string;
    vehicule_id: number;
    citoyen_id: number;
    vehicule: Vehicule;
    citoyen: Citoyen;
};

export type Demande = {
    id: number;
    type: string;
    date_demande: string;
    etat: string;
    description_etat: string;
    code: string;
    citoyen_id: number;
    citoyen: Citoyen;
};