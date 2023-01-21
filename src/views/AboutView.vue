<template>
  <div class="about">
    <div>
      <h1>À propos de l'outil</h1>
      <p>A l'origine est sous le nom de Bauchi, </p>
      <p>C'est un Management pour Chanitier et Ouvriers</p>
      <h3>Comment L'utiliser</h3>
      <ol>
        <li>Après l'installation; l'outil créera un fichier de base de données dans le répertoire <code>'Document/ChantiersManager.db'</code></li>
        <li>Après avoir lancer l'outil,</li>
        <li>Il faut créer au moins un chantier au départ avec un Nom du chantier et son emplacement 👉 <a href="/chantier">Visiter</a></li>
        <li>Créez vos Ouvriers, avec nom, date de naissance...👉 <a href="/worker">Visiter</a></li>
        <li>Puis Connecter les Ouvriers avec le site souhaité 👉 <a href="/chantier">Visiter</a></li>
        <li>En fin noter le paiement de chaque Ouvriers pour la journée de travail 👉 <a href="/home">Visiter</a></li>
      </ol>
    </div>
    <div class="contact">
      <h5>Si vous rencontrez un Probleme</h5> <span>Veillez contacter 👉<a target="_blank" href="https://gacem.netlify.com">Jervi</a></span>
    </div>
    <footer>Made by <a target="_blank" href="https://gacem.netlify.com">Jervi</a></footer>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
a {
  text-decoration: none;
  color:black;
  font-weight: 700;
  text-decoration: underline;

}
.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h5 {
    margin: 0;
  }
  span {
    font-size: 15px;
  }
}
footer {
  text-align: center;

}
</style>
